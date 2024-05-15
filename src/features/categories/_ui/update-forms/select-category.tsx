"use client";

import { Trash2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";

import { useState } from "react";
import { BuildCategoryTree } from "./build-category-tree";
import { CategoryTree } from "../../_domain/types";

export function SelectCategory({
  categories,
  setSelectedCategory,
  // setCategoryPath,
}: {
  categories: CategoryTree[];
  setSelectedCategory: React.Dispatch<CategoryTree | null>;
  // setCategoryPath: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [currentCategory, setCurrentCategory] = useState(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn("justify-start font-normal text-muted-foreground")}
        >
          выбрать...
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Выбор категории</DialogTitle>
          <DialogDescription>
            Вы сможете просмотреть, отредактировать информацию или вовсе удалить
            категорию.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <BuildCategoryTree
            categories={categories}
            active={currentCategory}
            setActive={setCurrentCategory}
          />
          <div className="flex gap-4">
            123
            {/* <Button
              onClick={() => setCurrentCategory(currentId)}
              disabled={currentId.length === 0}
            >
              Выбрать
            </Button>
            <div className="w-full flex justify-between items-center border rounded-md">
              <BuildCategoryPath categories={categories} parentId={currentId} />
              <Button
                onClick={() => setCurrentId("")}
                variant="ghost"
                size="icon"
              >
                <Trash2 className="h-5 w-5 text-red-500/80" />
              </Button> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
