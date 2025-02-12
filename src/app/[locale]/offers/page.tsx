import Image from "next/image";
import { cachedServerFetch } from "@/lib/serverUtils";
import { Suspense } from "react";
import { Pagination } from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/Header";
import { getTranslations } from "next-intl/server";

interface Banner {
  id: string;
  image: string;
  title: string;
}

// Move the banners fetching logic to a separate component
async function OffersContent({ page }: { page: number }) {
  const { banners, totalPages } = await getBanners(page);
  const t = await getTranslations("offers");
  if (banners.length === 0) {
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
        {banners.map((banner: Banner) => (
          <Image
            key={banner.id}
            src={banner.image}
            alt={banner.title}
            width={1400}
            height={700}
            className="banner w-full rounded-2xl object-cover"
          />
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

const getBanners = async (page: number = 1) => {
  try {
    const data = await cachedServerFetch(`/banners?page=${page}&perPage=14`);
    return { totalPages: data.totalPages || 1, banners: data.data as Banner[] };
  } catch {
    return {
      totalPages: 0,
      banners: [],
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
