"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FilterSheet } from "./components/FilterSheet";
import { SortSheet } from "./components/SortSheet";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { IShop } from "@/types";
import { Pagination } from "@/components/Pagination";
import { Header } from "@/components/Header";
import { createClientAxiosInstance } from "@/lib/utils";
import useCustomSearchParams from "@/hooks/useSearchParams";
import { SearchInput } from "@/components/Search";
import { Link } from "@/i18n/routing";

export default function Brands() {
  return (
    <main>
      <Header />
      <BrandsContent />
    </main>
  );
}
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
const BrandsContent = () => {
  const t = useTranslations("brands");
  const [shops, setShops] = useState<IShop[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { searchParams } = useCustomSearchParams();
  useEffect(() => {
    const fetchShops = async () => {
      setIsLoading(true);
      try {
        const axiosInstance = await createClientAxiosInstance();
        const search: Record<string, unknown> = {};
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
    fetchShops();
  }, [searchParams]);
  return (
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
          shops.map((shop, index) => (
            <Link
              href={`/brands/${shop.id}`}
              key={index}
              className="border rounded-[8%] overflow-hidden"
            >
              <Image
                src={shop.background_image}
                alt={shop.shop_name}
                width={800}
                height={533}
                className="w-full transition-all object-cover brand"
              />
              <div className="py-3 px-4 flex items-start justify-between">
                <div>
                  <h3 className="text-2xl">{shop.shop_name}</h3>
                  <p className="text-xs pt-2 ps-4 text-foreground/50">
                    {shop.branches === 1
                      ? t("oneBranch")
                      : shop.branches === 2
                      ? t("twoBranches")
                      : t("nBranches", {
                          count: shop.branches,
                        })}
                  </p>
                  {/* <p className="text-xs py-2 ps-4 text-foreground/50">
                    أقرب فرع لك شبرا
                  </p> */}
                </div>
                <div className="flex gap-1 items-center fill-background text-background bg-gold w-fit px-2 py-1.5 rounded-full text-xs">
                  {shop.rate}{" "}
                  <svg
                    width={10}
                    height={10}
                    viewBox="0 0 10 10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1.9125 9.625L2.725 6.40521L0 4.23958L3.6 3.95312L5 0.916664L6.4 3.95312L10 4.23958L7.275 6.40521L8.0875 9.625L5 7.91771L1.9125 9.625Z" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
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
  );
};
