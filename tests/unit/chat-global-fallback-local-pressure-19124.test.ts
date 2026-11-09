/**
 * #19124: a shed this process created must end the combo at the chat handler too. The Global
 * Fallback Model runs after handleComboChat and retries 503s, so it has to skip the local shed
 * while an upstream 503 with the very same body keeps its fallback.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("chat-global-fallback-local-pressure");
const {
  BaseExecutor,
  buildClaudeResponse,
  buildRequest,
  combosDb,
  handleChat,
  resetStorage,
  seedConnection,
  settingsDb,
  toPlainHeaders,
} = harness;
const { reloadResourcePressureRuntime } = await import("../../open-sse/utils/resourcePressure.ts");

const originalFetch = globalThis.fetch;
const MiB = 1024 ** 2;

/**
 * Installs a pressure runtime that counts each guard check. The first `healthyChecks` read a
 * healthy heap, so the request passes admission and pressure rises before the provider dispatch.
 */
function reloadPressure(healthyChecks = Infinity) {
  const guard = { checks: 0 };
  reloadResourcePressureRuntime({
    heapThresholdMb: 100,
    immediateHeapUsedMb: () => {
      guard.checks += 1;
      return guard.checks <= healthyChecks ? 1 : 500;
    },
    sample: async () => ({
      observedAtMs: Date.now(),
      v8: { heapUsedBytes: MiB, heapLimitBytes: 10_000 * MiB },
      process: {
        rssBytes: MiB,
        externalBytes: 0,
        arrayBuffersBytes: 0,
        availableBytes: null,
        constrainedBytes: null,
      },
      cgroup: {
        currentBytes: null,
        maxBytes: null,
        highBytes: null,
        fileBytes: null,
        events: null,
      },
      psi: null,
    }),
  });
  return guard;
}

/** Sends one non-streaming request to the named combo through the full chat handler. */
function requestCombo(model: string) {
  return handleChat(
    buildRequest({
      body: { model, stream: false, messages: [{ role: "user", content: "pressure fallback" }] },
    })
  );
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
  reloadPressure();
});

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  reloadPressure();
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("a local pressure shed skips the Global Fallback Model and keeps the original 503", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-pressure-shed" });
  await seedConnection("claude", { apiKey: "sk-claude-pressure-shed" });
  await combosDb.createCombo({
    name: "router-pressure-shed",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["openai/gpt-4.1"],
  });
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return new Response("provider must not run", { status: 500 });
  };

  const withoutFallback = reloadPressure(1);
  const control = await requestCombo("router-pressure-shed");
  assert.equal(control.status, 503);
  assert.ok(withoutFallback.checks > 1, "the request must get past admission to the combo target");

  await settingsDb.updateSettings({ globalFallbackModel: "claude/claude-sonnet-4.6" });
  const withFallback = reloadPressure(1);
  const response = await requestCombo("router-pressure-shed");

  assert.equal(response.status, 503);
  assert.equal(response.headers.get("Retry-After"), "5");
  assert.equal((await response.json()).error.code, "resource_pressure");
  assert.equal(fetchCalls, 0);
  assert.equal(
    withFallback.checks,
    withoutFallback.checks,
    "the Global Fallback Model must add no dispatch to a request the process already shed"
  );
});

test("an upstream 503 with a pressure body still reaches the Global Fallback Model", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-upstream-pressure" });
  await seedConnection("claude", { apiKey: "sk-claude-upstream-pressure" });
  await combosDb.createCombo({
    name: "router-upstream-pressure",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0 },
    models: ["openai/gpt-4.1"],
  });
  await settingsDb.updateSettings({ globalFallbackModel: "claude/claude-sonnet-4.6" });

  const attemptedKeys: string[] = [];
  globalThis.fetch = async (_url, init) => {
    const headers = toPlainHeaders(init?.headers);
    const key = headers["x-api-key"] ?? headers.Authorization ?? headers.authorization ?? "";
    attemptedKeys.push(key);
    if (key === "sk-claude-upstream-pressure") return buildClaudeResponse("Fallback answered");
    return new Response(
      JSON.stringify({
        error: { code: "resource_pressure", type: "server_error", message: "Upstream pressure" },
      }),
      { status: 503, headers: { "Content-Type": "application/json", "Retry-After": "7" } }
    );
  };

  const response = await requestCombo("router-upstream-pressure");

  assert.equal(response.status, 200);
  assert.deepEqual(attemptedKeys, [
    "Bearer sk-openai-upstream-pressure",
    "sk-claude-upstream-pressure",
  ]);
  assert.equal((await response.json()).choices[0].message.content, "Fallback answered");
});
