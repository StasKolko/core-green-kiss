"use client";

import { Undo2 } from "lucide-react";
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
import { Textarea } from "@/shared/ui/textarea";

import { useState, useTransition } from "react";
import { useAppSession } from "@/entities/user/session";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { FormGuideComponent } from "@/features/categories/_ui/form-guide-component";
import {
  isValidFile,
  maxFileSizeInMB,
  allowedImageTypes,
  computeSHA256,
} from "@/entities/s3";
import Image from "next/image";

import { getBannerSignedURL } from "../_actions/get-banner-signed-url";
import { createBannerAction } from "../_actions/actions";

const createCategoryFormSchema = z.object({
  description: z
    .string()
    .min(10, { message: "Минимальная длинна 10 символов" })
    .max(500, { message: "Максимальная длинна 500 символов" }),
});

export function CreateBannerForm({
  className,
  revalidatePagePath,
}: {
  className?: string;
  revalidatePagePath: string;
}) {
  const [isCreateTransiton, startCreateTransition] = useTransition();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const session = useAppSession();
  const createdBy = session.data?.user.id;
  const bannerId = createId();

  const form = useForm({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: {
      description: "",
      url: "",
    },
  });

  const handleReset = () => {
    form.reset();
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
              id: bannerId,
              description: data.description ?? "",
              url: data.url ?? "",
              createdBy: createdBy ?? "",
            };
            try {
              let imageUrl = "";
              if (file) {
                isValidFile({
                  fileSize: file.size,
                  fileType: file.type,
                  allowedFileTypes: allowedImageTypes,
                  maxFileSize: maxFileSizeInMB,
                });

                const signedURLResult = await getBannerSignedURL({
                  fileSize: file.size,
                  fileType: file.type,
                  checksum: await computeSHA256(file),
                  userId: createdBy ?? "",
                });

                if ("failure" in signedURLResult) {
                  throw new Error(signedURLResult.failure);
                }

                imageUrl = signedURLResult.success.url;

                await fetch(imageUrl, {
                  method: "PUT",
                  body: file,
                  headers: {
                    "Content-Type": file.type,
                  },
                });
              }
              createBannerAction(
                { ...formData, image: imageUrl.split("?")[0] },
                revalidatePagePath,
              );
              handleReset();
              toast.success("Баннер успешно создан!");
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Описание</FormLabel>
                <FormGuideComponent
                  description="Это описание появится, если изображение
                  не загрузится. Оно также будет прочитано
                  пользователям с нарушениями зрения."
                  example="Скидки на детскую одежду до 70% действуют до 20 августа."
                />
              </div>
              <FormControl>
                <Textarea required placeholder="описание..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>URL</FormLabel>
                <FormGuideComponent
                  description="Это адрес, на который будет направлен пользователь после клика на баннер."
                  example="/promotions/skidkomayniya"
                />
              </div>
              <FormControl>
                <Textarea placeholder="url..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium cursor-default">
              Изображение баннера
            </p>
            <FormGuideComponent
              description="Выбранное вами изображение будет отображаться
                  на главной странице. Правильно
                  подобранное изображение может значительно увеличить количество
                  покупок. Оптимизируйте изображение, сожмите
                  его и только потом грузите. В среднем любое изображение для баннера
                  можно сжать до 50-600 килобайт без потери качества. Картинка должна быть форматом:"
              example="png, jpeg, webp.
                  Максимальный размер 1 мегабайт."
            />
          </div>
          {previewUrl && file ? (
            <div className="flex items-center gap-5 mt-4">
              {file.type.startsWith("image/") && (
                <Image
                  width={200}
                  height={100}
                  src={previewUrl}
                  alt="Selected file"
                />
              )}
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
