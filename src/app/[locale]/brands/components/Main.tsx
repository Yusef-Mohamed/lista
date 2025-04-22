"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FilterSheet } from "./FilterSheet";
import { SortSheet } from "./SortSheet";
import { Skeleton } from "@/components/ui/skeleton";
import { IShop } from "@/types";
import { Pagination } from "@/components/Pagination";
import { createClientAxiosInstance } from "@/lib/utils";
import useCustomSearchParams from "@/hooks/useSearchParams";
import { SearchInput } from "@/components/Search";
import { useLocation } from "@/components/LocationContext";
import BrandCard from "@/components/BrandCard";
const searchKeys = [
  {
    key: "rating",
    isMulti: true,
  },
  { key: "sort_by", isMulti: false },
  { key: "sort", isMulti: false },
  { key: "has_offer", isMulti: false },
  { key: "search", isMulti: false },
  { key: "shop_categories", isMulti: true },
];
export default function Main() {
  const t = useTranslations("brands");
  const [shops, setShops] = useState<IShop[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { searchParams } = useCustomSearchParams();
  const { location, status } = useLocation();
  useEffect(() => {
    const fetchShops = async () => {
      setIsLoading(true);
      try {
        const axiosInstance = await createClientAxiosInstance();
        const search: Record<string, unknown> = {};
        search["get_all"] = true;
        if (searchParams.get("page")) search["page"] = searchParams.get("page");
        else search["page"] = 1;
        searchKeys.forEach((key) => {
          if (searchParams.get(key.key)) {
            if (key.isMulti) {
              search[key.key] = (searchParams.get(key.key) || "").split(",");
            } else {
              search[key.key] = searchParams.get(key.key);
            }
          }
        });
        if (search.sort === "nearest") {
          console.log(location);
          search["lat"] = location?.latitude;
          search["lng"] = location?.longitude;
        }
        const res = await axiosInstance.post("/shops", search);
        const data = res.data;
        setShops(data.data as IShop[]);
        setTotalPages(data.totalPages);
      } catch {
        setShops([]);
        setTotalPages(0);
      }
      setIsLoading(false);
    };
    if (status !== "prompt") fetchShops();
  }, [searchParams, location, status]);
  return (
    <div className="mb-4">
      <section className="px-4">
        <div className="lg:hidden">
          <SearchInput className="max-w-full" />
        </div>
        <div className="flex gap-2 mt-2 mb-4">
          <FilterSheet />
          <SortSheet />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading &&
            shops.map((shop) => <BrandCard key={shop.id} shop={shop} />)}
          {!isLoading && shops.length === 0 && (
            <p className="text-xl text-muted-foreground text-center lg:col-span-3 md:col-span-2">
              {t("noBrands")}
            </p>
          )}
          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="border rounded-[8%] overflow-hidden">
                <Skeleton className="w-full h-[200px]" />
                <div className="py-3 px-4">
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={Number(searchParams.get("page")) || 1}
        />
      </section>
    </div>
  );
}
