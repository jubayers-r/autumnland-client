import { test, expect } from "@playwright/test";

test.describe("Homepage Testimonials Section", () => {
  test("renders section heading and navigation arrow controls", async ({ page }) => {
    await page.goto("/");

    // Verify section heading
    const heading = page.getByRole("heading", {
      name: /OUR HAPPY CUSTOMERS/i,
    });
    await expect(heading).toBeVisible();

    // Verify arrow navigation buttons
    const prevBtn = page.getByRole("button", { name: "Previous testimonials" });
    const nextBtn = page.getByRole("button", { name: "Next testimonials" });

    await expect(prevBtn).toBeVisible();
    await expect(nextBtn).toBeVisible();
  });

  test("renders customer review cards with star ratings, verified badges, and quotes", async ({
    page,
  }) => {
    await page.goto("/");

    // Verify customer names from the reference design
    await expect(page.getByText("Sarah M.")).toBeVisible();
    await expect(page.getByText("Alex K.")).toBeVisible();
    await expect(page.getByText("James L.")).toBeVisible();

    // Verify customer quote content
    await expect(page.getByText(/I'm blown away by the quality and style/i)).toBeVisible();
    await expect(
      page.getByText(/Finding clothes that align with my personal style/i)
    ).toBeVisible();
    await expect(page.getByText(/always on the lookout for unique fashion pieces/i)).toBeVisible();

    // Verify verified buyer badges
    const verifiedBadges = page.locator("[aria-label='Verified Customer']");
    await expect(verifiedBadges.first()).toBeVisible();
    expect(await verifiedBadges.count()).toBeGreaterThanOrEqual(3);

    // Verify 5-star rating presentation
    const starRatings = page.locator("[aria-label*='stars']");
    await expect(starRatings.first()).toBeVisible();
  });

  test("scrolls smoothly when clicking previous and next navigation buttons", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const track = page.locator("[data-carousel-track]");
    await expect(track).toBeVisible();

    const initialTransform = await track.evaluate((el) => el.style.transform);

    const nextBtn = page.getByRole("button", { name: "Next testimonials" });
    await nextBtn.click();

    // Wait for smooth transform animation to progress
    await page.waitForTimeout(600);

    const scrolledTransform = await track.evaluate((el) => el.style.transform);
    expect(scrolledTransform).not.toBe(initialTransform);

    const prevBtn = page.getByRole("button", { name: "Previous testimonials" });
    await prevBtn.click();

    await page.waitForTimeout(600);
    const scrolledBackTransform = await track.evaluate((el) => el.style.transform);
    expect(scrolledBackTransform).not.toBe(scrolledTransform);
  });

  test("supports keyboard arrow navigation on carousel track", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const track = page.locator("[data-carousel-track]");
    const carousel = page.locator("[aria-label='Testimonial carousel']");
    await carousel.focus();

    const initialTransform = await track.evaluate((el) => el.style.transform);
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(600);

    const scrolledTransform = await track.evaluate((el) => el.style.transform);
    expect(scrolledTransform).not.toBe(initialTransform);
  });

  test("renders mobile-responsive layout and takes screenshots", async ({ page }) => {
    // Desktop screenshot
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const testimonialsSection = page.locator("#testimonials");
    await expect(testimonialsSection).toBeVisible();
    await testimonialsSection.scrollIntoViewIfNeeded();

    await page.screenshot({
      path: "test-results/testimonials-desktop.png",
      fullPage: false,
    });

    // Mobile screenshot (375x812 - iPhone X / 12 / 13)
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const mobileTestimonials = page.locator("#testimonials");
    await mobileTestimonials.scrollIntoViewIfNeeded();

    // Ensure mobile heading and controls are properly rendered
    await expect(page.getByRole("heading", { name: /OUR HAPPY CUSTOMERS/i })).toBeVisible();
    await expect(page.getByRole("button", { name: "Previous testimonials" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Next testimonials" })).toBeVisible();

    await page.screenshot({
      path: "test-results/testimonials-mobile.png",
      fullPage: false,
    });
  });
});
