import test from "node:test";
import assert from "node:assert/strict";

import { BedrockExecutor, openAIToBedrockConverse } from "../../open-sse/executors/bedrock.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import {
  providerHonorsOpenAIFormatCacheControl,
  providerSupportsCaching,
} from "../../open-sse/utils/cacheControlPolicy.ts";
import { claudeModelSupportsThinking } from "../../open-sse/translator/request/openai-to-claude/thinkingConfig.ts";

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

const FORCED_TOOL = {
  tools: [{ type: "function", function: { name: "lookup", parameters: { type: "object" } } }],
};

test("a forced tool_choice sends no thinking, as Claude rejects the combination", () => {
  for (const tool_choice of ["required", { type: "function", function: { name: "lookup" } }]) {
    const payload = openAIToBedrockConverse(CLAUDE, {
      ...FORCED_TOOL,
      messages: [{ role: "user", content: "hi" }],
      reasoning_effort: "low",
      max_tokens: 2000,
      temperature: 0.2,
      tool_choice,
    });
    assert.equal(payload.additionalModelRequestFields, undefined);
    assert.deepEqual(payload.inferenceConfig, { maxTokens: 2000, temperature: 0.2 });
  }

  const auto = openAIToBedrockConverse(CLAUDE, {
    ...FORCED_TOOL,
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "low",
    tool_choice: "auto",
  });
  assert.equal(auto.additionalModelRequestFields?.thinking?.type, "enabled");
});

test("thinking drops top_p with temperature, and only thinking does", () => {
  const body = {
    messages: [{ role: "user", content: "hi" }],
    max_tokens: 2000,
    top_p: 0.9,
  };
  const thinking = openAIToBedrockConverse(CLAUDE, { ...body, reasoning_effort: "low" });
  assert.equal(thinking.inferenceConfig?.topP, undefined);

  const plain = openAIToBedrockConverse(CLAUDE, body);
  assert.equal(plain.inferenceConfig?.topP, 0.9);
});

const TOOL_LOOP = [
  { role: "user", content: "hi" },
  {
    role: "assistant",
    content: "",
    tool_calls: [{ id: "call_1", type: "function", function: { name: "lookup", arguments: "{}" } }],
  },
  { role: "tool", tool_call_id: "call_1", content: "result" },
];

test("manual thinking is left out while a tool loop is in progress", () => {
  // Claude wants a signed thinking block before the tool_use of the turn in progress,
  // and a Converse request has none to send back.
  const loop = openAIToBedrockConverse(CLAUDE, {
    messages: TOOL_LOOP,
    reasoning_effort: "low",
    max_tokens: 2000,
    temperature: 0.2,
  });
  assert.equal(loop.additionalModelRequestFields, undefined);
  assert.deepEqual(loop.inferenceConfig, { maxTokens: 2000, temperature: 0.2 });

  const nextTurn = openAIToBedrockConverse(CLAUDE, {
    messages: [
      ...TOOL_LOOP,
      { role: "assistant", content: "done" },
      { role: "user", content: "and now?" },
    ],
    reasoning_effort: "low",
  });
  assert.equal(nextTurn.additionalModelRequestFields?.thinking?.type, "enabled");
});

test("adaptive thinking stays on during a tool loop", () => {
  const payload = openAIToBedrockConverse(ADAPTIVE_CLAUDE, {
    messages: TOOL_LOOP,
    reasoning_effort: "high",
  });
  assert.equal(payload.additionalModelRequestFields?.thinking?.type, "adaptive");
});

test("the thinking budget fits the output cap of a versioned Bedrock id", () => {
  const payload = openAIToBedrockConverse(CLAUDE, {
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "high",
    max_tokens: 1000,
  });
  assert.equal(payload.inferenceConfig?.maxTokens, 64000);
  assert.ok(Number(payload.additionalModelRequestFields?.thinking?.budget_tokens) < 64000);
});

test("a versioned id of an adaptive-only Claude gets adaptive thinking", () => {
  const payload = openAIToBedrockConverse("global.anthropic.claude-opus-4-7-v1:0", {
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "max",
  });
  assert.deepEqual(payload.additionalModelRequestFields, {
    thinking: { type: "adaptive", display: "summarized" },
    output_config: { effort: "max" },
  });
});

test("a Claude without known thinking support keeps the request as it was", () => {
  const payload = openAIToBedrockConverse("anthropic.claude-3-haiku-20240307-v1:0", {
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "high",
    max_tokens: 1000,
    temperature: 0.2,
  });
  assert.equal(payload.additionalModelRequestFields, undefined);
  assert.deepEqual(payload.inferenceConfig, { maxTokens: 1000, temperature: 0.2 });
});

test("a raw additionalModelRequestFields leaves the sampling config alone", () => {
  const payload = openAIToBedrockConverse(CLAUDE, {
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "high",
    max_tokens: 1000,
    temperature: 0.2,
    top_p: 0.9,
    additionalModelRequestFields: { top_k: 5 },
  });
  assert.deepEqual(payload.additionalModelRequestFields, { top_k: 5 });
  assert.deepEqual(payload.inferenceConfig, { maxTokens: 1000, temperature: 0.2, topP: 0.9 });
});

test("claudeModelSupportsThinking reads the model spec capability", () => {
  assert.equal(claudeModelSupportsThinking("claude-sonnet-4-5"), true);
  assert.equal(claudeModelSupportsThinking("gemini-3-flash"), false);
  assert.equal(claudeModelSupportsThinking("not-a-real-model-spec"), false);
});
