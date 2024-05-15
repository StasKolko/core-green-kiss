import { CategoryEntity, CategoryTree } from "../_domain/types";

export function buildCategoryTree(
  categories: CategoryEntity[],
): CategoryTree[] {
  const buildTree = (parentId: string | null): CategoryTree[] => {
    return categories
      .filter((category) => category.parentId === parentId)
      .map((category) => ({
        ...category,
        children: buildTree(category.id),
      }));
  };

  return buildTree(null);
}
