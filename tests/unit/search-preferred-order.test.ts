import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-preferred-search-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "preferred-search-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const locks = await import("../../open-sse/services/accountFallback.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { autoSearchCandidates } = await import("../../open-sse/config/searchRegistry.ts");
const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { executeWebSearch } = await import("../../src/lib/search/executeWebSearch.ts");
const searchRoute = await import("../../src/app/api/v1/search/route.ts");

const order = ["keenable-search", "ollama-search", "searxng-search"];
const originalFetch = globalThis.fetch;
const hit = { title: "Official docs", url: "https://example.com/docs", snippet: "Documentation" };
let sequence = 0;

async function seed(provider: string, extra: Record<string, unknown> = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: provider,
    apiKey: "test-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
    ...extra,
  });
}

async function seedDefaults() {
  await settingsDb.updateSettings({ searchProviderOrder: order });
  const borrowed = await seed("ollama-cloud");
  await seed("searxng-search", {
    authType: "none",
    apiKey: null,
    providerSpecificData: { baseUrl: "https://search.example.com" },
  });
  return borrowed;
}

async function runEntry(entry: "tool" | "route", label: string) {
  const query = label + " " + ++sequence;
  if (entry === "tool") return (await executeWebSearch({ query, max_results: 2 })).data;
  const response = await searchRoute.POST(
    new Request("http://localhost/v1/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, max_results: 2 }),
    })
  );
  assert.equal(response.status, 200);
  return response.json();
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await closeCallLogSaves(500);
  core.resetDbInstance();
  locks.clearAllModelLockouts();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(async () => {
  globalThis.fetch = originalFetch;
  await closeCallLogSaves(500);
  core.resetDbInstance();
  locks.clearAllModelLockouts();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("operator order admits Keenable while the default candidate list stays unchanged", () => {
  assert.deepEqual(
    autoSearchCandidates("web", order)
      .slice(0, 3)
      .map((p) => p.id),
    order
  );
  assert.ok(!autoSearchCandidates("web").some((p) => p.id === "keenable-search"));
});

for (const entry of ["tool", "route"] as const) {
  test(entry + " uses keyless Keenable first through the existing search gateway", async () => {
    await seedDefaults();
    const hosts: string[] = [];
    globalThis.fetch = async (url, init) => {
      const u = new URL(String(url));
      hosts.push(u.hostname);
      if (u.hostname !== "api.keenable.ai") return Response.json({ results: [hit] });
      assert.equal(u.pathname, "/v1/search/public");
      assert.equal(init?.method, "POST");
      assert.equal(new Headers(init?.headers).get("X-Keenable-Title"), "OmniRoute");
      assert.equal(new Headers(init?.headers).get("X-API-Key"), null);
      return Response.json({ results: [hit] });
    };
    const data = await runEntry(entry, "primary");
    assert.equal(data.provider, "keenable-search");
    assert.deepEqual(hosts, ["api.keenable.ai"]);
    assert.equal(data.results[0].url, hit.url);
  });

  test(entry + " reaches SearXNG after both preferred providers fail", async () => {
    await seedDefaults();
    const hosts: string[] = [];
    globalThis.fetch = async (url) => {
      const u = new URL(String(url));
      hosts.push(u.hostname);
      if (u.hostname === "api.keenable.ai")
        return Response.json({ error: "unavailable" }, { status: 503 });
      if (u.hostname === "ollama.com")
        return Response.json({ error: "rate limit" }, { status: 429 });
      return Response.json({ results: [hit] });
    };
    const data = await runEntry(entry, "three-provider failover");
    assert.equal(data.provider, "searxng-search");
    assert.deepEqual(hosts, ["api.keenable.ai", "ollama.com", "search.example.com"]);
  });

  test(entry + " skips blocked providers throughout the preferred chain", async () => {
    await seedDefaults();
    await settingsDb.updateSettings({ blockedProviders: ["ollama-search"] });
    const hosts: string[] = [];
    globalThis.fetch = async (url) => {
      const u = new URL(String(url));
      hosts.push(u.hostname);
      if (u.hostname === "api.keenable.ai") return Response.json({ results: [] });
      return Response.json({ results: [hit] });
    };
    const data = await runEntry(entry, "blocked fallback");
    assert.equal(data.provider, "searxng-search");
    assert.deepEqual(hosts, ["api.keenable.ai", "search.example.com"]);
  });
}

test("SearXNG rejects malformed raw URLs before applying the result limit", async () => {
  globalThis.fetch = async () =>
    Response.json({
      results: [
        { title: "broken redirect", url: "http:///go/v1/abc", content: "wrong" },
        { title: "also malformed", url: "https:////redirect.example/path", content: "wrong" },
        { title: "userinfo", url: "https://user:password@example.com", content: "wrong" },
        hit,
      ],
    });
  const result = await handleSearch({
    query: "documentation",
    provider: "searxng-search",
    maxResults: 1,
    searchType: "web",
    credentials: { providerSpecificData: { baseUrl: "https://search.example.com" } },
  });
  assert.equal(result.success, true);
  assert.deepEqual(
    result.data?.results.map((row) => row.url),
    [hit.url]
  );
});

test("an all-invalid successful HTTP response uses the next provider", async () => {
  const hosts: string[] = [];
  globalThis.fetch = async (url) => {
    const u = new URL(String(url));
    hosts.push(u.hostname);
    return Response.json({
      results:
        u.hostname === "ollama.com" ? [{ url: "http:///go/v1/abc", title: "invalid" }] : [hit],
    });
  };
  const result = await handleSearch({
    query: "documentation",
    provider: "ollama-search",
    maxResults: 2,
    searchType: "web",
    credentials: { apiKey: "test-key" },
    alternateProvider: "searxng-search",
    alternateCredentials: { providerSpecificData: { baseUrl: "https://search.example.com" } },
  });
  assert.equal(result.success, true);
  assert.equal(result.data?.provider, "searxng-search");
  assert.deepEqual(hosts, ["ollama.com", "search.example.com"]);
});

test("an exhausted preferred chain reports failure instead of an empty success", async () => {
  await seedDefaults();
  const hosts: string[] = [];
  globalThis.fetch = async (url) => {
    hosts.push(new URL(String(url)).hostname);
    return Response.json({ results: [] });
  };
  await assert.rejects(
    executeWebSearch({ query: "empty chain " + ++sequence }),
    /no usable sources/
  );
  assert.deepEqual(hosts, ["api.keenable.ai", "ollama.com", "search.example.com"]);
});

test("preferred routing preserves key connection scope for every fallback", async () => {
  await seedDefaults();
  const { createApiKey } = await import("../../src/lib/db/apiKeys.ts");
  const own = await seed("ollama-cloud", { name: "allowed ollama", apiKey: "allowed-search-key" });
  const key = await createApiKey("scoped-search-test", "test-machine", [], {
    allowedConnections: [String(own.id)],
  });
  const hosts: string[] = [];
  globalThis.fetch = async (url, init) => {
    hosts.push(new URL(String(url)).hostname);
    assert.equal(new Headers(init?.headers).get("Authorization"), "Bearer allowed-search-key");
    return Response.json({ error: "unavailable" }, { status: 503 });
  };
  const response = await searchRoute.POST(
    new Request("http://localhost/v1/search", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + key.key },
      body: JSON.stringify({ query: "scope " + ++sequence }),
    })
  );
  assert.equal(response.status, 503);
  assert.deepEqual(hosts, ["ollama.com"]);
});

test("explicit keyless Keenable works without a stored connection", async () => {
  globalThis.fetch = async (url, init) => {
    assert.equal(String(url), "https://api.keenable.ai/v1/search/public");
    assert.equal(new Headers(init?.headers).get("X-API-Key"), null);
    return Response.json({ results: [hit] });
  };
  const result = await executeWebSearch({
    query: "explicit public " + ++sequence,
    provider: "keenable-search",
  });
  assert.equal(result.data.provider, "keenable-search");
  assert.equal(result.data.results[0].url, hit.url);
});

for (const provider of ["searxng-search", "ollama-search"]) {
  test(provider + " invalid URL paths do not consume the result limit", async () => {
    globalThis.fetch = async () =>
      Response.json({
        results: [
          { title: "space", url: "https://example.com/a b" },
          { title: "control", url: "https://example.com/a\nb" },
          { title: "backslash", url: "https://example.com/a\\b" },
          hit,
        ],
      });
    const result = await handleSearch({
      query: "documentation",
      provider,
      maxResults: 1,
      searchType: "web",
      credentials: {
        apiKey: "test-key",
        providerSpecificData: { baseUrl: "https://search.example.com" },
      },
    });
    assert.equal(result.success, true);
    assert.deepEqual(
      result.data?.results.map((row) => row.url),
      [hit.url]
    );
  });
}

test("invalid URL paths trigger the configured fallback", async () => {
  const hosts: string[] = [];
  globalThis.fetch = async (url) => {
    const hostname = new URL(String(url)).hostname;
    hosts.push(hostname);
    return Response.json({
      results:
        hostname === "ollama.com" ? [{ title: "control", url: "https://example.com/a\nb" }] : [hit],
    });
  };
  const result = await handleSearch({
    query: "documentation",
    provider: "ollama-search",
    maxResults: 1,
    searchType: "web",
    credentials: { apiKey: "test-key" },
    alternateProvider: "searxng-search",
    alternateCredentials: { providerSpecificData: { baseUrl: "https://search.example.com" } },
  });
  assert.equal(result.data?.provider, "searxng-search");
  assert.deepEqual(hosts, ["ollama.com", "search.example.com"]);
});

test("search preference settings preserve explicit order without installing a default", async () => {
  const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");
  assert.deepEqual(
    updateSettingsSchema.parse({ searchProviderOrder: order }).searchProviderOrder,
    order
  );
  assert.deepEqual(updateSettingsSchema.parse({ searchProviderOrder: [] }).searchProviderOrder, []);
  assert.equal("searchProviderOrder" in updateSettingsSchema.parse({}), false);
});

test("search preference settings reject malformed or excessive orders", async () => {
  const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");
  for (const searchProviderOrder of [
    "keenable-search",
    [1],
    [""],
    ["x".repeat(61)],
    Array(101).fill("keenable-search"),
  ]) {
    assert.equal(updateSettingsSchema.safeParse({ searchProviderOrder }).success, false);
  }
});

test("search preference settings retain the existing validated timeout overrides", async () => {
  const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");
  const settings = {
    searchTimeoutMs: 25000,
    searchProviderTimeoutsMs: {
      "keenable-search": 8000,
      "ollama-search": 8000,
      "searxng-search": 8000,
    },
  };
  assert.deepEqual(updateSettingsSchema.parse(settings), settings);
  assert.equal(updateSettingsSchema.safeParse({ searchTimeoutMs: 120001 }).success, false);
  assert.equal(
    updateSettingsSchema.safeParse({ searchProviderTimeoutsMs: { "keenable-search": 0 } }).success,
    false
  );
});
