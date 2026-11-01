import { describe, expect, it } from "bun:test";
import { getCatalogProducts } from "@/lib/catalog-service";
import { CATALOG_PRODUCTS } from "@/lib/catalog-data";

describe("Catalog Data and Filtering Service", () => {
  it("initializes catalog with high-quality realistic products", () => {
    expect(Array.isArray(CATALOG_PRODUCTS)).toBe(true);
    expect(CATALOG_PRODUCTS.length).toBeGreaterThanOrEqual(24);

    // Verify first 9 items match the reference screenshot
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

  it("returns paginated products (9 per page) by default", async () => {
    const result = await getCatalogProducts({ page: 1, limit: 9 });
    expect(result.products.length).toBe(9);
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(9);
    expect(result.totalCount).toBe(CATALOG_PRODUCTS.length);
    expect(result.totalPages).toBe(Math.ceil(CATALOG_PRODUCTS.length / 9));
    expect(result.hasMore).toBe(true);
  });

  it("filters accurately by category", async () => {
    const tshirts = await getCatalogProducts({ category: "T-shirts", limit: 20 });
    expect(tshirts.products.length).toBeGreaterThan(0);
    tshirts.products.forEach((p) => {
      expect(p.category).toBe("T-shirts");
    });

    const hoodies = await getCatalogProducts({ category: "Hoodie", limit: 20 });
    expect(hoodies.products.length).toBeGreaterThan(0);
    hoodies.products.forEach((p) => {
      expect(p.category).toBe("Hoodie");
    });

    const jeans = await getCatalogProducts({ category: "Jeans", limit: 20 });
    expect(jeans.products.length).toBeGreaterThan(0);
    jeans.products.forEach((p) => {
      expect(p.category).toBe("Jeans");
    });
  });

  it("filters accurately by dress style", async () => {
    const casual = await getCatalogProducts({ dressStyle: "Casual", limit: 30 });
    expect(casual.products.length).toBeGreaterThan(0);
    casual.products.forEach((p) => {
      expect(p.dressStyle).toBe("Casual");
    });

    const formal = await getCatalogProducts({ dressStyle: "Formal", limit: 30 });
    expect(formal.products.length).toBeGreaterThan(0);
    formal.products.forEach((p) => {
      expect(p.dressStyle).toBe("Formal");
    });

    const gym = await getCatalogProducts({ dressStyle: "Gym", limit: 30 });
    expect(gym.products.length).toBeGreaterThan(0);
    gym.products.forEach((p) => {
      expect(p.dressStyle).toBe("Gym");
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

  it("filters accurately by size badge", async () => {
    const largeItems = await getCatalogProducts({ size: "Large", limit: 30 });
    expect(largeItems.products.length).toBeGreaterThan(0);
    largeItems.products.forEach((p) => {
      const hasLarge = p.sizes.some((s) => s.toLowerCase() === "large");
      expect(hasLarge).toBe(true);
    });
  });

  it("sorts correctly by price ascending and descending", async () => {
    const asc = await getCatalogProducts({ sortBy: "price-asc", limit: 30 });
    for (let i = 0; i < asc.products.length - 1; i++) {
      expect(asc.products[i].price).toBeLessThanOrEqual(asc.products[i + 1].price);
    }

    const desc = await getCatalogProducts({ sortBy: "price-desc", limit: 30 });
    for (let i = 0; i < desc.products.length - 1; i++) {
      expect(desc.products[i].price).toBeGreaterThanOrEqual(desc.products[i + 1].price);
    }
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
