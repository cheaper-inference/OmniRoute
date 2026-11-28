import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cost-sort-blended-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { updatePricing } = await import("../../src/lib/db/settings/pricing.ts");
const { sortModelsByCost } = await import("../../open-sse/services/combo/targetSorters.ts");

const FLAG = "OMNIROUTE_COST_SORT_BLENDED";
const models = ["openai/fx-cheap-input", "openai/fx-cheap-blend", "openai/fx-unpriced"];

test.before(async () => {
  await updatePricing({
    openai: {
      // input 1, output 10 -> blend 0.6 * 1 + 0.4 * 10 = 4.6
      "fx-cheap-input": { input: 1, output: 10 },
      // input 2, output 2 -> blend 2
      "fx-cheap-blend": { input: 2, output: 2 },
    },
  });
});

test.afterEach(() => {
  delete process.env[FLAG];
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("cost sort ranks by input price only when the flag is unset (unchanged default)", async () => {
  const ordered = await sortModelsByCost(models);
  assert.deepEqual(ordered, [
    "openai/fx-cheap-input",
    "openai/fx-cheap-blend",
    "openai/fx-unpriced",
  ]);
});

test("cost sort ranks by blended input+output price when the flag is on", async () => {
  process.env[FLAG] = "true";
  const ordered = await sortModelsByCost(models);
  assert.deepEqual(ordered, [
    "openai/fx-cheap-blend",
    "openai/fx-cheap-input",
    "openai/fx-unpriced",
  ]);
});

test("unpriced members stay last when the flag is on", async () => {
  process.env[FLAG] = "1";
  const ordered = await sortModelsByCost([...models].reverse());
  assert.equal(ordered.at(-1), "openai/fx-unpriced");
});
