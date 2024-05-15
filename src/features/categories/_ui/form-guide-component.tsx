import { CircleAlert } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

export function FormGuideComponent({
  description,
  example,
}: {
  description: string;
  example: string;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <CircleAlert className="w-5 h-5" />
        <span className="sr-only">Информация о том, как заполнить инпут</span>
      </PopoverTrigger>
      <PopoverContent className="text-foreground/70">
        {description}
        <br />
        <span className="font-semibold text-foreground">{example}</span>
      </PopoverContent>
    </Popover>
  );
}
