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

const HTTP_BASE_URL = BASE_URL.replace("https://", "http://");

test("infomaniak validation rejects an http Base URL and makes no request", async () => {
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return new Response("{}", { status: 200 });
  }) as typeof fetch;

  const result = await validateProviderApiKey({
    provider: "infomaniak",
    apiKey: "k",
    providerSpecificData: { baseUrl: HTTP_BASE_URL },
  });

  assert.equal(result.valid, false);
  assert.match(String(result.error), /https/);
  assert.equal(calls, 0);
});

test("infomaniak chat dispatch refuses an http Base URL", () => {
  const executor = new DefaultExecutor("infomaniak");
  assert.throws(
    () =>
      executor.buildUrl("google/gemma-4-31B-it", false, 0, {
        apiKey: "k",
        providerSpecificData: { baseUrl: HTTP_BASE_URL },
      }),
    /https/
  );
});

test("infomaniak validation rejects an http models URL override and makes no request", async () => {
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return new Response("{}", { status: 200 });
  }) as typeof fetch;

  const result = await validateProviderApiKey({
    provider: "infomaniak",
    apiKey: "k",
    providerSpecificData: { baseUrl: BASE_URL, modelsUrl: `${HTTP_BASE_URL}/models` },
  });

  assert.equal(result.valid, false);
  assert.match(String(result.error), /https/);
  assert.equal(calls, 0);
});

for (const modelsUrl of ["HTTP://example.org/models", "//example.org/models", "models"]) {
  test(`infomaniak validation rejects a non-https models URL override (${modelsUrl})`, async () => {
    let calls = 0;
    globalThis.fetch = (async () => {
      calls += 1;
      return new Response("{}", { status: 200 });
    }) as typeof fetch;

    const result = await validateProviderApiKey({
      provider: "infomaniak",
      apiKey: "k",
      providerSpecificData: { baseUrl: BASE_URL, modelsUrl },
    });

    assert.equal(result.valid, false);
    assert.equal(calls, 0);
  });
}

test("infomaniak chat dispatch never follows a redirect to an http:// target", async () => {
  // Stub with fetch's redirect semantics: the gateway answers 307 to plain http.
  const hits: string[] = [];
  globalThis.fetch = (async (url: RequestInfo | URL, init?: RequestInit) => {
    hits.push(String(url));
    if (String(url).startsWith("http://")) return new Response("{}", { status: 200 });
    if (init?.redirect === "error") throw new TypeError("fetch failed: unexpected redirect");
    return new Response(null, {
      status: 307,
      headers: { location: "http://attacker.example/v1/chat/completions" },
    });
  }) as typeof fetch;

  await new DefaultExecutor("infomaniak")
    .execute({
      model: "google/gemma-4-31B-it",
      body: { model: "google/gemma-4-31B-it", messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "k", providerSpecificData: { baseUrl: BASE_URL } },
    } as never)
    .catch(() => {});

  assert.ok(hits.length > 0, "the Infomaniak endpoint must be called");
  assert.deepEqual(
    hits.filter((url) => url.startsWith("http://")),
    [],
    "the chat body must never reach the http:// redirect target"
  );
});

test("edge relays hand redirects back instead of following them", async () => {
  // A relay that follows a 307/308 itself would bypass the redirect: "error" set above.
  const { buildCloudflareWorkerScript } =
    await import("../../src/lib/proxyRelay/cloudflareWorkerScript.ts");
  const { __buildRelayWorkerForTest } =
    await import("../../src/app/api/settings/proxy/deno-deploy/route.ts");
  const { __buildRelayFunctionForTest } =
    await import("../../src/app/api/settings/proxy/vercel-deploy/route.ts");
  for (const [name, worker] of [
    ["cloudflare", buildCloudflareWorkerScript("deadbeefcafe")],
    ["deno", __buildRelayWorkerForTest("deadbeefcafe")],
    ["vercel", __buildRelayFunctionForTest("deadbeefcafe")],
  ]) {
    assert.match(worker, /redirect: "manual"/, `${name} relay must not follow redirects`);
  }
});
