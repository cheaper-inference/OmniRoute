import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-av-fresh-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { default: Database } = await import("better-sqlite3");
const core = await import("../../src/lib/db/core.ts");

const AUTO_VACUUM_INCREMENTAL = 2;

function readDriftRecord(): unknown {
  const row = core
    .getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get("scheduler", "vacuumDrift") as { value: string } | undefined;
  return row ? JSON.parse(row.value) : undefined;
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

test("a fresh database is created in the seeded INCREMENTAL auto_vacuum mode", () => {
  core.resetDbInstance();

  const db = core.getDbInstance();

  assert.equal(db.pragma("auto_vacuum", { simple: true }), AUTO_VACUUM_INCREMENTAL);
  assert.equal(readDriftRecord(), null, "no drift to reconcile on a database made this run");
});

test("an existing NONE-mode database is not converted when it opens", () => {
  // Build a legacy database: create it, then force auto_vacuum back to NONE with a raw VACUUM.
  core.resetDbInstance();
  core.getDbInstance();
  core.resetDbInstance();
  const raw = new Database(path.join(TEST_DATA_DIR, "storage.sqlite"));
  raw.pragma("journal_mode = DELETE");
  raw.pragma("auto_vacuum = NONE");
  raw.exec("VACUUM");
  assert.equal(raw.pragma("auto_vacuum", { simple: true }), 0);
  raw.close();

  const db = core.getDbInstance();

  assert.equal(db.pragma("auto_vacuum", { simple: true }), 0);
  assert.deepEqual(readDriftRecord(), { configured: "INCREMENTAL", live: "NONE" });
});
