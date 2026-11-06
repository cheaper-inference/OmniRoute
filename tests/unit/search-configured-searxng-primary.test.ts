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
const settingsDb = await import("../../src/lib/db/settings.ts");
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

const seedSearxng = (baseUrl: string, apiKey: string | null = null) =>
  seed("searxng-search", { authType: "none", apiKey, providerSpecificData: { baseUrl } });

function mockFetch(searxngStatus = 200, searxngBase = SEARXNG_URL, braveStatus = 200) {
  const calls: string[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const u = String(url);
    calls.push(u);
    if (u.startsWith(searxngBase)) {
      if (searxngStatus !== 200) return new Response("upstream down", { status: searxngStatus });
      return new Response(
        JSON.stringify({
          results: [{ title: "SearXNG hit", url: "https://example.com/s", content: "local" }],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    if (u.includes("api.search.brave.com")) {
      if (braveStatus !== 200) return new Response("upstream down", { status: braveStatus });
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

async function routeSearch(query: string, extra: Record<string, unknown> = {}) {
  const response = await searchRoute.POST(
    new Request("http://localhost/api/v1/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, search_type: "web", ...extra }),
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

test("a configured SearXNG and a keyed $0 provider: /v1/search and executeWebSearch agree", async () => {
  // ollama-search is also $0 and non-fallback; the route must rank the same admitted
  // candidates as executeWebSearch instead of taking selectProvider's pick first.
  await seed("ollama-search");
  await seedSearxng(SEARXNG_URL);
  const f = mockFetch();
  try {
    assert.equal(
      (await executeWebSearch({ query: "two zero-cost providers" })).data.provider,
      "searxng-search"
    );
    assert.equal(
      (await routeSearch("route two zero-cost providers")).body.provider,
      "searxng-search"
    );
    assert.ok(
      f.calls.every((u) => u.startsWith(SEARXNG_URL)),
      "ollama never called"
    );
  } finally {
    f.restore();
  }
});

test("a SearXNG that would send its stored token over remote plain HTTP is not auto-selected", async () => {
  const remote = "http://10.20.30.40:8888";
  await seed("brave-search");
  await seedSearxng(remote, "searxng-secret");
  const f = mockFetch(200, remote);
  try {
    assert.equal(
      (await executeWebSearch({ query: "remote http token" })).data.provider,
      "brave-search"
    );
    assert.equal((await routeSearch("route remote http token")).body.provider, "brave-search");
    assert.ok(
      !f.calls.some((u) => u.startsWith(remote)),
      "token never sent in cleartext by auto-select"
    );
    // Explicit selection is unchanged (the operator asked for it by name).
    const explicit = await executeWebSearch({
      query: "explicit remote http",
      provider: "searxng-search",
    });
    assert.equal(explicit.data.provider, "searxng-search");
  } finally {
    f.restore();
  }
});

test("a tokened SearXNG over HTTPS or on loopback HTTP is still auto-selected", async () => {
  for (const base of [
    "https://search.example.org",
    "http://127.0.0.1:9191",
    "http://localhost:9192",
  ]) {
    await resetStorage();
    await seed("brave-search");
    await seedSearxng(base, "searxng-secret");
    const f = mockFetch(200, base);
    try {
      assert.equal(
        (await executeWebSearch({ query: `tokened ${base}` })).data.provider,
        "searxng-search",
        base
      );
    } finally {
      f.restore();
    }
  }
});

test("a tokenless SearXNG on a cluster-internal HTTP address is auto-selected", async () => {
  const internal = "http://searxng.internal:8080";
  await seed("brave-search");
  await seedSearxng(internal);
  const f = mockFetch(200, internal);
  try {
    assert.equal((await routeSearch("cluster internal http")).body.provider, "searxng-search");
  } finally {
    f.restore();
  }
});

test("a SearXNG blocked by policy is neither the pick nor the failover of auto-select", async () => {
  await seed("brave-search");
  await seedSearxng(SEARXNG_URL);
  await settingsDb.updateSettings({ blockedProviders: ["searxng-search"] });

  const healthy = mockFetch();
  try {
    assert.equal((await routeSearch("blocked route pick")).body.provider, "brave-search");
    assert.equal(
      (await executeWebSearch({ query: "blocked tool pick" })).data.provider,
      "brave-search"
    );
    assert.ok(!healthy.calls.some((u) => u.startsWith(SEARXNG_URL)), "blocked SearXNG not called");
  } finally {
    healthy.restore();
  }

  const braveDown = mockFetch(200, SEARXNG_URL, 503);
  try {
    assert.notEqual((await routeSearch("blocked route failover")).body.provider, "searxng-search");
    await executeWebSearch({ query: "blocked tool failover" }).catch(() => null);
    assert.ok(
      !braveDown.calls.some((u) => u.startsWith(SEARXNG_URL)),
      "blocked SearXNG not used as failover"
    );
  } finally {
    braveDown.restore();
  }
});

test("a stored base URL the search handler refuses is not auto-selected", async () => {
  for (const base of [
    "http://169.254.169.254/",
    "not a url",
    "searxng.internal:8080",
    "ftp://searxng.internal/",
    "http://user:pass@searxng.internal:8080",
  ]) {
    await resetStorage();
    await seed("brave-search");
    await seedSearxng(base);
    const f = mockFetch();
    try {
      const { status, body } = await routeSearch(`refused base url ${base}`);
      assert.equal(status, 200, base);
      assert.equal(body.provider, "brave-search", base);
      assert.equal(
        (await executeWebSearch({ query: `tool refused base url ${base}` })).data.provider,
        "brave-search",
        base
      );
    } finally {
      f.restore();
    }
  }
});

test("an auto-selected SearXNG fails over on every 4xx the handler treats as final", async () => {
  await seed("brave-search");
  await seedSearxng(SEARXNG_URL);
  for (const status of [400, 401, 403, 404]) {
    const f = mockFetch(status);
    try {
      const routed = await routeSearch(`searxng ${status} route`);
      assert.equal(routed.status, 200, String(status));
      assert.equal(routed.body.provider, "brave-search", String(status));
      assert.equal(
        (await executeWebSearch({ query: `searxng ${status} tool` })).data.provider,
        "brave-search",
        String(status)
      );
    } finally {
      f.restore();
    }
  }
});

test("a SearXNG requested by name still reports its own 4xx instead of failing over", async () => {
  await seed("brave-search");
  await seedSearxng(SEARXNG_URL);
  const f = mockFetch(403);
  try {
    const { status } = await routeSearch("explicit searxng 403", { provider: "searxng-search" });
    assert.equal(status, 403);
    await assert.rejects(
      executeWebSearch({ query: "explicit searxng 403 tool", provider: "searxng-search" }),
      /returned 403/
    );
    assert.ok(
      f.calls.every((u) => u.startsWith(SEARXNG_URL)),
      "no keyed provider called"
    );
  } finally {
    f.restore();
  }
});

test("a keyed primary keeps treating a 403 as final", async () => {
  // serper is the cheaper of the two, so it is the pick and brave would be its failover.
  await seed("serper-search");
  await seed("brave-search");
  const calls: string[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return new Response("forbidden", { status: 403 });
  };
  try {
    const { status } = await routeSearch("keyed 403 stays final");
    assert.equal(status, 403);
    assert.equal(calls.length, 1, "no failover after a keyed 403");
  } finally {
    globalThis.fetch = original;
  }
});
