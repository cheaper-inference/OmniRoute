import test from "node:test";
import assert from "node:assert/strict";

// Responses → Chat translation of tool outputs that cannot be matched by id:
//   1. `function_call_output` / `custom_tool_call_output` WITHOUT `call_id` that follows a
//      pending call → paired with that call (oldest first) instead of being replaced by an
//      empty synthetic result.
//   2. Stateless continuations (`previous_response_id` + only `*_output` items) → the
//      originating call lives server-side, so the output is kept as labelled user context
//      instead of being dropped silently. An output with an EMPTY id stays dropped (#2893).

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");

type Msg = Record<string, unknown>;

function translate(input: Msg[], extra: Msg = {}): Msg[] {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    { model: "gpt-4o", input, ...extra },
    false,
    null
  ) as { messages: Msg[] };
  return result.messages;
}

const user = { type: "message", role: "user", content: [{ type: "input_text", text: "go" }] };

function call(id: string, name = "lookup") {
  return { type: "function_call", call_id: id, name, arguments: "{}" };
}

function toolMessages(messages: Msg[]): Array<[unknown, unknown]> {
  return messages.filter((m) => m.role === "tool").map((m) => [m.tool_call_id, m.content]);
}

function allText(messages: Msg[]): string {
  return JSON.stringify(messages);
}

test("id-less function_call_output pairs with the pending call", () => {
  const messages = translate([
    user,
    call("call_abc"),
    { type: "function_call_output", output: "ok" },
  ]);
  assert.deepEqual(toolMessages(messages), [["call_abc", "ok"]]);
});

test("two parallel calls + two id-less outputs pair in order", () => {
  const messages = translate([
    user,
    call("call_1"),
    call("call_2"),
    { type: "function_call_output", output: "first" },
    { type: "function_call_output", output: "second" },
  ]);
  assert.deepEqual(toolMessages(messages), [
    ["call_1", "first"],
    ["call_2", "second"],
  ]);
});

test("explicit call_id wins and id-less output takes the remaining call", () => {
  const messages = translate([
    user,
    call("call_1"),
    call("call_2"),
    { type: "function_call_output", call_id: "call_2", output: "second" },
    { type: "function_call_output", output: "first" },
  ]);
  assert.deepEqual(toolMessages(messages), [
    ["call_2", "second"],
    ["call_1", "first"],
  ]);
});

test("id-less custom_tool_call_output pairs with the pending custom call", () => {
  const messages = translate([
    user,
    { type: "custom_tool_call", call_id: "call_patch", name: "apply_patch", input: "*** Begin" },
    { type: "custom_tool_call_output", output: "patched" },
  ]);
  assert.deepEqual(toolMessages(messages), [["call_patch", "patched"]]);
});

test("id-less output with no pending call is still dropped", () => {
  const messages = translate([
    user,
    call("call_1"),
    { type: "function_call_output", call_id: "call_1", output: "done" },
    { type: "function_call_output", output: "stray" },
  ]);
  assert.deepEqual(toolMessages(messages), [["call_1", "done"]]);
  assert.ok(!allText(messages).includes("stray"), "no stray user turn for an id-less orphan");
});

test("stateless continuation keeps the orphan output as labelled user context", () => {
  const messages = translate(
    [{ type: "function_call_output", call_id: "call_a", output: '{"ok":true}' }],
    { previous_response_id: "resp_prev" }
  );
  assert.deepEqual(toolMessages(messages), []);
  const carriers = messages.filter(
    (m) => m.role === "user" && String(m.content).includes('{"ok":true}')
  );
  assert.equal(carriers.length, 1);
  assert.equal(carriers[0].content, '[Unpaired tool result call_a]\n{"ok":true}');
});

test("two orphan outputs are both preserved, in order", () => {
  const messages = translate(
    [
      { type: "function_call_output", call_id: "call_a", output: "A" },
      { type: "function_call_output", call_id: "call_b", output: "B" },
    ],
    { previous_response_id: "resp_prev" }
  );
  assert.deepEqual(
    messages.map((m) => [m.role, m.content]),
    [
      ["user", "[Unpaired tool result call_a]\nA"],
      ["user", "[Unpaired tool result call_b]\nB"],
    ]
  );
});

test("paired call + output is unchanged", () => {
  const messages = translate([
    user,
    call("call_1"),
    { type: "function_call_output", call_id: "call_1", output: "ok" },
  ]);
  assert.deepEqual(
    messages.map((m) => m.role),
    ["user", "assistant", "tool"]
  );
  assert.deepEqual(toolMessages(messages), [["call_1", "ok"]]);
});

for (const target of ["openai", "gemini", "claude"]) {
  test(`translateRequest(openai-responses → ${target}): orphan output reaches the model`, () => {
    const body = {
      model: "m",
      previous_response_id: "resp_prev",
      input: [{ type: "function_call_output", call_id: "call_a", output: "weather: sunny" }],
    };
    const result = translateRequest("openai-responses", target, "m", body, false) as Msg;
    assert.ok(allText([result]).includes("weather: sunny"), "tool output preserved");
    if (Array.isArray(result.messages)) {
      const callIds = new Set(
        (result.messages as Msg[]).flatMap((m) =>
          Array.isArray(m.tool_calls) ? (m.tool_calls as Msg[]).map((tc) => tc.id) : []
        )
      );
      for (const m of result.messages as Msg[]) {
        if (m.role === "tool") assert.ok(callIds.has(m.tool_call_id), "no orphan role:tool");
      }
    }
  });
}
