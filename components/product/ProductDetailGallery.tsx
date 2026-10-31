"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductDetailGalleryProps {
  images: string[];
  title: string;
}

export function ProductDetailGallery({ images, title }: ProductDetailGalleryProps) {
  const [selectedIdx, setSelectedIdx] = React.useState(0);
  const activeImage = images[selectedIdx] || images[0];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-3.5 sm:gap-4 w-full">
      {/* Thumbnails: horizontal row on mobile, vertical stack on desktop */}
      <div className="grid grid-cols-3 lg:flex lg:flex-col gap-3 sm:gap-3.5 lg:w-[152px] shrink-0">
        {images.map((imgSrc, idx) => {
          const isSelected = idx === selectedIdx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              aria-label={`View thumbnail ${idx + 1} of ${title}`}
              aria-current={isSelected ? "true" : undefined}
              className={cn(
                "aspect-square bg-[#F0EEED] dark:bg-[#1A1A1A] rounded-[14px] sm:rounded-[20px] overflow-hidden p-2 sm:p-2.5 flex items-center justify-center cursor-pointer transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
                isSelected
                  ? "ring-1.5 ring-black dark:ring-white border border-black dark:border-white shadow-2xs"
                  : "border border-transparent hover:border-black/20 dark:hover:border-white/20 opacity-80 hover:opacity-100"
              )}
            >
              <Image
                src={imgSrc}
                alt={`${title} - view ${idx + 1}`}
                width={152}
                height={152}
                className="w-full h-full object-contain"
              />
            </button>
          );
        })}
      </div>

      {/* Featured / Large Main Image */}
      <div className="flex-1 aspect-square bg-[#F0EEED] dark:bg-[#1A1A1A] rounded-[20px] overflow-hidden flex items-center justify-center relative p-4 sm:p-6 lg:p-8 transition-colors">
        <Image
          src={activeImage}
          alt={title}
          width={600}
          height={600}
          priority
          className="w-full h-full object-contain transition-all duration-300 ease-out"
        />
      </div>
    </div>
  );
}
