/**
 * tests/unit/quota-percent-attribution.test.ts
 *
 * The external-usage rule of percent-plan attribution: usage nobody routed
 * through the pool first uses the capacity no allocation claims, and only the
 * excess is shared by normalized weight (all-zero weights split equally).
 */

import test from "node:test";
import assert from "node:assert/strict";

import { splitExternalUsage } from "../../src/lib/quota/percentAttribution.ts";
import { DEFAULT_MIN_TOKENS_PER_PCT } from "../../src/lib/quota/percentLedger.ts";

const r = (xs: number[]) => xs.map((x) => +x.toFixed(9));

// [name, input (limit is 100 in every case), expected [externalCharged, ...perKey]]
const CASES: Array<[string, { external: number; weights: number[] }, number[]]> = [
  [
    "weights summing 100: external usage is charged by weight",
    { external: 20, weights: [25, 25, 25, 25] },
    [20, 5, 5, 5, 5],
  ],
  [
    "weights below 100: unallocated capacity absorbs external usage first",
    { external: 61, weights: [20, 20, 20] },
    [21, 7, 7, 7],
  ],
  [
    "external usage inside the unallocated capacity charges nobody",
    { external: 30, weights: [20, 20, 20] },
    [0, 0, 0, 0],
  ],
  [
    "uneven weights share the excess by normalized weight",
    { external: 60, weights: [50, 30] },
    [40, 25, 15],
  ],
  ["all-zero weights split equally", { external: 20, weights: [0, 0, 0, 0] }, [20, 5, 5, 5, 5]],
  ["bad input yields zeros", { external: NaN, weights: [NaN, -5] }, [0, 0, 0]],
];

for (const [name, input, expected] of CASES)
  test(name, () => {
    const s = splitExternalUsage({ ...input, limit: 100 });
    assert.deepEqual(r([s.externalCharged, ...s.perKey]), expected);
  });

test("conservation without internal usage", () => {
  for (const [weights, U, left] of [
    [[20, 20, 20], 61, 39],
    [[20, 20, 20], 30, 60],
    [[50, 30, 20], 45, 55],
  ] as Array<[number[], number, number]>) {
    const L = 100,
      W = weights.reduce((a, b) => a + b, 0);
    const s = splitExternalUsage({ external: U, weights, limit: L });
    const leftToKeys = weights.reduce((sum, w, i) => sum + (w / 100) * L - s.perKey[i], 0);
    assert.ok(Math.abs(leftToKeys - Math.min((W / 100) * L, L - U)) < 1e-9);
    assert.ok(Math.abs(leftToKeys - left) < 1e-9, `${weights} @ ${U}: ${leftToKeys}`);
  }
});

test("external usage alone never reaches a fair share before the account is full", () => {
  for (const weights of [
    [20, 20, 20],
    [25, 25, 25, 25],
    [60, 60, 30],
  ])
    for (const U of [10, 50, 99.9]) {
      const s = splitExternalUsage({ external: U, weights, limit: 100 });
      weights.forEach((w, i) => assert.ok(s.perKey[i] < w, `${weights} @ ${U}`));
    }
});

test("default floor", () => {
  assert.equal(DEFAULT_MIN_TOKENS_PER_PCT, 1000);
});
