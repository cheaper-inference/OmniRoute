/**
 * #19904 — Quota Share must attribute `percent` plans (Claude/Codex) per API key.
 *
 * Five keys of weight 20 on the default Claude plan (5h and weekly percent windows). The book of
 * each window opens on the first quota-share check; a later rise of the account figure is charged
 * to the keys whose routed tokens explain it, so the heavy key reaches its share and the light
 * keys stay free.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-19904-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const { enforceQuotaShare, recordConsumption } = await import("../../src/lib/quota/enforce.ts");
const sat = await import("../../src/lib/quota/saturationSignals.ts");
const { resolvePlan } = await import("../../src/lib/quota/planResolver.ts");

core.getDbInstance();

const PROVIDER = "claude";
const KEYS = ["k1", "k2", "k3", "k4", "k5"];

test.after(() => {
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
  poolsDb.createPool({
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
  setup(conn, "hard");
  setSaturation(conn, 0);
  await ask(conn, "k1"); // opens both books
  await burn(conn, "k1", 20);
  setSaturation(conn, 20);
  assert.equal((await ask(conn, "k1")).kind, "allow"); // 20 attributed, generous mode
});
