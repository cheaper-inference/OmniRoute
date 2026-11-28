/**
 * tests/unit/radar-db.test.ts
 *
 * TDD regression guard for the Radar client local DB module:
 * - radar_feed_cache: single-row signed feed cache
 * - radar_settings: opt-in and legacy settings
 *
 * Covers empty state, cache round-trip, replacement, and opt-in persistence.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolate DB state in a temp directory
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-radar-db-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const radar = await import("../../src/lib/db/radar.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
      break;
    } catch (error: unknown) {
      const code = (error as NodeJS.ErrnoException | undefined)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ---------------------------------------------------------------------------
// radar_feed_cache
// ---------------------------------------------------------------------------

test("getRadarCache returns null when no cache exists", () => {
  const result = radar.getRadarCache();
  assert.equal(result, null, "empty cache must return null");
});

test("setRadarCache then getRadarCache round-trips exactly", () => {
  const feed = {
    version: "2026-08-03T00:00:00Z",
    tier: "community",
    payload: JSON.stringify({ models: [{ id: "gpt-4o", provider: "openai" }] }),
    signature: "ed25519:abc123def456",
  };

  radar.setRadarCache(feed);
  const result = radar.getRadarCache();

  assert.ok(result, "cache must not be null after set");
  assert.equal(result.version, feed.version, "version must round-trip");
  assert.equal(result.tier, feed.tier, "tier must round-trip");
  assert.equal(result.payload, feed.payload, "payload must round-trip byte-identically");
  assert.equal(result.signature, feed.signature, "signature must round-trip");
  assert.ok(result.fetchedAt, "fetchedAt must be set");
});

test("second setRadarCache REPLACES the row (still single row)", () => {
  const db = core.getDbInstance();

  radar.setRadarCache({
    version: "v1",
    tier: "community",
    payload: '{"old":true}',
    signature: "sig-old",
  });

  radar.setRadarCache({
    version: "v2",
    tier: "live",
    payload: '{"new":true}',
    signature: "sig-new",
  });

  const result = radar.getRadarCache();
  assert.ok(result);
  assert.equal(result.version, "v2", "must have the second version");
  assert.equal(result.tier, "live", "must have the second tier");
  assert.equal(result.payload, '{"new":true}', "must have the second payload");

  // Verify only one row exists
  const count = db.prepare("SELECT COUNT(*) AS c FROM radar_feed_cache").get() as { c: number };
  assert.equal(count.c, 1, "must have exactly one row");
});

test("setRadarCache uses fetchedAt when provided", () => {
  const fixed = "2026-08-03T12:00:00.000Z";

  radar.setRadarCache({
    version: "v1",
    tier: "community",
    payload: "{}",
    signature: "sig",
    fetchedAt: fixed,
  });

  const result = radar.getRadarCache();
  assert.ok(result);
  assert.equal(result.fetchedAt, fixed, "must use the provided fetchedAt");
});

// ---------------------------------------------------------------------------
// radar_settings
// ---------------------------------------------------------------------------

test("getRadarSettings defaults: optIn false, key null", () => {
  const settings = radar.getRadarSettings();

  assert.equal(settings.optIn, false, "default optIn must be false");
  assert.equal(settings.supporterKey, null, "default supporterKey must be null");
  assert.ok(settings.updatedAt, "updatedAt must be set on first read");
});

test("setRadarOptIn(true) persists", () => {
  radar.setRadarOptIn(true);
  const settings = radar.getRadarSettings();
  assert.equal(settings.optIn, true, "optIn must be true after setRadarOptIn(true)");

  radar.setRadarOptIn(false);
  const settings2 = radar.getRadarSettings();
  assert.equal(settings2.optIn, false, "optIn must be false after setRadarOptIn(false)");
});

test("turning sync off invalidates the catalog and referrals caches", () => {
  radar.setRadarOptIn(true);
  radar.setRadarCache({
    version: "2026.08.07.1",
    tier: "live",
    payload: '{"models":[]}',
    signature: "catalog-live-signature",
  });
  radar.setRadarReferralsCache({
    generatedAt: "2026-08-07T12:00:00.000Z",
    tier: "live",
    payload: '{"referrals":{"fixed":[],"campaigns":[{"provider":"groq"}]}}',
    signature: "live-signature",
  });
  assert.ok(radar.getRadarReferralsCache(), "precondition: live referrals cache exists");
  assert.ok(radar.getRadarCache(), "precondition: live catalog cache exists");

  radar.setRadarOptIn(false);

  assert.equal(radar.getRadarReferralsCache(), null, "turning sync off clears referrals");
  assert.equal(radar.getRadarCache(), null, "turning sync off clears the catalog");
});

// ---------------------------------------------------------------------------
// radar_referrals_cache (migration 142) -- standalone `GET /v1/referrals/latest`
// cache, separate from radar_feed_cache (the catalog feed).
// ---------------------------------------------------------------------------

test("getRadarReferralsCache returns null when no cache exists", () => {
  const result = radar.getRadarReferralsCache();
  assert.equal(result, null, "empty referrals cache must return null");
});

test("setRadarReferralsCache then getRadarReferralsCache round-trips exactly", () => {
  const entry = {
    generatedAt: "2026-08-07T12:00:00.000Z",
    tier: "live",
    payload: JSON.stringify({ referrals: { fixed: [], campaigns: [] } }),
    signature: "ed25519:referrals-sig-abc",
  };

  radar.setRadarReferralsCache(entry);
  const result = radar.getRadarReferralsCache();

  assert.ok(result, "referrals cache must not be null after set");
  assert.equal(result.generatedAt, entry.generatedAt, "generatedAt must round-trip");
  assert.equal(result.tier, entry.tier, "tier must round-trip");
  assert.equal(result.payload, entry.payload, "payload must round-trip byte-identically");
  assert.equal(result.signature, entry.signature, "signature must round-trip");
  assert.ok(result.fetchedAt, "fetchedAt must be set");
});

test("second setRadarReferralsCache REPLACES the row (still single row)", () => {
  const db = core.getDbInstance();

  radar.setRadarReferralsCache({
    generatedAt: "2026-08-07T10:00:00.000Z",
    tier: "community",
    payload: '{"old":true}',
    signature: "sig-old",
  });

  radar.setRadarReferralsCache({
    generatedAt: "2026-08-07T12:00:00.000Z",
    tier: "live",
    payload: '{"new":true}',
    signature: "sig-new",
  });

  const result = radar.getRadarReferralsCache();
  assert.ok(result);
  assert.equal(result.generatedAt, "2026-08-07T12:00:00.000Z", "must have the second generatedAt");
  assert.equal(result.tier, "live", "must have the second tier");
  assert.equal(result.payload, '{"new":true}', "must have the second payload");

  const count = db.prepare("SELECT COUNT(*) AS c FROM radar_referrals_cache").get() as {
    c: number;
  };
  assert.equal(count.c, 1, "must have exactly one row");
});

test("setRadarReferralsCache uses fetchedAt when provided", () => {
  const fixed = "2026-08-07T12:00:00.000Z";

  radar.setRadarReferralsCache({
    generatedAt: "2026-08-07T12:00:00.000Z",
    tier: "community",
    payload: "{}",
    signature: "sig",
    fetchedAt: fixed,
  });

  const result = radar.getRadarReferralsCache();
  assert.ok(result);
  assert.equal(result.fetchedAt, fixed, "must use the provided fetchedAt");
});

test("radar_referrals_cache is independent of radar_feed_cache (separate tables)", () => {
  radar.setRadarCache({
    version: "2026.08.01.1",
    tier: "community",
    payload: '{"catalog":true}',
    signature: "catalog-sig",
  });
  radar.setRadarReferralsCache({
    generatedAt: "2026-08-07T12:00:00.000Z",
    tier: "live",
    payload: '{"referrals":true}',
    signature: "referrals-sig",
  });

  const catalogCache = radar.getRadarCache();
  const referralsCache = radar.getRadarReferralsCache();

  assert.equal(catalogCache?.payload, '{"catalog":true}');
  assert.equal(referralsCache?.payload, '{"referrals":true}');
  assert.notEqual(
    catalogCache?.payload,
    referralsCache?.payload,
    "the two caches must never share storage"
  );
});
