"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ReviewStarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
  idPrefix?: string;
}

export function ReviewStarRating({
  rating,
  maxStars = 5,
  size = "md",
  interactive = false,
  onRatingChange,
  className,
  idPrefix = "star",
}: ReviewStarRatingProps) {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const activeRating = interactive && hoverRating !== null ? hoverRating : rating;

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5 sm:w-5.5 sm:h-5.5",
    lg: "w-6 h-6 sm:w-7 sm:h-7",
  }[size];

  const uniqueId = React.useId().replace(/:/g, "_");

  return (
    <div
      className={cn("flex items-center gap-1 shrink-0", className)}
      role={interactive ? "radiogroup" : "img"}
      aria-label={`${rating} out of ${maxStars} stars`}
      onMouseLeave={() => interactive && setHoverRating(null)}
    >
      {Array.from({ length: maxStars }).map((_, index) => {
        const starIndex = index + 1;
        const filled = starIndex <= activeRating;
        const half = !filled && starIndex - 0.5 <= activeRating && !interactive;

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRatingChange?.(starIndex)}
            onMouseEnter={() => interactive && setHoverRating(starIndex)}
            className={cn(
              "inline-flex items-center justify-center p-0.5 rounded-sm transition-transform",
              interactive
                ? "cursor-pointer hover:scale-115 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                : "cursor-default"
            )}
            tabIndex={interactive ? 0 : -1}
            aria-label={interactive ? `${starIndex} stars` : undefined}
          >
            <svg
              className={cn(sizeClasses, "shrink-0 transition-colors")}
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              {half ? (
                <g>
                  <defs>
                    <linearGradient id={`${idPrefix}-${uniqueId}-${index}`}>
                      <stop offset="50%" stopColor="#FFC633" />
                      <stop offset="50%" stopColor="#E5E7EB" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <path
                    fill={`url(#${idPrefix}-${uniqueId}-${index})`}
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </g>
              ) : (
                <path
                  className={filled ? "fill-[#FFC633]" : "fill-muted"}
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              )}
            </svg>
          </button>
        );
      })}
    </div>
  );
}
