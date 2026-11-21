// The percent attribution book keeps, per (pool, connection, plan window), the last account
// figure, the figure when the book opened or turned (baseline) and each API key's token counter at
// that moment, and per (pool, connection, key) a cumulative token counter. The book row is written by compare-and-set on its revision, so two writers that read
// the same revision cannot both win; the scheduled quota cleanup ages out idle rows.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { LedgerState } from "../../src/lib/quota/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-ledger-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");
const { addPercentLedgerTokens, readPercentLedger, commitPercentLedger } =
  await import("../../src/lib/db/quotaPercentLedger.ts");
const { attributeBook, observeLedger } = await import("../../src/lib/quota/percentLedger.ts");

const K = { poolId: "p1", connectionId: "c1", window: "5h" } as const;
const NOW = Date.now();
const DAY = 86_400_000;

function state(rev: number, over: Partial<LedgerState> = {}): LedgerState {
  return {
    rev,
    last: 0.6,
    baseline: 0.12,
    resetAt: null,
    readAt: NOW,
    updatedAt: NOW,
    keys: { a: { startTokens: 4_000 } },
    ...over,
  };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("token counters accumulate per pool connection and keep the last write time", () => {
  addPercentLedgerTokens("p1", "c1", "a", 100, NOW);
  addPercentLedgerTokens("p1", "c1", "a", 50, NOW + 5);
  addPercentLedgerTokens("p1", "c2", "a", 7, NOW + 9);
  assert.deepEqual(readPercentLedger(K), {
    state: null,
    counters: { a: { tokens: 150, updatedAt: NOW + 5 } },
  });
  assert.deepEqual(readPercentLedger({ ...K, connectionId: "c2" }).counters, {
    a: { tokens: 7, updatedAt: NOW + 9 },
  });
});

test("commit is compare-and-set on the revision", () => {
  assert.equal(commitPercentLedger(K, state(1)), true);
  assert.equal(commitPercentLedger(K, state(1, { last: 0.9 })), false);
  assert.equal(commitPercentLedger(K, state(3)), false);
  assert.equal(commitPercentLedger(K, state(2, { last: 0.7, resetAt: NOW + DAY })), true);
  assert.deepEqual(readPercentLedger(K).state, state(2, { last: 0.7, resetAt: NOW + DAY }));
  assert.equal(readPercentLedger({ ...K, window: "weekly" }).state, null);
});

test("an unreadable key map degrades to no key entry and leaves the rest as stored", () => {
  const broken = { ...K, poolId: "broken" };
  assert.equal(commitPercentLedger(broken, state(1, { last: 0.7, resetAt: NOW + DAY })), true);
  core
    .getDbInstance()
    .prepare("UPDATE quota_percent_ledger SET keys_json = '{' WHERE pool_id = 'broken'")
    .run();
  assert.deepEqual(
    readPercentLedger(broken).state,
    state(1, { last: 0.7, resetAt: NOW + DAY, keys: {} })
  );
});

test("a missing book counts as revision 0: only revision 1 creates it", () => {
  const fresh = { ...K, poolId: "fresh" };
  assert.equal(commitPercentLedger(fresh, state(3)), false);
  assert.equal(readPercentLedger(fresh).state, null);
  assert.equal(commitPercentLedger(fresh, state(1)), true);
});

test("a malformed key entry is dropped; baseline and last come back exactly as stored", () => {
  const mixed = { ...K, poolId: "mixed" };
  commitPercentLedger(mixed, state(1, { last: 0.1 + 0.2, baseline: 0.1 }));
  core
    .getDbInstance()
    .prepare(
      `UPDATE quota_percent_ledger
       SET keys_json = '{"a":{"startTokens":7,"extra":1},"b":{"startTokens":"x"},"c":5,"d":{}}'
       WHERE pool_id = 'mixed'`
    )
    .run();
  const { state: s } = readPercentLedger(mixed);
  assert.deepEqual(s?.keys, { a: { startTokens: 7 } });
  assert.deepEqual([s?.last, s?.baseline], [0.1 + 0.2, 0.1]);
  for (const json of ["[]", "null", "3"]) {
    core
      .getDbInstance()
      .prepare("UPDATE quota_percent_ledger SET keys_json = ? WHERE pool_id = 'mixed'")
      .run(json);
    const degraded = readPercentLedger(mixed).state;
    assert.deepEqual([degraded?.keys, degraded?.last, degraded?.baseline], [{}, 0.1 + 0.2, 0.1]);
  }
});

test("a stored key entry with a negative or non-finite mark is dropped", () => {
  const negative = { ...K, poolId: "negative" };
  commitPercentLedger(negative, state(1, { last: 0.25, baseline: 0.05 }));
  core
    .getDbInstance()
    .prepare(
      `UPDATE quota_percent_ledger
       SET keys_json = '{"a":{"startTokens":-7},"b":{"startTokens":1e999},"c":{"startTokens":3}}'
       WHERE pool_id = 'negative'`
    )
    .run();
  const { state: s } = readPercentLedger(negative);
  assert.deepEqual(s?.keys, { c: { startTokens: 3 } });
  assert.deepEqual([s?.last, s?.baseline], [0.25, 0.05]);
});

test("a token amount that is not a finite number above zero changes nothing", () => {
  const guarded = { ...K, poolId: "guarded-tokens" };
  addPercentLedgerTokens(guarded.poolId, "c1", "a", 10, NOW);
  for (const bad of [Infinity, -Infinity, Number.NaN, -5, 0]) {
    addPercentLedgerTokens(guarded.poolId, "c1", "a", bad, NOW + 1);
    addPercentLedgerTokens(guarded.poolId, "c1", "b", bad, NOW + 1);
  }
  assert.deepEqual(readPercentLedger(guarded).counters, { a: { tokens: 10, updatedAt: NOW } });
});

test("a state with a number that is not finite is never stored", () => {
  const guarded = { ...K, poolId: "guarded-state" };
  assert.equal(commitPercentLedger(guarded, state(1)), true);
  const unusable: Array<Partial<LedgerState>> = [
    { rev: Number.NaN },
    { rev: Infinity },
    { last: Number.NaN },
    { baseline: Infinity },
    { baseline: -0.01 },
    { readAt: Number.NaN },
    { updatedAt: Infinity },
    { resetAt: Infinity },
    { keys: { a: { startTokens: Number.NaN } } },
    { keys: { a: { startTokens: Infinity } } },
    // The write guard and the read filter are one rule: a negative key entry is not stored.
    { keys: { a: { startTokens: -1 } } },
  ];
  for (const over of unusable) {
    assert.equal(
      commitPercentLedger(guarded, { ...state(2), ...over }),
      false,
      JSON.stringify(over)
    );
    assert.deepEqual(readPercentLedger(guarded).state, state(1));
  }
  assert.equal(commitPercentLedger(guarded, state(2, { resetAt: NOW + DAY })), true);
});

test("scheduled cleanup removes book rows idle for two monthly windows and keeps live ones", async () => {
  for (const [pool, age] of [
    ["old", 61],
    ["live", 59],
  ] as const) {
    commitPercentLedger({ ...K, poolId: pool }, state(1, { updatedAt: NOW - age * DAY }));
    addPercentLedgerTokens(pool, "c1", "a", 5, NOW - age * DAY);
  }
  const result = await cleanup.cleanupQuotaConsumption();
  assert.deepEqual([result.deleted, result.errors], [2, 0]);
  assert.deepEqual(readPercentLedger({ ...K, poolId: "old" }), { state: null, counters: {} });
  const live = readPercentLedger({ ...K, poolId: "live" });
  assert.deepEqual([live.state?.rev, live.counters.a?.tokens], [1, 5]);
});

test("the migration is idempotent", () => {
  core.resetDbInstance();
  core.getDbInstance();
  assert.equal(readPercentLedger({ ...K, poolId: "live" }).state?.rev, 1);
});

// ─── Manual usage-history reset ─────────────────────────────────────────────

const ledgerStore = {
  ledgerRead: async (key: typeof K) => readPercentLedger(key),
  ledgerCommit: async (key: typeof K, next: LedgerState) => commitPercentLedger(key, next),
};

test("the usage-history reset clears every book and counter; the next reading opens a fresh book", async () => {
  const R = { poolId: "p-reset", connectionId: "c-reset", window: "5h" } as const;
  const H = 3_600_000;
  const reading = (used: number, atMs: number) => ({ used, resetAt: NOW + 4 * H, fetchedAt: atMs });
  await observeLedger(ledgerStore, R, reading(0.2, NOW), NOW); // opens at 0.2
  addPercentLedgerTokens(R.poolId, R.connectionId, "a", 30_000, NOW + 1_000);
  const risen = await observeLedger(ledgerStore, R, reading(0.5, NOW + 60_000), NOW + 60_000);
  assert.ok(risen);
  assert.ok(Math.abs(attributeBook(risen, 1000).internalByKey.a - 0.3) < 1e-9); // 30 points

  const result = await cleanup.resetUsageHistory("all");
  assert.ok(result.deletedQuotaPercentLedger >= 1);
  assert.ok(result.deletedQuotaPercentLedgerTokens >= 1);
  assert.deepEqual(readPercentLedger(R), { state: null, counters: {} });
  // No book: nothing is attributed to any key.
  assert.equal(await observeLedger(ledgerStore, R, null, NOW + 120_000), null);

  // The next reading opens a fresh book whose baseline is the current figure: all external.
  const fresh = await observeLedger(ledgerStore, R, reading(0.5, NOW + 180_000), NOW + 180_000);
  assert.deepEqual([fresh?.state.rev, fresh?.state.baseline, fresh?.state.last], [1, 0.5, 0.5]);
  const att = attributeBook(fresh!, 1000);
  assert.deepEqual([att.internal, att.external, att.internalByKey], [0, 0.5, {}]);
});

test("a period reset clears only the books and counters not written within that period", async () => {
  const idle = { poolId: "p-idle", connectionId: "c-idle", window: "weekly" } as const;
  const live = { poolId: "p-live", connectionId: "c-live", window: "weekly" } as const;
  assert.equal(commitPercentLedger(idle, state(1, { updatedAt: NOW - 2 * DAY })), true);
  assert.equal(commitPercentLedger(live, state(1)), true);
  addPercentLedgerTokens(idle.poolId, idle.connectionId, "a", 10, NOW - 2 * DAY);
  addPercentLedgerTokens(live.poolId, live.connectionId, "a", 10, NOW);

  const result = await cleanup.resetUsageHistory("1d");
  assert.deepEqual(
    [result.deletedQuotaPercentLedger, result.deletedQuotaPercentLedgerTokens],
    [1, 1]
  );
  assert.deepEqual(readPercentLedger(idle), { state: null, counters: {} });
  assert.deepEqual(readPercentLedger(live).state, state(1));
  assert.equal(readPercentLedger(live).counters.a.tokens, 10);
});

test("a period reset keeps an idle counter while a book of its pool connection is kept", async () => {
  const booked = { poolId: "p-booked", connectionId: "c-booked", window: "5h" } as const;
  const loose = { poolId: "p-loose", connectionId: "c-loose", window: "5h" } as const;
  assert.equal(commitPercentLedger(booked, state(1, { keys: { k: { startTokens: 0 } } })), true);
  addPercentLedgerTokens(booked.poolId, booked.connectionId, "k", 40, NOW - 2 * DAY);
  addPercentLedgerTokens(booked.poolId, booked.connectionId, "l", 10, NOW);
  addPercentLedgerTokens(loose.poolId, loose.connectionId, "k", 40, NOW - 2 * DAY);

  const result = await cleanup.resetUsageHistory("1d");
  assert.deepEqual(
    [result.deletedQuotaPercentLedger, result.deletedQuotaPercentLedgerTokens],
    [0, 1]
  );
  const kept = readPercentLedger(booked);
  assert.equal(kept.state?.rev, 1);
  assert.deepEqual(
    [kept.counters.k?.tokens, kept.counters.l?.tokens],
    [40, 10],
    "the book still marks key k, so its counter stays"
  );
  assert.deepEqual(readPercentLedger(loose).counters, {});
});
