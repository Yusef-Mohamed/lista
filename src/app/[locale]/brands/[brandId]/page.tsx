import { Header } from "@/components/Header";
import { cachedServerFetch } from "@/lib/serverUtils";
import { ICategory, IProduct, IShop } from "@/types";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import ProductCategoryDisplay from "./components/ProductCategoryDisplay";
import ProductCard from "@/components/ProductCard";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin } from "lucide-react";
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

const getProducts = async (brandId: string) => {
  try {
    const res = await cachedServerFetch(`/shop-products/${brandId}`);
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
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
  const products = (await getProducts(brandId)) as IProduct[];
  const t = await getTranslations("brands");
  const categoriesMap: { [key: number]: IProduct["categories"][number] } = {};
  const productsByCategory: { [key: string]: IProduct[] } = {};
  if (products) {
    productsByCategory["offers"] = [];
    for (const product of products) {
      if (product.discount_price) {
        productsByCategory["offers"].push(product);
      }
      if (product?.categories) {
        for (const category of product.categories) {
          if (!categoriesMap[category.id]) {
            categoriesMap[category.id] = category;
          }
          const categoryId = category.id.toString();
          if (!productsByCategory[categoryId]) {
            productsByCategory[categoryId] = [];
          }
          productsByCategory[categoryId].push(product);
        }
      }
    }
  }

  const categoriesArray = Object.values(categoriesMap) as ICategory[];
  const { product } = await searchParams;
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
            <DisplayProduct
              product={product}
              products={products}
              productsByCategory={productsByCategory}
            />
          </>
        ) : (
          <>
            {brand ? (
              <>
                {/* <div className="flex items-center justify-between">
              <h1 className="h3 mb-4">{brand.shop_name}</h1>
              <Link href={`/${brand.shop_id}/branches`}>
                {locale === "ar" ? <MoveLeft /> : <MoveRight />}
              </Link>
            </div> */}
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
                            {brand?.branch_address?.map((branch) => (
                              <li key={branch.id}>
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${branch.lat},${branch.lng}`}
                                  className="py-2 flex items-center justify-between"
                                  target="_blank"
                                >
                                  <h3 className="h4">{branch.title}</h3>
                                  <MapPin />
                                </a>{" "}
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
                          <div className="mt-4">
                            <a
                              href={`tel:${brand.shop_phone}`}
                              className="text-lg font-semibold hover:underline"
                            >
                              {brand.shop_phone}
                            </a>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <Image
                    src={brand.brand_image}
                    alt={brand.shop_name}
                    width={800}
                    height={800}
                    className="w-full sm:max-w-64 max-w-32 basis-1/3 mx-auto transition-all object-cover aspect-square"
                  />
                  <div className="basis-1/3 flex items-center justify-end">
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
                  </div>
                </div>
                <ProductCategoryDisplay
                  categoriesArray={categoriesArray}
                  productsByCategory={productsByCategory}
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
const DisplayProduct = ({
  product,
  products,
  productsByCategory,
}: {
  product: string;
  products: IProduct[];
  productsByCategory: { [key: string]: IProduct[] };
}) => {
  const thisProduct = products.find((p) => p.id.toString() === product);
  const t = useTranslations("brands");

  if (!thisProduct)
    return (
      <h1 className="h2 text-center py-12">{t("canNotFindThisProduct")}</h1>
    );
  const recommendedProducts =
    thisProduct?.categories?.reduce((acc, category) => {
      return acc.concat(productsByCategory[category.id.toString()]);
    }, [] as IProduct[]) || [];
  // i want to make recommended products have no repeated products objects make the id unique
  const recommendedProductsArray = Array.from(
    new Set(recommendedProducts.map((a) => a.id))
  ).map((id) => {
    return recommendedProducts.find((a) => a.id === id);
  });

  return (
    <>
      <div className="sm:max-w-80 max-w-60 mx-auto mb-8">
        <Image
          src={thisProduct.image}
          alt={thisProduct.name}
          className="object-cover w-full mb-4 aspect-square rounded-xl"
          width={400}
          height={400}
        />
        <h1 className="h3 mb-1">{thisProduct.name}</h1>
        <h2 className="h4 mb-6">{thisProduct.description}</h2>
        <div className="font-bold flex items-center justify-center mx-auto w-fit px-4 py-2 rounded-md bg-background">
          {thisProduct.discount_price
            ? Number(thisProduct.price) - Number(thisProduct.discount_price)
            : thisProduct.price}{" "}
          {t("egp")}
        </div>
      </div>
      <h2 className="h3 lg:mb-8 mb-6">{t("similarProducts")}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendedProductsArray.map((product) =>
          product ? <ProductCard product={product} key={product.id} /> : null
        )}
      </div>
    </>
  );
};
