import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-radar-supporter-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { BUILTIN_BADGES } = await import("../../src/lib/gamification/badges.ts");
const { emitGamificationEvent } = await import("../../src/lib/gamification/events.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Radar supporter has a dedicated badge and zero-XP idempotent action", async () => {
  const identity = `radar:${"a".repeat(64)}`;
  const badge = BUILTIN_BADGES.find((item) => item.id === "radar-supporter");
  assert.ok(badge);
  assert.equal(JSON.parse(badge.criteria).action, "radar_supporter");

  await emitGamificationEvent({ apiKeyId: identity, action: "radar_supporter" });
  await emitGamificationEvent({ apiKeyId: identity, action: "radar_supporter" });

  const db = getDbInstance();
  const userBadges = db
    .prepare("SELECT badge_id AS badgeId FROM user_badges WHERE api_key_id = ?")
    .all(identity) as Array<{ badgeId: string }>;
  const xpRows = db
    .prepare("SELECT action FROM xp_audit_log WHERE api_key_id = ?")
    .all(identity) as Array<{ action: string }>;
  const scoreRows = db
    .prepare("SELECT score FROM leaderboard WHERE api_key_id = ?")
    .all(identity) as Array<{ score: number }>;

  assert.deepEqual(userBadges, [{ badgeId: "radar-supporter" }]);
  assert.deepEqual(xpRows, []);
  assert.deepEqual(scoreRows, []);
});

test("Intel sync never emits supporter recognition, even for a legacy key", async () => {
  const { createHash, generateKeyPairSync, sign } = await import("node:crypto");
  const { syncRadarIntel } = await import("../../src/lib/radar/intelSync.ts");
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  process.env.RADAR_FEED_PUBKEY = publicKey
    .export({ type: "spki", format: "der" })
    .toString("base64");
  const payload = fs.readFileSync(
    new URL("../fixtures/radar-intel-canonical.json", import.meta.url),
    "utf8"
  );
  const supporterKey = `omr_${"b".repeat(40)}`;
  const legacyIdentity = `radar:${createHash("sha256").update(supporterKey).digest("hex")}`;
  const settings = { optIn: true, supporterKey };
  const result = await syncRadarIntel({
    getFlag: () => true,
    getSettings: () => settings,
    getCache: () => null,
    setCache: () => {},
    fetch: async () =>
      new Response(payload, {
        headers: {
          "x-omniroute-feed-signature": sign(null, Buffer.from(payload), privateKey).toString(
            "base64"
          ),
          "x-omniroute-feed-tier": "live",
        },
      }),
  });

  assert.equal(result.status, "updated");
  const db = getDbInstance();
  assert.deepEqual(
    db.prepare("SELECT badge_id FROM user_badges WHERE api_key_id = ?").all(legacyIdentity),
    []
  );
  const badges = db
    .prepare("SELECT count(*) AS count FROM user_badges WHERE badge_id = 'radar-supporter'")
    .get() as { count: number };
  assert.equal(badges.count, 1);
});
