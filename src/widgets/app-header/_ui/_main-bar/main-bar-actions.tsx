import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { ShoppingCart, CircleUserRound } from "lucide-react";
import { MoonIcon } from "@radix-ui/react-icons";

export function MainBarActions() {
  return (
    <>
      <Button
        className={cn("flex-col h-12 py-0 px-2 text-xs md:sm")}
        variant="ghost"
      >
        <MoonIcon className="h-5 w-5" />
        Тема
      </Button>
      <Button
        className={cn("flex-col h-12 py-0 px-2 text-xs md:sm")}
        variant="ghost"
      >
        <CircleUserRound className="h-5 w-5" />
        Профиль
      </Button>
      <Button
        className={cn("flex-col h-12 py-0 px-2 text-xs md:sm")}
        variant="ghost"
      >
        <ShoppingCart className="h-5 w-5" />
        Корзина
      </Button>
    </>
  );
}
