import { Header } from "@/components/Header";
import { cachedServerFetch } from "@/lib/serverUtils";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
const getBrand = async (brandId: string) => {
  try {
    const res = await cachedServerFetch(`/shops/${brandId}`);
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
export default async function Brand({
  params,
}: {
  params: {
    brandId: string;
  };
}) {
  const { brandId } = await params;
  const brand = await getBrand(brandId);
  const t = await getTranslations("brands");
  console.log(brand);
  return (
    <main>
      <Header />
      <section className="px-4 max-w-4xl mx-auto">
        {brand ? (
          <>
            <div className="relative">
              <Image
                src={brand.brand_image}
                alt={brand.shop_name}
                width={800}
                height={800}
                className="w-full max-w-64 mx-auto  transition-all object-cover aspect-square"
              />
              <div className="flex justify-between">
                <div>phone here</div>
                <div className="flex gap-1 items-center fill-background text-background bg-gold w-fit px-2 py-1.5 rounded-full text-xs">
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
          </>
        ) : (
          <h1 className="h2 text-center py-12">{t("canNotFindThisBrand")}</h1>
        )}
      </section>
    </main>
  );
}
