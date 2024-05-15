"use client";

import { CategoryTree } from "../_domain/types";

import { useState } from "react";
import { BuildCategoryPath, SelectCategory } from "./select-category";
import { Button } from "@/shared/ui/button";
import { Trash2 } from "lucide-react";
import { UpdateNameCategoryForm } from "./update-forms/update-name-category-form";
import { DeleteCategoryForm } from "./update-forms/delete-category-form";
import { UpdateDescriptionCategoryForm } from "./update-forms/update-description-category-form";

export function UpdateCategoryForm({
  categories,
  className,
  revalidatePagePath,
}: {
  categories: CategoryTree[];
  className?: string;
  revalidatePagePath: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryPath, setCategoryPath] = useState("");

  const category = findSelectedCategory(selectedCategory, categories);

  return (
    <div className="flex flex-col gap-5">
      <div className="h-[4.625rem] w-full flex flex-col gap-2">
        {categories.length === 0 ? (
          <h3>У вас нет категорий. Пожалуйста, создайте новую!</h3>
        ) : selectedCategory.length === 0 ? (
          <>
            <h4>Выберите категорию</h4>
            <SelectCategory
              categories={categories}
              setCategoryId={setSelectedCategory}
            />
          </>
        ) : (
          <>
            <h4>Вы выбрали следующую категорию</h4>
            <div className="w-full flex justify-between items-center bg-background border rounded-md">
              <BuildCategoryPath
                categories={categories}
                categoryId={selectedCategory}
              />
              <Button
                onClick={() => setSelectedCategory("")}
                variant="ghost"
                size="icon"
              >
                <Trash2 className="h-5 w-5 text-red-500/80" />
              </Button>
            </div>
          </>
        )}
      </div>
      {category && (
        <div className="flex flex-col gap-5">
          <UpdateNameCategoryForm
            revalidatePagePath={revalidatePagePath}
            categoryId={selectedCategory}
            categoryName={category.name}
          />
          <UpdateDescriptionCategoryForm
            revalidatePagePath={revalidatePagePath}
            categoryId={selectedCategory}
            categoryDescription={category.description}
          />
          <DeleteCategoryForm
            setSelectedCategory={setSelectedCategory}
            revalidatePagePath={revalidatePagePath}
            categoryId={selectedCategory}
            fileUrl={category.image ?? ""}
          />
        </div>
      )}
    </div>
  );
}

function findSelectedCategory(id: string, categories: CategoryTree[]) {
  for (const category of categories) {
    if (category.id === id) {
      return category;
    }
    if (category.children.length > 0) {
      return findSelectedCategory(id, category.children);
    }
  }
  return false;
}
