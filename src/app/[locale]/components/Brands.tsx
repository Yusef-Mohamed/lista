import { useTranslations } from "next-intl";
import { CarouselSection } from "./CarouselSection";
export function Brands({
  brands,
  loading,
}: {
  brands: {
    shop_id: number;
    image: string;
  }[];
  loading?: boolean;
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
      isLoading={loading}
    />
  );
}
