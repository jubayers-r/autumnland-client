"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ProductDetail } from "@/types/product";
import { ProductDetailsContent } from "./ProductDetailsContent";
import { ProductFaqsContent } from "./ProductFaqsContent";
import { ProductReviewsSection } from "../reviews/ProductReviewsSection";

export type ProductTabId = "details" | "reviews" | "faqs";

interface ProductSectionTabsProps {
  product: ProductDetail;
  defaultTab?: ProductTabId;
  className?: string;
}

interface TabConfig {
  id: ProductTabId;
  label: string;
}

const TABS: TabConfig[] = [
  { id: "details", label: "Product Details" },
  { id: "reviews", label: "Rating & Reviews" },
  { id: "faqs", label: "FAQs" },
];

export function ProductSectionTabs({
  product,
  defaultTab = "reviews",
  className,
}: ProductSectionTabsProps) {
  const [activeTab, setActiveTab] = React.useState<ProductTabId>(defaultTab);

  return (
    <div className={cn("w-full flex flex-col", className)} data-product-tabs-container>
      {/* Tab Navigation Header */}
      <div
        role="tablist"
        aria-label="Product Information Tabs"
        className="grid grid-cols-3 border-b border-black/10 dark:border-white/10 w-full mb-6 sm:mb-8 lg:mb-9"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative py-4 sm:py-5 lg:py-6 text-center text-sm sm:text-base md:text-lg lg:text-xl font-sans transition-colors cursor-pointer select-none",
                "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-t-lg",
                isActive
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground font-normal"
              )}
            >
              <span className="block truncate px-1">{tab.label}</span>

              {/* Active Tab Underline Indicator matching reference */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-[2.5px] bg-foreground transition-all duration-300"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="w-full">
        {activeTab === "details" && (
          <div
            role="tabpanel"
            id="panel-details"
            aria-labelledby="tab-details"
            tabIndex={0}
            className="outline-hidden"
          >
            <ProductDetailsContent product={product} />
          </div>
        )}

        {activeTab === "reviews" && (
          <div
            role="tabpanel"
            id="panel-reviews"
            aria-labelledby="tab-reviews"
            tabIndex={0}
            className="outline-hidden"
          >
            <ProductReviewsSection
              productId={product.id}
              productTitle={product.title}
              initialTotalCount={451}
            />
          </div>
        )}

        {activeTab === "faqs" && (
          <div
            role="tabpanel"
            id="panel-faqs"
            aria-labelledby="tab-faqs"
            tabIndex={0}
            className="outline-hidden"
          >
            <ProductFaqsContent productTitle={product.title} />
          </div>
        )}
      </div>
    </div>
  );
}
