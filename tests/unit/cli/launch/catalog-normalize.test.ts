// normalizeCatalog: each optional ViewCatalogRow field, its validation, and the row key order.
import { test } from "node:test";
import assert from "node:assert/strict";

import { normalizeCatalog } from "../../../../bin/cli/launch/core/catalog.mjs";

test("a full entry keeps every optional field in the documented key order", () => {
  const [row] = normalizeCatalog([
    {
      availability: "degraded",
      protocols: ["openai", 3, "anthropic"],
      parent: "base-model",
      owned_by: "openai",
      type: "chat",
      max_completion_tokens: 900,
      max_output_tokens: 1000,
      context_length: 128000,
      label: "Label",
      name: "Name",
      display_name: "Display",
      capabilities: { tool_calling: true, reasoning: false, modalities: ["text"], none: [] },
      id: "openai/gpt",
    },
  ]);
  assert.deepEqual(Object.keys(row), [
    "id",
    "capabilities",
    "kind",
    "label",
    "contextTokens",
    "maxOutputTokens",
    "type",
    "provider",
    "parent",
    "protocols",
    "availability",
  ]);
  assert.deepEqual(row, {
    id: "openai/gpt",
    capabilities: ["tool_calling", "modalities"],
    kind: "model",
    label: "Display",
    contextTokens: 128000,
    maxOutputTokens: 1000,
    type: "chat",
    provider: "openai",
    parent: "base-model",
    protocols: ["openai", "anthropic"],
    availability: "degraded",
  });
});

test("a bare entry has only id, capabilities and kind", () => {
  assert.deepEqual(normalizeCatalog({ data: [{ id: "m" }] }), [
    { id: "m", capabilities: [], kind: "model" },
  ]);
});

test("invalid optional fields are dropped", () => {
  const [row] = normalizeCatalog([
    {
      id: "m",
      display_name: "",
      name: 5,
      type: "",
      owned_by: "",
      parent: "",
      max_output_tokens: -1,
      max_completion_tokens: Number.POSITIVE_INFINITY,
      max_input_tokens: 0,
      protocols: "openai",
      availability: "unknown",
      capabilities: "tool_calling",
    },
  ]);
  assert.deepEqual(row, { id: "m", capabilities: [], kind: "model" });
});

test("label and output fall back in order; an empty protocols list is kept", () => {
  const [row] = normalizeCatalog([
    { id: "m", name: "", label: "L", max_completion_tokens: 42, protocols: [] },
  ]);
  assert.deepEqual(row, {
    id: "m",
    capabilities: [],
    kind: "model",
    label: "L",
    maxOutputTokens: 42,
    protocols: [],
  });
});

test("provider is set only for model rows", () => {
  const rows = normalizeCatalog([
    { id: "auto/fast", owned_by: "openai" },
    { id: "c", kind: "combo", owned_by: "me" },
    { id: "x", owned_by: "combo" },
    { id: "auto", owned_by: "openai" },
    { id: "k", kind: "auto", owned_by: "openai" },
  ]);
  assert.deepEqual(
    rows.map((row: { kind: string; provider?: string }) => [row.kind, row.provider]),
    [
      ["auto", undefined],
      ["combo", undefined],
      ["combo", undefined],
      ["auto", undefined],
      ["auto", undefined],
    ]
  );
  assert.ok(rows.every((row: object) => !("provider" in row)));
});

test("capability arrays keep only strings; every availability value is accepted", () => {
  const rows = normalizeCatalog(
    ["ok", "degraded", "down"].map((availability, i) => ({
      id: `m${i}`,
      availability,
      capabilities: ["a", 1, "b"],
    }))
  );
  assert.deepEqual(
    rows.map((row: { availability: string; capabilities: string[] }) => [
      row.availability,
      row.capabilities,
    ]),
    [
      ["ok", ["a", "b"]],
      ["degraded", ["a", "b"]],
      ["down", ["a", "b"]],
    ]
  );
});

test("non-object bodies and entries without a string id yield no rows", () => {
  assert.deepEqual(normalizeCatalog(null), []);
  assert.deepEqual(normalizeCatalog({ data: "x" }), []);
  assert.deepEqual(normalizeCatalog([null, 3, "m", { id: 7 }, { id: "" }]), []);
});
