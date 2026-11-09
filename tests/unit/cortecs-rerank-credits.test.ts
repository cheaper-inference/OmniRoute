import assert from "node:assert/strict";
import test from "node:test";
import {
  accountCortecsRerankRequest,
  isCortecsRerankUrl,
  normalizeCortecsRerankUsage,
} from "../../src/lib/usage/cortecsRerankAccounting.ts";
import { calculateCostDetailed } from "../../src/lib/usage/costCalculator.ts";
import { readReportedCost } from "../../src/lib/usage/creditMeteredProviders.ts";

const valid = { prompt_tokens: 200, completion_tokens: 0, total_tokens: 200, cost: 5 };
const previousRate = process.env.CORTECS_CREDIT_PRICE_USD;
test.beforeEach(() => delete process.env.CORTECS_CREDIT_PRICE_USD);
test.after(() => {
  if (previousRate === undefined) delete process.env.CORTECS_CREDIT_PRICE_USD;
  else process.env.CORTECS_CREDIT_PRICE_USD = previousRate;
});

test("only the actual HTTPS Cortecs rerank endpoint selects credit metering", () => {
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

test("only numerical metering fields survive normalization; source objects remain unchanged", () => {
  const source = { ...valid, query: "not accounting", document: "not accounting", cost_usd: 999 };
  const bill = normalizeCortecsRerankUsage(source, "0.2");
  assert.deepEqual(bill, {
    costUsd: 1,
    usage: {
      prompt_tokens: 200,
      completion_tokens: 0,
      total_tokens: 200,
      provider_credits: 5,
      cost_usd: 1,
    },
  });
  assert.equal(source.cost, 5);
  assert.equal(
    source.cost_usd,
    999,
    "raw USD-looking fields are not a substitute for credit units"
  );
  assert.deepEqual(readReportedCost("cortecs", bill.usage), {
    providerCredits: 5,
    providerCostUsd: 1,
  });
});

for (const rate of [undefined, "", " ", "0", "-1", "NaN", "Infinity", "not-a-rate", "1e309"]) {
  test(`positive credits without a valid explicit rate stay unknown: ${String(rate)}`, () => {
    const bill = normalizeCortecsRerankUsage(valid, rate);
    assert.equal(bill.costUsd, null);
    assert.equal(bill.usage.provider_credits, 5);
    assert.equal(bill.usage.cost_usd, undefined);
  });
}

for (const value of [-1, 0.5, NaN, Infinity, "5", null, undefined, Number.MAX_SAFE_INTEGER + 1]) {
  test(`invalid credit quantities never become USD or fabricated zero: ${String(value)}`, () => {
    const bill = normalizeCortecsRerankUsage({ ...valid, cost: value }, "0.2");
    assert.equal(bill.costUsd, null);
    assert.equal(bill.usage.provider_credits, undefined);
  });
}

test("explicit zero credits remain zero even with no conversion", () => {
  assert.equal(normalizeCortecsRerankUsage({ cost: 0 }).costUsd, 0);
  assert.equal(
    normalizeCortecsRerankUsage({ cost: 5 }, "1e308").costUsd,
    null,
    "overflow is unknown"
  );
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

test("native credits are never token-repriced when USD is unknown; explicit USD zero wins", async () => {
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
  process.env.CORTECS_CREDIT_PRICE_USD = "0.2";
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
  assert.equal(bill?.costUsd, 1);
  assert.equal(messages.length, 2);
  assert.equal(JSON.stringify(messages).includes("sensitive context"), false);
});

test("unpriced-budget persistence errors are also nonfatal", async (t) => {
  t.mock.method(console, "error", () => {});
  const bill = await accountCortecsRerankRequest(input, {
    saveUsage: async () => {},
    recordUnpriced: () => {
      throw new Error("synthetic persistence error");
    },
  });
  assert.equal(bill?.costUsd, null);
});
