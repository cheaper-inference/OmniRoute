import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  catalogFingerprint,
  validateCatalogEvidence,
} from "../../scripts/check/freeCatalogEvidence.mjs";

import { FREE_CATALOG_CURATED_AT } from "@omniroute/open-sse/config/freeModelCatalog.data.ts";
import { FREE_TIER_BUDGETS } from "@omniroute/open-sse/config/freeTierCatalog.ts";
import {
  FREE_MODEL_BUDGETS,
  FREE_QUOTA_UNIT,
  FREE_TIER_BOOSTS,
  RETIRED_FREE_ROWS,
  grantsFreeAccess,
  resolveFreeQuotaUnit,
  computePublicFreeHeadline,
  computeRowSumMirror,
  freeTypesInBucket,
  isCountingGated,
  isSocialGated,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import {
  computeFreeCatalogCounts,
  resolveFreeAccessType,
} from "@omniroute/open-sse/config/freeModelCatalog.counts.ts";
import { FREE_TIER_PROVIDER_SET } from "@omniroute/open-sse/config/freeTierProviders.ts";
import { isCatalogFreeModel } from "@/shared/utils/freeModels.ts";
import { membershipFromProviderConstants } from "./_helpers/providerAccessMembership.ts";
import { PROVIDER_EXPECTATIONS } from "./free-provider-coverage.expectations.ts";

/**
 * Pinned at the November 2026 re-audit. A later catalog PR that moves these numbers updates them
 * in the same PR and shows the arithmetic in its body.
 *
 * Sources were reopened on 2026-11-23; each block of `open-sse/config/freeModelCatalog.data.ts`
 * carries the URL and the quoted line in its `// evidence:` comment.
 */
const rows = (provider: string) => FREE_MODEL_BUDGETS.filter((m) => m.provider === provider);
const live = (provider: string) => rows(provider).filter((m) => m.freeType !== "discontinued");
const retired = (provider: string) => rows(provider).filter((m) => m.freeType === "discontinued");
const ids = (list: Array<{ modelId: string }>) => list.map((m) => m.modelId).sort();

function assertRetired(provider: string, modelIds?: string[]) {
  const list = modelIds
    ? rows(provider).filter((m) => modelIds.includes(m.modelId))
    : rows(provider);
  assert.ok(list.length > 0, `${provider} keeps its retired rows for at least one release`);
  if (modelIds) assert.deepEqual(ids(list), [...modelIds].sort(), `${provider} retired ids`);
  for (const m of list) {
    assert.equal(m.freeType, "discontinued", `${provider}/${m.modelId}`);
    assert.equal(m.monthlyTokens, 0, `${provider}/${m.modelId}`);
    assert.equal(m.creditTokens, 0, `${provider}/${m.modelId}`);
  }
}

function assertLive(
  provider: string,
  modelIds: string[],
  expected: { monthlyTokens: number; poolKey: string | null; freeType?: string }
) {
  assert.deepEqual(ids(live(provider)), [...modelIds].sort(), `${provider} live ids`);
  for (const m of live(provider)) {
    assert.equal(m.monthlyTokens, expected.monthlyTokens, `${provider}/${m.modelId}`);
    assert.equal(m.poolKey, expected.poolKey, `${provider}/${m.modelId}`);
    if (expected.freeType) assert.equal(m.freeType, expected.freeType, `${provider}/${m.modelId}`);
  }
}

// --- Ended offers -------------------------------------------------------------------------

test("mistral: the free mode has no API access; the 5-row pool is retired", () => {
  assertRetired("mistral");
  assert.equal(rows("mistral").length, 5);
  assert.ok(rows("mistral").every((m) => m.poolKey === "mistral"));
});

test("nara: the free plan lists no models; the 8-row pool is retired", () => {
  assertRetired("nara");
  assert.equal(rows("nara").length, 8);
  assert.ok(rows("nara").every((m) => m.poolKey === "nara-free"));
});

test("navy: no published quota after three methods; the pool is retired as unverifiable", () => {
  assertRetired("navy", ["shared-pool"]);
  assert.equal(rows("navy")[0].poolKey, "navy-free");
});

test("llm7: the limits page is gone and every listed model is paid; the pool is retired", () => {
  assertRetired("llm7");
  assert.equal(rows("llm7").length, 4);
  assert.equal(live("llm7").length, 0);
  assert.ok(rows("llm7").every((m) => m.poolKey === "llm7-free"));
});

test("bluesminds, arcee-ai, huggingface and huggingchat offer no free quota any more", () => {
  assertRetired("bluesminds");
  assert.equal(rows("bluesminds").length, 22);
  assertRetired("arcee-ai", ["arcee-ai/trinity-large-preview:free"]);
  assertRetired("huggingface");
  assert.equal(rows("huggingface").length, 6);
  assertRetired("huggingchat");
  assert.equal(rows("huggingchat").length, 24);
});

test("ainative, StepFun and Predibase ended their offers, and Routeway retired eight ids", () => {
  assertRetired("ainative");
  assert.equal(rows("ainative").length, 7);
  // https://api.routeway.ai/v1/models (2026-11-27): eight old ids retired, seven live replacements.
  assertRetired("routeway", PROVIDER_EXPECTATIONS.routeway.discontinued);
  assert.equal(rows("routeway").length, 15);
  assertRetired("stepfun", ["step-1v"]);
  assertRetired("predibase", ["llama-3.3-70b"]);
});

// --- Corrected quotas and dead ids ----------------------------------------------------------

test("xkiro: 500K tokens a day across 9 live free ids; the other 30 ids are gone", () => {
  assertLive(
    "xkiro",
    [
      "sensenova/sensenova-6.8-flash-lite",
      "mistralai/mistral-large-2512",
      "mistralai/mistral-medium-3.5",
      "mistralai/mistral-small-2603",
      "mistralai/codestral-2508",
      "mistralai/devstral-medium",
      "mistralai/ministral-8b",
      "mistralai/ministral-3b",
      "mistralai/ministral-14b",
    ],
    { monthlyTokens: 15_000_000, poolKey: "xkiro-free", freeType: "recurring-daily" }
  );
  assertRetired("xkiro", ids(retired("xkiro")));
  assert.equal(retired("xkiro").length, 30);
});

test("groq: four models at 200K TPD; qwen/qwen3.6-27b was deprecated", () => {
  assertLive(
    "groq",
    [
      "openai/gpt-oss-120b",
      "openai/gpt-oss-20b",
      "openai/gpt-oss-safeguard-20b",
      "qwen/qwen3.8-27b",
    ],
    { monthlyTokens: 6_000_000, poolKey: null, freeType: "recurring-daily" }
  );
  assertRetired("groq", ["qwen/qwen3.6-27b"]);
});

test("cloudflare-ai: 10,000 neurons/day priced on glm-4.7-flash; kimi-k2.6 needs billing", () => {
  const byId = new Map(rows("cloudflare-ai").map((m) => [m.modelId, m]));
  assert.equal(byId.get("@cf/zai-org/glm-4.7-flash")?.monthlyTokens, 22_700_000);
  assert.equal(byId.get("@cf/meta/llama-3.3-70b-instruct-fp8-fast")?.monthlyTokens, 0);
  assertRetired("cloudflare-ai", ["@cf/moonshotai/kimi-k2.6"]);
  assert.ok(live("cloudflare-ai").every((m) => m.poolKey === "cloudflare-ai"));
  assert.equal(FREE_QUOTA_UNIT["cloudflare-ai"], "neurons");
});

test("sambanova: 20 requests a day on the two models left in the free table", () => {
  assertLive("sambanova", ["gpt-oss-120b", "gemma-4-31B-it"], {
    monthlyTokens: 480_000,
    poolKey: "sambanova",
    freeType: "recurring-daily",
  });
  assertRetired("sambanova", ["DeepSeek-V3.1", "DeepSeek-V3.2", "Meta-Llama-3.3-70B-Instruct"]);
  assert.equal(FREE_QUOTA_UNIT.sambanova, "requests");
});

test("bazaarlink: 60 weighted units a day through auto:free; the named ids are not free", () => {
  assertLive("bazaarlink", ["auto:free"], {
    monthlyTokens: 1_440_000,
    poolKey: "bazaarlink",
    freeType: "recurring-daily",
  });
  assert.equal(retired("bazaarlink").length, 31);
  assertRetired("bazaarlink", ids(retired("bazaarlink")));
});

test("morph: 200 free requests a month", () => {
  assertLive("morph", ["morph-v3-fast", "morph-v3-large"], {
    monthlyTokens: 160_000,
    poolKey: "morph",
  });
});

test("openrouter: one live :free id from today's model list keeps the 50 RPD pool", () => {
  assertLive("openrouter", ["google/gemma-4-31b-it:free"], {
    monthlyTokens: 1_200_000,
    poolKey: "openrouter-free",
    freeType: "recurring-daily",
  });
  assertRetired("openrouter", ["auto", "liquid/lfm-2.5-2.6b:free", "stealth/ox-alpha"]);
});

test("api-airforce: 1,000 requests a day on 5 live ids, kept with a caution verdict", () => {
  assertLive(
    "api-airforce",
    [
      "x-ai/grok-3",
      "qwen/qwen3-32b",
      "moonshot/kimi-k2.6",
      "google/gemini-2.5-flash",
      "deepseek/deepseek-v3",
    ],
    { monthlyTokens: 24_000_000, poolKey: "api-airforce", freeType: "recurring-daily" }
  );
  assert.ok(live("api-airforce").every((m) => m.tos === "caution"));
  assertRetired("api-airforce", ["x-ai/grok-2-1212", "anthropic/claude-3.7-sonnet"]);
});

test("cohere, kiro and modelscope keep their quotas", () => {
  assertLive("cohere", ids(rows("cohere")), { monthlyTokens: 800_000, poolKey: "cohere" });
  assert.equal(rows("cohere").length, 6);
  assertLive("kiro", ids(rows("kiro")), { monthlyTokens: 25_000, poolKey: "kiro" });
  assert.ok(rows("kiro").every((m) => m.tos === "avoid"));
  assertLive("modelscope", ids(rows("modelscope")), {
    monthlyTokens: 6_000_000,
    poolKey: "modelscope-free",
  });
  assert.ok(rows("modelscope").every((m) => m.eligibilityGate === "regional-identity"));
});

test("onomeo: only the ids in today's freeModels stay live", () => {
  // https://onomeo.com/api/info and https://onomeo.com/models (2026-11-27), owner answer to Q22.
  assertLive(
    "onomeo",
    ["auto", "gemma-4-31b", "llama-4-scout", "mistral-small-3.1", "glm-4.7-flash", "glm-5.3"],
    {
      monthlyTokens: 3_456_000,
      poolKey: "onomeo",
      freeType: "recurring-daily",
    }
  );
  assert.equal(retired("onomeo").length, 11);
  assertRetired("onomeo", ids(retired("onomeo")));
});

test("requesty and aion: the ids that left the free list are retired", () => {
  // https://router.requesty.ai/v1/models (2026-11-27): five offered ids and two more retirements.
  assertRetired("requesty", [
    "openai/gpt-oss-120b",
    "mistral/leanstral-1-5",
    "nvidia/nemotron-3-nano-30b-a3b",
  ]);
  assert.deepEqual(ids(live("requesty")), [
    "google/gemma-4-31b-it",
    "nvidia/muse-glimmer-30b",
    "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
    "nvidia/nemotron-3-ultra-550b-a55b",
    "nvidia/nemotron-3.5-lightning-30b-a3b",
  ]);
  // https://api.aionlabs.ai/v1/models (2026-11-27): 3.5 and 3.5 Mini are live.
  assertRetired("aion", ["aion-labs/aion-2.5"]);
  assert.equal(live("aion").length, 6);
});

test("agentrouter stays free on the id listed today, with no token credit", () => {
  assert.deepEqual(ids(live("agentrouter")), ["gpt-5.6-sol"]);
  const [m] = live("agentrouter");
  assert.equal(m.freeType, "one-time-initial");
  assert.equal(m.creditTokens, 0, "a dollar credit never becomes tokens");
  assert.equal(m.monthlyTokens, 0);
  assert.equal(m.tos, "caution");
  assertRetired("agentrouter", ["claude-opus-4-8", "claude-opus-5"]);
  assert.ok(!RETIRED_FREE_ROWS.some((r) => r.provider === "agentrouter"));
});

// --- Rules and aggregate pins --------------------------------------------------------------

test("only official API rows feed the real figure", () => {
  const S = freeTypesInBucket("steady-monthly");
  for (const m of FREE_MODEL_BUDGETS.filter(
    (r) =>
      S.has(r.freeType) &&
      r.monthlyTokens > 0 &&
      r.tos !== "avoid" &&
      !isCountingGated(r) &&
      !isSocialGated(r)
  ))
    assert.ok(
      ["api-key", "keyless"].includes(
        resolveFreeAccessType(m, membershipFromProviderConstants(m.provider))
      ),
      `${m.provider}/${m.modelId}`
    );
});

test("public free-token figures after the re-audit", () => {
  const pub = computePublicFreeHeadline();
  // E1a adds 6M + 4.8M + 4.8M + 3.6M + 3.456M + 2.4M + 2.4M to both headlines.
  // E1b adds MegaNova (1.2M), Free.ai (0.8M), and Kenari (1.2M) to both headlines.
  // Aion's 0.6M is card-gated (https://www.aionlabs.ai/docs/rate-limits/, 2026-11-27).
  assert.equal(pub.steadyRecurringTokens, 120_436_000);
  // E2 removes 63.5M from first-month signup pools; Scaleway moves behind a payment method.
  assert.equal(pub.firstMonthRealisticTokens, 120_436_000);
  assert.equal(pub.gatedRecurringTokens, 6_600_000);
  assert.equal(pub.socialGatedRecurringTokens, 15_000_000);
  // E1a adds the 24M DGrid deposit allowance to the previous 24M.
  assert.equal(pub.boostMonthlyTokens, 48_000_000);
});

test("row-sum reading and retired ledger after the re-audit", () => {
  const m = computeRowSumMirror();
  // E1a adds 10 Zylo token rows × 6M; the other six providers are metered by requests.
  // E1b adds six Aion token rows × 0.6M (https://www.aionlabs.ai/docs/rate-limits/, 2026-11-27).
  assert.equal(m.liveTokens, 222_600_000);
  assert.equal(m.retiredTokens, 11_190_500_000);
  assert.equal(m.totalTokens, 11_413_100_000);
  assert.equal(Math.round(m.retiredShare * 1000) / 10, 98);
  assert.equal(RETIRED_FREE_ROWS.length, 135);
});

test("catalog counts after the re-audit", () => {
  const c = computeFreeCatalogCounts({ membershipOf: membershipFromProviderConstants });
  // #19385 ends one keyless offer covering one model with no published quota.
  // E1a adds seven quota pools and five API-key offers; Requesty and Onomeo already counted.
  // E1b adds three ungated quota pools and API-key offers. Aion's offer already counted.
  assert.equal(c.publishedQuotaPools, 22);
  // E2 removes eight API-key offers after rechecking their routes or eligibility.
  assert.equal(c.providersWithFreeOffer.total, 49);
  assert.deepEqual(c.providersWithFreeOffer.byAccess, {
    "api-key": 43,
    keyless: 5,
    "tool-account": 1,
    "web-chat": 0,
  });
  // E1b added 35 access rows. E2 removes 65 on net, representing 48 unique model IDs.
  assert.equal(c.accessRows, 222);
  assert.equal(c.freeModels, 204);
});

// --- Retired pools and their ledger --------------------------------------------------------

const RETIRED_POOLS = [
  "mistral",
  "nara",
  "navy",
  "llm7",
  "huggingface",
  "bluesminds",
  "arcee-ai",
  "huggingchat",
  "ainative",
  "stepfun",
  "predibase",
];

test("retired pools grant no free access anywhere", () => {
  for (const p of RETIRED_POOLS) {
    assertRetired(p);
    assert.equal(FREE_TIER_PROVIDER_SET.has(p), false, `${p} must not be a free-tier provider`);
    for (const m of rows(p))
      assert.equal(isCatalogFreeModel(p, m.modelId), false, `${p}/${m.modelId} is not free`);
  }
  assert.ok(!computePublicFreeHeadline().uncappedProviders.includes("ainative"));
});

const LEDGER_BLOCKS: Array<[string, number, string]> = [
  ["mistral", 1_000_000_000, "ended"],
  ["nara", 210_000_000, "no-models"],
  ["navy", 4_500_000, "unverifiable"],
  ["bluesminds", 7_200_000, "ended"],
  ["arcee-ai", 4_800_000, "paid-only"],
  ["huggingface", 200_000, "paid-only"],
  ["huggingchat", 500_000, "paid-only"],
];

test("the ledger keeps the last quota of every retired pool row, with its reason", () => {
  for (const [provider, tokens, reason] of LEDGER_BLOCKS) {
    const ledger = RETIRED_FREE_ROWS.filter((r) => r.provider === provider);
    assert.deepEqual(ids(ledger), ids(rows(provider)), `${provider} ledger ids`);
    for (const r of ledger) {
      assert.equal(r.lastListedMonthlyTokens, tokens, `${provider}/${r.modelId}`);
      assert.equal(r.reason, reason, `${provider}/${r.modelId}`);
      assert.equal(r.retiredAt, "2026-11-23");
      assert.equal(r.poolKey, rows(provider).find((m) => m.modelId === r.modelId)?.poolKey);
      assert.match(r.evidence, /https:\/\/\S+ .*2026-11-23/);
    }
  }
  // Rows without a quota (uncapped or credit) and the LLM7 row whose 150M was never the published
  // quota (owner decision 2026-11-21, PL) stay out of the ledger.
  for (const p of ["llm7", "ainative", "stepfun", "predibase"])
    assert.ok(!RETIRED_FREE_ROWS.some((r) => r.provider === p), p);
});

// --- Ledger rows of the corrected pools and dated evidence ----------------------------------

test("dead ids of corrected pools keep their last listed quota in the ledger", () => {
  const expect: Array<[string, number, string, number]> = [
    ["xkiro", 150_000_000, "id-retired", 29],
    ["xkiro", 150_000_000, "paid-only", 1],
    ["groq", 6_000_000, "id-retired", 1],
    ["bazaarlink", 3_600_000, "id-retired", 31],
    ["api-airforce", 24_000_000, "id-retired", 2],
    ["openrouter", 1_200_000, "id-retired", 1],
    ["sambanova", 6_000_000, "id-retired", 3],
  ];
  for (const [provider, tokens, reason, n] of expect) {
    const ledger = RETIRED_FREE_ROWS.filter((r) => r.provider === provider && r.reason === reason);
    assert.equal(ledger.length, n, `${provider} ${reason}`);
    for (const r of ledger) {
      assert.equal(r.lastListedMonthlyTokens, tokens, `${provider}/${r.modelId}`);
      const row = rows(provider).find((m) => m.modelId === r.modelId);
      assert.equal(row?.freeType, "discontinued", `${provider}/${r.modelId} is retired`);
      assert.equal(r.poolKey, row?.poolKey);
    }
  }
  assert.deepEqual(
    RETIRED_FREE_ROWS.filter((r) => r.reason === "paid-only" && r.provider === "xkiro").map(
      (r) => r.modelId
    ),
    ["deepseek/deepseek-v4-flash"]
  );
  // Rows that never carried a quota stay out of the ledger.
  for (const p of ["onomeo", "routeway", "requesty", "aion", "agentrouter", "cloudflare-ai"])
    assert.ok(!RETIRED_FREE_ROWS.some((r) => r.provider === p), p);
});

test("every free row with a quota carries dated evidence that matches its economics", () => {
  const read = (rel: string) => JSON.parse(readFileSync(new URL(rel, import.meta.url), "utf8"));
  const policy = read("../../config/quality/free-catalog-evidence.json");
  const seed = read("../../config/quality/free-catalog-legacy-seed.json");
  const key = (m: { provider: string; modelId: string }) => `${m.provider}/${m.modelId}`;
  // The base is this catalog without the row the re-audit added, so that row counts as new.
  const added = new Set(["openrouter/google/gemma-4-31b-it:free"]);
  const baseKeys = new Set(FREE_MODEL_BUDGETS.map(key).filter((k) => !added.has(k)));
  assert.deepEqual(
    validateCatalogEvidence(FREE_MODEL_BUDGETS, policy, {
      seed: seed.entries,
      previousDebt: seed.entries.map(key),
      today: new Date().toISOString().slice(0, 10),
      baseKeys,
      grantsFreeAccess,
      unitOf: resolveFreeQuotaUnit,
    }),
    []
  );
  const quota = policy.evidence.filter((e: { claim: string }) => e.claim === "recurring-quota");
  // The seven E1a pools document 43 live model rows, on top of the previous 40 records.
  // E1b adds 39 quota records, including Aion's six card-gated rows.
  assert.equal(quota.length, 122);
  for (const e of quota) {
    const sourceDate = ["E1a", "E1b"].includes(PROVIDER_EXPECTATIONS[e.provider]?.lastWave)
      ? "2026-11-27"
      : "2026-11-23";
    assert.equal(e.checkedAt, sourceDate, key(e));
    const row = FREE_MODEL_BUDGETS.find((m) => key(m) === key(e));
    assert.equal(e.catalogHash, row && catalogFingerprint(row));
  }
});

// --- Card gates and the Telegram bonus ------------------------------------------------------

test("payment-gated offers keep their rows and stay out of the public token figures", () => {
  // https://www.scaleway.com/en/docs/billing/how-to/add-payment-method/ (2026-11-27).
  for (const p of ["cerebras", "aion", "scaleway"]) {
    assert.ok(live(p).length > 0, `${p} stays in the catalog`);
    for (const m of live(p)) assert.deepEqual(m.gates, ["card"], `${p}/${m.modelId}`);
  }
  // https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/express-mode/overview (2026-11-27).
  assert.equal(live("vertex").length, 5);
  for (const row of live("vertex")) assert.deepEqual(row.gates, ["new-accounts-only"], row.modelId);
  // https://docs.tokenfactory.nebius.com/other-capabilities/billing-new.md (2026-11-27).
  assertRetired("nebius");
  const pub = computePublicFreeHeadline();
  const ungated = computePublicFreeHeadline({
    entries: FREE_MODEL_BUDGETS.map(({ gates: _gates, ...m }) => m),
  });
  // Scaleway's 1M signup allowance and Aion's monthly 0.6M require a payment method.
  // https://www.scaleway.com/en/generative-apis-signup/ and https://www.aionlabs.ai/docs/rate-limits/ (2026-11-27).
  assert.equal(ungated.firstMonthRealisticTokens - pub.firstMonthRealisticTokens, 1_600_000);
  assert.ok(!pub.uncappedProviders.includes("aion"), "aion needs a verified card");
  assert.equal(ungated.steadyRecurringTokens - pub.steadyRecurringTokens, 600_000);
});

test("the xKiro Telegram bonus is a social boost, never a deposit boost", () => {
  assert.deepEqual(
    { ...FREE_TIER_BOOSTS["xkiro-free"], note: undefined },
    { provider: "xkiro", boostMonthlyTokens: 15_000_000, gate: "telegram", note: undefined }
  );
  assert.match(FREE_TIER_BOOSTS["xkiro-free"].note, /Telegram/);
  const pub = computePublicFreeHeadline();
  // E1a adds the 24M DGrid deposit allowance to the previous 24M.
  assert.equal(pub.boostMonthlyTokens, 48_000_000);
  assert.equal(pub.socialGatedRecurringTokens, 15_000_000);
});

// --- Curation date, data-file rule and the legacy per-provider map --------------------------

test("the catalog is curated as of the re-audit day and states where retired quotas go", () => {
  // E1a and E1b reopened their sources on 2026-11-27.
  assert.equal(FREE_CATALOG_CURATED_AT, "2026-11-27");
  const src = readFileSync(
    new URL("../../open-sse/config/freeModelCatalog.data.ts", import.meta.url),
    "utf8"
  );
  assert.ok(
    src
      .replace(/\n\/\/ /g, " ")
      .includes(
        "Retired rows stay here as `discontinued` (0 tokens) for at least one release; their last quota lives in freeModelCatalog.retired.data.ts"
      )
  );
});

test("legacy provider budgets agree with the per-model catalog", () => {
  const S = freeTypesInBucket("steady-monthly");
  const expected = new Map<string, number>();
  const pools = new Map<string, Map<string, number>>();
  for (const m of FREE_MODEL_BUDGETS) {
    if (!S.has(m.freeType) || !(m.monthlyTokens > 0) || isCountingGated(m) || isSocialGated(m))
      continue;
    if (m.poolKey) {
      const byPool = pools.get(m.provider) ?? new Map<string, number>();
      byPool.set(m.poolKey, Math.max(byPool.get(m.poolKey) ?? 0, m.monthlyTokens));
      pools.set(m.provider, byPool);
    } else expected.set(m.provider, (expected.get(m.provider) ?? 0) + m.monthlyTokens);
  }
  for (const [provider, byPool] of pools)
    for (const v of byPool.values()) expected.set(provider, (expected.get(provider) ?? 0) + v);
  assert.deepEqual(
    Object.fromEntries(Object.entries(FREE_TIER_BUDGETS).sort()),
    Object.fromEntries([...expected].sort())
  );
});
