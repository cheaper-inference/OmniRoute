import test from "node:test";
import assert from "node:assert/strict";
import {
  defaultOmniRouteEnrichmentFetcher,
  lookupEnrichment,
  buildCanonicalToAliasMap,
} from "../../@omniroute/opencode-plugin-v2/src/shared/enrich.ts";

test("canonical catalog preserves distinct upstream model IDs sharing its alias", async () => {
  const orig = globalThis.fetch;
  globalThis.fetch = (async (input: unknown) => {
    const url = String(input);
    const body = url.endsWith("/api/pricing/models")
      ? {
          zz: {
            id: "example-canonical",
            alias: "zz",
            models: [
              { id: "shared", name: "Short" },
              { id: "zz/shared", name: "Nested" },
            ],
          },
        }
      : url.endsWith("/api/pricing")
        ? { zz: { shared: { input: 1 }, "zz/shared": { input: 9 } } }
        : { perModel: [] };
    return { ok: true, status: 200, json: async () => body };
  }) as typeof fetch;
  try {
    const map = await defaultOmniRouteEnrichmentFetcher("https://gateway.example", "synthetic-key");
    const aliases = buildCanonicalToAliasMap(map);
    assert.equal(map.has("zz/zz/shared"), true);
    assert.equal(lookupEnrichment("zz/zz/shared", map, aliases, "zz")?.pricing?.input, 9);
    assert.equal(lookupEnrichment("zz/zz/shared", map, aliases, "zz")?.name, "Nested");
  } finally {
    globalThis.fetch = orig;
  }
});

test("public pricingKey and canonical free-tier map onto a custom displayPrefix", async () => {
  const orig = globalThis.fetch;
  const node = "openai-compatible-chat-review";
  globalThis.fetch = (async (input: unknown) => {
    const url = String(input);
    const body = url.endsWith("/api/pricing/models")
      ? {
          [node]: {
            id: node,
            displayPrefix: "ih",
            pricingKey: "ih",
            models: [{ id: "org/model" }, { id: "unknown" }],
          },
        }
      : url.endsWith("/api/pricing")
        ? { ih: { "org/model": { input: 3, output: 4 } } }
        : {
            perModel: [
              {
                provider: node,
                modelId: "org/model",
                freeType: "recurring-monthly",
                monthlyTokens: 100,
              },
            ],
          };
    return { ok: true, status: 200, json: async () => body };
  }) as typeof fetch;
  try {
    const map = await defaultOmniRouteEnrichmentFetcher("https://gateway.example", "synthetic-key");
    assert.deepEqual(map.get("ih/org/model")?.pricing, { input: 3, output: 4 });
    assert.equal(map.get("ih/org/model")?.freeType, "recurring-monthly");
    assert.equal(map.get("ih/unknown")?.pricing, undefined);
    assert.equal(map.get("ih/unknown")?.freeType, undefined);
  } finally {
    globalThis.fetch = orig;
  }
});
