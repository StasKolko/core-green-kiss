import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { createUserUseCase } from "../_use-cases/create-user";
import { db } from "@/shared/lib/db";
import { AdapterUser } from "next-auth/adapters";

const drizzleAdapter = DrizzleAdapter(db);

export const nextAuthAdapter = {
  ...drizzleAdapter,
  createUser: (user: Omit<AdapterUser, "id">) => {
    return createUserUseCase.exec(user);
  },
};
