import { expect, test } from "@playwright/test";

const SAMPLE_STORAGE_STATE = {
  state: {
    items: [
      {
        id: "gradient-graphic-t-shirt-large-white",
        productId: "gradient-graphic-t-shirt",
        title: "Gradient Graphic T-shirt",
        imageSrc: "/assets/t-shirt/image 2.png",
        price: 145,
        size: "Large",
        color: "White",
        quantity: 1,
      },
      {
        id: "checkered-shirt-medium-red",
        productId: "checkered-shirt",
        title: "Checkered Shirt",
        imageSrc: "/assets/t-shirt/image 9.png",
        price: 180,
        size: "Medium",
        color: "Red",
        quantity: 1,
      },
      {
        id: "skinny-fit-jeans-large-blue",
        productId: "skinny-fit-jeans",
        title: "Skinny Fit Jeans",
        imageSrc: "/assets/t-shirt/image 8.png",
        price: 240,
        size: "Large",
        color: "Blue",
        quantity: 1,
      },
    ],
    promoCode: "AUTUMN20",
    discountPercentage: 20,
  },
  version: 0,
};

test.describe("Shopping Cart Flow & Responsiveness", () => {
  test("renders empty cart page by default with call to action", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/cart");

    // Page title and breadcrumbs
    const title = page.getByRole("heading", { name: "YOUR CART" });
    await expect(title).toBeVisible();

    const breadcrumbs = page.getByRole("navigation", { name: "breadcrumb" });
    await expect(breadcrumbs).toBeVisible();
    await expect(breadcrumbs.getByText("Home")).toBeVisible();
    await expect(breadcrumbs.getByText("Cart")).toBeVisible();

    // Verify empty state is displayed initially
    await expect(page.getByRole("heading", { name: "YOUR CART IS EMPTY" })).toBeVisible();
    await expect(page.getByText(/Looks like you haven't added any items yet/i)).toBeVisible();

    const exploreBtn = page.getByRole("link", { name: "Explore Products" });
    await expect(exploreBtn).toBeVisible();
    await expect(exploreBtn).toHaveAttribute("href", "/shop");

    // Order Summary section reflects empty cart
    const summary = page.getByRole("region", { name: "Order summary" });
    await expect(summary).toBeVisible();
    await expect(summary.getByText("$0").first()).toBeVisible();

    const checkoutBtn = page.getByRole("button", { name: "Go to Checkout" });
    await expect(checkoutBtn).toBeDisabled();
  });

  test("integrates with product detail page Add to Cart flow with View Cart toast button and persistence", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/shop/product/one-life-graphic-t-shirt");

    const addToCartBtn = page.getByRole("button", { name: "Add to Cart" });
    await addToCartBtn.click();

    // Verify toast is visible with "View Cart" action button
    const toast = page.locator("[data-sonner-toast]").first();
    await expect(toast).toBeVisible();
    await expect(toast.getByText("Added to Cart!")).toBeVisible();

    const viewCartBtn = toast.getByRole("button", { name: "View Cart" });
    await expect(viewCartBtn).toBeVisible();

    // Clicking "View Cart" in toast navigates to /cart
    await viewCartBtn.click();
    await expect(page).toHaveURL("/cart");

    // Verify item is present in the cart
    await expect(page.getByRole("heading", { name: /One Life Graphic T-shirt/i })).toBeVisible();

    // Refresh page to verify persistence in localStorage
    await page.reload();
    await expect(page.getByRole("heading", { name: /One Life Graphic T-shirt/i })).toBeVisible();
  });

  test("updates item quantity and recalculates totals", async ({ page }) => {
    // Seed localStorage with reference items
    await page.addInitScript((state) => {
      window.localStorage.setItem("autumnland_cart_storage", JSON.stringify(state));
    }, SAMPLE_STORAGE_STATE);

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
    await page.addInitScript((state) => {
      window.localStorage.setItem("autumnland_cart_storage", JSON.stringify(state));
    }, SAMPLE_STORAGE_STATE);

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
    await page.addInitScript((state) => {
      window.localStorage.setItem("autumnland_cart_storage", JSON.stringify(state));
    }, SAMPLE_STORAGE_STATE);

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
    await page.addInitScript((state) => {
      window.localStorage.setItem("autumnland_cart_storage", JSON.stringify(state));
    }, SAMPLE_STORAGE_STATE);

    // Mobile iPhone SE viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/cart");

    await expect(page.getByRole("heading", { name: "YOUR CART" })).toBeVisible();

    // Verify item cards are visible
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

  test("navigates to product detail page when clicking on cart item", async ({ page }) => {
    await page.addInitScript((state) => {
      window.localStorage.setItem("autumnland_cart_storage", JSON.stringify(state));
    }, SAMPLE_STORAGE_STATE);

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/cart");

    // Click on Gradient Graphic T-shirt title link
    const itemLink = page
      .getByRole("heading", { name: "Gradient Graphic T-shirt" })
      .getByRole("link");
    await expect(itemLink).toBeVisible();
    await expect(itemLink).toHaveAttribute("href", "/shop/product/gradient-graphic-t-shirt");
    await itemLink.click();

    // Verifies navigation to product page
    await expect(page).toHaveURL("/shop/product/gradient-graphic-t-shirt");
    await expect(page.getByRole("heading", { name: /Gradient Graphic T-shirt/i })).toBeVisible();
  });

  test("captures cart screenshots for visual verification", async ({ page }) => {
    await page.addInitScript((state) => {
      window.localStorage.setItem("autumnland_cart_storage", JSON.stringify(state));
    }, SAMPLE_STORAGE_STATE);

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/cart");
    await page.screenshot({
      path: "test-results/cart_desktop.png",
      fullPage: false,
    });

    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/cart");
    await page.screenshot({
      path: "test-results/cart_mobile.png",
      fullPage: false,
    });
  });
});
