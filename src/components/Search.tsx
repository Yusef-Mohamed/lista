"use client";
import { Input } from "@/components/ui/input";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/i18n/routing";
import { useState, useEffect } from "react";
import useCustomSearchParams from "@/hooks/useSearchParams";

// Debounce function with TypeScript types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<F extends (...args: any[]) => void>(
  func: F,
  wait: number
): F & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debouncedFunction = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };

  debouncedFunction.cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
  };

  return debouncedFunction as F & { cancel: () => void };
}

export function SearchInput({ className }: { className?: string }) {
  const locale = useLocale();
  const text = useTranslations("header");
  const router = useRouter();
  const { setSearchParams, searchParams } = useCustomSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );
  const pathname = usePathname();
  const isBrandsPage: boolean = pathname === "/brands";
  const debouncedUpdate = debounce((e: string) => {
    setSearchParams({ search: e });
  }, 500);
  const paramsSearch = searchParams.get("search");
  useEffect(() => {
    if (paramsSearch !== search) {
      setSearch(paramsSearch || "");
    }
  }, [paramsSearch, setSearch, search]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isBrandsPage) {
      router.push(`/brands?search=${search}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative flex-1 max-w-md", className)}
    >
      <svg
        className={cn(
          "absolute fill-foreground/80 top-1/2 transform -translate-y-1/2",
          {
            "left-3": locale === "en",
            "right-3": locale === "ar",
          }
        )}
        width={18}
        height={18}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.99886 8.00613C1.99886 7.2182 2.15405 6.43799 2.45558 5.71003C2.75711 4.98208 3.19906 4.32064 3.75622 3.76349C4.31337 3.20634 4.9748 2.76438 5.70276 2.46286C6.43071 2.16133 7.21092 2.00613 7.99886 2.00613C8.78679 2.00613 9.567 2.16133 10.295 2.46286C11.0229 2.76438 11.6843 3.20634 12.2415 3.76349C12.7986 4.32064 13.2406 4.98208 13.5421 5.71003C13.8437 6.43799 13.9989 7.2182 13.9989 8.00613C13.9989 9.59743 13.3667 11.1236 12.2415 12.2488C11.1163 13.374 9.59015 14.0061 7.99886 14.0061C6.40756 14.0061 4.88143 13.374 3.75622 12.2488C2.631 11.1236 1.99886 9.59743 1.99886 8.00613ZM7.99886 0.00613408C6.72572 0.00631636 5.471 0.310352 4.339 0.892973C3.20699 1.47559 2.23038 2.31997 1.49034 3.35594C0.750296 4.3919 0.268189 5.58953 0.0840862 6.84929C-0.100017 8.10905 0.0192008 9.39456 0.431832 10.599C0.844462 11.8034 1.53859 12.8919 2.45652 13.7741C3.37446 14.6563 4.48969 15.3067 5.70953 15.6712C6.92938 16.0357 8.2186 16.1039 9.47006 15.8699C10.7215 15.636 11.8991 15.1067 12.9049 14.3261L16.2919 17.7131C16.4805 17.8953 16.7331 17.9961 16.9953 17.9938C17.2575 17.9915 17.5083 17.8864 17.6937 17.701C17.8791 17.5155 17.9843 17.2647 17.9865 17.0025C17.9888 16.7403 17.888 16.4877 17.7059 16.2991L14.3189 12.9121C15.237 11.7296 15.8048 10.3132 15.9578 8.8239C16.1109 7.33464 15.8429 5.83232 15.1845 4.48778C14.5261 3.14324 13.5036 2.01042 12.2333 1.21816C10.9631 0.425893 9.49596 0.00596771 7.99886 0.00613408ZM7.99886 12.0061C9.05972 12.0061 10.0771 11.5847 10.8273 10.8346C11.5774 10.0844 11.9989 9.067 11.9989 8.00613C11.9989 6.94527 11.5774 5.92785 10.8273 5.17771C10.0771 4.42756 9.05972 4.00613 7.99886 4.00613C6.93799 4.00613 5.92057 4.42756 5.17043 5.17771C4.42028 5.92785 3.99886 6.94527 3.99886 8.00613C3.99886 9.067 4.42028 10.0844 5.17043 10.8346C5.92057 11.5847 6.93799 12.0061 7.99886 12.0061Z"
        />
      </svg>
      <Input
        placeholder={text("searchAboutBrand")}
        className={cn("ps-9 rounded-md w-full")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
          if (isBrandsPage) {
            debouncedUpdate(e.target.value);
          }
        }}
      />
    </form>
  );
}
