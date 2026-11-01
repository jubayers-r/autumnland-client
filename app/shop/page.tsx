import * as React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopView } from "@/components/shop";

export const metadata: Metadata = {
  title: "Shop & Categories | AUTUMN LAND",
  description:
    "Browse through our curated collection of casual, formal, party, and gym wear. Filter by size, color, category, and price.",
};

function ShopSkeleton() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-5 sm:py-6 lg:py-8 animate-pulse">
      <div className="h-4 w-32 bg-black/10 dark:bg-white/10 rounded-sm mb-6" />
      <div className="flex gap-8">
        <div className="hidden lg:block w-[295px] h-[600px] bg-black/5 dark:bg-white/5 rounded-[20px]" />
        <div className="flex-1 flex flex-col gap-6">
          <div className="h-10 w-48 bg-black/10 dark:bg-white/10 rounded-md" />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-black/5 dark:bg-white/5 rounded-[20px]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <main className="flex-1 flex flex-col w-full bg-background text-foreground">
      <Suspense fallback={<ShopSkeleton />}>
        <ShopView />
      </Suspense>
    </main>
  );
}
