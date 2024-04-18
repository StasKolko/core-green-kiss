import { Menu, Search, ShoppingCart } from "lucide-react";
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
import { ModeToggle } from "@/features/theme/mode-toggle";
import { Profile } from "./profile";

export function MainBar() {
  const iconSize = "h-5 w-5";
  const headerButtonStyle = "flex-col h-12 py-0 px-2 text-xs md:sm";

  return (
    <div className="flex items-center justify-between md:gap-5 py-1 md:py-2">
      <div className="contents md:fle items-center  md:gap-4">
        <Logo className="hidden md:flex" />

        <Button variant="ghost" className={cn("md:hidden", headerButtonStyle)}>
          <HomeIcon className={iconSize} />
          Главная
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className={cn(headerButtonStyle)}>
              <Menu className={iconSize} />
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

      <div className="w-full hidden md:flex gap-[2px] p-[2px] bg-primary rounded-md">
        <Input className="h-8" placeholder="Искать на Green kiss" />
        <Button className={cn("h-8 hover:bg-ring px-2")}>
          <Search className={iconSize} />
        </Button>
      </div>

      <div className="contents md:flex md:gap-4 items-center">
        <ModeToggle iconSize={iconSize} className={headerButtonStyle} />
        <Profile
          iconSize={iconSize}
          className={headerButtonStyle}
          skeletonStyle="h-12 w-[4.375rem] rounded-md"
        />
        <Button className={cn(headerButtonStyle)} variant="ghost">
          <ShoppingCart className={iconSize} />
          Корзина
        </Button>
      </div>
    </div>
  );
}
