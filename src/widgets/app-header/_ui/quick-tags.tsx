import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

export function QuickTags() {
  return (
    <div className="hidden md:flex gap-4 py-2">
      <Button className={cn("h-8 p-0 text-foreground/80")} variant="link">
        Новинки
      </Button>
      <Button className={cn("h-8 p-0 text-foreground/80")} variant="link">
        Популярное
      </Button>
      <Button className={cn("h-8 p-0 text-foreground/80")} variant="link">
        Предзаказ
      </Button>
      <Button className={cn("h-8 p-0 text-foreground/80")} variant="link">
        Скидки
      </Button>
    </div>
  );
}
