"use client";
import { Button } from "./ui/button";
import useCustomSearchParams from "@/hooks/useSearchParams";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const { setSearchParams } = useCustomSearchParams();
  if (totalPages <= 1) return null;
  const generatePagination = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        // Show first 4 pages + ellipsis + last page
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page + ellipsis + last 4 pages
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        // Show first page + ellipsis + current-1, current, current+1 + ellipsis + last page
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div
      dir="ltr"
      className="flex items-center justify-center gap-2 my-8 mx-auto w-fit"
    >
      <Button
        onClick={() => {
          setSearchParams({
            page: (currentPage - 1).toString(),
          });
        }}
        size="icon"
        variant="outline"
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {generatePagination().map((page, index) =>
        typeof page === "number" ? (
          <Button
            key={index}
            onClick={() => {
              setSearchParams({
                page: page.toString(),
              });
            }}
            size="icon"
            variant={page === currentPage ? "default" : "ghost"}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="px-2 ">
            {page}
          </span>
        )
      )}

      <Button
        onClick={() => {
          setSearchParams({
            page: (currentPage + 1).toString(),
          });
        }}
        size="icon"
        variant="outline"
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
