import { HomeIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

import { Logo } from "@/widgets/app-header/_ui/_main-bar/logo";
import { ModeToggle } from "@/features/theme/mode-toggle";
import { Profile } from "@/widgets/app-header/_ui/_main-bar/profile";
import { AdminMenu } from "./admin-menu";

export function AdminHeaderLayout() {
  const iconSize = "h-5 w-5";
  const headerButtonStyle = "flex-col h-12 py-0 px-2 text-xs md:sm";

  return (
    <header className="fixed md:sticky bottom-0 md:top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-3 xs:px-8 container flex justify-between">
        <div className="contents md:flex items-center md:gap-4">
          <Logo href="/admin" className="hidden md:flex" />

          <Button
            variant="ghost"
            className={cn("md:hidden", headerButtonStyle)}
          >
            <HomeIcon className={iconSize} />
            Главная
          </Button>

          <AdminMenu />
        </div>
        <div className="contents md:flex md:gap-4 items-center">
          <ModeToggle iconSize={iconSize} className={headerButtonStyle} />

          <Profile
            isAdmin
            iconSize={iconSize}
            buttonStyle={headerButtonStyle}
          />
        </div>
      </div>
    </header>
  );
}
