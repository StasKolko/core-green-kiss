import { cache } from "react";

import { db } from "@/shared/lib/db";
import { bannerTable } from "@/../db/schema";

import {
  BannerEntity,
  CreateBannerCommand,
  DeleteBannerCommand,
} from "../_domain/types";
import { eq } from "drizzle-orm";

export const getBannerList = cache(async (): Promise<BannerEntity[] | null> => {
  return await db.query.bannerTable.findMany();
});

export const createBannerElement = async (
  command: CreateBannerCommand,
): Promise<void> => {
  await db.insert(bannerTable).values({
    id: command.id,
    description: command.description ?? "",
    url: command.url ?? "",
    image: command.image ?? "",
    createdBy: command.createdBy,
  });
};

export const deleteBannerElement = async (
  command: DeleteBannerCommand,
): Promise<void> => {
  await db.delete(bannerTable).where(eq(bannerTable.id, command.id));
};
