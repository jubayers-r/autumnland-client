import { describe, expect, it } from "bun:test";
import { env } from "@/lib/env";

describe("env validator", () => {
  it("validates NODE_ENV is present", () => {
    expect(["development", "test", "production"]).toContain(env.NODE_ENV);
  });

  it("handles NEXT_PUBLIC_API_URL safely as a string", () => {
    expect(typeof env.NEXT_PUBLIC_API_URL).toBe("string");
  });
});
