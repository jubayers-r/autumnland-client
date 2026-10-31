export type ReviewSortOption =
  "latest" | "most-relevant" | "highest-rating" | "lowest-rating" | "oldest";

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1.0 to 5.0 (can include half stars like 4.5)
  comment: string;
  isVerified: boolean;
  createdAt: string; // ISO date string or formatted date
  helpfulCount?: number;
}

export interface ReviewFilterParams {
  productId: string;
  sortBy?: ReviewSortOption;
  rating?: number | null; // e.g. 5, 4, 3, 2, 1, or null for all
  verifiedOnly?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ReviewListResponse {
  reviews: Review[];
  totalCount: number;
  filteredCount: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
  ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number>;
  averageRating: number;
}

export interface CreateReviewInput {
  productId: string;
  author: string;
  rating: number;
  comment: string;
  isVerified?: boolean;
}
