/**
 * Contract tests for the SQLite gamification definition repositories and their
 * composition root: the async repositories and the legacy facade share one set of
 * tables, the repositories take already-defaulted input, and the legacy helpers run
 * synchronously in the caller's turn.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gamif-defs-repo-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
const gdb = await import("../../../../src/lib/db/gamification.ts");
const { gamificationDefinitionRepositories } =
  await import("../../../../src/lib/db/repositories/gamificationDefinitionRepositories.ts");
const sqlite =
  await import("../../../../src/lib/db/repositories/sqliteGamificationDefinitionRepositories.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("composition root wires the SQLite repositories and legacy helpers", () => {
  assert.equal(gamificationDefinitionRepositories.badges, sqlite.sqliteBadgeRepository);
  assert.equal(gamificationDefinitionRepositories.invites, sqlite.sqliteInviteTokenRepository);
  assert.equal(
    gamificationDefinitionRepositories.communityServers,
    sqlite.sqliteCommunityServerRepository
  );
  assert.equal(
    gamificationDefinitionRepositories.legacySync,
    sqlite.sqliteGamificationDefinitionLegacySync
  );
  assert.equal(gdb.getBadgeRepository(), sqlite.sqliteBadgeRepository);
  assert.equal(gdb.getInviteTokenRepository(), sqlite.sqliteInviteTokenRepository);
  assert.equal(gdb.getCommunityServerRepository(), sqlite.sqliteCommunityServerRepository);
});

test("repository methods return Promises; legacy helpers do not", () => {
  const badges = gdb.getBadgeRepository();
  const pending = badges.has("k", "b");
  assert.ok(pending instanceof Promise);
  const legacy = gamificationDefinitionRepositories.legacySync;
  assert.equal(legacy.hasBadge("k", "b"), false);
  assert.equal(legacy.unlockBadge("k", "b"), true);
  return pending.then((value) => assert.equal(value, false, "read happened before the unlock"));
});

test("badge repository: seed, unlock, has and earned views share the facade's tables", async () => {
  const repo = gdb.getBadgeRepository();
  await repo.seedDefinitions([
    {
      id: "c1",
      name: "Contract One",
      description: null,
      icon: "star",
      category: "usage",
      rarity: "rare",
      criteria: null,
      hidden: 0,
    },
  ]);
  await repo.seedDefinitions([
    {
      id: "c1",
      name: "Overwritten?",
      description: null,
      icon: null,
      category: null,
      rarity: "common",
      criteria: null,
      hidden: 1,
    },
  ]);
  assert.deepEqual(
    (await repo.listDefinitions("usage")).map((d) => [d.id, d.name]),
    [["c1", "Contract One"]]
  );
  assert.deepEqual(gdb.getBadgeDefinitions(), await repo.listDefinitions());

  assert.equal(await repo.unlock("k1", "c1"), true);
  assert.equal(await repo.unlock("k1", "c1"), false);
  assert.equal(gdb.hasBadge("k1", "c1"), true);
  assert.equal(await repo.has("k1", "c1"), true);
  assert.deepEqual(await repo.listEarned("k1"), gdb.getBadges("k1"));
  assert.deepEqual(await repo.listEarnedByAnyKey(), gdb.getAllEarnedBadges());
  assert.equal((await repo.listEarnedByAnyKey())[0].apiKeyId, "*");
});

test("invite repository: create takes defaulted input; redeem/revoke/list match the facade", async () => {
  const repo = gdb.getInviteTokenRepository();
  await repo.create({
    id: "i1",
    code: "REPO0001",
    tokenHash: "h1",
    createdBy: "creator",
    serverUrl: null,
    maxUses: 1,
  });
  assert.deepEqual(await repo.findByCode("REPO0001"), gdb.getInviteByCode("REPO0001"));
  assert.equal(await repo.findByCode("missing"), null);
  assert.equal(await repo.redeem("REPO0001", "guest"), true);
  assert.equal(await repo.redeem("REPO0001", "guest"), false);
  await repo.revoke("i1");
  assert.ok((await repo.findByCode("REPO0001"))?.revokedAt);
  const listed = await repo.listByCreator("creator");
  assert.deepEqual(
    listed.map((i) => Object.keys(i).sort()),
    [["code", "createdAt", "expiresAt", "id", "maxUses", "revokedAt", "serverUrl", "useCount"]]
  );
});

test("community server repository: null for no match, list hides the key hash", async () => {
  const repo = gdb.getCommunityServerRepository();
  assert.equal(await repo.findConnectedIdByKeyHash("nope"), null);
  assert.equal(gdb.getConnectedServerByKeyHash("nope"), undefined, "facade keeps undefined");
  await repo.connect("s1", "Peer", "https://peer.example", "hash");
  assert.deepEqual(await repo.findConnectedIdByKeyHash("hash"), { id: "s1" });
  assert.deepEqual(await repo.list(), gdb.listServers());
  await repo.disconnect("s1");
  assert.equal(await repo.findConnectedIdByKeyHash("hash"), null);
  assert.equal((await repo.list())[0].status, "disconnected");
});

test("findBadgeUnlockDetails returns the toast columns or undefined", async () => {
  const legacy = gamificationDefinitionRepositories.legacySync;
  assert.equal(legacy.findBadgeUnlockDetails("missing"), undefined);
  await gdb.getBadgeRepository().seedDefinitions([
    {
      id: "t1",
      name: "Toast",
      description: "shown",
      icon: "award",
      category: null,
      rarity: "epic",
      criteria: null,
      hidden: 0,
    },
  ]);
  assert.deepEqual(legacy.findBadgeUnlockDetails("t1"), {
    name: "Toast",
    description: "shown",
    icon: "award",
    rarity: "epic",
  });
});
