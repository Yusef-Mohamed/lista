import { Header } from "@/components/Header";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Metadata");

  return {
    title: t("termsAndConditions.title"), // Dynamically set the title based on locale
    description: t("termsAndConditions.description"), // Dynamically set the description
    keywords: t("termsAndConditions.keywords"), // Dynamically set the keywords
  };
}
const TermsAndConditions = () => {
  const locale = useLocale();
  return (
    <main>
      <Header />

      <section className="md:px-4 py-6">
        <div className="prose md:prose prose-sm lg:prose-md px-4 dark:prose-invert max-w-[65ch] mx-auto py-8">
          {locale === "ar" ? (
            <>
              <h1>شروط وأحكام استخدام تطبيق [لسته]</h1>
              <p>
                مرحبًا بك في تطبيق [لسته]، الذي يقدم لك تجربة سهلة وسريعة لتصفح
                قوائم طعام المطاعم. يرجى قراءة الشروط والأحكام التالية بعناية
                قبل استخدام التطبيق. باستخدامك للتطبيق، فإنك توافق على الالتزام
                بهذه الشروط والأحكام.
              </p>

              <h2>1. القبول بالشروط</h2>
              <p>
                باستخدامك لتطبيق [لسته]، فإنك توافق على الالتزام بالشروط
                والأحكام المذكورة هنا. إذا كنت لا توافق على هذه الشروط، يرجى عدم
                استخدام التطبيق.
              </p>

              <h2>2. وصف الخدمة</h2>
              <p>
                يوفر التطبيق واجهة لعرض قوائم طعام المطاعم المتاحة، ويتيح
                للمستخدمين تصفح القوائم.
              </p>
              <p>التطبيق لا يقوم بالطلب او التوصيل.</p>

              <h2>3. حساب المستخدم</h2>
              <p>
                قد يتطلب استخدام بعض ميزات التطبيق إنشاء حساب شخصي. يتحمل
                المستخدم مسؤولية الحفاظ على سرية معلومات الحساب وكلمة المرور.
              </p>
              <p>
                يجب أن تكون المعلومات المقدمة عند إنشاء الحساب دقيقة وكاملة.
              </p>

              <h2>4. الخصوصية</h2>
              <p>
                نحن نحرص على حماية خصوصية مستخدمينا. يرجى مراجعة سياسة الخصوصية
                لفهم كيفية جمع واستخدام بياناتك الشخصية.
              </p>

              <h2>5. المسؤولية</h2>
              <p>
                التطبيق لا يتحمل مسؤولية أي أخطاء في القوائم أو التوصيل أو جودة
                الطعام، حيث أن هذه الأمور تخضع لسيطرة المطاعم.
              </p>
              <p>
                في حالة وجود أي مشاكل مع الطلبات، يرجى التواصل مباشرة مع المطعم
                المعني.
              </p>

              <h2>6. التعديلات على الشروط</h2>
              <p>
                نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم إعلام
                المستخدمين بأي تغييرات جوهرية عبر التطبيق أو البريد الإلكتروني.
              </p>

              <h2>7. إنهاء الخدمة</h2>
              <p>
                نحتفظ بالحق في إنهاء أو تعليق حساب أي مستخدم في حالة انتهاك هذه
                الشروط والأحكام أو إساءة استخدام التطبيق.
              </p>

              <h2>8. القانون الحاكم</h2>
              <p>
                تخضع هذه الشروط والأحكام لقوانين [مصر/القاهرة]، وأي نزاعات تنشأ
                عن استخدام التطبيق ستخضع للاختصاص القضائي المحلي.
              </p>

              <div>
                <h2>اتصل بنا:</h2>
                <p>
                  إذا كان لديك أي استفسارات بخصوص هذه الشروط والأحكام، يرجى
                  التواصل معنا عبر:
                </p>
                <p>
                  البريد الإلكتروني:{" "}
                  <a href="mailto:listaappeg@gmail.com">listaappeg@gmail.com</a>
                </p>
              </div>
            </>
          ) : (
            <>
              <h1>Terms and Conditions of Using the [Lista] App</h1>
              <p>
                Welcome to the [Lista] app, which provides you with an easy and
                fast experience to browse restaurant menus. Please read the
                following terms and conditions carefully before using the app.
                By using the app, you agree to comply with these terms and
                conditions.
              </p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By using the [Lista] app, you agree to abide by the terms and
                conditions mentioned here. If you do not agree to these terms,
                please refrain from using the app.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                The app provides an interface to display available restaurant
                menus and allows users to browse these menus.
              </p>
              <p>The app does not handle ordering or delivery.</p>

              <h2>3. User Account</h2>
              <p>
                Using some features of the app may require creating a personal
                account. The user is responsible for maintaining the
                confidentiality of their account information and password.
              </p>
              <p>
                The information provided during account creation must be
                accurate and complete.
              </p>

              <h2>4. Privacy</h2>
              <p>
                We are committed to protecting the privacy of our users. Please
                review our privacy policy to understand how your personal data
                is collected and used.
              </p>

              <h2>5. Liability</h2>
              <p>
                The app is not responsible for any errors in menus, delivery, or
                food quality, as these matters are under the control of the
                restaurants.
              </p>
              <p>
                In case of any issues with orders, please contact the relevant
                restaurant directly.
              </p>

              <h2>6. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these terms and conditions at any
                time. Users will be notified of any significant changes through
                the app or via email.
              </p>

              <h2>7. Termination of Service</h2>
              <p>
                We reserve the right to terminate or suspend any user&apos;s
                account in case of violation of these terms and conditions or
                misuse of the app.
              </p>

              <h2>8. Governing Law</h2>
              <p>
                These terms and conditions are governed by the laws of
                [Egypt/Cairo], and any disputes arising from the use of the app
                will be subject to the jurisdiction of local courts.
              </p>

              <div>
                <h2>Contact Us:</h2>
                <p>
                  If you have any inquiries regarding these terms and
                  conditions, please contact us at:
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:listaappeg@gmail.com">listaappeg@gmail.com</a>
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default TermsAndConditions;
