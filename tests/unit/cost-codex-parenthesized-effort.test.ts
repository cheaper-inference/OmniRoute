// Regression: the Codex executor accepts a parenthesized effort override such as
// `gpt-6-luna(max)` / `gpt-6-sol(ultra)` (see splitCodexReasoningSuffix), and usage
// rows keep that annotated id. The cost calculator only knew the hyphen form
// (`gpt-6-luna-max`), so the parenthesized form came back unpriced ($0).
import test, { after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cost-paren-effort-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { updatePricing } = await import("../../src/lib/db/settings/pricing.ts");
const { calculateCostDetailed, calculateModalCost, getCodexFastCostMultiplier } =
  await import("../../src/lib/usage/costCalculator.ts");

after(() => {
  resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const TOKENS = { input: 1_000_000, output: 1_000_000 };

// The default-table cases run on "cx" before any user override exists, so they see
// the shipped catalog only. The override cases below use "codex".
test("gpt-6-luna(max) prices like its hyphen tier key gpt-6-luna-max", async () => {
  const hyphen = await calculateCostDetailed("cx", "gpt-6-luna-max", TOKENS);
  const annotated = await calculateCostDetailed("cx", "gpt-6-luna(max)", TOKENS);
  assert.equal(hyphen.priced, true);
  assert.ok(hyphen.costUsd > 0);
  assert.equal(annotated.priced, true, "parenthesized effort id must not be reported unpriced");
  assert.equal(annotated.costUsd, hyphen.costUsd);
});

test("gpt-6-sol(ultra) prices like gpt-6-sol / gpt-6-sol-ultra", async () => {
  const base = await calculateCostDetailed("cx", "gpt-6-sol", TOKENS);
  const annotated = await calculateCostDetailed("cx", "gpt-6-sol(ultra)", TOKENS);
  assert.equal(annotated.priced, true);
  assert.ok(annotated.costUsd > 0);
  assert.equal(annotated.costUsd, base.costUsd);
});

test("a provider-prefixed parenthesized id is resolved after normalization", async () => {
  const hyphen = await calculateCostDetailed("cx", "gpt-6.1-sol-max", TOKENS);
  const annotated = await calculateCostDetailed("cx", "openai/gpt-6.1-sol(max)", TOKENS);
  assert.equal(annotated.priced, true);
  assert.equal(annotated.costUsd, hyphen.costUsd);
});

test("parenthesized efforts the executor does not accept stay unpriced", async () => {
  // (max) is only valid on the max/ultra alias models; gpt-5.5 has no such tier.
  const result = await calculateCostDetailed("cx", "gpt-5.5(max)", TOKENS);
  assert.equal(result.priced, false);
  assert.equal(result.costUsd, 0);
});

test("hyphen-suffixed and plain ids keep resolving exactly as before", async () => {
  for (const model of ["gpt-6-luna", "gpt-6-sol-xhigh", "gpt-5.5-high"]) {
    const result = await calculateCostDetailed("cx", model, TOKENS);
    assert.equal(result.priced, true, `${model} should stay priced`);
    assert.ok(result.costUsd > 0, `${model} should stay above $0`);
  }
});

test("Codex Fast multiplier applies to the parenthesized form too", () => {
  assert.equal(getCodexFastCostMultiplier("codex", "gpt-6-sol(ultra)", "priority"), 2.5);
  assert.equal(
    getCodexFastCostMultiplier("codex", "gpt-6-sol(ultra)", "priority"),
    getCodexFastCostMultiplier("codex", "gpt-6-sol-ultra", "priority")
  );
});

test("a user override on the exact parenthesized id wins over the base override", async () => {
  await updatePricing({
    codex: {
      "gpt-6-astra": { input: 8, output: 8 },
      "gpt-6-astra(max)": { input: 1, output: 1 },
    },
  });
  const result = await calculateCostDetailed("codex", "gpt-6-astra(max)", TOKENS);
  assert.equal(result.priced, true);
  assert.equal(result.costUsd, 2);
});

test("a user override on the base id prices the parenthesized id when no tier key exists", async () => {
  // The "codex" pricing table holds only user overrides (the shipped catalog lives
  // under "cx"), so there is no gpt-6-sol-max key here and the base id must be used.
  await updatePricing({ codex: { "gpt-6-sol": { input: 3, output: 4 } } });
  const result = await calculateCostDetailed("codex", "gpt-6-sol(max)", TOKENS);
  assert.equal(result.priced, true);
  assert.equal(result.costUsd, 7);
});

test("calculateModalCost resolves a parenthesized id to the base model's pricing", async () => {
  await updatePricing({ codex: { "gpt-5.6-terra": { output_cost_per_image: 0.05 } } });
  const cost = await calculateModalCost("image", "codex", "gpt-5.6-terra(ultra)", { n: 2 });
  assert.equal(cost, 0.1);
});
