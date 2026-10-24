import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-refresh-gate-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "synthetic-refresh-gate-secret";
process.env.REQUIRE_API_KEY = "false";
const core = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/providers.ts");
const settings = await import("../../src/lib/db/settings.ts");
const cache = await import("../../src/lib/db/readCache.ts");
const tokens = await import("../../open-sse/services/tokenRefresh.ts");
const wrappers = await import("../../src/sse/services/tokenRefresh.ts");
const { handleChat } = await import("../../src/sse/handlers/chat.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { fetchAndPersistProviderLimits } = await import("../../src/lib/usage/providerLimits.ts");
const manual = await import("../../src/app/api/providers/[id]/refresh/route.ts");
const probe = await import("../../src/app/api/providers/[id]/test/route.ts");
const health = await import("../../src/lib/tokenHealthCheck.ts");
const importer = await import("../../src/app/api/oauth/codex/import/route.ts");
const { listCodexResetCredits } = await import("../../src/lib/usage/codexResetCredits.ts");
const { markAccountUnavailable } = await import("../../src/sse/services/auth.ts");
const { validateWebRuntimeEnv } = await import("../../src/lib/env/runtimeEnv.ts");
const originalFetch = globalThis.fetch;
let tokenCalls = 0;
let dispatches: string[] = [];
let passive = true;
const quiet = { debug() {}, info() {}, warn() {}, error() {} };

function request(url: string, body: unknown) {
  return new Request(`http://localhost${url}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}
function chat(stream = false) {
  return handleChat(
    request("/v1/chat/completions", {
      model: "cx/gpt-5.5",
      messages: [{ role: "user", content: "synthetic" }],
      stream,
    })
  );
}
async function connection(seconds = 3600) {
  return await db.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "synthetic-refresh-gate",
    email: `${crypto.randomUUID()}@example.invalid`,
    accessToken: "synthetic-access",
    refreshToken: "synthetic-refresh",
    idToken: "synthetic-id",
    expiresAt: new Date(Date.now() + seconds * 1000).toISOString(),
    isActive: true,
    testStatus: "active",
    healthCheckInterval: 1,
    providerSpecificData: { workspaceId: "synthetic-workspace" },
  });
}
function mockFetch(onDispatch?: () => Promise<void>, status = 401) {
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url.includes("auth.openai.com/oauth/token")) {
      tokenCalls++;
      assert.equal(passive, false, "passive refresh must never reach the Codex token endpoint");
      return Response.json({ error: { code: "invalid_grant" } }, { status: 400 });
    }
    assert.match(url, /chatgpt.com\/backend-api/);
    dispatches.push(new Headers(init?.headers).get("authorization") || "");
    await onDispatch?.();
    return Response.json({ error: { message: "synthetic invalid token" } }, { status });
  };
}
async function nonterminal(id: string) {
  await new Promise((resolve) => setImmediate(resolve));
  const row = await db.getProviderConnectionById(id);
  assert.notEqual(row.testStatus, "expired");
  assert.equal(row.isActive, true);
  assert.equal(row.providerSpecificData?.refreshCircuit, undefined);
  assert.equal(tokens.getCircuitBreakerStatus().codex, undefined);
  return row;
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  await settings.updateSettings({
    requireLogin: false,
    requireApiKey: false,
    fallbackStrategy: "fill-first",
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });
  process.env.OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS = "codex";
  process.env.HEALTHCHECK_STAGGER_MS = "0";
  passive = true;
  const now = Date.now;
  Date.now = () => now() + 31 * 60 * 1000;
  delete process.env.OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS;
  try {
    await tokens.refreshWithRetry(
      async () => ({ accessToken: "synthetic-breaker-reset" }),
      1,
      quiet,
      "codex"
    );
  } finally {
    Date.now = now;
    process.env.OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS = "codex";
  }
  tokenCalls = 0;
  dispatches = [];
  mockFetch();
});
test.after(() => {
  globalThis.fetch = originalFetch;
  delete process.env.OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

for (const enabled of [true, false]) {
  for (const stream of [false, true]) {
    for (const proactive of [true, false]) {
      test(`chat ${proactive ? "proactive expiry" : "reactive authentication"} avoids token exchange only when passive=${enabled} stream=${stream}`, async () => {
        passive = enabled;
        if (!enabled) delete process.env.OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS;
        const c = await connection(proactive ? 30 : 3600);
        const response = await chat(stream);
        await response.text();
        assert.equal(response.status, 401);
        if (enabled) {
          assert.equal(tokenCalls, 0);
          assert.deepEqual(dispatches, ["Bearer synthetic-access"]);
          const row = await nonterminal(c.id);
          assert.ok(Date.parse(row.rateLimitedUntil) > Date.now(), "upstream 401 retains cooldown");
          assert.equal(row.providerSpecificData.apiKeyHealth.primary.failures, 1);
        } else {
          assert.ok(tokenCalls > 0, "active control reaches the real refresher");
        }
      });
    }
  }
  for (const entry of [
    "usage",
    "health sweep",
    "import",
    "manual",
    "connection test",
    "reset credits",
    "wrapper",
    "generic",
  ] as const) {
    test(`${entry} avoids Codex token exchange only when passive=${enabled}`, async () => {
      passive = enabled;
      if (!enabled) delete process.env.OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS;
      const c = await connection(30);
      if (entry === "usage") {
        await fetchAndPersistProviderLimits(c.id, "manual", { allowRotatingRefresh: true });
      } else if (entry === "health sweep") {
        assert.equal(await health.sweep(), 1);
      } else if (entry === "import") {
        const response = await importer.POST(
          request("/api/oauth/codex/import", {
            accounts: {
              access_token: "synthetic-import-access",
              refresh_token: "synthetic-import-refresh",
              email: "synthetic-import@example.invalid",
            },
          })
        );
        const body = await response.json();
        assert.equal(body.imported, enabled ? 1 : 0);
        if (enabled) {
          const imported = (await db.getProviderConnections({ provider: "codex" })).find(
            (r) => r.email === "synthetic-import@example.invalid"
          );
          assert.equal(imported.accessToken, "synthetic-import-access");
          assert.equal(imported.refreshToken, "synthetic-import-refresh");
        }
      } else if (entry === "manual") {
        const response = await manual.POST(request(`/api/providers/${c.id}/refresh`, {}), {
          params: Promise.resolve({ id: c.id }),
        });
        const body = await response.json();
        assert.equal(response.status, enabled ? 409 : 200);
        if (enabled) {
          assert.equal(body.code, "refresh_disabled");
          assert.match(body.error, /passive.*codex|codex.*passive/i);
        } else {
          assert.equal(body.skipped, true);
        }
      } else if (entry === "connection test") {
        await probe.testOAuthConnection(c);
      } else if (entry === "reset credits") {
        await assert.rejects(listCodexResetCredits(c.id));
      } else if (entry === "wrapper") {
        await wrappers.refreshCodexToken(c.refreshToken, { ...c, connectionId: c.id });
      } else {
        await tokens.refreshAccessToken(
          "codex",
          c.refreshToken,
          { ...c, connectionId: c.id },
          quiet
        );
      }
      if (enabled || entry === "manual") assert.equal(tokenCalls, 0);
      else
        assert.ok(tokenCalls > 0, "active control reaches the token endpoint where base refreshes");
      if (enabled) await nonterminal(c.id);
    });
  }
}

for (const stream of [false, true]) {
  for (const stored of ["different", "unchanged", "expired"] as const) {
    test(`reactive retry uses a different unexpired synchronized token exactly once: ${stored} stream=${stream}`, async () => {
      const c = await connection();
      mockFetch(async () => {
        if (dispatches.length === 1)
          await db.updateProviderConnection(c.id, {
            accessToken: stored === "unchanged" ? c.accessToken : "synthetic-synchronized",
            expiresAt: new Date(
              Date.now() + (stored === "expired" ? -60000 : 3600000)
            ).toISOString(),
          });
      });
      const response = await chat(stream);
      await response.text();
      assert.equal(response.status, 401);
      assert.deepEqual(
        dispatches,
        stored === "different"
          ? ["Bearer synthetic-access", "Bearer synthetic-synchronized"]
          : ["Bearer synthetic-access"]
      );
      assert.equal(tokenCalls, 0);
      await nonterminal(c.id);
    });
  }
}

for (const stream of [false, true]) {
  test(`authentication rollback never dispatches a rejected token twice stream=${stream}`, async () => {
    const c = await connection();
    mockFetch(async () => {
      await db.updateProviderConnection(c.id, {
        accessToken: dispatches.length === 1 ? "synthetic-synchronized" : c.accessToken,
      });
    });
    const response = await chat(stream);
    await response.text();
    assert.equal(response.status, 401);
    assert.deepEqual(dispatches, ["Bearer synthetic-access", "Bearer synthetic-synchronized"]);
    assert.equal(new Set(dispatches).size, dispatches.length);
    const row = await nonterminal(c.id);
    assert.equal(row.providerSpecificData.apiKeyHealth.primary.failures, 2);
    assert.ok(Date.parse(row.rateLimitedUntil) > Date.now());
    assert.equal(tokenCalls, 0);
  });
}

test("rejected token fingerprints are bounded to the newest four and isolated by request", async () => {
  const helper = await import("../../open-sse/services/tokenRefresh/passiveCodex.ts");
  assert.equal("getAllRejectedTokens" in helper, false);
  assert.equal("rejectedTokens" in helper, false);
  assert.deepEqual(
    Object.keys(helper).sort(),
    [
      "PASSIVE_CODEX_IDS",
      "PASSIVE_REFRESH_ENV",
      "PASSIVE_REFRESH_MESSAGE",
      "adoptPassiveCodex",
      "getRejectedTokenFingerprints",
      "isPassiveCodex",
      "parsePassiveProviders",
      "passiveProvidersError",
      "recordRejectedToken",
      "resolvePassiveCodex",
    ].sort()
  );
  const c = await connection();
  const first = { ...c, connectionId: c.id };
  assert.deepEqual(helper.getRejectedTokenFingerprints(first), []);
  const rejected: string[] = [];
  for (let i = 0; i < 9; i++) {
    first.accessToken = `synthetic-rejected-access-${i}`;
    rejected.push(first.accessToken);
    helper.recordRejectedToken(first);
    const fingerprints = helper.getRejectedTokenFingerprints(first);
    assert.equal(fingerprints.length, Math.min(i + 1, 4));
    for (const fp of fingerprints) {
      assert.match(fp, /^[a-f0-9]{64}$/);
      for (const token of rejected) assert.equal(fp.includes(token), false);
    }
  }
  const { createHash } = await import("node:crypto");
  assert.deepEqual(
    helper.getRejectedTokenFingerprints(first),
    rejected.slice(-4).map((token) => createHash("sha256").update(token).digest("hex"))
  );
  const snapshot = helper.getRejectedTokenFingerprints(first);
  snapshot.length = 0;
  assert.equal(helper.getRejectedTokenFingerprints(first).length, 4);
  await db.updateProviderConnection(c.id, { accessToken: rejected.at(-1) });
  first.accessToken = "synthetic-current";
  assert.equal((await helper.resolvePassiveCodex(first)).error, "refresh_disabled");
  const second = { ...c, connectionId: c.id };
  assert.deepEqual(helper.getRejectedTokenFingerprints(second), []);
  assert.equal((await helper.resolvePassiveCodex(second)).accessToken, rejected.at(-1));
});

test("active authentication recovery never invokes passive credential helpers", async () => {
  delete process.env.OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS;
  passive = false;
  const c = await connection(30);
  const { default: cryptoModule } = await import("node:crypto");
  const { syncBuiltinESMExports } = await import("node:module");
  const createHash = cryptoModule.createHash;
  const database = core.getDbInstance();
  const prepare = database.prepare;
  let helperCalls = 0;
  cryptoModule.createHash = (...args: Parameters<typeof createHash>) => {
    if (new Error().stack?.includes("passiveCodex")) helperCalls++;
    return createHash(...args);
  };
  syncBuiltinESMExports();
  database.prepare = function (sql: string) {
    if (new Error().stack?.includes("resolvePassiveCodex")) helperCalls++;
    return prepare.call(this, sql);
  };
  try {
    const helper = await import("../../open-sse/services/tokenRefresh/passiveCodex.ts");
    helper.recordRejectedToken({ accessToken: "synthetic-spy-control" });
    await helper.resolvePassiveCodex({ ...c, connectionId: c.id });
    assert.ok(helperCalls > 0, "spies detect passive helpers on copied credentials");
    helperCalls = 0;
    const result = await handleChatCore({
      body: { model: "gpt-5.5", input: "synthetic", stream: true },
      modelInfo: { provider: "codex", model: "gpt-5.5" },
      credentials: { ...c, connectionId: c.id },
      log: quiet,
      clientRawRequest: { endpoint: "/v1/responses", headers: new Headers(), body: {} },
    });
    await result.response.text();
    assert.equal(result.response.status, 401);
    assert.ok(tokenCalls > 0);
    assert.equal(helperCalls, 0);
  } finally {
    database.prepare = prepare;
    cryptoModule.createHash = createHash;
    syncBuiltinESMExports();
  }
});

test("shared entry points bypass cached rows, return only token fields and never persist adoption", async () => {
  const c = await connection();
  const credentials = {
    ...c,
    connectionId: c.id,
    providerSpecificData: {
      _omnirouteCodexThinking: { supportedThinkingEfforts: ["low"], defaultThinkingEffort: "low" },
      workspaceId: "synthetic-local-workspace",
    },
  };
  await cache.getCachedProviderConnectionById(c.id);
  await db.updateProviderConnection(c.id, { accessToken: "synthetic-synchronized" });
  let writes = 0;
  const database = core.getDbInstance();
  const prepare = database.prepare;
  database.prepare = function (sql: string) {
    if (/^UPDATE provider_connections/i.test(sql)) writes++;
    return prepare.call(this, sql);
  };
  let persists = 0;
  try {
    for (const provider of ["codex", "cx"]) {
      const result = await tokens.getAccessToken(provider, credentials, quiet, null, async () => {
        persists++;
      });
      assert.equal(result.accessToken, "synthetic-synchronized");
      assert.deepEqual(
        Object.keys(result).sort(),
        ["accessToken", "expiresAt", "idToken", "refreshToken", "tokenExpiresAt"].sort()
      );
      assert.deepEqual(
        { ...credentials, ...result }.providerSpecificData,
        credentials.providerSpecificData
      );
    }
    assert.equal(persists, 0);
    assert.equal(writes, 0);
  } finally {
    database.prepare = prepare;
  }
});

test("shared refresh without a connection or a new usable token returns non-terminal refresh_disabled", async () => {
  const c = await connection();
  const current = { ...c, connectionId: c.id };
  for (const creds of [
    current,
    { refreshToken: "synthetic-refresh" },
    { connectionId: "synthetic-missing" },
  ]) {
    const result = await tokens.getAccessToken("codex", creds, quiet);
    assert.equal(result.error, "refresh_disabled");
    assert.equal(tokens.isUnrecoverableRefreshError(result), false);
  }
  for (let i = 0; i < 8; i++) {
    await tokens.refreshWithRetry(
      () => tokens.getAccessToken("codex", current, quiet),
      1,
      quiet,
      "codex"
    );
  }
  await nonterminal(c.id);
  assert.equal(tokenCalls, 0);
});

test("adoption during chatCore recovery preserves request-local metadata without writing credentials", async () => {
  const c = await connection();
  const localData = {
    _omnirouteCodexThinking: { supportedThinkingEfforts: ["low"], defaultThinkingEffort: "low" },
    workspaceId: "synthetic-local-workspace",
  };
  let callbacks = 0;
  mockFetch(async () => {
    if (dispatches.length === 1)
      await db.updateProviderConnection(c.id, { accessToken: "synthetic-synchronized" });
  });
  const credentials = { ...c, connectionId: c.id, providerSpecificData: localData };
  const result = await handleChatCore({
    body: { model: "gpt-5.5", input: "synthetic", stream: false },
    modelInfo: { provider: "codex", model: "gpt-5.5" },
    credentials,
    log: quiet,
    clientRawRequest: { endpoint: "/v1/responses", headers: new Headers(), body: {} },
    onCredentialsRefreshed: async () => {
      callbacks++;
    },
  });
  await result.response.text();
  assert.deepEqual(dispatches, ["Bearer synthetic-access", "Bearer synthetic-synchronized"]);
  assert.deepEqual(credentials.providerSpecificData, localData);
  assert.equal(callbacks, 0);
});

test("passive authentication failures retain exponential cooldown and deactivation stays permanent", async () => {
  const c = await connection(-60);
  const now = Date.now;
  let clock = now();
  Date.now = () => clock;
  try {
    for (const expected of [5000, 10000, 20000, 40000, 80000, 120000, 120000]) {
      await markAccountUnavailable(c.id, 401, "synthetic invalid token", "codex", "gpt-5.5");
      const row = await nonterminal(c.id);
      const cooldown = Date.parse(row.rateLimitedUntil) - clock;
      assert.equal(cooldown, expected);
      clock += expected + 1000;
    }
    await markAccountUnavailable(
      c.id,
      401,
      "Your account has been deactivated",
      "codex",
      "gpt-5.5",
      undefined,
      { structuredError: { code: "account_deactivated" } }
    );
    const row = await db.getProviderConnectionById(c.id);
    assert.equal(row.lastErrorType, "account_deactivated");
    assert.equal(row.rateLimitedUntil ?? null, null);
    assert.ok(
      ["banned", "deactivated"].includes(String(row.testStatus)),
      "deactivation is a permanent lock"
    );
  } finally {
    Date.now = now;
  }
});

for (const stream of [false, true]) {
  test(`proactive adoption records the token actually dispatched so recovery cannot resend it stream=${stream}`, async () => {
    const c = await connection(30);
    await db.updateProviderConnection(c.id, { accessToken: "synthetic-synchronized" });
    const credentials = { ...c, connectionId: c.id };
    let persists = 0;
    const result = await handleChatCore({
      body: { model: "gpt-5.5", input: "synthetic", stream },
      modelInfo: { provider: "codex", model: "gpt-5.5" },
      credentials,
      log: quiet,
      onCredentialsRefreshed: async () => {
        persists++;
      },
      clientRawRequest: { endpoint: "/v1/responses", headers: new Headers(), body: {} },
    });
    await result.response.text();
    assert.equal(result.response.status, 401);
    assert.deepEqual(dispatches, ["Bearer synthetic-synchronized"]);
    assert.equal(credentials.accessToken, "synthetic-synchronized");
    assert.equal(persists, 0);
    assert.equal(tokenCalls, 0);
  });
}

test("passive gate logs never include token values or prefixes even when reread fails", async () => {
  const c = await connection();
  const lines: unknown[][] = [];
  const log = {
    info: (...args: unknown[]) => lines.push(args),
    warn: (...args: unknown[]) => lines.push(args),
    error: (...args: unknown[]) => lines.push(args),
  };
  await tokens.getAccessToken("codex", { ...c, connectionId: c.id }, log);
  await tokens.getAccessToken(
    "codex",
    { connectionId: "synthetic-missing", refreshToken: c.refreshToken },
    log
  );
  const database = core.getDbInstance();
  const prepare = database.prepare;
  const debug = console.debug;
  console.debug = (...args: unknown[]) => {
    lines.push(args);
  };
  database.prepare = function (sql: string) {
    if (sql === "SELECT * FROM provider_connections WHERE id = ?") {
      throw new Error(`synthetic database failure ${c.accessToken}`);
    }
    return prepare.call(this, sql);
  };
  try {
    assert.equal(
      (await tokens.getAccessToken("codex", { ...c, connectionId: c.id }, log)).error,
      "refresh_disabled"
    );
  } finally {
    database.prepare = prepare;
    console.debug = debug;
  }
  assert.equal(lines.length, 1);
  assert.deepEqual(lines[0], [
    "[TOKEN_REFRESH]",
    { provider: "codex", connectionId: c.id, reason: "reread failed" },
  ]);
  const text = JSON.stringify(lines);
  for (const material of [
    c.accessToken,
    c.refreshToken,
    c.idToken,
    "synthetic-ac",
    "synthetic-ref",
  ])
    assert.equal(text.includes(material), false);
});

test("startup accepts only Codex identities for passive refresh", () => {
  for (const value of ["codex", " CX, codex, ", ""]) {
    const result = validateWebRuntimeEnv({ OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS: value });
    assert.equal(
      result.errors.some((e) => e.name === "OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS"),
      false
    );
  }
  const result = validateWebRuntimeEnv({ OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS: "openai" });
  assert.equal(
    result.errors.some((e) => e.name === "OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS"),
    true
  );
});

test("other providers retain refresh behaviour while Codex is passive", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return Response.json({ access_token: "synthetic-google-access", expires_in: 3600 });
  };
  const result = await tokens.getAccessToken(
    "gemini",
    { refreshToken: "synthetic-google-refresh" },
    quiet
  );
  assert.equal(result.accessToken, "synthetic-google-access");
  assert.equal(calls, 1);
});
