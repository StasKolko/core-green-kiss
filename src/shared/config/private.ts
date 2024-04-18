import { z } from "zod";
import "dotenv/config";

const privateConfigSchema = z.object({
  GITHUB_ID: z.string().optional(),
  GITHUB_SECRET: z.string().optional(),
});

export const privateConfig = privateConfigSchema.parse(process.env);
