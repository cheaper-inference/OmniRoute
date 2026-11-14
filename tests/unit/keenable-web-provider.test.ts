/**
 * Keenable (keenable.ai) as a web search + web fetch provider.
 *
 * Keyless by default (/v1/search/public, /v1/fetch/public); an optional key moves
 * the calls to the keyed endpoints and only lifts the per-IP rate limits. These
 * tests are credential-free: every upstream call is a stubbed globalThis.fetch.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/keenable-web-provider.test.ts
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-keenable-web-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { SEARCH_PROVIDERS, resolveSearchProviderId, selectProvider } =
  await import("../../open-sse/config/searchRegistry.ts");
const { buildKeenableSearchRequest, normalizeKeenableSearchResponse } =
  await import("../../open-sse/handlers/search/keenableSearch.ts");
const { keenableFetch, KEENABLE_FETCH_MAX_CHARACTERS } =
  await import("../../open-sse/executors/keenable-fetch.ts");
const {
  handleWebFetch,
  WEB_FETCH_PROVIDERS,
  EXPLICIT_ONLY_WEB_FETCH_PROVIDERS,
  ANONYMOUS_CAPABLE_WEB_FETCH_PROVIDERS,
} = await import("../../open-sse/handlers/webFetch.ts");
const { SEARCH_VALIDATOR_CONFIGS } =
  await import("../../src/lib/providers/validation/searchProviders.ts");
const { v1WebFetchSchema } = await import("../../src/shared/validation/schemas/apiV1.ts");
const { AI_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const searchRoute = await import("../../src/app/api/v1/search/route.ts");
const webFetchRoute = await import("../../src/app/api/v1/web/fetch/route.ts");

const config = SEARCH_PROVIDERS["keenable-search"];
const params = { query: "solid state battery progress", searchType: "web", maxResults: 5 };
const SEARCH_URL = "https://api.keenable.ai/v1/search";
const PUBLIC_SEARCH_URL = "https://api.keenable.ai/v1/search/public";
const PAGE_URL = "https://example.com/page";
const PUBLIC_FETCH_URL = `https://api.keenable.ai/v1/fetch/public?url=${encodeURIComponent(PAGE_URL)}`;
const KEYED_FETCH_URL = `https://api.keenable.ai/v1/fetch?url=${encodeURIComponent(PAGE_URL)}`;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function bodyOf(init: RequestInit): Record<string, unknown> {
  return JSON.parse(String(init.body));
}

function headersOf(init: RequestInit | undefined): Record<string, string> {
  return (init?.headers ?? {}) as Record<string, string>;
}

interface StubResult {
  title: string;
  url: string;
  snippet: string;
  content: { text: string; format?: string } | null;
  citation: { provider: string };
}

type FetchStub = (url: string | URL | Request, init?: RequestInit) => Promise<Response>;

async function withFetch<T>(stub: FetchStub, run: () => Promise<T>): Promise<T> {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = stub as typeof fetch;
  try {
    return await run();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function fetchPage(extra: Partial<Parameters<typeof keenableFetch>[0]> = {}) {
  return keenableFetch({
    url: PAGE_URL,
    format: "markdown",
    includeMetadata: true,
    credentials: {},
    ...extra,
  });
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string, apiKey: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

function postJson(route: { POST: (req: Request) => Promise<Response> }, p: string, body: unknown) {
  return route.POST(
    new Request(`http://localhost${p}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ── Registry / catalog ───────────────────────────────────────────────────────

test("keenable-search is a keyless, fallback-only web provider on the fixed Keenable endpoint", () => {
  assert.ok(config, "keenable-search must be in the search registry");
  assert.equal(config.baseUrl, SEARCH_URL);
  assert.equal(config.method, "POST");
  assert.equal(config.authType, "none");
  assert.equal(config.costPerQuery, 0);
  assert.equal(config.fallbackOnly, true, "a cost-0 provider must never win auto-selection");
  assert.deepEqual(config.searchTypes, ["web"]);
  assert.equal(config.maxMaxResults, 50);
  assert.equal(config.allowClientBaseUrlOverride, undefined);
  assert.equal(resolveSearchProviderId("keenable"), "keenable-search");
});

test("auto-selection never picks keenable-search; an explicit id or alias does", () => {
  assert.notEqual(selectProvider(undefined, "web")?.id, "keenable-search");
  assert.equal(selectProvider("keenable", "web")?.id, "keenable-search");
  assert.equal(selectProvider("keenable-search", "news"), null);
});

test("keenable-search is wired as a webSearch + webFetch catalog provider", () => {
  const entry = (AI_PROVIDERS as Record<string, { serviceKinds?: string[]; alias?: string }>)[
    "keenable-search"
  ];
  assert.ok(entry, "keenable-search must be in the provider catalog");
  assert.deepEqual(entry.serviceKinds, ["webSearch", "webFetch"]);
  assert.equal(entry.alias, "keenable");
  assert.ok(WEB_FETCH_PROVIDERS.includes("keenable-search"));
  assert.ok(ANONYMOUS_CAPABLE_WEB_FETCH_PROVIDERS.has("keenable-search"));
  assert.equal(EXPLICIT_ONLY_WEB_FETCH_PROVIDERS.has("keenable-search"), false);
  assert.equal(
    v1WebFetchSchema.safeParse({ url: PAGE_URL, provider: "keenable-search" }).success,
    true
  );
});

// ── Search request builder ───────────────────────────────────────────────────

test("without a key, posts to /v1/search/public with the app title and no key header", () => {
  const req = buildKeenableSearchRequest(config, params);
  assert.equal(req.url, PUBLIC_SEARCH_URL);
  assert.equal(req.init.method, "POST");
  assert.equal(req.init.redirect, "error");
  assert.deepEqual(req.init.headers, {
    "Content-Type": "application/json",
    "X-Keenable-Title": "OmniRoute",
  });
  assert.deepEqual(bodyOf(req.init), { query: params.query, max_results: 5 });
});

test("with a key, posts to /v1/search with X-API-Key", () => {
  const req = buildKeenableSearchRequest(config, { ...params, token: "keen_test" });
  assert.equal(req.url, SEARCH_URL);
  assert.deepEqual(req.init.headers, {
    "Content-Type": "application/json",
    "X-Keenable-Title": "OmniRoute",
    "X-API-Key": "keen_test",
  });
});

test("ignores caller and connection base URLs", () => {
  const req = buildKeenableSearchRequest(config, {
    ...params,
    token: "keen_test",
    providerOptions: { baseUrl: "https://attacker.example" },
    providerSpecificData: { baseUrl: "https://attacker.example" },
  });
  assert.equal(req.url, SEARCH_URL);
});

test("clamps max_results into 1..50", () => {
  for (const [requested, expected] of [
    [0, 1],
    [7, 7],
    [50, 50],
    [80, 50],
  ]) {
    const req = buildKeenableSearchRequest(config, { ...params, maxResults: requested });
    assert.equal(bodyOf(req.init).max_results, expected);
  }
});

test("maps a single include domain to site and time_range to published_after", () => {
  const req = buildKeenableSearchRequest(config, {
    ...params,
    domainFilter: ["https://docs.python.org/3/"],
    timeRange: "week",
  });
  const body = bodyOf(req.init);
  assert.equal(body.site, "docs.python.org");
  assert.match(String(body.published_after), /^\d{4}-\d{2}-\d{2}$/);

  const several = bodyOf(
    buildKeenableSearchRequest(config, { ...params, domainFilter: ["a.com", "b.com", "-c.com"] })
      .init
  );
  assert.equal(several.site, undefined, "Keenable takes one site; several are not sent");
  assert.equal(several.published_after, undefined);
});

test("rejects search types other than web", () => {
  assert.throws(
    () => buildKeenableSearchRequest(config, { ...params, searchType: "news" }),
    /only search_type "web"/
  );
});

// ── Search response normalizer ───────────────────────────────────────────────

test("reads result text from snippet, trims the summary and skips rows without a url", () => {
  const pageText = `# Heading\n\n${"word ".repeat(200)}`;
  const { results, totalResults } = normalizeKeenableSearchResponse(
    {
      results: [
        { title: "Title", url: PAGE_URL, description: "", snippet: pageText },
        { title: "", url: "https://example.com/b", description: "", snippet: "short text" },
        { title: "no url", description: "", snippet: "dropped" },
        "not-an-object",
      ],
    },
    (providerId, item, idx, now) =>
      ({
        title: item.title,
        url: item.url,
        snippet: item.snippet,
        position: idx + 1,
        content: item.full_text ? { text: item.full_text, format: item.text_format } : null,
        citation: { provider: providerId, retrieved_at: now, rank: idx + 1 },
      }) as never
  );
  assert.equal(totalResults, 2);
  const [first, second] = results as unknown as StubResult[];
  assert.equal(first.title, "Title");
  assert.ok(first.snippet.startsWith("# Heading word word"));
  assert.ok(first.snippet.length <= 300);
  assert.ok(!first.snippet.includes("\n"));
  assert.deepEqual(first.content, { text: pageText, format: "text" });
  assert.equal(first.citation.provider, "keenable-search");
  assert.equal(second.title, "https://example.com/b", "an empty title falls back to the url");
  assert.equal(second.snippet, "short text");
});

test("a payload without results normalizes to an empty list", () => {
  const out = normalizeKeenableSearchResponse({ error: "x" }, () => ({}) as never);
  assert.deepEqual(out, { results: [], totalResults: null });
});

// ── handleSearch pipeline ────────────────────────────────────────────────────

test("handleSearch runs keyless through the shared pipeline at zero cost", async () => {
  let captured: { url: string; init: RequestInit } = { url: "", init: {} };
  const result = await withFetch(
    async (url, init = {}) => {
      captured = { url: String(url), init };
      return jsonResponse({
        query: params.query,
        results: [{ title: "Title", url: PAGE_URL, description: "", snippet: "Page text" }],
      });
    },
    () =>
      handleSearch({
        query: params.query,
        provider: "keenable-search",
        maxResults: 5,
        searchType: "web",
        credentials: {},
        log: null,
      })
  );
  assert.equal(result.success, true);
  assert.equal(captured.url, PUBLIC_SEARCH_URL);
  assert.equal(headersOf(captured.init)["X-API-Key"], undefined);
  const [first] = result.data!.results;
  assert.equal(first.title, "Title");
  assert.equal(first.snippet, "Page text");
  assert.equal(first.citation.provider, "keenable-search");
  assert.equal(result.data!.usage.search_cost_usd, 0);
});

test("handleSearch sends a configured key only to the fixed keyed endpoint", async () => {
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  const result = await withFetch(
    async (url, init) => {
      calls.push({ url: String(url), init });
      return jsonResponse({ results: [] });
    },
    () =>
      handleSearch({
        query: params.query,
        provider: "keenable-search",
        maxResults: 5,
        searchType: "web",
        credentials: { apiKey: "keen_test" },
        log: null,
      })
  );
  assert.equal(result.success, true);
  assert.deepEqual(
    calls.map((c) => c.url),
    [SEARCH_URL]
  );
  assert.equal(headersOf(calls[0].init)["X-API-Key"], "keen_test");
});

test("handleSearch refuses a caller baseUrl before any network call", async () => {
  const calls: string[] = [];
  await withFetch(
    async (url) => {
      calls.push(String(url));
      return jsonResponse({ results: [] });
    },
    () =>
      assert.rejects(
        handleSearch({
          query: params.query,
          provider: "keenable-search",
          maxResults: 5,
          searchType: "web",
          providerOptions: { baseUrl: "https://attacker.example" },
          credentials: { apiKey: "keen_test" },
          log: null,
        }),
        { code: "SEARCH_BASE_URL_OVERRIDE_REFUSED" }
      )
  );
  assert.deepEqual(calls, []);
});

// ── /v1/search route ─────────────────────────────────────────────────────────

test("POST /v1/search with provider keenable works without a connection (keyless)", async () => {
  await resetStorage();
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  const response = await withFetch(
    async (url, init) => {
      calls.push({ url: String(url), init });
      return jsonResponse({
        results: [{ title: "T", url: PAGE_URL, description: "", snippet: "S" }],
      });
    },
    () => postJson(searchRoute, "/api/v1/search", { query: "keyless query", provider: "keenable" })
  );
  const body = (await response.json()) as { provider?: string };
  assert.equal(response.status, 200);
  assert.equal(body.provider, "keenable-search");
  assert.deepEqual(
    calls.map((c) => c.url),
    [PUBLIC_SEARCH_URL]
  );
  assert.equal(headersOf(calls[0].init)["X-Keenable-Title"], "OmniRoute");
});

test("POST /v1/search uses a stored Keenable key on the keyed endpoint", async () => {
  await resetStorage();
  await seedConnection("keenable-search", "keen_stored");
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  const response = await withFetch(
    async (url, init) => {
      calls.push({ url: String(url), init });
      return jsonResponse({ results: [] });
    },
    () => postJson(searchRoute, "/api/v1/search", { query: "keyed query", provider: "keenable" })
  );
  assert.equal(response.status, 200);
  assert.deepEqual(
    calls.map((c) => c.url),
    [SEARCH_URL]
  );
  assert.equal(headersOf(calls[0].init)["X-API-Key"], "keen_stored");
});

test("POST /v1/search auto-select with no connections never calls Keenable", async () => {
  await resetStorage();
  const calls: string[] = [];
  const response = await withFetch(
    async (url) => {
      calls.push(String(url));
      return new Response("<html><body></body></html>", {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    },
    () => postJson(searchRoute, "/api/v1/search", { query: "auto select query" })
  );
  assert.equal(response.status, 200);
  assert.ok(!calls.some((u) => u.includes("keenable.ai")), calls.join(","));
});

// ── Web fetch executor ───────────────────────────────────────────────────────

test("fetches markdown keyless from /v1/fetch/public with title and description", async () => {
  let captured: { url: string; init?: RequestInit } = { url: "" };
  const result = await withFetch(
    async (url, init) => {
      captured = { url: String(url), init };
      return jsonResponse({
        url: PAGE_URL,
        title: "Page",
        content: "# Page\n\nBody",
        description: "",
      });
    },
    () => fetchPage()
  );
  assert.equal(captured.url, PUBLIC_FETCH_URL);
  assert.equal(captured.init?.method, "GET");
  assert.equal(captured.init?.redirect, "error");
  assert.equal(headersOf(captured.init)["X-Keenable-Title"], "OmniRoute");
  assert.equal(headersOf(captured.init)["X-API-Key"], undefined);
  assert.equal(result.success, true);
  assert.deepEqual(result.data, {
    provider: "keenable-search",
    url: PAGE_URL,
    content: "# Page\n\nBody",
    links: [],
    metadata: { title: "Page", description: null },
    screenshot_url: null,
  });
});

test("a configured key moves fetch to /v1/fetch with X-API-Key", async () => {
  let captured: { url: string; init?: RequestInit } = { url: "" };
  await withFetch(
    async (url, init) => {
      captured = { url: String(url), init };
      return jsonResponse({ content: "body" });
    },
    () => fetchPage({ credentials: { apiKey: "keen_test" } })
  );
  assert.equal(captured.url, KEYED_FETCH_URL);
  assert.equal(headersOf(captured.init)["X-API-Key"], "keen_test");
});

test("caps fetched content at 100,000 characters and flags truncation", async () => {
  const long = "x".repeat(KEENABLE_FETCH_MAX_CHARACTERS + 10);
  const result = await withFetch(
    async () => jsonResponse({ content: long, title: "T" }),
    () => fetchPage()
  );
  assert.equal(result.success, true);
  assert.equal(result.data!.content.length, KEENABLE_FETCH_MAX_CHARACTERS);
  assert.equal(result.data!.metadata?.truncated, true);
});

test("rejects non-markdown formats before any network call", async () => {
  let called = false;
  const result = await withFetch(
    async () => {
      called = true;
      return jsonResponse({});
    },
    () => fetchPage({ format: "html" })
  );
  assert.equal(called, false);
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(String(result.error), /only supports format 'markdown'/);
});

test("keeps the upstream status, sanitizes the message and never echoes the key", async () => {
  const result = await withFetch(
    async () =>
      jsonResponse(
        { error: "Bad gateway", message: "The target page could not be reached by the fetcher" },
        502
      ),
    () => fetchPage({ credentials: { apiKey: "keen_secret_value" } })
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.match(String(result.error), /Keenable error 502: The target page could not be reached/);
  assert.ok(!String(result.error).includes("keen_secret_value"));
});

test("empty content is a 502 and a timeout is a 504", async () => {
  const empty = await withFetch(
    async () => jsonResponse({ content: "  " }),
    () => fetchPage()
  );
  assert.equal(empty.status, 502);

  const timedOut = await withFetch(
    async () => {
      const err = new Error("aborted");
      err.name = "AbortError";
      throw err;
    },
    () => fetchPage()
  );
  assert.equal(timedOut.status, 504);
});

test("handleWebFetch dispatches keenable-search to the Keenable executor", async () => {
  let calledUrl = "";
  const result = await withFetch(
    async (url) => {
      calledUrl = String(url);
      return jsonResponse({ content: "body" });
    },
    () => handleWebFetch({ url: PAGE_URL, provider: "keenable-search" }, {}, "keenable-search")
  );
  assert.equal(calledUrl, PUBLIC_FETCH_URL);
  assert.equal(result.success, true);
  assert.equal(result.data!.content, "body");
});

test("POST /v1/web/fetch with provider keenable-search works without a connection", async () => {
  await resetStorage();
  const calls: string[] = [];
  const response = await withFetch(
    async (url) => {
      calls.push(String(url));
      return jsonResponse({ content: "body" });
    },
    () =>
      postJson(webFetchRoute, "/api/v1/web/fetch", { url: PAGE_URL, provider: "keenable-search" })
  );
  const body = (await response.json()) as { provider?: string };
  assert.equal(response.status, 200);
  assert.equal(body.provider, "keenable-search");
  assert.deepEqual(calls, [PUBLIC_FETCH_URL]);
});

test("POST /v1/web/fetch auto-select does not use keyless Keenable", async () => {
  await resetStorage();
  const calls: string[] = [];
  const response = await withFetch(
    async (url) => {
      calls.push(String(url));
      return jsonResponse({ content: "body" });
    },
    () => postJson(webFetchRoute, "/api/v1/web/fetch", { url: PAGE_URL })
  );
  assert.equal(response.status, 400, "no configured fetch provider → 400, not a keyless call");
  assert.deepEqual(calls, []);
});

// ── Key validation ───────────────────────────────────────────────────────────

test("key validation probes the fixed keyed search endpoint with X-API-Key", () => {
  const probe = SEARCH_VALIDATOR_CONFIGS["keenable-search"];
  assert.ok(probe, "keenable-search must have a key validator");
  const { url, init } = probe("keen_test", { baseUrl: "https://attacker.example" });
  assert.equal(url, SEARCH_URL);
  assert.equal(init.method, "POST");
  assert.equal(headersOf(init)["X-API-Key"], "keen_test");
  assert.equal(headersOf(init)["X-Keenable-Title"], "OmniRoute");
  assert.deepEqual(bodyOf(init), { query: "test", max_results: 1 });
});
