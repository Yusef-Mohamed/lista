"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import useCustomSearchParams from "@/hooks/useSearchParams";
import { Check, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { createClientAxiosInstance } from "@/lib/utils";
import { ICategory } from "@/types";

export function FilterSheet() {
  const t = useTranslations("brands");
  const { setSearchParams, getSearchParam } = useCustomSearchParams();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isFetchingCategories, setIsFetchingCategories] = useState(false);
  useEffect(() => {
    const fetchShops = async () => {
      setIsFetchingCategories(true);
      try {
        const axiosInstance = await createClientAxiosInstance();

        const res = await axiosInstance.get("/shop-categories");
        const data = res.data;
        setCategories(data.data as ICategory[]);
      } catch {
        setCategories([]);
      }
      setIsFetchingCategories(false);
    };
    fetchShops();
  }, []);
  const getIsSelected = (key: string, value: string) => {
    const selectedValues = getSearchParam(key);
    return selectedValues?.split(",").includes(value);
  };
  const handelMultiSelectChange = (key: string, value: string) => {
    const selectedValues = getSearchParam(key);
    let newValues = selectedValues?.split(",") || [];
    if (newValues.includes(value)) {
      newValues = newValues.filter((v) => v !== value);
    } else {
      newValues.push(value);
    }
    setSearchParams({ [key]: newValues.join(",") });
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="forground" size={"icon"}>
          <Filter />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-h-full overflow-auto">
        <SheetHeader>
          <SheetTitle>{t("filterShops")}</SheetTitle>
        </SheetHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">{t("categories")}</h3>
            <div className="flex items-center flex-wrap gap-2 mt-4 sm:mt-6">
              {!isFetchingCategories &&
                categories.map((value) => (
                  <Button
                    onClick={() => {
                      handelMultiSelectChange(
                        "shop_categories",
                        value.id.toString()
                      );
                    }}
                    key={value.id}
                    variant={
                      getIsSelected("shop_categories", value.id.toString())
                        ? "default"
                        : "outline"
                    }
                    className="flex-grow"
                  >
                    {getIsSelected("shop_categories", value.id.toString()) ? (
                      <Check />
                    ) : (
                      ""
                    )}
                    {value.title}
                  </Button>
                ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">{t("rating")}</h3>
            <div className="flex items-center flex-wrap gap-2 mt-4 sm:mt-6">
              {[1, 2, 3, 4, 5].map((value) => (
                <Button
                  onClick={() => {
                    handelMultiSelectChange("rating", value.toString());
                  }}
                  key={value}
                  variant={
                    getIsSelected("rating", value.toString())
                      ? "default"
                      : "outline"
                  }
                  className="flex-grow"
                >
                  {getIsSelected("rating", value.toString()) ? <Check /> : ""}
                  {t(value + "Star")}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">{t("offers")}</h3>
            <div className="flex items-center flex-wrap gap-2 mt-4 sm:mt-6">
              {["1", "0"].map((value) => (
                <Button
                  onClick={() => {
                    setSearchParams({ has_offer: value });
                  }}
                  key={value}
                  variant={
                    getSearchParam("has_offer") === value.toString()
                      ? "default"
                      : "outline"
                  }
                  className="flex-grow"
                >
                  {getSearchParam("has_offer") === value.toString() ? (
                    <Check />
                  ) : (
                    ""
                  )}
                  {t(value === "1" ? "withOffers" : "withoutOffers")}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
