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
  gateCfStandaloneEnvelope,
  toCfMessages,
  type CfTransport,
  type CfTransportConfig,
  type CfTransportStartResult,
} from "../../open-sse/executors/cloudflare-playground.ts";
import {
  CF_COMPACT_HEADER,
  CF_MAX_MESSAGE_CHARS,
  cfMessageText,
  cfToolNonce,
  type CfToolDef,
} from "../../open-sse/translator/cloudflarePlaygroundTools.ts";
import { getRequestedToolNames } from "../../open-sse/translator/webTools.ts";

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
  // retryDelayMs: 0 — see makeSequencedExecutor: the 5 s production delay is
  // asserted by its own constant test, not paid by every retry in this file.
  return new CloudflarePlaygroundExecutor(
    (chatId) => new FakeTransport(buildFrames(chatId), fail),
    undefined,
    undefined,
    0
  );
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

test("executor non-streaming: a JSON envelope reply returns finish_reason=tool_calls", async () => {
  const modelResponse = '{"type": "tool_call", "name": "bash", "arguments": {"command": "ls -la"}}';
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
  assert.deepEqual(JSON.parse(parsed.choices[0].message.tool_calls[0].function.arguments), {
    command: "ls -la",
  });
  // The envelope itself is not conversational content.
  assert.equal(parsed.choices[0].message.content, null);
});

test("executor non-streaming: a JSON array reply returns one tool call per element", async () => {
  const modelResponse =
    '[{"type": "tool_call", "name": "bash", "arguments": {"command": "ls"}}, ' +
    '{"type": "tool_call", "name": "bash", "arguments": {"command": "pwd"}}]';
  const executor = makeExecutor((chatId) => buildSuccessFrames(chatId, modelResponse));
  const result = await executor.execute(
    executeArgs(
      {
        model: "test-model",
        messages: [{ role: "user", content: "look around" }],
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
      message: { content: string | null; tool_calls?: Array<{ function: { arguments: string } }> };
      finish_reason: string;
    }>;
  };
  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  const calls = parsed.choices[0].message.tool_calls ?? [];
  assert.equal(calls.length, 2);
  assert.deepEqual(
    calls.map((call) => JSON.parse(call.function.arguments).command),
    ["ls", "pwd"]
  );
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

test("executor streaming: parallel tool calls keep their own index", async () => {
  // A streaming client reassembles the calls by `index`; without one, N parallel
  // calls collapse into a single call whose name and arguments are the
  // concatenation of all of them.
  const modelResponse =
    '<read>{"path":"/repo/a.py"}</read>\n<write>{"path":"/repo/b.py","content":"x"}</path>';
  const executor = makeExecutor((chatId) => buildSuccessFrames(chatId, modelResponse));
  const result = await executor.execute(
    executeArgs(
      {
        model: "test-model",
        messages: [{ role: "user", content: "do both" }],
        tools: [
          {
            type: "function",
            function: {
              name: "read",
              description: "Read",
              parameters: {
                type: "object",
                properties: { path: { type: "string" } },
                required: ["path"],
              },
            },
          },
          {
            type: "function",
            function: {
              name: "write",
              description: "Write",
              parameters: {
                type: "object",
                properties: { path: { type: "string" }, content: { type: "string" } },
                required: ["path", "content"],
              },
            },
          },
        ],
      },
      true
    )
  );

  const chunks = parseSseChunks(await result.response.text());
  const deltas = chunks.flatMap((chunk) => chunk.choices?.[0]?.delta?.tool_calls ?? []);
  assert.equal(deltas.length, 2);
  assert.deepEqual(
    deltas.map((delta) => delta.index),
    [0, 1]
  );
  assert.deepEqual(
    deltas.map((delta) => delta.function.name),
    ["read", "write"]
  );
  assert.notEqual(deltas[0].id, deltas[1].id);
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

test("toCfMessages replays assistant tool_calls as JSON envelopes", () => {
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
  // The replayed call must match the shape the contract asks for, or the model
  // imitates its own history instead of the contract.
  assert.equal(
    out[1].parts[0].text,
    '{"type":"tool_call","name":"bash","arguments":{"command":"ls"}}'
  );
});

test("toCfMessages replays tool results as a JSON envelope", () => {
  const messages = [
    { role: "user" as const, content: "hi" },
    { role: "tool" as const, content: "file contents here", tool_call_id: "call_1" },
  ];
  const out = toCfMessages(messages);
  assert.equal(out.length, 2);
  assert.deepEqual(JSON.parse(out[1].parts[0].text), {
    tool_result: { call_id: "call_1", content: "file contents here" },
  });
});

test("toCfMessages handles tool result without tool_call_id", () => {
  const messages = [{ role: "tool" as const, content: "result" }];
  const out = toCfMessages(messages);
  assert.equal(out.length, 1);
  const parsed = JSON.parse(out[0].parts[0].text);
  assert.deepEqual(parsed, { tool_result: { content: "result" } });
  assert.ok(!out[0].parts[0].text.includes("call_id"));
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
  assert.ok(userMessages[0].parts[0].text.includes("# Tool Calling Instructions"));
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

// ── Repair retry: a tool-intent reply the parser cannot read ──────────────────

const READ_TOOLS = [
  {
    type: "function" as const,
    function: {
      name: "read",
      description: "Read a file",
      parameters: {
        type: "object",
        properties: { path: { type: "string" } },
        required: ["path"],
      },
    },
  },
];

/**
 * Transport that yields a different reply per attempt, recording each room id.
 *
 * `retryDelayMs: 0` is essential: the production delay is 5 s on purpose (the
 * playground rate-limits per IP per minute), but paying it here would make the
 * whole file cost `retries * 5 s` of wall clock. Exhaustion tests additionally
 * pass `maxToolRetries` so the budget is exercised, not the clock.
 */
function makeSequencedExecutor(
  replies: Array<(chatId: string) => string[]>,
  maxToolRetries?: number
) {
  const rooms: string[] = [];
  const executor = new CloudflarePlaygroundExecutor(
    (chatId) => {
      rooms.push(chatId);
      const build = replies[Math.min(rooms.length - 1, replies.length - 1)];
      return new FakeTransport(build(chatId));
    },
    undefined,
    maxToolRetries,
    0
  );
  return { executor, rooms };
}

const readArgs = (body: Record<string, unknown>, stream = false) =>
  executeArgs(
    {
      model: "test-model",
      messages: [{ role: "user", content: "read a.py" }],
      tools: READ_TOOLS,
      ...body,
    },
    stream
  );

test("executor retries once in a fresh room when a tool-intent reply is unreadable", async () => {
  // `<read><path>a.py` is a declared-tool block that never closes: the parser
  // cannot read it, and before the retry existed the turn came back as plain
  // text with the call buried inside it.
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, "<read><path>a.py"),
    (chatId) => buildSuccessFrames(chatId, '<read>{"path": "a.py"}</read>'),
  ]);

  const parsed = JSON.parse(await (await executor.execute(readArgs({}))).response.text()) as {
    choices: Array<{
      message: { content: string | null; tool_calls?: unknown[] };
      finish_reason: string;
    }>;
  };

  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls?.length, 1);
  assert.equal(parsed.choices[0].message.content, null);
  assert.equal(rooms.length, 2, "expected exactly one repair retry");
  assert.notEqual(rooms[0], rooms[1], "the retry must open a fresh room");
});

test("executor fails loudly after exhausting its repair retries", async () => {
  // A reply that never becomes a usable call must not ship as
  // `finish_reason: "stop"` — that is what made a stalled turn look finished.
  const broken = "<read><path>a.py";
  const { executor, rooms } = makeSequencedExecutor(
    [
      (chatId) => buildSuccessFrames(chatId, broken),
      (chatId) => buildSuccessFrames(chatId, broken),
      (chatId) => buildSuccessFrames(chatId, broken),
    ],
    2 // retry budget of 2 → 1 initial + 2 repairs, asserted without the 5 s clock
  );

  const response = await (await executor.execute(readArgs({}))).response;
  assert.equal(response.status, 502, "an unrecoverable tool call is an upstream failure");
  const parsed = JSON.parse(await response.text()) as { error: { message: string; code: string } };

  assert.equal(parsed.error.code, "HTTP_502");
  assert.match(parsed.error.message, /failed to produce a valid tool call/);
  assert.match(parsed.error.message, /malformed_intent/);
  // No stack trace, no raw exception text.
  assert.ok(!parsed.error.message.includes("at "));
  assert.equal(rooms.length, 3, "initial + exactly maxToolRetries repairs");
});

test("executor retries a cut-off multi-call reply instead of executing a prefix", async () => {
  const nonce = cfToolNonce(READ_TOOLS);
  const call = (path: string) =>
    `{"type": "tool_call", "name": "read", "arguments": {"path": "${path}"}, "_nonce": "${nonce}"}`;
  // Two calls, the array never closed. Before the truncation guard the first
  // call was executed and the second dropped, so the turn looked complete and
  // nothing asked the model to finish it.
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, `[${call("a.py")},\n{"type": "tool_call", "name": "re`),
    (chatId) => buildSuccessFrames(chatId, `[${call("a.py")}, ${call("b.py")}]`),
  ]);

  const parsed = JSON.parse(await (await executor.execute(readArgs({}))).response.text()) as {
    choices: Array<{
      message: { content: string | null; tool_calls?: Array<{ function: { arguments: string } }> };
      finish_reason: string;
    }>;
  };

  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(
    parsed.choices[0].message.tool_calls?.length,
    2,
    "every call must come from the retry, not from the cut-off reply"
  );
  assert.equal(parsed.choices[0].message.content, null);
  assert.equal(rooms.length, 2, "the cut-off reply must be retried, not half-executed");
  assert.notEqual(rooms[0], rooms[1], "the retry must open a fresh room");
});

test("executor retries when a bound call's arguments violate the declared schema", async () => {
  const { executor, rooms } = makeSequencedExecutor([
    // `path` is missing, so the client could never run this call.
    (chatId) => buildSuccessFrames(chatId, '<read>{"pattern": "*.py"}</read>'),
    (chatId) => buildSuccessFrames(chatId, '<read>{"path": "a.py"}</read>'),
  ]);

  const parsed = JSON.parse(await (await executor.execute(readArgs({}))).response.text()) as {
    choices: Array<{
      message: { tool_calls?: Array<{ function: { arguments: string } }> };
      finish_reason: string;
    }>;
  };

  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls?.[0].function.arguments, '{"path": "a.py"}');
  assert.equal(rooms.length, 2);
});

test("executor never executes a call bound to another request's nonce", async () => {
  // The replay case: stale envelopes from an earlier turn carry a nonce this
  // request never issued. Executing one would re-run a tool the user already
  // answered — so the reply is retried, and if it keeps replaying the stale
  // nonce it fails instead of ever being executed.
  const stale = '<read>{"path": "a.py", "_nonce": "stale-nonce"}</read>';
  const { executor, rooms } = makeSequencedExecutor(
    [
      (chatId) => buildSuccessFrames(chatId, stale),
      (chatId) => buildSuccessFrames(chatId, stale),
      (chatId) => buildSuccessFrames(chatId, stale),
    ],
    2
  );

  const response = await (await executor.execute(readArgs({}))).response;
  assert.equal(response.status, 502, "a foreign-nonce call must never be executed");
  const parsed = JSON.parse(await response.text()) as { error: { message: string } };
  assert.match(parsed.error.message, /failed to produce a valid tool call/);
  assert.equal(rooms.length, 3, "initial + exactly maxToolRetries repairs");
});

test("executor strips the nonce from a correctly bound call", async () => {
  const nonce = cfToolNonce(READ_TOOLS);
  const { executor } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, `<read>{"path": "a.py", "_nonce": "${nonce}"}</read>`),
  ]);

  const parsed = JSON.parse(await (await executor.execute(readArgs({}))).response.text()) as {
    choices: Array<{
      message: { tool_calls?: Array<{ function: { arguments: string } }> };
      finish_reason: string;
    }>;
  };

  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls?.[0].function.arguments, '{"path":"a.py"}');
});

test("executor retry applies to streaming clients too", async () => {
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, "<read><path>a.py"),
    (chatId) => buildSuccessFrames(chatId, '<read>{"path": "a.py"}</read>'),
  ]);

  const raw = await (await executor.execute(readArgs({}, true))).response.text();
  const chunks = parseSseChunks(raw);
  const toolCallsChunk = chunks.find((c) => c.choices?.[0]?.delta?.tool_calls);

  assert.ok(toolCallsChunk, "expected a tool_calls chunk after the repair retry");
  assert.equal(toolCallsChunk.choices[0].delta.tool_calls[0].function.name, "read");
  assert.equal(chunks[chunks.length - 1].choices[0].finish_reason, "tool_calls");
  assert.equal(rooms.length, 2);
});

test("executor repairs a <shell> tag when the client declared the tool as bash", async () => {
  // The live alias mismatch: OpenCode declares `bash`, the playground models
  // write `<shell>`. It used to reach the client as a call for a tool that does
  // not exist; now the unbound name fails the contract and the retry recovers it.
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, '<shell>{"command": "ls"}</shell>'),
    (chatId) => buildSuccessFrames(chatId, '<bash>{"command": "ls"}</bash>'),
  ]);

  const parsed = JSON.parse(
    await (
      await executor.execute(
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
      )
    ).response.text()
  ) as {
    choices: Array<{
      message: { tool_calls?: Array<{ function: { name: string } }> };
      finish_reason: string;
    }>;
  };

  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls?.[0].function.name, "bash");
  assert.equal(rooms.length, 2);
});

// ── Raw-envelope gates ────────────────────────────────────────────────────────
// The gates run on the model's raw bytes for every reply — not only on
// envelopes the parser already recognized. A reply that fails any gate is
// retried with a reminder naming the exact failure.

const GATE_TOOLS: CfToolDef[] = [
  {
    name: "read",
    parameters: {
      type: "object",
      properties: { path: { type: "string" } },
      required: ["path"],
    },
  },
  {
    name: "list-directory",
    parameters: {
      type: "object",
      properties: { path: { type: "string" } },
      required: ["path"],
    },
  },
];

/** The same list finalize resolves names against. */
const GATE_REQUESTED = getRequestedToolNames(
  GATE_TOOLS.map((tool) => ({ type: "function", function: { name: tool.name } }))
);

test("gate: a wrong discriminator fails with wrong_type", () => {
  assert.equal(
    gateCfStandaloneEnvelope(
      '{"type":"shell","arguments":{"command":"ls","timeout":30000}}',
      GATE_TOOLS
    ),
    "wrong_type"
  );
});

test("gate: a missing type fails with missing_type", () => {
  assert.equal(
    gateCfStandaloneEnvelope('{"name": "read", "arguments": {"path": "a.py"}}', GATE_TOOLS),
    "missing_type"
  );
});

test("gate: a missing or undeclared name fails the name gate", () => {
  assert.equal(
    gateCfStandaloneEnvelope('{"type": "tool_call", "arguments": {"path": "a.py"}}', GATE_TOOLS),
    "missing_name"
  );
  assert.equal(
    gateCfStandaloneEnvelope('{"type": "tool_call", "name": "nope", "arguments": {}}', GATE_TOOLS),
    "invalid_name"
  );
});

test("gate: missing, null, or non-object arguments fail the arguments gate", () => {
  assert.equal(
    gateCfStandaloneEnvelope('{"type": "tool_call", "name": "read"}', GATE_TOOLS),
    "missing_arguments"
  );
  assert.equal(
    gateCfStandaloneEnvelope(
      '{"type": "tool_call", "name": "read", "arguments": null}',
      GATE_TOOLS
    ),
    "missing_arguments"
  );
  assert.equal(
    gateCfStandaloneEnvelope(
      '{"type": "tool_call", "name": "read", "arguments": "a.py"}',
      GATE_TOOLS
    ),
    "missing_arguments"
  );
});

test("gate: a cut-off or unparseable envelope fails with invalid_json", () => {
  assert.equal(
    gateCfStandaloneEnvelope('{"type": "tool_call", "name": "re', GATE_TOOLS),
    "invalid_json"
  );
  assert.equal(gateCfStandaloneEnvelope('{"type": }', GATE_TOOLS), "invalid_json");
});

test("gate: one bad element fails a whole multi-call array", () => {
  assert.equal(
    gateCfStandaloneEnvelope(
      '[{"type": "tool_call", "name": "read", "arguments": {"path": "a.py"}}, ' +
        '{"type":"shell","arguments":{"command":"ls"}}]',
      GATE_TOOLS
    ),
    "wrong_type"
  );
});

test("gate: a complete contract envelope and the tool_calls wrapper pass", () => {
  assert.equal(
    gateCfStandaloneEnvelope(
      '{"type": "tool_call", "name": "read", "arguments": {"path": "a.py"}}',
      GATE_TOOLS
    ),
    null
  );
  assert.equal(
    gateCfStandaloneEnvelope(
      '{"tool_calls": [{"type": "tool_call", "name": "read", "arguments": {"path": "a.py"}}]}',
      GATE_TOOLS
    ),
    null
  );
});

test("gate: prose, JSON answers and schema quotes are not envelopes", () => {
  assert.equal(gateCfStandaloneEnvelope("Hello world!", GATE_TOOLS), null);
  assert.equal(gateCfStandaloneEnvelope('{"answer": "42"}', GATE_TOOLS), null);
  assert.equal(
    gateCfStandaloneEnvelope(
      'Use {"name": "read", "description": "..."} as the schema.',
      GATE_TOOLS
    ),
    null
  );
});

// ── Wrong-discriminator retry, end to end ─────────────────────────────────────

test('executor retries the live failure: {"type":"shell"} is wrong_type, not prose', async () => {
  // The exact reply observed in session ses_eb656f116ffepjVSWIWPkY1fZ2: the
  // model answered with type "shell" and no name. Before the raw-envelope gate
  // the parser dropped it, the intent check missed it, and the turn shipped as
  // text with the failed call buried in it.
  const broken = '{"type":"shell","arguments":{"command":"ls -la","timeout":30000}}';
  const fixed = '{"type": "tool_call", "name": "read", "arguments": {"path": "a.py"}}';
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, broken),
    (chatId) => buildSuccessFrames(chatId, fixed),
  ]);

  const parsed = JSON.parse(await (await executor.execute(readArgs({}))).response.text()) as {
    choices: Array<{
      message: { content: string | null; tool_calls?: unknown[] };
      finish_reason: string;
    }>;
  };

  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls?.length, 1);
  assert.equal(rooms.length, 2, "the wrong discriminator must be retried, not shipped as text");
  assert.notEqual(rooms[0], rooms[1], "the retry must open a fresh room");
});

test("executor exhausts its retries on a persistently wrong discriminator", async () => {
  const broken = '{"type":"shell","arguments":{"command":"ls -la","timeout":30000}}';
  const { executor, rooms } = makeSequencedExecutor(
    [
      (chatId) => buildSuccessFrames(chatId, broken),
      (chatId) => buildSuccessFrames(chatId, broken),
      (chatId) => buildSuccessFrames(chatId, broken),
    ],
    2
  );

  const response = await (await executor.execute(readArgs({}))).response;
  assert.equal(response.status, 502, "the wrong discriminator must never ship as prose");
  const parsed = JSON.parse(await response.text()) as { error: { message: string; code: string } };

  assert.equal(parsed.error.code, "HTTP_502");
  assert.match(parsed.error.message, /last failure: wrong_type/);
  assert.match(parsed.error.message, /3 attempts/);
  assert.equal(rooms.length, 3, "initial + exactly maxToolRetries repairs");
});

test("streaming exhaustion emits an error chunk before [DONE] instead of stopping", async () => {
  // OpenCode always asks for stream: true, so this is the shape the operator
  // actually sees. Before the error chunk the turn ended as a normal
  // `finish_reason: "stop"` with the broken reply as content — indistinguishable
  // from a completed answer.
  const broken = '{"type":"shell","arguments":{"command":"ls"}}';
  const { executor, rooms } = makeSequencedExecutor(
    [(chatId) => buildSuccessFrames(chatId, broken)],
    1
  );

  const raw = await (await executor.execute(readArgs({}, true))).response.text();
  const chunks = parseSseChunks(raw);

  const errorChunk = chunks.find((c) => c.error);
  assert.ok(errorChunk, "expected an error chunk before the stream ends");
  assert.equal(errorChunk.error.type, "tool_call_recovery_failed");
  assert.equal(errorChunk.error.code, "HTTP_502");
  assert.match(errorChunk.error.message, /failed to produce a valid tool call/);
  assert.ok(!errorChunk.error.message.includes(" at "), "no stack frames in an SSE error");

  const final = chunks[chunks.length - 1];
  assert.equal(final.choices?.[0]?.finish_reason, "stop");
  assert.equal(final.choices?.[0]?.delta?.content, undefined, "no broken reply is streamed out");
  assert.ok(!chunks.some((c) => c.choices?.[0]?.delta?.content), "content never goes out");
  assert.equal(raw.trimEnd().endsWith("data: [DONE]"), true);
  assert.equal(rooms.length, 2, "initial + exactly maxToolRetries repairs");
});

// ── Adversarial gates: deliberately wrong envelopes ────────────────────────────

test("gate: every wrong discriminator fails with wrong_type", () => {
  const shapes = [
    '{"type":"gun","name":"read","arguments":{"path":"a.py"}}',
    '{"type":"shell","name":"read","arguments":{"path":"a.py"}}',
    '{"type":"function","name":"read","arguments":{"path":"a.py"}}',
    '{"type":"TOOL_CALL","name":"read","arguments":{"path":"a.py"}}',
    '{"type":"tool_calls","name":"read","arguments":{"path":"a.py"}}',
    '{"type":5,"name":"read","arguments":{"path":"a.py"}}',
    '{"type":true,"name":"read","arguments":{"path":"a.py"}}',
    '{"type":null,"name":"read","arguments":{"path":"a.py"}}',
    '{"type":"","name":"read","arguments":{"path":"a.py"}}',
  ];
  for (const shape of shapes) {
    assert.equal(gateCfStandaloneEnvelope(shape, GATE_TOOLS, GATE_REQUESTED), "wrong_type", shape);
  }
});

test("gate: a missing discriminator fails with missing_type", () => {
  const shapes = [
    '{"name": "read", "arguments": {"path": "a.py"}}',
    '{"name": "read"}',
    '{"arguments": {"path": "a.py"}}',
    '{"tool_calls": [{"name": "read", "arguments": {"path": "a.py"}}]}',
  ];
  for (const shape of shapes) {
    assert.equal(
      gateCfStandaloneEnvelope(shape, GATE_TOOLS, GATE_REQUESTED),
      "missing_type",
      shape
    );
  }
});

test("gate: whitespace padding on the discriminator is formatting, not failure", () => {
  assert.equal(
    gateCfStandaloneEnvelope(
      '{"type": " tool_call ", "name": "read", "arguments": {"path": "a.py"}}',
      GATE_TOOLS,
      GATE_REQUESTED
    ),
    null
  );
});

test("gate: names resolve exactly the way parser + finalize resolve them", () => {
  const accept = [
    '{"type":"tool_call","name":"Read","arguments":{"path":"a.py"}}', // case
    '{"type":"tool_call","name":"read","arguments":{"path":"a.py"}}', // exact
    '{"type":"tool_call","name":"list_directory","arguments":{"path":"/t"}}', // fuzzy: separators
    '{"type":"tool_call","name":"list-directory","arguments":{"path":"/t"}}', // exact
  ];
  for (const shape of accept) {
    assert.equal(gateCfStandaloneEnvelope(shape, GATE_TOOLS, GATE_REQUESTED), null, shape);
  }

  const reject: Array<[string, string]> = [
    ['{"type":"tool_call","name":"","arguments":{"path":"a.py"}}', "invalid_name"],
    ['{"type":"tool_call","name":"   ","arguments":{"path":"a.py"}}', "invalid_name"],
    ['{"type":"tool_call","name":123,"arguments":{"path":"a.py"}}', "invalid_name"],
    ['{"type":"tool_call","name":true,"arguments":{"path":"a.py"}}', "invalid_name"],
    ['{"type":"tool_call","name":null,"arguments":{"path":"a.py"}}', "missing_name"],
    ['{"type":"tool_call","name":"nope-not-a-tool","arguments":{}}', "invalid_name"],
  ];
  for (const [shape, expected] of reject) {
    assert.equal(gateCfStandaloneEnvelope(shape, GATE_TOOLS, GATE_REQUESTED), expected, shape);
  }
});

test("gate: arguments must be a non-null object, not an array or scalar", () => {
  const shapes = [
    '{"type":"tool_call","name":"read","arguments":[]}',
    '{"type":"tool_call","name":"read","arguments":42}',
    '{"type":"tool_call","name":"read","arguments":true}',
    '{"type":"tool_call","name":"read","arguments":"{\\"path\\":\\"a.py\\"}"}',
  ];
  for (const shape of shapes) {
    assert.equal(
      gateCfStandaloneEnvelope(shape, GATE_TOOLS, GATE_REQUESTED),
      "missing_arguments",
      shape
    );
  }
});

test("gate: cut-off and broken documents fail with invalid_json", () => {
  const shapes = [
    '{"type": "tool_call", "name": "read", "arguments": {"path":',
    '[{"type": "tool_call", "name": "read", "arguments": {"path": "a.py"}},',
    '{"type": }',
    // The trailing-comma case is repaired to {"type": "tool_call"} which then
    // correctly fails the name gate — so a truly unrepairable one instead:
    '{"type": "tool_call", "name":',
  ];
  for (const shape of shapes) {
    assert.equal(
      gateCfStandaloneEnvelope(shape, GATE_TOOLS, GATE_REQUESTED),
      "invalid_json",
      shape
    );
  }
});

test("gate: a fenced contract envelope passes; prose-embedded ones are the parser's job", () => {
  assert.equal(
    gateCfStandaloneEnvelope(
      '```json\n{"type": "tool_call", "name": "read", "arguments": {"path": "a.py"}}\n```',
      GATE_TOOLS,
      GATE_REQUESTED
    ),
    null
  );
  assert.equal(
    gateCfStandaloneEnvelope(
      'Send {"type": "tool_call", "name": "read", "arguments": {"path": "a.py"}} when ready',
      GATE_TOOLS,
      GATE_REQUESTED
    ),
    null
  );
});

test("gate: one bad element fails the whole array even when the rest pass", () => {
  assert.equal(
    gateCfStandaloneEnvelope(
      '[{"type": "tool_call", "name": "read", "arguments": {"path": "a.py"}}, ' +
        '{"type": "tool_call", "name": "nope-not-a-tool", "arguments": {}}]',
      GATE_TOOLS,
      GATE_REQUESTED
    ),
    "invalid_name"
  );
});

// ── Adversarial retries, end to end ───────────────────────────────────────────

test('executor retries {"type":"gun"} and executes the corrected reply', async () => {
  const broken = '{"type":"gun","name":"read","arguments":{"path":"a.py"}}';
  const fixed = '{"type": "tool_call", "name": "read", "arguments": {"path": "a.py"}}';
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, broken),
    (chatId) => buildSuccessFrames(chatId, fixed),
  ]);

  const parsed = JSON.parse(await (await executor.execute(readArgs({}))).response.text()) as {
    choices: Array<{
      message: { tool_calls?: unknown[] };
      finish_reason: string;
    }>;
  };

  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls?.length, 1);
  assert.equal(rooms.length, 2, "a gun discriminator must be retried");
});

test("executor retries an envelope that dropped its type field", async () => {
  const broken = '{"name": "read", "arguments": {"path": "a.py"}}';
  const fixed = '{"type": "tool_call", "name": "read", "arguments": {"path": "a.py"}}';
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, broken),
    (chatId) => buildSuccessFrames(chatId, fixed),
  ]);

  const parsed = JSON.parse(await (await executor.execute(readArgs({}))).response.text()) as {
    choices: Array<{
      message: { tool_calls?: unknown[] };
      finish_reason: string;
    }>;
  };

  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls?.length, 1);
  assert.equal(rooms.length, 2, "a missing type must be retried");
});

test("executor retries an envelope whose _nonce is not this request's", async () => {
  const broken =
    '{"type": "tool_call", "name": "read", "arguments": {"path": "a.py"}, "_nonce": "not-this-request"}';
  const fixed = '{"type": "tool_call", "name": "read", "arguments": {"path": "a.py"}}';
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, broken),
    (chatId) => buildSuccessFrames(chatId, fixed),
  ]);

  const parsed = JSON.parse(await (await executor.execute(readArgs({}))).response.text()) as {
    choices: Array<{
      message: { tool_calls?: unknown[] };
      finish_reason: string;
    }>;
  };

  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls?.length, 1);
  assert.equal(rooms.length, 2, "a replayed nonce must be retried, not re-executed");
});

test("executor retries a botched envelope quoted inside prose", async () => {
  // Gate A only reads whole-reply JSON, so this one must be caught by the
  // intent net: the parser cannot read `type: "shell"`, and without the intent
  // check the reply would ship as prose with the failed call buried in it.
  const broken = 'Engine output: {"type":"shell","arguments":{"command":"ls"}} — what now?';
  const fixed = '{"type": "tool_call", "name": "read", "arguments": {"path": "a.py"}}';
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, broken),
    (chatId) => buildSuccessFrames(chatId, fixed),
  ]);

  const parsed = JSON.parse(await (await executor.execute(readArgs({}))).response.text()) as {
    choices: Array<{
      message: { tool_calls?: unknown[] };
      finish_reason: string;
    }>;
  };

  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls?.length, 1);
  assert.equal(rooms.length, 2, "an embedded botched envelope must be retried");
});

test("executor does not retry a capitalised but fully declared name", async () => {
  // Case resolution is the system's job — retrying `Read` would drop a call
  // the parser executes on the first attempt.
  const reply = '{"type": "tool_call", "name": "Read", "arguments": {"path": "a.py"}}';
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, reply),
  ]);

  const parsed = JSON.parse(await (await executor.execute(readArgs({}))).response.text()) as {
    choices: Array<{
      message: { tool_calls?: Array<{ function: { name: string } }> };
      finish_reason: string;
    }>;
  };

  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls?.[0].function.name, "read");
  assert.equal(rooms.length, 1, "a resolvable name must not trigger a retry");
});

test("executor treats a JSON answer as plain text — no retry", async () => {
  const reply = '{"answer": "42"}';
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, reply),
  ]);

  const parsed = JSON.parse(await (await executor.execute(readArgs({}))).response.text()) as {
    choices: Array<{
      message: { content: string | null; tool_calls?: unknown[] };
      finish_reason: string;
    }>;
  };

  assert.equal(parsed.choices[0].finish_reason, "stop");
  assert.equal(parsed.choices[0].message.content, reply);
  assert.ok(!parsed.choices[0].message.tool_calls);
  assert.equal(rooms.length, 1, "a JSON answer is not a tool envelope");
});

// ── Reasoning-channel replies ────────────────────────────────────────────────
//
// The playground decides whether a reply lands on `text-delta` or
// `reasoning-delta`, and gpt-oss-120b routinely puts the *whole* answer — tool
// call included — on the reasoning channel with an empty text channel. The
// gates used to read only `parser.text`, so those turns shipped as
// `finish_reason: "stop"` with `content: null` and the call sitting unread in
// the thinking block. Every test below therefore builds a reply whose text
// channel is empty.

/** The captured live payload (failers.txt) that motivated the channel fix. */
const FAILERS_REASONING =
  "We should inspect where FG.round_limit is defined. Search.\n" +
  '{"type":"tool_call","name":"grep","arguments":{"pattern":"round_limit","path":"/tmp/dmc5_pvp_tu6.lua","limit":20}}' +
  '{"tool_result":{"call_id":"call_2c3c3b9a","content":"Found 2 matches\\n  Line 5280: function init_fg_system()\\n"}}';

const GREP_TOOLS = [
  {
    type: "function" as const,
    function: {
      name: "grep",
      description: "Search a file",
      parameters: {
        type: "object",
        properties: {
          pattern: { type: "string" },
          path: { type: "string" },
          limit: { type: "number" },
        },
        required: ["pattern", "path"],
      },
    },
  },
];

const grepArgs = (body: Record<string, unknown>, stream = false) =>
  executeArgs(
    {
      model: "test-model",
      messages: [{ role: "user", content: "find round_limit" }],
      tools: GREP_TOOLS,
      ...body,
    },
    stream
  );

test('executor "failers.txt": a reasoning-channel fabricated tool_result retries, then fails 502', async () => {
  // Exact failure mode: call + invented grep result, both on `reasoning-delta`.
  // The model ran the tool in its head and stopped; the real grep never ran.
  const { executor, rooms } = makeSequencedExecutor(
    [(chatId) => buildSuccessFrames(chatId, "", FAILERS_REASONING)],
    2
  );

  const response = await (await executor.execute(grepArgs({}))).response;
  assert.equal(response.status, 502, "a fabricated result must never be shipped as a stop");
  const parsed = JSON.parse(await response.text()) as { error: { message: string; code: string } };
  assert.equal(parsed.error.code, "HTTP_502");
  assert.match(parsed.error.message, /last failure: fabricated_result/);
  assert.equal(rooms.length, 3, "initial + exactly maxToolRetries repairs");
});

test('executor "failers.txt": streaming emits the fabrication failure as an error chunk', async () => {
  const { executor } = makeSequencedExecutor(
    [(chatId) => buildSuccessFrames(chatId, "", FAILERS_REASONING)],
    1
  );

  const raw = await (await executor.execute(grepArgs({}, true))).response.text();
  const chunks = parseSseChunks(raw);
  const errorChunk = chunks.find((c) => c.error);

  assert.ok(errorChunk, "expected an error chunk");
  assert.equal(errorChunk.error.type, "tool_call_recovery_failed");
  assert.match(errorChunk.error.message, /fabricated_result/);
  assert.ok(
    !chunks.some((c) => c.choices?.[0]?.delta?.content),
    "the fabricated turn must not stream as content"
  );
  assert.ok(!JSON.stringify(chunks).includes("call_2c3c3b9a"), "fabricated payload never leaks");
});

test("executor reads a valid call that arrived only on the reasoning channel", async () => {
  const envelope =
    '{"type": "tool_call", "name": "grep", "arguments": {"pattern": "x", "path": "a.lua"}}';
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, "", `Let me check.\n${envelope}`),
  ]);

  const parsed = JSON.parse(await (await executor.execute(grepArgs({}))).response.text()) as {
    choices: Array<{
      message: { content: string | null; reasoning_content?: string; tool_calls?: unknown[] };
      finish_reason: string;
    }>;
  };

  const message = parsed.choices[0].message;
  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(message.tool_calls?.length, 1, "the reasoning-only call must be executed");
  assert.equal(message.content, null);
  assert.ok(
    !message.reasoning_content?.includes('"type": "tool_call"'),
    "the executed envelope must not also be replayed as thinking"
  );
  assert.equal(rooms.length, 1, "a valid reasoning-only call is not a retry");
});

test('executor treats a reasoning-channel {"type":"shell"} as wrong_type, not prose', async () => {
  const broken = '{"type":"shell","arguments":{"command":"ls -la","timeout":30000}}';
  const fixed =
    '{"type": "tool_call", "name": "grep", "arguments": {"pattern": "x", "path": "a.lua"}}';
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, "", broken),
    (chatId) => buildSuccessFrames(chatId, "", fixed),
  ]);

  const parsed = JSON.parse(await (await executor.execute(grepArgs({}))).response.text()) as {
    choices: Array<{ finish_reason: string; message: { tool_calls?: unknown[] } }>;
  };

  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls?.length, 1);
  assert.equal(rooms.length, 2, "the reasoning-channel envelope must be gated too");
});

test("executor promotes a reasoning-only prose answer to content instead of retrying", async () => {
  // A finished task that ends with a summary and no tool call is a legitimate
  // `stop`. The reasoning channel is all it has, so it must reach the client as
  // content — not be retried as an empty response, not dropped as null.
  const summary = "Done: the round counter now resets on every match.";
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, "", summary),
  ]);

  const parsed = JSON.parse(await (await executor.execute(grepArgs({}))).response.text()) as {
    choices: Array<{
      finish_reason: string;
      message: { content: string | null; reasoning_content?: string };
    }>;
  };

  assert.equal(rooms.length, 1, "prose is not a tool failure");
  assert.equal(parsed.choices[0].finish_reason, "stop");
  assert.equal(parsed.choices[0].message.content, summary);
  assert.ok(!parsed.choices[0].message.reasoning_content, "promoted reasoning is not duplicated");
});

test("executor retries a reply with no text, no reasoning and no call at all", async () => {
  const { executor, rooms } = makeSequencedExecutor(
    [(chatId) => buildSuccessFrames(chatId, "", "")],
    1
  );

  const response = await (await executor.execute(grepArgs({}))).response;
  assert.equal(response.status, 502, "a blank assistant message is not a finished turn");
  const parsed = JSON.parse(await response.text()) as { error: { message: string } };
  assert.match(parsed.error.message, /last failure: empty_response/);
  assert.equal(rooms.length, 2);
});

test("executor gates the text channel first when both channels carry a call", async () => {
  // Authoritative text: a stray tool-shaped thought in the reasoning channel
  // must never override the real answer the model actually emitted as text.
  const textCall =
    '{"type": "tool_call", "name": "grep", "arguments": {"pattern": "alpha", "path": "a.lua"}}';
  const strayCall =
    '{"type": "tool_call", "name": "grep", "arguments": {"pattern": "beta", "path": "b.lua"}}';
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, textCall, `Thinking about it: ${strayCall}`),
  ]);

  const parsed = JSON.parse(await (await executor.execute(grepArgs({}))).response.text()) as {
    choices: Array<{
      finish_reason: string;
      message: { tool_calls?: Array<{ function: { arguments: string } }> };
    }>;
  };

  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls?.length, 1, "one call, from the text channel");
  assert.equal(
    parsed.choices[0].message.tool_calls?.[0].function.arguments.includes("alpha"),
    true
  );
  assert.equal(rooms.length, 1, "no retry: the authoritative channel already answered");
});

test("a 502 recovery failure body carries no stack or upstream text", async () => {
  const { executor } = makeSequencedExecutor(
    [(chatId) => buildSuccessFrames(chatId, "<read><path>a")],
    1
  );

  const response = await (await executor.execute(readArgs({}))).response;
  const raw = await response.text();

  assert.equal(response.status, 502);
  assert.ok(!raw.includes(" at "), "no stack frames");
  assert.ok(!raw.includes("Error:"), "no raw exception wrapper");
  assert.ok(!raw.includes("<read>"), "the broken reply is not echoed back");
  const parsed = JSON.parse(raw) as { error: { message: string; type: string; code: string } };
  assert.equal(parsed.error.type, "upstream_error");
  assert.equal(parsed.error.code, "HTTP_502");
});
