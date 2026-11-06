import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

process.env.API_KEY_SECRET = "codex-search-isolation-test-secret";
// These isolation checks exercise the opted-in automatic Codex fallback
// (CODEX_SEARCH_AUTO_FALLBACK_ENABLED, default off); routing tests cover the default.
process.env.CODEX_SEARCH_AUTO_FALLBACK_ENABLED = "true";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const settings = await import("../../src/lib/db/settings.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const auth = await import("../../src/sse/services/auth.ts");
const locks = await import("../../open-sse/services/accountFallback.ts");
const route = await import("../../src/app/api/v1/search/route.ts");
const { executeWebSearch } = await import("../../src/lib/search/executeWebSearch.ts");
const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");
const { executeCodexSearch } = await import("../../open-sse/handlers/search/codexSearch.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const fixture = readFileSync(
  new URL("../fixtures/codex-search/real_en_ref_param.sse", import.meta.url),
  "utf8"
);
const CODEX_URL = "https://chatgpt.com/backend-api/codex/responses";
const CHAT_MODEL = "gpt-5.5";
const originalFetch = globalThis.fetch;
const calls: string[] = [];
let sequence = 0;
let braveFails = false;

async function seed(provider = "codex", token: string | null = "synthetic-isolation-token") {
  return providers.createProviderConnection({
    provider,
    name: `search-isolation-${sequence++}`,
    authType: provider === "codex" ? "oauth" : token ? "apikey" : "none",
    ...(provider === "codex" ? { accessToken: token } : { apiKey: token }),
    isActive: true,
    testStatus: "active",
    providerSpecificData: { quotaPreflightEnabled: false },
  });
}

async function post(key?: string) {
  return route.POST(
    new Request("http://localhost/api/v1/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(key ? { Authorization: `Bearer ${key}` } : {}),
      },
      body: JSON.stringify({ query: `search isolation ${sequence++}` }),
    })
  );
}

async function search(connectionId: string) {
  return handleSearch({
    provider: "codex-search",
    query: `health isolation ${sequence++}`,
    searchType: "web",
    maxResults: 1,
    credentials: { accessToken: "synthetic-isolation-token" },
    connectionId,
  });
}

async function health(connectionId: string) {
  const row = await providers.getProviderConnectionById(connectionId);
  assert.ok(row);
  return {
    testStatus: row.testStatus,
    rateLimitedUntil: row.rateLimitedUntil,
    lastError: row.lastError,
    lastErrorAt: row.lastErrorAt,
    errorCode: row.errorCode,
  };
}

async function assertChatAvailable(connectionId: string) {
  const credential = await auth.getProviderCredentials("codex", null, null, CHAT_MODEL);
  assert.equal(credential?.connectionId, connectionId);
  assert.equal(credential?.accessToken, "synthetic-isolation-token");
}

test.beforeEach(async () => {
  calls.length = 0;
  braveFails = false;
  locks.clearAllModelLockouts();
  for (const connection of await providers.getProviderConnections()) {
    await providers.deleteProviderConnection(connection.id as string);
  }
  await settings.updateSettings({ searchTimeoutMs: null, blockedProviders: [] });
  globalThis.fetch = async (input) => {
    const url = String(input);
    calls.push(url);
    if (url === CODEX_URL) return new Response(fixture);
    if (url.includes("api.search.brave.com")) {
      return braveFails
        ? new Response("Unavailable", { status: 503 })
        : Response.json({ web: { results: [] } });
    }
    if (url.includes("duckduckgo.com")) return new Response("<html></html>");
    if (url.includes("google.serper.dev")) return Response.json({ organic: [] });
    throw new Error(`No network permitted: ${url}`);
  };
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  locks.clearAllModelLockouts();
});

test.after(async () => {
  await closeCallLogSaves(500);
  core.resetDbInstance();
});

for (const testStatus of ["error", "unavailable"]) {
  test(`Codex search success preserves parent ${testStatus} health and chat eligibility`, async () => {
    const connectionId = String((await seed()).id);
    await providers.updateProviderConnection(connectionId, {
      testStatus,
      lastError: "Chat-owned diagnostic",
      lastErrorAt: new Date(Date.now() - 60_000).toISOString(),
      errorCode: "429",
      rateLimitedUntil: new Date(Date.now() - 1000).toISOString(),
    });
    await assertChatAvailable(connectionId);
    const before = await health(connectionId);
    assert.equal((await search(connectionId)).success, true);
    assert.deepEqual(await health(connectionId), before);
    await assertChatAvailable(connectionId);
  });
}

for (const [status, body] of [
  [401, "Unauthorized"],
  [429, "Too many requests"],
  [503, "Service unavailable"],
  [400, "Insufficient credits"],
  [200, 'event: error\ndata: {"error":{"code":"server_is_overloaded"}}\n\n'],
] as const) {
  test(`Codex search HTTP ${status} ${body.slice(0, 20)} preserves parent health and chat`, async () => {
    const connectionId = String((await seed()).id);
    await assertChatAvailable(connectionId);
    const before = await health(connectionId);
    globalThis.fetch = async () => new Response(body, { status });
    const result = await search(connectionId);
    assert.equal(result.success, false);
    assert.equal(result.status, status === 200 ? 503 : status);
    assert.deepEqual(await health(connectionId), before);
    await assertChatAvailable(connectionId);
  });
}

test("Codex search abort returns 504 without changing parent health or chat", async () => {
  const connectionId = String((await seed()).id);
  await assertChatAvailable(connectionId);
  const before = await health(connectionId);
  globalThis.fetch = async (_input, init) =>
    new Promise((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
    });
  const result = await executeCodexSearch(
    { ...SEARCH_PROVIDERS["codex-search"], timeoutMs: 5 },
    { query: "abort isolation", maxResults: 1, token: "synthetic-token" },
    { connectionId, globalStartTime: Date.now(), globalTimeoutMs: 1000 },
    () => {
      throw new Error("Aborted search must not normalize results");
    }
  );
  assert.equal(result.status, 504);
  assert.deepEqual(await health(connectionId), before);
  await assertChatAvailable(connectionId);
});

for (const blocked of ["codex-search", "codex_search", "duckduckgo-free", "serper-search"]) {
  test(`blocked ${blocked} is never contacted as execution-time alternate`, async () => {
    if (blocked.startsWith("codex")) await seed();
    if (blocked === "serper-search") await seed("serper-search");
    await seed("brave-search");
    // Context7's anonymous tier precedes DuckDuckGo in the base alternate order.
    // Make it unavailable as well as blocked, so even the unfixed route reaches
    // DuckDuckGo and proves that provider's execution-time policy check matters.
    const context7 = await seed("context7");
    await providers.updateProviderConnection(String(context7.id), {
      rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
    });
    await settings.updateSettings({ blockedProviders: [blocked, "context7"] });
    braveFails = true;
    const response = await post();
    const forbiddenHost = blocked.startsWith("codex")
      ? "chatgpt.com"
      : blocked === "serper-search"
        ? "google.serper.dev"
        : "duckduckgo.com";
    assert.ok(calls.some((url) => url.includes("api.search.brave.com")));
    assert.ok(!calls.some((url) => url.includes(forbiddenHost)), JSON.stringify(calls));
    if (blocked === "duckduckgo-free") assert.equal(response.status, 503);
    else {
      assert.equal(response.status, 200);
      assert.equal((await response.json()).provider, "duckduckgo-free");
    }
  });
}

for (const target of ["route", "mirror"]) {
  for (const codex of [false, true]) {
    test(`${target}: tokenless AnySearch preserves ${codex ? "Codex promotion" : "base DuckDuckGo default"}`, async () => {
      await seed("anysearch-search", null);
      if (codex) await seed();
      const expected = codex ? "codex-search" : "duckduckgo-free";
      if (target === "route") {
        const response = await post();
        assert.equal(response.status, 200);
        assert.equal((await response.json()).provider, expected);
      } else {
        const result = await executeWebSearch({ query: `anysearch mirror ${sequence++}` });
        assert.equal(result.data.provider, expected);
      }
      assert.ok(calls.length > 0);
      assert.ok(calls.every((url) => url.includes(codex ? "chatgpt.com" : "duckduckgo.com")));
    });
  }

  test(`${target}: configured paid search stays ahead of Codex and tokenless AnySearch`, async () => {
    await seed();
    await seed("anysearch-search", null);
    await seed("brave-search");
    if (target === "route") {
      const response = await post();
      assert.equal(response.status, 200);
      assert.equal((await response.json()).provider, "brave-search");
    } else {
      const result = await executeWebSearch({ query: `paid mirror ${sequence++}` });
      assert.equal(result.data.provider, "brave-search");
    }
    assert.ok(calls.every((url) => url.includes("api.search.brave.com")));
  });

  test(`${target}: search-scoped backoff skips Codex on the next search, not chat`, async () => {
    const connectionId = String((await seed()).id);
    const mockedFetch = globalThis.fetch;
    globalThis.fetch = async () => new Response("Too many requests", { status: 429 });
    assert.equal((await search(connectionId)).status, 429);
    assert.ok(locks.isModelLocked("codex-search", connectionId, "web_search"));
    assert.equal(locks.isModelLocked("codex", connectionId, CHAT_MODEL), false);
    await assertChatAvailable(connectionId);
    globalThis.fetch = mockedFetch;
    if (target === "route") {
      const response = await post();
      assert.equal(response.status, 200);
      assert.equal((await response.json()).provider, "duckduckgo-free");
    } else {
      const result = await executeWebSearch({ query: `backoff mirror ${sequence++}` });
      assert.equal(result.data.provider, "duckduckgo-free");
    }
    assert.ok(!calls.includes(CODEX_URL));
  });
}

test("scope excluding Codex keeps base keyless opt-in with tokenless AnySearch", async () => {
  await seed();
  await seed("anysearch-search", null);
  const key = await apiKeys.createApiKey("isolation-noauth", "isolation-machine", [], {
    allowedConnections: ["noauth"],
  });
  const response = await post(key.key as string);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).provider, "duckduckgo-free");
  assert.ok(calls.length > 0 && calls.every((url) => url.includes("duckduckgo.com")));
});
