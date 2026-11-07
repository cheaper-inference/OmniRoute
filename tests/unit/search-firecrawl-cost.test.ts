import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-search-firecrawl-cost-"));

const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");
const { computeSearchCostUsd } = await import("../../open-sse/handlers/search/reportedCost.ts");

const firecrawl = SEARCH_PROVIDERS["firecrawl"];
const body = JSON.stringify({ query: "q", limit: 10 });

// https://docs.firecrawl.dev/billing: search is "2 credits / 10 results",
// "rounded up per 10 results (e.g., 11 results = 4 credits)". The registry's
// $0.002 per call is those 2 credits at $0.001 each.
test("Firecrawl: each started block of 10 results costs 2 credits", () => {
  assert.equal(firecrawl.costPerQuery, 0.002);
  assert.equal(computeSearchCostUsd(firecrawl, body, 1), 0.002);
  assert.equal(computeSearchCostUsd(firecrawl, body, 10), 0.002);
  assert.equal(computeSearchCostUsd(firecrawl, body, 11), 0.004);
  assert.equal(computeSearchCostUsd(firecrawl, body, 20), 0.004);
  assert.equal(computeSearchCostUsd(firecrawl, body, 21), 0.006);
  assert.equal(computeSearchCostUsd(firecrawl, body, 100), 0.02);
});

test("Firecrawl: a call with no results still costs the first block", () => {
  assert.equal(computeSearchCostUsd(firecrawl, body, 0), 0.002);
});

test("providers without block pricing keep their flat costPerQuery", () => {
  const serper = SEARCH_PROVIDERS["serper-search"];
  assert.equal(computeSearchCostUsd(serper, body, 100), serper.costPerQuery);
});

test("Firecrawl: handleSearch records 25 results as three blocks", async () => {
  const originalFetch = globalThis.fetch;
  const web = Array.from({ length: 25 }, (_, i) => ({
    title: `t${i}`,
    url: `https://example.com/${i}`,
    description: "d",
  }));
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ success: true, data: { web } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  try {
    const result = (await handleSearch({
      query: "kubernetes gateway api",
      maxResults: 25,
      searchType: "web",
      provider: "firecrawl",
      credentials: { apiKey: "test-key" },
      log: null,
    } as Parameters<typeof handleSearch>[0])) as {
      data?: { results?: unknown[]; usage?: { search_cost_usd?: number } };
    };
    assert.equal(result.data?.results?.length, 25);
    assert.equal(result.data?.usage?.search_cost_usd, 0.006);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
