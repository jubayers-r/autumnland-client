"use client";

import * as React from "react";
import { PackageSearch } from "lucide-react";
import { ProductCard } from "@/components/home/ProductCard";
import type { CatalogProduct } from "@/lib/catalog-data";

interface ShopProductGridProps {
  products: CatalogProduct[];
  onResetFilters?: () => void;
}

export function ShopProductGrid({ products, onResetFilters }: ShopProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="w-full bg-card rounded-[20px] border border-black/10 dark:border-white/10 p-8 sm:p-14 flex flex-col items-center justify-center text-center my-6">
        <div className="w-16 h-16 rounded-full bg-[#F0F0F0] dark:bg-[#262626] flex items-center justify-center text-muted-foreground mb-4">
          <PackageSearch className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h3 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-foreground">
          NO PRODUCTS FOUND
        </h3>
        <p className="mt-2 text-sm sm:text-base text-foreground/60 dark:text-foreground/70 max-w-md font-sans">
          We couldn&apos;t find any items matching your exact filter combination. Try clearing some
          filters or expanding your price range.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-6 h-11 px-7 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-medium text-sm hover:bg-black/85 dark:hover:bg-white/85 transition-colors shadow-xs cursor-pointer"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 md:gap-5 lg:gap-6 w-full">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 3} className="flex" />
      ))}
    </div>
  );
}
