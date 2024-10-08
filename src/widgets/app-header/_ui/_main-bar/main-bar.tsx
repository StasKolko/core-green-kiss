import { Search, ShoppingCart } from "lucide-react";
import { HomeIcon } from "@radix-ui/react-icons";
import { Logo } from "./logo";

import { Button } from "@/shared/ui/button";

import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";
import { ModeToggle } from "@/features/theme/mode-toggle";
import { Profile } from "./profile";
import { MainNav } from "./main-nav";
import { buildCategoryTree } from "@/features/categories/_lib/build-category-tree";
import { getCategoryList } from "@/features/categories/_repositories/category";

export async function MainBar({ isPublic }: { isPublic: boolean }) {
  const iconSize = "h-5 w-5";
  const headerButtonStyle = "flex-col h-12 py-0 px-2 text-xs md:sm";

  const categoryList = await getCategoryList();
  const categories = categoryList ? buildCategoryTree(categoryList) : [];

  return (
    <div className="flex items-center justify-between md:gap-5 py-1 md:py-2">
      <div className="contents md:flex items-center md:gap-4">
        <Logo href="/" className="hidden md:flex" />

        <Button variant="ghost" className={cn("md:hidden", headerButtonStyle)}>
          <HomeIcon className={iconSize} />
          Главная
        </Button>

        <MainNav
          categories={categories}
          iconSize={iconSize}
          headerButtonStyle={headerButtonStyle}
        />
      </div>

      {isPublic && (
        <div className="w-full hidden md:flex gap-[2px] p-[2px] bg-primary rounded-md">
          <Input className="h-8" placeholder="Искать на Green kiss" />
          <Button className={cn("h-8 hover:bg-ring px-2")}>
            <Search className={iconSize} />
          </Button>
        </div>
      )}

      <div className="contents md:flex md:gap-4 items-center">
        <ModeToggle iconSize={iconSize} className={headerButtonStyle} />

        {isPublic && (
          <Profile iconSize={iconSize} buttonStyle={headerButtonStyle} />
        )}
        {isPublic && (
          <Button className={cn(headerButtonStyle)} variant="ghost">
            <ShoppingCart className={iconSize} />
            Корзина
          </Button>
        )}
      </div>
    </div>
  );
}
