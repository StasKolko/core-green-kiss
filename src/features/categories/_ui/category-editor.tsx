"use client";

import { useState } from "react";
import { CategoryTree } from "../_domain/types";
import { UpdateCategoryForm } from "./update-category-form";

export function CategoryEditor({ categories }: { categories: CategoryTree[] }) {
  const [activeCategory, setActiveCategory] = useState(false);

  return (
    <div>
      {categories.length === 0 ? (
        <div>У вас нет доступных категорий, создайте, пожалуйста, новую!</div>
      ) : (
        <div>
          <UpdateCategoryForm
            revalidatePagePath="/admin/categories"
            categories={categories}
          />
        </div>
      )}
    </div>
  );
}
