import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * An operator who stores a SearXNG connection with a real base URL has a $0 self-hosted
 * search engine. Auto-selection must rank it like any other configured provider (cheapest
 * first) instead of reaching it only after every keyed provider, while a SearXNG that is not
 * configured (no connection, or still the catalog default http://localhost:8888/search)
 * keeps being skipped exactly as #9543 / #10976 require.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-searxng-primary-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const searchRoute = await import("../../src/app/api/v1/search/route.ts");
const { executeWebSearch } = await import("../../src/lib/search/executeWebSearch.ts");

const SEARXNG_URL = "http://127.0.0.1:9090";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seed(
  provider: string,
  extra: {
    authType?: string;
    providerSpecificData?: Record<string, unknown>;
    apiKey?: string | null;
  } = {}
) {
  return providersDb.createProviderConnection({
    provider,
    authType: extra.authType || "apikey",
    name: `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: extra.apiKey === undefined ? "test-key" : extra.apiKey,
    isActive: true,
    testStatus: "active",
    providerSpecificData: extra.providerSpecificData || {},
  });
}

const seedSearxng = (baseUrl: string) =>
  seed("searxng-search", { authType: "none", apiKey: null, providerSpecificData: { baseUrl } });

function mockFetch(searxngStatus = 200) {
  const calls: string[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const u = String(url);
    calls.push(u);
    if (u.startsWith(SEARXNG_URL)) {
      if (searxngStatus !== 200) return new Response("upstream down", { status: searxngStatus });
      return new Response(
        JSON.stringify({
          results: [{ title: "SearXNG hit", url: "https://example.com/s", content: "local" }],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    if (u.includes("api.search.brave.com")) {
      return new Response(
        JSON.stringify({
          web: {
            results: [{ title: "Brave hit", url: "https://example.com/b", description: "brave" }],
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    throw new Error(`unexpected fetch ${u}`);
  };
  return { calls, restore: () => (globalThis.fetch = original) };
}

async function routeSearch(query: string) {
  const response = await searchRoute.POST(
    new Request("http://localhost/api/v1/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, search_type: "web" }),
    })
  );
  return { status: response.status, body: (await response.json()) as { provider?: string } };
}

test.beforeEach(resetStorage);
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("executeWebSearch auto-selects a configured SearXNG over a keyed provider", async () => {
  await seed("brave-search");
  await seedSearxng(SEARXNG_URL);
  const f = mockFetch();
  try {
    const result = await executeWebSearch({ query: "configured searxng wins" });
    assert.equal(result.data.provider, "searxng-search");
    assert.ok(
      f.calls.every((u) => u.startsWith(SEARXNG_URL)),
      "no keyed provider called"
    );
  } finally {
    f.restore();
  }
});

test("/v1/search auto-selects a configured SearXNG over a keyed provider", async () => {
  await seed("brave-search");
  await seedSearxng(SEARXNG_URL);
  const f = mockFetch();
  try {
    const { status, body } = await routeSearch("route configured searxng wins");
    assert.equal(status, 200);
    assert.equal(body.provider, "searxng-search");
  } finally {
    f.restore();
  }
});

test("/v1/search fails over from a configured SearXNG to the keyed provider", async () => {
  await seed("brave-search");
  await seedSearxng(SEARXNG_URL);
  const f = mockFetch(503);
  try {
    const { status, body } = await routeSearch("searxng down falls over");
    assert.equal(status, 200);
    assert.equal(body.provider, "brave-search");
  } finally {
    f.restore();
  }
});

test("a SearXNG left on the catalog default is still never auto-selected", async () => {
  await seed("brave-search");
  await seedSearxng("http://localhost:8888/search");
  const f = mockFetch();
  try {
    assert.equal(
      (await executeWebSearch({ query: "default url stays skipped" })).data.provider,
      "brave-search"
    );
    assert.equal(
      (await routeSearch("route default url stays skipped")).body.provider,
      "brave-search"
    );
  } finally {
    f.restore();
  }
});

test("without a SearXNG connection the keyed provider is selected as before", async () => {
  await seed("brave-search");
  const f = mockFetch();
  try {
    assert.equal(
      (await executeWebSearch({ query: "no searxng connection" })).data.provider,
      "brave-search"
    );
    assert.equal((await routeSearch("route no searxng connection")).body.provider, "brave-search");
  } finally {
    f.restore();
  }
});
