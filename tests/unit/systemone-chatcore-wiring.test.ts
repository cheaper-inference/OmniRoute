import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-systemone-chat-"));
process.env.DATA_DIR = testDataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.APP_LOG_TO_FILE = "false";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { addCustomModel, replaceSyncedAvailableModelsForConnection } =
  await import("../../src/lib/db/models.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { handleSystemOneProxy, defaultSystemOneProxyDeps } =
  await import("../../open-sse/handlers/systemOne.ts");
const { getStats, buildAccountSemaphoreKey, resetAll } =
  await import("../../open-sse/services/accountSemaphore.ts");
const originalFetch = globalThis.fetch;
let upstreamCalls = 0;

const mockChatFetch: typeof fetch = async () => {
  upstreamCalls += 1;
  return new Response(
    JSON.stringify({
      id: "chatcmpl-systemone-control",
      object: "chat.completion",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "chat works" },
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
};

test.before(() => {
  globalThis.fetch = mockChatFetch;
});

test.after(async () => {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
  globalThis.fetch = originalFetch;
  resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function invoke(
  modelInfo: {
    provider: string;
    model: string;
    supportedEndpoints?: string[];
  },
  capacity?: { connectionId: string; maxConcurrent: number }
) {
  const body = {
    model: modelInfo.model,
    messages: [{ role: "user", content: "hello" }],
    stream: false,
  };
  return handleChatCore({
    body,
    modelInfo: { ...modelInfo, extendedContext: false },
    credentials: { apiKey: "fixture-chat-key", providerSpecificData: {}, ...capacity },
    connectionId: capacity?.connectionId,
    log: { debug() {}, info() {}, warn() {}, error() {} },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body,
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
    skipResourcePressureGuard: true,
  });
}

test("chatCore returns the caller's structured 400 result for an explicit decision-only model", async () => {
  const callsBefore = upstreamCalls;
  const result = await invoke({
    provider: "openrouter",
    model: "acme/decision-only",
    supportedEndpoints: ["systemone"],
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /System One endpoint/);
  assert.ok(result.response instanceof Response);
  assert.equal(result.response.status, 400);
  const payload = await result.response.json();
  assert.equal(payload.error.message, result.error);
  assert.equal(upstreamCalls, callsBefore);
});

test("a manually configured decision-only model retains its endpoints through lookup and rejects chat", async () => {
  await addCustomModel(
    "openrouter",
    "acme/manual-decision",
    undefined,
    "manual",
    "chat-completions",
    ["systemone"]
  );
  const modelInfo = await getModelInfo("openrouter/acme/manual-decision");
  assert.deepEqual(modelInfo.supportedEndpoints, ["systemone"]);
  const callsBefore = upstreamCalls;
  const result = await invoke(modelInfo);
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match((await result.response.json()).error.message, /System One endpoint/);
  assert.equal(upstreamCalls, callsBefore);
});

for (const [model, endpoints] of [
  ["acme/manual-chat", ["chat"]],
  ["acme/manual-mixed", ["chat", "systemone"]],
] as const) {
  test(`lookup and chatCore preserve successful chat for ${model}`, async () => {
    if (model === "acme/manual-mixed") {
      await replaceSyncedAvailableModelsForConnection("openrouter", "fixture-chat-catalog", [
        { id: model, supportedEndpoints: ["systemone"] },
      ]);
    }
    await addCustomModel("openrouter", model, undefined, "manual", "chat-completions", [
      ...endpoints,
    ]);
    const modelInfo = await getModelInfo(`openrouter/${model}`);
    const callsBefore = upstreamCalls;
    const result = await invoke(modelInfo);
    assert.equal(result.success, true);
    assert.equal(result.response.status, 200);
    assert.equal((await result.response.json()).choices[0].message.content, "chat works");
    assert.equal(upstreamCalls, callsBefore + 1);
    assert.deepEqual(modelInfo.supportedEndpoints, [...endpoints]);
  });
}

test(
  "System One waits for an ordinary chat holding the same account's only capacity slot",
  { timeout: 10_000 },
  async () => {
    const connectionId = "shared-chat-systemone-capacity";
    const capacity = { connectionId, maxConcurrent: 1 };
    const accountKey = buildAccountSemaphoreKey({
      provider: "openrouter",
      accountKey: connectionId,
    });
    let releaseChat!: () => void;
    let signalChatStarted!: () => void;
    const chatHeld = new Promise<void>((resolve) => {
      releaseChat = resolve;
    });
    const chatStarted = new Promise<void>((resolve) => {
      signalChatStarted = resolve;
    });
    const previousFetch = globalThis.fetch;
    globalThis.fetch = async (...args) => {
      signalChatStarted();
      await chatHeld;
      return mockChatFetch(...args);
    };
    const chat = invoke(
      { provider: "openrouter", model: "acme/capacity-chat", supportedEndpoints: ["chat"] },
      capacity
    );
    let decision: Promise<Response> | undefined;
    let decisionFetched = false;
    let decisionSettled = false;
    try {
      await Promise.race([
        chatStarted,
        chat.then((result) => {
          throw new Error(`Chat completed before entering upstream: ${JSON.stringify(result)}`);
        }),
      ]);
      decision = handleSystemOneProxy(
        {
          provider: "openrouter",
          canonicalModel: "openrouter/typesafe/jev-1.13",
          body: {
            model: "typesafe/jev-1.13",
            state: "one apple",
            questions: { fruit: { type: "noul", instructions: "Is this an apple?" } },
          },
          credentials: { apiKey: "fixture-decision-key", ...capacity },
        },
        {
          ...defaultSystemOneProxyDeps,
          fetchSystemOne: async () => {
            decisionFetched = true;
            return new Response(
              JSON.stringify({ answers: { fruit: { type: "noul", noul: 0.9 } } }),
              { status: 200 }
            );
          },
          saveCallLog: async () => {},
          saveRequestUsage: async () => {},
        }
      ).then((response) => {
        decisionSettled = true;
        return response;
      });
      const deadline = Date.now() + 2000;
      while (!getStats()[accountKey]?.queued && !decisionSettled && Date.now() < deadline) {
        await new Promise((resolve) => setImmediate(resolve));
      }
      assert.equal(
        decisionFetched,
        false,
        "System One must not start upstream while chat occupies capacity"
      );
      assert.equal(getStats()[accountKey]?.queued, 1);
      releaseChat();
      const [chatResult, decisionResponse] = await Promise.all([chat, decision]);
      assert.equal(chatResult.success, true);
      assert.equal(decisionResponse.status, 200);
      assert.equal(decisionFetched, true);
      assert.equal(getStats()[accountKey]?.running ?? 0, 0);
    } finally {
      releaseChat();
      await Promise.allSettled([chat, ...(decision ? [decision] : [])]);
      globalThis.fetch = previousFetch;
      resetAll();
    }
  }
);
