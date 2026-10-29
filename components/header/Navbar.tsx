"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Search, ShoppingCart, CircleUser, ChevronDown, Sparkles } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
  isScrolled?: boolean;
}

export function Navbar({ className, isScrolled: isScrolledProp }: NavbarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [internalScrolled, setInternalScrolled] = React.useState(false);

  React.useEffect(() => {
    if (isScrolledProp !== undefined) return;
    const handleScroll = () => {
      setInternalScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolledProp]);

  const isScrolled = isScrolledProp !== undefined ? isScrolledProp : internalScrolled;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Reusable Mobile Drawer Navigation Menu
  const mobileDrawer = (
    <SheetContent side="left" className="w-[85vw] max-w-xs p-0 flex flex-col bg-background">
      <SheetHeader className="p-6 border-b border-border/40 text-left">
        <SheetTitle className="font-heading font-black text-xl tracking-normal uppercase">
          AUTUMN LAND
        </SheetTitle>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground px-2 py-1">
            Categories
          </span>
          <SheetClose asChild>
            <Link
              href="/shop"
              className="px-3 py-2 text-base font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              All Collections
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/shop?category=casual"
              className="px-3 py-2 text-base font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Casual
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/shop?category=formal"
              className="px-3 py-2 text-base font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Formal
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/shop?category=party"
              className="px-3 py-2 text-base font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Party
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/shop?category=gym"
              className="px-3 py-2 text-base font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Gym & Fitness
            </Link>
          </SheetClose>
        </div>

        <div className="h-px bg-border/40" />

        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground px-2 py-1">
            Featured
          </span>
          <SheetClose asChild>
            <Link
              href="/shop?filter=sale"
              className="px-3 py-2 text-base font-medium rounded-lg hover:bg-secondary transition-colors flex items-center justify-between"
            >
              <span>On Sale</span>
              <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">
                Hot
              </span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/shop?sort=newest"
              className="px-3 py-2 text-base font-medium rounded-lg hover:bg-secondary transition-colors flex items-center justify-between"
            >
              <span>New Arrivals</span>
              <Sparkles className="size-4 text-amber-500" />
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/#brands"
              className="px-3 py-2 text-base font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Top Brands
            </Link>
          </SheetClose>
        </div>
      </div>

      <div className="p-6 border-t border-border/40 flex flex-col gap-3 bg-secondary/30">
        <SheetClose asChild>
          <Link
            href="/login"
            className="w-full text-center py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Sign In
          </Link>
        </SheetClose>
      </div>
    </SheetContent>
  );

  return (
    <nav
      className={cn(
        "w-full bg-background/95 backdrop-blur-sm border-b border-border/40 transition-colors",
        className
      )}
    >
      {/* =========================================================================
          1. MOBILE VIEW (md:hidden)
          - Unscrolled: Row 1 (Hamburger, Logo, Cart, User) + Row 2 (Search Bar)
          - Scrolled: Compact 1-row sticky (Hamburger + Search Bar + Cart)
         ========================================================================= */}
      <div className="md:hidden flex flex-col w-full">
        {!isScrolled ? (
          /* Initial Unscrolled Mobile Layout */
          <div className="flex flex-col w-full">
            {/* Row 1: Logo & Actions */}
            <div className="h-16 px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <button
                      type="button"
                      aria-label="Open navigation menu"
                      className="p-1.5 -ml-1 text-foreground hover:bg-secondary rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Menu className="size-6" />
                    </button>
                  </SheetTrigger>
                  {mobileDrawer}
                </Sheet>

                <Link
                  href="/"
                  className="font-heading font-black text-2xl tracking-normal uppercase select-none text-foreground flex items-center"
                >
                  AUTUMN LAND
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/cart"
                  aria-label="Shopping Cart"
                  className="relative p-1.5 text-foreground hover:opacity-75 transition-opacity rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ShoppingCart className="size-6" />
                </Link>

                <Link
                  href="/login"
                  aria-label="User Account"
                  className="p-1.5 text-foreground hover:opacity-75 transition-opacity rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <CircleUser className="size-6" />
                </Link>
              </div>
            </div>

            {/* Row 2: Search Bar directly after logos and actions */}
            <div className="px-4 pb-3 pt-0.5">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-3 bg-[#F0F0F0] dark:bg-muted/80 rounded-full px-4 py-2 w-full focus-within:ring-2 focus-within:ring-foreground/20"
              >
                <Search className="size-4 text-muted-foreground shrink-0" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none border-none text-foreground"
                />
              </form>
            </div>
          </div>
        ) : (
          /* Scrolled Mobile Layout: Hamburger + Search Bar + Cart */
          <div className="h-14 px-3.5 flex items-center gap-3 justify-between animate-in fade-in duration-200">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open navigation menu"
                  className="p-1.5 -ml-1 text-foreground hover:bg-secondary rounded-full shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Menu className="size-6" />
                </button>
              </SheetTrigger>
              {mobileDrawer}
            </Sheet>

            {/* Center Expanded Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex-1 flex items-center gap-2.5 bg-[#F0F0F0] dark:bg-muted/80 rounded-full px-3.5 py-1.5 focus-within:ring-2 focus-within:ring-foreground/20"
            >
              <Search className="size-4 text-muted-foreground shrink-0" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none border-none text-foreground"
              />
            </form>

            {/* Right Cart Icon */}
            <Link
              href="/cart"
              aria-label="Shopping Cart"
              className="relative p-1.5 text-foreground hover:opacity-75 shrink-0 transition-opacity rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ShoppingCart className="size-6" />
            </Link>
          </div>
        )}
      </div>

      {/* =========================================================================
          2. DESKTOP VIEW (hidden md:flex)
          - Single-row layout matching reference
         ========================================================================= */}
      <div className="hidden md:flex max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 h-18 sm:h-20 items-center justify-between gap-3 sm:gap-6 lg:gap-10">
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-heading font-black text-2xl sm:text-3xl tracking-normal sm:tracking-[0.02em] uppercase select-none text-foreground flex items-center"
        >
          AUTUMN LAND
        </Link>

        {/* Center Desktop Navigation Links */}
        <div className="flex items-center gap-5 lg:gap-8 text-sm lg:text-base font-normal text-foreground shrink-0">
          {/* Shop Hover Dropdown */}
          <div className="relative group py-2">
            <button
              type="button"
              className="flex items-center gap-1 hover:text-muted-foreground transition-colors focus:outline-none rounded px-1 text-sm lg:text-base font-normal text-foreground"
            >
              <span>Shop</span>
              <ChevronDown className="size-4 text-foreground/70 transition-transform duration-200 group-hover:rotate-180" />
            </button>

            {/* Bridge & Dropdown Menu Container */}
            <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
              <div className="w-56 p-2 rounded-2xl shadow-xl border border-border/80 bg-background">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-1.5">
                  Categories
                </div>
                <div className="flex flex-col gap-0.5">
                  <Link
                    href="/shop"
                    className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors text-foreground block"
                  >
                    All Collections
                  </Link>
                  <Link
                    href="/shop?category=casual"
                    className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors text-foreground block"
                  >
                    Casual Style
                  </Link>
                  <Link
                    href="/shop?category=formal"
                    className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors text-foreground block"
                  >
                    Formal Style
                  </Link>
                  <Link
                    href="/shop?category=party"
                    className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors text-foreground block"
                  >
                    Party Style
                  </Link>
                  <Link
                    href="/shop?category=gym"
                    className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors text-foreground block"
                  >
                    Gym & Athletic
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/shop?filter=sale" className="hover:text-muted-foreground transition-colors">
            On Sale
          </Link>
          <Link href="/shop?sort=newest" className="hover:text-muted-foreground transition-colors">
            New Arrivals
          </Link>
          <Link href="/#brands" className="hover:text-muted-foreground transition-colors">
            Brands
          </Link>
        </div>

        {/* Desktop Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center gap-3 bg-[#F0F0F0] dark:bg-muted/80 rounded-full px-4 py-2.5 flex-1 max-w-sm lg:max-w-md xl:max-w-lg transition-all focus-within:ring-2 focus-within:ring-foreground/20"
        >
          <Search className="size-4 sm:size-5 text-muted-foreground shrink-0" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none border-none text-foreground"
          />
        </form>

        {/* Right Action Icons (Desktop) */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 shrink-0">
          {/* Cart Icon */}
          <Link
            href="/cart"
            aria-label="Shopping Cart"
            className="relative p-1.5 text-foreground hover:opacity-75 transition-opacity rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ShoppingCart className="size-5 sm:size-6" />
          </Link>

          {/* User Profile / Account Icon */}
          <Link
            href="/login"
            aria-label="User Account"
            className="p-1.5 text-foreground hover:opacity-75 transition-opacity rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <CircleUser className="size-5 sm:size-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
