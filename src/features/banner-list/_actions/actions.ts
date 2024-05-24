"use server";

import { revalidatePath } from "next/cache";
import { CreateBannerCommand, DeleteBannerCommand } from "../_domain/types";
import {
  createBannerElement,
  deleteBannerElement,
} from "../_repositories/banner";
import { deleteFile } from "@/entities/s3/_services/delete-file";

export const createBannerAction = async (
  command: CreateBannerCommand,
  revalidatePagePath: string,
) => {
  await createBannerElement(command);
  revalidatePath(revalidatePagePath);
};

export const deleteBannerAction = async (
  command: DeleteBannerCommand,
  revalidatePagePath: string,
) => {
  await deleteFile(command.image);
  await deleteBannerElement(command);
  revalidatePath(revalidatePagePath);
};
