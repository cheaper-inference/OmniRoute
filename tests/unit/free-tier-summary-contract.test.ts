import assert from "node:assert/strict";
import test from "node:test";

import {
  computeFreeModelTotals,
  computePublicFreeHeadline,
  computeRowSumMirror,
} from "../../open-sse/config/freeModelCatalog.ts";
import {
  FREE_CATALOG_CURATED_AT,
  FREE_MODEL_BUDGETS,
} from "../../open-sse/config/freeModelCatalog.data.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import type { FreeTierSummary } from "../../src/shared/types/freeTierSummary.ts";

process.env.INITIAL_PASSWORD = "test-bootstrap-password-for-free-tier-contract";

const { GET } = await import("../../src/app/api/free-tier/summary/route.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { clearRadarFeedCaches, setRadarCache, setRadarModelTombstone, setRadarOptIn } =
  await import("../../src/lib/db/radar.ts");

const GEN_AT = `${FREE_CATALOG_CURATED_AT}T07:00:00.000Z`;
const VERSION = `${FREE_CATALOG_CURATED_AT.replaceAll("-", ".")}.520`;
const PRICE = { yearlyUsd: 2.5, lifetimeUsd: 7.25, checkedAt: FREE_CATALOG_CURATED_AT };
const ROW_SUM = {
  method: "row-sum-v1",
  liveTokensPerMonth: 4000,
  retiredTokensPerMonth: 6000,
  totalTokensPerMonth: 10_000,
};
const MODEL_ID = "test-feed-only-model";
const OVERLAY_TOKENS = 1234;
const feedModel = {
  provider: "test-feed-only-provider",
  modelId: MODEL_ID,
  displayName: "Feed-only model",
  familyId: null,
  freeType: "recurring-daily",
  budget: { kind: "per_model", tokensPerMonth: OVERLAY_TOKENS },
  limits: { rpm: null, rpd: null, tpm: null, tpd: null },
  contextWindow: null,
  capabilities: { tools: null, vision: null, thinking: null },
  metadataEvidenceUrls: [],
  trainsOnPrompts: null,
  tosRisk: "ok",
  setup: null,
  enabled: true,
};

function seedFeed({
  rowSum,
  priceReference,
  tier = "community",
  generatedAt = GEN_AT,
}: {
  rowSum?: unknown;
  priceReference?: unknown;
  tier?: "live" | "community";
  generatedAt?: string;
} = {}) {
  process.env.RADAR_ENABLED = "true";
  setRadarOptIn(true);
  setRadarCache({
    version: VERSION,
    generatedAt,
    tier,
    signature: "test-signature-not-verified-on-read",
    payload: JSON.stringify({
      feed: "omniroute-radar",
      schemaVersion: 2,
      version: VERSION,
      generatedAt,
      tier,
      counts: { providers: 2, models: 2 },
      providers: [
        { id: feedModel.provider, name: "Feed-only provider" },
        { id: "groq", name: "Groq" },
      ],
      models: [feedModel, { ...feedModel, provider: "groq" }],
      quirks: [],
      totals: {
        dedupedTokensPerMonth: OVERLAY_TOKENS * 2,
        modelCount: 2,
        poolCount: 0,
        socialGatedTokensPerMonth: 789,
        rowSum,
      },
      priceReference,
    }),
  });
}

async function getSummary(query = ""): Promise<FreeTierSummary> {
  const response = await GET(new Request(`https://omni.test/api/free-tier/summary${query}`));
  assert.equal(response.status, 200);
  return response.json();
}

function expectedMirror(asOf: string, entries?: typeof FREE_MODEL_BUDGETS) {
  const { method, liveTokens, retiredTokens, totalTokens, retiredShare } = computeRowSumMirror({
    asOf: new Date(asOf),
    entries,
  });
  return { method, liveTokens, retiredTokens, totalTokens, retiredShare };
}

test.beforeEach(() => {
  process.env.RADAR_ENABLED = "false";
  clearRadarFeedCaches();
});
test.after(() => resetDbInstance());

test("the release reports its headline, row-sum and model flags", async () => {
  const body = await getSummary();
  const real = computePublicFreeHeadline();

  assert.equal(body.source.kind, "release");
  assert.equal(body.source.version, null);
  assert.equal(body.source.generatedAt, FREE_CATALOG_CURATED_AT);
  assert.equal(new Date(body.source.servedAt).toISOString(), body.source.servedAt);
  assert.equal(body.rowSumSource, "release");
  assert.deepEqual(body.rowSum, expectedMirror(body.source.servedAt));
  assert.equal(body.realTokens, real.steadyRecurringTokens);
  assert.equal(body.socialGatedTokens, real.socialGatedRecurringTokens);
  assert.equal(body.activePromotions, null);
  assert.equal(body.priceReference, null);
  assert.equal(body.catalogSource, "baseline");
  assert.equal(body.catalogUpdatedAt, FREE_CATALOG_CURATED_AT);
  assert.equal(body.perModel.length, FREE_MODEL_BUDGETS.length);
  for (const row of body.perModel) {
    assert.equal(row.inRelease, true);
    assert.equal(row.routable, Object.hasOwn(REGISTRY, row.provider));
  }
});

test("a fresh Radar feed supplies its row-sum and the overlay contributes to real tokens", async () => {
  seedFeed({ rowSum: ROW_SUM });
  const body = await getSummary();
  const real = computePublicFreeHeadline();

  assert.equal(body.source.kind, "radar");
  assert.equal(body.source.version, VERSION);
  assert.equal(body.source.generatedAt, GEN_AT);
  assert.equal(body.catalogSource, "radar-overlay");
  assert.equal(body.catalogUpdatedAt, GEN_AT);
  assert.equal(body.rowSumSource, "radar");
  assert.deepEqual(body.rowSum, {
    method: "row-sum-v1",
    liveTokens: ROW_SUM.liveTokensPerMonth,
    retiredTokens: ROW_SUM.retiredTokensPerMonth,
    totalTokens: ROW_SUM.totalTokensPerMonth,
    retiredShare: ROW_SUM.retiredTokensPerMonth / ROW_SUM.totalTokensPerMonth,
  });
  assert.equal(body.realTokens, real.steadyRecurringTokens + OVERLAY_TOKENS * 2);
  assert.equal(body.socialGatedTokens, real.socialGatedRecurringTokens);
  assert.equal(body.priceReference, null);
  for (const [provider, routable] of [
    [feedModel.provider, false],
    ["groq", true],
  ] as const) {
    const row = body.perModel.find((r) => r.provider === provider && r.modelId === MODEL_ID);
    assert.ok(row);
    assert.equal(row.inRelease, false);
    assert.equal(row.routable, routable);
  }
});

test("price metadata is supplied only by the feed being served", async () => {
  seedFeed({ priceReference: PRICE });
  const valid = await getSummary();
  assert.equal(valid.source.kind, "radar");
  assert.deepEqual(valid.priceReference, PRICE);

  seedFeed({ priceReference: { yearlyUsd: "x" } });
  const invalid = await getSummary();
  assert.equal(invalid.source.kind, "radar");
  assert.equal(invalid.priceReference, null);

  seedFeed({ tier: "live", priceReference: PRICE, rowSum: ROW_SUM });
  const anonymous = await getSummary();
  assert.equal(anonymous.source.kind, "radar");
  assert.deepEqual(anonymous.priceReference, PRICE);
  assert.equal(anonymous.rowSumSource, "radar");
  assert.deepEqual(anonymous.rowSum, {
    method: "row-sum-v1",
    liveTokens: ROW_SUM.liveTokensPerMonth,
    retiredTokens: ROW_SUM.retiredTokensPerMonth,
    totalTokens: ROW_SUM.totalTokensPerMonth,
    retiredShare: ROW_SUM.retiredTokensPerMonth / ROW_SUM.totalTokensPerMonth,
  });
});

test("an unsupported or absent feed row-sum uses the release mirror", async () => {
  for (const rowSum of [
    { ...ROW_SUM, method: "row-sum-v2" },
    { ...ROW_SUM, totalTokensPerMonth: -1 },
    undefined,
  ]) {
    seedFeed({ rowSum });
    const body = await getSummary();
    assert.equal(body.source.kind, "radar");
    assert.equal(body.rowSumSource, "release");
    assert.deepEqual(body.rowSum, expectedMirror(body.source.servedAt));
  }
});

test("an older feed uses release entries with local state for both figures", async () => {
  const older = new Date(GEN_AT);
  older.setUTCDate(older.getUTCDate() - 1);
  seedFeed({ generatedAt: older.toISOString(), rowSum: ROW_SUM, priceReference: PRICE });
  const model = FREE_MODEL_BUDGETS.find((row) => row.provider === "groq" && row.monthlyTokens > 0);
  assert.ok(model);
  assert.equal(setRadarModelTombstone(model.provider, model.modelId, true), true);
  try {
    const body = await getSummary();
    const releaseEntries = FREE_MODEL_BUDGETS.filter((row) => row !== model);

    assert.equal(body.source.kind, "release");
    assert.equal(body.priceReference, null);
    assert.equal(body.rowSumSource, "release");
    assert.deepEqual(body.rowSum, expectedMirror(body.source.servedAt, releaseEntries));
    assert.equal(
      body.realTokens,
      computePublicFreeHeadline({ entries: releaseEntries }).steadyRecurringTokens
    );
    assert.ok(
      !body.perModel.some((row) => row.provider === model.provider && row.modelId === model.modelId)
    );
  } finally {
    setRadarModelTombstone(model.provider, model.modelId, false);
  }
});

test("excludeTosAvoid continues filtering the legacy totals and rows", async () => {
  for (const excludeTosAvoid of [false, true]) {
    const body = await getSummary(excludeTosAvoid ? "?excludeTosAvoid=1" : "");
    const expected = computeFreeModelTotals({ excludeTosAvoid });
    const { perModel, ...totals } = expected;
    const legacyFields = Object.fromEntries(Object.keys(totals).map((key) => [key, body[key]]));
    assert.deepEqual(legacyFields, totals);
    assert.deepEqual(
      body.perModel.map(({ inRelease, routable, ...row }) => row),
      perModel.map((row) => ({ ...row }))
    );
    assert.equal(body.realTokens, computePublicFreeHeadline().steadyRecurringTokens);
    assert.deepEqual(body.rowSum, expectedMirror(body.source.servedAt));
  }
});
