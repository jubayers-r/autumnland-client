"use client";

import * as React from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { cn, renderHeadingText } from "@/lib/utils";
import type { ReviewSortOption } from "@/types/review";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ReviewFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRating: number | null;
  onSelectRating: (rating: number | null) => void;
  verifiedOnly: boolean;
  onToggleVerifiedOnly: (verified: boolean) => void;
  sortBy: ReviewSortOption;
  onSelectSortBy: (sort: ReviewSortOption) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

const SORT_OPTIONS: { label: string; value: ReviewSortOption }[] = [
  { label: "Latest", value: "latest" },
  { label: "Most Relevant", value: "most-relevant" },
  { label: "Highest Rating", value: "highest-rating" },
  { label: "Lowest Rating", value: "lowest-rating" },
  { label: "Oldest", value: "oldest" },
];

const RATING_OPTIONS: { label: string; value: number | null }[] = [
  { label: "All Ratings", value: null },
  { label: "5 Stars", value: 5 },
  { label: "4 Stars", value: 4 },
  { label: "3 Stars", value: 3 },
  { label: "2 Stars", value: 2 },
  { label: "1 Star", value: 1 },
];

export function ReviewFilterDialog({
  open,
  onOpenChange,
  selectedRating,
  onSelectRating,
  verifiedOnly,
  onToggleVerifiedOnly,
  sortBy,
  onSelectSortBy,
  onResetFilters,
  activeFilterCount,
}: ReviewFilterDialogProps) {
  // Temporary state inside dialog to allow "Apply" or "Cancel"
  const [tempRating, setTempRating] = React.useState<number | null>(selectedRating);
  const [tempVerified, setTempVerified] = React.useState<boolean>(verifiedOnly);
  const [tempSort, setTempSort] = React.useState<ReviewSortOption>(sortBy);
  const [prevOpen, setPrevOpen] = React.useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setTempRating(selectedRating);
      setTempVerified(verifiedOnly);
      setTempSort(sortBy);
    }
  }

  const handleApply = () => {
    onSelectRating(tempRating);
    onToggleVerifiedOnly(tempVerified);
    onSelectSortBy(tempSort);
    onOpenChange(false);
  };

  const handleReset = () => {
    setTempRating(null);
    setTempVerified(false);
    setTempSort("latest");
    onResetFilters();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-full p-6 rounded-[24px]">
        <DialogHeader className="flex flex-row items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
          <DialogTitle className="font-heading font-black text-xl uppercase tracking-tight flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            {renderHeadingText("Filter - Sort Reviews")}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-4">
          {/* Rating Filter Section */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 font-sans">
              Rating
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {RATING_OPTIONS.map((opt) => {
                const isSelected = tempRating === opt.value;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setTempRating(opt.value)}
                    className={cn(
                      "py-2.5 px-3 rounded-full text-xs sm:text-sm font-medium transition-all text-center border",
                      isSelected
                        ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                        : "bg-muted/40 hover:bg-muted text-foreground border-transparent"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort Order Section */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 font-sans">
              Sort By
            </h4>
            <div className="flex flex-wrap gap-2">
              {SORT_OPTIONS.map((opt) => {
                const isSelected = tempSort === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTempSort(opt.value)}
                    className={cn(
                      "py-2 px-3.5 rounded-full text-xs sm:text-sm font-medium transition-all border",
                      isSelected
                        ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                        : "bg-muted/40 hover:bg-muted text-foreground border-transparent"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Verified Purchases Toggle */}
          <div className="pt-2 border-t border-black/5 dark:border-white/5">
            <label className="flex items-center justify-between cursor-pointer py-1">
              <div>
                <span className="text-sm font-medium text-foreground block">
                  Verified Purchases Only
                </span>
                <span className="text-xs text-muted-foreground">
                  Show reviews only from verified buyers
                </span>
              </div>
              <input
                type="checkbox"
                checked={tempVerified}
                onChange={(e) => setTempVerified(e.target.checked)}
                className="w-5 h-5 rounded-md accent-black dark:accent-white cursor-pointer"
              />
            </label>
          </div>
        </div>

        <DialogFooter className="flex flex-row items-center justify-between gap-3 pt-3 border-t border-black/10 dark:border-white/10 sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={handleReset}
            className="rounded-full text-xs sm:text-sm font-medium gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All
          </Button>

          <Button
            type="button"
            onClick={handleApply}
            className="rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black px-6 text-xs sm:text-sm font-medium"
          >
            Apply Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
