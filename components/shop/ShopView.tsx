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

  // Extract initial values from URL params
  const urlCategory = searchParams.get("category");
  const urlDressStyle = searchParams.get("dressStyle");
  const urlSort = (searchParams.get("sort") || searchParams.get("sortBy")) as CatalogSortOption;
  const urlPage = Number(searchParams.get("page")) || 1;
  const urlMinPrice = searchParams.has("minPrice") ? Number(searchParams.get("minPrice")) : null;
  const urlMaxPrice = searchParams.has("maxPrice") ? Number(searchParams.get("maxPrice")) : null;
  const urlColor = searchParams.get("color");
  const urlSize = searchParams.get("size");
  const urlSearch = searchParams.get("q");

  // Determine initial dress style or category:
  // In the design mockup, "Casual" is the primary dress style category displayed
  const initialDressStyle =
    urlDressStyle ||
    (["casual", "formal", "party", "gym"].includes(urlCategory?.toLowerCase() || "")
      ? urlCategory
      : "Casual");

  const initialCategory = ["t-shirts", "shorts", "shirts", "hoodie", "jeans"].includes(
    urlCategory?.toLowerCase() || ""
  )
    ? urlCategory
    : null;

  // Local filter states
  const [filters, setFilters] = React.useState<FilterState>({
    category: initialCategory,
    minPrice: urlMinPrice,
    maxPrice: urlMaxPrice,
    color: urlColor,
    size: urlSize,
    dressStyle: initialDressStyle,
  });

  const [sortBy, setSortBy] = React.useState<CatalogSortOption>(urlSort || "popular");
  const [currentPage, setCurrentPage] = React.useState<number>(urlPage);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = React.useState<boolean>(false);

  // Synchronous, pure catalog computation via useMemo (zero cascading re-renders)
  const catalogData = React.useMemo(() => {
    return getCatalogProductsSync({
      category: filters.category,
      dressStyle: filters.dressStyle,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      color: filters.color,
      size: filters.size,
      sortBy,
      page: currentPage,
      limit: 9,
      searchQuery: urlSearch,
    });
  }, [filters, sortBy, currentPage, urlSearch]);

  // Calculate active filter count for badges
  const activeFilterCount =
    (filters.category ? 1 : 0) +
    (filters.color ? 1 : 0) +
    (filters.size ? 1 : 0) +
    (filters.dressStyle && filters.dressStyle.toLowerCase() !== "casual" ? 1 : 0) +
    (filters.minPrice !== null || filters.maxPrice !== null ? 1 : 0);

  // Update URL parameters cleanly without hard reload
  const updateUrlParams = (
    nextFilters: FilterState,
    nextSort: CatalogSortOption,
    nextPage: number
  ) => {
    const params = new URLSearchParams();

    if (nextFilters.category) params.set("category", nextFilters.category);
    if (nextFilters.dressStyle) params.set("dressStyle", nextFilters.dressStyle);
    if (nextFilters.minPrice !== null && nextFilters.minPrice !== undefined) {
      params.set("minPrice", String(nextFilters.minPrice));
    }
    if (nextFilters.maxPrice !== null && nextFilters.maxPrice !== undefined) {
      params.set("maxPrice", String(nextFilters.maxPrice));
    }
    if (nextFilters.color) params.set("color", nextFilters.color);
    if (nextFilters.size) params.set("size", nextFilters.size);
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
    setFilters(next);
    setCurrentPage(1);
    updateUrlParams(next, sortBy, 1);
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    updateUrlParams(filters, sortBy, 1);
  };

  const handleResetFilters = () => {
    const resetState: FilterState = {
      category: null,
      minPrice: null,
      maxPrice: null,
      color: null,
      size: null,
      dressStyle: "Casual",
    };
    setFilters(resetState);
    setCurrentPage(1);
    updateUrlParams(resetState, sortBy, 1);
  };

  const handleSortChange = (nextSort: CatalogSortOption) => {
    setSortBy(nextSort);
    setCurrentPage(1);
    updateUrlParams(filters, nextSort, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrlParams(filters, sortBy, page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Derive dynamic page title (e.g. "Casual", "T-shirts", "Formal", etc.)
  const pageTitle =
    filters.category || filters.dressStyle || (urlSearch ? `Search: "${urlSearch}"` : "Casual");

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
