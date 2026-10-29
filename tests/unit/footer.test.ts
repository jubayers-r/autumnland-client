import { describe, expect, it } from "bun:test";
import { Footer, Newsletter, SocialLinks, PaymentBadges } from "@/components/footer";

describe("Footer module exports", () => {
  it("exports all footer and newsletter components", () => {
    expect(Footer).toBeDefined();
    expect(Newsletter).toBeDefined();
    expect(SocialLinks).toBeDefined();
    expect(PaymentBadges).toBeDefined();
  });

  it("validates email formats with strict regex standard", () => {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Valid emails
    expect(EMAIL_REGEX.test("user@example.com")).toBe(true);
    expect(EMAIL_REGEX.test("customer.service@autumnland.shop")).toBe(true);
    expect(EMAIL_REGEX.test("streetwear+style@gmail.com")).toBe(true);

    // Invalid emails
    expect(EMAIL_REGEX.test("")).toBe(false);
    expect(EMAIL_REGEX.test("not-an-email")).toBe(false);
    expect(EMAIL_REGEX.test("user@")).toBe(false);
    expect(EMAIL_REGEX.test("@domain.com")).toBe(false);
    expect(EMAIL_REGEX.test("user@domain")).toBe(false);
  });
});
