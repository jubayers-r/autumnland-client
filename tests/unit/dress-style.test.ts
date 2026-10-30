import { describe, expect, it } from "bun:test";
import {
  BrowseByDressStyle,
  DressStyleCard,
  DRESS_STYLES,
  type DressStyleItem,
} from "@/components/home";

describe("BrowseByDressStyle components and data", () => {
  it("exports all dress style components and dataset", () => {
    expect(BrowseByDressStyle).toBeDefined();
    expect(DressStyleCard).toBeDefined();
    expect(DRESS_STYLES).toBeDefined();
    expect(Array.isArray(DRESS_STYLES)).toBe(true);
    expect(DRESS_STYLES.length).toBe(4);
  });

  it("contains all 4 dress styles from the reference specification", () => {
    const ids = DRESS_STYLES.map((item) => item.id);
    expect(ids).toContain("casual");
    expect(ids).toContain("formal");
    expect(ids).toContain("party");
    expect(ids).toContain("gym");

    const titles = DRESS_STYLES.map((item) => item.title);
    expect(titles).toContain("Casual");
    expect(titles).toContain("Formal");
    expect(titles).toContain("Party");
    expect(titles).toContain("Gym");
  });

  it("references the exact provided image assets from public/assets/browse-by-dress-style", () => {
    const casual = DRESS_STYLES.find((item) => item.id === "casual")!;
    const formal = DRESS_STYLES.find((item) => item.id === "formal")!;
    const party = DRESS_STYLES.find((item) => item.id === "party")!;
    const gym = DRESS_STYLES.find((item) => item.id === "gym")!;

    expect(casual.imageSrc).toBe("/assets/browse-by-dress-style/image 11.png");
    expect(formal.imageSrc).toBe("/assets/browse-by-dress-style/image 13.png");
    expect(party.imageSrc).toBe("/assets/browse-by-dress-style/image 12.png");
    expect(gym.imageSrc).toBe("/assets/browse-by-dress-style/image 14.png");
  });

  it("links each card to the appropriate category route", () => {
    DRESS_STYLES.forEach((item: DressStyleItem) => {
      expect(item.href).toMatch(/^\/shop\?category=[a-z]+$/);
      expect(item.imageAlt).toBeTruthy();
      expect(["small", "large"]).toContain(item.gridSpan);
    });
  });

  it("mirrors the asymmetric layout pairing", () => {
    const casual = DRESS_STYLES.find((item) => item.id === "casual")!;
    const formal = DRESS_STYLES.find((item) => item.id === "formal")!;
    const party = DRESS_STYLES.find((item) => item.id === "party")!;
    const gym = DRESS_STYLES.find((item) => item.id === "gym")!;

    // Row 1: Casual (small) + Formal (large)
    expect(casual.gridSpan).toBe("small");
    expect(formal.gridSpan).toBe("large");

    // Row 2: Party (large) + Gym (small)
    expect(party.gridSpan).toBe("large");
    expect(gym.gridSpan).toBe("small");
  });
});
