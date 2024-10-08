import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const privateConfigSchema = z.object({
  GITHUB_ID: z.string().optional(),
  GITHUB_SECRET: z.string().optional(),
  GOOGLE_ID: z.string().optional(),
  GOOGLE_SECRET: z.string().optional(),
  YANDEX_ID: z.string().optional(),
  YANDEX_SECRET: z.string().optional(),

  ADMIN_EMAILS: z.string().optional(),

  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),
  S3_IMAGES_BUCKET: z.string().optional(),
  S3_ENDPOINT: z.string().optional(),
  S3_REGION: z.string().optional(),
});

export const privateConfig = privateConfigSchema.parse(process.env);
