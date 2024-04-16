import { AppHeaderLayout } from "./_ui/app-header-layout";
import { TopBar } from "./_ui/_top-bar/top-bar";
import { MainBar } from "./_ui/_main-bar/main-bar";
import { QuickTags } from "./_ui/quick-tags";

export function AppHeader() {
  return (
    <AppHeaderLayout
      topBar={<TopBar />}
      mainBar={<MainBar />}
      quickTags={<QuickTags />}
    />
  );
}
