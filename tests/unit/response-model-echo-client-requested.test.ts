// The response-model echo (#1311 opt-in, #3697 Codex CLI) must echo the model name the
// client sent. Combo and alias dispatch rewrite the dispatched body.model to the resolved
// leaf target (chatHelpers.ts sends `${provider}/${model}`) before handleChatCore runs, so
// echoing body.model leaks the leaf target instead of the alias/combo the client asked for.
// clientRawRequest.body is the snapshot of what the client actually sent.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-echo-client-model-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const core = await import("../../src/lib/db/core.ts");

const CLIENT_MODEL = "team/my-alias-combo";
const LEAF_MODEL = "gpt-4o-mini";

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

async function invoke({
  stream,
  echoSetting = true,
  userAgent = "unit-test",
  clientModel = CLIENT_MODEL,
}) {
  await settingsDb.updateSettings({ echoRequestedModelName: echoSetting });
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    stream
      ? new Response(
          `data: {"id":"c1","object":"chat.completion.chunk","model":"${LEAF_MODEL}","choices":[{"index":0,"delta":{"role":"assistant","content":"ok"}}]}\n\n` +
            `data: {"id":"c1","object":"chat.completion.chunk","model":"${LEAF_MODEL}","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n`,
          { status: 200, headers: { "Content-Type": "text/event-stream" } }
        )
      : new Response(
          JSON.stringify({
            id: "c1",
            object: "chat.completion",
            model: LEAF_MODEL,
            choices: [
              { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
            ],
            usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
  try {
    const messages = [{ role: "user", content: "hello" }];
    const result = await handleChatCore({
      // What combo/alias dispatch hands to chatCore: body.model already rewritten to the leaf.
      body: { model: `openai/${LEAF_MODEL}`, stream, messages },
      modelInfo: { provider: "openai", model: LEAF_MODEL, extendedContext: false },
      credentials: { apiKey: "sk-test", providerSpecificData: {} },
      log: noopLog(),
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body: { model: clientModel, stream, messages },
        headers: new Headers({
          accept: stream ? "text/event-stream" : "application/json",
          "user-agent": userAgent,
        }),
      },
      userAgent,
    });
    assert.equal(result.success, true, JSON.stringify(result).slice(0, 300));
    const text = await result.response.text();
    return [...text.matchAll(/"model":"([^"]+)"/g)].map((m) => m[1]);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.after(() => {
  try {
    core.getDbInstance().close();
  } catch {}
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("echo returns the client-requested model, not the rewritten leaf (non-streaming)", async () => {
  const models = await invoke({ stream: false });
  assert.deepEqual([...new Set(models)], [CLIENT_MODEL]);
});

test("echo returns the client-requested model, not the rewritten leaf (streaming)", async () => {
  const models = await invoke({ stream: true });
  assert.ok(models.length > 0);
  assert.deepEqual([...new Set(models)], [CLIENT_MODEL]);
});

test("echo off: response model is not rewritten to the client name", async () => {
  const models = await invoke({ stream: false, echoSetting: false });
  assert.ok(!models.includes(CLIENT_MODEL), JSON.stringify(models));
});
