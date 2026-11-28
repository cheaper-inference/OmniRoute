import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-call-log-overflow-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { cleanupOverflowCallLogFiles } = await import("../../src/lib/usage/callLogRotation.ts");
const { getCallLogsDir } = await import("../../src/lib/usage/callLogArtifacts.ts");

const FULL_ORDER_SCAN = /ORDER BY timestamp DESC, id DESC/;

function insertArtifactRows(count: number) {
  const db = core.getDbInstance();
  const logsDir = getCallLogsDir()!;
  fs.mkdirSync(path.join(logsDir, "d"), { recursive: true });
  const insert = db.prepare(
    "INSERT INTO call_logs (id, timestamp, status, detail_state, artifact_relpath) VALUES (?, ?, 200, 'ready', ?)"
  );
  for (let i = 0; i < count; i++) {
    const rel = `d/${i}.json`;
    fs.writeFileSync(path.join(logsDir, rel), "{}");
    insert.run(`id${i}`, new Date(Date.UTC(2026, 0, 1, 0, 0, i)).toISOString(), rel);
  }
}

// Records every SQL string the DB handle prepares while fn runs.
function recordPreparedSql(fn: () => void): string[] {
  const db = core.getDbInstance() as unknown as { prepare: (sql: string) => unknown };
  const original = db.prepare.bind(db);
  const seen: string[] = [];
  db.prepare = (sql: string) => {
    seen.push(sql);
    return original(sql);
  };
  try {
    fn();
  } finally {
    delete (db as { prepare?: unknown }).prepare;
  }
  return seen;
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("overflow cleanup skips the ordered table scan when artifact rows fit the limit", () => {
  insertArtifactRows(3);

  const sql = recordPreparedSql(() => {
    assert.equal(cleanupOverflowCallLogFiles(getCallLogsDir(), 5), 0);
  });

  assert.deepEqual(
    sql.filter((s) => FULL_ORDER_SCAN.test(s)),
    [],
    "no overflow: the timestamp-ordered scan must not run"
  );
});

test("overflow cleanup still removes the oldest artifacts beyond the limit", () => {
  insertArtifactRows(5);
  const logsDir = getCallLogsDir()!;

  assert.equal(cleanupOverflowCallLogFiles(logsDir, 3), 2);

  const kept = (
    core
      .getDbInstance()
      .prepare("SELECT id FROM call_logs WHERE artifact_relpath IS NOT NULL ORDER BY id")
      .all() as Array<{ id: string }>
  ).map((r) => r.id);
  assert.deepEqual(kept, ["id2", "id3", "id4"]);
  assert.equal(fs.existsSync(path.join(logsDir, "d/0.json")), false);
  assert.equal(fs.existsSync(path.join(logsDir, "d/4.json")), true);
});
