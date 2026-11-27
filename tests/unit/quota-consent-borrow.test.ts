/**
 * The pure borrow calculation for consented lending, as a table of cases.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { activeLendingPercent, computeBorrowAvailable, effectiveWeights, hasActiveLender } =
  await import("../../src/lib/quota/consentBorrow.ts");
type ConsentAllocation = import("../../src/lib/quota/consentBorrow.ts").ConsentAllocation;

const NOW = 1_800_000_000_000;
const A = { apiKeyId: "a", weight: 50 };
const B = { apiKeyId: "b", weight: 30, lendingPercent: 50 };
const C = { apiKeyId: "c", weight: 0 };
const borrow = (
  requesterKeyId: string,
  allocations: ConsentAllocation[],
  consumedByKey: Record<string, number>,
  limit = 1000
) => computeBorrowAvailable({ allocations, requesterKeyId, limit, consumedByKey, nowMs: NOW });

test("nobody lending leaves nothing to borrow, and unallocated capacity is not lendable", () => {
  assert.equal(borrow("a", [A, { ...B, lendingPercent: 0 }, C], { a: 500, b: 0, c: 0 }), 0); // weights add to 80
});
test("a lender offers its percentage of its idle share", () => {
  assert.equal(borrow("c", [A, B, C], { a: 100, b: 100, c: 0 }), 100); // 50% of (300 - 100)
});
test("what other keys already took above their shares is subtracted", () => {
  assert.equal(borrow("a", [A, B, C], { a: 530, b: 100, c: 60 }), 40); // 100 - 60
  assert.equal(borrow("a", [A, B, C], { a: 530, b: 100, c: 160 }), 0); // floored at zero
});
test("an expired consent lends nothing, and a deadline equal to now is expired", () => {
  assert.equal(borrow("c", [A, { ...B, lendingUntil: NOW }, C], { b: 100 }), 0);
  assert.equal(borrow("c", [A, { ...B, lendingUntil: NOW + 1 }, C], { b: 100 }), 100);
  assert.equal(activeLendingPercent({ lendingPercent: 50, lendingUntil: null }, NOW), 50);
});
test("the requester's own consent never counts", () => {
  assert.equal(borrow("b", [A, B, C], { a: 0, b: 0, c: 0 }), 0);
  assert.equal(hasActiveLender([A, B, C], "b", NOW), false);
  assert.equal(hasActiveLender([A, B, C], "a", NOW), true);
});
test("a lender above its own share lends nothing", () => {
  assert.equal(borrow("c", [A, B, C], { b: 400 }), 0); // share 300, idle 0, its excess 100 is subtracted
});
test("a zero-weight requester borrows like any other key", () => {
  assert.equal(
    borrow("c", [A, { ...A, apiKeyId: "a2", lendingPercent: 100 }, C], { a2: 100 }),
    400
  );
});
test("all-zero weights split the limit equally", () => {
  const zero = [
    { apiKeyId: "x", weight: 0 },
    { apiKeyId: "y", weight: 0, lendingPercent: 100 },
  ];
  assert.deepEqual(effectiveWeights(zero), [50, 50]);
  assert.equal(borrow("x", zero, { y: 200 }), 300);
});
test("out-of-range percentages and unusable numbers are safe", () => {
  assert.deepEqual(
    [150, -5, Number.NaN, undefined].map((lendingPercent) =>
      activeLendingPercent({ lendingPercent }, NOW)
    ),
    [100, 0, 0, 0]
  );
  assert.equal(borrow("c", [A, B, C], { b: Number.NaN }), 150); // unreadable consumption counts as 0
  assert.equal(borrow("c", [A, B, C], { b: 100 }, Number.NaN), 0);
});

test("a deadline that is not a finite number lends nothing, and null lends with no end", () => {
  for (const lendingUntil of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
    assert.equal(activeLendingPercent({ lendingPercent: 50, lendingUntil }, NOW), 0);
  }
  assert.equal(activeLendingPercent({ lendingPercent: 50, lendingUntil: null }, NOW), 50);
  assert.equal(activeLendingPercent({ lendingPercent: 50 }, NOW), 50);
});
