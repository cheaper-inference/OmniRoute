import assert from "node:assert/strict";
import test from "node:test";

import { RadarFeedSchema } from "../../src/lib/radar/feedSchema.ts";
import { getRadarCatalog } from "../../src/lib/radar/index.ts";

const minimalV2 = {
  feed: "omniroute-radar",
  schemaVersion: 2,
  version: "2026.11.18.1",
  generatedAt: "2026-11-18T07:00:00.000Z",
  tier: "community",
  counts: { providers: 0, models: 0 },
  providers: [],
  models: [],
  quirks: [],
  totals: { dedupedTokensPerMonth: 0, modelCount: 0, poolCount: 0 },
};

const rowSum = {
  method: "row-sum-v1",
  liveTokensPerMonth: 4000,
  retiredTokensPerMonth: 6000,
  totalTokensPerMonth: 10_000,
};
const priceReference = { yearlyUsd: 2.5, lifetimeUsd: 7.25, checkedAt: "2026-11-16" };

test("catalog feeds preserve valid optional totals and price metadata", () => {
  for (const schemaVersion of [1, 2]) {
    const feed = RadarFeedSchema.parse({
      ...minimalV2,
      schemaVersion,
      totals: { ...minimalV2.totals, rowSum, socialGatedTokensPerMonth: 25 },
      priceReference,
    });
    assert.deepEqual(feed.totals.rowSum, rowSum);
    assert.equal(feed.totals.socialGatedTokensPerMonth, 25);
    assert.deepEqual(feed.priceReference, priceReference);
  }
});

test("absent or malformed optional blocks leave the catalog usable", () => {
  const legacy = RadarFeedSchema.parse(minimalV2);
  assert.equal(legacy.totals.rowSum, undefined);
  assert.equal(legacy.totals.socialGatedTokensPerMonth, undefined);
  assert.equal(legacy.priceReference, undefined);

  for (const invalidRowSum of ["x", { ...rowSum, liveTokensPerMonth: -1 }]) {
    const parsed = RadarFeedSchema.parse({
      ...minimalV2,
      totals: { ...minimalV2.totals, rowSum: invalidRowSum, socialGatedTokensPerMonth: -1 },
      priceReference,
    });
    assert.equal(parsed.totals.rowSum, undefined);
    assert.equal(parsed.totals.socialGatedTokensPerMonth, undefined);
    assert.deepEqual(parsed.priceReference, priceReference);
  }

  for (const invalidPrice of [
    "x",
    { ...priceReference, yearlyUsd: -1 },
    { ...priceReference, lifetimeUsd: "7.25" },
    { ...priceReference, checkedAt: "16/11/2026" },
    { yearlyUsd: priceReference.yearlyUsd },
  ]) {
    const parsed = RadarFeedSchema.parse({
      ...minimalV2,
      totals: { ...minimalV2.totals, rowSum },
      priceReference: invalidPrice,
    });
    assert.equal(parsed.priceReference, undefined);
    assert.deepEqual(parsed.totals.rowSum, rowSum);
  }
});

test("catalog accessor exposes optional cache metadata or null", () => {
  const readCatalog = (payload: object) =>
    getRadarCatalog({
      getFlag: () => true,
      getSettings: () => ({ optIn: true }),
      getCache: () => ({
        version: minimalV2.version,
        generatedAt: minimalV2.generatedAt,
        tier: minimalV2.tier,
        payload: JSON.stringify(payload),
        fetchedAt: minimalV2.generatedAt,
      }),
      baseline: [],
      curatedAt: minimalV2.generatedAt.slice(0, 10),
      localOverrides: new Map(),
      tombstones: new Set(),
    }).meta;

  const meta = readCatalog({
    ...minimalV2,
    totals: { ...minimalV2.totals, rowSum },
    priceReference,
  });
  assert.ok(meta);
  assert.deepEqual(meta.rowSum, rowSum);
  assert.deepEqual(meta.priceReference, priceReference);

  const legacyMeta = readCatalog(minimalV2);
  assert.ok(legacyMeta);
  assert.equal(legacyMeta.rowSum, null);
  assert.equal(legacyMeta.priceReference, null);
});
