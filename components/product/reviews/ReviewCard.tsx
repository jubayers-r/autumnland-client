"use client";

import * as React from "react";
import { MoreHorizontal, ThumbsUp, Copy, Flag, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Review } from "@/types/review";
import { ReviewStarRating } from "./ReviewStarRating";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  const { author, rating, comment, isVerified, createdAt, helpfulCount = 0 } = review;

  const [helpfuls, setHelpfuls] = React.useState(helpfulCount);
  const [hasMarkedHelpful, setHasMarkedHelpful] = React.useState(false);

  // Format date as "Posted on August 14, 2023"
  const formattedDate = React.useMemo(() => {
    try {
      const date = new Date(createdAt);
      if (isNaN(date.getTime())) {
        return `Posted on ${createdAt}`;
      }
      const formatted = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(date);
      return `Posted on ${formatted}`;
    } catch {
      return `Posted on ${createdAt}`;
    }
  }, [createdAt]);

  const handleHelpful = () => {
    if (hasMarkedHelpful) {
      setHelpfuls((prev) => Math.max(0, prev - 1));
      setHasMarkedHelpful(false);
      toast.info("Removed helpful feedback");
    } else {
      setHelpfuls((prev) => prev + 1);
      setHasMarkedHelpful(true);
      toast.success("Thank you for your feedback!");
    }
  };

  const handleCopyReview = async () => {
    try {
      await navigator.clipboard.writeText(`"${comment}" — ${author}`);
      toast.success("Review copied to clipboard");
    } catch {
      toast.error("Failed to copy review");
    }
  };

  const handleReport = () => {
    toast.info("Review reported for moderation. Thank you.");
  };

  return (
    <article
      data-review-card
      className={cn(
        "rounded-[20px] border border-black/10 dark:border-white/10 p-6 sm:p-7 md:p-8",
        "bg-card text-card-foreground flex flex-col justify-between transition-shadow hover:shadow-xs",
        className
      )}
    >
      <div>
        {/* Top Header: Star Rating + Three Dots Action Menu */}
        <div className="flex items-center justify-between gap-2">
          <ReviewStarRating rating={rating} size="md" idPrefix={`card-${review.id}`} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted/60 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Actions for review by ${author}`}
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleHelpful} className="cursor-pointer gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{hasMarkedHelpful ? "Helpful (Added)" : "Helpful"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyReview} className="cursor-pointer gap-2">
                <Copy className="w-4 h-4" />
                <span>Copy Review</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleReport}
                className="cursor-pointer gap-2 text-destructive focus:text-destructive"
              >
                <Flag className="w-4 h-4" />
                <span>Report Review</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Reviewer Name and Verified Badge */}
        <div className="mt-3.5 sm:mt-4 flex items-center gap-1.5">
          <span className="font-bold text-base sm:text-[19px] text-foreground font-sans tracking-tight">
            {author}
          </span>
          {isVerified && (
            <span
              aria-label="Verified Customer"
              title="Verified Customer"
              className="inline-flex items-center justify-center w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#01AB31] text-white shrink-0 shadow-2xs"
            >
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
            </span>
          )}
        </div>

        {/* Review Quote / Text */}
        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-foreground/60 dark:text-foreground/70 leading-relaxed font-sans">
          &quot;{comment}&quot;
        </p>
      </div>

      {/* Footer: Date Posted */}
      <div className="mt-5 sm:mt-6 flex items-center justify-between">
        <time dateTime={createdAt} className="text-xs sm:text-sm font-medium text-muted-foreground">
          {formattedDate}
        </time>

        {helpfuls > 0 && (
          <span className="text-xs text-muted-foreground/80 font-normal">
            {helpfuls} found this helpful
          </span>
        )}
      </div>
    </article>
  );
}
