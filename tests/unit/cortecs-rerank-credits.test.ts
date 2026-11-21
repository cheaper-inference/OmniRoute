import assert from "node:assert/strict";
import test from "node:test";
import {
  accountCortecsRerankRequest,
  CORTECS_USD_COST_HEADERS,
  isCortecsRerankUrl,
  normalizeCortecsRerankUsage,
} from "../../src/lib/usage/cortecsRerankAccounting.ts";
import { calculateCostDetailed } from "../../src/lib/usage/costCalculator.ts";
import { readReportedCost } from "../../src/lib/usage/creditMeteredProviders.ts";

// Every accounted Cortecs rerank request asks for USD (x-cortecs-cost-unit: USD),
// so `usage.cost` is a USD amount; no credit unit or operator rate exists anymore.
const valid = { prompt_tokens: 200, completion_tokens: 0, total_tokens: 200, cost: 5 };

test("only the actual HTTPS Cortecs rerank endpoint is accounted", () => {
  for (const url of ["https://api.cortecs.ai/v1/rerank", "https://api.cortecs.ai:443/rerank"])
    assert.equal(isCortecsRerankUrl(url), true);
  for (const url of [
    "not a URL",
    "http://api.cortecs.ai/v1/rerank",
    "https://api.cortecs.ai:8443/v1/rerank",
    "https://api.cortecs.ai.example.com/v1/rerank",
    "https://user:pass@api.cortecs.ai/v1/rerank",
    "https://api.cortecs.ai/v1/chat/completions",
    "https://example.com/v1/rerank",
  ])
    assert.equal(isCortecsRerankUrl(url), false, url);
});

test("the outbound header asks Cortecs for USD costs", () => {
  assert.deepEqual(CORTECS_USD_COST_HEADERS, { "x-cortecs-cost-unit": "USD" });
});

test("only numerical metering fields survive normalization; source objects remain unchanged", () => {
  const source = { ...valid, query: "not accounting", document: "not accounting", cost_usd: 999 };
  const bill = normalizeCortecsRerankUsage(source);
  assert.deepEqual(bill, {
    costUsd: 5,
    usage: {
      prompt_tokens: 200,
      completion_tokens: 0,
      total_tokens: 200,
      cost_usd: 5,
    },
  });
  assert.equal(source.cost, 5);
  assert.equal(source.cost_usd, 999, "a raw USD-looking response field is never the cost source");
  assert.deepEqual(readReportedCost("cortecs", bill.usage), {
    providerCredits: null,
    providerCostUsd: 5,
  });
});

test("Cortecs usage never stores a credit quantity", () => {
  assert.deepEqual(readReportedCost("cortecs", { provider_credits: 5 }), {
    providerCredits: null,
    providerCostUsd: null,
  });
});

test("malformed usage and counts do not invent token quantities", () => {
  for (const source of [undefined, null, [], "usage"]) {
    assert.deepEqual(normalizeCortecsRerankUsage(source), { usage: {}, costUsd: null });
  }
  const result = normalizeCortecsRerankUsage({
    prompt_tokens: -1,
    completion_tokens: "0",
    total_tokens: Infinity,
  });
  assert.deepEqual(result.usage, {});
});

test("rerank usage is never token-repriced when USD is unknown; explicit USD zero wins", async () => {
  assert.deepEqual(
    await calculateCostDetailed(" CORTECS ", "synthetic-reranker", valid, {
      endpoint: "/v1/rerank",
    }),
    {
      costUsd: 0,
      priced: false,
    }
  );
  assert.deepEqual(await calculateCostDetailed("cortecs", "synthetic-reranker", { cost_usd: 0 }), {
    costUsd: 0,
    priced: true,
  });
  assert.deepEqual(readReportedCost("kiro", { provider_credits: 0.5, cost_in_usd_ticks: 1e8 }), {
    providerCredits: 0.5,
    providerCostUsd: 0.01,
  });
  assert.deepEqual(readReportedCost("other", { provider_credits: 5 }), {
    providerCredits: null,
    providerCostUsd: null,
  });
});

const input = {
  upstreamUrl: "https://api.cortecs.ai/v1/rerank",
  usage: valid,
  model: "synthetic-reranker",
  connectionId: "connection-fixture",
  apiKeyId: "caller-fixture",
  startTime: 0,
  requestId: "request-fixture",
};

test("a non-Cortecs request has no accounting side effects", async () => {
  const result = await accountCortecsRerankRequest(
    { ...input, upstreamUrl: "https://example.com/v1/rerank" },
    {
      saveUsage: async () => {
        assert.fail("unexpected persistence");
      },
    }
  );
  assert.equal(result, null);
});

test("missing caller still records attributed numerical usage, without a key debit", async () => {
  let writes = 0;
  await accountCortecsRerankRequest(
    { ...input, apiKeyId: null },
    {
      saveUsage: async (entry, options) => {
        writes++;
        assert.equal(entry.connectionId, input.connectionId);
        assert.equal(entry.endpoint, "/v1/rerank");
        assert.equal(options?.deduplicate, false);
        assert.equal("usage" in entry, false);
      },
      recordSpend: () => {
        assert.fail("unexpected debit");
      },
      recordUnpriced: () => {
        assert.fail("unexpected budget");
      },
    }
  );
  assert.equal(writes, 1);
});

test("persistence errors cannot convert successful paid work into a retryable error", async (t) => {
  const messages: unknown[][] = [];
  t.mock.method(console, "error", (...args: unknown[]) => messages.push(args));
  const bill = await accountCortecsRerankRequest(input, {
    saveUsage: async () => {
      throw new Error("sensitive context");
    },
    recordSpend: () => {
      throw new Error("sensitive context");
    },
  });
  assert.equal(bill?.costUsd, 5);
  assert.equal(messages.length, 2);
  assert.equal(JSON.stringify(messages).includes("sensitive context"), false);
});

test("unpriced-budget persistence errors are also nonfatal", async (t) => {
  t.mock.method(console, "error", () => {});
  const withoutCost = { prompt_tokens: 200, completion_tokens: 0, total_tokens: 200 };
  const bill = await accountCortecsRerankRequest(
    { ...input, usage: withoutCost },
    {
      saveUsage: async () => {},
      recordUnpriced: () => {
        throw new Error("synthetic persistence error");
      },
    }
  );
  assert.equal(bill?.costUsd, null);
});
