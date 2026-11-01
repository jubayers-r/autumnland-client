"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  CATALOG_MAX_PRICE,
  CATALOG_MIN_PRICE,
  FILTER_BRANDS,
  FILTER_CATEGORIES,
  FILTER_COLORS,
  FILTER_DRESS_STYLES,
  FILTER_SIZES,
} from "@/lib/catalog-data";

export interface FilterState {
  category?: string | null;
  categories: string[];
  brand?: string | null;
  brands: string[];
  minPrice: number | null;
  maxPrice: number | null;
  color?: string | null;
  colors: string[];
  size?: string | null;
  sizes: string[];
  dressStyle?: string | null;
  dressStyles: string[];
  onSaleOnly?: boolean;
}

interface FilterContentProps {
  filters: FilterState;
  onFilterChange: (next: Partial<FilterState>) => void;
  onApply?: () => void;
  onReset?: () => void;
  minBound?: number;
  maxBound?: number;
}

export function FilterContent({
  filters,
  onFilterChange,
  onApply,
  onReset,
  minBound = CATALOG_MIN_PRICE,
  maxBound = CATALOG_MAX_PRICE,
}: FilterContentProps) {
  // Accordion toggle states (default expanded to match design mockup)
  const [isPriceOpen, setIsPriceOpen] = React.useState(true);
  const [isColorsOpen, setIsColorsOpen] = React.useState(true);
  const [isSizeOpen, setIsSizeOpen] = React.useState(true);
  const [isDressStyleOpen, setIsDressStyleOpen] = React.useState(true);
  const [isBrandsOpen, setIsBrandsOpen] = React.useState(true);

  const currentMin = filters.minPrice ?? minBound;
  const currentMax = filters.maxPrice ?? maxBound;

  const hasActiveFilters =
    filters.categories.length > 0 ||
    (filters.brands && filters.brands.length > 0) ||
    filters.colors.length > 0 ||
    filters.sizes.length > 0 ||
    filters.dressStyles.length > 0 ||
    Boolean(filters.onSaleOnly) ||
    filters.minPrice !== null ||
    filters.maxPrice !== null;

  // Toggle helpers for multi-select
  const toggleBrand = (b: string) => {
    const activeBrands = filters.brands || [];
    const isSelected = activeBrands.some((brand) => brand.toLowerCase() === b.toLowerCase());
    const nextBrands = isSelected
      ? activeBrands.filter((brand) => brand.toLowerCase() !== b.toLowerCase())
      : [...activeBrands, b];

    onFilterChange({
      brands: nextBrands,
      brand: nextBrands.length === 1 ? nextBrands[0] : null,
    });
  };

  // Toggle helpers for multi-select
  const toggleCategory = (cat: string) => {
    const isSelected = filters.categories.some((c) => c.toLowerCase() === cat.toLowerCase());
    const nextCategories = isSelected
      ? filters.categories.filter((c) => c.toLowerCase() !== cat.toLowerCase())
      : [...filters.categories, cat];

    onFilterChange({
      categories: nextCategories,
      category: nextCategories.length === 1 ? nextCategories[0] : null,
    });
  };

  const toggleSize = (size: string) => {
    const isSelected = filters.sizes.some((s) => s.toLowerCase() === size.toLowerCase());
    const nextSizes = isSelected
      ? filters.sizes.filter((s) => s.toLowerCase() !== size.toLowerCase())
      : [...filters.sizes, size];

    onFilterChange({
      sizes: nextSizes,
      size: nextSizes.length === 1 ? nextSizes[0] : null,
    });
  };

  const toggleDressStyle = (style: string) => {
    const isSelected = filters.dressStyles.some((ds) => ds.toLowerCase() === style.toLowerCase());
    // Single-select: clicking an unselected style selects exclusively that style; clicking the active one toggles it off
    const nextStyles = isSelected ? [] : [style];

    onFilterChange({
      dressStyles: nextStyles,
      dressStyle: nextStyles.length === 1 ? nextStyles[0] : null,
    });
  };

  const toggleColor = (colorName: string) => {
    const isSelected = filters.colors.some((c) => c.toLowerCase() === colorName.toLowerCase());
    const nextColors = isSelected
      ? filters.colors.filter((c) => c.toLowerCase() !== colorName.toLowerCase())
      : [...filters.colors, colorName];

    onFilterChange({
      colors: nextColors,
      color: nextColors.length === 1 ? nextColors[0] : null,
    });
  };

  return (
    <div className="flex flex-col w-full font-sans">
      {/* 1. Category Navigation List (Type of Dress) */}
      <nav aria-label="Categories" className="flex flex-col gap-3 py-1">
        {FILTER_CATEGORIES.map((cat) => {
          const isSelected = filters.categories.some((c) => c.toLowerCase() === cat.toLowerCase());

          return (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategory(cat)}
              className={cn(
                "flex items-center justify-between w-full text-base transition-colors py-1 cursor-pointer group text-left",
                isSelected
                  ? "font-bold text-foreground"
                  : "text-black/60 dark:text-white/60 hover:text-foreground"
              )}
            >
              <span>{cat}</span>
              {/* White tick inside a rounded black circle when selected */}
              {isSelected && (
                <span className="w-5 h-5 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0 shadow-2xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              )}
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
              min={minBound}
              max={maxBound}
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
              const isSelected = filters.colors.some(
                (c) => c.toLowerCase() === col.name.toLowerCase()
              );
              return (
                <button
                  key={col.name}
                  type="button"
                  onClick={() => toggleColor(col.name)}
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

      {/* 4. Size Accordion (Multi-select) */}
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
              const isSelected = filters.sizes.some((s) => s.toLowerCase() === size.toLowerCase());
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  aria-pressed={isSelected}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
                    isSelected
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-xs font-semibold"
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

      {/* 5. Dress Style Accordion (Multi-select) */}
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
              const isSelected = filters.dressStyles.some(
                (ds) => ds.toLowerCase() === style.toLowerCase()
              );

              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => toggleDressStyle(style)}
                  className={cn(
                    "flex items-center justify-between w-full text-base transition-colors py-1 cursor-pointer group text-left",
                    isSelected
                      ? "font-bold text-foreground"
                      : "text-black/60 dark:text-white/60 hover:text-foreground"
                  )}
                >
                  <span>{style}</span>
                  {/* White tick inside a rounded black circle when selected */}
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0 shadow-2xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Divider */}
      <hr className="border-t border-black/10 dark:border-white/10 my-5" />

      {/* 5. Brands Accordion */}
      <div>
        <button
          type="button"
          onClick={() => setIsBrandsOpen(!isBrandsOpen)}
          className="flex items-center justify-between w-full text-left font-bold text-xl text-foreground cursor-pointer py-1"
          aria-expanded={isBrandsOpen}
        >
          <span>Brands</span>
          {isBrandsOpen ? (
            <ChevronUp className="w-5 h-5 text-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-foreground" />
          )}
        </button>

        {isBrandsOpen && (
          <nav aria-label="Brands" className="flex flex-col gap-3 pt-4 pb-1">
            {FILTER_BRANDS.map((b) => {
              const isSelected = (filters.brands || []).some(
                (brand) => brand.toLowerCase() === b.toLowerCase()
              );

              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => toggleBrand(b)}
                  className={cn(
                    "flex items-center justify-between w-full text-base transition-colors py-1 cursor-pointer group text-left",
                    isSelected
                      ? "font-bold text-foreground"
                      : "text-black/60 dark:text-white/60 hover:text-foreground"
                  )}
                >
                  <span>{b}</span>
                  {/* White tick inside a rounded black circle when selected */}
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0 shadow-2xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Divider */}
      <hr className="border-t border-black/10 dark:border-white/10 my-5" />

      {/* 6. On Sale Filter Toggle */}
      <div>
        <button
          type="button"
          onClick={() => onFilterChange({ onSaleOnly: !filters.onSaleOnly })}
          className={cn(
            "flex items-center justify-between w-full text-left py-1 cursor-pointer group transition-colors",
            filters.onSaleOnly
              ? "font-bold text-foreground"
              : "text-black/60 dark:text-white/60 hover:text-foreground"
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold font-sans">On Sale</span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400">
              % Deals
            </span>
          </div>
          {filters.onSaleOnly && (
            <span className="w-5 h-5 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0 shadow-2xs">
              <Check className="w-3 h-3 stroke-[3]" />
            </span>
          )}
        </button>
      </div>

      {/* Divider */}
      <hr className="border-t border-black/10 dark:border-white/10 my-5" />

      {/* 7. Action Button: Apply Filter & Optional Reset */}
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
