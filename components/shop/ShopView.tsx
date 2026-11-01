"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCatalogProductsSync, type CatalogSortOption } from "@/lib/catalog-service";
import {
  FilterSidebar,
  MobileFilterSheet,
  ShopHeader,
  ShopPagination,
  ShopProductGrid,
  type FilterState,
} from "@/components/shop";

export function ShopView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract values directly from URL searchParams (single source of truth)
  const urlFilter = searchParams.get("filter");
  const isOnSale = urlFilter === "sale";
  const urlCategory = searchParams.get("category");
  const urlDressStyle = searchParams.get("dressStyle");
  const urlBrand = searchParams.get("brand");
  const rawSort = (searchParams.get("sort") || searchParams.get("sortBy")) as CatalogSortOption;
  const sortBy: CatalogSortOption = [
    "popular",
    "price-asc",
    "price-desc",
    "newest",
    "rating",
  ].includes(rawSort)
    ? rawSort
    : "popular";
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const urlMinPrice = searchParams.has("minPrice") ? Number(searchParams.get("minPrice")) : null;
  const urlMaxPrice = searchParams.has("maxPrice") ? Number(searchParams.get("maxPrice")) : null;
  const urlColor = searchParams.get("color");
  const urlSize = searchParams.get("size");
  const urlSearch = searchParams.get("q");

  const categories = React.useMemo(
    () =>
      urlCategory
        ? urlCategory
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean)
        : [],
    [urlCategory]
  );

  const brands = React.useMemo(
    () =>
      urlBrand
        ? urlBrand
            .split(",")
            .map((b) => b.trim())
            .filter(Boolean)
        : [],
    [urlBrand]
  );

  const dressStyles = React.useMemo(() => {
    if (urlDressStyle) {
      return urlDressStyle
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean);
    }
    return [];
  }, [urlDressStyle]);

  const sizes = React.useMemo(
    () =>
      urlSize
        ? urlSize
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    [urlSize]
  );

  const colors = React.useMemo(
    () =>
      urlColor
        ? urlColor
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean)
        : [],
    [urlColor]
  );

  const filters: FilterState = React.useMemo(
    () => ({
      category: categories[0] || null,
      categories,
      brand: brands[0] || null,
      brands,
      minPrice: urlMinPrice,
      maxPrice: urlMaxPrice,
      color: colors[0] || null,
      colors,
      size: sizes[0] || null,
      sizes,
      dressStyle: dressStyles[0] || null,
      dressStyles,
      onSaleOnly: isOnSale,
    }),
    [categories, brands, urlMinPrice, urlMaxPrice, colors, sizes, dressStyles, isOnSale]
  );

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState<boolean>(false);

  // Responsive pageSize: 9 on desktop (3 cols x 3 rows = 9 items)
  // On tablet & mobile (< 1024px, 2 cols), use 10 items (or 8) so rows are always even with 0 empty slots
  const [pageSize, setPageSize] = React.useState<number>(9);

  React.useEffect(() => {
    const updateSize = () => {
      if (typeof window !== "undefined") {
        setPageSize(window.innerWidth < 1024 ? 10 : 9);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Synchronous, pure catalog computation via useMemo (zero cascading re-renders)
  const catalogData = React.useMemo(() => {
    return getCatalogProductsSync({
      categories: filters.categories,
      dressStyles: filters.dressStyles,
      brands: filters.brands,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      colors: filters.colors,
      sizes: filters.sizes,
      sortBy,
      page: currentPage,
      limit: pageSize,
      searchQuery: urlSearch,
      onSaleOnly: Boolean(filters.onSaleOnly || isOnSale),
    });
  }, [filters, sortBy, currentPage, pageSize, urlSearch, isOnSale]);

  // Calculate active filter count for badges
  const activeFilterCount =
    filters.categories.length +
    filters.brands.length +
    filters.colors.length +
    filters.sizes.length +
    filters.dressStyles.length +
    (filters.onSaleOnly ? 1 : 0) +
    (filters.minPrice !== null || filters.maxPrice !== null ? 1 : 0);

  // Update URL parameters cleanly without hard reload
  const updateUrlParams = (
    nextFilters: FilterState,
    nextSort: CatalogSortOption,
    nextPage: number
  ) => {
    const params = new URLSearchParams();

    if (nextFilters.categories.length > 0) {
      params.set("category", nextFilters.categories.join(","));
    }
    if (nextFilters.brands.length > 0) {
      params.set("brand", nextFilters.brands.join(","));
    }
    if (nextFilters.dressStyles.length > 0) {
      params.set("dressStyle", nextFilters.dressStyles.join(","));
    }
    if (nextFilters.sizes.length > 0) {
      params.set("size", nextFilters.sizes.join(","));
    }
    if (nextFilters.colors.length > 0) {
      params.set("color", nextFilters.colors.join(","));
    }
    if (nextFilters.minPrice !== null && nextFilters.minPrice !== undefined) {
      params.set("minPrice", String(nextFilters.minPrice));
    }
    if (nextFilters.maxPrice !== null && nextFilters.maxPrice !== undefined) {
      params.set("maxPrice", String(nextFilters.maxPrice));
    }
    if (nextFilters.onSaleOnly) {
      params.set("filter", "sale");
    }
    if (nextSort !== "popular") params.set("sort", nextSort);
    if (nextPage > 1) params.set("page", String(nextPage));
    if (urlSearch) params.set("q", urlSearch);

    const queryString = params.toString();
    router.replace(`/shop${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  };

  const handleFilterChange = (partial: Partial<FilterState>) => {
    const next = { ...filters, ...partial };
    updateUrlParams(next, sortBy, 1);
  };

  const handleApplyFilters = (appliedFilters?: FilterState) => {
    updateUrlParams(appliedFilters || filters, sortBy, 1);
  };

  const handleResetFilters = () => {
    const resetState: FilterState = {
      category: null,
      categories: [],
      brand: null,
      brands: [],
      minPrice: null,
      maxPrice: null,
      color: null,
      colors: [],
      size: null,
      sizes: [],
      dressStyle: null,
      dressStyles: [],
      onSaleOnly: false,
    };
    updateUrlParams(resetState, sortBy, 1);
  };

  const handleSortChange = (nextSort: CatalogSortOption) => {
    updateUrlParams(filters, nextSort, 1);
  };

  const handlePageChange = (page: number) => {
    updateUrlParams(filters, sortBy, page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Derive dynamic page title (e.g. "On Sale", "New Arrivals", "Gucci", "Casual", "T-shirts", etc.)
  const pageTitle =
    filters.onSaleOnly || isOnSale
      ? "On Sale"
      : sortBy === "newest" &&
          filters.categories.length === 0 &&
          filters.dressStyles.length === 0 &&
          filters.brands.length === 0
        ? "New Arrivals"
        : filters.brands.length > 0 && filters.categories.length === 0
          ? filters.brands.join(", ")
          : filters.categories.length > 0
            ? filters.categories.join(", ")
            : filters.dressStyles.length > 0
              ? filters.dressStyles.join(", ")
              : urlSearch
                ? `Search: "${urlSearch}"`
                : "Casual";

  const startIndex =
    catalogData.totalCount > 0 ? (catalogData.page - 1) * catalogData.pageSize + 1 : 0;
  const endIndex = Math.min(catalogData.page * catalogData.pageSize, catalogData.totalCount);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-5 sm:py-6 lg:py-8">
      {/* 2-Column Responsive Layout: Desktop Sidebar (Left) + Product Grid (Right) */}
      <div className="flex items-start gap-6 lg:gap-8 w-full">
        {/* Desktop Sticky Filters Sidebar */}
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />

        {/* Right Product Section */}
        <div className="flex-1 flex flex-col min-w-0 w-full">
          {/* Header with Title, Range count, and Sort dropdown */}
          <ShopHeader
            title={pageTitle}
            totalCount={catalogData.totalCount}
            startIndex={startIndex}
            endIndex={endIndex}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
            activeFilterCount={activeFilterCount}
            isOnSale={Boolean(filters.onSaleOnly || isOnSale)}
            onToggleOnSale={() => handleFilterChange({ onSaleOnly: false })}
          />

          {/* Product Grid */}
          <ShopProductGrid products={catalogData.products} onResetFilters={handleResetFilters} />

          {/* Pagination Controls */}
          <ShopPagination
            currentPage={catalogData.page}
            totalPages={catalogData.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Mobile Drawer Sheet */}
      <MobileFilterSheet
        open={isMobileFiltersOpen}
        onOpenChange={setIsMobileFiltersOpen}
        filters={filters}
        onFilterChange={handleFilterChange}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />
    </div>
  );
}
