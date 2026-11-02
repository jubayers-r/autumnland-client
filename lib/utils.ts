import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Replaces hyphens/dashes in heading text with a font-sans styled dash.
 * The FSP DEMO Integral CF font lacks the hyphen glyph ('-').
 * This ensures the hyphen always renders visibly using the secondary font (Satoshi)
 * across all devices and screens wherever FSD demo font and '-' are used.
 */
export function renderHeadingText(text: string): React.ReactNode {
  if (
    !text ||
    (!text.includes("-") && !text.includes("–") && !text.includes("—") && !text.includes("&"))
  ) {
    return text;
  }

  const parts = text.split(/([-\u2010-\u2014\u2212&])/g);
  return parts.map((part, i) => {
    if (/[-\u2010-\u2014\u2212&]/.test(part)) {
      return React.createElement("span", { key: i, className: "font-sans font-black" }, part);
    }
    return part;
  });
}
