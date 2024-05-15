"use server";

import { privateConfig } from "@/shared/config/private";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  forcePathStyle: true,
  endpoint: privateConfig.S3_ENDPOINT,
  region: privateConfig.S3_REGION,
  credentials: {
    accessKeyId: privateConfig.S3_ACCESS_KEY_ID ?? "",
    secretAccessKey: privateConfig.S3_SECRET_ACCESS_KEY ?? "",
  },
});

export async function deleteFile(fileUrl: string) {
  try {
    if (fileUrl.length > 10) {
      const key = fileUrl.split("/").slice(-1)[0];

      const deleteParams = {
        Bucket: privateConfig.S3_IMAGES_BUCKET,
        Key: key,
      };

      await s3Client.send(new DeleteObjectCommand(deleteParams));
    }
  } catch (e) {
    console.error(e);
  }
}
