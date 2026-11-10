// Restoring a backup is the destructive counterpart of exporting one: POST /api/db-backups/import
// (uploaded .sqlite) and POST /api/db-backups (stored backup id) replace the live database
// wholesale, and POST /api/settings/import-json replaces settings, connections and API keys.
// Exports became operator-only in #16680; restores must hold the same boundary:
//   - a signed-in dashboard session, or the machine-bound local CLI subject → allowed;
//   - an API key of any scope (manage / inference-only) or an `oma_` access token → 403, and
//     the live database / settings stay untouched;
//   - no credential → 401;
//   - login disabled (open instance) → allowed, same as every operator-only surface;
//   - `dryRun=true` goes through the same guard (operator-only, still mutates nothing).
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

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-restore-operator-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  DISABLE_SQLITE_AUTO_BACKUP: process.env.DISABLE_SQLITE_AUTO_BACKUP,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "restore-operator-api-key-secret";
process.env.JWT_SECRET = "restore-operator-jwt-secret";
process.env.INITIAL_PASSWORD = "restore-operator-password";
// Keep pre-restore / pre-import snapshots out of the backup dir so the stored backup id below
// is the only entry the tests reason about.
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const accessTokensDb = await import("../../src/lib/db/accessTokens.ts");
const { getSettings, updateSettings } = await import("../../src/lib/db/settings.ts");
const importRoute = await import("../../src/app/api/db-backups/import/route.ts");
const dbBackupsRoute = await import("../../src/app/api/db-backups/route.ts");
const importJsonRoute = await import("../../src/app/api/settings/import-json/route.ts");

const IMPORT_URL = "http://localhost:20128/api/db-backups/import";
const RESTORE_URL = "http://localhost:20128/api/db-backups";
const IMPORT_JSON_URL = "http://localhost:20128/api/settings/import-json";
const LIVE_SENTINEL = "live-sentinel-key";
const CANDIDATE_MARKER = "candidate-only-key";
// Settings sentinel for the JSON import: the payload flips it, a refused import must not.
const SETTINGS_SENTINEL_KEY = "showQuickStartOnHome";

await updateSettings({ requireLogin: true, [SETTINGS_SENTINEL_KEY]: true });
const manageKey = await apiKeysDb.createApiKey("manage-automation", "machine-restore", ["manage"]);
const inferenceKey = await apiKeysDb.createApiKey("inference-automation", "machine-restore", []);
const adminAccessToken = accessTokensDb.createAccessToken({ name: "remote-cli", scope: "admin" });

// Candidate database: a real, fully-migrated OmniRoute database (credentials above included)
// that carries a marker row the live database does not have, and lacks the live sentinel. It
// doubles as the upload for /import and as the stored backup for the restore-by-id route, so a
// restore that slips past the guard is visible in the live api_keys table.
await apiKeysDb.createApiKey(CANDIDATE_MARKER, "machine-restore");
const CANDIDATE_PATH = path.join(TEST_DATA_DIR, "candidate.sqlite");
core.getDbInstance().exec(`VACUUM INTO '${CANDIDATE_PATH.replace(/'/g, "''")}'`);
const CANDIDATE_BYTES = fs.readFileSync(CANDIDATE_PATH);
core.getDbInstance().prepare("DELETE FROM api_keys WHERE name = ?").run(CANDIDATE_MARKER);
await apiKeysDb.createApiKey(LIVE_SENTINEL, "machine-restore");

const BACKUP_ID = `db_${new Date().toISOString().replace(/[:.]/g, "-")}_manual.sqlite`;
fs.mkdirSync(core.DB_BACKUPS_DIR as string, { recursive: true });
fs.copyFileSync(CANDIDATE_PATH, path.join(core.DB_BACKUPS_DIR as string, BACKUP_ID));

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

type PostRoute = { POST: (request: Request) => Promise<Response> };

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

async function settingsSentinel(): Promise<unknown> {
  return ((await getSettings()) as Record<string, unknown>)[SETTINGS_SENTINEL_KEY];
}

/**
 * The live database was not replaced: its sentinel row is still there and the candidate's
 * marker row is not. `before` adds byte-for-byte equality of the file — only meaningful for
 * calls that carry no API key or access token, because validating one stamps `last_used_at`.
 */
function assertLiveDbUntouched(before?: string) {
  const names = apiKeyNames();
  assert.ok(names.includes(LIVE_SENTINEL), "the live database must keep its rows");
  assert.ok(!names.includes(CANDIDATE_MARKER), "the candidate rows must not be loaded");
  if (before !== undefined) {
    assert.equal(liveDbHash(), before, "live database file must be byte-for-byte unchanged");
  }
}

const LOCAL_CLI_STAMP = {
  "x-omniroute-auth-kind": "management_key",
  "x-omniroute-auth-label": "local-cli-token",
};

/** Raw binary upload (the CLI's transport); `dryRun` keeps a successful call side-effect free. */
function importRequest(headers: Record<string, string>, dryRun: boolean): Request {
  return new Request(dryRun ? `${IMPORT_URL}?dryRun=true` : IMPORT_URL, {
    method: "POST",
    headers: { "content-type": "application/octet-stream", ...headers },
    body: new Uint8Array(CANDIDATE_BYTES),
  });
}

function restoreRequest(headers: Record<string, string>): Request {
  return new Request(RESTORE_URL, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify({ backupId: BACKUP_ID }),
  });
}

function importJsonRequest(headers: Record<string, string>): Request {
  return new Request(IMPORT_JSON_URL, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify({ settings: { [SETTINGS_SENTINEL_KEY]: false } }),
  });
}

type Endpoint = {
  name: string;
  route: PostRoute;
  /** A request that WOULD mutate the live data if the guard let it through. */
  destructive: (headers: Record<string, string>) => Request;
  assertUntouched: (snapshot: { dbHash?: string; setting: unknown }) => void | Promise<void>;
};

const ENDPOINTS: Endpoint[] = [
  {
    name: "POST /api/db-backups/import",
    route: importRoute as unknown as PostRoute,
    destructive: (headers) => importRequest(headers, false),
    assertUntouched: ({ dbHash }) => assertLiveDbUntouched(dbHash),
  },
  {
    name: "POST /api/db-backups (restore by id)",
    route: dbBackupsRoute as unknown as PostRoute,
    destructive: restoreRequest,
    assertUntouched: ({ dbHash }) => assertLiveDbUntouched(dbHash),
  },
  {
    name: "POST /api/settings/import-json",
    route: importJsonRoute as unknown as PostRoute,
    destructive: importJsonRequest,
    assertUntouched: async ({ setting }) => {
      assert.equal(await settingsSentinel(), setting, "settings must not be replaced");
    },
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

// ─── Machine credentials: refused, nothing mutated (runs before any real restore) ───

for (const endpoint of ENDPOINTS) {
  for (const credential of MACHINE_CREDENTIALS) {
    test(`${endpoint.name}: ${credential.label} is refused with 403 and changes nothing`, async () => {
      // No byte hash here: validating the credential itself stamps `last_used_at`.
      const snapshot = { setting: await settingsSentinel() };
      assert.ok(apiKeyNames().includes(LIVE_SENTINEL), "precondition: live sentinel present");

      const response = await endpoint.route.POST(
        endpoint.destructive({ authorization: `Bearer ${credential.secret()}` })
      );
      const body = await response.json();

      assert.equal(response.status, 403, JSON.stringify(body));
      assert.match(JSON.stringify(body), credential.refusal);
      assert.ok(
        !JSON.stringify(body).includes(credential.secret()),
        "403 body must not echo the credential"
      );
      await endpoint.assertUntouched(snapshot);
    });
  }

  test(`${endpoint.name}: unauthenticated callers get 401 and nothing changes`, async () => {
    const snapshot = { dbHash: liveDbHash(), setting: await settingsSentinel() };

    const response = await endpoint.route.POST(endpoint.destructive({}));
    const body = await response.json();

    assert.equal(response.status, 401, JSON.stringify(body));
    assert.ok(!JSON.stringify(body).includes("at /"), "401 body must not leak a stack trace");
    await endpoint.assertUntouched(snapshot);
  });
}

test("POST /api/db-backups/import?dryRun=true: a manage key is refused with 403 too", async () => {
  const response = await importRoute.POST(
    importRequest({ authorization: `Bearer ${manageKey.key}` }, true)
  );
  const body = await response.json();
  assert.equal(response.status, 403, JSON.stringify(body));
  assert.notEqual(body.dryRun, true, "a refused dry run must not report a validation result");
  assertLiveDbUntouched();
});

// ─── Operator credentials: allowed (dry-run import first — it mutates nothing) ───

test("POST /api/db-backups/import?dryRun=true: a dashboard session is accepted", async () => {
  const before = liveDbHash();
  const headers = await createManagementSessionHeaders({
    "content-type": "application/octet-stream",
  });
  const response = await importRoute.POST(
    new Request(`${IMPORT_URL}?dryRun=true`, {
      method: "POST",
      headers,
      body: new Uint8Array(CANDIDATE_BYTES),
    })
  );
  const body = await response.json();
  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(body.dryRun, true);
  assertLiveDbUntouched(before);
});

test("POST /api/db-backups/import?dryRun=true: a dashboard session wins over a manage key sent alongside it", async () => {
  const headers = await createManagementSessionHeaders({
    "content-type": "application/octet-stream",
    authorization: `Bearer ${manageKey.key}`,
  });
  const response = await importRoute.POST(
    new Request(`${IMPORT_URL}?dryRun=true`, {
      method: "POST",
      headers,
      body: new Uint8Array(CANDIDATE_BYTES),
    })
  );
  assert.equal(response.status, 200);
});

test("POST /api/db-backups/import?dryRun=true: the pipeline-stamped local CLI subject is accepted", async () => {
  const response = await importRoute.POST(importRequest(LOCAL_CLI_STAMP, true));
  const body = await response.json();
  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(body.dryRun, true);
});

test("POST /api/db-backups/import?dryRun=true: with login disabled the instance is open", async () => {
  await updateSettings({ requireLogin: false });
  try {
    const response = await importRoute.POST(importRequest({}, true));
    assert.equal(response.status, 200);
  } finally {
    await updateSettings({ requireLogin: true });
  }
});

// ─── import-json: operator credentials really import (settings sentinel flips) ───

test("POST /api/settings/import-json: a dashboard session can still import", async () => {
  const response = await importJsonRoute.POST(
    await makeManagementSessionRequest(IMPORT_JSON_URL, {
      method: "POST",
      body: { settings: { [SETTINGS_SENTINEL_KEY]: false } },
    })
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal(await settingsSentinel(), false, "the import must have been applied");
  await updateSettings({ [SETTINGS_SENTINEL_KEY]: true });
});

test("POST /api/settings/import-json: the pipeline-stamped local CLI subject can import", async () => {
  const response = await importJsonRoute.POST(importJsonRequest(LOCAL_CLI_STAMP));
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal(await settingsSentinel(), false);
  await updateSettings({ [SETTINGS_SENTINEL_KEY]: true });
});

test("POST /api/settings/import-json: with login disabled the instance is open", async () => {
  await updateSettings({ requireLogin: false });
  try {
    const response = await importJsonRoute.POST(importJsonRequest({}));
    assert.equal(response.status, 200, await response.clone().text());
  } finally {
    // import-json strips requireLogin from the payload, so the toggle is still ours to reset.
    await updateSettings({ requireLogin: true, [SETTINGS_SENTINEL_KEY]: true });
  }
});

// ─── Restore by id: operator credentials really restore (runs last — it swaps the DB) ───

test("POST /api/db-backups (restore by id): a dashboard session can still restore", async () => {
  const response = await dbBackupsRoute.POST(
    (await makeManagementSessionRequest(RESTORE_URL, {
      method: "POST",
      body: { backupId: BACKUP_ID },
    })) as never
  );
  const body = await response.json();
  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(body.restored, true);
  const names = apiKeyNames();
  assert.ok(names.includes(CANDIDATE_MARKER), "the stored backup must now be live");
  assert.ok(!names.includes(LIVE_SENTINEL), "the previous live rows must be gone");
});

test("POST /api/db-backups (restore by id): the pipeline-stamped local CLI subject can restore", async () => {
  const response = await dbBackupsRoute.POST(restoreRequest(LOCAL_CLI_STAMP) as never);
  const body = await response.json();
  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(body.restored, true);
});

test("POST /api/db-backups (restore by id): with login disabled the instance is open", async () => {
  await updateSettings({ requireLogin: false });
  try {
    const response = await dbBackupsRoute.POST(restoreRequest({}) as never);
    const body = await response.json();
    assert.equal(response.status, 200, JSON.stringify(body));
  } finally {
    await updateSettings({ requireLogin: true });
  }
});
