import { describe, expect, it } from "bun:test";
import { getCatalogProducts } from "@/lib/catalog-service";
import { CATALOG_PRODUCTS } from "@/lib/catalog-data";

describe("Catalog Data and Filtering Service", () => {
  it("initializes catalog with high-quality realistic products with zero duplicate images", () => {
    expect(Array.isArray(CATALOG_PRODUCTS)).toBe(true);
    expect(CATALOG_PRODUCTS.length).toBe(14);

    // Verify zero repeated images across the entire catalog
    const images = CATALOG_PRODUCTS.map((p) => p.imageSrc);
    const uniqueImages = new Set(images);
    expect(uniqueImages.size).toBe(CATALOG_PRODUCTS.length);

    // Verify first 9 items match the reference screenshot when sorted by popularity
    const firstNineTitles = CATALOG_PRODUCTS.slice(0, 9).map((p) => p.title);
    expect(firstNineTitles).toContain("Gradient Graphic T-shirt");
    expect(firstNineTitles).toContain("Polo with Tipping Details");
    expect(firstNineTitles).toContain("Black Striped T-shirt");
    expect(firstNineTitles).toContain("Skinny Fit Jeans");
    expect(firstNineTitles).toContain("Checkered Shirt");
    expect(firstNineTitles).toContain("Sleeve Striped T-shirt");
    expect(firstNineTitles).toContain("Vertical Striped Shirt");
    expect(firstNineTitles).toContain("Courage Graphic T-shirt");
    expect(firstNineTitles).toContain("Loose Fit Bermuda Shorts");
  });

  it("returns paginated products (9 per page on desktop) by default", async () => {
    const result = await getCatalogProducts({ page: 1, limit: 9 });
    expect(result.products.length).toBe(9);
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(9);
    expect(result.totalCount).toBe(CATALOG_PRODUCTS.length);
    expect(result.totalPages).toBe(Math.ceil(CATALOG_PRODUCTS.length / 9));
    expect(result.hasMore).toBe(true);
  });

  it("filters accurately by single or multiple categories", async () => {
    const tshirts = await getCatalogProducts({ category: "T-shirts", limit: 20 });
    expect(tshirts.products.length).toBeGreaterThan(0);
    tshirts.products.forEach((p) => {
      expect(p.category).toBe("T-shirts");
    });

    const multiCat = await getCatalogProducts({ categories: ["T-shirts", "Jeans"], limit: 20 });
    expect(multiCat.products.length).toBeGreaterThan(0);
    multiCat.products.forEach((p) => {
      expect(["T-shirts", "Jeans"]).toContain(p.category);
    });
  });

  it("filters accurately by single or multiple dress styles", async () => {
    const casual = await getCatalogProducts({ dressStyle: "Casual", limit: 30 });
    expect(casual.products.length).toBeGreaterThan(0);

    const party = await getCatalogProducts({ dressStyle: "Party", limit: 30 });
    expect(party.products.length).toBeGreaterThan(0);
    party.products.forEach((p) => {
      expect(p.dressStyles).toContain("Party");
    });
  });

  it("filters accurately by onSaleOnly returning only discounted products", async () => {
    const saleItems = await getCatalogProducts({ onSaleOnly: true, limit: 50 });
    expect(saleItems.products.length).toBeGreaterThan(0);
    saleItems.products.forEach((p) => {
      const hasDiscount =
        Boolean(p.discount) || (Boolean(p.originalPrice) && (p.originalPrice ?? 0) > p.price);
      expect(hasDiscount).toBe(true);
    });
  });

  it("filters accurately by price range bounds", async () => {
    const result = await getCatalogProducts({ minPrice: 100, maxPrice: 150, limit: 30 });
    expect(result.products.length).toBeGreaterThan(0);
    result.products.forEach((p) => {
      expect(p.price).toBeGreaterThanOrEqual(100);
      expect(p.price).toBeLessThanOrEqual(150);
    });
  });

  it("filters accurately by color swatch", async () => {
    const blueItems = await getCatalogProducts({ color: "Blue", limit: 30 });
    expect(blueItems.products.length).toBeGreaterThan(0);
    blueItems.products.forEach((p) => {
      const hasBlue = p.colors.some((c) => c.toLowerCase() === "blue");
      expect(hasBlue).toBe(true);
    });
  });

  it("filters accurately by size badge (single or multi-select)", async () => {
    const largeItems = await getCatalogProducts({ size: "Large", limit: 30 });
    expect(largeItems.products.length).toBeGreaterThan(0);
    largeItems.products.forEach((p) => {
      const hasLarge = p.sizes.some((s) => s.toLowerCase() === "large");
      expect(hasLarge).toBe(true);
    });

    const multiSizes = await getCatalogProducts({ sizes: ["Small", "Large"], limit: 30 });
    expect(multiSizes.products.length).toBeGreaterThan(0);
    multiSizes.products.forEach((p) => {
      const matches = p.sizes.some((s) => ["small", "large"].includes(s.toLowerCase()));
      expect(matches).toBe(true);
    });
  });

  it("sorts correctly by Most Popular and Newest with distinct results", async () => {
    const popular = await getCatalogProducts({ sortBy: "popular", limit: 5 });
    const newest = await getCatalogProducts({ sortBy: "newest", limit: 5 });

    // Most popular first item is Gradient Graphic T-shirt (highest salesCount)
    expect(popular.products[0].id).toBe("gradient-graphic-t-shirt");

    // Newest first item is One Life Graphic T-shirt (most recent createdDate)
    expect(newest.products[0].id).toBe("one-life-graphic-t-shirt");

    // The two lists are distinct
    expect(popular.products[0].id).not.toBe(newest.products[0].id);
  });

  it("supports multi-page pagination navigation", async () => {
    const page1 = await getCatalogProducts({ page: 1, limit: 9 });
    const page2 = await getCatalogProducts({ page: 2, limit: 9 });

    expect(page1.products.length).toBe(9);
    expect(page2.products.length).toBeGreaterThan(0);

    // Products on page 1 and page 2 must be distinct
    const page1Ids = page1.products.map((p) => p.id);
    const page2Ids = page2.products.map((p) => p.id);
    page2Ids.forEach((id) => {
      expect(page1Ids.includes(id)).toBe(false);
    });
  });
});
