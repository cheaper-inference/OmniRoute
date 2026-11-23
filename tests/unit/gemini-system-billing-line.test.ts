// Claude Code puts a per-turn "x-anthropic-billing-header: ..." line at the start of its system
// prompt. An OpenAI-format client can forward it. It rotates every turn, so it breaks the prompt
// prefix cache, and it means nothing to Gemini or Antigravity. The translator must drop it.
import test from "node:test";
import assert from "node:assert/strict";
import {
  openaiToAntigravityRequest,
  openaiToGeminiRequest,
} from "../../open-sse/translator/request/openai-to-gemini.ts";

const LINE = "x-anthropic-billing-header: cc_version=2.1.300.a1b; cc_entrypoint=cli; cch=0f3a1;";
const SYSTEM = "You are a careful reviewer.";

const withSystem = (content: unknown) => ({
  messages: [
    { role: "system", content },
    { role: "user", content: "hi" },
  ],
});

test("Antigravity: the billing line is dropped from a string system message", () => {
  const out = openaiToAntigravityRequest(
    "gemini-3-pro",
    withSystem(`${LINE}\n${SYSTEM}`),
    false
  ) as Record<string, unknown>;
  const wire = JSON.stringify(out);
  assert.ok(!wire.includes("x-anthropic-billing-header"), "billing line must not be sent");
  assert.ok(wire.includes(SYSTEM), "the rest of the system text must be kept");
});

test("Gemini: the billing line is dropped from a system message in block form", () => {
  const out = openaiToGeminiRequest(
    "gemini-3-pro",
    withSystem([
      { type: "text", text: LINE },
      { type: "text", text: SYSTEM },
    ]),
    false
  );
  const wire = JSON.stringify(out);
  assert.ok(!wire.includes("x-anthropic-billing-header"), "billing line must not be sent");
  assert.ok(wire.includes(SYSTEM), "the rest of the system text must be kept");
});

test("a system message that is only the billing line leaves no empty system part", () => {
  const out = openaiToGeminiRequest("gemini-3-pro", withSystem(LINE), false) as {
    systemInstruction?: unknown;
  };
  assert.equal(out.systemInstruction, undefined);
});

test("a system message without the billing line is unchanged", () => {
  const out = openaiToGeminiRequest("gemini-3-pro", withSystem(SYSTEM), false) as {
    systemInstruction?: { parts: Array<{ text: string }> };
  };
  assert.equal(out.systemInstruction?.parts[0]?.text, SYSTEM);
});
