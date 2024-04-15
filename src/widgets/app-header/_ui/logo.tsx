"use client";

import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

import { useMounted } from "@/shared/lib/use-mounted";
import { Icon } from "./logo-icon";

export function Logo() {
  const mounted = useMounted();

  return (
    <Button asChild variant="ghost">
      <Link className="flex items-center space-x-2" href="/">
        {mounted ? (
          <Icon className="h-8 w-8 text-primary" />
        ) : (
          <Skeleton className="h-8 w-8" />
        )}
        <span className="text-foreground font-bold inline-block">
          Green kiss
        </span>
      </Link>
    </Button>
  );
}
