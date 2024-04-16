import { Menu, Search } from "lucide-react";
import { HomeIcon } from "@radix-ui/react-icons";
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
    <div className="flex items-center justify-between md:gap-5 py-1 md:py-2">
      <div className="contents md:fle items-center  md:gap-4">
        <div className="hidden md:flex">
          <Logo />
        </div>

        <Button
          variant="ghost"
          className={cn(
            "h-12 md:hidden py-0 px-2 flex-col md:gap-1 text-xs md:sm",
          )}
        >
          <HomeIcon className="h-5 w-5" />
          Главная
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className={cn("h-12 py-0 px-2 flex-col md:gap-1 text-xs md:sm")}
            >
              <Menu className="h-5 w-5" />
              <span>Каталог</span>
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

      <div className="w-full hidden md:flex p-[2px] bg-primary rounded-md">
        <Input className="h-8" placeholder="Искать на Green kiss" />
        <Button className={cn("h-8")}>
          <Search className="h-5 w-5" />
        </Button>
      </div>

      <div className="contents md:flex md:gap-4 items-center">
        <MainBarActions />
      </div>
    </div>
  );
}
