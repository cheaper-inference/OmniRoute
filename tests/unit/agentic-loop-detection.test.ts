import assert from "node:assert/strict";
import test from "node:test";
import { stalledToolLoopReason } from "../../open-sse/services/agenticLoopGuard.ts";
import { handleAgenticPipelineChat } from "../../open-sse/services/agenticPipeline.ts";

const round = (id: string, result = "unchanged", error = false) => [
  { role: "assistant", content: [{ type: "tool_use", id, name: "read", input: { path: "a" } }] },
  {
    role: "user",
    content: [{ type: "tool_result", tool_use_id: id, content: result, is_error: error }],
  },
];
test("repeated rounds require unchanged evidence, and fresh requests reset detection", () => {
  assert.match(
    stalledToolLoopReason({ messages: [...round("a"), ...round("b")] }) ?? "",
    /same tool/
  );
  assert.equal(
    stalledToolLoopReason({ messages: [...round("a"), ...round("b", "changed")] }),
    null
  );
  assert.equal(
    stalledToolLoopReason({
      messages: [...round("a"), { role: "user", content: "new task" }, ...round("b")],
    }),
    null
  );
  assert.match(
    stalledToolLoopReason({
      messages: [...round("a", "error1", true), ...round("b", "error2", true)],
    }) ?? "",
    /failed/
  );
});
test("native Chat Completions, Responses and Gemini histories are supported", () => {
  const chat = (id: string) => [
    {
      role: "assistant",
      tool_calls: [{ id, function: { name: "read", arguments: '{"path":"a"}' } }],
    },
    { role: "tool", tool_call_id: id, content: "same" },
  ];
  const responses = (id: string) => [
    { type: "function_call", call_id: id, name: "read", arguments: '{"path":"a"}' },
    { type: "function_call_output", call_id: id, output: "same" },
  ];
  const gemini = () => [
    { role: "model", parts: [{ functionCall: { name: "read", args: { path: "a" } } }] },
    { role: "user", parts: [{ functionResponse: { name: "read", response: { result: "same" } } }] },
  ];
  for (const body of [
    { messages: [...chat("a"), ...chat("b")] },
    { input: [...responses("a"), ...responses("b")] },
    { contents: [...gemini(), ...gemini()] },
  ])
    assert.ok(stalledToolLoopReason(body));
});
test("parallel identical calls in a single round do not count as a stalled loop", () => {
  const first = round("a");
  const second = round("b");
  assert.equal(
    stalledToolLoopReason({
      messages: [
        { role: "assistant", content: [...first[0].content, ...second[0].content] },
        { role: "user", content: [...first[1].content, ...second[1].content] },
      ],
    }),
    null
  );
});
test("parallel results are compared with the calls they belong to, not as independent sets", () => {
  const chatRound = (id: string, values: string[]) => [
    {
      role: "assistant",
      tool_calls: values.map((_value, index) => ({
        id: `${id}${index}`,
        function: { name: "read", arguments: JSON.stringify({ path: index }) },
      })),
    },
    ...values.map((content, index) => ({
      role: "tool",
      tool_call_id: `${id}${index}`,
      content,
    })),
  ];
  assert.equal(
    stalledToolLoopReason({
      messages: [...chatRound("a", ["one", "two"]), ...chatRound("b", ["two", "one"])],
    }),
    null
  );
  const second = chatRound("b", ["one", "two"]);
  assert.match(
    stalledToolLoopReason({
      messages: [...chatRound("a", ["one", "two"]), second[0], second[2], second[1]],
    }) ?? "",
    /same tool/
  );
});
test("incomplete and unmatched parallel rounds cannot stop further execution", () => {
  const partial = (id: string) => [
    {
      role: "assistant",
      content: [
        { type: "tool_use", id: `${id}1`, name: "read", input: { path: "a" } },
        { type: "tool_use", id: `${id}2`, name: "read", input: { path: "b" } },
      ],
    },
    {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: `${id}1`, content: "failed", is_error: true }],
    },
  ];
  assert.equal(stalledToolLoopReason({ messages: [...partial("a"), ...partial("b")] }), null);
  const unmatched = round("a");
  unmatched[1].content[0].tool_use_id = "unknown";
  assert.equal(stalledToolLoopReason({ messages: [...round("b"), ...unmatched] }), null);
  assert.equal(
    stalledToolLoopReason({ messages: [...round("a"), ...round("b"), round("c")[0]] }),
    null
  );
});
test("Anthropic and Responses parallel calls also keep result identity", () => {
  const nativeRound = (id: string, values: string[], responses: boolean) => {
    const calls = values.map((_value, index) =>
      responses
        ? {
            type: "function_call",
            call_id: `${id}${index}`,
            name: "read",
            arguments: JSON.stringify({ path: index }),
          }
        : { type: "tool_use", id: `${id}${index}`, name: "read", input: { path: index } }
    );
    const results = values.map((value, index) =>
      responses
        ? { type: "function_call_output", call_id: `${id}${index}`, output: value }
        : { type: "tool_result", tool_use_id: `${id}${index}`, content: value }
    );
    return responses
      ? [...calls, ...results]
      : [
          { role: "assistant", content: calls },
          { role: "user", content: results },
        ];
  };
  for (const responses of [false, true]) {
    const key = responses ? "input" : "messages";
    assert.equal(
      stalledToolLoopReason({
        [key]: [
          ...nativeRound("a", ["one", "two"], responses),
          ...nativeRound("b", ["two", "one"], responses),
        ],
      }),
      null
    );
    assert.ok(
      stalledToolLoopReason({
        [key]: [
          ...nativeRound("a", ["one", "two"], responses),
          ...nativeRound("b", ["one", "two"], responses),
        ],
      })
    );
  }
});
test("Gemini results retain function-name pairing and ambiguous idless calls fail open", () => {
  const geminiRound = (values: string[], sameName = false) => [
    {
      role: "model",
      parts: values.map((_value, index) => ({
        functionCall: { name: sameName ? "read" : `read${index}`, args: { path: index } },
      })),
    },
    {
      role: "user",
      parts: values.map((result, index) => ({
        functionResponse: { name: sameName ? "read" : `read${index}`, response: { result } },
      })),
    },
  ];
  assert.equal(
    stalledToolLoopReason({
      contents: [...geminiRound(["one", "two"]), ...geminiRound(["two", "one"])],
    }),
    null
  );
  assert.ok(
    stalledToolLoopReason({
      contents: [...geminiRound(["one", "two"]), ...geminiRound(["one", "two"])],
    })
  );
  assert.equal(
    stalledToolLoopReason({
      contents: [...geminiRound(["one", "two"], true), ...geminiRound(["one", "two"], true)],
    }),
    null
  );
});
test("Responses computer and shell calls retain their native call identifiers", () => {
  for (const type of ["computer_call", "local_shell_call"]) {
    const responseRound = (id: string) => [
      { type, call_id: id, action: { command: ["pwd"] } },
      { type: `${type}_output`, call_id: id, output: "same" },
    ];
    assert.ok(stalledToolLoopReason({ input: [...responseRound("a"), ...responseRound("b")] }));
  }
});
test("stalled continuation forces planner final even if planner requests more tools", async () => {
  const seen: string[] = [];
  const noop = () => undefined;
  await handleAgenticPipelineChat({
    body: { messages: [...round("a"), ...round("b")], tools: [{ name: "read" }] },
    steps: [{ model: "p/planner" }, { model: "p/executor" }, { model: "p/backup" }],
    log: { info: noop, warn: noop, debug: noop },
    handleSingleModel: async (body, model) => {
      seen.push(model);
      assert.match(JSON.stringify(body), /same tool calls/);
      return Response.json({
        choices: [{ message: { content: "OMNIROUTE_ROUTE: TOOLS\nRetry." } }],
      });
    },
  });
  assert.deepEqual(seen, ["p/planner", "p/planner"]);
});
