import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import { getBannerList } from "@/features/banner-list/_repositories/banner";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";

export default async function Home() {
  const banners = await getBannerList();

  return (
    <main className="container min-h-screen p-8">
      {banners?.length !== 0 && (
        <Carousel className="w-full">
          <CarouselContent>
            {banners?.map((banner) => (
              <CarouselItem key={banner.id}>
                <Image
                  className="object-contain h-[200px] w-full"
                  height={200}
                  width={400}
                  alt={banner.description ?? ""}
                  src={banner.image ?? ""}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={cn("md:left-4 -left-4")} />
          <CarouselNext className={cn("md:right-4 -right-4")} />
        </Carousel>
      )}
    </main>
  );
}
