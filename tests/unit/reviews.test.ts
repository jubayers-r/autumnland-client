import { describe, expect, it, beforeEach } from "bun:test";
import { REFERENCE_REVIEWS, resetInMemoryReviews } from "@/lib/reviews-data";
import { fetchProductReviews, submitProductReview } from "@/lib/reviews-service";
import {
  ProductSectionTabs,
  ProductReviewsSection,
  ReviewCard,
  ReviewStarRating,
  ReviewFilterDialog,
  WriteReviewDialog,
  ProductDetailsContent,
  ProductFaqsContent,
} from "@/components/product";

describe("Product reviews and tabs system", () => {
  beforeEach(() => {
    resetInMemoryReviews();
  });

  it("exports all product tabs and review components", () => {
    expect(ProductSectionTabs).toBeDefined();
    expect(ProductReviewsSection).toBeDefined();
    expect(ReviewCard).toBeDefined();
    expect(ReviewStarRating).toBeDefined();
    expect(ReviewFilterDialog).toBeDefined();
    expect(WriteReviewDialog).toBeDefined();
    expect(ProductDetailsContent).toBeDefined();
    expect(ProductFaqsContent).toBeDefined();
  });

  it("contains all 6 reference reviews from the design mockup", () => {
    const authors = REFERENCE_REVIEWS.map((r) => r.author);
    expect(authors).toContain("Samantha D.");
    expect(authors).toContain("Alex M.");
    expect(authors).toContain("Ethan R.");
    expect(authors).toContain("Olivia P.");
    expect(authors).toContain("Liam K.");
    expect(authors).toContain("Ava H.");

    const samantha = REFERENCE_REVIEWS.find((r) => r.author === "Samantha D.")!;
    expect(samantha.rating).toBe(4.5);
    expect(samantha.isVerified).toBe(true);
    expect(samantha.comment).toContain("I absolutely love this t-shirt!");

    const alex = REFERENCE_REVIEWS.find((r) => r.author === "Alex M.")!;
    expect(alex.rating).toBe(4.0);
    expect(alex.isVerified).toBe(true);
    expect(alex.comment).toContain("exceeded my expectations!");

    const ava = REFERENCE_REVIEWS.find((r) => r.author === "Ava H.")!;
    expect(ava.rating).toBe(4.5);
    expect(ava.isVerified).toBe(true);
    expect(ava.comment).toContain("wearing a piece of design philosophy");
  });

  it("filters reviews by rating correctly", async () => {
    const res5 = await fetchProductReviews({
      productId: "one-life-graphic-t-shirt",
      rating: 5,
    });
    expect(res5.reviews.every((r) => Math.floor(r.rating) === 5)).toBe(true);
    expect(res5.filteredCount).toBeGreaterThan(0);

    const res4 = await fetchProductReviews({
      productId: "one-life-graphic-t-shirt",
      rating: 4,
    });
    expect(res4.reviews.every((r) => Math.floor(r.rating) === 4)).toBe(true);
    expect(res4.filteredCount).toBeGreaterThan(0);
  });

  it("filters reviews by verified buyer status", async () => {
    const resVerified = await fetchProductReviews({
      productId: "one-life-graphic-t-shirt",
      verifiedOnly: true,
    });
    expect(resVerified.reviews.every((r) => r.isVerified)).toBe(true);
  });

  it("sorts reviews correctly by highest and lowest rating", async () => {
    const resHighest = await fetchProductReviews({
      productId: "one-life-graphic-t-shirt",
      sortBy: "highest-rating",
      limit: 10,
    });
    for (let i = 0; i < resHighest.reviews.length - 1; i++) {
      expect(resHighest.reviews[i].rating >= resHighest.reviews[i + 1].rating).toBe(true);
    }

    const resLowest = await fetchProductReviews({
      productId: "one-life-graphic-t-shirt",
      sortBy: "lowest-rating",
      limit: 10,
    });
    for (let i = 0; i < resLowest.reviews.length - 1; i++) {
      expect(resLowest.reviews[i].rating <= resLowest.reviews[i + 1].rating).toBe(true);
    }
  });

  it("supports pagination with limit and page", async () => {
    const page1 = await fetchProductReviews({
      productId: "one-life-graphic-t-shirt",
      page: 1,
      limit: 4,
    });
    expect(page1.reviews.length).toBe(4);
    expect(page1.hasMore).toBe(true);

    const page2 = await fetchProductReviews({
      productId: "one-life-graphic-t-shirt",
      page: 2,
      limit: 4,
    });
    expect(page2.reviews.length).toBe(8); // cumulative slice for load-more pattern
  });

  it("submits a new review and immediately updates list", async () => {
    const newRev = await submitProductReview({
      productId: "one-life-graphic-t-shirt",
      author: "Test User",
      rating: 5,
      comment: "Incredible craftsmanship and speedy shipping!",
      isVerified: true,
    });

    expect(newRev.id).toBeDefined();
    expect(newRev.author).toBe("Test User");
    expect(newRev.rating).toBe(5);

    const res = await fetchProductReviews({
      productId: "one-life-graphic-t-shirt",
      sortBy: "latest",
    });
    expect(res.reviews[0].author).toBe("Test User");
    expect(res.reviews[0].comment).toContain("Incredible craftsmanship");
  });

  it("isolates reviews strictly per product and attaches new reviews only to that product", async () => {
    // 1. Fetch reviews for skinny-fit-jeans and verify they belong ONLY to skinny-fit-jeans
    const jeansReviews = await fetchProductReviews({
      productId: "skinny-fit-jeans",
    });
    expect(jeansReviews.reviews.length).toBeGreaterThan(0);
    expect(jeansReviews.reviews.every((r) => r.productId === "skinny-fit-jeans")).toBe(true);

    // 2. Fetch reviews for checkered-shirt and verify they belong ONLY to checkered-shirt
    const shirtReviews = await fetchProductReviews({
      productId: "checkered-shirt",
    });
    expect(shirtReviews.reviews.length).toBeGreaterThan(0);
    expect(shirtReviews.reviews.every((r) => r.productId === "checkered-shirt")).toBe(true);

    // 3. Ensure no overlap between jeans and shirt reviews
    const jeansIds = new Set(jeansReviews.reviews.map((r) => r.id));
    expect(shirtReviews.reviews.some((r) => jeansIds.has(r.id))).toBe(false);

    // 4. Submit a review specifically for skinny-fit-jeans
    await submitProductReview({
      productId: "skinny-fit-jeans",
      author: "Denim Fanatic",
      rating: 5,
      comment: "Best taper in the game!",
      isVerified: true,
    });

    // 5. Verify the new review appears on skinny-fit-jeans
    const updatedJeans = await fetchProductReviews({
      productId: "skinny-fit-jeans",
      sortBy: "latest",
    });
    expect(updatedJeans.reviews[0].author).toBe("Denim Fanatic");

    // 6. Verify the new review does NOT appear on one-life-graphic-t-shirt or checkered-shirt
    const oneLifeRes = await fetchProductReviews({
      productId: "one-life-graphic-t-shirt",
      sortBy: "latest",
    });
    expect(oneLifeRes.reviews.some((r) => r.author === "Denim Fanatic")).toBe(false);

    const shirtRes = await fetchProductReviews({
      productId: "checkered-shirt",
      sortBy: "latest",
    });
    expect(shirtRes.reviews.some((r) => r.author === "Denim Fanatic")).toBe(false);
  });
});
