// F-C2-25: concurrent identical requests share one upstream call, and that call is tied to the
// FIRST caller's abort signal. When the first client disconnects, every joiner whose own client is
// still connected used to receive that abort. A joiner must run its own call instead.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-dedup-abort-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { executeProviderRequest } =
  await import("../../open-sse/handlers/chatCore/executeProviderRequest.ts");
const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");

test.after(() => {
  clearInflight();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Deps = Parameters<typeof executeProviderRequest>[0];

function makeDeps(controller: AbortController, execute: Deps["executor"]["execute"]) {
  const body = {
    model: "test-model",
    temperature: 0,
    messages: [{ role: "user", content: "dedup" }],
  };
  const resilienceSettings = resolveResilienceSettings(null);
  resilienceSettings.requestQueue.globalConcurrentRequests = 4;
  return {
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
    correlationId: "dedup-abort",
    credentials: null,
    dedupEnabled: true,
    dedupHash: "dedup-abort-hash",
    effectiveModel: "test-model",
    executor: { execute },
    getExecutionCredentials: () => ({}),
    getExecutorClientHeaders: () => ({}),
    isModelScope: () => false,
    isOpencodeClient: false,
    log: null,
    model: "test-model",
    onCredentialsRefreshed: null,
    pendingScope: { id: null, model: "test-model", provider: "openai", connectionId: null },
    provider: "openai",
    providerRequestCapture: null,
    rawBody: body,
    recordKeyHealthStatus() {},
    requestedModel: "test-model",
    resilienceSettings,
    settings: null,
    skipUpstreamRetry: false,
    stream: false,
    streamController: controller,
    targetFormat: "openai",
    trace() {},
    traceId: "dedup-abort",
    translatedBody: body,
    trustedEffortContext: {},
    upstreamStream: false,
    userAgent: "unit-test",
  } as unknown as Deps;
}

test("a dedup joiner survives the initiator's client disconnect", async () => {
  clearInflight();
  const initiator = new AbortController();
  const joiner = new AbortController();
  let calls = 0;
  const execute = async (input: { signal?: AbortSignal }) => {
    calls++;
    if (calls === 1) {
      await new Promise((_, reject) =>
        input.signal?.addEventListener("abort", () => reject(input.signal?.reason))
      );
    }
    return {
      response: new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    };
  };
  const first = executeProviderRequest(
    makeDeps(initiator, execute as never),
    "test-model",
    true
  ).catch((error: unknown) => error);
  await new Promise((resolve) => setTimeout(resolve, 50));
  const second = executeProviderRequest(makeDeps(joiner, execute as never), "test-model", true);
  await new Promise((resolve) => setTimeout(resolve, 50));
  // Real disconnects abort with a string reason (streamHandler.getClientAbortReason).
  initiator.abort("request_signal_aborted");
  const joined = await second;
  assert.equal(joined.response.status, 200);
  await first;
  assert.equal(calls, 2, "the joiner must run its own call after the shared one was aborted");
});
