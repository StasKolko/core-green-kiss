import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shirt, ListTree, GalleryHorizontal } from "lucide-react";

const adminLinks = [
  {
    title: "Товары",
    href: "/admin/products",
    icon: <Shirt className="h-5 w-5" />,
  },
  {
    title: "Категории",
    href: "/admin/categories",
    icon: <ListTree className="h-5 w-5" />,
  },
  {
    title: "Баннера",
    href: "/admin/banners",
    icon: <GalleryHorizontal className="h-5 w-5" />,
  },
];

export function AdminNav({ onClose }: { onClose: Function }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col items-center gap-3">
      {adminLinks.map((link) => (
        <Button
          onClick={onClose()}
          className={cn("w-full justify-start gap-4", {
            "bg-secondary": pathname === link.href,
          })}
          asChild
          key={link.title}
          variant="ghost"
        >
          <Link href={link.href}>
            {link.icon}
            {link.title}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
