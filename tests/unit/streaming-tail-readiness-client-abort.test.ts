/**
 * The streaming tail hands the request signal to the readiness gate. A client that leaves while the
 * stream waits for its first event aborts that signal with a string reason (for example
 * `request_signal_aborted`). fetch body reads reject with the raw reason then, not with an
 * AbortError, so only the signal tells the gate this is a client disconnect (499), not a stall (504).
 */
import assert from "node:assert/strict";
import test from "node:test";
import {
  cleanup,
  CONN,
  costRules,
  createChatStreamController,
  finalizePendingScope,
  history,
  MODEL,
  PROVIDER,
  runStreamingTail,
} from "./_helpers/pendingTerminalCleanup.ts";

test.beforeEach(() => {
  history.clearPendingRequests();
  costRules.resetCostData();
});
test.after(async () => {
  history.clearPendingRequests();
  costRules.resetCostData();
  await cleanup();
});

test("a client abort with a string reason during stream readiness ends the tail as a 499 disconnect", async () => {
  const id = history.trackPendingRequest(MODEL, PROVIDER, CONN, true, {
    clientRequest: { messages: [{ role: "user", content: "hi" }] },
  });
  assert.ok(id);
  const body = { model: MODEL, stream: true, messages: [{ role: "user", content: "hi" }] };
  const controller = createChatStreamController({
    getClientDisconnectFinalize: () => null,
    getPipelineStreamError: () => null,
    pendingScope: { id, model: MODEL, provider: PROVIDER, connectionId: CONN },
    finalizePendingScope,
    onDisconnect: null,
    provider: PROVIDER,
    model: MODEL,
    connectionId: CONN,
    pendingRequestId: id,
    clientResponseFormat: "openai",
    clientAbortSignal: null,
    allowCompletedToolHandoffGrace: false,
  });
  // A held-open upstream that rejects its read with the raw abort reason, like a fetch body.
  const upstream = new ReadableStream<Uint8Array>({
    start(c) {
      controller.signal.addEventListener("abort", () => c.error(controller.signal.reason), {
        once: true,
      });
    },
  });
  const pending = runStreamingTail({
    agentGoalPolicy: { detected: false },
    body,
    bodyForCacheWrite: body,
    clientResponseFormat: "openai",
    targetFormat: "openai",
    apiKeyInfo: {},
    provider: PROVIDER,
    model: MODEL,
    effectiveModel: MODEL,
    currentModel: MODEL,
    modelInfo: { model: MODEL },
    connectionId: CONN,
    pendingConnId: CONN,
    pendingRequestId: id,
    credentials: { connectionId: CONN },
    getCurrentConnectionId: () => CONN,
    executor: {},
    startTime: Date.now(),
    stream: true,
    providerResponse: new Response(upstream, { headers: { "content-type": "text/event-stream" } }),
    providerHeaders: {},
    translatedBody: body,
    finalBody: body,
    clientRawRequest: new Request("http://localhost/v1/chat/completions"),
    streamController: controller,
    registerStreamFinalizers: () => {},
    reqLogger: {},
    log: { debug: () => {}, warn: () => {}, info: () => {} },
    resolveReportedServiceTier: () => null,
    attachCompressionUsageReceiptAfterAnalytics: () => {},
    persistAttemptLogs: () => {},
    persistFailureUsage: () => {},
    releaseTurnExecution: () => {},
  });
  setTimeout(() => controller.handleDisconnect("request_signal_aborted"), 20);
  const { result } = await pending;

  assert.equal(result.success, false);
  assert.equal(result.status, 499);
  assert.equal(result.errorCode, "client_disconnected");
});
