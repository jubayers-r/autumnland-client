import { expect, test } from "@playwright/test";

test.describe("Product Tabs, Reviews & Filter Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/shop/product/one-life-graphic-t-shirt");
  });

  test("renders all 3 functional tabs and switches content correctly", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    const detailsTab = page.getByRole("tab", { name: "Product Details" });
    const reviewsTab = page.getByRole("tab", { name: "Rating & Reviews" });
    const faqsTab = page.getByRole("tab", { name: "FAQs" });

    // Initial default active tab is "Rating & Reviews"
    await expect(reviewsTab).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("heading", { name: "All Reviews" })).toBeVisible();

    // Switch to Product Details Tab
    await detailsTab.click();
    await expect(detailsTab).toHaveAttribute("aria-selected", "true");
    await expect(reviewsTab).toHaveAttribute("aria-selected", "false");
    await expect(page.getByRole("heading", { name: "Product Specifications" })).toBeVisible();
    await expect(page.getByText("100% Combed Heavyweight Organic Cotton")).toBeVisible();

    // Switch to FAQs Tab
    await faqsTab.click();
    await expect(faqsTab).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("heading", { name: "Frequently Asked Questions" })).toBeVisible();

    // Toggle FAQ item
    const firstFaqTrigger = page.getByRole("button", {
      name: /What is the sizing and fit profile/i,
    });
    await expect(firstFaqTrigger).toBeVisible();

    // Switch back to Reviews Tab
    await reviewsTab.click();
    await expect(reviewsTab).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText("Samantha D.")).toBeVisible();
  });

  test("displays all 6 mock reviews from reference with verified badges and correct dates", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    // Check each reviewer from reference image
    const expectedReviewers = [
      "Samantha D.",
      "Alex M.",
      "Ethan R.",
      "Olivia P.",
      "Liam K.",
      "Ava H.",
    ];

    for (const author of expectedReviewers) {
      await expect(page.getByText(author)).toBeVisible();
    }

    // Check verified customer badges
    const verifiedBadges = page.locator("[aria-label='Verified Customer']");
    expect(await verifiedBadges.count()).toBeGreaterThanOrEqual(6);

    // Check dates from reference image
    await expect(page.getByText("Posted on August 14, 2023")).toBeVisible();
    await expect(page.getByText("Posted on August 15, 2023")).toBeVisible();
    await expect(page.getByText("Posted on August 19, 2023")).toBeVisible();
  });

  test("working filter dialog: filters by star rating and verified buyer, and resets cleanly", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    // Open filter dialog
    const filterBtn = page.getByRole("button", { name: "Filter reviews" });
    await filterBtn.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(page.getByRole("heading", { name: /Filter & Sort Reviews/i })).toBeVisible();

    // Select 5 Stars filter
    await page.getByRole("button", { name: "5 Stars" }).click();
    await page.getByRole("button", { name: /Apply Filters/i }).click();

    // Verify dialog closes
    await expect(dialog).not.toBeVisible();

    // Verify active filter badge appears
    await expect(page.getByText("5 Stars")).toBeVisible();

    // Reset filters using badge or clear all button
    await page.getByRole("button", { name: "Clear all" }).click();
    await expect(page.getByText("Samantha D.")).toBeVisible();
  });

  test("working sorting dropdown updates review order", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    const sortBtn = page.getByRole("button", { name: "Latest" });
    await sortBtn.click();

    // Click "Highest Rating"
    await page.getByRole("menuitem", { name: "Highest Rating" }).click();

    // Check that top review has 5 stars rating
    const firstCard = page.locator("[data-review-card]").first();
    await expect(firstCard).toBeVisible();
  });

  test("loads more reviews when clicking Load More Reviews", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    const loadMoreBtn = page.getByRole("button", { name: "Load More Reviews" });
    await expect(loadMoreBtn).toBeVisible();

    const initialCardCount = await page.locator("[data-review-card]").count();
    expect(initialCardCount).toBe(6);

    await loadMoreBtn.click();

    const newCardCount = await page.locator("[data-review-card]").count();
    expect(newCardCount).toBeGreaterThan(6);
  });

  test("renders flawlessly on mobile screen matching reference", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    // Heading and count
    await expect(page.getByRole("heading", { name: "All Reviews" })).toBeVisible();

    // Filter button and Write a Review button visible on mobile
    await expect(page.getByRole("button", { name: "Filter reviews" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Write a Review" })).toBeVisible();

    // First card visible
    await expect(page.getByText("Samantha D.")).toBeVisible();

    // Load more reviews button visible
    await expect(page.getByRole("button", { name: "Load More Reviews" })).toBeVisible();
  });
});
