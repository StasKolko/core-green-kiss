"use server";

import { createId } from "@/shared/lib/id";
import { getAppServerSession } from "@/entities/user/session.server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { privateConfig } from "@/shared/config/private";

const s3Client = new S3Client({
  forcePathStyle: true,
  endpoint: privateConfig.S3_ENDPOINT,
  region: privateConfig.S3_REGION,
  credentials: {
    accessKeyId: privateConfig.S3_ACCESS_KEY_ID ?? "",
    secretAccessKey: privateConfig.S3_SECRET_ACCESS_KEY ?? "",
  },
});

export async function getSignedURL({
  fileType,
  fileSize,
  checksum,
  userId,
  key,
  bucket,
}: {
  fileType: string;
  fileSize: number;
  checksum: string;
  userId: string;
  key: string;
  bucket: string;
}) {
  const session = getAppServerSession();

  if (!session) {
    return {
      failure: "Для продолжения работы вам необходимо выполнить вход на сайт.",
    };
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: bucket,
    Key: `${key}-${createId()}`,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
    Metadata: {
      userId: userId,
    },
  });

  const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
    expiresIn: 60,
  });

  return { success: { url: signedUrl } };
}
