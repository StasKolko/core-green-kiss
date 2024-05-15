"use client";

import { useAppSession } from "@/entities/user/session";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function AuthorizedGuardAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useAppSession();

  const role = session.data?.user.role;
  const isUnauthenticated = session.status === "unauthenticated";

  useEffect(() => {
    if (isUnauthenticated) {
      signIn();
    }
    if (role === "USER") {
      signIn();
    }
  }, [isUnauthenticated, role]);

  const isLoading =
    session.status === "loading" || session.status === "unauthenticated";

  return (
    <>
      <FullPageSpinner isLoading={isLoading} />
      {session.status === "authenticated" && children}
    </>
  );
}
