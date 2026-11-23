// Destroying restore points is the other destructive side of the backup surface. Restoring one
// became operator-only in #16899; pruning them must hold the same boundary:
//   - DELETE /api/db-backups (cleanup: keep the latest N / drop older than D days) deletes every
//     stored backup but the ones retained — with `keepLatest: 1` a single call leaves one;
//   - PATCH /api/db-backups persists the SAME retention values, and `backupDbFile()` runs
//     `cleanupDbBackups()` with those persisted values after every automatic backup, so a
//     machine credential that may PATCH `keepLatest: 1` prunes everything on the next snapshot
//     without ever calling DELETE. Both handlers therefore share one gate.
// Matrix per handler:
//   - no credential → 401, retention settings and backup files untouched;
//   - an API key of any scope (manage / inference-only) or an `oma_` access token → 403, and
//     the retention settings read back unchanged and every seeded backup file still exists;
//   - a signed-in dashboard session, the pipeline-stamped local CLI subject, or login disabled
//     → 200 and the handler really does its job.
// GET (list) and PUT (manual backup) are NOT destructive and keep ordinary management auth: a
// manage key still gets 200 there.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  createManagementSessionHeaders,
  makeManagementSessionRequest,
} from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cleanup-operator-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  DISABLE_SQLITE_AUTO_BACKUP: process.env.DISABLE_SQLITE_AUTO_BACKUP,
  DB_BACKUP_MAX_FILES: process.env.DB_BACKUP_MAX_FILES,
  DB_BACKUP_RETENTION_DAYS: process.env.DB_BACKUP_RETENTION_DAYS,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "cleanup-operator-api-key-secret";
process.env.JWT_SECRET = "cleanup-operator-jwt-secret";
process.env.INITIAL_PASSWORD = "cleanup-operator-password";
// No pre-write snapshots: the seeded files below are the only backups the tests reason about.
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
// The env overrides would hide the persisted values the handlers write.
delete process.env.DB_BACKUP_MAX_FILES;
delete process.env.DB_BACKUP_RETENTION_DAYS;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const accessTokensDb = await import("../../src/lib/db/accessTokens.ts");
const backupDb = await import("../../src/lib/db/backup.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/db-backups/route.ts");

const URL = "http://localhost:20128/api/db-backups";
const BACKUP_DIR = core.DB_BACKUPS_DIR as string;
// Four stored restore points, each older than any retention window the tests send, so a
// `keepLatest: 1` / `retentionDays: 1` cleanup that slips past the guard is visible on disk.
const SEEDED_BACKUPS = [
  "db_2026-03-01T00-00-00-000Z_manual.sqlite",
  "db_2026-03-02T00-00-00-000Z_manual.sqlite",
  "db_2026-03-03T00-00-00-000Z_auto.sqlite",
  "db_2026-03-04T00-00-00-000Z_manual.sqlite",
];
// Retention the instance starts with — distinct from every value a request below carries.
const INITIAL_KEEP_LATEST = 15;
const INITIAL_RETENTION_DAYS = 30;

await updateSettings({ requireLogin: true });
const manageKey = await apiKeysDb.createApiKey("manage-automation", "machine-cleanup", ["manage"]);
const inferenceKey = await apiKeysDb.createApiKey("inference-automation", "machine-cleanup", []);
const adminAccessToken = accessTokensDb.createAccessToken({ name: "remote-cli", scope: "admin" });

backupDb.setDbBackupMaxFiles(INITIAL_KEEP_LATEST);
backupDb.setDbBackupRetentionDays(INITIAL_RETENTION_DAYS);

fs.mkdirSync(BACKUP_DIR, { recursive: true });
SEEDED_BACKUPS.forEach((filename, index) => {
  const file = path.join(BACKUP_DIR, filename);
  fs.writeFileSync(file, `restore-point-${index}`);
  const mtime = new Date(Date.now() - (40 - index) * 24 * 60 * 60 * 1000);
  fs.utimesSync(file, mtime, mtime);
});

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

type Handler = (request: Request) => Promise<Response>;

function retentionSettings(): { keepLatest: number; retentionDays: number } {
  return {
    keepLatest: backupDb.getDbBackupMaxFiles(),
    retentionDays: backupDb.getDbBackupRetentionDays(),
  };
}

function storedBackups(): string[] {
  return fs
    .readdirSync(BACKUP_DIR)
    .filter((name) => name.startsWith("db_") && name.endsWith(".sqlite"))
    .sort();
}

function jsonRequest(method: string, headers: Record<string, string>, body: unknown): Request {
  return new Request(URL, {
    method,
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

const LOCAL_CLI_STAMP = {
  "x-omniroute-auth-kind": "management_key",
  "x-omniroute-auth-label": "local-cli-token",
};

type Endpoint = {
  name: string;
  handler: Handler;
  /** A request that WOULD prune (or arm the pruning of) the restore points if let through. */
  destructive: (headers: Record<string, string>) => Request;
};

const ENDPOINTS: Endpoint[] = [
  {
    name: "DELETE /api/db-backups (cleanup)",
    handler: route.DELETE as unknown as Handler,
    destructive: (headers) => jsonRequest("DELETE", headers, { keepLatest: 1, retentionDays: 1 }),
  },
  {
    name: "PATCH /api/db-backups (retention settings)",
    handler: route.PATCH as unknown as Handler,
    destructive: (headers) => jsonRequest("PATCH", headers, { keepLatest: 1, retentionDays: 1 }),
  },
];

// Credentials that pass management auth (manage key, admin oma_ token) are refused by the
// operator guard with its own message; an inference-only key never gets that far — the
// management guard refuses it first ("lacks 'manage' scope"). Both are 403.
const MACHINE_CREDENTIALS: Array<{ label: string; secret: () => string; refusal: RegExp }> = [
  { label: "a manage-scoped API key", secret: () => manageKey.key, refusal: /dashboard session/i },
  {
    label: "an inference-only API key (no manage scope)",
    secret: () => inferenceKey.key,
    refusal: /manage/i,
  },
  {
    label: "an admin oma_ access token",
    secret: () => adminAccessToken.secret,
    refusal: /dashboard session/i,
  },
];

function assertNothingChanged() {
  assert.deepEqual(
    retentionSettings(),
    { keepLatest: INITIAL_KEEP_LATEST, retentionDays: INITIAL_RETENTION_DAYS },
    "retention settings must read back unchanged"
  );
  assert.deepEqual(storedBackups(), SEEDED_BACKUPS, "every stored backup must still exist");
}

// ─── Machine credentials: refused, nothing pruned, nothing persisted ───

for (const endpoint of ENDPOINTS) {
  for (const credential of MACHINE_CREDENTIALS) {
    test(`${endpoint.name}: ${credential.label} is refused with 403 and changes nothing`, async () => {
      assertNothingChanged();

      const response = await endpoint.handler(
        endpoint.destructive({ authorization: `Bearer ${credential.secret()}` })
      );
      const body = await response.json();

      assert.equal(response.status, 403, JSON.stringify(body));
      assert.match(JSON.stringify(body), credential.refusal);
      assert.ok(
        !JSON.stringify(body).includes(credential.secret()),
        "403 body must not echo the credential"
      );
      assertNothingChanged();
    });
  }

  test(`${endpoint.name}: unauthenticated callers get 401 and nothing changes`, async () => {
    const response = await endpoint.handler(endpoint.destructive({}));
    const body = await response.json();

    assert.equal(response.status, 401, JSON.stringify(body));
    assert.ok(!JSON.stringify(body).includes("at /"), "401 body must not leak a stack trace");
    assertNothingChanged();
  });
}

// ─── Non-destructive siblings keep management auth: a manage key still works ───

test("GET /api/db-backups: a manage-scoped API key still lists backups (200)", async () => {
  const response = await (route.GET as unknown as Handler)(
    new Request(URL, { headers: { authorization: `Bearer ${manageKey.key}` } })
  );
  const body = await response.json();
  assert.equal(response.status, 200, JSON.stringify(body));
  assert.ok(Array.isArray(body.backups), "the list must be returned");
});

// ─── Operator credentials: PATCH really persists (and never prunes) ───

test("PATCH /api/db-backups: a dashboard session saves the retention settings", async () => {
  const response = await (route.PATCH as unknown as Handler)(
    await makeManagementSessionRequest(URL, {
      method: "PATCH",
      body: { keepLatest: 7, retentionDays: 3 },
    })
  );
  const body = await response.json();
  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(body.saved, true);
  assert.deepEqual(retentionSettings(), { keepLatest: 7, retentionDays: 3 });
  assert.deepEqual(storedBackups(), SEEDED_BACKUPS, "PATCH never prunes");
});

test("PATCH /api/db-backups: a dashboard session wins over a manage key sent alongside it", async () => {
  const headers = await createManagementSessionHeaders({
    "content-type": "application/json",
    authorization: `Bearer ${manageKey.key}`,
  });
  const response = await (route.PATCH as unknown as Handler)(
    new Request(URL, { method: "PATCH", headers, body: JSON.stringify({ keepLatest: 6 }) })
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal(retentionSettings().keepLatest, 6);
});

test("PATCH /api/db-backups: the pipeline-stamped local CLI subject saves the settings", async () => {
  const response = await (route.PATCH as unknown as Handler)(
    jsonRequest("PATCH", LOCAL_CLI_STAMP, { keepLatest: 5, retentionDays: 2 })
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.deepEqual(retentionSettings(), { keepLatest: 5, retentionDays: 2 });
});

test("PATCH /api/db-backups: with login disabled the instance is open", async () => {
  await updateSettings({ requireLogin: false });
  try {
    const response = await (route.PATCH as unknown as Handler)(
      jsonRequest("PATCH", {}, { keepLatest: INITIAL_KEEP_LATEST, retentionDays: 0 })
    );
    assert.equal(response.status, 200, await response.clone().text());
    assert.deepEqual(retentionSettings(), { keepLatest: INITIAL_KEEP_LATEST, retentionDays: 0 });
  } finally {
    await updateSettings({ requireLogin: true });
  }
});

// ─── Operator credentials: DELETE really prunes (runs last — it removes the seeded files) ───

test("DELETE /api/db-backups: a dashboard session prunes down to the requested count", async () => {
  const response = await (route.DELETE as unknown as Handler)(
    await makeManagementSessionRequest(URL, {
      method: "DELETE",
      body: { keepLatest: 2, retentionDays: 0 },
    })
  );
  const body = await response.json();
  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(body.cleaned, true);
  assert.equal(body.keepLatest, 2);
  assert.deepEqual(storedBackups(), SEEDED_BACKUPS.slice(-2), "only the newest two remain");
  assert.deepEqual(retentionSettings(), { keepLatest: 2, retentionDays: 0 });
});

test("DELETE /api/db-backups: the pipeline-stamped local CLI subject can prune", async () => {
  const response = await (route.DELETE as unknown as Handler)(
    jsonRequest("DELETE", LOCAL_CLI_STAMP, { keepLatest: 1 })
  );
  const body = await response.json();
  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(body.cleaned, true);
  assert.deepEqual(storedBackups(), SEEDED_BACKUPS.slice(-1), "only the newest remains");
});

test("DELETE /api/db-backups: with login disabled the instance is open", async () => {
  await updateSettings({ requireLogin: false });
  try {
    const response = await (route.DELETE as unknown as Handler)(jsonRequest("DELETE", {}, {}));
    const body = await response.json();
    assert.equal(response.status, 200, JSON.stringify(body));
    assert.equal(body.cleaned, true);
  } finally {
    await updateSettings({ requireLogin: true });
  }
});

// ─── PUT (manual backup) keeps management auth — last: it writes a real snapshot ───

test("PUT /api/db-backups: a manage-scoped API key still creates a manual backup (200)", async () => {
  const response = await (route.PUT as unknown as Handler)(
    new Request(URL, { method: "PUT", headers: { authorization: `Bearer ${manageKey.key}` } })
  );
  const body = await response.json();
  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(body.created, true, "a manual backup is not destructive and stays reachable");
  // db.backup() completes asynchronously — wait for the file so the teardown does not race it.
  const file = path.join(BACKUP_DIR, body.filename);
  const deadline = Date.now() + 15_000;
  while (!fs.existsSync(file) && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  assert.ok(fs.existsSync(file), "the manual backup must land on disk");
});
