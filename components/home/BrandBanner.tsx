import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BRANDS } from "@/lib/brands-data";

interface BrandBannerProps {
  className?: string;
}

// Double the items per set to ensure continuous, seamlessly spaced coverage (8 logos visible on biggest screens)
const BRAND_SET = [...BRANDS, ...BRANDS];

export function BrandBanner({ className }: BrandBannerProps) {
  return (
    <section
      id="brands"
      aria-label="Partner Fashion Brands"
      className={cn("w-full bg-black py-7 sm:py-9 lg:py-10 overflow-hidden", className)}
    >
      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScroll 25s linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* Infinite Horizontal Marquee: 8 logos visible on biggest screen (12.5vw each), 3 on mobile (33.333vw each), no hover stopping */}
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="animate-marquee-track flex items-center">
          {/* First Set of 10 Logos */}
          <div className="flex shrink-0 items-center">
            {BRAND_SET.map((brand, idx) => (
              <div
                key={`brand-1-${brand.name}-${idx}`}
                className="w-[33.333vw] sm:w-[25vw] md:w-[20vw] lg:w-[12.5vw] shrink-0 flex items-center justify-center px-3 sm:px-4 lg:px-5"
              >
                <Image
                  src={brand.src}
                  alt={`${brand.name} logo`}
                  width={brand.width}
                  height={brand.height}
                  priority
                  className={cn(
                    "w-auto object-contain select-none opacity-100 brightness-0 invert pointer-events-none",
                    brand.logoClass
                  )}
                />
              </div>
            ))}
          </div>

          {/* Second Duplicate Set of 10 Logos for Seamless Infinite Loop */}
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {BRAND_SET.map((brand, idx) => (
              <div
                key={`brand-2-${brand.name}-${idx}`}
                className="w-[33.333vw] sm:w-[25vw] md:w-[20vw] lg:w-[12.5vw] shrink-0 flex items-center justify-center px-3 sm:px-4 lg:px-5"
              >
                <Image
                  src={brand.src}
                  alt={`${brand.name} logo`}
                  width={brand.width}
                  height={brand.height}
                  priority
                  className={cn(
                    "w-auto object-contain select-none opacity-100 brightness-0 invert pointer-events-none",
                    brand.logoClass
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
