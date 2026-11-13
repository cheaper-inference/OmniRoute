/**
 * #19337 — the live-discovery response keeps the raw upstream cards and every model the
 * upstream listed, and only adds the normalized capability fields the import reads.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { enrichLiveModelsWithDiscoveredCapabilities } =
  await import("../../src/app/api/providers/[id]/models/discovery/helpers.ts");

test("adds normalized capability fields to the matching raw model and keeps raw fields", () => {
  const raw = [{ id: "pixtral", name: "Pixtral", owned_by: "mistral", object: "model" }];
  const discovered = [
    {
      id: "pixtral",
      name: "Pixtral (normalized)",
      source: "imported",
      supportedEndpoints: ["chat"],
      endpointCapabilitySource: "declared",
      supportsVision: true,
      supportsTools: true,
      inputTokenLimit: 131072,
      outputTokenLimit: 8192,
    },
  ];

  const [model] = enrichLiveModelsWithDiscoveredCapabilities(raw, discovered);

  assert.deepEqual(model, {
    id: "pixtral",
    name: "Pixtral",
    owned_by: "mistral",
    object: "model",
    supportedEndpoints: ["chat"],
    endpointCapabilitySource: "declared",
    supportsVision: true,
    supportsTools: true,
    inputTokenLimit: 131072,
    outputTokenLimit: 8192,
  });
});

test("keeps raw models that have no normalized twin, in order and untouched", () => {
  const hidden = { id: "internal-only", owned_by: "x" };
  const raw = [{ id: "a", owned_by: "x" }, hidden, { id: "b", owned_by: "x" }];
  const discovered = [
    { id: "a", supportsVision: true },
    { id: "b", source: "imported" },
  ];

  const result = enrichLiveModelsWithDiscoveredCapabilities(raw, discovered);

  assert.deepEqual(
    result.map((model) => model.id),
    ["a", "internal-only", "b"]
  );
  assert.equal(result[1], hidden);
  // A twin with no capability field leaves the raw model as it was.
  assert.equal(result[2], raw[2]);
  assert.deepEqual(result[0], { id: "a", owned_by: "x", supportsVision: true });
});

test("never copies the normalized source or name over the raw card", () => {
  const raw = [{ id: "m", name: "Raw", source: "foundation" }];
  const discovered = [{ id: "m", name: "Normalized", source: "imported", modelType: "embedding" }];

  const [model] = enrichLiveModelsWithDiscoveredCapabilities(raw, discovered);

  assert.equal(model.name, "Raw");
  assert.equal(model.source, "foundation");
  assert.equal((model as Record<string, unknown>).modelType, "embedding");
});
