import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #20092: post-tool continuations arm the flush empty-turn retry by default —
// a mute continuation reaching the client silently breaks an agentic loop
// (#13600). The probe cost only lands on turns already carrying submitted
// tool results; every other request keeps the flag-off behavior.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-post-tool-empty-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.DASHBOARD_PASSWORD = "";
process.env.INITIAL_PASSWORD = "";
delete process.env.JWT_SECRET;
if (!process.env.API_KEY_SECRET) {
  process.env.API_KEY_SECRET = `test-post-tool-empty-${Date.now()}`;
}
process.env.STREAM_READINESS_TIMEOUT_MS = "1000";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const { handleChat } = await import("../../src/sse/handlers/chat.ts");
const { initTranslators } = await import("../../open-sse/translator/index.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { requestFollowsToolCalls } = await import("../../open-sse/utils/emptyTurnRetry.ts");

const originalFetch = globalThis.fetch;

const FLAG = "FLUSH_EMPTY_RETRY_ENABLED";
const ORIGINAL_FLAG = process.env[FLAG];

function setFlag(enabled: boolean) {
  if (enabled) process.env[FLAG] = "true";
  else delete process.env[FLAG];
}

async function resetStorage() {
  clearInflight();
  await callLogs.waitForCallLogSaves(20_000);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  resetAllCircuitBreakers();
  initTranslators();
}

async function seedGroq(name: string, apiKey: string) {
  const row = (await providersDb.createProviderConnection({
    provider: "groq",
    authType: "apikey",
    name,
    apiKey,
    isActive: true,
    testStatus: "active",
  })) as { id: string };
  return { id: row.id, apiKey };
}

// Direct openai→openai turn that ends with no usable content: a finish frame
// and nothing else — the mute post-tool continuation shape.
function muteTurnStreamResponse(): Response {
  return new Response(
    `data: ${JSON.stringify({
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    })}\n\n` + `data: [DONE]\n\n`,
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

function contentStreamResponse(text: string): Response {
  return new Response(
    `data: ${JSON.stringify({
      choices: [{ index: 0, delta: { role: "assistant", content: text } }],
    })}\n\n` +
      `data: ${JSON.stringify({
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      })}\n\n` +
      `data: [DONE]\n\n`,
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

// A post-tool continuation: the client resubmits the conversation with the
// tool result appended after the assistant's tool_calls turn.
function postToolStreamRequest() {
  const nonce = `post-tool-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
    body: JSON.stringify({
      model: "groq/openai/gpt-oss-20b",
      messages: [
        { role: "user", content: `What is the weather? ${nonce}` },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "get_weather", arguments: "{}" },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: "sunny" },
      ],
      max_tokens: 64,
      stream: true,
      temperature: 0,
    }),
  });
}

function stubFetch(dispatches: string[], handler: (auth: string, callIndex: number) => Response) {
  globalThis.fetch = (async (_url: unknown, init: { headers?: unknown }) => {
    const headers = new Headers((init?.headers ?? {}) as HeadersInit);
    const auth = headers.get("authorization") ?? "";
    const callIndex = dispatches.length;
    dispatches.push(auth);
    return handler(auth, callIndex);
  }) as typeof fetch;
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  setFlag(false);
  await resetStorage();
});

test.afterEach(async () => {
  await new Promise((r) => setTimeout(r, 50));
  globalThis.fetch = originalFetch;
  if (ORIGINAL_FLAG === undefined) delete process.env[FLAG];
  else process.env[FLAG] = ORIGINAL_FLAG;
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  await callLogs.closeCallLogSaves();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("requestFollowsToolCalls detects tool results across client formats", () => {
  assert.equal(requestFollowsToolCalls(null), false);
  assert.equal(requestFollowsToolCalls({}), false);
  assert.equal(requestFollowsToolCalls({ messages: [{ role: "user", content: "hi" }] }), false);
  assert.equal(
    requestFollowsToolCalls({
      messages: [
        { role: "assistant", content: null, tool_calls: [{ id: "c1" }] },
        { role: "user", content: "not a result" },
      ],
    }),
    false,
    "issued tool_calls without submitted results is not a post-tool turn"
  );
  // OpenAI: role tool (and legacy function)
  assert.equal(requestFollowsToolCalls({ messages: [{ role: "tool", content: "x" }] }), true);
  assert.equal(
    requestFollowsToolCalls({ messages: [{ role: "function", name: "f", content: "x" }] }),
    true
  );
  // Claude: tool_result content block
  assert.equal(
    requestFollowsToolCalls({
      messages: [{ role: "user", content: [{ type: "tool_result", tool_use_id: "u1" }] }],
    }),
    true
  );
  // Responses: function_call_output input item
  assert.equal(
    requestFollowsToolCalls({ input: [{ type: "function_call_output", call_id: "c1" }] }),
    true
  );
  // Gemini: functionResponse part
  assert.equal(
    requestFollowsToolCalls({
      contents: [{ role: "user", parts: [{ functionResponse: { name: "f" } }] }],
    }),
    true
  );
});

test("flag off: a post-tool continuation still retries a mute turn", async () => {
  await seedGroq("post-tool-a", "sk-post-tool-a");
  await seedGroq("post-tool-b", "sk-post-tool-b");
  const dispatches: string[] = [];
  stubFetch(dispatches, (_auth, callIndex) =>
    callIndex === 0 ? muteTurnStreamResponse() : contentStreamResponse("served-after-retry")
  );
  const response = await handleChat(postToolStreamRequest());
  const bodyText = await response.text().catch(() => "");
  assert.equal(
    dispatches.length,
    2,
    `post-tool continuation must retry the mute turn, got ${dispatches.length}`
  );
  assert.match(bodyText, /served-after-retry/, "client must receive the retry content");
});
