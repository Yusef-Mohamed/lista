import { useTranslations } from "next-intl";
import Logo from "./Logo";
import { Link } from "@/i18n/routing";

const Footer = () => {
  const text = useTranslations("footer");
  return (
    <footer className="px-4 flex flex-col items-center justify-center gap-4 py-8 bg-background">
      <Logo />
      <Link href="/terms-and-conditions">{text("termsAndConditions")}</Link>
      <p>
        {text("allRightsReserved")} &copy; {text("lista2025")}{" "}
      </p>
    </footer>
  );
};

export default Footer;
