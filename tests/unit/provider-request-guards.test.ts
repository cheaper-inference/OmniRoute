import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-guards-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { executeProviderRequest } =
  await import("../../open-sse/handlers/chatCore/executeProviderRequest.ts");
const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");
const { runAsProbe } = await import("../../src/shared/utils/probeOrigin.ts");
const { getModelScopeRetryDelayMs } = await import("../../open-sse/services/modelscopePolicy.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Deps = Parameters<typeof executeProviderRequest>[0];

function makeDeps(response: () => Response, health: number[], controller = new AbortController()) {
  const body = { model: "test-model", messages: [{ role: "user", content: "guard" }] };
  const resilienceSettings = resolveResilienceSettings(null);
  resilienceSettings.requestQueue.globalConcurrentRequests = 4;
  const deps: Deps = {
    agentGoalPolicy: {
      detected: false,
      readinessMaxTimeoutMs: 600_000,
      streamRecoveryEnabled: false,
    },
    assertManagedLeaseFence() {},
    buildUpstreamHeadersForExecute: () => ({}),
    clientRawRequest: { headers: new Headers(), signal: controller.signal },
    clientResponseFormat: "chat.completions",
    connectionId: "provider-guard-connection",
    correlationId: "provider-guard",
    credentials: null,
    dedupEnabled: false,
    dedupHash: null,
    effectiveModel: "test-model",
    executor: { execute: async () => ({ response: response() }) },
    getExecutionCredentials: () => ({ connectionId: "provider-guard-connection", apiKey: "guard" }),
    getExecutorClientHeaders: () => ({}),
    isModelScope: () => true,
    isOpencodeClient: false,
    log: null,
    model: "test-model",
    onCredentialsRefreshed: null,
    pendingScope: { id: null, model: "test-model", provider: "modelscope", connectionId: null },
    provider: "modelscope",
    providerRequestCapture: null,
    rawBody: body,
    recordKeyHealthStatus: (status: number) => health.push(status),
    requestedModel: "test-model",
    resilienceSettings,
    settings: null,
    skipUpstreamRetry: false,
    stream: false,
    streamController: controller,
    targetFormat: "openai",
    trace() {},
    traceId: "provider-guard",
    translatedBody: body,
    trustedEffortContext: {},
    upstreamStream: false,
    userAgent: "unit-test",
  } as unknown as Deps;
  return deps;
}

test("a non-streaming probe does not record key health", async () => {
  const health: number[] = [];
  const deps = makeDeps(
    () => new Response("{}", { status: 401, headers: { "content-type": "application/json" } }),
    health
  );
  deps.isModelScope = () => false;
  await runAsProbe(() => executeProviderRequest(deps, "test-model", false));
  assert.deepEqual(health, []);
});

test("a normal non-streaming request still records key health", async () => {
  const health: number[] = [];
  const deps = makeDeps(
    () => new Response("{}", { status: 401, headers: { "content-type": "application/json" } }),
    health
  );
  deps.isModelScope = () => false;
  await executeProviderRequest(deps, "test-model", false);
  assert.deepEqual(health, [401]);
});

test("ModelScope caps a server-sent Retry-After", () => {
  assert.equal(getModelScopeRetryDelayMs({ "retry-after": "86400" }, 0), 10_000);
  assert.equal(getModelScopeRetryDelayMs({ "retry-after": "2.5" }, 0), 2500);
});

test("a client abort stops the ModelScope retry sleep", async () => {
  const controller = new AbortController();
  const health: number[] = [];
  let sends = 0;
  const deps = makeDeps(
    () => {
      sends++;
      return new Response("{}", {
        status: 429,
        headers: {
          "content-type": "application/json",
          "retry-after": "5",
          "modelscope-ratelimit-requests-remaining": "5",
        },
      });
    },
    health,
    controller
  );
  const pending = executeProviderRequest(deps, "test-model", false).catch(
    (error: unknown) => error
  );
  setTimeout(() => controller.abort(new Error("client left")), 100);
  const started = Date.now();
  await pending;
  assert.ok(Date.now() - started < 2_000, "the retry sleep must end on client abort");
  assert.equal(sends, 1);
});
