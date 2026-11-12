import assert from "node:assert/strict";
import test from "node:test";
import { collectConnectionCatalog } from "../src/omniroute/connectionCatalog.ts";
import { enrichLocalEndpoints } from "../src/catalog.ts";

function response(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function fixtureFetch(
  connections: Array<{ id: string; provider: string; isActive: boolean }>,
  modelsByConnection: Record<string, string[]>,
): typeof fetch {
  return async (input) => {
    const url = String(input);
    if (url.endsWith("/api/providers")) {
      return response({ connections });
    }
    const match = /\/api\/providers\/([^/]+)\/models$/.exec(url);
    if (match) return response({ models: modelsByConnection[match[1]] ?? [] });
    return response({ error: "not found" }, 404);
  };
}

test("two installations produce disjoint local endpoint catalogs", async () => {
  const a = await collectConnectionCatalog({
    baseUrl: "https://omni.test",
    apiKey: "key",
    policy: { a: { billingClass: "subscription" } },
    fetchImpl: fixtureFetch(
      [{ id: "a", provider: "claude", isActive: true }],
      { a: ["claude-fable-5.2"] },
    ),
  });
  const b = await collectConnectionCatalog({
    baseUrl: "https://omni.test",
    apiKey: "key",
    policy: { b: { billingClass: "subscription" } },
    fetchImpl: fixtureFetch(
      [{ id: "b", provider: "opencode-go", isActive: true }],
      { b: ["qwen3.8-max"] },
    ),
  });
  assert.deepEqual(a.map((e) => e.modelId), ["claude-fable-5.2"]);
  assert.deepEqual(b.map((e) => e.modelId), ["qwen3.8-max"]);
});

test("models.dev metadata never invents a routable endpoint", () => {
  const local = [
    {
      connectionId: "a",
      providerId: "claude",
      modelId: "claude-fable-5.2",
      billingClass: "subscription" as const,
      active: true,
    },
  ];
  const enriched = enrichLocalEndpoints(local, [
    { modelId: "claude-fable-5.2", familyId: "claude/fable" },
    { modelId: "gpt-99-future", familyId: "gpt/future" },
  ]);
  assert.equal(enriched.length, 1);
  assert.equal(enriched[0].endpoint.modelId, "claude-fable-5.2");
  assert.equal(enriched[0].metadata?.familyId, "claude/fable");
});

test("same provider/model across two accounts preserves both endpoints", async () => {
  const endpoints = await collectConnectionCatalog({
    baseUrl: "https://omni.test",
    apiKey: "key",
    policy: {
      a: { billingClass: "subscription" },
      b: { billingClass: "subscription" },
    },
    fetchImpl: fixtureFetch(
      [
        { id: "a", provider: "github", isActive: true },
        { id: "b", provider: "github", isActive: true },
      ],
      { a: ["claude-fable-5.1"], b: ["claude-fable-5.1"] },
    ),
  });
  assert.deepEqual(
    endpoints.map((e) => e.connectionId).sort(),
    ["a", "b"],
  );
});

test("unknown connection billing policy is excluded", async () => {
  const endpoints = await collectConnectionCatalog({
    baseUrl: "https://omni.test",
    apiKey: "key",
    policy: {},
    fetchImpl: fixtureFetch(
      [{ id: "a", provider: "claude", isActive: true }],
      { a: ["claude-fable-5.2"] },
    ),
  });
  assert.deepEqual(endpoints, []);
});
