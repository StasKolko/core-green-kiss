export type BannerEntity = {
  id: string;
  description: string | null;
  url: string | null;
  image: string | null;
  createdBy: string | null;
  createdAt: Date | null;
  updatedBy: string | null;
  updatedAt: Date | null;
};

export type CreateBannerCommand = {
  id: string;
  description: string | null;
  url: string | null;
  image: string | null;
  createdBy: string | null;
};

export type DeleteBannerCommand = {
  id: string;
  image: string;
};
