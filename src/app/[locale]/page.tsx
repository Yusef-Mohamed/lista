import { Header } from "@/components/Header";
import { Banner } from "./components/Banner";
import { Brands } from "./components/Brands";
import { NeerToYou } from "./components/NeerToYour";
import { Categories } from "./components/Categories";
import { cachedServerFetch } from "@/lib/serverUtils";
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
  };
  console.log(data);
  return (
    <main>
      <Header />
      <Banner banners={data.banners} />
      <Brands />
      <NeerToYou />
      <Categories />
    </main>
  );
}
