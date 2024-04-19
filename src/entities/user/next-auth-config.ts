import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";
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
    privateConfig.GOOGLE_ID &&
      privateConfig.GOOGLE_SECRET &&
      GoogleProvider({
        clientId: privateConfig.GOOGLE_ID ?? "",
        clientSecret: privateConfig.GOOGLE_SECRET ?? "",
      }),
    privateConfig.YANDEX_ID &&
      privateConfig.YANDEX_SECRET &&
      YandexProvider({
        clientId: privateConfig.YANDEX_ID ?? "",
        clientSecret: privateConfig.YANDEX_SECRET ?? "",
      }),
  ]),
};
