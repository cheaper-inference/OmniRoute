// F-C2-17: failed non-stream paths wrote a failure usage row with no token counts even though the
// upstream had already billed them. A buffered Responses body with status "failed" (the leg
// extracts its usage) records them on the failure row. A malformed translated 200 is refused
// before any success row is written, so its failure row is the one place its tokens land.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "or9r-nonstream-failure-usage-"));
process.env.DATA_DIR = DIR;

const { runNonStreamingResponse } =
  await import("../../open-sse/handlers/chatCore/nonStreamingResponse.ts");
const { extractUsageFromResponse } = await import("../../open-sse/handlers/usageExtractor.ts");
const { buildErrorBody, createErrorResult } = await import("../../open-sse/utils/error.ts");
const { makeExecutorResult } = await import("./_helpers/nonStreamingProviderLegFixtures.ts");

test.after(() => {
  fs.rmSync(DIR, { recursive: true, force: true });
});

type FailureCall = { status: number; code: unknown; aggregate: Record<string, number> | undefined };

function buildDeps(upstreamBody: unknown, failures: FailureCall[], overrides = {}) {
  const noop = () => undefined;
  const wire = { model: "gpt-5", input: "hi" };
  return {
    provider: "openai",
    model: "gpt-5",
    effectiveModel: "gpt-5",
    currentModel: "gpt-5",
    body: wire,
    translatedBody: wire,
    finalBody: wire,
    sourceFormat: "openai-responses",
    targetFormat: "openai-responses",
    clientResponseFormat: "openai-responses",
    isClaudeCodeCompatible: false,
    connectionId: "conn-test",
    credentials: {},
    triedModels: new Set(["gpt-5"]),
    startTime: Date.now(),
    stream: false,
    isCombo: false,
    traceEnabled: false,
    getCurrentConnectionId: () => "conn-test",
    syncExecuteTranslatedBody: noop,
    assertManagedLeaseFence: noop,
    pendingScope: {},
    updatePendingScope: noop,
    updateFromHeaders: noop,
    updateFromResponseBody: noop,
    updateProviderConnection: async () => undefined,
    reportSignatureFailure: noop,
    applyProviderFailureClassification: async () => undefined,
    providerRequestCapture: { body: () => null, latest: () => null },
    executeProviderRequest: async () => makeExecutorResult(upstreamBody),
    reqLogger: {
      logError: noop,
      logTargetRequest: noop,
      logProviderResponse: noop,
      logProviderDiagnostic: noop,
      logConvertedResponse: noop,
    },
    normalizeHeaders: (h) => h ?? {},
    appendRequestLog: async () => undefined,
    persistAttemptLogs: noop,
    recordNonStreamingUsageStats: noop,
    persistFailureUsage: (status, code, aggregate) => failures.push({ status, code, aggregate }),
    trackPendingRequest: noop,
    buildErrorBody,
    createErrorResult,
    isLocalStreamLifecycleError: () => false,
    getSafeErrorMetadata: () => ({}),
    getManagedLeaseFenceErrorCode: () => null,
    managedLeaseFenceErrorResult: noop,
    onRequestSuccess: async () => undefined,
    injectionResult: { builtinToolNames: [], injectedCustomSkillNames: [] },
    webSearchFallbackPlan: {},
    webFetchFallbackPlan: {},
    isSemaphoreCapacityError: () => false,
    shouldIsolateProbeFailures: () => false,
    isServerOwnedToolLoopEnabled: () => false,
    handleToolCallExecution: noop,
    guardrailRegistry: { runPostCallHooks: async (response) => ({ response, blocked: null }) },
    detectMalformedNonStream: () => null,
    describeMalformedNonStream: () => ({ message: "malformed", code: "m", type: "m" }),
    reportMalformed200: noop,
    sanitizeUpstreamDetails: (b) => b,
    sanitizeErrorMessage: (m) => m,
    resolveReportedServiceTier: () => undefined,
    extractUsageFromResponse,
    buildCacheUsageLogMeta: () => undefined,
    attachCompressionUsageReceiptAfterAnalytics: noop,
    recordContextEditingTelemetryHook: noop,
    incrementTokenUsage: noop,
    isJsonRecord: (v) => typeof v === "object" && v !== null,
    normalizeUsage: (u) => u,
    calculateCostDetailed: async () => null,
    buildCostCtx: () => ({}),
    recordChatCallCost: noop,
    saveIdempotency: async () => undefined,
    scheduleQuotaShareConsumption: async () => undefined,
    emitRequestGamificationEvent: async () => undefined,
    finalizePendingScope: noop,
    echoModelInObject: noop,
    runPluginOnResponseHook: async () => undefined,
    runMemoryExtractionGate: async () => undefined,
    recordCoreOwnedAntigravityQuotaState: noop,
    logAuditEvent: noop,
    extractSessionAffinityKey: () => null,
    executeRefreshCredentials: async () => null,
    handleCredentialsRefreshed: noop,
    markAccountSemaphoreBlocked: noop,
    translateRequest: async (b) => b,
    getModelNormalizeToolCallId: (id) => id,
    getModelPreserveOpenAIDeveloperRole: () => false,
    getSkillsModelIdForFormat: () => null,
    log: { debug: noop, info: noop, warn: noop, error: noop },
    ...overrides,
  };
}

test("a failed Responses body records the tokens the upstream already billed", async () => {
  const failures: FailureCall[] = [];
  const upstream = {
    object: "response",
    status: "failed",
    error: { code: "server_error", message: "upstream failed" },
    output: [],
    usage: { input_tokens: 120, output_tokens: 30, total_tokens: 150 },
  };
  await runNonStreamingResponse(buildDeps(upstream, failures));
  assert.equal(failures.length, 1);
  assert.equal(failures[0].aggregate?.prompt_tokens, 120);
  assert.equal(failures[0].aggregate?.completion_tokens, 30);
});

test("a malformed 200 records the tokens extracted from its body once, on the failure row", async () => {
  const failures: FailureCall[] = [];
  const successRows: Array<Record<string, number>> = [];
  const upstream = {
    id: "chatcmpl-1",
    object: "chat.completion",
    model: "gpt-5",
    choices: [
      { index: 0, message: { role: "assistant", content: "some text" }, finish_reason: "stop" },
    ],
    usage: { prompt_tokens: 80, completion_tokens: 20, total_tokens: 100 },
  };
  await runNonStreamingResponse(
    buildDeps(upstream, failures, {
      sourceFormat: "openai",
      targetFormat: "openai",
      clientResponseFormat: "openai",
      detectMalformedNonStream: () => "empty_choices",
      recordNonStreamingUsageStats: (usage: Record<string, number>) => successRows.push(usage),
    })
  );
  // A refused reply is not a success: no success-path usage row is written, so the billed tokens
  // land on the malformed failure row, once. A second copy anywhere would count one upstream
  // response twice.
  assert.equal(successRows.length, 0);
  const malformedRows = failures.filter((call) => call.code === "malformed_translated_response");
  assert.equal(malformedRows.length, 1, `malformed failure rows: ${JSON.stringify(failures)}`);
  assert.equal(malformedRows[0].aggregate?.prompt_tokens, 80);
  assert.equal(malformedRows[0].aggregate?.completion_tokens, 20);
  const tokenRows = failures.filter((call) => call.aggregate?.prompt_tokens);
  assert.equal(tokenRows.length, 1, `token-bearing rows: ${JSON.stringify(failures)}`);
});
