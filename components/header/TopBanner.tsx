"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopBannerProps {
  className?: string;
}

export function TopBanner({ className }: TopBannerProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Announcement"
      className={cn(
        "relative w-full bg-black text-white px-4 py-2 sm:py-2.5 transition-all duration-200",
        className
      )}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-center text-center px-4 sm:px-8 lg:px-12 pr-8 sm:pr-8 lg:pr-12">
        <p className="text-xs sm:text-sm font-normal text-white/90">
          Sign up and get 20% off to your first order.{" "}
          <Link
            href="/register"
            className="font-medium text-white underline underline-offset-4 hover:text-white/80 transition-colors inline-block ml-0.5"
          >
            Sign Up Now
          </Link>
        </p>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(false)}
        aria-label="Dismiss banner"
        className="absolute right-3 sm:right-6 md:right-10 lg:right-12 top-1/2 -translate-y-1/2 p-1 text-white/80 hover:text-white transition-opacity rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <X className="size-3.5 sm:size-4" />
      </button>
    </div>
  );
}
