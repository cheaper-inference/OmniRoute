import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-artifact-209-upgrade-"));
const dataDir = path.join(fixture, "data");
const migrationsDir = path.join(fixture, "migrations");
const repoMigrations = fileURLToPath(new URL("../../../src/lib/db/migrations/", import.meta.url));
const indexMigration = "209_call_logs_artifact_relpath_index.sql";
fs.mkdirSync(migrationsDir);
// Pin this upgrade fixture to its target; later migrations have their own tests.
for (const name of fs
  .readdirSync(repoMigrations)
  .filter((name) => /^\d+_.+\.sql$/.test(name) && Number.parseInt(name, 10) <= 209)) {
  fs.copyFileSync(path.join(repoMigrations, name), path.join(migrationsDir, name));
}
// Counted, not hard-coded: the fixture holds every migration up to the index one.
const fixtureCount = fs.readdirSync(migrationsDir).length;
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");

function freshDatabase() {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  return core.getDbInstance();
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(fixture, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("fresh database applies every migration up to the artifact index, including selector 208", () => {
  const db = freshDatabase();
  const records = db.prepare("SELECT version, name FROM _omniroute_migrations").all();
  assert.equal(records.length, fixtureCount);
  assert.ok(
    records.some(
      (row) =>
        row.version === "208" && row.name === "proxy_subscription_selector_last_switch_by_selector"
    )
  );
  assert.ok(
    records.some((row) => row.version === "209" && row.name === "call_logs_artifact_relpath_index")
  );
  assert.ok(
    db.prepare("SELECT name FROM sqlite_master WHERE name = 'idx_cl_artifact_relpath'").get()
  );
  assert.equal(runMigrations(db, { isNewDb: false }), 0);
});

test("upgrade onto the artifact index migration preserves existing rows and reruns idempotently", () => {
  fs.unlinkSync(path.join(migrationsDir, indexMigration));
  const db = freshDatabase();
  assert.equal(
    db.prepare("SELECT version FROM _omniroute_migrations").all().length,
    fixtureCount - 1
  );
  assert.equal(
    db.prepare("SELECT name FROM sqlite_master WHERE name = 'idx_cl_artifact_relpath'").get(),
    undefined
  );
  db.prepare(
    "INSERT INTO call_logs (id, timestamp, status, artifact_relpath) VALUES (?, ?, ?, ?)"
  ).run("before-upgrade", "2026-10-17T00:00:00.000Z", 200, "artifacts/kept.bin");
  fs.copyFileSync(
    path.join(repoMigrations, indexMigration),
    path.join(migrationsDir, indexMigration)
  );
  assert.equal(runMigrations(db, { isNewDb: false }), 1);
  assert.equal(db.prepare("SELECT version FROM _omniroute_migrations").all().length, fixtureCount);
  assert.equal(
    db.prepare("SELECT artifact_relpath FROM call_logs WHERE id = ?").get("before-upgrade")
      ?.artifact_relpath,
    "artifacts/kept.bin"
  );
  assert.ok(
    db.prepare("SELECT name FROM sqlite_master WHERE name = 'idx_cl_artifact_relpath'").get()
  );
  assert.equal(runMigrations(db, { isNewDb: false }), 0);
});
