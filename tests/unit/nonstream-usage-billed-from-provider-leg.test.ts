// The non-streaming success tail must bill the leg's real provider usage. The client
// translate already rewrote the shared response body for the client (#8331 context
// buffer, estimates), and re-extracting usage from that body bills the buffer as real
// provider usage. Claude->Claude with a Claude-Code-compatible provider is the shape
// where translatedResponse === providerBody, so the mutation is visible at the billing
// seam (usage row / call log / api-key quota).
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "or9r-nonstream-usage-"));
process.env.DATA_DIR = DIR;
// Fixed buffer so the test is deterministic (2000 is the documented default).
process.env.USAGE_TOKEN_BUFFER = "2000";

const { runNonStreamingResponse } =
  await import("../../open-sse/handlers/chatCore/nonStreamingResponse.ts");
const { extractUsageFromResponse } = await import("../../open-sse/handlers/usageExtractor.ts");
const { buildErrorBody, createErrorResult } = await import("../../open-sse/utils/error.ts");
const { makeExecutorResult } = await import("./_helpers/nonStreamingProviderLegFixtures.ts");

test.after(() => {
  fs.rmSync(DIR, { recursive: true, force: true });
});

function buildDeps(claudeBody, sinks) {
  const noop = () => undefined;
  const wire = { model: "claude-sonnet-4-5", messages: [{ role: "user", content: "hi" }] };
  return {
    provider: "anthropic-compatible-cc-demo",
    model: "claude-sonnet-4-5",
    effectiveModel: "claude-sonnet-4-5",
    currentModel: "claude-sonnet-4-5",
    body: wire,
    translatedBody: wire,
    finalBody: wire,
    sourceFormat: "claude",
    targetFormat: "claude",
    clientResponseFormat: "claude",
    isClaudeCodeCompatible: true,
    connectionId: "conn-test",
    credentials: {},
    triedModels: new Set(["claude-sonnet-4-5"]),
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
    executeProviderRequest: async () => makeExecutorResult(claudeBody),
    reqLogger: {
      logError: noop,
      logTargetRequest: noop,
      logProviderResponse: noop,
      logProviderDiagnostic: noop,
      logConvertedResponse: noop,
    },
    normalizeHeaders: (h) => h ?? {},
    appendRequestLog: async (row) => {
      sinks.usageRows.push(row);
    },
    persistAttemptLogs: (args) => {
      sinks.attempts.push(args);
    },
    recordNonStreamingUsageStats: (usage) => {
      sinks.statsUsage.push(usage);
    },
    persistFailureUsage: noop,
    trackPendingRequest: noop,
    buildErrorBody,
    createErrorResult,
    isLocalStreamLifecycleError: () => false,
    getSafeErrorMetadata: (error) => {
      sinks.errors.push(error);
      return {};
    },
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
    guardrailRegistry: {
      runPostCallHooks: async (response) => ({ response, blocked: null }),
    },
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
  };
}

test("claude->claude CC-compatible: billed usage is the leg usage, not the buffered client copy", async () => {
  const claudeBody = {
    id: "msg_1",
    type: "message",
    role: "assistant",
    model: "claude-sonnet-4-5",
    content: [{ type: "text", text: "hello" }],
    stop_reason: "end_turn",
    usage: {
      input_tokens: 100,
      output_tokens: 7,
      cache_read_input_tokens: 0,
      cache_creation_input_tokens: 0,
    },
  };
  const sinks = { usageRows: [], attempts: [], statsUsage: [], errors: [] };
  const result = await runNonStreamingResponse(buildDeps(claudeBody, sinks));
  assert.deepEqual(sinks.errors.map(String), []);
  assert.equal(result.response.success, true);
  assert.equal(result.response.response.status, 200);

  // The client-visible copy keeps the #8331 context buffer (100 input + 2000 buffer).
  const clientUsage = sinks.attempts.at(-1)?.clientResponse?.usage;
  assert.equal(clientUsage?.input_tokens, 2100, "client buffer no longer applied");

  // Billing seam: usage row, api-key stats and call log must carry the real provider
  // usage (100 input tokens), not the buffered value re-read from the mutated body.
  for (const row of sinks.usageRows) {
    assert.equal(row.tokens?.prompt_tokens, 100, `usage row: ${JSON.stringify(row)}`);
  }
  assert.ok(sinks.usageRows.length > 0, "no usage row recorded");
  for (const usage of sinks.statsUsage) {
    assert.equal(usage?.prompt_tokens, 100, `api-key stats: ${JSON.stringify(usage)}`);
  }
  assert.ok(sinks.statsUsage.length > 0, "no api-key usage stats recorded");
  const okAttempt = sinks.attempts.find((a) => a.status === 200);
  assert.equal(okAttempt?.tokens?.prompt_tokens, 100, JSON.stringify(okAttempt));
});
