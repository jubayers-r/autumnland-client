import { expect, test } from "@playwright/test";

test.describe("Product Details Page & Navigation", () => {
  test("navigates from home product card to product detail page", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    // Click on the first product card: "T-shirt with Tape Details"
    const productCard = page.locator("#new-arrivals [data-product-card]").first();
    await expect(productCard).toBeVisible();

    const productLink = productCard.getByRole("link");
    await productLink.click();

    // Verify URL navigation
    await expect(page).toHaveURL(/\/shop\/product\/t-shirt-tape-details$/);

    // Verify heading matches product title
    const title = page.getByRole("heading", { name: /T-SHIRT WITH TAPE DETAILS/i });
    await expect(title).toBeVisible();

    // Verify breadcrumbs
    await expect(page.getByRole("navigation", { name: "breadcrumb" })).toBeVisible();
    await expect(page.getByText("Home")).toBeVisible();
    await expect(page.getByText("T-shirts")).toBeVisible();

    // Verify price
    await expect(page.locator("main").getByText("$120").first()).toBeVisible();
  });

  test("renders the One Life Graphic T-shirt reference page with interactive gallery, color, size, and quantity", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/shop/product/one-life-graphic-t-shirt");

    // Title
    const title = page.getByRole("heading", { name: "ONE LIFE GRAPHIC T-SHIRT" });
    await expect(title).toBeVisible();

    // Pricing & discount badge
    await expect(page.getByText("$260")).toBeVisible();
    await expect(page.getByText("$300")).toBeVisible();
    await expect(page.getByText("-40%")).toBeVisible();

    // Gallery thumbnails (3 thumbnails)
    const thumbnails = page.locator("button[aria-label*='View thumbnail']");
    await expect(thumbnails).toHaveCount(3);
    await expect(thumbnails.first()).toHaveAttribute("aria-current", "true");

    // Click second thumbnail to swap active image
    await thumbnails.nth(1).click();
    await expect(thumbnails.nth(1)).toHaveAttribute("aria-current", "true");

    // Interactive color selection
    const colorButtons = page.locator("button[aria-label*='Select color']");
    await expect(colorButtons).toHaveCount(3);
    await colorButtons.nth(1).click();
    await expect(colorButtons.nth(1)).toHaveAttribute("aria-pressed", "true");

    // Interactive size selection
    const sizeButton = page.getByRole("button", { name: "Large", exact: true });
    await expect(sizeButton).toBeVisible();
    await expect(sizeButton).toHaveAttribute("aria-pressed", "true");

    const smallSizeButton = page.getByRole("button", { name: "Small", exact: true });
    await smallSizeButton.click();
    await expect(smallSizeButton).toHaveAttribute("aria-pressed", "true");

    // Quantity counter
    const quantityDisplay = page.locator("span:has-text('1')").filter({ hasText: /^1$/ });
    await expect(quantityDisplay).toBeVisible();

    const plusBtn = page.getByRole("button", { name: "Increase quantity" });
    await plusBtn.click();
    await expect(page.locator("span:has-text('2')").filter({ hasText: /^2$/ })).toBeVisible();

    // Add to Cart toast trigger
    const addToCartBtn = page.getByRole("button", { name: "Add to Cart" });
    await addToCartBtn.click();

    // Verify Product Tabs
    const reviewsTab = page.getByRole("tab", { name: "Rating & Reviews" });
    const detailsTab = page.getByRole("tab", { name: "Product Details" });
    const faqsTab = page.getByRole("tab", { name: "FAQs" });

    await expect(reviewsTab).toBeVisible();
    await expect(detailsTab).toBeVisible();
    await expect(faqsTab).toBeVisible();
    await expect(reviewsTab).toHaveAttribute("aria-selected", "true");

    // Verify Reviews section content from design mockup
    await expect(page.getByText(/All Reviews/i)).toBeVisible();
    await expect(page.getByText("Samantha D.")).toBeVisible();
    await expect(page.getByText("Alex M.")).toBeVisible();
    await expect(page.getByText("Ethan R.")).toBeVisible();

    // Verify Tab Switching to Product Details
    await detailsTab.click();
    await expect(page.getByText("Product Specifications")).toBeVisible();
    await expect(page.getByText("100% Combed Heavyweight Organic Cotton")).toBeVisible();

    // Verify Tab Switching to FAQs
    await faqsTab.click();
    await expect(page.getByText("Frequently Asked Questions")).toBeVisible();

    // Switch back to Reviews
    await reviewsTab.click();
    await expect(page.getByText("Samantha D.")).toBeVisible();

    // Verify Write a Review modal flow
    const writeReviewBtn = page.getByRole("button", { name: "Write a Review" });
    await writeReviewBtn.click();
    await expect(page.getByRole("heading", { name: "Write a Review" })).toBeVisible();

    await page.getByLabel("Your Name *").fill("Jordan Reed");
    await page
      .getByLabel("Your Review *")
      .fill("Sensational design and heavyweight fabric. Absolutely pristine quality!");
    await page.getByRole("button", { name: "Submit Review" }).click();

    // Verify new review appears in list
    await expect(page.getByText("Jordan Reed")).toBeVisible();

    // Capture desktop and mobile preview screenshots
    await page.screenshot({ path: "test-results/product-detail-desktop.png" });

    await page.setViewportSize({ width: 375, height: 812 });
    await page.screenshot({ path: "test-results/product-detail-mobile.png", fullPage: true });
  });

  test("handles 404 for unknown product id gracefully", async ({ page }) => {
    const res = await page.goto("/shop/product/non-existent-product-id-12345");
    expect(res?.status()).toBe(404);
  });
});
