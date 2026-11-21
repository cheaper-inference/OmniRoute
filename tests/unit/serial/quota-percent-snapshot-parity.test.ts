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
 * over [X, Y] (effective limit 200), two hard keys at 50/50 (fair share 100).
 * Each account has its own book, opened at 0. On X key a routed 900k tokens and
 * key b 100k; on Y only key b routed, 300k. Both accounts then at 60% (120).
 * Attributed: a = 108 on X and 0 on Y; b = 12 on X and 120 on Y.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs, { readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { PoolAllocation } from "../../../src/lib/db/quotaPools.ts";
import type { PoolUsageAccount, PoolUsagePerKey } from "../../../src/lib/quota/types.ts";

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

const kind = async (conn: string, key: string) => (await ask(conn, key)).kind;

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 1e-6, `${a} ≈ ${b}`);

/** The per-key entry of one account. */
function key(account: PoolUsageAccount, id: string): PoolUsagePerKey {
  const entry = account.perKey.find((k) => k.apiKeyId === id);
  assert.ok(entry, `${account.connectionId}/${id}`);
  return entry;
}

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
mockUsage({ [X]: { fiveHour: 0 }, [Y]: { fiveHour: 0 } });
await ask(X, "a"); // opens the book of account X at 0
await ask(Y, "a"); // opens the book of account Y at 0
await burn(X, "a", 900_000);
await burn(X, "b", 100_000);
await burn(Y, "b", 300_000);
mockUsage({ [X]: { fiveHour: 60 }, [Y]: { fiveHour: 60 } });

test("the usage snapshot shows, per account, the number enforcement uses", async () => {
  const store = new SqliteQuotaStore();
  const base = await store.poolUsageWithDimensions(pool.id, [
    { unit: "percent", window: "5h", limit: 200 },
  ]);
  const snap = await withPercentAttribution(base, pool, PROV, store);
  const [x, y] = snap.dimensions[0].accounts ?? [];
  assert.deepEqual([x.connectionId, y.connectionId], [X, Y]);
  near(x.consumedTotal, 120);
  near(y.consumedTotal, 120);
  near(key(x, "a").consumed, 108);
  assert.equal(key(x, "a").fairShare, 100);
  assert.equal(key(x, "a").borrowing, true);
  near(key(x, "b").consumed, 12);
  near(key(y, "a").consumed, 0);
  assert.equal(key(y, "a").borrowing, false);
  near(key(y, "b").consumed, 120);
  assert.equal(key(y, "b").borrowing, true);
  // One book per connection: the gate on each account agrees with that account's entry.
  assert.deepEqual(
    [await kind(X, "a"), await kind(Y, "a"), await kind(X, "b"), await kind(Y, "b")],
    ["block", "allow", "allow", "block"]
  );
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
