import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { BannerCard } from "./banner-card";
import { CreateBannerForm } from "../_forms/create-banner-form";
import { UpdateBannerForm } from "../_forms/update-banner-form";
import { getBannerList } from "../_repositories/banner";

export async function BannerManager() {
  const banners = await getBannerList();
  const revalidatePagePath = "/admin/banners";

  return (
    <Tabs defaultValue="banners" className="w-full grid place-items-center">
      <TabsList className="w-[260px] md:w-[25rem] grid grid-cols-2">
        <TabsTrigger value="banners">Все банера</TabsTrigger>
        <TabsTrigger value="new-banner">Создать новый</TabsTrigger>
      </TabsList>
      <TabsContent value="banners">
        <BannerCard
          title="Просмотр, изменение и удаление существующих баннеров"
          description="Здесь вы можете просматривать детальную информацию о каждом баннере,
          изменять их названия и URL-адреса, на которые они ведут,
          а также удалять баннера, которые больше не нужны."
        >
          <UpdateBannerForm
            banners={banners ?? []}
            revalidatePagePath={revalidatePagePath}
          />
        </BannerCard>
      </TabsContent>
      <TabsContent value="new-banner">
        <BannerCard
          title="Создание нового баннера"
          description="Здесь вы можете создать нвоый баннер. Укажите название,
      составьте описание, и выберите изображение. Определите
      URL, на который будет вести баннер."
        >
          <CreateBannerForm revalidatePagePath={revalidatePagePath} />
        </BannerCard>
      </TabsContent>
    </Tabs>
  );
}
