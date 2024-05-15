"use client";

import { Trash2, Undo2 } from "lucide-react";
import { ImageIcon } from "@radix-ui/react-icons";

import { cn } from "@/shared/lib/utils";
import { createId } from "@/shared/lib/id";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";

import { useState, useTransition } from "react";
import { useAppSession } from "@/entities/user/session";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createCategoryAction } from "../_actions/actions";
import { BuildCategoryPath, SelectCategory } from "./select-category";
import { CategoryTree } from "../_domain/types";
import { toast } from "sonner";
import { FormGuideComponent } from "./form-guide-component";
import {
  isValidFile,
  maxFileSizeInMB,
  allowedImageTypes,
  computeSHA256,
} from "@/entities/s3";
import { getCategorySignedURL } from "../_actions/get-category-signed-url";
import { russianToEnglishLayout } from "@/shared/lib/russian-to-english-layout";
import Image from "next/image";

const createCategoryFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Минимальная длинна 3 символа" })
    .max(40, { message: "Максимальная длинна 40 символов" }),
  description: z
    .string()
    .min(10, { message: "Минимальная длинна 10 символов" })
    .max(500, { message: "Максимальная длинна 500 символов" }),
});

export function CreateCategoryForm({
  categories,
  className,
  revalidatePagePath,
}: {
  categories: CategoryTree[];
  className?: string;
  revalidatePagePath: string;
}) {
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [isCreateTransiton, startCreateTransition] = useTransition();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const session = useAppSession();
  const createdBy = session.data?.user.id;
  const categoryId = createId();

  const form = useForm({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleReset = () => {
    form.reset();
    setParentCategoryId("");
    setPreviewUrl(null);
    setFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFile(file);

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const url = file ? URL.createObjectURL(file) : null;
    setPreviewUrl(url);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          startCreateTransition(async () => {
            const formData = {
              id: categoryId,
              name: data.name ?? "",
              description: data.description ?? "",
              url: russianToEnglishLayout(data.name) ?? "",
              createdBy: createdBy ?? "",
              parentId: parentCategoryId.length === 0 ? null : parentCategoryId,
            };
            try {
              let url = "";
              if (file) {
                isValidFile({
                  fileSize: file.size,
                  fileType: file.type,
                  allowedFileTypes: allowedImageTypes,
                  maxFileSize: maxFileSizeInMB,
                });

                const signedURLResult = await getCategorySignedURL({
                  fileSize: file.size,
                  fileType: file.type,
                  checksum: await computeSHA256(file),
                  userId: createdBy ?? "",
                });

                if ("failure" in signedURLResult) {
                  throw new Error(signedURLResult.failure);
                }

                url = signedURLResult.success.url;

                await fetch(url, {
                  method: "PUT",
                  body: file,
                  headers: {
                    "Content-Type": file.type,
                  },
                });
              }
              createCategoryAction(
                { ...formData, image: url.split("?")[0] },
                revalidatePagePath,
              );
              handleReset();
              toast.success("Категория успешно создана!");
            } catch (e) {
              const errorMessage = e instanceof Error ? e.message : e;
              toast.error(`Ой! Произошла ошибка. ${errorMessage}`);
            }
          });
        })}
        className={cn(className, "space-y-4")}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Название </FormLabel>
                <FormGuideComponent
                  description="Это название люди увидят в каталоге. Пишите с большой буквы
                    на русском языке:"
                  example="Мужское, Женское, Шапки, Юбки."
                />
              </div>
              <FormControl>
                <Input required placeholder="название..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Описание</FormLabel>
                <FormGuideComponent
                  description="Это описание появится в соц. сетях, когда люди будут
                  репостить адрес этой категории. Пишите с большой буквы на
                  русском языке:"
                  example="Итальянские юбки, чтобы сиять летом. Скидка 15%."
                />
              </div>
              <FormControl>
                <Textarea required placeholder="описание..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium cursor-default">
              Родительская категория
            </p>
            <FormGuideComponent
              description="Это родительская категория:"
              example="Мужское > Обувь > Кеды"
            />
          </div>
          {parentCategoryId.length === 0 ? (
            <SelectCategory
              setCategoryId={setParentCategoryId}
              categories={categories}
              childCategory={
                form.watch("name") ? form.watch("name") : "Новая категория"
              }
            />
          ) : (
            <div className="w-full flex justify-between items-center bg-background border rounded-md">
              <BuildCategoryPath
                categories={categories}
                categoryId={parentCategoryId}
                childCategory={
                  form.watch("name") ? form.watch("name") : "Новая категория"
                }
              />
              <Button
                onClick={() => setParentCategoryId("")}
                variant="ghost"
                size="icon"
              >
                <Trash2 className="h-5 w-5 text-red-500/80" />
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium cursor-default">
              Изображение категории
            </p>
            <FormGuideComponent
              description="Выбранное вами изображение будет отображаться
                  в социальных сетях при репосте ссылки на категорию. Правильно
                  подобранное изображение может значительно увеличить количество
                  переходов по этой ссылке. Оптимизируйте изображение, сожмите
                  его и только потом грузите. В среднем любое изображение можно
                  сжать до 300-600 килобайт без потери качества. Картинка должна быть форматом:"
              example="png, jpeg, webp.
                  Максимальный размер 1 мегабайт."
            />
          </div>
          {previewUrl && file ? (
            <div className="flex items-center gap-5 mt-4">
              {file.type.startsWith("image/") ? (
                <Image
                  width={200}
                  height={100}
                  src={previewUrl}
                  alt="Selected file"
                />
              ) : file.type.startsWith("video/") ? (
                <video src={previewUrl} controls />
              ) : null}
              <Button
                onClick={() => {
                  setPreviewUrl(null);
                  setFile(null);
                }}
                variant="outline"
                className={cn("bg-destructive/40 hover:bg-red-500")}
              >
                Удалить
              </Button>
            </div>
          ) : (
            <div>
              <Button asChild type="button" variant="outline">
                <label className="flex gap-4 text-muted-foreground">
                  <ImageIcon className="h-6 w-6" />
                  <span>Выбрать изображение</span>
                  <input
                    required
                    onChange={handleFileChange}
                    className="bg-transparent flex-1 border-none outline-none hidden"
                    name="media"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                  />
                </label>
              </Button>
            </div>
          )}
        </div>
        <div className="mt-8 flex justify-between">
          <Button type="submit" disabled={isCreateTransiton}>
            Добавить
          </Button>
          <Button
            onClick={() => handleReset()}
            size="icon"
            variant="outline"
            type="button"
            disabled={isCreateTransiton}
          >
            <Undo2 className="h-5 w-5" />
            <span className="sr-only">Сброс формы</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
