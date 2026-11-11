// The scheduled call-log retention pass must delete the artifact files of the rows it purges.
// Before, only the request-driven orphan scanner (a few entries per rotation, started by call-log
// activity) removed them, so an idle gateway kept expired request/response bodies on disk.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { SqliteAdapter } from "../../src/lib/db/adapters/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-retention-artifacts-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");
const { getUserDatabaseSettings } = await import("../../src/lib/db/databaseSettings.ts");
const { getCallLogsDir } = await import("../../src/lib/usage/callLogArtifacts.ts");

const DAY_MS = 86_400_000;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function db() {
  return core.getDbInstance() as SqliteAdapter;
}

function seedWithArtifact(id: string, daysAgo: number): string {
  const timestamp = new Date(Date.now() - daysAgo * DAY_MS).toISOString();
  const relPath = `${timestamp.slice(0, 10)}/${id}.json`;
  const abs = path.join(getCallLogsDir()!, relPath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, "{}");
  db()
    .prepare("INSERT INTO call_logs (id, timestamp, model, artifact_relpath) VALUES (?, ?, 'm', ?)")
    .run(id, timestamp, relPath);
  return abs;
}

test("retention cleanup deletes the artifact files of the purged call_logs rows", async () => {
  const days = getUserDatabaseSettings().retention.callLogs;
  const expired = seedWithArtifact("art-old", days + 5);
  const kept = seedWithArtifact("art-new", 0);

  const result = await cleanup.cleanupCallLogs();

  assert.equal(result.errors, 0);
  assert.equal(result.deleted, 1);
  assert.equal(fs.existsSync(expired), false, "expired artifact file must be removed");
  assert.equal(fs.existsSync(kept), true, "artifact inside the retention window stays");
});

test("a failed batch keeps the artifact files of the rows that were not deleted", async () => {
  const days = getUserDatabaseSettings().retention.callLogs;
  const survivor = seedWithArtifact("art-fail", days + 5);
  db().exec(
    `CREATE TEMP TRIGGER fail_delete BEFORE DELETE ON call_logs WHEN OLD.id = 'art-fail'
     BEGIN SELECT RAISE(ABORT, 'injected delete failure'); END`
  );
  try {
    const result = await cleanup.cleanupCallLogs();
    assert.equal(result.errors, 1);
  } finally {
    db().exec("DROP TRIGGER IF EXISTS temp.fail_delete");
  }
  assert.equal(fs.existsSync(survivor), true, "row still exists, so its file must stay");
});
