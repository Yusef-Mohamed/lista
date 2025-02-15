import { useTranslations } from "next-intl";
import { CarouselSection } from "./CarouselSection";
export function Categories({
  categories,
}: {
  categories: { id: number; title: string; image: string }[];
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
    />
  );
}
