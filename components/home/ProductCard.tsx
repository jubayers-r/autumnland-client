"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import type { Product } from "./products-data";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const { id, title, imageSrc, imageAlt, rating, price, originalPrice, discount, href } = product;
  const formattedRating = Number.isInteger(rating) ? `${rating}.0` : `${rating}`;

  const handleQuickAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: id,
      title,
      price,
      imageSrc,
      size: "Large",
      color: "Standard",
      quantity: 1,
    });

    toast.success("Added to Cart!", {
      description: `${title} × 1`,
      action: {
        label: "View Cart",
        onClick: () => router.push("/cart"),
      },
    });
  };

  return (
    <article
      data-product-card
      data-product-id={id}
      className={cn("group relative flex flex-col w-full", className)}
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

        {/* Backdrop Shadow Gradient on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-1"
        />

        {/* Quick Add to Cart Button (Desktop hover) */}
        <div className="hidden md:block absolute inset-x-2.5 bottom-2.5 sm:inset-x-3.5 sm:bottom-3.5 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200">
          <button
            type="button"
            onClick={handleQuickAddToCart}
            aria-label={`Add ${title} to cart`}
            className="w-full h-9 sm:h-10 rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 flex items-center justify-center gap-1.5 sm:gap-2 font-medium text-xs sm:text-sm shadow-xl shadow-black/30 dark:shadow-white/10 active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Main Card Link wrapping title, rating, and price */}
      <Link
        href={href}
        className="flex flex-col w-full flex-1 mt-2.5 sm:mt-4 before:absolute before:inset-0 before:z-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
      >
        {/* Product Title */}
        <h3 className="font-bold text-sm sm:text-base lg:text-xl text-foreground font-sans tracking-tight truncate group-hover:underline">
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

      {/* Mobile Quick Add to Cart button (easy 1-tap for phone users) */}
      <div className="mt-2.5 md:hidden w-full relative z-10">
        <button
          type="button"
          onClick={handleQuickAddToCart}
          aria-label={`Add ${title} to cart`}
          className="w-full h-8 xs:h-9 rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-black/85 dark:hover:bg-white/85 flex items-center justify-center gap-1.5 font-medium text-xs shadow-xs active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </article>
  );
}
