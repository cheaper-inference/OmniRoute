// Regression (#18754): a Claude effort-variant id such as `claude-opus-5-5-high` has no
// pricing row of its own. When the id reaches pricing literally (a custom/synced model
// row keeps it literal at resolution), chatCore still dispatches the base model with
// the effort as a parameter, but cost lookup used the suffixed id and came back
// unpriced ($0), which also trips the fail-closed budget check.
import test, { after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cost-claude-effort-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { updatePricing } = await import("../../src/lib/db/settings/pricing.ts");
const { calculateCostDetailed, getPricingLookupModels } =
  await import("../../src/lib/usage/costCalculator.ts");

after(() => {
  resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const TOKENS = { prompt_tokens: 1000, completion_tokens: 500 };

test("anthropic effort variant prices like its base model", async () => {
  const base = await calculateCostDetailed("anthropic", "claude-opus-5-5", TOKENS);
  assert.equal(base.priced, true);
  assert.ok(base.costUsd > 0);
  for (const effort of ["low", "medium", "high", "xhigh", "max"]) {
    const variant = await calculateCostDetailed("anthropic", `claude-opus-5-5-${effort}`, TOKENS);
    assert.equal(variant.priced, true, `claude-opus-5-5-${effort} must not be unpriced`);
    assert.equal(variant.costUsd, base.costUsd);
  }
});

test("a provider-prefixed effort variant resolves after normalization", async () => {
  const base = await calculateCostDetailed("anthropic", "claude-opus-5-5", TOKENS);
  const variant = await calculateCostDetailed(
    "anthropic",
    "anthropic/claude-opus-5-5-high",
    TOKENS
  );
  assert.equal(variant.priced, true);
  assert.equal(variant.costUsd, base.costUsd);
});

test("the base fallback comes after the exact and normalized ids", () => {
  assert.deepEqual(getPricingLookupModels("anthropic", "anthropic/claude-opus-5-5-high"), [
    "anthropic/claude-opus-5-5-high",
    "claude-opus-5-5-high",
    "claude-opus-5-5",
  ]);
});

test("lanes that dispatch the suffixed id literally get no base fallback", () => {
  // Antigravity tier ids, Devin CLI and Cursor send the suffixed id upstream as-is.
  assert.deepEqual(getPricingLookupModels("antigravity", "claude-opus-5-5-high"), [
    "claude-opus-5-5-high",
  ]);
  assert.deepEqual(getPricingLookupModels("devin-cli", "claude-opus-5-low"), ["claude-opus-5-low"]);
  assert.deepEqual(getPricingLookupModels("cursor", "claude-opus-5-5-high"), [
    "claude-opus-5-5-high",
  ]);
});

test("non-Claude ids and unknown bases are not stripped", () => {
  assert.deepEqual(getPricingLookupModels("openai", "gpt-4o-high"), ["gpt-4o-high"]);
  assert.deepEqual(getPricingLookupModels("anthropic", "not-a-claude-model-high"), [
    "not-a-claude-model-high",
  ]);
});

test("an exact pricing row for the suffixed id still wins over the base", async () => {
  await updatePricing({
    anthropic: { "claude-opus-5-5-high": { input: 100, output: 100 } },
  });
  const variant = await calculateCostDetailed("anthropic", "claude-opus-5-5-high", TOKENS);
  const base = await calculateCostDetailed("anthropic", "claude-opus-5-5", TOKENS);
  assert.equal(variant.priced, true);
  assert.notEqual(variant.costUsd, base.costUsd);
  assert.ok(Math.abs(variant.costUsd - 0.15) < 1e-9);
});
