import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-search-nimble-cost-"));

const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");

// https://docs.nimbleway.com/nimble-sdk/admin/pricing: search_depth "lite" is
// $1.10 per 1K, "standard" $5.00 per 1K. buildNimbleRequest() always sends lite.
const LITE_PRICE = 0.0011;

test("nimble-search is priced at the lite rate the builder always sends", () => {
  assert.equal(SEARCH_PROVIDERS["nimble-search"].costPerQuery, LITE_PRICE);
});

async function nimbleSearch(searchType: "web" | "news") {
  const originalFetch = globalThis.fetch;
  let sent: Record<string, unknown> = {};
  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    sent = JSON.parse(String(init.body || "{}"));
    return new Response(
      JSON.stringify({
        total_results: 1,
        results: [{ title: "t", url: "https://example.com", description: "d", content: "" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
  try {
    const result = (await handleSearch({
      query: "kubernetes gateway api",
      provider: "nimble-search",
      maxResults: 5,
      searchType,
      credentials: { apiKey: "nimble-key" },
      log: null,
    } as Parameters<typeof handleSearch>[0])) as {
      data?: { usage?: { search_cost_usd?: number } };
    };
    return { sent, cost: result.data?.usage?.search_cost_usd };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

for (const searchType of ["web", "news"] as const) {
  test(`Nimble ${searchType} search is recorded at the lite price`, async () => {
    const { sent, cost } = await nimbleSearch(searchType);
    assert.equal(sent.search_depth, "lite");
    // full_content adds a per-URL surcharge; the builder never asks for it.
    assert.equal(sent.full_content, undefined);
    assert.equal(cost, LITE_PRICE);
  });
}
