"use client";

import Link from "next/link";

import { Button } from "@/shared/ui/button";

import { Icon } from "@/shared/ui/logo-icon";
import { cn } from "@/shared/lib/utils";

export function Logo({
  className,
  href,
}: {
  className?: string;
  href: string;
}) {
  return (
    <Button asChild variant="ghost" className={cn("px-1", className)}>
      <Link className="items-center space-x-2" href={href}>
        <Icon className="h-8 w-8 text-primary" />
        <span className="text-foreground font-bold inline-block">
          Green kiss
        </span>
      </Link>
    </Button>
  );
}
