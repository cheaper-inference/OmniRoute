import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import type { NonStreamingDeps } from "../../open-sse/handlers/chatCore/nonStreamingResponse.ts";
import type { FailureUsageAggregate } from "../../open-sse/handlers/chatCore/failureUsage.ts";

const flag = "NONSTREAM_UPSTREAM_FAILURE_BILLED_USAGE_ENABLED";
const dataDir = mkdtempSync(join(tmpdir(), "omniroute-nonstream-failure-usage-"));
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";

const { runNonStreamingResponse } =
  await import("../../open-sse/handlers/chatCore/nonStreamingResponse.ts");
const { extractUsageFromResponse } = await import("../../open-sse/handlers/usageExtractor.ts");
const { buildErrorBody, createErrorResult } = await import("../../open-sse/utils/error.ts");
const { makeExecutorResult } = await import("./_helpers/nonStreamingProviderLegFixtures.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { stopSemanticCachePruneJob } = await import("../../src/lib/jobs/semanticCachePruneJob.ts");

test.after(() => {
  stopSemanticCachePruneJob();
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function createNonStreamingResponseDeps(
  upstreamBody: unknown,
  overrides: Partial<NonStreamingDeps> = {}
): NonStreamingDeps {
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
    persistFailureUsage: noop,
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

const billedTokens = { input_tokens: 120, output_tokens: 30, total_tokens: 150 };
const failureScenarios = [
  {
    name: "failed Responses body",
    upstream: {
      object: "response",
      status: "failed",
      error: { code: "server_error", message: "upstream failed" },
      output: [],
      usage: billedTokens,
    },
    httpStatus: 200,
    failureStatus: 502,
  },
  {
    name: "HTTP error body",
    upstream: {
      error: { code: "invalid_request_error", message: "upstream rejected the request" },
      usage: billedTokens,
    },
    httpStatus: 400,
    failureStatus: 400,
  },
];

for (const { name, upstream, httpStatus, failureStatus } of failureScenarios) {
  for (const enabled of [true, false]) {
    test(`flag ${enabled ? "on" : "off"}: billed tokens on a ${name}`, async (t) => {
      t.after(() => {
        delete process.env[flag];
      });
      process.env[flag] = String(enabled);
      const failures: Array<{ status: number; input?: number; output?: number }> = [];
      const result = await runNonStreamingResponse(
        createNonStreamingResponseDeps(upstream, {
          executeProviderRequest: async () => makeExecutorResult(upstream, httpStatus),
          persistFailureUsage: (
            status: number,
            _code: string,
            aggregate?: FailureUsageAggregate
          ) => {
            failures.push({
              status,
              input: aggregate?.prompt_tokens,
              output: aggregate?.completion_tokens,
            });
          },
        })
      );
      assert.equal(result.response.status, failureStatus);
      assert.deepEqual(failures, [
        {
          status: failureStatus,
          input: enabled ? 120 : undefined,
          output: enabled ? 30 : undefined,
        },
      ]);
    });
  }
}
