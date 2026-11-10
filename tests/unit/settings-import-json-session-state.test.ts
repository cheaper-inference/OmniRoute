/**
 * `POST /api/settings/import-json` must not write the dashboard session state a password change
 * or a sign-out leaves behind (`sessionsValidAfter`, `revokedDashboardSessions`), nor a
 * `currentPassword`. Those keys are not settings an operator configures: importing an older
 * backup that carries them (or that carries an empty revocation list / a zero cutoff) would
 * revive dashboard sessions the password change or the logout already ended.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-import-session-state-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";
process.env.JWT_SECRET = "import-session-state-jwt-secret";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const importJsonRoute = await import("../../src/app/api/settings/import-json/route.ts");
const securitySettings = await import("../../src/shared/constants/securityImpactingSettings.ts");
const sessionToken = await import("../../src/shared/utils/dashboardSessionToken.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function importSettings(settings: Record<string, unknown>) {
  const response = await importJsonRoute.POST(
    new Request("http://localhost:20128/api/settings/import-json", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ settings }),
    })
  );
  assert.equal(response.status, 200, await response.clone().text());
}

test("the session-state keys stripped by import-json are the ones the session verifier reads", () => {
  assert.deepEqual(
    [...securitySettings.DASHBOARD_SESSION_STATE_SETTINGS_KEYS].sort(),
    [sessionToken.REVOKED_SESSIONS_SETTING, sessionToken.SESSIONS_VALID_AFTER_SETTING].sort()
  );
});

test("import-json drops password, currentPassword, session state and every re-auth-gated key", () => {
  const stripped = new Set<string>(securitySettings.IMPORT_STRIPPED_SETTINGS_KEYS);
  for (const key of [
    "password",
    "currentPassword",
    ...securitySettings.SECURITY_IMPACTING_SETTINGS_KEYS,
    ...securitySettings.DASHBOARD_SESSION_STATE_SETTINGS_KEYS,
  ]) {
    assert.ok(stripped.has(key), key);
  }
});

test("import-json keeps the stored session cutoff and revocation list", async () => {
  await settingsDb.updateSettings({
    requireLogin: false,
    sessionsValidAfter: 1_900_000_000,
    revokedDashboardSessions: [{ jti: "signed-out-session", exp: 4_000_000_000 }],
  });

  await importSettings({
    sessionsValidAfter: 0,
    revokedDashboardSessions: [],
    currentPassword: "imported-current-password",
    showQuickStartOnHome: false,
  });

  const after = (await settingsDb.getSettings()) as Record<string, unknown>;
  assert.equal(after.sessionsValidAfter, 1_900_000_000);
  assert.deepEqual(after.revokedDashboardSessions, [
    { jti: "signed-out-session", exp: 4_000_000_000 },
  ]);
  assert.equal(after.currentPassword, undefined);
  // Non-security settings still import.
  assert.equal(after.showQuickStartOnHome, false);
});

test("a signed-out dashboard session stays dead after importing an older backup", async () => {
  const secret = sessionToken.getDashboardJwtSecret();
  assert.ok(secret);
  const token = await sessionToken.mintDashboardSessionToken(secret);
  const payload = await sessionToken.verifyDashboardSessionToken(token, secret);
  assert.ok(payload?.jti, "freshly minted session verifies");

  // Sign-out: the session id lands on the revocation list.
  await settingsDb.updateSettings({
    requireLogin: false,
    revokedDashboardSessions: [{ jti: payload.jti, exp: payload.exp }],
  });
  invalidateDbCache();
  assert.equal(await sessionToken.verifyDashboardSessionToken(token, secret), null);

  // A backup taken before the sign-out carries an empty revocation list.
  await importSettings({ revokedDashboardSessions: [], sessionsValidAfter: 0 });
  invalidateDbCache();

  assert.equal(await sessionToken.verifyDashboardSessionToken(token, secret), null);
});
