import { useTranslations } from "next-intl";
import { CarouselSection } from "./CarouselSection";
export function NeerToYou() {
  const text = useTranslations("neerToYou");

  return (
    <CarouselSection
      title={text("title")}
      href="/brands/neer-to-you"
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
