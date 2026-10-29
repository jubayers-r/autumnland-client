import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      aria-label="Hero Introduction"
      className={cn("w-full bg-[#F2F0F1] overflow-hidden pt-6 sm:pt-10 lg:pt-0", className)}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:pl-10 xl:pl-14 lg:pr-0">
        <div className="flex flex-col lg:grid lg:grid-cols-12 items-end">
          {/* Left Column: Headline, Copy, CTA, and Stats */}
          <div className="w-full lg:col-span-7 flex flex-col justify-center text-left pt-6 sm:pt-8 lg:pt-16 pb-8 sm:pb-12 lg:pb-24">
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] sm:leading-[1.0] lg:leading-[64px] tracking-tight uppercase text-foreground">
              FIND CLOTHES
              <br />
              THAT MATCHES
              <br />
              YOUR STYLE
            </h1>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-muted-foreground max-w-lg leading-relaxed font-sans">
              Browse through our diverse range of meticulously crafted garments, designed to bring
              out your individuality and cater to your sense of style.
            </p>

            <div className="mt-6 sm:mt-8 w-full sm:w-auto">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center px-12 sm:px-14 py-3.5 sm:py-4 rounded-full bg-black text-white text-sm sm:text-base font-medium hover:bg-black/85 active:scale-[0.99] transition-all shadow-sm"
              >
                Shop Now
              </Link>
            </div>

            {/* Social Proof Statistics - Desktop Layout (Row with dividers) */}
            <div className="hidden lg:flex items-center gap-8 mt-12">
              <div className="flex flex-col">
                <span className="font-sans font-bold text-4xl text-foreground tracking-tight">
                  200+
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground mt-1 whitespace-nowrap">
                  International Brands
                </span>
              </div>
              <div className="h-12 w-px bg-black/15 mx-2" />
              <div className="flex flex-col">
                <span className="font-sans font-bold text-4xl text-foreground tracking-tight">
                  2,000+
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground mt-1 whitespace-nowrap">
                  High-Quality Products
                </span>
              </div>
              <div className="h-12 w-px bg-black/15 mx-2" />
              <div className="flex flex-col">
                <span className="font-sans font-bold text-4xl text-foreground tracking-tight">
                  30,000+
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground mt-1 whitespace-nowrap">
                  Happy Customers
                </span>
              </div>
            </div>

            {/* Social Proof Statistics - Mobile Layout (2 top row, 1 centered bottom) */}
            <div className="flex flex-col items-center mt-8 sm:mt-10 lg:hidden w-full">
              <div className="flex items-center justify-center gap-6 sm:gap-10 w-full">
                <div className="flex flex-col items-start text-left">
                  <span className="font-sans font-bold text-2xl sm:text-3xl text-foreground">
                    200+
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap mt-0.5">
                    International Brands
                  </span>
                </div>
                <div className="h-10 w-px bg-black/15" />
                <div className="flex flex-col items-start text-left">
                  <span className="font-sans font-bold text-2xl sm:text-3xl text-foreground">
                    2,000+
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap mt-0.5">
                    High-Quality Products
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center text-center mt-4">
                <span className="font-sans font-bold text-2xl sm:text-3xl text-foreground">
                  30,000+
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap mt-0.5">
                  Happy Customers
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Models & Floating Decorative Stars */}
          <div className="w-full lg:col-span-5 relative flex items-end justify-center lg:justify-end self-end pt-4 sm:pt-6 lg:pt-0">
            {/* Big Star (Top Right) */}
            <div className="absolute top-4 sm:top-8 right-2 sm:right-6 lg:right-6 xl:right-10 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 pointer-events-none z-10">
              <Image
                src="/assets/header/header-shining-start-vector.png"
                alt=""
                width={96}
                height={96}
                priority
                className="w-full h-full object-contain"
              />
            </div>

            {/* Small Star (Left Center) */}
            <div className="absolute top-1/3 sm:top-2/5 left-3 sm:left-6 lg:-left-6 xl:-left-8 -translate-y-1/2 w-9 sm:w-11 lg:w-14 h-9 sm:h-11 lg:h-14 pointer-events-none z-10">
              <Image
                src="/assets/header/header-shining-start-vector.png"
                alt=""
                width={56}
                height={56}
                priority
                className="w-full h-full object-contain"
              />
            </div>

            {/* Models Image: 80% height coverage on desktop, preserved for mobile */}
            <div className="relative w-full flex items-end justify-center lg:justify-end overflow-visible">
              <Image
                src="/assets/header/hero-models.png"
                alt="Models showcasing modern autumn style"
                width={1344}
                height={1326}
                priority
                className="w-full max-w-[360px] sm:max-w-[460px] lg:max-w-none lg:w-auto lg:h-[540px] xl:h-[620px] 2xl:h-[670px] object-contain object-bottom select-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
