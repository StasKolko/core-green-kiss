import { cn } from "@/shared/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { CategoryTree } from "../_domain/types";

export const BuildCategoryTree = ({
  categories,
  setActive,
  active,
}: {
  categories: CategoryTree[];
  setActive: Function;
  active: string;
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full flex flex-col gap-3 pl-3 pt-3"
    >
      {categories.map((category: any) =>
        category.children && category.children.length > 0 ? (
          <AccordionItem
            className="border-none"
            value={category.id}
            key={category.id}
          >
            <AccordionTrigger
              onClick={() => setActive(category.id)}
              className={cn("px-4 border rounded-md", {
                "bg-muted hover:bg-secondary": active === category.id,
              })}
            >
              {category.name}
            </AccordionTrigger>
            <AccordionContent>
              <BuildCategoryTree
                categories={category.children}
                active={active}
                setActive={setActive}
              />
            </AccordionContent>
          </AccordionItem>
        ) : (
          <Button
            variant="outline"
            key={category.id}
            className={cn("justify-start", {
              "bg-muted hover:bg-secondary": active === category.id,
            })}
            onClick={() => setActive(category.id)}
          >
            {category.name}
          </Button>
        ),
      )}
    </Accordion>
  );
};
