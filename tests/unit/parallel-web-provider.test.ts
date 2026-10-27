/**
 * Parallel (parallel.ai) as a web search + web fetch provider.
 *
 * One API key serves POST /v1/search (Parallel Search) and POST /v1/web/fetch
 * (Parallel Extract). These tests are credential-free: every upstream call is a
 * stubbed globalThis.fetch.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/parallel-web-provider.test.ts
 */

import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-parallel-web-"));

const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { SEARCH_PROVIDERS, resolveSearchProviderId } =
  await import("../../open-sse/config/searchRegistry.ts");
const { buildParallelSearchRequest, normalizeParallelSearchResponse, parallelAfterDate } =
  await import("../../open-sse/handlers/search/parallelSearch.ts");
const { computeSearchCostUsd } = await import("../../open-sse/handlers/search/reportedCost.ts");
const { shouldCoolDownSearchConnection } =
  await import("../../open-sse/handlers/search/searchProxy.ts");
const { parallelFetch, PARALLEL_FETCH_MAX_CHARACTERS } =
  await import("../../open-sse/executors/parallel-fetch.ts");
const { handleWebFetch, WEB_FETCH_PROVIDERS } = await import("../../open-sse/handlers/webFetch.ts");
const { SEARCH_VALIDATOR_CONFIGS } =
  await import("../../src/lib/providers/validation/searchProviders.ts");
const { v1WebFetchSchema } = await import("../../src/shared/validation/schemas/apiV1.ts");
const { AI_PROVIDERS } = await import("../../src/shared/constants/providers.ts");

const config = SEARCH_PROVIDERS["parallel-search"];
const params = {
  query: "solid state battery progress",
  searchType: "web",
  maxResults: 5,
  token: "parallel-test-key",
};
const PAGE_URL = "https://example.com/page";

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function bodyOf(init: RequestInit): Record<string, unknown> {
  return JSON.parse(String(init.body));
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

function fetchPage(extra: Partial<Parameters<typeof parallelFetch>[0]> = {}) {
  return parallelFetch({
    url: PAGE_URL,
    format: "markdown",
    includeMetadata: true,
    credentials: { apiKey: "parallel-test-key" },
    ...extra,
  });
}

// ── Registry / catalog ───────────────────────────────────────────────────────

test("parallel-search is a web-only API-key search provider on the fixed Parallel endpoint", () => {
  assert.ok(config, "parallel-search must be in the search registry");
  assert.equal(config.baseUrl, "https://api.parallel.ai/v1/search");
  assert.equal(config.method, "POST");
  assert.equal(config.authType, "apikey");
  assert.equal(config.authHeader, "x-api-key");
  assert.deepEqual(config.searchTypes, ["web"]);
  assert.equal(config.maxMaxResults, 20);
  assert.equal(config.allowClientBaseUrlOverride, undefined);
  assert.equal(resolveSearchProviderId("parallel"), "parallel-search");
});

test("parallel-search is wired as a webSearch + webFetch catalog provider", () => {
  const entry = (AI_PROVIDERS as Record<string, { serviceKinds?: string[]; alias?: string }>)[
    "parallel-search"
  ];
  assert.ok(entry, "parallel-search must be in the provider catalog");
  assert.deepEqual(entry.serviceKinds, ["webSearch", "webFetch"]);
  assert.equal(entry.alias, "parallel");
  assert.ok(WEB_FETCH_PROVIDERS.includes("parallel-search"));
  assert.equal(
    v1WebFetchSchema.safeParse({ url: PAGE_URL, provider: "parallel-search" }).success,
    true
  );
});

// ── Search request builder ───────────────────────────────────────────────────

test("builds a fast-mode search on the registry URL with x-api-key and no redirects", () => {
  const req = buildParallelSearchRequest(config, {
    ...params,
    language: "en",
    offset: 2,
    providerOptions: { baseUrl: "https://attacker.example" },
  });
  assert.equal(req.url, "https://api.parallel.ai/v1/search");
  assert.equal(req.init.method, "POST");
  assert.equal(req.init.redirect, "error");
  assert.deepEqual(req.init.headers, {
    "Content-Type": "application/json",
    "x-api-key": "parallel-test-key",
  });
  assert.deepEqual(bodyOf(req.init), {
    search_queries: [params.query],
    mode: "fast",
    advanced_settings: { max_results: 5 },
  });
});

test("an unknown mode falls back to fast; a known mode is forwarded", () => {
  const unknown = buildParallelSearchRequest(config, { ...params, providerOptions: { mode: "x" } });
  assert.equal(bodyOf(unknown.init).mode, "fast");
  const advanced = buildParallelSearchRequest(config, {
    ...params,
    providerOptions: { mode: "advanced" },
  });
  assert.equal(bodyOf(advanced.init).mode, "advanced");
});

test("clamps max_results into 1..20", () => {
  for (const [requested, expected] of [
    [0, 1],
    [-3, 1],
    [21, 20],
    [100, 20],
    [7, 7],
  ]) {
    const req = buildParallelSearchRequest(config, { ...params, maxResults: requested });
    const settings = bodyOf(req.init).advanced_settings as Record<string, unknown>;
    assert.equal(settings.max_results, expected, `maxResults ${requested}`);
  }
});

test("maps domains, excerpt budget, date, location and session", () => {
  const req = buildParallelSearchRequest(config, {
    ...params,
    country: "UK",
    timeRange: "week",
    domainFilter: ["https://example.com:443/path/", "-https://excluded.com"],
    contentOptions: { max_characters: 1200 },
    providerOptions: { mode: "advanced", session_id: "session-1" },
  });
  const body = bodyOf(req.init);
  const settings = body.advanced_settings as {
    max_results: number;
    excerpt_settings: unknown;
    location: string;
    source_policy: { include_domains: string[]; exclude_domains: string[]; after_date: string };
  };
  assert.equal(body.mode, "advanced");
  assert.equal(body.session_id, "session-1");
  assert.equal(settings.max_results, 5);
  assert.deepEqual(settings.excerpt_settings, { max_chars_per_result: 1200 });
  assert.equal(settings.location, "gb");
  assert.deepEqual(settings.source_policy.include_domains, ["example.com/path"]);
  assert.deepEqual(settings.source_policy.exclude_domains, ["excluded.com"]);
  assert.match(settings.source_policy.after_date, /^\d{4}-\d{2}-\d{2}$/);
});

test("turbo mode rejects path-prefix domain filters", () => {
  assert.throws(
    () =>
      buildParallelSearchRequest(config, {
        ...params,
        domainFilter: ["example.com/docs"],
        providerOptions: { mode: "turbo" },
      }),
    /path-prefix/
  );
});

test("a long query becomes the objective plus a word-boundary search query", () => {
  const query = "battery technology ".repeat(20).trim();
  const body = bodyOf(buildParallelSearchRequest(config, { ...params, query }).init);
  const shortQuery = (body.search_queries as string[])[0];
  assert.equal(body.objective, query);
  assert.ok(shortQuery.length <= 200);
  assert.ok(query.startsWith(`${shortQuery} `));
});

test("an explicit objective wins over the long-query objective", () => {
  const body = bodyOf(
    buildParallelSearchRequest(config, {
      ...params,
      query: "word ".repeat(60).trim(),
      providerOptions: { objective: "Explicit objective" },
    }).init
  );
  assert.equal(body.objective, "Explicit objective");
});

test("rejects oversized objective and session_id", () => {
  assert.throws(
    () =>
      buildParallelSearchRequest(config, {
        ...params,
        providerOptions: { objective: "a".repeat(5001) },
      }),
    /objective/
  );
  assert.throws(
    () =>
      buildParallelSearchRequest(config, {
        ...params,
        providerOptions: { session_id: "a".repeat(1001) },
      }),
    /session_id/
  );
});

test("after_date subtracts calendar months/years and clamps to the month end", () => {
  const cases: Array<[string, string, string]> = [
    ["2025-03-31", "month", "2025-02-28"],
    ["2024-03-31", "month", "2024-02-29"],
    ["2024-02-29", "year", "2023-02-28"],
    ["2025-03-10", "week", "2025-03-03"],
    ["2025-03-10", "day", "2025-03-09"],
    ["2025-03-10", "hour", "2025-03-09"],
  ];
  for (const [date, range, expected] of cases) {
    assert.equal(parallelAfterDate(range, new Date(`${date}T12:00:00Z`)), expected, range);
  }
  assert.equal(parallelAfterDate("any"), undefined);
  assert.equal(parallelAfterDate(undefined), undefined);
});

// ── Normalizer ───────────────────────────────────────────────────────────────

test("normalizes excerpts, missing title, date and citation", () => {
  const makeResult = (
    providerId: string,
    item: Record<string, unknown>,
    idx: number,
    now: string
  ) => ({ providerId, item, idx, now });
  const { results, totalResults } = normalizeParallelSearchResponse(
    {
      results: [
        {
          url: PAGE_URL,
          title: "Title",
          publish_date: "2026-01-15",
          excerpts: ["", "A", " ", "B"],
        },
        { url: PAGE_URL, excerpts: ["Only"] },
      ],
    },
    makeResult as never
  );
  assert.equal(totalResults, 2);
  const [first, second] = results as unknown as Array<ReturnType<typeof makeResult>>;
  assert.equal(first.providerId, "parallel-search");
  assert.deepEqual(first.item, {
    title: "Title",
    url: PAGE_URL,
    snippet: "A",
    published_at: "2026-01-15",
    full_text: "A\n\nB",
    text_format: "markdown",
  });
  assert.equal(second.idx, 1);
  assert.equal(second.item.snippet, "Only");
  assert.equal(second.item.title, undefined);
});

test("handleSearch returns normalized Parallel results through the shared pipeline", async () => {
  let captured: { url: string; init: RequestInit } = { url: "", init: {} };
  const result = await withFetch(
    async (url, init = {}) => {
      captured = { url: String(url), init };
      return jsonResponse({
        search_id: "search_1",
        results: [
          { url: PAGE_URL, title: "Title", publish_date: "2026-01-15", excerpts: ["A", "B"] },
        ],
      });
    },
    () =>
      handleSearch({
        query: params.query,
        provider: "parallel-search",
        maxResults: 5,
        searchType: "web",
        credentials: { apiKey: "parallel-test-key" },
        log: null,
      })
  );
  assert.equal(result.success, true);
  assert.equal(captured.url, "https://api.parallel.ai/v1/search");
  assert.equal(captured.init.redirect, "error");
  const [first] = result.data!.results;
  assert.equal(first.title, "Title");
  assert.equal(first.snippet, "A");
  assert.equal(first.published_at, "2026-01-15");
  assert.deepEqual(first.content, { format: "markdown", text: "A\n\nB", length: 4 });
  assert.equal(first.citation.provider, "parallel-search");
  assert.equal(result.data!.usage.search_cost_usd, 0.001);
});

test("handleSearch never forwards the key when the request carries a caller baseUrl", async () => {
  const calls: string[] = [];
  const result = await withFetch(
    async (url) => {
      calls.push(String(url));
      return jsonResponse({ results: [] });
    },
    () =>
      handleSearch({
        query: params.query,
        provider: "parallel-search",
        maxResults: 5,
        searchType: "web",
        providerOptions: { baseUrl: "https://attacker.example" },
        credentials: { apiKey: "parallel-test-key" },
        log: null,
      }).catch((err: unknown) => ({ success: false, error: String(err) }))
  );
  assert.ok(
    calls.every((url) => url === "https://api.parallel.ai/v1/search"),
    calls.join(",")
  );
  assert.ok(!calls.some((url) => url.includes("attacker")));
  assert.ok(result);
});

// ── Cost ─────────────────────────────────────────────────────────────────────

test("search cost follows the mode price plus per-result overage above 10", () => {
  const body = (mode: string) => JSON.stringify({ mode });
  const cases: Array<[string, number, number]> = [
    ["fast", 5, 0.001],
    ["turbo", 11, 0.002],
    ["basic", 5, 0.005],
    ["advanced", 12, 0.007],
    ["unknown", 5, 0.001],
  ];
  for (const [mode, count, expected] of cases) {
    assert.equal(computeSearchCostUsd(config, body(mode), count), expected, `${mode}/${count}`);
  }
  // Providers without a mode table keep their flat costPerQuery.
  const exa = SEARCH_PROVIDERS["exa-search"];
  assert.equal(computeSearchCostUsd(exa, body("advanced"), 50), exa.costPerQuery);
  assert.equal(computeSearchCostUsd(config, "not json", 3), config.costPerQuery);
});

test("handleSearch charges the advanced mode with overage on the usage block", async () => {
  const results = Array.from({ length: 12 }, (_, i) => ({
    url: `https://example.com/${i}`,
    excerpts: ["A"],
  }));
  const result = await withFetch(
    async () => jsonResponse({ results }),
    () =>
      handleSearch({
        query: params.query,
        provider: "parallel-search",
        maxResults: 20,
        searchType: "web",
        providerOptions: { mode: "advanced" },
        credentials: { apiKey: "parallel-test-key" },
        log: null,
      })
  );
  assert.equal(result.success, true);
  assert.equal(result.data!.usage.search_cost_usd, 0.007);
});

// ── Fetch (Extract) ──────────────────────────────────────────────────────────

test("fetches bounded markdown with title via the fixed Extract endpoint", async () => {
  let captured: { url: string; init: RequestInit } = { url: "", init: {} };
  const result = await withFetch(
    async (url, init = {}) => {
      captured = { url: String(url), init };
      return jsonResponse({
        results: [
          { url: PAGE_URL, title: "Title", publish_date: "2026-01-15", full_content: "# Hi" },
        ],
        errors: [],
      });
    },
    () => fetchPage()
  );
  assert.equal(captured.url, "https://api.parallel.ai/v1/extract");
  assert.equal(captured.init.method, "POST");
  assert.equal(captured.init.redirect, "error");
  const headers = captured.init.headers as Record<string, string>;
  assert.equal(headers["x-api-key"], "parallel-test-key");
  assert.equal(headers.Authorization, undefined);
  assert.deepEqual(bodyOf(captured.init), {
    urls: [PAGE_URL],
    advanced_settings: { full_content: { max_chars_per_result: PARALLEL_FETCH_MAX_CHARACTERS } },
  });
  assert.equal(PARALLEL_FETCH_MAX_CHARACTERS, 100_000);
  assert.equal(result.success, true);
  assert.equal(result.data!.provider, "parallel-search");
  assert.equal(result.data!.content, "# Hi");
  assert.deepEqual(result.data!.links, []);
  assert.equal(result.data!.metadata!.title, "Title");
});

test("caps fetched content at 100,000 characters and flags truncation", async () => {
  const result = await withFetch(
    async () => jsonResponse({ results: [{ url: PAGE_URL, full_content: "x".repeat(100_050) }] }),
    () => fetchPage()
  );
  assert.equal(result.success, true);
  assert.equal(result.data!.content.length, 100_000);
  assert.equal(result.data!.metadata!.truncated, true);
});

test("falls back to excerpts when full_content is blank", async () => {
  const result = await withFetch(
    async () =>
      jsonResponse({ results: [{ url: PAGE_URL, full_content: " ", excerpts: ["A", "B"] }] }),
    () => fetchPage({ includeMetadata: false })
  );
  assert.equal(result.success, true);
  assert.equal(result.data!.content, "A\n\nB");
  assert.equal(result.data!.metadata, null);
});

test("rejects non-markdown formats before any network call", async () => {
  let called = false;
  for (const format of ["html", "links", "screenshot"] as const) {
    const result = await withFetch(
      async () => {
        called = true;
        return jsonResponse({});
      },
      () => fetchPage({ format })
    );
    assert.equal(result.success, false);
    assert.equal(result.status, 400, format);
  }
  assert.equal(called, false);
});

test("requires an API key", async () => {
  const result = await fetchPage({ credentials: {} });
  assert.equal(result.success, false);
  assert.equal(result.status, 401);
});

test("maps a per-URL failure inside HTTP 200 to a sanitized 422 that never cools down", async () => {
  const result = await withFetch(
    async () =>
      jsonResponse({
        results: [],
        errors: [{ url: PAGE_URL, error_type: "fetch_error", http_status_code: 403, content: "x" }],
      }),
    () => fetchPage()
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 422);
  assert.ok(result.error!.includes("fetch_error"));
  assert.ok(result.error!.includes("403"));
  assert.doesNotMatch(result.error!, /example\.com/); // no echo of the requested URL or host
  assert.equal(shouldCoolDownSearchConnection(result.status!, result.error!), false);
});

test("a quota-shaped per-URL error_type is reported as unknown (no cooldown signal)", async () => {
  const result = await withFetch(
    async () =>
      jsonResponse({
        errors: [{ url: PAGE_URL, error_type: "quota_exceeded", http_status_code: 429 }],
      }),
    () => fetchPage()
  );
  assert.equal(result.status, 422);
  assert.ok(result.error!.includes("error_type: unknown"));
  assert.equal(shouldCoolDownSearchConnection(result.status!, result.error!), false);
});

test("treats empty or malformed success payloads as 502", async () => {
  for (const data of [
    { results: [] },
    { results: [{ url: PAGE_URL, title: "Malformed" }] },
    { results: [{ url: PAGE_URL, full_content: "  \n", excerpts: [" "] }] },
  ]) {
    const result = await withFetch(
      async () => jsonResponse(data),
      () => fetchPage()
    );
    assert.equal(result.success, false);
    assert.equal(result.status, 502, JSON.stringify(data));
  }
});

test("preserves the upstream status and error reference without echoing the key", async () => {
  for (const status of [401, 429]) {
    const result = await withFetch(
      async () =>
        jsonResponse({ type: "error", error: { message: "Rejected", ref_id: "ref-test" } }, status),
      () => fetchPage()
    );
    assert.equal(result.success, false);
    assert.equal(result.status, status);
    assert.ok(result.error!.includes("Rejected"));
    assert.ok(result.error!.includes("ref-test"));
    assert.ok(!result.error!.includes("parallel-test-key"));
  }
});

test("a refused redirect surfaces as a sanitized 502", async () => {
  const result = await withFetch(
    async () => {
      throw new TypeError("fetch failed: unexpected redirect");
    },
    () => fetchPage()
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.ok(!result.error!.includes("at /"));
});

test("handleWebFetch dispatches parallel-search to the Parallel executor", async () => {
  let calledUrl = "";
  const result = await withFetch(
    async (url) => {
      calledUrl = String(url);
      return jsonResponse({ results: [{ url: PAGE_URL, full_content: "body" }] });
    },
    () =>
      handleWebFetch(
        { url: PAGE_URL, provider: "parallel-search" },
        { apiKey: "parallel-test-key" },
        "parallel-search"
      )
  );
  assert.equal(calledUrl, "https://api.parallel.ai/v1/extract");
  assert.equal(result.success, true);
  assert.equal(result.data!.content, "body");
});

// ── Key validation ───────────────────────────────────────────────────────────

test("key validation probes the fixed Parallel search endpoint with x-api-key", () => {
  const probe = SEARCH_VALIDATOR_CONFIGS["parallel-search"];
  assert.ok(probe, "parallel-search must have a key validator");
  const { url, init } = probe("parallel-test-key", { baseUrl: "https://attacker.example" });
  assert.equal(url, "https://api.parallel.ai/v1/search");
  assert.equal(init.method, "POST");
  assert.equal((init.headers as Record<string, string>)["x-api-key"], "parallel-test-key");
});
