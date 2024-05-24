"use server";

import { revalidatePath } from "next/cache";
import {
  CreateCategoryCommand,
  DeleteCategoryCommand,
  UpdateDescriptionCategoryCommand,
  UpdateNameCategoryCommand,
  UpdateParentIdCategoryCommand,
  UpdateUrlCategoryCommand,
} from "../_domain/types";
import {
  createCategoryElement,
  deleteCategoryElement,
  getCategoryList,
  updateDescriptionCategoryElement,
  updateNameCategoryElement,
  updateParentIdCategoryElement,
  updateUrlCategoryElement,
} from "../_repositories/category";
import { deleteFile } from "@/entities/s3/_services/delete-file";

export const createCategoryAction = async (
  command: CreateCategoryCommand,
  revalidatePagePath: string,
) => {
  await createCategoryElement(command);
  revalidatePath(revalidatePagePath);
};

export const updateNameCategoryAction = async (
  command: UpdateNameCategoryCommand,
  revalidatePagePath: string,
) => {
  await updateNameCategoryElement(command);
  revalidatePath(revalidatePagePath);
};

export const updateDescriptionCategoryAction = async (
  command: UpdateDescriptionCategoryCommand,
  revalidatePagePath: string,
) => {
  await updateDescriptionCategoryElement(command);
  revalidatePath(revalidatePagePath);
};

export const updateUrlCategoryAction = async (
  command: UpdateUrlCategoryCommand,
  revalidatePagePath: string,
) => {
  await updateUrlCategoryElement(command);
  revalidatePath(revalidatePagePath);
};

export const updateParentIdCategoryAction = async (
  command: UpdateParentIdCategoryCommand,
  revalidatePagePath: string,
) => {
  await updateParentIdCategoryElement(command);
  revalidatePath(revalidatePagePath);
};

export const deleteCategoryAction = async (
  command: DeleteCategoryCommand,
  revalidatePagePath: string,
) => {
  const categories = (await getCategoryList()) ?? [];
  const stack = [command];
  const result = [];

  while (stack.length > 0) {
    const item = stack.pop();
    if (!(item && "id" in item)) continue;
    for (const category of categories) {
      if (category.parentId === item.id) {
        stack.push(category);
      }
    }
    result.push(item);
  }

  for (const item of result) {
    if (item.image !== null) await deleteFile(item.image);
    await deleteCategoryElement(item);
  }

  revalidatePath(revalidatePagePath);
};
