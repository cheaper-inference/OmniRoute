import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { ProviderExecutionPipelineInput } from "../../open-sse/handlers/chatCore/providerExecutionPipeline.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-muse-refresh-policy-"));
const fixtureEnv = {
  DATA_DIR: dataDir,
  NODE_ENV: "test",
  API_KEY_SECRET: "muse-refresh-policy-fixture-secret",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  APP_LOG_TO_FILE: "false",
  OMNIROUTE_PLUGINS_DIR: path.join(dataDir, "plugins"),
  OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK: "1",
  OMNIROUTE_HIDE_HEALTHCHECK_LOGS: "1",
  OMNIROUTE_HEALTHCHECK_SKIP_PROVIDERS: "",
};
const previousEnv = new Map(Object.keys(fixtureEnv).map((key) => [key, process.env[key]]));
Object.assign(process.env, fixtureEnv);
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => {
  throw new Error("Unexpected fetch: Muse refresh policy tests must stay offline");
};

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const health = await import("../../src/lib/tokenHealthCheck.ts");
const { updateProviderCredentials } = await import("../../src/sse/services/tokenRefresh.ts");
const { buildOAuthConnectionCreatePayload } =
  await import("../../src/lib/oauth/connectionPersistence.ts");
const { museCode } = await import("../../src/lib/oauth/providers/muse-code.ts");
const { refreshMuseCodeToken } =
  await import("../../open-sse/services/tokenRefresh/providers/museCode.ts");
const { MUSE_CODE_MINT_URL } = await import("../../open-sse/config/museCode.ts");
const { OAUTH_ENDPOINTS } = await import("../../open-sse/config/constants.ts");
const { shouldSkipCredentialRefresh } =
  await import("../../open-sse/handlers/chatCore/skipCredentialRefresh.ts");
const { runProviderExecutionPipeline } =
  await import("../../open-sse/handlers/chatCore/providerExecutionPipeline.ts");

assert.equal(core.DATA_DIR, dataDir, "all persistence must use the disposable database");

const OLD_EXPIRY = "2000-01-01T00:00:00.000Z";
const DCA_TOKEN = "dca:muse-refresh-policy-fixture";
const MINTED_KEY = "LLM|muse-refresh-policy-fixture";
const POLICY_MESSAGES = [
  "This API key is billed to a Muse Code subscription.",
  "Muse Code subscriptions cover requests from the Muse Code client only.",
];

function requestUrl(input: RequestInfo | URL): string {
  return typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
}

async function readConnection(id: string) {
  const row = await providers.getProviderConnectionById(id);
  assert.ok(row, "fixture connection must remain stored");
  return row;
}

async function createMuseConnection(accessToken = DCA_TOKEN) {
  const mapped = museCode.mapTokens({ access_token: DCA_TOKEN, expires_in: 600 });
  const created = await providers.createProviderConnection(
    buildOAuthConnectionCreatePayload(
      "muse-code",
      {
        ...mapped,
        accessToken,
        name: "Muse refresh policy fixture",
        healthCheckInterval: 60,
        isActive: true,
        testStatus: "active",
      },
      OLD_EXPIRY
    )
  );
  return readConnection(created.id as string);
}

function assertDurableDca(row: Record<string, unknown>) {
  assert.equal(row.refreshToken, DCA_TOKEN);
  assert.equal((row.providerSpecificData as Record<string, unknown>).dcaToken, DCA_TOKEN);
}

function assertNoInferenceExpiry(row: Record<string, unknown>) {
  // DB readers omit SQL NULL columns, so either public null representation is valid.
  assert.equal(row.expiresAt ?? null, null, "clear the inherited DCA expiresAt");
  assert.equal(row.tokenExpiresAt ?? null, null, "clear the badge/scheduler tokenExpiresAt");
}

test.after(() => {
  test.mock.restoreAll();
  globalThis.fetch = originalFetch;
  health.stopTokenHealthCheck();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of previousEnv) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test("Muse remint explicitly reports a non-expiring inference key and retains DCA", async (t) => {
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    assert.equal(requestUrl(input), MUSE_CODE_MINT_URL);
    return Response.json({ api_key: MINTED_KEY });
  });
  const result = await refreshMuseCodeToken(DCA_TOKEN, { dcaToken: DCA_TOKEN }, null);
  assert.ok(result && "accessToken" in result);
  assert.equal(result.accessToken, MINTED_KEY);
  assert.equal(result.refreshToken, DCA_TOKEN);
  assert.equal(result.providerSpecificData.dcaToken, DCA_TOKEN);
  const lifetime = result as { expiresAt?: string | null; expiresIn?: number };
  assert.equal(lifetime.expiresAt, null, "undefined is not an explicit non-expiring transition");
  assert.equal(lifetime.expiresIn, undefined, "do not invent an inference-key lifetime");
});

test("Muse health remint clears both persisted expiries and skips the next minute tick", async (t) => {
  let mintCalls = 0;
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
    assert.equal(requestUrl(input), MUSE_CODE_MINT_URL);
    assert.equal(new Headers(init?.headers).get("authorization"), `Bearer ${DCA_TOKEN}`);
    mintCalls += 1;
    return Response.json({ api_key: MINTED_KEY });
  });
  const created = await createMuseConnection();
  await health.checkConnection(created);
  core.resetDbInstance();
  const stored = await readConnection(created.id as string);
  assert.equal(mintCalls, 1, "the real health path must reach the mocked mint");
  assert.equal(stored.accessToken, MINTED_KEY);
  assertDurableDca(stored);
  assertNoInferenceExpiry(stored);
  assert.equal(typeof stored.lastHealthCheckAt, "string");

  const nextTick = Date.parse(stored.lastHealthCheckAt as string) + 60_001;
  t.mock.method(Date, "now", () => nextTick);
  await health.checkConnection(stored);
  assert.equal(mintCalls, 1, "stale DCA expiry must not trigger another mint next minute");
});

test("request credential persistence clears both expiries for an explicit Muse transition", async () => {
  const created = await createMuseConnection();
  const updated = await updateProviderCredentials(created.id as string, {
    accessToken: MINTED_KEY,
    expiresAt: null,
  });
  assert.equal(updated, true);
  core.resetDbInstance();
  const stored = await readConnection(created.id as string);
  assert.equal(stored.accessToken, MINTED_KEY);
  assertDurableDca(stored);
  assertNoInferenceExpiry(stored);
});

test("non-Muse refreshes without an expiry preserve both stored expiries in both persistence paths", async (t) => {
  let refreshCalls = 0;
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    assert.equal(requestUrl(input), OAUTH_ENDPOINTS.google.token);
    refreshCalls += 1;
    return Response.json({ access_token: "gemini-refreshed-fixture" });
  });
  const created = await providers.createProviderConnection(
    buildOAuthConnectionCreatePayload(
      "gemini",
      {
        name: "Gemini missing-expiry fixture",
        accessToken: "gemini-old-fixture",
        refreshToken: "gemini-durable-fixture",
        healthCheckInterval: 60,
        isActive: true,
        testStatus: "active",
      },
      OLD_EXPIRY
    )
  );
  await health.checkConnection(created);
  let stored = await readConnection(created.id as string);
  assert.equal(refreshCalls, 1);
  assert.equal(stored.accessToken, "gemini-refreshed-fixture");
  assert.equal(stored.expiresAt, OLD_EXPIRY);
  assert.equal(stored.tokenExpiresAt, OLD_EXPIRY);

  for (const expiryFields of [{}, { expiresIn: undefined, expiresAt: undefined }]) {
    assert.equal(
      await updateProviderCredentials(created.id as string, {
        accessToken: "gemini-request-fixture",
        ...expiryFields,
      }),
      true
    );
    stored = await readConnection(created.id as string);
    assert.equal(stored.accessToken, "gemini-request-fixture");
    assert.equal(stored.expiresAt, OLD_EXPIRY);
    assert.equal(stored.tokenExpiresAt, OLD_EXPIRY);
    assert.equal(stored.refreshToken, "gemini-durable-fixture");
  }
});

test("Muse remint propagates a mint TimeoutError instead of returning an unclassified null", async (t) => {
  const timeout = new DOMException("Fixture mint timed out", "TimeoutError");
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    assert.equal(requestUrl(input), MUSE_CODE_MINT_URL);
    throw timeout;
  });
  await assert.rejects(() => refreshMuseCodeToken(DCA_TOKEN, { dcaToken: DCA_TOKEN }, null), {
    name: "TimeoutError",
  });
});

test("Muse health timeout retains access and DCA credentials and records transient retry", async (t) => {
  let mintCalls = 0;
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    assert.equal(requestUrl(input), MUSE_CODE_MINT_URL);
    mintCalls += 1;
    throw new DOMException("Fixture mint timed out", "TimeoutError");
  });
  const created = await createMuseConnection("LLM|existing-timeout-fixture");
  await health.checkConnection(created);
  const stored = await readConnection(created.id as string);
  assert.equal(mintCalls, 1);
  assert.equal(stored.accessToken, "LLM|existing-timeout-fixture");
  assertDurableDca(stored);
  assert.equal(stored.expiresAt, OLD_EXPIRY);
  assert.equal(stored.tokenExpiresAt, OLD_EXPIRY);
  assert.equal(stored.isActive, true);
  assert.equal(stored.testStatus, "active");
  assert.equal(stored.lastErrorType, "token_refresh_transient");
  assert.equal(stored.errorCode, "refresh_transient");
  const circuit = (stored.providerSpecificData as Record<string, unknown>).refreshCircuit as {
    streak: number;
    transient: boolean;
    until: string;
  };
  assert.equal(circuit.streak, 0, "a timeout must not increment permanent failure streaks");
  assert.equal(circuit.transient, true);
  assert.ok(Date.parse(circuit.until) > Date.parse(stored.lastHealthCheckAt as string));
  await health.checkConnection(stored);
  assert.equal(mintCalls, 1, "the persisted retry window prevents an immediate retry");
});

for (const message of POLICY_MESSAGES) {
  test(`Muse subscription policy 403 skips refresh and leaves the body readable: ${message}`, async () => {
    const body = JSON.stringify({ error: { message } });
    const response = new Response(body, { status: 403 });
    const skip = await shouldSkipCredentialRefresh("muse-code", response);
    assert.equal(response.bodyUsed, false);
    assert.equal(await response.text(), body);
    assert.equal(skip, true);
  });
}

test("credential-refresh skip remains scoped to Muse subscription-policy 403", async () => {
  for (const [provider, status, message] of [
    ["muse-code", 401, "Invalid access token"],
    ["muse-code", 403, "Forbidden"],
    ["muse-code", 403, "A Muse Code subscription is required"],
    ["muse-code", 401, POLICY_MESSAGES[0]],
    ["muse-code", 500, POLICY_MESSAGES[1]],
    ["openai", 403, POLICY_MESSAGES[0]],
    ["openai", 403, POLICY_MESSAGES[1]],
  ] as const) {
    const body = JSON.stringify({ error: { message } });
    const response = new Response(body, { status });
    assert.equal(
      await shouldSkipCredentialRefresh(provider, response),
      false,
      `${provider}/${status}`
    );
    assert.equal(response.bodyUsed, false);
    assert.equal(await response.text(), body);
  }
});

test("Muse pipeline returns the original policy 403 after one upstream call and zero remints", async () => {
  const body = JSON.stringify({ error: { message: POLICY_MESSAGES[1] } });
  let upstreamCalls = 0;
  let refreshCalls = 0;
  let persistenceCalls = 0;
  let credentials: Record<string, unknown> = {
    connectionId: "muse-policy-fixture",
    accessToken: MINTED_KEY,
    refreshToken: DCA_TOKEN,
  };
  const input: ProviderExecutionPipelineInput = {
    policy: { allowAccountRotation: false, allowModelFallback: false },
    target: {
      provider: "muse-code",
      requestedModel: "muse-fixture-model",
      sourceFormat: "openai",
      targetFormat: "openai",
      stream: false,
    },
    connection: {
      initialConnectionId: "muse-policy-fixture",
      getCurrentConnectionId: () => "muse-policy-fixture",
      getCredentials: () => credentials,
      replaceCredentials: (next) => {
        credentials = next;
      },
      onCredentialsRefreshed: () => {
        persistenceCalls += 1;
      },
      refreshCredentials: async () => {
        refreshCalls += 1;
        return { accessToken: "LLM|unnecessary-remint-fixture" };
      },
      assertManagedLeaseFence() {},
      getProviderCredentials: async () => {
        throw new Error("Policy rejection must not resolve replacement credentials");
      },
    },
    wire: {
      body: { model: "muse-fixture-model", messages: [{ role: "user", content: "hi" }] },
      currentModel: "muse-fixture-model",
      triedModels: new Set(["muse-fixture-model"]),
      setBodyAndModel() {},
    },
    state: {
      updatePendingStage() {},
      recordRateLimitHeaders() {},
      recordRateLimitBody() {},
      async writeTerminalStatus() {},
      async persistConnectionPatch() {
        return null;
      },
      setConnectionRateLimitedUntil() {},
      lockModel() {},
      async recordAntigravityQuotaState() {},
      markAccountSemaphoreBlocked() {},
      isolateProbeFailures: () => false,
    },
    sendProviderAttempt: async () => {
      upstreamCalls += 1;
      return {
        response: new Response(body, { status: 403 }),
        url: "https://offline.invalid/v1/chat/completions",
        headers: {},
        transformedBody: { model: "muse-fixture-model" },
      };
    },
  };
  const outcome = await runProviderExecutionPipeline(input);
  assert.equal(outcome.kind, "error");
  if (outcome.kind !== "error") return;
  assert.equal(outcome.result.status, 403);
  assert.equal(outcome.result.response.status, 403);
  assert.equal(
    await outcome.result.response.text(),
    body,
    "preserve the readable original rejection"
  );
  assert.equal(refreshCalls, 0);
  assert.equal(persistenceCalls, 0);
  assert.equal(upstreamCalls, 1);
});
