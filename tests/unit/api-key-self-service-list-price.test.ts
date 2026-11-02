/**
 * GET /v1/me/status list-price fields: usage.cost / usage.daily / usage.weekly gain
 * `listPriceUsd` (list-price value of every request in the window, flat-rate providers
 * included) and `unpricedRequests` (requests that used tokens but have no known price).
 * The metered fields (usage.cost.usedUsd, usage.daily/weekly.costUsd) keep their meaning.
 *
 * The slice query and the end-to-end case run on a temp SQLite DB with every migration and
 * the real pricing table; the builder cases stub every source.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import DatabaseSync from "better-sqlite3";

const DATA_ROOT = process.env.DATA_DIR ?? path.resolve("_artifacts/self-service-list-price-tests");
fs.mkdirSync(DATA_ROOT, { recursive: true });
const TEST_DATA_DIR = fs.mkdtempSync(path.join(DATA_ROOT, "self-service-list-price-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { listApiKeyUsageSlices } = await import("../../src/lib/db/apiKeyUsageSlices.ts");
const { calculateCostDetailed, computeCostFromPricing } =
  await import("../../src/lib/usage/costCalculator.ts");
const { buildApiKeySelfServiceStatus } = await import("../../src/lib/usage/apiKeySelfService.ts");
const { collectLongContextCuts, createListPriceCache } =
  await import("../../src/lib/usage/apiKeySelfServiceListPrice.ts");
const { createQuotaRefreshTracker } =
  await import("../../src/lib/usage/apiKeySelfServiceAccounts.ts");
const { SELF_USAGE_SCOPE } = await import("../../src/shared/constants/selfServiceScopes.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// Wednesday 2026-05-27 15:30 UTC: day starts 05-27, ISO week 05-25 (Monday), month 05-01.
const NOW = Date.UTC(2026, 4, 27, 15, 30, 0);
const MONTH_START = "2026-05-01T00:00:00.000Z";
const DAY_START = "2026-05-27T00:00:00.000Z";
const WEEK_START = "2026-05-25T00:00:00.000Z";

type Tokens = {
  input: number;
  output: number;
  cacheRead: number;
  cacheCreation: number;
  reasoning: number;
};
type Slice = {
  windowIndex: number;
  provider: string | null;
  model: string | null;
  serviceTier: string;
  promptBand: number;
  storedCostUsd: number;
  priceableRequests: number;
  tokens: Tokens;
};
type PriceCall = {
  provider: string;
  model: string;
  tokens: Tokens;
  options: Record<string, unknown>;
};
type UsageRow = {
  apiKeyId: string;
  provider: string | null;
  model: string | null;
  timestamp: string;
  tokens?: Tokens;
  serviceTier?: string | null;
  success?: boolean;
};

function tokens(input: number, output = 0, extra: Partial<Tokens> = {}): Tokens {
  return { input, output, cacheRead: 0, cacheCreation: 0, reasoning: 0, ...extra };
}

function insertUsage(row: UsageRow) {
  const t = row.tokens ?? tokens(0);
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO usage_history (provider, model, api_key_id, tokens_input, tokens_output,
         tokens_cache_read, tokens_cache_creation, tokens_reasoning, service_tier, timestamp,
         success)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      row.provider,
      row.model,
      row.apiKeyId,
      t.input,
      t.output,
      t.cacheRead,
      t.cacheCreation,
      t.reasoning,
      row.serviceTier === undefined ? "standard" : row.serviceTier,
      row.timestamp,
      row.success === false ? 0 : 1
    );
}

function slice(windowIndex: number, model: string, extra: Partial<Slice> = {}): Slice {
  return {
    windowIndex,
    provider: "glm",
    model,
    serviceTier: "standard",
    promptBand: 0,
    storedCostUsd: 0,
    priceableRequests: 1,
    tokens: tokens(0),
    ...extra,
  };
}

function stubDeps(overrides: Record<string, unknown> = {}) {
  return {
    now: () => NOW,
    getCostSummary: () => ({
      budget: null,
      totalCostMonth: 4.5,
      totalCostPeriod: 0,
      activeLimitUsd: 0,
      resetInterval: null,
      budgetResetAt: null,
      periodStartAt: null,
      nextResetAt: null,
      warningThreshold: null,
    }),
    checkBudget: () => ({ allowed: true }),
    getDbInstance: () => ({ prepare: () => ({ get: () => ({ requests: 0 }), all: () => [] }) }),
    getProviderConnectionById: async () => null,
    getProviderConnections: async () => [],
    fetchAndPersistProviderLimits: async () => {
      throw new Error("unexpected quota fetch");
    },
    getProviderLimitsCache: () => null,
    quotaRefreshTracker: createQuotaRefreshTracker(),
    getBudgetWindowTotal: (_id: string, periodStartAt: number) =>
      periodStartAt === Date.parse(DAY_START) ? 0.25 : 1.75,
    getApiKeyUsageLimitStatus: async () => {
      throw new Error("unexpected usage limit read");
    },
    listTokenLimits: () => [],
    getWindowUsage: () => 0,
    resetWindowIfElapsed: () => ({ periodStartAt: 0, nextResetAt: 0 }),
    getKeyQuotaStatus: () => ({
      enabled: false,
      limits: { tpmLimit: null, rpmLimit: null, monthlyAmountUsd: null },
      counters: { tpmUsed: 0, rpmUsed: 0, monthlyAmountUsd: 0 },
      tpmExceeded: false,
      rpmExceeded: false,
      monthlyExceeded: false,
      windowResetAtIso: "2026-05-27T15:31:00.000Z",
    }),
    listApiKeyUsageSlices: () => [],
    calculateCostDetailed: async () => ({ costUsd: 0, priced: true }),
    getPricingTable: async () => ({}),
    listPriceCache: createListPriceCache(),
    ...overrides,
  };
}

const metadata = {
  id: "key-lp",
  name: "list price",
  scopes: [SELF_USAGE_SCOPE],
  allowedConnections: [] as string[],
};

// Per-million prices used by the stub pricer; "glm" is a flat-rate (coding plan) provider.
const PRICES: Record<string, Record<string, number>> = {
  "glm-5.3": { input: 1, output: 4 },
  "gpt-5.4": { input: 2, output: 8 },
};

function stubPricer(calls: PriceCall[]) {
  return async (
    provider: string,
    model: string,
    sliceTokens: Tokens,
    options: Record<string, unknown> = {}
  ) => {
    calls.push({ provider, model, tokens: sliceTokens, options });
    const pricing = PRICES[model];
    if (!pricing) return { costUsd: 0, priced: false };
    return { costUsd: computeCostFromPricing(pricing, sliceTokens, options), priced: true };
  };
}

// ──────────────── Slice query ────────────────

test("listApiKeyUsageSlices sums one key's requests per window, provider, model and tier", () => {
  const keyId = "key-slices";
  const glm = { apiKeyId: keyId, provider: "glm", model: "glm-5.3" };
  insertUsage({ ...glm, timestamp: "2026-05-27T10:00:00.000Z", tokens: tokens(100, 10) });
  insertUsage({
    ...glm,
    provider: "GLM",
    model: "GLM-5.3",
    timestamp: "2026-05-26T10:00:00.000Z",
    tokens: tokens(200, 20, { cacheRead: 50, reasoning: 5 }),
    serviceTier: "",
  });
  insertUsage({
    ...glm,
    timestamp: "2026-05-10T10:00:00.000Z",
    tokens: tokens(400),
    serviceTier: null,
  });
  // A request with no tokens, or a failed request, is never priceable.
  insertUsage({ ...glm, timestamp: "2026-05-27T11:00:00.000Z" });
  insertUsage({
    ...glm,
    timestamp: "2026-05-27T11:30:00.000Z",
    tokens: tokens(7777, 77),
    success: false,
  });
  insertUsage({
    apiKeyId: keyId,
    provider: "codex",
    model: "gpt-5.4",
    timestamp: "2026-05-27T12:00:00.000Z",
    tokens: tokens(10, 1),
    serviceTier: "priority",
  });
  // Excluded: another key, and a request before the earliest window.
  insertUsage({
    ...glm,
    apiKeyId: "other-key",
    timestamp: "2026-05-27T10:00:00.000Z",
    tokens: tokens(9999),
  });
  insertUsage({ ...glm, timestamp: "2026-04-30T23:59:59.000Z", tokens: tokens(8888) });

  const slices = listApiKeyUsageSlices(core.getDbInstance(), keyId, [
    MONTH_START,
    DAY_START,
    WEEK_START,
  ]) as Slice[];
  const byWindow = (index: number) =>
    slices
      .filter((entry) => entry.windowIndex === index)
      .sort((a, b) => String(a.provider).localeCompare(String(b.provider)));

  assert.deepEqual(byWindow(0), [
    {
      windowIndex: 0,
      provider: "codex",
      model: "gpt-5.4",
      serviceTier: "priority",
      promptBand: 0,
      storedCostUsd: 0,
      priceableRequests: 1,
      tokens: tokens(10, 1),
    },
    {
      windowIndex: 0,
      provider: "glm",
      model: "glm-5.3",
      serviceTier: "standard",
      promptBand: 0,
      storedCostUsd: 0,
      priceableRequests: 3,
      tokens: tokens(700, 30, { cacheRead: 50, reasoning: 5 }),
    },
  ]);
  assert.deepEqual(
    byWindow(1).map((entry) => [entry.provider, entry.priceableRequests, entry.tokens.input]),
    [
      ["codex", 1, 10],
      ["glm", 1, 100],
    ],
    "the day window holds only today's requests"
  );
  assert.deepEqual(
    byWindow(2).map((entry) => [entry.provider, entry.priceableRequests, entry.tokens.input]),
    [
      ["codex", 1, 10],
      ["glm", 2, 300],
    ],
    "the ISO week window starts on Monday"
  );
  assert.deepEqual(listApiKeyUsageSlices(core.getDbInstance(), keyId, []), []);
  // Two windows may share a start (e.g. a weekly budget that resets on Monday).
  const sameStart = listApiKeyUsageSlices(core.getDbInstance(), keyId, [
    WEEK_START,
    WEEK_START,
  ]) as Slice[];
  const strip = (index: number) =>
    sameStart
      .filter((entry) => entry.windowIndex === index)
      .map(({ windowIndex: _windowIndex, ...rest }) => rest)
      .sort((a, b) => String(a.provider).localeCompare(String(b.provider)));
  assert.deepEqual(strip(1), strip(0));
  assert.deepEqual(
    strip(0).map((entry) => entry.tokens.input),
    [10, 300]
  );
});

test("a provider-reported cost is summed as is and its tokens are not priced again", () => {
  const db = new DatabaseSync(":memory:");
  db.exec(`CREATE TABLE usage_history (
    provider TEXT, model TEXT, api_key_id TEXT, tokens_input INTEGER DEFAULT 0,
    tokens_output INTEGER DEFAULT 0, tokens_cache_read INTEGER DEFAULT 0,
    tokens_cache_creation INTEGER DEFAULT 0, tokens_reasoning INTEGER DEFAULT 0,
    service_tier TEXT DEFAULT 'standard', timestamp TEXT NOT NULL, success INTEGER DEFAULT 1,
    provider_cost_usd REAL)`);
  const insert = db.prepare(
    `INSERT INTO usage_history (provider, model, api_key_id, tokens_input, tokens_output,
       timestamp, success, provider_cost_usd) VALUES ('xai', 'grok-4.6', 'key-x', ?, ?, ?, ?, ?)`
  );
  insert.run(1000, 100, "2026-05-27T10:00:00.000Z", 1, 0.0125);
  // A stored cost counts even when the request failed, like the per-key usage-limit spend.
  insert.run(2000, 200, "2026-05-27T11:00:00.000Z", 0, 0.025);
  insert.run(300, 30, "2026-05-27T12:00:00.000Z", 1, null);
  insert.run(5000, 50, "2026-05-27T13:00:00.000Z", 0, null);

  const [today] = listApiKeyUsageSlices(db, "key-x", [DAY_START]) as Slice[];

  assert.equal(Number(today.storedCostUsd.toFixed(9)), 0.0375);
  assert.equal(today.priceableRequests, 1);
  assert.deepEqual(today.tokens, tokens(300, 30));
  db.close();
});

test("long-context cuts are the first prompt size each tier applies to", () => {
  const table = {
    openai: {
      "gpt-6-sol": { input: 5, long_context: { threshold: 272_000, input: 10 } },
      "gpt-6-luna": { input: 1, long_context: { threshold: 272_000, input: 2 } },
    },
    xai: { "grok-4.6": { input: 2, long_context: { threshold: 200_000, inclusive: true } } },
    broken: {
      zero: { long_context: { threshold: 0 } },
      text: { long_context: { threshold: "soon" } },
      list: { long_context: [] },
      empty: null,
    },
    none: null,
  };

  // Above 272K (exclusive) starts at 272,001; at or above 200K (inclusive) at 200,000.
  assert.deepEqual(collectLongContextCuts(table), [200_000, 272_001]);
  assert.deepEqual(collectLongContextCuts(null), []);
});

test("listApiKeyUsageSlices keeps requests on each side of a prompt-size cut apart", () => {
  const keyId = "key-bands";
  const row = {
    apiKeyId: keyId,
    provider: "openai",
    model: "gpt-6-sol",
    timestamp: "2026-05-27T09:00:00.000Z",
  };
  for (const input of [100_000, 100_000, 199_999, 200_000, 272_000, 272_001]) {
    insertUsage({ ...row, tokens: tokens(input) });
  }

  const slices = listApiKeyUsageSlices(
    core.getDbInstance(),
    keyId,
    [DAY_START],
    [272_001, 200_000, 200_000]
  ) as Slice[];

  assert.deepEqual(
    slices
      .sort((a, b) => a.promptBand - b.promptBand)
      .map((entry) => [entry.promptBand, entry.priceableRequests, entry.tokens.input]),
    [
      [0, 3, 399_999],
      [1, 2, 472_000],
      [2, 1, 272_001],
    ]
  );
});

// ──────────────── Builder (stubbed sources) ────────────────

test("listPriceUsd and unpricedRequests are added per window; metered fields are unchanged", async () => {
  const sliceCalls: unknown[][] = [];
  const priceCalls: PriceCall[] = [];
  const glmToday = tokens(1000, 250);
  const slices: Slice[] = [
    // usage.cost window: a flat-rate provider is priced at list price.
    slice(0, "glm-5.3", { priceableRequests: 5, tokens: tokens(4000, 1000) }),
    slice(0, "unknown-model", { priceableRequests: 2, tokens: tokens(20, 10) }),
    // usage.daily
    slice(1, "glm-5.3", { tokens: glmToday }),
    slice(1, "unknown-model", { tokens: tokens(10, 5) }),
    // A slice without priceable tokens is never priced and never unpriced.
    slice(1, "other-unknown", { priceableRequests: 0, storedCostUsd: 0.5 }),
    // usage.weekly: same glm tokens as the day, so they are priced once.
    slice(2, "glm-5.3", { tokens: glmToday }),
    slice(2, "gpt-5.4", {
      provider: "codex",
      serviceTier: "priority",
      priceableRequests: 3,
      tokens: tokens(1_000_000),
    }),
  ];

  const status = await buildApiKeySelfServiceStatus(
    metadata,
    stubDeps({
      listApiKeyUsageSlices: (...args: unknown[]) => {
        sliceCalls.push(args);
        return slices;
      },
      calculateCostDetailed: stubPricer(priceCalls),
    })
  );

  assert.deepEqual(
    sliceCalls.map((args) => args.slice(1)),
    [["key-lp", [MONTH_START, DAY_START, WEEK_START], []]],
    "one query covers the cost, day and week windows (no long-context tiers in this table)"
  );

  // Metered spend keeps its meaning and value.
  assert.equal(status.usage.cost.usedUsd, 4.5);
  assert.equal(status.usage.daily.costUsd, 0.25);
  assert.equal(status.usage.weekly.costUsd, 1.75);

  // glm-5.3 at $1/$4 per million: month 4000 in + 1000 out, today 1000 in + 250 out.
  assert.equal(status.usage.cost.listPriceUsd, 0.008);
  assert.equal(status.usage.cost.unpricedRequests, 2);
  // Today: glm $0.002 plus a $0.5 provider-reported cost.
  assert.equal(status.usage.daily.listPriceUsd, 0.502);
  assert.equal(status.usage.daily.unpricedRequests, 1);
  // gpt-5.4 priority on codex is billed 2x: 1M input at $2 -> $4, plus glm today.
  assert.equal(status.usage.weekly.listPriceUsd, 4.002);
  assert.equal(status.usage.weekly.unpricedRequests, 0);

  for (const call of priceCalls) {
    assert.equal("flatRateAsZero" in call.options, false, "list price never zeroes flat-rate");
  }
  assert.deepEqual(priceCalls.find((call) => call.model === "gpt-5.4")?.options, {
    provider: "codex",
    model: "gpt-5.4",
    serviceTier: "priority",
  });
  assert.equal(
    priceCalls.filter((call) => call.model === "glm-5.3").length,
    2,
    "identical glm slices in the day and week windows are priced once"
  );
  assert.equal(
    priceCalls.filter((call) => call.model === "unknown-model").length,
    1,
    "a model with no price is looked up once"
  );
  assert.equal(
    priceCalls.some((call) => call.model === "other-unknown"),
    false
  );
});

test("the usage.cost list price follows the budget period used by usage.cost", async () => {
  const sliceCalls: unknown[][] = [];
  const periodStart = Date.UTC(2026, 4, 24, 0, 0, 0);
  const status = await buildApiKeySelfServiceStatus(
    metadata,
    stubDeps({
      getCostSummary: () => ({
        budget: { resetInterval: "weekly" },
        totalCostMonth: 9,
        totalCostPeriod: 3,
        activeLimitUsd: 10,
        resetInterval: "weekly",
        budgetResetAt: Date.UTC(2026, 4, 31, 0, 0, 0),
        periodStartAt: periodStart,
        nextResetAt: Date.UTC(2026, 4, 31, 0, 0, 0),
        warningThreshold: null,
      }),
      listApiKeyUsageSlices: (...args: unknown[]) => {
        sliceCalls.push(args);
        return [];
      },
    })
  );

  assert.equal(status.usage.cost.periodStartAt, "2026-05-24T00:00:00.000Z");
  assert.deepEqual(sliceCalls[0][2], ["2026-05-24T00:00:00.000Z", DAY_START, WEEK_START]);
  assert.equal(status.usage.cost.usedUsd, 3);
  assert.equal(status.usage.cost.listPriceUsd, 0);
  assert.equal(status.usage.cost.unpricedRequests, 0);
});

test("a long-context tier prices only the requests whose own prompt crosses it", async () => {
  const keyId = "key-long-context";
  const row = {
    apiKeyId: keyId,
    provider: "lcp",
    model: "lc-model",
    timestamp: "2026-05-27T09:00:00.000Z",
  };
  // Eleven requests below the threshold (1.27M prompt tokens together) and one above it.
  for (let i = 0; i < 10; i += 1) insertUsage({ ...row, tokens: tokens(100_000, 1_000) });
  insertUsage({ ...row, tokens: tokens(272_000) });
  insertUsage({ ...row, tokens: tokens(300_000, 2_000) });
  const flat = { input: 1, output: 4 };
  const longContext = { threshold: 272_000, input: 2, output: 6 };
  const pricedPrompts: number[] = [];

  const status = await buildApiKeySelfServiceStatus(
    { ...metadata, id: keyId },
    stubDeps({
      getDbInstance: () => core.getDbInstance(),
      listApiKeyUsageSlices,
      getPricingTable: async () => ({
        lcp: { "lc-model": { ...flat, long_context: longContext } },
      }),
      // Same tier rule as a pricing row's long_context: the whole request switches rates.
      calculateCostDetailed: async (_provider: string, _model: string, t: Tokens) => {
        pricedPrompts.push(t.input);
        const rates = t.input > longContext.threshold ? longContext : flat;
        return { costUsd: (t.input * rates.input + t.output * rates.output) / 1e6, priced: true };
      },
    })
  );

  // Flat: 10 x ($0.10 + $0.004) + $0.272 = $1.312. Tier: 300K x $2 + 2K x $6 = $0.612.
  // Pricing the summed tokens would put all of them on the tier: $3.216.
  assert.equal(status.usage.daily.listPriceUsd, 1.924);
  assert.equal(status.usage.weekly.listPriceUsd, 1.924);
  assert.equal(status.usage.cost.listPriceUsd, 1.924);
  assert.ok(
    pricedPrompts.every((prompt) => prompt <= 300_000),
    "the pricer only sees per-request prompt sizes"
  );
});

// ──────────────── 60 s list-price cache ────────────────

const summaryOf = (listPriceUsd: number) => [{ listPriceUsd, unpricedRequests: 0 }];

test("the list-price cache reuses an entry for 60 s and drops the least recently used", async () => {
  const cache = createListPriceCache({ maxEntries: 2 });
  let computed = 0;
  const compute = (value: number) => async () => {
    computed += 1;
    return summaryOf(value);
  };
  const t0 = 1_000_000;

  assert.deepEqual(await cache.memoize("a", t0, compute(1)), summaryOf(1));
  assert.deepEqual(await cache.memoize("a", t0 + 59_999, compute(2)), summaryOf(1), "hit");
  assert.deepEqual(await cache.memoize("a", t0 + 60_000, compute(3)), summaryOf(3), "expired");
  assert.equal(computed, 2);

  // Room for two: reading "a" makes "b" the least recently used, so "c" evicts "b".
  await cache.memoize("b", t0 + 60_000, compute(4));
  await cache.memoize("a", t0 + 60_001, compute(5));
  await cache.memoize("c", t0 + 60_002, compute(6));
  computed = 0;
  assert.deepEqual(await cache.memoize("a", t0 + 60_003, compute(7)), summaryOf(3));
  assert.deepEqual(await cache.memoize("c", t0 + 60_003, compute(8)), summaryOf(6));
  assert.deepEqual(await cache.memoize("b", t0 + 60_003, compute(9)), summaryOf(9));
  assert.equal(computed, 1, "only the evicted entry is computed again");
});

test("concurrent reads share one list-price computation and a failed one is not kept", async () => {
  const cache = createListPriceCache();
  let calls = 0;
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const slow = async () => {
    calls += 1;
    await gate;
    return summaryOf(1);
  };
  const first = cache.memoize("k", 0, slow);
  const second = cache.memoize("k", 10, slow);
  release();
  assert.deepEqual(await Promise.all([first, second]), [summaryOf(1), summaryOf(1)]);
  assert.equal(calls, 1);

  await assert.rejects(
    cache.memoize("x", 0, async () => {
      throw new Error("database is locked");
    })
  );
  assert.deepEqual(await cache.memoize("x", 1, async () => summaryOf(2)), summaryOf(2));
});

test("the status reuses a key's list price for 60 s, per key and per window start", async () => {
  let clock = NOW;
  let queries = 0;
  const deps = stubDeps({
    now: () => clock,
    listPriceCache: createListPriceCache(),
    listApiKeyUsageSlices: () => {
      queries += 1;
      return [slice(0, "glm-5.3", { tokens: tokens(1_000_000) })];
    },
    calculateCostDetailed: stubPricer([]),
  });

  const first = await buildApiKeySelfServiceStatus(metadata, deps);
  clock = NOW + 59_000;
  const cached = await buildApiKeySelfServiceStatus(metadata, deps);
  assert.equal(queries, 1, "served from the cache within 60 s");
  assert.equal(first.usage.cost.listPriceUsd, 1);
  assert.equal(cached.usage.cost.listPriceUsd, 1);

  clock = NOW + 60_000;
  await buildApiKeySelfServiceStatus(metadata, deps);
  assert.equal(queries, 2, "recomputed once 60 s have passed");

  await buildApiKeySelfServiceStatus({ ...metadata, id: "key-other" }, deps);
  assert.equal(queries, 3, "each key has its own entry");

  clock = Date.UTC(2026, 4, 27, 23, 59, 50);
  await buildApiKeySelfServiceStatus(metadata, deps);
  clock = Date.UTC(2026, 4, 28, 0, 0, 10);
  await buildApiKeySelfServiceStatus(metadata, deps);
  assert.equal(queries, 5, "a new day window is never served the previous day's figures");
});

// ──────────────── End to end (temp DB, real pricing) ────────────────

test("end to end: a flat-rate provider has metered $0 but a list price; unknown models are counted", async () => {
  const keyId = "key-e2e";
  const glm = { apiKeyId: keyId, provider: "glm", model: "glm-5.3" };
  insertUsage({ ...glm, timestamp: "2026-05-27T09:00:00.000Z", tokens: tokens(1000, 500) });
  insertUsage({ ...glm, timestamp: "2026-05-26T09:00:00.000Z", tokens: tokens(2000) });
  insertUsage({ ...glm, timestamp: "2026-05-10T09:00:00.000Z", tokens: tokens(4000) });
  insertUsage({
    ...glm,
    model: "no-such-model-for-list-price",
    timestamp: "2026-05-27T10:00:00.000Z",
    tokens: tokens(10, 5),
  });
  // A failed request counts as a request but has no list price.
  insertUsage({
    ...glm,
    timestamp: "2026-05-27T11:00:00.000Z",
    tokens: tokens(9000),
    success: false,
  });

  const listPrice = async (input: number, output: number) => {
    const options = { provider: "glm", model: "glm-5.3", serviceTier: "standard" };
    const { costUsd } = await calculateCostDetailed(
      "glm",
      "glm-5.3",
      tokens(input, output),
      options
    );
    return Number(costUsd.toFixed(6));
  };
  const metered = await calculateCostDetailed("glm", "glm-5.3", tokens(1000, 500), {
    provider: "glm",
    flatRateAsZero: true,
  });
  assert.equal(metered.costUsd, 0, "glm is a flat-rate provider: metered displays show $0");
  assert.ok((await listPrice(1000, 500)) > 0, "glm-5.3 has a list price in the default table");

  const status = await buildApiKeySelfServiceStatus(
    { id: keyId, name: "e2e", scopes: [SELF_USAGE_SCOPE], allowedConnections: [] },
    { now: () => NOW }
  );

  assert.equal(status.usage.cost.usedUsd, 0, "nothing was metered for this key");
  assert.equal(status.usage.daily.costUsd, 0);
  assert.equal(status.usage.cost.listPriceUsd, await listPrice(7000, 500));
  assert.equal(status.usage.weekly.listPriceUsd, await listPrice(3000, 500));
  assert.equal(status.usage.daily.listPriceUsd, await listPrice(1000, 500));
  assert.equal(status.usage.cost.unpricedRequests, 1);
  assert.equal(status.usage.weekly.unpricedRequests, 1);
  assert.equal(status.usage.daily.unpricedRequests, 1);
  assert.equal(status.usage.daily.requests, 3);
  assert.equal(status.usage.weekly.requests, 4);
});

test("end to end: the list price equals pricing each request on its own", async () => {
  const keyId = "key-e2e-long-context";
  // gpt-6-sol carries a long-context tier (above 272K prompt tokens) where the pricing table
  // has one; the three small requests sum above it, the last one crosses it alone.
  const requests = [
    tokens(100_000, 2_000),
    tokens(100_000, 2_000),
    tokens(100_000, 2_000),
    tokens(300_000, 2_000),
  ];
  for (const requestTokens of requests) {
    insertUsage({
      apiKeyId: keyId,
      provider: "openai",
      model: "gpt-6-sol",
      timestamp: "2026-05-27T09:00:00.000Z",
      tokens: requestTokens,
    });
  }
  const options = { provider: "openai", model: "gpt-6-sol", serviceTier: "standard" };
  let perRequest = 0;
  for (const requestTokens of requests) {
    perRequest += (await calculateCostDetailed("openai", "gpt-6-sol", requestTokens, options))
      .costUsd;
  }

  const status = await buildApiKeySelfServiceStatus(
    { id: keyId, name: "e2e", scopes: [SELF_USAGE_SCOPE], allowedConnections: [] },
    { now: () => NOW }
  );

  assert.ok(perRequest > 0, "gpt-6-sol has a list price in the default table");
  assert.equal(status.usage.daily.listPriceUsd, Number(perRequest.toFixed(6)));
  assert.equal(status.usage.daily.unpricedRequests, 0);
});
