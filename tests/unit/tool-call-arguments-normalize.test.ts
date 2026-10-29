import test from "node:test";
import assert from "node:assert/strict";

// Strict OpenAI-compatible upstreams require every replayed assistant tool call to
// carry `function.arguments` as a valid JSON string. Clients replay zero-argument
// calls with the field missing / null / "" ("missing required field arguments"),
// and Codex replays raw streamed fragments ('{"city":', freeform text) that are
// rejected with HTTP 400 "function.arguments must be valid JSON".

const { ensureToolCallIds } = await import("../../open-sse/translator/helpers/toolCallHelper.ts");
const { coerceToolCallArguments } =
  await import("../../open-sse/translator/helpers/toolArguments.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");

type ToolFn = { name: string; arguments?: unknown };

function normalizeArgs(value: unknown, includeArguments = true): unknown {
  const fn: ToolFn = { name: "probe_tool" };
  if (includeArguments) fn.arguments = value;
  const body = {
    messages: [
      { role: "assistant", tool_calls: [{ id: "call_probe", type: "function", function: fn }] },
    ],
  };
  ensureToolCallIds(body);
  return body.messages[0].tool_calls[0].function.arguments;
}

test("coerceToolCallArguments: nullish / empty / invalid JSON → '{}'", () => {
  for (const value of [undefined, null, "", "   ", '{"city":', "San Francisco"]) {
    assert.equal(coerceToolCallArguments(value), "{}", JSON.stringify(value));
  }
});

test("coerceToolCallArguments: valid JSON string preserved byte-for-byte", () => {
  for (const value of ['{"key":"val"}', '{ "spaced" : 1 }', "{}", "[1,2]"]) {
    assert.equal(coerceToolCallArguments(value), value);
  }
});

test("coerceToolCallArguments: objects are serialized once; unserializable → '{}'", () => {
  assert.equal(coerceToolCallArguments({ city: "SF" }), '{"city":"SF"}');
  const circular: Record<string, unknown> = {};
  circular.self = circular;
  assert.equal(coerceToolCallArguments(circular), "{}");
  assert.equal(coerceToolCallArguments(BigInt(1)), "{}");
});

test("ensureToolCallIds: missing / undefined / null / empty arguments → '{}'", () => {
  assert.equal(normalizeArgs(undefined, false), "{}");
  assert.equal(normalizeArgs(undefined), "{}");
  assert.equal(normalizeArgs(null), "{}");
  assert.equal(normalizeArgs(""), "{}");
});

test("ensureToolCallIds: malformed / freeform argument strings → '{}'", () => {
  assert.equal(normalizeArgs('{"city":'), "{}");
  assert.equal(normalizeArgs("San Francisco"), "{}");
});

test("ensureToolCallIds: valid string preserved, object serialized", () => {
  assert.equal(normalizeArgs('{"query":"omni"}'), '{"query":"omni"}');
  assert.equal(normalizeArgs({ query: "omni" }), '{"query":"omni"}');
});

test("ensureToolCallIds: does not fabricate a missing function object", () => {
  const body = {
    messages: [{ role: "assistant", tool_calls: [{ id: "call_probe", type: "function" }] }],
  };
  ensureToolCallIds(body);
  assert.equal((body.messages[0].tool_calls[0] as { function?: unknown }).function, undefined);
});

function responsesInput(args: unknown) {
  return {
    model: "gpt-4o",
    input: [
      { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
      { type: "function_call", call_id: "call_abc", name: "get_weather", arguments: args },
      { type: "function_call_output", call_id: "call_abc", output: "sunny" },
    ],
  };
}

function translatedToolArgs(args: unknown): unknown {
  const result = translateRequest(
    "openai-responses",
    "openai",
    "gpt-4o",
    responsesInput(args),
    false,
    {},
    "openai"
  ) as { messages: Array<{ tool_calls?: Array<{ function: { arguments: unknown } }> }> };
  const assistant = result.messages.find((m) => Array.isArray(m.tool_calls));
  assert.ok(assistant, "assistant tool call message present");
  return assistant.tool_calls[0].function.arguments;
}

test("Responses→Chat: malformed / empty function_call arguments coerced to '{}'", () => {
  assert.equal(translatedToolArgs('{"city":'), "{}");
  assert.equal(translatedToolArgs(""), "{}");
});

test("Responses→Chat: valid JSON preserved, object serialized", () => {
  assert.equal(translatedToolArgs('{"city":"NYC"}'), '{"city":"NYC"}');
  assert.equal(translatedToolArgs({ city: "SF" }), '{"city":"SF"}');
});

function chatBody(args: unknown, extra: Record<string, unknown> = {}) {
  return {
    model: "gpt-4o",
    messages: [
      { role: "user", content: "hi" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "call_abc", type: "function", function: { name: "get_weather", arguments: args } },
        ],
        ...extra,
      },
      { role: "tool", tool_call_id: "call_abc", content: "sunny" },
    ],
  };
}

function responsesFunctionCalls(body: unknown): Array<{ arguments: unknown }> {
  const result = translateRequest(
    "openai",
    "openai-responses",
    "gpt-4o",
    body,
    false,
    {},
    "openai"
  ) as { input: Array<{ type: string; arguments?: unknown }> };
  return result.input.filter((item) => item.type === "function_call");
}

test("Chat→Responses: empty tool-call arguments become '{}'", () => {
  const calls = responsesFunctionCalls(chatBody(""));
  assert.equal(calls.length, 1);
  assert.equal(calls[0].arguments, "{}");
});

test("Chat→Responses: valid tool-call arguments preserved", () => {
  const calls = responsesFunctionCalls(chatBody('{"city":"NYC"}'));
  assert.equal(calls[0].arguments, '{"city":"NYC"}');
});

test("Chat→Responses: deprecated function_call with object arguments is serialized", () => {
  const body = {
    model: "gpt-4o",
    messages: [
      { role: "user", content: "hi" },
      {
        role: "assistant",
        content: null,
        function_call: { name: "get_weather", arguments: { city: "SF" } },
      },
    ],
  };
  const calls = responsesFunctionCalls(body);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].arguments, '{"city":"SF"}');
});
