import { CoursesList } from "@/features/courses-list/pub/courses-list";
import { CreateCourseForm } from "@/features/courses-list/pub/create-course-form";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col  p-8">
      <h1 className="text-3xl text-fuchsia-500 mb-2">Товары для магазина</h1>
      <p className="text-xl text-red-500 mb-2">Добавьте товар какой хотите</p>
      <CreateCourseForm
        revalidatePagePath="/"
        className="max-w-[300px] mb-10"
      />
      <CoursesList revalidatePagePath="/" />
    </main>
  );
}
