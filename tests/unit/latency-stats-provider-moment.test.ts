import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Opt-in: provider "bad minute" failures (429, 408, 5xx) stay out of the model
// reliability stats that auto-combo reads from getModelLatencyStats().

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stats-provider-moment-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");

const FLAG = "OMNIROUTE_STATS_SKIP_PROVIDER_MOMENT";
const KEY = "pm-provider/pm-model";

async function seed(rows: Array<{ success: boolean; status?: string }>) {
  const now = Date.now();
  for (const [index, row] of rows.entries()) {
    await usageHistory.saveRequestUsage({
      provider: "pm-provider",
      model: "pm-model",
      success: row.success,
      status: row.status,
      latencyMs: 500,
      tokens: { output: 10 },
      timestamp: new Date(now - index * 1000).toISOString(),
    });
  }
}

test.beforeEach(async () => {
  delete process.env[FLAG];
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  usageHistory.clearPendingRequests();
});

test.after(() => {
  delete process.env[FLAG];
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const mixed = [
  { success: true, status: "200" },
  { success: true, status: "200" },
  { success: false, status: "429" },
  { success: false, status: "503" },
  { success: false, status: "408" },
];

test("flag unset: every failed row counts against the model (unchanged default)", async () => {
  await seed(mixed);
  const stats = await usageHistory.getModelLatencyStats({ windowHours: 1, minSamples: 1 });
  assert.equal(stats[KEY].totalRequests, 5);
  assert.equal(stats[KEY].successRate, 0.4);
});

test("flag on: 429, 408 and 5xx failures are left out of the stats", async () => {
  process.env[FLAG] = "true";
  await seed(mixed);
  const stats = await usageHistory.getModelLatencyStats({ windowHours: 1, minSamples: 1 });
  assert.equal(stats[KEY].totalRequests, 2);
  assert.equal(stats[KEY].successRate, 1);
});

test("flag on: model-scoped failures (400, 404) and rows with no status still count", async () => {
  process.env[FLAG] = "true";
  await seed([
    { success: true, status: "200" },
    { success: false, status: "400" },
    { success: false, status: "404" },
    { success: false },
  ]);
  const stats = await usageHistory.getModelLatencyStats({ windowHours: 1, minSamples: 1 });
  assert.equal(stats[KEY].totalRequests, 4);
  assert.equal(stats[KEY].successRate, 0.25);
});
