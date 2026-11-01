import { CATALOG_PRODUCTS, type CatalogProduct } from "./catalog-data";

export type CatalogSortOption = "popular" | "price-asc" | "price-desc" | "newest" | "rating";

export interface CatalogFilterParams {
  category?: string | null;
  dressStyle?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  color?: string | null;
  size?: string | null;
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
    dressStyle,
    minPrice,
    maxPrice,
    color,
    size,
    sortBy = "popular",
    page = 1,
    limit = 9,
    searchQuery,
  } = params;

  // Clone dataset for filtering
  let filtered = [...CATALOG_PRODUCTS];

  // 1. Filter by category (e.g. T-shirts, Shorts, Shirts, Hoodie, Jeans)
  if (category && category.trim()) {
    const cleanCat = category.trim().toLowerCase();
    filtered = filtered.filter((p) => p.category.toLowerCase() === cleanCat);
  }

  // 2. Filter by dress style (e.g. Casual, Formal, Party, Gym)
  if (dressStyle && dressStyle.trim()) {
    const cleanStyle = dressStyle.trim().toLowerCase();
    filtered = filtered.filter((p) => p.dressStyle.toLowerCase() === cleanStyle);
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
  if (color && color.trim()) {
    const cleanColor = color.trim().toLowerCase();
    filtered = filtered.filter((p) => p.colors.some((c) => c.toLowerCase() === cleanColor));
  }

  // 6. Filter by size (case-insensitive match)
  if (size && size.trim()) {
    const cleanSize = size.trim().toLowerCase();
    filtered = filtered.filter((p) => p.sizes.some((s) => s.toLowerCase() === cleanSize));
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
      filtered.sort(
        (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "popular":
    default:
      filtered.sort((a, b) => b.popularity - a.popularity);
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
  const catalogMinPrice = Math.min(...allPrices);
  const catalogMaxPrice = Math.max(...allPrices);

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
