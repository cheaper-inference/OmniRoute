/**
 * tests/unit/quota-percent-preview.test.ts
 *
 * The read-only preview of a percent attribution book: the same arithmetic as the quota gate,
 * from one book read and the reading the caller passes in, with no write and no provider call.
 */

import test from "node:test";
import assert from "node:assert/strict";

import type { LedgerSnapshot, LedgerState } from "../../src/lib/quota/types.ts";

// The floor is read from the environment on every call: a value in the shell must not change
// the arithmetic below.
const savedFloor = process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;
delete process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;

const { previewPercentDimension } = await import("../../src/lib/quota/percentAttribution.ts");
const sat = await import("../../src/lib/quota/saturationSignals.ts");

test.after(() => {
  sat.__setAnthropicSaturationDepsForTests(null);
  sat._clearSaturationCache();
  if (savedFloor === undefined) delete process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;
  else process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT = savedFloor;
});

const NOW = 1_800_000_000_000;

function near(a: number | undefined, b: number) {
  assert.ok(typeof a === "number" && Math.abs(a - b) < 1e-6, `${a} ≈ ${b}`);
}

function state(over: Partial<LedgerState> = {}): LedgerState {
  return {
    rev: 1,
    last: 0.6,
    baseline: 0,
    resetAt: NOW + 3_600_000,
    readAt: NOW - 60_000,
    updatedAt: NOW - 60_000,
    keys: { a: { startTokens: 0 }, b: { startTokens: 0 } },
    ...over,
  };
}

function counters(a: number, b: number): LedgerSnapshot["counters"] {
  return {
    a: { tokens: a, updatedAt: NOW - 120_000 },
    b: { tokens: b, updatedAt: NOW - 120_000 },
  };
}

function fake(snapshot: LedgerSnapshot) {
  const store = {
    reads: 0,
    // Counted, not thrown: the preview catches every exception and answers "failed".
    writes: 0,
    ledgerRead: async () => {
      store.reads += 1;
      return snapshot;
    },
    ledgerCommit: async (): Promise<boolean> => {
      store.writes += 1;
      return true;
    },
    ledgerRecordTokens: async (): Promise<void> => {
      store.writes += 1;
    },
  };
  return store;
}

const POOL = {
  id: "p",
  allocations: [
    { apiKeyId: "a", weight: 50 },
    { apiKeyId: "b", weight: 50 },
  ],
};

type PreviewOver = Partial<Parameters<typeof previewPercentDimension>[0]>;

/** The preview of a book; asserts it is a book when the caller reads `shares`. */
async function preview(snapshot: LedgerSnapshot, over: PreviewOver = {}) {
  return previewPercentDimension({
    store: fake(snapshot),
    pool: POOL,
    connectionId: "c",
    dimension: { window: "5h", limit: 100 },
    reading: null,
    nowMs: NOW,
    ...over,
  });
}

async function book(snapshot: LedgerSnapshot, over: PreviewOver = {}) {
  const r = await preview(snapshot, over);
  assert.equal(r.kind, "book");
  if (r.kind !== "book") throw new Error("unreachable");
  return r;
}

test("a book at 60% splits 54 and 6 by the tokens each key routed", async () => {
  const r = await book({ state: state(), counters: counters(900_000, 100_000) });
  assert.equal(r.confirmed, false);
  near(r.shares.internalByKey.a, 54);
  near(r.shares.internalByKey.b, 6);
  near(r.shares.consumedByKey.a, 54);
  near(r.shares.external, 0);
});

test("external usage is charged by weight only past the unallocated capacity", async () => {
  const snap = { state: state({ baseline: 0.3 }), counters: counters(10_000, 0) };
  const full = await book(snap);
  near(full.shares.internalByKey.a, 10);
  near(full.shares.consumedByKey.a, 35);
  near(full.shares.consumedByKey.b, 25);
  near(full.shares.externalCharged, 50);
  const half = await book(snap, {
    pool: {
      id: "p",
      allocations: [
        { apiKeyId: "a", weight: 25 },
        { apiKeyId: "b", weight: 25 },
      ],
    },
  });
  near(half.shares.consumedByKey.a, 10);
  near(half.shares.externalCharged, 0);
});

test("a cached reading is applied in memory and confirms the book", async () => {
  const stored = state();
  const r = await book(
    { state: stored, counters: counters(900_000, 100_000) },
    { reading: { used: 0.7, resetAt: NOW + 3_600_000, fetchedAt: NOW - 1_000 } }
  );
  assert.equal(r.confirmed, true);
  near(r.shares.internalByKey.a, 63);
  assert.equal(stored.last, 0.6); // the stored state object is not edited
});

test("no book, an ended window and a failed read are three different answers", async () => {
  const reading = { used: 0.4, resetAt: NOW + 3_600_000, fetchedAt: NOW - 1_000 };
  assert.deepEqual(await preview({ state: null, counters: {} }), { kind: "none" });
  // A missing book is never opened in memory, even with a reading.
  assert.deepEqual(await preview({ state: null, counters: {} }, { reading }), { kind: "none" });
  assert.deepEqual(await preview({ state: state({ resetAt: NOW - 1 }), counters: {} }), {
    kind: "ended",
  });
  assert.deepEqual(
    await preview({ state: state({ resetAt: null, readAt: NOW - 16 * 60_000 }), counters: {} }),
    { kind: "ended" }
  );
  assert.equal(
    (await preview({ state: state({ resetAt: null, readAt: NOW - 14 * 60_000 }), counters: {} }))
      .kind,
    "book"
  );
  const throwing = {
    ledgerRead: async (): Promise<LedgerSnapshot> => {
      throw new Error("down");
    },
  };
  assert.deepEqual(
    await previewPercentDimension({
      store: throwing,
      pool: POOL,
      connectionId: "c",
      dimension: { window: "5h", limit: 100 },
      reading: null,
      nowMs: NOW,
    }),
    { kind: "failed" }
  );
});

test("the preview reads the book once and writes nothing", async () => {
  const store = fake({ state: state(), counters: counters(1, 1) });
  const r = await previewPercentDimension({
    store,
    pool: POOL,
    connectionId: "c",
    dimension: { window: "5h", limit: 100 },
    reading: { used: 0.9, resetAt: NOW + 3_600_000, fetchedAt: NOW - 1_000 },
    nowMs: NOW,
  });
  assert.equal(r.kind, "book");
  assert.equal(store.reads, 1);
  assert.equal(store.writes, 0);
});

test("the cache peek returns the gate's reading and never fetches", async () => {
  let fetches = 0;
  sat._clearSaturationCache();
  sat.__setAnthropicSaturationDepsForTests({
    loadConnection: async (id: string) => ({ id, accessToken: "tok", authType: "oauth" }),
    fetchUsage: async () => {
      fetches += 1;
      return { quotas: { "session (5h)": { used: 60, total: 100 } } };
    },
  });
  const dim = { unit: "percent", window: "5h" } as const;
  assert.equal(sat.peekPlanWindowReading("conn-peek", "claude", dim), null);
  assert.equal(fetches, 0);
  await sat.getSaturation("conn-peek", "claude", dim);
  assert.equal(fetches, 1);
  near(sat.peekPlanWindowReading("conn-peek", "claude", dim)?.used, 0.6);
  assert.equal(fetches, 1);
});
