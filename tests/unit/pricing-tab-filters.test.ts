/**
 * Costs > Pricing: the "Configured only" provider filter and the model-scoped search
 * (a model search lists only the matching models under each provider).
 */

import assert from "node:assert/strict";
import test from "node:test";

const { collectConnectedProviderIds, isPricingProviderConfigured, modelsMatchingSearch } =
  await import("../../src/app/(dashboard)/dashboard/settings/components/pricingTabFilters.ts");

const NODE_ID = "openai-compatible-chat-3f2a9c1e-0000-4000-8000-000000000001";

test("collectConnectedProviderIds keeps string provider ids and skips malformed rows", () => {
  const ids = collectConnectedProviderIds([
    { provider: "openrouter" },
    { provider: "openrouter" },
    { provider: NODE_ID },
    { provider: "" },
    { provider: 42 },
    {},
  ]);
  assert.deepEqual([...ids].sort(), [NODE_ID, "openrouter"].sort());
  assert.equal(collectConnectedProviderIds(null).size, 0);
});

test("a provider with a connection is configured; one without is not", () => {
  const connected = new Set(["openrouter"]);
  assert.equal(
    isPricingProviderConfigured({ id: "openrouter", alias: "openrouter" }, connected),
    true
  );
  assert.equal(
    isPricingProviderConfigured({ id: "opencode-go", alias: "opencode-go" }, connected),
    false
  );
});

test("a connection stored under a family alias configures the canonical provider", () => {
  assert.equal(
    isPricingProviderConfigured({ id: "xai", alias: "xai" }, new Set(["xai-oauth"])),
    true
  );
});

test("a compatible node matches by node id even though the catalog lists its prefix", () => {
  assert.equal(
    isPricingProviderConfigured({ id: NODE_ID, alias: "local" }, new Set([NODE_ID])),
    true
  );
});

test("no-auth providers count as configured without a connection, like the Providers page", () => {
  assert.equal(
    isPricingProviderConfigured({ id: "devin-cli-agentic", alias: "dva" }, new Set()),
    true
  );
});

const MODELS = [
  { id: "glm-5.2", name: "GLM 5.2" },
  { id: "glm-5.3-flash", name: "GLM 5.3 Flash" },
  { id: "kimi-k3", name: "Kimi K3" },
];

test("an empty search keeps every model", () => {
  assert.equal(
    modelsMatchingSearch({ id: "opencode-go", alias: "opencode-go" }, MODELS, "  ").length,
    3
  );
});

test("a model search keeps only the matching models", () => {
  const provider = { id: "opencode-go", alias: "opencode-go" };
  assert.deepEqual(
    modelsMatchingSearch(provider, MODELS, "glm-5.2").map((m) => m.id),
    ["glm-5.2"]
  );
  assert.deepEqual(
    modelsMatchingSearch(provider, MODELS, "Kimi").map((m) => m.id),
    ["kimi-k3"]
  );
});

test("a search that matches the provider keeps its whole model list", () => {
  assert.equal(
    modelsMatchingSearch({ id: "opencode-go", alias: "opencode-go" }, MODELS, "opencode").length,
    3
  );
  assert.equal(modelsMatchingSearch({ id: NODE_ID, alias: "local" }, MODELS, "local").length, 3);
});
