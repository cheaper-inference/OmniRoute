/**
 * Regression: `auto/best-vision` must resolve to the `vision` CATEGORY (candidate
 * filter by vision capability), not to the flat `smart` variant.
 *
 * Root cause on runtime v3.8.49: AUTO_TEMPLATE_VARIANTS mapped
 * `"auto/best-vision": "smart"`, so the virtual combo scored ALL candidates
 * (verified: it resolved to text-only `deepseek-v4-flash-free`), making the
 * vision-bridge describe/reroute target useless.
 *
 * Runs under Vitest (the autoCombo suite is Vitest-only in this repo).
 */
import { describe, it, expect } from "vitest";
import { resolveBuiltinAutoSpec } from "../../../open-sse/services/autoCombo/builtinCatalog";

describe("resolveBuiltinAutoSpec — vision category ids", () => {
  it("auto/best-vision resolves to category vision (not smart variant)", () => {
    expect(resolveBuiltinAutoSpec("auto/best-vision", "best-vision")).toEqual({
      category: "vision",
    });
  });

  it("auto/pro-vision resolves to category vision + tier pro", () => {
    expect(resolveBuiltinAutoSpec("auto/pro-vision", "pro-vision")).toEqual({
      category: "vision",
      tier: "pro",
    });
  });

  it("legacy flat variants keep their variant mapping", () => {
    expect(resolveBuiltinAutoSpec("auto/best-coding", "best-coding")).toEqual({
      variant: "coding",
    });
    expect(resolveBuiltinAutoSpec("auto/fast", "fast")).toEqual({ variant: "fast" });
    expect(resolveBuiltinAutoSpec("auto/chat", "chat")).toEqual({ variant: undefined });
  });

  it("category:tier suffix still resolves via parseAutoSuffix", () => {
    expect(resolveBuiltinAutoSpec("auto/coding:fast", "coding:fast")).toEqual({
      category: "coding",
      tier: "fast",
    });
    expect(resolveBuiltinAutoSpec("auto/vision", "vision")).toEqual({ category: "vision" });
  });
});