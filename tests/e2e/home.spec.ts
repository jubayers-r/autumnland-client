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

    await page.screenshot({ path: "test-results/desktop-preview.png" });

    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.screenshot({ path: "test-results/mobile-preview.png", fullPage: true });
  });
});
