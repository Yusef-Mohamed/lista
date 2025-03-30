"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ICategory, IProduct } from "@/types";
import { cn, createClientAxiosInstance } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ProductCard, { ProductSkeletonCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCategoryDisplayProps {
  categoriesArray: ICategory[];
  shop_id: string;
  hasOffer: boolean;
  offers?: {
    isLoading: boolean;
    totalPages: number;
    currentPage: number;
    data: IProduct[];
    hasError: boolean;
  };
}

const ProductCategoryDisplay = ({
  categoriesArray,
  shop_id,
  hasOffer,
  offers,
}: ProductCategoryDisplayProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("offers");
  const [categoriesApi, setCategoriesApi] = useState<CarouselApi>();
  const [productsApi, setProductsApi] = useState<CarouselApi>();
  const [productsByCategory, setProductsByCategory] = useState<{
    [key: string]: {
      isLoading: boolean;
      totalPages: number;
      currentPage: number;
      data: IProduct[];
      hasError: boolean;
    };
  }>(hasOffer && offers ? { offers: offers } : {});
  const text = useTranslations("brands");
  const categoryIds = useMemo(() => {
    return hasOffer
      ? ["offers", ...categoriesArray.map((cat) => cat.id.toString())]
      : [...categoriesArray.map((cat) => cat.id.toString())];
  }, [categoriesArray, hasOffer]);

  useEffect(() => {
    if (!productsApi || !categoriesApi) return;

    const onProductSelect = () => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      const index = productsApi.selectedScrollSnap();
      const categoryId = categoryIds[index];
      setSelectedCategory(categoryId);
      categoriesApi.scrollTo(index);

      if (
        !productsByCategory[categoryId]?.data &&
        !productsByCategory[categoryId]?.hasError
      ) {
        fetchProductsForCategory(categoryId, 1); // Start with page 1
      }
    };

    productsApi.on("select", onProductSelect);
    onProductSelect(); // Initial sync

    return () => {
      productsApi.off("select", onProductSelect);
    };
  }, [productsApi, categoriesApi, categoryIds, productsByCategory]);

  const fetchProductsForCategory = async (categoryId: string, page: number) => {
    if (productsByCategory[categoryId]?.isLoading) return;

    try {
      setProductsByCategory((prev) => ({
        ...prev,
        [categoryId]: prev[categoryId]
          ? {
              ...prev[categoryId],
              isLoading: true,
            }
          : {
              isLoading: true,
              totalPages: 10, // Static total pages for now
              currentPage: page,
              data: [],
              hasError: false,
            },
      }));

      const axiosInstance = await createClientAxiosInstance();
      const res = await axiosInstance.get(
        `/shop-products/${shop_id}?page=${page}${
          categoryId !== "offers"
            ? `&product_category_id=${categoryId}`
            : "&has_offer=1"
        }&perPage=16`
      );

      const { data, totalPages } = res.data;

      setProductsByCategory((prev) => ({
        ...prev,
        [categoryId]: {
          isLoading: false,
          totalPages: totalPages || 1, // Static total pages for now
          currentPage: page,
          data: data, // Replace old data with new page's products
          hasError: false,
        },
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductsByCategory((prev) => ({
        ...prev,
        [categoryId]: {
          ...prev[categoryId],
          isLoading: false,
          hasError: true,
        },
      }));
    }
  };

  const handleCategoryClick = (categoryId: string, index: number) => {
    setSelectedCategory(categoryId);
    productsApi?.scrollTo(index);

    if (
      !productsByCategory[categoryId]?.data &&
      !productsByCategory[categoryId]?.hasError
    ) {
      fetchProductsForCategory(categoryId, 1); // Start with page 1
    }
  };
  const topRef = useRef<HTMLHeadingElement | null>(null);

  const handlePageChange = (categoryId: string, direction: "prev" | "next") => {
    const currentCategory = productsByCategory[categoryId];
    if (!currentCategory) return;

    const newPage =
      direction === "prev"
        ? currentCategory.currentPage - 1
        : currentCategory.currentPage + 1;

    if (newPage < 1 || newPage > currentCategory.totalPages) return;

    fetchProductsForCategory(categoryId, newPage);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const selectedCategoryText = useMemo(() => {
    return selectedCategory === "offers"
      ? text("offers")
      : categoriesArray.find((e) => e.id.toString() === selectedCategory)
          ?.title || "";
  }, [text, selectedCategory, categoriesArray]);
  return (
    <div className="w-full overflow-hidden">
      <Carousel
        setApi={setCategoriesApi}
        opts={{
          dragFree: true,
          align: "start",
          skipSnaps: true,
        }}
        className="w-full mb-5 sm:mb-6 md:mb-8"
      >
        <CarouselContent>
          {categoryIds.map((categoryId, index) => (
            <CarouselItem
              key={categoryId}
              className="basis-1/3 sm:basis-1/4 md:basis-1/5 px-4"
            >
              <button
                onClick={() => handleCategoryClick(categoryId, index)}
                className="w-full"
              >
                <div
                  className={cn(
                    "w-full transition-all  flex items-center justify-center aspect-square rounded-3xl",
                    {
                      "bg-foreground": selectedCategory === categoryId,
                      "bg-background": selectedCategory !== categoryId,
                    }
                  )}
                >
                  {(categoryId === "offers"
                    ? "/images/offer.png"
                    : categoriesArray.find(
                        (cat) => cat.id.toString() === categoryId
                      )?.image || "") && (
                    <Image
                      src={
                        categoryId === "offers"
                          ? "/images/offer.png"
                          : categoriesArray.find(
                              (cat) => cat.id.toString() === categoryId
                            )?.image || ""
                      }
                      alt="category"
                      width={100}
                      height={100}
                      className="w-[70%] aspect-square object-contain "
                    />
                  )}
                </div>
                <p
                  className={cn("mt-2 transition-all", {
                    "text-primary": selectedCategory === categoryId,
                  })}
                >
                  {categoryId === "offers"
                    ? text("offers")
                    : categoriesArray.find(
                        (cat) => cat.id.toString() === categoryId
                      )?.title || ""}
                </p>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <h2 ref={topRef} className="h3 lg:mb-8 mb-6">
        {selectedCategoryText}
      </h2>

      <Carousel
        setApi={setProductsApi}
        opts={{
          dragFree: false,
          containScroll: "keepSnaps",
          align: "start",
          skipSnaps: false,
        }}
        className="w-full"
      >
        <CarouselContent>
          {categoryIds.map((categoryId, index) => (
            <CarouselItem key={index} className="w-full">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {productsByCategory[categoryId]?.isLoading &&
                  Array.from({ length: 8 }).map((_, ind) => (
                    <ProductSkeletonCard key={ind} />
                  ))}
                {!productsByCategory[categoryId]?.isLoading &&
                  productsByCategory[categoryId]?.hasError && (
                    <div className="col-span-full flex justify-center items-center py-8 text-red-500">
                      <span>{text("someThingWentWrong")}</span>
                    </div>
                  )}
                {!productsByCategory[categoryId]?.isLoading &&
                  !productsByCategory[categoryId]?.hasError &&
                  (productsByCategory[categoryId]?.data.length ? (
                    productsByCategory[categoryId]?.data?.map((product) => (
                      <ProductCard product={product} key={product.id} />
                    ))
                  ) : (
                    <div className="col-span-full flex justify-center items-center py-8">
                      <span>{text("noProductsFoundInThisCategory")}</span>
                    </div>
                  ))}
              </div>

              {productsByCategory[categoryId]?.totalPages > 1 && (
                <div
                  dir="ltr"
                  className="flex items-center justify-center gap-2 my-8 mx-auto w-fit"
                >
                  <Button
                    onClick={() => handlePageChange(categoryId, "prev")}
                    size="icon"
                    variant="outline"
                    disabled={productsByCategory[categoryId].currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <span key={index} className="px-2 ">
                    {productsByCategory[categoryId].currentPage}
                  </span>
                  <Button
                    onClick={() => handlePageChange(categoryId, "next")}
                    size="icon"
                    variant="outline"
                    disabled={
                      productsByCategory[categoryId].currentPage ===
                      productsByCategory[categoryId].totalPages
                    }
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ProductCategoryDisplay;
