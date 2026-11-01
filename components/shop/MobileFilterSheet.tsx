"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { FilterContent, type FilterState } from "./FilterContent";

interface MobileFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  onFilterChange: (next: Partial<FilterState>) => void;
  onApply?: (appliedFilters?: FilterState) => void;
  onReset: () => void;
}

export function MobileFilterSheet({
  open,
  onOpenChange,
  filters,
  onFilterChange,
  onReset,
}: MobileFilterSheetProps) {
  const handleReset = () => {
    onReset();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="max-h-[92vh] h-auto rounded-t-[24px] sm:rounded-t-[28px] p-0 flex flex-col bg-background border-t border-black/10 dark:border-white/10"
      >
        {/* Sheet Header: "Filters" + Close (X) button */}
        <SheetHeader className="px-5 py-4 sm:px-6 border-b border-black/10 dark:border-white/10 flex flex-row items-center justify-between">
          <SheetTitle className="font-bold text-xl sm:text-2xl text-foreground font-sans">
            Filters
          </SheetTitle>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="Close filters"
            className="w-9 h-9 rounded-full flex items-center justify-center text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </SheetHeader>

        {/* Scrollable Filter Body */}
        <div className="overflow-y-auto px-5 py-5 sm:px-6 flex-1">
          {open && (
            <FilterContent
              filters={filters}
              onFilterChange={onFilterChange}
              onReset={handleReset}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
