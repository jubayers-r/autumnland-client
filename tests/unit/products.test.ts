import { describe, expect, it } from "bun:test";
import {
  NEW_ARRIVALS,
  ProductCard,
  ProductSection,
  TOP_SELLING,
  type Product,
} from "@/components/home";

describe("Product showcase components and datasets", () => {
  it("exports all product components and datasets", () => {
    expect(ProductSection).toBeDefined();
    expect(ProductCard).toBeDefined();
    expect(NEW_ARRIVALS).toBeDefined();
    expect(TOP_SELLING).toBeDefined();
    expect(Array.isArray(NEW_ARRIVALS)).toBe(true);
    expect(Array.isArray(TOP_SELLING)).toBe(true);
    expect(NEW_ARRIVALS.length).toBe(4);
    expect(TOP_SELLING.length).toBe(4);
  });

  it("contains all 4 products in New Arrivals from reference", () => {
    const titles = NEW_ARRIVALS.map((p) => p.title);
    expect(titles).toContain("T-shirt with Tape Details");
    expect(titles).toContain("Skinny Fit Jeans");
    expect(titles).toContain("Checkered Shirt");
    expect(titles).toContain("Sleeve Striped T-shirt");

    const tapeShirt = NEW_ARRIVALS.find((p) => p.id === "t-shirt-tape-details")!;
    expect(tapeShirt.price).toBe(120);
    expect(tapeShirt.rating).toBe(4.5);
    expect(tapeShirt.imageSrc).toBe("/assets/t-shirt/image 7.png");

    const skinnyJeans = NEW_ARRIVALS.find((p) => p.id === "skinny-fit-jeans")!;
    expect(skinnyJeans.price).toBe(240);
    expect(skinnyJeans.originalPrice).toBe(260);
    expect(skinnyJeans.discount).toBe("-20%");
    expect(skinnyJeans.rating).toBe(3.5);
    expect(skinnyJeans.imageSrc).toBe("/assets/t-shirt/image 8.png");

    const checkered = NEW_ARRIVALS.find((p) => p.id === "checkered-shirt")!;
    expect(checkered.price).toBe(180);
    expect(checkered.rating).toBe(4.5);
    expect(checkered.imageSrc).toBe("/assets/t-shirt/image 9.png");

    const sleeveStriped = NEW_ARRIVALS.find((p) => p.id === "sleeve-striped-t-shirt")!;
    expect(sleeveStriped.price).toBe(130);
    expect(sleeveStriped.originalPrice).toBe(160);
    expect(sleeveStriped.discount).toBe("-30%");
    expect(sleeveStriped.rating).toBe(4.5);
    expect(sleeveStriped.imageSrc).toBe("/assets/t-shirt/image 10.png");
  });

  it("contains all 4 products in Top Selling from reference", () => {
    const titles = TOP_SELLING.map((p) => p.title);
    expect(titles).toContain("Vertical Striped Shirt");
    expect(titles).toContain("Courage Graphic T-shirt");
    expect(titles).toContain("Loose Fit Bermuda Shorts");
    expect(titles).toContain("Faded Skinny Jeans");

    const striped = TOP_SELLING.find((p) => p.id === "vertical-striped-shirt")!;
    expect(striped.price).toBe(212);
    expect(striped.originalPrice).toBe(232);
    expect(striped.discount).toBe("-20%");
    expect(striped.rating).toBe(5.0);
    expect(striped.imageSrc).toBe("/assets/t-shirt/image 7-1.png");

    const courage = TOP_SELLING.find((p) => p.id === "courage-graphic-t-shirt")!;
    expect(courage.price).toBe(145);
    expect(courage.rating).toBe(4.0);
    expect(courage.imageSrc).toBe("/assets/t-shirt/image 8-1.png");

    const bermuda = TOP_SELLING.find((p) => p.id === "loose-fit-bermuda-shorts")!;
    expect(bermuda.price).toBe(80);
    expect(bermuda.rating).toBe(3.0);
    expect(bermuda.imageSrc).toBe("/assets/t-shirt/image 9-1.png");

    const fadedJeans = TOP_SELLING.find((p) => p.id === "faded-skinny-jeans")!;
    expect(fadedJeans.price).toBe(210);
    expect(fadedJeans.rating).toBe(4.5);
    expect(fadedJeans.imageSrc).toBe("/assets/t-shirt/image 10-1.png");
  });

  it("links each product to a valid shop detail route with accessible metadata", () => {
    [...NEW_ARRIVALS, ...TOP_SELLING].forEach((p: Product) => {
      expect(p.href).toMatch(/^\/shop\/product\/[a-z0-9-]+$/);
      expect(p.imageAlt.length).toBeGreaterThan(5);
      expect(p.rating).toBeGreaterThanOrEqual(1);
      expect(p.rating).toBeLessThanOrEqual(5);
      expect(p.price).toBeGreaterThan(0);
    });
  });
});
