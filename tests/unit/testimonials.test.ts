import { describe, expect, it } from "bun:test";
import { TestimonialsSection, TestimonialCard, TESTIMONIALS } from "@/components/home";

describe("Testimonials component and data tests", () => {
  it("exports all testimonial components and datasets", () => {
    expect(TestimonialsSection).toBeDefined();
    expect(TestimonialCard).toBeDefined();
    expect(TESTIMONIALS).toBeDefined();
    expect(Array.isArray(TESTIMONIALS)).toBe(true);
  });

  it("contains complete, high-quality mock data including reference items", () => {
    expect(TESTIMONIALS.length).toBeGreaterThanOrEqual(8);

    const names = TESTIMONIALS.map((t) => t.name);
    expect(names).toContain("Sarah M.");
    expect(names).toContain("Alex K.");
    expect(names).toContain("James L.");
    expect(names).toContain("Moo E.");

    // Verify Sarah M. review details
    const sarah = TESTIMONIALS.find((t) => t.name === "Sarah M.");
    expect(sarah).toBeDefined();
    expect(sarah?.rating).toBe(5);
    expect(sarah?.isVerified).toBe(true);
    expect(sarah?.comment).toContain("blown away by the quality");

    // Verify Alex K. review details
    const alex = TESTIMONIALS.find((t) => t.name === "Alex K.");
    expect(alex).toBeDefined();
    expect(alex?.rating).toBe(5);
    expect(alex?.isVerified).toBe(true);
    expect(alex?.comment).toContain("Finding clothes that align with my personal style");

    // Verify James L. review details
    const james = TESTIMONIALS.find((t) => t.name === "James L.");
    expect(james).toBeDefined();
    expect(james?.rating).toBe(5);
    expect(james?.isVerified).toBe(true);
    expect(james?.comment).toContain("always on the lookout for unique fashion pieces");
  });

  it("verifies all testimonials have valid structure and ratings", () => {
    for (const item of TESTIMONIALS) {
      expect(typeof item.id).toBe("string");
      expect(item.id.length).toBeGreaterThan(0);
      expect(typeof item.name).toBe("string");
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.rating).toBeGreaterThanOrEqual(1);
      expect(item.rating).toBeLessThanOrEqual(5);
      expect(typeof item.comment).toBe("string");
      expect(item.comment.length).toBeGreaterThan(20);
      expect(typeof item.isVerified).toBe("boolean");
    }
  });
});
