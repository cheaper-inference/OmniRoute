/**
 * The cc (Claude Code OAuth) pricing table must price both Claude 5.5 models by
 * their base id. It priced claude-opus-5-5, but
 * getPricingForModel("cc", "claude-sonnet-5-5") returned null.
 *
 * Anthropic list prices: Opus 5.5 $4 / $20, Sonnet 5.5 $2 / $10, cache reads $0.20.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { getPricingForModel } = await import("../../src/shared/constants/pricing.ts");

test("cc prices claude-opus-5-5 and claude-sonnet-5-5 by base id", () => {
  assert.deepEqual(
    [getPricingForModel("cc", "claude-opus-5-5")].map((p) => [p?.input, p?.output, p?.cached]),
    [[4, 20, 0.2]]
  );
  assert.deepEqual(
    [getPricingForModel("cc", "claude-sonnet-5-5")].map((p) => [p?.input, p?.output, p?.cached]),
    [[2, 10, 0.2]]
  );
});
