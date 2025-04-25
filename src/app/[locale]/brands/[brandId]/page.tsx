import { Header } from "@/components/Header";
import { cachedServerFetch } from "@/lib/serverUtils";
import { ICategory, IProduct, IShop } from "@/types";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import ProductCategoryDisplay from "./components/ProductCategoryDisplay";
import ProductCard from "@/components/ProductCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
export async function generateMetadata({
  params,
}: {
  params: { brandId: string };
}) {
  const { brandId } = await params;
  const brand = (await getBrand(brandId)) as IShop | undefined;

  return {
    title: brand?.shop_name,
    description: brand?.shop_description,
  };
}
const getBrand = async (brandId: string) => {
  try {
    const res = await cachedServerFetch(`/shops/${brandId}`);
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
const getCategories = async (brandId: string) => {
  try {
    const res = await cachedServerFetch(
      `/product-categories?shop_id=${brandId}`
    );
    return res.data.reverse() as ICategory[];
  } catch (e) {
    console.log(e);
    return [];
  }
};
const getProductsOffers = async (brandId: string) => {
  try {
    const res = await cachedServerFetch(
      `/shop-products/${brandId}?&has_offer=1&perPage=16`
    );
    return res;
  } catch (e) {
    console.log(e);
    return {
      totalPages: 1,
      data: [],
    };
  }
};

export default async function Brand({
  params,
  searchParams,
}: {
  params: { brandId: string };
  searchParams: { product?: string };
}) {
  const { brandId } = await params;
  const brand = (await getBrand(brandId)) as IShop;
  const categoriesArray = (await getCategories(brandId)) as ICategory[];
  const t = await getTranslations("brands");
  const { product } = await searchParams;
  const offers = (await getProductsOffers(brandId)) as {
    totalPages: number;
    data: IProduct[];
  };
  console.log(brand, "brand");
  return (
    <main>
      <Header />
      <section
        className="px-4 max-w-4xl mb-4 mx-auto"
        style={{
          userSelect: "none",
        }}
      >
        {product ? (
          <>
            <DisplayProduct product={product} shop_id={brandId} />
          </>
        ) : (
          <>
            {brand ? (
              <>
                <div className="flex items-end mb-5 sm:mb-6 md:mb-8 justify-between">
                  <div className="basis-1/3">
                    <div className="w-fit">
                      <Dialog>
                        <DialogTrigger className="flex w-full gap-1 items-center justify-between mb-2 text-forgfill-foreground bg-background px-2 py-1.5 rounded-full text-xs">
                          {t("branches")}
                          <svg
                            width="13"
                            height="11"
                            viewBox="0 0 13 11"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.1 5.79252C1.346 5.96051 1.676 6.0416 2 6.0416C2.33 6.0416 2.654 5.96051 2.9 5.79252C3.272 5.52607 3.5 5.1148 3.5 4.63402C3.5 5.1148 3.722 5.52607 4.1 5.79252C4.346 5.96051 4.676 6.0416 5 6.0416C5.33 6.0416 5.654 5.96051 5.9 5.79252C6.272 5.52607 6.5 5.1148 6.5 4.63402C6.5 5.1148 6.722 5.52607 7.1 5.79252C7.346 5.96051 7.676 6.0416 8.006 6.0416C8.33 6.0416 8.654 5.96051 8.9 5.79252C9.272 5.52607 9.5 5.1148 9.5 4.63402C9.5 5.1148 9.722 5.52607 10.1 5.79252C10.346 5.96051 10.676 6.0416 11 6.0416C11.33 6.0416 11.654 5.96051 11.9 5.79252C12.278 5.52607 12.5 5.1148 12.5 4.63402V4.05477L10.7 0H2.9L0.5 4.05477V4.63402C0.5 5.1148 0.722 5.52607 1.1 5.79252ZM2.3 11H5.3V8.10374H7.7V11H10.7V6.94523C10.478 6.91627 10.268 6.8178 10.1 6.69616C9.722 6.43549 9.5 6.2733 9.5 5.79252C9.5 6.2733 9.272 6.43549 8.9 6.69616C8.654 6.86993 8.33 6.94523 8.006 6.95103C7.676 6.95103 7.346 6.86993 7.1 6.69616C6.722 6.43549 6.5 6.2733 6.5 5.79252C6.5 6.2733 6.272 6.43549 5.9 6.69616C5.654 6.86993 5.33 6.94523 5 6.95103C4.676 6.95103 4.346 6.86993 4.1 6.69616C3.722 6.43549 3.5 6.2733 3.5 5.78673C3.5 6.2733 3.272 6.43549 2.9 6.69616C2.726 6.8178 2.522 6.91627 2.3 6.95103V11Z"
                              className="fill-foreground"
                            />
                          </svg>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader className="hidden">
                            <DialogTitle>
                              {t("branches")} {brand.shop_name}
                            </DialogTitle>
                          </DialogHeader>
                          <ul className="mt-2 divide-y">
                            {[
                              {
                                id: 6000,
                                title: brand?.address,
                                lat: brand?.address_lat,
                                lng: brand?.address_lng,
                                address: brand?.address,
                              },
                              ...brand?.branch_address,
                            ]?.map((branch) => (
                              <li key={branch.id}>
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${branch.lat},${branch.lng}`}
                                  className="py-2 flex items-center justify-between"
                                  target="_blank"
                                >
                                  <div>
                                    <h3 className="h5">
                                      {branch.id === 6000
                                        ? t("mainBranch")
                                        : branch.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {branch.id === 6000
                                        ? branch.title
                                        : branch.address}
                                    </p>
                                  </div>
                                  <Send />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger className="flex gap-1 items-center text-forgfill-foreground bg-background w-fit px-2 py-1.5 rounded-full text-xs">
                          {t("phoneNumber")}
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 11 11"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.458265 0.916672H4.39077L5.07231 3.98292L4.21981 4.83542C4.72105 5.61552 5.3843 6.27861 6.16452 6.77967L7.01702 5.92763L10.0833 6.60917V10.5417H9.62493C7.8605 10.5447 6.13307 10.0358 4.65202 9.07684C3.55991 8.37007 2.62987 7.44003 1.9231 6.34792C0.964092 4.86686 0.455257 3.13944 0.458265 1.37501V0.916672Z"
                              className="fill-foreground"
                            />
                          </svg>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader className="hidden">
                            <DialogTitle>{t("phoneNumber")}</DialogTitle>
                          </DialogHeader>
                          <ul className="mt-2 divide-y">
                            {[
                              {
                                id: 6000,
                                title: brand?.address,
                                lat: brand?.address_lat,
                                lng: brand?.address_lng,
                                address: brand?.address,
                                phone: brand?.shop_phone,
                              },
                              ...brand?.branch_address,
                            ]?.map((branch) =>
                              !branch.phone ? null : (
                                <li key={branch.id}>
                                  <a
                                    href={`tel:${branch.phone}`}
                                    className="py-2 flex items-center justify-between"
                                    target="_blank"
                                  >
                                    <div>
                                      <h3 className="h5">
                                        {branch.id === 6000
                                          ? t("mainBranch")
                                          : branch.title}
                                      </h3>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {branch.id === 6000
                                          ? brand.shop_phone
                                          : branch.phone}
                                      </p>
                                    </div>
                                    <Phone />
                                  </a>
                                </li>
                              )
                            )}
                          </ul>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <Image
                    src={brand.logo_white}
                    alt={brand.shop_name}
                    width={800}
                    height={800}
                    className="w-full sm:max-w-64 max-w-32 basis-1/3 mx-auto transition-all object-contain aspect-square"
                  />
                  <div className="basis-1/3 flex items-center justify-end">
                    {brand.rate ? (
                      <div className="flex  gap-1 items-center fill-background text-background bg-gold w-fit px-2 py-1.5 rounded-full text-xs">
                        {brand.rate}{" "}
                        <svg
                          width={10}
                          height={10}
                          viewBox="0 0 10 10"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1.9125 9.625L2.725 6.40521L0 4.23958L3.6 3.95312L5 0.916664L6.4 3.95312L10 4.23958L7.275 6.40521L8.0875 9.625L5 7.91771L1.9125 9.625Z" />
                        </svg>
                      </div>
                    ) : null}
                  </div>
                </div>
                <ProductCategoryDisplay
                  categoriesArray={categoriesArray}
                  hasOffer={offers.data?.length > 0}
                  offers={{
                    currentPage: 1,
                    data: offers.data,
                    hasError: false,
                    isLoading: false,
                    totalPages: offers.totalPages,
                  }}
                  shop_id={brandId}
                />
              </>
            ) : (
              <h1 className="h2 text-center py-12">
                {t("canNotFindThisBrand")}
              </h1>
            )}
          </>
        )}
      </section>
    </main>
  );
}
const DisplayProduct = async ({
  product,
  shop_id,
}: {
  product: string;
  shop_id: string;
}) => {
  const t = await getTranslations("brands");

  // Fetch the specific product details
  const thisProduct = await getProductDetails(product);
  if (!thisProduct) {
    return (
      <div className="text-center font-semibold ">
        {t("canNotFindThisProduct")}
      </div>
    );
  }

  // Fetch recommended products for the shop
  const recommendedProducts = await getRecommendedProducts(shop_id);

  // Ensure unique recommended products based on ID
  const recommendedProductsArray = Array.from(
    new Set(recommendedProducts.map((p: IProduct) => p.id))
  ).map((id) => recommendedProducts.find((p: IProduct) => p.id === id));

  return (
    <>
      <div className="sm:max-w-80 max-w-60 mx-auto mb-8 relative">
        <Image
          src={thisProduct.image}
          alt={thisProduct.name}
          className="object-cover w-full mb-4 aspect-square rounded-xl"
          width={400}
          height={400}
        />
        {thisProduct.is_hot === 1 && (
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
        {Number(thisProduct.is_recommended) === 1 && (
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
        <h1 className="h3 mb-1">{thisProduct.name}</h1>
        <h2 className="h4 mb-6">{thisProduct.description}</h2>
        <div className="space-y-4">
          <div className="font-bold flex items-center justify-center mx-auto w-fit px-4 py-2 rounded-md bg-background">
            {thisProduct.discount_price
              ? Number(thisProduct.price) - Number(thisProduct.discount_price)
              : thisProduct.price}{" "}
            {t("egp")}
          </div>{" "}
          {thisProduct.prices.map((price) => (
            <div
              key={price.title}
              className=" mx-auto w-fit px-3 py-1 rounded-md bg-background space-y-1"
            >
              <div className="font-bold text-sm flex items-center justify-center">
                {price.price} {t("egp")}
              </div>
              <div className="text-xs font-bold text-center">{price.title}</div>
            </div>
          ))}
        </div>
      </div>
      {recommendedProductsArray?.length ? (
        <>
          <h2 className="h3 lg:mb-8 mb-6">{t("similarProducts")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendedProductsArray.map((product) =>
              product ? (
                <ProductCard product={product} key={product.id} />
              ) : null
            )}
          </div>
        </>
      ) : null}
    </>
  );
};

// Function to fetch product details
const getProductDetails = async (
  productId: string
): Promise<IProduct | null> => {
  try {
    const res = await cachedServerFetch(`/product/${productId}`);
    return res.data as IProduct;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

// Function to fetch recommended products
const getRecommendedProducts = async (shopId: string): Promise<IProduct[]> => {
  try {
    const res = await cachedServerFetch(
      `/shop-products/${shopId}?is_recommended=1`
    );
    return res.data as IProduct[];
  } catch (error) {
    console.error("Error fetching recommended products:", error);
    return [];
  }
};
