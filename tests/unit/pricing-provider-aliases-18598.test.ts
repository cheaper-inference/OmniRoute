import assert from "node:assert/strict";
import test from "node:test";
import { normalizeLiteLLMPricingProviders } from "../../src/lib/litellmPricingProviderAliases.ts";

test("maps Go source spelling without leaking rates to Zen", () => {
  assert.deepEqual(normalizeLiteLLMPricingProviders({ opencode_go: { glm: { input: 1.4 } } }), {
    "opencode-go": { glm: { input: 1.4 } },
  });
});

test("preserves unrelated underscore providers and Ollama buckets", () => {
  const pricing = {
    unrelated_provider: { model: { input: 3 } },
    ollama: { local: { input: 0 } },
    ollama_cloud: { cloud: { input: 1 } },
    "ollama-cloud": { cloud: { input: 2 } },
    ollamacloud: { cloud: { input: 4 } },
    "opencode-zen": { glm: { input: 9 } },
    opencode_go: { glm: { input: 1.4 } },
  };
  const result = normalizeLiteLLMPricingProviders(pricing);
  for (const key of [
    "unrelated_provider",
    "ollama",
    "ollama_cloud",
    "ollama-cloud",
    "ollamacloud",
    "opencode-zen",
  ]) {
    assert.deepEqual(result[key], pricing[key]);
  }
  assert.equal(result.opencode_go, undefined);
});

test("canonical fields win independent of bucket order", () => {
  const alias = { glm: { input: 1.4, output: 4.4, cached: 0.26 } };
  const canonical = { glm: { input: 2 } };
  for (const pricing of [
    { opencode_go: alias, "opencode-go": canonical },
    { "opencode-go": canonical, opencode_go: alias },
  ]) {
    assert.deepEqual(normalizeLiteLLMPricingProviders(pricing), {
      "opencode-go": { glm: { input: 2, output: 4.4, cached: 0.26 } },
    });
  }
});

test("canonical zero beats legacy nonzero", () => {
  assert.deepEqual(
    normalizeLiteLLMPricingProviders({
      "opencode-go": { glm: { input: 0, cached: 0 } },
      opencode_go: { glm: { input: 1.4, output: 4.4, cached: 0.26 } },
    }),
    { "opencode-go": { glm: { input: 0, output: 4.4, cached: 0 } } }
  );
});

test("alias-only models and metadata survive", () => {
  const metadata = {
    input: 1,
    output_cost_per_image: 0.04,
    long_context: { threshold: 200_000, input: 2 },
    custom: "kept",
  };
  const result = normalizeLiteLLMPricingProviders({
    "opencode-go": { other: { input: 3 } },
    opencode_go: { glm: metadata },
  });
  assert.deepEqual(result["opencode-go"].glm, metadata);
  assert.deepEqual(result["opencode-go"].other, { input: 3 });
});

test("case-variant precedence is stable", () => {
  assert.deepEqual(
    normalizeLiteLLMPricingProviders({
      OPENCODE_GO: { glm: { input: 1, output: 4.4 } },
      opencode_go: { glm: { input: 99 }, laterAlias: { input: 99 } },
      "OPENCODE-GO": { glm: { input: 0 } },
      "opencode-go": { glm: { input: 99 }, laterCanonical: { input: 99 } },
    }),
    { "opencode-go": { glm: { input: 0, output: 4.4 } } }
  );
});

test("normalization does not mutate and is idempotent", () => {
  const aliasRow = Object.freeze({ input: 1, output: 4.4 });
  const canonicalRow = Object.freeze({ input: 2 });
  const input = Object.freeze({
    opencode_go: Object.freeze({ glm: aliasRow }),
    "opencode-go": Object.freeze({ glm: canonicalRow }),
  });
  const result = normalizeLiteLLMPricingProviders(input);
  assert.deepEqual(input.opencode_go.glm, { input: 1, output: 4.4 });
  assert.deepEqual(input["opencode-go"].glm, { input: 2 });
  assert.deepEqual(normalizeLiteLLMPricingProviders(result), result);
});
