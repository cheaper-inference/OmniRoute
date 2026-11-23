// OpenAI -> Claude must honor an explicit client output cap even when tools are
// present. Clients that keep Anthropic's prompt cache warm re-send the last request
// with a 1-token cap; the tool floor (DEFAULT_MIN_TOKENS) used to inflate it to 32000,
// so every "warm" request generated thousands of output tokens.
// The other translators (claude/gemini/antigravity -> openai) keep the tool floor.
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");
const { claudeToOpenAIRequest } =
  await import("../../open-sse/translator/request/claude-to-openai.ts");
const { DEFAULT_MAX_TOKENS, DEFAULT_MIN_TOKENS } =
  await import("../../open-sse/config/constants.ts");

const tools = [
  { type: "function", function: { name: "f", parameters: { type: "object", properties: {} } } },
];
const messages = [{ role: "user", content: "hi" }];

function toClaude(extra: Record<string, unknown>) {
  return openaiToClaudeRequest("claude-sonnet-4-5", { messages, tools, ...extra }, false);
}

test("openai->claude honors an explicit max_tokens=1 cap with tools", () => {
  assert.equal(toClaude({ max_tokens: 1 }).max_tokens, 1);
});

test("openai->claude honors an explicit max_completion_tokens=1 cap with tools", () => {
  assert.equal(toClaude({ max_completion_tokens: 1 }).max_tokens, 1);
});

test("openai->claude honors a small explicit cap (4096) with tools", () => {
  assert.equal(toClaude({ max_tokens: 4096 }).max_tokens, 4096);
});

test("openai->claude without an explicit cap still defaults to DEFAULT_MAX_TOKENS", () => {
  assert.equal(toClaude({}).max_tokens, DEFAULT_MAX_TOKENS);
});

test("openai->claude keeps max_tokens > budget_tokens when thinking is enabled with cap 1", () => {
  const result = toClaude({
    max_tokens: 1,
    thinking: { type: "enabled", budget_tokens: 2048 },
  });
  const thinking = result.thinking as { budget_tokens?: number } | undefined;
  assert.ok(thinking, "thinking must be preserved");
  assert.ok(
    Number(result.max_tokens) > Number(thinking.budget_tokens),
    `max_tokens (${result.max_tokens}) must exceed budget_tokens (${thinking.budget_tokens})`
  );
});

test("claude->openai keeps the tool floor for a small cap", () => {
  const claudeTools = [{ name: "f", input_schema: { type: "object", properties: {} } }];
  const out = claudeToOpenAIRequest(
    "gpt-x",
    { messages, tools: claudeTools, max_tokens: 4096 },
    false
  );
  assert.equal(out.max_tokens, DEFAULT_MIN_TOKENS);
});
