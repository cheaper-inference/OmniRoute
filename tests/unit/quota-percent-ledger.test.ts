/**
 * tests/unit/quota-percent-ledger.test.ts
 *
 * The percent attribution book keeps what aligns it with the provider's plan window: the figure
 * when it opened or last turned (baseline), the last applied figure, and per key the value of its
 * token counter at that moment. applyReading is its one state transition (a decision table where
 * the first matching row decides); attributeBook computes each key's part at read time, from the
 * growth since the baseline and the tokens each key routed since then; observeLedger runs the
 * read–apply–conditional-write loop over a store.
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  applyReading,
  attributeBook,
  observeLedger,
  type LedgerStore,
} from "../../src/lib/quota/percentLedger.ts";
import type {
  LedgerCounter,
  LedgerKey,
  LedgerSnapshot,
  LedgerState,
  PlanWindowReading,
} from "../../src/lib/quota/types.ts";

const T0 = 1_800_000_000_000;
const MIN = 60_000;
const H = 60 * MIN;
const R = T0 + 4 * H;

function st(over: Partial<LedgerState> = {}): LedgerState {
  return {
    rev: 3,
    last: 0.6,
    baseline: 0.1,
    resetAt: R,
    readAt: T0,
    updatedAt: T0,
    keys: { k1: { startTokens: 4_000 } },
    ...over,
  };
}

function rd(used: number, atMin: number, resetAt: number | null = R): PlanWindowReading {
  return { used, resetAt, fetchedAt: T0 + atMin * MIN };
}

function c(tokens: number, atMin = 0): LedgerCounter {
  return { tokens, updatedAt: T0 + atMin * MIN };
}

function run(
  state: LedgerState | null,
  counters: Record<string, LedgerCounter>,
  reading: PlanWindowReading,
  nowMin = (reading.fetchedAt - T0) / MIN
) {
  return applyReading({ state, counters }, reading, T0 + nowMin * MIN);
}

function near(actual: number | undefined, expected: number, label = ""): void {
  assert.ok(
    actual !== undefined && Math.abs(actual - expected) < 1e-9,
    `${label} expected ${expected}, got ${actual}`
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

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object") {
    for (const inner of Object.values(value)) deepFreeze(inner);
    Object.freeze(value);
  }
  return value;
}

// ─── applyReading ───────────────────────────────────────────────────────────

test("the first reading opens the book: the figure is the baseline and every counter is marked", () => {
  assert.deepEqual(run(null, { k1: c(70_000) }, rd(0.7, 0)), {
    changed: true,
    state: {
      rev: 1,
      last: 0.7,
      baseline: 0.7,
      resetAt: R,
      readAt: T0,
      updatedAt: T0,
      keys: { k1: { startTokens: 70_000 } },
    },
  });
});

test("a rise moves only the last figure: baseline and marks stay", () => {
  const before = st();
  const { state, changed } = run(before, { k1: c(9_000, 1) }, rd(0.65, 1));
  assert.equal(changed, true);
  assert.deepEqual(state, {
    rev: 4,
    last: 0.65,
    baseline: 0.1,
    resetAt: R,
    readAt: T0 + MIN,
    updatedAt: T0 + MIN,
    keys: { k1: { startTokens: 4_000 } },
  });
  assert.deepEqual(state.keys, before.keys);
});

test("a rise without a reset time keeps the stored one while it is ahead", () => {
  const kept = run(st(), {}, rd(0.65, 5, null)).state;
  assert.deepEqual([kept.last, kept.baseline, kept.resetAt, kept.rev], [0.65, 0.1, R, 4]);
});

test("an equal figure changes nothing, even with a reset time moving 20 minutes", () => {
  const before = st();
  for (const reading of [rd(0.6, 5), rd(0.6, 5, R + 20 * MIN), rd(0.6, 5, R - 20 * MIN)]) {
    const out = run(before, { k1: c(9_000, 4) }, reading);
    assert.equal(out.changed, false);
    assert.equal(out.state, before);
  }
});

test("an old reading is ignored: older than the last applied one, or from the previous provider window", () => {
  const older = st({ readAt: T0 + 10 * MIN });
  const out = run(older, {}, rd(0.9, 5));
  assert.deepEqual([out.changed, out.state === older], [false, true]);
  const before = st();
  const previous = run(before, {}, rd(0.9, 5, R - 5 * H));
  assert.deepEqual([previous.changed, previous.state === before], [false, true]);
});

test("a reset time that moved forward turns the window, even with a larger figure", () => {
  const { state, changed } = run(
    st({ last: 0.4 }),
    { k1: c(4_000), k2: c(50_000, 5) },
    rd(0.45, 5, R + 5 * H)
  );
  assert.equal(changed, true);
  assert.deepEqual(state, {
    rev: 4,
    last: 0.45,
    baseline: 0.45,
    resetAt: R + 5 * H,
    readAt: T0 + 5 * MIN,
    updatedAt: T0 + 5 * MIN,
    keys: { k1: { startTokens: 4_000 }, k2: { startTokens: 50_000 } },
  });
});

test("a reset time 20 or 30 minutes later is not a turn: the rise is an ordinary rise", () => {
  for (const reset of [R + 20 * MIN, R + 30 * MIN]) {
    const { state } = run(
      st({ last: 0.4 }),
      { k1: c(4_000), k2: c(50_000, 5) },
      rd(0.45, 5, reset)
    );
    assert.deepEqual(state, {
      rev: 4,
      last: 0.45,
      baseline: 0.1,
      resetAt: reset,
      readAt: T0 + 5 * MIN,
      updatedAt: T0 + 5 * MIN,
      keys: { k1: { startTokens: 4_000 } },
    });
  }
});

test("a drop is not applied before a reading two minutes newer confirms it", () => {
  const before = st();
  for (const reading of [rd(0.3, 1), rd(0.3, 1, null), rd(0, 1, null)]) {
    const out = run(before, {}, reading);
    assert.deepEqual([out.changed, out.state === before], [false, true]);
  }
});

test("a drop inside a window the provider still reports as open changes nothing, whatever its size", () => {
  const before = st();
  for (const reading of [rd(0.3, 5), rd(0, 5), rd(0.59, 5), rd(0.3, 5, R + 20 * MIN)]) {
    const out = run(before, { k1: c(10_000, 4) }, reading);
    assert.deepEqual([out.changed, out.state === before], [false, true]);
  }
});

test("a drop of one point or less changes nothing when a reset time is missing", () => {
  // With the stored reset time already passed the same reading turns the book (row 3b, below).
  for (const [before, reading] of [
    [st(), rd(0.59, 5, null)],
    [st({ resetAt: null }), rd(0.59, 5)],
  ] as const) {
    const out = run(before, { k1: c(10_000, 4) }, reading);
    assert.deepEqual([out.changed, out.state === before], [false, true]);
  }
});

test("a larger confirmed drop turns the window when no reset time says otherwise", () => {
  for (const [before, reading, resetAt] of [
    [
      st({ keys: { k1: { startTokens: 4_000 }, gone: { startTokens: 7 } } }),
      rd(0.589, 5, null),
      null,
    ],
    [
      st({ resetAt: null, keys: { k1: { startTokens: 4_000 }, gone: { startTokens: 7 } } }),
      rd(0.589, 5),
      R,
    ],
    [
      st({ resetAt: T0 + 2 * MIN, keys: { k1: { startTokens: 4_000 }, gone: { startTokens: 7 } } }),
      rd(0.589, 5, T0 + 2 * MIN),
      null,
    ],
  ] as const) {
    const { state, changed } = run(before, { k1: c(10_000, 4) }, reading);
    assert.equal(changed, true);
    // The third pair: the stored reset time already passed (row 3b), and the reading's own reset
    // time is behind its data time, so it is not stored. A key without a counter leaves the book.
    assert.deepEqual(state, {
      rev: 4,
      last: 0.589,
      baseline: 0.589,
      resetAt,
      readAt: T0 + 5 * MIN,
      updatedAt: T0 + 5 * MIN,
      keys: { k1: { startTokens: 10_000 } },
    });
  }
});

test("an unusable counter is marked at 0 when the book opens or turns", () => {
  for (const odd of [Number.NaN, -1_000, Number.POSITIVE_INFINITY]) {
    const opened = run(null, { a: c(odd), b: c(5_000) }, rd(0.1, 0)).state;
    assert.deepEqual(opened.keys, { a: { startTokens: 0 }, b: { startTokens: 5_000 } });
    const turned = run(st(), { k1: c(odd, 4) }, rd(0.2, 5, R + 5 * H)).state;
    assert.deepEqual(turned.keys, { k1: { startTokens: 0 } });
  }
});

// ─── Row 3b: the stored window has ended ────────────────────────────────────

const COUNTERS = { k1: c(10_000, 4), k2: c(2_000, 4) };

/** The state a turn of st() at minute `atMin` produces with COUNTERS. */
function turnedAt(g: number, atMin: number, resetAt: number | null = null): LedgerState {
  return {
    rev: 4,
    last: g,
    baseline: g,
    resetAt,
    readAt: T0 + atMin * MIN,
    updatedAt: T0 + atMin * MIN,
    keys: { k1: { startTokens: 10_000 }, k2: { startTokens: 2_000 } },
  };
}

test("a passed stored reset time turns the book on a reading without one, whatever the figure", () => {
  for (const g of [0.65, 0.3, 0.6, 0.59]) {
    const out = run(st({ resetAt: T0 + MIN }), COUNTERS, rd(g, 5, null));
    assert.equal(out.changed, true, `figure ${g}`);
    assert.deepEqual(out.state, turnedAt(g, 5), `figure ${g}`);
  }
});

test("a reading carrying the passed reset time turns once; the next ones are ordinary rises", () => {
  const turned = run(st({ resetAt: T0 + MIN }), COUNTERS, rd(0.5, 5, T0 + MIN)).state;
  assert.deepEqual(turned, turnedAt(0.5, 5)); // the passed reset time is not stored
  const risen = run(turned, COUNTERS, rd(0.55, 6, T0 + MIN)).state;
  assert.deepEqual(risen, {
    ...turnedAt(0.5, 5),
    rev: 5,
    last: 0.55,
    readAt: T0 + 6 * MIN,
    updatedAt: T0 + 6 * MIN,
  });

  // The new window's reset time arrives: a rise records it, the turn's baseline stays.
  const timed = run(risen, COUNTERS, rd(0.6, 7, R)).state;
  assert.deepEqual([timed.rev, timed.last, timed.baseline, timed.resetAt], [6, 0.6, 0.5, R]);
  // An equal figure records the new reset time too, and changes nothing else.
  const equal = run(risen, COUNTERS, rd(0.55, 7, R));
  assert.deepEqual(equal, {
    changed: true,
    state: { ...risen, rev: 6, resetAt: R, updatedAt: T0 + 7 * MIN },
  });
});

test("an equal figure records a reset time the book lacks; the next reading after it turns the book", () => {
  const untimed = st({ resetAt: null, readAt: T0 + MIN });
  const learned = run(untimed, COUNTERS, rd(0.6, 5, R));
  assert.deepEqual(learned, {
    changed: true,
    state: { ...untimed, rev: 4, resetAt: R, updatedAt: T0 + 5 * MIN },
  });
  assert.equal(learned.state.keys, untimed.keys);

  // A higher figure after that reset time is a new window, not a rise of the old one.
  const afterReset = (R - T0) / MIN + 1;
  const next = run(learned.state, COUNTERS, rd(0.7, afterReset, null)).state;
  assert.deepEqual(
    [next.rev, next.last, next.baseline, next.resetAt, next.keys],
    [5, 0.7, 0.7, null, { k1: { startTokens: 10_000 }, k2: { startTokens: 2_000 } }]
  );
});

test("an equal figure keeps a reset time already stored, and a kept drop records none", () => {
  const timed = st();
  const same = run(timed, COUNTERS, rd(0.6, 5, R + 10 * MIN));
  assert.deepEqual([same.changed, same.state === timed], [false, true]);
  const untimed = st({ resetAt: null });
  const drop = run(untimed, COUNTERS, rd(0.4, 1, R));
  assert.deepEqual([drop.changed, drop.state === untimed], [false, true]);
});

test("row 3b boundary: a stored reset time equal to the data time turns; one millisecond later does not", () => {
  assert.deepEqual(
    run(st({ resetAt: T0 + 5 * MIN }), COUNTERS, rd(0.65, 5, null)).state,
    turnedAt(0.65, 5)
  );
  const ahead = run(st({ resetAt: T0 + 5 * MIN + 1 }), COUNTERS, rd(0.65, 5, null)).state;
  assert.deepEqual(
    [ahead.last, ahead.baseline, ahead.resetAt, ahead.keys],
    [0.65, 0.1, T0 + 5 * MIN + 1, { k1: { startTokens: 4_000 } }]
  );
});

test("a reading older than the last applied one is ignored even when the stored reset time passed", () => {
  const before = st({ resetAt: T0 + MIN, readAt: T0 + 10 * MIN });
  const out = run(before, COUNTERS, rd(0.9, 5, null), 20);
  assert.deepEqual([out.changed, out.state === before], [false, true]);
});

test("a rise does not store a reading's reset time that is already behind its data time", () => {
  const untimed = run(st({ resetAt: null }), {}, rd(0.65, 5, T0 + 2 * MIN)).state;
  assert.deepEqual([untimed.last, untimed.resetAt], [0.65, null]);
  // Stored reset still ahead, the reading's own reset time behind its data time: the stored one stays.
  const kept = run(st({ resetAt: T0 + 6 * MIN }), {}, rd(0.65, 5, T0 + 4 * MIN)).state;
  assert.deepEqual([kept.last, kept.baseline, kept.resetAt], [0.65, 0.1, T0 + 6 * MIN]);
});

test("opening a book does not store a reading's reset time that is behind its data time", () => {
  const opened = run(null, COUNTERS, rd(0.4, 5, T0 + 4 * MIN)).state;
  assert.deepEqual([opened.last, opened.baseline, opened.resetAt], [0.4, 0.4, null]);
});

test("a reset time equal to the reading's data time is not stored: it must be strictly ahead", () => {
  const opened = run(null, COUNTERS, rd(0.4, 5, T0 + 5 * MIN)).state;
  assert.deepEqual([opened.last, opened.resetAt], [0.4, null]);
});

// ─── Boundaries of rows 2, 3, 4, 6 and 7 ────────────────────────────────────

test("row 2 boundary: a reset time exactly 30 minutes back is not old; one millisecond more is", () => {
  const notOld = run(st(), {}, rd(0.65, 5, R - 30 * MIN));
  assert.deepEqual(
    [notOld.changed, notOld.state.last, notOld.state.resetAt],
    [true, 0.65, R - 30 * MIN]
  );
  const before = st();
  const old = run(before, {}, rd(0.65, 5, R - 30 * MIN - 1));
  assert.deepEqual([old.changed, old.state === before], [false, true]);
});

test("row 3 boundary: a reset time 30 minutes and one millisecond ahead turns", () => {
  assert.deepEqual(
    run(st(), COUNTERS, rd(0.65, 5, R + 30 * MIN + 1)).state,
    turnedAt(0.65, 5, R + 30 * MIN + 1)
  );
});

test("row 4 boundary: a rise of exactly 1e-9 changes nothing; just above it is a rise", () => {
  const flat = st({ last: 0, baseline: 0 });
  const tiny = run(flat, {}, rd(1e-9, 5));
  assert.deepEqual([tiny.changed, tiny.state === flat], [false, true]);
  const above = run(flat, {}, rd(2e-9, 5));
  assert.deepEqual([above.changed, above.state.last], [true, 2e-9]);
});

test("row 6 boundary: a drop exactly two minutes newer is applied; one millisecond less is kept", () => {
  const before = st({ resetAt: null });
  const at = (fetchedAt: number): PlanWindowReading => ({ used: 0.3, resetAt: null, fetchedAt });
  assert.deepEqual(run(before, COUNTERS, at(T0 + 2 * MIN)).state, turnedAt(0.3, 2));
  const kept = run(before, COUNTERS, at(T0 + 2 * MIN - 1));
  assert.deepEqual([kept.changed, kept.state === before], [false, true]);
});

test("row 7 boundary: a reset time exactly 30 minutes back still names the same open window", () => {
  const before = st();
  const out = run(before, COUNTERS, rd(0.3, 5, R - 30 * MIN));
  assert.deepEqual([out.changed, out.state === before], [false, true]);
});

test("applyReading never mutates its input", () => {
  const cases: Array<[string, LedgerState | null, PlanWindowReading]> = [
    ["open", null, rd(0.4, 5)],
    ["rise", st(), rd(0.7, 5)],
    ["turn", st(), rd(0.5, 5, R + 5 * H)],
  ];
  for (const [row, state, reading] of cases) {
    const snapshot = deepFreeze({ state, counters: { k1: c(10_000, 4), k2: c(2_000, 5) } });
    const copy = structuredClone(snapshot);
    const out = applyReading(snapshot, reading, T0 + 5 * MIN);
    assert.equal(out.changed, true, row);
    assert.deepEqual(snapshot, copy, row);
  }
});

// ─── attributeBook ──────────────────────────────────────────────────────────

const book = st({
  last: 0.6,
  baseline: 0.1,
  keys: { a: { startTokens: 1_000_000 }, b: { startTokens: 0 } },
});

function attr(counters: Record<string, number>, floor = 1000) {
  const entries = Object.entries(counters).map(([k, tokens]) => [k, c(tokens)]);
  return attributeBook({ state: book, counters: Object.fromEntries(entries) }, floor);
}

function assertAttribution(
  actual: ReturnType<typeof attributeBook>,
  expected: { byKey: Record<string, number>; internal: number; external: number },
  label: string
): void {
  assert.deepEqual(
    Object.keys(actual.internalByKey).sort(),
    Object.keys(expected.byKey).sort(),
    label
  );
  for (const [k, v] of Object.entries(expected.byKey))
    near(actual.internalByKey[k], v, `${label} ${k}`);
  near(actual.internal, expected.internal, `${label} internal`);
  near(actual.external, expected.external, `${label} external`);
}

test("the growth since the baseline is split by the tokens each key routed since the book started", () => {
  assertAttribution(
    attr({ a: 1_900_000, b: 100_000 }),
    { byKey: { a: 0.45, b: 0.05 }, internal: 0.5, external: 0.1 },
    "both keys"
  );
});

test("tokens explain at most one point per floor of tokens; the rest is external", () => {
  assertAttribution(
    attr({ a: 1_000_300 }),
    { byKey: { a: 0.003 }, internal: 0.003, external: 0.597 },
    "300 tokens"
  );
  assertAttribution(
    attr({ a: 1_900_000, b: 100_000 }, 50_000),
    { byKey: { a: 0.18, b: 0.02 }, internal: 0.2, external: 0.4 },
    "floor 50000"
  );
});

test("without tokens since the book started, everything is external", () => {
  assertAttribution(attr({}), { byKey: {}, internal: 0, external: 0.6 }, "no counters");
  assertAttribution(
    attr({ a: 1_000_000, b: 0 }),
    { byKey: {}, internal: 0, external: 0.6 },
    "at the marks"
  );
});

test("a counter below its mark restarted and counts in full; a new key counts from zero", () => {
  assertAttribution(
    attr({ a: 3_000 }),
    { byKey: { a: 0.03 }, internal: 0.03, external: 0.57 },
    "restart"
  );
  assertAttribution(
    attr({ n: 2_000 }),
    { byKey: { n: 0.02 }, internal: 0.02, external: 0.58 },
    "new key"
  );
});

test("an unusable counter counts as 0, and a key of the book without a counter has no part", () => {
  for (const odd of [Number.NaN, -5, Number.POSITIVE_INFINITY]) {
    assertAttribution(
      attr({ a: odd, b: 100_000 }),
      { byKey: { b: 0.5 }, internal: 0.5, external: 0.1 },
      `a = ${odd}`
    );
  }
  assertAttribution(
    attr({ b: 1_000 }),
    { byKey: { b: 0.01 }, internal: 0.01, external: 0.59 },
    "no a"
  );
});

test("a floor that is not a finite number of at least 1 falls back to 1000 tokens per point", () => {
  for (const floor of [0, Number.NaN, -1_000, 0.5, Number.POSITIVE_INFINITY]) {
    assertAttribution(
      attr({ a: 1_000_300 }, floor),
      { byKey: { a: 0.003 }, internal: 0.003, external: 0.597 },
      `floor ${floor}`
    );
  }
});

test("over generated sequences, internal plus external equals the last figure and no part is negative", () => {
  for (let seed = 1; seed <= 40; seed++) {
    const rand = mulberry32(seed);
    let state: LedgerState | null = null;
    let now = T0;
    const counters: Record<string, LedgerCounter> = {};
    for (let i = 0; i < 80; i++) {
      now += Math.floor(rand() * 20 * MIN);
      if (rand() < 0.5) {
        const k = `k${Math.floor(rand() * 4)}`;
        counters[k] = {
          tokens: rand() < 0.05 ? 1 : (counters[k]?.tokens ?? 0) + 1 + Math.floor(rand() * 200_000),
          updatedAt: now,
        };
        continue;
      }
      const reading = {
        used: Math.floor(rand() * 201) / 200,
        resetAt: [null, R, R + 5 * H][Math.floor(rand() * 3)],
        fetchedAt: now,
      };
      state = applyReading({ state, counters }, reading, now).state;
      const out = attributeBook({ state, counters }, 1000);
      const label = `seed ${seed} step ${i}`;
      near(out.internal + out.external, state.last, label);
      assert.ok(out.internal >= 0 && out.external >= 0, label);
      assert.ok(
        Object.values(out.internalByKey).every((v) => v >= 0),
        label
      );
      assert.ok(state.baseline <= state.last + 1e-9, label);
      const byKeySum = Object.values(out.internalByKey).reduce((a, v) => a + v, 0);
      near(byKeySum, out.internal, `${label} sum of internalByKey`);
      assert.ok(out.internal <= Math.max(0, state.last - state.baseline) + 1e-9, label);
      assert.ok(out.internal <= tokensSinceMarks(state, counters) / 1000 / 100 + 1e-9, label);
    }
  }
});

/** Tokens since each key's mark, computed independently of attributeBook. */
function tokensSinceMarks(state: LedgerState, counters: Record<string, LedgerCounter>): number {
  let total = 0;
  for (const [k, counter] of Object.entries(counters)) {
    const tokens = Number.isFinite(counter.tokens) && counter.tokens >= 0 ? counter.tokens : 0;
    const mark = state.keys[k]?.startTokens ?? 0;
    total += tokens >= mark ? tokens - mark : tokens;
  }
  return total;
}

// ─── observeLedger ──────────────────────────────────────────────────────────

const KEY: LedgerKey = { poolId: "p", connectionId: "c", window: "5h" };

/** A store of the three book methods, in memory: counters add up, commit is compare-and-set. */
function memoryStore() {
  let state: LedgerState | null = null;
  const counters: Record<string, LedgerCounter> = {};
  const n = { reads: 0, commits: 0 };
  const store = {
    n,
    async ledgerRecordTokens(
      _p: string,
      _c: string,
      apiKeyId: string,
      tokens: number,
      nowMs: number
    ) {
      counters[apiKeyId] = { tokens: (counters[apiKeyId]?.tokens ?? 0) + tokens, updatedAt: nowMs };
    },
    async ledgerRead(_key: LedgerKey): Promise<LedgerSnapshot> {
      n.reads++;
      return structuredClone({ state, counters });
    },
    async ledgerCommit(_key: LedgerKey, next: LedgerState): Promise<boolean> {
      n.commits++;
      if ((state?.rev ?? 0) !== next.rev - 1) return false;
      state = structuredClone(next);
      return true;
    },
  };
  return store;
}

const boom = async (): Promise<never> => {
  throw new Error("store down");
};

test("observeLedger returns the state after the observation with the counters of the same read", async () => {
  const store = memoryStore();
  await store.ledgerRecordTokens("p", "c", "a", 10_000, T0);
  const opened = await observeLedger(store, KEY, rd(0.2, 0), T0);
  assert.deepEqual(opened, {
    state: {
      rev: 1,
      last: 0.2,
      baseline: 0.2,
      resetAt: R,
      readAt: T0,
      updatedAt: T0,
      keys: { a: { startTokens: 10_000 } },
    },
    counters: { a: c(10_000) },
  });
  // Tokens written between the read and the commit are not in the returned counters.
  await store.ledgerRecordTokens("p", "c", "a", 5_000, T0 + MIN);
  const racing: LedgerStore = {
    ledgerRead: (k) => store.ledgerRead(k),
    ledgerCommit: async (k, s) => {
      await store.ledgerRecordTokens("p", "c", "a", 1_000_000, T0 + 2 * MIN);
      return store.ledgerCommit(k, s);
    },
  };
  const risen = await observeLedger(racing, KEY, rd(0.3, 2), T0 + 2 * MIN);
  assert.deepEqual(
    [risen?.state.rev, risen?.state.last, risen?.counters],
    [2, 0.3, { a: c(15_000, 1) }]
  );
});

test("observeLedger without a reading returns the stored book only while it is current", async () => {
  const store = memoryStore();
  assert.equal(await observeLedger(store, KEY, null, T0), null); // no book
  await observeLedger(store, KEY, rd(0.2, 0, T0 + H), T0);
  const stored = await store.ledgerRead(KEY);
  assert.deepEqual(await observeLedger(store, KEY, null, T0 + H - 1), stored);
  assert.equal(await observeLedger(store, KEY, null, T0 + H), null);

  const untimed = memoryStore();
  await observeLedger(untimed, KEY, rd(0.2, 0, null), T0);
  assert.ok(await observeLedger(untimed, KEY, null, T0 + 15 * MIN));
  assert.equal(await observeLedger(untimed, KEY, null, T0 + 16 * MIN), null);
});

test("observeLedger after the stored reset time: a newer reading turns the book; a kept one is not charged", async () => {
  const store = memoryStore();
  await observeLedger(store, KEY, rd(0.2, 0, T0 + H), T0);
  const ahead = await observeLedger(store, KEY, rd(0.2, 30, T0 + H), T0 + 30 * MIN);
  assert.deepEqual(ahead, await store.ledgerRead(KEY));
  // Safety net: a reading whose data time is before the stored reset time, served after it, is
  // kept (nothing to write), and the book of the ended window is not charged.
  const commits = store.n.commits;
  assert.equal(await observeLedger(store, KEY, rd(0.2, 20, T0 + H), T0 + 61 * MIN), null);
  assert.equal(store.n.commits, commits);
  // A reading taken after the stored reset time turns the book (row 3b): usable again.
  const turned = await observeLedger(store, KEY, rd(0.2, 61, T0 + H), T0 + 61 * MIN);
  assert.deepEqual(
    [turned?.state.rev, turned?.state.baseline, turned?.state.resetAt],
    [2, 0.2, null]
  );
  assert.deepEqual(turned, await store.ledgerRead(KEY));
});

test("observeLedger: a reading taken just before the stored reset and observed after it is not charged", async () => {
  const store = memoryStore();
  await observeLedger(store, KEY, rd(0.2, 0, T0 + H), T0);
  await observeLedger(store, KEY, rd(0.3, 30, T0 + H), T0 + 30 * MIN); // readAt = minute 30
  const before = await store.ledgerRead(KEY);
  assert.deepEqual([before.state?.readAt, before.state?.resetAt], [T0 + 30 * MIN, T0 + H]);
  // Data time minute 59.5 (the stored reset is still ahead of it), clock at minute 60.2, same
  // figure: the transition keeps the book, and the book of the ended window is not charged.
  const observed = await observeLedger(store, KEY, rd(0.3, 59.5, T0 + H), T0 + 60.2 * MIN);
  assert.equal(observed, null);
  assert.deepEqual(await store.ledgerRead(KEY), before);
});

test("observeLedger never throws: a failed read gives null, a failed commit gives the snapshot read", async () => {
  assert.equal(
    await observeLedger({ ledgerRead: boom, ledgerCommit: boom }, KEY, rd(0.2, 0), T0),
    null
  );
  const store = memoryStore();
  await observeLedger(store, KEY, rd(0.2, 0), T0);
  const read = await store.ledgerRead(KEY);
  const failing: LedgerStore = { ledgerRead: (k) => store.ledgerRead(k), ledgerCommit: boom };
  assert.deepEqual(await observeLedger(failing, KEY, rd(0.5, 5), T0 + 5 * MIN), read);
  const broken = { state: null, counters: null } as unknown as LedgerSnapshot;
  assert.equal(
    await observeLedger(
      { ledgerRead: async () => broken, ledgerCommit: boom },
      KEY,
      rd(0.2, 0),
      T0
    ),
    null
  );
});

test("observeLedger retries exactly once after a lost commit", async () => {
  const store = memoryStore();
  await observeLedger(store, KEY, rd(0.1, 0), T0);
  // Another writer stores rev 2 after this observer's first read.
  let first = true;
  const racing: LedgerStore = {
    ledgerRead: async (k) => {
      const snap = await store.ledgerRead(k);
      if (first) {
        first = false;
        await observeLedger(store, k, rd(0.2, 1), T0 + MIN);
      }
      return snap;
    },
    ledgerCommit: (k, s) => store.ledgerCommit(k, s),
  };
  const out = await observeLedger(racing, KEY, rd(0.3, 2), T0 + 2 * MIN);
  assert.deepEqual([out?.state.rev, out?.state.last, out?.state.baseline], [3, 0.3, 0.1]);
  assert.deepEqual(out, await store.ledgerRead(KEY));

  // Every commit loses: two reads, two commits, and the state of the second read.
  const reads: LedgerSnapshot[] = [];
  let commits = 0;
  const losing: LedgerStore = {
    ledgerRead: async (k) => {
      const snap = await store.ledgerRead(k);
      reads.push(snap);
      return snap;
    },
    ledgerCommit: async () => {
      commits++;
      return false;
    },
  };
  const lost = await observeLedger(losing, KEY, rd(0.4, 3), T0 + 3 * MIN);
  assert.deepEqual([reads.length, commits], [2, 2]);
  assert.equal(lost, reads[1]);
});
