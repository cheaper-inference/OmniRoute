import assert from "node:assert/strict";
import { after, afterEach, test } from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

const dataDir = mkdtempSync(join(tmpdir(), "omni-http-edge-"));
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";
const core = await import("../../src/lib/db/core.ts");
const logs = await import("../../src/lib/usage/callLogs.ts");
const { createPreparedRequestLogger, runWithCapture, observeProviderHttpSend } =
  await import("../../open-sse/utils/providerRequestLogging.ts");
const { selectHttpResponse } = await import("../../open-sse/utils/providerHttpAttempts.ts");
const { persistAttemptLogs } = await import("../../open-sse/handlers/chatCore/attemptLogging.ts");
const { runNonStreamingProviderLeg } =
  await import("../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts");
const { baseInput } = await import("./_helpers/nonStreamingProviderLegFixtures.ts");
const { BaseExecutor } = await import("../../open-sse/executors/base.ts");
const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});
after(async () => {
  await logs.closeCallLogSaves();
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});
function fixture() {
  const id = randomUUID();
  const capture = createPreparedRequestLogger(
    { logTargetRequest() {} },
    { id, model: "test-model", provider: "openai", connectionId: "account-wire" }
  );
  const context: Parameters<typeof persistAttemptLogs>[1] = {
    traceId: id,
    pendingRequestId: id,
    correlationId: id,
    provider: "openai",
    model: "test-model",
    connectionId: "account-wire",
    credentials: {},
    skillRequestId: id,
    detailedLoggingEnabled: false,
    reqLogger: null,
    clientRawRequest: null,
    requestedModel: "test-model",
    startTime: Date.now(),
    body: null,
    sourceFormat: "openai",
    targetFormat: "openai",
    comboName: null,
    comboStepId: null,
    comboExecutionKey: null,
    tokensCompressed: null,
    apiKeyInfo: null,
    noLogEnabled: false,
    httpAttempts: capture.httpAttempts,
  };
  return { id, capture, context };
}
async function rows(f: ReturnType<typeof fixture>) {
  assert.equal(await logs.waitForCallLogSaves(20_000), true);
  return logs.getCallLogs({ correlationId: f.id, limit: 100 });
}

test("ClinePass retry envelope error selects the adopted retry send", async () => {
  const f = fixture();
  let sends = 0;
  const outcome = await runWithCapture(f.capture, () =>
    runNonStreamingProviderLeg(
      baseInput({
        provider: "clinepass",
        connectionId: "account-wire",
        sleep: async () => {},
        executeProviderRequest: async () => {
          const response = await observeProviderHttpSend(
            {
              provider: "clinepass",
              model: "test-model",
              connectionId: "account-wire",
              endpoint: "chat_completions",
            },
            async () =>
              Response.json({
                success: false,
                error: ++sends === 1 ? "empty content" : "retry envelope rejected",
              })
          );
          return {
            response,
            upstreamHttpSelection: selectHttpResponse(response),
            url: "https://provider.example/chat",
            headers: {},
            transformedBody: {},
          };
        },
      })
    )
  );
  assert.equal(outcome.kind, "error");
  assert.equal(sends, 2);
  if (outcome.kind !== "error") return;
  assert.match(outcome.result.error, /retry envelope rejected/);
  persistAttemptLogs(
    { status: outcome.result.status, upstreamHttpSelection: outcome.upstreamHttpSelection },
    f.context
  );
  const saved = await rows(f);
  assert.equal(saved.length, 2);
  assert.equal(
    saved.find((row) => row.requestType !== "upstream_http_attempt")?.upstreamHttp?.send?.ordinal,
    2
  );
  assert.equal(
    saved.find((row) => row.requestType === "upstream_http_attempt")?.upstreamHttp?.send?.ordinal,
    1
  );
});

test("Base metadata stays JSON-byte bounded for control characters and selected-earlier overflow", async () => {
  const f = fixture();
  const wireModel = "\u0000".repeat(128);
  let sends = 0;
  globalThis.fetch = (async () => {
    sends++;
    return Response.json({ choices: [{ message: { content: "ok" } }] });
  }) as typeof fetch;
  let selected: ReturnType<typeof selectHttpResponse> = null;
  await runWithCapture(f.capture, async () => {
    const executor = new BaseExecutor("openai", { baseUrls: ["https://provider.example"] });
    for (let index = 0; index < 35; index++) {
      const result = await executor.execute({
        model: "test-model",
        body: { model: wireModel, messages: [{ role: "user", content: "BODY_CANARY" }] },
        stream: false,
        credentials: { apiKey: "fixture", connectionId: "account-wire" },
      });
      if (index === 30) selected = result.upstreamHttpSelection ?? null;
    }
  });
  assert.equal(sends, 35);
  persistAttemptLogs({ status: 200, upstreamHttpSelection: selected }, f.context);
  const saved = await rows(f);
  assert.equal(saved.length, 32);
  for (const row of saved) {
    assert.ok(row.upstreamHttp, "bounded metadata must remain parseable");
    assert.ok(row.upstreamHttp.send);
    assert.ok(new TextEncoder().encode(JSON.stringify(row.upstreamHttp.send)).length <= 1024);
  }
  const logical = saved.find((row) => row.requestType !== "upstream_http_attempt");
  assert.equal(logical?.upstreamHttp?.send?.ordinal, 31);
  assert.equal(logical?.upstreamHttp?.omitted, 3);
  assert.doesNotMatch(JSON.stringify(saved.map((row) => row.upstreamHttp)), /BODY_CANARY/);
});

test("follow-up semaphore capacity rejection is a local unassociated logical429", async () => {
  const { runNonStreamingResponse } =
    await import("../../open-sse/handlers/chatCore/nonStreamingResponse.ts");
  const { buildErrorBody, createErrorResult, sanitizeErrorMessage } =
    await import("../../open-sse/utils/error.ts");
  const { getSafeErrorMetadata, isSemaphoreCapacityError } =
    await import("../../open-sse/handlers/chatCore/streamErrorResult.ts");
  const { setFenceFnForTesting } = await import("../../src/lib/skills/interception.ts");
  setFenceFnForTesting(async <T>() => ({ kind: "executed", value: { hits: [] } as T }));
  try {
    for (const code of ["SEMAPHORE_TIMEOUT", "SEMAPHORE_QUEUE_FULL"]) {
      const f = fixture();
      let attempts = 0;
      let sends = 0;
      const noop = () => {};
      const body = { model: "test-model", messages: [{ role: "user", content: "fixture" }] };
      const result = await runWithCapture(f.capture, () =>
        runNonStreamingResponse({
          provider: "openai",
          model: "test-model",
          effectiveModel: "test-model",
          currentModel: "test-model",
          body,
          translatedBody: body,
          finalBody: body,
          sourceFormat: "openai",
          targetFormat: "openai",
          clientResponseFormat: "openai",
          stream: false,
          connectionId: "account-wire",
          credentials: {},
          triedModels: new Set(["test-model"]),
          getCurrentConnectionId: () => "account-wire",
          syncExecuteTranslatedBody: noop,
          assertManagedLeaseFence: noop,
          pendingScope: {},
          updatePendingScope: noop,
          updateFromHeaders: noop,
          updateFromResponseBody: noop,
          updateProviderConnection: async () => {},
          reportSignatureFailure: noop,
          applyProviderFailureClassification: async () => {},
          providerRequestCapture: f.capture,
          executeProviderRequest: async () => {
            if (++attempts > 1) throw Object.assign(new Error("local capacity"), { code });
            const response = await observeProviderHttpSend(
              {
                provider: "openai",
                model: "test-model",
                connectionId: "account-wire",
                endpoint: "chat_completions",
              },
              async () => {
                sends++;
                return Response.json({
                  choices: [
                    {
                      message: {
                        role: "assistant",
                        content: null,
                        tool_calls: [
                          {
                            id: "call",
                            type: "function",
                            function: { name: "memory_search", arguments: "{}" },
                          },
                        ],
                      },
                      finish_reason: "tool_calls",
                    },
                  ],
                  usage: { prompt_tokens: 2, completion_tokens: 1, total_tokens: 3 },
                });
              }
            );
            return {
              response,
              upstreamHttpSelection: selectHttpResponse(response),
              headers: {},
              transformedBody: body,
              url: "https://provider.example/chat",
            };
          },
          reqLogger: {
            logError: noop,
            logTargetRequest: noop,
            logProviderResponse: noop,
            logProviderDiagnostic: noop,
            logToolLoopReceipt: noop,
          },
          appendRequestLog: async () => {},
          persistAttemptLogs: (args: Parameters<typeof persistAttemptLogs>[0]) =>
            persistAttemptLogs(args, f.context),
          persistFailureUsage: noop,
          trackPendingRequest: noop,
          buildErrorBody,
          createErrorResult,
          sanitizeErrorMessage,
          getSafeErrorMetadata,
          isSemaphoreCapacityError,
          getManagedLeaseFenceErrorCode: () => null,
          shouldIsolateProbeFailures: () => false,
          isLocalStreamLifecycleError: () => false,
          isServerOwnedToolLoopEnabled: () => true,
          getSkillsModelIdForFormat: () => "test-model",
          memoryOwnerId: "fixture",
          pipelineSessionId: f.id,
          skillRequestId: f.id,
          injectionResult: { builtinToolNames: ["memory_search"], injectedCustomSkillNames: [] },
          getModelNormalizeToolCallId: () => false,
          getModelPreserveOpenAIDeveloperRole: () => false,
          translateRequest: (_source: unknown, _target: unknown, _model: unknown, next: unknown) =>
            next,
          log: { debug: noop, info: noop, warn: noop, error: noop },
        })
      );
      assert.equal(result.response.status, 429);
      assert.equal(attempts, 2);
      assert.equal(sends, 1);
      const saved = await rows(f);
      assert.equal(saved.length, 2);
      const logical = saved.find((row) => row.requestType !== "upstream_http_attempt");
      assert.equal(logical?.status, 429);
      assert.equal(logical?.upstreamHttp?.send, null);
      assert.equal(logical?.upstreamHttp?.total, 1);
      assert.equal(saved.find((row) => row.requestType === "upstream_http_attempt")?.status, 200);
    }
  } finally {
    setFenceFnForTesting(null);
  }
});

test("non-handoff lease rejection drains observed sends without a logical row and always releases", async () => {
  const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
  const { getExecutor } = await import("../../open-sse/executors/index.ts");
  const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
  const { acquireExclusiveConnectionLease } =
    await import("../../src/lib/db/exclusiveConnectionLeases.ts");
  const { HttpAttemptCollector } = await import("../../open-sse/utils/providerHttpAttempts.ts");
  const executor = await getExecutor("openai");
  const originalRefresh = Object.getOwnPropertyDescriptor(executor, "refreshCredentials");
  const originalDrain = HttpAttemptCollector.prototype.drain;
  const { NO_REFRESH_NEEDED } = await import("../../open-sse/services/tokenRefresh/shared.ts");
  let refreshCalls = 0;
  executor.refreshCredentials = async () =>
    ++refreshCalls === 1 ? NO_REFRESH_NEEDED : { accessToken: "fresh-fixture" };
  try {
    for (const mode of ["observed", "no-send", "logging-failure"] as const) {
      const f = fixture();
      const account = await createProviderConnection({
        provider: "openai",
        authType: "apikey",
        apiKey: "fixture-" + f.id,
        name: f.id,
        isActive: true,
      });
      const accountId = String(account.id);
      const owner = "vlo_" + f.id.replaceAll("-", "").padEnd(43, "A");
      const lease = acquireExclusiveConnectionLease({
        leaseOwnerId: owner,
        apiKeyId: f.id,
        provider: "openai",
        connectionId: accountId,
      });
      assert.equal(lease.kind, "ACQUIRED");
      if (lease.kind !== "ACQUIRED") continue;
      let sends = 0;
      globalThis.fetch = (async () => {
        sends++;
        return Response.json({ error: { message: "expired token" } }, { status: 401 });
      }) as typeof fetch;
      const run = () => {
        refreshCalls = 0;
        const credentials = { apiKey: "fixture-" + f.id, connectionId: accountId };
        const body = {
          model: "gpt-4o-mini",
          stream: true,
          messages: [{ role: "user", content: f.id }],
        };
        return handleChatCore({
          body,
          modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
          credentials,
          connectionId: accountId,
          managedLease: {
            apiKeyId: f.id,
            context: { leaseOwnerId: owner, generation: lease.lease.generation },
          },
          onCredentialsRefreshed: async () => {
            credentials.connectionId = "unleased-fixture";
          },
          beforeUpstreamAttempt:
            mode === "no-send"
              ? () => {
                  throw Object.assign(new Error("pre-send fence"), {
                    code: "LEASE_CONNECTION_MISMATCH",
                    status: 409,
                  });
                }
              : undefined,
          correlationId: f.id,
          userAgent: "unit-test",
          isCombo: false,
          clientRawRequest: {
            endpoint: "/v1/chat/completions",
            body,
            headers: new Headers({ "idempotency-key": f.id, accept: "text/event-stream" }),
          },
          log: { debug() {}, info() {}, warn() {}, error() {} },
        } as unknown as Parameters<typeof handleChatCore>[0]);
      };
      if (mode === "logging-failure")
        HttpAttemptCollector.prototype.drain = () => {
          throw new Error("fixture logging failure");
        };
      const result = await run();
      assert.equal(result.status, 409);
      assert.equal(result.errorCode, "LEASE_CONNECTION_MISMATCH");
      HttpAttemptCollector.prototype.drain = originalDrain;
      if (mode === "logging-failure") {
        const repeated = await run();
        assert.equal(repeated.status, 409);
        assert.equal(
          repeated.errorCode,
          "LEASE_CONNECTION_MISMATCH",
          "logging failure must not strand the turn guard"
        );
      }
      const saved = await rows(f);
      assert.equal(sends, mode === "no-send" ? 0 : mode === "logging-failure" ? 2 : 1);
      assert.deepEqual(
        saved.map((row) => row.status),
        mode === "no-send" ? [] : [401]
      );
      assert.equal(
        saved.every((row) => row.requestType === "upstream_http_attempt"),
        true
      );
    }
  } finally {
    HttpAttemptCollector.prototype.drain = originalDrain;
    if (originalRefresh) Object.defineProperty(executor, "refreshCredentials", originalRefresh);
    else Reflect.deleteProperty(executor, "refreshCredentials");
  }
});

test("post-executor connection mismatch is unassociated with the observed HTTP200", async () => {
  const f = fixture();
  let current = "account-wire";
  const result = await runWithCapture(f.capture, () =>
    runNonStreamingProviderLeg(
      baseInput({
        expectedConnectionId: "account-wire",
        getCurrentConnectionId: () => current,
        connectionId: "account-wire",
        allowModelFallback: false,
        allowAccountRotation: false,
        executeProviderRequest: async () => {
          const response = await observeProviderHttpSend(
            {
              provider: "openai",
              model: "test-model",
              connectionId: "account-wire",
              endpoint: "chat_completions",
            },
            async () =>
              Response.json({ choices: [{ message: { role: "assistant", content: "done" } }] })
          );
          await Promise.resolve();
          current = "changed-account";
          return {
            response,
            upstreamHttpSelection: selectHttpResponse(response),
            url: "https://provider.example/chat",
            headers: {},
            transformedBody: {},
          };
        },
      })
    )
  );
  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.equal(result.result.status, 409);
  assert.equal(result.result.errorCode, "LEASE_CONNECTION_MISMATCH");
  persistAttemptLogs(
    { status: 409, upstreamHttpSelection: result.upstreamHttpSelection },
    f.context
  );
  const saved = await rows(f);
  assert.equal(saved.length, 2);
  assert.equal(
    saved.find((row) => row.requestType !== "upstream_http_attempt")?.upstreamHttp?.send,
    null
  );
  assert.equal(saved.find((row) => row.requestType === "upstream_http_attempt")?.status, 200);
});

test("successful tool-loop limit boundaries retain the current provider send", async () => {
  const { runServerOwnedToolLoop } = await import("../../src/lib/skills/serverOwnedToolLoop.ts");
  for (const termination of ["max_followups", "deadline"] as const) {
    const f = fixture();
    const initialLeg = await runWithCapture(f.capture, () =>
      runNonStreamingProviderLeg(
        baseInput({
          connectionId: "account-wire",
          allowModelFallback: false,
          allowAccountRotation: false,
          executeProviderRequest: async () => {
            const response = await observeProviderHttpSend(
              {
                provider: "openai",
                model: "test-model",
                connectionId: "account-wire",
                endpoint: "chat_completions",
              },
              async () =>
                Response.json({
                  choices: [
                    {
                      message: {
                        role: "assistant",
                        content: null,
                        tool_calls: [
                          {
                            id: "call-boundary",
                            type: "function",
                            function: { name: "memory_search", arguments: "{}" },
                          },
                        ],
                      },
                      finish_reason: "tool_calls",
                    },
                  ],
                  usage: { prompt_tokens: 2, completion_tokens: 1, total_tokens: 3 },
                })
            );
            return {
              response,
              upstreamHttpSelection: selectHttpResponse(response),
              url: "https://provider.example/chat",
              headers: {},
              transformedBody: {},
            };
          },
        })
      )
    );
    assert.equal(initialLeg.kind, "ok");
    if (initialLeg.kind !== "ok") continue;
    const result = await runServerOwnedToolLoop({
      initialLeg,
      sourceBody: { messages: [{ role: "user", content: "fixture" }] },
      sourceFormat: "openai",
      skillsModelId: "test-model",
      executionContext: {
        apiKeyId: f.id,
        sessionId: f.id,
        requestId: f.id,
        builtinToolNames: ["memory_search"],
      },
      executeServerOwned: async (calls) =>
        calls.map((call) => ({
          id: call.id,
          name: call.name,
          result: { hits: [] },
          replayed: false,
        })),
      resumeUpstream: async () => {
        throw new Error("boundary must not resume");
      },
      maxFollowUps: termination === "max_followups" ? 0 : 3,
      deadlineAtMs: termination === "deadline" ? 1 : 120_000,
      now: () => 0,
    });
    assert.equal(result.kind, "ok");
    assert.equal(result.termination, termination);
    assert.equal(result.cumulativeUsage?.total_tokens, 3);
    persistAttemptLogs(
      { status: 200, upstreamHttpSelection: result.upstreamHttpSelection },
      f.context
    );
    const saved = await rows(f);
    assert.equal(saved.length, 1);
    assert.equal(saved[0].upstreamHttp?.send?.ordinal, 1);
    assert.equal(saved[0].upstreamHttp?.send?.status, 200);
  }
});

test("body-cap and body-read failures retain their exact observed HTTP200 association", async () => {
  const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
  const { MAX_NONSTREAMING_RESPONSE_BYTES } =
    await import("../../open-sse/handlers/chatCore/nonStreamingResponseBody.ts");
  for (const mode of ["cap", "read"] as const) {
    const f = fixture();
    let sends = 0;
    globalThis.fetch = (async () => {
      sends++;
      const payload =
        mode === "cap"
          ? '{"choices":[{"message":{"content":"small fixture"}}]}'
          : new ReadableStream<Uint8Array>({
              start(controller) {
                controller.error(Object.freeze(new Error("fixture read rejection")));
              },
            });
      return new Response(payload, {
        status: 200,
        headers: {
          "content-type": "application/json",
          ...(mode === "cap"
            ? { "content-length": String(MAX_NONSTREAMING_RESPONSE_BYTES + 1) }
            : {}),
        },
      });
    }) as typeof fetch;
    const body = {
      model: "gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content: f.id }],
    };
    const result = await handleChatCore({
      body,
      modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
      credentials: { apiKey: "fixture" },
      connectionId: "account-wire",
      correlationId: f.id,
      userAgent: "unit-test",
      isCombo: false,
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body,
        headers: new Headers({ "content-type": "application/json" }),
      },
      log: { debug() {}, info() {}, warn() {}, error() {} },
    } as unknown as Parameters<typeof handleChatCore>[0]);
    assert.equal(result.status, 502);
    assert.equal(sends, 1);
    const saved = await rows(f);
    assert.equal(saved.length, 1);
    assert.equal(saved[0].status, 502);
    assert.equal(saved[0].upstreamHttp?.send?.status, 200);
    assert.equal(saved[0].requestType === "upstream_http_attempt", false);
  }
});

async function bodyReadDeps(f: ReturnType<typeof fixture>, response: () => Promise<Response>) {
  const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");
  const controller = new AbortController();
  const body = { model: "test-model", messages: [{ role: "user", content: f.id }] };
  const resilienceSettings = resolveResilienceSettings(null);
  resilienceSettings.requestQueue.globalConcurrentRequests = 4;
  const deps: import("../../open-sse/handlers/chatCore/executeProviderRequest.ts").ExecuteProviderRequestDeps =
    {
      agentGoalPolicy: {
        detected: false,
        readinessMaxTimeoutMs: 600_000,
        streamRecoveryEnabled: false,
      },
      assertManagedLeaseFence() {},
      buildUpstreamHeadersForExecute: () => ({}),
      clientRawRequest: { headers: new Headers(), signal: controller.signal },
      clientResponseFormat: "chat.completions",
      connectionId: null,
      correlationId: f.id,
      credentials: null,
      dedupEnabled: false,
      dedupHash: null,
      effectiveModel: "test-model",
      executor: {
        execute: async () => {
          const observed = await observeProviderHttpSend(
            {
              provider: "openai",
              model: "test-model",
              connectionId: f.id,
              endpoint: "chat_completions",
            },
            response
          );
          return { response: observed, upstreamHttpSelection: selectHttpResponse(observed) };
        },
      },
      getExecutionCredentials: () => ({}),
      getExecutorClientHeaders: () => ({}),
      isModelScope: () => false,
      isOpencodeClient: false,
      log: null,
      model: "test-model",
      onCredentialsRefreshed: null,
      pendingScope: { id: null, model: "test-model", provider: "openai", connectionId: null },
      provider: "openai",
      providerRequestCapture: f.capture,
      rawBody: body,
      recordKeyHealthStatus() {},
      requestedModel: "test-model",
      resilienceSettings,
      settings: null,
      skipUpstreamRetry: false,
      stream: false,
      streamController: { signal: controller.signal },
      targetFormat: "openai",
      trace() {},
      traceId: f.id,
      translatedBody: body,
      trustedEffortContext: {},
      upstreamStream: false,
      userAgent: "unit-test",
    };
  return deps;
}

function deferred() {
  let release!: () => void;
  const promise = new Promise<void>((resolve) => {
    release = resolve;
  });
  return { promise, release };
}

function rejectingBody(value: unknown, gate: ReturnType<typeof deferred>, started: () => void) {
  const response = Response.json({ choices: [] });
  response.text = async () => {
    started();
    await gate.promise;
    throw value;
  };
  return response;
}

test("body-read rejection slots preserve frozen and primitive values across concurrent executions", async () => {
  const { executeProviderRequest } =
    await import("../../open-sse/handlers/chatCore/executeProviderRequest.ts");
  const { getStats } = await import("../../open-sse/services/accountSemaphore.ts");
  for (const rejection of [
    Object.freeze(new Error("fixture body read")),
    "fixture primitive body read",
  ]) {
    const gate = deferred();
    const started = [deferred(), deferred()];
    const fixtures = [fixture(), fixture()];
    const slots = fixtures.map(
      () =>
        ({
          selection: null,
        }) as import("../../open-sse/utils/providerHttpAttempts.ts").HttpAttemptRejectionSlot
    );
    const deps = await Promise.all(
      fixtures.map((f, index) =>
        bodyReadDeps(f, async () => rejectingBody(rejection, gate, started[index].release))
      )
    );
    const pending = deps.map((input, index) =>
      executeProviderRequest(input, "test-model", false, slots[index]).then(
        () => assert.fail("expected body rejection"),
        (error: unknown) => error
      )
    );
    await Promise.all(started.map((event) => event.promise));
    gate.release();
    const errors = await Promise.all(pending);
    assert.strictEqual(errors[0], rejection);
    assert.strictEqual(errors[1], rejection);
    for (let index = 0; index < slots.length; index++) {
      assert.equal(slots[index].selection?.current?.record.connectionId, fixtures[index].id);
      assert.equal(slots[index].selection?.current?.record.status, 200);
    }
    assert.notStrictEqual(slots[0].selection?.current, slots[1].selection?.current);
    assert.equal(
      Object.values(getStats()).every((entry) => entry.running === 0 && entry.queued === 0),
      true
    );
  }
});

test("a deduplicated rejection belongs only to the invocation that sent HTTP", async () => {
  const { executeProviderRequest } =
    await import("../../open-sse/handlers/chatCore/executeProviderRequest.ts");
  const { getInflightCount } = await import("../../open-sse/services/requestDedup.ts");
  const { getStats } = await import("../../open-sse/services/accountSemaphore.ts");
  const owner = fixture(),
    joiner = fixture(),
    gate = deferred(),
    started = deferred();
  const rejection = Object.freeze(new Error("shared rejected read"));
  let sends = 0;
  const ownerDeps = await bodyReadDeps(owner, async () => {
    sends++;
    return rejectingBody(rejection, gate, started.release);
  });
  const joinerDeps = await bodyReadDeps(joiner, async () => {
    sends++;
    return Response.json({ choices: [] });
  });
  for (const deps of [ownerDeps, joinerDeps]) {
    deps.dedupEnabled = true;
    deps.dedupHash = owner.id;
  }
  const ownerSlot: import("../../open-sse/utils/providerHttpAttempts.ts").HttpAttemptRejectionSlot =
    { selection: null };
  const joinerSlot: import("../../open-sse/utils/providerHttpAttempts.ts").HttpAttemptRejectionSlot =
    { selection: null };
  const pendingOwner = executeProviderRequest(ownerDeps, "test-model", true, ownerSlot).catch(
    (error: unknown) => error
  );
  await started.promise;
  const pendingJoiner = executeProviderRequest(joinerDeps, "test-model", true, joinerSlot).catch(
    (error: unknown) => error
  );
  gate.release();
  const errors = await Promise.all([pendingOwner, pendingJoiner]);
  assert.strictEqual(errors[0], rejection);
  assert.strictEqual(errors[1], rejection);
  assert.equal(sends, 1);
  assert.equal(ownerSlot.selection?.current?.record.connectionId, owner.id);
  assert.equal(joinerSlot.selection, null);
  assert.equal(getInflightCount(), 0);
  assert.equal(
    Object.values(getStats()).every((entry) => entry.running === 0 && entry.queued === 0),
    true
  );
});

test("a swallowed ClinePass read failure preserves the original outcome and cannot taint a later local failure", async () => {
  const { executeProviderRequest } =
    await import("../../open-sse/handlers/chatCore/executeProviderRequest.ts");
  const f = fixture();
  let sends = 0;
  const failure = Object.freeze(new Error("retry body failed"));
  const deps = await bodyReadDeps(f, async () => {
    sends++;
    if (sends === 1) return Response.json({ success: false, error: "empty content" });
    const response = Response.json({ choices: [] });
    response.text = async () => {
      throw failure;
    };
    return response;
  });
  const result = await runNonStreamingProviderLeg(
    baseInput({
      provider: "clinepass",
      sleep: async () => {},
      executeProviderRequest: async (model, allowDedup, _policy, rejection) => {
        const result = await executeProviderRequest(deps, model, allowDedup, rejection);
        return {
          ...result,
          url: result.url ?? "",
          headers: result.headers ?? {},
          transformedBody: result.body ?? {},
        };
      },
    })
  );
  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.match(result.result.error, /empty content/);
  persistAttemptLogs(
    { status: result.result.status, upstreamHttpSelection: result.upstreamHttpSelection },
    f.context
  );
  const saved = await rows(f);
  assert.equal(sends, 2);
  assert.equal(saved.length, 2);
  assert.equal(
    saved.find((row) => row.requestType !== "upstream_http_attempt")?.upstreamHttp?.send?.ordinal,
    1
  );
  assert.equal(
    saved.find((row) => row.requestType === "upstream_http_attempt")?.upstreamHttp?.send?.ordinal,
    2
  );
  const local = await runNonStreamingProviderLeg(
    baseInput({
      executeProviderRequest: async () => {
        throw failure;
      },
    })
  );
  assert.equal(local.kind, "error");
  assert.equal(local.upstreamHttpSelection, null);
});

test("a client abort during the body read stays unassociated despite observed HTTP200", async () => {
  const { executeProviderRequest } =
    await import("../../open-sse/handlers/chatCore/executeProviderRequest.ts");
  const f = fixture();
  const abort = Object.freeze(
    Object.assign(new Error("fixture client abort"), { name: "AbortError" })
  );
  const deps = await bodyReadDeps(f, async () => {
    const response = Response.json({ choices: [] });
    response.text = async () => {
      throw abort;
    };
    return response;
  });
  const result = await runNonStreamingProviderLeg(
    baseInput({
      executeProviderRequest: async (model, allowDedup, _policy, rejection) => {
        const execution = await executeProviderRequest(deps, model, allowDedup, rejection);
        return {
          ...execution,
          url: execution.url ?? "",
          headers: execution.headers ?? {},
          transformedBody: execution.body ?? {},
        };
      },
    })
  );
  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.equal(result.result.status, 499);
  assert.equal(result.upstreamHttpSelection, null);
  persistAttemptLogs(
    { status: 499, upstreamHttpSelection: result.upstreamHttpSelection },
    f.context
  );
  const saved = await rows(f);
  assert.equal(saved.length, 2);
  assert.equal(
    saved.find((row) => row.requestType !== "upstream_http_attempt")?.upstreamHttp?.send,
    null
  );
  assert.equal(saved.find((row) => row.requestType === "upstream_http_attempt")?.status, 200);
});

test("successful dedup joiner has no owner selection or observed sends", async () => {
  const { executeProviderRequest } =
    await import("../../open-sse/handlers/chatCore/executeProviderRequest.ts");
  const { normalizeExecutorResult } =
    await import("../../open-sse/handlers/chatCore/upstreamTimeouts.ts");
  const owner = fixture(),
    joiner = fixture(),
    gate = deferred(),
    started = deferred();
  const payload = JSON.stringify({ choices: [{ message: { content: "shared fixture" } }] });
  let sends = 0;
  const ownerDeps = await bodyReadDeps(owner, async () => {
    sends++;
    const response = new Response(payload, { headers: { "content-type": "application/json" } });
    response.text = async () => {
      started.release();
      await gate.promise;
      return payload;
    };
    return response;
  });
  const joinerDeps = await bodyReadDeps(joiner, async () => {
    sends++;
    return Response.json({ choices: [] });
  });
  const originalExecute = ownerDeps.executor.execute;
  let originalSelection:
    import("../../open-sse/utils/providerHttpAttempts.ts").HttpAttemptSelection | null | undefined;
  ownerDeps.executor.execute = async (input) => {
    const result = normalizeExecutorResult(await originalExecute(input));
    originalSelection = result.upstreamHttpSelection;
    return result;
  };
  for (const deps of [ownerDeps, joinerDeps]) {
    deps.dedupEnabled = true;
    deps.dedupHash = owner.id;
  }
  const pendingOwner = executeProviderRequest(ownerDeps, "test-model", true);
  await started.promise;
  const pendingJoiner = executeProviderRequest(joinerDeps, "test-model", true);
  gate.release();
  const [ownerResult, joinerResult] = await Promise.all([pendingOwner, pendingJoiner]);
  assert.equal(sends, 1);
  assert.ok(originalSelection?.current);
  const originalRef = originalSelection.current;
  assert.strictEqual(ownerResult.upstreamHttpSelection, originalSelection);
  assert.equal(joinerResult.upstreamHttpSelection, null);
  assert.notStrictEqual(ownerResult.response, joinerResult.response);
  assert.equal(await ownerResult.response.text(), payload);
  assert.equal(await joinerResult.response.text(), payload);
  persistAttemptLogs(
    { status: 200, upstreamHttpSelection: joinerResult.upstreamHttpSelection },
    joiner.context
  );
  const joinerRows = await rows(joiner);
  assert.equal(joinerRows.length, 1);
  assert.equal(joinerRows[0].requestType === "upstream_http_attempt", false);
  assert.equal(joinerRows[0].upstreamHttp, null);
  assert.strictEqual(ownerResult.upstreamHttpSelection, originalSelection);
  assert.strictEqual(ownerResult.upstreamHttpSelection.current, originalRef);
  persistAttemptLogs(
    { status: 200, upstreamHttpSelection: ownerResult.upstreamHttpSelection },
    owner.context
  );
  const ownerRows = await rows(owner);
  assert.equal(ownerRows.length, 1);
  assert.equal(ownerRows[0].upstreamHttp?.total, 1);
  assert.equal(ownerRows[0].upstreamHttp?.send?.id, originalRef.record.id);
  assert.strictEqual(ownerResult.upstreamHttpSelection, originalSelection);
  assert.strictEqual(ownerResult.upstreamHttpSelection.current, originalRef);
});
