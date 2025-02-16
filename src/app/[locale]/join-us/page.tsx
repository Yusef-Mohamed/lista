import { Header } from "@/components/Header";
import { JoinUsForm } from "@/components/JoinUsForm";
import { getTranslations } from "next-intl/server";
export async function generateMetadata() {
  const t = await getTranslations("Metadata");

  return {
    title: t("joinUs.title"), // Dynamically set the title based on locale
    description: t("joinUs.description"), // Dynamically set the description
    keywords: t("joinUs.keywords"), // Dynamically set the keywords
  };
}
export default async function JoinUs() {
  const text = await getTranslations("joinUs");

  return (
    <main>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-center mb-8">
          {text("title")}
        </h1>
        <JoinUsForm />
      </div>
    </main>
  );
}
