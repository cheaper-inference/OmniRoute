/**
 * restoreDbBackup must refuse a content-addressed pre-migration snapshot whose bytes no longer
 * match the SHA-256 in its id, even when the changed file is still a valid SQLite database.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "omni-backup-restore-hash-"));
process.env.DATA_DIR = root;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(root, "plugins");
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const { createPreMigrationBackup } =
  await import("../../src/lib/db/migrationRunner/preMigrationBackup.ts");
const { restoreDbBackup } = await import("../../src/lib/db/backup.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(root, { recursive: true, force: true });
});

test("restore rejects a valid SQLite snapshot that was changed after publication", async () => {
  const db = core.getDbInstance();
  db.exec("CREATE TABLE hash_probe(id INTEGER); INSERT INTO hash_probe VALUES (1)");
  const receipt = createPreMigrationBackup(db);
  assert.ok(receipt);
  const id = `db_state-${receipt.sha256}_pre-migration.sqlite`;

  // A second, valid database stands in for the snapshot: same id, different bytes.
  db.exec("UPDATE hash_probe SET id = 2");
  const swapped = path.join(root, "swapped.sqlite");
  await db.backup(swapped);
  fs.copyFileSync(swapped, receipt.path);

  await assert.rejects(() => restoreDbBackup(id), /content hash/);
  assert.deepEqual(core.getDbInstance().prepare("SELECT id FROM hash_probe").all(), [{ id: 2 }]);
});

test("restore still accepts an untouched content-addressed snapshot", async () => {
  const db = core.getDbInstance();
  db.exec("UPDATE hash_probe SET id = 10");
  const receipt = createPreMigrationBackup(db);
  assert.ok(receipt);
  const id = `db_state-${receipt.sha256}_pre-migration.sqlite`;

  db.exec("UPDATE hash_probe SET id = 11");
  await restoreDbBackup(id);
  assert.deepEqual(core.getDbInstance().prepare("SELECT id FROM hash_probe").all(), [{ id: 10 }]);
});
