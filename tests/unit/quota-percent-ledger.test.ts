/**
 * tests/unit/quota-percent-ledger.test.ts
 *
 * applyReading is the one state transition of the percent attribution book:
 * the first reading is an external baseline, a rise is explained by pending
 * tokens up to the per-point floor (the rest is external), a small or
 * same-window drop rescales, and a provider window turn starts over. It is pure:
 * an unchanged result is the very same state object.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { applyReading } from "../../src/lib/quota/percentLedger.ts";
import type { LedgerCounter, LedgerState, PlanWindowReading } from "../../src/lib/quota/types.ts";

const T0 = 1_800_000_000_000;
const MIN = 60_000;
const H = 60 * MIN;
const R = T0 + 4 * H;

function st(over: Partial<LedgerState> = {}): LedgerState {
  return {
    rev: 3,
    last: 0.6,
    external: 0.12,
    resetAt: R,
    readAt: T0,
    updatedAt: T0,
    keys: { k1: { attributed: 0.48, seenTokens: 4_000 } },
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
  return applyReading({ state, counters }, reading, T0 + nowMin * MIN, 1000);
}

function near(actual: number, expected: number): void {
  assert.ok(Math.abs(actual - expected) < 1e-9, `expected ${expected}, got ${actual}`);
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

test("the first observation is a baseline, even with tokens already routed", () => {
  const out = run(null, { k1: c(70_000) }, rd(0.7, 0));
  assert.deepEqual(out, {
    changed: true,
    state: {
      rev: 1,
      last: 0.7,
      external: 0.7,
      resetAt: R,
      readAt: T0,
      updatedAt: T0,
      keys: { k1: { attributed: 0, seenTokens: 70_000 } },
    },
  });
  const same = run(out.state, { k1: c(140_000, 1) }, rd(0.7, 1)); // 70k routed after the baseline, bar unchanged
  assert.equal(same.changed, false);
  assert.equal(same.state, out.state);
  const next = run(out.state, { k1: c(140_000, 1) }, rd(0.71, 2));
  near(next.state.keys.k1.attributed, 0.01);
  near(next.state.external, 0.7);
  assert.equal(next.state.keys.k1.seenTokens, 140_000);
});

test("a small request explains at most tokens/floor; the rest is external", () => {
  const { state } = run(st({ last: 0.1, external: 0.1, keys: {} }), { k1: c(500, 1) }, rd(0.3, 1));
  near(state.keys.k1.attributed, 0.005);
  near(state.external, 0.295);
  near(state.last, 0.3);
});

test("a rise is shared by pending tokens", () => {
  const { state } = run(
    st({ last: 0, external: 0, keys: {} }),
    { k1: c(900_000, 1), k2: c(100_000, 1) },
    rd(0.6, 1)
  );
  near(state.keys.k1.attributed, 0.54);
  near(state.keys.k2.attributed, 0.06);
  near(state.external, 0);
});

test("a reset time that moved forward turns the window even when the bar did not drop", () => {
  const before = st({
    last: 0.4,
    external: 0.1,
    keys: { k1: { attributed: 0.3, seenTokens: 4_000 } },
  });
  const { state } = run(before, { k1: c(4_000), k2: c(50_000, 5) }, rd(0.45, 5, R + 5 * H));
  near(state.keys.k1.attributed, 0);
  near(state.keys.k2.attributed, 0.45);
  near(state.external, 0);
  assert.deepEqual([state.last, state.resetAt], [0.45, R + 5 * H]);
});

test("a reset time within 30 minutes is jitter", () => {
  const before = st({
    last: 0.4,
    external: 0.1,
    keys: { k1: { attributed: 0.3, seenTokens: 4_000 } },
  });
  for (const reset of [R + 20 * MIN, R + 30 * MIN]) {
    const { state } = run(before, { k1: c(4_000), k2: c(50_000, 5) }, rd(0.45, 5, reset));
    near(state.keys.k1.attributed, 0.3);
    near(state.keys.k2.attributed, 0.05);
    near(state.external, 0.1);
  }
  assert.equal(run(before, {}, rd(0.4, 5, R + 20 * MIN)).changed, false); // equal figure: no write for a moving reset
});

test("reset time absent on one side never turns the window by itself", () => {
  assert.equal(run(st({ resetAt: null }), {}, rd(0.65, 5, R)).state.resetAt, R);
  const kept = run(st(), {}, rd(0.65, 5, null)).state;
  assert.deepEqual([kept.resetAt, kept.keys.k1.attributed], [R, 0.48]);
});

test("a drop of one point or less rescales and keeps pending tokens", () => {
  const { state } = run(st(), { k1: c(10_000, 4) }, rd(0.59, 5));
  near(state.keys.k1.attributed, 0.472);
  near(state.external, 0.118);
  assert.deepEqual([state.last, state.keys.k1.seenTokens], [0.59, 4_000]);
});

test("a larger drop turns the window when no reset time says otherwise", () => {
  for (const [before, reading] of [
    [st(), rd(0.589, 5, null)],
    [st({ resetAt: null }), rd(0.589, 5)],
    [st({ resetAt: T0 + 2 * MIN }), rd(0.589, 5, T0 + 2 * MIN)],
  ] as const) {
    const { state } = run(before, { k1: c(10_000, 4) }, reading); // third pair: the stored reset time already passed
    near(state.keys.k1.attributed, 0.06);
    near(state.external, 0.529);
    assert.equal(state.keys.k1.seenTokens, 10_000);
  }
});

test("a drop inside a window the provider still reports as open rescales, whatever its size", () => {
  const { state } = run(st(), { k1: c(10_000, 4) }, rd(0.3, 5)); // same reset time R, still ahead
  near(state.keys.k1.attributed, 0.24);
  near(state.external, 0.06);
  assert.deepEqual([state.last, state.keys.k1.seenTokens, state.resetAt], [0.3, 4_000, R]);
  near(run(st(), {}, rd(0, 5)).state.keys.k1.attributed, 0); // a drop to zero empties the book without dividing by zero
});

test("a drop is ignored until a reading two minutes newer confirms it", () => {
  assert.equal(run(st(), {}, rd(0.3, 1)).changed, false);
  assert.equal(run(st(), {}, rd(0.3, 1, null)).changed, false);
  assert.equal(run(st(), {}, rd(0.3, 2)).state.last, 0.3);
  assert.deepEqual(run(st(), {}, rd(0.3, 2, null)).state.keys, {}); // no reset time: a confirmed large drop turns the window
});

test("a reading older than the last applied one, or from the previous provider window, is ignored", () => {
  assert.equal(run(st({ readAt: T0 + 10 * MIN }), {}, rd(0.9, 5)).changed, false);
  assert.equal(run(st(), {}, rd(0.9, 5, R - 5 * H)).changed, false);
});

test("pending tokens older than 15 minutes are discarded at the observation", () => {
  const counters = { k1: c(50_000, 4), k2: c(50_000, 19), k3: c(10_000, 5) }; // at minute 20: 16, 1 and exactly 15 minutes old
  const { state } = run(st({ last: 0.2, external: 0.2, keys: {} }), counters, rd(0.3, 20));
  near(state.keys.k1.attributed, 0);
  near(state.keys.k2.attributed, 0.1 * (50 / 60));
  near(state.keys.k3.attributed, 0.1 * (10 / 60));
  assert.equal(state.keys.k1.seenTokens, 50_000);
});

test("a counter below its watermark counts as restarted", () => {
  const { state } = run(
    st({ last: 0.5, external: 0.5, keys: { k1: { attributed: 0, seenTokens: 5_000_000 } } }),
    { k1: c(3_000, 1) },
    rd(0.51, 1)
  );
  near(state.keys.k1.attributed, 0.01);
  assert.equal(state.keys.k1.seenTokens, 3_000);
});

test("a key without a counter keeps its part until the window turns", () => {
  const risen = run(
    st({ keys: { gone: { attributed: 0.48, seenTokens: 0 } } }),
    {},
    rd(0.65, 5)
  ).state;
  near(risen.keys.gone.attributed, 0.48);
  near(risen.external, 0.17);
  assert.deepEqual(run(risen, {}, rd(0.1, 10, null)).state.keys, {}); // no reset time: the large drop turns the window
});

test("attributed parts plus external always equal the last reading", () => {
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
      state = applyReading({ state, counters }, reading, now, 1000).state;
      const sum = Object.values(state.keys).reduce((a, k) => a + k.attributed, 0) + state.external;
      assert.ok(
        Math.abs(sum - state.last) < 1e-9,
        `seed ${seed} step ${i}: ${sum} vs ${state.last}`
      );
      assert.ok(
        state.external >= -1e-12 && Object.values(state.keys).every((k) => k.attributed >= -1e-12)
      );
    }
  }
});

/** Sum of the parts equals the last reading and no part is negative. */
function assertBookValid(state: LedgerState): void {
  const sum = Object.values(state.keys).reduce((a, k) => a + k.attributed, 0) + state.external;
  near(sum, state.last);
  assert.ok(state.external >= -1e-12);
  for (const k of Object.values(state.keys)) {
    assert.ok(Number.isFinite(k.attributed) && k.attributed >= -1e-12);
    assert.ok(Number.isFinite(k.seenTokens) && k.seenTokens >= 0);
  }
}

test("a negative counter explains nothing and keeps the stored watermark (none here: 0)", () => {
  const before = st({ last: 0.1, external: 0.1, keys: {} });
  const { state } = run(before, { a: c(-1000, 1), b: c(5000, 1) }, rd(0.2, 1));
  assert.equal(state.keys.a.attributed, 0);
  assert.equal(state.keys.a.seenTokens, 0);
  near(state.keys.b.attributed, 0.05);
  near(state.external - before.external, 0.05); // the rise not explained by b's 5000 tokens
  assertBookValid(state);
});

test("a counter that is not a number leaves the other keys unaffected and keeps the stored watermark (none here: 0)", () => {
  const before = st({ last: 0.1, external: 0.1, keys: {} });
  for (const odd of [c(Number.NaN, 1), c(Number.POSITIVE_INFINITY, 1)]) {
    const { state } = run(before, { a: odd, b: c(5000, 1) }, rd(0.2, 1));
    assert.equal(state.keys.a.attributed, 0);
    assert.equal(state.keys.a.seenTokens, 0);
    near(state.keys.b.attributed, 0.05);
    assertBookValid(state);
  }
  const opened = run(null, { a: c(Number.NaN), b: c(5000) }, rd(0.1, 0)).state;
  assert.equal(opened.keys.a.seenTokens, 0);
  assertBookValid(opened);
});

test("an unreadable counter keeps the key's watermark, so its tokens are not counted twice", () => {
  for (const odd of [Number.NaN, -1000, Number.POSITIVE_INFINITY]) {
    const before = st({
      last: 0.1,
      external: 0.1,
      keys: { a: { attributed: 0, seenTokens: 5_000 } },
    });
    const unread = run(before, { a: c(odd, 1) }, rd(0.2, 1)).state;
    assert.deepEqual(unread.keys.a, { attributed: 0, seenTokens: 5_000 });
    near(unread.external, 0.2);
    assertBookValid(unread);

    const back = run(unread, { a: c(6_000, 2) }, rd(0.3, 2)).state;
    near(back.keys.a.attributed, 0.01); // 1000 pending tokens, not 6000
    assert.equal(back.keys.a.seenTokens, 6_000);
    near(back.external, 0.29);
    assertBookValid(back);
  }
});

test("an unreadable counter at a turn keeps the key and its watermark", () => {
  const before = st({ keys: { a: { attributed: 0.48, seenTokens: 5_000 } } });
  const turned = run(before, { a: c(Number.NaN, 5) }, rd(0.2, 5, R + 5 * H)).state;
  assert.deepEqual(turned.keys, { a: { attributed: 0, seenTokens: 5_000 } });
  near(turned.external, 0.2);
  assertBookValid(turned);

  const back = run(turned, { a: c(6_000, 6) }, rd(0.3, 6, R + 5 * H)).state;
  near(back.keys.a.attributed, 0.01);
  assert.equal(back.keys.a.seenTokens, 6_000);
  assertBookValid(back);
});

test("a counter whose write time is not a number is never eligible", () => {
  const before = st({ last: 0.1, external: 0.1, keys: {} });
  for (const updatedAt of [Number.NaN, Number.POSITIVE_INFINITY]) {
    const { state } = run(before, { a: { tokens: 5000, updatedAt } }, rd(0.2, 1));
    assert.equal(state.keys.a.attributed, 0);
    assert.equal(state.keys.a.seenTokens, 5000);
    near(state.external, 0.2);
    assertBookValid(state);
  }
});

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object") {
    for (const inner of Object.values(value)) deepFreeze(inner);
    Object.freeze(value);
  }
  return value;
}

test("applyReading never mutates its input", () => {
  const cases: Array<[string, LedgerState | null, PlanWindowReading]> = [
    ["open", null, rd(0.4, 5)],
    ["rise", st(), rd(0.7, 5)],
    ["rescale", st(), rd(0.59, 5)],
    ["turn", st(), rd(0.5, 5, R + 5 * H)],
  ];
  for (const [row, state, reading] of cases) {
    const snapshot = deepFreeze({ state, counters: { k1: c(10_000, 4), k2: c(2_000, 5) } });
    const copy = structuredClone(snapshot);
    const out = applyReading(snapshot, reading, T0 + 5 * MIN, 1000);
    assert.equal(out.changed, true, row);
    assert.deepEqual(snapshot, copy, row);
    assertBookValid(out.state);
  }
});

test("an ignored reading returns the very same state object", () => {
  const before = st();
  for (const reading of [rd(0.9, 5, R - 5 * H), rd(0.3, 1)]) {
    const out = run(before, { k1: c(10_000, 0) }, reading); // row 2 (previous window), row 6 (unconfirmed drop)
    assert.equal(out.changed, false);
    assert.equal(out.state, before);
  }
  const older = st({ readAt: T0 + 10 * MIN });
  assert.equal(run(older, {}, rd(0.9, 5)).state, older); // row 2 (older reading)
});

test("boundaries: a 30-minute backward reset is not old, and a reset equal to the reading time is not open", () => {
  const back = run(st(), {}, rd(0.65, 5, R - 30 * MIN));
  assert.equal(back.changed, true);
  near(back.state.last, 0.65);
  near(back.state.keys.k1.attributed, 0.48);

  const atReading = run(st({ resetAt: T0 + 5 * MIN }), {}, rd(0.3, 5, T0 + 5 * MIN));
  assert.deepEqual(atReading.state.keys, {}); // row 6a does not hold: the large drop turns the window
  near(atReading.state.external, 0.3);
});
