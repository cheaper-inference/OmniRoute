import test from "node:test";
import assert from "node:assert/strict";

import { BedrockExecutor, openAIToBedrockConverse } from "../../open-sse/executors/bedrock.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import {
  providerHonorsOpenAIFormatCacheControl,
  providerSupportsCaching,
} from "../../open-sse/utils/cacheControlPolicy.ts";

// Bedrock Converse caches a prompt prefix only when the request carries explicit
// `cachePoint` blocks, and takes Claude extended thinking in
// `additionalModelRequestFields`. These tests pin the request side of both.

const CLAUDE = "us.anthropic.claude-sonnet-4-5-20250929-v1:0";
const ADAPTIVE_CLAUDE = "us.anthropic.claude-sonnet-5-5";
const CACHE = { type: "ephemeral" };
const CACHE_POINT = { cachePoint: { type: "default" } };

function credentials() {
  return { apiKey: "bedrock-key", providerSpecificData: { region: "us-east-1" } };
}

async function captureConverseInput(model: string, body: Record<string, unknown>) {
  let input: Record<string, unknown> | null = null;
  const executor = new BedrockExecutor(() => ({
    send: async (command) => {
      input = (command as unknown as { input: Record<string, unknown> }).input;
      return {
        output: { message: { content: [{ text: "ok" }] } },
        stopReason: "end_turn",
        usage: { inputTokens: 1, outputTokens: 1, totalTokens: 2 },
      };
    },
  }));
  await executor.execute({ model, body, stream: false, credentials: credentials() });
  assert.ok(input, "Converse command was sent");
  return input as Record<string, unknown> & {
    messages: Array<{ role: string; content: Array<Record<string, unknown>> }>;
    system?: Array<Record<string, unknown>>;
    inferenceConfig?: Record<string, unknown>;
    additionalModelRequestFields?: Record<string, unknown>;
  };
}

function countCachePoints(payload: {
  messages: Array<{ content: Array<Record<string, unknown>> }>;
  system?: Array<Record<string, unknown>>;
}) {
  const system = (payload.system || []).filter((block) => "cachePoint" in block).length;
  const messages = payload.messages
    .flatMap((message) => message.content)
    .filter((block) => "cachePoint" in block).length;
  return system + messages;
}

test("cache_control on a user text part becomes a cachePoint right after that text", async () => {
  const input = await captureConverseInput(CLAUDE, {
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "long shared context", cache_control: CACHE },
          { type: "text", text: "question" },
        ],
      },
    ],
    max_tokens: 16,
  });
  assert.deepEqual(input.messages[0].content, [
    { text: "long shared context" },
    CACHE_POINT,
    { text: "question" },
  ]);
});

test("cache_control on assistant and system text parts becomes a cachePoint", () => {
  const payload = openAIToBedrockConverse(CLAUDE, {
    messages: [
      {
        role: "system",
        content: [{ type: "text", text: "You audit conversations.", cache_control: CACHE }],
      },
      { role: "user", content: "conversation" },
      { role: "assistant", content: [{ type: "text", text: "Read.", cache_control: CACHE }] },
      { role: "user", content: "rule" },
    ],
  });
  assert.deepEqual(payload.system, [{ text: "You audit conversations." }, CACHE_POINT]);
  assert.deepEqual(payload.messages[1].content, [{ text: "Read." }, CACHE_POINT]);
});

test("a 1h cache_control ttl is carried onto the cachePoint", () => {
  const payload = openAIToBedrockConverse(CLAUDE, {
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: "ctx", cache_control: { type: "ephemeral", ttl: "1h" } }],
      },
    ],
  });
  assert.deepEqual(payload.messages[0].content, [
    { text: "ctx" },
    { cachePoint: { type: "default", ttl: "1h" } },
  ]);
});

test("no cache_control gives no cachePoint", () => {
  const payload = openAIToBedrockConverse(CLAUDE, {
    messages: [
      { role: "system", content: [{ type: "text", text: "sys" }] },
      { role: "user", content: [{ type: "text", text: "hi" }] },
      { role: "assistant", content: "hello" },
      { role: "user", content: "again" },
    ],
  });
  assert.equal(countCachePoints(payload), 0);
});

test("models without Converse prompt caching never receive a cachePoint", () => {
  const payload = openAIToBedrockConverse("meta.llama3-1-70b-instruct-v1:0", {
    messages: [{ role: "user", content: [{ type: "text", text: "ctx", cache_control: CACHE }] }],
  });
  assert.equal(countCachePoints(payload), 0);
});

test("at most 4 cache points are sent; the latest ones are kept", () => {
  const marked = (text: string) => ({ type: "text", text, cache_control: CACHE });
  const payload = openAIToBedrockConverse(CLAUDE, {
    messages: [
      { role: "system", content: [marked("sys")] },
      { role: "user", content: [marked("u1")] },
      { role: "assistant", content: [marked("a1")] },
      { role: "user", content: [marked("u2")] },
      { role: "assistant", content: [marked("a2")] },
      { role: "user", content: [marked("u3")] },
    ],
  });
  assert.equal(countCachePoints(payload), 4);
  assert.deepEqual(payload.system, [{ text: "sys" }]);
  assert.deepEqual(payload.messages[0].content, [{ text: "u1" }]);
  assert.deepEqual(payload.messages[4].content, [{ text: "u3" }, CACHE_POINT]);
});

test("cache points survive merging consecutive same-role messages", () => {
  const payload = openAIToBedrockConverse(CLAUDE, {
    messages: [
      { role: "user", content: [{ type: "text", text: "context", cache_control: CACHE }] },
      { role: "user", content: [{ type: "text", text: "question" }] },
    ],
  });
  assert.equal(payload.messages.length, 1);
  assert.deepEqual(payload.messages[0].content, [
    { text: "context" },
    CACHE_POINT,
    { text: "question" },
  ]);
});

test("cache points survive the tool pairing sanitizer and never dangle", () => {
  const payload = openAIToBedrockConverse(CLAUDE, {
    messages: [
      { role: "user", content: [{ type: "text", text: "context", cache_control: CACHE }] },
      {
        role: "assistant",
        content: [
          { type: "text", text: "calling" },
          // Unanswered tool_use: the sanitizer drops it, and its cache point with it.
          { type: "tool_use", id: "toolu_orphan", name: "lookup", input: {}, cache_control: CACHE },
        ],
        tool_calls: [
          { id: "call_1", type: "function", function: { name: "lookup", arguments: "{}" } },
        ],
      },
      {
        role: "tool",
        tool_call_id: "call_1",
        content: [{ type: "text", text: "result", cache_control: CACHE }],
      },
    ],
  });
  assert.deepEqual(payload.messages[0].content, [{ text: "context" }, CACHE_POINT]);
  assert.deepEqual(
    payload.messages[1].content.map((block) => Object.keys(block)[0]),
    ["text", "toolUse"]
  );
  assert.deepEqual(
    payload.messages[2].content.map((block) => Object.keys(block)[0]),
    ["toolResult", "cachePoint"]
  );
  for (const message of payload.messages) {
    assert.notEqual(Object.keys(message.content[0])[0], "cachePoint");
  }
});

test("bedrock keeps client cache_control through the OpenAI-format translation", () => {
  assert.equal(providerSupportsCaching("bedrock", "openai"), true);
  assert.equal(providerHonorsOpenAIFormatCacheControl("bedrock"), true);
  const out = translateRequest(
    "openai",
    "openai",
    CLAUDE,
    {
      model: CLAUDE,
      messages: [{ role: "user", content: [{ type: "text", text: "ctx", cache_control: CACHE }] }],
    },
    false,
    null,
    "bedrock",
    null,
    { preserveCacheControl: true }
  );
  assert.deepEqual(out.messages[0].content[0].cache_control, CACHE);
});

test("reasoning_effort maps to Claude manual thinking for budgeted Claude models", async () => {
  const input = await captureConverseInput(CLAUDE, {
    messages: [{ role: "user", content: "think" }],
    reasoning_effort: "low",
    max_tokens: 2000,
    temperature: 0.2,
  });
  assert.deepEqual(input.additionalModelRequestFields, {
    thinking: { type: "enabled", budget_tokens: 1024 },
  });
  assert.ok(Number(input.inferenceConfig?.maxTokens) > 1024);
  // Claude rejects a non-default temperature while extended thinking is on.
  assert.equal(input.inferenceConfig?.temperature, undefined);
});

test("reasoning_effort maps to adaptive thinking plus effort on adaptive-only Claude", async () => {
  const input = await captureConverseInput(ADAPTIVE_CLAUDE, {
    messages: [{ role: "user", content: "think" }],
    reasoning_effort: "high",
    max_tokens: 4000,
  });
  assert.deepEqual(input.additionalModelRequestFields, {
    // Adaptive thinking omits the thinking text unless display is set, which would
    // leave reasoning_content empty for a client that asked for reasoning.
    thinking: { type: "adaptive", display: "summarized" },
    output_config: { effort: "high" },
  });
});

test("a Claude thinking block maps to additionalModelRequestFields", async () => {
  const manual = await captureConverseInput(CLAUDE, {
    messages: [{ role: "user", content: "think" }],
    thinking: { type: "enabled", budget_tokens: 2048 },
    max_tokens: 4000,
  });
  assert.deepEqual(manual.additionalModelRequestFields, {
    thinking: { type: "enabled", budget_tokens: 2048 },
  });

  const adaptive = await captureConverseInput(ADAPTIVE_CLAUDE, {
    messages: [{ role: "user", content: "think" }],
    thinking: { type: "enabled", budget_tokens: 2048 },
    max_tokens: 4000,
  });
  assert.deepEqual(adaptive.additionalModelRequestFields, {
    thinking: { type: "adaptive", display: "summarized" },
  });
});

test("no reasoning request and non-Claude models send no thinking fields", async () => {
  const plain = await captureConverseInput(CLAUDE, {
    messages: [{ role: "user", content: "hi" }],
    max_tokens: 16,
    temperature: 0.2,
  });
  assert.equal(plain.additionalModelRequestFields, undefined);
  assert.equal(plain.inferenceConfig?.temperature, 0.2);

  const nova = openAIToBedrockConverse("amazon.nova-pro-v1:0", {
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "high",
  });
  assert.equal(nova.additionalModelRequestFields, undefined);
});

test("a raw additionalModelRequestFields from the caller still wins", () => {
  const payload = openAIToBedrockConverse(CLAUDE, {
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "high",
    additionalModelRequestFields: { thinking: { type: "enabled", budget_tokens: 5000 } },
  });
  assert.deepEqual(payload.additionalModelRequestFields, {
    thinking: { type: "enabled", budget_tokens: 5000 },
  });
});
