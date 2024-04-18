import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import "dotenv/config";
import { db } from "@/shared/lib/db";
import { compact } from "lodash-es";
import { privateConfig } from "@/shared/config/private";

export const nextAuthConfig: AuthOptions = {
  adapter: DrizzleAdapter(db) as AuthOptions["adapter"],
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/new-user",
  },
  providers: compact([
    privateConfig.GITHUB_ID &&
      privateConfig.GITHUB_SECRET &&
      GithubProvider({
        clientId: privateConfig.GITHUB_ID ?? "",
        clientSecret: privateConfig.GITHUB_SECRET ?? "",
      }),
  ]),
};
