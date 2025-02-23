import { useTranslations } from "next-intl";
import { CarouselSection } from "./CarouselSection";
export function Categories({
  categories,
  loading,
}: {
  categories: { id: number; title: string; image: string }[];
  loading?: boolean;
}) {
  const text = useTranslations("categories");

  return (
    <CarouselSection
      title={text("title")}
      items={categories.map((category) => ({
        image: category.image,
        link: `/brands?shop_categories=${category.id}`,
      }))}
      classNames={{
        itemClassName: "category",
      }}
      isLoading={loading}
    />
  );
}
