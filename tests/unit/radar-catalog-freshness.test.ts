import assert from "node:assert/strict";
import test from "node:test";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";
import type { MergedEntry } from "../../src/lib/radar/applyFeed.ts";
import { baselineToMergedEntries, getRadarCatalog } from "../../src/lib/radar/index.ts";

const version = "2026.11.20.700";
const feedWithExtraRow = {
  feed: "omniroute-radar",
  schemaVersion: 2,
  version,
  generatedAt: "2026-11-20T00:00:00Z",
  tier: "community",
  counts: { providers: 1, models: 1 },
  providers: [{ id: "retired-provider", name: "Retired provider" }],
  models: [
    {
      provider: "retired-provider",
      modelId: "some-model",
      displayName: "Feed-only model",
      familyId: null,
      freeType: "recurring-daily",
      budget: { kind: "per_model", tokensPerMonth: 1000 },
      limits: { rpm: null, rpd: null, tpm: null, tpd: null },
      contextWindow: null,
      capabilities: { tools: null, vision: null, thinking: null },
      metadataEvidenceUrls: [],
      trainsOnPrompts: null,
      tosRisk: "ok",
      setup: null,
      enabled: true,
    },
  ],
  quirks: [],
  totals: { dedupedTokensPerMonth: 1000, modelCount: 1, poolCount: 0 },
};

const cache = (generatedAt: string | null) => ({
  version,
  generatedAt,
  tier: "community",
  payload: JSON.stringify({
    ...feedWithExtraRow,
    generatedAt: generatedAt ?? feedWithExtraRow.generatedAt,
  }),
  fetchedAt: "2026-11-20T12:00:00Z",
});
const baseline = baselineToMergedEntries(FREE_MODEL_BUDGETS);
const deps = {
  getFlag: () => true,
  getSettings: () => ({ optIn: true }),
  baseline,
  localOverrides: new Map<string, Partial<MergedEntry>>(),
  tombstones: new Set<string>(),
  curatedAt: "2026-11-09",
};

test("feed older than the release catalog never resurrects removed rows", () => {
  const result = getRadarCatalog({ ...deps, getCache: () => cache("2026-09-04T00:00:00Z") });
  assert.equal(result.meta?.olderThanRelease, true);
  assert.ok(!result.entries.some((entry) => entry.provider === "retired-provider"));
  assert.equal(result.entries.length, baseline.length);
});

test("unknown build date counts as older", () => {
  const result = getRadarCatalog({ ...deps, getCache: () => cache(null) });
  assert.equal(result.meta?.olderThanRelease, true);
});

test("fresh feed is applied", () => {
  const result = getRadarCatalog({ ...deps, getCache: () => cache("2026-11-20T00:00:00Z") });
  assert.equal(result.meta?.olderThanRelease, false);
  assert.ok(
    result.entries.some(
      (entry) => entry.provider === "retired-provider" && entry.origin === "radar"
    )
  );
});

test("opt-out ignores the cache", () => {
  const getCache = test.mock.fn(() => cache("2026-11-20T00:00:00Z"));
  const result = getRadarCatalog({ ...deps, getSettings: () => ({ optIn: false }), getCache });
  assert.equal(result.meta, null);
  assert.deepEqual(result.entries, baseline);
  assert.equal(getCache.mock.callCount(), 0);
});

test("settings read only after the flag gate", () => {
  const result = getRadarCatalog({
    ...deps,
    getFlag: () => false,
    getSettings: () => {
      throw new Error("settings read before flag");
    },
    getCache: () => {
      throw new Error("cache read before flag");
    },
  });
  assert.equal(result.meta, null);
  assert.deepEqual(result.entries, baseline);
});
