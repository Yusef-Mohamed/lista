"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ICategory, IProduct } from "@/types";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";

interface ProductCategoryDisplayProps {
  categoriesArray: ICategory[];
  productsByCategory: { [key: string]: IProduct[] };
}

const ProductCategoryDisplay = ({
  categoriesArray,
  productsByCategory,
}: ProductCategoryDisplayProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("offers");
  const [categoriesApi, setCategoriesApi] = useState<CarouselApi>();
  const [productsApi, setProductsApi] = useState<CarouselApi>();
  const text = useTranslations("brands");
  const categoryIds = useMemo(() => {
    return productsByCategory["offers"].length
      ? ["offers", ...categoriesArray.map((cat) => cat.id.toString())]
      : [...categoriesArray.map((cat) => cat.id.toString())];
  }, [categoriesArray, productsByCategory]);
  useEffect(() => {
    if (!productsApi || !categoriesApi) return;

    const onProductSelect = () => {
      const index = productsApi.selectedScrollSnap();
      const categoryId = categoryIds[index];
      setSelectedCategory(categoryId);
      categoriesApi.scrollTo(index);
    };
    productsApi.on("select", onProductSelect);
    onProductSelect(); // Initial sync
    return () => {
      productsApi.off("select", onProductSelect);
    };
  }, [productsApi, categoriesApi, categoryIds]);

  const categoryProducts = useMemo(() => {
    return productsByCategory["offers"].length === 0
      ? [
          ...categoriesArray.map(
            (cat) => productsByCategory[cat.id.toString()] || []
          ),
        ]
      : [
          productsByCategory["offers"],
          ...categoriesArray.map(
            (cat) => productsByCategory[cat.id.toString()] || []
          ),
        ];
  }, []);

  const handleCategoryClick = (categoryId: string, index: number) => {
    setSelectedCategory(categoryId);
    productsApi?.scrollTo(index);
  };

  return (
    <div className="w-full overflow-hidden">
      <Carousel
        setApi={setCategoriesApi}
        opts={{
          dragFree: false,
          align: "start",
          skipSnaps: false,
        }}
        className="w-full mb-5 sm:mb-6 md:mb-8"
      >
        <CarouselContent>
          {productsByCategory["offers"].length > 0 && (
            <CarouselItem className="basis-1/3 sm:basis-1/4 md:basis-1/5 px-4">
              <button
                onClick={() =>
                  handleCategoryClick("offers", categoryIds.length - 1)
                }
                className="w-full"
              >
                <div
                  className={cn(
                    "w-full transition-all flex items-center justify-center aspect-square  rounded-3xl",
                    {
                      "bg-foreground": selectedCategory === "offers",
                      "bg-background": selectedCategory !== "offers",
                    }
                  )}
                >
                  <Image
                    src={"/images/offer.png"}
                    alt="offer"
                    width={100}
                    height={100}
                    className="w-[70%]"
                  />
                </div>
                <p
                  className={cn("mt-2 transition-all", {
                    "text-primary": selectedCategory === "offers",
                  })}
                >
                  {text("offers")}
                </p>
              </button>
            </CarouselItem>
          )}

          {categoriesArray.map((category, index) => (
            <CarouselItem
              key={category.id}
              className="basis-1/3 sm:basis-1/4 md:basis-1/5 px-4"
            >
              <button
                onClick={() =>
                  handleCategoryClick(category.id.toString(), index + 1)
                }
                className="w-full"
              >
                <div
                  className={cn(
                    "w-full flex transition-all items-center justify-center aspect-square  rounded-3xl",
                    {
                      "bg-foreground":
                        selectedCategory === category.id.toString(),
                      "bg-background":
                        selectedCategory !== category.id.toString(),
                    }
                  )}
                >
                  <Image
                    src={category.image || ""}
                    alt="offer"
                    width={100}
                    height={100}
                    className="w-[70%]"
                  />
                </div>
                <p
                  className={cn("mt-2 transition-all", {
                    "text-primary": selectedCategory === category.id.toString(),
                  })}
                >
                  {category.title}
                </p>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

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
          {categoryProducts.map((products, index) => (
            <CarouselItem key={index} className="w-full">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ProductCategoryDisplay;
