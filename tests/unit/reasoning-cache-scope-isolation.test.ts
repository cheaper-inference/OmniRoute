// Reasoning stored for a tool call belongs to the API key and session that produced it. Clients
// can use deterministic ids such as `call_0`, so the id alone must not select a cache entry.
import { after, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-reasoning-scope-"));
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "reasoning-scope-test-secret";

const reasoningCache = await import("../../open-sse/services/reasoningCache.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { prepareClaudeRequest } = await import("../../open-sse/translator/helpers/claudeHelper.ts");
const { clearModelsDevCapabilities, saveModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const SCOPE_A = "api-key:a\x1fsession-1";
const SCOPE_B = "api-key:b\x1fsession-1";
const SECRET = "reasoning that belongs to the first caller";
const PROVIDER = "deepseek";
const MODEL = "deepseek-v4-pro";

function storeFor(scope: string, id = "call_0") {
  return reasoningCache.cacheReasoningFromAssistantMessage(
    { role: "assistant", reasoning_content: SECRET, tool_calls: [{ id }] },
    PROVIDER,
    MODEL,
    { scope, historyMessages: [{ role: "user", content: "hi" }] }
  );
}

function replayToOpenAi(assistant: Record<string, unknown>, scope: string) {
  const translated = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI,
    MODEL,
    {
      messages: [
        { role: "user", content: "hi" },
        { role: "assistant", ...assistant },
        { role: "tool", tool_call_id: "call_0", content: "ok" },
      ],
    },
    false,
    null,
    PROVIDER,
    null,
    { reasoningCacheScope: scope }
  ) as { messages: Array<Record<string, unknown>> };
  return translated.messages.find((message) => message.role === "assistant");
}

const openAiToolCall = {
  content: "",
  tool_calls: [{ id: "call_0", type: "function", function: { name: "ls", arguments: "{}" } }],
};

function replayToClaude(scope: string) {
  const prepared = prepareClaudeRequest(
    {
      thinking: { type: "enabled", budget_tokens: 4096 },
      messages: [
        { role: "user", content: [{ type: "text", text: "hi" }] },
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "call_0", name: "ls", input: {} }],
        },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: "call_0", content: "ok" }],
        },
      ],
    } as never,
    "glm",
    false,
    null,
    { reasoningCacheScope: scope } as never
  ) as unknown as { messages: Array<{ content: Array<{ type: string; thinking?: string }> }> };
  return prepared.messages[1].content.find((block) => block.type === "thinking")?.thinking;
}

beforeEach(() => {
  reasoningCache.clearReasoningCacheAll();
  clearModelsDevCapabilities();
  saveModelsDevCapabilities({
    [PROVIDER]: {
      [MODEL]: {
        tool_call: true,
        reasoning: true,
        attachment: null,
        structured_output: null,
        temperature: null,
        modalities_input: "[]",
        modalities_output: "[]",
        knowledge_cutoff: null,
        release_date: null,
        interleaved_field: "reasoning_content",
      },
    },
  } as never);
});

after(() => {
  resetDbInstance();
});

test("another scope does not receive reasoning stored for the same tool call id", () => {
  assert.equal(storeFor(SCOPE_A), 1);
  assert.notEqual(replayToOpenAi(openAiToolCall, SCOPE_B)?.reasoning_content, SECRET);
});

test("the scope that stored the reasoning still replays it", () => {
  storeFor(SCOPE_A);
  assert.equal(replayToOpenAi(openAiToolCall, SCOPE_A)?.reasoning_content, SECRET);
});

test("the same id in two scopes keeps two separate entries", () => {
  storeFor(SCOPE_A);
  reasoningCache.cacheReasoningFromAssistantMessage(
    { role: "assistant", reasoning_content: "second caller", tool_calls: [{ id: "call_0" }] },
    PROVIDER,
    MODEL,
    { scope: SCOPE_B, historyMessages: [{ role: "user", content: "hi" }] }
  );
  assert.equal(replayToOpenAi(openAiToolCall, SCOPE_A)?.reasoning_content, SECRET);
  assert.equal(replayToOpenAi(openAiToolCall, SCOPE_B)?.reasoning_content, "second caller");
});

test("tool_use blocks reaching the translator follow the same scope", () => {
  storeFor(SCOPE_A);
  const replayedThinking = (scope: string) => {
    const translated = translateRequest(
      FORMATS.CLAUDE,
      FORMATS.CLAUDE,
      MODEL,
      {
        messages: [
          { role: "user", content: [{ type: "text", text: "hi" }] },
          {
            role: "assistant",
            content: [{ type: "tool_use", id: "call_0", name: "ls", input: {} }],
          },
          {
            role: "user",
            content: [{ type: "tool_result", tool_use_id: "call_0", content: "ok" }],
          },
        ],
      },
      false,
      null,
      PROVIDER,
      null,
      { reasoningCacheScope: scope }
    ) as { messages: Array<{ content: Array<{ type: string; thinking?: string }> }> };
    return translated.messages[1].content.find((block) => block.type === "thinking")?.thinking;
  };
  assert.notEqual(replayedThinking(SCOPE_B), SECRET);
  assert.equal(replayedThinking(SCOPE_A), SECRET);
});

test("Claude-shape replay follows the same scope", () => {
  storeFor(SCOPE_A);
  assert.notEqual(replayToClaude(SCOPE_B), SECRET);
  assert.equal(replayToClaude(SCOPE_A), SECRET);
});

test("the request scope always names the API key, with or without a session", () => {
  const { buildReasoningCacheScope } = reasoningCache;
  assert.notEqual(buildReasoningCacheScope("a", null), buildReasoningCacheScope("b", null));
  assert.notEqual(buildReasoningCacheScope("a", "s1"), buildReasoningCacheScope("b", "s1"));
  assert.notEqual(buildReasoningCacheScope("a", "s1"), buildReasoningCacheScope("a", "s2"));
  assert.equal(buildReasoningCacheScope("a", "s1"), "api-key:a\x1fs1");
  assert.equal(buildReasoningCacheScope(undefined, null), "api-key:local");
});

test("a caller without a scope keeps the plain tool call id", () => {
  reasoningCache.cacheReasoning("call_plain", PROVIDER, MODEL, SECRET);
  assert.equal(reasoningCache.lookupReasoning("call_plain"), SECRET);
});
