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
  },
  {
    name: "Zara",
    src: "/assets/header/header-brand-logos/zara-logo-1 1.png",
    width: 91,
    height: 38,
  },
  {
    name: "Gucci",
    src: "/assets/header/header-brand-logos/gucci-logo-1 1.png",
    width: 156,
    height: 36,
  },
  {
    name: "Prada",
    src: "/assets/header/header-brand-logos/prada-logo-1 1.png",
    width: 194,
    height: 32,
  },
  {
    name: "Calvin Klein",
    src: "/assets/header/header-brand-logos/Group-1.png",
    width: 207,
    height: 33,
  },
];

// Double the items per set to ensure continuous coverage across all viewport widths up to 4K
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
          animation: marqueeScroll 30s linear infinite;
          will-change: transform;
        }
        .animate-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Infinite Horizontal Marquee with Constant X-Axis Gap */}
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="animate-marquee-track flex items-center">
          {/* First Set: Constant X-axis gap and matching right pad */}
          <div className="flex shrink-0 items-center gap-10 sm:gap-14 lg:gap-20 xl:gap-24 pr-10 sm:pr-14 lg:pr-20 xl:pr-24">
            {BRAND_SET.map((brand, idx) => (
              <div
                key={`brand-1-${brand.name}-${idx}`}
                className="shrink-0 flex items-center justify-center"
              >
                <Image
                  src={brand.src}
                  alt={`${brand.name} logo`}
                  width={brand.width}
                  height={brand.height}
                  priority
                  className="h-5 sm:h-6 lg:h-7 xl:h-8 w-auto object-contain select-none opacity-100 brightness-0 invert"
                />
              </div>
            ))}
          </div>

          {/* Second Set: Exact identical copy for flawless seamless looping */}
          <div
            className="flex shrink-0 items-center gap-10 sm:gap-14 lg:gap-20 xl:gap-24 pr-10 sm:pr-14 lg:pr-20 xl:pr-24"
            aria-hidden="true"
          >
            {BRAND_SET.map((brand, idx) => (
              <div
                key={`brand-2-${brand.name}-${idx}`}
                className="shrink-0 flex items-center justify-center"
              >
                <Image
                  src={brand.src}
                  alt={`${brand.name} logo`}
                  width={brand.width}
                  height={brand.height}
                  priority
                  className="h-5 sm:h-6 lg:h-7 xl:h-8 w-auto object-contain select-none opacity-100 brightness-0 invert"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
