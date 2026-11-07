import test from "node:test";
import assert from "node:assert/strict";

import {
  SEARCH_PROVIDERS,
  resolveSearchProvider,
  selectProvider,
  supportsSearchType,
} from "../../open-sse/config/searchRegistry.ts";
import {
  KEENABLE_SEARCH_PROVIDER_ID,
  buildKeenableSearchRequest,
  normalizeKeenableSearchResponse,
} from "../../open-sse/handlers/search/keenableSearch.ts";
import { handleSearch } from "../../open-sse/handlers/search.ts";

test("keenable is an anonymous web search provider and default web selection", () => {
  const config = SEARCH_PROVIDERS[KEENABLE_SEARCH_PROVIDER_ID];
  assert.ok(config);
  assert.equal(config.authType, "none");
  assert.equal(config.baseUrl, "https://api.keenable.ai/v1/search/public");
  assert.equal(config.fallbackOnly, undefined);
  assert.equal(resolveSearchProvider("keenable")?.id, KEENABLE_SEARCH_PROVIDER_ID);
  assert.equal(resolveSearchProvider("keenable_search")?.id, KEENABLE_SEARCH_PROVIDER_ID);
  assert.equal(selectProvider(undefined, "web")?.id, KEENABLE_SEARCH_PROVIDER_ID);
  assert.equal(supportsSearchType(config, "news"), false);
});

test("Keenable keyless request includes app identifier, omits credentials and clamps results", () => {
  const config = SEARCH_PROVIDERS[KEENABLE_SEARCH_PROVIDER_ID];
  const { url, init } = buildKeenableSearchRequest(config, { query: "MCP docs", maxResults: 80 });
  assert.equal(url, "https://api.keenable.ai/v1/search/public");
  assert.equal(init.method, "POST");
  const headers = init.headers as Record<string, string>;
  assert.equal(headers["X-Keenable-Title"], "OmniRoute");
  assert.equal("Authorization" in headers, false);
  assert.deepEqual(JSON.parse(String(init.body)), { query: "MCP docs", max_results: 50 });
});

test("Keenable response normalizer skips invalid URLs and uses snippet fallback", () => {
  const seen: Array<{ id: string; title: string; snippet: string; rank: number }> = [];
  const result = normalizeKeenableSearchResponse(
    {
      results: [
        { title: "First", url: "https://example.com/a", snippet: "Snippet" },
        { title: "Ignored", url: "javascript:alert(1)" },
        { title: "Second", url: "https://example.com/b", description: "Description" },
      ],
    },
    (id, item, rank, _now) => {
      seen.push({ id, title: item.title || "", snippet: item.snippet || "", rank });
      return { title: item.title, url: item.url } as never;
    }
  );
  assert.equal(result.totalResults, 2);
  assert.deepEqual(seen, [
    { id: KEENABLE_SEARCH_PROVIDER_ID, title: "First", snippet: "Snippet", rank: 0 },
    { id: KEENABLE_SEARCH_PROVIDER_ID, title: "Second", snippet: "Description", rank: 1 },
  ]);
});

test("handleSearch executes Keenable through the standard gateway fetch and normalizes results", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl = "";
  let capturedInit: RequestInit | undefined;
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    capturedUrl = String(url);
    capturedInit = init;
    return new Response(
      JSON.stringify({
        query: "MCP docs",
        mode: "pro",
        results: [
          {
            title: "MCP specification",
            url: "https://modelcontextprotocol.io/specification",
            snippet: "Protocol for model tools",
            published_at: "2026-10-20T00:00:00Z",
          },
        ],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  try {
    const result = await handleSearch({
      query: "MCP docs",
      provider: KEENABLE_SEARCH_PROVIDER_ID,
      maxResults: 3,
      searchType: "web",
      credentials: {},
    });
    assert.equal(result.success, true, JSON.stringify(result));
    assert.equal(capturedUrl, "https://api.keenable.ai/v1/search/public");
    assert.equal(
      (capturedInit?.headers as Record<string, string>)["X-Keenable-Title"],
      "OmniRoute"
    );
    assert.equal(result.data?.provider, KEENABLE_SEARCH_PROVIDER_ID);
    assert.equal(result.data?.results[0]?.title, "MCP specification");
    assert.equal(result.data?.results[0]?.snippet, "Protocol for model tools");
  } finally {
    globalThis.fetch = originalFetch;
  }
});


test("Keenable normalizer enforces include_domains and exclude_domains filters", () => {
  const rows = {
    results: [
      { title: "Sibling", url: "https://sub.example.com/c" },
      { title: "Root", url: "https://example.com/a" },
      { title: "Other", url: "https://other.com/b" },
      { title: "Blocked domain", url: "https://excluded.org/d" },
      { title: "Blocked sub", url: "https://excluded.org/deep/page" },
    ],
  };
  const collect = (domainFilter?: string[]) =>
    normalizeKeenableSearchResponse(rows, (id, item) => ({ title: item.title, url: item.url }) as never, domainFilter)
      .results.map((item: { url: string }) => item.url.replace(/^https?:\/\//, ""));

  // include_domains keeps only the allowed domains (host + subdomains).
  assert.deepEqual(collect(["example.com"]), ["sub.example.com/c", "example.com/a"]);
  // exclude_domains removes blocked domains, keeps the rest.
  assert.deepEqual(collect(["-excluded.org", "-other.com"]), [
    "sub.example.com/c",
    "example.com/a",
  ]);
  // Without a filter nothing is dropped.
  assert.equal(collect(undefined).length, 5);
  // totalResults reflects the filtered set, not the upstream count.
  const filtered = normalizeKeenableSearchResponse(
    rows,
    (id, item) => ({ title: item.title, url: item.url }) as never,
    ["example.com"]
  );
  assert.equal(filtered.totalResults, 2);
});
