import test from "node:test";
import assert from "node:assert/strict";

const { SEARCH_PROVIDERS, getSearchProvider, selectProvider } =
  await import("../../open-sse/config/searchRegistry.ts");
const { TINYFISH_SEARCH_PROVIDER_ID, buildTinyFishSearchRequest, normalizeTinyFishSearchResponse } =
  await import("../../open-sse/handlers/search/tinyfishSearch.ts");

const config = SEARCH_PROVIDERS["tinyfish"];

test("tinyfish search is a fallback-only provider that shares the fetch key id", () => {
  assert.ok(getSearchProvider("tinyfish"), "tinyfish must be a search provider");
  assert.equal(config.id, "tinyfish");
  assert.equal(config.fallbackOnly, true);
  assert.equal(config.authHeader, "x-api-key");
  assert.deepEqual(config.searchTypes, ["web", "news"]);
  assert.notEqual(selectProvider(undefined, "web")?.id, "tinyfish", "never the first auto pick");
  assert.equal(TINYFISH_SEARCH_PROVIDER_ID, "tinyfish");
});

test("buildTinyFishSearchRequest sends news, domain lists and after_date, never the key in the URL", () => {
  const { url, init } = buildTinyFishSearchRequest(config, {
    query: "fusion reactor",
    searchType: "news",
    maxResults: 5,
    token: "tf-secret-key",
    timeRange: "week",
    domainFilter: ["reuters.com", "-spam.example"],
  });
  const parsed = new URL(url);

  assert.equal(parsed.hostname, "api.search.tinyfish.ai");
  assert.equal(parsed.searchParams.get("query"), "fusion reactor");
  assert.equal(parsed.searchParams.get("domain_type"), "news");
  assert.equal(parsed.searchParams.get("include_domains"), "reuters.com");
  assert.equal(parsed.searchParams.get("exclude_domains"), "spam.example");
  assert.match(parsed.searchParams.get("after_date") ?? "", /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(url.includes("tf-secret-key"), false, "the key must not appear in the URL");
  assert.equal(JSON.stringify(init.body ?? null).includes("tf-secret-key"), false);
  assert.equal((init.headers as Record<string, string>)["x-api-key"], "tf-secret-key");
  assert.equal(init.redirect, "error");
});

test("normalizeTinyFishSearchResponse keeps the date and publisher of each result", () => {
  const makeResult = (providerId: string, item: Record<string, unknown>, idx: number) => ({
    provider: providerId,
    index: idx,
    ...item,
  });
  const data = {
    results: [
      {
        title: "Reactor milestone",
        url: "https://reuters.com/a",
        snippet: "A short snippet.",
        date: "2026-11-18",
        publisher: "Reuters",
      },
    ],
  };
  const out = normalizeTinyFishSearchResponse(data, makeResult as never);
  assert.equal(out.results.length, 1);
  const row = out.results[0] as unknown as Record<string, unknown>;
  assert.equal(row.published_at, "2026-11-18");
  assert.equal(row.author, "Reuters");
  assert.equal(row.url, "https://reuters.com/a");
});
