/**
 * #19904 — Quota Share must attribute `percent` plans (Claude/Codex) per API key.
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

async function setup(conn: string, policy: "hard" | "soft") {
  assert.ok(
    resolvePlan(conn, PROVIDER).dimensions.every((d) => d.unit === "percent"),
    "precondition: percent-only plan"
  );
  poolsDb.createPool({
    connectionId: conn,
    name: `19904-${conn}`,
    allocations: KEYS.map((k) => ({ apiKeyId: k, weight: 20, policy })),
  });
  setSaturation(conn, 80);
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

test("hard: heavy key above its share is blocked at >50% saturation; light key stays allowed", async () => {
  const conn = "conn-19904-hard";
  await setup(conn, "hard");
  await burn(conn, "k1", 20);
  await burn(conn, "k2", 1);
  const heavy = await ask(conn, "k1");
  assert.equal(heavy.kind, "block");
  const light = await ask(conn, "k3");
  assert.equal(light.kind, "allow");
});

test("soft: heavy key is deprioritized, not blocked", async () => {
  const conn = "conn-19904-soft";
  await setup(conn, "soft");
  await burn(conn, "k1", 20);
  const d = await ask(conn, "k1");
  assert.equal(d.kind, "allow");
  assert.equal((d as { deprioritize?: boolean }).deprioritize, true);
});

test("no proxy data yet: behaviour unchanged (allow)", async () => {
  const conn = "conn-19904-empty";
  await setup(conn, "hard");
  const d = await ask(conn, "k1");
  assert.equal(d.kind, "allow");
});

test("below saturation threshold the heavy key is not blocked", async () => {
  const conn = "conn-19904-low";
  await setup(conn, "hard");
  setSaturation(conn, 20);
  await burn(conn, "k1", 20);
  const d = await ask(conn, "k1");
  assert.equal(d.kind, "allow");
});
