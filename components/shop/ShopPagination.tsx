"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ShopPagination({ currentPage, totalPages, onPageChange }: ShopPaginationProps) {
  if (totalPages <= 1) return null;

  // Build page numbers array with ellipses
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include page 1
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis-1");
      }

      // Middle window
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis-2");
      }

      // Always include last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between w-full pt-6 sm:pt-8 lg:pt-10 border-t border-black/10 dark:border-white/10 mt-8 sm:mt-10 lg:mt-12 font-sans"
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Go to previous page"
        className={cn(
          "h-9 sm:h-10 px-3 sm:px-4 rounded-lg border border-black/10 dark:border-white/10",
          "flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer",
          "hover:bg-black/5 dark:hover:bg-white/5",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        )}
      >
        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span>Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {pages.map((p, idx) => {
          if (typeof p === "string") {
            return (
              <span
                key={`${p}-${idx}`}
                className="w-7 sm:w-9 text-center text-xs sm:text-sm text-black/40 dark:text-white/40"
              >
                ...
              </span>
            );
          }

          const isCurrent = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={isCurrent ? "page" : undefined}
              className={cn(
                "w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-center",
                isCurrent
                  ? "bg-black/10 dark:bg-white/10 text-foreground font-bold shadow-2xs"
                  : "text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
              )}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Go to next page"
        className={cn(
          "h-9 sm:h-10 px-3 sm:px-4 rounded-lg border border-black/10 dark:border-white/10",
          "flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer",
          "hover:bg-black/5 dark:hover:bg-white/5",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        )}
      >
        <span>Next</span>
        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
    </nav>
  );
}
