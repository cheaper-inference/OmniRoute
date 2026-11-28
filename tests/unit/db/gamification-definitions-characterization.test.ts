/**
 * Characterization — badge catalogue, earned badges, invite tokens and community
 * servers (migration 060), through the public exports that production uses:
 * `src/lib/db/gamification.ts`, `gamification/badges.ts` (seed),
 * `gamification/invites.ts` (create / redeem / list / revoke),
 * `gamification/servers.ts` (connect / list / disconnect) and the badge-unlock toast
 * in `gamification/events.ts`. Green on the base before the repository move and
 * green after it.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gamif-defs-char-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const gdb = await import("../../../src/lib/db/gamification.ts");
const badges = await import("../../../src/lib/gamification/badges.ts");
const invites = await import("../../../src/lib/gamification/invites.ts");
const servers = await import("../../../src/lib/gamification/servers.ts");
const events = await import("../../../src/lib/gamification/events.ts");
const notifications = await import("../../../src/lib/gamification/notifications.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => resetDb());

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function raw() {
  return core.getDbInstance();
}

function insertDefinition(
  id: string,
  category: string | null,
  extra: Record<string, unknown> = {}
) {
  raw()
    .prepare(
      `INSERT INTO badge_definitions (id, name, description, icon, category, rarity, criteria, hidden, created_at)
       VALUES (@id, @name, @description, @icon, @category, @rarity, @criteria, @hidden, @created_at)`
    )
    .run({
      id,
      name: `Name ${id}`,
      description: null,
      icon: null,
      category,
      rarity: "rare",
      criteria: null,
      hidden: 0,
      created_at: "2026-01-01 00:00:00",
      ...extra,
    });
}

// ─── Badge catalogue ─────────────────────────────────────────────────────────

test("getBadgeDefinitions maps every column and filters by a non-empty category", () => {
  insertDefinition("b-usage", "usage", {
    description: "d",
    icon: "zap",
    criteria: '{"type":"streak","threshold":3}',
    hidden: 1,
  });
  insertDefinition("b-social", "social");
  insertDefinition("b-none", null);

  assert.deepEqual(gdb.getBadgeDefinitions("usage"), [
    {
      id: "b-usage",
      name: "Name b-usage",
      description: "d",
      icon: "zap",
      category: "usage",
      rarity: "rare",
      criteria: '{"type":"streak","threshold":3}',
      hidden: 1,
      createdAt: "2026-01-01 00:00:00",
    },
  ]);
  assert.deepEqual(
    gdb.getBadgeDefinitions().map((b) => b.id),
    ["b-usage", "b-social", "b-none"]
  );
  // An empty string is falsy: it lists everything instead of matching category = ''.
  assert.equal(gdb.getBadgeDefinitions("").length, 3);
  assert.deepEqual(gdb.getBadgeDefinitions("missing"), []);
});

test("seedBuiltinBadges inserts the catalogue once and never overwrites an edited row", async () => {
  await badges.seedBuiltinBadges();
  const seeded = gdb.getBadgeDefinitions();
  assert.equal(seeded.length, badges.BUILTIN_BADGES.length);
  const first = seeded.find((b) => b.id === "first-token")!;
  const expected = badges.BUILTIN_BADGES.find((b) => b.id === "first-token")!;
  assert.deepEqual(
    { ...first, createdAt: typeof first.createdAt },
    {
      ...expected,
      createdAt: "string",
    }
  );
  assert.match(first.createdAt, /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);

  raw().prepare("UPDATE badge_definitions SET name = 'Edited' WHERE id = 'first-token'").run();
  raw().prepare("DELETE FROM badge_definitions WHERE id = 'token-whale'").run();
  await badges.seedBuiltinBadges();
  const again = gdb.getBadgeDefinitions();
  assert.equal(again.length, badges.BUILTIN_BADGES.length, "deleted rows come back");
  assert.equal(again.find((b) => b.id === "first-token")!.name, "Edited", "INSERT OR IGNORE");
});

// ─── Earned badges ───────────────────────────────────────────────────────────

test("unlockBadge reports only the inserting call; hasBadge reads user_badges directly", () => {
  assert.equal(gdb.hasBadge("k1", "b1"), false);
  assert.equal(gdb.unlockBadge("k1", "b1"), true);
  assert.equal(gdb.unlockBadge("k1", "b1"), false);
  assert.equal(gdb.hasBadge("k1", "b1"), true);
  assert.equal(gdb.hasBadge("k2", "b1"), false);
  assert.equal(
    (raw().prepare("SELECT COUNT(*) AS n FROM user_badges").get() as { n: number }).n,
    1
  );
  // No definition row: the JOIN hides the earned badge (#3472 behaviour).
  assert.deepEqual(gdb.getBadges("k1"), []);
});

test("getBadges joins definitions; getAllEarnedBadges dedups by badge keeping the earliest unlock", () => {
  insertDefinition("b1", "usage", { description: "desc", icon: "star" });
  insertDefinition("b2", null);
  const ins = raw().prepare(
    "INSERT INTO user_badges (api_key_id, badge_id, unlocked_at) VALUES (?, ?, ?)"
  );
  ins.run("k1", "b1", "2026-03-02 00:00:00");
  ins.run("k2", "b1", "2026-03-01 00:00:00");
  ins.run("k1", "b2", "2026-03-05 00:00:00");
  ins.run("k1", "orphan", "2026-03-06 00:00:00");

  const mine = gdb.getBadges("k1").sort((a, b) => a.badgeId.localeCompare(b.badgeId));
  assert.deepEqual(mine, [
    {
      apiKeyId: "k1",
      badgeId: "b1",
      unlockedAt: "2026-03-02 00:00:00",
      badgeName: "Name b1",
      badgeDescription: "desc",
      badgeIcon: "star",
      badgeCategory: "usage",
      badgeRarity: "rare",
    },
    {
      apiKeyId: "k1",
      badgeId: "b2",
      unlockedAt: "2026-03-05 00:00:00",
      badgeName: "Name b2",
      badgeDescription: null,
      badgeIcon: null,
      badgeCategory: null,
      badgeRarity: "rare",
    },
  ]);

  const all = gdb.getAllEarnedBadges().sort((a, b) => a.badgeId.localeCompare(b.badgeId));
  assert.deepEqual(
    all.map((b) => [b.apiKeyId, b.badgeId, b.unlockedAt, b.badgeName]),
    [
      ["*", "b1", "2026-03-01 00:00:00", "Name b1"],
      ["*", "b2", "2026-03-05 00:00:00", "Name b2"],
    ]
  );
});

test("badge-unlock toast uses the seeded definition, or falls back to the id", async () => {
  await events.emitGamificationEvent({ apiKeyId: "fx-unseeded", action: "radar_supporter" });
  assert.deepEqual(
    notifications.consumeBadgeUnlocks("fx-unseeded").map(({ unlockedAt: _u, ...r }) => r),
    [
      {
        badgeId: "radar-supporter",
        badgeName: "radar-supporter",
        badgeDescription: "",
        badgeIcon: "award",
        badgeRarity: "common",
      },
    ]
  );

  await badges.seedBuiltinBadges();
  await events.emitGamificationEvent({ apiKeyId: "fx-seeded", action: "radar_supporter" });
  assert.deepEqual(
    notifications.consumeBadgeUnlocks("fx-seeded").map(({ unlockedAt: _u, ...r }) => r),
    [
      {
        badgeId: "radar-supporter",
        badgeName: "Radar Supporter",
        badgeDescription: "Verified a live OmniRoute Radar supporter feed",
        badgeIcon: "radar",
        badgeRarity: "rare",
      },
    ]
  );
  // Already earned: no second toast.
  await events.emitGamificationEvent({ apiKeyId: "fx-seeded", action: "radar_supporter" });
  assert.deepEqual(notifications.consumeBadgeUnlocks("fx-seeded"), []);
});

// ─── Invite tokens ───────────────────────────────────────────────────────────

test("createInviteToken defaults server_url to null and max_uses to 1; getInviteByCode maps every column", () => {
  gdb.createInviteToken("i1", "CODE0001", "hash-1", "creator");
  const inv = gdb.getInviteByCode("CODE0001")!;
  assert.deepEqual(
    { ...inv, createdAt: typeof inv.createdAt },
    {
      id: "i1",
      code: "CODE0001",
      tokenHash: "hash-1",
      createdBy: "creator",
      usedBy: null,
      serverUrl: null,
      maxUses: 1,
      useCount: 0,
      expiresAt: null,
      revokedAt: null,
      createdAt: "string",
    }
  );
  gdb.createInviteToken("i2", "CODE0002", "hash-2", "creator", "https://s.example", 3);
  const second = gdb.getInviteByCode("CODE0002")!;
  assert.deepEqual([second.serverUrl, second.maxUses], ["https://s.example", 3]);
  assert.equal(gdb.getInviteByCode("missing"), null);
  assert.throws(() => gdb.createInviteToken("i3", "CODE0001", "hash-3", "creator"), /UNIQUE/);
});

test("redeemInvite is one conditional update: revoked, used-up, expired and unknown codes fail", () => {
  gdb.createInviteToken("i1", "MULTI001", "h1", "creator", undefined, 2);
  assert.equal(gdb.redeemInvite("MULTI001", "guest-a"), true);
  assert.equal(gdb.redeemInvite("MULTI001", "guest-b"), true);
  assert.equal(gdb.redeemInvite("MULTI001", "guest-c"), false, "used up");
  const used = gdb.getInviteByCode("MULTI001")!;
  assert.deepEqual([used.useCount, used.usedBy], [2, "guest-b"], "last redeemer wins");

  gdb.createInviteToken("i2", "REVOKED1", "h2", "creator");
  gdb.revokeInvite("i2");
  assert.match(gdb.getInviteByCode("REVOKED1")!.revokedAt ?? "", /^\d{4}-\d{2}-\d{2} /);
  assert.equal(gdb.redeemInvite("REVOKED1", "guest"), false);

  gdb.createInviteToken("i3", "EXPIRED1", "h3", "creator");
  raw()
    .prepare("UPDATE invite_tokens SET expires_at = '2000-01-01 00:00:00' WHERE id = 'i3'")
    .run();
  assert.equal(gdb.redeemInvite("EXPIRED1", "guest"), false);

  gdb.createInviteToken("i4", "FUTURE01", "h4", "creator");
  raw()
    .prepare("UPDATE invite_tokens SET expires_at = '2999-01-01 00:00:00' WHERE id = 'i4'")
    .run();
  assert.equal(gdb.redeemInvite("FUTURE01", "guest"), true);

  assert.equal(gdb.redeemInvite("NOPE0000", "guest"), false);
  assert.doesNotThrow(() => gdb.revokeInvite("does-not-exist"));
});

test("invites service: list is newest first per creator and never returns the token hash", async () => {
  gdb.createInviteToken("old", "OLDCODE1", "h-old", "creator", "https://a.example", 5);
  gdb.createInviteToken("new", "NEWCODE1", "h-new", "creator");
  gdb.createInviteToken("other", "OTHER001", "h-other", "someone-else");
  raw()
    .prepare("UPDATE invite_tokens SET created_at = '2026-01-01 00:00:00' WHERE id = 'old'")
    .run();
  raw()
    .prepare("UPDATE invite_tokens SET created_at = '2026-02-01 00:00:00' WHERE id = 'new'")
    .run();

  assert.deepEqual(await invites.listInvites("creator"), [
    {
      id: "new",
      code: "NEWCODE1",
      serverUrl: null,
      maxUses: 1,
      useCount: 0,
      expiresAt: null,
      revokedAt: null,
      createdAt: "2026-02-01 00:00:00",
    },
    {
      id: "old",
      code: "OLDCODE1",
      serverUrl: "https://a.example",
      maxUses: 5,
      useCount: 0,
      expiresAt: null,
      revokedAt: null,
      createdAt: "2026-01-01 00:00:00",
    },
  ]);
  assert.deepEqual(await invites.listInvites("nobody"), []);
});

test("invites service: create stores the hash of the token and redeem enforces the rules", async () => {
  const created = await invites.createInvite("creator", "https://srv.example", 1);
  const row = gdb.getInviteByCode(created.code)!;
  const crypto = await import("node:crypto");
  assert.equal(row.tokenHash, crypto.createHash("sha256").update(created.token).digest("hex"));
  assert.deepEqual(
    [row.createdBy, row.serverUrl, row.maxUses],
    ["creator", "https://srv.example", 1]
  );
  assert.deepEqual(await invites.redeemInvite(created.code, "guest"), {
    success: true,
    serverUrl: "https://srv.example",
  });
  assert.deepEqual(await invites.redeemInvite(created.code, "guest-2"), {
    success: false,
    error: "Invite has been fully redeemed",
  });
  assert.equal(await invites.revokeInvite(row.id), true);
  assert.deepEqual(await invites.redeemInvite(created.code, "guest-3"), {
    success: false,
    error: "Invite has been revoked",
  });
});

// ─── Community servers ───────────────────────────────────────────────────────

test("connectServer replaces by id (status and error reset); key-hash lookup only matches connected", () => {
  gdb.connectServer("s1", "One", "https://one.example", "hash-1");
  assert.deepEqual(gdb.getConnectedServerByKeyHash("hash-1"), { id: "s1" });
  assert.equal(gdb.getConnectedServerByKeyHash("missing"), undefined);

  gdb.disconnectServer("s1");
  assert.equal(gdb.getConnectedServerByKeyHash("hash-1"), undefined);
  assert.doesNotThrow(() => gdb.disconnectServer("does-not-exist"));

  raw()
    .prepare(
      "UPDATE community_servers SET status = 'error', error_message = 'boom', last_sync_at = '2026-01-01 00:00:00' WHERE id = 's1'"
    )
    .run();
  gdb.connectServer("s1", "One again", "https://one-b.example", "hash-1b");
  const listed = gdb.listServers();
  assert.equal(listed.length, 1);
  assert.deepEqual(
    { ...listed[0], connectedAt: typeof listed[0].connectedAt },
    {
      id: "s1",
      name: "One again",
      url: "https://one-b.example",
      connectedAt: "string",
      lastSyncAt: null,
      status: "connected",
      errorMessage: null,
    }
  );
  assert.equal("apiKeyHash" in listed[0], false);
  assert.deepEqual(gdb.getConnectedServerByKeyHash("hash-1b"), { id: "s1" });
});

test("servers service: connect stores the PBKDF2 hash and list hides it", async () => {
  const conn = await servers.connectServer("Peer", "https://peer.example", "peer-key");
  const crypto = await import("node:crypto");
  const hash = crypto
    .pbkdf2Sync("peer-key", "omniroute-federation-salt", 120000, 32, "sha256")
    .toString("hex");
  assert.deepEqual(gdb.getConnectedServerByKeyHash(hash), { id: conn.id });
  const listed = await servers.listServers();
  assert.deepEqual(
    listed.map((s) => [s.id, s.name, s.status, "apiKeyHash" in s]),
    [[conn.id, "Peer", "connected", false]]
  );
  await servers.disconnectServer(conn.id);
  assert.equal((await servers.listServers())[0].status, "disconnected");
});
