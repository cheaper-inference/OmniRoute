import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-search-tavily-cost-"));

const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");
const { computeSearchCostUsd } = await import("../../open-sse/handlers/search/reportedCost.ts");

const tavily = SEARCH_PROVIDERS["tavily-search"];
const body = (fields: Record<string, unknown>) => JSON.stringify(fields);

// https://docs.tavily.com/documentation/api-credits: basic 1 credit, advanced 2
// credits, $0.008 per credit. The search endpoint docs put fast / ultra-fast at 1.
test("Tavily: search_depth advanced is 2 credits, every other depth is 1", () => {
  assert.equal(tavily.costPerQuery, 0.008);
  assert.equal(computeSearchCostUsd(tavily, body({ search_depth: "advanced" }), 5), 0.016);
  for (const depth of ["basic", "fast", "ultra-fast"]) {
    assert.equal(computeSearchCostUsd(tavily, body({ search_depth: depth }), 5), 0.008, depth);
  }
  assert.equal(computeSearchCostUsd(tavily, body({}), 5), 0.008);
});

test("Tavily: the result count does not change the price", () => {
  assert.equal(computeSearchCostUsd(tavily, body({ search_depth: "advanced" }), 20), 0.016);
  assert.equal(computeSearchCostUsd(tavily, body({ search_depth: "basic" }), 20), 0.008);
});

test("Tavily: handleSearch reports advanced depth at 2 credits", async () => {
  const originalFetch = globalThis.fetch;
  let sent: Record<string, unknown> = {};
  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    sent = JSON.parse(String(init.body || "{}"));
    return new Response(
      JSON.stringify({ results: [{ title: "t", url: "https://example.com", content: "c" }] }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
  try {
    const result = (await handleSearch({
      query: "kubernetes gateway api",
      maxResults: 5,
      searchType: "web",
      provider: "tavily-search",
      credentials: { apiKey: "test-key" },
      log: null,
      providerOptions: { tavily: { search_depth: "advanced" } },
    } as Parameters<typeof handleSearch>[0])) as {
      data?: { usage?: { search_cost_usd?: number } };
    };
    assert.equal(sent.search_depth, "advanced");
    assert.equal(result.data?.usage?.search_cost_usd, 0.016);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
