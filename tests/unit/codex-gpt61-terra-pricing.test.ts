import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-terra-pricing-"));

const { getPricingForModel } = await import("../../src/shared/constants/pricing.ts");
const { getModelInfoCore } = await import("../../open-sse/services/model.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
});

// Codex lists GPT-6.1 Terra for live accounts. Without a price row its usage costs $0.
// Rates: 25 / 1.25 / 125 credits per 1M tokens (input / cached / output) at 25 credits per USD,
// and the API table row $1.00 / $0.05 / $5.00 with a $1.25 cache write.
const TERRA_IDS = ["", "-ultra", "-max", "-xhigh", "-high", "-medium", "-low"].map(
  (suffix) => `gpt-6.1-terra${suffix}`
);

test("every GPT-6.1 Terra id resolves the Codex price row", () => {
  for (const id of TERRA_IDS) {
    assert.deepEqual(
      getPricingForModel("cx", id),
      { input: 1, output: 5, cached: 0.05, reasoning: 5, cache_creation: 1.25 },
      id
    );
  }
});

test("a bare deepseek-v4-1-flash id infers the deepseek provider", async () => {
  const info = await getModelInfoCore("deepseek-v4-1-flash", {});
  assert.equal(info.errorType, undefined);
  assert.equal(info.provider, "deepseek");
});
