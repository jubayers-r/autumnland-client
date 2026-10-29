"use client";

import * as React from "react";
import { TopBanner } from "./TopBanner";
import { Navbar } from "./Navbar";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn("w-full sticky top-0 z-50 flex flex-col", className)}>
      <div
        className={cn(
          "transition-all duration-300 overflow-hidden",
          isScrolled ? "max-h-0 opacity-0 pointer-events-none" : "max-h-12 opacity-100"
        )}
      >
        <TopBanner />
      </div>
      <Navbar isScrolled={isScrolled} />
    </header>
  );
}
