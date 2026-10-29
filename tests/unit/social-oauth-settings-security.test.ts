/**
 * The Google/GitHub login settings decide WHO can log into the dashboard, exactly like the OIDC
 * identity keys pinned by `oidc-settings-reauth.test.ts`. So (#15153 security review):
 *   - every social key sits in SECURITY_IMPACTING_SETTINGS_KEYS: `PATCH /api/settings` demands
 *     `currentPassword`, a machine credential is refused with 403 even with the password, and
 *     `POST /api/settings/import-json` (no re-auth) drops the keys — otherwise a stolen session
 *     could plant its own client + allowlist and keep admin access after the password rotates;
 *   - changing the allowlist or a provider credential/toggle ends every dashboard session issued
 *     before it (`sessionsValidAfter`), so removing someone from the allowlist actually signs
 *     them out, while the browser that made the change keeps a fresh session.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-social-settings-sec-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  OMNIROUTE_DISABLE_REDIS_AUTH_CACHE: process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE,
};
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "social-settings-security-api-key-secret";
process.env.JWT_SECRET = "social-settings-security-jwt-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");
const importJsonRoute = await import("../../src/app/api/settings/import-json/route.ts");
const managementPassword = await import("../../src/lib/auth/managementPassword.ts");
const securitySettings = await import("../../src/shared/constants/securityImpactingSettings.ts");
const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");
const { verifyDashboardSessionToken } =
  await import("../../src/shared/utils/dashboardSessionToken.ts");

const PASSWORD = "operator-secret";
const ROUTE_URL = "http://localhost:20128/api/settings";

const SEEDED_SOCIAL: Record<string, unknown> = {
  googleAuthEnabled: true,
  googleClientId: "operator-google-client",
  googleClientSecret: "operator-google-secret",
  googleRedirectPath: "/api/auth/google/callback",
  githubAuthEnabled: true,
  githubClientId: "operator-github-client",
  githubClientSecret: "operator-github-secret",
  githubRedirectPath: "/api/auth/github/callback",
  authAllowedEmails: ["admin@company.com"],
  disablePasswordLogin: false,
};

/** Every social login key and an attacker-chosen value for it. */
const SOCIAL_CHANGES: Record<string, unknown> = {
  googleAuthEnabled: false,
  googleClientId: "attacker-google-client",
  googleClientSecret: "attacker-google-secret",
  googleRedirectPath: "/api/auth/google/attacker",
  githubAuthEnabled: false,
  githubClientId: "attacker-github-client",
  githubClientSecret: "attacker-github-secret",
  githubRedirectPath: "/api/auth/github/attacker",
  authAllowedEmails: ["attacker@company.com"],
  disablePasswordLogin: true,
};

async function resetStorage() {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConfiguredInstance() {
  await settingsDb.updateSettings({
    requireLogin: true,
    setupComplete: true,
    password: await managementPassword.hashManagementPassword(PASSWORD),
    ...SEEDED_SOCIAL,
  });
}

async function sessionPatch(body: Record<string, unknown>) {
  return settingsRoute.PATCH(
    await makeManagementSessionRequest(ROUTE_URL, { method: "PATCH", body })
  );
}

async function stored(key: string): Promise<unknown> {
  return ((await settingsDb.getSettings()) as Record<string, unknown>)[key];
}

function sessionCookieFrom(response: Response): string | null {
  const match = /auth_token=([^;]+)/.exec(response.headers.get("set-cookie") || "");
  return match ? match[1] : null;
}

test.beforeEach(async () => {
  await resetStorage();
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

test("every social login key of the settings schema is security-impacting and import-stripped", () => {
  const guarded = new Set<string>(securitySettings.SECURITY_IMPACTING_SETTINGS_KEYS);
  const stripped = new Set<string>(securitySettings.IMPORT_STRIPPED_SETTINGS_KEYS);
  const socialKeys = Object.keys(updateSettingsSchema.shape).filter(
    (key) =>
      key.startsWith("google") ||
      key.startsWith("github") ||
      key === "authAllowedEmails" ||
      key === "disablePasswordLogin"
  );
  // Fails loudly if the schema renames the keys and this filter silently matches nothing.
  assert.deepEqual(socialKeys.sort(), Object.keys(SOCIAL_CHANGES).sort());
  for (const key of socialKeys) {
    assert.ok(guarded.has(key), `${key} must be in SECURITY_IMPACTING_SETTINGS_KEYS`);
    assert.ok(stripped.has(key), `${key} must be in IMPORT_STRIPPED_SETTINGS_KEYS`);
  }
});

for (const [key, value] of Object.entries(SOCIAL_CHANGES)) {
  test(`PATCH ${key} without currentPassword is rejected and the stored value is kept`, async () => {
    await seedConfiguredInstance();

    const response = await sessionPatch({ [key]: value });
    const body = (await response.json()) as { error?: { code?: string; keys?: string[] } };

    assert.equal(response.status, 400);
    assert.equal(body.error?.code, "PASSWORD_REQUIRED");
    assert.deepEqual(body.error?.keys, [key]);
    assert.deepEqual(await stored(key), SEEDED_SOCIAL[key]);
  });
}

test("a manage-scoped API key cannot PATCH a social login key even with the password", async () => {
  await seedConfiguredInstance();
  const manageKey = await apiKeysDb.createApiKey("manage-automation", "machine-social", ["manage"]);

  for (const [key, value] of Object.entries(SOCIAL_CHANGES)) {
    const response = await settingsRoute.PATCH(
      new Request(ROUTE_URL, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${manageKey.key}`,
        },
        body: JSON.stringify({ [key]: value, currentPassword: PASSWORD }),
      })
    );
    assert.equal(response.status, 403, `${key}: ${await response.text()}`);
    assert.deepEqual(await stored(key), SEEDED_SOCIAL[key], key);
  }
});

test("import-json does not write the social login keys", async () => {
  await seedConfiguredInstance();

  const response = await importJsonRoute.POST(
    await makeManagementSessionRequest("http://localhost:20128/api/settings/import-json", {
      method: "POST",
      body: { settings: { ...SOCIAL_CHANGES, socialImportBenignKey: "kept" } },
    })
  );
  assert.equal(response.status, 200, await response.clone().text());

  assert.equal(await stored("socialImportBenignKey"), "kept");
  for (const key of Object.keys(SOCIAL_CHANGES)) {
    assert.deepEqual(await stored(key), SEEDED_SOCIAL[key], key);
  }
});

test("changing the allowlist ends older sessions but keeps the caller signed in", async () => {
  await seedConfiguredInstance();
  // A session issued well before the change (e.g. the ex-colleague's cookie).
  const { SignJWT } = await import("jose");
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const oldSession = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(Math.floor(Date.now() / 1000) - 3600)
    .setJti("old-session")
    .setExpirationTime("30d")
    .sign(secret);
  assert.ok(await verifyDashboardSessionToken(oldSession, secret), "precondition: valid");

  const response = await sessionPatch({
    authAllowedEmails: ["someone-else@company.com"],
    currentPassword: PASSWORD,
  });
  assert.equal(response.status, 200, await response.clone().text());

  assert.equal(typeof (await stored("sessionsValidAfter")), "number");
  assert.equal(await verifyDashboardSessionToken(oldSession, secret), null);
  const fresh = sessionCookieFrom(response);
  assert.ok(fresh, "the caller must receive a re-issued session cookie");
  assert.ok(await verifyDashboardSessionToken(fresh, secret), "the caller's new session is valid");
});

test("changing a provider credential or toggle ends older sessions too", async () => {
  for (const change of [
    { googleClientSecret: "rotated-google-secret" },
    { githubClientId: "rotated-github-client" },
    { googleAuthEnabled: false },
  ]) {
    await resetStorage();
    await seedConfiguredInstance();
    const response = await sessionPatch({ ...change, currentPassword: PASSWORD });
    assert.equal(response.status, 200, await response.clone().text());
    assert.equal(
      typeof (await stored("sessionsValidAfter")),
      "number",
      `${Object.keys(change)[0]} must end older sessions`
    );
  }
});

test("re-sending the same allowlist or touching an unrelated key keeps every session", async () => {
  await seedConfiguredInstance();

  const same = await sessionPatch({
    authAllowedEmails: SEEDED_SOCIAL.authAllowedEmails,
    currentPassword: PASSWORD,
  });
  assert.equal(same.status, 200, await same.clone().text());
  const unrelated = await sessionPatch({ theme: "dark" });
  assert.equal(unrelated.status, 200, await unrelated.clone().text());

  assert.equal(await stored("sessionsValidAfter"), undefined);
});
