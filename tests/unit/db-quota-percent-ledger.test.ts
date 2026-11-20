// The percent attribution book keeps, per (pool, connection, plan window), the part of the
// account bar each API key is charged with, and per (pool, connection, key) a cumulative token
// counter. The book row is written by compare-and-set on its revision, so two writers that read
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

const K = { poolId: "p1", connectionId: "c1", window: "5h" } as const;
const NOW = Date.now();
const DAY = 86_400_000;

function state(rev: number, over: Partial<LedgerState> = {}): LedgerState {
  return {
    rev,
    last: 0.6,
    external: 0.12,
    resetAt: null,
    readAt: NOW,
    updatedAt: NOW,
    keys: { a: { attributed: 0.48, seenTokens: 4_000 } },
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

test("an unreadable key map degrades to an all-external book", () => {
  core
    .getDbInstance()
    .prepare("UPDATE quota_percent_ledger SET keys_json = '{' WHERE pool_id = 'p1'")
    .run();
  const { state: s } = readPercentLedger(K);
  assert.deepEqual([s?.rev, s?.keys, s?.external], [2, {}, 0.7]);
});

test("a missing book counts as revision 0: only revision 1 creates it", () => {
  const fresh = { ...K, poolId: "fresh" };
  assert.equal(commitPercentLedger(fresh, state(3)), false);
  assert.equal(readPercentLedger(fresh).state, null);
  assert.equal(commitPercentLedger(fresh, state(1)), true);
});

test("a malformed key entry is dropped and its part of the bar becomes external", () => {
  const mixed = { ...K, poolId: "mixed" };
  commitPercentLedger(mixed, state(1, { last: 0.1 + 0.2, external: 0 }));
  core
    .getDbInstance()
    .prepare(
      `UPDATE quota_percent_ledger
       SET keys_json = '{"a":{"attributed":0.1,"seenTokens":7},"b":{"attributed":"x"},"c":5}'
       WHERE pool_id = 'mixed'`
    )
    .run();
  const { state: s } = readPercentLedger(mixed);
  assert.deepEqual(s?.keys, { a: { attributed: 0.1, seenTokens: 7 } });
  assert.equal(s?.external, 0.1 + 0.2 - 0.1);
  for (const json of ["[]", "null", "3"]) {
    core
      .getDbInstance()
      .prepare("UPDATE quota_percent_ledger SET keys_json = ? WHERE pool_id = 'mixed'")
      .run(json);
    const degraded = readPercentLedger(mixed).state;
    assert.deepEqual([degraded?.keys, degraded?.external], [{}, 0.1 + 0.2]);
  }
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
