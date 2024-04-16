import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { ShoppingCart, CircleUserRound } from "lucide-react";
import { ModeToggle } from "@/features/theme/mode-toggle";

export function MainBarActions() {
  return (
    <>
      <ModeToggle />
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
