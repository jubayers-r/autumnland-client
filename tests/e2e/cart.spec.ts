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

    // Verify Order summary reflects product price and delivery fee
    const summary = page.getByRole("region", { name: "Order summary" });
    await expect(summary.getByText("$260")).toBeVisible();
    await expect(summary.getByText("$275")).toBeVisible();
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

  test("mobile cart sticky top header and bottom checkout bar interact accurately on scroll and selection", async ({
    page,
  }) => {
    await page.addInitScript((state) => {
      window.localStorage.setItem("autumnland_cart_storage", JSON.stringify(state));
    }, SAMPLE_STORAGE_STATE);

    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/cart");

    // Sticky bottom bar is visible on mobile cart with full-width checkout
    const mobileFooter = page.getByTestId("cart-mobile-footer");
    await expect(mobileFooter).toBeVisible();
    const bottomCheckoutBtn = mobileFooter.getByRole("button", { name: "Go to Checkout" });
    await expect(bottomCheckoutBtn).toBeVisible();
    await expect(bottomCheckoutBtn).toBeEnabled();

    // Scroll down to activate floating sticky top header
    await page.evaluate(() => window.scrollTo(0, 300));
    const floatingNav = page.getByTestId("floating-mobile-nav");
    await expect(floatingNav).toBeVisible();

    // Verify Select All ( 3/3 Items ) and Payable Total are present
    await expect(floatingNav.getByText(/Select All \(3\/3 Items\)/i)).toBeVisible();
    await expect(floatingNav.getByText(/Your Payable Total:/i)).toBeVisible();
    await expect(floatingNav.getByText("$467")).toBeVisible();

    // Deselect all items using the top sticky header checkbox
    const selectAllCheckbox = floatingNav.getByRole("checkbox", {
      name: /Select or deselect all items/i,
    });
    await selectAllCheckbox.click();

    // Verify all items deselected: count becomes 0/3 and payable total becomes $0
    await expect(floatingNav.getByText(/Select All \(0\/3 Items\)/i)).toBeVisible();
    await expect(floatingNav.getByText("$0")).toBeVisible();
    await expect(bottomCheckoutBtn).toBeDisabled();

    // Re-select all items
    await selectAllCheckbox.click();
    await expect(floatingNav.getByText(/Select All \(3\/3 Items\)/i)).toBeVisible();
    await expect(floatingNav.getByText("$467")).toBeVisible();
    await expect(bottomCheckoutBtn).toBeEnabled();

    // Capture screenshot of mobile scrolled cart state
    await page.screenshot({
      path: "test-results/cart_mobile_scrolled.png",
      fullPage: false,
    });
  });

  test("tablet cart sticky top header and bottom checkout bar interact accurately on scroll", async ({
    page,
  }) => {
    await page.addInitScript((state) => {
      window.localStorage.setItem("autumnland_cart_storage", JSON.stringify(state));
    }, SAMPLE_STORAGE_STATE);

    // Tablet viewport (820px width, e.g. iPad Air)
    await page.setViewportSize({ width: 820, height: 1180 });
    await page.goto("/cart");

    // Sticky bottom checkout bar is visible on tablet (< lg)
    const mobileFooter = page.getByTestId("cart-mobile-footer");
    await expect(mobileFooter).toBeVisible();

    // Scroll down to activate floating sticky top header on tablet
    await page.evaluate(() => window.scrollTo(0, 300));
    const floatingNav = page.getByTestId("floating-mobile-nav");
    await expect(floatingNav).toBeVisible();

    // Verify Select All ( 3/3 Items ) and Payable Total are visible on tablet
    await expect(floatingNav.getByText(/Select All \(3\/3 Items\)/i)).toBeVisible();
    await expect(floatingNav.getByText(/Your Payable Total:/i)).toBeVisible();
    await expect(floatingNav.getByText("$467")).toBeVisible();
  });

  test("converts promo code to big letters on typing, applies TEST code with $10 reduction, and displays dev helper", async ({
    page,
  }) => {
    await page.addInitScript(
      (state) => {
        window.localStorage.setItem("autumnland_cart_storage", JSON.stringify(state));
      },
      {
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
          ],
          promoCode: "",
          discountPercentage: 0,
          fixedDiscount: 0,
        },
        version: 0,
      }
    );

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/cart");

    const summary = page.getByRole("region", { name: "Order summary" });
    // Initial: Subtotal 145, Discount $0, Delivery 15 -> Total $160
    await expect(summary.getByText("$145")).toBeVisible();
    await expect(summary.getByText("$160")).toBeVisible();

    // Verify dev helper is visible in development mode
    const devHelper = page.getByTestId("dev-promo-helper");
    await expect(devHelper).toBeVisible();
    await expect(devHelper.getByText("Available code: TEST (-$10)")).toBeVisible();
    await expect(devHelper.getByRole("button", { name: /Activate "TEST"/i })).toBeVisible();

    // Type in lowercase "test"
    const promoInput = page.getByPlaceholder("Add promo code");
    await promoInput.fill("test");

    // Input automatically converts to uppercase "TEST"
    await expect(promoInput).toHaveValue("TEST");

    // Click Apply button
    const applyBtn = page.getByRole("button", { name: "Apply" });
    await applyBtn.click();

    // Verify toast notification for TEST code application
    const toast = page.locator("[data-sonner-toast]").first();
    await expect(toast).toBeVisible();
    await expect(toast.getByText("Promo code 'TEST' applied!")).toBeVisible();

    // Verify $10 discount is applied and reflected in total: 145 - 10 + 15 = $150
    await expect(summary.getByText("TEST -$10")).toBeVisible();
    await expect(summary.getByText("-$10", { exact: true })).toBeVisible();
    await expect(summary.getByText("$150")).toBeVisible();
  });

  test("renders Select All toggle and shows amber warning when 0 items are selected", async ({
    page,
  }) => {
    await page.addInitScript(
      (state) => {
        window.localStorage.setItem("autumnland_cart_storage", JSON.stringify(state));
      },
      {
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
          selectedItemIds: null,
          promoCode: "",
          discountPercentage: 0,
          fixedDiscount: 0,
        },
        version: 0,
      }
    );

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/cart");

    // Initially 2/2 selected
    const selectAllBtn = page.getByRole("checkbox", { name: "Select all items in cart" });
    await expect(selectAllBtn).toBeVisible();
    await expect(page.getByText("Select All ( 2/2 Items )")).toBeVisible();

    // No warning banner initially
    const warning = page.locator("[data-cart-warning]");
    await expect(warning).not.toBeVisible();

    // Click Select All -> Deselects all items (0/2)
    await selectAllBtn.click();
    await expect(page.getByText("Select All ( 0/2 Items )")).toBeVisible();

    // Amber warning banner must appear with exact title and description
    await expect(warning).toBeVisible();
    await expect(warning.getByText("No items selected")).toBeVisible();
    await expect(warning.getByText("Select at least one item to checkout")).toBeVisible();

    // Click Select All again -> Reselects all items (2/2)
    await selectAllBtn.click();
    await expect(page.getByText("Select All ( 2/2 Items )")).toBeVisible();
    await expect(warning).not.toBeVisible();
  });
});
