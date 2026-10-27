/**
 * Tests for Cloudflare Playground executor tool calling (emulated).
 *
 * Validates:
 * - Non-streaming tool call: response has finish_reason="tool_calls" with tool_calls array
 * - Streaming tool call: emits clean tool_calls chunk without raw markup
 * - Tool replay: assistant tool_calls and tool results are included in conversation
 * - No tools: normal text response still works
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  CloudflarePlaygroundExecutor,
  toCfMessages,
  type CfTransport,
  type CfTransportConfig,
  type CfTransportStartResult,
} from "../../open-sse/executors/cloudflare-playground.ts";
import {
  CF_COMPACT_HEADER,
  CF_MAX_MESSAGE_CHARS,
  cfMessageText,
} from "../../open-sse/translator/cloudflarePlaygroundTools.ts";

const identityFrame = JSON.stringify({
  name: "playground-test",
  agent: "playground",
  type: "cf_agent_identity",
});
const stateFrame = JSON.stringify({
  state: {
    model: "@cf/test-model",
    temperature: 0.7,
    stream: true,
    system: "You are a helpful assistant.",
  },
  type: "cf_agent_state",
});
const decoyRpcDone = JSON.stringify({
  id: "cfp-config",
  done: true,
  type: "cf_agent_rpc_response",
});

const cfFrame = (chatId: string, body: unknown) =>
  JSON.stringify({ id: chatId, type: "cf_agent_use_chat_response", body: JSON.stringify(body) });

const buildSuccessFrames = (chatId: string, text: string, reasoning = "") => [
  identityFrame,
  stateFrame,
  decoyRpcDone,
  cfFrame(chatId, { type: "start" }),
  cfFrame(chatId, { type: "start-step" }),
  ...(reasoning
    ? [
        cfFrame(chatId, { type: "reasoning-start", id: "r1" }),
        cfFrame(chatId, { type: "reasoning-delta", delta: reasoning, id: "r1" }),
        cfFrame(chatId, { type: "reasoning-end", id: "r1" }),
      ]
    : []),
  cfFrame(chatId, { type: "text-start", id: "t1" }),
  cfFrame(chatId, { type: "text-delta", delta: text, id: "t1" }),
  cfFrame(chatId, { type: "finish-step" }),
  cfFrame(chatId, { type: "finish", messageMetadata: { finishReason: "stop" } }),
  JSON.stringify({ id: chatId, type: "cf_agent_use_chat_response", done: true }),
];

type CfTransportFailure = Omit<Extract<CfTransportStartResult, { ok: false }>, "ok">;

class FakeTransport implements CfTransport {
  constructor(
    private framesList: string[],
    private fail: CfTransportFailure | null = null
  ) {}

  async start(): Promise<CfTransportStartResult> {
    return this.fail ? { ok: false, ...this.fail } : { ok: true };
  }

  async *frames(): AsyncGenerator<string> {
    for (const frame of this.framesList) yield frame;
  }

  async close(): Promise<void> {}
}

function makeExecutor(buildFrames: (chatId: string) => string[], fail?: CfTransportFailure) {
  return new CloudflarePlaygroundExecutor((chatId) => new FakeTransport(buildFrames(chatId), fail));
}

const executeArgs = (body: Record<string, unknown>, stream: boolean) =>
  ({ body, credentials: {}, signal: null, stream }) as unknown as Parameters<
    CloudflarePlaygroundExecutor["execute"]
  >[0];

// ── Non-streaming tool calls ──────────────────────────────────────────────────

test('executor non-streaming: tool call with <tool name="..."> markup returns finish_reason=tool_calls', async () => {
  const modelResponse = '<tool name="bash">{"command": "ls -la"}</tool>';
  const executor = makeExecutor((chatId) => buildSuccessFrames(chatId, modelResponse));
  const result = await executor.execute(
    executeArgs(
      {
        model: "test-model",
        messages: [{ role: "user", content: "list files" }],
        tools: [
          {
            type: "function",
            function: {
              name: "bash",
              description: "Run a command",
              parameters: {
                type: "object",
                properties: { command: { type: "string" } },
                required: ["command"],
              },
            },
          },
        ],
      },
      false
    )
  );

  assert.equal(result.response.status, 200);
  const parsed = JSON.parse(await result.response.text()) as {
    choices: Array<{
      message: { role: string; content: string | null; tool_calls?: unknown[] };
      finish_reason: string;
    }>;
  };
  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.ok(parsed.choices[0].message.tool_calls);
  assert.equal(parsed.choices[0].message.tool_calls.length, 1);
  assert.equal(parsed.choices[0].message.tool_calls[0].function.name, "bash");
  assert.equal(parsed.choices[0].message.tool_calls[0].function.arguments, '{"command": "ls -la"}');
  // Content should be stripped of tool markup
  assert.equal(parsed.choices[0].message.content, null);
});

test("executor non-streaming: tool call with <tool>...</tool> (name omitted, single tool) infers name", async () => {
  const modelResponse = '<tool>{"command": "pwd"}</tool>';
  const executor = makeExecutor((chatId) => buildSuccessFrames(chatId, modelResponse));
  const result = await executor.execute(
    executeArgs(
      {
        model: "test-model",
        messages: [{ role: "user", content: "where am I" }],
        tools: [
          {
            type: "function",
            function: {
              name: "bash",
              description: "Run a command",
              parameters: {
                type: "object",
                properties: { command: { type: "string" } },
                required: ["command"],
              },
            },
          },
        ],
      },
      false
    )
  );

  const parsed = JSON.parse(await result.response.text()) as {
    choices: Array<{ message: { tool_calls?: unknown[] }; finish_reason: string }>;
  };
  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls?.[0].function.name, "bash");
});

test("executor non-streaming: tool call with <shell>...</shell> markup (live shape)", async () => {
  const modelResponse = '<shell>{"command": "ls"}</shell>';
  const executor = makeExecutor((chatId) => buildSuccessFrames(chatId, modelResponse));
  const result = await executor.execute(
    executeArgs(
      {
        model: "test-model",
        messages: [{ role: "user", content: "list files" }],
        tools: [
          {
            type: "function",
            function: {
              name: "shell",
              description: "Run shell",
              parameters: {
                type: "object",
                properties: { command: { type: "string" } },
                required: ["command"],
              },
            },
          },
        ],
      },
      false
    )
  );

  const parsed = JSON.parse(await result.response.text()) as {
    choices: Array<{ message: { tool_calls?: unknown[] }; finish_reason: string }>;
  };
  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls?.[0].function.name, "shell");
});

test("executor non-streaming: multiple tool calls in one response", async () => {
  const modelResponse =
    '<tool name="bash">{"command": "ls"}</tool> and then <tool:read_file>{"path": "foo.txt"}</tool:read_file>';
  const executor = makeExecutor((chatId) => buildSuccessFrames(chatId, modelResponse));
  const result = await executor.execute(
    executeArgs(
      {
        model: "test-model",
        messages: [{ role: "user", content: "list and read" }],
        tools: [
          {
            type: "function",
            function: {
              name: "bash",
              description: "Run",
              parameters: {
                type: "object",
                properties: { command: { type: "string" } },
                required: ["command"],
              },
            },
          },
          {
            type: "function",
            function: {
              name: "read_file",
              description: "Read",
              parameters: {
                type: "object",
                properties: { path: { type: "string" } },
                required: ["path"],
              },
            },
          },
        ],
      },
      false
    )
  );

  const parsed = JSON.parse(await result.response.text()) as {
    choices: Array<{ message: { tool_calls?: unknown[] }; finish_reason: string }>;
  };
  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls?.length, 2);
  assert.equal(parsed.choices[0].message.tool_calls?.[0].function.name, "bash");
  assert.equal(parsed.choices[0].message.tool_calls?.[1].function.name, "read_file");
});

test("executor non-streaming: no tools requested returns normal text response", async () => {
  const executor = makeExecutor((chatId) => buildSuccessFrames(chatId, "Hello world!"));
  const result = await executor.execute(
    executeArgs({ model: "test-model", messages: [{ role: "user", content: "hi" }] }, false)
  );

  const parsed = JSON.parse(await result.response.text()) as {
    choices: Array<{ message: { content: string; tool_calls?: unknown[] }; finish_reason: string }>;
  };
  assert.equal(parsed.choices[0].finish_reason, "stop");
  assert.equal(parsed.choices[0].message.content, "Hello world!");
  assert.ok(!parsed.choices[0].message.tool_calls);
});

// ── Streaming tool calls ──────────────────────────────────────────────────────

function parseSseChunks(raw: string) {
  return raw
    .split("\n\n")
    .filter((chunk) => chunk.startsWith("data: ") && chunk !== "data: [DONE]")
    .map((chunk) => JSON.parse(chunk.slice(6)));
}

test("executor streaming: tool call emits clean tool_calls chunk without raw markup", async () => {
  const modelResponse = '<tool name="bash">{"command": "ls"}</tool>';
  const executor = makeExecutor((chatId) => buildSuccessFrames(chatId, modelResponse));
  const result = await executor.execute(
    executeArgs(
      {
        model: "test-model",
        messages: [{ role: "user", content: "list files" }],
        tools: [
          {
            type: "function",
            function: {
              name: "bash",
              description: "Run",
              parameters: {
                type: "object",
                properties: { command: { type: "string" } },
                required: ["command"],
              },
            },
          },
        ],
      },
      true
    )
  );

  const raw = await result.response.text();
  assert.ok(raw.endsWith("data: [DONE]\n\n"));
  const chunks = parseSseChunks(raw);

  // Should have: role, (reasoning optional), content (null/empty), tool_calls, finish
  const toolCallsChunk = chunks.find((c) => c.choices?.[0]?.delta?.tool_calls);
  assert.ok(toolCallsChunk, "expected a tool_calls chunk");
  assert.equal(toolCallsChunk.choices[0].delta.tool_calls.length, 1);
  assert.equal(toolCallsChunk.choices[0].delta.tool_calls[0].function.name, "bash");
  assert.equal(
    toolCallsChunk.choices[0].delta.tool_calls[0].function.arguments,
    '{"command": "ls"}'
  );

  // Final chunk should have finish_reason: tool_calls
  const finalChunk = chunks[chunks.length - 1];
  assert.equal(finalChunk.choices[0].finish_reason, "tool_calls");

  // No chunk should contain the raw <tool> markup in content
  for (const chunk of chunks) {
    const content = chunk.choices?.[0]?.delta?.content;
    if (content) {
      assert.ok(!content.includes("<tool"), "content must not contain raw tool markup");
    }
  }
});

test("executor streaming: text response without tools works normally", async () => {
  const executor = makeExecutor((chatId) =>
    buildSuccessFrames(chatId, "Hello world!", "thinking...")
  );
  const result = await executor.execute(
    executeArgs({ model: "test-model", messages: [{ role: "user", content: "hi" }] }, true)
  );

  const raw = await result.response.text();
  const chunks = parseSseChunks(raw);

  const content = chunks
    .filter((c) => c.choices?.[0]?.delta?.content)
    .map((c) => c.choices[0].delta.content)
    .join("");
  assert.equal(content, "Hello world!");

  const reasoning = chunks
    .filter((c) => c.choices?.[0]?.delta?.reasoning_content)
    .map((c) => c.choices[0].delta.reasoning_content)
    .join("");
  assert.equal(reasoning, "thinking...");

  const finalChunk = chunks[chunks.length - 1];
  assert.equal(finalChunk.choices[0].finish_reason, "stop");
  assert.ok(!chunks.some((c) => c.choices?.[0]?.delta?.tool_calls));
});

// ── Tool replay (conversation history) ────────────────────────────────────────

test("toCfMessages replays assistant tool_calls as <tool> markup", () => {
  const messages = [
    { role: "user" as const, content: "hi" },
    {
      role: "assistant" as const,
      content: null,
      tool_calls: [
        {
          id: "call_1",
          type: "function" as const,
          function: { name: "bash", arguments: '{"command": "ls"}' },
        },
      ],
    },
  ];
  const out = toCfMessages(messages);
  assert.equal(out.length, 2);
  assert.ok(out[1].parts[0].text.includes('<tool name="bash">'));
  assert.ok(out[1].parts[0].text.includes('{"command": "ls"}'));
});

test("toCfMessages replays tool results as <tool_result> markup", () => {
  const messages = [
    { role: "user" as const, content: "hi" },
    { role: "tool" as const, content: "file contents here", tool_call_id: "call_1" },
  ];
  const out = toCfMessages(messages);
  assert.equal(out.length, 2);
  assert.ok(out[1].parts[0].text.includes('<tool_result call_id="call_1">'));
  assert.ok(out[1].parts[0].text.includes("file contents here"));
});

test("toCfMessages handles tool result without tool_call_id", () => {
  const messages = [{ role: "tool" as const, content: "result" }];
  const out = toCfMessages(messages);
  assert.equal(out.length, 1);
  assert.ok(out[0].parts[0].text.includes("<tool_result>"));
  assert.ok(!out[0].parts[0].text.includes("call_id="));
});

// ── Conversation cap (10 user messages per conversation) ─────────────────────

/** Transport that records the payload the executor hands to the playground. */
class CapturingTransport implements CfTransport {
  static last: CfTransportConfig | null = null;

  constructor(private framesList: string[]) {}

  async start(config: CfTransportConfig): Promise<CfTransportStartResult> {
    CapturingTransport.last = config;
    return { ok: true };
  }

  async *frames(): AsyncGenerator<string> {
    for (const frame of this.framesList) yield frame;
  }

  async close(): Promise<void> {}
}

test("executor trims a long conversation to the playground's 10-user-message cap", async () => {
  const executor = new CloudflarePlaygroundExecutor(
    (chatId) => new CapturingTransport(buildSuccessFrames(chatId, "ok"))
  );
  // Every turn contributes two user-role messages once replayed (the user turn
  // itself and the tool result), plus the injected contract.
  const messages = [
    ...Array.from({ length: 14 }, (_, i) => [
      { role: "user", content: `turn ${i}` },
      { role: "assistant", content: `reply ${i}` },
      { role: "tool", content: `result ${i}`, tool_call_id: `call_${i}` },
    ]).flat(),
    { role: "user", content: "latest question" },
  ];

  const result = await executor.execute(
    executeArgs(
      {
        model: "test-model",
        messages,
        tools: [
          {
            type: "function",
            function: {
              name: "bash",
              description: "Run a command",
              parameters: {
                type: "object",
                properties: { command: { type: "string" } },
                required: ["command"],
              },
            },
          },
        ],
      },
      false
    )
  );

  assert.equal(result.response.status, 200);
  const sent = CapturingTransport.last;
  assert.ok(sent, "transport.start should have been called");

  const userMessages = sent!.messages.filter((m) => m.role === "user");
  assert.ok(
    userMessages.length <= 10,
    `expected at most 10 user messages, sent ${userMessages.length}`
  );
  // The model still sees the tool contract and the current question.
  assert.ok(userMessages[0].parts[0].text.includes("# Tools"));
  assert.equal(userMessages[userMessages.length - 1].parts[0].text, "latest question");
  // Older history is compacted into the block, not dropped: the very first turn
  // — the original task statement — survives.
  const compacted = userMessages.find((m) => m.parts[0].text.includes(CF_COMPACT_HEADER));
  assert.ok(compacted, "expected a compacted-history block");
  assert.ok(compacted!.parts[0].text.includes("### USER"));
  assert.ok(compacted!.parts[0].text.includes("turn 0"));
  assert.ok(compacted!.parts[0].text.length <= CF_MAX_MESSAGE_CHARS);
});

test("the compacted block renders a turn exactly like the verbatim tail does", () => {
  // Drift guard: the block and the live tail must stay indistinguishable in
  // style, otherwise the model sees two dialects of the same conversation.
  const cases = [
    { role: "user" as const, content: "plain user turn" },
    {
      role: "assistant" as const,
      content: "text before the call",
      tool_calls: [
        {
          id: "call_1",
          type: "function" as const,
          function: { name: "bash", arguments: '{"command": "ls"}' },
        },
      ],
    },
    { role: "tool" as const, content: "result body", tool_call_id: "call_1" },
    { role: "tool" as const, content: "" },
  ];

  for (const message of cases) {
    const tailText = toCfMessages([message])[0].parts[0].text;
    const blockItem = cfMessageText(message);
    assert.equal(blockItem, tailText, `rendering drifted for role ${message.role}`);
  }
});
