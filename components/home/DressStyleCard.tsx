import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DressStyleItem } from "./dress-style-data";

interface DressStyleCardProps {
  item: DressStyleItem;
  className?: string;
  priority?: boolean;
}

export function DressStyleCard({ item, className, priority = false }: DressStyleCardProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex w-full overflow-hidden rounded-[20px] bg-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]",
        // Card Heights: 190px on mobile, 205px on tablet, 289px on desktop
        "h-[190px] sm:h-[205px] lg:h-[289px]",
        className
      )}
      aria-label={`Browse ${item.title} dress style`}
    >
      {/* Category Title: Clean top-left placement with comfortable text scale */}
      <div className="absolute left-6 top-5 sm:left-6 sm:top-5 lg:left-9 lg:top-7 z-10 flex flex-col items-start gap-1 select-none pointer-events-none">
        <h3 className="font-sans font-bold text-2xl sm:text-2xl lg:text-4xl text-black tracking-tight">
          {item.title}
        </h3>

        {/* Elegant explore indicator revealed on desktop hover */}
        <span className="hidden lg:inline-flex items-center gap-1 text-xs font-medium text-black/60 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
          <span>Explore</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      {/* Full-bleed image wrapper - no border, no artificial seam line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          priority={priority}
          sizes={
            item.gridSpan === "large"
              ? "(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 800px"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 450px"
          }
          className={cn(
            "object-cover transition-transform duration-500 ease-out lg:group-hover:scale-105",
            item.imagePositionClass
          )}
        />
      </div>
    </Link>
  );
}
