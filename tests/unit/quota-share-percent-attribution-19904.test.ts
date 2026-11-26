/**
 * #19904 — Quota Share must attribute `percent` plans (Claude/Codex) per API key.
 *
 * Five keys of weight 20 on the default Claude plan (5h and weekly percent windows). The book of
 * each window opens on the first quota-share check; the growth of the account figure since then is
 * split between the keys by the tokens each one routed, so the heavy key reaches its share and the
 * light keys stay free.
 */
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-19904-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.QUOTA_STORE_DRIVER = "sqlite";

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const { enforceQuotaShare, recordConsumption } = await import("../../src/lib/quota/enforce.ts");
const sat = await import("../../src/lib/quota/saturationSignals.ts");
const { resolvePlan } = await import("../../src/lib/quota/planResolver.ts");
const { attributePercentDimension } = await import("../../src/lib/quota/percentAttribution.ts");
const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");

core.getDbInstance();

const PROVIDER = "claude";
const KEYS = ["k1", "k2", "k3", "k4", "k5"];

test.after(() => {
  mock.restoreAll();
  sat.__setAnthropicSaturationDepsForTests(null);
  sat._clearSaturationCache();
  core.resetDbInstance?.();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

/** The account's 5h figure (percent); the weekly window stays at 10. */
function setSaturation(connId: string, fiveHourUsed: number) {
  sat.__setAnthropicSaturationDepsForTests({
    loadConnection: async () => ({ id: connId, accessToken: "tok", authType: "oauth" }),
    fetchUsage: async () => ({
      quotas: {
        "session (5h)": { used: fiveHourUsed, total: 100 },
        "weekly (7d)": { used: 10, total: 100 },
      },
    }),
  });
  sat._clearSaturationCache();
}

function setup(conn: string, policy: "hard" | "soft") {
  assert.ok(
    resolvePlan(conn, PROVIDER).dimensions.every((d) => d.unit === "percent"),
    "precondition: percent-only plan"
  );
  return poolsDb.createPool({
    connectionId: conn,
    name: `19904-${conn}`,
    allocations: KEYS.map((k) => ({ apiKeyId: k, weight: 20, policy })),
  });
}

async function burn(conn: string, key: string, n: number) {
  for (let i = 0; i < n; i++) {
    await recordConsumption({
      apiKeyId: key,
      connectionId: conn,
      provider: PROVIDER,
      cost: { tokens: 50_000, usd: 1, requests: 1 },
    });
  }
}

const ask = (conn: string, key: string) =>
  enforceQuotaShare({ apiKeyId: key, connectionId: conn, provider: PROVIDER, estimatedCost: {} });

/** Open both books at an empty 5h window, route 1M tokens on k1 and 50k on k2, then 80%. */
async function heavyKeyScenario(conn: string, policy: "hard" | "soft") {
  setup(conn, policy);
  setSaturation(conn, 0);
  assert.equal((await ask(conn, "k1")).kind, "allow"); // opens both books
  await burn(conn, "k1", 20);
  await burn(conn, "k2", 1);
  setSaturation(conn, 80);
}

test("hard: heavy key above its share is blocked at >50% saturation; light key stays allowed", async () => {
  const conn = "conn-19904-hard";
  await heavyKeyScenario(conn, "hard");
  assert.equal((await ask(conn, "k1")).kind, "block"); // 80 × 1_000_000/1_050_000 = 76.2 ≥ 20
  assert.equal((await ask(conn, "k3")).kind, "allow"); // 0
  assert.equal((await ask(conn, "k2")).kind, "allow"); // 3.8
});

test("soft: heavy key is deprioritized, not blocked", async () => {
  const conn = "conn-19904-soft";
  await heavyKeyScenario(conn, "soft");
  const d = await ask(conn, "k1");
  assert.equal(d.kind, "allow");
  assert.equal((d as { deprioritize?: boolean }).deprioritize, true);
});

test("usage already on the bar when the pool starts blocks nobody", async () => {
  const conn = "conn-19904-empty";
  setup(conn, "hard");
  setSaturation(conn, 80);
  for (const k of KEYS) assert.equal((await ask(conn, k)).kind, "allow"); // 16 < 20 each
});

test("below saturation threshold the heavy key is not blocked", async () => {
  const conn = "conn-19904-low";
  const pool = setup(conn, "hard");
  setSaturation(conn, 0);
  await ask(conn, "k1"); // opens both books
  await burn(conn, "k1", 20);
  setSaturation(conn, 20);
  assert.equal((await ask(conn, "k1")).kind, "allow"); // 20 attributed, generous mode
  const att = await attributePercentDimension({
    store: new SqliteQuotaStore(),
    pool,
    connectionId: conn,
    provider: PROVIDER,
    dimension: { window: "5h", limit: 100 },
  });
  assert.ok(Math.abs(att.internalByKey.k1 - 20) < 1e-6, `k1 = ${att.internalByKey.k1}`);
  assert.ok(Math.abs(att.globalUsedPercent - 0.2) < 1e-9);
});

test("a request writes its tokens once, whatever the number of percent dimensions", async () => {
  const conn = "conn-19904-once";
  setup(conn, "hard");
  const percentDims = resolvePlan(conn, PROVIDER).dimensions.filter((d) => d.unit === "percent");
  assert.equal(percentDims.length, 2, "precondition: 5h and weekly percent dimensions");
  const write = mock.method(SqliteQuotaStore.prototype, "ledgerRecordTokens");
  try {
    await burn(conn, "k1", 1);
    assert.equal(write.mock.callCount(), 1);
    assert.deepEqual(write.mock.calls[0].arguments.slice(1, 4), [conn, "k1", 50_000]);
  } finally {
    mock.restoreAll();
  }
});
