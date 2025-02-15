import { Header } from "@/components/Header";
import { Banner } from "./components/Banner";
import { Brands } from "./components/Brands";
import { Categories } from "./components/Categories";
import { cachedServerFetch } from "@/lib/serverUtils";
import { Link } from "@/i18n/routing";
import { NeerToYou } from "./components/NeerToYour";
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
            className="max-sm:text-xs max-md:text-sm max-sm:px-2 max-sm:py-1 max-md:px-2.5 max-md:py-1.5 px-3 py-2 border rounded-full border-primary/50 flex-wrap"
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
