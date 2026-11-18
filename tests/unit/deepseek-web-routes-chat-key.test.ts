/**
 * DeepSeek web search and fetch reuse the DeepSeek chat API key.
 *
 * A user who only configured the DeepSeek chat provider ("deepseek") must be able to
 * call POST /v1/search and POST /v1/web/fetch with the deepseek-search provider: both
 * DeepSeek tools accept the same key (SEARCH_CREDENTIAL_FALLBACKS maps
 * deepseek-search → deepseek). The borrowed key stays inside the caller API key's
 * connection scope (GHSA-3w2r), exactly like a dedicated deepseek-search connection.
 *
 * Every upstream call is a stubbed globalThis.fetch.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/deepseek-web-routes-chat-key.test.ts
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-deepseek-web-routes-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "deepseek-web-routes-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const searchRoute = await import("../../src/app/api/v1/search/route.ts");
const webFetchRoute = await import("../../src/app/api/v1/web/fetch/route.ts");

const CHAT_KEY = "sk-deepseek-chat-connection";
const PAGE_URL = "https://example.com/article";
const SEARCH_URL = "https://api.deepseek.com/v1/tools/search";
const FETCH_URL = "https://api.deepseek.com/v1/tools/fetch";
const DEAD_CONNECTION = "00000000-0000-4000-8000-00000000dead";

type Call = { url: string; authorization: string | null };

async function withUpstream<T>(run: () => Promise<T>): Promise<{ result: T; calls: Call[] }> {
  const originalFetch = globalThis.fetch;
  const calls: Call[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    calls.push({ url, authorization: new Headers(init.headers).get("authorization") });
    const payload =
      url === FETCH_URL
        ? { title: "Example article", content: "# Example article\n\nBody." }
        : { results: [{ title: "Example", url: PAGE_URL, snippet: "S", summary: "Summary" }] };
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
  try {
    return { result: await run(), calls };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedDeepseekChatConnection() {
  return providersDb.createProviderConnection({
    provider: "deepseek",
    authType: "apikey",
    name: "deepseek-chat",
    apiKey: CHAT_KEY,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

async function makeScopedKey(allowedConnections: string[]): Promise<string> {
  const key = await apiKeysDb.createApiKey("deepseek-web-scoped", "machine-deepseek-web", [], {
    allowedConnections,
  });
  return key.key as string;
}

function post(
  route: { POST: (req: Request) => Promise<Response> },
  p: string,
  body: unknown,
  bearer?: string
) {
  return route.POST(
    new Request(`http://localhost${p}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
      },
      body: JSON.stringify(body),
    })
  );
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("POST /v1/search with provider deepseek reuses the DeepSeek chat key", async () => {
  await resetStorage();
  await seedDeepseekChatConnection();
  const { result: response, calls } = await withUpstream(() =>
    post(searchRoute, "/api/v1/search", { query: "deepseek v4", provider: "deepseek" })
  );
  const body = (await response.json()) as { provider?: string };
  assert.equal(response.status, 200);
  assert.equal(body.provider, "deepseek-search");
  assert.deepEqual(
    calls.map((c) => c.url),
    [SEARCH_URL]
  );
  assert.equal(calls[0].authorization, `Bearer ${CHAT_KEY}`);
});

test("POST /v1/web/fetch with provider deepseek-search reuses the DeepSeek chat key", async () => {
  await resetStorage();
  await seedDeepseekChatConnection();
  const { result: response, calls } = await withUpstream(() =>
    post(webFetchRoute, "/api/v1/web/fetch", { url: PAGE_URL, provider: "deepseek-search" })
  );
  const body = (await response.json()) as { provider?: string; content?: string };
  assert.equal(response.status, 200);
  assert.equal(body.provider, "deepseek-search");
  assert.equal(body.content, "# Example article\n\nBody.");
  assert.deepEqual(
    calls.map((c) => c.url),
    [FETCH_URL]
  );
  assert.equal(calls[0].authorization, `Bearer ${CHAT_KEY}`);
});

test("POST /v1/web/fetch keeps the borrowed chat key inside the API key's connection scope", async () => {
  await resetStorage();
  const chat = await seedDeepseekChatConnection();

  const outOfScope = await makeScopedKey([DEAD_CONNECTION]);
  const blocked = await withUpstream(() =>
    post(
      webFetchRoute,
      "/api/v1/web/fetch",
      { url: PAGE_URL, provider: "deepseek-search" },
      outOfScope
    )
  );
  assert.notEqual(blocked.result.status, 200, "a key scoped elsewhere must not borrow the key");
  assert.deepEqual(blocked.calls, [], "nothing may reach DeepSeek outside the key's scope");

  const inScope = await makeScopedKey([chat.id as string]);
  const allowed = await withUpstream(() =>
    post(
      webFetchRoute,
      "/api/v1/web/fetch",
      { url: PAGE_URL, provider: "deepseek-search" },
      inScope
    )
  );
  assert.equal(allowed.result.status, 200);
  assert.equal(allowed.calls[0]?.authorization, `Bearer ${CHAT_KEY}`);
});
