import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PaymentBadgesProps {
  className?: string;
}

const BADGES = [
  {
    name: "Visa",
    src: "/assets/footer/Badge.png",
  },
  {
    name: "Mastercard",
    src: "/assets/footer/Badge-1.png",
  },
  {
    name: "PayPal",
    src: "/assets/footer/Badge-2.png",
  },
  {
    name: "Apple Pay",
    src: "/assets/footer/Badge-3.png",
  },
  {
    name: "Google Pay",
    src: "/assets/footer/Badge-4.png",
  },
];

export function PaymentBadges({ className }: PaymentBadgesProps) {
  return (
    <div
      aria-label="Supported Payment Methods"
      className={cn("flex items-center flex-wrap gap-2.5 sm:gap-3", className)}
    >
      {BADGES.map((badge) => (
        <div
          key={badge.name}
          title={badge.name}
          aria-label={badge.name}
          className="flex items-center justify-center shrink-0 select-none transition-transform hover:scale-105"
        >
          <Image
            src={badge.src}
            alt={badge.name}
            width={260}
            height={194}
            className="h-7 sm:h-8 w-auto object-contain"
          />
        </div>
      ))}
    </div>
  );
}
