export function AppHeaderLayout({
  topBar,
  mainBar,
  quickTags,
}: {
  topBar?: React.ReactNode;
  mainBar?: React.ReactNode;
  quickTags?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col">
        {topBar}

        {mainBar}

        {quickTags}
      </div>
    </header>
  );
}
