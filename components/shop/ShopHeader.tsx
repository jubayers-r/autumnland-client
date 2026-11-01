"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, SlidersHorizontal } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CatalogSortOption } from "@/lib/catalog-service";
import { cn } from "@/lib/utils";

interface ShopHeaderProps {
  title: string;
  totalCount: number;
  startIndex: number;
  endIndex: number;
  sortBy: CatalogSortOption;
  onSortChange: (sort: CatalogSortOption) => void;
  onOpenMobileFilters: () => void;
  activeFilterCount: number;
}

const SORT_LABELS: Record<CatalogSortOption, string> = {
  popular: "Most Popular",
  newest: "Newest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Highest Rated",
};

export function ShopHeader({
  title,
  totalCount,
  startIndex,
  endIndex,
  sortBy,
  onSortChange,
  onOpenMobileFilters,
  activeFilterCount,
}: ShopHeaderProps) {
  const displayRange =
    totalCount > 0 ? `Showing ${startIndex}-${endIndex} of ${totalCount} Products` : `0 Products`;

  return (
    <div className="flex flex-col w-full mb-4 sm:mb-6 lg:mb-8 font-sans">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-3 sm:mb-4">
        <BreadcrumbList className="text-xs sm:text-sm font-sans text-muted-foreground">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium text-foreground capitalize">
              {title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        {/* Left: Section Title (e.g. "Casual") */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-[40px] uppercase tracking-tight text-foreground">
            {title}
          </h1>

          {/* Mobile Filter Toggle Button (Top-right on phone) */}
          <button
            type="button"
            onClick={onOpenMobileFilters}
            aria-label="Open filter options"
            className={cn(
              "lg:hidden relative w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer",
              "bg-[#F0F0F0] hover:bg-[#E6E6E6] dark:bg-muted dark:hover:bg-muted/80 text-foreground",
              "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold flex items-center justify-center shadow-xs">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Right: Showing range & Sort Dropdown */}
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 flex-wrap">
          <span className="text-xs sm:text-sm text-black/60 dark:text-white/60">
            {displayRange}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-black/60 dark:text-white/60 hidden xs:inline">
              Sort by:
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label={`Sort by: ${SORT_LABELS[sortBy]}`}
                  className={cn(
                    "flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-foreground hover:opacity-80 transition-opacity cursor-pointer",
                    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-xs"
                  )}
                >
                  <span>{SORT_LABELS[sortBy]}</span>
                  <ChevronDown className="w-4 h-4 text-black/60 dark:text-white/60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 font-sans">
                {(Object.keys(SORT_LABELS) as CatalogSortOption[]).map((key) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => onSortChange(key)}
                    className={cn(
                      "cursor-pointer text-xs sm:text-sm",
                      sortBy === key && "font-bold text-foreground"
                    )}
                  >
                    {SORT_LABELS[key]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
