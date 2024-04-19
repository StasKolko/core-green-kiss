import { z } from "zod";
import "dotenv/config";

const privateConfigSchema = z.object({
  GITHUB_ID: z.string().optional(),
  GITHUB_SECRET: z.string().optional(),
  GOOGLE_ID: z.string().optional(),
  GOOGLE_SECRET: z.string().optional(),
  YANDEX_ID: z.string().optional(),
  YANDEX_SECRET: z.string().optional(),
});

export const privateConfig = privateConfigSchema.parse(process.env);
