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
const occupancy = await import("../../open-sse/services/oauthSessionOccupancy.ts");
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
  occupancy._clearOAuthSessionOccupancyForTest();
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

test("pickTierSpillover: spills to the next tier only, never past it", () => {
  const list = [
    { id: "p1", priority: 1 },
    { id: "p2", priority: 2 },
    { id: "p3", priority: 3 },
  ];
  const headroom = { p1: 10, p2: 50, p3: 90 } as Record<string, number>;
  assert.equal(pickTierSpillover(list, (c) => headroom[c.id], 20)?.id, "p2");
});

test("pickTierSpillover: with a failure penalty, fewer recent failures win before headroom", () => {
  const list = [
    { id: "top", priority: 1 },
    { id: "failing", priority: 2 },
    { id: "healthy", priority: 2 },
  ];
  const headroom = { top: 10, failing: 90, healthy: 50 } as Record<string, number>;
  const steps = { failing: 2 } as Record<string, number>;
  assert.equal(pickTierSpillover(list, (c) => headroom[c.id], 20)?.id, "failing");
  assert.equal(
    pickTierSpillover(
      list,
      (c) => headroom[c.id],
      20,
      (c) => steps[c.id] ?? 0
    )?.id,
    "healthy"
  );
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

test("flag on: the OAuth peer adjustment does not pull a spilled request back to the saturated tier", async () => {
  process.env[FLAG] = "true";
  const resetAt = new Date(Date.now() + 3 * 24 * 60 * 60_000).toISOString();
  const seedOAuth = async (priority: number, remainingPercentage: number) => {
    const connection = await providersDb.createProviderConnection({
      provider: "claude",
      authType: "oauth",
      name: `spill-oauth-${priority}`,
      email: `spill-oauth-${priority}@example.invalid`,
      accessToken: `at-${priority}`,
      refreshToken: `rt-${priority}`,
      expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
      isActive: true,
      testStatus: "active",
    });
    // createProviderConnection renumbers priority on insert, so the tier is written directly.
    core
      .getDbInstance()
      .prepare("UPDATE provider_connections SET priority = ? WHERE id = ?")
      .run(priority, connection.id);
    quotaCache.setQuotaCache(connection.id, "claude", {
      session: { remainingPercentage, resetAt },
    });
    return connection;
  };
  const a = await seedOAuth(1, 10);
  const b = await seedOAuth(2, 80);
  // b already serves another session, so a looks "more available" to the peer adjustment.
  occupancy.reserveOAuthSession(b.id, "other-session");
  const selected = await auth.getProviderCredentials("claude", null, null, MODEL, {
    sessionKey: "new-session",
    reserveOAuthSession: true,
  });
  assert.notEqual(a.id, b.id);
  assert.equal(selected?.connectionId, b.id);
});
