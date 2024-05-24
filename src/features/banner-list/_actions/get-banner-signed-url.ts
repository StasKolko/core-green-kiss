"use server";

import { privateConfig } from "@/shared/config/private";
import { getSignedURL } from "@/entities/s3/_services/get-signed-url";

export async function getBannerSignedURL({
  fileType,
  fileSize,
  checksum,
  userId,
}: {
  fileType: string;
  fileSize: number;
  checksum: string;
  userId: string;
}) {
  const signedUrl = await getSignedURL({
    fileType: fileType,
    fileSize: fileSize,
    checksum: checksum,
    userId: userId,
    key: "banner",
    bucket: privateConfig.S3_IMAGES_BUCKET ?? "",
  });

  if ("failure" in signedUrl) {
    return signedUrl;
  }

  return signedUrl;
}
