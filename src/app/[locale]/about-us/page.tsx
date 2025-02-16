import { Header } from "@/components/Header";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
export async function generateMetadata() {
  const t = await getTranslations("Metadata");

  return {
    title: t("aboutUs.title"), // Dynamically set the title based on locale
    description: t("aboutUs.description"), // Dynamically set the description
    keywords: t("aboutUs.keywords"), // Dynamically set the keywords
  };
}
const AboutUsPage = () => {
  const locale = useLocale();
  return (
    <main>
      <Header />
      <section className="md:px-4 py-6">
        <div className="prose md:prose prose-sm lg:prose-md px-4 dark:prose-invert max-w-[65ch] mx-auto py-8">
          {locale === "ar" ? (
            <>
              {" "}
              <h1>من نحن</h1>
              <div>
                <p>
                  تطبيق <b>[لسته]</b> هو الحل الأمثل لعشاق الطعام الذين يبحثون
                  عن تجربة سلسة وسريعة لتصفح قوائم طعام المطاعم ورؤية وجباتهم
                  المفضلة. نهدف إلى تبسيط عملية اختيار الطعام أو الشراب من خلال
                  توفير واجهة سهلة الاستخدام تعرض قوائم متنوعة من أفضل الأماكن
                  في منطقتك.
                </p>

                <p>
                  باستخدام تطبيقنا، يمكنك استكشاف أصناف الطعام المتاحة، ومعرفة
                  التفاصيل الدقيقة لكل وجبة، واتخاذ قرارات مستنيرة بناءً على
                  تقييمات المستخدمين. سواء كنت تبحث عن وجبة سريعة أو عشاء فاخر،
                  فإن <b>[لسته]</b> يضع كل الخيارات بين يديك.
                </p>

                <p>
                  نحن نؤمن بتجربة مستخدم متميزة، انضم إلينا واستمتع بتجربة طعام
                  غير مسبوقة!
                </p>
              </div>
            </>
          ) : (
            <>
              <h1>About Us</h1>
              <div>
                <p>
                  The <b>[Lista]</b> app is the perfect solution for food lovers
                  looking for a seamless and fast experience to browse
                  restaurant menus and discover their favorite meals. We aim to
                  simplify the process of choosing food or drinks by providing
                  an easy-to-use interface that displays a variety of menus from
                  the best places in your area.
                </p>

                <p>
                  Using our app, you can explore available food options, learn
                  the intricate details of each dish, and make informed
                  decisions based on user reviews. Whether you&apos;re looking
                  for a quick meal or a fancy dinner, <b>[Lista]</b> puts all
                  the choices at your fingertips.
                </p>

                <p>
                  We believe in delivering an exceptional user experience. Join
                  us and enjoy an unparalleled food journey!
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
