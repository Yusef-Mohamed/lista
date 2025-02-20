"use client";
import useCustomSearchParams from "@/hooks/useSearchParams";
import { cn } from "@/lib/utils";
import { IProduct } from "@/types";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ProductCard = ({ product }: { product: IProduct }) => {
  const { setSearchParams } = useCustomSearchParams();
  const text = useTranslations("brands");

  return (
    <button
      onClick={() => setSearchParams({ product: product.id.toString() })}
      key={product.id}
      className="relative"
    >
      {product.is_hot === 1 && (
        <div
          style={{
            background: "linear-gradient(180deg, #D30006 0%, #ED1C25 100%)",
          }}
          className={cn(
            "sm:w-16 w-12 z-10 absolute top-0  right-0 sm:text-xl text-base text-white aspect-square flex rounded-full items-center justify-center font-bold"
          )}
        >
          <span>HOT</span>
        </div>
      )}{" "}
      {Number(product.is_recommended) === 1 && (
        <div
          style={{
            background: "linear-gradient(180deg, #FF8B16 0%, #FFB200 100%)",
          }}
          className={cn(
            "sm:w-16 w-12 z-10 absolute top-0  right-0 sm:text-xl text-base text-white aspect-square flex rounded-full items-center justify-center font-bold"
          )}
        >
          <span>NEW</span>
        </div>
      )}
      <div
        style={{
          height: "calc(100% - 2rem)",
        }}
        className="absolute w-full bg-background z-0 rounded-3xl bottom-0 right-0"
      />
      <div className="p-4 pt-0 space-y-4 relative">
        <Image
          src={product.image}
          alt={product.name}
          className="object-cover w-full aspect-square rounded-xl"
          width={400}
          height={400}
        />

        <div className="space-y-2">
          <h5 className="line-clamp-2 text-lg ">{product.name}</h5>
          <div className="flex items-center gap-2">
            {product.discount_price ? (
              <>
                {" "}
                <p className="text-lg font-semibold">
                  {Number(product.price) - Number(product.discount_price)}{" "}
                  {text("egp")}
                </p>
                <p className="text-sm text-muted-foreground line-through">
                  {product.price} {text("egp")}
                </p>
              </>
            ) : (
              <p className="font-bold">
                {product.price} {text("egp")}
              </p>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
