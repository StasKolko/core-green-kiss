"use client";

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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useEffect, useState, useTransition } from "react";
import { cn } from "@/shared/lib/utils";
import { Undo2, Pencil, CircleX } from "lucide-react";
import { toast } from "sonner";
import { FormGuideComponent } from "../form-guide-component";
import { updateNameCategoryAction } from "../../_actions/actions";
import { russianToEnglishLayout } from "@/shared/lib/russian-to-english-layout";

const updateNameCategoryFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Минимальная длинна 3 символа" })
    .max(40, { message: "Максимальная длинна 40 символов" }),
});

export function UpdateNameCategoryForm({
  revalidatePagePath,
  categoryId,
  categoryName,
  className,
}: {
  revalidatePagePath: string;
  categoryId: string;
  categoryName: string | null;
  className?: string;
}) {
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isCreateTransiton, startCreateTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(updateNameCategoryFormSchema),
    defaultValues: {
      name: name,
    },
  });

  useEffect(() => {
    form.setValue("name", categoryName ?? "");
    setName(categoryName ?? "");
  }, [categoryName]);

  const handleReset = () => {
    form.reset();
  };

  return (
    <div className="flex flex-col gap-4 bg-primary/10 rounded-md p-3">
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              startCreateTransition(async () => {
                try {
                  updateNameCategoryAction(
                    {
                      name: data.name ?? "",
                      id: categoryId,
                      url: russianToEnglishLayout(data.name),
                    },
                    revalidatePagePath,
                  );
                  handleReset();
                  setIsEditing(false);
                  toast.success("Название категории успешно изменено!");
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
            <div className="mt-8 flex justify-between">
              <Button type="submit" disabled={isCreateTransiton}>
                Сохранить
              </Button>
              <Button
                onClick={() => {
                  handleReset();
                  setIsEditing(false);
                }}
                variant="outline"
                type="button"
                disabled={isCreateTransiton}
                className={cn(
                  "bg-destructive/30 hover:bg-red-500 hover:text-background gap-2",
                )}
              >
                <CircleX className="h-5 w-5" />
                Отменить
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Название</p>
            <Button
              className={cn("h-8 gap-3")}
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
              Редакт.
            </Button>
          </div>
          <p className="h-10 pl-3 flex items-center bg-background border rounded-md text-sm">
            {categoryName}
          </p>
        </>
      )}
    </div>
  );
}
