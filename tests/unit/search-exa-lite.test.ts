import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-search-exa-lite-"));

const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");
const { computeSearchCostUsd } = await import("../../open-sse/handlers/search/reportedCost.ts");

type Captured = Record<string, unknown> & { contents?: Record<string, unknown> };

// Exa 3.0: `type: "lite"` accepts only these fields and rejects a request that
// sets anything else (https://exa.ai/docs/reference/search).
const LITE_TOP_LEVEL = new Set([
  "query",
  "type",
  "objective",
  "userIdentifier",
  "metadata",
  "category",
  "numResults",
  "contents",
  "userLocation",
  "includeDomains",
  "excludeDomains",
  "startPublishedDate",
  "endPublishedDate",
  "moderation",
  "compliance",
]);
const LITE_CONTENTS = new Set(["text", "highlights", "snapshotAsOf"]);

async function runExa(exa: Record<string, unknown>, extra: Record<string, unknown> = {}) {
  const originalFetch = globalThis.fetch;
  let body: Captured = {};
  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    body = JSON.parse(String(init.body || "{}"));
    return new Response(
      JSON.stringify({ results: [{ title: "t", url: "https://example.com", text: "x" }] }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
  try {
    const result = await handleSearch({
      query: "kubernetes gateway api",
      maxResults: 5,
      searchType: "web",
      provider: "exa-search",
      credentials: { apiKey: "test-key" },
      log: null,
      providerOptions: { exa },
      ...extra,
    } as Parameters<typeof handleSearch>[0]);
    return { body, result };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function searchCost(result: Awaited<ReturnType<typeof handleSearch>>): unknown {
  return (result as { data?: { usage?: { search_cost_usd?: number } } }).data?.usage
    ?.search_cost_usd;
}

test("Exa lite is billed at the lite price; auto and other types keep costPerQuery", async () => {
  const exa = SEARCH_PROVIDERS["exa-search"];
  assert.equal(exa.costPerQuery, 0.007);

  assert.equal(searchCost((await runExa({ type: "lite" })).result), 0.004);
  assert.equal(searchCost((await runExa({})).result), 0.007);
  assert.equal(searchCost((await runExa({ type: "deep" })).result), 0.007);
  // Live costDollars (2026-10-20): legacy `instant` bills like lite, `fast` like auto.
  assert.equal(searchCost((await runExa({ type: "instant" })).result), 0.004);
  assert.equal(searchCost((await runExa({ type: "fast" })).result), 0.007);
});

test("computeSearchCostUsd reads the provider's own mode field", () => {
  const exa = SEARCH_PROVIDERS["exa-search"];
  assert.equal(computeSearchCostUsd(exa, JSON.stringify({ type: "lite" }), 5), 0.004);
  // Exa's field is `type`; a stray `mode` must not pick the price.
  assert.equal(computeSearchCostUsd(exa, JSON.stringify({ mode: "lite" }), 5), 0.007);
});

test("Exa lite: fields lite rejects are dropped, lite-compatible ones are kept", async () => {
  const { body } = await runExa(
    {
      type: "lite",
      category: "news",
      userLocation: "US",
      moderation: true,
      objective: "recent releases",
      additionalQueries: ["gateway api v2"],
      systemPrompt: "be terse",
      contents: {
        text: { maxCharacters: 2000 },
        highlights: { maxCharacters: 500, query: "release" },
        summary: { query: "key changes" },
        extras: { links: 2 },
        livecrawlTimeout: 5000,
        maxAgeHours: 24,
      },
    },
    { timeRange: "week" }
  );

  assert.equal(body.type, "lite");
  for (const key of Object.keys(body)) {
    assert.ok(LITE_TOP_LEVEL.has(key), `lite request must not send top-level "${key}"`);
  }
  for (const key of Object.keys(body.contents ?? {})) {
    assert.ok(LITE_CONTENTS.has(key), `lite request must not send contents.${key}`);
  }
  assert.equal(body.category, "news");
  assert.equal(body.userLocation, "US");
  assert.equal(body.moderation, true);
  assert.equal(body.objective, "recent releases");
  assert.equal(typeof body.startPublishedDate, "string");
  assert.deepEqual(body.contents, {
    text: { maxCharacters: 2000 },
    highlights: { maxCharacters: 500, query: "release" },
  });
});

test("Exa auto keeps the fields that only lite rejects", async () => {
  const { body } = await runExa({
    additionalQueries: ["gateway api v2"],
    systemPrompt: "be terse",
    contents: { summary: { query: "key changes" }, maxAgeHours: 24 },
  });

  assert.equal(body.type, "auto");
  assert.deepEqual(body.additionalQueries, ["gateway api v2"]);
  assert.equal(body.systemPrompt, "be terse");
  assert.deepEqual(body.contents, {
    text: true,
    highlights: true,
    summary: { query: "key changes" },
    maxAgeHours: 24,
  });
});

test("Exa: deprecated contents fields are no longer forwarded", async () => {
  const { body } = await runExa({
    contents: {
      highlights: { numSentences: 3, highlightsPerUrl: 2, maxCharacters: 400 },
      subpages: 2,
      subpageTarget: "docs",
    },
  });

  assert.deepEqual(body.contents, { text: true, highlights: { maxCharacters: 400 } });
});

test("Exa: legacy instant is not filtered like lite (the API accepts its extra fields)", async () => {
  const { body } = await runExa({ type: "instant", additionalQueries: ["gateway api v2"] });
  assert.deepEqual(body.additionalQueries, ["gateway api v2"]);
});
