import * as React from "react";
import { cn } from "@/lib/utils";
import { DRESS_STYLES, type DressStyleItem } from "./dress-style-data";
import { DressStyleCard } from "./DressStyleCard";

interface BrowseByDressStyleProps {
  className?: string;
  items?: DressStyleItem[];
}

export function BrowseByDressStyle({ className, items = DRESS_STYLES }: BrowseByDressStyleProps) {
  const casual = items.find((i) => i.id === "casual") ?? items[0];
  const formal = items.find((i) => i.id === "formal") ?? items[1];
  const party = items.find((i) => i.id === "party") ?? items[2];
  const gym = items.find((i) => i.id === "gym") ?? items[3];

  return (
    <section
      id="browse-by-dress-style"
      aria-label="Browse by Dress Style"
      className={cn(
        "w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-16",
        className
      )}
    >
      {/* Outer Rounded Container with light grey background (#F0F0F0) and 40px radius */}
      <div className="w-full bg-[#F0F0F0] dark:bg-[#1A1A1A] rounded-[20px] sm:rounded-[28px] lg:rounded-[40px] px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16 transition-colors">
        {/* Section Heading: Integral CF ExtraBold, Uppercase */}
        <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-[48px] leading-[1.1] tracking-tight uppercase text-center text-foreground mb-7 sm:mb-10 lg:mb-16 max-w-[280px] sm:max-w-none mx-auto">
          BROWSE BY DRESS STYLE
        </h2>

        {/* Dress Style Cards Bento Layout */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {/* Row 1: Casual (small ~37.3%) & Formal (large ~62.7%) */}
          <div className="browse-style-row-1">
            {casual && <DressStyleCard item={casual} priority />}
            {formal && <DressStyleCard item={formal} priority />}
          </div>

          {/* Row 2: Party (large ~62.7%) & Gym (small ~37.3%) */}
          <div className="browse-style-row-2">
            {party && <DressStyleCard item={party} />}
            {gym && <DressStyleCard item={gym} />}
          </div>
        </div>
      </div>
    </section>
  );
}
