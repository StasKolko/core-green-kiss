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
  DialogFooter,
  DialogClose,
} from "@/shared/ui/dialog";

import { useState } from "react";
import { BuildCategoryTree } from "./build-category-tree";
import { CategoryTree } from "../_domain/types";

export function SelectCategory({
  categories,
  setCategoryId,
  childCategory,
}: {
  categories: CategoryTree[];
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  childCategory?: string;
}) {
  const [currentId, setCurrentId] = useState("");

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
        {categories.length === 0 ? (
          <>
            <DialogHeader>
              <DialogTitle>У вас ещё не созданы категории</DialogTitle>
              <DialogDescription>
                Для назначения родительской категории, сначала необходимо
                создать хотя бы одну категорию.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className={cn("bg-destructive/40 hover:bg-red-500")}
                >
                  Закрыть
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Выбор родительской категории</DialogTitle>
              <DialogDescription>
                Выбранная вами категория будет использоваться как родительская
                для новой подкатегории.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-5">
              <BuildCategoryTree
                categories={categories}
                active={currentId}
                setActive={setCurrentId}
              />
              <div className="flex gap-4">
                <Button
                  onClick={() => setCategoryId(currentId)}
                  disabled={currentId.length === 0}
                >
                  Выбрать
                </Button>
                <div className="w-full flex justify-between items-center border rounded-md">
                  <BuildCategoryPath
                    categories={categories}
                    categoryId={currentId}
                    childCategory={childCategory}
                  />
                  <Button
                    onClick={() => setCurrentId("")}
                    variant="ghost"
                    size="icon"
                  >
                    <Trash2 className="h-5 w-5 text-red-500/80" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function BuildCategoryPath({
  categories,
  categoryId,
  childCategory,
}: {
  categories: CategoryTree[];
  categoryId: string;
  childCategory?: string;
}) {
  const categoryPath: string[] = [];
  if (childCategory) categoryPath.push(childCategory);

  function buildPath(object: CategoryTree, id: string) {
    if (object.id === id) {
      categoryPath.push(object.name ?? "");
      return true;
    }
    if (object.children.length === 0) {
      return false;
    }

    for (const child of object.children) {
      const isCorrectPath = buildPath(child, id);
      if (isCorrectPath) {
        categoryPath.push(object.name ?? "");
        return true;
      }
    }
  }

  for (const categoryElement of categories) {
    const isCorrectPath = buildPath(categoryElement, categoryId);
    if (isCorrectPath) {
      break;
    }
  }
  categoryPath.reverse();
  const result = categoryPath.join(" > ");
  return <div className="pl-5">{result}</div>;
}
