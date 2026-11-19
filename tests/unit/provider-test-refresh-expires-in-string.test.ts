import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// The dashboard connection test persists a refreshed OAuth token's lifetime. Token
// endpoints that send expires_in as a numeric string ("600") must keep their real
// lifetime instead of falling through to the 30-minute fallback expiry, which would
// outlive the token and make later tests skip a needed refresh.

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-refresh-expires-in-"));
const fixtureEnv = {
  DATA_DIR: dataDir,
  NODE_ENV: "test",
  API_KEY_SECRET: "refresh-expires-in-offline-fixture-secret",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  APP_LOG_TO_FILE: "false",
  OMNIROUTE_PLUGINS_DIR: path.join(dataDir, "plugins"),
  OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK: "1",
  OMNIROUTE_HIDE_HEALTHCHECK_LOGS: "1",
};
const previousEnv = new Map(Object.keys(fixtureEnv).map((key) => [key, process.env[key]]));
Object.assign(process.env, fixtureEnv);
const originalFetch = globalThis.fetch;
globalThis.fetch = async (input) => {
  throw new Error(`Unexpected fetch: ${String(input)}`);
};

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { testSingleConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");
const { stopTokenHealthCheck } = await import("../../src/lib/tokenHealthCheck.ts");
const { CODEBUDDY_CN_CONFIG } = await import("../../src/lib/oauth/constants/oauth.ts");

assert.equal(core.DATA_DIR, dataDir, "persistence must use the disposable database");

function requestUrl(input: RequestInfo | URL): string {
  return typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
}

test.afterEach(() => {
  test.mock.restoreAll();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  stopTokenHealthCheck();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of previousEnv) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test("dashboard refresh keeps a numeric-string expires_in instead of the 30-minute fallback", async (t) => {
  const created = await providers.createProviderConnection({
    provider: "codebuddy-cn",
    authType: "oauth",
    name: "Offline string-lifetime refresh",
    accessToken: "offline-codebuddy-cn-old-string-lifetime",
    refreshToken: "offline-codebuddy-cn-refresh-string-lifetime",
    isActive: true,
    testStatus: "active",
  });
  let refreshCalls = 0;
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    assert.equal(requestUrl(input), CODEBUDDY_CN_CONFIG.refreshUrl);
    refreshCalls++;
    return Response.json({
      code: 0,
      data: { accessToken: "offline-codebuddy-cn-fresh-string-lifetime", expiresIn: "600" },
    });
  });
  const start = Date.now();
  const result = await testSingleConnection(created.id as string, undefined, {
    allowLocalRuntimeProbe: false,
    allowLocalSpawn: false,
  });
  assert.equal(result.valid, true);
  assert.equal(refreshCalls, 1);
  const stored = await providers.getProviderConnectionById(created.id as string);
  assert.ok(stored, "fixture connection must remain stored");
  assert.equal(stored.accessToken, "offline-codebuddy-cn-fresh-string-lifetime");
  for (const column of ["expiresAt", "tokenExpiresAt"] as const) {
    const expiresAtMs = Date.parse(stored[column] as string);
    assert.ok(expiresAtMs >= start + 600 * 1000, `${column} must cover the 600 s lifetime`);
    assert.ok(
      expiresAtMs <= Date.now() + 600 * 1000,
      `${column} must not outlive the 600 s lifetime (no 30-minute fallback)`
    );
  }
});
