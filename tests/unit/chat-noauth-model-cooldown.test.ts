import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("chat-noauth-model-cooldown");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
const {
  BaseExecutor,
  buildOpenAIResponse,
  buildRequest,
  combosDb,
  handleChat,
  resetStorage,
  seedConnection,
  settingsDb,
} = harness;

const MODEL = "Lorbus/Qwen3.6-27B-int4-AutoRound";
const originalFetch = globalThis.fetch;

function chatBody(text: string) {
  return {
    model: `unc/${MODEL}`,
    stream: false,
    messages: [{ role: "user", content: text }],
  };
}

const originalRetryConfig = {
  maxAttempts: BaseExecutor.RETRY_CONFIG.maxAttempts,
  delayMs: BaseExecutor.RETRY_CONFIG.delayMs,
};

// Lock the model the way production does: one request fails upstream with a 502,
// which records a short model lockout on the shared no-auth connection.
async function lockModelWithAnUpstream502() {
  await settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { message: "bad gateway" } }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  const failed = await handleChat(buildRequest({ body: chatBody("the request that fails") }));
  assert.equal(failed.status, 502);
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.maxAttempts = originalRetryConfig.maxAttempts;
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
  clearAllModelLockouts();
});

test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = originalRetryConfig.delayMs;
  globalThis.fetch = originalFetch;
  clearAllModelLockouts();
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("a short lock on the shared no-auth connection is waited out and the request is served", async () => {
  await lockModelWithAnUpstream502();
  await settingsDb.updateSettings({ requestRetry: 1, maxRetryIntervalSec: 10 });
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return buildOpenAIResponse("served after the lock");
  };

  const startedAt = Date.now();
  const response = await handleChat(buildRequest({ body: chatBody("wait out a short lock") }));

  assert.equal(response.status, 200);
  assert.equal(fetchCalls, 1);
  assert.ok(Date.now() - startedAt >= 1000, "the wait happens on the server");
});

test("with the wait disabled, a locked model answers 429 with a Retry-After, not 401", async () => {
  await lockModelWithAnUpstream502();
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return buildOpenAIResponse("must not be reached");
  };

  const response = await handleChat(buildRequest({ body: chatBody("no wait configured") }));
  const body = (await response.json()) as { error: { code: string } };

  assert.equal(response.status, 429);
  assert.equal(body.error.code, "model_cooldown");
  assert.ok(Number(response.headers.get("Retry-After")) >= 1);
  assert.equal(fetchCalls, 0);
});

test(
  "a lock longer than the wait ceiling answers 429 at once with the remaining time",
  { timeout: 30_000 },
  async (t) => {
    await lockModelWithAnUpstream502();
    t.mock.timers.enable({ apis: ["Date", "setTimeout"], now: Date.now() });
    try {
      await settingsDb.updateSettings({ requestRetry: 1, maxRetryIntervalSec: 1 });
      let fetchCalls = 0;
      globalThis.fetch = async () => {
        fetchCalls++;
        return buildOpenAIResponse("must not be reached");
      };

      const response = await handleChat(
        new Request(buildRequest({ body: chatBody("lock beyond the ceiling") }), {
          signal: AbortSignal.timeout(30_000),
        })
      );

      assert.equal(response.status, 429);
      // Logical time never advances: a server-side wait would leave this request
      // pending and fail the watchdog instead of depending on host scheduling.
      assert.ok(Number(response.headers.get("Retry-After")) >= 2);
      assert.equal(fetchCalls, 0, "a lock beyond the ceiling never reaches upstream");
    } finally {
      t.mock.timers.reset();
    }
  }
);

test("a client that disconnects during the wait triggers no upstream call", async () => {
  await lockModelWithAnUpstream502();
  await settingsDb.updateSettings({ requestRetry: 1, maxRetryIntervalSec: 10 });
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return buildOpenAIResponse("must not be reached");
  };
  const controller = new AbortController();
  const request = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    signal: controller.signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(chatBody("abort while waiting")),
  });

  setTimeout(() => controller.abort(), 150);
  const response = await handleChat(request);
  await new Promise((resolve) => setTimeout(resolve, 200));

  assert.equal(response.status, 499, "the aborted wait ends the request, it is not an auth error");
  assert.equal(fetchCalls, 0);
});

test("a lock on one model leaves another model of the provider served immediately", async () => {
  await lockModelWithAnUpstream502();
  globalThis.fetch = async () => buildOpenAIResponse("other model ok");

  const response = await handleChat(
    buildRequest({
      body: { ...chatBody("other model"), model: "unc/other-passthrough-model" },
    })
  );

  assert.equal(response.status, 200);
});

test(
  "a combo skips a locked no-auth member at once, without waiting, and serves the next member",
  { timeout: 30_000 },
  async (t) => {
    await seedConnection("openai", { apiKey: "sk-openai-combo-member" });
    await combosDb.createCombo({
      name: "noauth-locked-then-keyed",
      strategy: "priority",
      config: { maxRetries: 0, retryDelayMs: 0 },
      models: [`unc/${MODEL}`, "openai/gpt-4.1"],
    });
    await lockModelWithAnUpstream502();
    // Keep the lock alive while DB and module I/O complete. A retry sleep cannot
    // complete because the test never advances this clock.
    t.mock.timers.enable({ apis: ["Date", "setTimeout"], now: Date.now() });
    try {
      await settingsDb.updateSettings({ requestRetry: 3, maxRetryIntervalSec: 10 });
      let noAuthCalls = 0;
      let keyedCalls = 0;
      globalThis.fetch = async (url) => {
        if (new URL(String(url)).hostname === "hermes.ai.unturf.com") {
          noAuthCalls += 1;
          return new Response("{}", { status: 502 });
        }
        keyedCalls += 1;
        return buildOpenAIResponse("served by the second member");
      };

      const response = await handleChat(
        new Request(
          buildRequest({
            body: {
              model: "noauth-locked-then-keyed",
              stream: false,
              messages: [{ role: "user", content: "combo with a locked member" }],
            },
          }),
          { signal: AbortSignal.timeout(30_000) }
        )
      );

      assert.equal(response.status, 200);
      assert.equal(keyedCalls, 1);
      assert.equal(noAuthCalls, 0, "the locked member isn't dialled");
      const body = await response.json();
      assert.equal(body.choices[0].message.content, "served by the second member");
    } finally {
      t.mock.timers.reset();
    }
  }
);
