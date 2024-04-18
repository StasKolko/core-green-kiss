"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

import { useMounted } from "@/shared/lib/use-mounted";
import { useTheme } from "next-themes";

export function ModeToggle({
  className,
  iconSize,
}: {
  className: string;
  iconSize: string;
}) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  function handleModeTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  if (!mounted) {
    return <Skeleton className="h-12 w-[2.875rem]" />;
  }

  return (
    <Button className={cn(className)} variant="ghost" onClick={handleModeTheme}>
      {theme === "dark" ? (
        <MoonIcon className={iconSize} />
      ) : (
        <SunIcon className={iconSize} />
      )}
      Тема
    </Button>
  );
}
