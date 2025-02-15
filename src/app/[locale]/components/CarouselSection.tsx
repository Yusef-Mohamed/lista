"use client";
import SectionHeader from "@/components/SectionHeader";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { Skeleton } from "@/components/ui/skeleton";
export function CarouselSection({
  classNames: { itemClassName } = {
    itemClassName: "",
  },
  title,
  href,
  items,
  isLoading,
}: {
  classNames: {
    itemClassName?: string;
  };
  title: string;
  href?: string;
  items: { image: string; link?: string }[];
  isLoading?: boolean;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <section className="sectionPadding">
      <SectionHeader title={title} link={href} />
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent>
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                className={cn(
                  "md:px-2 px-1 md:basis-[40%]  basis-[65%] sm:basis-[60%] xl:basis-1/3"
                )}
                key={index}
              >
                <Skeleton
                  className={cn(
                    "w-full transition-all rounded-xl",
                    {
                      "max-lg:scale-90": current !== index + 1,
                    },
                    itemClassName
                  )}
                />
              </CarouselItem>
            ))}
          {!isLoading &&
            items.map((item, index) => (
              <CarouselItem
                className={cn(
                  "md:px-2 px-1 md:basis-[40%]  basis-[65%] sm:basis-[60%] xl:basis-1/3"
                )}
                key={index}
              >
                {item.link ? (
                  <Link href={item.link}>
                    <Image
                      src={item.image}
                      alt="Brand"
                      width={800}
                      height={533}
                      className={cn(
                        "w-full transition-all object-cover h-auto rounded-xl",
                        {
                          "max-lg:scale-90": current !== index + 1,
                        },
                        itemClassName
                      )}
                    />
                  </Link>
                ) : (
                  <Image
                    src={item.image}
                    alt="Brand"
                    width={800}
                    height={533}
                    className={cn(
                      "w-full transition-all rounded-xl",
                      {
                        "max-lg:scale-90": current !== index + 1,
                      },
                      itemClassName
                    )}
                  />
                )}
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
