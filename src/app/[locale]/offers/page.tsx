import Image from "next/image";
import { cachedServerFetch } from "@/lib/serverUtils";
import { Suspense } from "react";
import { Pagination } from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/Header";
import { getTranslations } from "next-intl/server";
import { IShop } from "@/types";
import { Link } from "@/i18n/routing";
export async function generateMetadata() {
  const t = await getTranslations("Metadata");

  return {
    title: t("offers.title"), // Dynamically set the title based on locale
    description: t("offers.description"), // Dynamically set the description
    keywords: t("offers.keywords"), // Dynamically set the keywords
  };
}
async function OffersContent({ page }: { page: number }) {
  const { brands, totalPages } = await getBrands(page);
  const t = await getTranslations("offers");
  if (brands.length === 0) {
    return (
      <section className="px-4 pb-4 gap-4 min-h-[50vh] flex items-center justify-center">
        <p className="text-xl text-muted-foreground text-center">
          {t("noOffersFound")}
        </p>
      </section>
    );
  }

  return (
    <section className="px-4 pb-4">
      <div className="grid lg:grid-cols-2 gap-4">
        {brands.map((brand: IShop) => (
          <Link key={brand.id} href={`/brands/${brand.id}`}>
            <Image
              src={brand.banner_image}
              alt={brand.shop_name}
              width={1400}
              height={700}
              className="banner w-full rounded-2xl object-cover"
            />
          </Link>
        ))}
      </div>
      <Pagination totalPages={totalPages} currentPage={page} />
    </section>
  );
}

export default async function Offers({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  return (
    <main>
      <Header />
      <Suspense fallback={<OffersSkeleton />}>
        <OffersContent page={currentPage} />
      </Suspense>
    </main>
  );
}

const getBrands = async (page: number = 1) => {
  try {
    // ?page=${page}&perPage=14
    const data = await cachedServerFetch(`/shops`, {}, "POST", {
      page: page,
      perPage: 14,
      has_offer: 1,
    });
    return { totalPages: data.totalPages || 1, brands: data.data as IShop[] };
  } catch {
    return {
      totalPages: 0,
      brands: [],
    };
  }
};

function OffersSkeleton() {
  return (
    <section className="px-4 pb-4 grid lg:grid-cols-2 gap-4">
      {Array.from({ length: 14 }).map((_, index) => (
        <div key={index} className="w-full rounded-2xl">
          <Skeleton className="banner w-full h-[175px] rounded-2xl" />
        </div>
      ))}
    </section>
  );
}
