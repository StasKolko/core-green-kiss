import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { buildCategoryTree } from "../_lib/build-category-tree";
import { getCategoryList } from "../_repositories/category";
import { CategoryCard } from "./category-card";
import { CreateCategoryForm } from "./create-category-form";
import { UpdateCategoryForm } from "./update-category-form";

export async function CategoryManager() {
  const categoryList = await getCategoryList();
  const categories = categoryList ? buildCategoryTree(categoryList) : [];
  const revalidatePagePath = "/admin/categories";

  return (
    <Tabs defaultValue="categories" className="w-full grid place-items-center">
      <TabsList className="w-[260px] md:w-[25rem] grid grid-cols-2">
        <TabsTrigger value="categories">Все категории</TabsTrigger>
        <TabsTrigger value="new-category">Создать новую</TabsTrigger>
      </TabsList>
      <TabsContent value="categories">
        <CategoryCard
          title="Просмотр, изменение и удаление существующих категорий"
          description="Здесь вы можете просматривать детальную информацию о каждой категории,
          изменять их названия и URL-адреса, а также удалять категории, которые больше не нужны."
        >
          <UpdateCategoryForm
            categories={categories}
            revalidatePagePath={revalidatePagePath}
          />
        </CategoryCard>
      </TabsContent>
      <TabsContent value="new-category">
        <CategoryCard
          title="Создание новой категории"
          description="Здесь вы можете создать новую категорию. Укажите название,
      составьте описание, и выберите изображение для представления
      категории в социальных сетях при её распространении. Определите
      URL для адресной строки браузера и, если требуется, установите
      связь с родительской категорией."
        >
          <CreateCategoryForm
            categories={categories}
            revalidatePagePath={revalidatePagePath}
          />
        </CategoryCard>
      </TabsContent>
    </Tabs>
  );
}
