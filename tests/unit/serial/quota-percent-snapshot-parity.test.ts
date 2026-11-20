/**
 * tests/unit/serial/quota-percent-snapshot-parity.test.ts
 *
 * The admin usage snapshot (GET /api/quota/pools/{id}/usage) must report, for
 * percent dimensions, the same per-key numbers the quota-share gate uses. The
 * number depends on the account serving the request, so the snapshot carries
 * one entry per pool connection, and each entry must agree with the gate on
 * that connection.
 *
 * Scenario: 5h window, manual plan of 100 on the primary connection X, a pool
 * over [X, Y] (effective limit 200), two hard keys at 50/50 (fair share 100),
 * X at 60% (120), Y at 50% (100), key a routed 900k tokens and key b 100k.
 * Attributed: a = 108 on X and 90 on Y; b = 12 on X and 10 on Y.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs, { readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { PoolAllocation } from "../../../src/lib/db/quotaPools.ts";

// ── Set DATA_DIR BEFORE any DB import (resolved as module-level constant) ───
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-percent-snapshot-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const providerPlans = await import("../../../src/lib/db/providerPlans.ts");
const quotaPools = await import("../../../src/lib/db/quotaPools.ts");
const { enforceQuotaShare, recordConsumption } = await import("../../../src/lib/quota/enforce.ts");
const { SqliteQuotaStore } = await import("../../../src/lib/quota/sqliteQuotaStore.ts");
const { withPercentAttribution } = await import("../../../src/lib/quota/poolUsageSnapshot.ts");
const sat = await import("../../../src/lib/quota/saturationSignals.ts");
const core = await import("../../../src/lib/db/core.ts");

test.after(() => {
  sat.__setAnthropicSaturationDepsForTests(null);
  sat._clearSaturationCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const PROV = "claude";
const ROUTE = path.join(
  fileURLToPath(import.meta.url),
  "..",
  "..",
  "..",
  "..",
  "src/app/api/quota/pools/[id]/usage/route.ts"
);

function mockUsage(byConn: Record<string, { fiveHour?: number; weekly?: number }>) {
  sat._clearSaturationCache();
  sat.__setAnthropicSaturationDepsForTests({
    loadConnection: async (id: string) => ({ id, accessToken: "tok", authType: "oauth" }),
    fetchUsage: async (conn: Record<string, unknown>) => {
      const u = byConn[String(conn.id)] ?? {};
      return {
        quotas: {
          ...(u.fiveHour !== undefined ? { "session (5h)": { used: u.fiveHour, total: 100 } } : {}),
          ...(u.weekly !== undefined ? { "weekly (7d)": { used: u.weekly, total: 100 } } : {}),
        },
      };
    },
  });
}

const hard = (ids: string[], weight: number): PoolAllocation[] =>
  ids.map((apiKeyId) => ({ apiKeyId, weight, policy: "hard" as const }));

const burn = (conn: string, key: string, tokens: number) =>
  recordConsumption({
    apiKeyId: key,
    connectionId: conn,
    provider: PROV,
    cost: { tokens, usd: 0, requests: 1 },
  });

const ask = (conn: string, key: string) =>
  enforceQuotaShare({ apiKeyId: key, connectionId: conn, provider: PROV });

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 1e-6, `${a} ≈ ${b}`);

// ── Scenario setup (all top-level awaits stay above the first test()) ───────
const X = "conn-parity-x";
const Y = "conn-parity-y";
providerPlans.upsertPlan(X, PROV, [{ unit: "percent", window: "5h", limit: 100 }], "manual");
const pool = quotaPools.createPool({
  connectionId: X,
  connectionIds: [X, Y],
  name: "parity",
  allocations: hard(["a", "b"], 50),
});
mockUsage({ [X]: { fiveHour: 60 }, [Y]: { fiveHour: 50 } });
await burn(X, "a", 900_000);
await burn(X, "b", 100_000);

test("the usage snapshot shows, per account, the number enforcement uses", async () => {
  const store = new SqliteQuotaStore();
  const base = await store.poolUsageWithDimensions(pool.id, [
    { unit: "percent", window: "5h", limit: 200 },
  ]);
  const snap = await withPercentAttribution(base, pool, PROV, store);
  const [x, y] = snap.dimensions[0].accounts ?? [];
  assert.deepEqual([x.connectionId, y.connectionId], [X, Y]);
  near(x.consumedTotal, 120);
  near(y.consumedTotal, 100);
  const aOnX = x.perKey.find((k) => k.apiKeyId === "a")!;
  const aOnY = y.perKey.find((k) => k.apiKeyId === "a")!;
  near(aOnX.consumed, 108);
  assert.equal(aOnX.fairShare, 100);
  assert.equal(aOnX.borrowing, true);
  near(aOnY.consumed, 90);
  assert.equal(aOnY.borrowing, false);
  assert.equal((await ask(X, "a")).kind, "block"); // 108 ≥ 100 on account X
  assert.equal((await ask(Y, "a")).kind, "allow"); // 90 < 100 on account Y
  assert.equal((await ask(X, "b")).kind, "allow"); // 12
  assert.deepEqual(snap.dimensions[0].perKey, x.perKey);
  near(snap.dimensions[0].consumedTotal, 120);
});

test("countable dimensions pass through untouched", async () => {
  const store = new SqliteQuotaStore();
  const base = await store.poolUsageWithDimensions(pool.id, [
    { unit: "tokens", window: "hourly", limit: 1000 },
  ]);
  assert.deepEqual(await withPercentAttribution(base, pool, PROV, store), base);
});

test("the usage route applies the attribution", () => {
  assert.match(
    readFileSync(ROUTE, "utf8"),
    /withPercentAttribution\(\s*snapshot,\s*pool,\s*provider,\s*store\s*\)/
  );
});
