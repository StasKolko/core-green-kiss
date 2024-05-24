"use client";

import Image from "next/image";
import { BannerEntity } from "../_domain/types";
import { DeleteBannerForm } from "./delete-banner-form";

export function UpdateBannerForm({
  banners,
  className,
  revalidatePagePath,
}: {
  banners: BannerEntity[];
  className?: string;
  revalidatePagePath: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      {banners?.length === 0 ? (
        <div>У вас нет баннеров. Добавьте новый.</div>
      ) : (
        banners?.map((banner) => (
          <section
            className="flex flex-col gap-3 p-4 bg-background border rounded-md"
            key={banner.id}
          >
            <h3>
              id: <span className="text-primary">{banner.id}</span>
            </h3>
            <div>
              <p>
                Описание:{" "}
                <span className="text-primary">{banner.description}</span>
              </p>
            </div>
            <Image
              className="object-contain h-[200px] w-full"
              height={200}
              width={300}
              alt={banner.description ?? ""}
              src={banner.image ?? ""}
            />
            <DeleteBannerForm
              revalidatePagePath={revalidatePagePath}
              bannerId={banner.id}
              fileUrl={banner.image ?? ""}
            />
          </section>
        ))
      )}
    </div>
  );
}
