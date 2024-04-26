import { CallbacksOptions } from "next-auth";
import { userRepository } from "../_repositories/user";
import { Role } from "../_domain/types";

export const nextAuthCallbacks: Partial<CallbacksOptions> = {
  // Обратите внимание, что мы убрали здесь "callbacks:"
  async jwt({ token }) {
    if (!token.sub) return token;
    const existingUser = await userRepository.getUserById(token.sub);

    if (!existingUser) return token;

    token.name = existingUser.name;
    token.email = existingUser.email;
    token.role = existingUser.role;

    return token;
  },
  async session({ session, token }) {
    if (token.sub && session.user) {
      session.user.id = token.sub;
    }

    if (token.role && session.user) {
      session.user.role = token.role as Role;
    }

    if (session.user) {
      session.user.name = token.name;
      session.user.email = token.email as string;
    }

    return session;
  },
};
