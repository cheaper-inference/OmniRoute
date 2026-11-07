import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  freeOnlyImportHintKey,
  isCompatibleFreeImportProvider,
  isFreeModel,
  providerSupportsFreeOnlyImport,
  selectModelsForImport,
} from "../../src/shared/utils/freeModels.ts";

const OPENAI_NODE = "openai-compatible-12345678-1234-1234-1234-123456789abc";
const ANTHROPIC_NODE = "anthropic-compatible-12345678-1234-1234-1234-123456789abc";
const CC_NODE = "anthropic-compatible-cc-12345678-1234-1234-1234-123456789abc";

const ids = (models: Array<{ id?: string }>) => models.map((m) => m.id);

describe("free-only import on OpenAI/Anthropic-compatible nodes", () => {
  const mixed = [
    { id: "a:free" },
    { id: "b", pricing: { prompt: "0", completion: "0" } },
    { id: "c", pricing: { prompt: "0.000001", completion: "0" } },
    { id: "d" },
  ];

  it("keeps only payload-proven free models on an OpenAI-compatible node", () => {
    const result = selectModelsForImport(OPENAI_NODE, mixed, true);
    assert.deepEqual(ids(result.models), ["a:free", "b"]);
    assert.equal(result.freeFilterEmpty, false);
  });

  it("applies the same rule to an Anthropic-compatible node", () => {
    const result = selectModelsForImport(ANTHROPIC_NODE, mixed, true);
    assert.deepEqual(ids(result.models), ["a:free", "b"]);
  });

  it("vetoes a zero price when the payload also carries a paid signal", () => {
    const models = [
      { id: "flag-false", free: false, pricing: { prompt: 0, completion: 0 } },
      { id: "per-request", pricing: { prompt: "0", completion: "0", request: "0.01" } },
      { id: "suffix-but-billed:free", pricing: { prompt: 0, completion: 0.002 } },
      { id: "tier-paid", tier: "paid", pricing: { prompt: 0, completion: 0 } },
      { id: "contradictory", isFree: true, is_free: false },
    ];
    const result = selectModelsForImport(OPENAI_NODE, models, true);
    assert.deepEqual(result.models, []);
    assert.equal(result.freeFilterEmpty, true);
  });

  it("never treats unknown or malformed pricing as free", () => {
    const models = [
      { id: "unspecified" },
      { id: "prompt-only", pricing: { prompt: 0 } },
      { id: "null-price", pricing: { prompt: null, completion: null } },
      { id: "blank-price", pricing: { prompt: " ", completion: "" } },
      { id: "negative-price", pricing: { prompt: -1, completion: -1 } },
      { id: "string-flag", free: "true" },
      { id: "model-free" },
    ];
    const result = selectModelsForImport(OPENAI_NODE, models, true);
    assert.deepEqual(result.models, []);
    assert.equal(result.freeFilterEmpty, true);
  });

  it("accepts an explicit free flag with no positive price", () => {
    const models = [
      { id: "flag", free: true },
      { id: "is-free", is_free: true, pricing: { prompt: "0", completion: "0" } },
    ];
    assert.deepEqual(ids(selectModelsForImport(OPENAI_NODE, models, true).models), [
      "flag",
      "is-free",
    ]);
  });

  it("returns the fetched list unchanged when free-only is off", () => {
    const result = selectModelsForImport(OPENAI_NODE, mixed, false);
    assert.equal(result.models, mixed);
    assert.equal(result.freeFilterEmpty, false);
  });

  it("does not change isFreeModel for compatible nodes (routing and badges keep their rule)", () => {
    assert.equal(
      isFreeModel(OPENAI_NODE, { id: "b", pricing: { prompt: 0, completion: 0 } }),
      false
    );
    assert.equal(isFreeModel(OPENAI_NODE, { id: "a:free" }), false);
  });

  it("keeps the documented-free-tier behaviour for registered providers", () => {
    const models = [
      { id: "meta/llama:free" },
      { id: "zero", pricing: { prompt: "0", completion: "0" } },
      { id: "paid", pricing: { prompt: "0.000001", completion: "0" } },
    ];
    assert.deepEqual(ids(selectModelsForImport("openrouter", models, true).models), [
      "meta/llama:free",
      "zero",
    ]);
    const anthropic = selectModelsForImport("anthropic", [{ id: "x:free" }], true);
    assert.deepEqual(anthropic.models, []);
    assert.equal(anthropic.freeFilterEmpty, true);
  });

  it("offers the free-only toggle on compatible nodes but not on Claude Code nodes", () => {
    assert.equal(isCompatibleFreeImportProvider(OPENAI_NODE), true);
    assert.equal(isCompatibleFreeImportProvider(ANTHROPIC_NODE), true);
    assert.equal(isCompatibleFreeImportProvider(CC_NODE), false);
    assert.equal(isCompatibleFreeImportProvider("openai"), false);
    assert.equal(isCompatibleFreeImportProvider(undefined), false);

    assert.equal(providerSupportsFreeOnlyImport(OPENAI_NODE), true);
    assert.equal(providerSupportsFreeOnlyImport(ANTHROPIC_NODE), true);
    assert.equal(providerSupportsFreeOnlyImport(CC_NODE), false);
    assert.equal(providerSupportsFreeOnlyImport("openrouter"), true);
    assert.equal(providerSupportsFreeOnlyImport("anthropic"), false);
    assert.equal(providerSupportsFreeOnlyImport(null), false);

    assert.equal(freeOnlyImportHintKey(OPENAI_NODE), "importFreeModelsOnlyCompatibleHint");
    assert.equal(freeOnlyImportHintKey("openrouter"), "importFreeModelsOnlyHint");
  });
});
