import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { MapPin } from "lucide-react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export function Location() {
  return (
    <>
      <Button className={cn("h-6 px-2")} variant="secondary">
        RUB
      </Button>

      <Button className={cn("h-6 gap-1 px-0")} variant="link">
        <MapPin className="h-4 w-4" />
        Россия
      </Button>
      <h4 className="flex items-center gap-1 text-sm text-foreground/60 hover:text-foreground/80 ml-5">
        <ArrowLeftIcon className="h-4 w-4" />
        Выберите адрес доставки
      </h4>
    </>
  );
}
