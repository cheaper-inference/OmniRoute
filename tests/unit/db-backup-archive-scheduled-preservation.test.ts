import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-archive-scheduled-"));
const overrides = {
  DATA_DIR: dataDir,
  SQLITE_FILE: path.join(dataDir, "storage.sqlite"),
  DB_BACKUP_MAX_FILES: "20",
  DB_BACKUP_RETENTION_DAYS: "0",
};
const savedEnv = new Map(Object.keys(overrides).map((key) => [key, process.env[key]]));
Object.assign(process.env, overrides);

const core = await import("../../src/lib/db/core.ts");
const backup = await import("../../src/lib/db/backup.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");
const databaseSettings = await import("../../src/lib/db/databaseSettings.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  for (const [key, value] of savedEnv) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test("startup and periodic cleanup preserve compressed replacements with automatic backups off", async () => {
  databaseSettings.updateDatabaseSettings({
    backup: { autoBackupEnabled: false, autoBackupFrequency: "never", keepLastNBackups: 20 },
  });
  assert.equal(backup.isAutoBackupDisabledBySetting(), true);
  const dir = path.join(dataDir, "db_backups");
  fs.mkdirSync(dir, { recursive: true });
  const archive = "db_example_pre-migration.sqlite.zst";
  const receipt = `${archive}.preservation-20260101.json`;
  const expected = new Map(
    [archive, receipt, "db_unknown.sqlite.br", "db_notes.json"].map((name) => {
      const bytes = Buffer.from(`synthetic:${name}`);
      fs.writeFileSync(path.join(dir, name), bytes);
      return [name, bytes] as const;
    })
  );

  for (const phase of ["startup", "periodic"] as const) {
    await cleanup.runScheduledCleanupPass(phase);

    assert.deepEqual(fs.readdirSync(dir).sort(), [...expected.keys()].sort(), phase);
    for (const [name, bytes] of expected) {
      assert.deepEqual(fs.readFileSync(path.join(dir, name)), bytes, `${phase}: ${name}`);
    }
  }
});
