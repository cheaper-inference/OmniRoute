import test from "node:test";
import assert from "node:assert/strict";
import { DECISION_PROVIDER_IDS, APIKEY_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";
import { resolveDecisionBackend } from "../../open-sse/config/decisionRegistry.ts";
import { getStaticModelsForProvider } from "../../src/lib/providers/staticModels.ts";
import { getModelEndpointDecision } from "../../open-sse/services/modelEndpointPolicy.ts";
import { annotateNativeDecisionCapabilities } from "../../open-sse/config/decisionCapabilities.ts";
import {
  readProviderFiltersFromUrl,
  isPrimaryLlmProviderEntry,
} from "../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts";
import { buildCompactProviderEntriesForPage } from "../../src/app/(dashboard)/dashboard/providers/providerCompactMode.ts";

test("decision category reuses six canonical provider identities", () => {
  assert.deepEqual(
    [...DECISION_PROVIDER_IDS],
    ["supersoniclabs", "ollama-cloud", "openai", "openrouter", "cloudflare-ai", "orcarouter"]
  );
  for (const id of DECISION_PROVIDER_IDS) assert.equal(APIKEY_PROVIDERS[id].id, id);
  assert.equal(
    readProviderFiltersFromUrl(new URLSearchParams("cat=decisions")).category,
    "decisions"
  );
});
test("native Supersonic has declared Julia metadata and cannot route chat", () => {
  const entry = getRegistryEntry("supersoniclabs");
  assert.equal(entry?.models?.[0].id, "julia-1");
  const backend = resolveDecisionBackend("supersoniclabs", { apiKey: "test" });
  assert.equal(backend.url, "https://api.supersoniclabs.ai/v1/systemone");
  assert.deepEqual(backend.models, ["julia-1"]);
  assert.deepEqual(getStaticModelsForProvider("supersoniclabs")?.[0].supportedEndpoints, [
    "systemone",
  ]);
  assert.equal(
    getModelEndpointDecision("supersoniclabs", "julia-1", ["chat"]).chatSelectable,
    false
  );
  const row = annotateNativeDecisionCapabilities([
    { id: "supersoniclabs/julia-1", context_length: 128000, limit: { context: 128000 } },
  ])[0];
  assert.equal(row.type, "decisions");
  assert.equal(row.context_length, null);
  assert.equal((row.limit as Record<string, unknown>).context, null);
  assert.equal(
    isPrimaryLlmProviderEntry({
      providerId: "supersoniclabs",
      provider: APIKEY_PROVIDERS.supersoniclabs,
      stats: {},
      displayAuthType: "apikey",
      toggleAuthType: "apikey",
    }),
    false
  );
});
test("decision category works in compact display without duplicating identities", () => {
  const rows = [...DECISION_PROVIDER_IDS].map((providerId) => ({
    providerId,
    provider: APIKEY_PROVIDERS[providerId],
    stats: {},
    displayAuthType: "apikey" as const,
    toggleAuthType: "apikey" as const,
  }));
  const options = {
    activeCategory: "decisions",
    showFreeOnly: false,
    decisionProviderEntries: rows,
    freeSectionEntries: [],
    compatibleProviderEntries: [],
    oauthProviderEntries: [],
    ideProviderEntries: [],
    noAuthEntries: [],
    upstreamProxyEntries: [],
    llmProviderEntries: [],
    aggregatorProviderEntries: [],
    enterpriseProviderEntries: [],
    embeddingRerankProviderEntries: [],
    imageProviderEntries: [],
    videoProviderEntries: [],
    webCookieProviderEntries: [],
    searchProviderEntries: [],
    webFetchEntries: [],
    audioProviderEntries: [],
    localProviderEntries: [],
    cloudAgentProviderEntries: [],
  };
  const result = buildCompactProviderEntriesForPage(options);
  assert.equal(result.length, 6);
  assert.equal(new Set(result.map((r) => r.providerId)).size, 6);
  assert.deepEqual(
    buildCompactProviderEntriesForPage({ ...options, decisionProviderEntries: undefined }),
    []
  );
  assert.deepEqual(buildCompactProviderEntriesForPage({ ...options, showFreeOnly: true }), []);
  for (const activeCategory of ["all", "unknown", "__proto__"]) {
    assert.deepEqual(
      buildCompactProviderEntriesForPage({ ...options, activeCategory }).map((r) => r.providerId),
      result.map((r) => r.providerId)
    );
  }
});
