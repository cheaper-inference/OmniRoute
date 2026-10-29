/**
 * Shared fixtures for the pending-terminal-cleanup suites.
 *
 * Extracted from pending-terminal-cleanup.test.ts when it grew past the new-file test cap.
 * Importing this module creates the suite's temp DATA_DIR before usage history loads, so
 * import it before anything that touches the usage DB; each suite registers its own
 * beforeEach/afterEach/after hooks (pending reset, cost reset, cleanup).
 */
import assert from "node:assert/strict";
import { type TestContext } from "node:test";
import { createTempDataDir } from "../../_setup/tempDataDir.ts";

export const { cleanup } = createTempDataDir("omniroute-pending-terminal-");
export const history = await import("../../../src/lib/usage/usageHistory.ts");
export const completed = await import("../../../src/lib/usage/completedRequestDetails.ts");
export const { translateSseResponse } = await import("../../../open-sse/executors/glm.ts");
export const { runStreamingTail } =
  await import("../../../open-sse/handlers/chatCore/streamingTail.ts");
export const costRules = await import("../../../src/domain/costRules.ts");
export const { STREAM_IDLE_TIMEOUT_MS } = await import("../../../open-sse/config/constants.ts");
export const { createPassthroughStreamWithLogger, PENDING_REQUEST_CLEARED_MARKER } =
  await import("../../../open-sse/utils/stream.ts");
export const { createRequestLogger } = await import("../../../open-sse/utils/requestLogger.ts");
await import("../../../open-sse/translator/bootstrap.ts");
export const { translateRequest } = await import("../../../open-sse/translator/index.ts");
export const { createChatStreamController } =
  await import("../../../open-sse/handlers/chatCore/chatStreamController.ts");
export const { finalizePendingScope, updatePendingScope } =
  await import("../../../src/lib/usage/pendingRequestScope.ts");
export const { acquireTurnExecution, getTurnExecutionSnapshot } =
  await import("../../../open-sse/handlers/chatCore/turnExecutionGuard.ts");
export const { clearGeminiThoughtSignatures } =
  await import("../../../open-sse/services/geminiThoughtSignatureStore.ts");
// Request events run in the background; preload their imports so fixture writes drain before teardown.
await Promise.all([
  import("../../../src/lib/gamification/events.ts"),
  import("../../../src/lib/gamification/antiCheat.ts"),
  import("../../../src/lib/gamification/streaks.ts"),
  import("../../../src/lib/gamification/leaderboard.ts"),
  import("../../../src/lib/gamification/notifications.ts"),
  import("../../../src/lib/db/gamification.ts"),
]);

export function captureOwner(id: string) {
  return "capturePendingRequestOwner" in history ? history.capturePendingRequestOwner(id) : id;
}
export type FixturePendingIdentity = ReturnType<typeof captureOwner>;

export const MODEL = "terminal-fixture";
export const PROVIDER = "openai";
export const CONN = "terminal-connection";
export const KEY = `${MODEL} (${PROVIDER})`;
export const API_KEY_ID = "terminal-billing-fixture";
export const BILLED_COST = 0.125;
export function pending() {
  const id = history.trackPendingRequest(MODEL, PROVIDER, CONN, true, {
    clientRequest: { messages: [{ role: "user", content: "fixture request" }] },
    providerRequest: { model: MODEL, messages: [{ role: "user", content: "fixture request" }] },
  });
  assert.ok(id);
  return id;
}
export function assertOnlySurvivor(id: string, expectedBytes: number) {
  assert.deepEqual([...history.getPendingById().keys()], [id]);
  assert.equal(history.getPendingRetainedBytes(), expectedBytes);
  assert.equal(history.getPendingRequests().byModel[KEY], 1);
  assert.equal(history.getPendingRequests().byAccount[CONN]?.[KEY], 1);
  const state = history.getPendingRequests() as ReturnType<typeof history.getPendingRequests> & {
    details: Record<string, Record<string, Array<{ id: string }>>>;
  };
  assert.deepEqual(
    state.details[CONN]?.[KEY]?.map((detail) => detail.id),
    [id]
  );
}

export async function stream(
  id: string,
  failBookkeeping: boolean | "connection",
  options: {
    idle?: () => void;
    targetFormat?: string;
    clientResponseFormat?: string;
    rawConnectionId?: string | null;
    currentConnectionId?: string | null;
    pendingConnectionId?: string | null;
    pendingRequestOwner?: FixturePendingIdentity;
    lifecycle?: "cancel" | "abort" | "error" | "translated-error";
    readinessFailure?: boolean;
    model?: string;
    provider?: string;
    wire?: string;
    reqLogger?: Awaited<ReturnType<typeof createRequestLogger>>;
    glmTransport?: boolean;
  } = {}
) {
  const model = options.model ?? MODEL;
  const provider = options.provider ?? PROVIDER;
  const body = { model, stream: true, messages: [{ role: "user", content: "fixture" }] };
  const chunks = [
    {
      id: "completion-fixture",
      object: "chat.completion.chunk",
      model,
      choices: [
        { index: 0, delta: { role: "assistant", content: "fixture answer" }, finish_reason: null },
      ],
    },
    {
      id: "completion-fixture",
      object: "chat.completion.chunk",
      model,
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 10, completion_tokens: 2, total_tokens: 12, cost: BILLED_COST },
    },
  ];
  const wire =
    options.wire ??
    chunks.map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`).join("") + "data: [DONE]\n\n";
  const firstEvent =
    options.targetFormat === "openai-responses"
      ? { type: "response.created", response: { id: "resp_fixture", status: "in_progress" } }
      : chunks[0];
  let providerStream: ReadableStreamDefaultController<Uint8Array> | undefined;
  const providerBody =
    options.idle || options.lifecycle
      ? new ReadableStream({
          start(controller) {
            providerStream = controller;
            controller.enqueue(
              new TextEncoder().encode(
                options.glmTransport ? GLM_PARTIAL_WIRE : `data: ${JSON.stringify(firstEvent)}\n\n`
              )
            );
          },
        })
      : wire;
  const abort = new AbortController();
  let writes = 0;
  let released = 0;
  let failures = 0;
  let connectionReads = 0;
  const leaseKey = `fixture-turn-${id}`;
  const lease = acquireTurnExecution(leaseKey);
  assert.equal(lease.acquired, true);
  const releaseTurnExecution = () => {
    released++;
    lease.release();
  };
  const connection: { connectionId?: string | null } = { connectionId: CONN };
  if (Object.hasOwn(options, "rawConnectionId")) {
    if (options.rawConnectionId === undefined) delete connection.connectionId;
    else connection.connectionId = options.rawConnectionId;
  }
  const pendingConnectionId = Object.hasOwn(options, "pendingConnectionId")
    ? (options.pendingConnectionId ?? null)
    : CONN;
  const currentConnectionId =
    options.currentConnectionId === undefined ? CONN : options.currentConnectionId;
  const pendingRequestOwner = pendingConnectionId
    ? (options.pendingRequestOwner ?? captureOwner(id))
    : undefined;
  let pipelineError:
    ((event: { error?: unknown; message: string; statusCode: number }) => boolean) | null = null;
  let disconnectFinalize: ((event: { reason: string; duration: number }) => boolean) | null = null;
  const controller = createChatStreamController({
    getClientDisconnectFinalize: () => disconnectFinalize,
    getPipelineStreamError: () => pipelineError,
    pendingScope: {
      id,
      model,
      provider,
      connectionId: pendingConnectionId,
      owner: typeof pendingRequestOwner === "string" ? undefined : pendingRequestOwner,
    },
    finalizePendingScope,
    onDisconnect: null,
    provider,
    model,
    connectionId: connection.connectionId,
    pendingRequestId: id,
    clientResponseFormat: options.clientResponseFormat ?? "openai",
    clientAbortSignal: abort.signal,
    allowCompletedToolHandoffGrace: false,
  });
  controller.signal.addEventListener(
    "abort",
    () => {
      try {
        providerStream?.error(new DOMException("fixture upstream aborted", "AbortError"));
      } catch {
        // A cancelled fixture source may already be settled.
      }
    },
    { once: true }
  );
  const outcome = await runStreamingTail({
    agentGoalPolicy: { detected: false },
    body,
    bodyForCacheWrite: body,
    clientResponseFormat: options.clientResponseFormat ?? "openai",
    targetFormat: options.targetFormat ?? "openai",
    apiKeyInfo: options.glmTransport ? {} : { id: API_KEY_ID },
    provider,
    model,
    effectiveModel: model,
    currentModel: model,
    modelInfo: { model },
    ...connection,
    pendingConnId: pendingConnectionId,
    pendingRequestId: id,
    pendingRequestOwner,
    credentials: { connectionId: currentConnectionId },
    getCurrentConnectionId: () => {
      if (++connectionReads > 1 && failBookkeeping === "connection")
        throw new Error("controlled connection bookkeeping failure");
      return currentConnectionId;
    },
    executor: {},
    startTime: Date.now(),
    stream: true,
    providerResponse: options.readinessFailure
      ? new Response(JSON.stringify({ error: { message: "fixture readiness failure" } }), {
          status: 502,
          headers: { "content-type": "application/json" },
        })
      : options.glmTransport
        ? translateSseResponse(
            new Response(providerBody, { headers: { "content-type": "text/event-stream" } }),
            provider,
            model
          )
        : new Response(providerBody, { headers: { "content-type": "text/event-stream" } }),
    providerHeaders: {},
    translatedBody: body,
    finalBody: body,
    clientRawRequest: new Request("http://localhost/v1/chat/completions"),
    streamController: controller,
    registerStreamFinalizers: (pipeline, disconnect) => {
      pipelineError = pipeline;
      disconnectFinalize = disconnect;
    },
    reqLogger: options.reqLogger ?? {},
    log: { debug: () => {}, warn: () => {}, info: () => {} },
    resolveReportedServiceTier: () => {
      if (failBookkeeping === true) throw new Error("controlled bookkeeping failure");
      return null;
    },
    attachCompressionUsageReceiptAfterAnalytics: () => {},
    persistAttemptLogs: () => {
      writes++;
    },
    persistFailureUsage: () => {
      failures++;
    },
    releaseTurnExecution,
  });
  if (!outcome.carry.turnExecutionHandedOffToStream) {
    // The barrel retains lease ownership when the tail returns before stream handoff.
    releaseTurnExecution();
  }
  let text = "";
  let readError: unknown;
  let abortState: {
    pendingCount: number;
    pendingIds: string[];
    bytes: number;
  } | null = null;
  try {
    options.idle?.();
    if (options.lifecycle === "cancel") {
      await outcome.result.response.body?.cancel("fixture client cancellation");
    } else if (options.lifecycle === "abort") {
      const reader = outcome.result.response.body?.getReader();
      assert.ok(reader);
      const first = await reader.read();
      if (first.value) text = new TextDecoder().decode(first.value);
      abort.abort(new DOMException("fixture client abort", "AbortError"));
      outcome.carry.onPipelineStreamError?.({
        message: "settle fixture disconnect",
        statusCode: 499,
      });
      abortState = {
        pendingCount: history.getPendingRequests().byModel[`${model} (${provider})`],
        pendingIds: [...history.getPendingById().keys()],
        bytes: history.getPendingRetainedBytes(),
      };
      // Assert the abort result separately; cancel only closes the fixture's owned reader.
      await reader.cancel("fixture abort reader cleanup");
      reader.releaseLock();
    } else {
      if (options.lifecycle === "error") {
        providerStream?.error(new Error("fixture upstream failure"));
      }
      if (options.lifecycle === "translated-error") {
        providerStream?.enqueue(
          new TextEncoder().encode(
            'event: error\ndata: {"type":"error","error":{"type":"overloaded_error","message":"GLM translated failure"}}\n\n'
          )
        );
        providerStream?.close();
      }
      text = await outcome.result.response.text();
    }
  } catch (error) {
    if (!options.idle && !options.lifecycle) throw error;
    readError = error;
  }
  if (options.lifecycle === "cancel" || options.lifecycle === "abort") {
    outcome.carry.onPipelineStreamError?.({
      message: "settle fixture disconnect",
      statusCode: 499,
    });
  }
  assert.equal(released, 1);
  assert.equal(getTurnExecutionSnapshot(leaseKey), null);
  return {
    text,
    readError,
    abortState,
    outcome,
    controller,
    writes: () => writes,
    released: () => released,
    failures: () => failures,
  };
}

export async function idleFallback(
  t: TestContext,
  id: FixturePendingIdentity | null,
  connectionId: string | null,
  reqLogger: Awaited<ReturnType<typeof createRequestLogger>> | null = null
) {
  let idleTick: (() => void) | undefined;
  const original = globalThis.setInterval;
  t.mock.method(globalThis, "setInterval", (callback: () => void, delay: number) => {
    if (delay === 10_000) idleTick = callback;
    return original(callback, delay);
  });
  t.mock.method(console, "warn", () => {});
  const warnings: unknown[][] = [];
  t.mock.method(console, "debug", (...args: unknown[]) => warnings.push(args));
  const transform = createPassthroughStreamWithLogger(
    PROVIDER,
    reqLogger,
    null,
    MODEL,
    connectionId,
    null,
    null,
    null,
    () => {
      throw new Error("controlled fallback callback failure");
    },
    null,
    null,
    null,
    id
  );
  assert.ok(idleTick);
  const now = Date.now();
  t.mock.method(Date, "now", () => now + STREAM_IDLE_TIMEOUT_MS + 1_000);
  idleTick();
  await assert.rejects(new Response(transform.readable).text(), /Idle timeout/);
  assert.ok(
    warnings.some((args) => String(args[0]).includes("onFailure callback error (idle_timeout)"))
  );
}

export async function captureLogger(id: string) {
  const logger = await createRequestLogger("openai", "openai", MODEL, {
    requestId: id,
    model: MODEL,
    provider: PROVIDER,
    connectionId: CONN,
  });
  logger.appendProviderChunk("captured provider fixture ".repeat(256));
  logger.appendOpenAIChunk("captured intermediate fixture");
  logger.appendConvertedChunk("captured client fixture");
  // Pending entries hold an owned snapshot synced at a byte threshold or on flush
  // (#17282), so read the pipeline payloads first to flush the capture.
  assert.ok(logger.getPipelinePayloads()?.streamChunks?.client?.length);
  assert.match(
    history.getPendingById().get(id)?.streamChunks?.provider?.[0] ?? "",
    /captured provider fixture/
  );
  return logger;
}

export function correlatedAttempts(sameConnection: boolean) {
  const connectionB = sameConnection ? CONN : "terminal-hedge-B";
  const correlationId = "shared-client-correlation";
  const id = history.trackPendingRequest(MODEL, PROVIDER, CONN, true, {
    correlationId,
    clientRequest: { messages: [{ role: "user", content: "attempt A".repeat(4) }] },
  });
  assert.ok(id);
  const ownerA = captureOwner(id);
  const detailA = history.getPendingById().get(id);
  assert.ok(detailA);
  const bytesA = history.getPendingRetainedBytes();
  const secondId = history.trackPendingRequest(MODEL, PROVIDER, connectionB, true, {
    correlationId,
    clientRequest: { messages: [{ role: "user", content: "attempt B".repeat(16) }] },
  });
  assert.equal(secondId, id);
  const ownerB = captureOwner(id);
  const detailB = history.getPendingById().get(id);
  assert.ok(detailB);
  assert.notEqual(detailB, detailA);
  const bytesB = history.getPendingRetainedBytes() - bytesA;
  const bucket = () => {
    const state = history.getPendingRequests() as ReturnType<typeof history.getPendingRequests> & {
      details: Record<string, Record<string, Array<typeof detailA>>>;
    };
    return Object.values(state.details).flatMap((models) => Object.values(models).flat());
  };
  return { id, ownerA, ownerB, detailA, detailB, bytesA, bytesB, connectionB, bucket };
}

export const GLM_PROVIDER = "glm";
export const GLM_MODEL = "glm-5";
export const GLM_KEY = GLM_MODEL + " (" + GLM_PROVIDER + ")";
export const GLM_PARTIAL_WIRE = [
  [
    "message_start",
    {
      type: "message_start",
      message: {
        id: "msg_glm",
        type: "message",
        role: "assistant",
        model: GLM_MODEL,
        content: [],
        stop_reason: null,
        usage: { input_tokens: 10, output_tokens: 0 },
      },
    },
  ],
  [
    "content_block_start",
    { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
  ],
  [
    "content_block_delta",
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "text_delta", text: "actual GLM answer" },
    },
  ],
]
  .map(([event, data]) => "event: " + event + "\ndata: " + JSON.stringify(data) + "\n\n")
  .join("");
export const GLM_WIRE =
  GLM_PARTIAL_WIRE +
  [
    ["content_block_stop", { type: "content_block_stop", index: 0 }],
    [
      "message_delta",
      {
        type: "message_delta",
        delta: { stop_reason: "end_turn", stop_sequence: null },
        usage: { output_tokens: 2 },
      },
    ],
    ["message_stop", { type: "message_stop" }],
  ]
    .map(([event, data]) => "event: " + event + "\ndata: " + JSON.stringify(data) + "\n\n")
    .join("");
