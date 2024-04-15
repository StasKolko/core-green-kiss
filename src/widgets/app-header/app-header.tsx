import { AppHeaderLayout } from "./_ui/app-header-layout";
import { Logo } from "./_ui/logo";
import { MainNav } from "./_ui/main-nav";
// import { ThemeCustomizer } from "@/features/theme/theme-customizer";
import { Profile } from "./_ui/profile";

export function AppHeader({
  variant,
}: {
  variant: "auth" | "private" | "public";
}) {
  const isProfile = variant !== "auth";

  return (
    <AppHeaderLayout
      logo={<Logo />}
      nav={<MainNav />}
      profile={isProfile && <Profile />}
      // actions={<ThemeCustomizer />}
    />
  );
}
