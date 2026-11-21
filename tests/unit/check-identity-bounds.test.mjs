import test from "node:test";
import assert from "node:assert/strict";
import { numeric_bound } from "../../scripts/check/check-identity-bounds.mjs";

test("numeric_bound - nominal: bounded safe integer", () => {
  assert.equal(numeric_bound("42"), 42);
  assert.equal(numeric_bound("2147483648"), 2147483647); // Math.min INT32_MAX
});
test("numeric_bound - limit: 100_000 and 1+300 zeros -> fallback", () => {
  assert.equal(numeric_bound("100_000"), 3000); // fallback, NOT 100
  assert.equal(numeric_bound("1" + "0".repeat(300)), 3000); // fallback, NOT Infinity
});
