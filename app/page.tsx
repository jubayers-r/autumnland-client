import { NEW_ARRIVALS, ProductSection, TOP_SELLING } from "@/components/home";
import { BrandBanner } from "@/components/home/BrandBanner";
import { BrowseByDressStyle } from "@/components/home/BrowseByDressStyle";
import { HeroSection } from "@/components/home/HeroSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full bg-background text-foreground">
      <HeroSection />
      <BrandBanner />
      <ProductSection
        id="newest"
        title="NEW ARRIVALS"
        products={NEW_ARRIVALS}
        viewAllHref="/shop?sort=newest"
        priority
      />
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <hr className="border-t border-black/10 dark:border-white/10 w-full" />
      </div>
      <ProductSection
        id="top-selling"
        title="TOP SELLING"
        products={TOP_SELLING}
        viewAllHref="/shop"
      />
      <BrowseByDressStyle />
      <TestimonialsSection />
    </main>
  );
}
