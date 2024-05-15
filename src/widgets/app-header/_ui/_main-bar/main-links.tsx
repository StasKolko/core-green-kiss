"use client";

import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { CategoryTree } from "@/features/categories/_domain/types";
import { cn } from "@/shared/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { useState } from "react";

export const MainLinks = ({
  categories,
  onClose,
}: {
  categories: CategoryTree[];
  onClose: Function;
}) => {
  const [active, setActive] = useState("");

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full flex flex-col gap-3 pl-5 pt-3"
    >
      {categories.map((category) =>
        category.children && category.children.length > 0 ? (
          <AccordionItem
            className="border-none"
            value={category.id}
            key={category.id}
          >
            <AccordionTrigger
              onClick={() =>
                setActive(active === category.id ? "" : category.id)
              }
              className={cn("px-4 border rounded-md", {
                "bg-muted hover:bg-secondary": active === category.id,
              })}
            >
              {category.name}
            </AccordionTrigger>
            <AccordionContent>
              <MainLinks onClose={onClose()} categories={category.children} />
            </AccordionContent>
          </AccordionItem>
        ) : (
          <Button
            className="justify-between"
            asChild
            variant="outline"
            key={category.id}
            onClick={onClose()}
          >
            <Link href={category.url || "/"}>
              {category.name}
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        ),
      )}
    </Accordion>
  );
};
