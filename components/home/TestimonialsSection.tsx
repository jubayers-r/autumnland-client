"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import * as React from "react";
import { TestimonialCard } from "./TestimonialCard";
import { TESTIMONIALS, type Testimonial } from "./testimonials-data";

interface TestimonialsSectionProps {
  className?: string;
  testimonials?: Testimonial[];
}

function useWindowWidth() {
  const subscribe = React.useCallback((callback: () => void) => {
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
  }, []);

  return React.useSyncExternalStore(
    subscribe,
    () => (typeof window !== "undefined" ? window.innerWidth : 1280),
    () => 1280
  );
}

export function TestimonialsSection({
  className,
  testimonials = TESTIMONIALS,
}: TestimonialsSectionProps) {
  // Sarah M. is at index 1 so that index 0 peeks to the left under blur on initial load
  const [currentIndex, setCurrentIndex] = React.useState(1);
  const windowWidth = useWindowWidth();

  const sectionRef = React.useRef<HTMLElement>(null);
  const touchStartX = React.useRef<number | null>(null);

  // Responsive cards count
  const visibleCount = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3;
  const gap = visibleCount === 1 ? 16 : 20;

  // Max width boundary matching the entire storefront (1440px with responsive padding)
  const maxContentBoundary = 1440;
  const contentPadding = windowWidth < 640 ? 16 : windowWidth < 1024 ? 24 : 48;
  const viewportWidth = Math.min(windowWidth, maxContentBoundary);
  const contentWidth = Math.max(280, viewportWidth - 2 * contentPadding);

  // Broaden cards to fill the exact page container width
  const cardWidth = Math.max(
    260,
    Math.floor((contentWidth - (visibleCount - 1) * gap) / visibleCount)
  );

  // Exact page boundary margin from screen edge to the content container
  const sideMargin = Math.max(contentPadding, Math.floor((windowWidth - contentWidth) / 2));

  // Step size from one card to the next
  const step = cardWidth + gap;

  // Translate track so that card at currentIndex starts exactly at the page boundary
  const translateX = sideMargin - currentIndex * step;

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const handlePrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-label="Customer Reviews"
      className={cn("w-full py-12 sm:py-16 lg:py-20 relative overflow-hidden", className)}
    >
      {/* Header Container: Starts from the same boundary as the whole page */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mb-7 sm:mb-9 lg:mb-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-[48px] leading-[1.08] tracking-tight uppercase text-foreground">
            OUR HAPPY CUSTOMERS
          </h2>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonials"
              className="p-2 sm:p-2.5 rounded-full text-foreground hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonials"
              className="p-2 sm:p-2.5 rounded-full text-foreground hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Relative Carousel Track Viewport */}
      <div
        role="region"
        aria-label="Testimonial carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full overflow-hidden focus-visible:outline-none py-2"
      >
        {/* Left Margin Blur Overlay: Extends from left screen edge to the page boundary */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 hidden sm:block bg-gradient-to-r from-background via-background/70 to-transparent backdrop-blur-[0.5px]"
          style={{ width: `${sideMargin}px` }}
          aria-hidden="true"
        />

        {/* Right Margin Blur Overlay: Extends from right page boundary to right screen edge */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 hidden sm:block bg-gradient-to-l from-background via-background/70 to-transparent backdrop-blur-[0.5px]"
          style={{ width: `${sideMargin}px` }}
          aria-hidden="true"
        />

        {/* Animated Card Track */}
        <div
          data-carousel-track
          className="flex items-stretch transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translateX(${translateX}px)`,
            gap: `${gap}px`,
          }}
        >
          {testimonials.map((item, index) => {
            const isActive = index >= currentIndex && index < currentIndex + visibleCount;

            return (
              <TestimonialCard
                key={item.id}
                testimonial={item}
                isActive={isActive}
                style={{
                  width: `${cardWidth}px`,
                  minWidth: `${cardWidth}px`,
                  maxWidth: `${cardWidth}px`,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
