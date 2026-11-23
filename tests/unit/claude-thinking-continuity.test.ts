/**
 * Claude signed-thinking continuity across OpenAI Chat / Responses tool turns.
 *
 * A Claude-format upstream answering an OpenAI Chat or Responses client streams
 * `thinking_delta` + `signature_delta` (and possibly `redacted_thinking`) before a
 * `tool_use`. The client only receives reasoning text, so on the next tool-loop turn
 * openai-to-claude used to send a `redacted_thinking` placeholder (#5312) or nothing:
 * the model lost its own signed reasoning. The response translator now remembers the
 * exact signed blocks per tool_use id (claudeThinkingStore) and the request translator
 * restores them before the owning tool_use — bound to the same provider + model.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIResponse } =
  await import("../../open-sse/translator/response/claude-to-openai.ts");
const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");
const { translateRequest, translateResponse, initState } =
  await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { DEFAULT_THINKING_CLAUDE_SIGNATURE } =
  await import("../../open-sse/config/defaultThinkingSignature.ts");
const store = await import("../../open-sse/services/claudeThinkingStore.ts");
const { stripHistoricalThinkingForSignatureRecovery } =
  await import("../../open-sse/handlers/chatCore/passthroughHelpers.ts");

const MODEL = "claude-sonnet-4-5-20250929";
const THINKING_TEXT = "I should read the file first, then decide.";
const SIGNATURE = "EqQBCkYIBhgCKkA_real_signature_part1_part2";

type Block = Record<string, unknown>;
type ClaudeMessage = { role: string; content: Block[] };

function claudeToolTurnEvents({
  toolUseId = "toolu_01ABC",
  model = MODEL,
  withSignature = true,
  withRedacted = false,
  thinkingText = THINKING_TEXT,
}: {
  toolUseId?: string;
  model?: string;
  withSignature?: boolean;
  withRedacted?: boolean;
  thinkingText?: string;
} = {}) {
  const half = Math.floor(thinkingText.length / 2);
  const events: Block[] = [
    { type: "message_start", message: { id: "msg_1", model, usage: { input_tokens: 10 } } },
    { type: "content_block_start", index: 0, content_block: { type: "thinking", thinking: "" } },
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "thinking_delta", thinking: thinkingText.slice(0, half) },
    },
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "thinking_delta", thinking: thinkingText.slice(half) },
    },
  ];
  if (withSignature) {
    events.push(
      {
        type: "content_block_delta",
        index: 0,
        delta: { type: "signature_delta", signature: SIGNATURE.slice(0, 20) },
      },
      {
        type: "content_block_delta",
        index: 0,
        delta: { type: "signature_delta", signature: SIGNATURE.slice(20) },
      }
    );
  }
  events.push({ type: "content_block_stop", index: 0 });
  let next = 1;
  if (withRedacted) {
    events.push(
      {
        type: "content_block_start",
        index: next,
        content_block: { type: "redacted_thinking", data: "REDACTED_OPAQUE_DATA" },
      },
      { type: "content_block_stop", index: next }
    );
    next += 1;
  }
  events.push(
    {
      type: "content_block_start",
      index: next,
      content_block: { type: "tool_use", id: toolUseId, name: "read_file", input: {} },
    },
    {
      type: "content_block_delta",
      index: next,
      delta: { type: "input_json_delta", partial_json: '{"path":"a.ts"}' },
    },
    { type: "content_block_stop", index: next },
    {
      type: "message_delta",
      delta: { stop_reason: "tool_use" },
      usage: { output_tokens: 42 },
    },
    { type: "message_stop" }
  );
  return events;
}

function streamClaudeToChat(events: Block[], provider = "claude") {
  const state: Record<string, unknown> = {
    ...(initState(FORMATS.OPENAI) as Record<string, unknown>),
    provider,
    toolNameMap: new Map(),
  };
  const chunks: unknown[] = [];
  for (const event of events) {
    const out = claudeToOpenAIResponse(event, state);
    if (Array.isArray(out)) chunks.push(...out);
  }
  return chunks;
}

function chatHistory(toolUseId = "toolu_01ABC"): Block[] {
  return [
    { role: "user", content: "Read a.ts" },
    {
      role: "assistant",
      content: null,
      reasoning_content: THINKING_TEXT,
      tool_calls: [
        {
          id: toolUseId,
          type: "function",
          function: { name: "read_file", arguments: '{"path":"a.ts"}' },
        },
      ],
    },
    { role: "tool", tool_call_id: toolUseId, content: "export const a = 1;" },
  ];
}

function translateChatTurn(
  messages: Block[],
  { model = MODEL, provider = "claude", reasoningEffort = "high" as string | null } = {}
) {
  return openaiToClaudeRequest(
    model,
    {
      messages,
      ...(reasoningEffort ? { reasoning_effort: reasoningEffort } : {}),
      tools: [
        {
          type: "function",
          function: { name: "read_file", parameters: { type: "object", properties: {} } },
        },
      ],
    },
    true,
    { _provider: provider }
  ) as { messages: ClaudeMessage[] };
}

function assistantTurn(body: { messages: ClaudeMessage[] }): ClaudeMessage {
  const turn = body.messages.find((message) => message.role === "assistant");
  assert.ok(turn, "translated request has an assistant turn");
  return turn;
}

function stripCacheControl(block: Block): Block {
  const { cache_control: _ignored, ...rest } = block;
  return rest;
}

test.beforeEach(() => {
  store.clearClaudeThinkingStore();
});

test("Chat client: signed thinking from the Claude stream is restored before the owning tool_use", () => {
  streamClaudeToChat(claudeToolTurnEvents());

  const turn = assistantTurn(translateChatTurn(chatHistory()));
  assert.deepEqual(stripCacheControl(turn.content[0]), {
    type: "thinking",
    thinking: THINKING_TEXT,
    signature: SIGNATURE,
  });
  assert.equal(turn.content[1].type, "tool_use");
  assert.equal(turn.content[1].id, "toolu_01ABC");
  assert.equal(
    turn.content.some(
      (block) =>
        block.type === "redacted_thinking" && block.data === DEFAULT_THINKING_CLAUDE_SIGNATURE
    ),
    false,
    "no #5312 placeholder when the real signed block was restored"
  );
});

test("Chat client: interleaved thinking + redacted_thinking keep their exact order", () => {
  streamClaudeToChat(claudeToolTurnEvents({ withRedacted: true }));

  const turn = assistantTurn(translateChatTurn(chatHistory()));
  assert.deepEqual(turn.content.slice(0, 2).map(stripCacheControl), [
    { type: "thinking", thinking: THINKING_TEXT, signature: SIGNATURE },
    { type: "redacted_thinking", data: "REDACTED_OPAQUE_DATA" },
  ]);
  assert.equal(turn.content[2].type, "tool_use");
});

test("the stream output itself is unchanged (no signature leaks to the client)", () => {
  const chunks = streamClaudeToChat(claudeToolTurnEvents());
  const serialized = JSON.stringify(chunks);
  assert.equal(serialized.includes(SIGNATURE), false);
  assert.equal(serialized.includes("signature"), false);
});

test("Responses client: end-to-end claude→responses stream then responses→claude request restores the block", () => {
  const state: Record<string, unknown> = {
    ...(initState(FORMATS.OPENAI_RESPONSES) as Record<string, unknown>),
    provider: "claude",
    toolNameMap: new Map(),
  };
  for (const event of claudeToolTurnEvents({ toolUseId: "toolu_02RESP" })) {
    translateResponse(FORMATS.CLAUDE, FORMATS.OPENAI_RESPONSES, event, state);
  }
  translateResponse(FORMATS.CLAUDE, FORMATS.OPENAI_RESPONSES, null, state);

  const body = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    MODEL,
    {
      model: MODEL,
      reasoning: { effort: "high" },
      input: [
        { type: "message", role: "user", content: [{ type: "input_text", text: "Read a.ts" }] },
        {
          type: "reasoning",
          id: "rs_1",
          summary: [{ type: "summary_text", text: THINKING_TEXT }],
        },
        {
          type: "function_call",
          call_id: "toolu_02RESP",
          name: "read_file",
          arguments: '{"path":"a.ts"}',
        },
        { type: "function_call_output", call_id: "toolu_02RESP", output: "export const a = 1;" },
      ],
      tools: [
        { type: "function", name: "read_file", parameters: { type: "object", properties: {} } },
      ],
    },
    true,
    null,
    "claude"
  ) as { messages: ClaudeMessage[]; thinking?: unknown };

  assert.ok(body.thinking, "precondition: thinking is enabled for the outbound request");
  const turn = assistantTurn(body);
  assert.deepEqual(stripCacheControl(turn.content[0]), {
    type: "thinking",
    thinking: THINKING_TEXT,
    signature: SIGNATURE,
  });
  const toolUse = turn.content.find((block) => block.type === "tool_use");
  assert.equal(toolUse?.id, "toolu_02RESP");
});

test("different model: nothing is restored (falls back to the #5312 placeholder)", () => {
  streamClaudeToChat(claudeToolTurnEvents());

  const turn = assistantTurn(translateChatTurn(chatHistory(), { model: "claude-opus-4-5" }));
  assert.equal(
    turn.content.some((block) => block.type === "thinking"),
    false
  );
  assert.deepEqual(stripCacheControl(turn.content[0]), {
    type: "redacted_thinking",
    data: DEFAULT_THINKING_CLAUDE_SIGNATURE,
  });
});

test("dated response model vs undated request alias still binds to the same model", () => {
  streamClaudeToChat(claudeToolTurnEvents());

  const turn = assistantTurn(translateChatTurn(chatHistory(), { model: "claude-sonnet-4-5" }));
  assert.equal(turn.content[0].type, "thinking");
  assert.equal(turn.content[0].signature, SIGNATURE);
});

test("different provider: nothing is restored", () => {
  streamClaudeToChat(claudeToolTurnEvents());

  const turn = assistantTurn(
    translateChatTurn(chatHistory(), { provider: "anthropic-compatible-other" })
  );
  assert.equal(
    turn.content.some((block) => block.type === "thinking"),
    false
  );
});

test("unknown / tampered tool_call id restores nothing", () => {
  streamClaudeToChat(claudeToolTurnEvents());

  const turn = assistantTurn(translateChatTurn(chatHistory("toolu_TAMPERED")));
  assert.equal(
    turn.content.some((block) => block.type === "thinking"),
    false
  );
});

test("thinking disabled for the outbound request: nothing is restored", () => {
  streamClaudeToChat(claudeToolTurnEvents());

  const turn = assistantTurn(translateChatTurn(chatHistory(), { reasoningEffort: null }));
  assert.equal(
    turn.content.some((block) => block.type === "thinking" || block.type === "redacted_thinking"),
    false
  );
});

test("assistant turn without tool_calls restores nothing", () => {
  streamClaudeToChat(claudeToolTurnEvents());

  const turn = assistantTurn(
    translateChatTurn([
      { role: "user", content: "hi" },
      { role: "assistant", content: "hello", reasoning_content: THINKING_TEXT },
      { role: "user", content: "again" },
    ])
  );
  assert.deepEqual(
    turn.content.map((block) => block.type),
    ["text"]
  );
});

test("unsigned thinking (no signature_delta) is never stored", () => {
  streamClaudeToChat(claudeToolTurnEvents({ withSignature: false }));
  assert.equal(store.getClaudeThinkingStoreSizeForTests(), 0);
});

test("oversized thinking is never stored", () => {
  streamClaudeToChat(
    claudeToolTurnEvents({
      thinkingText: "x".repeat(store.MAX_CLAUDE_THINKING_ENTRY_CHARS + 1),
    })
  );
  assert.equal(store.getClaudeThinkingStoreSizeForTests(), 0);
});

test("a client-supplied signed thinking block wins over the stored one (no duplication)", () => {
  streamClaudeToChat(claudeToolTurnEvents());

  const messages = chatHistory();
  messages[1] = {
    role: "assistant",
    content: [{ type: "thinking", thinking: "client copy", signature: "CLIENT_SIG" }],
    tool_calls: (messages[1] as { tool_calls: unknown }).tool_calls,
  };
  const turn = assistantTurn(translateChatTurn(messages));
  const thinkingBlocks = turn.content.filter((block) => block.type === "thinking");
  assert.equal(thinkingBlocks.length, 1);
  assert.equal(thinkingBlocks[0].signature, "CLIENT_SIG");
});

test("expired entries are not restored", () => {
  streamClaudeToChat(claudeToolTurnEvents());
  const realNow = Date.now;
  try {
    const later = realNow() + store.CLAUDE_THINKING_MEMORY_TTL_MS + 1;
    Date.now = () => later;
    assert.equal(
      store.restoreClaudeThinkingBlocks({
        toolUseIds: ["toolu_01ABC"],
        provider: "claude",
        model: MODEL,
      }),
      null
    );
  } finally {
    Date.now = realNow;
  }
});

test("signature recovery downgrades a server-restored block in the active cycle and forgets it", () => {
  streamClaudeToChat(claudeToolTurnEvents());
  const body = translateChatTurn(chatHistory());
  assert.equal(assistantTurn(body).content[0].type, "thinking");

  const recovered = stripHistoricalThinkingForSignatureRecovery(body) as {
    messages: ClaudeMessage[];
  };
  assert.notEqual(recovered, body, "recovery produces a new body");
  const turn = assistantTurn(recovered);
  assert.deepEqual(stripCacheControl(turn.content[0]), {
    type: "redacted_thinking",
    data: DEFAULT_THINKING_CLAUDE_SIGNATURE,
  });
  assert.equal(
    turn.content.some((block) => block.type === "thinking"),
    false
  );
  assert.equal(
    store.restoreClaudeThinkingBlocks({
      toolUseIds: ["toolu_01ABC"],
      provider: "claude",
      model: MODEL,
    }),
    null,
    "the rejected signature is not replayed again"
  );
});

const { translateNonStreamingClientResponse } =
  await import("../../open-sse/handlers/chatCore/nonStreamingClientTranslate.ts");

function claudeNonStreamBody(toolUseId = "toolu_03NS") {
  return {
    id: "msg_ns",
    type: "message",
    role: "assistant",
    model: MODEL,
    stop_reason: "tool_use",
    content: [
      { type: "thinking", thinking: THINKING_TEXT, signature: SIGNATURE },
      { type: "tool_use", id: toolUseId, name: "read_file", input: { path: "a.ts" } },
    ],
    usage: { input_tokens: 10, output_tokens: 20 },
  };
}

function nonStreamInput(overrides: Record<string, unknown> = {}) {
  return {
    responseBody: claudeNonStreamBody(),
    responsePayloadFormat: FORMATS.CLAUDE,
    clientResponseFormat: FORMATS.OPENAI,
    sourceFormat: FORMATS.OPENAI,
    provider: "claude",
    model: MODEL,
    requestBody: { messages: [] },
    responseToolNameMap: null,
    requestToolIdentityMap: null,
    reasoningCacheScope: null,
    clientHeaders: null,
    isClaudeCodeCompatible: false,
    phase: "final" as const,
    ...overrides,
  };
}

test("non-streaming Claude response: signed thinking is stored and restored next turn", () => {
  const { response } = translateNonStreamingClientResponse(nonStreamInput());
  assert.equal(
    JSON.stringify(response).includes(SIGNATURE),
    false,
    "the client response never carries the signature"
  );

  const turn = assistantTurn(translateChatTurn(chatHistory("toolu_03NS")));
  assert.deepEqual(stripCacheControl(turn.content[0]), {
    type: "thinking",
    thinking: THINKING_TEXT,
    signature: SIGNATURE,
  });
});

test("non-streaming video-transcript-sensitive response is never retained", () => {
  translateNonStreamingClientResponse(nonStreamInput({ videoTranscriptSensitive: true }));
  assert.equal(store.getClaudeThinkingStoreSizeForTests(), 0);
});

test("video-transcript-sensitive request never replays stored thinking", () => {
  streamClaudeToChat(claudeToolTurnEvents());

  const body = translateRequest(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    MODEL,
    { model: MODEL, messages: chatHistory(), reasoning_effort: "high" },
    true,
    null,
    "claude",
    null,
    { videoTranscriptSensitive: true }
  ) as { messages: ClaudeMessage[] };
  assert.equal(
    assistantTurn(body).content.some((block) => block.type === "thinking"),
    false
  );
});

test("forgetClaudeThinkingForClientResponse drops entries for Chat and Responses bodies", () => {
  streamClaudeToChat(claudeToolTurnEvents({ toolUseId: "toolu_chat" }));
  streamClaudeToChat(claudeToolTurnEvents({ toolUseId: "toolu_resp" }));
  assert.equal(store.getClaudeThinkingStoreSizeForTests(), 2);

  store.forgetClaudeThinkingForClientResponse({
    choices: [{ message: { tool_calls: [{ id: "toolu_chat" }] } }],
  });
  assert.equal(store.getClaudeThinkingStoreSizeForTests(), 1);
  store.forgetClaudeThinkingForClientResponse({
    output: [{ type: "function_call", call_id: "toolu_resp" }],
  });
  assert.equal(store.getClaudeThinkingStoreSizeForTests(), 0);
});
