"use client";
import { useTranslations } from "next-intl";
import { CarouselSection } from "./CarouselSection";
import { useEffect, useState } from "react";
import { IShop } from "@/types";
import { useLocation } from "@/components/LocationContext";
import { createClientAxiosInstance } from "@/lib/utils";
export function NeerToYou({ loading }: { loading?: boolean }) {
  const text = useTranslations("neerToYou");
  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState<IShop[]>([]);
  const { location, status } = useLocation();
  useEffect(() => {
    const getBrands = async () => {
      if (loading) return;
      setIsLoading(true);
      try {
        const axiosInstance = await createClientAxiosInstance();
        const res = await axiosInstance.post("/shops", {
          sort: "nearest",
          sort_by: "asc",
          lat: location?.latitude,
          lng: location?.longitude,
        });
        setBrands(res.data.data);
      } catch (error) {
        console.error(error);
        setBrands([]);
      }
      setIsLoading(false);
    };
    if (status !== "prompt") {
      getBrands();
    }
  }, [status, location, loading]);
  return (
    <CarouselSection
      title={text("title")}
      href="/brands?sort_by=asc&sort=nearest"
      items={
        isLoading
          ? []
          : brands.map((brand) => ({
              image: brand.brand_image,
              link: `/brands/${brand.id}`,
            }))
      }
      isLoading={isLoading || loading}
      classNames={{
        itemClassName: "brand",
      }}
    />
  );
}
