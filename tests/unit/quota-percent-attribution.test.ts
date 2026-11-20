/**
 * tests/unit/quota-percent-attribution.test.ts
 *
 * Pure split of an account's percent-plan consumption across pool members:
 * the internal part (explained by the tokens routed through OmniRoute) is
 * shared by token volume, the external part first uses the unallocated
 * capacity and the rest is shared by weight.
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_MIN_TOKENS_PER_PCT,
  percentProxyDimKey,
  splitAccountPercent,
  type SplitAccountPercentInput,
} from "../../src/lib/quota/percentAttribution.ts";

const r = (xs: number[], d: number) => xs.map((x) => +x.toFixed(d));
const four = [700_000, 100_000, 100_000, 100_000];

// [name, input (limit is 100 in every case), expected [internal, external, externalCharged, ...perKey], decimals]
const CASES: Array<[string, Omit<SplitAccountPercentInput, "limit">, number[], number]> = [
  [
    "internal by token share, external by weight",
    { perKeyTokens: four, accountConsumed: 32, minTokensPerPct: 50_000 },
    [20, 12, 12, 17, 5, 5, 5],
    2,
  ],
  [
    "default floor: 1M tokens explain the whole bar",
    { perKeyTokens: four, accountConsumed: 32 },
    [32, 0, 0, 22.4, 3.2, 3.2, 3.2],
    2,
  ],
  [
    "internal estimate is capped at the account bar",
    { perKeyTokens: [500_000, 500_000], accountConsumed: 10 },
    [10, 0, 0, 5, 5],
    9,
  ],
  [
    "no tokens: the whole bar is external and follows weight",
    { perKeyTokens: [0, 0, 0, 0], accountConsumed: 20 },
    [0, 20, 20, 5, 5, 5, 5],
    9,
  ],
  [
    "weights below 100: external usage takes unallocated capacity first",
    { perKeyTokens: [0, 0, 0], weights: [20, 20, 20], accountConsumed: 61 },
    [0, 61, 21, 7, 7, 7],
    9,
  ],
  [
    "first caller with a tiny volume keeps its weight share",
    { perKeyTokens: [31, 0, 0, 0], weights: [25, 25, 25, 25], accountConsumed: 30 },
    [0.031, 29.969, 29.969, 7.52325, 7.49225, 7.49225, 7.49225],
    5,
  ],
  [
    "store total larger than the known keys: nobody is charged the difference",
    { perKeyTokens: [100_000, 0], poolTokens: 400_000, weights: [50, 50], accountConsumed: 40 },
    [40, 0, 0, 10, 0],
    9,
  ],
  [
    "store total below a key's own tokens is clamped",
    { perKeyTokens: [100_000], poolTokens: 0, accountConsumed: 40 },
    [40, 0, 0, 40],
    9,
  ],
  [
    "bad input yields zeros",
    { perKeyTokens: [NaN, -5, Infinity], accountConsumed: NaN },
    [0, 0, 0, 0, 0, 0],
    9,
  ],
];

for (const [name, input, expected, d] of CASES)
  test(name, () => {
    const s = splitAccountPercent({ ...input, limit: 100 });
    assert.deepEqual(r([s.internal, s.external, s.externalCharged, ...s.perKey], d), expected);
  });

test("conservation without internal usage", () => {
  for (const [weights, U] of [
    [[20, 20, 20], 61],
    [[20, 20, 20], 30],
    [[50, 30, 20], 45],
  ] as Array<[number[], number]>) {
    const L = 100,
      W = weights.reduce((a, b) => a + b, 0);
    const s = splitAccountPercent({
      perKeyTokens: weights.map(() => 0),
      weights,
      accountConsumed: U,
      limit: L,
    });
    const left = weights.reduce((sum, w, i) => sum + (w / 100) * L - s.perKey[i], 0);
    assert.ok(Math.abs(left - Math.min((W / 100) * L, L - U)) < 1e-9); // 39, 60, 55
  }
});

test("external usage alone never reaches a fair share before the account is full", () => {
  for (const weights of [
    [20, 20, 20],
    [25, 25, 25, 25],
    [60, 60, 30],
  ])
    for (const U of [10, 50, 99.9]) {
      const s = splitAccountPercent({
        perKeyTokens: weights.map(() => 0),
        weights,
        accountConsumed: U,
        limit: 100,
      });
      weights.forEach((w, i) => assert.ok(s.perKey[i] < w, `${weights} @ ${U}`));
    }
});

test("the internal part is reported per key, apart from the external charge", () => {
  const s = splitAccountPercent({
    perKeyTokens: four,
    accountConsumed: 32,
    minTokensPerPct: 50_000,
    limit: 100,
  });
  assert.deepEqual(r(s.perKeyInternal, 2), [14, 2, 2, 2]); // perKey is [17, 5, 5, 5]
});

test("default floor and shadow bucket key", () => {
  assert.equal(DEFAULT_MIN_TOKENS_PER_PCT, 1000);
  assert.deepEqual(percentProxyDimKey({ poolId: "p1", unit: "percent", window: "5h" }), {
    poolId: "p1:percent-proxy",
    unit: "tokens",
    window: "5h",
  });
});
