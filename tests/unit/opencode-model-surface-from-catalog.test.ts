/**
 * #16798 — each key-based opencode model can follow the request surface the published
 * catalog declares for it (`models.opencode.ai/api.json`, `provider.npm`), falling back to
 * the registry entry when the catalog is silent. Opt-in behind
 * OPENCODE_PUBLISHED_CATALOG_ROUTING_ENABLED: with the flag off the lookup answers nothing
 * and never reads the catalog, so `getModelTargetFormat` returns what it always returned.
 *
 * No test touches the network: the catalog map is seeded (or an injected fetch is counted)
 * through the module's seams, and every answer is read back through the production
 * lookups (`getModelTargetFormat`, `resolveOpencodeTargetFormat`). The flag is toggled
 * through its environment variable and resolved by the real feature-flag resolver, which
 * the OpenCode executor registers as the catalog gate when it loads.
 */
import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";

import { getModelTargetFormat } from "../../open-sse/config/providerModels.ts";
import { resolveOpencodeTargetFormat } from "../../open-sse/executors/opencode.ts";
import {
  configurePublishedCatalogForTests,
  getPublishedModelNpm,
  isPublishedCatalogRoutingEnabled,
  refreshPublishedCatalog,
  resetPublishedCatalogForTests,
  setPublishedCatalogRoutingGate,
  surfaceTargetFormatForNpm,
} from "../../open-sse/utils/opencodePublishedCatalog.ts";
import { isOpencodePublishedCatalogRoutingEnabled } from "../../src/shared/utils/featureFlags.ts";

const FLAG = "OPENCODE_PUBLISHED_CATALOG_ROUTING_ENABLED";

function catalogWithEntries() {
  return {
    opencode: {
      id: "opencode",
      api: "https://opencode.ai/inference/v1",
      models: {
        "respond-model": { provider: { npm: "@ai-sdk/openai" } },
        "message-model": { provider: { npm: "@ai-sdk/anthropic" } },
        "google-model": { provider: { npm: "@ai-sdk/google" } },
        "no-npm-model": { provider: {} },
        // Muse Spark is Responses-only by heuristic; the catalog answer wins when on.
        "muse-spark-9-test": { provider: { npm: "@ai-sdk/anthropic" } },
      },
    },
    "opencode-go": {
      id: "opencode-go",
      api: "https://opencode.ai/inference/go/v1",
      models: {
        "respond-model": { provider: { npm: "@ai-sdk/openai" } },
        "message-model": { provider: { npm: "@ai-sdk/anthropic" } },
        // The registry pins qwen3.8-max to Messages; the catalog must not move it.
        "qwen3.8-max": { provider: { npm: "@ai-sdk/openai" } },
      },
    },
  };
}

function countingFetch(body: unknown = catalogWithEntries()) {
  const calls: string[] = [];
  const fetchImpl = async (input: string) => {
    calls.push(input);
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  return { calls, fetchImpl };
}

beforeEach(() => {
  delete process.env[FLAG];
  resetPublishedCatalogForTests();
  // The executor import registered the real reader; re-assert it for every test.
  setPublishedCatalogRoutingGate(isOpencodePublishedCatalogRoutingEnabled);
});

afterEach(() => {
  delete process.env[FLAG];
  resetPublishedCatalogForTests();
  setPublishedCatalogRoutingGate(isOpencodePublishedCatalogRoutingEnabled);
});

// ── Flag off (default): the tip behavior, and no catalog read ────────────────

test("flag off: the catalog is ignored and getModelTargetFormat keeps the registry answer", () => {
  configurePublishedCatalogForTests(catalogWithEntries());
  assert.equal(isPublishedCatalogRoutingEnabled(), false);
  assert.equal(getPublishedModelNpm("opencode-zen", "respond-model"), undefined);
  assert.equal(getModelTargetFormat("opencode-zen", "respond-model"), null);
  assert.equal(resolveOpencodeTargetFormat("opencode-zen", "respond-model"), "openai");
  assert.equal(resolveOpencodeTargetFormat("opencode-zen", "message-model"), "openai");
  // Muse Spark heuristic and registry entries decide exactly as before.
  assert.equal(getModelTargetFormat("opencode-zen", "muse-spark-9-test"), "openai-responses");
  assert.equal(getModelTargetFormat("opencode-go", "qwen3.8-max"), "claude");
});

test("flag off: no lookup ever starts a catalog read", async () => {
  const { calls, fetchImpl } = countingFetch();
  configurePublishedCatalogForTests(null, { fetchImpl });
  for (let index = 0; index < 5; index += 1) {
    getModelTargetFormat("opencode-zen", "respond-model");
    resolveOpencodeTargetFormat("opencode-go", "message-model");
  }
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(calls, []);
});

test("an unregistered or throwing gate fails closed (off)", () => {
  configurePublishedCatalogForTests(catalogWithEntries());
  process.env[FLAG] = "true";
  setPublishedCatalogRoutingGate(null);
  assert.equal(isPublishedCatalogRoutingEnabled(), false);
  assert.equal(getModelTargetFormat("opencode-zen", "respond-model"), null);
  setPublishedCatalogRoutingGate(() => {
    throw new Error("resolver unavailable");
  });
  assert.equal(isPublishedCatalogRoutingEnabled(), false);
  assert.equal(getModelTargetFormat("opencode-zen", "respond-model"), null);
});

// ── Flag on: the published surface decides ──────────────────────────────────

test("flag on: a model published with @ai-sdk/openai resolves to /responses", () => {
  process.env[FLAG] = "true";
  configurePublishedCatalogForTests(catalogWithEntries());
  assert.equal(getPublishedModelNpm("opencode-zen", "respond-model"), "@ai-sdk/openai");
  assert.equal(surfaceTargetFormatForNpm("@ai-sdk/openai"), "openai-responses");
  assert.equal(getModelTargetFormat("opencode-zen", "respond-model"), "openai-responses");
  assert.equal(resolveOpencodeTargetFormat("opencode-zen", "respond-model"), "openai-responses");
  assert.equal(resolveOpencodeTargetFormat("opencode-go", "respond-model"), "openai-responses");
});

test("flag on: a model published with @ai-sdk/anthropic resolves to /messages", () => {
  process.env[FLAG] = "true";
  configurePublishedCatalogForTests(catalogWithEntries());
  assert.equal(getPublishedModelNpm("opencode-zen", "message-model"), "@ai-sdk/anthropic");
  assert.equal(surfaceTargetFormatForNpm("@ai-sdk/anthropic"), "claude");
  assert.equal(resolveOpencodeTargetFormat("opencode-zen", "message-model"), "claude");
  assert.equal(resolveOpencodeTargetFormat("opencode-go", "message-model"), "claude");
});

test("flag on: the catalog surface wins over the Muse Spark heuristic", () => {
  process.env[FLAG] = "true";
  configurePublishedCatalogForTests(catalogWithEntries());
  assert.equal(getModelTargetFormat("opencode-zen", "muse-spark-9-test"), "claude");
});

test("flag on: an effort suffix reads its base model's published surface", () => {
  process.env[FLAG] = "true";
  configurePublishedCatalogForTests(catalogWithEntries());
  assert.equal(getModelTargetFormat("opencode-zen", "respond-model-high"), "openai-responses");
});

test("flag on: the registry override still wins over the catalog", () => {
  process.env[FLAG] = "true";
  configurePublishedCatalogForTests(catalogWithEntries());
  assert.equal(getPublishedModelNpm("opencode-go", "qwen3.8-max"), "@ai-sdk/openai");
  assert.equal(resolveOpencodeTargetFormat("opencode-go", "qwen3.8-max"), "claude");
  assert.equal(getModelTargetFormat("opencode-go", "qwen3.8-max"), "claude");
});

test("flag on: a silent catalog, no npm, or an unmeasured SDK keeps the registry answer", () => {
  process.env[FLAG] = "true";
  configurePublishedCatalogForTests(catalogWithEntries());
  assert.equal(getPublishedModelNpm("opencode-zen", "no-npm-model"), undefined);
  assert.equal(resolveOpencodeTargetFormat("opencode-zen", "no-npm-model"), "openai");
  assert.equal(getPublishedModelNpm("opencode-zen", "google-model"), "@ai-sdk/google");
  assert.equal(surfaceTargetFormatForNpm("@ai-sdk/mistral"), null);
  assert.equal(resolveOpencodeTargetFormat("opencode-zen", "google-model"), "openai");
  assert.equal(getPublishedModelNpm("opencode-go", "deepseek-v4-pro"), undefined);
  assert.equal(
    resolveOpencodeTargetFormat("opencode-go", "deepseek-v4-pro"),
    getModelTargetFormat("opencode-go", "deepseek-v4-pro") || "openai"
  );
});

test("flag on: providers outside Zen/Go (incl. the removed keyless opencode/oc) never read it", () => {
  process.env[FLAG] = "true";
  configurePublishedCatalogForTests(catalogWithEntries());
  for (const provider of ["opencode", "oc", "openai", "github"]) {
    assert.equal(getPublishedModelNpm(provider, "respond-model"), undefined, provider);
  }
});

test("flag on: a cold map starts ONE coalesced background read that fills it", async () => {
  process.env[FLAG] = "true";
  const { calls, fetchImpl } = countingFetch();
  configurePublishedCatalogForTests(null, { fetchImpl });
  // Cold: the first lookups answer from the registry while one read starts.
  assert.equal(getModelTargetFormat("opencode-zen", "respond-model"), null);
  assert.equal(getModelTargetFormat("opencode-go", "message-model"), null);
  await refreshPublishedCatalog();
  assert.equal(calls.length, 1, "concurrent lookups share one catalog read");
  assert.equal(calls[0], "https://models.opencode.ai/api.json");
  assert.equal(getModelTargetFormat("opencode-zen", "respond-model"), "openai-responses");
  assert.equal(getModelTargetFormat("opencode-go", "message-model"), "claude");
  // Fresh map: further lookups do not read again.
  getModelTargetFormat("opencode-zen", "respond-model");
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(calls.length, 1);
});

test("flag on: a failed read keeps the previous map", async () => {
  process.env[FLAG] = "true";
  configurePublishedCatalogForTests(catalogWithEntries(), {
    fetchImpl: async () => new Response("down", { status: 503 }),
  });
  await refreshPublishedCatalog();
  assert.equal(getModelTargetFormat("opencode-zen", "respond-model"), "openai-responses");
});

test("re-seeding the catalog drops every entry the new read does not carry", () => {
  process.env[FLAG] = "true";
  configurePublishedCatalogForTests(catalogWithEntries());
  for (let index = 0; index < 5; index += 1) {
    assert.equal(getPublishedModelNpm("opencode-zen", "respond-model"), "@ai-sdk/openai");
  }
  configurePublishedCatalogForTests({
    opencode: { models: { "only-model": { provider: { npm: "@ai-sdk/anthropic" } } } },
  });
  assert.equal(getPublishedModelNpm("opencode-zen", "respond-model"), undefined);
  assert.equal(getPublishedModelNpm("opencode-zen", "only-model"), "@ai-sdk/anthropic");
});
