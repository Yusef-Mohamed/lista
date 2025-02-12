import { useTranslations } from "next-intl";
import { CarouselSection } from "./CarouselSection";
export function Brands() {
  const text = useTranslations("brands");

  return (
    <CarouselSection
      title={text("title")}
      href="/brands"
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
