/**
 * POST /api/token-health — the "refresh all" action behind the token health
 * badge. Loads the active OAuth connections server-side, excludes the
 * families the sweep must never touch (the rotating Auth0 family, cursor,
 * copilot connections without a refresh token, deprecated providers), runs
 * the grouped wave, and answers with counters only — never a token.
 *
 * Real isolated DB (`DATA_DIR` mkdtemp + `resetDbInstance`), same pattern as
 * tests/unit/token-refresh-bulk-wave.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-token-health-route-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  DISABLE_SQLITE_AUTO_BACKUP: process.env.DISABLE_SQLITE_AUTO_BACKUP,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "token-health-route-api-key-secret";
process.env.JWT_SECRET = "token-health-route-jwt-secret";
process.env.INITIAL_PASSWORD = "token-health-route-password";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.PROXY_FAIL_OPEN;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
const route = await import("../../src/app/api/token-health/route.ts");
const { PROVIDERS } = await import("../../open-sse/config/constants.ts");

const TOKEN_URL_A = "https://auth-a.example.com/token";
const TOKEN_URL_B = "https://auth-b.example.com/token";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function withMockedFetch<TResult>(fetchImpl: typeof fetch, fn: () => Promise<TResult>) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = fetchImpl;
  try {
    return await fn();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function withPatchedProperties<TResult>(
  target: object,
  patch: Record<string, unknown>,
  fn: () => Promise<TResult>
) {
  const previous = new Map<string, unknown>();
  const targetRecord = target as Record<string, unknown>;
  for (const [key, value] of Object.entries(patch)) {
    previous.set(
      key,
      Object.prototype.hasOwnProperty.call(targetRecord, key) ? targetRecord[key] : undefined
    );
    targetRecord[key] = value;
  }
  try {
    return await fn();
  } finally {
    for (const [key] of Object.entries(patch)) {
      const prior = previous.get(key);
      if (prior === undefined) {
        delete targetRecord[key];
      } else {
        targetRecord[key] = prior;
      }
    }
  }
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await updateSettings({ requireLogin: true });
}

test.before(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  process.env.DATA_DIR = ORIGINAL_ENV.DATA_DIR;
  process.env.API_KEY_SECRET = ORIGINAL_ENV.API_KEY_SECRET;
  process.env.JWT_SECRET = ORIGINAL_ENV.JWT_SECRET;
  process.env.INITIAL_PASSWORD = ORIGINAL_ENV.INITIAL_PASSWORD;
  process.env.DISABLE_SQLITE_AUTO_BACKUP = ORIGINAL_ENV.DISABLE_SQLITE_AUTO_BACKUP;
});

test("POST /api/token-health requires management auth and refreshes nothing when unauthenticated", async () => {
  await resetStorage();
  await providersDb.createProviderConnection({
    provider: "github",
    authType: "oauth",
    name: "Unauth Guard",
    accessToken: "at-unauth",
    refreshToken: "rt-unauth",
  });

  const res = await route.POST(
    new Request("http://localhost:20128/api/token-health", {
      method: "POST",
    })
  );

  // The guard answers before any refresh work: a Response, not counters.
  assert.ok(res instanceof Response, "the auth guard returns a Response");
  assert.ok(res.status === 401 || res.status === 403, `got status ${res.status}`);
  const body = (await res.json()) as Record<string, unknown>;
  assert.ok(!("refreshed" in body) && !("skipped" in body) && !("failed" in body));

  const rows = await providersDb.getProviderConnections({});
  const conn = (rows as Record<string, unknown>[])?.find((c) => c.name === "Unauth Guard");
  assert.equal(conn?.refreshToken, "rt-unauth", "the row was not refreshed");
});

test("POST /api/token-health refreshes only eligible connections and answers with counters, no tokens", async () => {
  await resetStorage();

  // Eligible: active oauth connection with a refresh token on a plain provider.
  await providersDb.createProviderConnection({
    provider: "custom-oauth-task-201",
    authType: "oauth",
    name: "Wave OK A",
    accessToken: "at-a",
    refreshToken: "rt-a",
  });
  await providersDb.createProviderConnection({
    provider: "custom-oauth-task-202",
    authType: "oauth",
    name: "Wave OK B",
    accessToken: "at-b",
    refreshToken: "rt-b",
  });
  // Failed refresh: same shape, the upstream rejects it.
  await providersDb.createProviderConnection({
    provider: "custom-oauth-task-201",
    authType: "oauth",
    name: "Wave Fail",
    accessToken: "at-f",
    refreshToken: "rt-fail",
  });
  // Excluded families — each must be counted as skipped, never refreshed.
  await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Wave Codex",
    accessToken: "at-cx",
    refreshToken: "rt-cx",
  });
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "oauth",
    name: "Wave OpenAI",
    accessToken: "at-oi",
    refreshToken: "rt-oi",
  });
  await providersDb.createProviderConnection({
    provider: "cursor",
    authType: "oauth",
    name: "Wave Cursor",
    accessToken: "at-cur",
    refreshToken: "rt-cur",
  });
  await providersDb.createProviderConnection({
    provider: "github",
    authType: "oauth",
    name: "Wave Copilot no-rt",
    accessToken: "at-co",
  });
  await providersDb.createProviderConnection({
    provider: "gemini-cli",
    authType: "oauth",
    name: "Wave Deprecated",
    accessToken: "at-gc",
    refreshToken: "rt-gc",
  });
  // Not eligible for the wave at all: inactive, or no refresh token.
  await providersDb.createProviderConnection({
    provider: "custom-oauth-task-201",
    authType: "oauth",
    name: "Wave Inactive",
    accessToken: "at-off",
    refreshToken: "rt-off",
    isActive: false,
  });
  await providersDb.createProviderConnection({
    provider: "custom-oauth-task-201",
    authType: "oauth",
    name: "Wave NoRt",
    accessToken: "at-nort",
  });

  let fetchCount = 0;
  const requestedTokens: string[] = [];

  const mockFetch: typeof fetch = (_input, init) => {
    fetchCount += 1;
    const body = init?.body;
    const params =
      typeof body === "string"
        ? new URLSearchParams(body)
        : body instanceof URLSearchParams
          ? body
          : new URLSearchParams();
    const rt = params.get("refresh_token") ?? "";
    requestedTokens.push(rt);
    if (rt === "rt-fail") {
      return Promise.resolve(
        new Response(JSON.stringify({ error: "invalid_grant" }), {
          status: 400,
          headers: { "content-type": "application/json" },
        })
      );
    }
    return Promise.resolve(
      jsonResponse({
        access_token: `access-${rt}`,
        refresh_token: `${rt}-next`,
        expires_in: 900,
      })
    );
  };

  const request = await makeManagementSessionRequest("http://localhost:20128/api/token-health", {
    method: "POST",
  });

  let body: Record<string, unknown>;
  await withPatchedProperties(
    PROVIDERS,
    {
      "custom-oauth-task-201": { tokenUrl: TOKEN_URL_A },
      "custom-oauth-task-202": { tokenUrl: TOKEN_URL_B },
    },
    async () => {
      await withMockedFetch(mockFetch, async () => {
        const res = await route.POST(request);
        assert.equal(res.status, 200, JSON.stringify(await res.clone().text()));
        body = (await res.json()) as Record<string, unknown>;
      });
    }
  );

  // Exactly the three eligible connections were requested.
  assert.deepEqual([...requestedTokens].sort(), ["rt-a", "rt-b", "rt-fail"]);
  assert.equal(fetchCount, 3, "excluded and ineligible connections never reach the wave");

  // Counters, and nothing else.
  assert.equal(body.refreshed, 2, JSON.stringify(body));
  assert.equal(body.failed, 1, JSON.stringify(body));
  // codex, openai, cursor, copilot-without-rt, deprecated → five skipped.
  assert.equal(body.skipped, 5, JSON.stringify(body));
  assert.equal(Object.keys(body).sort().join(","), "failed,refreshed,skipped");

  // No token material in the response body.
  const serialized = JSON.stringify(body);
  for (const token of [
    "rt-a",
    "rt-b",
    "rt-fail",
    "access-rt-a",
    "access-rt-b",
    "rt-cx",
    "rt-oi",
    "rt-cur",
    "rt-gc",
  ]) {
    assert.ok(!serialized.includes(token), `response must not contain ${token}`);
  }
});

test("POST /api/token-health answers zeros when there is nothing to refresh", async () => {
  await resetStorage();

  const request = await makeManagementSessionRequest("http://localhost:20128/api/token-health", {
    method: "POST",
  });

  const res = await route.POST(request);
  assert.equal(res.status, 200);
  const body = (await res.json()) as Record<string, unknown>;
  assert.deepEqual(body, { refreshed: 0, skipped: 0, failed: 0 });
});

test("GET /api/token-health is unchanged: the aggregate shape survives the new POST", async () => {
  await resetStorage();

  const res = await route.GET();
  assert.equal(res.status, 200);
  const body = (await res.json()) as Record<string, unknown>;
  assert.deepEqual(Object.keys(body).sort(), [
    "errored",
    "healthy",
    "lastCheckAt",
    "status",
    "total",
    "warning",
  ]);
  assert.equal(body.total, 0);
});
