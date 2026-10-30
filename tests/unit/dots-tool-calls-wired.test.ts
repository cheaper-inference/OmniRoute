import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");
const { sanitizeOpenAIResponse } = await import("../../open-sse/handlers/responseSanitizer.ts");

type ClaudeEvent = {
  type: string;
  content_block?: { type?: string; name?: string };
  delta?: { type?: string; text?: string; partial_json?: string };
};

const INVOKE_BLOCK =
  '<dots_function_call><invoke name="get_weather"><parameter name="city">Boston</parameter></invoke></dots_function_call>';

function runStream(clientTools: unknown[], chunks: string[]): ClaudeEvent[] {
  const state: Record<string, unknown> = {
    provider: "openai",
    toolCalls: new Map(),
    _pendingXmlToolCalls: [],
    _xmlInvokeBuffer: "",
    clientTools,
  };
  const events: ClaudeEvent[] = [];
  const push = (out: unknown) => {
    if (out) events.push(...(out as ClaudeEvent[]));
  };
  for (const content of chunks) {
    push(
      openaiToClaudeResponse(
        {
          id: "chatcmpl-dots",
          model: "gpt-test",
          choices: [{ index: 0, delta: { content }, finish_reason: null }],
        },
        state
      )
    );
  }
  push(
    openaiToClaudeResponse(
      {
        id: "chatcmpl-dots",
        model: "gpt-test",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
        usage: { prompt_tokens: 5, completion_tokens: 7, total_tokens: 12 },
      },
      state
    )
  );
  return events;
}

const textOf = (events: ClaudeEvent[]) =>
  events
    .filter((e) => e.type === "content_block_delta" && e.delta?.type === "text_delta")
    .map((e) => e.delta?.text ?? "")
    .join("");

const toolUses = (events: ClaudeEvent[]) =>
  events.filter((e) => e.type === "content_block_start" && e.content_block?.type === "tool_use");

const TOOL_SHAPES: Array<[string, unknown[]]> = [
  [
    "OpenAI-shaped",
    [{ type: "function", function: { name: "get_weather", parameters: { type: "object" } } }],
  ],
  ["Anthropic-shaped", [{ name: "get_weather", input_schema: { type: "object" } }]],
  ["schema-less", [{ name: "get_weather" }]],
];

for (const [label, tools] of TOOL_SHAPES) {
  test(`Claude stream: dots markup becomes a tool_use with ${label} client tools and never leaks`, () => {
    const events = runStream(tools, [INVOKE_BLOCK]);
    assert.equal(toolUses(events).length, 1);
    assert.equal(toolUses(events)[0].content_block?.name, "get_weather");
    assert.equal(textOf(events), "");
    assert.equal(textOf(events).includes("dots_function_call"), false);
  });
}

test("Claude stream: a dots block split across chunks is held back, then parsed", () => {
  const events = runStream(TOOL_SHAPES[1][1], [
    'Checking. <dots_function_call><invoke name="get_weather">',
    '<parameter name="city">Boston</parameter></invoke></dots_function_call>',
  ]);
  assert.equal(toolUses(events).length, 1);
  assert.equal(textOf(events), "Checking. ");
});

for (const [label, chunks] of [
  ["mid-name", ["Hi <dots_func", `tion_call>${INVOKE_BLOCK.slice("<dots_function_call>".length)}`]],
  ["before '>'", ["Hi <dots_function_call", INVOKE_BLOCK.slice("<dots_function_call".length)]],
] as Array<[string, string[]]>) {
  test(`Claude stream: an opener split ${label} across chunks never leaks markup`, () => {
    const events = runStream(TOOL_SHAPES[1][1], chunks);
    assert.equal(toolUses(events).length, 1);
    assert.equal(textOf(events), "Hi ");
  });
}

test("Claude stream: a held-back partial opener is released when the stream ends", () => {
  const events = runStream([], ["Compare a <dots_func"]);
  assert.equal(textOf(events), "Compare a <dots_func");
});

test("Claude stream: dots markup for an undeclared tool is not turned into a tool_use", () => {
  const events = runStream(
    [{ name: "other_tool" }],
    ['<dots_function_call>{"name":"get_weather","arguments":{}}</dots_function_call>']
  );
  assert.equal(toolUses(events).length, 0);
});

test("Claude stream: an unclosed dots block is released as text when the stream ends", () => {
  const prose = "Use <dots_function_call> to call tools.";
  const events = runStream([], [prose]);
  assert.equal(textOf(events), prose);
});

test("OpenAI sanitizer: dots markup in content becomes tool_calls", () => {
  const sanitized = sanitizeOpenAIResponse({
    id: "chatcmpl-dots",
    object: "chat.completion",
    created: 1,
    model: "gpt-test",
    choices: [
      {
        index: 0,
        message: { role: "assistant", content: `Sure. ${INVOKE_BLOCK}` },
        finish_reason: "stop",
      },
    ],
  }) as {
    choices: Array<{
      finish_reason: string;
      message: {
        content: string;
        tool_calls: Array<{ function: { name: string; arguments: string } }>;
      };
    }>;
  };
  const message = sanitized.choices[0].message;
  assert.equal(sanitized.choices[0].finish_reason, "tool_calls");
  assert.equal(Object.hasOwn(message, "finish_reason"), false);
  assert.equal(message.content, "Sure. ");
  assert.equal(message.tool_calls.length, 1);
  assert.equal(message.tool_calls[0].function.name, "get_weather");
  assert.deepEqual(JSON.parse(message.tool_calls[0].function.arguments), { city: "Boston" });
});

test("OpenAI sanitizer: dots blocks are scrubbed from reasoning fields", () => {
  const sanitized = sanitizeOpenAIResponse({
    id: "chatcmpl-dots",
    object: "chat.completion",
    created: 1,
    model: "gpt-test",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "ok",
          reasoning_content: `thinking ${INVOKE_BLOCK}`,
        },
        finish_reason: "stop",
      },
    ],
  }) as { choices: Array<{ message: Record<string, unknown> }> };
  assert.equal(
    String(sanitized.choices[0].message.reasoning_content).includes("dots_function_call"),
    false
  );
});

test("OpenAI sanitizer: an unclosed dots block or partial opener in a whole body stays as content", () => {
  for (const content of ["Use <dots_function_call> to call tools.", "Compare a <dots_func"]) {
    const sanitized = sanitizeOpenAIResponse({
      id: "chatcmpl-dots",
      object: "chat.completion",
      created: 1,
      model: "gpt-test",
      choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
    }) as { choices: Array<{ finish_reason: string; message: Record<string, unknown> }> };
    assert.equal(sanitized.choices[0].message.content, content);
    assert.equal(sanitized.choices[0].message.tool_calls, undefined);
    assert.equal(sanitized.choices[0].finish_reason, "stop");
  }
});
