"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronRight, ChevronUp, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  FILTER_CATEGORIES,
  FILTER_COLORS,
  FILTER_DRESS_STYLES,
  FILTER_SIZES,
} from "@/lib/catalog-data";

export interface FilterState {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  color: string | null;
  size: string | null;
  dressStyle: string | null;
}

interface FilterContentProps {
  filters: FilterState;
  onFilterChange: (next: Partial<FilterState>) => void;
  onApply?: () => void;
  onReset?: () => void;
}

export function FilterContent({ filters, onFilterChange, onApply, onReset }: FilterContentProps) {
  // Accordion toggle states (default expanded to match design mockup)
  const [isPriceOpen, setIsPriceOpen] = React.useState(true);
  const [isColorsOpen, setIsColorsOpen] = React.useState(true);
  const [isSizeOpen, setIsSizeOpen] = React.useState(true);
  const [isDressStyleOpen, setIsDressStyleOpen] = React.useState(true);

  const currentMin = filters.minPrice ?? 50;
  const currentMax = filters.maxPrice ?? 200;

  const hasActiveFilters =
    Boolean(filters.category) ||
    Boolean(filters.color) ||
    Boolean(filters.size) ||
    (Boolean(filters.dressStyle) && filters.dressStyle !== "Casual") ||
    filters.minPrice !== null ||
    filters.maxPrice !== null;

  return (
    <div className="flex flex-col w-full font-sans">
      {/* 1. Category Navigation List */}
      <nav aria-label="Categories" className="flex flex-col gap-3 py-1">
        {FILTER_CATEGORIES.map((cat) => {
          const isSelected = filters.category?.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              type="button"
              onClick={() =>
                onFilterChange({
                  category: isSelected ? null : cat,
                })
              }
              className={cn(
                "flex items-center justify-between w-full text-base transition-colors py-1 cursor-pointer group text-left",
                isSelected
                  ? "font-bold text-foreground"
                  : "text-black/60 dark:text-white/60 hover:text-foreground"
              )}
            >
              <span>{cat}</span>
              <ChevronRight
                className={cn(
                  "w-4 h-4 transition-transform",
                  isSelected
                    ? "text-foreground translate-x-0.5"
                    : "text-black/40 dark:text-white/40 group-hover:text-foreground"
                )}
              />
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <hr className="border-t border-black/10 dark:border-white/10 my-5" />

      {/* 2. Price Accordion */}
      <div>
        <button
          type="button"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex items-center justify-between w-full text-left font-bold text-xl text-foreground cursor-pointer py-1"
          aria-expanded={isPriceOpen}
        >
          <span>Price</span>
          {isPriceOpen ? (
            <ChevronUp className="w-5 h-5 text-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-foreground" />
          )}
        </button>

        {isPriceOpen && (
          <div className="pt-5 pb-1">
            <Slider
              min={50}
              max={200}
              step={5}
              value={[currentMin, currentMax]}
              onValueChange={(val) => {
                if (Array.isArray(val) && val.length === 2) {
                  onFilterChange({
                    minPrice: val[0],
                    maxPrice: val[1],
                  });
                }
              }}
              aria-label="Price range"
            />
            <div className="flex items-center justify-between mt-3 text-sm font-medium text-foreground">
              <span>${currentMin}</span>
              <span>${currentMax}</span>
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <hr className="border-t border-black/10 dark:border-white/10 my-5" />

      {/* 3. Colors Accordion */}
      <div>
        <button
          type="button"
          onClick={() => setIsColorsOpen(!isColorsOpen)}
          className="flex items-center justify-between w-full text-left font-bold text-xl text-foreground cursor-pointer py-1"
          aria-expanded={isColorsOpen}
        >
          <span>Colors</span>
          {isColorsOpen ? (
            <ChevronUp className="w-5 h-5 text-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-foreground" />
          )}
        </button>

        {isColorsOpen && (
          <div className="grid grid-cols-5 gap-3 pt-5 pb-1">
            {FILTER_COLORS.map((col) => {
              const isSelected = filters.color?.toLowerCase() === col.name.toLowerCase();
              return (
                <button
                  key={col.name}
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      color: isSelected ? null : col.name,
                    })
                  }
                  aria-label={`Filter by color ${col.name}`}
                  aria-pressed={isSelected}
                  style={{ backgroundColor: col.hex }}
                  className={cn(
                    "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 relative",
                    col.border && "border border-black/20 dark:border-white/20",
                    isSelected && "ring-2 ring-offset-2 ring-black dark:ring-white"
                  )}
                >
                  {isSelected && (
                    <Check
                      className={cn(
                        "w-4 h-4 stroke-[3]",
                        col.name.toLowerCase() === "white" ? "text-black" : "text-white"
                      )}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Divider */}
      <hr className="border-t border-black/10 dark:border-white/10 my-5" />

      {/* 4. Size Accordion */}
      <div>
        <button
          type="button"
          onClick={() => setIsSizeOpen(!isSizeOpen)}
          className="flex items-center justify-between w-full text-left font-bold text-xl text-foreground cursor-pointer py-1"
          aria-expanded={isSizeOpen}
        >
          <span>Size</span>
          {isSizeOpen ? (
            <ChevronUp className="w-5 h-5 text-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-foreground" />
          )}
        </button>

        {isSizeOpen && (
          <div className="flex flex-wrap gap-2 pt-4 pb-1">
            {FILTER_SIZES.map((size) => {
              const isSelected = filters.size?.toLowerCase() === size.toLowerCase();
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      size: isSelected ? null : size,
                    })
                  }
                  aria-pressed={isSelected}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
                    isSelected
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                      : "bg-[#F0F0F0] dark:bg-[#262626] text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Divider */}
      <hr className="border-t border-black/10 dark:border-white/10 my-5" />

      {/* 5. Dress Style Accordion */}
      <div>
        <button
          type="button"
          onClick={() => setIsDressStyleOpen(!isDressStyleOpen)}
          className="flex items-center justify-between w-full text-left font-bold text-xl text-foreground cursor-pointer py-1"
          aria-expanded={isDressStyleOpen}
        >
          <span>Dress Style</span>
          {isDressStyleOpen ? (
            <ChevronUp className="w-5 h-5 text-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-foreground" />
          )}
        </button>

        {isDressStyleOpen && (
          <nav aria-label="Dress styles" className="flex flex-col gap-3 pt-4 pb-1">
            {FILTER_DRESS_STYLES.map((style) => {
              const isSelected = filters.dressStyle?.toLowerCase() === style.toLowerCase();
              return (
                <button
                  key={style}
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      dressStyle: isSelected ? null : style,
                    })
                  }
                  className={cn(
                    "flex items-center justify-between w-full text-base transition-colors py-1 cursor-pointer group text-left",
                    isSelected
                      ? "font-bold text-foreground"
                      : "text-black/60 dark:text-white/60 hover:text-foreground"
                  )}
                >
                  <span>{style}</span>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 transition-transform",
                      isSelected
                        ? "text-foreground translate-x-0.5"
                        : "text-black/40 dark:text-white/40 group-hover:text-foreground"
                    )}
                  />
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Divider */}
      <hr className="border-t border-black/10 dark:border-white/10 my-5" />

      {/* 6. Action Button: Apply Filter & Optional Reset */}
      <div className="flex flex-col gap-2.5 pt-1">
        <button
          type="button"
          onClick={onApply}
          className="w-full h-12 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-medium text-sm sm:text-base hover:bg-black/90 dark:hover:bg-white/90 transition-colors shadow-2xs active:scale-[0.99] cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Apply Filter
        </button>

        {hasActiveFilters && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="w-full h-10 rounded-full border border-black/10 dark:border-white/10 text-foreground flex items-center justify-center gap-2 font-medium text-xs sm:text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
