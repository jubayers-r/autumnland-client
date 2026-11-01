"use client";

import * as React from "react";
import { Check, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import type { ProductDetail } from "@/types/product";

interface ProductDetailOrderProps {
  product: ProductDetail;
}

export function ProductDetailOrder({ product }: ProductDetailOrderProps) {
  const { title, rating, price, originalPrice, discount, description, colors, sizes } = product;

  const [selectedColor, setSelectedColor] = React.useState(colors[0]);
  const defaultSize = sizes.includes("Large") ? "Large" : sizes[0];
  const [selectedSize, setSelectedSize] = React.useState(defaultSize);
  const [quantity, setQuantity] = React.useState(1);

  const formattedRating = Number.isInteger(rating) ? `${rating}.0` : `${rating}`;

  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      imageSrc: product.images[0],
      size: selectedSize,
      color: selectedColor.name,
      quantity,
    });
    toast.success("Added to Cart!", {
      description: `${title} (${selectedSize}, ${selectedColor.name}) × ${quantity}`,
    });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Title: Integral CF ExtraBold, uppercase with CSS unicode-range dash fallback */}
      <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-[40px] leading-[1.1] uppercase tracking-tight text-foreground">
        {title}
      </h1>

      {/* Star Rating & Score */}
      <div
        className="flex items-center gap-1.5 sm:gap-2 mt-2.5 sm:mt-3 text-xs sm:text-sm font-sans"
        aria-label={`${rating} out of 5 stars`}
      >
        <div className="flex items-center gap-1 shrink-0" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, index) => {
            const filled = index + 1 <= rating;
            const half = !filled && index < rating;

            return (
              <svg
                key={index}
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0"
                viewBox="0 0 20 20"
              >
                {half ? (
                  <g>
                    <defs>
                      <linearGradient id={`detail-half-star-${product.id}-${index}`}>
                        <stop offset="50%" stopColor="#FFC633" />
                        <stop offset="50%" stopColor="#E5E7EB" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                    <path
                      fill={`url(#detail-half-star-${product.id}-${index})`}
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

      {/* Pricing row with discount badge */}
      <div className="flex items-center gap-2.5 sm:gap-3 mt-3 sm:mt-3.5 font-sans">
        <span className="font-bold text-2xl sm:text-3xl text-foreground">${price}</span>
        {originalPrice && (
          <span className="font-bold text-2xl sm:text-3xl line-through text-black/40 dark:text-white/40">
            ${originalPrice}
          </span>
        )}
        {discount && (
          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-[#FF3333]/10 text-[#FF3333]">
            {discount}
          </span>
        )}
      </div>

      {/* Description copy */}
      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/60 dark:text-foreground/70 leading-relaxed font-sans max-w-xl">
        {description}
      </p>

      {/* Divider */}
      <hr className="border-t border-black/10 dark:border-white/10 my-4 sm:my-6" />

      {/* Select Colors */}
      <div>
        <p className="text-sm font-normal text-black/60 dark:text-white/60 mb-3">Select Colors</p>
        <div className="flex items-center gap-3">
          {colors.map((color) => {
            const isSelected = selectedColor.name === color.name;
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color)}
                aria-label={`Select color: ${color.name}`}
                aria-pressed={isSelected}
                style={{ backgroundColor: color.hex }}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring border border-black/10 dark:border-white/10",
                  isSelected && "ring-2 ring-offset-2 ring-black dark:ring-white"
                )}
              >
                {isSelected && <Check className="w-4 h-4 text-white stroke-[2.5]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-black/10 dark:border-white/10 my-4 sm:my-6" />

      {/* Choose Size */}
      <div>
        <p className="text-sm font-normal text-black/60 dark:text-white/60 mb-3">Choose Size</p>
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                aria-pressed={isSelected}
                className={cn(
                  "rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
                  isSelected
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-2xs"
                    : "bg-[#F0F0F0] dark:bg-[#262626] text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10"
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-black/10 dark:border-white/10 my-4 sm:my-6" />

      {/* Action Row: Quantity Counter + Add to Cart Button */}
      <div className="flex items-center gap-3 sm:gap-4 mt-1">
        {/* Quantity selector */}
        <div className="bg-[#F0F0F0] dark:bg-[#262626] rounded-full h-[52px] flex items-center justify-between px-4 sm:px-5 w-[120px] sm:w-[170px] shrink-0">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="w-8 h-8 flex items-center justify-center text-foreground hover:opacity-75 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-opacity"
          >
            <Minus className="w-4 h-4 stroke-[2.5]" />
          </button>
          <span className="font-bold text-base text-foreground font-sans">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            aria-label="Increase quantity"
            className="w-8 h-8 flex items-center justify-center text-foreground hover:opacity-75 cursor-pointer transition-opacity"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Add to Cart CTA */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 h-[52px] rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-medium text-sm sm:text-base hover:bg-black/90 dark:hover:bg-white/90 transition-colors cursor-pointer shadow-2xs active:scale-[0.99] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
