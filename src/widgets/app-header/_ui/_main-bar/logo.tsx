"use client";

import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

import { useMounted } from "@/shared/lib/use-mounted";
import { Icon } from "@/shared/ui/logo-icon";
import { cn } from "@/shared/lib/utils";

export function Logo() {
  const mounted = useMounted();

  return (
    <Button asChild variant="ghost" className={cn("px-1")}>
      <Link className="items-center space-x-2" href="/">
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
