import { cachedServerFetch } from "@/lib/serverUtils";
import { IBlog, IShop } from "@/types";
import { MetadataRoute } from "next";
const pages = [
  "",
  "about-us",
  "blog",
  "brands",
  "contact-us",
  "join-us",
  "offers",
  "terms-and-conditions",
];
const getBlogs = async () => {
  try {
    const data = await cachedServerFetch(`/blogs?perPage=50`, {
      revalidate: 30000,
    });
    return data.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};
const getBrands = async () => {
  try {
    const data = await cachedServerFetch(`/shops?perPage=50`, {
      revalidate: 30000,
    });
    return data.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = (await getBlogs()) as IBlog[];
  const blogsEntries = blogs?.map((blog) => {
    return `blog/${blog.id}`;
  });
  const brands = (await getBrands()) as IShop[];
  const brandsEntries = brands?.map((brand) => {
    return `brands/${brand.id}`;
  });
  const allPages = [...pages, ...blogsEntries, ...brandsEntries];
  const enLocales = allPages?.map((page) => {
    return {
      url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/en" + "/" + page,
    };
  });
  const arLocales = allPages?.map((page) => {
    return {
      url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/ar" + "/" + page,
    };
  });

  return [...arLocales, ...enLocales];
}
