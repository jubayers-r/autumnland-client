"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/lib/cart-store";

const emptySubscribe = () => () => {};

export function CartMobileFooter() {
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const items = useCartStore((state) => state.items);
  const selectedItemIds = useCartStore((state) => state.selectedItemIds);
  const getSelectedItems = useCartStore((state) => state.getSelectedItems);
  const getTotal = useCartStore((state) => state.getTotal);

  if (!mounted || items.length === 0) return null;

  const selectedItems = getSelectedItems();
  const hasSelectedItems = selectedItemIds === null ? items.length > 0 : selectedItemIds.length > 0;
  const total = getTotal();

  const handleGiftOrder = () => {
    toast.info("Gift Order option selected", {
      description: "Gift wrapping & personalized message card will be included with this shipment.",
    });
  };

  const handleCheckout = () => {
    if (!hasSelectedItems) {
      toast.error("No items selected", {
        description: "Please select at least one item before proceeding to checkout.",
      });
      return;
    }
    toast.success("Proceeding to Checkout", {
      description: `Processing order for $${total} (${selectedItems.length} items). Payment gateway initializing.`,
    });
  };

  return (
    <div
      data-testid="cart-mobile-footer"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-md border-t border-border/40 px-4 py-3 shadow-lg"
    >
      <div className="max-w-md mx-auto flex items-center gap-3">
        {/* Gift Order Secondary Action */}
        <button
          type="button"
          onClick={handleGiftOrder}
          className="h-12 px-5 rounded-full border border-black/20 dark:border-white/20 bg-background hover:bg-secondary text-foreground text-sm font-semibold transition-colors flex items-center justify-center shrink-0 cursor-pointer active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Gift Order
        </button>

        {/* Go to Checkout Primary CTA */}
        <button
          type="button"
          onClick={handleCheckout}
          disabled={!hasSelectedItems}
          className="flex-1 h-12 px-6 rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span>Go to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
