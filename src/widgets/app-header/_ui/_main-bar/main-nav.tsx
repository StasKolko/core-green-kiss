"use client";

import { MainLinks } from "./main-links";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/shared/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { Logo } from "./logo";
import { useState } from "react";

export function MainNav({
  iconSize,
  headerButtonStyle,
  categories,
}: {
  iconSize: string;
  headerButtonStyle: string;
  categories: any;
}) {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <nav>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className={cn(headerButtonStyle)}>
            <Menu className={iconSize} />
            <span>Каталог</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className=" border-b pb-5 mb-5">
            <Logo href="/" />
          </SheetHeader>
          <MainLinks categories={categories} onClose={onClose} />
        </SheetContent>
      </Sheet>
    </nav>
  );
}
