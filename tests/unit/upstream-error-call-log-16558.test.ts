import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-upstream-error-log-"));
process.env.DATA_DIR = dataDir;
process.env.CHAT_LOG_MAX_BODY_KB = "1";
const { ensureDbInitialized, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { getCallLogs, getCallLogById, waitForCallLogSaves } =
  await import("../../src/lib/usage/callLogs.ts");
const { persistAttemptLogs } = await import("../../open-sse/handlers/chatCore/attemptLogging.ts");
type Args = Parameters<typeof persistAttemptLogs>[0];
type Context = Parameters<typeof persistAttemptLogs>[1];
let sequence = 0;
// The detail artifact is written by a worker thread that starts cold on the first write (a source
// checkout spawns it through tsx), which can take far longer than a fixed polling budget on a
// loaded machine. persistAttemptLogs hands the row to saveCallLog synchronously, so wait for that
// save itself; the bound only turns a hung save into a failure.
const SAVE_SETTLE_TIMEOUT_MS = 60_000;

before(ensureDbInitialized);
after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function logFailure(args: Partial<Args>, context: Partial<Context> = {}) {
  const traceId = `upstream-error-${++sequence}`;
  persistAttemptLogs({ status: 429, error: "[429]: Too Many Requests", ...args }, {
    traceId,
    pendingRequestId: traceId,
    provider: "openai",
    model: "test-model",
    connectionId: null,
    credentials: {},
    startTime: Date.now(),
    body: { messages: [{ role: "user", content: "test" }] },
    detailedLoggingEnabled: false,
    reqLogger: null,
    sourceFormat: "openai",
    targetFormat: "openai",
    noLogEnabled: false,
    ...context,
  } as Context);
  assert.equal(await waitForCallLogSaves(SAVE_SETTLE_TIMEOUT_MS), true, "call-log save hung");
  const [logged] = await getCallLogs({ correlationId: traceId, limit: 1 });
  assert.ok(logged?.id, "attempt did not reach the call log");
  // #15608: a row that expects a detail artifact is inserted as detail_state = 'pending' before
  // that write lands, and the save settles it ('ready', or 'missing' if it failed). No-log rows
  // start as 'none'.
  assert.notEqual(logged.detailState, "pending");
  const row = await getCallLogById(logged.id);
  assert.ok(row, "attempt did not reach durable call-log detail");
  return row;
}

test("retains upstream JSON error diagnostics without detailed logging", async () => {
  const upstream = {
    error: {
      message: "Usage frequency exceeded; resets in 60 seconds",
      code: "rate_limit_exceeded",
      retry_after: 60,
    },
  };
  const row = await logFailure({ providerResponse: upstream });
  assert.equal(row.status, 429);
  assert.deepEqual(row.responseBody, upstream);
});

test("scrubs credentials and stack traces in retained upstream error bodies", async () => {
  const row = await logFailure({
    providerResponse: {
      error: {
        message: "Quota exceeded\n    at request (/srv/private/router.ts:12:3)",
        api_key: "private-key-value",
        retry_after: 60,
      },
      authorization: "Bearer private-token-value",
    },
  });
  const stored = JSON.stringify(row.responseBody);
  assert.ok(stored.includes("Quota exceeded"));
  assert.ok(stored.includes("retry_after"));
  for (const secret of ["private-key-value", "private-token-value", "/srv/private", "at request"]) {
    assert.ok(!stored.includes(secret), `stored diagnostic contains ${secret}`);
  }
});

test("keeps explicit response bodies and successful response behavior", async () => {
  assert.deepEqual(
    (await logFailure({ responseBody: { explicit: true }, providerResponse: { ignored: true } }))
      .responseBody,
    { explicit: true }
  );
  assert.equal(
    (await logFailure({ status: 200, error: null, providerResponse: { upstream: true } }))
      .responseBody,
    null
  );
});

test("honors no-log and video transcript omission for upstream errors", async () => {
  assert.equal(
    (await logFailure({ providerResponse: { secret: "never persist" } }, { noLogEnabled: true }))
      .responseBody,
    null
  );
  const row = await logFailure(
    { providerResponse: { message: "private transcript" } },
    { videoContentRemoved: true }
  );
  assert.ok(!JSON.stringify(row).includes("private transcript"));
});

test("retains an explicit truncation marker for oversized upstream errors", async () => {
  const row = await logFailure({
    providerResponse: { error: { message: "quota ".repeat(4_000) } },
  });
  assert.equal((row.responseBody as Record<string, unknown>)._truncated, true);
  assert.ok(JSON.stringify(row.responseBody).length < 10_000);
});

test("non-streaming HTTP errors hand the parsed upstream body to call-log persistence", async () => {
  const { runNonStreamingResponse } =
    await import("../../open-sse/handlers/chatCore/nonStreamingResponse.ts");
  const { buildErrorBody, createErrorResult } = await import("../../open-sse/utils/error.ts");
  const upstream = {
    error: { message: "Parameter temperature is invalid", code: "invalid_request_error" },
  };
  let persisted: Args | undefined;
  const noop = () => undefined;
  const wire = { model: "test-model", messages: [{ role: "user", content: "test" }] };
  const deps = {
    provider: "openai",
    model: "test-model",
    effectiveModel: "test-model",
    currentModel: "test-model",
    body: wire,
    translatedBody: wire,
    finalBody: wire,
    sourceFormat: "openai",
    targetFormat: "openai",
    clientResponseFormat: "openai",
    connectionId: "test-connection",
    credentials: {},
    triedModels: new Set(["test-model"]),
    getCurrentConnectionId: () => "test-connection",
    syncExecuteTranslatedBody: noop,
    assertManagedLeaseFence: noop,
    updatePendingScope: noop,
    updateFromHeaders: noop,
    updateFromResponseBody: noop,
    updateProviderConnection: async () => undefined,
    reportSignatureFailure: noop,
    applyProviderFailureClassification: async () => undefined,
    providerRequestCapture: { latest: () => null },
    executeProviderRequest: async () => ({
      response: Response.json(upstream, { status: 400 }),
      headers: {},
      transformedBody: wire,
      url: "https://provider.example/chat",
    }),
    reqLogger: {
      logError: noop,
      logTargetRequest: noop,
      logProviderResponse: noop,
      logProviderDiagnostic: noop,
    },
    appendRequestLog: async () => undefined,
    persistAttemptLogs: (args: Args) => {
      persisted = args;
    },
    persistFailureUsage: noop,
    trackPendingRequest: noop,
    buildErrorBody,
    createErrorResult,
    isLocalStreamLifecycleError: () => false,
    getSafeErrorMetadata: () => ({}),
    isSemaphoreCapacityError: () => false,
    shouldIsolateProbeFailures: () => false,
    log: { debug: noop, info: noop, warn: noop, error: noop },
  };
  const result = await runNonStreamingResponse(deps);
  assert.equal(result.response.status, 400, JSON.stringify(result.response));
  assert.deepEqual(persisted?.providerResponse, upstream);
  assert.deepEqual((await logFailure(persisted ?? {})).responseBody, upstream);
});
