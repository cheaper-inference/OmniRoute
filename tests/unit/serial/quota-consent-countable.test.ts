/**
 * tests/unit/serial/quota-consent-countable.test.ts
 *
 * Consented lending on a countable unit (tokens, daily, limit 1000). Pool keys: a 50, b 30, c 0,
 * all hard. In a saturation pool a stored consent changes nothing, including the store reads.
 * In a consent pool a hard key stops at its share plus what the other keys lend.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { PoolAllocation } from "../../../src/lib/db/quotaPools.ts";

// ── Set DATA_DIR BEFORE any DB import (resolved as module-level constant) ───
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-consent-countable-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const providerPlans = await import("../../../src/lib/db/providerPlans.ts");
const quotaPools = await import("../../../src/lib/db/quotaPools.ts");
const { setAllocationLending } = await import("../../../src/lib/db/quotaLending.ts");
const { enforceQuotaShare, recordConsumption } = await import("../../../src/lib/quota/enforce.ts");
const { getQuotaStore } = await import("../../../src/lib/quota/QuotaStore.ts");
const sat = await import("../../../src/lib/quota/saturationSignals.ts");
const core = await import("../../../src/lib/db/core.ts");

test.after(() => {
  sat.__setAnthropicSaturationDepsForTests(null);
  sat._clearSaturationCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const PROV = "claude";

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

const ALLOCATIONS: PoolAllocation[] = [
  { apiKeyId: "a", weight: 50, policy: "hard" },
  { apiKeyId: "b", weight: 30, policy: "hard" },
  { apiKeyId: "c", weight: 0, policy: "hard" },
];

/** Manual one-dimension tokens plan + a pool on that connection in the given borrow mode. */
function mk(conn: string, mode: "saturation" | "consent") {
  providerPlans.upsertPlan(
    conn,
    PROV,
    [{ unit: "tokens", window: "daily", limit: 1000 }],
    "manual"
  );
  return quotaPools.createPool({
    connectionId: conn,
    name: conn,
    borrowMode: mode,
    allocations: ALLOCATIONS,
  });
}

const burn = (conn: string, key: string, tokens: number) =>
  recordConsumption({
    apiKeyId: key,
    connectionId: conn,
    provider: PROV,
    cost: { tokens, usd: 0, requests: 1 },
  });

const ask = (conn: string, key: string) =>
  enforceQuotaShare({ apiKeyId: key, connectionId: conn, provider: PROV });

/** Run fn while counting the store reads the gate makes. */
async function countReads<T>(fn: () => Promise<T>) {
  const store = await getQuotaStore();
  const peek = store.peek;
  const poolConsumedTotal = store.poolConsumedTotal;
  const reads = { peek: 0, poolConsumedTotal: 0 };
  store.peek = (...args) => {
    reads.peek += 1;
    return peek.apply(store, args);
  };
  store.poolConsumedTotal = (...args) => {
    reads.poolConsumedTotal += 1;
    return poolConsumedTotal.apply(store, args);
  };
  try {
    const result = await fn();
    return { result, reads };
  } finally {
    store.peek = peek;
    store.poolConsumedTotal = poolConsumedTotal;
  }
}

mockUsage({});

await test("quota-consent-countable", async (t) => {
  await t.test(
    "saturation pool: stored consent is inert and a key past its share is still allowed",
    async () => {
      const p = mk("c-sat", "saturation");
      setAllocationLending(p.id, "b", { lendingPercent: 50, lendingUntil: null });
      await burn("c-sat", "a", 600);
      assert.equal((await ask("c-sat", "a")).kind, "allow");
    }
  );

  await t.test(
    "saturation pool: the same decisions and the same store reads with or without stored consent",
    async () => {
      const lent = mk("c-sat-lent", "saturation");
      setAllocationLending(lent.id, "b", { lendingPercent: 50, lendingUntil: null });
      mk("c-sat-plain", "saturation");
      for (const conn of ["c-sat-lent", "c-sat-plain"]) {
        await burn(conn, "a", 600);
        await burn(conn, "c", 50);
      }
      for (const key of ["a", "b", "c"]) {
        const lentRun = await countReads(() => ask("c-sat-lent", key));
        const plainRun = await countReads(() => ask("c-sat-plain", key));
        assert.deepEqual(lentRun.result, plainRun.result);
        assert.equal(lentRun.result.kind, "allow");
        // One countable dimension: the requester's own peek and the pool total, nothing else.
        assert.deepEqual(lentRun.reads, { peek: 1, poolConsumedTotal: 1 });
        assert.deepEqual(plainRun.reads, { peek: 1, poolConsumedTotal: 1 });
      }
    }
  );

  await t.test("consent pool, nobody lending: the same key is refused at its share", async () => {
    mk("c-none", "consent");
    await burn("c-none", "a", 500);
    const refused = await ask("c-none", "a");
    assert.equal(refused.kind, "block");
    assert.match(
      refused.kind === "block" ? refused.reason : "",
      /^Quota share limit reached for your API key on claude/
    );
    assert.equal((await ask("c-none", "b")).kind, "allow");
    assert.equal((await ask("c-none", "c")).kind, "block"); // weight 0, nothing lent
  });

  await t.test("consent pool: lent capacity opens exactly the documented example", async () => {
    const p = mk("c-lend", "consent");
    setAllocationLending(p.id, "b", { lendingPercent: 50, lendingUntil: null });
    await burn("c-lend", "b", 100);
    assert.equal((await ask("c-lend", "c")).kind, "allow"); // 0 < 100
    await burn("c-lend", "c", 60);
    await burn("c-lend", "a", 530);
    assert.equal((await ask("c-lend", "a")).kind, "allow"); // 530 < 500 + 40
    await burn("c-lend", "a", 10);
    assert.equal((await ask("c-lend", "a")).kind, "block"); // 540
  });

  await t.test(
    "consent pool: extra reads happen only when they can change the decision",
    async () => {
      const p = mk("c-reads", "consent");
      // Nobody lends: a at its share reads only its own consumption.
      await burn("c-reads", "a", 500);
      assert.deepEqual((await countReads(() => ask("c-reads", "a"))).reads, {
        peek: 1,
        poolConsumedTotal: 1,
      });
      setAllocationLending(p.id, "b", { lendingPercent: 50, lendingUntil: null });
      // b lends, b is below its share: no extra read.
      assert.deepEqual((await countReads(() => ask("c-reads", "b"))).reads, {
        peek: 1,
        poolConsumedTotal: 1,
      });
      // b lends, a is at its share: one extra peek per other key (n - 1 = 2).
      assert.deepEqual((await countReads(() => ask("c-reads", "a"))).reads, {
        peek: 3,
        poolConsumedTotal: 1,
      });
    }
  );

  await t.test("a deadline that passes turns the loan off on the next request", async () => {
    const p = mk("c-until", "consent");
    setAllocationLending(p.id, "b", { lendingPercent: 50, lendingUntil: Date.now() + 60_000 });
    assert.equal((await ask("c-until", "c")).kind, "allow");
    setAllocationLending(p.id, "b", { lendingPercent: 50, lendingUntil: Date.now() - 1 });
    assert.equal((await ask("c-until", "c")).kind, "block");
  });
});
