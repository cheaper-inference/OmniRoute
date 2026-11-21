// A message `content` that is one bare block object (not an array) must reach Claude as that
// block. The translator read it as "" for system turns and dropped it for user turns.
import test from "node:test";
import assert from "node:assert/strict";
import { openaiToClaudeRequest } from "../../open-sse/translator/request/openai-to-claude.ts";

const translate = (messages: unknown[]) =>
  openaiToClaudeRequest(
    "claude-sonnet-4-5",
    { model: "claude-sonnet-4-5", max_tokens: 64, stream: false, messages },
    false
  ) as {
    system?: Array<{ text?: string }>;
    messages: Array<{ content: Array<{ text?: string }> }>;
  };

test("a system message with one bare text block keeps its text", () => {
  const out = translate([
    { role: "system", content: { type: "text", text: "SYSTEM-BARE" } },
    { role: "user", content: "hi" },
  ]);
  assert.match(JSON.stringify(out.system), /SYSTEM-BARE/);
});

test("a user message with one bare text block keeps its text", () => {
  const out = translate([{ role: "user", content: { type: "text", text: "USER-BARE" } }]);
  assert.match(JSON.stringify(out.messages), /USER-BARE/);
});

test("array and string content are unchanged", () => {
  const out = translate([
    { role: "system", content: [{ type: "text", text: "SYS-ARR" }] },
    { role: "user", content: "USER-STR" },
  ]);
  assert.match(JSON.stringify(out.system), /SYS-ARR/);
  assert.match(JSON.stringify(out.messages), /USER-STR/);
});
