"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { CartItemCard } from "./CartItemCard";

export function CartItemList() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <div className="bg-card rounded-[20px] border border-black/10 dark:border-white/10 p-8 sm:p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#F0F0F0] dark:bg-[#262626] flex items-center justify-center text-muted-foreground mb-4">
          <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h2 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-foreground">
          YOUR CART IS EMPTY
        </h2>
        <p className="mt-2 text-sm sm:text-base text-foreground/60 dark:text-foreground/70 max-w-sm">
          Looks like you haven&apos;t added any items yet. Explore our latest arrivals to find
          something you love.
        </p>
        <Link
          href="/shop"
          className="mt-6 h-[48px] px-8 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-medium text-sm sm:text-base hover:bg-black/90 dark:hover:bg-white/90 transition-colors shadow-2xs"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-[20px] border border-black/10 dark:border-white/10 p-4 sm:p-5 lg:p-6 flex flex-col">
      {items.map((item, idx) => (
        <React.Fragment key={item.id}>
          <CartItemCard item={item} />
          {idx < items.length - 1 && (
            <hr className="border-t border-black/10 dark:border-white/10 my-4 sm:my-5" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
