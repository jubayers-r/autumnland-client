"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, Check, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import { CartItemCard } from "./CartItemCard";

const emptySubscribe = () => () => {};

export function CartItemList() {
  const items = useCartStore((state) => state.items);
  const selectedItemIds = useCartStore((state) => state.selectedItemIds);
  const toggleSelectAll = useCartStore((state) => state.toggleSelectAll);
  const removeSelectedItems = useCartStore((state) => state.removeSelectedItems);

  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const selectedCount = selectedItemIds === null ? items.length : selectedItemIds.length;
  const isAllSelected = items.length > 0 && selectedCount === items.length;

  if (!mounted) {
    return (
      <div className="bg-card rounded-[20px] border border-black/10 dark:border-white/10 p-8 sm:p-12 min-h-[280px] flex items-center justify-center animate-pulse">
        <div className="w-8 h-8 rounded-full border-2 border-foreground/20 border-t-foreground animate-spin" />
      </div>
    );
  }

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
    <div className="flex flex-col gap-3.5 sm:gap-4 w-full">
      {/* Warning banner when no items are selected (matching user reference mockup) */}
      {selectedCount === 0 && (
        <div
          role="alert"
          data-cart-warning
          className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border-l-[5px] border-[#F59E0B] bg-[#FFFBEB] dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 shadow-2xs animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base">No items selected</span>
            <span className="text-amber-900/80 dark:text-amber-200/80 text-xs sm:text-sm">
              Select at least one item to checkout
            </span>
          </div>
        </div>
      )}

      {/* Select All Card (matching user reference mockup) */}
      <div className="bg-card rounded-[14px] sm:rounded-[18px] border border-black/10 dark:border-white/10 p-3.5 sm:p-4 flex items-center justify-between shadow-2xs">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <button
            type="button"
            role="checkbox"
            aria-checked={isAllSelected}
            aria-label="Select all items in cart"
            onClick={toggleSelectAll}
            className={cn(
              "w-5 h-5 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
              isAllSelected
                ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                : "border-black/30 dark:border-white/30 bg-background hover:border-black dark:hover:border-white"
            )}
          >
            {isAllSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </button>
          <span className="font-medium text-sm sm:text-base text-foreground">
            Select All ( {selectedCount}/{items.length} Items )
          </span>
        </label>

        {selectedCount > 0 && (
          <button
            type="button"
            onClick={removeSelectedItems}
            aria-label="Remove selected items"
            className="text-black/40 hover:text-red-500 dark:text-white/40 dark:hover:text-red-400 p-1.5 rounded-md transition-colors cursor-pointer"
            title="Delete selected items"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>

      {/* Cart Items List Container */}
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
    </div>
  );
}
