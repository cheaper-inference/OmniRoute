import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-muse-review-"));
const fixtureEnv = {
  DATA_DIR: dataDir,
  NODE_ENV: "test",
  API_KEY_SECRET: "muse-review-offline-fixture-secret",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  APP_LOG_TO_FILE: "false",
  OMNIROUTE_PLUGINS_DIR: path.join(dataDir, "plugins"),
  OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK: "1",
  OMNIROUTE_HIDE_HEALTHCHECK_LOGS: "1",
};
const previousEnv = new Map(Object.keys(fixtureEnv).map((key) => [key, process.env[key]]));
Object.assign(process.env, fixtureEnv);
const originalFetch = globalThis.fetch;
const unexpectedFetches: string[] = [];
globalThis.fetch = async (input) => {
  unexpectedFetches.push(String(input));
  throw new Error("Unexpected fetch: review regressions must stay offline");
};

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { checkAndRefreshToken } = await import("../../src/sse/services/tokenRefresh.ts");
const { markAccountUnavailable } = await import("../../src/sse/services/auth.ts");
const { getModelLockoutInfo, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { testSingleConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");
const { stopTokenHealthCheck } = await import("../../src/lib/tokenHealthCheck.ts");
const { MUSE_CODE_MINT_URL } = await import("../../open-sse/config/museCode.ts");
const { CODEBUDDY_CN_CONFIG } = await import("../../src/lib/oauth/constants/oauth.ts");

assert.equal(core.DATA_DIR, dataDir, "persistence must use the disposable database");
const OLD_EXPIRY = "2000-01-01T00:00:00.000Z";
const MODEL = "muse-spark-1.3";
const POLICY_MESSAGES = [
  "This API key is billed to a Muse Code subscription.",
  "Muse Code subscriptions cover requests from the Muse Code client only.",
];
let sequence = 0;

function requestUrl(input: RequestInfo | URL): string {
  return typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
}

async function createMuse(expiresAt: string | null = OLD_EXPIRY) {
  const suffix = ++sequence;
  return providers.createProviderConnection({
    provider: "muse-code",
    authType: "oauth",
    name: `Muse offline review ${suffix}`,
    accessToken: `LLM|offline-review-${suffix}`,
    refreshToken: `dca:offline-review-${suffix}`,
    providerSpecificData: { dcaToken: `dca:offline-review-${suffix}` },
    expiresAt,
    tokenExpiresAt: expiresAt,
    isActive: true,
    testStatus: "active",
  });
}

async function readConnection(id: string) {
  const stored = await providers.getProviderConnectionById(id);
  assert.ok(stored, "fixture connection must remain stored");
  return stored;
}

function healthState(row: Record<string, unknown>) {
  return {
    isActive: row.isActive,
    testStatus: row.testStatus,
    rateLimitedUntil: row.rateLimitedUntil ?? null,
    backoffLevel: row.backoffLevel ?? 0,
    lastError: row.lastError ?? null,
    lastErrorType: row.lastErrorType ?? null,
    lastErrorAt: row.lastErrorAt ?? null,
    errorCode: row.errorCode ?? null,
  };
}

function assertNoExpiry(row: Record<string, unknown>) {
  assert.deepEqual(
    { expiresAt: row.expiresAt ?? null, tokenExpiresAt: row.tokenExpiresAt ?? null },
    { expiresAt: null, tokenExpiresAt: null },
    "a Muse inference key has no fabricated lifetime in either persisted expiry column"
  );
}

test.afterEach(() => {
  test.mock.restoreAll();
  clearAllModelLockouts();
  assert.deepEqual(unexpectedFetches.splice(0), [], "no unmocked provider requests are allowed");
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

test("proactive Muse mint timeout returns the original usable credentials and preserves stored DCA", async (t) => {
  const created = await createMuse();
  const before = await readConnection(created.id as string);
  const credentials = { ...before, connectionId: created.id };
  let mintCalls = 0;
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    assert.equal(requestUrl(input), MUSE_CODE_MINT_URL);
    mintCalls++;
    throw new DOMException("Offline mint timeout", "TimeoutError");
  });
  let result: unknown;
  await assert.doesNotReject(async () => {
    result = await checkAndRefreshToken("muse-code", credentials);
  }, "a transient proactive remint must not reject a request with a stored inference key");
  assert.equal(mintCalls, 1);
  assert.deepEqual(result, credentials);
  assert.deepEqual(await readConnection(created.id as string), before);
});

test("proactive Muse mint timeout on a device-token credential keeps it instead of rejecting", async (t) => {
  const suffix = ++sequence;
  const dcaToken = `dca:offline-review-${suffix}`;
  const created = await providers.createProviderConnection({
    provider: "muse-code",
    authType: "oauth",
    name: `Muse offline review ${suffix}`,
    accessToken: dcaToken,
    refreshToken: dcaToken,
    providerSpecificData: { dcaToken },
    expiresAt: OLD_EXPIRY,
    tokenExpiresAt: OLD_EXPIRY,
    isActive: true,
    testStatus: "active",
  });
  const before = await readConnection(created.id as string);
  const credentials = { ...before, connectionId: created.id };
  let mintCalls = 0;
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    assert.equal(requestUrl(input), MUSE_CODE_MINT_URL);
    mintCalls++;
    throw new DOMException("Offline mint timeout", "TimeoutError");
  });
  // A rejection here escapes handleChat as a bare 500 and skips the account fallback.
  const result = await checkAndRefreshToken("muse-code", credentials);
  assert.equal(mintCalls, 1);
  assert.deepEqual(result, credentials);
  assert.deepEqual(await readConnection(created.id as string), before);
});

test("successful proactive Muse remint preserves the explicit non-expiring transition", async (t) => {
  const created = await createMuse();
  const before = await readConnection(created.id as string);
  let mintCalls = 0;
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    assert.equal(requestUrl(input), MUSE_CODE_MINT_URL);
    mintCalls++;
    return Response.json({ api_key: "LLM|offline-proactive-transition" });
  });

  const result = await checkAndRefreshToken("muse-code", {
    ...before,
    connectionId: created.id,
  });
  assert.equal(mintCalls, 1);
  assert.equal(result.accessToken, "LLM|offline-proactive-transition");
  assert.equal(result.expiresAt, null, "do not revive the expired device-token lifetime");
  const stored = await readConnection(created.id as string);
  assert.equal(stored.accessToken, result.accessToken);
  assertNoExpiry(stored);
});

test("proactive refresh still propagates a nontransient credential programming error", async (t) => {
  const created = await createMuse();
  const defect = new TypeError("Offline credential adapter defect");
  const credentials = {
    ...created,
    connectionId: created.id,
    providerSpecificData: {
      get dcaToken(): string {
        throw defect;
      },
    },
  };
  const fetch = t.mock.method(globalThis, "fetch", async () => {
    throw new Error("Credential adapter must fail before upstream is called");
  });
  await assert.rejects(
    () => checkAndRefreshToken("muse-code", credentials),
    (error) => error === defect
  );
  assert.equal(fetch.mock.callCount(), 0);
});

test("proactive Muse credentials with no expiry do not mint", async (t) => {
  const created = await createMuse(null);
  const credentials = { ...created, connectionId: created.id };
  const fetch = t.mock.method(globalThis, "fetch", async () => {
    throw new Error("A no-expiry inference key does not need proactive minting");
  });
  assert.deepEqual(await checkAndRefreshToken("muse-code", credentials), credentials);
  assert.equal(fetch.mock.callCount(), 0);
});

for (const [index, message] of POLICY_MESSAGES.entries()) {
  test(`ownerless Muse policy 403 leaves model and account state untouched (${index + 1})`, async () => {
    const created = await createMuse(null);
    const id = created.id as string;
    const before = healthState(await readConnection(id));
    // This is the account-marking seam used when chat has no Muse session owner.
    await markAccountUnavailable(id, 403, message, "muse-code", MODEL);
    assert.deepEqual(
      {
        lockout: getModelLockoutInfo("muse-code", id, MODEL),
        health: healthState(await readConnection(id)),
      },
      { lockout: null, health: before },
      "a client-only subscription restriction is not evidence against this account or model"
    );
  });
}

test("ownerless generic Muse 403 still locks the failing model", async () => {
  const created = await createMuse(null);
  const id = created.id as string;
  await markAccountUnavailable(id, 403, "Forbidden", "muse-code", MODEL);
  assert.equal(getModelLockoutInfo("muse-code", id, MODEL)?.reason, "forbidden");
  assert.equal((await readConnection(id)).isActive, true);
});

async function runCombo(id: string, message: string) {
  let calls = 0;
  const result = await handleComboChat({
    body: { model: "offline-muse-review", messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: `offline-muse-review-${++sequence}`,
      strategy: "priority",
      models: [{ model: `muse-code/${MODEL}`, connectionId: id }],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, maxSetRetries: 0 },
    },
    settings: {
      modelLockout: {
        enabled: true,
        errorCodes: [403],
        baseCooldownMs: 60_000,
        maxCooldownMs: 60_000,
      },
    },
    log: { info() {}, warn() {}, debug() {}, error() {} },
    allCombos: [],
    handleSingleModel: async () => {
      calls++;
      return Response.json(
        { error: { message } },
        {
          status: 403,
          headers: { "x-omniroute-selected-connection-id": id },
        }
      );
    },
  });
  return { result, calls };
}

for (const [index, message] of POLICY_MESSAGES.entries()) {
  test(`combo Muse policy 403 preserves the upstream rejection without model/account lockout (${index + 1})`, async () => {
    const created = await createMuse(null);
    const id = created.id as string;
    const before = healthState(await readConnection(id));
    const { result, calls } = await runCombo(id, message);
    assert.equal(calls, 1, "exercise the actual combo dispatch, without retrying upstream");
    assert.equal(result.status, 403);
    assert.ok((await result.text()).includes(message), "preserve the original policy diagnostic");
    assert.deepEqual(
      {
        lockout: getModelLockoutInfo("muse-code", id, MODEL),
        health: healthState(await readConnection(id)),
      },
      { lockout: null, health: before }
    );
  });
}

test("combo generic Muse 403 still records a model lockout and returns the forbidden error", async () => {
  const created = await createMuse(null);
  const id = created.id as string;
  const { result, calls } = await runCombo(id, "Forbidden");
  assert.equal(calls, 1);
  assert.equal(result.status, 403);
  assert.ok((await result.text()).includes("Forbidden"));
  assert.equal(getModelLockoutInfo("muse-code", id, MODEL)?.reason, "auth_error");
});

test("dashboard repeated tests of a no-expiry Muse key never remint or fabricate expiry", async (t) => {
  const created = await createMuse(null);
  const id = created.id as string;
  const before = await readConnection(id);
  let mintCalls = 0;
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    assert.equal(requestUrl(input), MUSE_CODE_MINT_URL);
    mintCalls++;
    return Response.json({ api_key: "LLM|offline-dashboard-unnecessary-remint" });
  });
  for (let attempt = 0; attempt < 2; attempt++) {
    const result = await testSingleConnection(id, undefined, {
      allowLocalRuntimeProbe: false,
      allowLocalSpawn: false,
    });
    assert.equal(result.valid, true);
  }
  const stored = await readConnection(id);
  assert.equal(mintCalls, 0, "dashboard tests must reuse an already minted no-expiry key");
  assert.equal(stored.accessToken, before.accessToken);
  assert.equal(stored.refreshToken, before.refreshToken);
  assertNoExpiry(stored);
});

test("dashboard successful stale Muse remint clears both expiry columns instead of adding 30 minutes", async (t) => {
  const created = await createMuse();
  const id = created.id as string;
  let mintCalls = 0;
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    assert.equal(requestUrl(input), MUSE_CODE_MINT_URL);
    mintCalls++;
    return Response.json({ api_key: "LLM|offline-dashboard-fresh" });
  });
  const result = await testSingleConnection(id, undefined, {
    allowLocalRuntimeProbe: false,
    allowLocalSpawn: false,
  });
  assert.equal(result.valid, true);
  assert.equal(mintCalls, 1);
  const stored = await readConnection(id);
  assert.equal(stored.accessToken, "LLM|offline-dashboard-fresh");
  assert.equal(stored.refreshToken, created.refreshToken);
  assertNoExpiry(stored);
});

test("dashboard other OAuth providers still refresh unknown expiry and retain fallback expiry", async (t) => {
  const created = await providers.createProviderConnection({
    provider: "codebuddy-cn",
    authType: "oauth",
    name: "Offline unknown-expiry control",
    accessToken: "offline-codebuddy-cn-old",
    refreshToken: "offline-codebuddy-cn-refresh",
    isActive: true,
    testStatus: "active",
  });
  let refreshCalls = 0;
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    assert.equal(requestUrl(input), CODEBUDDY_CN_CONFIG.refreshUrl);
    refreshCalls++;
    return Response.json({ code: 0, data: { accessToken: "offline-codebuddy-cn-fresh" } });
  });
  const start = Date.now();
  const result = await testSingleConnection(created.id as string, undefined, {
    allowLocalRuntimeProbe: false,
    allowLocalSpawn: false,
  });
  assert.equal(result.valid, true);
  assert.equal(refreshCalls, 1);
  const stored = await readConnection(created.id as string);
  assert.equal(stored.accessToken, "offline-codebuddy-cn-fresh");
  assert.equal(stored.expiresAt, stored.tokenExpiresAt);
  assert.ok(Date.parse(stored.expiresAt as string) >= start + 30 * 60 * 1000);
  assert.ok(Date.parse(stored.expiresAt as string) <= Date.now() + 30 * 60 * 1000);
});
