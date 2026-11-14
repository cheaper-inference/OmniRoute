import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "team-pricing-lookups-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "team-pricing-lookups-fixture";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const teams = await import("../../src/lib/db/teams.ts");
const usage = await import("../../src/lib/usage/usageHistory.ts");
const rollup = await import("../../src/lib/usage/aggregateHistory.ts");
const limits = await import("../../src/lib/usage/teamUsageLimits.ts");
const pricing = await import("../../src/lib/db/settings/pricing.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const at = Date.parse("2026-01-02T18:00:00.000Z");
const cutoff = "2026-01-03T00:00:00.000Z";
const SHAPES = 40;

function clear() {
  core.resetDbInstance();
  keys.resetApiKeyState();
  usage.clearPendingRequests();
  fs.rmSync(dir, { recursive: true, force: true });
}
test.beforeEach(() => {
  clear();
  fs.mkdirSync(dir);
});
test.after(clear);

async function setup(prices: Record<string, Record<string, unknown>>) {
  await pricing.updatePricing({ openai: prices });
  const team = teams.createTeam({ name: "Lookups", maxBudgetUsd: 1000, budgetDuration: "7d" });
  const key = await keys.createApiKey("a", "pricing-lookups-a");
  teams.assignApiKeyBillingTeam(key.id, team.id, "2026-01-01T00:00:00.000Z");
  core
    .getDbInstance()
    .prepare("UPDATE teams SET budget_reset_at = ? WHERE id = ?")
    .run("2026-01-08T00:00:00.000Z", team.id);
  return key;
}

async function record(keyId: string, model: string, input: number) {
  await usage.saveRequestUsage({
    provider: "openai",
    model,
    apiKeyId: keyId,
    success: true,
    tokens: { input, output: 0 },
    timestamp: "2026-01-02T12:00:00.000Z",
  });
}

async function retain() {
  assert.equal((await rollup.rollupUsageHistoryBeforeDate(cutoff)).errors, 0);
  core.getDbInstance().prepare("DELETE FROM usage_history").run();
}

// Every pricing lookup scans the merged pricing table once per candidate id. A getter on
// the cached table counts those scans without touching production code.
async function countPricingScans(run: () => Promise<unknown>) {
  const table = (await readCache.getCachedPricing()) as Record<string, unknown>;
  let scans = 0;
  Object.defineProperty(table, "__scan_probe__", {
    enumerable: true,
    configurable: true,
    get() {
      scans += 1;
      return undefined;
    },
  });
  try {
    await run();
  } finally {
    delete table.__scan_probe__;
  }
  return scans;
}

test("raw usage with many token shapes resolves pricing once per model", async () => {
  const key = await setup({ "lookup-model": { input: 1, output: 0, cached: 0 } });
  for (let i = 1; i <= SHAPES; i++) await record(key.id, "lookup-model", i * 10);
  let status;
  const scans = await countPricingScans(async () => {
    status = await limits.getTeamUsageLimitStatusForApiKey(key.id, at);
  });
  // sum(10..400 step 10) = 8200 input tokens at $1 per million.
  assert.equal(status?.estimatedListCostUsd, 0.0082);
  assert.equal(status?.hasUnpricedUsage, false);
  assert.ok(scans <= 4, `expected a few pricing scans for ${SHAPES} shapes, got ${scans}`);
});

test("retained usage with many token shapes resolves pricing once per model", async () => {
  const key = await setup({ "lookup-model": { input: 1, output: 0, cached: 0 } });
  for (let i = 1; i <= SHAPES; i++) await record(key.id, "lookup-model", i * 10);
  await retain();
  let status;
  const scans = await countPricingScans(async () => {
    status = await limits.getTeamUsageLimitStatusForApiKey(key.id, at);
  });
  assert.equal(status?.estimatedListCostUsd, 0.0082);
  assert.ok(scans <= 4, `expected a few pricing scans for ${SHAPES} shapes, got ${scans}`);
});

test("a long-context tier still applies to each shape on its own size", async () => {
  const key = await setup({
    "tier-model": { input: 1, output: 0, cached: 0, long_context: { threshold: 150, input: 10 } },
  });
  await record(key.id, "tier-model", 100);
  await record(key.id, "tier-model", 200);
  const status = await limits.getTeamUsageLimitStatusForApiKey(key.id, at);
  // 100 tokens at $1 per million + 200 tokens at the tier rate of $10 per million.
  assert.equal(status?.estimatedListCostUsd, 0.0021);
});

test("an unpriced model stays flagged and does not leak into a priced one", async () => {
  const key = await setup({ "priced-model": { input: 1, output: 0, cached: 0 } });
  await record(key.id, "priced-model", 100);
  await record(key.id, "priced-model", 200);
  await record(key.id, "unpriced-model-xyz", 300);
  const status = await limits.getTeamUsageLimitStatusForApiKey(key.id, at);
  assert.equal(status?.estimatedListCostUsd, 0.0003);
  assert.equal(status?.hasUnpricedUsage, true);
  assert.equal(status?.exceeded, true);
});
