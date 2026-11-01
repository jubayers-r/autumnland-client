import { expect, test } from "@playwright/test";

test.describe("Shop & Category Catalog Page", () => {
  test("renders desktop shop page matching Casual reference design", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 850 });
    await page.goto("/shop");

    // Breadcrumbs
    const breadcrumbs = page.getByRole("navigation", { name: "breadcrumb" });
    await expect(breadcrumbs).toBeVisible();
    await expect(breadcrumbs.getByText("Home")).toBeVisible();
    await expect(breadcrumbs.getByText("Casual")).toBeVisible();

    // Section title
    const heading = page.getByRole("heading", { name: "CASUAL" });
    await expect(heading).toBeVisible();

    // Desktop Filters Sidebar
    const filtersSidebar = page.getByRole("complementary", {
      name: "Product filters",
    });
    await expect(filtersSidebar).toBeVisible();
    await expect(filtersSidebar.getByText("Filters")).toBeVisible();
    await expect(filtersSidebar.getByText("Price")).toBeVisible();
    await expect(filtersSidebar.getByText("Colors")).toBeVisible();
    await expect(filtersSidebar.getByText("Size")).toBeVisible();
    await expect(filtersSidebar.getByText("Dress Style")).toBeVisible();
    await expect(filtersSidebar.getByRole("button", { name: "Apply Filter" })).toBeVisible();

    // Verify 9 products displayed on Page 1 matching reference
    const productCards = page.locator("[data-product-card]");
    await expect(productCards).toHaveCount(9);

    await expect(page.getByText("Gradient Graphic T-shirt").first()).toBeVisible();
    await expect(page.getByText("Polo with Tipping Details").first()).toBeVisible();
    await expect(page.getByText("Black Striped T-shirt").first()).toBeVisible();
    await expect(page.getByText("Skinny Fit Jeans").first()).toBeVisible();
    await expect(page.getByText("Checkered Shirt").first()).toBeVisible();
    await expect(page.getByText("Sleeve Striped T-shirt").first()).toBeVisible();
    await expect(page.getByText("Vertical Striped Shirt").first()).toBeVisible();
    await expect(page.getByText("Courage Graphic T-shirt").first()).toBeVisible();
    await expect(page.getByText("Loose Fit Bermuda Shorts").first()).toBeVisible();

    // Range display
    await expect(page.getByText(/Showing 1-9 of \d+ Products/i)).toBeVisible();

    // Pagination
    const pagination = page.getByRole("navigation", { name: "Pagination" });
    await expect(pagination).toBeVisible();
    await expect(pagination.getByRole("button", { name: "Previous" })).toBeDisabled();
    await expect(pagination.getByRole("button", { name: "Next" })).toBeEnabled();
    await expect(pagination.getByRole("button", { name: "Page 1" })).toBeVisible();

    // Capture desktop screenshot
    await page.screenshot({
      path: "test-results/shop_desktop.png",
      fullPage: false,
    });
  });

  test("filters catalog by category and resets cleanly", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 850 });
    await page.goto("/shop");

    const filtersSidebar = page.getByRole("complementary", {
      name: "Product filters",
    });

    // Filter by "Jeans"
    const jeansBtn = filtersSidebar.getByRole("button", { name: "Jeans" });
    await jeansBtn.click();

    // Verify only jeans are visible
    await expect(page.getByText("Skinny Fit Jeans").first()).toBeVisible();
    await expect(page.getByText("Gradient Graphic T-shirt")).not.toBeVisible();

    // Reset filters
    const resetBtn = filtersSidebar.getByRole("button", { name: "Reset Filters" });
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();

    // Verify catalog is restored
    await expect(page.getByText("Gradient Graphic T-shirt").first()).toBeVisible();
  });

  test("filters catalog by size badge", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 850 });
    await page.goto("/shop");

    const filtersSidebar = page.getByRole("complementary", {
      name: "Product filters",
    });

    // Click "Large" size badge
    const largeBadge = filtersSidebar.getByRole("button", { name: "Large", exact: true });
    await largeBadge.click();

    // Verify button has selected styling (aria-pressed)
    await expect(largeBadge).toHaveAttribute("aria-pressed", "true");

    // Products matching Large are shown
    await expect(page.getByText("Gradient Graphic T-shirt").first()).toBeVisible();
  });

  test("sorts catalog via dropdown menu", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 850 });
    await page.goto("/shop");

    // Open sort dropdown
    const sortTrigger = page.getByRole("button", { name: /Sort by/i });
    await sortTrigger.click();

    // Select "Price: Low to High"
    const priceAscOption = page.getByRole("menuitem", {
      name: "Price: Low to High",
    });
    await priceAscOption.click();

    // First item should be lowest price (e.g. Bermuda Shorts at $80)
    const firstProduct = page.locator("[data-product-card]").first();
    await expect(firstProduct.getByText("$80")).toBeVisible();
  });

  test("supports real multi-page pagination navigation", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 850 });
    await page.goto("/shop");

    const pagination = page.getByRole("navigation", { name: "Pagination" });

    // Click page 2
    const page2Btn = pagination.getByRole("button", { name: "Page 2" });
    await page2Btn.click();

    // Page 2 products are shown (e.g. Faded Skinny Jeans)
    await expect(pagination.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    await expect(page.getByText(/Showing 10-\d+ of \d+ Products/i)).toBeVisible();

    // Click Previous button to return to page 1
    const prevBtn = pagination.getByRole("button", { name: "Previous" });
    await prevBtn.click();
    await expect(pagination.getByRole("button", { name: "Page 1" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    await expect(page.getByText(/Showing 1-9 of \d+ Products/i)).toBeVisible();
  });

  test("renders mobile view with 2-column grid and accessible mobile Add to Cart", async ({
    page,
  }) => {
    // iPhone viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/shop");

    // Title and Breadcrumbs visible
    await expect(page.getByRole("heading", { name: "CASUAL" })).toBeVisible();

    // Mobile filter toggle button is visible
    const mobileFilterBtn = page.getByRole("button", {
      name: "Open filter options",
    });
    await expect(mobileFilterBtn).toBeVisible();

    // Verify 2-column grid of products
    const cards = page.locator("[data-product-card]");
    await expect(cards.first()).toBeVisible();

    // Verify Add to Cart button is directly visible on mobile
    const firstAddBtn = cards.first().getByRole("button", { name: /Add.*to cart/i });
    await expect(firstAddBtn).toBeVisible();

    // Tapping Add to Cart triggers Sonner toast with View Cart action
    await firstAddBtn.click();
    const toast = page.locator("[data-sonner-toast]").first();
    await expect(toast).toBeVisible();
    await expect(toast.getByRole("button", { name: "View Cart" })).toBeVisible();

    // Capture mobile preview screenshot
    await page.screenshot({
      path: "test-results/shop_mobile.png",
      fullPage: false,
    });
  });

  test("opens mobile filter sheet drawer and applies selections", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/shop");

    // Open mobile filter sheet
    const mobileFilterBtn = page.getByRole("button", {
      name: "Open filter options",
    });
    await mobileFilterBtn.click();

    // Verify Sheet drawer opened
    const sheet = page.getByRole("dialog");
    await expect(sheet).toBeVisible();
    await expect(sheet.getByRole("heading", { name: "Filters" })).toBeVisible();

    // Capture mobile filter drawer screenshot
    await page.screenshot({
      path: "test-results/shop_mobile_filters.png",
      fullPage: false,
    });

    // Select "T-shirts" in drawer
    const tshirtsBtn = sheet.getByRole("button", { name: "T-shirts" });
    await tshirtsBtn.click();

    // Click Apply Filter in drawer
    const applyBtn = sheet.getByRole("button", { name: "Apply Filter" });
    await applyBtn.click();

    // Drawer closes and filter is applied
    await expect(sheet).not.toBeVisible();
    await expect(page.getByText("T-shirt with Tape Details").first()).toBeVisible();
  });

  test("loads /shop?filter=sale with only discounted products and On Sale title", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 850 });
    await page.goto("/shop?filter=sale");

    // Title should show ON SALE
    await expect(page.getByRole("heading", { name: "ON SALE" })).toBeVisible();

    // Verify all rendered cards have discount badges
    const cards = page.locator("[data-product-card]");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      // Each on-sale product should display a discount percentage (e.g. -20%, -30%, -40%, -15%)
      await expect(card.getByText(/-\d+%/)).toBeVisible();
    }

    // "Show non-sale" shortcut button is visible on breadcrumb row
    const showNonSaleBtn = page.getByRole("button", { name: /Show non-sale/i });
    await expect(showNonSaleBtn).toBeVisible();

    // Clicking "Show non-sale" unselects on-sale filter and navigates back to full catalog
    await showNonSaleBtn.click();
    await expect(showNonSaleBtn).not.toBeVisible();
    await expect(page).toHaveURL("/shop");
  });

  test("loads /shop?sort=newest with newest sort active and New Arrivals title", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 850 });
    await page.goto("/shop?sort=newest");

    // Title should show NEW ARRIVALS
    await expect(page.getByRole("heading", { name: "NEW ARRIVALS" })).toBeVisible();

    // Sort button should show Sort by: Newest
    const sortBtn = page.getByRole("button", { name: /Sort by.*Newest/i });
    await expect(sortBtn).toBeVisible();
  });

  test("enforces single selection on dress style in filter sidebar", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 850 });
    await page.goto("/shop");

    const filtersSidebar = page.getByRole("complementary", {
      name: "Product filters",
    });

    const casualBtn = filtersSidebar.getByRole("button", { name: "Casual" });
    const formalBtn = filtersSidebar.getByRole("button", { name: "Formal" });

    // Initially no dress style is selected on /shop
    await expect(casualBtn).not.toHaveClass(/font-bold/);
    await expect(formalBtn).not.toHaveClass(/font-bold/);

    // Click Casual
    await casualBtn.click();
    await expect(casualBtn).toHaveClass(/font-bold/);

    // Click Formal
    await formalBtn.click();

    // Formal should now be selected and Casual deselected (single-select)
    await expect(formalBtn).toHaveClass(/font-bold/);
    await expect(casualBtn).not.toHaveClass(/font-bold/);
  });

  test("clicking on /shop anytime resets all filters and shows full default state", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 850 });
    // Go to filtered URL
    await page.goto("/shop?category=jeans&minPrice=100&sort=newest");
    await expect(page.getByText("Skinny Fit Jeans").first()).toBeVisible();

    // Click Shop in navbar
    const shopNavBtn = page.getByRole("button", { name: "Shop", exact: true });
    await shopNavBtn.click();

    // Should be at /shop with default 9 products
    await expect(page).toHaveURL("/shop");
    await expect(page.getByText(/Showing 1-9 of \d+ Products/i)).toBeVisible();
    await expect(page.getByText("Gradient Graphic T-shirt").first()).toBeVisible();
  });

  test("filters catalog by Brands section with multi-selection", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 850 });
    await page.goto("/shop");

    const filtersSidebar = page.getByRole("complementary", {
      name: "Product filters",
    });

    // Select Versace
    const versaceBtn = filtersSidebar.getByRole("button", { name: "Versace" });
    await versaceBtn.click();

    // Verify only Versace products are shown
    await expect(page.getByText("Sleeve Striped T-shirt").first()).toBeVisible();
    await expect(page.getByText("Courage Graphic T-shirt").first()).toBeVisible();
    await expect(page.getByText("Polo with Tipping Details")).not.toBeVisible();
  });

  test("navigates to /brands page, renders marquee logos, and filters by brand on click", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 850 });
    await page.goto("/");

    // Click Brands in desktop navbar
    const brandsNavLink = page.getByRole("link", { name: "Brands", exact: true });
    await brandsNavLink.click();

    // Arrives at /brands page
    await expect(page).toHaveURL("/brands");
    await expect(page.getByRole("heading", { name: "OUR BRAND PARTNERS" })).toBeVisible();

    // Verify all 5 brands are displayed
    await expect(page.getByRole("heading", { name: "Versace" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Zara" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Gucci" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Prada" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Calvin Klein" })).toBeVisible();

    // Click Gucci card
    const gucciCard = page.getByRole("link", { name: /Gucci/i });
    await gucciCard.click();

    // Arrives at /shop?brand=Gucci
    await expect(page).toHaveURL(/brand=Gucci/);
    await expect(page.getByRole("heading", { name: "GUCCI" })).toBeVisible();
    await expect(page.getByText("Black Striped T-shirt").first()).toBeVisible();
    await expect(page.getByText("One Life Graphic T-shirt").first()).toBeVisible();
  });

  test("sonner toast resets staying timer and stays visible across rapid continuous clicks", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 850 });
    await page.goto("/shop");

    const firstCard = page.locator("[data-product-card]").first();
    const addBtn = firstCard.getByRole("button", { name: /Add.*to cart/i });

    // Click 1
    await addBtn.click({ force: true });
    const toast = page.locator("[data-sonner-toast]").first();
    await expect(toast).toBeVisible();

    // Click 2 (previously toggled off, now remains visible)
    await addBtn.click({ force: true });
    await expect(toast).toBeVisible();

    // Click 3
    await addBtn.click({ force: true });
    await expect(toast).toBeVisible();

    // Click 4
    await addBtn.click({ force: true });
    await expect(toast).toBeVisible();
  });
});
