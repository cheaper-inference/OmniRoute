import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");

const user = [{ role: "user", content: "hi" }];

// thinking { type: "enabled" } is the DeepSeek / GLM / Kimi OpenAI-compat shape. Anthropic
// answers 400 "thinking.enabled.budget_tokens: Field required" when the budget is missing.
test("thinking enabled without a budget gets a positive budget_tokens", () => {
  const result = openaiToClaudeRequest(
    "claude-sonnet-4-5",
    { messages: user, thinking: { type: "enabled" } },
    false
  );
  const thinking = result.thinking as Record<string, unknown> | undefined;
  assert.equal(thinking?.type, "enabled");
  assert.equal(typeof thinking?.budget_tokens, "number");
  assert.ok((thinking?.budget_tokens as number) >= 1024);
  assert.ok(result.max_tokens > (thinking?.budget_tokens as number), "max_tokens leaves room");
});

test("thinking enabled with budget_tokens 0 gets a positive budget_tokens", () => {
  const result = openaiToClaudeRequest(
    "claude-sonnet-4-5",
    { messages: user, thinking: { type: "enabled", budget_tokens: 0 } },
    false
  );
  assert.ok(((result.thinking as Record<string, number>)?.budget_tokens ?? 0) >= 1024);
});

test("guard: an explicit budget_tokens is kept", () => {
  const result = openaiToClaudeRequest(
    "claude-sonnet-4-5",
    { messages: user, thinking: { type: "enabled", budget_tokens: 4096 }, max_tokens: 20000 },
    false
  );
  assert.equal((result.thinking as Record<string, number>).budget_tokens, 4096);
});

// Anthropic rejects an empty text block (400 "text content blocks must be non-empty").
test("an empty system message does not produce an empty system text block", () => {
  const result = openaiToClaudeRequest(
    "claude-sonnet-4-5",
    { messages: [{ role: "system", content: "" }, ...user] },
    false
  );
  assert.equal(result.system, undefined);
});

test("empty system parts are dropped, the others are kept", () => {
  const result = openaiToClaudeRequest(
    "claude-sonnet-4-5",
    {
      messages: [
        { role: "system", content: "" },
        { role: "system", content: "Be brief." },
        ...user,
      ],
    },
    false
  );
  const text = (result.system as Array<{ text: string }>).map((b) => b.text).join("|");
  assert.equal(text, "Be brief.");
});

// The name-based temperature drop exists for Claude OAuth, where the beta header forces
// thinking. Any other provider keeps the client's value when thinking is off.
test("temperature is kept for a non-OAuth provider on a claude-sonnet-4 model", () => {
  const result = openaiToClaudeRequest(
    "claude-sonnet-4-5",
    { messages: user, temperature: 0.2 },
    false,
    { _provider: "anthropic-compatible-x" }
  );
  assert.equal(result.temperature, 0.2);
});

test("temperature is kept when thinking is explicitly disabled", () => {
  const result = openaiToClaudeRequest(
    "claude-haiku-5-20251001",
    { messages: user, temperature: 0.2, thinking: { type: "disabled" } },
    false
  );
  assert.equal(result.temperature, 0.2);
});

test("guard: temperature is still dropped for the claude OAuth provider on a sonnet-4 model", () => {
  const result = openaiToClaudeRequest(
    "claude-sonnet-4-5",
    { messages: user, temperature: 0.2 },
    false,
    { _provider: "claude" }
  );
  assert.equal(result.temperature, undefined);
});
