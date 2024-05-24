import { AdminHeader } from "@/widgets/admin-header/admin-header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminHeader />
{children}
    </>
  );
}
