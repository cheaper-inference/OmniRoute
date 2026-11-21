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
import { runFakeLedgerScript } from "./helpers/fakeRedisLedgerScripts.ts";

// DATA_DIR must be set before any DB module is imported.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-percent-ledger-stores-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
const { RedisQuotaStore } = await import("../../src/lib/quota/redisQuotaStore.ts");
const { attributeBook, observeLedger, isLedgerCurrentWithoutReading } =
  await import("../../src/lib/quota/percentLedger.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ─── In-memory stand-in for the ioredis client ──────────────────────────────

const hashes = new Map<string, Map<string, string>>();
/** Every command the store sends. `inScript` marks a command run by a script, not sent alone. */
const calls: Array<{ method: string; args: unknown[]; inScript: boolean }> = [];
let scriptDepth = 0;
function record(method: string, args: unknown[]): void {
  calls.push({ method, args, inScript: scriptDepth > 0 });
}
/**
 * One-shot hooks run inside the next hgetall / hincrbyfloat, before it acts (to interleave another
 * writer). A hook that returns a promise is awaited first; one that returns nothing is not, so a
 * microtask it queues runs after the command answered.
 */
type Hook = () => void | Promise<void>;
let beforeNextHgetall: Hook | null = null;

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
    record("hgetall", [key]);
    const hook = beforeNextHgetall;
    beforeNextHgetall = null;
    const pending = runHook(hook);
    if (pending) await pending;
    return Object.fromEntries(hashes.get(key) ?? []);
  },
  async hset(key: string, field: string, value: string): Promise<number> {
    record("hset", [key, field, value]);
    const hash = hashOf(key);
    const created = hash.has(field) ? 0 : 1;
    hash.set(field, value);
    return created;
  },
  async hsetnx(key: string, field: string, value: string): Promise<number> {
    record("hsetnx", [key, field, value]);
    const hash = hashOf(key);
    if (hash.has(field)) return 0;
    hash.set(field, value);
    return 1;
  },
  async hincrbyfloat(key: string, field: string, increment: number): Promise<string> {
    record("hincrbyfloat", [key, field, increment]);
    const hash = hashOf(key);
    const next = Number(hash.get(field) ?? "0") + increment;
    hash.set(field, String(next));
    return String(next);
  },
  async hdel(key: string, ...fields: string[]): Promise<number> {
    record("hdel", [key, ...fields]);
    const hash = hashes.get(key);
    return fields.filter((f) => hash?.delete(f)).length;
  },
  async expire(key: string, seconds: number): Promise<number> {
    record("expire", [key, seconds]);
    return hashes.has(key) ? 1 : 0;
  },
  async incrbyfloat(): Promise<string> {
    return "0";
  },
  async mget(...keys: string[]): Promise<Array<string | null>> {
    return keys.map(() => null);
  },
  async eval(script: string, numkeys: number, ...args: unknown[]): Promise<unknown> {
    record("eval", [script, numkeys, ...args]);
    scriptDepth += 1;
    try {
      return await runFakeLedgerScript(fake, script, numkeys, args);
    } finally {
      scriptDepth -= 1;
    }
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
  observeLedger(store, key, rd(used, atMin), T0 + atMin * MIN);
/** The book's parts at the default floor; the snapshot must hold a book. */
const parts = (snap: LedgerSnapshot | null) => {
  assert.ok(snap?.state, "a book");
  return attributeBook({ state: snap.state, counters: snap.counters }, 1000);
};
const keyOf = (poolId: string): LedgerKey => ({ poolId, connectionId: "c", window: "5h" });

function near(actual: number | undefined, expected: number, label: string): void {
  assert.ok(
    actual !== undefined && Math.abs(actual - expected) < 1e-9,
    `${label}: ${actual} ≈ ${expected}`
  );
}

/** Integers, times and marks compare exactly, fractions of the bar within 1e-9. */
function assertState(actual: LedgerState | null, expected: LedgerState, step: string): void {
  assert.ok(actual, `${step}: a book`);
  const { rev, resetAt, readAt, updatedAt, keys } = actual;
  assert.deepEqual(
    { rev, resetAt, readAt, updatedAt, keys },
    {
      rev: expected.rev,
      resetAt: expected.resetAt,
      readAt: expected.readAt,
      updatedAt: expected.updatedAt,
      keys: expected.keys,
    },
    step
  );
  near(actual.last, expected.last, `${step} last`);
  near(actual.baseline, expected.baseline, `${step} baseline`);
}

/** Parts per key and external, each within 1e-9. */
function assertParts(
  snap: LedgerSnapshot | null,
  byKey: Record<string, number>,
  external: number,
  step: string
): void {
  const out = parts(snap);
  assert.deepEqual(Object.keys(out.internalByKey).sort(), Object.keys(byKey).sort(), step);
  for (const [k, v] of Object.entries(byKey)) near(out.internalByKey[k], v, `${step} ${k}`);
  near(out.external, external, `${step} external`);
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

/** The fixed five-step script; each step checks the state and the parts of what ledgerRead returns. */
async function runScriptedScenario(store: QuotaStore, K: LedgerKey): Promise<void> {
  const at = (m: number) => T0 + m * MIN;
  const read = () => store.ledgerRead(K);

  await store.ledgerRecordTokens(K.poolId, K.connectionId, "a", 900_000, T0);
  await store.ledgerRecordTokens(K.poolId, K.connectionId, "b", 100_000, T0);
  await obs(store, K, 0.1, 0);
  const step1: LedgerState = {
    rev: 1,
    last: 0.1,
    baseline: 0.1,
    resetAt: null,
    readAt: T0,
    updatedAt: T0,
    keys: { a: { startTokens: 900_000 }, b: { startTokens: 100_000 } },
  };
  assertState((await read()).state, step1, "step 1");
  assertParts(await read(), {}, 0.1, "step 1");

  await store.ledgerRecordTokens(K.poolId, K.connectionId, "a", 30_000, at(1));
  await store.ledgerRecordTokens(K.poolId, K.connectionId, "b", 10_000, at(1));
  await obs(store, K, 0.14, 1);
  const step2: LedgerState = { ...step1, rev: 2, last: 0.14, readAt: at(1), updatedAt: at(1) };
  assertState((await read()).state, step2, "step 2");
  assertParts(await read(), { a: 0.03, b: 0.01 }, 0.1, "step 2");

  const { wrapped, n } = counting(store);
  await obs(wrapped, K, 0.14, 2);
  assert.deepEqual([n.reads, n.commits], [1, 0], "step 3: one read, no write");
  assertState((await read()).state, step2, "step 3");

  await obs(store, K, 0.135, 5); // a drop of at most one point is not applied
  assertState((await read()).state, step2, "step 4");
  assertParts(await read(), { a: 0.03, b: 0.01 }, 0.1, "step 4");

  await store.ledgerRecordTokens(K.poolId, K.connectionId, "a", 5_000, at(6));
  await obs(store, K, 0.02, 10);
  assertState(
    (await read()).state,
    {
      rev: 3,
      last: 0.02,
      baseline: 0.02,
      resetAt: null,
      readAt: at(10),
      updatedAt: at(10),
      keys: { a: { startTokens: 935_000 }, b: { startTokens: 110_000 } },
    },
    "step 5"
  );
  assertParts(await read(), {}, 0.02, "step 5");
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
    assert.deepEqual([n.reads, n.commits, out?.state.rev, out?.state.updatedAt], [1, 0, 1, T0]);
  });

  test(`${name}: no reading means one read and the stored snapshot`, async () => {
    const store = make();
    const K2 = keyOf(`p2-none-${name}`);
    const { wrapped, n } = counting(store);
    assert.equal(await observeLedger(wrapped, K2, null, T0), null);
    await obs(store, K2, 0.1, 0);
    const out = await observeLedger(wrapped, K2, null, T0 + 9 * MIN);
    assert.deepEqual(out, await store.ledgerRead(K2));
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
        observeLedger(store, K3, { used: 0.01 * (i + 1), resetAt: null, fetchedAt: T0 + i }, T0)
      ),
    ]);
    const snap = await store.ledgerRead(K3);
    assert.deepEqual([snap.counters.a.tokens, snap.counters.b.tokens], [100_000, 100_000]);
    const mid = parts(snap);
    near(mid.internal + mid.external, snap.state!.last, "internal + external");
    const end = await observeLedger(
      store,
      K3,
      { used: 0.5, resetAt: null, fetchedAt: T0 + 1_000 },
      T0
    );
    assert.deepEqual(end?.counters, (await store.ledgerRead(K3)).counters);
    near(end?.state.last, 0.5, "last");
    const out = parts(end);
    near(out.internal + out.external, 0.5, "internal + external");
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
    assert.deepEqual([out?.state.rev, out?.state.last, out?.state.baseline], [3, 0.3, 0.1]);
    // The book opened before a routed anything: a counts from zero and explains the whole growth.
    assertParts(out, { a: 0.2 }, 0.1, "after the retry");
    assert.deepEqual(out, await store.ledgerRead(K4));
  });

  test(`${name}: out-of-order readings keep the newest state`, async () => {
    const store = make();
    const K5 = keyOf(`p5-${name}`);
    await obs(store, K5, 0.1, 0);
    await obs(store, K5, 0.7, 10);
    assert.equal((await obs(store, K5, 0.6, 9))?.state.last, 0.7); // older reading
    assert.equal((await obs(store, K5, 0.6, 11))?.state.last, 0.7); // drop not yet confirmed
    const turned = (await obs(store, K5, 0.6, 12))?.state; // two minutes newer: the window turned
    assert.deepEqual([turned?.last, turned?.baseline, turned?.rev], [0.6, 0.6, 3]);
  });

  test(`${name}: a missing book counts as revision 0: only revision 1 creates it`, async () => {
    const store = make();
    const K6 = keyOf(`p6-${name}`);
    const s = (rev: number): LedgerState => ({
      rev,
      last: 0.2,
      baseline: 0.2,
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
      [0.2, 0.3].map((last) => store.ledgerCommit(K7, { ...base, rev: 2, last, readAt: T0 + MIN }))
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
      baseline: 0.1,
      resetAt: null,
      readAt: T0,
      updatedAt: T0,
      keys: { a: { startTokens: 10 } },
    };
    for (const over of [
      { last: Number.NaN },
      { baseline: Infinity },
      { baseline: -0.1 },
      { readAt: Number.NaN },
      { updatedAt: Infinity },
      { resetAt: Number.NaN },
      { rev: Infinity },
      { keys: { a: { startTokens: Infinity } } },
      { keys: { a: { startTokens: Number.NaN } } },
      { keys: { a: { startTokens: -1 } } },
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
      const label = `seed ${seed} step ${i}`;
      const fromSqlite = await observeLedger(sqlite, key, reading, now);
      const fromRedis = await observeLedger(redis, key, reading, now);
      assert.deepEqual(fromRedis, fromSqlite, label);
      const [readSqlite, readRedis] = [await sqlite.ledgerRead(key), await redis.ledgerRead(key)];
      assert.deepEqual(readRedis, readSqlite, label);
      const [partsSqlite, partsRedis] = [parts(readSqlite), parts(readRedis)];
      assert.deepEqual(partsRedis, partsSqlite, label);
      near(partsSqlite.internal + partsSqlite.external, readSqlite.state!.last, label);
    }
    assert.deepEqual(await redis.ledgerRead(key), await sqlite.ledgerRead(key), `seed ${seed}`);
  }
});

test("without a reading, a book counts as current only until its reset time or for 15 minutes", () => {
  const book = (resetAt: number | null): LedgerState => ({
    rev: 1,
    last: 0.4,
    baseline: 0.1,
    resetAt,
    readAt: T0,
    updatedAt: T0,
    keys: { a: { startTokens: 30_000 } },
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
    await observeLedger(store, timed, rd(0.3, 0, R), T0);
    await obs(store, untimed, 0.3, 0);
    const storedTimed = await store.ledgerRead(timed);
    const storedUntimed = await store.ledgerRead(untimed);

    assert.deepEqual(await observeLedger(store, timed, null, R - 1), storedTimed);
    assert.equal(await observeLedger(store, timed, null, R), null);
    assert.deepEqual(await observeLedger(store, untimed, null, T0 + 14 * MIN), storedUntimed);
    assert.equal(await observeLedger(store, untimed, null, T0 + 16 * MIN), null);
    // The stored books are left as they were.
    assert.deepEqual(await store.ledgerRead(timed), storedTimed);
    assert.deepEqual(await store.ledgerRead(untimed), storedUntimed);
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
  const before = await sqlite.ledgerRead(K);
  assert.ok(before.state);
  // The commit rejects: the snapshot read before it.
  assert.deepEqual(
    await obs({ ledgerRead: (k) => sqlite.ledgerRead(k), ledgerCommit: boom }, K, 0.9, 20),
    before
  );
  // The commit loses and the second read rejects: the snapshot of the first read.
  let reads = 0;
  const flaky: LedgerStore = {
    ledgerRead: async (k) => (reads++ === 0 ? sqlite.ledgerRead(k) : boom()),
    ledgerCommit: async () => false,
  };
  assert.deepEqual(await obs(flaky, K, 0.9, 20), before);
  // A snapshot the transition cannot use.
  const broken = { state: null, counters: null } as unknown as LedgerSnapshot;
  assert.equal(await obs({ ledgerRead: async () => broken, ledgerCommit: boom }, K, 0.9, 20), null);
  assert.deepEqual(await sqlite.ledgerRead(K), before);
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
    ["s:5h:3"]
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

  hash.set("s:5h:1", hash.get("s:5h:3")!.replace('"rev":3', '"rev":1'));
  calls.length = 0;
  const snap = await redis.ledgerRead(K);
  assert.equal(snap.state?.rev, 3);
  assert.deepEqual(
    calls.filter((c) => c.method === "hdel").map((c) => c.args),
    [[hashKey, "s:5h:1"]]
  );
});

test("redis: each book write sets the hash expiry in the same call as the write", async () => {
  const redis = redisWithFakeClient();
  const K = keyOf("p-redis-atomic-expiry");
  const hashKey = `${process.env.REDIS_KEY_PREFIX?.trim() || "omniroute:"}quota-ledger:${K.poolId}:c`;
  const TTL = 5_184_000;
  const sentAlone = () => calls.filter((c) => !c.inScript && c.method !== "hgetall");
  const runByScript = () => {
    const ran = calls.filter((c) => c.inScript);
    assert.ok(
      ran.every((c) => c.args[0] === hashKey),
      "the script writes the book's hash"
    );
    return ran.map((c) => [c.method, c.args[1]]);
  };

  calls.length = 0;
  await redis.ledgerRecordTokens(K.poolId, K.connectionId, "a", 10_000, T0);
  assert.deepEqual(
    sentAlone().map((c) => c.method),
    ["eval"],
    "the token write and its expiry are one call"
  );
  assert.match(String(sentAlone()[0].args[0]), /"EXPIRE", KEYS\[1\]/);
  assert.deepEqual(runByScript(), [
    ["hset", "u:a"],
    ["hincrbyfloat", "t:a"],
    ["expire", TTL],
  ]);

  calls.length = 0;
  assert.equal((await obs(redis, K, 0.1, 0))?.state.rev, 1);
  assert.deepEqual(
    sentAlone().map((c) => c.method),
    ["eval"],
    "the commit and its expiry are one call"
  );
  assert.match(String(sentAlone()[0].args[0]), /"EXPIRE", KEYS\[1\]/);
  assert.deepEqual(runByScript(), [
    ["hsetnx", "s:5h:1"],
    ["expire", TTL],
  ]);

  // The removal of the superseded revision stays a separate best-effort call.
  calls.length = 0;
  assert.equal((await obs(redis, K, 0.3, 1))?.state.rev, 2);
  assert.deepEqual(
    sentAlone().map((c) => c.method),
    ["eval", "hdel"]
  );
  assert.deepEqual(runByScript(), [
    ["hsetnx", "s:5h:2"],
    ["expire", TTL],
  ]);
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

test("redis: a commit overtaken before its confirmation is re-read, never applied twice", async () => {
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
    assert.equal(fromB?.state.rev, 3, "writer B builds rev 3 on writer A's rev 2");
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
  assert.deepEqual(out, await redis.ledgerRead(K));
  assert.deepEqual(
    [out.state.rev, out.state.last, out.state.baseline, out.state.readAt],
    [3, 0.25, 0.1, at(3)]
  );
  // Both keys routed after the book opened: the growth of 0.15 is split 50_000 : 30_000.
  assertParts(out, { a: 0.09375, b: 0.05625 }, 0.1, "after the spurious loss");
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
    hash.get("s:5h:2")!.replace(/"keys":\{.*\}\}$/, '"keys":{"a":{"startTokens":-1}}}')
  );
  assert.match(hash.get("s:5h:2")!, /"startTokens":-1/, "the stored entry was damaged");
  const snap = await redis.ledgerRead(K);
  assert.deepEqual(
    [snap.state?.rev, snap.state?.keys, snap.state?.last, snap.state?.baseline],
    [2, {}, 0.3, 0.1]
  );
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual([...hash.keys()].filter((f) => f.startsWith("s:")).sort(), ["s:5h:2", "s:5h:x"]);
  // The book moves on from the usable revision.
  assert.equal((await obs(redis, K, 0.4, 2))?.state.rev, 3);
});
