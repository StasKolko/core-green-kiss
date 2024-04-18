"use client";

import { LogIn } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

import { signIn } from "next-auth/react";

export function SignInButton({
  iconSize,
  className,
}: {
  iconSize: string;
  className: string;
}) {
  const handleSignOut = () => signIn();

  return (
    <Button className={cn(className)} variant="ghost" onClick={handleSignOut}>
      <LogIn className={iconSize} />
      <span>Войти</span>
    </Button>
  );
}
