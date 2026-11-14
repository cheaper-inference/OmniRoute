import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ollama-web-fetch-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const webFetchRoute = await import("../../src/app/api/v1/web/fetch/route.ts");
const { handleWebFetch, WEB_FETCH_PROVIDERS, EXPLICIT_ONLY_WEB_FETCH_PROVIDERS } =
  await import("../../open-sse/handlers/webFetch.ts");
const { v1WebFetchSchema } = await import("../../src/shared/validation/schemas/apiV1.ts");

const OLLAMA_FETCH_URL = "https://ollama.com/api/web_fetch";

function ollamaPage() {
  return new Response(
    JSON.stringify({
      title: "Example Domain",
      content: "# Example Domain\nThis domain is for examples.",
      links: ["https://www.iana.org/domains/example"],
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("ollama-search is a web-fetch provider that never joins auto-select", () => {
  assert.ok(WEB_FETCH_PROVIDERS.includes("ollama-search"));
  assert.ok(EXPLICIT_ONLY_WEB_FETCH_PROVIDERS.has("ollama-search"));
  assert.equal(
    v1WebFetchSchema.safeParse({ url: "https://example.com", provider: "ollama-search" }).success,
    true
  );
});

test("handleWebFetch posts the url to Ollama web_fetch with bearer auth and maps the page", async () => {
  const originalFetch = globalThis.fetch;
  let captured = { url: "", init: {} as RequestInit };
  globalThis.fetch = async (url, init = {}) => {
    captured = { url: String(url), init: init as RequestInit };
    return ollamaPage();
  };
  try {
    const result = await handleWebFetch(
      { url: "https://example.com", format: "markdown", depth: 0, include_metadata: true },
      { apiKey: "ollama-key" },
      "ollama-search"
    );
    assert.equal(result.success, true);
    assert.equal(captured.url, OLLAMA_FETCH_URL);
    assert.equal(captured.init.method, "POST");
    assert.equal(
      (captured.init.headers as Record<string, string>).Authorization,
      "Bearer ollama-key"
    );
    assert.deepEqual(JSON.parse(String(captured.init.body)), { url: "https://example.com" });
    assert.equal(result.data?.provider, "ollama-search");
    assert.equal(result.data?.content, "# Example Domain\nThis domain is for examples.");
    assert.deepEqual(result.data?.links, ["https://www.iana.org/domains/example"]);
    assert.equal(result.data?.metadata?.title, "Example Domain");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleWebFetch rejects non-markdown formats and a missing key without calling upstream", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("upstream must not be called");
  };
  try {
    const html = await handleWebFetch(
      { url: "https://example.com", format: "html", depth: 0, include_metadata: false },
      { apiKey: "ollama-key" },
      "ollama-search"
    );
    assert.equal(html.status, 400);
    const noKey = await handleWebFetch(
      { url: "https://example.com", format: "markdown", depth: 0, include_metadata: false },
      {},
      "ollama-search"
    );
    assert.equal(noKey.status, 401);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleWebFetch caps content at 200000 characters", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ title: "t", content: "x".repeat(250_000), links: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  try {
    const result = await handleWebFetch(
      { url: "https://example.com", format: "markdown", depth: 0, include_metadata: false },
      { apiKey: "ollama-key" },
      "ollama-search"
    );
    assert.equal(result.data?.content.length, 200_000);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("route: explicit ollama-search reuses the ollama-cloud key; auto-select ignores it", async () => {
  await providersDb.createProviderConnection({
    provider: "ollama-cloud",
    authType: "apikey",
    name: "ollama-cloud-test",
    apiKey: "ollama-cloud-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  const originalFetch = globalThis.fetch;
  const auth: string[] = [];
  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), OLLAMA_FETCH_URL);
    auth.push(String((init.headers as Record<string, string>).Authorization));
    return ollamaPage();
  };
  const post = (body: Record<string, unknown>) =>
    webFetchRoute.POST(
      new Request("http://localhost/api/v1/web/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: "https://example.com", ...body }),
      })
    );
  try {
    const explicit = await post({ provider: "ollama-search" });
    assert.equal(explicit.status, 200);
    assert.equal(((await explicit.json()) as { provider: string }).provider, "ollama-search");
    assert.deepEqual(auth, ["Bearer ollama-cloud-key"]);

    const auto = await post({});
    assert.equal(auto.status, 400, "auto-select must not pick the ollama key");
    assert.equal(auth.length, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
