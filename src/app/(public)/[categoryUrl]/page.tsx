export default function CategoryPage({
  params,
}: {
  params: { categoryUrl: string };
}) {
  return <div>{params.categoryUrl}</div>;
}
