import { test, expect } from "@playwright/test";

test.describe("Under Development Pages & 404 Boundary", () => {
  test("renders Under Development page for linked placeholder pages (e.g. /login, /register, /about)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    // Test /login
    await page.goto("/login");
    await expect(page.getByText(/Under Development/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: /Account Login/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Explore Shop/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Back to Home/i })).toBeVisible();

    // Test /register
    await page.goto("/register");
    await expect(page.getByText(/Under Development/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: /Create Account/i })).toBeVisible();

    // Test /about
    await page.goto("/about");
    await expect(page.getByText(/Under Development/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: /About AUTUMN LAND/i })).toBeVisible();
  });

  test("clicking navbar user account icon opens /login under development page", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const accountLink = page.getByRole("link", { name: "User Account" });
    await accountLink.click();

    await expect(page).toHaveURL("/login");
    await expect(page.getByText(/Under Development/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: /Account Login/i })).toBeVisible();
  });

  test("clicking top banner sign up link opens /register under development page", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const signUpLink = page.getByRole("link", { name: /Sign Up Now/i });
    await signUpLink.click();

    await expect(page).toHaveURL("/register");
    await expect(page.getByText(/Under Development/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: /Create Account/i })).toBeVisible();
  });

  test("random unknown route strictly renders 404 Not Found, not under development", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/random-unlinked-path-987654");

    // Must show 404 page, not Under Development
    await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
    await expect(page.getByText(/Page not found/i)).toBeVisible();
    await expect(page.getByText(/Under Development/i)).not.toBeVisible();
  });
});
