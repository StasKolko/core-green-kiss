import AuthorizedGuardAdmin from "@/features/auth/authorized-guard-admin";
import { AdminHeader } from "@/widgets/admin-header/admin-header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminHeader />
      <AuthorizedGuardAdmin>{children}</AuthorizedGuardAdmin>
    </>
  );
}
