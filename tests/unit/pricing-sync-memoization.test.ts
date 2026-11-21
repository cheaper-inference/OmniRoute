import assert from "node:assert/strict";
import { describe, it, before, after, mock } from "node:test";
import { getDbInstance, resetDbInstance } from "../../src/lib/db/core.ts";
import { invalidateDbCache } from "../../src/lib/db/readCache.ts";
import { enrichCatalogModelEntry } from "../../src/lib/modelMetadataRegistry.ts";
import {
  getSyncedPricing,
  saveSyncedPricing,
  clearSyncedPricing,
} from "../../src/lib/pricingSync.ts";

describe("getSyncedPricing memoization", () => {
  before(() => {
    saveSyncedPricing({
      openai: {
        "gpt-4o": { input: 2.5, output: 10 },
      },
    });
  });

  after(() => {
    try {
      clearSyncedPricing();
    } catch {
      // ignore
    }
    resetDbInstance();
  });

  it("returns the same object reference for repeated reads within the same cache version", () => {
    const first = getSyncedPricing();
    const second = getSyncedPricing();
    const third = getSyncedPricing();
    // The saturation bug rebuilt a fresh object on every call; resolveCatalogPricing()
    // calls this per model, so a fresh object per call re-ran the SELECT + JSON.parse
    // and rebuilt the findInsensitive() lowercase index per lookup (~400 warnings/s).
    assert.equal(second, first);
    assert.equal(third, first);
  });

  it("hits the DB once for repeated reads within the same cache version", () => {
    const db = getDbInstance();
    const prepareSpy = mock.method(db, "prepare");
    const callsBefore = prepareSpy.mock.calls.length;

    getSyncedPricing();
    getSyncedPricing();
    getSyncedPricing();

    const callsAfter = prepareSpy.mock.calls.length;
    prepareSpy.mock.restore();

    // Memoized, 3 calls should cost at most 1 real DB round-trip (0 if a prior
    // test already warmed the cache at the same version).
    assert.ok(
      callsAfter - callsBefore <= 1,
      `expected at most 1 db.prepare() call across 3 reads, got ${callsAfter - callsBefore}`
    );
  });

  it("returns a new reference with fresh data after a pricing write invalidates the cache", () => {
    const warm = getSyncedPricing(); // warm the memo at the current cache version
    saveSyncedPricing({
      anthropic: { "claude-x": { input: 1, output: 2 } },
    });
    const pricing = getSyncedPricing();
    assert.notEqual(pricing, warm, "invalidation must rebuild, not reuse the stale object");
    assert.ok(pricing.anthropic, "cache should reflect the write, not a stale snapshot");
    assert.equal(pricing.anthropic["claude-x"].input, 1);
  });

  it("normalizes historical data once per version, including repeated catalog lookups", () => {
    const db = getDbInstance();
    db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
      "pricing_synced",
      "opencode_go",
      JSON.stringify({ "glm-5.2": { input: 1.4, output: 4.4 } })
    );
    invalidateDbCache("pricing");
    const first = getSyncedPricing();
    assert.deepEqual(first["opencode-go"]["glm-5.2"], { input: 1.4, output: 4.4 });
    assert.equal(first.opencode_go, undefined);
    const spy = mock.method(db, "prepare");
    try {
      for (let i = 0; i < 5; i++) {
        assert.equal(getSyncedPricing(), first);
        const entry = enrichCatalogModelEntry(
          { id: "opencode-go/glm-5.2", owned_by: "opencode-go", root: "glm-5.2" },
          undefined,
          { modelsDevPricing: {}, userPricing: {} }
        );
        assert.deepEqual(entry.pricing, { input: 1.4, output: 4.4 });
      }
      const pricingReads = spy.mock.calls.filter(
        ({ arguments: args }) => typeof args[0] === "string" && args[0].includes("pricing_synced")
      );
      assert.equal(
        pricingReads.length,
        0,
        "warm catalog reads must not query synced pricing per model"
      );
    } finally {
      spy.mock.restore();
    }
  });
});
