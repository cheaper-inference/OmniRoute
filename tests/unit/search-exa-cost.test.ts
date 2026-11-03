import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-search-exa-cost-"));

const { handleSearch } = await import("../../open-sse/handlers/search.ts");
const { SEARCH_PROVIDERS } = await import("../../open-sse/config/searchRegistry.ts");
const { computeSearchCostUsd } = await import("../../open-sse/handlers/search/reportedCost.ts");

const exa = SEARCH_PROVIDERS["exa-search"];
const body = (fields: Record<string, unknown>) => JSON.stringify(fields);

// Expected values are Exa's own costDollars.total from live calls (2026-10-20).
test("Exa: results above 10 add $0.001 each, for auto and lite", () => {
  assert.equal(computeSearchCostUsd(exa, body({ type: "auto" }), 10), 0.007);
  assert.equal(computeSearchCostUsd(exa, body({ type: "auto" }), 25), 0.022);
  assert.equal(computeSearchCostUsd(exa, body({ type: "auto" }), 30), 0.027);
  assert.equal(computeSearchCostUsd(exa, body({ type: "lite" }), 11), 0.005);
  assert.equal(computeSearchCostUsd(exa, body({ type: "lite" }), 30), 0.024);
});

test("Exa: contents.summary adds $0.001 per returned result", () => {
  const summary = (n: number) =>
    computeSearchCostUsd(exa, body({ type: "auto", contents: { text: true, summary: true } }), n);
  assert.equal(summary(1), 0.008);
  assert.equal(summary(10), 0.017);
  assert.equal(summary(25), 0.047);
  assert.equal(
    computeSearchCostUsd(exa, body({ type: "auto", contents: { summary: { query: "x" } } }), 5),
    0.012
  );
});

test("Exa: summary set to false or absent adds nothing", () => {
  assert.equal(
    computeSearchCostUsd(exa, body({ type: "auto", contents: { summary: false } }), 5),
    0.007
  );
  assert.equal(
    computeSearchCostUsd(exa, body({ type: "auto", contents: { text: true } }), 5),
    0.007
  );
});

test("Exa: handleSearch reports the summary and extra-result cost", async () => {
  const originalFetch = globalThis.fetch;
  const results = Array.from({ length: 12 }, (_, i) => ({
    title: `t${i}`,
    url: `https://example.com/${i}`,
    summary: "s",
  }));
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ results }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  try {
    const result = (await handleSearch({
      query: "kubernetes gateway api",
      maxResults: 12,
      searchType: "web",
      provider: "exa-search",
      credentials: { apiKey: "test-key" },
      log: null,
      providerOptions: { exa: { contents: { summary: true } } },
    } as Parameters<typeof handleSearch>[0])) as {
      data?: { usage?: { search_cost_usd?: number } };
    };
    // 0.007 base + 2 extra results + 12 summaries.
    assert.equal(result.data?.usage?.search_cost_usd, 0.021);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("providers without costByMode keep their flat costPerQuery", () => {
  const serper = SEARCH_PROVIDERS["serper-search"];
  assert.equal(
    computeSearchCostUsd(serper, body({ contents: { summary: true } }), 50),
    serper.costPerQuery
  );
});
