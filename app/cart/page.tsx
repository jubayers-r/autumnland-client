import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CartItemList } from "@/components/cart/CartItemList";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { CartMobileFooter } from "@/components/cart/CartMobileFooter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Your Cart | AUTUMN LAND",
  description: "View and manage items in your shopping cart.",
};

export default function CartPage() {
  return (
    <main className="flex-1 flex flex-col w-full bg-background text-foreground pb-24 lg:pb-8">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-5 sm:py-6 lg:py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-4 sm:mb-6">
          <BreadcrumbList className="text-xs sm:text-sm font-sans text-muted-foreground">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-foreground">Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Title: Integral CF Bold Uppercase */}
        <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-[40px] uppercase tracking-tight text-foreground mb-5 sm:mb-6 lg:mb-8">
          YOUR CART
        </h1>

        {/* Main 2-column layout on desktop / stacked mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
          <section aria-label="Cart items" className="w-full lg:col-span-7 xl:col-span-7">
            <CartItemList />
          </section>

          <aside
            aria-label="Order summary"
            className="w-full lg:col-span-5 xl:col-span-5 lg:sticky lg:top-24"
          >
            <OrderSummary />
          </aside>
        </div>
      </div>

      {/* Mobile Sticky Bottom Checkout Bar (Hidden on desktop) */}
      <CartMobileFooter />
    </main>
  );
}
