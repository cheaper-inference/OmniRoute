/**
 * #18598: LiteLLM files OpenCode Go prices under the `opencode_go` provider, which
 * had no LITELLM_PROVIDER_MAP entry, so the sync stored them under `opencode_go` —
 * a key no cost lookup uses — and every `opencode-go` request booked $0 (unpriced).
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pricing-18598-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { transformToOmniRoute, saveSyncedPricing, getSyncedPricing } =
  await import("../../src/lib/pricingSync.ts");
const { calculateCostDetailed } = await import("../../src/lib/usage/costCalculator.ts");

// Shape and values copied from LiteLLM's model_prices_and_context_window.json.
const RAW = {
  "opencode_go/glm-5.2": {
    input_cost_per_token: 0.0000014,
    output_cost_per_token: 0.0000044,
    litellm_provider: "opencode_go",
    mode: "chat",
  },
};

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("LiteLLM opencode_go prices are stored under the opencode-go alias", () => {
  const result = transformToOmniRoute(RAW);
  assert.equal(result["opencode-go"]?.["glm-5.2"]?.input, 1.4);
  assert.equal(result["opencode-go"]?.["glm-5.2"]?.output, 4.4);
  assert.equal(result.opencode_go, undefined);
});

test("an opencode-go request is priced from LiteLLM-synced pricing", async () => {
  saveSyncedPricing(transformToOmniRoute(RAW));
  const result = await calculateCostDetailed("opencode-go", "glm-5.2", {
    prompt_tokens: 1_000_000,
    completion_tokens: 1_000_000,
  });
  assert.equal(result.priced, true);
  assert.ok(Math.abs(result.costUsd - 5.8) < 1e-9, `expected $5.80, got ${result.costUsd}`);
});

test("a row a pre-fix sync stored under opencode_go still prices opencode-go before a re-sync", async () => {
  saveSyncedPricing({ opencode_go: { "glm-5.2": { input: 1.4, output: 4.4 } } });
  const result = await calculateCostDetailed("opencode-go", "glm-5.2", {
    prompt_tokens: 1_000_000,
    completion_tokens: 1_000_000,
  });
  assert.equal(result.priced, true);
  assert.ok(Math.abs(result.costUsd - 5.8) < 1e-9, `expected $5.80, got ${result.costUsd}`);
});

test("a row already stored under opencode-go wins over a historical opencode_go row", () => {
  saveSyncedPricing({
    opencode_go: { "glm-5.2": { input: 9, output: 9 }, "kimi-k3": { input: 3, output: 15 } },
    "opencode-go": { "glm-5.2": { input: 1.4, output: 4.4 } },
  });
  const synced = getSyncedPricing();
  assert.equal(synced["opencode-go"]["glm-5.2"].input, 1.4);
  assert.equal(synced["opencode-go"]["kimi-k3"].input, 3);
});
