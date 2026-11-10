import assert from "node:assert/strict";
import test from "node:test";
import {
  accountCortecsRerankRequest,
  normalizeCortecsRerankUsage,
} from "../../src/lib/usage/cortecsRerankAccounting.ts";
import { readReportedCost } from "../../src/lib/usage/creditMeteredProviders.ts";

const metered = { prompt_tokens: 34, completion_tokens: 0, total_tokens: 34 };

test("requested USD is persisted verbatim, never credit-converted or fabricated as credits", () => {
  for (const cost of [0, 0.000004466, 1, 17]) {
    const bill = normalizeCortecsRerankUsage({ ...metered, cost });
    assert.deepEqual(bill, { costUsd: cost, usage: { ...metered, cost_usd: cost } });
    assert.deepEqual(readReportedCost("cortecs", bill.usage), {
      providerCredits: null,
      providerCostUsd: cost,
    });
  }
});

test("USD selection comes from the outgoing request contract, not a response field", () => {
  const source = { ...metered, cost: 0.000004466, cost_usd: 999, provider_credits: 999 };
  const original = structuredClone(source);
  assert.equal(normalizeCortecsRerankUsage(source).costUsd, source.cost);
  assert.deepEqual(source, original);
  assert.equal(normalizeCortecsRerankUsage(source).usage.provider_credits, undefined);
});

for (const cost of [undefined, null, "0.000004466", -1, NaN, Infinity, -Infinity]) {
  test(`invalid USD remains unknown, never read from a USD-looking field: ${String(cost)}`, () => {
    const bill = normalizeCortecsRerankUsage({ ...metered, cost, cost_usd: 10 });
    assert.deepEqual(bill, { usage: metered, costUsd: null });
  });
}

test("one USD request produces one attributed usage entry and one unchanged debit", async () => {
  let writes = 0;
  let debits = 0;
  const cost = 0.000004466;
  const bill = await accountCortecsRerankRequest(
    {
      upstreamUrl: "https://api.cortecs.ai/v1/rerank",
      usage: { ...metered, cost },
      model: "synthetic-reranker",
      connectionId: "synthetic-connection",
      apiKeyId: "synthetic-caller",
      apiKeyName: "Synthetic caller",
      startTime: Date.now(),
      requestId: "synthetic-usd-request",
    },
    {
      saveUsage: async (entry, options) => {
        writes++;
        assert.equal(entry.provider, "cortecs");
        assert.equal(entry.connectionId, "synthetic-connection");
        assert.equal(entry.apiKeyId, "synthetic-caller");
        assert.equal(entry.tokens?.cost_usd, cost);
        assert.equal(entry.tokens?.provider_credits, undefined);
        assert.equal(options?.deduplicate, false);
      },
      recordSpend: (key, amount, entry) => {
        debits++;
        assert.equal(key, "synthetic-caller");
        assert.equal(amount, cost);
        assert.equal(entry?.requestId, "synthetic-usd-request");
      },
      recordUnpriced: () => assert.fail("A reported USD cost is not unpriced"),
    }
  );
  assert.equal(bill?.costUsd, cost);
  assert.equal(writes, 1);
  assert.equal(debits, 1);
});
