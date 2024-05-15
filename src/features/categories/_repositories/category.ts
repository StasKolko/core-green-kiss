import { cache } from "react";

import { db } from "@/shared/lib/db";
import { categories } from "@/../db/schema";

import { eq } from "drizzle-orm";
import {
  CategoryEntity,
  CreateCategoryCommand,
  DeleteCategoryCommand,
  UpdateDescriptionCategoryCommand,
  UpdateNameCategoryCommand,
  UpdateParentIdCategoryCommand,
  UpdateUrlCategoryCommand,
} from "../_domain/types";

export const getCategoryList = cache(
  async (): Promise<CategoryEntity[] | null> => {
    return await db.query.categories.findMany();
  },
);

export const getCategoryById = async (
  categoryId: string,
): Promise<CategoryEntity | undefined> => {
  return await db.query.categories.findFirst({
    where: (table, funcs) => funcs.eq(table.id, categoryId),
  });
};

export const createCategoryElement = async (
  command: CreateCategoryCommand,
): Promise<void> => {
  await db.insert(categories).values({
    id: command.id,
    name: command.name,
    description: command.description ?? "",
    image: command.image,
    parentId: command.parentId,
    createdBy: command.createdBy,
    url: command.url,
  });
};

export const deleteCategoryElement = async (
  command: DeleteCategoryCommand,
): Promise<void> => {
  await db.delete(categories).where(eq(categories.id, command.id));
};

export const updateNameCategoryElement = async (
  command: UpdateNameCategoryCommand,
): Promise<void> => {
  await db
    .update(categories)
    .set({
      name: command.name,
      url: command.url,
    })
    .where(eq(categories.id, command.id));
};

export const updateDescriptionCategoryElement = async (
  command: UpdateDescriptionCategoryCommand,
): Promise<void> => {
  await db
    .update(categories)
    .set({
      description: command.description,
    })
    .where(eq(categories.id, command.id));
};

export const updateUrlCategoryElement = async (
  command: UpdateUrlCategoryCommand,
): Promise<void> => {
  await db
    .update(categories)
    .set({
      url: command.url,
    })
    .where(eq(categories.id, command.id));
};

export const updateParentIdCategoryElement = async (
  command: UpdateParentIdCategoryCommand,
): Promise<void> => {
  await db
    .update(categories)
    .set({
      parentId: command.parentId,
    })
    .where(eq(categories.id, command.id));
};
