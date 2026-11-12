import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-search-deepseek-"));

const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { SEARCH_PROVIDERS, resolveSearchProviderId } = await import(
  "../../open-sse/config/searchRegistry.ts"
);

function deepseekSearchPayload() {
  return {
    results: [
      {
        title: "DeepSeek V4 model release",
        url: "https://example.com/deepseek-v4",
        snippet: "Short summary for the UI.",
        summary: "Long summary meant to be read by a model.",
        site_name: "Example",
        site_icon: "https://example.com/favicon.ico",
        date: "2026-06-01T00:00:00+00:00",
        authority: 3,
      },
      {
        title: "DeepSeek docs",
        url: "https://api-docs.deepseek.com/guides/search",
        snippet: "",
        summary: "",
        site_name: null,
        site_icon: null,
        date: null,
        authority: -1,
      },
    ],
  };
}

test("deepseek-search is registered with /v1/tools/search and bearer auth", () => {
  const provider = SEARCH_PROVIDERS["deepseek-search"];
  assert.ok(provider, "deepseek-search must be in the search registry");
  assert.equal(provider.baseUrl, "https://api.deepseek.com/v1/tools/search");
  assert.equal(provider.method, "POST");
  assert.equal(provider.authType, "apikey");
  assert.equal(provider.authHeader, "bearer");
  assert.deepEqual(provider.searchTypes, ["web"]);
  assert.equal(provider.defaultMaxResults, 10);
  assert.equal(provider.maxMaxResults, 50);
  assert.equal(resolveSearchProviderId("deepseek"), "deepseek-search");
});

test("handleSearch builds a DeepSeek request with query and count", async () => {
  const originalFetch = globalThis.fetch;
  let captured: { url: string; headers: Record<string, string>; body: Record<string, unknown> } = {
    url: "",
    headers: {},
    body: {},
  };

  globalThis.fetch = async (url, init = {}) => {
    const request = init as RequestInit;
    captured = {
      url: String(url),
      headers: request.headers as Record<string, string>,
      body: JSON.parse(String(request.body || "{}")),
    };
    return new Response(JSON.stringify(deepseekSearchPayload()), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await handleSearch({
      query: "  deepseek   v4  ",
      provider: "deepseek-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "sk-deepseek" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://api.deepseek.com/v1/tools/search");
    assert.equal(captured.headers.Authorization, "Bearer sk-deepseek");
    assert.deepEqual(captured.body, { query: "deepseek v4", count: 5 });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch caps a DeepSeek count at 50", async () => {
  const originalFetch = globalThis.fetch;
  let captured = {};

  globalThis.fetch = async (_url, init = {}) => {
    captured = JSON.parse(String((init as RequestInit).body || "{}"));
    return new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    await handleSearch({
      query: "deepseek",
      provider: "deepseek-search",
      maxResults: 200,
      searchType: "web",
      credentials: { apiKey: "sk-deepseek" },
      log: null,
    });
    assert.equal((captured as { count?: number }).count, 50);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch normalizes DeepSeek results into the shared SearchResult shape", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify(deepseekSearchPayload()), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await handleSearch({
      query: "deepseek v4",
      provider: "deepseek-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "sk-deepseek" },
      log: null,
    });

    assert.equal(result.success, true);
    const data = result.data!;
    assert.equal(data.provider, "deepseek-search");
    assert.equal(data.metrics.total_results_available, 2);

    const [first, second] = data.results;
    assert.equal(first.title, "DeepSeek V4 model release");
    assert.equal(first.url, "https://example.com/deepseek-v4");
    assert.equal(first.position, 1);
    assert.equal(first.citation.provider, "deepseek-search");
    // The long summary is what a model reads, so it wins over the short snippet.
    assert.equal(first.snippet, "Long summary meant to be read by a model.");
    assert.equal(first.published_at, "2026-06-01T00:00:00+00:00");
    // The page body is not requested, so content stays null even when the
    // upstream payload carries one.
    assert.equal(first.content, null);

    // Empty summary and snippet map to an empty snippet.
    assert.equal(second.snippet, "");
    assert.equal(second.content, null);
    assert.equal(second.published_at, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch returns an empty result set when DeepSeek finds nothing", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await handleSearch({
      query: "a query with no hits",
      provider: "deepseek-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "sk-deepseek" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.deepEqual(result.data?.results, []);
    assert.equal(result.data?.metrics.total_results_available, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch rejects a DeepSeek query longer than 128 characters", async () => {
  const originalFetch = globalThis.fetch;
  let called = false;

  globalThis.fetch = async () => {
    called = true;
    return new Response("{}", { status: 200 });
  };

  try {
    const result = await handleSearch({
      query: "x".repeat(129),
      provider: "deepseek-search",
      maxResults: 5,
      searchType: "web",
      credentials: { apiKey: "sk-deepseek" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(called, false, "must not call DeepSeek with a query it would reject");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleSearch rejects a DeepSeek request with no credentials before calling out", async () => {
  const originalFetch = globalThis.fetch;
  let called = false;

  globalThis.fetch = async () => {
    called = true;
    return new Response("{}", { status: 200 });
  };

  try {
    const result = await handleSearch({
      query: "deepseek",
      provider: "deepseek-search",
      maxResults: 5,
      searchType: "web",
      credentials: {},
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 401);
    assert.equal(called, false, "must not call DeepSeek without a key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
