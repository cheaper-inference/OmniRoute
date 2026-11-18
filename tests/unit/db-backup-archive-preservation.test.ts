import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { collectBackupFamilies, pruneBackupDirectory } from "../../src/lib/db/backupRetention.ts";

function fixture(t: test.TestContext) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-archive-retention-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const write = (name: string, daysOld = 0) => {
    const file = path.join(dir, name);
    fs.writeFileSync(file, `synthetic:${name}`);
    const time = new Date(Date.now() - daysOld * 86_400_000);
    fs.utimesSync(file, time, time);
    return fs.readFileSync(file);
  };
  return { dir, write };
}

const archive = "db_example_pre-migration.sqlite.zst";
const receipt = `${archive}.preservation-20260101.json`;

test("compressed replacements and preservation receipts survive repeated age-disabled cleanup", (t) => {
  const { dir, write } = fixture(t);
  const expected = new Map([archive, receipt].map((name) => [name, write(name, 90)]));

  for (let pass = 0; pass < 2; pass++) {
    const result = pruneBackupDirectory({ backupDir: dir, maxFiles: 20, retentionDays: 0 });
    assert.equal(result.deletedFiles, 0);
    assert.equal(result.keptBackupFamilies, 1);
    for (const [name, bytes] of expected) {
      assert.deepEqual(fs.readFileSync(path.join(dir, name)), bytes);
    }
  }
});

test("a compressed archive and its dated receipts form one primary family", (t) => {
  const { dir, write } = fixture(t);
  const secondReceipt = `${archive}.preservation-20260102.json`;
  [archive, receipt, secondReceipt].forEach((name) => write(name));

  const families = collectBackupFamilies(dir);
  assert.equal(families.length, 1);
  assert.equal(families[0].base, archive);
  assert.equal(families[0].hasPrimary, true);
  assert.deepEqual(families[0].files.sort(), [archive, receipt, secondReceipt].sort());
});

test("unknown db-prefixed formats remain outside count, age and orphan retention", (t) => {
  const { dir, write } = fixture(t);
  const unknown = [
    "db_notes.json",
    "db_future.sqlite.br",
    "db_future.sqlite.br.preservation-20260101.json",
    "db_unrelated-wal",
    "db_unrelated-journal",
    `${archive}.preservation-custom.json`,
    `${archive}.partial`,
  ];
  const expected = unknown.map((name) => [name, write(name, 90)] as const);
  write("db_expired.sqlite", 90);
  write("db_new.sqlite");

  const result = pruneBackupDirectory({ backupDir: dir, maxFiles: 1, retentionDays: 1 });
  assert.equal(result.deletedFiles, 1);
  assert.equal(result.deletedBackupFamilies, 1);
  for (const [name, bytes] of expected) {
    assert.deepEqual(fs.readFileSync(path.join(dir, name)), bytes);
  }
  assert.deepEqual(
    collectBackupFamilies(dir).map((family) => family.base),
    ["db_new.sqlite"]
  );
});

test("count retention prunes archive receipts together and counts only primary families", (t) => {
  const { dir, write } = fixture(t);
  [archive, receipt].forEach((name) => write(name, 2));
  write("db_new.sqlite");

  const result = pruneBackupDirectory({ backupDir: dir, maxFiles: 1, retentionDays: 0 });
  assert.equal(result.deletedBackupFamilies, 1);
  assert.equal(result.deletedFiles, 2);
  assert.equal(result.keptBackupFamilies, 1);
  assert.deepEqual(fs.readdirSync(dir), ["db_new.sqlite"]);
});

test("age retention prunes a compressed family but keeps a recent archive", (t) => {
  const { dir, write } = fixture(t);
  [archive, receipt].forEach((name) => write(name, 90));
  write("db_recent.sqlite.zst");

  const result = pruneBackupDirectory({ backupDir: dir, maxFiles: 20, retentionDays: 30 });
  assert.equal(result.deletedBackupFamilies, 1);
  assert.equal(result.deletedFiles, 2);
  assert.deepEqual(fs.readdirSync(dir), ["db_recent.sqlite.zst"]);
});

test("a preservation receipt without its archive is not an orphaned SQLite sidecar", (t) => {
  const { dir, write } = fixture(t);
  const bytes = write(receipt, 90);

  const result = pruneBackupDirectory({ backupDir: dir, maxFiles: 1, retentionDays: 0 });
  assert.equal(result.deletedFiles, 0);
  assert.deepEqual(fs.readFileSync(path.join(dir, receipt)), bytes);
});

test("ordinary SQLite families still prune overflow and orphaned sidecars", (t) => {
  const { dir, write } = fixture(t);
  const old = "db_old.sqlite";
  [old, `${old}-wal`, `${old}-shm`, `${old}-journal`].forEach((name) => write(name, 2));
  write("db_orphan.sqlite-wal");
  write("db_orphan.sqlite-shm");
  write("db_orphan.sqlite-journal");
  write("db_new.sqlite");
  write("db_new.sqlite-wal");

  const result = pruneBackupDirectory({ backupDir: dir, maxFiles: 1, retentionDays: 0 });
  assert.equal(result.deletedBackupFamilies, 2);
  assert.equal(result.deletedFiles, 7);
  assert.deepEqual(fs.readdirSync(dir).sort(), ["db_new.sqlite", "db_new.sqlite-wal"]);
});

test("foreign directories and symlink entries are never flat backup families", (t) => {
  const { dir, write } = fixture(t);
  fs.mkdirSync(path.join(dir, "db_foreign.sqlite"));
  const bytes = write("foreign-data");
  fs.symlinkSync("foreign-data", path.join(dir, archive));
  fs.symlinkSync("missing", path.join(dir, "db_dangling.sqlite"));

  assert.deepEqual(collectBackupFamilies(dir), []);
  assert.equal(
    pruneBackupDirectory({ backupDir: dir, maxFiles: 1, retentionDays: 1 }).deletedFiles,
    0
  );
  assert.ok(fs.lstatSync(path.join(dir, archive)).isSymbolicLink());
  assert.deepEqual(fs.readFileSync(path.join(dir, "foreign-data")), bytes);
});
