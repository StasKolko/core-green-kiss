import AuthorizedGuard from "@/features/auth/authorized-guard";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthorizedGuard>{children}</AuthorizedGuard>
    </>
  );
}
