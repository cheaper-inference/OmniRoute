/**
 * tests/unit/quota-percent-ledger-stores.test.ts
 *
 * The percent attribution book behind QuotaStore, on both stores (real SQLite, Redis with an
 * in-memory fake client), driven by observeLedger: the read–apply–conditional-write loop. Both
 * stores must end every sequence with the same book, never lose a token write, keep the newest
 * state when readings arrive out of order, and let at most one writer win a revision.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type {
  LedgerKey,
  LedgerSnapshot,
  LedgerState,
  PlanWindowReading,
  QuotaStore,
} from "../../src/lib/quota/types.ts";
import type { LedgerStore } from "../../src/lib/quota/percentLedger.ts";

// DATA_DIR must be set before any DB module is imported.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-percent-ledger-stores-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
const { RedisQuotaStore } = await import("../../src/lib/quota/redisQuotaStore.ts");
const { observeLedger, isLedgerCurrentWithoutReading } =
  await import("../../src/lib/quota/percentLedger.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ─── In-memory stand-in for the ioredis client ──────────────────────────────

const hashes = new Map<string, Map<string, string>>();
const calls: Array<{ method: string; args: unknown[] }> = [];
/**
 * One-shot hooks run inside the next hgetall / hincrbyfloat, before it acts (to interleave another
 * writer). A hook that returns a promise is awaited first; one that returns nothing is not, so a
 * microtask it queues runs after the command answered.
 */
type Hook = () => void | Promise<void>;
let beforeNextHgetall: Hook | null = null;
let beforeNextHincrbyfloat: Hook | null = null;

/** Run a hook; returns its promise only when it has one, so a plain hook adds no await. */
function runHook(hook: Hook | null): Promise<void> | undefined {
  const result = hook?.();
  return result instanceof Promise ? result : undefined;
}

/** Install `fn` as the hook of the n-th next hgetall (1 = the very next one). */
function atHgetall(n: number, fn: Hook): void {
  beforeNextHgetall = n <= 1 ? fn : () => atHgetall(n - 1, fn);
}

function hashOf(key: string): Map<string, string> {
  let hash = hashes.get(key);
  if (!hash) {
    hash = new Map();
    hashes.set(key, hash);
  }
  return hash;
}

const fake = {
  async hgetall(key: string): Promise<Record<string, string>> {
    calls.push({ method: "hgetall", args: [key] });
    const hook = beforeNextHgetall;
    beforeNextHgetall = null;
    const pending = runHook(hook);
    if (pending) await pending;
    return Object.fromEntries(hashes.get(key) ?? []);
  },
  async hset(key: string, field: string, value: string): Promise<number> {
    calls.push({ method: "hset", args: [key, field, value] });
    const hash = hashOf(key);
    const created = hash.has(field) ? 0 : 1;
    hash.set(field, value);
    return created;
  },
  async hsetnx(key: string, field: string, value: string): Promise<number> {
    calls.push({ method: "hsetnx", args: [key, field, value] });
    const hash = hashOf(key);
    if (hash.has(field)) return 0;
    hash.set(field, value);
    return 1;
  },
  async hincrbyfloat(key: string, field: string, increment: number): Promise<string> {
    calls.push({ method: "hincrbyfloat", args: [key, field, increment] });
    const hook = beforeNextHincrbyfloat;
    beforeNextHincrbyfloat = null;
    const pending = runHook(hook);
    if (pending) await pending;
    const hash = hashOf(key);
    const next = Number(hash.get(field) ?? "0") + increment;
    hash.set(field, String(next));
    return String(next);
  },
  async hdel(key: string, ...fields: string[]): Promise<number> {
    calls.push({ method: "hdel", args: [key, ...fields] });
    const hash = hashes.get(key);
    return fields.filter((f) => hash?.delete(f)).length;
  },
  async expire(key: string, seconds: number): Promise<number> {
    calls.push({ method: "expire", args: [key, seconds] });
    return hashes.has(key) ? 1 : 0;
  },
  async incrbyfloat(): Promise<string> {
    return "0";
  },
  async mget(...keys: string[]): Promise<Array<string | null>> {
    return keys.map(() => null);
  },
  async eval(): Promise<unknown> {
    return null;
  },
  async del(): Promise<number> {
    return 0;
  },
  async quit(): Promise<string> {
    return "OK";
  },
};

function redisWithFakeClient(): QuotaStore {
  const store: QuotaStore = new RedisQuotaStore("redis://fake");
  Object.assign(store, { client: async () => fake }); // swaps the client accessor on this instance only
  return store;
}

const STORES = [
  ["sqlite", () => new SqliteQuotaStore()],
  ["redis", redisWithFakeClient],
] as const;

// ─── Helpers ────────────────────────────────────────────────────────────────

const T0 = 1_800_000_000_000;
const MIN = 60_000;
const H = 60 * MIN;
const rd = (used: number, atMin: number, resetAt: number | null = null): PlanWindowReading => ({
  used,
  resetAt,
  fetchedAt: T0 + atMin * MIN,
});
const obs = (store: LedgerStore, key: LedgerKey, used: number, atMin: number) =>
  observeLedger(store, key, rd(used, atMin), T0 + atMin * MIN, 1000);
const sum = (s: LedgerState) =>
  Object.values(s.keys).reduce((a, k) => a + k.attributed, 0) + s.external;
const keyOf = (poolId: string): LedgerKey => ({ poolId, connectionId: "c", window: "5h" });

function near(actual: number | undefined, expected: number, label: string): void {
  assert.ok(
    actual !== undefined && Math.abs(actual - expected) < 1e-9,
    `${label}: ${actual} ≈ ${expected}`
  );
}

/** Integers and times compare exactly, fractions of the bar within 1e-9. */
function assertState(actual: LedgerState | null, expected: LedgerState, step: string): void {
  assert.ok(actual, `${step}: a book`);
  const { rev, resetAt, readAt, updatedAt } = actual;
  assert.deepEqual(
    { rev, resetAt, readAt, updatedAt },
    {
      rev: expected.rev,
      resetAt: expected.resetAt,
      readAt: expected.readAt,
      updatedAt: expected.updatedAt,
    },
    step
  );
  near(actual.last, expected.last, `${step} last`);
  near(actual.external, expected.external, `${step} external`);
  assert.deepEqual(Object.keys(actual.keys).sort(), Object.keys(expected.keys).sort(), step);
  for (const [k, ks] of Object.entries(expected.keys)) {
    near(actual.keys[k].attributed, ks.attributed, `${step} ${k}.attributed`);
    assert.equal(actual.keys[k].seenTokens, ks.seenTokens, `${step} ${k}.seenTokens`);
  }
}

function counting(store: LedgerStore) {
  const n = { reads: 0, commits: 0 };
  const wrapped: LedgerStore = {
    ledgerRead: (k) => {
      n.reads++;
      return store.ledgerRead(k);
    },
    ledgerCommit: (k, s) => {
      n.commits++;
      return store.ledgerCommit(k, s);
    },
  };
  return { wrapped, n };
}

/** The fixed five-step script; each step checks the state that ledgerRead returns. */
async function runScriptedScenario(store: QuotaStore, K: LedgerKey): Promise<void> {
  const at = (m: number) => T0 + m * MIN;
  const read = async () => (await store.ledgerRead(K)).state;

  await store.ledgerRecordTokens(K.poolId, K.connectionId, "a", 900_000, T0);
  await store.ledgerRecordTokens(K.poolId, K.connectionId, "b", 100_000, T0);
  await obs(store, K, 0.1, 0);
  const step1: LedgerState = {
    rev: 1,
    last: 0.1,
    external: 0.1,
    resetAt: null,
    readAt: T0,
    updatedAt: T0,
    keys: { a: { attributed: 0, seenTokens: 900_000 }, b: { attributed: 0, seenTokens: 100_000 } },
  };
  assertState(await read(), step1, "step 1");

  await store.ledgerRecordTokens(K.poolId, K.connectionId, "a", 30_000, at(1));
  await store.ledgerRecordTokens(K.poolId, K.connectionId, "b", 10_000, at(1));
  await obs(store, K, 0.14, 1);
  const step2: LedgerState = {
    rev: 2,
    last: 0.14,
    external: 0.1,
    resetAt: null,
    readAt: at(1),
    updatedAt: at(1),
    keys: {
      a: { attributed: 0.03, seenTokens: 930_000 },
      b: { attributed: 0.01, seenTokens: 110_000 },
    },
  };
  assertState(await read(), step2, "step 2");

  await obs(store, K, 0.14, 2);
  assertState(await read(), step2, "step 3");

  await obs(store, K, 0.135, 5);
  const f = 0.135 / 0.14;
  assertState(
    await read(),
    {
      ...step2,
      rev: 3,
      last: 0.135,
      external: 0.1 * f,
      readAt: at(5),
      updatedAt: at(5),
      keys: {
        a: { attributed: 0.03 * f, seenTokens: 930_000 },
        b: { attributed: 0.01 * f, seenTokens: 110_000 },
      },
    },
    "step 4"
  );

  await store.ledgerRecordTokens(K.poolId, K.connectionId, "a", 5_000, at(6));
  await obs(store, K, 0.02, 10);
  assertState(
    await read(),
    {
      rev: 4,
      last: 0.02,
      external: 0,
      resetAt: null,
      readAt: at(10),
      updatedAt: at(10),
      keys: {
        a: { attributed: 0.02, seenTokens: 935_000 },
        b: { attributed: 0, seenTokens: 110_000 },
      },
    },
    "step 5"
  );
}

/** The usual 32-bit mulberry32 generator, so the generated sequences are deterministic. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Both stores ────────────────────────────────────────────────────────────

for (const [name, make] of STORES) {
  test(`${name}: the scripted scenario yields the expected book`, async () => {
    await runScriptedScenario(make(), keyOf(`p-${name}`));
  });

  test(`${name}: an identical reading costs one read and no write`, async () => {
    const store = make();
    const K2 = keyOf(`p2-${name}`);
    await obs(store, K2, 0.1, 0);
    const { wrapped, n } = counting(store);
    const out = await obs(wrapped, K2, 0.1, 3);
    assert.deepEqual([n.reads, n.commits, out?.rev, out?.updatedAt], [1, 0, 1, T0]);
  });

  test(`${name}: no reading means one read and the stored state`, async () => {
    const store = make();
    const K2 = keyOf(`p2-none-${name}`);
    const { wrapped, n } = counting(store);
    assert.equal(await observeLedger(wrapped, K2, null, T0, 1000), null);
    await obs(store, K2, 0.1, 0);
    const out = await observeLedger(wrapped, K2, null, T0 + 9 * MIN, 1000);
    assert.deepEqual(out, (await store.ledgerRead(K2)).state);
    assert.deepEqual([n.reads, n.commits], [2, 0]);
  });

  test(`${name}: concurrent token writes are never lost and the invariant holds`, async () => {
    const store = make();
    const K3 = keyOf(`p3-${name}`);
    await Promise.all([
      ...Array.from({ length: 200 }, (_, i) =>
        store.ledgerRecordTokens(K3.poolId, K3.connectionId, i % 2 ? "a" : "b", 1_000, T0)
      ),
      ...Array.from({ length: 20 }, (_, i) =>
        observeLedger(
          store,
          K3,
          { used: 0.01 * (i + 1), resetAt: null, fetchedAt: T0 + i },
          T0,
          1000
        )
      ),
    ]);
    const snap = await store.ledgerRead(K3);
    assert.deepEqual([snap.counters.a.tokens, snap.counters.b.tokens], [100_000, 100_000]);
    assert.ok(Math.abs(sum(snap.state!) - snap.state!.last) < 1e-9);
    const end = await observeLedger(
      store,
      K3,
      { used: 0.5, resetAt: null, fetchedAt: T0 + 1_000 },
      T0,
      1000
    );
    assert.ok(Math.abs(sum(end!) - 0.5) < 1e-9);
    assert.deepEqual([end!.keys.a.seenTokens, end!.keys.b.seenTokens], [100_000, 100_000]);
  });

  test(`${name}: a lost commit is retried on the fresh state and attributes once`, async () => {
    const store = make();
    const K4 = keyOf(`p4-${name}`);
    await obs(store, K4, 0.1, 0);
    await store.ledgerRecordTokens(K4.poolId, K4.connectionId, "a", 100_000, T0);
    // The first read returns a snapshot that a competing observer then outdates.
    let first = true;
    const racing: LedgerStore = {
      ledgerRead: async (k) => {
        const snap = await store.ledgerRead(k);
        if (first) {
          first = false;
          await obs(store, k, 0.2, 1);
        }
        return snap;
      },
      ledgerCommit: (k, s) => store.ledgerCommit(k, s),
    };
    const out = await obs(racing, K4, 0.3, 2);
    assert.deepEqual([out?.rev, out?.last], [3, 0.3]);
    near(out?.keys.a.attributed, 0.1, "a.attributed");
    near(out?.external, 0.2, "external");
    assert.deepEqual(out, (await store.ledgerRead(K4)).state);
  });

  test(`${name}: out-of-order readings keep the newest state`, async () => {
    const store = make();
    const K5 = keyOf(`p5-${name}`);
    await obs(store, K5, 0.1, 0);
    await obs(store, K5, 0.7, 10);
    assert.equal((await obs(store, K5, 0.6, 9))?.last, 0.7); // older reading
    assert.equal((await obs(store, K5, 0.6, 11))?.last, 0.7); // drop not yet confirmed
    assert.equal((await obs(store, K5, 0.6, 12))?.last, 0.6); // two minutes newer: the window turned
  });

  test(`${name}: a missing book counts as revision 0: only revision 1 creates it`, async () => {
    const store = make();
    const K6 = keyOf(`p6-${name}`);
    const s = (rev: number): LedgerState => ({
      rev,
      last: 0.2,
      external: 0.2,
      resetAt: null,
      readAt: T0,
      updatedAt: T0,
      keys: {},
    });
    assert.equal(await store.ledgerCommit(K6, s(3)), false);
    assert.equal(await store.ledgerCommit(K6, s(2)), false);
    assert.equal((await store.ledgerRead(K6)).state, null);
    assert.equal(await store.ledgerCommit(K6, s(1)), true);
    assert.equal(await store.ledgerCommit(K6, s(1)), false);
    assert.equal(await store.ledgerCommit(K6, s(3)), false);
    assert.equal(await store.ledgerCommit(K6, s(2)), true);
    assert.equal((await store.ledgerRead(K6)).state?.rev, 2);
  });

  test(`${name}: two writers of the same revision: exactly one wins`, async () => {
    const store = make();
    const K7 = keyOf(`p7-${name}`);
    await obs(store, K7, 0.1, 0);
    const base = (await store.ledgerRead(K7)).state!;
    const results = await Promise.all(
      [0.2, 0.3].map((last) =>
        store.ledgerCommit(K7, { ...base, rev: 2, last, external: last, readAt: T0 + MIN })
      )
    );
    assert.deepEqual(results.filter(Boolean).length, 1);
    const stored = (await store.ledgerRead(K7)).state!;
    assert.equal(stored.rev, 2);
    assert.equal(stored.last, results[0] ? 0.2 : 0.3);
  });

  test(`${name}: unusable token amounts and states are never stored`, async () => {
    const store = make();
    const K8 = keyOf(`p8-${name}`);
    await store.ledgerRecordTokens(K8.poolId, K8.connectionId, "a", 10, T0);
    for (const bad of [Infinity, -Infinity, Number.NaN, -5, 0]) {
      await store.ledgerRecordTokens(K8.poolId, K8.connectionId, "a", bad, T0 + 1);
      await store.ledgerRecordTokens(K8.poolId, K8.connectionId, "b", bad, T0 + 1);
    }
    assert.deepEqual((await store.ledgerRead(K8)).counters, { a: { tokens: 10, updatedAt: T0 } });

    const ok: LedgerState = {
      rev: 1,
      last: 0.2,
      external: 0.1,
      resetAt: null,
      readAt: T0,
      updatedAt: T0,
      keys: { a: { attributed: 0.1, seenTokens: 10 } },
    };
    for (const over of [
      { last: Number.NaN },
      { external: Infinity },
      { readAt: Number.NaN },
      { updatedAt: Infinity },
      { resetAt: Number.NaN },
      { rev: Infinity },
      { keys: { a: { attributed: Infinity, seenTokens: 10 } } },
      { keys: { a: { attributed: 0.1, seenTokens: Number.NaN } } },
      { keys: { a: { attributed: -0.1, seenTokens: 10 } } },
      { keys: { a: { attributed: 0.1, seenTokens: -1 } } },
    ]) {
      assert.equal(await store.ledgerCommit(K8, { ...ok, ...over }), false, Object.keys(over)[0]);
    }
    assert.equal((await store.ledgerRead(K8)).state, null);
    assert.equal(await store.ledgerCommit(K8, ok), true);
  });
}

// ─── Parity, failures, Redis layout ─────────────────────────────────────────

test("both stores end every generated sequence with the same book and a valid invariant", async () => {
  const sqlite = new SqliteQuotaStore();
  const redis = redisWithFakeClient();
  const R = T0 + 4 * H;
  for (let seed = 1; seed <= 10; seed++) {
    const rand = mulberry32(seed);
    const key = keyOf(`gen-${seed}`);
    let now = T0;
    for (let i = 0; i < 60; i++) {
      now += Math.floor(rand() * 20 * MIN);
      if (rand() < 0.5) {
        const k = `k${Math.floor(rand() * 4)}`;
        const tokens = 1 + Math.floor(rand() * 200_000);
        await sqlite.ledgerRecordTokens(key.poolId, key.connectionId, k, tokens, now);
        await redis.ledgerRecordTokens(key.poolId, key.connectionId, k, tokens, now);
        continue;
      }
      const reading = {
        used: Math.floor(rand() * 201) / 200,
        resetAt: [null, R, R + 5 * H][Math.floor(rand() * 3)],
        fetchedAt: now,
      };
      const fromSqlite = await observeLedger(sqlite, key, reading, now, 1000);
      const fromRedis = await observeLedger(redis, key, reading, now, 1000);
      for (const state of [fromSqlite, fromRedis]) {
        assert.ok(state, `seed ${seed} step ${i}: a book`);
        assert.ok(Math.abs(sum(state) - state.last) < 1e-9, `seed ${seed} step ${i}`);
      }
      assert.deepEqual(fromRedis, fromSqlite, `seed ${seed} step ${i}`);
    }
    assert.deepEqual(await redis.ledgerRead(key), await sqlite.ledgerRead(key), `seed ${seed}`);
  }
});

test("without a reading, a book counts as current only until its reset time or for 15 minutes", () => {
  const book = (resetAt: number | null): LedgerState => ({
    rev: 1,
    last: 0.4,
    external: 0.1,
    resetAt,
    readAt: T0,
    updatedAt: T0,
    keys: { a: { attributed: 0.3, seenTokens: 30_000 } },
  });
  const R = T0 + H;
  // A known reset time decides alone: current strictly before it, whatever the reading's age.
  assert.equal(isLedgerCurrentWithoutReading(book(R), R - 1), true);
  assert.equal(isLedgerCurrentWithoutReading(book(R), R), false);
  assert.equal(isLedgerCurrentWithoutReading(book(R), R + 3 * H), false);
  assert.equal(isLedgerCurrentWithoutReading(book(T0 + MIN), T0 + 2 * MIN), false);
  // No reset time: current for 15 minutes after the last applied reading, inclusive.
  assert.equal(isLedgerCurrentWithoutReading(book(null), T0 + 15 * MIN), true);
  assert.equal(isLedgerCurrentWithoutReading(book(null), T0 + 15 * MIN + 1), false);
  // An unusable time is never current.
  assert.equal(isLedgerCurrentWithoutReading(book(Number.NaN), T0), false);
  assert.equal(isLedgerCurrentWithoutReading({ ...book(null), readAt: Number.NaN }, T0), false);
});

for (const [name, make] of STORES) {
  test(`${name}: without a reading, a book that may belong to a past window is not returned`, async () => {
    const store = make();
    const timed = keyOf(`p-current-timed-${name}`);
    const untimed = keyOf(`p-current-untimed-${name}`);
    const R = T0 + H;
    await observeLedger(store, timed, rd(0.3, 0, R), T0, 1000);
    await obs(store, untimed, 0.3, 0);
    const storedTimed = (await store.ledgerRead(timed)).state;
    const storedUntimed = (await store.ledgerRead(untimed)).state;

    assert.deepEqual(await observeLedger(store, timed, null, R - 1, 1000), storedTimed);
    assert.equal(await observeLedger(store, timed, null, R, 1000), null);
    assert.deepEqual(await observeLedger(store, untimed, null, T0 + 14 * MIN, 1000), storedUntimed);
    assert.equal(await observeLedger(store, untimed, null, T0 + 16 * MIN, 1000), null);
    // The stored books are left as they were.
    assert.deepEqual((await store.ledgerRead(timed)).state, storedTimed);
    assert.deepEqual((await store.ledgerRead(untimed)).state, storedUntimed);
  });
}

test("a store failure never throws", async () => {
  const sqlite = new SqliteQuotaStore();
  const K = keyOf("p-failure");
  const boom = async (): Promise<never> => {
    throw new Error("store down");
  };
  assert.equal(await obs({ ledgerRead: boom, ledgerCommit: boom }, K, 0.9, 20), null);

  await obs(sqlite, K, 0.1, 0);
  const before = (await sqlite.ledgerRead(K)).state;
  assert.ok(before);
  // The commit rejects: the state read before it.
  assert.deepEqual(
    await obs({ ledgerRead: (k) => sqlite.ledgerRead(k), ledgerCommit: boom }, K, 0.9, 20),
    before
  );
  // The commit loses and the second read rejects: the state of the first read.
  let reads = 0;
  const flaky: LedgerStore = {
    ledgerRead: async (k) => (reads++ === 0 ? sqlite.ledgerRead(k) : boom()),
    ledgerCommit: async () => false,
  };
  assert.deepEqual(await obs(flaky, K, 0.9, 20), before);
  // A snapshot the transition cannot use.
  const broken = { state: null, counters: null } as unknown as LedgerSnapshot;
  assert.equal(await obs({ ledgerRead: async () => broken, ledgerCommit: boom }, K, 0.9, 20), null);
  assert.deepEqual((await sqlite.ledgerRead(K)).state, before);
});

test("redis: one hash per pool connection, old revisions removed, 60-day TTL", async () => {
  const redis = redisWithFakeClient();
  const K = keyOf("p-redis-layout");
  const hashKey = `${process.env.REDIS_KEY_PREFIX?.trim() || "omniroute:"}quota-ledger:${K.poolId}:c`;
  calls.length = 0;
  await runScriptedScenario(redis, K);
  await new Promise((resolve) => setImmediate(resolve)); // let the unawaited HDELs land

  const hash = hashes.get(hashKey);
  assert.ok(hash, "the book lives in one hash per pool connection");
  assert.deepEqual(
    [...hash.keys()].filter((f) => f.startsWith("s:")),
    ["s:5h:4"]
  );
  assert.deepEqual([...hash.keys()].filter((f) => !f.startsWith("s:")).sort(), [
    "t:a",
    "t:b",
    "u:a",
    "u:b",
  ]);
  const expires = calls.filter((c) => c.method === "expire");
  assert.ok(expires.every((c) => c.args[0] === hashKey));
  assert.deepEqual(expires.at(-1)?.args, [hashKey, 5_184_000]);
  // The write time goes in before the tokens.
  const writes = calls.filter((c) => c.method === "hset" || c.method === "hincrbyfloat");
  assert.deepEqual(
    writes.slice(0, 2).map((c) => [c.method, c.args[1]]),
    [
      ["hset", "u:a"],
      ["hincrbyfloat", "t:a"],
    ]
  );

  hash.set("s:5h:1", hash.get("s:5h:4")!.replace('"rev":4', '"rev":1'));
  calls.length = 0;
  const snap = await redis.ledgerRead(K);
  assert.equal(snap.state?.rev, 4);
  assert.deepEqual(
    calls.filter((c) => c.method === "hdel").map((c) => c.args),
    [[hashKey, "s:5h:1"]]
  );
});

test("redis: a revision field removed after the check cannot be won a second time", async () => {
  const redis = redisWithFakeClient();
  const K = keyOf("p-redis-resurrect");
  const hashKey = `${process.env.REDIS_KEY_PREFIX?.trim() || "omniroute:"}quota-ledger:${K.poolId}:c`;
  await obs(redis, K, 0.1, 0);
  const base = (await redis.ledgerRead(K)).state!;
  const next = (rev: number, last: number): LedgerState => ({
    ...base,
    rev,
    last,
    external: last,
    readAt: T0 + rev * MIN,
  });
  // Between this writer's check (book at rev 1) and its HSETNX of rev 2, another writer stores
  // rev 2, a third stores rev 3 on top of it, and rev 2's field is removed.
  beforeNextHgetall = () => {
    queueMicrotask(() => {
      const hash = hashOf(hashKey);
      hash.set("s:5h:2", JSON.stringify(next(2, 0.2)));
      hash.set("s:5h:3", JSON.stringify(next(3, 0.3)));
      hash.delete("s:5h:2");
      hash.delete("s:5h:1");
    });
  };
  assert.equal(await redis.ledgerCommit(K, next(2, 0.25)), false);
  const stored = (await redis.ledgerRead(K)).state!;
  assert.deepEqual([stored.rev, stored.last], [3, 0.3]);
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(
    [...hashOf(hashKey).keys()].filter((f) => f.startsWith("s:")),
    ["s:5h:3"]
  );
});

test("redis: a commit overtaken before its confirmation is re-read, never attributed twice", async () => {
  const redis = redisWithFakeClient();
  const K = keyOf("p-redis-spurious-loss");
  const at = (m: number) => T0 + m * MIN;
  await obs(redis, K, 0.1, 0);
  await redis.ledgerRecordTokens(K.poolId, K.connectionId, "a", 50_000, at(1));
  // Writer A's commit of rev 2: its read, the compare, then the HSETNX wins, then the confirm.
  // Before the confirm answers, writer B reads A's rev 2 and stores rev 3 on top of it.
  atHgetall(3, async () => {
    await redis.ledgerRecordTokens(K.poolId, K.connectionId, "b", 30_000, at(3));
    const fromB = await obs(redis, K, 0.25, 3);
    assert.equal(fromB?.rev, 3, "writer B builds rev 3 on writer A's rev 2");
  });
  const commits: boolean[] = [];
  const writerA: LedgerStore = {
    ledgerRead: (k) => redis.ledgerRead(k),
    ledgerCommit: async (k, s) => {
      const won = await redis.ledgerCommit(k, s);
      commits.push(won);
      return won;
    },
  };
  const out = await obs(writerA, K, 0.2, 2);
  assert.deepEqual(commits, [false], "A's HSETNX won, but the confirm saw rev 3");
  assert.equal(beforeNextHgetall, null, "the interleaving ran");
  assert.ok(out);
  // A re-read rev 3; its own reading is older than rev 3's, so nothing changes.
  assert.deepEqual(out, (await redis.ledgerRead(K)).state);
  assert.deepEqual([out.rev, out.last, out.readAt], [3, 0.25, at(3)]);
  near(out.keys.a.attributed, 0.1, "a.attributed (once)");
  near(out.keys.b.attributed, 0.05, "b.attributed");
  near(out.external, 0.1, "external");
  assert.deepEqual([out.keys.a.seenTokens, out.keys.b.seenTokens], [50_000, 30_000]);
});

test("redis: a read between the two commands of a token write leaves the tokens pending", async () => {
  const redis = redisWithFakeClient();
  const K = keyOf("p-redis-split-token-write");
  const at = (m: number) => T0 + m * MIN;
  await redis.ledgerRecordTokens(K.poolId, K.connectionId, "a", 10_000, T0);
  await obs(redis, K, 0.1, 0);
  // The write stores the last-write time, then increments the tokens: observe in between.
  const seen: { mid: LedgerState | null } = { mid: null };
  beforeNextHincrbyfloat = async () => {
    const snap = await redis.ledgerRead(K);
    assert.deepEqual(snap.counters.a, { tokens: 10_000, updatedAt: at(1) });
    seen.mid = await obs(redis, K, 0.15, 2);
  };
  await redis.ledgerRecordTokens(K.poolId, K.connectionId, "a", 50_000, at(1));
  const between = seen.mid;
  assert.ok(between, "the interleaving ran");
  near(between.keys.a.attributed, 0, "nothing to explain the rise yet");
  near(between.external, 0.15, "external");
  assert.equal(between.keys.a.seenTokens, 10_000, "the watermark did not move past the new tokens");

  const after = await obs(redis, K, 0.2, 3);
  assert.ok(after);
  near(after.keys.a.attributed, 0.05, "the next rise is explained by the pending tokens");
  near(after.external, 0.15, "external");
  assert.equal(after.keys.a.seenTokens, 60_000);
});

test("redis: a stored field that is not a usable book is skipped and removed", async () => {
  const redis = redisWithFakeClient();
  const K = keyOf("p-redis-damaged");
  const hashKey = `${process.env.REDIS_KEY_PREFIX?.trim() || "omniroute:"}quota-ledger:${K.poolId}:c`;
  await obs(redis, K, 0.1, 0);
  await obs(redis, K, 0.3, 1);
  const hash = hashOf(hashKey);
  hash.set("s:5h:3", "{");
  hash.set("s:5h:x", "{}");
  hash.set(
    "s:5h:2",
    hash.get("s:5h:2")!.replace(/"keys":\{.*\}\}$/, '"keys":{"a":{"attributed":-1}}}')
  );
  const snap = await redis.ledgerRead(K);
  assert.deepEqual([snap.state?.rev, snap.state?.keys, snap.state?.external], [2, {}, 0.3]);
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual([...hash.keys()].filter((f) => f.startsWith("s:")).sort(), ["s:5h:2", "s:5h:x"]);
  // The book moves on from the usable revision.
  assert.equal((await obs(redis, K, 0.4, 2))?.rev, 3);
});
