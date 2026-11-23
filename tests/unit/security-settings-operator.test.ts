// Security-policy settings — login enforcement, OIDC identity, CORS origins, brute-force
// protection — decide who can reach the dashboard. A delegated machine credential (a manage-scoped
// API key, an `oma_` access token) must not be able to loosen them through `PATCH /api/settings`:
//   - settings mutations need the `admin` access-token scope (a `write` token is refused);
//   - any body touching a security-policy key needs an OPERATOR credential (dashboard session,
//     local CLI, open instance) on top of the existing password re-auth — machine credentials
//     get 403 even when they know the password;
//   - `corsOrigins` / `bruteForceProtection` join the re-auth list, so a dashboard session must
//     send `currentPassword` and the legacy JSON import drops them;
//   - ordinary settings (theme) keep working for a manage key or an admin `oma_` token.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-settings-operator-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  OMNIROUTE_DISABLE_REDIS_AUTH_CACHE: process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "settings-operator-api-key-secret";
process.env.JWT_SECRET = "settings-operator-jwt-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const accessTokensDb = await import("../../src/lib/db/accessTokens.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const managementPassword = await import("../../src/lib/auth/managementPassword.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");
const importJsonRoute = await import("../../src/app/api/settings/import-json/route.ts");
const { inferRequiredScope } = await import("../../src/server/authz/accessScopes.ts");
const { requireManagementAuth } = await import("../../src/lib/api/requireManagementAuth.ts");
const securitySettings = await import("../../src/shared/constants/securityImpactingSettings.ts");

const ROUTE_URL = "http://localhost:20128/api/settings";
const PASSWORD = "operator-secret";
const PASSWORD_HASH = await managementPassword.hashManagementPassword(PASSWORD);
const LOCAL_CLI_HEADERS = {
  "x-omniroute-auth-kind": "management_key",
  "x-omniroute-auth-label": "local-cli-token",
};

/** Security-policy keys and an attacker-chosen value for each. */
const SECURITY_POLICY_CHANGES: Record<string, unknown> = {
  corsOrigins: "https://attacker.example",
  bruteForceProtection: false,
  requireLogin: false,
  oidcIssuer: "https://attacker-idp.example",
  oidcAllowedSubjects: ["attacker@example.com"],
};

const SEEDED_POLICY: Record<string, unknown> = {
  requireLogin: true,
  setupComplete: true,
  password: PASSWORD_HASH,
  corsOrigins: "https://app.example.com",
  bruteForceProtection: true,
  oidcIssuer: "https://idp.example",
  oidcAllowedSubjects: ["admin@example.com"],
};

await settingsDb.updateSettings(SEEDED_POLICY);
const manageKey = await apiKeysDb.createApiKey("manage-automation", "machine-settings", ["manage"]);
const adminKey = await apiKeysDb.createApiKey("admin-automation", "machine-settings", ["admin"]);
const adminToken = accessTokensDb.createAccessToken({ name: "remote-admin", scope: "admin" });
const writeToken = accessTokensDb.createAccessToken({ name: "remote-write", scope: "write" });

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function patch(body: Record<string, unknown>, headers: Record<string, string> = {}) {
  return settingsRoute.PATCH(
    new Request(ROUTE_URL, {
      method: "PATCH",
      headers: { "content-type": "application/json", ...headers },
      body: JSON.stringify(body),
    })
  );
}

async function sessionPatch(body: Record<string, unknown>) {
  return settingsRoute.PATCH(
    await makeManagementSessionRequest(ROUTE_URL, { method: "PATCH", body })
  );
}

async function stored(key: string): Promise<unknown> {
  return ((await settingsDb.getSettings()) as Record<string, unknown>)[key];
}

/** Every write attempt restores the seeded policy, so a leak cannot cascade. */
async function keepingSeededPolicy(run: () => Promise<void>) {
  try {
    await run();
  } finally {
    await settingsDb.updateSettings(SEEDED_POLICY);
  }
}

function failureReasons(): string[] {
  return compliance
    .getAuditLog({ action: "settings.update_failed", limit: 100 })
    .map((row) => (row.details as { reason?: string } | null)?.reason ?? "");
}

// ─── B1: access-token scope — settings mutations are admin, reads stay read ────────────

test("settings mutations require the admin access-token scope; reads and lookalikes do not", () => {
  for (const method of ["PATCH", "PUT", "POST", "DELETE"]) {
    assert.equal(inferRequiredScope(method, "/api/settings"), "admin", method);
    assert.equal(inferRequiredScope(method, "/api/settings/require-login"), "admin", method);
  }
  assert.equal(inferRequiredScope("GET", "/api/settings"), "read");
  assert.equal(inferRequiredScope("GET", "/api/settings/require-login"), "read");
  assert.equal(inferRequiredScope("PATCH", "/api/settings-other"), "write");
});

test("only the exact settings routes are admin — other /api/settings/* sub-routes keep write", () => {
  for (const method of ["PATCH", "PUT", "POST", "DELETE"]) {
    assert.equal(inferRequiredScope(method, "/api/settings/"), "admin", method);
    for (const subRoute of [
      "/api/settings/proxies",
      "/api/settings/proxies/abc123",
      "/api/settings/combo-defaults",
      "/api/settings/model-aliases",
      "/api/settings/compression",
      "/api/settings/purge-request-history",
      "/api/settings/require-login/extra",
    ]) {
      assert.equal(inferRequiredScope(method, subRoute), "write", `${method} ${subRoute}`);
    }
  }
});

test("a write oma_ token passes the management gate on /api/settings/proxies but not on /api/settings", async () => {
  const bearer = { authorization: `Bearer ${writeToken.secret}` };
  const proxies = await requireManagementAuth(
    new Request("http://localhost:20128/api/settings/proxies", {
      method: "PATCH",
      headers: { "content-type": "application/json", ...bearer },
      body: "{}",
    })
  );
  assert.equal(proxies, null, "write token must still mutate an ordinary settings sub-route");

  const settings = await requireManagementAuth(
    new Request(ROUTE_URL, {
      method: "PATCH",
      headers: { "content-type": "application/json", ...bearer },
      body: "{}",
    })
  );
  assert.ok(settings, "write token must be refused on PATCH /api/settings");
  assert.equal(settings.status, 403, await settings.text());
});

// ─── B3: corsOrigins / bruteForceProtection are re-auth gated and import-stripped ─────

test("corsOrigins and bruteForceProtection are security-impacting and stripped by the import", () => {
  const guarded = new Set<string>(securitySettings.SECURITY_IMPACTING_SETTINGS_KEYS);
  const stripped = new Set<string>(securitySettings.IMPORT_STRIPPED_SETTINGS_KEYS);
  for (const key of ["corsOrigins", "bruteForceProtection"]) {
    assert.ok(guarded.has(key), `${key} must be in SECURITY_IMPACTING_SETTINGS_KEYS`);
    assert.ok(stripped.has(key), `${key} must be in IMPORT_STRIPPED_SETTINGS_KEYS`);
  }
});

test("import-json does not write corsOrigins or bruteForceProtection", () =>
  keepingSeededPolicy(async () => {
    // The import is management-authenticated but has no password re-auth of its own, which is
    // exactly why it must drop these keys even for the operator's own session.
    const response = await importJsonRoute.POST(
      await makeManagementSessionRequest("http://localhost:20128/api/settings/import-json", {
        method: "POST",
        body: {
          settings: {
            corsOrigins: SECURITY_POLICY_CHANGES.corsOrigins,
            bruteForceProtection: SECURITY_POLICY_CHANGES.bruteForceProtection,
            settingsOperatorBenignKey: "kept",
          },
        },
      })
    );
    assert.equal(response.status, 200, await response.clone().text());
    assert.equal(await stored("settingsOperatorBenignKey"), "kept");
    assert.equal(await stored("corsOrigins"), SEEDED_POLICY.corsOrigins);
    assert.equal(await stored("bruteForceProtection"), SEEDED_POLICY.bruteForceProtection);
  }));

// ─── B2: machine credentials cannot touch security policy, even with the password ─────

const MACHINE_CREDENTIALS: Array<{ label: string; token: string }> = [
  { label: "a manage-scoped API key", token: manageKey.key },
  { label: "an admin-scoped API key", token: adminKey.key },
  { label: "an admin oma_ access token", token: adminToken.secret },
];

for (const { label, token } of MACHINE_CREDENTIALS) {
  for (const [key, value] of Object.entries(SECURITY_POLICY_CHANGES)) {
    test(`${label} cannot PATCH ${key} even with the correct password (403, value kept)`, () =>
      keepingSeededPolicy(async () => {
        const response = await patch(
          { [key]: value, currentPassword: PASSWORD },
          { authorization: `Bearer ${token}` }
        );
        const text = await response.text();
        assert.equal(response.status, 403, text);
        assert.match(text, /dashboard session|local CLI/i);
        assert.ok(!text.includes(token), "403 body must not echo the credential");
        assert.deepEqual(await stored(key), SEEDED_POLICY[key]);
      }));
  }
}

test("a write oma_ access token is refused on PATCH /api/settings (scope), security key or not", () =>
  keepingSeededPolicy(async () => {
    const policy = await patch(
      { corsOrigins: SECURITY_POLICY_CHANGES.corsOrigins },
      { authorization: `Bearer ${writeToken.secret}` }
    );
    assert.equal(policy.status, 403, await policy.text());
    assert.equal(await stored("corsOrigins"), SEEDED_POLICY.corsOrigins);

    const ordinary = await patch(
      { theme: "dark" },
      { authorization: `Bearer ${writeToken.secret}` }
    );
    assert.equal(ordinary.status, 403, await ordinary.text());
  }));

test("a refused machine credential is audited as settings.update_failed / OPERATOR_REQUIRED", () =>
  keepingSeededPolicy(async () => {
    const before = failureReasons().filter((r) => r === "OPERATOR_REQUIRED").length;
    const response = await patch(
      { bruteForceProtection: false, currentPassword: PASSWORD },
      { authorization: `Bearer ${manageKey.key}` }
    );
    assert.equal(response.status, 403);
    const after = failureReasons().filter((r) => r === "OPERATOR_REQUIRED").length;
    assert.equal(after, before + 1);
  }));

// ─── Positive controls: ordinary settings keep working for machine credentials ─────────

test("a manage-scoped API key still updates an ordinary setting", async () => {
  const response = await patch({ theme: "dark" }, { authorization: `Bearer ${manageKey.key}` });
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal(await stored("theme"), "dark");
});

test("an admin oma_ access token still updates an ordinary setting", async () => {
  const response = await patch(
    { theme: "light" },
    { authorization: `Bearer ${adminToken.secret}` }
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal(await stored("theme"), "light");
});

// ─── Dashboard session: operator, but the password re-auth now covers the new keys ─────

test("a dashboard session PATCHing corsOrigins without currentPassword gets 400 PASSWORD_REQUIRED", () =>
  keepingSeededPolicy(async () => {
    const response = await sessionPatch({ corsOrigins: SECURITY_POLICY_CHANGES.corsOrigins });
    const body = (await response.json()) as { error?: { code?: string; keys?: string[] } };
    assert.equal(response.status, 400);
    assert.equal(body.error?.code, "PASSWORD_REQUIRED");
    assert.deepEqual(body.error?.keys, ["corsOrigins"]);
    assert.equal(await stored("corsOrigins"), SEEDED_POLICY.corsOrigins);
  }));

test("a dashboard session PATCHing bruteForceProtection with a wrong password gets 401 PASSWORD_MISMATCH", () =>
  keepingSeededPolicy(async () => {
    const response = await sessionPatch({ bruteForceProtection: false, currentPassword: "nope" });
    const body = (await response.json()) as { error?: { code?: string } };
    assert.equal(response.status, 401);
    assert.equal(body.error?.code, "PASSWORD_MISMATCH");
    assert.equal(await stored("bruteForceProtection"), true);
  }));

test("a dashboard session with the current password changes corsOrigins and bruteForceProtection", () =>
  keepingSeededPolicy(async () => {
    const cors = await sessionPatch({
      corsOrigins: SECURITY_POLICY_CHANGES.corsOrigins,
      currentPassword: PASSWORD,
    });
    assert.equal(cors.status, 200, await cors.clone().text());
    assert.equal(await stored("corsOrigins"), SECURITY_POLICY_CHANGES.corsOrigins);

    const brute = await sessionPatch({ bruteForceProtection: false, currentPassword: PASSWORD });
    assert.equal(brute.status, 200, await brute.clone().text());
    assert.equal(await stored("bruteForceProtection"), false);
  }));

test("the local CLI subject is an operator: it changes corsOrigins with the current password", () =>
  keepingSeededPolicy(async () => {
    const response = await patch(
      { corsOrigins: "https://cli.example", currentPassword: PASSWORD },
      LOCAL_CLI_HEADERS
    );
    assert.equal(response.status, 200, await response.clone().text());
    assert.equal(await stored("corsOrigins"), "https://cli.example");
  }));
