import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/shared/ui/card";

export function CategoryCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 md:gap-5">
        <CardTitle className="text-center text-xl md:text-2xl">
          {title}
        </CardTitle>
        <CardDescription className="border-b border-t p-2 md:p-5">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
