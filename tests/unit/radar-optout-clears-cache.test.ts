import assert from "node:assert/strict";
import test from "node:test";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import {
  getRadarCache,
  getRadarIntelCache,
  getRadarOffersCache,
  getRadarReferralsCache,
  getRadarSettings,
  listRadarLocalModelState,
  setRadarCache,
  setRadarIntelCache,
  setRadarLocalModelOverride,
  setRadarOffersCache,
  setRadarOptIn,
  setRadarReferralsCache,
} from "../../src/lib/db/radar.ts";

test.after(() => resetDbInstance());

const version = "2026.11.20.700";
const generatedAt = "2026-11-20T00:00:00Z";
const signed = { payload: "{}", signature: "test-signature" };

function seedCaches() {
  setRadarCache({ ...signed, version, generatedAt, tier: "community" });
  setRadarReferralsCache({
    ...signed,
    generatedAt,
    tier: "community",
    payload: JSON.stringify({
      feed: "omniroute-radar-referrals",
      schemaVersion: 1,
      generatedAt,
      referrals: { fixed: [], campaigns: [] },
    }),
  });
  setRadarOffersCache({ ...signed, version, tier: "live" });
  setRadarIntelCache({ ...signed, version, tier: "live", supporterIdentity: "test-supporter" });
}

test("turning off Radar sync clears all four feed caches and keeps local model state", () => {
  seedCaches();
  assert.equal(setRadarLocalModelOverride("test-provider", "test-model", { enabled: false }), true);
  const localState = listRadarLocalModelState();
  setRadarOptIn(true);

  setRadarOptIn(false);

  assert.equal(getRadarCache(), null);
  assert.equal(getRadarReferralsCache(), null);
  assert.equal(getRadarOffersCache(), null);
  assert.equal(getRadarIntelCache(), null);
  assert.equal(getRadarSettings().optIn, false);
  assert.deepEqual(listRadarLocalModelState(), localState);
});

test("turning on Radar sync preserves all four feed caches", () => {
  seedCaches();
  setRadarOptIn(true);

  assert.ok(getRadarCache());
  assert.ok(getRadarReferralsCache());
  assert.ok(getRadarOffersCache());
  assert.ok(getRadarIntelCache());
});
