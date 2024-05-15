"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/shared/ui/sheet";
import { Logo } from "@/widgets/app-header/_ui/_main-bar/logo";
import { Menu } from "lucide-react";
import { AdminNav } from "./admin-nav";
import { useState } from "react";

export function AdminMenu() {
  const [open, setOpen] = useState(false);

  const iconSize = "h-5 w-5";
  const headerButtonStyle = "flex-col h-12 py-0 px-2 text-xs md:sm";

  function onClose() {
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className={cn(headerButtonStyle)}>
          <Menu className={iconSize} />
          <span>Каталог</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className=" border-b pb-5 mb-5">
          <Logo href="/admin" />
        </SheetHeader>
        <AdminNav onClose={() => onClose} />
      </SheetContent>
    </Sheet>
  );
}
