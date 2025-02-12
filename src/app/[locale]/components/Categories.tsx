import { useTranslations } from "next-intl";
import { CarouselSection } from "./CarouselSection";
export function Categories() {
  const text = useTranslations("categories");

  return (
    <CarouselSection
      title={text("title")}
      items={[
        "/images/brand.png",
        "/images/brand.png",
        "/images/brand.png",
        "/images/brand.png",
        "/images/brand.png",
        "/images/brand.png",
      ]}
      classNames={{
        itemClassName: "brands",
      }}
    />
  );
}
