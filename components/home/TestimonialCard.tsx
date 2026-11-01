import * as React from "react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "./testimonials-data";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function TestimonialCard({
  testimonial,
  isActive = true,
  className,
  style,
}: TestimonialCardProps) {
  const { name, rating, comment, isVerified } = testimonial;

  return (
    <article
      data-testimonial-card
      data-active={isActive ? "true" : "false"}
      style={style}
      className={cn(
        "bg-card text-card-foreground border border-black/10 dark:border-white/10",
        "rounded-[20px] p-6 sm:p-7 md:p-8 flex flex-col justify-start shrink-0",
        "transition-all duration-500 ease-out",
        isActive
          ? "opacity-100 blur-none scale-100"
          : "opacity-35 blur-[1.5px] scale-[0.98] pointer-events-none",
        className
      )}
    >
      {/* Star Rating */}
      <div
        className="flex items-center gap-1.5 mb-3.5 sm:mb-4"
        aria-label={`${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          const filled = index + 1 <= rating;
          const half = !filled && index < rating;

          return (
            <svg
              key={index}
              className="w-5 h-5 sm:w-5.5 sm:h-5.5 shrink-0"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              {half ? (
                <g>
                  <defs>
                    <linearGradient id={`half-star-${testimonial.id}-${index}`}>
                      <stop offset="50%" stopColor="#FFC633" />
                      <stop offset="50%" stopColor="#E5E7EB" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <path
                    fill={`url(#half-star-${testimonial.id}-${index})`}
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
          );
        })}
      </div>

      {/* Customer Name & Verified Badge */}
      <div className="flex items-center gap-1.5">
        <span className="font-bold text-base sm:text-[19px] text-foreground font-sans tracking-tight">
          {name}
        </span>
        {isVerified && (
          <span
            aria-label="Verified Customer"
            title="Verified Customer"
            className="inline-flex items-center justify-center w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#01AB31] text-white shrink-0 shadow-2xs"
          >
            <svg
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}
      </div>

      {/* Testimonial Quote */}
      <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-foreground/60 dark:text-foreground/70 leading-relaxed font-sans">
        &quot;{comment}&quot;
      </p>
    </article>
  );
}
