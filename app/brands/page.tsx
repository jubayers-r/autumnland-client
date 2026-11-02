import * as React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { BRANDS } from "@/lib/brands-data";
import { CATALOG_PRODUCTS } from "@/lib/catalog-data";

export const metadata: Metadata = {
  title: "Featured Brands | AUTUMN LAND",
  description:
    "Explore iconic collections and premium craftsmanship from our world-class partner fashion brands: Versace, Zara, Gucci, Prada, and Calvin Klein.",
};

export default function BrandsPage() {
  // Compute available garment counts per brand from catalog dataset
  const brandProductCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const b of BRANDS) {
      counts[b.name] = CATALOG_PRODUCTS.filter(
        (p) => p.brand.toLowerCase() === b.name.toLowerCase()
      ).length;
    }
    return counts;
  }, []);

  return (
    <main className="flex-1 flex flex-col w-full bg-background text-foreground">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-5 sm:py-6 lg:py-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="breadcrumb"
          className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 font-sans"
        >
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground font-medium">Brands</span>
        </nav>

        {/* Section Heading & Subtitle */}
        <div className="flex flex-col gap-2 mb-8 sm:mb-12">
          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-normal sm:tracking-[0.02em] text-foreground">
            OUR BRAND PARTNERS
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl font-sans">
            Discover curated designer collections, contemporary streetwear, and refined luxury
            essentials from the world&apos;s most renowned fashion houses.
          </p>
        </div>

        {/* Responsive Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {BRANDS.map((brand) => {
            const count = brandProductCounts[brand.name] ?? 0;

            return (
              <Link
                key={brand.id}
                href={`/shop?brand=${encodeURIComponent(brand.name)}`}
                className="group flex flex-col justify-between bg-black text-white dark:bg-card dark:text-foreground rounded-[20px] sm:rounded-[24px] p-6 sm:p-8 border border-white/10 dark:border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <div>
                  {/* Brand Logo Container */}
                  <div className="h-20 sm:h-24 w-full flex items-center justify-center bg-white/5 dark:bg-white/5 rounded-2xl p-4 mb-6">
                    <Image
                      src={brand.src}
                      alt={`${brand.name} logo`}
                      width={brand.width}
                      height={brand.height}
                      className="max-h-8 sm:max-h-10 w-auto object-contain brightness-0 invert"
                    />
                  </div>

                  {/* Brand Info */}
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-heading font-bold text-xl sm:text-2xl text-white dark:text-foreground">
                      {brand.name}
                    </h2>
                    <span className="text-2xs sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 dark:bg-white/10 text-white/90">
                      {count} {count === 1 ? "Product" : "Products"}
                    </span>
                  </div>

                  <p className="text-white/70 dark:text-muted-foreground text-xs sm:text-sm font-sans leading-relaxed mb-6">
                    {brand.description}
                  </p>
                </div>

                {/* Footer Action Link */}
                <div className="pt-4 border-t border-white/10 dark:border-white/10 flex items-center justify-between text-xs sm:text-sm font-medium text-white/90 group-hover:text-white dark:text-foreground">
                  <span>Explore Collection</span>
                  <ArrowRight className="size-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
