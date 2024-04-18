import { getServerSession } from "next-auth";
import { nextAuthConfig } from "./next-auth-config";
import { NeedAuthError } from "@/shared/lib/errors";

export const getAppServerSession = () => getServerSession(nextAuthConfig);
export const getAppStrictServerSession = async () => {
  const session = await getAppServerSession();
  if (session === null) {
    throw new NeedAuthError();
  }
  return session;
};
