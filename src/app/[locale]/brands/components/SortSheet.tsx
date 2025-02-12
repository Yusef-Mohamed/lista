"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import useCustomSearchParams from "@/hooks/useSearchParams";
import { useTranslations } from "next-intl";
import { ArrowDownUp, Check } from "lucide-react";
const values = ["nearest", "rating", "a_to_z"];
const SortSheetComponent = () => {
  const { setSearchParams, searchParams } = useCustomSearchParams();
  const t = useTranslations("brands");

  return (
    <div className="sm:space-y-8 sm:mt-8 mt-6 space-y-6">
      <div>
        <h3 className="font-medium h4 mb-2">{t("sortBy")}</h3>
        <div className="flex items-center flex-wrap gap-2 mt-4 sm:mt-6">
          {values.map((value) => (
            <Button
              onClick={() => {
                setSearchParams({ sort: value });
              }}
              key={value}
              variant={
                searchParams.get("sort") === value ? "default" : "outline"
              }
              className="flex-grow"
            >
              {searchParams.get("sort") === value ? <Check /> : ""}
              {t(value)}
            </Button>
          ))}
        </div>
      </div>

      {/* Sort Order */}
      <div>
        <h3 className="font-medium h4 mb-2">{t("sortOrder")}</h3>
        <div className="flex items-center flex-wrap gap-2 mt-4 sm:mt-6">
          {["desc", "asc"].map((value) => (
            <Button
              onClick={() => {
                setSearchParams({ sort_by: value });
              }}
              key={value}
              variant={
                searchParams.get("sort_by") === value ? "default" : "outline"
              }
              className="flex-grow"
            >
              {searchParams.get("sort_by") === value ? <Check /> : ""}
              {t(value)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export function SortSheet() {
  const t = useTranslations("brands");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="forground" size={"icon"}>
          <ArrowDownUp />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-h-full overflow-auto">
        <SheetHeader>
          <SheetTitle>{t("sortShops")}</SheetTitle>
        </SheetHeader>
        <SortSheetComponent />
      </SheetContent>
    </Sheet>
  );
}
