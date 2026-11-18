import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createManagementSessionHeaders } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-import-snapshot-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "import-snapshot-api-key-secret";
process.env.JWT_SECRET = "import-snapshot-jwt-secret";
process.env.INITIAL_PASSWORD = "import-snapshot-password";
// Routine backups are off: the import snapshot must be taken anyway.
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const backupDb = await import("../../src/lib/db/backup.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const importRoute = await import("../../src/app/api/db-backups/import/route.ts");

function insertConnection(id: string) {
  const now = new Date().toISOString();
  core
    .getDbInstance()
    .prepare(
      "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(id, "openai", "apikey", id, 1, now, now);
}

function connectionCount(): number {
  const row = core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS cnt FROM provider_connections")
    .get();
  return (row as { cnt: number }).cnt;
}

// Candidate: a real migrated database with ONE connection. Live: the same schema with 30.
await updateSettings({ requireLogin: true });
insertConnection("candidate-conn");
const CANDIDATE_PATH = path.join(TEST_DATA_DIR, "candidate.sqlite");
core.getDbInstance().exec(`VACUUM INTO '${CANDIDATE_PATH.replace(/'/g, "''")}'`);
const CANDIDATE_BYTES = fs.readFileSync(CANDIDATE_PATH);
core.getDbInstance().prepare("DELETE FROM provider_connections").run();
for (let i = 0; i < 30; i++) insertConnection(`live-conn-${i}`);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function postImport(): Promise<Response> {
  const headers = await createManagementSessionHeaders({
    "content-type": "application/octet-stream",
  });
  return importRoute.POST(
    new Request("http://localhost:20128/api/db-backups/import", {
      method: "POST",
      headers,
      body: new Uint8Array(CANDIDATE_BYTES),
    })
  );
}

test("import aborts and keeps the live database when the safety snapshot fails", async () => {
  const db = core.getDbInstance();
  const originalBackup = db.backup;
  db.backup = async () => {
    throw new Error("disk full");
  };
  let response: Response;
  try {
    response = await postImport();
  } finally {
    db.backup = originalBackup;
  }

  assert.equal(response.status, 500, await response.clone().text());
  assert.equal(connectionCount(), 30, "live rows must survive an import whose snapshot failed");
});

test("import takes a complete snapshot of the live database first, even with routine backups off", async () => {
  const response = await postImport();
  assert.equal(response.status, 200, await response.clone().text());

  assert.equal(connectionCount(), 1, "the candidate must now be live");
  const snapshots = (await backupDb.listDbBackups()).filter((b) => b.reason === "pre-import");
  assert.equal(snapshots.length, 1, "exactly one pre-import snapshot");
  assert.equal(snapshots[0].connectionCount, 30, "the snapshot holds the pre-import rows");
});
