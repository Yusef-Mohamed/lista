import { Header } from "@/components/Header";

import Main from "./components/Main";
import { getTranslations } from "next-intl/server";
export async function generateMetadata() {
  const t = await getTranslations("Metadata");

  return {
    title: t("brands.title"), // Dynamically set the title based on locale
    description: t("brands.description"), // Dynamically set the description
    keywords: t("brands.keywords"), // Dynamically set the keywords
  };
}
export default function Brands() {
  return (
    <main>
      <Header />
      <Main />
    </main>
  );
}
