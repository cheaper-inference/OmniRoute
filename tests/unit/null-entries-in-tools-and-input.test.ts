import test from "node:test";
import assert from "node:assert/strict";

const { generateSessionId } = await import("../../open-sse/services/sessionManager.ts");
const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");

// `tools` and `input` are `z.array(z.unknown())` in the request schema, so a `null` entry reaches
// the session fingerprint and the OpenAI→Claude tool conversion. #13755 already made
// `messages: [null]` answer 400; these two readers dereference the entry without a guard and the
// request ends as a 500.

const MESSAGES = [{ role: "user", content: "hi" }];

test("generateSessionId ignores a null entry in tools", () => {
  const withNull = generateSessionId({
    model: "m",
    messages: MESSAGES,
    tools: [null, { function: { name: "read_file" } }],
  } as never);
  const without = generateSessionId({
    model: "m",
    messages: MESSAGES,
    tools: [{ function: { name: "read_file" } }],
  } as never);
  assert.equal(typeof withNull, "string");
  assert.equal(withNull, without);
});

test("generateSessionId ignores a null entry in input and in messages", () => {
  const fromInput = generateSessionId({
    model: "m",
    input: [null, { role: "user", content: "hi" }],
  } as never);
  const clean = generateSessionId({
    model: "m",
    input: [{ role: "user", content: "hi" }],
  } as never);
  assert.equal(typeof fromInput, "string");
  assert.equal(fromInput, clean);

  const fromMessages = generateSessionId({
    model: "m",
    messages: [null, { role: "system", content: "s" }, { role: "user", content: "hi" }],
  } as never);
  assert.equal(typeof fromMessages, "string");
});

test("OpenAI to Claude drops a null entry in tools and keeps the valid tool", () => {
  const out = openaiToClaudeRequest(
    "claude-sonnet-4-5",
    {
      messages: MESSAGES,
      tools: [
        null,
        {
          type: "function",
          function: { name: "read_file", parameters: { type: "object", properties: {} } },
        },
      ],
    },
    false
  ) as { tools?: Array<{ name: string }> };
  // The Claude OAuth path prefixes tool names, so match the suffix.
  assert.equal(out.tools?.length, 1);
  assert.match(out.tools?.[0]?.name ?? "", /read_file$/);
});
