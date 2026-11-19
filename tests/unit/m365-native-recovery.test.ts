import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { mock } from "node:test";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "m365-native-recovery-"));
process.env.DATA_DIR = dir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const network = mock.method(globalThis, "fetch", async () => {
  throw new Error("Unexpected network in offline native recovery tests");
});
const core = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const { runStreamingResponse } =
  await import("../../open-sse/handlers/chatCore/streamingResponse.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { getCircuitBreaker } = await import("../../src/shared/utils/circuitBreaker.ts");
const { createRequestLogger } = await import("../../open-sse/utils/requestLogger.ts");
const { createPreparedRequestLogger } =
  await import("../../open-sse/utils/providerRequestLogging.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const provider = "copilot-m365-web";
const denied = "claude-opus";
const licensed = "gpt-5.5";
const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

async function connection() {
  const row = await db.createProviderConnection({
    provider,
    authType: "oauth",
    accessToken: "synthetic",
    isActive: true,
    testStatus: "active",
  });
  return { id: String(row.id) };
}

async function run(
  connectionId: string,
  model: string,
  status = 403,
  code = "m365_model_not_licensed"
) {
  const credentials = (await auth.getProviderCredentials(
    provider,
    null,
    [connectionId],
    model
  )) as Record<string, unknown>;
  assert.equal(
    credentials?.connectionId,
    connectionId,
    "real account selection must admit this model"
  );
  const snapshot = { ...credentials };
  const body = { model, messages: [{ role: "user", content: "offline" }] };
  const reqLogger = await createRequestLogger("openai", "openai", model, { enabled: false });
  const capture = createPreparedRequestLogger(reqLogger, {
    id: null,
    model,
    provider,
    connectionId,
  });
  let sends = 0;
  let refreshes = 0;
  let persists = 0;
  let classifications = 0;
  const refresh = async () => {
    refreshes++;
    return { accessToken: "refreshed" };
  };
  const persist = async () => {
    persists++;
  };
  const send = async () => {
    sends++;
    return {
      response:
        model === licensed || (code === "token_expired" && sends > 1)
          ? Response.json({
              choices: [
                { message: { role: "assistant", content: "licensed OK" }, finish_reason: "stop" },
              ],
            })
          : Response.json(
              {
                error: {
                  code,
                  message: code,
                  ...(code === "m365_account_not_licensed"
                    ? { m365_error_code: "InvalidCopilotLicense" }
                    : { param: model }),
                },
              },
              { status }
            ),
      url: "https://offline.invalid/native",
      headers: {},
      transformedBody: body,
    };
  };
  const outcome = await runStreamingResponse({
    body,
    translatedBody: body,
    currentModel: model,
    effectiveModel: model,
    model,
    provider,
    connectionId,
    credentials,
    allowedConnections: [connectionId],
    comboStrategy: "priority",
    isCombo: true,
    pendingConnId: connectionId,
    pendingScope: {},
    providerRequestCapture: capture,
    reqLogger,
    sourceFormat: "openai",
    targetFormat: "openai",
    stream: true,
    upstreamStream: true,
    triedModels: new Set([model]),
    getCurrentConnectionId: () => connectionId,
    getExecutionCredentials: () => credentials,
    assertManagedLeaseFence: noop,
    getManagedLeaseFenceErrorCode: () => null,
    resolveEffectiveServiceTier: () => "default",
    executeRefreshCredentials: refresh,
    handleCredentialsRefreshed: persist,
    onCredentialsRefreshed: persist,
    executor: { refreshCredentials: refresh, execute: send },
    executeProviderRequest: send,
    syncExecuteTranslatedBody: noop,
    buildUpstreamHeadersForExecute: () => ({}),
    getExecutorClientHeaders: () => ({}),
    resilienceSettings: {
      tokenRefreshBreaker: { scope: "connection", failureThreshold: 5, cooldownMs: 1000 },
    },
    applyProviderFailureClassification: async (failure: {
      statusCode: number;
      upstreamErrorBody: unknown;
      targetModel: string;
    }) => {
      classifications++;
      await auth.markAccountUnavailable(
        connectionId,
        failure.statusCode,
        JSON.stringify(failure.upstreamErrorBody),
        provider,
        failure.targetModel,
        null,
        { isCombo: true, persistUnavailableState: false }
      );
    },
    persistFailureUsage: noop,
    persistAttemptLogs: noop,
    streamController: { signal: new AbortController().signal, handleError: noop },
    log,
  });
  return { outcome, sends, refreshes, persists, classifications, credentials, snapshot };
}

test.after(async () => {
  await closeCallLogSaves(5000);
  fallback.clearAllModelLockouts();
  core.resetDbInstance();
  network.mock.restore();
  fs.rmSync(dir, { recursive: true, force: true });
});

for (const flag of ["false", "true"]) {
  test(`actual streaming caller never refreshes/redispatches/persists licence refusal (safety flag ${flag})`, async () => {
    const previous = process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
    process.env.PROVIDER_SAFETY_STOPS_TERMINAL = flag;
    try {
      const conn = await connection();
      const result = await run(conn.id, denied);
      assert.equal(result.refreshes, 0);
      assert.equal(result.persists, 0);
      assert.equal(result.sends, 1);
      assert.equal(result.classifications, 1);
      assert.deepEqual(result.credentials, result.snapshot);
      assert.equal(result.outcome.response.status, 403);
      const publicError = (await result.outcome.response.response.json()).error;
      assert.equal(publicError.code, "m365_model_not_licensed");
      assert.match(publicError.message, /m365_model_not_licensed/);
      assert.equal((await db.getProviderConnectionById(conn.id)).accessToken, "synthetic");
    } finally {
      if (previous === undefined) delete process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
      else process.env.PROVIDER_SAFETY_STOPS_TERMINAL = previous;
    }
  });
}
for (const code of ["m365_throttled", "priority_access_exhausted"]) {
  test(`actual streaming caller preserves public quota code ${code}`, async () => {
    const conn = await connection();
    const result = await run(conn.id, denied, 429, code);
    assert.equal(result.refreshes, 0);
    assert.equal(result.outcome.response.status, 429);
    assert.equal((await result.outcome.response.response.json()).error.code, code);
  });
}
test("account licence denial skips refresh but remains connection scoped, never permanently banned", async () => {
  const conn = await connection();
  const result = await run(conn.id, denied, 403, "m365_account_not_licensed");
  assert.equal(result.refreshes, 0);
  assert.equal(result.persists, 0);
  assert.equal(result.sends, 1);
  assert.equal(result.classifications, 1);
  assert.equal(result.outcome.response.status, 403);
  const row = await db.getProviderConnectionById(conn.id);
  assert.equal(row.isActive, true);
  assert.notEqual(row.testStatus, "banned");
  assert.ok(row.rateLimitedUntil, "account licence cooldown must cover all models");
  const selected = (await auth.getProviderCredentials(
    provider,
    null,
    [conn.id],
    licensed
  )) as Record<string, unknown>;
  assert.notEqual(selected?.connectionId, conn.id);
});

for (const status of [401, 403]) {
  test(`ordinary ${status} still refreshes successfully through actual streaming caller`, async () => {
    const conn = await connection();
    const result = await run(conn.id, denied, status, "token_expired");
    assert.equal(result.refreshes, 1);
    assert.equal(result.persists, 1);
    assert.equal(result.sends, 2);
    assert.equal(result.outcome.carry.providerResponse.status, 200);
  });
}

test("priority combo uses same native account for licensed GPT after Claude licence denial and keeps breaker healthy", async () => {
  const conn = await connection();
  const calls: string[] = [];
  let classifications = 0;
  let refreshes = 0;
  const response = await handleComboChat({
    body: { stream: true, messages: [{ role: "user", content: "offline" }] },
    combo: {
      name: "offline-m365-native",
      strategy: "priority",
      models: [`${provider}/${denied}`, `${provider}/${licensed}`],
      config: { maxRetries: 0, maxSetRetries: 0, retryDelayMs: 0 },
    },
    settings: {},
    allCombos: [],
    log,
    handleSingleModel: async (_body, target) => {
      const model = target.slice(provider.length + 1);
      calls.push(model);
      const result = await run(conn.id, model);
      classifications += result.classifications;
      refreshes += result.refreshes;
      assert.equal(result.persists, 0);
      assert.equal(result.sends, 1);
      return result.outcome.response?.response ?? result.outcome.carry.providerResponse;
    },
  });
  assert.equal(response.status, 200);
  assert.match(await response.text(), /licensed OK/);
  assert.deepEqual(calls, [denied, licensed]);
  assert.equal(classifications, 1, "one failure callback for the denied target");
  assert.equal(refreshes, 0);
  assert.ok(fallback.getModelLockoutInfo(provider, conn.id, denied));
  assert.equal(fallback.getModelLockoutInfo(provider, conn.id, licensed), null);
  assert.equal((await db.getProviderConnectionById(conn.id)).testStatus, "active");
  assert.equal(getCircuitBreaker(provider).canExecute(), true);
  assert.equal(network.mock.callCount(), 0);
});
