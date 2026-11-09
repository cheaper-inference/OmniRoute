import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-deepseek-web-"));
process.env.DATA_DIR = dataDir;
const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { SEARCH_PROVIDERS, resolveSearchProviderId, getSearchCredentialFallbacks } =
  await import("../../open-sse/config/searchRegistry.ts");
const { buildDeepSeekSearchRequest, deepseekAfterDate } =
  await import("../../open-sse/handlers/search/deepseekSearch.ts");
const { computeSearchCostUsd } = await import("../../open-sse/handlers/search/reportedCost.ts");
const { deepseekFetch, DEEPSEEK_FETCH_MAX_CHARACTERS } =
  await import("../../open-sse/executors/deepseek-fetch.ts");
const { handleWebFetch, WEB_FETCH_PROVIDERS } = await import("../../open-sse/handlers/webFetch.ts");
const { SEARCH_VALIDATOR_CONFIGS } =
  await import("../../src/lib/providers/validation/searchProviders.ts");
const { v1WebFetchSchema } = await import("../../src/shared/validation/schemas/apiV1.ts");
const { AI_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const config = SEARCH_PROVIDERS["deepseek-search"];
const params = { query: "DeepSeek", maxResults: 5, token: "test-deepseek-secret" };
const pageUrl = "https://example.com/article";
const row = {
  title: "Title",
  url: pageUrl,
  snippet: "Snippet",
  summary: "Summary",
  content: "Full page",
  rerank_score: 2.4,
  authority: 3,
  site_name: null,
  site_icon: null,
  date: "2026-10-17T00:00:00Z",
};
const json = (value: unknown, status = 200) =>
  new Response(JSON.stringify(value), {
    status,
    headers: { "Content-Type": "application/json" },
  });
type FetchStub = (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
async function withFetch<T>(stub: FetchStub, run: () => Promise<T>): Promise<T> {
  const original = globalThis.fetch;
  globalThis.fetch = stub as typeof fetch;
  try {
    return await run();
  } finally {
    globalThis.fetch = original;
  }
}
function search(query = params.query) {
  return handleSearch({
    query,
    provider: "deepseek-search",
    maxResults: 5,
    searchType: "web",
    credentials: { apiKey: params.token },
    log: null,
  });
}
function fetchPage(extra: Partial<Parameters<typeof deepseekFetch>[0]> = {}) {
  return deepseekFetch({
    url: pageUrl,
    format: "markdown",
    includeMetadata: true,
    credentials: { apiKey: params.token },
    ...extra,
  });
}

test("DeepSeek catalog offers Search and Fetch with existing LLM key fallback", () => {
  assert.equal(config.baseUrl, "https://api.deepseek.com/v1/tools/search");
  assert.equal(config.authHeader, "bearer");
  assert.equal(config.maxMaxResults, 50);
  assert.equal(resolveSearchProviderId("deepseek"), "deepseek-search");
  assert.deepEqual(getSearchCredentialFallbacks("deepseek-search"), ["deepseek"]);
  assert.deepEqual(AI_PROVIDERS["deepseek-search"].serviceKinds, ["webSearch", "webFetch"]);
  assert.ok(WEB_FETCH_PROVIDERS.includes("deepseek-search"));
  assert.ok(v1WebFetchSchema.safeParse({ url: pageUrl, provider: "deepseek-search" }).success);
  assert.equal(SEARCH_VALIDATOR_CONFIGS["deepseek-search"](params.token).url, config.baseUrl);
});

test("Search sends only documented options to the fixed HTTPS endpoint without redirects", () => {
  const req = buildDeepSeekSearchRequest(
    { ...config, baseUrl: "https://attacker.example" },
    {
      ...params,
      maxResults: 100,
      contentOptions: { full_page: true },
      providerOptions: {
        baseUrl: "https://attacker.example",
        ori_question: "What is DeepSeek?",
        localization: "203.0.113.1",
      },
    }
  );
  assert.equal(req.url, config.baseUrl);
  assert.equal(req.init.redirect, "error");
  assert.equal(new Headers(req.init.headers).get("authorization"), `Bearer ${params.token}`);
  assert.deepEqual(JSON.parse(String(req.init.body)), {
    query: "DeepSeek",
    count: 50,
    need_content: true,
    ori_question: "What is DeepSeek?",
    localization: "203.0.113.1",
  });
});

test("Search preserves operators and maps domain and language filters", () => {
  const req = buildDeepSeekSearchRequest(config, {
    ...params,
    query: 'DeepSeek "release"',
    domainFilter: ["github.com", "huggingface.co", "-example.com"],
    language: "en",
  });
  assert.equal(
    JSON.parse(String(req.init.body)).query,
    'DeepSeek "release" site:github.com OR site:huggingface.co -site:example.com lang:en'
  );
  assert.equal(deepseekAfterDate("month", new Date("2026-03-31T12:00:00Z")), "2026-02-28");
  assert.equal(deepseekAfterDate("year", new Date("2024-02-29T12:00:00Z")), "2023-02-28");
  assert.throws(() => deepseekAfterDate("hour"));
});

test("Search validates Unicode length and rejects unsupported or invalid options before spending", () => {
  assert.doesNotThrow(() =>
    buildDeepSeekSearchRequest(config, { ...params, query: "😀".repeat(128) })
  );
  const invalid = [
    { query: "😀".repeat(129) },
    { query: " " },
    { token: "" },
    { query: "x".repeat(128), language: "en" },
    { searchType: "news" },
    { country: "US" },
    { offset: 1 },
    { timeRange: "hour" },
    { domainFilter: ["example.com OR injected"] },
    { providerOptions: { need_content: "yes" } },
    { providerOptions: { localization: "not-an-ip" } },
    { providerOptions: { ori_question: "x".repeat(129) } },
    { contentOptions: { max_characters: 20 } },
  ];
  for (const extra of invalid)
    assert.throws(() => buildDeepSeekSearchRequest(config, { ...params, ...extra }));
});

test("Search pipeline normalizes scores, citations, source metadata and content", async () => {
  const result = await withFetch(
    async () => json({ results: [row] }),
    () => search()
  );
  assert.equal(result.success, true);
  const first = result.data!.results[0];
  assert.equal(first.title, row.title);
  assert.equal(first.snippet, row.snippet);
  assert.ok(Math.abs(first.score! - 0.8) < 1e-12);
  assert.equal(first.citation.provider, "deepseek-search");
  assert.deepEqual(first.content, {
    format: "text",
    text: row.content,
    length: row.content.length,
  });
  assert.equal(first.published_at, row.date);
  assert.equal(first.provider_raw!.authority, 3);
  assert.equal(result.data!.usage.search_cost_usd, 0.00075);
});

test("Empty Search results cost zero, while count never changes the flat request price", async () => {
  const result = await withFetch(
    async () => json({ results: [] }),
    () => search("no matches")
  );
  assert.equal(result.success, true);
  assert.deepEqual(result.data!.results, []);
  assert.equal(result.data!.usage.search_cost_usd, 0);
  for (const count of [1, 5, 50]) assert.equal(computeSearchCostUsd(config, "{}", count), 0.00075);
  assert.equal(computeSearchCostUsd(SEARCH_PROVIDERS["serper-search"], "{}", 0), 0.001);
});

test("Malformed Search responses fail rather than masquerading as free empty results", async () => {
  const result = await withFetch(
    async () => json({ results: "invalid" }),
    () => search("bad response")
  );
  assert.equal(result.success, false);
});

test("Search errors keep upstream status without exposing upstream bodies", async () => {
  for (const status of [401, 402, 403, 429, 500]) {
    const result = await withFetch(
      async () => json({ error: { message: params.token } }, status),
      () => search(`error ${status}`)
    );
    assert.equal(result.success, false);
    assert.equal(result.status, status);
    assert.ok(!JSON.stringify(result).includes(params.token));
  }
});

test("Fetch returns Markdown and metadata from a fixed endpoint, ignoring credential baseUrl", async () => {
  const result = await withFetch(
    async (url, init) => {
      assert.equal(String(url), "https://api.deepseek.com/v1/tools/fetch");
      assert.equal(init!.redirect, "error");
      assert.equal(new Headers(init!.headers).get("authorization"), `Bearer ${params.token}`);
      assert.deepEqual(JSON.parse(String(init!.body)), { url: pageUrl });
      return json({ title: "Title", content: "# Article" });
    },
    () => fetchPage({ credentials: { apiKey: params.token, baseUrl: "https://attacker.example" } })
  );
  assert.equal(result.success, true);
  assert.equal(result.data!.content, "# Article");
  assert.equal(result.data!.metadata!.title, "Title");
  assert.equal(result.data!.provider, "deepseek-search");
});

test("Fetch rejects unsupported formats, depth, selectors and unsafe URLs before calling upstream", async () => {
  await withFetch(
    async () => {
      throw new Error("Must not call upstream");
    },
    async () => {
      for (const format of ["html", "links", "screenshot"] as const)
        assert.equal((await fetchPage({ format })).status, 400);
      for (const url of [
        "file:///etc/passwd",
        "https://user:pass@example.com",
        "bad",
        "https://example.com/" + "x".repeat(8192),
      ])
        assert.equal((await fetchPage({ url })).status, 400);
      assert.equal((await fetchPage({ credentials: {} })).status, 401);
      for (const extra of [{ depth: 1 as const }, { wait_for_selector: "main" }]) {
        const result = await handleWebFetch(
          { provider: "deepseek-search", url: pageUrl, ...extra },
          { apiKey: params.token }
        );
        assert.equal(result.status, 400);
      }
    }
  );
});

test("Fetch caps content and can omit metadata", async () => {
  const result = await withFetch(
    async () => json({ title: "T", content: "x".repeat(100_001) }),
    () => fetchPage()
  );
  assert.equal(result.data!.content.length, DEEPSEEK_FETCH_MAX_CHARACTERS);
  assert.equal(result.data!.metadata!.truncated, true);
  const noMeta = await withFetch(
    async () => json({ title: "T", content: "text" }),
    () => fetchPage({ includeMetadata: false })
  );
  assert.equal(noMeta.data!.metadata, null);
});

test("Fetch preserves upstream status without leaking response bodies or exception messages", async () => {
  for (const status of [401, 402, 403, 404, 429, 500, 504]) {
    const result = await withFetch(
      async () => json({ error: params.token }, status),
      () => fetchPage()
    );
    assert.equal(result.status, status);
    assert.ok(!result.error!.includes(params.token));
  }
  for (const value of [{ title: "T", content: "" }, { title: "T" }, null]) {
    const result = await withFetch(
      async () => json(value),
      () => fetchPage()
    );
    assert.equal(result.status, 502);
  }
  const timeout = await withFetch(
    async () => {
      throw new DOMException(params.token, "AbortError");
    },
    () => fetchPage()
  );
  assert.equal(timeout.status, 504);
  const failed = await withFetch(
    async () => {
      throw new Error(params.token);
    },
    () => fetchPage()
  );
  assert.equal(failed.status, 502);
  assert.ok(!failed.error!.includes(params.token));
});
