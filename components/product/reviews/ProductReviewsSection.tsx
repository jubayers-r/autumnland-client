"use client";

import * as React from "react";
import { SlidersHorizontal, ChevronDown, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CreateReviewInput, Review, ReviewSortOption } from "@/types/review";
import { fetchProductReviews, submitProductReview } from "@/lib/reviews-service";
import { ReviewCard } from "./ReviewCard";
import { ReviewFilterDialog } from "./ReviewFilterDialog";
import { WriteReviewDialog } from "./WriteReviewDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductReviewsSectionProps {
  productId: string;
  productTitle: string;
}

const SORT_LABELS: Record<ReviewSortOption, string> = {
  latest: "Latest",
  "most-relevant": "Most Relevant",
  "highest-rating": "Highest Rating",
  "lowest-rating": "Lowest Rating",
  oldest: "Oldest",
};

export function ProductReviewsSection({ productId, productTitle }: ProductReviewsSectionProps) {
  // Filter & sorting states
  const [sortBy, setSortBy] = React.useState<ReviewSortOption>("latest");
  const [selectedRating, setSelectedRating] = React.useState<number | null>(null);
  const [verifiedOnly, setVerifiedOnly] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);

  // Data states
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [filteredCount, setFilteredCount] = React.useState<number>(0);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [hasMore, setHasMore] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false);

  // Dialog states
  const [isFilterDialogOpen, setIsFilterDialogOpen] = React.useState<boolean>(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = React.useState<boolean>(false);

  // Active filter count
  const activeFilterCount = (selectedRating !== null ? 1 : 0) + (verifiedOnly ? 1 : 0);

  // Fetch reviews whenever filters/sorting change
  React.useEffect(() => {
    let ignore = false;

    async function executeFetch() {
      try {
        const response = await fetchProductReviews({
          productId,
          sortBy,
          rating: selectedRating,
          verifiedOnly,
          page: 1,
          limit: 6,
        });

        if (!ignore) {
          setReviews(response.reviews);
          setFilteredCount(response.filteredCount);
          setTotalCount(response.totalCount);
          setHasMore(response.hasMore);
          setPage(1);
          setIsLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to load reviews:", err);
          setIsLoading(false);
        }
      }
    }

    void executeFetch();

    return () => {
      ignore = true;
    };
  }, [productId, sortBy, selectedRating, verifiedOnly]);

  // Load more reviews
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setIsLoadingMore(true);
    try {
      const response = await fetchProductReviews({
        productId,
        sortBy,
        rating: selectedRating,
        verifiedOnly,
        page: nextPage,
        limit: 6,
      });
      setReviews(response.reviews);
      setFilteredCount(response.filteredCount);
      setHasMore(response.hasMore);
      setPage(nextPage);
    } catch (err) {
      console.error("Failed to load more reviews:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Submit review handler
  const handleCreateReview = async (input: CreateReviewInput) => {
    await submitProductReview(input);
    // Refresh review list from page 1
    const response = await fetchProductReviews({
      productId,
      sortBy,
      rating: selectedRating,
      verifiedOnly,
      page: 1,
      limit: 6,
    });
    setReviews(response.reviews);
    setFilteredCount(response.filteredCount);
    setTotalCount(response.totalCount);
    setHasMore(response.hasMore);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSelectedRating(null);
    setVerifiedOnly(false);
    setSortBy("latest");
  };

  // Display count: Reflects the real count from the underlying reviews array
  // When filters are active, displays the filtered count.
  const displayCount = activeFilterCount > 0 ? filteredCount : totalCount;

  return (
    <div className="w-full" data-reviews-section>
      {/* Subheader: All Reviews (count) + Filters & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pb-4 sm:pb-6">
        {/* Top line on phone / Left title group on tablet/desktop */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <div className="flex items-baseline gap-1 sm:gap-2">
            <h3 className="font-heading font-black text-xl sm:text-2xl lg:text-[26px] text-foreground tracking-tight">
              All Reviews
            </h3>
            <span className="text-sm sm:text-base font-normal text-muted-foreground font-sans">
              ({displayCount})
            </span>
          </div>

          {/* Filter Icon Button on phone (aligned on the same row as title) */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => setIsFilterDialogOpen(true)}
              className={cn(
                "relative w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                "bg-[#F0F0F0] hover:bg-[#E6E6E6] dark:bg-muted dark:hover:bg-muted/80 text-foreground",
                "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
              )}
              aria-label="Filter reviews"
              title="Filter reviews"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold flex items-center justify-center shadow-xs">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Controls: Filter (sm+), Sort (sm+), Write a Review (full width on phone, auto on sm+) */}
        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 w-full sm:w-auto">
          {/* Filter Icon Button (Tablet & Desktop) */}
          <button
            type="button"
            onClick={() => setIsFilterDialogOpen(true)}
            className={cn(
              "hidden sm:flex relative w-10 h-10 sm:w-12 sm:h-12 rounded-full items-center justify-center transition-colors shrink-0",
              "bg-[#F0F0F0] hover:bg-[#E6E6E6] dark:bg-muted dark:hover:bg-muted/80 text-foreground",
              "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label="Filter reviews"
            title="Filter reviews"
          >
            <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold flex items-center justify-center shadow-xs">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort By Dropdown (Tablet & Desktop) */}
          <div className="hidden sm:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "h-10 sm:h-12 px-4 sm:px-5 rounded-full font-medium text-sm sm:text-base flex items-center gap-2 transition-colors",
                    "bg-[#F0F0F0] hover:bg-[#E6E6E6] dark:bg-muted dark:hover:bg-muted/80 text-foreground",
                    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                >
                  <span>{SORT_LABELS[sortBy]}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 rounded-xl">
                {(Object.keys(SORT_LABELS) as ReviewSortOption[]).map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setSortBy(option)}
                    className="cursor-pointer justify-between"
                  >
                    <span>{SORT_LABELS[option]}</span>
                    {sortBy === option && <Check className="w-4 h-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Write a Review Button: Full width on phone, auto on tablet/desktop */}
          <button
            type="button"
            onClick={() => setIsWriteReviewOpen(true)}
            className={cn(
              "w-full sm:w-auto h-11 sm:h-12 px-5 sm:px-6 rounded-full font-medium text-sm sm:text-base transition-colors shrink-0 flex items-center justify-center",
              "bg-black text-white hover:bg-black/85 dark:bg-white dark:text-black dark:hover:bg-white/85 shadow-xs",
              "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Active Filter Badges */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap pb-4">
          <span className="text-xs text-muted-foreground font-medium">Filters:</span>
          {selectedRating !== null && (
            <button
              type="button"
              onClick={() => setSelectedRating(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground hover:bg-muted/80 transition-colors"
            >
              <span>{selectedRating} Stars</span>
              <X className="w-3 h-3 text-muted-foreground" />
            </button>
          )}
          {verifiedOnly && (
            <button
              type="button"
              onClick={() => setVerifiedOnly(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-foreground hover:bg-muted/80 transition-colors"
            >
              <span>Verified Only</span>
              <X className="w-3 h-3 text-muted-foreground" />
            </button>
          )}
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 ml-1"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Reviews Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[20px] border border-black/10 dark:border-white/10 p-6 sm:p-7 md:p-8 h-48 animate-pulse bg-muted/20"
            />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="w-full text-center py-12 sm:py-16 border border-dashed border-black/10 dark:border-white/10 rounded-[20px] my-6">
          <p className="text-base sm:text-lg font-medium text-foreground mb-2">
            No reviews match your selected filters.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mb-6">
            Try resetting your filters or write the first review for this criteria.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="rounded-full px-6 py-2.5 text-xs sm:text-sm font-medium bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mt-2 sm:mt-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {/* Load More Reviews Button */}
      {hasMore && (
        <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className={cn(
              "rounded-full border border-black/10 dark:border-white/10 px-8 sm:px-12 py-3 sm:py-3.5",
              "text-sm sm:text-base font-medium text-foreground bg-background hover:bg-muted/50 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            {isLoadingMore ? "Loading Reviews..." : "Load More Reviews"}
          </button>
        </div>
      )}

      {/* Filter & Sort Dialog */}
      <ReviewFilterDialog
        open={isFilterDialogOpen}
        onOpenChange={setIsFilterDialogOpen}
        selectedRating={selectedRating}
        onSelectRating={setSelectedRating}
        verifiedOnly={verifiedOnly}
        onToggleVerifiedOnly={setVerifiedOnly}
        sortBy={sortBy}
        onSelectSortBy={setSortBy}
        onResetFilters={handleResetFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* Write a Review Dialog */}
      <WriteReviewDialog
        productId={productId}
        productTitle={productTitle}
        open={isWriteReviewOpen}
        onOpenChange={setIsWriteReviewOpen}
        onSubmit={handleCreateReview}
      />
    </div>
  );
}
