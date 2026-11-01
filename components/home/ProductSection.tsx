import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "./products-data";
import { ProductCard } from "./ProductCard";

interface ProductSectionProps {
  id: string;
  title: string;
  products: Product[];
  viewAllHref?: string | null;
  showViewAll?: boolean;
  className?: string;
  titleClassName?: string;
  priority?: boolean;
}

export function ProductSection({
  id,
  title,
  products,
  viewAllHref = "/shop",
  showViewAll = true,
  className,
  titleClassName,
  priority = false,
}: ProductSectionProps) {
  return (
    <section
      id={id}
      aria-label={title}
      className={cn(
        "w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16",
        className
      )}
    >
      {/* Section Title: Integral CF ExtraBold, Centered, single-line on phone */}
      <h2
        className={cn(
          "font-heading font-black text-[20px] xs:text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-tight tracking-tight uppercase text-center text-foreground mb-6 sm:mb-9 lg:mb-14",
          titleClassName
        )}
      >
        {title}
      </h2>

      {/* Product List: 2 cards per row on mobile (2 rows = 4 cards), 4-column Grid on Desktop */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-4 lg:gap-6 w-full">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={priority && index < 2}
            className="flex"
          />
        ))}
      </div>

      {/* View All Pill Button */}
      {showViewAll && viewAllHref && (
        <div className="mt-6 sm:mt-9 lg:mt-12 flex justify-center">
          <Link
            href={viewAllHref}
            className="w-full sm:w-[218px] h-[46px] sm:h-[52px] rounded-full border border-black/10 dark:border-white/10 bg-background text-foreground flex items-center justify-center font-medium text-sm sm:text-base hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            View All
          </Link>
        </div>
      )}
    </section>
  );
}
