// Per-key usage and cost series for GET /v1/me/usage: the owned SQL source and the builder.
// The builder runs here with injected queries, clock, retention and pricer. Importing the
// modules still opens the database, so the file uses a temporary DATA_DIR of its own, set
// before any import that can open it.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-self-usage-builder-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { buildApiKeyOwnedSource } = await import("../../src/lib/db/usageAnalytics/apiKeyScope.ts");
const { buildApiKeySelfServiceUsage } =
  await import("../../src/lib/usage/apiKeySelfServiceUsage.ts");
const { selfUsageResponseSchema } = await import("../../src/shared/schemas/selfUsage.ts");
type SelfServiceUsageDeps =
  import("../../src/lib/usage/apiKeySelfServiceUsage.ts").SelfServiceUsageDeps;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const NOW = Date.parse("2026-05-27T15:30:00.000Z");
const KEY = { id: "key-a", scopes: ["self:usage"] };

const COST_FIELDS = {
  cacheReadTokens: 0,
  cacheCreationTokens: 0,
  reasoningTokens: 0,
  storedCost: 0,
  isAggregated: 0,
  costCacheReadTokens: 0,
  costCacheCreationTokens: 0,
  costReasoningTokens: 0,
};

/** One day x provider x model slice, in the shapes of the cost and per-model queries. */
function slice(
  date: string,
  provider: string,
  model: string,
  requests: number,
  prompt: number,
  completion: number
) {
  const tokens = {
    promptTokens: prompt,
    completionTokens: completion,
    costPromptTokens: prompt,
    costCompletionTokens: completion,
  };
  return {
    cost: { date, provider, model, serviceTier: "standard", ...COST_FIELDS, ...tokens },
    model: {
      model,
      provider,
      serviceTier: "standard",
      requests,
      ...COST_FIELDS,
      ...tokens,
      totalTokens: prompt + completion,
      avgLatencyMs: 100,
      successfulRequests: requests,
      lastUsed: `${date}T10:00:00.000Z`,
    },
  };
}

const SLICES = [
  slice("2026-05-26", "claude", "claude-sonnet-5", 2, 1500, 700),
  slice("2026-05-27", "claude", "claude-sonnet-5", 1, 500, 300),
  slice("2026-05-27", "openai", "gpt-5", 1, 1000, 500),
];

const SUMMARY = {
  estimatedRequests: 0,
  unknownEvidenceRequests: 0,
  totalRequests: 4,
  promptTokens: 3000,
  completionTokens: 1500,
  totalTokens: 4500,
  uniqueModels: 2,
  uniqueAccounts: 1,
  uniqueApiKeys: 1,
  successfulRequests: 4,
  avgLatencyMs: 100,
  firstRequest: "2026-05-26T10:00:00.000Z",
  lastRequest: "2026-05-27T10:00:00.000Z",
};

const EMPTY_SUMMARY = {
  ...SUMMARY,
  totalRequests: 0,
  promptTokens: 0,
  completionTokens: 0,
  totalTokens: 0,
  uniqueModels: 0,
  uniqueAccounts: 0,
  uniqueApiKeys: 0,
  successfulRequests: 0,
  avgLatencyMs: 0,
  firstRequest: "",
  lastRequest: "",
};

const DAILY = [
  { date: "2026-05-26", requests: 2, promptTokens: 1500, completionTokens: 700, totalTokens: 2200 },
  { date: "2026-05-27", requests: 2, promptTokens: 1500, completionTokens: 800, totalTokens: 2300 },
];

const PROVIDERS = [
  {
    provider: "claude",
    requests: 3,
    promptTokens: 2000,
    completionTokens: 1000,
    totalTokens: 3000,
    avgLatencyMs: 100,
    successfulRequests: 3,
  },
  {
    provider: "openai",
    requests: 1,
    promptTokens: 1000,
    completionTokens: 500,
    totalTokens: 1500,
    avgLatencyMs: 100,
    successfulRequests: 1,
  },
];

type Queries = NonNullable<SelfServiceUsageDeps["queries"]>;

function deps(over: { empty?: boolean; seen?: Array<[string, Record<string, string>]> } = {}) {
  const record = (name: string, params: Record<string, string>) => over.seen?.push([name, params]);
  const queries: Queries = {
    summary: (_source, params) => {
      record("summary", params);
      return over.empty ? EMPTY_SUMMARY : SUMMARY;
    },
    daily: (_source, params) => {
      record("daily", params);
      return over.empty ? [] : DAILY;
    },
    dailyCost: (_source, params) => {
      record("dailyCost", params);
      return over.empty ? [] : SLICES.map((s) => s.cost);
    },
    models: (_source, params) => {
      record("models", params);
      return over.empty ? [] : SLICES.map((s) => s.model);
    },
    providers: (_source, params) => {
      record("providers", params);
      return over.empty ? [] : PROVIDERS;
    },
  };
  return {
    now: () => NOW,
    retentionDays: () => 30,
    queries,
    priceRow: (row: object, flat: boolean) =>
      ((flat ? 1 : 2) * (row as { promptTokens: number }).promptTokens) / 1000,
  } satisfies SelfServiceUsageDeps;
}

test("the owned source filters by api_key_id only and never reads the daily summaries", () => {
  const { unifiedSource, unifiedParams } = buildApiKeyOwnedSource({
    apiKeyId: "key-a",
    sinceIso: "2020-01-01T00:00:00.000Z",
    rawCutoffDate: "2026-04-27",
  });
  assert.match(unifiedSource, /api_key_id = @ownerApiKeyId/);
  // The name column is selected, but never compared to anything.
  assert.doesNotMatch(unifiedSource, /api_key_name\s*(=|IN\b|LIKE\b)/i);
  assert.ok(!unifiedSource.includes("daily_usage_summary"));
  assert.deepEqual(
    [unifiedParams.ownerApiKeyId, unifiedParams.since],
    ["key-a", "2020-01-01T00:00:00.000Z"]
  );
  // The key id is a bound parameter: it never appears in the SQL text.
  assert.ok(!unifiedSource.includes("key-a"));
});

test("the owned source refuses an empty key id instead of matching legacy rows", () => {
  for (const apiKeyId of ["", "   "]) {
    assert.throws(() =>
      buildApiKeyOwnedSource({ apiKeyId, sinceIso: null, rawCutoffDate: "2026-04-27" })
    );
  }
});

test("totals, daily series and breakdowns add up, with billed cost next to list price", async () => {
  const out = await buildApiKeySelfServiceUsage(KEY, "7d", deps());
  assert.deepEqual(
    [out.summary.requests, out.summary.totalTokens, out.summary.costUsd, out.summary.listPriceUsd],
    [4, 4500, 3, 6]
  );
  assert.equal(
    out.daily.reduce((s, d) => s + d.costUsd, 0),
    3
  );
  assert.deepEqual(
    out.daily.map((d) => [d.date, d.requests, d.costUsd, d.listPriceUsd]),
    [
      ["2026-05-26", 2, 1.5, 3],
      ["2026-05-27", 2, 1.5, 3],
    ]
  );
  assert.deepEqual(
    out.byModel.map((m) => [m.model, m.requests, m.costUsd]),
    [
      ["claude-sonnet-5", 3, 2],
      ["gpt-5", 1, 1],
    ]
  );
  assert.equal(out.byModel[0].lastUsed, "2026-05-27T10:00:00.000Z");
  assert.deepEqual(
    out.byProvider.map((p) => [p.provider, p.costUsd, p.listPriceUsd]),
    [
      ["claude", 2, 4],
      ["openai", 1, 2],
    ]
  );
  assert.equal(out.dailyByModel.length, 3);
  assert.deepEqual(
    [out.summary.successRatePct, out.summary.firstRequest],
    [100, SUMMARY.firstRequest]
  );
  assert.doesNotThrow(() => selfUsageResponseSchema.parse(out));
});

test("every query reads the same owned source, starting at the window's lower bound", async () => {
  const seen: Array<[string, Record<string, string>]> = [];
  await buildApiKeySelfServiceUsage(KEY, "7d", deps({ seen }));
  assert.deepEqual(seen.map(([name]) => name).sort(), [
    "daily",
    "dailyCost",
    "models",
    "providers",
    "summary",
  ]);
  for (const [, params] of seen) {
    assert.deepEqual(params, {
      since: new Date(NOW - 7 * 86_400_000).toISOString(),
      ownerApiKeyId: "key-a",
    });
  }
});

test("coverage states the window and whether retention cuts it short", async () => {
  const long = await buildApiKeySelfServiceUsage(KEY, "90d", deps());
  assert.deepEqual([long.coverage.retentionDays, long.coverage.truncatedByRetention], [30, true]);
  assert.equal(long.coverage.from, new Date(NOW - 90 * 86_400_000).toISOString());
  assert.equal(long.coverage.to, new Date(NOW).toISOString());
  assert.equal(long.generatedAt, new Date(NOW).toISOString());
  const short = await buildApiKeySelfServiceUsage(KEY, "7d", deps());
  assert.equal(short.coverage.truncatedByRetention, false);
});

test("a key with no usage gets zeros and empty series; a key without the scope is refused", async () => {
  const empty = await buildApiKeySelfServiceUsage(KEY, "30d", deps({ empty: true }));
  assert.deepEqual(
    [
      empty.summary.requests,
      empty.summary.costUsd,
      empty.daily.length,
      empty.byModel.length,
      empty.summary.firstRequest,
      empty.summary.successRatePct,
    ],
    [0, 0, 0, 0, null, 0]
  );
  assert.doesNotThrow(() => selfUsageResponseSchema.parse(empty));
  await assert.rejects(
    buildApiKeySelfServiceUsage({ id: "k", scopes: [] }, "30d", deps()),
    /missing_self_usage_scope/
  );
});

test("account and key columns of the reused queries never reach the result", async () => {
  const out = await buildApiKeySelfServiceUsage(KEY, "7d", deps());
  const text = JSON.stringify(selfUsageResponseSchema.parse(out));
  for (const leak of ["uniqueAccounts", "uniqueApiKeys", "serviceTier", "storedCost", "key-a"]) {
    assert.ok(!text.includes(leak), `leaked: ${leak}`);
  }
});
