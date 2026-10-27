import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyOperatorPricing,
  isDecisionCatalogRow,
  toDecisionCatalogModel,
} from "../../open-sse/handlers/systemOneCatalog.ts";

test("catalog preserves declared modalities and primitive subsets without inferring support", () => {
  const model = toDecisionCatalogModel("openrouter", {
    id: "synthetic-maker/decider",
    architecture: { input_modalities: ["text", "image"], output_modalities: ["decisions"] },
    supported_primitives: ["choice", "noul"],
  });
  assert.deepEqual(model.input_modalities, ["text", "image"]);
  assert.deepEqual(model.output_modalities, ["decisions"]);
  assert.deepEqual(model.decision_primitives, ["choice", "noul"]);
  const unknown = toDecisionCatalogModel("typesafe", {
    name: "jev-1.14.0",
    supported_parameters: ["temperature"],
  });
  assert.equal(unknown.input_modalities, null);
  assert.equal(unknown.output_modalities, null);
  assert.equal(unknown.decision_primitives, null);
});

test("canonical metadata never rewrites requested aliases or asserts live alias resolution", () => {
  const model = toDecisionCatalogModel("openrouter", {
    id: "~synthetic-maker/latest",
    root: "synthetic-maker/family",
    canonical_slug: "synthetic-maker/version-20261027",
    author: "Synthetic Model Author",
    owned_by: "synthetic-maker",
  });
  assert.equal(model.id, "openrouter/~synthetic-maker/latest");
  assert.equal(model.root, "~synthetic-maker/latest");
  assert.equal(model.provider, "openrouter");
  assert.equal(model.owned_by, "openrouter");
  assert.equal(model.upstream_root, "synthetic-maker/family");
  assert.equal(model.model_owner, "synthetic-maker");
  assert.equal(model.author, "Synthetic Model Author");
  assert.equal(model.canonical_model_id, "synthetic-maker/version-20261027");
  assert.equal(model.resolved_alias_target, undefined);
});

test("only explicitly reported alias targets are preserved", () => {
  const model = toDecisionCatalogModel("openrouter", {
    id: "synthetic/alias",
    resolved_alias_target: "synthetic/target",
  });
  assert.equal(model.resolved_alias_target, "synthetic/target");
});

for (const context of [undefined, 0, -1, Infinity, NaN, "32768"]) {
  test(`invalid or absent context is unknown, never unlimited: ${String(context)}`, () => {
    const model = toDecisionCatalogModel("openrouter", {
      id: "synthetic/model",
      context_length: context,
    });
    assert.equal(model.context_length, null);
  });
}
test("positive declared context length is preserved", () => {
  assert.equal(
    toDecisionCatalogModel("openrouter", { id: "synthetic/model", context_length: 262144 })
      .context_length,
    262144
  );
});

test("OpenRouter catalog prices retain explicit USD-per-token provenance", () => {
  const model = toDecisionCatalogModel("openrouter", {
    id: "synthetic/model",
    pricing: { prompt: "0.000000042", completion: "0" },
  });
  assert.equal(model.pricing_status, "known");
  assert.equal(model.pricing_source, "upstream");
  assert.equal(model.pricing_currency, "USD");
  assert.equal(model.pricing_unit, "token");
  assert.deepEqual(model.pricing, { prompt: "0.000000042", completion: "0" });
});

test("unverified units and non-USD prices remain unknown instead of being mispriced", () => {
  for (const [provider, pricing] of [
    ["vercel-ai-gateway", { input: 0.04, output: 0 }],
    ["openrouter", { prompt: 1, completion: 1, currency: "EUR" }],
  ]) {
    const model = toDecisionCatalogModel(provider as string, { id: "synthetic/model", pricing });
    assert.equal(model.pricing_status, "unknown");
    assert.equal(model.pricing, undefined);
    assert.equal(model.pricing_currency, undefined);
    assert.equal(model.pricing_unit, undefined);
  }
});

test("complete operator USD-per-million rates are projected per-token and incomplete overrides preserve provenance", () => {
  const original = toDecisionCatalogModel("openrouter", {
    id: "synthetic/model",
    pricing: { prompt: "0.000000042", completion: "0" },
  });
  assert.deepEqual(applyOperatorPricing(original, { input: 1 }), original);
  const overridden = applyOperatorPricing(original, { input: 1, output: 2 });
  assert.equal(overridden.pricing_status, "known");
  assert.equal(overridden.pricing_source, "operator");
  assert.equal(overridden.pricing_currency, "USD");
  assert.equal(overridden.pricing_unit, "token");
  assert.deepEqual(overridden.pricing, { prompt: "0.000001", completion: "0.000002" });
});

test("thirty synthetic catalog entries across namespaces survive decisions capability filtering without Jev-only assumptions", () => {
  // Cardinality/projection fixture only, not a capture of thirty live providers or model families.
  const rows = Array.from({ length: 30 }, (_, index) => ({
    id: `synthetic-maker-${index}/decider`,
    architecture: { output_modalities: ["decisions"] },
  }));
  const models = rows
    .filter((row) => isDecisionCatalogRow("openrouter", row))
    .map((row) => toDecisionCatalogModel("openrouter", row));
  assert.equal(models.length, 30);
  assert.equal(new Set(models.map((model) => model.id)).size, 30);
  assert.ok(models.every((model) => model.decision_primitives === null));
  assert.ok(models.every((model) => model.context_length === null));
});

test("tiny positive operator rates are not rounded into a free price", () => {
  const model = toDecisionCatalogModel("typesafe", { name: "synthetic" });
  const priced = applyOperatorPricing(model, { input: 0.00000000042, output: 0 });
  assert.equal(priced.pricing.prompt, "0.00000000000000042");
  assert.ok(Number(priced.pricing.prompt) > 0);
});

test("Inception explicit decision endpoint beats text modality without inventing chat", () => {
  const row = {
    id: "mercury-decide",
    output_modalities: ["text"],
    supported_endpoints: ["decisions"],
  };
  assert.equal(isDecisionCatalogRow("inception", row), true);
  const model = toDecisionCatalogModel("inception", row);
  assert.equal(model.type, "decision");
  assert.deepEqual(model.supported_endpoints, ["systemone"]);
});
test("mixed native catalogs preserve every declared endpoint and normalize native/chat aliases", () => {
  const model = toDecisionCatalogModel("openrouter", {
    id: "synthetic/mixed",
    output_modalities: ["decisions"],
    supported_endpoints: ["decisions", "chat.completions", "responses", "embeddings"],
  });
  assert.equal(model.type, "chat");
  assert.deepEqual(model.supported_endpoints, ["systemone", "chat", "responses", "embeddings"]);
  assert.equal(
    isDecisionCatalogRow("openrouter", {
      id: "synthetic/not-native",
      architecture: { output_modalities: ["decisions"] },
      supported_endpoints: ["chat"],
    }),
    false
  );
});
test("generic OpenAI catalog preserves source-pinned mixed endpoints without generalizing unknown models", async () => {
  const { getDeclaredModelEndpoints, getModelEndpointDecision } =
    await import("../../open-sse/services/modelEndpointPolicy.ts");
  const expected = ["chat", "responses", "systemone"];
  assert.deepEqual(getDeclaredModelEndpoints({ id: "gpt-6-luna" }, "openai"), expected);
  const known = toDecisionCatalogModel("openai", { id: "gpt-6-luna" });
  assert.equal(known.type, "chat");
  assert.deepEqual(known.supported_endpoints, expected);
  assert.equal(getModelEndpointDecision("openai", "gpt-6-luna").chatSelectable, true);
  assert.deepEqual(getDeclaredModelEndpoints({ id: "unverified-luna-like" }, "openai"), undefined);
  const explicit = toDecisionCatalogModel("openai", {
    id: "gpt-6-luna",
    supported_endpoints: ["decisions"],
  });
  assert.equal(explicit.type, "decision");
  assert.deepEqual(explicit.supported_endpoints, ["systemone"]);
});
