import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandBannerProps {
  className?: string;
}

const BRANDS = [
  {
    name: "Versace",
    src: "/assets/header/header-brand-logos/Group.png",
    width: 166,
    height: 33,
    logoClass: "h-5 sm:h-6 lg:h-7",
  },
  {
    name: "Zara",
    src: "/assets/header/header-brand-logos/zara-logo-1 1.png",
    width: 91,
    height: 38,
    logoClass: "h-5.5 sm:h-7 lg:h-8.5",
  },
  {
    name: "Gucci",
    src: "/assets/header/header-brand-logos/gucci-logo-1 1.png",
    width: 156,
    height: 36,
    logoClass: "h-5 sm:h-6 lg:h-7",
  },
  {
    name: "Prada",
    src: "/assets/header/header-brand-logos/prada-logo-1 1.png",
    width: 194,
    height: 32,
    logoClass: "h-4.5 sm:h-5.5 lg:h-6.5",
  },
  {
    name: "Calvin Klein",
    src: "/assets/header/header-brand-logos/Group-1.png",
    width: 207,
    height: 33,
    logoClass: "h-4.5 sm:h-5.5 lg:h-6.5",
  },
];

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
          animation: marqueeScroll 20s linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* Infinite Horizontal Marquee: exactly 5 logos on desktop (20vw each), 3 on mobile (33.333vw each), no hover stopping */}
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="animate-marquee-track flex items-center">
          {/* First Set of 5 Logos */}
          <div className="flex shrink-0 items-center">
            {BRANDS.map((brand) => (
              <div
                key={`brand-1-${brand.name}`}
                className="w-[33.333vw] lg:w-[20vw] shrink-0 flex items-center justify-center px-3 sm:px-5 lg:px-6"
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

          {/* Second Duplicate Set of 5 Logos for Seamless Infinite Loop */}
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {BRANDS.map((brand) => (
              <div
                key={`brand-2-${brand.name}`}
                className="w-[33.333vw] lg:w-[20vw] shrink-0 flex items-center justify-center px-3 sm:px-5 lg:px-6"
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
