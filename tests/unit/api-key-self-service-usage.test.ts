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
const { createSelfServiceUsageCache, getApiKeySelfServiceUsage } =
  await import("../../src/lib/usage/apiKeySelfServiceUsageCache.ts");
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

/** One day x provider x model slice, in the shape of the daily cost rows. `byModel` is built from them too. */
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
    cost: {
      date,
      provider,
      model,
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
    untilIso: "2026-05-27T15:30:00.000Z",
    rawCutoffDate: "2026-04-27",
  });
  assert.match(unifiedSource, /api_key_id = @ownerApiKeyId/);
  // The name column is selected, but never compared to anything.
  assert.doesNotMatch(unifiedSource, /api_key_name\s*(=|IN\b|LIKE\b)/i);
  assert.ok(!unifiedSource.includes("daily_usage_summary"));
  assert.deepEqual(
    [unifiedParams.ownerApiKeyId, unifiedParams.since, unifiedParams.until],
    ["key-a", "2020-01-01T00:00:00.000Z", "2026-05-27T15:30:00.000Z"]
  );
  assert.match(unifiedSource, /timestamp <= @until/);
  // The key id is a bound parameter: it never appears in the SQL text.
  assert.ok(!unifiedSource.includes("key-a"));
});

test("the owned source refuses an empty key id instead of matching legacy rows", () => {
  for (const apiKeyId of ["", "   "]) {
    assert.throws(() =>
      buildApiKeyOwnedSource({
        apiKeyId,
        sinceIso: null,
        untilIso: null,
        rawCutoffDate: "2026-04-27",
      })
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

test("every query reads the same owned source, bounded by the window's start and now", async () => {
  const seen: Array<[string, Record<string, string>]> = [];
  await buildApiKeySelfServiceUsage(KEY, "7d", deps({ seen }));
  // The grouped scan runs once: the cost series and the per-model table share its rows.
  assert.deepEqual(seen.map(([name]) => name).sort(), [
    "daily",
    "dailyCost",
    "providers",
    "summary",
  ]);
  for (const [, params] of seen) {
    assert.deepEqual(params, {
      since: new Date(NOW - 7 * 86_400_000).toISOString(),
      until: new Date(NOW).toISOString(),
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

test("byModel keeps 50 pairs and says when more pairs existed", async () => {
  const withPairs = (count: number) => {
    const base = deps();
    const rows = Array.from(
      { length: count },
      (_, i) => slice("2026-05-27", "openai", `model-${i}`, count - i, 100, 50).cost
    );
    return { ...base, queries: { ...base.queries, dailyCost: () => rows } };
  };
  const exact = await buildApiKeySelfServiceUsage(KEY, "7d", withPairs(50));
  assert.deepEqual([exact.byModel.length, exact.byModelTruncated], [50, false]);
  const over = await buildApiKeySelfServiceUsage(KEY, "7d", withPairs(51));
  assert.deepEqual([over.byModel.length, over.byModelTruncated], [50, true]);
  assert.equal(over.byModel[49].model, "model-49");
  assert.equal(selfUsageResponseSchema.parse(over).byModelTruncated, true);
  const small = await buildApiKeySelfServiceUsage(KEY, "7d", deps());
  assert.equal(small.byModelTruncated, false);
});

test("account and key columns of the reused queries never reach the result", async () => {
  const out = await buildApiKeySelfServiceUsage(KEY, "7d", deps());
  const text = JSON.stringify(selfUsageResponseSchema.parse(out));
  for (const leak of ["uniqueAccounts", "uniqueApiKeys", "serviceTier", "storedCost", "key-a"]) {
    assert.ok(!text.includes(leak), `leaked: ${leak}`);
  }
});

// ---------------------------------------------------------------------------
// Reuse of a built series (getApiKeySelfServiceUsage): 60 seconds per (key id, range).

/** Deps whose summary depends on the queried key id, with a clock and a build counter. */
function reuseDeps(options: { failFirst?: boolean; maxEntries?: number } = {}) {
  const state = { t: NOW, builds: 0, failures: options.failFirst ? 1 : 0 };
  const base = deps();
  const queries: Queries = {
    ...base.queries,
    summary: (_source, params) => {
      state.builds += 1;
      if (state.failures > 0) {
        state.failures -= 1;
        throw new Error("summary failed");
      }
      return { ...SUMMARY, totalRequests: params.ownerApiKeyId === "key-a" ? 4 : 9 };
    },
  };
  const cache = createSelfServiceUsageCache({ maxEntries: options.maxEntries });
  return { state, deps: { ...base, now: () => state.t, queries, cache } };
}

const KEY_B = { id: "key-b", scopes: ["self:usage"] };

test("a second call within 60 s reuses the built series; after 60 s it rebuilds", async () => {
  const { state, deps: d } = reuseDeps();
  const first = await getApiKeySelfServiceUsage(KEY, "7d", d);
  state.t = NOW + 59_999;
  const second = await getApiKeySelfServiceUsage(KEY, "7d", d);
  assert.equal(state.builds, 1);
  assert.equal(second, first);
  assert.equal(second.generatedAt, new Date(NOW).toISOString());
  state.t = NOW + 60_001;
  const third = await getApiKeySelfServiceUsage(KEY, "7d", d);
  assert.equal(state.builds, 2);
  assert.equal(third.generatedAt, new Date(NOW + 60_001).toISOString());
});

test("concurrent calls for one key and range share one build", async () => {
  const { state, deps: d } = reuseDeps();
  const [x, y] = await Promise.all([
    getApiKeySelfServiceUsage(KEY, "30d", d),
    getApiKeySelfServiceUsage(KEY, "30d", d),
  ]);
  assert.equal(state.builds, 1);
  assert.equal(x, y);
});

test("a build still in flight is shared, not started twice", async () => {
  const cache = createSelfServiceUsageCache();
  let starts = 0;
  let finish: (value: unknown) => void = () => {};
  const build = () => {
    starts += 1;
    return new Promise((resolve) => {
      finish = resolve;
    }) as ReturnType<typeof getApiKeySelfServiceUsage>;
  };
  const first = cache.memoize("k", NOW, build);
  const second = cache.memoize("k", NOW + 1, build);
  assert.equal(starts, 1);
  const built = { range: "7d" };
  finish(built);
  assert.deepEqual([await first, await second], [built, built]);
});

test("a failed build is not kept; every waiter gets the same failure", async () => {
  const { state, deps: d } = reuseDeps({ failFirst: true });
  const results = await Promise.allSettled([
    getApiKeySelfServiceUsage(KEY, "7d", d),
    getApiKeySelfServiceUsage(KEY, "7d", d),
  ]);
  assert.deepEqual(
    results.map((r) => r.status),
    ["rejected", "rejected"]
  );
  const [r1, r2] = results as PromiseRejectedResult[];
  assert.equal(r1.reason, r2.reason);
  assert.equal(state.builds, 1);
  const retry = await getApiKeySelfServiceUsage(KEY, "7d", d);
  assert.equal(state.builds, 2);
  assert.equal(retry.summary.requests, 4);
});

test("two keys never share an entry, even interleaved on the same range", async () => {
  const { state, deps: d } = reuseDeps();
  const seen: number[] = [];
  for (const key of [KEY, KEY_B, KEY, KEY_B]) {
    seen.push((await getApiKeySelfServiceUsage(key, "7d", d)).summary.requests);
  }
  assert.deepEqual(seen, [4, 9, 4, 9]);
  assert.equal(state.builds, 2);
});

test("a different range is a different entry", async () => {
  const { state, deps: d } = reuseDeps();
  const week = await getApiKeySelfServiceUsage(KEY, "7d", d);
  const month = await getApiKeySelfServiceUsage(KEY, "30d", d);
  assert.equal(state.builds, 2);
  assert.deepEqual([week.range, month.range], ["7d", "30d"]);
});

test("the scope check runs before the lookup: a cached series is never served without it", async () => {
  const { state, deps: d } = reuseDeps();
  await getApiKeySelfServiceUsage(KEY, "7d", d);
  await assert.rejects(
    getApiKeySelfServiceUsage({ id: KEY.id, scopes: [] }, "7d", d),
    /missing_self_usage_scope/
  );
  assert.equal(state.builds, 1);
});

test("the reuse is bounded: past its cap the oldest entry is dropped", async () => {
  const { state, deps: d } = reuseDeps({ maxEntries: 2 });
  for (const range of ["1d", "7d", "30d"] as const) await getApiKeySelfServiceUsage(KEY, range, d);
  assert.equal(state.builds, 3);
  await getApiKeySelfServiceUsage(KEY, "1d", d);
  assert.equal(state.builds, 4);
  await getApiKeySelfServiceUsage(KEY, "30d", d);
  assert.equal(state.builds, 4);
});

test("the default cap is 64 entries; past it the oldest is dropped", async () => {
  const { state, deps: d } = reuseDeps();
  const keyN = (n: number) => ({ id: `key-${n}`, scopes: ["self:usage"] });
  for (let n = 0; n < 64; n += 1) await getApiKeySelfServiceUsage(keyN(n), "7d", d);
  assert.equal(d.cache.size, 64);
  await getApiKeySelfServiceUsage(keyN(0), "7d", d);
  assert.equal(state.builds, 64, "64 entries fit");
  for (let n = 64; n < 70; n += 1) await getApiKeySelfServiceUsage(keyN(n), "7d", d);
  assert.equal(d.cache.size, 64);
  await getApiKeySelfServiceUsage(keyN(69), "7d", d);
  assert.equal(state.builds, 70);
  await getApiKeySelfServiceUsage(keyN(0), "7d", d);
  assert.equal(state.builds, 71, "the oldest entry was dropped");
});

test("storing a new entry drops an expired entry of another key", async () => {
  const { state, deps: d } = reuseDeps();
  await getApiKeySelfServiceUsage(KEY, "7d", d);
  state.t = NOW + 30_000;
  await getApiKeySelfServiceUsage(KEY_B, "30d", d);
  assert.equal(d.cache.size, 2);
  state.t = NOW + 60_001;
  await getApiKeySelfServiceUsage(KEY_B, "1d", d);
  // KEY's entry (written at NOW) has expired and is gone; KEY_B's 30d entry is still fresh.
  assert.equal(d.cache.size, 2);
  state.t = NOW + 90_001;
  await getApiKeySelfServiceUsage(KEY_B, "90d", d);
  assert.equal(d.cache.size, 2);
});
