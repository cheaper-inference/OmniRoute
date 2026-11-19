/**
 * A semantic-cache HIT replays the stored object verbatim. It must only be served when
 * that object is already in the wire format the client expects (protocol + stream flag).
 * Otherwise the lookup is a miss: a miss costs one upstream call, a wrong replay breaks
 * the client (wrong protocol, JSON to a stream client, chat frames to a Responses client).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cache-wire-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { checkSemanticCache } = await import("../../open-sse/handlers/chatCore/semanticCache.ts");
const { storeSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/semanticCacheStore.ts");
const { storeStreamingSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/streamingSemanticCacheStore.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const CHAT = "/v1/chat/completions";
const RESPONSES = "/v1/responses";
const MESSAGES = "/v1/messages";

function lookup(body: Record<string, unknown>, endpoint: string, stream: boolean) {
  return checkSemanticCache({
    semanticCacheEnabled: true,
    body,
    clientRawRequest: { headers: {}, endpoint },
    model: "gpt-4o",
    provider: "openai",
    stream,
    reqLogger: { logConvertedResponse: () => {} },
    effectiveServiceTier: undefined,
    pendingScope: { id: null, model: "gpt-4o", provider: "openai", connectionId: null },
    startTime: Date.now(),
    log: null,
    persistAttemptLogs: () => {},
    apiKeyId: "wire-key",
  } as never);
}

function store(body: Record<string, unknown>, translatedResponse: unknown) {
  storeSemanticCacheResponse({
    enabled: true,
    body,
    headers: {},
    translatedResponse,
    model: "gpt-4o",
    provider: "openai",
    apiKeyId: "wire-key",
    usage: { prompt_tokens: 1, completion_tokens: 1 },
  });
}

function storeStreamed(body: Record<string, unknown>, content: string) {
  storeStreamingSemanticCacheResponse({
    enabled: true,
    streamStatus: 200,
    streamResponseBody: {
      choices: [{ message: { role: "assistant", content }, finish_reason: "stop" }],
      usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      _streamed: true,
    },
    body,
    headers: {},
    model: "gpt-4o",
    provider: "openai",
    apiKeyId: "wire-key",
    streamUsage: { prompt_tokens: 1, completion_tokens: 1 },
  });
}

const chatCompletion = (content: string) => ({
  id: "chatcmpl-1",
  object: "chat.completion",
  created: 1,
  model: "gpt-4o",
  choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
  usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
});

test("a Responses object is not replayed as JSON to a stream:true Responses client", async () => {
  const body = { input: "wire probe 1", temperature: 0 };
  store(body, {
    id: "resp_1",
    object: "response",
    status: "completed",
    model: "gpt-4o",
    output: [
      { type: "message", role: "assistant", content: [{ type: "output_text", text: "pong" }] },
    ],
    usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
  });
  assert.equal(await lookup({ ...body, stream: true }, RESPONSES, true), null);
  const json = await lookup(body, RESPONSES, false);
  assert.equal(JSON.parse(await json!.response.text()).object, "response");
});

test("a chat.completion is not served to a /v1/responses caller with the same text", async () => {
  store(
    { messages: [{ role: "user", content: "wire probe 2" }], temperature: 0 },
    chatCompletion("hello-from-chat")
  );
  assert.equal(await lookup({ input: "wire probe 2", temperature: 0 }, RESPONSES, false), null);
});

test("a streamed entry served to a non-stream chat client is a complete chat.completion", async () => {
  const messages = [{ role: "user", content: "wire probe 3" }];
  storeStreamed({ messages, temperature: 0, stream: true }, "streamed answer");
  const hit = await lookup({ messages, temperature: 0 }, CHAT, false);
  assert.ok(hit, "expected a hit");
  const served = JSON.parse(await hit.response.text());
  for (const key of ["id", "object", "created", "model"]) assert.ok(key in served, key);
  assert.equal(served.object, "chat.completion");
  assert.equal(served.choices[0].message.content, "streamed answer");
});

test("a chat-shaped entry is not served to an Anthropic Messages client", async () => {
  const body = {
    system: "s",
    messages: [{ role: "user", content: [{ type: "text", text: "wire probe 4" }] }],
    temperature: 0,
    max_tokens: 10,
  };
  storeStreamed({ ...body, stream: true }, "hi");
  assert.equal(await lookup(body, MESSAGES, false), null);
  assert.equal(await lookup({ ...body, stream: true }, MESSAGES, true), null);
});

test("a chat-shaped entry is not replayed as chat chunks to a Responses stream client", async () => {
  const body = { input: [{ role: "user", content: "wire probe 5" }], temperature: 0, stream: true };
  storeStreamed(body, "hi");
  assert.equal(await lookup(body, RESPONSES, true), null);
});

test("matching formats still HIT: chat SSE replay and a Claude body for a Claude client", async () => {
  const messages = [{ role: "user", content: "wire probe 6" }];
  store({ messages, temperature: 0 }, chatCompletion("chat answer"));
  const sse = await lookup({ messages, temperature: 0, stream: true }, CHAT, true);
  assert.equal(sse?.response.headers.get("content-type"), "text/event-stream");
  assert.match(await sse!.response.text(), /chat answer/);

  const claudeBody = {
    system: "s",
    messages: [{ role: "user", content: "wire probe 7" }],
    temperature: 0,
    max_tokens: 10,
  };
  const claudeMessage = {
    id: "msg_1",
    type: "message",
    role: "assistant",
    model: "gpt-4o",
    content: [{ type: "text", text: "claude answer" }],
    stop_reason: "end_turn",
    usage: { input_tokens: 1, output_tokens: 1 },
  };
  store(claudeBody, claudeMessage);
  const hit = await lookup(claudeBody, MESSAGES, false);
  assert.equal(JSON.parse(await hit!.response.text()).type, "message");
});
