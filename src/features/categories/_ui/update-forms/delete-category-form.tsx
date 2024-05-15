import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/shared/lib/utils";
import { deleteCategoryAction } from "../../_actions/actions";

export function DeleteCategoryForm({
  categoryId,
  revalidatePagePath,
  className,
  setSelectedCategory,
  fileUrl,
}: {
  categoryId: string;
  revalidatePagePath: string;
  className?: string;
  setSelectedCategory: Function;
  fileUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const [isCreateTransition, startCreateTransition] = useTransition();
  const form = useForm();

  const onSubmit = () => {
    startCreateTransition(async () => {
      await deleteCategoryAction(
        { id: categoryId, image: fileUrl },
        revalidatePagePath,
      );
    });
    setSelectedCategory("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "bg-destructive/60 text-destructive-foreground hover:text-destructive-foreground hover:bg-red-500",
          )}
          type="button"
          disabled={isCreateTransition}
        >
          Удалить категорию
        </Button>
      </DialogTrigger>
      <DialogContent>
        Вы уверены, что хотите удалить категорию?
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(className, "space-y-4")}
        >
          <div className="flex justify-between">
            <Button
              className={cn(
                "bg-destructive text-destructive-foreground hover:bg-destructive/70",
              )}
              type="submit"
              disabled={isCreateTransition}
            >
              Удалить
            </Button>
            <Button
              onClick={() => setOpen(false)}
              type="button"
              variant="secondary"
            >
              Отменить
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
