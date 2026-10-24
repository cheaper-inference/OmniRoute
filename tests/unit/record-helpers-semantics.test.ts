/**
 * QUAL-05 migration safety tests — the canonical recordHelpers module must
 * reproduce the exact semantics of the ~300 local definitions it replaces.
 * The null-fallback vs {}-fallback split and the array-exclusion default are
 * the two axes where blind helper swaps have historically corrupted callers.
 *
 * Run: node --import tsx/esm --test tests/unit/record-helpers-semantics.test.ts
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { asRecord, asRecordOrNull, isRecord } from "../../src/shared/utils/recordHelpers.ts";

test("asRecord: {}-fallback for every non-record input", () => {
  for (const v of [null, undefined, 0, 1, "s", true, () => {}, Symbol("x")]) {
    assert.deepEqual(asRecord(v), {});
  }
});

test("asRecord: arrays excluded by default (dominant local variant)", () => {
  assert.deepEqual(asRecord([1, 2]), {});
  assert.deepEqual(asRecord(["a"]), {});
});

test("asRecord: arrays pass through with allowArrays (4 local callers rely on this)", () => {
  const arr = ["a", "b"];
  assert.equal(asRecord(arr, { allowArrays: true }), arr);
});

test("asRecord: real objects pass through by reference, fields unknown", () => {
  const obj = { a: 1 };
  assert.equal(asRecord(obj), obj);
});

test("asRecordOrNull: null-fallback variant distinguishes malformed data", () => {
  assert.equal(asRecordOrNull([1]), null);
  assert.equal(asRecordOrNull(null), null);
  assert.equal(asRecordOrNull("s"), null);
  const obj = { a: 1 };
  assert.equal(asRecordOrNull(obj), obj);
});

test("isRecord: array-excluded by default, predicate narrows", () => {
  assert.equal(isRecord({}), true);
  assert.equal(isRecord([]), false);
  assert.equal(isRecord(null), false);
  assert.equal(isRecord(42), false);
});

test("isRecord: allowArrays opt-in matches the 4 array-inclusive local copies", () => {
  assert.equal(isRecord([], { allowArrays: true }), true);
});

test("the two fallback variants never collapse: caller can tell absent from empty", () => {
  const malformed = "not-an-object";
  assert.equal(asRecordOrNull(malformed), null);
  assert.deepEqual(asRecord(malformed), {});
});
