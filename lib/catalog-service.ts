import { CATALOG_PRODUCTS, type CatalogProduct } from "./catalog-data";

export type CatalogSortOption = "popular" | "price-asc" | "price-desc" | "newest" | "rating";

export interface CatalogFilterParams {
  category?: string | null;
  categories?: string[] | null;
  dressStyle?: string | null;
  dressStyles?: string[] | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  color?: string | null;
  colors?: string[] | null;
  size?: string | null;
  sizes?: string[] | null;
  sortBy?: CatalogSortOption | null;
  page?: number | null;
  limit?: number | null;
  searchQuery?: string | null;
}

export interface CatalogResponse {
  products: CatalogProduct[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
  minPrice: number;
  maxPrice: number;
}

/**
 * Pure synchronous filtering and pagination over catalog dataset.
 * Allows instant React useMemo calculation with 0 cascading re-renders.
 */
export function getCatalogProductsSync(params: CatalogFilterParams = {}): CatalogResponse {
  const {
    category,
    categories,
    dressStyle,
    dressStyles,
    minPrice,
    maxPrice,
    color,
    colors,
    size,
    sizes,
    sortBy = "popular",
    page = 1,
    limit = 9,
    searchQuery,
  } = params;

  // Clone dataset for filtering
  let filtered = [...CATALOG_PRODUCTS];

  // 1. Filter by category (single or multi-select)
  const activeCategories = Array.from(
    new Set([...(categories || []), ...(category ? [category] : [])])
  )
    .filter(Boolean)
    .map((c) => c.trim().toLowerCase());

  if (activeCategories.length > 0) {
    filtered = filtered.filter((p) => activeCategories.includes(p.category.toLowerCase()));
  }

  // 2. Filter by dress style (single or multi-select)
  const activeDressStyles = Array.from(
    new Set([...(dressStyles || []), ...(dressStyle ? [dressStyle] : [])])
  )
    .filter(Boolean)
    .map((d) => d.trim().toLowerCase());

  if (activeDressStyles.length > 0) {
    filtered = filtered.filter((p) => {
      const pStyles = (p.dressStyles || [p.dressStyle]).map((s) => s.toLowerCase());
      return activeDressStyles.some((active) => pStyles.includes(active));
    });
  }

  // 3. Filter by search query
  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.dressStyle.toLowerCase().includes(q)
    );
  }

  // 4. Filter by price range
  if (minPrice !== undefined && minPrice !== null) {
    filtered = filtered.filter((p) => p.price >= minPrice);
  }
  if (maxPrice !== undefined && maxPrice !== null) {
    filtered = filtered.filter((p) => p.price <= maxPrice);
  }

  // 5. Filter by color (case-insensitive match)
  const activeColors = Array.from(new Set([...(colors || []), ...(color ? [color] : [])]))
    .filter(Boolean)
    .map((c) => c.trim().toLowerCase());

  if (activeColors.length > 0) {
    filtered = filtered.filter((p) => p.colors.some((c) => activeColors.includes(c.toLowerCase())));
  }

  // 6. Filter by size (multi-select supported)
  const activeSizes = Array.from(new Set([...(sizes || []), ...(size ? [size] : [])]))
    .filter(Boolean)
    .map((s) => s.trim().toLowerCase());

  if (activeSizes.length > 0) {
    filtered = filtered.filter((p) => p.sizes.some((s) => activeSizes.includes(s.toLowerCase())));
  }

  // 7. Sort products
  switch (sortBy) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      // Sort by newest addition date
      filtered.sort(
        (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "popular":
    default:
      // Sort by total units sold (salesCount)
      filtered.sort((a, b) => (b.salesCount ?? b.popularity) - (a.salesCount ?? a.popularity));
      break;
  }

  // Pagination calculations
  const totalCount = filtered.length;
  const safePage = Math.max(1, page || 1);
  const safeLimit = Math.max(1, limit || 9);
  const totalPages = Math.max(1, Math.ceil(totalCount / safeLimit));
  const startIndex = (safePage - 1) * safeLimit;
  const paginatedProducts = filtered.slice(startIndex, startIndex + safeLimit);

  // Compute catalog price bounds for sliders
  const allPrices = CATALOG_PRODUCTS.map((p) => p.price);
  const catalogMinPrice = allPrices.length > 0 ? Math.min(...allPrices) : 80;
  const catalogMaxPrice = allPrices.length > 0 ? Math.max(...allPrices) : 260;

  return {
    products: paginatedProducts,
    totalCount,
    page: safePage,
    pageSize: safeLimit,
    totalPages,
    hasMore: safePage < totalPages,
    minPrice: catalogMinPrice,
    maxPrice: catalogMaxPrice,
  };
}

/**
 * Decoupled data-access service for products catalog.
 * When integrating with a real backend, only the internals of this function
 * need to be swapped with an HTTP fetch call. The UI contracts remain identical.
 */
export async function getCatalogProducts(
  params: CatalogFilterParams = {}
): Promise<CatalogResponse> {
  return getCatalogProductsSync(params);
}
