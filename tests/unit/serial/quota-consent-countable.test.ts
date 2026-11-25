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
const { runQuotaSharePreHook } =
  await import("../../../open-sse/handlers/chatCore/quotaSharePreHook.ts");
const sat = await import("../../../src/lib/quota/saturationSignals.ts");
const core = await import("../../../src/lib/db/core.ts");

test.after(() => {
  sat.__setAnthropicSaturationDepsForTests(null);
  sat._clearSaturationCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const PROV = "claude";

/** Provider usage fetches, one per saturation read while the saturation cache is cleared. */
let usageFetches = 0;

function mockUsage(byConn: Record<string, { fiveHour?: number; weekly?: number }>) {
  sat._clearSaturationCache();
  sat.__setAnthropicSaturationDepsForTests({
    loadConnection: async (id: string) => ({ id, accessToken: "tok", authType: "oauth" }),
    fetchUsage: async (conn: Record<string, unknown>) => {
      usageFetches += 1;
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

/** Reads of a refused hard key in a saturation pool, measured on the gate before consent lending. */
const READS_PRE_CHANGE = { peek: 1, poolConsumedTotal: 1, saturation: 1 };

/** Manual one-dimension tokens plan + a pool on that connection in the given borrow mode. */
function mk(conn: string, mode: "saturation" | "consent", window: "daily" | "5h" = "daily") {
  providerPlans.upsertPlan(conn, PROV, [{ unit: "tokens", window, limit: 1000 }], "manual");
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

/** The two store reads plus the saturation reads. A cleared cache sends each one to the mock. */
async function countAllReads<T>(fn: () => Promise<T>) {
  sat._clearSaturationCache();
  const fetchesBefore = usageFetches;
  const { result, reads } = await countReads(fn);
  return { result, reads: { ...reads, saturation: usageFetches - fetchesBefore } };
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
        const lentRun = await countAllReads(() => ask("c-sat-lent", key));
        const plainRun = await countAllReads(() => ask("c-sat-plain", key));
        assert.deepEqual(lentRun.result, plainRun.result);
        assert.equal(lentRun.result.kind, "allow");
        // One countable dimension: the requester's own peek, the saturation read and the pool total.
        assert.deepEqual(lentRun.reads, { peek: 1, poolConsumedTotal: 1, saturation: 1 });
        assert.deepEqual(plainRun.reads, { peek: 1, poolConsumedTotal: 1, saturation: 1 });
      }
    }
  );

  await t.test(
    "saturation pool: a refused hard key makes the same reads with or without stored consent",
    async () => {
      // A 5h window, because the mocked provider reports plan usage for 5h and weekly only.
      const lent = mk("c-satb-lent", "saturation", "5h");
      setAllocationLending(lent.id, "b", { lendingPercent: 50, lendingUntil: null });
      mk("c-satb-plain", "saturation", "5h");
      // A saturated account puts the pool in strict mode, so a hard key stops at its share.
      mockUsage({
        "c-satb-lent": { fiveHour: 90, weekly: 90 },
        "c-satb-plain": { fiveHour: 90, weekly: 90 },
      });
      try {
        for (const conn of ["c-satb-lent", "c-satb-plain"]) await burn(conn, "a", 600);
        const lentRun = await countAllReads(() => ask("c-satb-lent", "a"));
        const plainRun = await countAllReads(() => ask("c-satb-plain", "a"));
        assert.equal(lentRun.result.kind, "block");
        assert.equal(plainRun.result.kind, "block");
        assert.equal(
          lentRun.result.kind === "block" ? lentRun.result.reason : "",
          plainRun.result.kind === "block" ? plainRun.result.reason : ""
        );
        // The same reads the gate made before consent lending existed.
        assert.deepEqual(lentRun.reads, READS_PRE_CHANGE);
        assert.deepEqual(plainRun.reads, READS_PRE_CHANGE);
      } finally {
        mockUsage({});
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
    const reason = refused.kind === "block" ? refused.reason : "";
    assert.match(
      reason,
      /\. Enough daily usage is expected to clear by \d{4}-\d\d-\d\dT[\d:.]+Z\.$/
    );
    assert.ok(((refused.kind === "block" && refused.retryAfterSeconds) || 0) > 0);
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

  await t.test(
    "the refusal reaches the client with the clear-by instant and Retry-After",
    async () => {
      mk("c-wire", "consent");
      await burn("c-wire", "a", 500);
      const before = Date.now();
      const result = await runQuotaSharePreHook({
        apiKeyInfo: { id: "a" },
        credentials: { connectionId: "c-wire" },
        provider: PROV,
        model: "",
        isCombo: false,
        comboStepId: null,
        comboExecutionKey: null,
        finalizePendingRequest: () => {},
      });
      assert.ok(result);
      assert.equal(result.response.status, 429);
      const body = await result.response.json();
      assert.equal(body.error.code, "quota_share_blocked");
      const match =
        /^Quota share limit reached for your API key on claude\. Enough daily usage is expected to clear by (\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z)\.$/.exec(
          body.error.message
        );
      assert.ok(match, body.error.message);
      const clearAt = Date.parse(match[1]);
      assert.ok(clearAt > before);
      const retryAfter = Number(result.response.headers.get("Retry-After"));
      assert.ok(retryAfter > 0);
      // The header and the instant in the message describe the same moment.
      assert.ok(Math.abs(before + retryAfter * 1000 - clearAt) < 5_000);
    }
  );

  await t.test("an absolute cap refusal carries no reset time and no Retry-After", async () => {
    providerPlans.upsertPlan(
      "c-cap",
      PROV,
      [{ unit: "tokens", window: "daily", limit: 1000 }],
      "manual"
    );
    quotaPools.createPool({
      connectionId: "c-cap",
      name: "c-cap",
      borrowMode: "consent",
      allocations: [
        { apiKeyId: "a", weight: 50, policy: "hard", capValue: 100, capUnit: "tokens" },
        { apiKeyId: "b", weight: 50, policy: "hard" },
      ],
    });
    await burn("c-cap", "a", 100);
    const refused = await ask("c-cap", "a");
    assert.equal(refused.kind, "block");
    assert.equal(
      refused.kind === "block" ? refused.reason : "",
      "Absolute quota cap reached for your API key on claude"
    );
    assert.equal(refused.kind === "block" ? refused.retryAfterSeconds : 0, undefined);
  });

  await t.test("a deadline that passes turns the loan off on the next request", async () => {
    const p = mk("c-until", "consent");
    setAllocationLending(p.id, "b", { lendingPercent: 50, lendingUntil: Date.now() + 60_000 });
    assert.equal((await ask("c-until", "c")).kind, "allow");
    setAllocationLending(p.id, "b", { lendingPercent: 50, lendingUntil: Date.now() - 1 });
    assert.equal((await ask("c-until", "c")).kind, "block");
  });
});
