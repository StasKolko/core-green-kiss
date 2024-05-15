export interface CategoryEntity {
  id: string;
  url: string | null;
  name: string | null;
  description: string | null;
  image: string | null;
  parentId: string | null;
  createdBy: string | null;
  createdAt: Date | null;
  updatedBy: string | null;
  updatedAt: Date | null;
}

export type CreateCategoryCommand = {
  id: string;
  url: string;
  name: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  createdBy: string;
};

export type DeleteCategoryCommand = {
  id: string;
  image: string;
};

export interface CategoryTree extends CategoryEntity {
  children: CategoryTree[];
}

export interface UpdateCategoryCommand {
  id: string;
}

export interface UpdateNameCategoryCommand extends UpdateCategoryCommand {
  name: string;
  url: string;
}

export interface UpdateDescriptionCategoryCommand
  extends UpdateCategoryCommand {
  description: string;
}

export interface UpdateUrlCategoryCommand extends UpdateCategoryCommand {
  url: string;
}

export interface UpdateParentIdCategoryCommand extends UpdateCategoryCommand {
  parentId: string;
}
