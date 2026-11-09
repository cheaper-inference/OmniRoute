/**
 * POST /api/cli/tokens must never hand out more privilege than the caller holds.
 *
 * An `admin` access token is the top of the CLI scope hierarchy, so minting one is an
 * operator action: a dashboard session or the machine-bound local CLI credential — with
 * login disabled too, since every access token passes the always-protected tier. API keys
 * (even with `manage`/`admin` scope) and `oma_` access tokens are machine credentials that
 * can be handed to automation — they may still mint `write`/`read` tokens, but never an
 * `admin` one.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-tokens-scope-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  DISABLE_SQLITE_AUTO_BACKUP: process.env.DISABLE_SQLITE_AUTO_BACKUP,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "cli-tokens-scope-api-key-secret";
process.env.JWT_SECRET = "cli-tokens-scope-jwt-secret";
process.env.INITIAL_PASSWORD = "cli-tokens-scope-password";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const accessTokensDb = await import("../../src/lib/db/accessTokens.ts");
const { getSettings, updateSettings } = await import("../../src/lib/db/settings.ts");
const tokensRoute = await import("../../src/app/api/cli/tokens/route.ts");

await updateSettings({ requireLogin: true });
const manageKey = await apiKeysDb.createApiKey("manage-automation", "machine-cli-scope", [
  "manage",
]);
const adminScopedApiKey = await apiKeysDb.createApiKey("admin-automation", "machine-cli-scope", [
  "admin",
]);

test.after(() => {
  try {
    apiKeysDb.resetApiKeyState?.();
  } catch {}
  try {
    core.resetDbInstance();
  } catch {}
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [name, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
});

const URL_TOKENS = "http://localhost:20128/api/cli/tokens";

function mintWith(headers: Record<string, string>, body: Record<string, unknown>) {
  return tokensRoute.POST(
    new Request(URL_TOKENS, {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: JSON.stringify(body),
    })
  );
}

function liveAdminTokenNamed(name: string) {
  return accessTokensDb
    .listAccessTokens()
    .filter((t) => t.name === name && t.scope === "admin" && !t.revokedAt);
}

test("a manage-scoped API key cannot mint an admin access token", async () => {
  const res = await mintWith(
    { authorization: `Bearer ${manageKey.key}` },
    { name: "escalate-manage", scope: "admin" }
  );
  assert.equal(res.status, 403);
  const body = await res.json();
  assert.equal(body.token, undefined, "no secret is returned on refusal");
  assert.equal(liveAdminTokenNamed("escalate-manage").length, 0, "nothing was persisted");
});

test("an admin-scoped API key cannot mint an admin access token either", async () => {
  const res = await mintWith(
    { authorization: `Bearer ${adminScopedApiKey.key}` },
    { name: "escalate-admin-key", scope: "admin" }
  );
  assert.equal(res.status, 403);
  assert.equal(liveAdminTokenNamed("escalate-admin-key").length, 0);
});

test("an admin access token cannot mint another admin access token", async () => {
  const admin = accessTokensDb.createAccessToken({ name: "remote-admin", scope: "admin" });
  const res = await mintWith(
    { authorization: `Bearer ${admin.secret}` },
    { name: "escalate-oma", scope: "admin" }
  );
  assert.equal(res.status, 403);
  assert.equal(liveAdminTokenNamed("escalate-oma").length, 0);
});

test("a manage-scoped API key may still mint write and read tokens (default read)", async () => {
  const write = await mintWith(
    { authorization: `Bearer ${manageKey.key}` },
    { name: "manage-write", scope: "write" }
  );
  assert.equal(write.status, 200);
  const writeBody = await write.json();
  assert.equal(writeBody.scope, "write");
  assert.match(writeBody.token, /^oma_/);

  const dflt = await mintWith(
    { authorization: `Bearer ${manageKey.key}` },
    { name: "manage-dflt" }
  );
  assert.equal(dflt.status, 200);
  assert.equal((await dflt.json()).scope, "read");
});

test("an admin access token may still mint narrower tokens", async () => {
  const admin = accessTokensDb.createAccessToken({ name: "remote-admin-2", scope: "admin" });
  const res = await mintWith(
    { authorization: `Bearer ${admin.secret}` },
    { name: "narrower", scope: "write" }
  );
  assert.equal(res.status, 200);
  assert.equal((await res.json()).scope, "write");
});

test("a dashboard session can mint an admin access token", async () => {
  const req = await makeManagementSessionRequest(URL_TOKENS, {
    method: "POST",
    body: { name: "operator-admin", scope: "admin" },
  });
  const res = await tokensRoute.POST(req);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).scope, "admin");
});

test("the local CLI subject (pipeline-stamped) can mint an admin access token", async () => {
  const res = await mintWith(
    {
      "x-omniroute-auth-kind": "management_key",
      "x-omniroute-auth-label": "local-cli-token",
    },
    { name: "local-cli-admin", scope: "admin" }
  );
  assert.equal(res.status, 200);
  assert.equal((await res.json()).scope, "admin");
});

test("a dashboard session wins over a manage key sent alongside it", async () => {
  const req = await makeManagementSessionRequest(URL_TOKENS, {
    method: "POST",
    token: manageKey.key,
    body: { name: "operator-with-key", scope: "admin" },
  });
  const res = await tokensRoute.POST(req);
  assert.equal(res.status, 200);
});

test("with login disabled, minting still takes a credential: anonymous 401, the operator gets admin", async () => {
  await updateSettings({ requireLogin: false });
  try {
    assert.equal((await getSettings()).requireLogin, false, "open mode must stick");
    const anon = await mintWith({}, { name: "open-instance-admin", scope: "admin" });
    assert.equal(anon.status, 401);
    assert.equal(liveAdminTokenNamed("open-instance-admin").length, 0);

    const req = await makeManagementSessionRequest(URL_TOKENS, {
      method: "POST",
      body: { name: "open-instance-operator", scope: "admin" },
    });
    const res = await tokensRoute.POST(req);
    assert.equal(res.status, 200);
    assert.equal((await res.json()).scope, "admin");
  } finally {
    await updateSettings({ requireLogin: true });
  }
});

test("unauthenticated callers are still rejected before any scope decision", async () => {
  const res = await mintWith({}, { name: "anon", scope: "read" });
  assert.equal(res.status, 401);
});
