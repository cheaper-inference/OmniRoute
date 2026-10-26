/**
 * xaiCompletedToClaudeJson hands an Anthropic-format client the tool-name
 * casing IT declared (#17118 follow-up to #17119).
 *
 * Before: every function_call name went through restoreClaudeToolName(),
 * which upgrades known Claude Code tools to PascalCase (`read` → `Read`) on
 * the assumption that the client is Claude Code. An OpenCode-style client that
 * declared `read` then got `Read` back and failed dispatch client-side.
 *
 * Runner: node --import tsx/esm --test tests/unit/xai-claude-declared-tool-casing.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";

const { xaiCompletedToClaudeJson } =
  await import("../../src/lib/providers/xai/translators/claude.ts");

type Rec = Record<string, unknown>;

function completedWithCall(name: string) {
  return {
    id: "r1",
    model: "grok-4",
    output: [{ type: "function_call", call_id: "c1", name, arguments: "{}" }],
  };
}

function toolUseName(completed: object, origReq: object | null): string {
  const result = xaiCompletedToClaudeJson(completed, origReq as never) as Rec;
  const content = result.content as Rec[];
  assert.equal(content[0].type, "tool_use");
  return content[0].name as string;
}

const openCodeReq = {
  model: "grok-4",
  max_tokens: 100,
  messages: [],
  tools: [{ name: "read", description: "Read a file", input_schema: { type: "object" } }],
};

const claudeCodeReq = {
  ...openCodeReq,
  tools: [{ name: "Read", description: "Read a file", input_schema: { type: "object" } }],
};

test("OpenCode declared `read`: an xAI `read` echo stays `read`", () => {
  assert.equal(toolUseName(completedWithCall("read"), openCodeReq), "read");
});

test("OpenCode declared `read`: an xAI `Read` echo comes back as `read`", () => {
  assert.equal(toolUseName(completedWithCall("Read"), openCodeReq), "read");
});

test("Claude Code declared `Read`: a downcased xAI `read` comes back as `Read`", () => {
  assert.equal(toolUseName(completedWithCall("read"), claudeCodeReq), "Read");
});

test("a name the client never declared keeps the legacy canonical upgrade", () => {
  assert.equal(toolUseName(completedWithCall("bash"), openCodeReq), "Bash");
});

test("no original request (legacy caller): behaviour unchanged, `read` → `Read`", () => {
  assert.equal(toolUseName(completedWithCall("read"), null), "Read");
  assert.equal(toolUseName(completedWithCall("lookup"), null), "lookup");
});
