import { Header } from "@/components/Header";
import { Link } from "@/i18n/routing";
import { cachedServerFetch } from "@/lib/serverUtils";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Pagination } from "@/components/Pagination";
import { IBlog } from "@/types";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
export async function generateMetadata() {
  const t = await getTranslations("Metadata");

  return {
    title: t("blog.title"), // Dynamically set the title based on locale
    description: t("blog.description"), // Dynamically set the description
    keywords: t("blog.keywords"), // Dynamically set the keywords
  };
}
// Move the blogs fetching logic to a separate component
async function BlogContent({ page }: { page: number }) {
  const text = await getTranslations("blog");
  const { blogs, totalPages } = await getBlogs(page);

  if (blogs.length === 0) {
    return (
      <section className="mx-auto max-w-4xl min-h-[50vh] flex items-center justify-center">
        <p className="text-xl text-muted-foreground text-center">
          {text("noBlogs")}
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl">
      {blogs.length > 0 && (
        <div>
          <Image
            width={850}
            height={530}
            src={blogs[0].image}
            alt={blogs[0].title}
            className="blog object-cover rounded-xl"
          />
          <h1 className="text-center mt-8 mb-6">{blogs[0].title}</h1>
          <p className="md:text-lg max-w-[40rem] mx-auto text-center">
            {blogs[0].description}
          </p>
        </div>
      )}
      {blogs.length > 1 && (
        <div className="max-w-[40rem] mx-4 pt-8 mt-12 border-t md:mx-auto border-t-foreground">
          <h2 className="text-center">{text("allBlogs")}</h2>
          <div className="mb-4 mt-8 grid md:gap-7 gap-6 md:gap-y-10 md:grid-cols-2">
            {blogs.slice(1).map((blog, i) => (
              <Link key={blog.id || i} href={`/blog/${blog.id}`}>
                <div className="w-full blog">
                  <Image
                    width={400}
                    height={250}
                    src={blog.image}
                    alt={blog.title}
                    className="blog object-cover rounded-xl"
                  />
                </div>
                <h4
                  style={{
                    fontWeight: 400,
                  }}
                  className="text-center mt-2"
                >
                  {blog.title}
                </h4>
              </Link>
            ))}
          </div>
          <Pagination totalPages={totalPages} currentPage={page} />
        </div>
      )}
    </section>
  );
}

export default async function Blog({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  return (
    <main>
      <Header />
      <Suspense fallback={<BlogSkeleton />}>
        <BlogContent page={currentPage} />
      </Suspense>
    </main>
  );
}

const getBlogs = async (page: number = 1) => {
  try {
    const data = await cachedServerFetch(`/blogs?page=${page}&perPage=15`);
    return { totalPages: data.totalPages, blogs: data.data as IBlog[] };
  } catch {
    return {
      totalPages: 0,
      blogs: [],
    };
  }
};

function BlogSkeleton() {
  return (
    <div className="mx-auto max-w-4xl">
      {/* Hero blog skeleton */}
      <div>
        <Skeleton className="w-full h-[530px]" />
        <Skeleton className="h-8 w-2/3 mx-auto mt-8 mb-6" />
        <Skeleton className="h-20 max-w-[40rem] mx-auto" />
      </div>

      {/* Other blogs skeleton */}
      <div className="max-w-[40rem] mx-4 pt-8 mt-12 border-t md:mx-auto border-t-foreground">
        <Skeleton className="h-8 w-48 mx-auto" />
        <div className="mb-4 mt-8 grid md:gap-7 gap-6 md:gap-y-10 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="w-full h-[250px]" />
              <Skeleton className="h-6 w-3/4 mx-auto mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
