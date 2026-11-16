import test from "node:test";
import assert from "node:assert/strict";

const store = await import("../../open-sse/services/claudeThinkingStore.ts");
const { createSSETransformStreamWithLogger } = await import("../../open-sse/utils/stream.ts");
const { translateNonStreamingClientResponse } =
  await import("../../open-sse/handlers/chatCore/nonStreamingClientTranslate.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const MODEL = "claude-sonnet-4-5";
const CONN = "conn-caps";
// The documented per-session caps (docs/reference/ENVIRONMENT.md): 256 turns, 512 blocks, 16 MiB.
const TURNS = 256;
const BLOCKS = 512;
const CHARS = 16 * 1024 * 1024;

type Block = Record<string, unknown>;
const signed = (tag: string, size = 8): Block => ({
  type: "thinking",
  thinking: "t".repeat(size),
  signature: `sig-${tag}`,
});
const toolUse = (id: string): Block => ({ type: "tool_use", id, name: "read", input: {} });

/** Store one assistant turn: one signed block before each tool_use id. */
function storeTurn(ids: string[], session: string | null, size = 8) {
  return store.storeClaudeThinkingBlocks({
    content: ids.flatMap((id) => [signed(id, size), toolUse(id)]),
    provider: "claude",
    model: MODEL,
    connectionId: CONN,
    ...(session === null ? {} : { sessionKey: session }),
  });
}
const restorable = (id: string) =>
  store.restoreClaudeThinkingBlocks({
    toolUseIds: [id],
    provider: "claude",
    model: MODEL,
    connectionId: CONN,
  }) !== null;
const countAlive = (prefix: string, n: number) =>
  Array.from({ length: n }, (_, i) => `${prefix}${i}`).filter(restorable).length;

test.beforeEach(() => {
  delete process.env.CLAUDE_THINKING_SESSION_CAPS;
  store.clearClaudeThinkingStore();
});
test.after(() => {
  delete process.env.CLAUDE_THINKING_SESSION_CAPS;
  store.clearClaudeThinkingStore();
});

test("flag on: a session keeps at most its turn cap; the oldest turns go first", () => {
  process.env.CLAUDE_THINKING_SESSION_CAPS = "true";
  for (let i = 0; i < TURNS + 6; i++) storeTurn([`a${i}`], "session-a");
  assert.equal(countAlive("a", TURNS + 6), TURNS);
  assert.equal(restorable("a0"), false, "the oldest turn is evicted");
  assert.equal(restorable(`a${TURNS + 5}`), true, "the newest turn stays");
});

test("flag on: a runaway session does not evict another session's turn", () => {
  process.env.CLAUDE_THINKING_SESSION_CAPS = "true";
  storeTurn(["b0"], "session-b");
  // More turns than the 1000-turn global cap: without per-session caps, b0 is the oldest and goes.
  for (let i = 0; i < 1100; i++) storeTurn([`a${i}`], "session-a");
  assert.equal(restorable("b0"), true);
});

test("flag on: eviction removes a whole turn, never one of its tool_use ids", () => {
  process.env.CLAUDE_THINKING_SESSION_CAPS = "true";
  storeTurn(["multi-1", "multi-2", "multi-3"], "session-a");
  for (let i = 0; i < TURNS; i++) storeTurn([`a${i}`], "session-a");
  assert.deepEqual(["multi-1", "multi-2", "multi-3"].map(restorable), [false, false, false]);
});

test("flag on: the global cap evicts a whole turn, never one tool_use id of it", () => {
  process.env.CLAUDE_THINKING_SESSION_CAPS = "true";
  storeTurn(["multi-1", "multi-2", "multi-3"], "session-m");
  // 3 + 998 ids = 1001: one over the 1000-id global cap, so the cut falls inside the oldest turn.
  for (let i = 0; i < 998; i++) storeTurn([`g${i}`], `session-${i % 4}`);
  assert.deepEqual(["multi-1", "multi-2", "multi-3"].map(restorable), [false, false, false]);
});

test("flag on: a session keeps at most its block cap", () => {
  process.env.CLAUDE_THINKING_SESSION_CAPS = "true";
  const perTurn = 16;
  const turns = BLOCKS / perTurn + 4;
  for (let i = 0; i < turns; i++) {
    storeTurn(
      Array.from({ length: perTurn }, (_, k) => `blk${i}-${k}`),
      "session-a"
    );
  }
  const alive = Array.from({ length: turns }, (_, i) => restorable(`blk${i}-0`)).filter(Boolean);
  assert.equal(alive.length, BLOCKS / perTurn);
  assert.equal(restorable("blk0-0"), false);
  assert.equal(restorable(`blk${turns - 1}-0`), true);
});

test("flag on: a session keeps at most its byte cap", () => {
  process.env.CLAUDE_THINKING_SESSION_CAPS = "true";
  const size = 1024 * 1024;
  const fit = Math.floor(CHARS / (size + 12));
  for (let i = 0; i < fit + 4; i++) storeTurn([`big${i}`], "session-a", size);
  assert.equal(countAlive("big", fit + 4), fit);
  assert.equal(restorable("big0"), false);
});

test("flag off: the session key changes nothing (today's behaviour)", () => {
  for (let i = 0; i < TURNS + 6; i++) storeTurn([`a${i}`], "session-a");
  assert.equal(countAlive("a", TURNS + 6), TURNS + 6);
});

test("flag on, no session key: only the global caps apply", () => {
  process.env.CLAUDE_THINKING_SESSION_CAPS = "true";
  for (let i = 0; i < TURNS + 6; i++) storeTurn([`a${i}`], null);
  assert.equal(countAlive("a", TURNS + 6), TURNS + 6);
});

/** One Claude tool turn (signed thinking + tool_use) as raw SSE. */
function claudeToolTurnSse(id: string): string {
  const events: Block[] = [
    { type: "message_start", message: { id: `m-${id}`, model: MODEL, usage: {} } },
    { type: "content_block_start", index: 0, content_block: { type: "thinking", thinking: "" } },
    { type: "content_block_delta", index: 0, delta: { type: "thinking_delta", thinking: "why" } },
    { type: "content_block_delta", index: 0, delta: { type: "signature_delta", signature: id } },
    { type: "content_block_stop", index: 0 },
    {
      type: "content_block_start",
      index: 1,
      content_block: { type: "tool_use", id, name: "read", input: {} },
    },
    { type: "content_block_stop", index: 1 },
    { type: "message_delta", delta: { stop_reason: "tool_use" }, usage: {} },
    { type: "message_stop" },
  ];
  return events.map((e) => `event: ${e.type}\ndata: ${JSON.stringify(e)}\n\n`).join("");
}

async function streamTurn(id: string, sessionKey: string) {
  const transform = createSSETransformStreamWithLogger(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    "claude",
    null,
    null,
    MODEL,
    CONN,
    { model: MODEL, stream: true },
    null,
    null,
    null,
    false,
    false,
    undefined,
    new Set<string>(),
    null,
    null,
    undefined,
    null,
    sessionKey
  );
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const drained = (async () => {
    while (!(await reader.read()).done);
  })();
  await writer.write(new TextEncoder().encode(claudeToolTurnSse(id)));
  await writer.close();
  await drained;
}

test("flag on: the stream transform passes its session key to the store", async () => {
  process.env.CLAUDE_THINKING_SESSION_CAPS = "true";
  for (let i = 0; i < TURNS + 3; i++) await streamTurn(`s${i}`, "session-stream");
  assert.equal(countAlive("s", TURNS + 3), TURNS);
});

test("flag on: the non-streaming translator passes its session key to the store", () => {
  process.env.CLAUDE_THINKING_SESSION_CAPS = "true";
  for (let i = 0; i < TURNS + 3; i++) {
    translateNonStreamingClientResponse({
      responseBody: {
        id: `msg_${i}`,
        type: "message",
        role: "assistant",
        model: MODEL,
        stop_reason: "tool_use",
        content: [signed(`n${i}`), toolUse(`n${i}`)],
        usage: { input_tokens: 1, output_tokens: 1 },
      },
      responsePayloadFormat: FORMATS.CLAUDE,
      clientResponseFormat: FORMATS.OPENAI,
      sourceFormat: FORMATS.OPENAI,
      provider: "claude",
      model: MODEL,
      connectionId: CONN,
      requestBody: { messages: [] },
      responseToolNameMap: null,
      requestToolIdentityMap: null,
      reasoningCacheScope: "api-key:k1\x1fsession-ns",
      clientHeaders: null,
      isClaudeCodeCompatible: false,
      phase: "final" as const,
    });
  }
  assert.equal(countAlive("n", TURNS + 3), TURNS);
});
