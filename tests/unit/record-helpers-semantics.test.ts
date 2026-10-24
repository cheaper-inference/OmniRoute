import { test } from "node:test";
import assert from "node:assert/strict";
import * as srcHelpers from "../../src/shared/utils/recordHelpers.ts";
import * as sseHelpers from "../../open-sse/utils/recordHelpers.ts";

const implementations = [
  { name: "src/shared", helpers: srcHelpers },
  { name: "open-sse", helpers: sseHelpers },
];

for (const { name, helpers } of implementations) {
  const { asRecord, asRecordOrNull, isRecord } = helpers;

  test(`${name} - asRecord: fresh {}-fallback for every non-record input`, () => {
    for (const v of [null, undefined, 0, 1, "s", true, () => {}, Symbol("x")]) {
      assert.deepEqual(asRecord(v), {});
      assert.notEqual(asRecord(v), asRecord(v));
    }
  });

  test(`${name} - asRecord: arrays excluded by default (dominant local variant)`, () => {
    assert.deepEqual(asRecord([1, 2]), {});
    assert.deepEqual(asRecord(["a"]), {});
  });

  test(`${name} - asRecord: arrays pass through with allowArrays`, () => {
    const arr = ["a", "b"];
    assert.equal(asRecord(arr, { allowArrays: true }), arr);
  });

  test(`${name} - asRecord: real objects pass through by reference, fields unknown`, () => {
    const obj = { a: 1 };
    assert.equal(asRecord(obj), obj);
  });

  test(`${name} - asRecordOrNull: null-fallback variant distinguishes malformed data`, () => {
    assert.equal(asRecordOrNull([1]), null);
    assert.equal(asRecordOrNull(null), null);
    assert.equal(asRecordOrNull("s"), null);
    const obj = { a: 1 };
    assert.equal(asRecordOrNull(obj), obj);
  });

  test(`${name} - isRecord: array-excluded by default, predicate narrows`, () => {
    assert.equal(isRecord({}), true);
    assert.equal(isRecord([]), false);
    assert.equal(isRecord(null), false);
    assert.equal(isRecord(42), false);
  });

  test(`${name} - isRecord: allowArrays opt-in accepts arrays`, () => {
    assert.equal(isRecord([], { allowArrays: true }), true);
  });

  test(`${name} - the two fallback variants never collapse: caller can tell absent from empty`, () => {
    const malformed = "not-an-object";
    assert.equal(asRecordOrNull(malformed), null);
    assert.deepEqual(asRecord(malformed), {});
  });
}
