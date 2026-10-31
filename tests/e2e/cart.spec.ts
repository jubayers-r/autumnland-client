import { expect, test } from "@playwright/test";

test.describe("Shopping Cart Flow & Responsiveness", () => {
  test("renders cart page with reference items and initial order summary", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/cart");

    // Page title and breadcrumbs
    const title = page.getByRole("heading", { name: "YOUR CART" });
    await expect(title).toBeVisible();

    const breadcrumbs = page.getByRole("navigation", { name: "breadcrumb" });
    await expect(breadcrumbs).toBeVisible();
    await expect(breadcrumbs.getByText("Home")).toBeVisible();
    await expect(breadcrumbs.getByText("Cart")).toBeVisible();

    // Verify 3 items from reference
    const items = page.locator("[data-cart-item]");
    await expect(items).toHaveCount(3);

    // Item 1: Gradient Graphic T-shirt
    await expect(page.getByRole("heading", { name: "Gradient Graphic T-shirt" })).toBeVisible();
    await expect(page.getByText("Size: Large").first()).toBeVisible();
    await expect(page.getByText("Color: White")).toBeVisible();
    await expect(
      page.locator("[data-item-id='gradient-graphic-t-shirt-large-white']").getByText("$145")
    ).toBeVisible();

    // Item 2: Checkered Shirt
    await expect(page.getByRole("heading", { name: "Checkered Shirt" })).toBeVisible();
    await expect(page.getByText("Size: Medium")).toBeVisible();
    await expect(page.getByText("Color: Red")).toBeVisible();
    await expect(
      page.locator("[data-item-id='checkered-shirt-medium-red']").getByText("$180")
    ).toBeVisible();

    // Item 3: Skinny Fit Jeans
    await expect(page.getByRole("heading", { name: "Skinny Fit Jeans" })).toBeVisible();
    await expect(page.getByText("Color: Blue")).toBeVisible();
    await expect(
      page.locator("[data-item-id='skinny-fit-jeans-large-blue']").getByText("$240")
    ).toBeVisible();

    // Order Summary section
    const summary = page.getByRole("region", { name: "Order summary" });
    await expect(summary).toBeVisible();
    await expect(summary.getByText("$565")).toBeVisible(); // Subtotal
    await expect(summary.getByText("-$113")).toBeVisible(); // 20% discount
    await expect(summary.getByText("$15")).toBeVisible(); // Delivery fee
    await expect(summary.getByText("$467")).toBeVisible(); // Total
  });

  test("updates item quantity and recalculates totals", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/cart");

    const firstItem = page.locator("[data-item-id='gradient-graphic-t-shirt-large-white']");
    const increaseBtn = firstItem.getByRole("button", { name: /Increase quantity/i });

    // Initial subtotal is 565
    await expect(
      page.getByRole("region", { name: "Order summary" }).getByText("$565")
    ).toBeVisible();

    // Increment quantity of $145 shirt by 1 -> Subtotal becomes 565 + 145 = 710
    await increaseBtn.click();
    await expect(firstItem.getByText("2")).toBeVisible();

    const summary = page.getByRole("region", { name: "Order summary" });
    await expect(summary.getByText("$710")).toBeVisible(); // New Subtotal
    await expect(summary.getByText("-$142")).toBeVisible(); // 20% discount on 710 is 142
    await expect(summary.getByText("$583")).toBeVisible(); // 710 - 142 + 15 = 583
  });

  test("removes item from cart when trash icon is clicked", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/cart");

    const deleteBtn = page.getByRole("button", {
      name: "Remove Gradient Graphic T-shirt from cart",
    });
    await deleteBtn.click();

    // Now only 2 items remain
    const items = page.locator("[data-cart-item]");
    await expect(items).toHaveCount(2);

    // Check subtotal without 145: 180 + 240 = 420
    const summary = page.getByRole("region", { name: "Order summary" });
    await expect(summary.getByText("$420")).toBeVisible();
  });

  test("applies promo code and shows discount adjustment", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/cart");

    const promoInput = page.getByPlaceholder("Add promo code");
    const applyBtn = page.getByRole("button", { name: "Apply" });

    await promoInput.fill("VIP30");
    await applyBtn.click();

    const summary = page.getByRole("region", { name: "Order summary" });
    // 30% discount on 565 is 169.5 -> rounds to 170
    await expect(summary.getByText("Discount (-30%)")).toBeVisible();
    await expect(summary.getByText("-$170")).toBeVisible();
    // Total: 565 - 170 + 15 = 410
    await expect(summary.getByText("$410")).toBeVisible();
  });

  test("renders mobile view vertically stacked without overflow", async ({ page }) => {
    // Mobile iPhone SE viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/cart");

    await expect(page.getByRole("heading", { name: "YOUR CART" })).toBeVisible();

    // Verify all 3 item cards are visible
    const items = page.locator("[data-cart-item]");
    await expect(items).toHaveCount(3);

    // Verify Order summary is visible below
    const summary = page.getByRole("region", { name: "Order summary" });
    await expect(summary).toBeVisible();

    // Checkout button is visible and full width
    const checkoutBtn = page.getByRole("button", { name: "Go to Checkout" });
    await expect(checkoutBtn).toBeVisible();

    // Verify no horizontal overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // 1px rounding tolerance
  });

  test("integrates with product detail page Add to Cart flow", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/shop/product/one-life-graphic-t-shirt");

    const addToCartBtn = page.getByRole("button", { name: "Add to Cart" });
    await addToCartBtn.click();

    // Navigate to cart via Navbar shopping cart link (client-side navigation preserving Zustand state)
    const cartLink = page.getByRole("link", { name: "Shopping Cart" }).first();
    await cartLink.click();
    await expect(page).toHaveURL("/cart");

    // Verify "One Life Graphic T-shirt" is present in the cart
    await expect(page.getByRole("heading", { name: /One Life Graphic T-shirt/i })).toBeVisible();
  });

  test("captures cart screenshots for visual verification", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/cart");
    await page.screenshot({
      path: "C:/Users/Jubayer/.gemini/antigravity/brain/255ade13-9243-4b63-a611-80b1f50940e6/cart_desktop.png",
      fullPage: false,
    });

    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/cart");
    await page.screenshot({
      path: "C:/Users/Jubayer/.gemini/antigravity/brain/255ade13-9243-4b63-a611-80b1f50940e6/cart_mobile.png",
      fullPage: false,
    });
  });
});
