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

test("defaulted custom endpoints do not override discovered declared/inferred endpoints", () => {
  const base = {
    id: "mistral-embed",
    name: "mistral-embed-2312",
    supportedEndpoints: ["embeddings"],
    endpointCapabilitySource: "inferred",
    apiFormat: "embeddings",
    modelType: "embedding",
  };
  const custom = {
    id: "mistral-embed",
    name: "mistral-embed",
    source: "imported",
    supportedEndpoints: ["chat"],
    endpointCapabilitySource: "defaulted",
  };
  const merged = mergeCustomModelMetadata(base, custom);
  assert.deepEqual(merged.supportedEndpoints, ["embeddings"]);
  assert.equal(merged.endpointCapabilitySource, "inferred");
});

test("operator-set endpoints DO override discovered endpoints", () => {
  const base = {
    id: "mistral-embed",
    supportedEndpoints: ["embeddings"],
    endpointCapabilitySource: "inferred",
  };
  const custom = {
    id: "mistral-embed",
    supportedEndpoints: ["embeddings", "chat"],
    endpointCapabilitySource: "operator",
  };
  const merged = mergeCustomModelMetadata(base, custom);
  assert.deepEqual(merged.supportedEndpoints, ["embeddings", "chat"]);
  assert.equal(merged.endpointCapabilitySource, "operator");
});

test("defaulted custom endpoints do not mask unmarked non-chat discovered endpoints", () => {
  const base = { id: "text-embedding-3-small", supportedEndpoints: ["embeddings"] };
  const custom = {
    id: "text-embedding-3-small",
    supportedEndpoints: ["chat"],
    endpointCapabilitySource: "defaulted",
  };
  const merged = mergeCustomModelMetadata(base, custom);
  assert.deepEqual(merged.supportedEndpoints, ["embeddings"]);
  assert.equal(merged.endpointCapabilitySource, undefined);
});

test("defaulted custom endpoints still fill a discovered chat-only row", () => {
  const base = { id: "m", supportedEndpoints: ["chat"] };
  const custom = {
    id: "m",
    supportedEndpoints: ["chat", "responses"],
    endpointCapabilitySource: "defaulted",
  };
  const merged = mergeCustomModelMetadata(base, custom);
  assert.deepEqual(merged.supportedEndpoints, ["chat", "responses"]);
  assert.equal(merged.endpointCapabilitySource, "defaulted");
});

test("the default apiFormat of a defaulted custom row does not mask the discovered one", () => {
  const base = {
    id: "mistral-embed",
    supportedEndpoints: ["embeddings"],
    endpointCapabilitySource: "inferred",
    apiFormat: "embeddings",
  };
  const custom = {
    id: "mistral-embed",
    apiFormat: "chat-completions",
    supportedEndpoints: ["chat"],
    endpointCapabilitySource: "defaulted",
  };
  assert.equal(mergeCustomModelMetadata(base, custom).apiFormat, "embeddings");
  assert.equal(
    mergeCustomModelMetadata(base, { ...custom, apiFormat: "responses" }).apiFormat,
    "responses"
  );
});

test("an unmarked legacy custom row yields only its bare chat placeholder", () => {
  const base = {
    id: "mistral-embed",
    supportedEndpoints: ["embeddings"],
    endpointCapabilitySource: "inferred",
  };
  assert.deepEqual(
    mergeCustomModelMetadata(base, { id: "mistral-embed", supportedEndpoints: ["chat"] })
      .supportedEndpoints,
    ["embeddings"]
  );
  assert.deepEqual(
    mergeCustomModelMetadata(base, {
      id: "mistral-embed",
      supportedEndpoints: ["embeddings", "chat"],
    }).supportedEndpoints,
    ["embeddings", "chat"]
  );
});

test("with no custom models the base list is returned as a copy", () => {
  const base = [{ id: "a" }, { id: "b" }];
  const merged = mergeModelsWithCustomPrecedence(base, []);
  assert.deepEqual(merged, base);
  assert.notEqual(merged, base);
});
