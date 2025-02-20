import { useTranslations } from "next-intl";
import Logo from "./Logo";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { appleStoreLink, playStoreLink } from "@/constants";

const Footer = () => {
  const text = useTranslations("footer");
  return (
    <footer className="px-4 flex flex-col items-center justify-center gap-4 py-8 bg-background">
      <Logo />
      <Link href="/terms-and-conditions">{text("termsAndConditions")}</Link>
      <p>
        {text("allRightsReserved")} &copy; {text("lista2025")}{" "}
      </p>
      {(playStoreLink || appleStoreLink) && (
        <div className="w-full text-center">
          <h5 className="mb-4 font-semibold">{text("downloadAppNow")}</h5>
          <div className="flex items-center justify-center gap-4 max-sm:flex-col">
            {playStoreLink && (
              <a href={playStoreLink} target="_blank" rel="noreferrer">
                <Image
                  src="/images/google-play.svg"
                  width={179}
                  height={52}
                  alt="googlestore"
                />
              </a>
            )}
            {appleStoreLink && (
              <a href={appleStoreLink} target="_blank" rel="noreferrer">
                <Image
                  src="/images/app-store.svg"
                  width={178}
                  height={52}
                  alt="appstore"
                />
              </a>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
