// Replacing the management password hands over the operator identity: whoever knows the new
// password gets a real dashboard session, and a session passes every operator-only boundary
// (sync-token issuance, credential export) that refuses the same machine credential directly.
// POST /api/settings/require-login must therefore, once a password exists:
//   - accept only operator credentials (dashboard session, local CLI, open instance) — API keys
//     of any scope and `oma_` access tokens get 403;
//   - make a dashboard session prove it knows the current password before replacing it (403
//     when `currentPassword` is missing or wrong), while the machine-bound local CLI and an open
//     instance keep the recovery path (no `currentPassword`);
//   - keep the requireLogin toggle and the first-run bootstrap window (no password yet) as-is.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-require-login-operator-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  OMNIROUTE_DISABLE_REDIS_AUTH_CACHE: process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "require-login-operator-api-key-secret";
process.env.JWT_SECRET = "require-login-operator-jwt-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const accessTokensDb = await import("../../src/lib/db/accessTokens.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const managementPassword = await import("../../src/lib/auth/managementPassword.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const route = await import("../../src/app/api/settings/require-login/route.ts");
const loginRoute = await import("../../src/app/api/auth/login/route.ts");

const ROUTE_URL = "http://localhost:20128/api/settings/require-login";
const CURRENT_PASSWORD = "operator-current-secret";
const NEW_PASSWORD = "operator-rotated-secret";
const CURRENT_HASH = await managementPassword.hashManagementPassword(CURRENT_PASSWORD);
const LOCAL_CLI_HEADERS = {
  "x-omniroute-auth-kind": "management_key",
  "x-omniroute-auth-label": "local-cli-token",
};

await settingsDb.updateSettings({
  requireLogin: true,
  setupComplete: true,
  password: CURRENT_HASH,
});
const manageKey = await apiKeysDb.createApiKey("manage-automation", "machine-login", ["manage"]);
const adminKey = await apiKeysDb.createApiKey("admin-automation", "machine-login", ["admin"]);
const inferenceKey = await apiKeysDb.createApiKey("inference-only", "machine-login", []);
const adminToken = accessTokensDb.createAccessToken({ name: "remote-admin", scope: "admin" });
const writeToken = accessTokensDb.createAccessToken({ name: "remote-write", scope: "write" });
const originalGetCookieStore = loginRoute.authRouteInternals.getCookieStore;

test.after(() => {
  loginRoute.authRouteInternals.getCookieStore = originalGetCookieStore;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function post(body: Record<string, unknown>, headers: Record<string, string> = {}) {
  return route.POST(
    new Request(ROUTE_URL, {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body: JSON.stringify(body),
    })
  );
}

async function sessionPost(body: Record<string, unknown>, token?: string) {
  return route.POST(await makeManagementSessionRequest(ROUTE_URL, { method: "POST", body, token }));
}

async function storedPasswordHash(): Promise<string> {
  return (await settingsDb.getSettings()).password as string;
}

/** Every write attempt restores the seeded operator state, so a leak cannot cascade. */
async function keepingOperatorState(run: () => Promise<void>) {
  try {
    await run();
  } finally {
    await settingsDb.updateSettings({ requireLogin: true, password: CURRENT_HASH });
  }
}

function failureReasons(): string[] {
  return compliance
    .getAuditLog({ action: "settings.update_failed", limit: 100 })
    .map((row) => (row.details as { reason?: string } | null)?.reason ?? "");
}

async function loginWith(password: string): Promise<number> {
  // The login route sets its cookie through next/headers, which has no request scope here.
  loginRoute.authRouteInternals.getCookieStore = (async () => ({
    set() {},
  })) as unknown as typeof originalGetCookieStore;
  try {
    const response = await loginRoute.POST(
      new Request("http://localhost/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-proto": "https" },
        body: JSON.stringify({ password }),
      }) as never
    );
    return response.status;
  } finally {
    loginRoute.authRouteInternals.getCookieStore = originalGetCookieStore;
  }
}

const MACHINE_CREDENTIALS: Array<{ label: string; token: string; operatorMessage: boolean }> = [
  { label: "a manage-scoped API key", token: manageKey.key, operatorMessage: true },
  { label: "an admin-scoped API key", token: adminKey.key, operatorMessage: true },
  { label: "an admin oma_ access token", token: adminToken.secret, operatorMessage: true },
  { label: "a write oma_ access token", token: writeToken.secret, operatorMessage: false },
  { label: "an API key without manage scope", token: inferenceKey.key, operatorMessage: false },
];

for (const { label, token, operatorMessage } of MACHINE_CREDENTIALS) {
  test(`${label} cannot replace the management password (403, hash untouched)`, () =>
    keepingOperatorState(async () => {
      const response = await post(
        { password: "attacker-chosen" },
        { authorization: `Bearer ${token}` }
      );
      const text = await response.text();
      assert.equal(response.status, 403, text);
      assert.ok(!text.includes(token), "403 body must not echo the credential");
      assert.ok(!text.includes("at /"), "403 body must not leak a stack trace");
      if (operatorMessage) assert.match(text, /dashboard session|local CLI/i);
      assert.equal(await storedPasswordHash(), CURRENT_HASH);
    }));

  test(`${label} cannot toggle requireLogin`, () =>
    keepingOperatorState(async () => {
      const response = await post({ requireLogin: false }, { authorization: `Bearer ${token}` });
      assert.equal(response.status, 403, await response.text());
      assert.equal((await settingsDb.getSettings()).requireLogin, true);
    }));
}

test("a refused machine credential is audited as settings.update_failed / OPERATOR_REQUIRED", () =>
  keepingOperatorState(async () => {
    const before = failureReasons().filter((r) => r === "OPERATOR_REQUIRED").length;
    const response = await post(
      { password: "attacker-chosen" },
      { authorization: `Bearer ${manageKey.key}` }
    );
    assert.equal(response.status, 403);
    const after = failureReasons().filter((r) => r === "OPERATOR_REQUIRED").length;
    assert.equal(after, before + 1);
  }));

test("a dashboard session without currentPassword cannot change the password (403)", () =>
  keepingOperatorState(async () => {
    const response = await sessionPost({ password: NEW_PASSWORD });
    const text = await response.text();
    assert.equal(response.status, 403, text);
    assert.match(text, /currentPassword/);
    assert.equal(await storedPasswordHash(), CURRENT_HASH);
    assert.ok(failureReasons().includes("PASSWORD_REQUIRED"));
  }));

test("a dashboard session with a wrong currentPassword cannot change the password (403)", () =>
  keepingOperatorState(async () => {
    const response = await sessionPost({ password: NEW_PASSWORD, currentPassword: "not-it" });
    const text = await response.text();
    assert.equal(response.status, 403, text);
    assert.equal(await storedPasswordHash(), CURRENT_HASH);
    assert.ok(failureReasons().includes("PASSWORD_MISMATCH"));
  }));

test("a dashboard session with the current password rotates it and the new password logs in", () =>
  keepingOperatorState(async () => {
    const response = await sessionPost({
      password: NEW_PASSWORD,
      currentPassword: CURRENT_PASSWORD,
    });
    assert.equal(response.status, 200, await response.clone().text());
    assert.deepEqual(await response.json(), { success: true });

    const hash = await storedPasswordHash();
    assert.equal(await managementPassword.verifyManagementPassword(NEW_PASSWORD, hash), true);
    assert.equal(await managementPassword.verifyManagementPassword(CURRENT_PASSWORD, hash), false);
    assert.equal(await loginWith(NEW_PASSWORD), 200);
  }));

test("a dashboard session still toggles requireLogin without a password prompt", () =>
  keepingOperatorState(async () => {
    const response = await sessionPost({ requireLogin: false });
    assert.equal(response.status, 200, await response.clone().text());
    assert.equal((await settingsDb.getSettings()).requireLogin, false);
  }));

test("the local CLI subject may reset the password without currentPassword (recovery path)", () =>
  keepingOperatorState(async () => {
    const response = await post({ password: NEW_PASSWORD }, LOCAL_CLI_HEADERS);
    assert.equal(response.status, 200, await response.clone().text());
    const hash = await storedPasswordHash();
    assert.equal(await managementPassword.verifyManagementPassword(NEW_PASSWORD, hash), true);
  }));

test("a manage key sent alongside a dashboard session does not weaken the session's rules", () =>
  keepingOperatorState(async () => {
    const response = await sessionPost({ password: NEW_PASSWORD }, manageKey.key);
    assert.equal(response.status, 403, await response.text());
    assert.equal(await storedPasswordHash(), CURRENT_HASH);
  }));

test("no credential outside the bootstrap window → 401 without a stack trace", () =>
  keepingOperatorState(async () => {
    const response = await post({ password: NEW_PASSWORD });
    const text = await response.text();
    assert.equal(response.status, 401, text);
    assert.ok(!text.includes("at /"));
    assert.equal(await storedPasswordHash(), CURRENT_HASH);
  }));

test("with login disabled the instance is open and the password can be set without a credential", () =>
  keepingOperatorState(async () => {
    await settingsDb.updateSettings({ requireLogin: false });
    const response = await post({ password: NEW_PASSWORD });
    assert.equal(response.status, 200, await response.clone().text());
    const hash = await storedPasswordHash();
    assert.equal(await managementPassword.verifyManagementPassword(NEW_PASSWORD, hash), true);
  }));

test("bootstrap window (no password configured yet) keeps accepting the first password unauthenticated", () =>
  keepingOperatorState(async () => {
    await settingsDb.updateSettings({ requireLogin: true, password: "" });
    const response = await post({ requireLogin: true, password: "first-secret" });
    assert.equal(response.status, 200, await response.clone().text());
    assert.deepEqual(await response.json(), { success: true });
    const hash = await storedPasswordHash();
    assert.equal(await managementPassword.verifyManagementPassword("first-secret", hash), true);
  }));
