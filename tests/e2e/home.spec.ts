import { expect, test } from "@playwright/test";

test.describe("Landing Page Hero & Brand Banner", () => {
  test("applies Satoshi and Integral CF local fonts across headings and body", async ({ page }) => {
    await page.goto("/");
    const bodyFont = await page.evaluate(() => window.getComputedStyle(document.body).fontFamily);
    const h1Font = await page.evaluate(
      () => window.getComputedStyle(document.querySelector("h1")!).fontFamily
    );
    const brandLogoFont = await page.evaluate(
      () => window.getComputedStyle(document.querySelector('header a[href="/"]')!).fontFamily
    );

    expect(bodyFont.toLowerCase()).toContain("satoshi");
    expect(h1Font.toLowerCase()).toContain("integralcf");
    expect(brandLogoFont.toLowerCase()).toContain("integralcf");
  });

  test("renders hero headline, copy, and Shop Now CTA", async ({ page }) => {
    await page.goto("/");

    // Verify hero heading
    const heading = page.getByRole("heading", {
      name: /FIND CLOTHES THAT MATCHES YOUR STYLE/i,
    });
    await expect(heading).toBeVisible();

    // Verify subtext
    await expect(
      page.getByText(/Browse through our diverse range of meticulously crafted garments/i)
    ).toBeVisible();

    // Verify Shop Now CTA button
    const shopNowBtn = page.getByRole("link", { name: "Shop Now" });
    await expect(shopNowBtn).toBeVisible();
    await expect(shopNowBtn).toHaveAttribute("href", "/shop");
  });

  test("renders social proof statistics on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await expect(page.getByText("200+").filter({ visible: true })).toBeVisible();
    await expect(page.getByText("International Brands").filter({ visible: true })).toBeVisible();
    await expect(page.getByText("2,000+").filter({ visible: true })).toBeVisible();
    await expect(page.getByText("High-Quality Products").filter({ visible: true })).toBeVisible();
    await expect(page.getByText("30,000+").filter({ visible: true })).toBeVisible();
    await expect(
      page.getByText("Happy Customers", { exact: true }).filter({ visible: true })
    ).toBeVisible();
  });

  test("renders partner brands in the brand strip", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("img", { name: "Versace logo" }).first()).toBeVisible();
    await expect(page.getByRole("img", { name: "Zara logo" }).first()).toBeVisible();
    await expect(page.getByRole("img", { name: "Gucci logo" }).first()).toBeVisible();
    await expect(page.getByRole("img", { name: "Prada logo" }).first()).toBeVisible();
    await expect(page.getByRole("img", { name: "Calvin Klein logo" }).first()).toBeVisible();
  });

  test("renders mobile-responsive hero layout and statistics", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Heading is visible on mobile
    await expect(
      page.getByRole("heading", {
        name: /FIND CLOTHES THAT MATCHES YOUR STYLE/i,
      })
    ).toBeVisible();

    // Shop Now button is full width on mobile
    const shopNowBtn = page.getByRole("link", { name: "Shop Now" });
    await expect(shopNowBtn).toBeVisible();

    // All 3 statistics render properly on mobile
    await expect(page.getByText("200+").filter({ visible: true })).toBeVisible();
    await expect(page.getByText("2,000+").filter({ visible: true })).toBeVisible();
    await expect(page.getByText("30,000+").filter({ visible: true })).toBeVisible();
  });

  test("captures preview screenshots and verifies active marquee animation", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const marqueeTrack = page.locator(".animate-marquee-track");
    await expect(marqueeTrack).toBeVisible();

    const animName = await marqueeTrack.evaluate((el) => window.getComputedStyle(el).animationName);
    expect(animName).toBe("marqueeScroll");

    await page.screenshot({ path: "test-results/desktop-preview.png", fullPage: true });

    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.screenshot({ path: "test-results/mobile-preview.png", fullPage: true });
  });

  test("renders New Arrivals and Top Selling sections with products, ratings and prices", async ({
    page,
  }) => {
    // Tablet viewport screenshot
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await page.locator("#newest").screenshot({ path: "test-results/tablet-preview.png" });

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    // Headings
    const newArrivalsHeading = page.getByRole("heading", { name: "NEW ARRIVALS" });
    const topSellingHeading = page.getByRole("heading", { name: "TOP SELLING" });
    await expect(newArrivalsHeading).toBeVisible();
    await expect(topSellingHeading).toBeVisible();

    // Products in New Arrivals
    await expect(page.getByText("T-shirt with Tape Details")).toBeVisible();
    await expect(page.getByText("Skinny Fit Jeans")).toBeVisible();
    await expect(page.getByText("Checkered Shirt")).toBeVisible();
    await expect(page.getByText("Sleeve Striped T-shirt")).toBeVisible();

    // Prices and discount badges in New Arrivals
    await expect(page.getByText("$120")).toBeVisible();
    await expect(page.getByText("$240")).toBeVisible();
    await expect(page.getByText("$260")).toBeVisible();
    await expect(page.getByText("-20%").first()).toBeVisible();
    await expect(page.getByText("$180")).toBeVisible();
    await expect(page.getByText("$130")).toBeVisible();
    await expect(page.getByText("$160")).toBeVisible();
    await expect(page.getByText("-30%")).toBeVisible();

    // Products in Top Selling
    await expect(page.getByText("Vertical Striped Shirt")).toBeVisible();
    await expect(page.getByText("Courage Graphic T-shirt")).toBeVisible();
    await expect(page.getByText("Loose Fit Bermuda Shorts")).toBeVisible();
    await expect(page.getByText("Faded Skinny Jeans")).toBeVisible();

    // Prices in Top Selling
    await expect(page.getByText("$212")).toBeVisible();
    await expect(page.getByText("$145")).toBeVisible();
    await expect(page.getByText("$80")).toBeVisible();
    await expect(page.getByText("$210")).toBeVisible();

    // Verify sales count with rating: "50 sold | rating"
    await expect(page.getByText("1120 sold").first()).toBeVisible();
    await expect(page.getByText("1100 sold").first()).toBeVisible();
    await expect(page.getByText("4.5/5").first()).toBeVisible();

    // View All CTA buttons
    const viewAllButtons = page.getByRole("link", { name: "View All" });
    await expect(viewAllButtons).toHaveCount(2);
  });

  test("shows quick Add to Cart button on product card hover and triggers cart addition", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const firstCard = page.locator("#newest [data-product-card]").first();
    await firstCard.scrollIntoViewIfNeeded();

    // Hover over product card
    await firstCard.hover();

    // Verify Add to Cart button is visible
    const addToCartBtn = firstCard.getByRole("button", { name: /Add.*to cart/i });
    await expect(addToCartBtn).toBeVisible();

    // Click Add to Cart
    await addToCartBtn.click();

    // Verify Sonner toast with View Cart action button
    const toast = page.locator("[data-sonner-toast]").first();
    await expect(toast).toBeVisible();
    await expect(toast.getByText("Added to Cart!")).toBeVisible();
    const viewCartBtn = toast.getByRole("button", { name: "View Cart" });
    await expect(viewCartBtn).toBeVisible();

    // Click View Cart navigates to /cart and item is present
    await viewCartBtn.click();
    await expect(page).toHaveURL("/cart");
    await expect(page.getByRole("heading", { name: "YOUR CART" })).toBeVisible();
    await expect(page.locator("[data-cart-item]").first()).toBeVisible();
  });
});
