import { useTranslations } from "next-intl";
import { CarouselSection } from "./CarouselSection";
export function Brands({
  brands,
}: {
  brands: {
    shop_id: number;
    image: string;
  }[];
}) {
  const text = useTranslations("brands");

  return (
    <CarouselSection
      title={text("title")}
      href="/brands"
      items={brands.map((brand) => ({
        image: brand.image,
        link: `/brands/${brand.shop_id}`,
      }))}
      classNames={{
        itemClassName: "brand",
      }}
    />
  );
}
