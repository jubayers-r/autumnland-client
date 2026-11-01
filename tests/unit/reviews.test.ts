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
});
