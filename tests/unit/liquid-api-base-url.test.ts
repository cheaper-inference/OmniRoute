/**
 * Liquid AI serves its OpenAI-compatible API at https://api.liquid.ai/openai/v1
 * (docs.liquid.ai/api/quickstart). On 2026-11-26 a new key answered 401 "Could not
 * validate credentials" on the old inference.liquid.ai host and 200 on the new one,
 * so key validation, model discovery and chat all failed against the old host.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { liquidProvider } = await import("../../open-sse/config/providers/registry/liquid/index.ts");
const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

test("Liquid chat and model discovery use api.liquid.ai/openai/v1", () => {
  assert.equal(liquidProvider.baseUrl, "https://api.liquid.ai/openai/v1/chat/completions");
  assert.equal(liquidProvider.modelsUrl, "https://api.liquid.ai/openai/v1/models");
  assert.ok(liquidProvider.models.some((model) => model.id === "lfm3-1.7b"));
});

test("a Liquid key is validated against the new models endpoint", async () => {
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = input instanceof Request ? input.url : String(input);
    urls.push(url);
    return url.startsWith("https://api.liquid.ai/openai/v1/")
      ? Response.json({ object: "list", data: [{ id: "lfm3-1.7b", object: "model" }] })
      : Response.json({ detail: "Could not validate credentials" }, { status: 401 });
  }) as typeof fetch;
  try {
    const result = await validateProviderApiKey({
      provider: "liquid",
      apiKey: "liquid_test",
      providerSpecificData: {},
    });
    assert.equal(result.valid, true);
    assert.deepEqual(urls, ["https://api.liquid.ai/openai/v1/models"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
