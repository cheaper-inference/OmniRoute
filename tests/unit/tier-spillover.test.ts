import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tier-spillover-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "tier-spillover-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const { pickTierSpillover } = await import("../../src/sse/services/tierSpillover.ts");

const FLAG = "OMNIROUTE_TIER_SPILLOVER";
const MODEL = "claude-opus-5-5";

async function seed(priority: number, remainingPercentage: number) {
  const connection = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "apikey",
    name: `spill-${priority}-${Math.random().toString(16).slice(2, 8)}`,
    // A distinct key per row: createProviderConnection merges rows that share a key.
    apiKey: `test-key-placeholder-${priority}`,
    priority,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  const resetAt = new Date(Date.now() + 3 * 24 * 60 * 60_000).toISOString();
  quotaCache.setQuotaCache(connection.id, "claude", { session: { remainingPercentage, resetAt } });
  return connection;
}

test.beforeEach(() => {
  delete process.env[FLAG];
  quotaCache.__clearForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  delete process.env[FLAG];
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("pickTierSpillover: stays in the top tier until every member is near saturation", () => {
  const top = (id: string) => ({ id, priority: 1 });
  const low = { id: "low", priority: 2 };
  const headroom = (map: Record<string, number | null>) => (c: { id: string }) => map[c.id] ?? null;
  const list = [top("a"), top("b"), low];
  // one top-tier member still has room: no spill
  assert.equal(pickTierSpillover(list, headroom({ a: 10, b: 60, low: 90 }), 20), null);
  // every top-tier member is at or below the threshold: spill to the roomiest connection
  assert.equal(pickTierSpillover(list, headroom({ a: 10, b: 5, low: 90 }), 20)?.id, "low");
  // unknown headroom counts as room: never spill on missing data
  assert.equal(pickTierSpillover(list, headroom({ a: 10, b: null, low: 90 }), 20), null);
  // a single tier has nowhere to spill
  assert.equal(pickTierSpillover([top("a"), top("b")], headroom({ a: 1, b: 2 }), 20), null);
});

test("flag unset: fill-first keeps the saturated top tier (unchanged default)", async () => {
  const a = await seed(1, 10);
  await seed(2, 90);
  const selected = await auth.getProviderCredentials("claude", null, null, MODEL);
  assert.equal(selected?.connectionId, a.id);
});

test("flag on: a saturated top tier spills to the next tier", async () => {
  process.env[FLAG] = "true";
  const a = await seed(1, 10);
  const b = await seed(2, 90);
  const selected = await auth.getProviderCredentials("claude", null, null, MODEL);
  assert.notEqual(a.id, b.id, "seed must create two connections");
  assert.equal(selected?.connectionId, b.id);
});

test("flag on: a top tier with room is not left", async () => {
  process.env[FLAG] = "true";
  const a = await seed(1, 60);
  await seed(2, 90);
  const selected = await auth.getProviderCredentials("claude", null, null, MODEL);
  assert.equal(selected?.connectionId, a.id);
});
