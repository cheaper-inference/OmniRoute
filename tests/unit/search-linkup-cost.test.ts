import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-search-linkup-cost-"));

const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");
const { computeSearchCostUsd } = await import("../../open-sse/handlers/search/reportedCost.ts");

const linkup = SEARCH_PROVIDERS["linkup-search"];
const body = (fields: Record<string, unknown>) => JSON.stringify(fields);

// https://docs.linkup.so/pages/documentation/development/pricing — searchResults
// output: fast / standard $0.005, deep $0.05.
test("Linkup: depth deep is $0.05, fast and standard stay $0.005", () => {
  assert.equal(linkup.costPerQuery, 0.005);
  assert.equal(computeSearchCostUsd(linkup, body({ depth: "deep" }), 5), 0.05);
  assert.equal(computeSearchCostUsd(linkup, body({ depth: "standard" }), 5), 0.005);
  assert.equal(computeSearchCostUsd(linkup, body({ depth: "fast" }), 5), 0.005);
  assert.equal(computeSearchCostUsd(linkup, body({ depth: "deep" }), 50), 0.05);
});

async function linkupSearch(options: Record<string, unknown>) {
  const originalFetch = globalThis.fetch;
  let sent: Record<string, unknown> = {};
  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    sent = JSON.parse(String(init.body || "{}"));
    return new Response(
      JSON.stringify({ results: [{ name: "t", url: "https://example.com", content: "c" }] }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
  try {
    const result = (await handleSearch({
      query: "kubernetes gateway api",
      maxResults: 5,
      searchType: "web",
      provider: "linkup-search",
      credentials: { apiKey: "test-key" },
      log: null,
      ...options,
    } as Parameters<typeof handleSearch>[0])) as {
      data?: { usage?: { search_cost_usd?: number } };
    };
    return { sent, cost: result.data?.usage?.search_cost_usd };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("Linkup: a deep search requested per call is recorded at $0.05", async () => {
  const { sent, cost } = await linkupSearch({ providerOptions: { depth: "deep" } });
  assert.equal(sent.depth, "deep");
  assert.equal(cost, 0.05);
});

test("Linkup: a connection that defaults to deep is recorded at $0.05", async () => {
  const { sent, cost } = await linkupSearch({
    credentials: { apiKey: "test-key", providerSpecificData: { depth: "deep" } },
  });
  assert.equal(sent.depth, "deep");
  assert.equal(cost, 0.05);
});

test("Linkup: the default standard depth stays at $0.005", async () => {
  const { sent, cost } = await linkupSearch({});
  assert.equal(sent.depth, "standard");
  assert.equal(cost, 0.005);
});
