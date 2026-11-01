import { test, expect } from "@playwright/test";

test.describe("Footer & Newsletter Section", () => {
  test("renders newsletter heading, input, and subscribe button on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    // Newsletter section visibility
    const newsletterHeading = page.getByRole("heading", {
      name: /STAY UPTO DATE ABOUT OUR LATEST OFFERS/i,
    });
    await expect(newsletterHeading).toBeVisible();

    const emailInput = page.getByPlaceholder("Enter your email address");
    await expect(emailInput).toBeVisible();

    const subscribeBtn = page.getByRole("button", { name: /Subscribe to Newsletter/i });
    await expect(subscribeBtn).toBeVisible();
  });

  test("handles newsletter subscription validation and success state", async ({ page }) => {
    await page.goto("/");

    const emailInput = page.getByPlaceholder("Enter your email address");
    const subscribeBtn = page.getByRole("button", { name: /Subscribe to Newsletter/i });

    // 1. Submit empty email -> error toast
    await subscribeBtn.click();
    await expect(page.getByText(/Please enter your email address/i)).toBeVisible();

    // 2. Submit invalid email format -> error toast
    await emailInput.fill("invalid-email-address");
    await subscribeBtn.click();
    await expect(page.getByText(/Please enter a valid email address/i)).toBeVisible();

    // 3. Submit valid email -> success toast and input reset
    await emailInput.fill("customer@autumnland.shop");
    await subscribeBtn.click();
    await expect(page.getByText(/Thank you for subscribing to our latest offers!/i)).toBeVisible();
    await expect(emailInput).toHaveValue("");
  });

  test("renders footer brand column and social links", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    // Logo within footer
    const footerLogo = footer.getByRole("link", { name: "AUTUMN LAND" });
    await expect(footerLogo).toBeVisible();

    // Tagline
    await expect(
      footer.getByText(/We have clothes that suits your style and which you're proud to wear/i)
    ).toBeVisible();

    // Social Links
    await expect(page.getByLabel("Visit Autumnland on Twitter")).toBeVisible();
    await expect(page.getByLabel("Visit Autumnland on Facebook")).toBeVisible();
    await expect(page.getByLabel("Visit Autumnland on Instagram")).toBeVisible();
    await expect(page.getByLabel("Visit Autumnland on GitHub")).toBeVisible();
  });

  test("renders all navigation columns and links", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");

    // Headings
    await expect(footer.getByRole("heading", { name: "COMPANY" })).toBeVisible();
    await expect(footer.getByRole("heading", { name: "HELP" })).toBeVisible();
    await expect(footer.getByRole("heading", { name: "FAQ" })).toBeVisible();
    await expect(footer.getByRole("heading", { name: "STAY CONNECTED" })).toBeVisible();

    // Key Links
    await expect(footer.getByRole("link", { name: "About" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Customer Support" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Orders" })).toBeVisible();

    // Contact Details
    await expect(footer.getByText("Head Office: 2nd Floor")).toBeVisible();
    await expect(footer.getByText("Phone: +88018********")).toBeVisible();
  });

  test("renders bottom bar copyright notice and all 5 payment badges", async ({ page }) => {
    await page.goto("/");

    // Copyright notice
    await expect(page.getByText(/Autumn Land © 2020-2026, All Rights Reserved/i)).toBeVisible();

    // Payment Badges
    const paymentContainer = page.getByLabel("Supported Payment Methods");
    await expect(paymentContainer).toBeVisible();
    await expect(page.getByTitle("Visa")).toBeVisible();
    await expect(page.getByTitle("Mastercard")).toBeVisible();
    await expect(page.getByTitle("PayPal")).toBeVisible();
    await expect(page.getByTitle("Apple Pay")).toBeVisible();
    await expect(page.getByTitle("Google Pay")).toBeVisible();
  });

  test("hides footer and newsletter on mobile screen while keeping it visible on desktop", async ({
    page,
  }) => {
    // Mobile Viewport (375x812) - Footer and newsletter are hidden
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer).toBeHidden();

    const newsletterHeading = page.getByRole("heading", {
      name: /STAY UPTO DATE ABOUT OUR LATEST OFFERS/i,
    });
    await expect(newsletterHeading).toBeHidden();

    // Capture mobile full-page screenshot
    await page.screenshot({ path: "test-results/mobile-footer.png", fullPage: true });

    // Desktop Viewport (1280x800) - Footer and newsletter are visible
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await expect(footer).toBeVisible();
    await expect(newsletterHeading).toBeVisible();
    await page.screenshot({ path: "test-results/desktop-footer.png", fullPage: true });
  });
});
