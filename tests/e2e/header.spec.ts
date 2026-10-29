import { test, expect } from "@playwright/test";

test.describe("Header & Navigation Component", () => {
  test("renders announcement banner and dismisses on close button click", async ({ page }) => {
    await page.goto("/");

    const bannerText = page.getByText(/Sign up and get 20% off to your first order/i);
    await expect(bannerText).toBeVisible();

    const dismissBtn = page.getByRole("button", { name: "Dismiss banner" });
    await expect(dismissBtn).toBeVisible();
    await dismissBtn.click();

    await expect(bannerText).not.toBeVisible();
  });

  test("renders brand logo, desktop navigation links, search input, and action icons", async ({
    page,
  }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    // Logo
    const logo = page.getByRole("link", { name: "AUTUMN LAND" });
    await expect(logo).toBeVisible();

    // Nav links
    await expect(page.getByRole("button", { name: "Shop" })).toBeVisible();
    await expect(page.getByRole("link", { name: "On Sale" })).toBeVisible();
    await expect(page.getByRole("link", { name: "New Arrivals" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Brands" })).toBeVisible();

    // Search bar
    const searchInput = page.getByPlaceholder("Search for products...").filter({ visible: true });
    await expect(searchInput).toBeVisible();

    // Cart and Account icons
    await expect(page.getByRole("link", { name: "Shopping Cart" })).toBeVisible();
    await expect(page.getByRole("link", { name: "User Account" })).toBeVisible();
  });

  test("opens Shop dropdown on hover with category items", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const shopBtn = page.getByRole("button", { name: "Shop" });
    await expect(shopBtn).toBeVisible();

    await shopBtn.hover();
    await expect(page.getByRole("link", { name: "All Collections" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Casual Style" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Formal Style" })).toBeVisible();
  });

  test("renders mobile navigation with search bar and transitions on scroll", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Unscrolled: Logo, Hamburger, Cart, Account, and Search Bar are all present
    await expect(page.getByRole("link", { name: "AUTUMN LAND" })).toBeVisible();
    const menuBtn = page.getByRole("button", { name: "Open navigation menu" });
    await expect(menuBtn).toBeVisible();

    const searchInput = page.getByPlaceholder("Search for products...").filter({ visible: true });
    await expect(searchInput).toBeVisible();

    await expect(page.getByRole("link", { name: "Shopping Cart" })).toBeVisible();
    await expect(page.getByRole("link", { name: "User Account" })).toBeVisible();

    // Capture unscrolled mobile navbar
    await page.screenshot({ path: "test-results/mobile-navbar-unscrolled.png" });

    // Scroll down to test sticky compact scroll state (Image 2 concept)
    await page.evaluate(() => {
      window.scrollTo(0, 150);
      window.dispatchEvent(new Event("scroll"));
    });
    await page.waitForTimeout(300);

    // Capture scrolled mobile navbar
    await page.screenshot({ path: "test-results/mobile-navbar-scrolled.png" });

    // On scroll: Hamburger, Search, and Cart remain visible
    await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeVisible();
    await expect(
      page.getByPlaceholder("Search for products...").filter({ visible: true })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Shopping Cart" })).toBeVisible();

    // Open mobile menu drawer
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(page.getByRole("link", { name: "All Collections" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Casual" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Formal" })).toBeVisible();
  });
});
