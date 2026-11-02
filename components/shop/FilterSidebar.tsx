"use client";

import * as React from "react";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterContent, type FilterState } from "./FilterContent";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (next: Partial<FilterState>) => void;
  onReset: () => void;
  className?: string;
}

export function FilterSidebar({ filters, onFilterChange, onReset, className }: FilterSidebarProps) {
  return (
    <aside
      aria-label="Product filters"
      className={cn("hidden lg:block w-full max-w-[295px] shrink-0", className)}
    >
      <div className="bg-card rounded-[20px] border border-black/10 dark:border-white/10 p-5 sm:p-6 sticky top-24">
        {/* Sidebar Header: "Filters" + Slider Icon */}
        <div className="flex items-center justify-between pb-5 border-b border-black/10 dark:border-white/10">
          <h2 className="font-bold text-xl text-foreground font-sans tracking-tight">Filters</h2>
          <SlidersHorizontal
            className="w-5 h-5 text-black/40 dark:text-white/40"
            aria-hidden="true"
          />
        </div>

        {/* Filter Accordions and Controls */}
        <div className="pt-5">
          <FilterContent filters={filters} onFilterChange={onFilterChange} onReset={onReset} />
        </div>
      </div>
    </aside>
  );
}
