import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import {
  CursorExecutor,
  newStreamCtx,
  processFrame,
  buildCursorUsage,
  formatCursorTurnMetrics,
} from "../../open-sse/executors/cursor";
import { decodeAgentServerMessage } from "../../open-sse/utils/cursorAgentProtobuf.ts";
import { resolveCursorWireConversationId } from "../../open-sse/executors/cursor/conversationId.ts";
import {
  cursorSessionManager,
  type CursorSession,
} from "../../open-sse/services/cursorSessionManager.ts";

// ─── Wire-format helpers ───────────────────────────────────────────────────

function v(n: number): Buffer {
  const out: number[] = [];
  while (n > 0x7f) {
    out.push((n & 0x7f) | 0x80);
    n >>>= 7;
  }
  out.push(n);
  return Buffer.from(out);
}
function tag(field: number, wireType: number): Buffer {
  return v((field << 3) | wireType);
}
function lenPrefixed(field: number, payload: Buffer): Buffer {
  return Buffer.concat([tag(field, 2), v(payload.length), payload]);
}
function varintField(field: number, n: number): Buffer {
  return Buffer.concat([tag(field, 0), v(n)]);
}
function doubleField(field: number, n: number): Buffer {
  const b = Buffer.alloc(8);
  b.writeDoubleLE(n);
  return Buffer.concat([tag(field, 1), b]);
}

// AgentServerMessage { interaction_update (1): { turn_ended (14): TurnEndedUpdate } }
function buildTurnEndedWithUsage(u: {
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite?: number;
  reasoning?: number;
}): Buffer {
  const teu = Buffer.concat([
    varintField(1, u.input),
    varintField(2, u.output),
    varintField(3, u.cacheRead),
    ...(u.cacheWrite ? [varintField(4, u.cacheWrite)] : []),
    ...(u.reasoning ? [varintField(5, u.reasoning)] : []),
  ]);
  return lenPrefixed(1, lenPrefixed(14, teu));
}

// AgentServerMessage { ttft_breakdown (8): TtftBreakdown (doubles) }
function buildTtftBreakdown(): Buffer {
  const tb = Buffer.concat([
    doubleField(1, 3638.5),
    doubleField(2, 451),
    doubleField(3, 103),
    doubleField(4, 1181.25),
  ]);
  return lenPrefixed(8, tb);
}

function buildTextDeltaPayload(text: string): Buffer {
  return lenPrefixed(1, lenPrefixed(1, lenPrefixed(1, Buffer.from(text, "utf8"))));
}

const SAMPLE_BODY = { messages: [{ role: "user" as const, content: "hello world" }] };

// ─── Decoder ───────────────────────────────────────────────────────────────

test("decodeAgentServerMessage reads TurnEndedUpdate token counts", () => {
  const deltas = decodeAgentServerMessage(
    buildTurnEndedWithUsage({ input: 56201, output: 64, cacheRead: 56192, reasoning: 26 })
  );
  assert.deepEqual(deltas, [
    {
      kind: "turn_ended",
      usage: {
        inputTokens: 56201,
        outputTokens: 64,
        cacheReadTokens: 56192,
        cacheWriteTokens: undefined,
        reasoningTokens: 26,
      },
    },
  ]);
});

test("decodeAgentServerMessage keeps an empty turn_ended usage-less", () => {
  const deltas = decodeAgentServerMessage(lenPrefixed(1, lenPrefixed(14, Buffer.alloc(0))));
  assert.deepEqual(deltas, [{ kind: "turn_ended" }]);
});

test("decodeAgentServerMessage reads the top-level ttft_breakdown doubles", () => {
  const deltas = decodeAgentServerMessage(buildTtftBreakdown());
  assert.deepEqual(deltas, [
    {
      kind: "ttft_breakdown",
      serverFirstTokenMs: 3638.5,
      preStreamSetupMs: 451,
      waitForFirstEventMs: 103,
      providerTtftMs: 1181.25,
      slowPoolWaitMs: 0,
    },
  ]);
});

// ─── Usage ─────────────────────────────────────────────────────────────────

test("buildCursorUsage reports Cursor's real counts, including cache reads", () => {
  const ctx = newStreamCtx("cursor-grok-4.6-medium", () => {});
  processFrame(buildTextDeltaPayload("answer"), ctx, new Set());
  processFrame(
    buildTurnEndedWithUsage({ input: 56201, output: 64, cacheRead: 56192, reasoning: 26 }),
    ctx,
    new Set()
  );
  const usage = buildCursorUsage(ctx, SAMPLE_BODY) as Record<string, unknown>;
  assert.equal(usage.prompt_tokens, 56201);
  assert.equal(usage.completion_tokens, 64);
  assert.equal(usage.total_tokens, 56265);
  assert.deepEqual(usage.prompt_tokens_details, { cached_tokens: 56192 });
  assert.deepEqual(usage.completion_tokens_details, { reasoning_tokens: 26 });
  assert.equal(usage.estimated, undefined);
});

test("buildCursorUsage surfaces cache writes as cache_creation_tokens", () => {
  const ctx = newStreamCtx("claude", () => {});
  processFrame(
    buildTurnEndedWithUsage({ input: 30000, output: 10, cacheRead: 0, cacheWrite: 26344 }),
    ctx,
    new Set()
  );
  const usage = buildCursorUsage(ctx, SAMPLE_BODY) as Record<string, unknown>;
  assert.deepEqual(usage.prompt_tokens_details, {
    cached_tokens: 0,
    cache_creation_tokens: 26344,
    cache_creation_in_prompt: true,
  });
});

test("processFrame keeps the ttft breakdown on the stream context", () => {
  const ctx = newStreamCtx("auto", () => {});
  processFrame(buildTtftBreakdown(), ctx, new Set());
  assert.equal(ctx.ttftBreakdown?.providerTtftMs, 1181.25);
  assert.equal(ctx.endReason, null);
});

// ─── Wire conversation id ──────────────────────────────────────────────────

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const turn1 = {
  messages: [
    { role: "system", content: "You are Claude Code." },
    { role: "user", content: "fix the bug" },
  ],
};
const turn2 = {
  messages: [
    ...turn1.messages,
    { role: "assistant", content: "done" },
    { role: "user", content: "now add a test" },
  ],
};

test("an explicit body.conversation_id is sent to Cursor unchanged", () => {
  assert.equal(
    resolveCursorWireConversationId({ ...turn1, conversation_id: "client-conv" }, null, "conn-a"),
    "client-conv"
  );
});

test("a client session header maps to one stable Cursor conversation id", () => {
  const headers = { "X-Claude-Code-Session-Id": "0b9d3c1e-session" };
  const a = resolveCursorWireConversationId(turn1, headers, "conn-a");
  const b = resolveCursorWireConversationId(turn2, headers, "conn-a");
  assert.match(a, UUID_RE);
  assert.equal(a, b);
  assert.ok(!a.includes("0b9d3c1e"), "the raw client session id is not forwarded");
  assert.notEqual(
    resolveCursorWireConversationId(turn1, { "x-claude-code-session-id": "other" }, "conn-a"),
    a
  );
  assert.notEqual(resolveCursorWireConversationId(turn1, headers, "conn-b"), a);
});

test("Codex's session_id header is a session identity too", () => {
  const a = resolveCursorWireConversationId(turn1, { session_id: "codex-1" }, "conn-a");
  assert.equal(resolveCursorWireConversationId(turn2, { session_id: "codex-1" }, "conn-a"), a);
});

test("without a session signal the conversation fingerprint stays stable across turns", () => {
  const a = resolveCursorWireConversationId(turn1, null, "conn-a");
  assert.match(a, UUID_RE);
  assert.equal(resolveCursorWireConversationId(turn2, {}, "conn-a"), a);
  const otherTask = {
    messages: [turn1.messages[0], { role: "user", content: "write the docs" }],
  };
  assert.notEqual(resolveCursorWireConversationId(otherTask, null, "conn-a"), a);
});

test("a body with nothing to fingerprint falls back to a random id", () => {
  const a = resolveCursorWireConversationId({}, null, "conn-a");
  const b = resolveCursorWireConversationId({}, null, "conn-a");
  assert.match(a, UUID_RE);
  assert.notEqual(a, b);
});

// ─── Per-turn metrics log ──────────────────────────────────────────────────

test("formatCursorTurnMetrics logs Cursor's TTFT split and cache usage", () => {
  const ctx = newStreamCtx("cursor-grok-4.6-medium", () => {});
  assert.equal(formatCursorTurnMetrics(ctx), null);
  processFrame(buildTtftBreakdown(), ctx, new Set());
  processFrame(
    buildTurnEndedWithUsage({ input: 56201, output: 64, cacheRead: 56192 }),
    ctx,
    new Set()
  );
  assert.equal(
    formatCursorTurnMetrics(ctx),
    "[CURSOR] cursor-grok-4.6-medium turn: server_first_token=3639ms provider_ttft=1181ms pre_stream=451ms slow_pool=0ms in=56201 cache_read=56192 out=64"
  );
});

// ─── Tool-resumed runs (turn_ended totals the whole run) ───────────────────

test("a resumed segment reports only the run usage earlier segments did not", () => {
  // Live 2026-09-28: segment 1 ended on tool_calls (no turn_ended, estimate
  // reported); segment 2's turn_ended carried the whole run's totals.
  const ctx = newStreamCtx("cursor-grok-4.6-medium", () => {});
  ctx.priorReportedUsage = { prompt: 75707, completion: 165, cached: 0 };
  processFrame(
    buildTurnEndedWithUsage({ input: 175366, output: 182, cacheRead: 116736 }),
    ctx,
    new Set()
  );
  const usage = buildCursorUsage(ctx, SAMPLE_BODY) as Record<string, unknown>;
  assert.equal(usage.prompt_tokens, 175366 - 75707);
  assert.equal(usage.completion_tokens, 17);
  assert.deepEqual(usage.prompt_tokens_details, { cached_tokens: 99659 });
  assert.deepEqual(ctx.reportedUsage, { prompt: 99659, completion: 17, cached: 99659 });
});

test("buildCursorUsage records the estimate it reported for the next segment", () => {
  const ctx = newStreamCtx("auto", () => {});
  processFrame(buildTextDeltaPayload("calling a tool"), ctx, new Set());
  const usage = buildCursorUsage(ctx, SAMPLE_BODY) as Record<string, number>;
  assert.deepEqual(ctx.reportedUsage, {
    prompt: usage.prompt_tokens,
    completion: usage.completion_tokens,
    cached: 0,
  });
});

test("an intermediate tool-resumed segment without turn_ended attributes the prior segment prompt as cached", () => {
  const seg1Body = {
    messages: [
      { role: "user" as const, content: " inspect the repository structure and run tests" },
    ],
  };
  const ctx1 = newStreamCtx("claude-opus-5-5-high", () => {});
  processFrame(buildTextDeltaPayload("calling first tool"), ctx1, new Set());
  const seg1Usage = buildCursorUsage(ctx1, seg1Body) as Record<string, number>;
  assert.ok(seg1Usage.prompt_tokens > 0);
  assert.equal(ctx1.reportedUsage?.cached, 0);

  const seg2Body = {
    messages: [
      ...seg1Body.messages,
      { role: "assistant" as const, content: "calling first tool" },
      { role: "user" as const, content: "tool output: 42 passing tests in 3 suites" },
    ],
  };
  const ctx2 = newStreamCtx("claude-opus-5-5-high", () => {});
  ctx2.priorReportedUsage = {
    prompt: ctx1.reportedUsage!.prompt,
    completion: ctx1.reportedUsage!.completion,
    cached: ctx1.reportedUsage!.cached,
    lastPrompt: ctx1.reportedUsage!.prompt,
  };
  processFrame(buildTextDeltaPayload("calling second tool"), ctx2, new Set());

  const usage2 = buildCursorUsage(ctx2, seg2Body) as Record<string, unknown>;
  assert.equal(usage2.estimated, true);
  assert.ok((usage2.prompt_tokens as number) > seg1Usage.prompt_tokens);
  assert.deepEqual(usage2.prompt_tokens_details, {
    cached_tokens: ctx1.reportedUsage!.prompt,
  });
  assert.equal(ctx2.reportedUsage?.cached, ctx1.reportedUsage!.prompt);
});

test("turn_ended subtracts the cached tokens earlier segments already reported", () => {
  const ctx = newStreamCtx("claude-opus-5-5-high", () => {});
  ctx.priorReportedUsage = { prompt: 2200, completion: 40, cached: 1000, lastPrompt: 1200 };
  processFrame(
    buildTurnEndedWithUsage({ input: 3500, output: 90, cacheRead: 2000 }),
    ctx,
    new Set()
  );
  const usage = buildCursorUsage(ctx, SAMPLE_BODY) as Record<string, unknown>;
  assert.equal(usage.prompt_tokens, 1300);
  assert.equal(usage.completion_tokens, 50);
  assert.deepEqual(usage.prompt_tokens_details, { cached_tokens: 1000 });
  assert.deepEqual(ctx.reportedUsage, { prompt: 1300, completion: 50, cached: 1000 });
});

// ─── Tool-resumed runs through the real execute() lifecycle ────────────────

function connectFrame(payload: Buffer): Buffer {
  const head = Buffer.alloc(5);
  head.writeUInt32BE(payload.length, 1);
  return Buffer.concat([head, payload]);
}

// ASM { exec_server_message (2): { id (1), mcp_args (11): { tool_name (5), tool_call_id (3) } } }
function buildExecMcp(toolCallId: string, execMsgId: number): Buffer {
  const mcpArgs = Buffer.concat([
    lenPrefixed(5, Buffer.from("read_file")),
    lenPrefixed(3, Buffer.from(toolCallId)),
  ]);
  return lenPrefixed(2, Buffer.concat([varintField(1, execMsgId), lenPrefixed(11, mcpArgs)]));
}

/** One h2 stream that releases the next segment each time the driver attaches. */
function scriptedCursorStream(segments: Buffer[]) {
  const req = Object.assign(new EventEmitter(), {
    close() {},
    pause() {},
    write: () => true,
    resume() {
      const wire = segments.shift();
      if (wire) setImmediate(() => req.emit("data", wire));
    },
  });
  const client = Object.assign(new EventEmitter(), { close() {} });
  return { status: 200, req, client, initialBytes: Buffer.alloc(0) };
}

type SegmentResult = { toolCallId?: string; usage: Record<string, unknown> };

async function readSegment(response: Response, stream: boolean): Promise<SegmentResult> {
  if (!stream) {
    const json = await response.json();
    return { toolCallId: json.choices[0].message.tool_calls?.[0]?.id, usage: json.usage };
  }
  const chunks = (await response.text())
    .split("\n")
    .filter((line) => line.startsWith("data: {"))
    .map((line) => JSON.parse(line.slice(6)));
  return {
    toolCallId: chunks.find((c) => c.choices?.[0]?.delta?.tool_calls)?.choices[0].delta
      .tool_calls[0].id,
    usage: chunks.find((c) => c.usage).usage,
  };
}

for (const stream of [false, true]) {
  test(`a retained session hands each segment's own prompt to the next one (${stream ? "SSE" : "JSON"})`, async () => {
    const conversationId = `conv-19241-${stream}`;
    const toolWire = (id: string, execMsgId: number) =>
      Buffer.concat([
        connectFrame(buildTextDeltaPayload(`calling ${id}`)),
        connectFrame(buildExecMcp(id, execMsgId)),
      ]);
    // The last segment is scripted below, once the estimates of the first three are known.
    const segments = [toolWire("call_1", 1), toolWire("call_2", 2), toolWire("call_3", 3)];
    const executor = new CursorExecutor("cursor");
    const internals = executor as unknown as {
      buildRequest: () => Promise<{ body: Buffer; blobStore: Map<string, Buffer> }>;
      openH2: () => Promise<ReturnType<typeof scriptedCursorStream>>;
    };
    let opens = 0;
    internals.buildRequest = async () => ({ body: Buffer.alloc(0), blobStore: new Map() });
    internals.openH2 = async () => {
      opens++;
      return scriptedCursorStream(segments);
    };
    const realFetch = globalThis.fetch;
    const agentUrl = Buffer.from("https://api5.cursor.sh");
    globalThis.fetch = async () =>
      new Response(
        Uint8Array.from(
          lenPrefixed(27, Buffer.concat([lenPrefixed(1, agentUrl), lenPrefixed(2, agentUrl)]))
        ).buffer
      );

    const firstPrompt = Array.from({ length: 400 }, (_, i) => `word${i}`).join(" ");
    const messages: Record<string, unknown>[] = [{ role: "user", content: firstPrompt }];
    const runSegment = async () => {
      const { response } = await executor.execute({
        model: "claude-opus-5-5-high",
        body: { messages, conversation_id: conversationId },
        stream,
        credentials: { accessToken: `synthetic-token-${stream}` },
        signal: undefined,
        upstreamExtraHeaders: undefined,
        clientHeaders: undefined,
      });
      return readSegment(response, stream);
    };
    const answerTool = (toolCallId: string | undefined) => {
      assert.ok(toolCallId, "the segment must pause on a tool call");
      messages.push(
        {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: toolCallId, type: "function", function: { name: "read_file", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: toolCallId, content: "y".repeat(800) }
      );
    };
    const retained = () =>
      (cursorSessionManager as unknown as { sessions: Map<string, CursorSession> }).sessions.get(
        conversationId
      )?.reportedUsage;

    try {
      const seg1 = await runSegment();
      const prompt1 = seg1.usage.prompt_tokens as number;
      assert.equal(seg1.usage.prompt_tokens_details, undefined);
      assert.equal(retained()?.lastPrompt, prompt1);
      assert.equal(retained()?.cached, 0);

      answerTool(seg1.toolCallId);
      const seg2 = await runSegment();
      const prompt2 = seg2.usage.prompt_tokens as number;
      assert.ok(prompt2 > prompt1);
      assert.deepEqual(seg2.usage.prompt_tokens_details, { cached_tokens: prompt1 });
      assert.equal(retained()?.prompt, prompt1 + prompt2);
      assert.equal(retained()?.lastPrompt, prompt2);

      // The cumulative prompt is larger than this segment's, so reading it instead
      // of lastPrompt would report 100% of the prompt as cached.
      answerTool(seg2.toolCallId);
      const seg3 = await runSegment();
      const prompt3 = seg3.usage.prompt_tokens as number;
      assert.ok(prompt3 > prompt2 && prompt3 < prompt1 + prompt2);
      assert.deepEqual(seg3.usage.prompt_tokens_details, { cached_tokens: prompt2 });
      assert.equal(retained()?.cached, prompt1 + prompt2);
      assert.equal(retained()?.lastPrompt, prompt3);

      // turn_ended totals the run: the segments must sum to Cursor's metering.
      const reportedPrompt = prompt1 + prompt2 + prompt3;
      const reportedCached = prompt1 + prompt2;
      const cacheRead = reportedCached + 400;
      segments.push(
        Buffer.concat([
          connectFrame(buildTextDeltaPayload("all done")),
          connectFrame(
            buildTurnEndedWithUsage({ input: reportedPrompt + 500, output: 9000, cacheRead })
          ),
        ])
      );
      answerTool(seg3.toolCallId);
      const seg4 = await runSegment();
      assert.equal(seg4.usage.prompt_tokens, 500);
      assert.deepEqual(seg4.usage.prompt_tokens_details, { cached_tokens: 400 });
      assert.equal(opens, 1, "every segment must resume the same h2 stream");
      assert.equal(retained(), undefined, "turn_ended closes the session");
    } finally {
      globalThis.fetch = realFetch;
    }
  });
}

test("a malformed or input-less TurnEndedUpdate still ends the turn", () => {
  // Truncated length-delimited field inside turn_ended.
  const broken = lenPrefixed(1, lenPrefixed(14, Buffer.from([0x0a, 0x7f])));
  assert.deepEqual(decodeAgentServerMessage(broken), [{ kind: "turn_ended" }]);
  // Output-only usage decodes, but buildCursorUsage still estimates the prompt.
  const outputOnly = lenPrefixed(1, lenPrefixed(14, varintField(2, 50)));
  const [ended] = decodeAgentServerMessage(outputOnly);
  assert.equal(ended.kind, "turn_ended");
  const ctx = newStreamCtx("auto", () => {});
  processFrame(outputOnly, ctx, new Set());
  const usage = buildCursorUsage(ctx, SAMPLE_BODY) as Record<string, unknown>;
  assert.equal(usage.completion_tokens, 50);
  assert.equal(usage.estimated, true);
});

test("an estimated prompt identifies cache creation as included", () => {
  const inputLess = lenPrefixed(
    1,
    lenPrefixed(14, Buffer.concat([varintField(2, 50), varintField(4, 300)]))
  );
  const ctx = newStreamCtx("auto", () => {});
  processFrame(inputLess, ctx, new Set());
  const usage = buildCursorUsage(ctx, SAMPLE_BODY) as Record<string, unknown>;
  assert.equal(usage.estimated, true);
  assert.deepEqual(usage.prompt_tokens_details, {
    cache_creation_tokens: 300,
    cache_creation_in_prompt: true,
  });
});

test("a malformed ttft_breakdown does not drop the co-located update", () => {
  const brokenTtft = Buffer.concat([tag(8, 2), v(2), Buffer.from([0x0a, 0x7f])]);
  const frame = Buffer.concat([brokenTtft, lenPrefixed(1, lenPrefixed(14, Buffer.alloc(0)))]);
  assert.deepEqual(decodeAgentServerMessage(frame), [{ kind: "turn_ended" }]);
});
