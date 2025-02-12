import { Link } from "@/i18n/routing";
import { Pointer } from "lucide-react";
import { useTranslations } from "next-intl";

const SectionHeader = ({ title, link }: { title: string; link?: string }) => {
  const text = useTranslations("common");
  return (
    <div className="flex mb-4 items-center justify-between">
      <h2>{title}</h2>
      {link && (
        <Link href={link} className="flex items-center gap-1">
          <span className="font-semibold">{text("more")}</span>
          <Pointer className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
