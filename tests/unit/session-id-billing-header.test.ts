/**
 * Claude Code puts a rotating `x-anthropic-billing-header: cc_version=...; cch=...` line in
 * system[0]. It changes on every turn, so the generated session id must not depend on it:
 * the id keys session affinity and prompt-cache routing.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { generateSessionId } = await import("../../open-sse/services/sessionManager.ts");

const BILLING_PREFIX = "x-anthropic-billing-header:";

function billing(version: string, cch: string): string {
  return `${BILLING_PREFIX} cc_version=${version}; cc_entrypoint=cli; cch=${cch};`;
}

function claudeBody(billingText: string | null, extra: Record<string, unknown> = {}) {
  const system: Array<Record<string, unknown>> = [];
  if (billingText !== null) system.push({ type: "text", text: billingText });
  system.push({ type: "text", text: "You are Claude Code.", cache_control: { type: "ephemeral" } });
  return {
    model: "claude-sonnet-4-5",
    system,
    messages: [{ role: "user", content: "fix the build" }],
    tools: [{ name: "Bash" }, { name: "Read" }],
    ...extra,
  };
}

test("two Claude turns that differ only in the billing block get the same session id", () => {
  const first = generateSessionId(claudeBody(billing("2.1.4.abc", "11111")));
  const second = generateSessionId(claudeBody(billing("2.1.4.def", "22222")));
  assert.ok(first);
  assert.equal(first, second);
});

test("the billing block does not change the id of an otherwise identical body", () => {
  assert.equal(
    generateSessionId(claudeBody(billing("2.1.4.abc", "11111"))),
    generateSessionId(claudeBody(null))
  );
});

test("a billing line at the start of a string system prompt is ignored", () => {
  const body = (line: string) => ({
    model: "claude-sonnet-4-5",
    system: `${line}\nYou are Claude Code.`,
    messages: [{ role: "user", content: "hi" }],
  });
  assert.equal(
    generateSessionId(body(billing("2.1.4.abc", "11111"))),
    generateSessionId(body(billing("2.1.4.def", "22222")))
  );
});

test("a billing line in an OpenAI-format system message is ignored", () => {
  const body = (line: string) => ({
    model: "gpt-4o",
    messages: [
      { role: "system", content: `${line}\nYou are Claude Code.` },
      { role: "user", content: "hi" },
    ],
  });
  assert.equal(
    generateSessionId(body(billing("2.1.4.abc", "11111"))),
    generateSessionId(body(billing("2.1.4.def", "22222")))
  );
});

test("only the billing line is ignored: a different system prompt still gets another id", () => {
  const a = claudeBody(billing("2.1.4.abc", "11111"));
  const b = claudeBody(billing("2.1.4.abc", "11111"));
  (b.system[1] as Record<string, unknown>).text = "You are a different agent.";
  assert.notEqual(generateSessionId(a), generateSessionId(b));
});

test("billing text that is not at the start of a system block is still part of the id", () => {
  const body = (tail: string) => ({
    model: "claude-sonnet-4-5",
    system: [{ type: "text", text: `Notes: ${BILLING_PREFIX} ${tail}` }],
    messages: [{ role: "user", content: "hi" }],
  });
  assert.notEqual(generateSessionId(body("one")), generateSessionId(body("two")));
});

test("computing the id leaves the request body unchanged", () => {
  const body = claudeBody(billing("2.1.4.abc", "11111"));
  const before = JSON.stringify(body);
  generateSessionId(body);
  assert.equal(JSON.stringify(body), before);
});
