"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";

export function Banner({
  banners,
}: {
  banners: { shop_id: number; image: string }[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="relative">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem className="px-4" key={banner.shop_id}>
              <Link
                href={`/brands/${banner.shop_id}`}
                className="rounded-xl block overflow-hidden relative"
              >
                <Image
                  src={banner.image}
                  alt="Banner"
                  width={1400}
                  height={700}
                  className="banner w-full object-cover"
                />
                <div
                  style={{
                    background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 49.73%, #000000 100%)`,
                  }}
                  className="absolute inset-0 z-10"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>{" "}
      </Carousel>{" "}
      <div className="absolute z-10 right-0 flex justify-center w-full gap-4 bottom-5">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`sm:h-4 h-2 transition-all rounded-full ${
              index === current - 1
                ? "bg-muted-foreground aspect-[2/1]"
                : "bg-muted-foreground/30 aspect-square"
            }`}
            onClick={() => api?.scrollTo(index)}
          ></button>
        ))}
      </div>
    </section>
  );
}
