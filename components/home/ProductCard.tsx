import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "./products-data";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const { id, title, imageSrc, imageAlt, rating, price, originalPrice, discount, href } = product;
  const formattedRating = Number.isInteger(rating) ? `${rating}.0` : `${rating}`;

  return (
    <article
      data-product-card
      data-product-id={id}
      className={cn("group flex flex-col w-full", className)}
    >
      <Link
        href={href}
        className="flex flex-col w-full h-full focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-[14px] sm:rounded-[20px]"
      >
        {/* Product Image Backdrop (#F0EEED / dark: #1A1A1A) */}
        <div className="w-full aspect-square bg-[#F0EEED] dark:bg-[#1A1A1A] rounded-[14px] sm:rounded-[20px] overflow-hidden flex items-center justify-center relative transition-colors">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={295}
            height={298}
            priority={priority}
            className="w-full h-full object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        </div>

        {/* Product Title */}
        <h3 className="font-bold text-sm sm:text-base lg:text-xl text-foreground font-sans mt-2.5 sm:mt-4 tracking-tight truncate">
          {title}
        </h3>

        {/* Star Rating & Score */}
        <div
          className="flex items-center gap-1 sm:gap-1.5 mt-1 sm:mt-1.5 text-xs sm:text-sm font-sans"
          aria-label={`${rating} out of 5 stars`}
        >
          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => {
              const filled = index + 1 <= rating;
              const half = !filled && index < rating;

              return (
                <svg
                  key={index}
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px] shrink-0"
                  viewBox="0 0 20 20"
                >
                  {half ? (
                    <g>
                      <defs>
                        <linearGradient id={`product-half-star-${id}-${index}`}>
                          <stop offset="50%" stopColor="#FFC633" />
                          <stop offset="50%" stopColor="#E5E7EB" stopOpacity="1" />
                        </linearGradient>
                      </defs>
                      <path
                        fill={`url(#product-half-star-${id}-${index})`}
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </g>
                  ) : (
                    <path
                      className={filled ? "fill-[#FFC633]" : "fill-black/15 dark:fill-white/20"}
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  )}
                </svg>
              );
            })}
          </div>

          <div className="flex items-center text-xs sm:text-sm">
            <span className="text-foreground font-normal">{formattedRating}</span>
            <span className="text-black/60 dark:text-white/60">/5</span>
          </div>
        </div>

        {/* Pricing & Discount Badge */}
        <div className="flex flex-wrap items-center gap-x-1.5 sm:gap-x-2.5 gap-y-1 mt-1 sm:mt-2 font-sans">
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <span className="font-bold text-base sm:text-lg lg:text-2xl text-foreground">
              ${price}
            </span>
            {originalPrice && (
              <span className="font-bold text-base sm:text-lg lg:text-2xl line-through text-black/40 dark:text-white/40">
                ${originalPrice}
              </span>
            )}
          </div>
          {discount && (
            <span className="inline-flex items-center justify-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-[#FF3333]/10 text-[#FF3333] shrink-0">
              {discount}
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}
