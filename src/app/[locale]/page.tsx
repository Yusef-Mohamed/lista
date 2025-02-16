import { Header } from "@/components/Header";
import { Banner } from "./components/Banner";
import { Brands } from "./components/Brands";
import { Categories } from "./components/Categories";
import { cachedServerFetch } from "@/lib/serverUtils";
import { Link } from "@/i18n/routing";
import { NeerToYou } from "./components/NeerToYour";
import { getTranslations } from "next-intl/server";
async function getHomeData() {
  try {
    const res = await cachedServerFetch("/home-all");
    const data = res.data;
    return data;
  } catch (error) {
    console.error("Error fetching home data:", error);
    return undefined;
  }
}
export async function generateMetadata() {
  const t = await getTranslations("Metadata");

  return {
    title: t("home.title"), // Dynamically set the title based on locale
    description: t("home.description"), // Dynamically set the description
    keywords: t("home.keywords"), // Dynamically set the keywords
  };
}
export default async function Home() {
  const data = (await getHomeData()) as {
    banners: {
      shop_id: number;
      image: string;
    }[];
    shop_categories: {
      id: number;
      title: string;
      image: string;
    }[];
    brands: {
      shop_id: number;
      image: string;
    }[];
  };
  return (
    <main>
      <Header />
      <Banner banners={data.banners} />
      <div className="mt-8 flex items-center justify-center gap-2">
        {data.shop_categories.slice(0, 5).map((category) => (
          <Link
            href={`/brands?shop_categories=${category.id}`}
            key={category.id}
            className="max-sm:text-xs sm:text-sm max-sm:px-2 max-sm:py-1 sm:px-2.5 sm:py-1.5 text-center border rounded-full border-primary/50 flex-wrap"
          >
            {category.title}
          </Link>
        ))}
      </div>
      <Brands brands={data.brands} />
      <NeerToYou />
      <Categories categories={data.shop_categories} />
    </main>
  );
}
