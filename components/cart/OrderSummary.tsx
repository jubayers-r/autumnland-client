"use client";

import * as React from "react";
import { ArrowRight, Tag } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/lib/cart-store";

const emptySubscribe = () => () => {};

export function OrderSummary() {
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getDiscountAmount = useCartStore((state) => state.getDiscountAmount);
  const getTotal = useCartStore((state) => state.getTotal);
  const deliveryFee = useCartStore((state) => state.deliveryFee);
  const discountPercentage = useCartStore((state) => state.discountPercentage);
  const applyPromo = useCartStore((state) => state.applyPromo);
  const items = useCartStore((state) => state.items);

  const [promoInput, setPromoInput] = React.useState("");

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const total = getTotal();

  const effectivePercentage =
    subtotal > 0 && discount > 0 ? Math.round((discount / subtotal) * 100) : discountPercentage;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const success = applyPromo(promoInput);
    if (success) {
      toast.success("Promo code applied!", {
        description: `Your ${promoInput.toUpperCase()} discount has been applied to this order.`,
      });
      setPromoInput("");
    } else {
      toast.error("Invalid promo code", {
        description: "Try code 'AUTUMN20' or 'VIP30' for instant savings.",
      });
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty", {
        description: "Please add products before checking out.",
      });
      return;
    }
    toast.success("Proceeding to Checkout", {
      description: `Processing order for $${total}. Payment gateway initializing.`,
    });
  };

  if (!mounted) {
    return (
      <div
        data-order-summary
        className="bg-card rounded-[20px] border border-black/10 dark:border-white/10 p-5 sm:p-6 lg:p-7 min-h-[350px] animate-pulse"
      />
    );
  }

  return (
    <div
      data-order-summary
      role="region"
      aria-label="Order summary"
      className="bg-card rounded-[20px] border border-black/10 dark:border-white/10 p-5 sm:p-6 lg:p-7 flex flex-col"
    >
      <h2 className="font-bold text-xl sm:text-2xl text-foreground font-sans mb-5 sm:mb-6">
        Order Summary
      </h2>

      {/* Breakdown rows */}
      <div className="flex flex-col gap-3.5 sm:gap-4 font-sans text-base sm:text-lg">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-black/60 dark:text-white/60">
          <span>Subtotal</span>
          <span className="font-bold text-foreground font-sans">${subtotal}</span>
        </div>

        {/* Discount */}
        <div className="flex items-center justify-between text-black/60 dark:text-white/60">
          <span>Discount (-{effectivePercentage}%)</span>
          <span className="font-bold text-[#FF3333] font-sans">
            {discount > 0 ? `-$${discount}` : "$0"}
          </span>
        </div>

        {/* Delivery Fee */}
        <div className="flex items-center justify-between text-black/60 dark:text-white/60">
          <span>Delivery Fee</span>
          <span className="font-bold text-foreground font-sans">
            {subtotal > 0 ? `$${deliveryFee}` : "$0"}
          </span>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-black/10 dark:border-white/10 my-4 sm:my-5" />

      {/* Total row */}
      <div className="flex items-center justify-between text-foreground font-sans">
        <span className="text-base sm:text-lg">Total</span>
        <span className="font-bold text-xl sm:text-2xl text-foreground font-sans">${total}</span>
      </div>

      {/* Promo Code Input Row */}
      <form onSubmit={handleApplyPromo} className="flex items-center gap-3 mt-5 sm:mt-6">
        <div className="relative flex-1 flex items-center bg-[#F0F0F0] dark:bg-[#262626] rounded-full h-[48px] px-4 transition-colors">
          <Tag className="w-4 h-4 text-black/40 dark:text-white/40 mr-2.5 shrink-0" />
          <input
            type="text"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            placeholder="Add promo code"
            aria-label="Promo code"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-hidden"
          />
        </div>
        <button
          type="submit"
          className="h-[48px] px-6 sm:px-8 rounded-full bg-black text-white dark:bg-white dark:text-black font-medium text-sm sm:text-base hover:bg-black/90 dark:hover:bg-white/90 transition-colors cursor-pointer shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          Apply
        </button>
      </form>

      {/* Go to Checkout CTA */}
      <button
        type="button"
        onClick={handleCheckout}
        disabled={items.length === 0}
        className="w-full h-[54px] sm:h-[60px] rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center gap-3 font-medium text-base hover:bg-black/90 dark:hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer mt-5 sm:mt-6 shadow-2xs active:scale-[0.99] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span>Go to Checkout</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
