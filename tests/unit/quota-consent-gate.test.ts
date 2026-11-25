/**
 * tests/unit/quota-consent-gate.test.ts
 *
 * The consent gate decides when the store must be read. A saturation pool adds nothing and reads
 * nothing. A consent pool reads the other keys only when a hard key is at its share and another
 * key lends, and a failed read counts as zero consumption.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { countableConsentBorrow, attributionKeyIds, percentConsentBorrow } =
  await import("../../src/lib/quota/consentGate.ts");

const NOW = 1_800_000_000_000;
const A = { apiKeyId: "a", weight: 50 },
  B = { apiKeyId: "b", weight: 30, lendingPercent: 50 },
  C = { apiKeyId: "c", weight: 0 };
const pool = (
  borrowMode: string | undefined,
  allocations: Array<{
    apiKeyId: string;
    weight: number;
    lendingPercent?: number;
    lendingUntil?: number | null;
  }> = [A, B, C]
) => ({ borrowMode, allocations });
function counting(values: Record<string, number | Error>) {
  const calls: string[] = [];
  const peek = async (id: string) => {
    calls.push(id);
    const v = values[id] ?? 0;
    if (v instanceof Error) throw v;
    return v;
  };
  return { calls, peek };
}
const ask = (
  p: ReturnType<typeof pool>,
  consumedThisKey: number,
  r: ReturnType<typeof counting>,
  policy: "hard" | "soft" | "burst" = "hard"
) =>
  countableConsentBorrow({
    pool: p,
    requesterKeyId: "a",
    policy,
    limit: 1000,
    consumedThisKey,
    nowMs: NOW,
    peek: r.peek,
  });

test("a saturation pool adds nothing and reads nothing", async () => {
  for (const mode of ["saturation", undefined, "other"]) {
    const r = counting({});
    assert.deepEqual(await ask(pool(mode), 900, r), {});
    assert.deepEqual(r.calls, []);
    assert.deepEqual(attributionKeyIds(pool(mode), "a", NOW), ["a"]);
  }
});

test("a consent pool reads nothing when the answer cannot change", async () => {
  const idle = [A, { ...B, lendingPercent: 0 }, C],
    expired = [A, { ...B, lendingUntil: NOW }, C];
  for (const [p, consumed, policy] of [
    [pool("consent", idle), 900, "hard"],
    [pool("consent", expired), 900, "hard"],
    [pool("consent"), 499, "hard"],
    [pool("consent"), 900, "soft"],
    [pool("consent"), 900, "burst"],
  ] as const) {
    const r = counting({});
    assert.deepEqual(await ask(p, consumed, r, policy), { borrowAvailable: 0 });
    assert.deepEqual(r.calls, []);
  }
});

test("a hard key at its share reads every other key once", async () => {
  const r = counting({ b: 100, c: 60 });
  assert.deepEqual(await ask(pool("consent"), 500, r), { borrowAvailable: 40 });
  assert.deepEqual([...r.calls].sort(), ["b", "c"]);
});

test("a failed read counts as zero consumption and never throws", async () => {
  assert.deepEqual(
    await ask(pool("consent"), 500, counting({ b: new Error("down"), c: 60 })),
    { borrowAvailable: 90 } // 50% of 300, minus 60
  );
});

test("percent: every key is attributed only when another key lends in a consent pool", () => {
  assert.deepEqual(attributionKeyIds(pool("consent"), "a", NOW), ["a", "b", "c"]);
  assert.deepEqual(attributionKeyIds(pool("consent"), "b", NOW), ["b"]); // b is the only lender
  const half = [
    { apiKeyId: "a", weight: 50 },
    { apiKeyId: "b", weight: 50, lendingPercent: 100 },
  ];
  const input = { requesterKeyId: "a", policy: "hard" as const, limit: 100, nowMs: NOW };
  assert.deepEqual(
    percentConsentBorrow({
      ...input,
      pool: pool("saturation", half),
      consumedByKey: { a: 54, b: 6 },
    }),
    {}
  );
  assert.deepEqual(
    percentConsentBorrow({ ...input, pool: pool("consent", half), consumedByKey: { a: 54, b: 6 } }),
    { borrowAvailable: 44 }
  );
  assert.deepEqual(
    percentConsentBorrow({ ...input, pool: pool("consent", half), consumedByKey: {} }),
    { borrowAvailable: 50 } // no usable book
  );
});
