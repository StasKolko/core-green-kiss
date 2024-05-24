import { AppHeaderLayout } from "./_ui/app-header-layout";
import { TopBar } from "./_ui/_top-bar/top-bar";
import { MainBar } from "./_ui/_main-bar/main-bar";
import { QuickTags } from "./_ui/quick-tags";

export function AppHeader({
  variant,
}: {
  variant: "auth" | "private" | "public";
}) {
  const isPublic = variant === "public";
  const test = false;

  return (
    <AppHeaderLayout
      topBar={test && isPublic && <TopBar />}
      mainBar={<MainBar isPublic={isPublic} />}
      quickTags={test && isPublic && <QuickTags />}
    />
  );
}
