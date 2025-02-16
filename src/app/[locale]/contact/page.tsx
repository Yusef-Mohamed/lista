import { Header } from "@/components/Header";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
export async function generateMetadata() {
  const t = await getTranslations("Metadata");

  return {
    title: t("contactUs.title"), // Dynamically set the title based on locale
    description: t("contactUs.description"), // Dynamically set the description
    keywords: t("contactUs.keywords"), // Dynamically set the keywords
  };
}
export default async function Contact() {
  const text = await getTranslations("contact");

  return (
    <main>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-center mb-8">
          {text("title")}
        </h1>
        <ContactForm />
      </div>
    </main>
  );
}
