// Manual refresh token import for Antigravity through POST /api/oauth/antigravity/import-token.
//
// The user pastes a Google OAuth refresh token for Antigravity.
// Prior to persistence, the backend validates and exchanges the refresh token with Google
// (https://oauth2.googleapis.com/token) to obtain a fresh access token, discovers the account
// identity and GCP project, and only then creates or updates the connection.
// If Google rejects the refresh token, nothing is stored in the database.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agy-rt-import-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const route = await import("../../src/app/api/oauth/[provider]/[action]/route.ts");

const REFRESH_TOKEN = "1//0unit-test-refresh-token-valid-abc123xyz";
const ACCESS_TOKEN = "ya29.a0unit-test-access-token-fresh";
const USER_EMAIL = "antigravity-tester@example.com";
const PROJECT_ID = "agy-test-project-12345";

const originalFetch = globalThis.fetch;

type FetchProbe = { url: string; method?: string; body?: string };

function stubGoogleServices(options: {
  tokenStatus?: number;
  tokenBody?: Record<string, unknown>;
  email?: string | null;
  projectId?: string | null;
}) {
  const probes: FetchProbe[] = [];
  const tokenStatus = options.tokenStatus ?? 200;
  const tokenBody = options.tokenBody ?? {
    access_token: ACCESS_TOKEN,
    expires_in: 3600,
    token_type: "Bearer",
    scope: "https://www.googleapis.com/auth/cloud-platform",
  };

  globalThis.fetch = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const url = String(input instanceof Request ? input.url : input);
    const method = init.method ?? (input instanceof Request ? input.method : "GET");
    const body =
      init.body instanceof URLSearchParams
        ? init.body.toString()
        : typeof init.body === "string"
          ? init.body
          : undefined;
    probes.push({ url, method, body });

    // Google OAuth token endpoint
    if (url.includes("oauth2.googleapis.com/token")) {
      return new Response(JSON.stringify(tokenBody), {
        status: tokenStatus,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Google userinfo endpoint
    if (url.includes("userinfo")) {
      if (options.email) {
        return new Response(JSON.stringify({ email: options.email, name: "Antigravity Tester" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "not_found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Antigravity Code Assist endpoints
    if (url.includes("loadCodeAssist") || url.includes("onboardUser")) {
      if (options.projectId) {
        return new Response(
          JSON.stringify({
            cloudaicompanionProject: { id: options.projectId },
            tier: { id: "standard-tier" },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response(JSON.stringify({}), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;

  return probes;
}

async function importToken(provider: string, body: Record<string, unknown>) {
  const request = new Request(`http://localhost:20128/api/oauth/${provider}/import-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const response = await route.POST(request, {
    params: Promise.resolve({ provider, action: "import-token" }),
  });
  return { status: response.status, body: await response.json() };
}

async function antigravityRows() {
  return providersDb.getProviderConnections({ provider: "antigravity" });
}

test.before(async () => {
  await settingsDb.updateSettings({ requireLogin: false });
});

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  for (const row of await antigravityRows()) {
    await providersDb.deleteProviderConnection(row.id);
  }
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("importToken_ValidRefreshToken_ExchangesWithGoogleAndPersistsConnection", async () => {
  const probes = stubGoogleServices({
    email: USER_EMAIL,
    projectId: PROJECT_ID,
  });

  const { status, body } = await importToken("antigravity", { token: `  ${REFRESH_TOKEN}\n` });

  assert.equal(status, 200);
  assert.equal(body.success, true);
  assert.equal(body.connection.email, USER_EMAIL);

  const rows = await antigravityRows();
  assert.equal(rows.length, 1);
  const row = rows[0];
  assert.equal(row.authType, "oauth");
  assert.equal(row.provider, "antigravity");
  assert.equal(row.refreshToken, REFRESH_TOKEN);
  assert.equal(row.accessToken, ACCESS_TOKEN);
  assert.equal(row.email, USER_EMAIL);
  assert.equal(row.projectId, PROJECT_ID);
  assert.equal(row.testStatus, "active");
  assert.equal(Boolean(row.isActive), true);
  assert.equal(row.providerSpecificData?.autoSync, true);
  assert.equal(row.providerSpecificData?.clientProfile, "ide");

  // Verify that an exchange probe was made to Google OAuth token endpoint
  const tokenProbes = probes.filter((p) => p.url.includes("oauth2.googleapis.com/token"));
  assert.equal(tokenProbes.length, 1);
  assert.match(tokenProbes[0].body || "", /grant_type=refresh_token/);
  assert.match(tokenProbes[0].body || "", new RegExp(encodeURIComponent(REFRESH_TOKEN)));
});

test("importToken_ValidRefreshTokenJson_ExtractsRefreshTokenAndPersists", async () => {
  stubGoogleServices({
    email: USER_EMAIL,
    projectId: PROJECT_ID,
  });

  const jsonInput = JSON.stringify({ refresh_token: REFRESH_TOKEN });
  const { status, body } = await importToken("antigravity", { token: jsonInput });

  assert.equal(status, 200);
  assert.equal(body.success, true);
  const rows = await antigravityRows();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].refreshToken, REFRESH_TOKEN);
});

test("importToken_InvalidRefreshToken_GoogleRejectsWithInvalidGrant_Returns400AndPersistsNothing", async () => {
  stubGoogleServices({
    tokenStatus: 400,
    tokenBody: { error: "invalid_grant", error_description: "Token has been expired or revoked." },
  });

  const { status, body } = await importToken("antigravity", { token: "1//0invalid-revoked-token" });

  assert.equal(status, 400);
  assert.equal(body.success, false);
  assert.match(body.error, /invalid_grant|validation failed|expired or revoked/i);

  const rows = await antigravityRows();
  assert.equal(
    rows.length,
    0,
    "No connection must be persisted when Google rejects the refresh token"
  );
});

test("importToken_EmptyOrWhitespaceToken_Returns400WithoutProbing", async () => {
  const probes = stubGoogleServices({ email: USER_EMAIL, projectId: PROJECT_ID });

  const { status, body } = await importToken("antigravity", { token: "   " });

  assert.equal(status, 400);
  // The Zod schema rejects a blank token before the handler runs, so the
  // envelope is the shared validation shape, not a bare string.
  assert.match(body.error.message, /invalid request/i);
  assert.equal(body.error.details[0].field, "token");
  assert.match(body.error.details[0].message, /token is required/i);
  // Nothing is probed upstream and nothing is persisted.
  assert.equal(probes.length, 0);
  assert.equal((await antigravityRows()).length, 0);
});

test("importToken_MissingProjectId_MarksConnectionDegraded", async () => {
  stubGoogleServices({
    email: USER_EMAIL,
    projectId: null, // Discovery returns no project
  });

  const { status, body } = await importToken("antigravity", { token: REFRESH_TOKEN });

  assert.equal(status, 200);
  assert.equal(body.success, true);
  assert.ok(body.warning, "Should return warning for degraded project");

  const [row] = await antigravityRows();
  assert.equal(row.testStatus, "degraded");
  assert.equal(row.errorCode, "missing_project_id");
});

test("importToken_SameEmailTwice_UpdatesExistingConnection", async () => {
  stubGoogleServices({ email: USER_EMAIL, projectId: PROJECT_ID });

  await importToken("antigravity", { token: REFRESH_TOKEN });
  assert.equal((await antigravityRows()).length, 1);

  // Second import with a rotated refresh token for the same user
  const rotatedToken = "1//0rotated-new-refresh-token";
  await importToken("antigravity", { token: rotatedToken });

  const rows = await antigravityRows();
  assert.equal(rows.length, 1, "Should update existing connection instead of duplicating");
  assert.equal(rows[0].refreshToken, rotatedToken);
});

test("importToken_StrictlyRestrictedToAntigravity_RejectsOtherProviders", async () => {
  stubGoogleServices({ email: USER_EMAIL, projectId: PROJECT_ID });

  const { status, body } = await importToken("github", { token: REFRESH_TOKEN });

  assert.equal(status, 400);
  assert.match(body.error, /import-token not supported for provider: github/);
});

test("importToken_SupportsAgyProvider", async () => {
  stubGoogleServices({ email: USER_EMAIL, projectId: PROJECT_ID });

  const { status, body } = await importToken("agy", { token: REFRESH_TOKEN });

  assert.equal(status, 200);
  assert.equal(body.success, true);
  const rows = await providersDb.getProviderConnections({ provider: "agy" });
  assert.equal(rows.length, 1);
  assert.equal(rows[0].providerSpecificData?.clientProfile, "cli");
  await providersDb.deleteProviderConnection(rows[0].id);
});
