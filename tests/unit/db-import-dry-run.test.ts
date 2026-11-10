// POST /api/db-backups/import replaces the live SQLite database wholesale. `omniroute sync
// import --dry-run` sent `?dryRun=true`, but the route never read it — so a "dry run"
// replaced the operator's database (data loss). These tests drive the real route handler
// against an isolated DATA_DIR and pin:
//   - `dryRun=true` (query or multipart field) validates the upload and reports what WOULD be
//     imported, but leaves the live database byte-for-byte untouched;
//   - an invalid upload in dry-run mode is still a 400, with no side effect;
//   - a real import (no dryRun) keeps replacing the database, as before;
//   - the machine-bound local CLI credential (pipeline stamp) is accepted, so
//     `omniroute sync import` on the server host does not need a manage-scoped API key.
import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  createManagementSessionHeaders,
  makeManagementSessionRequest,
} from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-import-dry-run-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "db-import-dry-run-api-key-secret";
process.env.JWT_SECRET = "db-import-dry-run-jwt-secret";
process.env.INITIAL_PASSWORD = "db-import-dry-run-password";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const importRoute = await import("../../src/app/api/db-backups/import/route.ts");

const IMPORT_URL = "http://localhost:20128/api/db-backups/import";
const LIVE_SENTINEL = "live-sentinel-key";
const CANDIDATE_MARKER = "candidate-only-key";

await updateSettings({ requireLogin: true });

// Candidate backup: a real, fully-migrated OmniRoute database that carries a marker row the
// live database does not have (and lacks the live sentinel).
await apiKeysDb.createApiKey(CANDIDATE_MARKER, "machine-import");
const CANDIDATE_PATH = path.join(TEST_DATA_DIR, "candidate.sqlite");
core.getDbInstance().exec(`VACUUM INTO '${CANDIDATE_PATH.replace(/'/g, "''")}'`);
const CANDIDATE_BYTES = fs.readFileSync(CANDIDATE_PATH);
core.getDbInstance().prepare("DELETE FROM api_keys WHERE name = ?").run(CANDIDATE_MARKER);
await apiKeysDb.createApiKey(LIVE_SENTINEL, "machine-import");

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function apiKeyNames(): string[] {
  const rows = core.getDbInstance().prepare("SELECT name FROM api_keys").all() as Array<{
    name: string;
  }>;
  return rows.map((row) => row.name);
}

function liveDbHash(): string {
  core.getDbInstance().exec("PRAGMA wal_checkpoint(TRUNCATE)");
  return crypto
    .createHash("sha256")
    .update(fs.readFileSync(core.SQLITE_FILE as string))
    .digest("hex");
}

// Raw binary upload (the CLI's transport). Built by hand: the session helper JSON-serializes
// any non-string body, which would mangle the SQLite bytes.
async function sessionUpload(url: string, body: Buffer) {
  const headers = await createManagementSessionHeaders({
    "content-type": "application/octet-stream",
  });
  return new Request(url, { method: "POST", headers, body: new Uint8Array(body) });
}

test("dryRun=true validates the upload but leaves the live database untouched", async () => {
  const before = liveDbHash();
  assert.ok(apiKeyNames().includes(LIVE_SENTINEL), "precondition: live sentinel present");

  const response = await importRoute.POST(
    await sessionUpload(`${IMPORT_URL}?dryRun=true`, CANDIDATE_BYTES)
  );
  const body = await response.json();

  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(body.dryRun, true);
  assert.equal(body.valid, true);
  assert.notEqual(body.imported, true, "a dry run must never report an import");
  assert.equal(body.apiKeyCount, 1, "the summary describes the UPLOADED database");
  assert.equal(typeof body.connectionCount, "number");
  assert.equal(typeof body.comboCount, "number");

  const names = apiKeyNames();
  assert.ok(names.includes(LIVE_SENTINEL), "dry run must not replace the live database");
  assert.ok(!names.includes(CANDIDATE_MARKER), "dry run must not load the candidate rows");
  assert.equal(liveDbHash(), before, "live database file must be byte-for-byte unchanged");
});

test("dryRun as a multipart form field is honoured too", async () => {
  const before = liveDbHash();
  const form = new FormData();
  form.append("file", new File([CANDIDATE_BYTES], "candidate.sqlite"));
  form.append("dryRun", "true");

  const response = await importRoute.POST(
    await makeManagementSessionRequest(IMPORT_URL, { method: "POST", body: form })
  );
  const body = await response.json();

  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(body.dryRun, true);
  assert.equal(body.filename, "candidate.sqlite");
  assert.ok(apiKeyNames().includes(LIVE_SENTINEL));
  assert.equal(liveDbHash(), before);
});

test("dryRun with an invalid upload is a 400 and changes nothing", async () => {
  const before = liveDbHash();
  const notSqlite = Buffer.alloc(8192, 0x41);

  const response = await importRoute.POST(
    await sessionUpload(`${IMPORT_URL}?dryRun=true`, notSqlite)
  );
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.ok(!JSON.stringify(body).includes("at /"), "400 body must not leak a stack trace");
  assert.ok(apiKeyNames().includes(LIVE_SENTINEL));
  assert.equal(liveDbHash(), before);
});

test("unauthenticated callers get 401 (dry run is not an auth bypass)", async () => {
  const response = await importRoute.POST(
    new Request(`${IMPORT_URL}?dryRun=true`, {
      method: "POST",
      headers: { "content-type": "application/octet-stream" },
      body: CANDIDATE_BYTES,
    })
  );
  assert.equal(response.status, 401);
  assert.ok(apiKeyNames().includes(LIVE_SENTINEL));
});

test("the pipeline-stamped local CLI subject is accepted (dry run)", async () => {
  const response = await importRoute.POST(
    new Request(`${IMPORT_URL}?dryRun=true`, {
      method: "POST",
      headers: {
        "content-type": "application/octet-stream",
        "x-omniroute-auth-kind": "management_key",
        "x-omniroute-auth-label": "local-cli-token",
      },
      body: CANDIDATE_BYTES,
    })
  );
  const body = await response.json();
  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(body.dryRun, true);
  assert.ok(apiKeyNames().includes(LIVE_SENTINEL));
});

// Runs last: it really replaces the database.
test("a real import (no dryRun) still replaces the live database", async () => {
  const response = await importRoute.POST(await sessionUpload(IMPORT_URL, CANDIDATE_BYTES));
  const body = await response.json();

  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(body.imported, true);
  assert.notEqual(body.dryRun, true);
  const names = apiKeyNames();
  assert.ok(names.includes(CANDIDATE_MARKER), "the uploaded database must now be live");
  assert.ok(!names.includes(LIVE_SENTINEL), "the previous live rows must be gone");
});
