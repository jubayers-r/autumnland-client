import { describe, expect, it } from "bun:test";
import { cn, renderHeadingText } from "@/lib/utils";
import React from "react";

describe("Utility functions", () => {
  it("cn merges class names properly", () => {
    expect(cn("px-2 py-1", "bg-red-500", { "text-white": true, "text-black": false })).toBe(
      "px-2 py-1 bg-red-500 text-white"
    );
  });

  describe("renderHeadingText (FSP DEMO dash fallback)", () => {
    it("returns plain text when no hyphens or dashes exist", () => {
      expect(renderHeadingText("AUTUMN LAND")).toBe("AUTUMN LAND");
      expect(renderHeadingText("NEW ARRIVALS")).toBe("NEW ARRIVALS");
      expect(renderHeadingText("")).toBe("");
    });

    it("wraps hyphen '-' in font-sans span for heading text containing hyphens", () => {
      const result = renderHeadingText("T-SHIRT WITH TAPE DETAILS");
      expect(Array.isArray(result)).toBe(true);

      const elements = result as React.ReactNode[];
      expect(elements.length).toBe(3);
      expect(elements[0]).toBe("T");
      expect(React.isValidElement(elements[1])).toBe(true);
      const span = elements[1] as React.ReactElement<{
        className?: string;
        children?: React.ReactNode;
      }>;
      expect(span.type).toBe("span");
      expect(span.props.className).toContain("font-sans");
      expect(span.props.children).toBe("-");
      expect(elements[2]).toBe("SHIRT WITH TAPE DETAILS");
    });

    it("handles multiple hyphens properly (e.g. ONE-LIFE-STYLE)", () => {
      const result = renderHeadingText("ONE-LIFE-STYLE");
      expect(Array.isArray(result)).toBe(true);
      const elements = result as React.ReactNode[];
      expect(elements.length).toBe(5);
      expect(elements[0]).toBe("ONE");
      expect(elements[2]).toBe("LIFE");
      expect(elements[4]).toBe("STYLE");
    });

    it("handles en-dash and em-dash", () => {
      const result = renderHeadingText("SUMMER–FALL");
      expect(Array.isArray(result)).toBe(true);
      const elements = result as React.ReactNode[];
      const dashElement = elements[1] as React.ReactElement<{ children?: React.ReactNode }>;
      expect(dashElement.props.children).toBe("–");
    });

    it("renders bold fallback font for Filter - Sort Reviews", () => {
      const result = renderHeadingText("Filter - Sort Reviews");
      expect(Array.isArray(result)).toBe(true);
      const elements = result as React.ReactNode[];
      expect(elements.length).toBe(3);
      expect(elements[0]).toBe("Filter ");
      const dashElement = elements[1] as React.ReactElement<{
        className?: string;
        children?: React.ReactNode;
      }>;
      expect(dashElement.props.children).toBe("-");
      expect(dashElement.props.className).toContain("font-sans font-black");
      expect(elements[2]).toBe(" Sort Reviews");
    });

    it("handles ampersand & by wrapping in bold fallback font", () => {
      const result = renderHeadingText("Filter & Sort Reviews");
      expect(Array.isArray(result)).toBe(true);
      const elements = result as React.ReactNode[];
      expect(elements.length).toBe(3);
      const ampElement = elements[1] as React.ReactElement<{
        className?: string;
        children?: React.ReactNode;
      }>;
      expect(ampElement.props.children).toBe("&");
      expect(ampElement.props.className).toContain("font-sans font-black");
    });
  });
});
