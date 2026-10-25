// A sync token opens GET /api/sync/bundle, which carries decrypted provider credentials and
// plaintext API keys — the same material /api/settings/export-json hands out, and that route
// stays authenticated when login is disabled. Sync token management follows the same rule:
//   - with requireLogin=false, issuing, listing and revoking still need a credential: an
//     anonymous caller gets 401 and a manage-scoped API key still gets 403 on issuance;
//   - the dashboard session and the local CLI keep issuing working tokens in open mode;
//   - a token minted by the old open-mode issuer (`issuedBy: "open"`, no credential behind it)
//     never opens the bundle, whatever the login mode is now.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sync-open-mode-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-sync-open-mode-secret";
process.env.INITIAL_PASSWORD = "sync-open-mode-password";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const syncTokensDb = await import("../../src/lib/db/syncTokens.ts");
const syncTokensLib = await import("../../src/lib/sync/tokens.ts");
const syncTokensRoute = await import("../../src/app/api/sync/tokens/route.ts");
const syncTokenByIdRoute = await import("../../src/app/api/sync/tokens/[id]/route.ts");
const syncBundleRoute = await import("../../src/app/api/sync/bundle/route.ts");
const { AUTHZ_HEADER_AUTH_KIND, AUTHZ_HEADER_AUTH_LABEL } =
  await import("../../src/server/authz/headers.ts");

type IssueBody = { token?: string; syncToken?: { id: string; issuedBy: string | null } };

const TOKENS_URL = "http://localhost/api/sync/tokens";
const ctx = (id: string) => ({ params: Promise.resolve({ id }) });

function resetStorage() {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  resetStorage();
  // setupComplete: with INITIAL_PASSWORD set, an unfinished setup forces requireLogin back on.
  await settingsDb.updateSettings({ setupComplete: true, requireLogin: false });
  assert.equal((await settingsDb.getSettings()).requireLogin, false, "open mode must stick");
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

function anonymous(url: string, method = "GET", body?: Record<string, unknown>) {
  return new Request(url, {
    method,
    headers: body ? { "content-type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
}

function withBearer(url: string, token: string, method = "GET", body?: Record<string, unknown>) {
  const request = anonymous(url, method, body);
  request.headers.set("authorization", `Bearer ${token}`);
  return request;
}

async function fetchBundle(syncToken: string) {
  return syncBundleRoute.GET(withBearer("http://localhost/api/sync/bundle", syncToken));
}

async function assertUnauthenticated(response: Response) {
  const text = await response.text();
  assert.equal(response.status, 401, `expected 401, got ${response.status}: ${text}`);
  assert.ok(!text.includes("osync_"), "a refused call must not return a sync token");
  assert.ok(!text.includes("at /"), "401 body must not leak a stack trace");
}

test("with login disabled, an anonymous caller cannot issue a sync token", async () => {
  await assertUnauthenticated(
    await syncTokensRoute.POST(anonymous(TOKENS_URL, "POST", { name: "anon", ttl: "30d" }))
  );
  assert.equal((await syncTokensDb.listSyncTokens()).length, 0, "nothing may be persisted");
});

test("with login disabled, a manage-scoped API key still cannot issue a sync token", async () => {
  const key = await apiKeysDb.createApiKey("automation", "machine-sync-open", ["manage"]);
  const response = await syncTokensRoute.POST(
    withBearer(TOKENS_URL, key.key, "POST", { name: "key", ttl: "30d" })
  );
  assert.equal(response.status, 403);
  assert.equal((await syncTokensDb.listSyncTokens()).length, 0);
});

test("with login disabled, the dashboard session still issues a working sync token", async () => {
  const response = await syncTokensRoute.POST(
    await makeManagementSessionRequest(TOKENS_URL, {
      method: "POST",
      body: { name: "session", ttl: "30d" },
    })
  );
  assert.equal(response.status, 201);
  const body = (await response.json()) as IssueBody;
  assert.equal(body.syncToken?.issuedBy, "session");
  assert.equal((await fetchBundle(body.token!)).status, 200);
});

test("with login disabled, the local CLI still issues a working sync token", async () => {
  const response = await syncTokensRoute.POST(
    new Request(TOKENS_URL, {
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

test("with login disabled, anonymous callers cannot list or revoke sync tokens", async () => {
  const issued = await syncTokensLib.issueSyncToken({ name: "target", issuedBy: "session" });
  await assertUnauthenticated(await syncTokensRoute.GET(anonymous(TOKENS_URL)));
  await assertUnauthenticated(
    await syncTokenByIdRoute.DELETE(
      anonymous(`${TOKENS_URL}/${issued.record.id}`, "DELETE"),
      ctx(issued.record.id)
    )
  );
  const after = await syncTokensDb.getSyncTokenById(issued.record.id);
  assert.ok(after && !after.revokedAt, "an anonymous DELETE must not revoke the token");
  assert.equal((await fetchBundle(issued.token)).status, 200, "the token keeps working");
});

for (const requireLogin of [false, true]) {
  test(`a token minted by the open-mode issuer never opens the bundle (requireLogin=${requireLogin})`, async () => {
    const legacy = await syncTokensLib.issueSyncToken({ name: "legacy-open", issuedBy: "open" });
    await settingsDb.updateSettings({ requireLogin });
    // A provider credential and a manage key created afterwards must not leak through it.
    await apiKeysDb.createApiKey("created-after", "machine-after", ["manage"]);
    const response = await fetchBundle(legacy.token);
    assert.equal(response.status, 401);
    const text = await response.text();
    assert.ok(!text.includes("bundle"), "a refused bundle call must not return the bundle");
  });
}

test("tokens issued by a session or the CLI are unaffected by the open-mode cutoff", async () => {
  for (const issuedBy of ["session", "cli", "internal", null]) {
    const issued = await syncTokensLib.issueSyncToken({ name: `ok-${issuedBy}`, issuedBy });
    assert.equal((await fetchBundle(issued.token)).status, 200, `issuedBy=${issuedBy}`);
  }
});
