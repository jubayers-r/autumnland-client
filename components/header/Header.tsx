import * as React from "react";
import { TopBanner } from "./TopBanner";
import { Navbar } from "./Navbar";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("w-full relative lg:sticky lg:top-0 lg:z-40 flex flex-col", className)}>
      <TopBanner />
      <Navbar />
    </header>
  );
}
