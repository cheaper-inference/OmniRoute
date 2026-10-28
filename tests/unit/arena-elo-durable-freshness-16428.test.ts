import assert from "node:assert/strict";
import { after, test } from "node:test";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { tryOpenSync } from "../../src/lib/db/adapters/driverFactory.ts";

const dataDir = mkdtempSync(join(tmpdir(), "arena-freshness-16428-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
core.resetDbInstance();
const db = tryOpenSync(":memory:");
assert.ok(db);
db.exec(
  `CREATE TABLE key_value (namespace TEXT, key TEXT, value TEXT, PRIMARY KEY(namespace, key));`
);
db.exec(
  readFileSync(
    new URL("../../src/lib/db/migrations/097_model_intelligence.sql", import.meta.url),
    "utf8"
  )
);
globalThis.__omnirouteDb = db as never;
const { getArenaEloSyncStatus, stopArenaEloSync } = await import("../../src/lib/arenaEloSync.ts");

after(() => {
  stopArenaEloSync();
  delete globalThis.__omnirouteDb;
  db.close();
  rmSync(dataDir, { recursive: true, force: true });
});

test("fresh process reports persisted Arena ELO freshness without fetching", () => {
  db.prepare(
    `INSERT INTO model_intelligence (model, source, category, score, synced_at)
    VALUES (?, ?, ?, ?, ?)`
  ).run("fixture", "arena_elo", "text", 80, "2026-10-14 10:20:30");
  db.prepare(
    `INSERT INTO model_intelligence (model, source, category, score, synced_at)
    VALUES (?, ?, ?, ?, ?)`
  ).run("other", "other-source", "text", 90, "2026-10-15 10:20:30");
  const status = getArenaEloSyncStatus();
  assert.equal(status.lastSync, "2026-10-14T10:20:30.000Z");
  assert.equal(status.nextSync, null, "reading persisted data must not start a scheduler");
  assert.equal(status.lastSyncModelCount, 0, "process-local last-run count must not be fabricated");
});

test("clearing persisted Arena data removes freshness despite other sources", () => {
  db.prepare("DELETE FROM model_intelligence WHERE source = ?").run("arena_elo");
  assert.equal(getArenaEloSyncStatus().lastSync, null);
});

test("invalid persisted timestamps report unknown instead of throwing", () => {
  db.prepare(
    `INSERT INTO model_intelligence (model, source, category, score, synced_at)
    VALUES (?, ?, ?, ?, ?)`
  ).run("invalid", "arena_elo", "text", 80, "not-a-date");
  assert.equal(getArenaEloSyncStatus().lastSync, null);
});

test("ISO timestamps preserve explicit offsets", () => {
  db.prepare("UPDATE model_intelligence SET synced_at = ? WHERE source = ?").run(
    "2026-10-14T07:20:30-03:00",
    "arena_elo"
  );
  assert.equal(getArenaEloSyncStatus().lastSync, "2026-10-14T10:20:30.000Z");
});
