import { CategoryTree } from "../_domain/types";

export const buildCategoryPath = (
  categoryList: CategoryTree[],
  parentId: string,
) => {
  const categoryPath: string[] = [];

  function buildPath(object: CategoryTree, id: string) {
    if (object.id === id) {
      categoryPath.push(object.url ?? "");
      return true;
    }
    if (object.children.length === 0) {
      return false;
    }

    for (const child of object.children) {
      const isCorrectPath = buildPath(child, id);
      if (isCorrectPath) {
        categoryPath.push(object.url ?? "");
        return true;
      }
    }
  }

  for (const categoryElement of categoryList) {
    const isCorrectPath = buildPath(categoryElement, parentId);
    if (isCorrectPath) {
      break;
    }
  }

  return [...categoryPath.reverse()];
};
