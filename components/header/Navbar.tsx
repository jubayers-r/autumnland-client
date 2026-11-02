"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  Search,
  ShoppingCart,
  CircleUser,
  ChevronDown,
  Sparkles,
  Check,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isCartPage = pathname === "/cart";

  const [searchQuery, setSearchQuery] = React.useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [showFloatingSearch, setShowFloatingSearch] = React.useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = React.useState(false);
  const staticNavRef = React.useRef<HTMLDivElement>(null);
  const shopDropdownRef = React.useRef<HTMLDivElement>(null);

  // Cart store subscriptions for mobile cart sticky header
  const cartItems = useCartStore((state) => state.items);
  const selectedItemIds = useCartStore((state) => state.selectedItemIds);
  const toggleSelectAll = useCartStore((state) => state.toggleSelectAll);
  const removeSelectedItems = useCartStore((state) => state.removeSelectedItems);
  const getTotal = useCartStore((state) => state.getTotal);
  const getSelectedOriginalSubtotal = useCartStore((state) => state.getSelectedOriginalSubtotal);

  const selectedCount = selectedItemIds === null ? cartItems.length : selectedItemIds.length;
  const allSelected = cartItems.length > 0 && selectedCount === cartItems.length;
  const payableTotal = getTotal();
  const originalSubtotal = getSelectedOriginalSubtotal();

  const handleDeleteSelected = () => {
    if (selectedCount === 0) return;
    removeSelectedItems();
    toast.success(`Removed ${selectedCount} item${selectedCount > 1 ? "s" : ""} from cart`);
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    if (!shopDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(e.target as Node)) {
        setShopDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [shopDropdownOpen]);

  const handleShopClick = (e: React.MouseEvent) => {
    // On tablet / non-desktop viewports (< 1024px), toggle dropdown on click instead of immediate navigation
    if (window.innerWidth < 1024) {
      e.preventDefault();
      setShopDropdownOpen((prev) => !prev);
    }
  };

  React.useEffect(() => {
    const checkVisibility = () => {
      if (window.innerWidth >= 1024) {
        setShowFloatingSearch(false);
        return;
      }

      if (staticNavRef.current) {
        const rect = staticNavRef.current.getBoundingClientRect();
        // When rect.bottom <= 0, both the static navbar and search bar are invisible (scrolled past)
        setShowFloatingSearch(rect.bottom <= 0);
      }
    };

    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, []);

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
              href="/shop?dressStyle=Casual"
              className="px-3 py-2 text-base font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Casual
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/shop?dressStyle=Formal"
              className="px-3 py-2 text-base font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Formal
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/shop?dressStyle=Party"
              className="px-3 py-2 text-base font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Party
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/shop?dressStyle=Gym"
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
              href="/brands"
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
    <>
      {/* Mobile Drawer (Single instance controlled by state) */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        {mobileDrawer}
      </Sheet>

      {/* =========================================================================
          FLOATING MOBILE STICKY BAR (md:hidden)
          - Placed outside nav to prevent backdrop-blur from trapping fixed position
          - Appears from top ONLY when both static navbar & search bar are invisible
          - Automatically hides when scrolled back up to the main static header
         ========================================================================= */}
      <div
        data-testid="floating-mobile-nav"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-xs transition-all duration-300 ease-in-out lg:hidden",
          showFloatingSearch
            ? "translate-y-0 opacity-100 visible pointer-events-auto"
            : "-translate-y-full opacity-0 invisible pointer-events-none"
        )}
      >
        {isCartPage && cartItems.length > 0 ? (
          /* Mobile & Tablet Scrolled Cart Header with Select All, Trash & Payable Total */
          <div className="h-14 px-3 sm:px-6 max-w-[1440px] mx-auto flex items-center justify-between gap-2 w-full">
            {/* Left: Checkbox + Select All ( X/Y Items ) + Trash icon */}
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <button
                type="button"
                role="checkbox"
                aria-checked={allSelected}
                aria-label="Select or deselect all items"
                onClick={toggleSelectAll}
                className={cn(
                  "w-5 h-5 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
                  allSelected
                    ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                    : "border-black/40 dark:border-white/40 bg-background hover:border-black dark:hover:border-white"
                )}
              >
                {allSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>

              <span className="text-xs sm:text-sm font-semibold text-foreground truncate select-none">
                Select All ({selectedCount}/{cartItems.length} Items)
              </span>

              <button
                type="button"
                onClick={handleDeleteSelected}
                disabled={selectedCount === 0}
                aria-label="Remove selected items from cart"
                className="p-1.5 text-muted-foreground hover:text-[#FF3333] disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-md"
              >
                <Trash2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.8]" />
              </button>
            </div>

            {/* Right: Your Payable Total */}
            <div className="flex flex-col items-end shrink-0 pl-1">
              <span className="text-[10px] sm:text-[11px] text-muted-foreground font-medium leading-tight">
                Your Payable Total:
              </span>
              <div className="flex items-baseline gap-1 sm:gap-1.5 leading-tight">
                {payableTotal > 0 && originalSubtotal > payableTotal && (
                  <span className="text-xs sm:text-sm text-muted-foreground line-through font-semibold">
                    ${originalSubtotal}
                  </span>
                )}
                <span className="text-sm sm:text-base font-bold text-foreground font-sans">
                  ${payableTotal}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Standard Floating Mobile & Tablet Search Bar */
          <div className="h-14 px-3.5 sm:px-6 max-w-[1440px] mx-auto flex items-center gap-3 justify-between">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-1.5 -ml-1 text-foreground hover:bg-secondary rounded-full shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Menu className="size-6" />
            </button>

            {/* Expanded Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex-1 flex items-center gap-2.5 bg-[#F0F0F0] dark:bg-muted/80 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 focus-within:ring-2 focus-within:ring-foreground/20"
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

            {/* Right User Icon on Tablet */}
            <Link
              href="/login"
              aria-label="User Account"
              className="hidden md:flex p-1.5 text-foreground hover:opacity-75 shrink-0 transition-opacity rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <CircleUser className="size-6" />
            </Link>
          </div>
        )}
      </div>

      <nav
        ref={staticNavRef}
        className={cn(
          "w-full bg-background/95 backdrop-blur-sm border-b border-border/40 transition-colors",
          className
        )}
      >
        {/* =========================================================================
            1. STATIC MOBILE HEADER (md:hidden)
            - Part of normal flow: Row 1 (Hamburger, Smaller Logo, Cart, Account)
            - Row 2: Search Bar attached directly beneath
            - Scrolls off-screen naturally
           ========================================================================= */}
        <div data-testid="static-mobile-nav" className="md:hidden flex flex-col w-full">
          {/* Row 1: Logo & Actions */}
          <div className="h-16 px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="p-1.5 -ml-1 text-foreground hover:bg-secondary rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Menu className="size-6" />
              </button>

              {/* Smaller Logo on mobile screen (text-xl instead of text-2xl) */}
              <Link
                href="/"
                className="font-heading font-black text-xl tracking-normal uppercase select-none text-foreground flex items-center"
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

          {/* Row 2: Search Bar fixed with the navbar */}
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

        {/* =========================================================================
            2. DESKTOP & TABLET VIEW (hidden md:flex)
            - Tablet: Row 1 (Logo, Nav Links, Cart, Account) + Row 2 (Full-width Search Bar)
            - Desktop: Single-row layout with inline search bar
           ========================================================================= */}
        <div className="hidden md:flex flex-col w-full">
          {/* Row 1: Logo, Nav Links, (Desktop Inline Search), Action Icons */}
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 w-full h-16 md:h-18 lg:h-20 flex items-center justify-between gap-3 sm:gap-6 lg:gap-10">
            {/* Brand Logo */}
            <Link
              href="/"
              aria-label="AUTUMN LAND"
              className="font-heading font-black text-2xl xl:text-3xl tracking-normal sm:tracking-[0.02em] uppercase select-none text-foreground flex items-center shrink-0"
            >
              AUTUMN LAND
            </Link>

            {/* Center Desktop & Tablet Navigation Links */}
            <div className="flex items-center gap-4 md:gap-5 lg:gap-8 text-sm lg:text-base font-normal text-foreground shrink-0">
              {/* Shop Hover & Click Dropdown */}
              <div ref={shopDropdownRef} className="relative group py-2">
                <Link
                  href="/shop"
                  role="button"
                  onClick={handleShopClick}
                  className="flex items-center gap-1 hover:text-muted-foreground transition-colors focus:outline-none rounded px-1 text-sm lg:text-base font-normal text-foreground"
                >
                  <span>Shop</span>
                  <ChevronDown
                    className={cn(
                      "size-4 text-foreground/70 transition-transform duration-200 lg:group-hover:rotate-180",
                      shopDropdownOpen && "rotate-180"
                    )}
                  />
                </Link>

                {/* Bridge & Dropdown Menu Container */}
                <div
                  className={cn(
                    "absolute top-full left-0 pt-2 transition-all duration-200 z-50",
                    "lg:group-hover:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:visible lg:group-hover:pointer-events-auto",
                    shopDropdownOpen
                      ? "opacity-100 translate-y-0 visible pointer-events-auto"
                      : "opacity-0 translate-y-1 invisible pointer-events-none"
                  )}
                >
                  <div className="w-56 p-2 rounded-2xl shadow-xl border border-border/80 bg-background">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-1.5">
                      Categories
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <Link
                        href="/shop"
                        onClick={() => setShopDropdownOpen(false)}
                        className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors text-foreground block"
                      >
                        All Collections
                      </Link>
                      <Link
                        href="/shop?dressStyle=Casual"
                        onClick={() => setShopDropdownOpen(false)}
                        className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors text-foreground block"
                      >
                        Casual Style
                      </Link>
                      <Link
                        href="/shop?dressStyle=Formal"
                        onClick={() => setShopDropdownOpen(false)}
                        className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors text-foreground block"
                      >
                        Formal Style
                      </Link>
                      <Link
                        href="/shop?dressStyle=Party"
                        onClick={() => setShopDropdownOpen(false)}
                        className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors text-foreground block"
                      >
                        Party Style
                      </Link>
                      <Link
                        href="/shop?dressStyle=Gym"
                        onClick={() => setShopDropdownOpen(false)}
                        className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors text-foreground block"
                      >
                        Gym & Athletic
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/shop?filter=sale"
                className="hover:text-muted-foreground transition-colors"
              >
                On Sale
              </Link>
              <Link
                href="/shop?sort=newest"
                className="hover:text-muted-foreground transition-colors"
              >
                New Arrivals
              </Link>
              <Link href="/brands" className="hover:text-muted-foreground transition-colors">
                Brands
              </Link>
            </div>

            {/* Desktop-Only Inline Search Bar (Hidden on tablet md:<lg, visible on lg+) */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden lg:flex items-center gap-3 bg-[#F0F0F0] dark:bg-muted/80 rounded-full px-4 py-2.5 flex-1 max-w-sm lg:max-w-md xl:max-w-lg transition-all focus-within:ring-2 focus-within:ring-foreground/20"
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

            {/* Right Action Icons */}
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

          {/* Row 2: Search Bar fixed with navbar on Tablet (md:block lg:hidden) - Just as mobile one */}
          <div className="hidden md:block lg:hidden px-4 sm:px-6 pb-3 pt-0.5 max-w-[1440px] mx-auto w-full">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-3 bg-[#F0F0F0] dark:bg-muted/80 rounded-full px-4 py-2 w-full focus-within:ring-2 focus-within:ring-foreground/20"
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
          </div>
        </div>
      </nav>
    </>
  );
}
