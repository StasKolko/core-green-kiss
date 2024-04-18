import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Drawer, DrawerContent, DrawerTrigger } from "@/shared/ui/drawer";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Contacts } from "./contacts";
import { Phone } from "lucide-react";

export function ContactButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-8 gap-2 px-2 hidden md:inline-flex text-foreground/70",
          )}
        >
          <Phone className="h-5 w-5" />
          Контакты
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-full p-0")} align="end">
        <Contacts />
      </PopoverContent>
    </Popover>
  );
}
