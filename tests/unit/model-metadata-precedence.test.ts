// A custom model overlays only the fields it explicitly stores, so richer discovered metadata is not
// erased by a custom row that leaves a field undefined; null counts as stored. Merging two lists keys
// models by id, keeps the discovery order, applies the overlay to ids found in both and appends the
// custom models that were not discovered.
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  mergeCustomModelMetadata,
  mergeModelsWithCustomPrecedence,
} from "../../src/lib/providers/modelMetadataPrecedence.ts";

test("defined custom fields override the base and undefined ones do not", () => {
  const base = { id: "m", name: "Discovered", contextWindow: 128000 };
  const merged = mergeCustomModelMetadata(base, { name: "Custom", contextWindow: undefined });
  assert.deepEqual(merged, { id: "m", name: "Custom", contextWindow: 128000 });
});

test("null is a stored value and does override the base", () => {
  assert.deepEqual(mergeCustomModelMetadata({ id: "m", note: "x" }, { note: null }), {
    id: "m",
    note: null,
  });
});

test("custom fields the base does not have are added, and the base is not mutated", () => {
  const base = { id: "m", name: "N" };
  const merged = mergeCustomModelMetadata(base, { maxTokens: 4096 });
  assert.deepEqual(merged, { id: "m", name: "N", maxTokens: 4096 });
  assert.deepEqual(base, { id: "m", name: "N" });
});

test("a custom model overlays its discovered twin and keeps the discovery position", () => {
  const merged = mergeModelsWithCustomPrecedence(
    [
      { id: "a", name: "A", tier: "free" },
      { id: "b", name: "B" },
    ],
    [{ id: "a", name: "A custom", tier: undefined }]
  );
  assert.deepEqual(merged, [
    { id: "a", name: "A custom", tier: "free" },
    { id: "b", name: "B" },
  ]);
});

test("a custom model that was not discovered is appended", () => {
  const merged = mergeModelsWithCustomPrecedence([{ id: "a" }], [{ id: "z", name: "Z" }]);
  assert.deepEqual(merged, [{ id: "a" }, { id: "z", name: "Z" }]);
});

test("with no custom models the base list is returned as a copy", () => {
  const base = [{ id: "a" }, { id: "b" }];
  const merged = mergeModelsWithCustomPrecedence(base, []);
  assert.deepEqual(merged, base);
  assert.notEqual(merged, base);
});
