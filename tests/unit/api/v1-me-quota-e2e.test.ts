// GET /api/v1/me/quota/{provider} end to end: the real handler with its default wiring against
// rows seeded through the src/lib/db modules and the quota gate's own recordConsumption. Checks
// that the view matches what was seeded and what enforcement decides, and that nothing internal
// or belonging to another key reaches the body or the headers.
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-v1-me-quota-e2e-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-at-least-32-chars-long-0123456789";

const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const { createProviderConnection } = await import("../../../src/lib/db/providers.ts");
const { setProviderLimitsCache } = await import("../../../src/lib/db/providerLimits.ts");
const { upsertPlan } = await import("../../../src/lib/db/providerPlans.ts");
const { createPool } = await import("../../../src/lib/db/quotaPools.ts");
const { setModelCap } = await import("../../../src/lib/db/quotaModelCaps.ts");
const { replaceSchedules } = await import("../../../src/lib/db/quotaSchedules.ts");
const { recordConsumption, enforceQuotaShare } = await import("../../../src/lib/quota/enforce.ts");
const { handleSelfQuotaGet } = await import("../../../src/server/selfService/quotaHandler.ts");

const ACCOUNT_EMAIL = "e2e-account@example.com";

test.beforeEach(() => {
  process.env.QUOTA_SELF_PANEL = "true";
});

test.after(() => {
  mock.timers.reset();
  delete process.env.QUOTA_SELF_PANEL;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** One claude account, one pool of three keys, a budgeted schedule, caps and consumption. */
async function seed() {
  const conn = (await createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: ACCOUNT_EMAIL,
    email: ACCOUNT_EMAIL,
    accessToken: "test-oauth-token",
    isActive: true,
    testStatus: "active",
  })) as { id: string };
  upsertPlan(
    conn.id,
    "claude",
    [
      { unit: "tokens", window: "daily", limit: 1000 },
      { unit: "percent", window: "5h", limit: 100 },
    ],
    "manual"
  );
  const alpha = await apiKeysDb.createApiKey("e2e-key-alpha", "test-machine", ["self:usage"]);
  const bravo = await apiKeysDb.createApiKey("e2e-key-bravo", "test-machine", [
    "self:usage",
    "self:account-quota",
  ]);
  const charlie = await apiKeysDb.createApiKey("e2e-key-charlie", "test-machine", ["self:usage"]);
  const pool = createPool({
    connectionId: conn.id,
    name: "E2E Pool",
    allocations: [
      { apiKeyId: alpha.id, weight: 30, policy: "hard" },
      { apiKeyId: bravo.id, weight: 30, policy: "hard" },
      { apiKeyId: charlie.id, weight: 40, policy: "hard" },
    ],
  });
  setModelCap({
    poolId: pool.id,
    apiKeyId: alpha.id,
    model: "claude-x",
    capValue: 5,
    capUnit: "requests",
  });
  setModelCap({
    poolId: pool.id,
    apiKeyId: charlie.id,
    model: "charlie-only-model",
    capValue: 9,
    capUnit: "requests",
  });
  replaceSchedules(pool.id, [
    {
      label: "e2e-schedule",
      days: [0, 1, 2, 3, 4, 5, 6],
      startMinute: 0,
      endMinute: 1440,
      timezone: "UTC",
      mode: "allow",
      reserves: [],
      budgetValue: 50,
      budgetUnit: "tokens",
      budgetWindow: "daily",
      priority: 0,
      enabled: true,
    },
  ]);
  const base = { connectionId: conn.id, provider: "claude" };
  await recordConsumption({
    ...base,
    apiKeyId: alpha.id,
    model: "claude-x",
    cost: { tokens: 120, requests: 1 },
  });
  await recordConsumption({ ...base, apiKeyId: charlie.id, cost: { tokens: 300, requests: 1 } });
  setProviderLimitsCache(conn.id, {
    quotas: {
      "session (5h)": {
        usedPercentage: 37,
        remainingPercentage: 63,
        resetAt: new Date(Date.now() + 3_600_000).toISOString(),
      },
    },
    plan: "Max",
    message: null,
    fetchedAt: new Date().toISOString(),
    source: "sync",
  });
  return { conn, pool, alpha, bravo, charlie };
}

// A fixed mid-hour, mid-day instant for seeding and for both tests: the hourly model-cap bucket
// and the daily token bucket cannot roll over between the seeded consumption and the read.
mock.timers.enable({ apis: ["Date"], now: Date.UTC(2026, 10, 20, 12, 30, 0) });

const seeded = await seed();

const get = (key: string, provider = "claude") =>
  handleSelfQuotaGet(
    new Request(`http://localhost/api/v1/me/quota/${provider}`, {
      headers: { Authorization: `Bearer ${key}` },
    }),
    provider
  );

function assertNoLeak(text: string, leaks: string[]) {
  for (const leak of leaks) assert.ok(!text.includes(leak), `leaked: ${leak}`);
}

test("the default wiring reports the seeded numbers, as the gate sees them, and nothing else", async () => {
  const { conn, pool, alpha, bravo, charlie } = seeded;
  const res = await get(alpha.key);
  const text = await res.text();
  assert.equal(res.status, 200, text);
  const body = JSON.parse(text);

  assert.equal(body.pools.length, 1);
  const [view] = body.pools;
  assert.equal(view.weight, 30);
  assert.deepEqual(
    view.dimensions.map((d: { unit: string; window: string; limit: number }) => [
      d.unit,
      d.window,
      d.limit,
    ]),
    [["tokens", "daily", 1000]]
  );
  assert.deepEqual(view.dimensions[0].yourShare, {
    fairShare: 300,
    consumed: 120,
    remaining: 180,
    status: "ok",
  });
  assert.deepEqual(
    body.blocks.modelCaps.map((c: { model: string; cap: number; consumed: number }) => [
      c.model,
      c.cap,
      c.consumed,
    ]),
    [["claude-x", 5, 1]]
  );
  assert.equal(body.blocks.schedules.length, 1);
  assert.equal(body.blocks.schedules[0].state, "open");
  assert.equal(body.blocks.schedules[0].budget.exhausted, true);

  // The view says the schedule budget is spent (420 of 50 tokens): the gate blocks on it.
  const gate = await enforceQuotaShare({
    apiKeyId: alpha.id,
    connectionId: conn.id,
    provider: "claude",
    model: "claude-x",
  });
  assert.equal(gate.kind, "block");
  assert.match(String((gate as { reason?: string }).reason), /\[schedule-budget\]/);

  const internal = [pool.id, conn.id, ACCOUNT_EMAIL, "e2e-account", "charlie-only-model", "Max"];
  assertNoLeak(text, [...internal, bravo.id, charlie.id, "e2e-key-bravo", "e2e-key-charlie"]);

  const headers = [...res.headers].map(([name, value]) => `${name}: ${value}`).sort();
  assert.deepEqual(headers, ["cache-control: no-store", "content-type: application/json"]);
});

test("a key with the account scope gets the cached account bar and still no internal value", async () => {
  const { conn, pool, alpha, charlie } = seeded;
  const res = await get(seeded.bravo.key, "anthropic");
  const text = await res.text();
  assert.equal(res.status, 200, text);
  const [view] = JSON.parse(text).pools;
  assert.equal(view.accountVisible, true);
  assert.deepEqual(view.dimensions[0].total, { used: 420, status: "ok" });
  const [account] = view.accounts;
  assert.equal(account.label, "Account 1");
  // "ok", not "stale": the seeded reading is fresh, so the lookup made no upstream refresh.
  assert.deepEqual(
    [account.dimensions[0].account.used, account.dimensions[0].account.status],
    [37, "ok"]
  );
  assertNoLeak(text, [
    pool.id,
    conn.id,
    ACCOUNT_EMAIL,
    "e2e-account",
    "charlie-only-model",
    "Max",
    alpha.id,
    charlie.id,
    "e2e-key-alpha",
    "e2e-key-charlie",
  ]);
});
