"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Check } from "lucide-react";
import type { CartItem } from "@/lib/cart-store";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { id, productId, title, imageSrc, price, size, color, quantity } = item;
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const isSelected = useCartStore((state) => state.isItemSelected(id));
  const toggleSelectItem = useCartStore((state) => state.toggleSelectItem);

  // Link to the actual product details page for this item
  const productHref = productId ? `/shop/product/${productId}` : "/shop";

  return (
    <article
      data-cart-item
      data-item-id={id}
      className={cn(
        "flex items-start sm:items-center gap-2.5 sm:gap-4 w-full transition-opacity",
        !isSelected && "opacity-60"
      )}
    >
      {/* Item Selection Checkbox */}
      <button
        type="button"
        role="checkbox"
        aria-checked={isSelected}
        aria-label={`Select ${title}`}
        onClick={() => toggleSelectItem(id)}
        className={cn(
          "w-5 h-5 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors cursor-pointer self-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
          isSelected
            ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
            : "border-black/30 dark:border-white/30 bg-background hover:border-black dark:hover:border-white"
        )}
      >
        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </button>

      {/* Product Image Backdrop (#F0EEED) - Clickable link to product page */}
      <Link
        href={productHref}
        aria-label={`View details for ${title}`}
        className="w-[100px] h-[100px] sm:w-[124px] sm:h-[124px] rounded-[14px] bg-[#F0EEED] dark:bg-[#1A1A1A] overflow-hidden flex items-center justify-center shrink-0 p-1.5 sm:p-2 transition-transform hover:scale-[1.02] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Image
          src={imageSrc}
          alt={title}
          width={124}
          height={124}
          className="w-full h-full object-contain"
        />
      </Link>

      {/* Item Details Column */}
      <div className="flex-1 flex flex-col justify-between min-w-0 min-h-[100px] sm:min-h-[124px] py-0.5 gap-1.5 sm:gap-2">
        {/* Top: Title (Clickable link to product page) & Delete Trash Icon */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-base sm:text-xl text-foreground font-sans truncate">
            <Link
              href={productHref}
              className="hover:underline hover:opacity-85 transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-xs"
            >
              {title}
            </Link>
          </h3>
          <button
            type="button"
            onClick={() => removeItem(id)}
            aria-label={`Remove ${title} from cart`}
            className="text-[#FF3333] hover:text-[#DC2626] transition-colors p-1 -mr-1 cursor-pointer shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
          </button>
        </div>

        {/* Middle: Size & Color */}
        <div className="text-xs sm:text-sm font-sans flex flex-col gap-0.5">
          <p className="text-foreground">
            Size: <span className="text-black/60 dark:text-white/60">{size}</span>
          </p>
          <p className="text-foreground">
            Color: <span className="text-black/60 dark:text-white/60">{color}</span>
          </p>
        </div>

        {/* Bottom: Price & Quantity Pill Counter */}
        <div className="flex items-end sm:items-center justify-between gap-2 mt-auto pt-1">
          <div className="flex items-baseline gap-1.5 xs:gap-2 flex-wrap min-w-0">
            <span className="font-bold text-base xs:text-lg sm:text-2xl text-foreground font-sans">
              ${price}
            </span>
            {item.originalPrice && item.originalPrice > price && (
              <span className="text-black/40 dark:text-white/40 line-through font-bold text-xs xs:text-sm sm:text-base font-sans">
                ${item.originalPrice}
              </span>
            )}
            {item.discount && (
              <span className="bg-[#FF3333]/10 text-[#FF3333] text-[9px] xs:text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full font-sans whitespace-nowrap">
                {item.discount}
              </span>
            )}
          </div>

          {/* Quantity selector pill */}
          <div className="bg-[#F0F0F0] dark:bg-[#262626] rounded-full h-[32px] sm:h-[44px] flex items-center justify-between px-2.5 sm:px-4 gap-2.5 sm:gap-4 shrink-0 transition-colors">
            <button
              type="button"
              onClick={() => updateQuantity(id, -1)}
              disabled={quantity <= 1}
              aria-label={`Decrease quantity of ${title}`}
              className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-foreground hover:opacity-75 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-opacity"
            >
              <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
            </button>
            <span className="font-bold text-xs sm:text-sm text-foreground font-sans min-w-[12px] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(id, 1)}
              aria-label={`Increase quantity of ${title}`}
              className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-foreground hover:opacity-75 cursor-pointer transition-opacity"
            >
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
