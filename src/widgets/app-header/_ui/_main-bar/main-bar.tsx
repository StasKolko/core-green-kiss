import { Menu, Search } from "lucide-react";
import { Logo } from "./logo";

import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/shared/ui/sheet";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";
import { MainBarActions } from "./main-bar-actions";

export function MainBar() {
  return (
    <div className="flex items-center gap-5 py-2">
      <div className="flex items-center gap-4">
        <Logo />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="default" className="gap-1" size="sm">
              <Menu className="h-5 w-5" />
              Каталог
              <span className="sr-only">Меню</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className=" border-b pb-5 mb-5">
              <Logo />
            </SheetHeader>
            nav
          </SheetContent>
        </Sheet>
      </div>

      <div className="w-full flex p-[2px] bg-primary rounded-md">
        <Input className="h-8" />
        <Button className={cn("h-8")}>
          <Search className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <MainBarActions />
      </div>
    </div>
  );
}
