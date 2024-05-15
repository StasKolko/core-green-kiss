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
  await deleteFile(command.image);
  await deleteCategoryElement(command);
  revalidatePath(revalidatePagePath);
};
