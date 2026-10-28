import { test, expect } from "@playwright/test";

test.describe("Frontend Starter Landing Page", () => {
  test("renders starter hero card, badges, and theme toggle", async ({ page }) => {
    await page.goto("/");

    // Verify main card heading
    await expect(page.getByRole("heading", { name: "Frontend Starter" })).toBeVisible();

    // Verify template description
    await expect(
      page.getByText(
        "Zero-friction template optimized for developer speed and LLM-driven pair programming."
      )
    ).toBeVisible();

    // Verify theme toggle is present
    const themeToggle = page.getByRole("button", { name: "Toggle theme" });
    await expect(themeToggle).toBeVisible();
  });

  test("triggers toast notification on button click", async ({ page }) => {
    await page.goto("/");

    // Click toast trigger button
    const toastButton = page.getByRole("button", {
      name: "Test Toast Notification",
    });
    await expect(toastButton).toBeVisible();
    await toastButton.click();

    // Verify Sonner toast pops up
    await expect(page.getByText("Template is operational!")).toBeVisible();
    await expect(
      page.getByText("Next.js 16.4.3, React 19, Tailwind v4, and shadcn are ready to build.")
    ).toBeVisible();
  });
});
