import assert from "node:assert/strict";
import { test } from "node:test";
import {
  applyProviderOrder,
  mergeVisibleProviderOrder,
  readProviderOrder,
  writeProviderOrder,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/providerOrder.ts";
const defaults = { a: 1, b: 2, c: 3, d: 4 };
test("saved order first, new providers default-ranked, absent IDs retained", () => {
  assert.deepEqual(applyProviderOrder(["d", "b", "a", "c"], ["c", "missing", "a"], defaults), [
    "c",
    "a",
    "b",
    "d",
  ]);
  assert.deepEqual(
    mergeVisibleProviderOrder(["c", "missing", "a"], ["a", "b", "c", "d"], ["a", "c"], defaults),
    ["a", "missing", "c", "b", "d"]
  );
});
test("filtered reorder replaces visible slots without moving hidden IDs", () => {
  assert.deepEqual(
    mergeVisibleProviderOrder(
      ["a", "b", "missing", "c", "d"],
      ["a", "b", "c", "d"],
      ["d", "a", "c"],
      defaults
    ),
    ["d", "b", "missing", "a", "c"]
  );
});
test("corrupt JSON, invalid arrays and throwing storage are harmless", () => {
  for (const value of ["{", "{}", "[1]", "null"])
    assert.deepEqual(
      readProviderOrder(() => ({ getItem: () => value })),
      []
    );
  assert.deepEqual(
    readProviderOrder(() => {
      throw Error("blocked");
    }),
    []
  );
  assert.doesNotThrow(() =>
    writeProviderOrder(["a"], () => {
      throw Error("blocked");
    })
  );
  let saved: string | null = null;
  writeProviderOrder(["missing", "a"], () => ({
    setItem: (_key: string, v: string) => {
      saved = v;
    },
    removeItem: () => {
      saved = null;
    },
  }));
  assert.equal(saved, '["missing","a"]');
});
