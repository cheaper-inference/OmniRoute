/**
 * The OIDC identity configuration decides WHO can log into the dashboard: the issuer whose
 * ID tokens are trusted, the client id they must be issued to (audience), the callback path
 * the authorization code is sent to and the subject/email allowlist. Changing any of them is
 * an authentication change, so `PATCH /api/settings` must demand the same password re-auth
 * (`currentPassword`) it already demands for `oidcEnabled` / `oidcClientSecret`, and
 * `POST /api/settings/import-json` (no re-auth) must not write them. Otherwise a stolen
 * session or management credential can point the login at an attacker-controlled IdP, or
 * allowlist the attacker's own subject, and keep dashboard access after the password rotates.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-oidc-settings-reauth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");
const importJsonRoute = await import("../../src/app/api/settings/import-json/route.ts");
const managementPassword = await import("../../src/lib/auth/managementPassword.ts");
const securitySettings = await import("../../src/shared/constants/securityImpactingSettings.ts");
const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");

const PASSWORD = "operator-secret";

/** OIDC identity keys and an attacker-chosen value for each. */
const OIDC_IDENTITY_CHANGES: Record<string, unknown> = {
  oidcIssuer: "https://attacker-idp.example",
  oidcClientId: "attacker-client",
  oidcAllowedSubjects: ["attacker@example.com"],
  oidcRedirectPath: "@attacker.example/callback",
  oidcScopes: ["openid", "offline_access"],
};

const SEEDED_OIDC = {
  oidcEnabled: true,
  oidcIssuer: "https://idp.example",
  oidcClientId: "operator-client",
  oidcClientSecret: "operator-client-secret",
  oidcAllowedSubjects: ["admin@example.com"],
  oidcRedirectPath: "/api/auth/oidc/callback",
  oidcScopes: ["openid", "profile", "email"],
};

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.INITIAL_PASSWORD;
}

async function seedConfiguredInstance() {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: await managementPassword.hashManagementPassword(PASSWORD),
    ...SEEDED_OIDC,
  });
}

async function patch(body: Record<string, unknown>) {
  const response = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body,
    })
  );
  return {
    status: response.status,
    body: (await response.json()) as { error?: { code?: string; keys?: string[] } },
  };
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
});

for (const [key, value] of Object.entries(OIDC_IDENTITY_CHANGES)) {
  test(`PATCH ${key} without currentPassword is rejected and the stored value is kept`, async () => {
    await seedConfiguredInstance();

    const result = await patch({ [key]: value });

    assert.equal(result.status, 400);
    assert.equal(result.body.error?.code, "PASSWORD_REQUIRED");
    assert.deepEqual(result.body.error?.keys, [key]);
    const after = (await settingsDb.getSettings()) as Record<string, unknown>;
    assert.deepEqual(after[key], (SEEDED_OIDC as Record<string, unknown>)[key]);
  });

  test(`PATCH ${key} with a wrong currentPassword is rejected`, async () => {
    await seedConfiguredInstance();

    const result = await patch({ [key]: value, currentPassword: "not-the-password" });

    assert.equal(result.status, 401);
    assert.equal(result.body.error?.code, "PASSWORD_MISMATCH");
    const after = (await settingsDb.getSettings()) as Record<string, unknown>;
    assert.deepEqual(after[key], (SEEDED_OIDC as Record<string, unknown>)[key]);
  });

  test(`PATCH ${key} with the correct currentPassword succeeds`, async () => {
    await seedConfiguredInstance();

    const result = await patch({ [key]: value, currentPassword: PASSWORD });

    assert.equal(result.status, 200);
    const after = (await settingsDb.getSettings()) as Record<string, unknown>;
    assert.deepEqual(after[key], value);
  });
}

test("PATCH of a non-auth setting still needs no currentPassword", async () => {
  await seedConfiguredInstance();

  const result = await patch({ theme: "dark" });

  assert.equal(result.status, 200);
});

test("every oidc* key PATCH /api/settings accepts is guarded by the re-auth gate", () => {
  const guarded = new Set<string>(securitySettings.SECURITY_IMPACTING_SETTINGS_KEYS);
  const oidcKeys = Object.keys(updateSettingsSchema.shape).filter((k) => k.startsWith("oidc"));
  // Fails loudly if the schema renames the OIDC keys and this filter silently matches nothing.
  assert.ok(oidcKeys.length >= 8, `expected the OIDC keys in the schema, got ${oidcKeys}`);
  for (const key of oidcKeys) {
    assert.ok(guarded.has(key), key);
  }
});

test("import-json does not write the OIDC identity keys", async () => {
  await settingsDb.updateSettings({ requireLogin: false, ...SEEDED_OIDC });
  const before = (await settingsDb.getSettings()) as Record<string, unknown>;

  const response = await importJsonRoute.POST(
    new Request("http://localhost:20128/api/settings/import-json", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        settings: { ...OIDC_IDENTITY_CHANGES, oidcReauthBenignKey: "kept" },
      }),
    })
  );
  assert.equal(response.status, 200, await response.clone().text());

  const after = (await settingsDb.getSettings()) as Record<string, unknown>;
  assert.equal(after.oidcReauthBenignKey, "kept");
  for (const key of Object.keys(OIDC_IDENTITY_CHANGES)) {
    assert.deepEqual(after[key], before[key], key);
  }
});
