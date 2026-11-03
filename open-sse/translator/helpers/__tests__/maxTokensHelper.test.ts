import { describe, it, expect } from "vitest";
import { adjustMaxTokens } from "../maxTokensHelper.ts";
import { DEFAULT_MAX_TOKENS, DEFAULT_MIN_TOKENS } from "../../../config/constants.ts";

describe("adjustMaxTokens - negative values", () => {
  it("clamps large negative max_tokens to 1", () => {
    const result = adjustMaxTokens({ max_tokens: -36398 });
    expect(result).toBe(1);
  });

  it("clamps -1 max_tokens to 1", () => {
    const result = adjustMaxTokens({ max_tokens: -1 });
    expect(result).toBe(1);
  });

  it("does not clamp positive values", () => {
    const result = adjustMaxTokens({ max_tokens: 4096 });
    expect(result).toBe(4096);
  });

  it("uses DEFAULT_MAX_TOKENS when max_tokens is 0 or undefined", () => {
    const result = adjustMaxTokens({});
    expect(result).toBeGreaterThan(0);
  });
});

describe("adjustMaxTokens - tool floor and explicit caps", () => {
  const tools = [{ type: "function", function: { name: "f" } }];

  it("raises a small cap to DEFAULT_MIN_TOKENS when tools are present (default)", () => {
    expect(adjustMaxTokens({ tools, max_tokens: 1 })).toBe(DEFAULT_MIN_TOKENS);
  });

  it("keeps an explicit max_tokens cap when honorExplicitCap is set", () => {
    expect(adjustMaxTokens({ tools, max_tokens: 1 }, { honorExplicitCap: true })).toBe(1);
  });

  it("keeps an explicit max_completion_tokens cap when honorExplicitCap is set", () => {
    expect(adjustMaxTokens({ tools, max_completion_tokens: 1 }, { honorExplicitCap: true })).toBe(
      1
    );
  });

  it("still defaults to DEFAULT_MAX_TOKENS without an explicit cap", () => {
    expect(adjustMaxTokens({ tools }, { honorExplicitCap: true })).toBe(DEFAULT_MAX_TOKENS);
  });

  it("applies the tool floor to a non-positive cap even with honorExplicitCap", () => {
    expect(adjustMaxTokens({ tools, max_tokens: -5 }, { honorExplicitCap: true })).toBe(
      DEFAULT_MIN_TOKENS
    );
  });
});
