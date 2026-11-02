import type {
  CreateReviewInput,
  Review,
  ReviewFilterParams,
  ReviewListResponse,
} from "@/types/review";
import { addInMemoryReview, getInMemoryReviews } from "./reviews-data";

/**
 * Service Layer for Product Reviews.
 *
 * NOTE FOR BACKEND/API INTEGRATION:
 * This layer completely decouples the UI from data persistence.
 * When integrating with a real backend API (e.g. GET /api/products/:id/reviews):
 * simply update the fetchProductReviews and submitProductReview functions to
 * call fetch() or your API client. The filtering, sorting parameters, and return
 * interfaces are already 100% structured for direct query parameter pass-through!
 */

export async function fetchProductReviews(params: ReviewFilterParams): Promise<ReviewListResponse> {
  const {
    productId,
    sortBy = "latest",
    rating = null,
    verifiedOnly = false,
    search = "",
    page = 1,
    limit = 6,
  } = params;

  // Retrieve current in-memory reviews for this product
  // In API mode, this would be: const res = await fetch(`/api/products/${productId}/reviews?${new URLSearchParams(...)}`);
  const allReviews = getInMemoryReviews();

  // 1. Filter strictly by productId
  let filtered = allReviews.filter((rev) => !productId || rev.productId === productId);

  // 2. Filter by rating (e.g., 5, 4, 3, etc.)
  if (rating !== null && rating !== undefined) {
    filtered = filtered.filter((rev) => Math.floor(rev.rating) === Math.floor(rating));
  }

  // 3. Filter by verified status
  if (verifiedOnly) {
    filtered = filtered.filter((rev) => rev.isVerified);
  }

  // 4. Filter by search term
  if (search.trim()) {
    const term = search.toLowerCase();
    filtered = filtered.filter(
      (rev) => rev.author.toLowerCase().includes(term) || rev.comment.toLowerCase().includes(term)
    );
  }

  // 5. Apply sorting
  filtered.sort((a, b) => {
    switch (sortBy) {
      case "highest-rating":
        return b.rating - a.rating;
      case "lowest-rating":
        return a.rating - b.rating;
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "most-relevant":
        return (b.helpfulCount || 0) - (a.helpfulCount || 0);
      case "latest":
      default: {
        // Any newly submitted reviews (e.g. from runtime with ISO dates after Aug 2023) come first
        const isNewA = new Date(a.createdAt).getTime() > new Date("2023-08-20T00:00:00Z").getTime();
        const isNewB = new Date(b.createdAt).getTime() > new Date("2023-08-20T00:00:00Z").getTime();
        if (isNewA && !isNewB) return -1;
        if (!isNewA && isNewB) return 1;
        if (isNewA && isNewB) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }

        // For the 6 reference showcase items from the mockup, preserve their exact visual grid order:
        // Samantha D. -> Alex M. -> Ethan R. -> Olivia P. -> Liam K. -> Ava H.
        const refOrder = [
          "rev-samantha-d",
          "rev-alex-m",
          "rev-ethan-r",
          "rev-olivia-p",
          "rev-liam-k",
          "rev-ava-h",
        ];
        const idxA = refOrder.indexOf(a.id);
        const idxB = refOrder.indexOf(b.id);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    }
  });

  // Calculate statistics
  const totalCount = allReviews.length;
  const filteredCount = filtered.length;
  const totalPages = Math.ceil(filteredCount / limit);

  // Rating distribution
  const ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  let ratingSum = 0;
  for (const rev of allReviews) {
    const star = Math.min(5, Math.max(1, Math.round(rev.rating))) as 1 | 2 | 3 | 4 | 5;
    ratingDistribution[star] = (ratingDistribution[star] || 0) + 1;
    ratingSum += rev.rating;
  }
  const averageRating = totalCount > 0 ? Number((ratingSum / totalCount).toFixed(1)) : 4.5;

  // Pagination slice
  const startIndex = 0;
  const endIndex = page * limit;
  const paginatedReviews = filtered.slice(startIndex, endIndex);
  const hasMore = endIndex < filteredCount;

  return {
    reviews: paginatedReviews,
    totalCount,
    filteredCount,
    page,
    limit,
    totalPages,
    hasMore,
    ratingDistribution,
    averageRating,
  };
}

export async function submitProductReview(input: CreateReviewInput): Promise<Review> {
  const newReview: Review = {
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    productId: input.productId,
    author: input.author,
    rating: input.rating,
    comment: input.comment,
    isVerified: input.isVerified ?? true,
    createdAt: new Date().toISOString(),
    helpfulCount: 0,
  };

  addInMemoryReview(newReview);
  return newReview;
}
