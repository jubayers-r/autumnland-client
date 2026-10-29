import * as React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
}

const SOCIAL_ITEMS = [
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: FaTwitter,
    variant: "outlined",
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebookF,
    variant: "filled",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
    variant: "outlined",
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: FaGithub,
    variant: "outlined",
  },
];

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div
      aria-label="Social Media Links"
      className={cn("flex items-center gap-3 sm:gap-3.5", className)}
    >
      {SOCIAL_ITEMS.map((item) => {
        const Icon = item.icon;
        const isFilled = item.variant === "filled";

        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit Autumnland on ${item.name}`}
            className={cn(
              "size-7 sm:size-8 rounded-full flex items-center justify-center transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring text-xs sm:text-sm shadow-2xs",
              isFilled
                ? "bg-black text-white hover:bg-black/80 hover:scale-105"
                : "bg-white text-black border border-black/15 hover:bg-black hover:text-white hover:border-black hover:scale-105"
            )}
          >
            <Icon className="size-3.5 sm:size-4" />
          </a>
        );
      })}
    </div>
  );
}
