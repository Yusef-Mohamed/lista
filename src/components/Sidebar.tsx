"use client";
import {
  HomeIcon,
  TagIcon,
  ShoppingBagIcon,
  NewspaperIcon,
  SunIcon,
  MoonIcon,
  Languages,
  Users,
  Mail,
  UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type React from "react";
import Logo from "./Logo";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
}

const navigationItems = [
  {
    icon: HomeIcon,
    label: "home",
    href: "/",
  },
  {
    icon: TagIcon,
    label: "offers",
    href: "/offers",
  },
  {
    icon: ShoppingBagIcon,
    label: "brands",
    href: "/brands",
  },
  {
    label: "aboutUs",
    href: "/about-us",
    icon: UserIcon,
  },
  {
    icon: NewspaperIcon,
    label: "blog",
    href: "/blog",
  },

  {
    icon: Users,
    label: "joinUs",
    href: "/join-us",
  },
  {
    icon: Mail,
    label: "contactUs",
    href: "/contact",
  },
];

function SidebarItem({ icon: Icon, label, href }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));
  const text = useTranslations("sidebar");
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center hover:bg-foreground/30 hover:text-foreground text-foreground gap-3 px-4 py-3 rounded-xl w-full transition-colors",
        {
          "bg-foreground/30 text-foreground font-semibold ": isActive,
        }
      )}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm ">{text(label)}</span>
    </Link>
  );
}

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const text = useTranslations("sidebar");

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center hover:bg-foreground/30 hover:text-foreground text-foreground gap-3 px-4 py-3 rounded-xl w-full transition-colors"
    >
      {theme === "dark" ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
      <span className="text-sm">
        {theme === "dark" ? text("darkMode") : text("lightMode")}
      </span>
    </button>
  );
}

function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const handleLanguageChange = (value: string) => {
    router.push(pathname, { locale: value });
    router.refresh();
  };

  return (
    <button
      onClick={() => handleLanguageChange(locale === "en" ? "ar" : "en")}
      className="flex items-center hover:bg-foreground/30 hover:text-foreground text-foreground gap-3 px-4 py-3 rounded-xl w-full transition-colors"
    >
      <Languages className="w-5 h-5" />
      <span className="text-sm">{locale === "en" ? "العربية" : "English"}</span>
    </button>
  );
}

export function Sidebar({ className }: { className?: string }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;
  return (
    <div
      className={cn(
        "w-64 bg-background min-h-full max-h-screen p-4 flex flex-col gap-2 sticky top-0",
        className
      )}
    >
      <Logo className="mx-auto mt-4" />
      <div className="mt-6 flex flex-col gap-2">
        {navigationItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            href={item.href}
            label={item.label}
          />
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  );
}
