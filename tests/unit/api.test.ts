import { describe, expect, it } from "bun:test";
import { ApiError } from "@/lib/api";

describe("ApiError class", () => {
  it("correctly instantiates with status, message, and custom error payload", () => {
    const errorData = { code: "UNAUTHORIZED", details: "Invalid token" };
    const err = new ApiError(401, "Authentication failed", errorData);

    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(ApiError);
    expect(err.name).toBe("ApiError");
    expect(err.status).toBe(401);
    expect(err.message).toBe("Authentication failed");
    expect(err.data).toEqual(errorData);
  });

  it("handles optional error payload", () => {
    const err = new ApiError(500, "Internal Server Error");
    expect(err.status).toBe(500);
    expect(err.message).toBe("Internal Server Error");
    expect(err.data).toBeUndefined();
  });
});
