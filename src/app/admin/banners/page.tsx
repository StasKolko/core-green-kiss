import { BannerManager } from "@/features/banner-list";

export default function BannersPage() {
  return (
    <main className="grid place-items-center p-5 md:p-10">
      <div className="max-w-[50rem] flex flex-col gap-20 items-center">
        <div className="flex flex-col gap-10 items-center">
          <h1 className="text-3xl font-bold">Баннера</h1>
          <p className="p-4 text-foreground/70 border-b border-t border-foreground/30">
            На этой странице вы можете добавлять новые баннера, удалять ненужные
            и редактировать существующие. Также здесь предоставляется информация
            о дате создания или последнего редактирования каждого баннера, а
            также о пользователе, который внес эти изменения.
          </p>
        </div>

        <BannerManager />
      </div>
    </main>
  );
}
