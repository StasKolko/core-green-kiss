import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { AppHeader } from "@/widgets/app-header/app-header";
import { Search } from "lucide-react";
import { Input } from "@/shared/ui/input";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="py-4 px-10">
        <div className="w-full md:hidden flex p-[2px] bg-primary rounded-md">
          <Input className="h-10" placeholder="Искать на Green kiss" />
          <Button className={cn("h-8")}>
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <AppHeader />
      {children}
    </>
  );
}
