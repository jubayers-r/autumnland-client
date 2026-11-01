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
  const initialCategories = urlCategory
    ? urlCategory
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
    : [];

  const initialDressStyles = urlDressStyle
    ? urlDressStyle
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean)
    : ["casual", "formal", "party", "gym"].includes(urlCategory?.toLowerCase() || "")
      ? [urlCategory!]
      : ["Casual"];

  const initialSizes = urlSize
    ? urlSize
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const initialColors = urlColor
    ? urlColor
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
    : [];

  // Local filter states
  const [filters, setFilters] = React.useState<FilterState>({
    category: initialCategories[0] || null,
    categories: initialCategories,
    minPrice: urlMinPrice,
    maxPrice: urlMaxPrice,
    color: initialColors[0] || null,
    colors: initialColors,
    size: initialSizes[0] || null,
    sizes: initialSizes,
    dressStyle: initialDressStyles[0] || "Casual",
    dressStyles: initialDressStyles,
  });

  const [sortBy, setSortBy] = React.useState<CatalogSortOption>(urlSort || "popular");
  const [currentPage, setCurrentPage] = React.useState<number>(urlPage);
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
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      colors: filters.colors,
      sizes: filters.sizes,
      sortBy,
      page: currentPage,
      limit: pageSize,
      searchQuery: urlSearch,
    });
  }, [filters, sortBy, currentPage, pageSize, urlSearch]);

  // Calculate active filter count for badges
  const activeFilterCount =
    filters.categories.length +
    filters.colors.length +
    filters.sizes.length +
    (filters.dressStyles.length > 0 &&
    (filters.dressStyles.length > 1 || !filters.dressStyles.includes("Casual"))
      ? filters.dressStyles.length
      : 0) +
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
      categories: [],
      minPrice: null,
      maxPrice: null,
      color: null,
      colors: [],
      size: null,
      sizes: [],
      dressStyle: "Casual",
      dressStyles: ["Casual"],
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
    filters.categories.length > 0
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
