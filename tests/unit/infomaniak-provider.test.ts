import test from "node:test";
import assert from "node:assert/strict";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
const { isBaseUrlConfigurableProvider, getProviderBaseUrlPlaceholder } =
  await import("../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts");
const { NAMED_OPENAI_STYLE_PROVIDERS } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerSets.ts");

// Infomaniak AI Tools puts the account's product id in the endpoint path, so every
// connection carries its own Base URL.
const BASE_URL = "https://api.infomaniak.com/2/ai/12345/openai/v1";

const originalFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("infomaniak is registered as an OpenAI-format API-key provider", () => {
  const entry = APIKEY_PROVIDERS.infomaniak;
  assert.ok(entry, "APIKEY_PROVIDERS.infomaniak must be defined");
  assert.equal(entry.alias, "imk");
  assert.ok(entry.authHint);

  const registry = providerRegistry.infomaniak;
  assert.ok(registry, "providerRegistry.infomaniak must be defined");
  assert.equal(registry.format, "openai");
  assert.equal(registry.executor, "default");
  assert.equal(registry.authType, "apikey");
  assert.ok(registry.models.length > 0, "offline seed catalog must not be empty");
  assert.ok(NAMED_OPENAI_STYLE_PROVIDERS.has("infomaniak"), "live /models discovery");
});

test("infomaniak exposes the Base URL field with the product-id placeholder", () => {
  assert.equal(isBaseUrlConfigurableProvider("infomaniak"), true);
  assert.match(getProviderBaseUrlPlaceholder("infomaniak") ?? "", /<product_id>/);
});

for (const baseUrl of [BASE_URL, `${BASE_URL}/`, `${BASE_URL}/chat/completions`]) {
  test(`infomaniak routes chat to the connection Base URL (${baseUrl})`, () => {
    const executor = new DefaultExecutor("infomaniak");
    const url = executor.buildUrl("google/gemma-4-31B-it", false, 0, {
      apiKey: "k",
      providerSpecificData: { baseUrl },
    });
    assert.equal(url, `${BASE_URL}/chat/completions`);
  });
}

test("infomaniak validation rejects a connection without a Base URL and makes no request", async () => {
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return new Response("{}", { status: 200 });
  }) as typeof fetch;

  const result = await validateProviderApiKey({ provider: "infomaniak", apiKey: "k" });

  assert.equal(result.valid, false);
  assert.match(String(result.error), /product id/);
  assert.equal(calls, 0);
});

test("infomaniak validation probes <baseUrl>/models", async () => {
  const urls: string[] = [];
  globalThis.fetch = (async (url: unknown) => {
    urls.push(String(url));
    return new Response(JSON.stringify({ data: [{ id: "google/gemma-4-31B-it" }] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;

  const result = await validateProviderApiKey({
    provider: "infomaniak",
    apiKey: "k",
    providerSpecificData: { baseUrl: BASE_URL },
  });

  assert.equal(result.valid, true);
  assert.equal(urls[0], `${BASE_URL}/models`);
});
