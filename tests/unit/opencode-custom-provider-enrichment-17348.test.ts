import test from "node:test";
import assert from "node:assert/strict";
import {
  buildCanonicalToAliasMap,
  defaultOmniRouteEnrichmentFetcher,
  lookupEnrichment,
} from "../../@omniroute/opencode-plugin-v2/src/shared/enrich.ts";

const originalFetch = globalThis.fetch;
test.after(() => {
  globalThis.fetch = originalFetch;
});

test("#17348: compatible node indexes enrichment under the public prefix, not UUID", async () => {
  const nodeId = "openai-compatible-chat-8d3c46c4-20bc-40ad-a837-c475f578dc8a";
  const requests: string[] = [];
  globalThis.fetch = (async (input: unknown) => {
    const url = String(input);
    requests.push(url);
    const body = url.endsWith("/api/pricing/models")
      ? {
          [nodeId]: {
            id: nodeId,
            alias: nodeId,
            displayPrefix: "ih",
            name: "Custom Inference",
            models: [
              { id: "kimi-k3", name: "Kimi K3" },
              { id: "org/nested-model", name: "Nested Model" },
              { id: "ih/already-prefixed", name: "Already Prefixed" },
              { id: "ag/old-prefix-claim", name: "Old Prefix Claim" },
            ],
          },
        }
      : url.endsWith("/api/pricing")
        ? {
            [nodeId]: {
              "kimi-k3": { input: 1, output: 2 },
              "org/nested-model": { input: 3, output: 4 },
              "ih/already-prefixed": { input: 5, output: 6 },
            },
          }
        : { perModel: [] };
    return { ok: true, status: 200, json: async () => body };
  }) as typeof fetch;

  try {
    const enrichment = await defaultOmniRouteEnrichmentFetcher(
      "https://gateway.example.com/v1",
      "test-key"
    );
    const aliases = buildCanonicalToAliasMap(enrichment);
    assert.equal(requests.length, 3);
    assert.equal(enrichment.get("ih/kimi-k3")?.providerAlias, "ih");
    assert.equal(enrichment.get("ih/kimi-k3")?.providerCanonical, nodeId);
    assert.equal(enrichment.get("ih/kimi-k3")?.providerDisplayName, "Custom Inference");
    assert.deepEqual(enrichment.get("ih/kimi-k3")?.pricing, { input: 1, output: 2 });
    assert.deepEqual(enrichment.get("ih/org/nested-model")?.pricing, { input: 3, output: 4 });
    assert.deepEqual(enrichment.get("ih/already-prefixed")?.pricing, { input: 5, output: 6 });
    assert.equal(enrichment.has("ih/ih/already-prefixed"), false);
    assert.equal(enrichment.get("ih/unknown")?.pricing, undefined);
    assert.equal(enrichment.get("ih/kimi-k3")?.freeType, undefined);
    assert.deepEqual(lookupEnrichment("ih/kimi-k3", enrichment, aliases, "ih")?.pricing, {
      input: 1,
      output: 2,
    });
    // A stale prefix is not rewritten speculatively: 'ag' may be part of a
    // legitimate upstream model ID. Do not fabricate a matching current ID.
    assert.equal(enrichment.has("ih/old-prefix-claim"), false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#17348: same model sold by two nodes retains independent pricing", async () => {
  const id1 = "openai-compatible-chat-one";
  const id2 = "openai-compatible-chat-two";
  globalThis.fetch = (async (input: unknown) => {
    const url = String(input);
    const body = url.endsWith("/api/pricing/models")
      ? {
          [id1]: { id: id1, displayPrefix: "ih", name: "First", models: [{ id: "shared" }] },
          [id2]: { id: id2, displayPrefix: "si", name: "Second", models: [{ id: "shared" }] },
        }
      : url.endsWith("/api/pricing")
        ? { [id1]: { shared: { input: 1 } }, [id2]: { shared: { input: 9 } } }
        : { perModel: [] };
    return { ok: true, status: 200, json: async () => body };
  }) as typeof fetch;
  try {
    const result = await defaultOmniRouteEnrichmentFetcher("https://gateway.example", "key");
    assert.equal(result.get("ih/shared")?.pricing?.input, 1);
    assert.equal(result.get("si/shared")?.pricing?.input, 9);
    assert.equal(result.get("shared")?.pricing?.input, 1);
    assert.equal(result.get("shared")?.providerAlias, "ih");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
