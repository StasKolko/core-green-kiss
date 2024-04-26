import { nextAuthProviders } from "./_config/providers";
import { nextAuthPages } from "./_config/pages";
import { nextAuthAdapter } from "./_config/adapter";
import { nextAuthCallbacks } from "./_config/callbacks";
import { AuthOptions } from "next-auth";

export const nextAuthConfig: AuthOptions = {
  adapter: nextAuthAdapter as AuthOptions["adapter"],
  callbacks: nextAuthCallbacks,
  pages: nextAuthPages,
  providers: nextAuthProviders,
  session: { strategy: "jwt" },
};
