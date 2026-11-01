"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "@/lib/cart-store";
import { useCartStore } from "@/lib/cart-store";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { id, productId, title, imageSrc, price, size, color, quantity } = item;
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  // Link to the actual product details page for this item
  const productHref = productId ? `/shop/product/${productId}` : "/shop";

  return (
    <article data-cart-item data-item-id={id} className="flex items-center gap-3.5 sm:gap-4 w-full">
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
      <div className="flex-1 flex flex-col justify-between min-w-0 h-[100px] sm:h-[124px] py-0.5">
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
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-xl sm:text-2xl text-foreground font-sans">${price}</span>

          {/* Quantity selector pill */}
          <div className="bg-[#F0F0F0] dark:bg-[#262626] rounded-full h-[36px] sm:h-[44px] flex items-center justify-between px-3 sm:px-4 gap-3 sm:gap-4 shrink-0 transition-colors">
            <button
              type="button"
              onClick={() => updateQuantity(id, -1)}
              disabled={quantity <= 1}
              aria-label={`Decrease quantity of ${title}`}
              className="w-5 h-5 flex items-center justify-center text-foreground hover:opacity-75 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-opacity"
            >
              <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
            <span className="font-bold text-xs sm:text-sm text-foreground font-sans min-w-[12px] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(id, 1)}
              aria-label={`Increase quantity of ${title}`}
              className="w-5 h-5 flex items-center justify-center text-foreground hover:opacity-75 cursor-pointer transition-opacity"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
