import { Menu } from "lucide-react";
import Logo from "./Logo";
import { SearchInput } from "./Search";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { useLocale, useTranslations } from "next-intl";

export function Header() {
  const text = useTranslations("header");
  const locale = useLocale();
  return (
    <header>
      <div className="flex  items-center max-lg:hidden justify-between border-b  p-4 mb-4">
        <SearchInput />
      </div>
      <div className="flex items-center lg:hidden justify-between border-b  p-4 mb-4">
        <Logo />
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent className="border-none p-0 w-64">
            <SheetHeader className="hidden ">
              <SheetTitle>{text("mobileMenu")}</SheetTitle>
            </SheetHeader>
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
