// Sync tokens unlock GET /api/sync/bundle, which carries decrypted provider credentials and
// plaintext API keys. These tests pin who may issue one and what ends one early:
//   - a manage-scoped API key (or a CLI access token it can mint) cannot issue a sync token;
//   - the signed-in dashboard owner still can;
//   - a token linked to an API key dies when that key is deleted or revoked;
//   - a password change ends every sync token issued before it (same cutoff as sessions);
//   - tokens expire (default TTL, explicit `ttl`, bounded maximum).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sync-issuer-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-sync-issuer-secret";
process.env.INITIAL_PASSWORD = "sync-issuer-password";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const accessTokensDb = await import("../../src/lib/db/accessTokens.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const syncTokensDb = await import("../../src/lib/db/syncTokens.ts");
const syncTokensLib = await import("../../src/lib/sync/tokens.ts");
const syncTokensRoute = await import("../../src/app/api/sync/tokens/route.ts");
const syncBundleRoute = await import("../../src/app/api/sync/bundle/route.ts");
const { SESSIONS_VALID_AFTER_SETTING } =
  await import("../../src/shared/utils/dashboardSessionToken.ts");

const DAY_MS = 86_400_000;

type IssueBody = {
  token?: string;
  syncToken?: { issuedBy: string | null; syncApiKeyId: string | null; expiresAt: string };
};

function resetStorage() {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  resetStorage();
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
});

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_API_KEY_SECRET === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

function bearerRequest(url: string, token: string, body?: Record<string, unknown>) {
  return new Request(url, {
    method: body ? "POST" : "GET",
    headers: {
      authorization: `Bearer ${token}`,
      ...(body ? { "content-type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}

async function fetchBundle(syncToken: string) {
  return syncBundleRoute.GET(bearerRequest("http://localhost/api/sync/bundle", syncToken));
}

async function issueWithSession(body: Record<string, unknown>, bearer?: string) {
  const response = await syncTokensRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/sync/tokens", {
      method: "POST",
      token: bearer,
      body,
    })
  );
  return { response, body: (await response.json()) as IssueBody };
}

test("a manage-scoped API key alone cannot issue a sync token", async () => {
  const manageKey = await apiKeysDb.createApiKey("Automation", "machine-sync-issuer", ["manage"]);

  const response = await syncTokensRoute.POST(
    bearerRequest("http://localhost/api/sync/tokens", manageKey.key, { name: "exfil" })
  );

  assert.equal(response.status, 403);
  const body = (await response.json()) as IssueBody;
  assert.equal(typeof body.token, "undefined");
  assert.equal((await syncTokensDb.listSyncTokens()).length, 0);
});

test("a CLI access token (which a manage key can mint) cannot issue a sync token", async () => {
  const { secret } = accessTokensDb.createAccessToken({ name: "remote-cli", scope: "admin" });

  const response = await syncTokensRoute.POST(
    bearerRequest("http://localhost/api/sync/tokens", secret, { name: "exfil" })
  );

  assert.equal(response.status, 403);
  assert.equal((await syncTokensDb.listSyncTokens()).length, 0);
});

test("a manage-scoped API key can still list sync tokens", async () => {
  const manageKey = await apiKeysDb.createApiKey("Automation", "machine-sync-issuer", ["manage"]);
  const response = await syncTokensRoute.GET(
    bearerRequest("http://localhost/api/sync/tokens", manageKey.key)
  );
  assert.equal(response.status, 200);
});

test("the signed-in dashboard owner issues a working, expiring sync token", async () => {
  const before = Date.now();
  const { response, body } = await issueWithSession({ name: "Laptop" });

  assert.equal(response.status, 201);
  assert.match(body.token, /^osync_/);
  assert.equal(body.syncToken.issuedBy, "session");
  assert.equal(body.syncToken.syncApiKeyId, null);

  const expiresMs = Date.parse(body.syncToken.expiresAt);
  assert.ok(Number.isFinite(expiresMs), "expiresAt must be set by default");
  assert.ok(expiresMs >= before + 30 * DAY_MS - 5_000);
  assert.ok(expiresMs <= Date.now() + 30 * DAY_MS + 5_000);

  const bundle = await fetchBundle(body.token);
  assert.equal(bundle.status, 200);
});

test("an explicit ttl sets the expiry; an unbounded or malformed ttl is rejected", async () => {
  const before = Date.now();
  const { response, body } = await issueWithSession({ name: "Short", ttl: "2h" });
  assert.equal(response.status, 201);
  const expiresMs = Date.parse(body.syncToken.expiresAt);
  assert.ok(Math.abs(expiresMs - (before + 2 * 3_600_000)) < 10_000);

  for (const ttl of ["forever", "0d", "400d", "-1h"]) {
    const rejected = await issueWithSession({ name: "Bad", ttl });
    assert.equal(rejected.response.status, 400, `ttl ${ttl} must be rejected`);
  }
});

test("an expired sync token no longer opens the bundle", async () => {
  const issued = await syncTokensLib.issueSyncToken({
    name: "Expired",
    issuedBy: "session",
    expiresAt: new Date(Date.now() - 1_000).toISOString(),
  });

  assert.equal(await syncTokensLib.validateSyncToken(issued.token), null);
  assert.equal((await fetchBundle(issued.token)).status, 401);
});

test("a sync token linked to an API key dies when that key is deleted", async () => {
  const key = await apiKeysDb.createApiKey("Desktop", "machine-sync-issuer", ["manage"]);
  const { response, body } = await issueWithSession({ name: "Desktop" }, key.key);
  assert.equal(response.status, 201);
  assert.equal(body.syncToken.syncApiKeyId, key.id);
  assert.equal((await fetchBundle(body.token)).status, 200);

  assert.equal(await apiKeysDb.deleteApiKey(key.id), true);

  assert.equal((await fetchBundle(body.token)).status, 401);
});

test("a sync token linked to an API key dies when that key is revoked", async () => {
  const key = await apiKeysDb.createApiKey("Desktop", "machine-sync-issuer", ["manage"]);
  const { body } = await issueWithSession({ name: "Desktop" }, key.key);
  assert.equal((await fetchBundle(body.token)).status, 200);

  assert.equal(await apiKeysDb.revokeApiKey(key.id), true);

  assert.equal((await fetchBundle(body.token)).status, 401);
});

test("legacy key-linked tokens (issued before this fix) also die with their key", async () => {
  const key = await apiKeysDb.createApiKey("Old automation", "machine-sync-issuer", ["manage"]);
  // Shape of a row written by the old POST /api/sync/tokens for a bare manage key.
  const legacy = await syncTokensLib.issueSyncToken({
    name: "legacy",
    syncApiKeyId: key.id,
    issuedBy: null,
    expiresAt: null,
  });
  assert.ok(await syncTokensLib.validateSyncToken(legacy.token));

  await apiKeysDb.deleteApiKey(key.id);

  assert.equal(await syncTokensLib.validateSyncToken(legacy.token), null);
});

test("a password change ends every sync token issued before it", async () => {
  const { body } = await issueWithSession({ name: "Laptop" });
  const legacy = await syncTokensLib.issueSyncToken({
    name: "legacy",
    issuedBy: null,
    expiresAt: null,
  });
  assert.equal((await fetchBundle(body.token)).status, 200);
  assert.ok(await syncTokensLib.validateSyncToken(legacy.token));

  // Same cutoff the settings route writes on a password change (unix seconds, floor).
  await new Promise((resolve) => setTimeout(resolve, 1_100));
  await settingsDb.updateSettings({
    [SESSIONS_VALID_AFTER_SETTING]: Math.floor(Date.now() / 1000),
  });

  assert.equal((await fetchBundle(body.token)).status, 401);
  assert.equal(await syncTokensLib.validateSyncToken(legacy.token), null);

  // A token issued after the change works.
  const fresh = await issueWithSession({ name: "Laptop again" });
  assert.equal(fresh.response.status, 201);
  assert.equal((await fetchBundle(fresh.body.token)).status, 200);
});

test("the local CLI (authz-stamped loopback CLI token) can still issue a sync token", async () => {
  const { AUTHZ_HEADER_AUTH_KIND, AUTHZ_HEADER_AUTH_LABEL } =
    await import("../../src/server/authz/headers.ts");
  const response = await syncTokensRoute.POST(
    new Request("http://localhost/api/sync/tokens", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        [AUTHZ_HEADER_AUTH_KIND]: "management_key",
        [AUTHZ_HEADER_AUTH_LABEL]: "local-cli-token",
      },
      body: JSON.stringify({ name: "cli", ttl: "30d" }),
    })
  );
  assert.equal(response.status, 201);
  const body = (await response.json()) as IssueBody;
  assert.equal(body.syncToken?.issuedBy, "cli");
  assert.equal((await fetchBundle(body.token!)).status, 200);
});
