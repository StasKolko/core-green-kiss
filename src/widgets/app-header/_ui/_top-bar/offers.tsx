import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

export function Offers() {
  return (
    <>
      <Button
        className={cn("px-0 h-6 text-foreground/70 hover:text-foreground/90")}
        variant="link"
      >
        Продавайте на Green kiss
      </Button>
      <Button
        className={cn("px-0 h-6 text-foreground/70 hover:text-foreground/90")}
        variant="link"
      >
        Работа в Green kiss
      </Button>
    </>
  );
}
