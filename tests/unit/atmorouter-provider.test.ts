import assert from "node:assert/strict";
import test from "node:test";

import { atmorouterProvider } from "../../open-sse/config/providers/registry/atmorouter/index.ts";

test("AtmoRouter routes through the standard authenticated OpenAI endpoints", async () => {
  const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
  const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
  const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");
  const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");

  assert.equal(REGISTRY.atmorouter, atmorouterProvider);
  assert.equal(atmorouterProvider.format, "openai");
  assert.equal(atmorouterProvider.executor, "default");
  assert.equal(atmorouterProvider.authType, "apikey");
  assert.equal(atmorouterProvider.authHeader, "bearer");
  assert.equal(atmorouterProvider.baseUrl, "https://atmorouter.dev/v1/chat/completions");
  // AtmoRouter has no public /v1/responses endpoint — chat completions only.
  assert.equal(atmorouterProvider.responsesBaseUrl, undefined);
  assert.equal(atmorouterProvider.modelsUrl, "https://atmorouter.dev/v1/models");
  assert.equal(atmorouterProvider.passthroughModels, true);
  assert.equal(PROVIDER_ENDPOINTS.atmorouter, atmorouterProvider.baseUrl);
  assert.equal(APIKEY_PROVIDERS.atmorouter.passthroughModels, true);
  assert.equal(APIKEY_PROVIDERS.atmorouter.website, "https://atmorouter.dev");
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("atmorouter"), true);
});

test("AtmoRouter seed models keep their upstream family prefix", () => {
  const ids = atmorouterProvider.models.map((m) => m.id);
  assert.ok(ids.length > 0);
  assert.equal(new Set(ids).size, ids.length, "duplicate seed model ids");
  for (const id of ids) {
    assert.match(id, /^[a-z]+\/[A-Za-z0-9._-]+$/, `unexpected AtmoRouter model id: ${id}`);
  }
  assert.ok(ids.includes("cbcn/glm-5.3"), "docs example model must stay seeded");
});
