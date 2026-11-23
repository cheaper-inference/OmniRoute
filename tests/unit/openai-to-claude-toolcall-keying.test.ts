/**
 * OpenAI → Claude streaming tool-call fidelity.
 *
 * The OpenAI streaming schema keys tool-call fragments by `index`, makes `id`
 * optional and lets providers reuse an index. The Claude translator used to key
 * strictly by `index` and only open a block on a fragment that carried an `id`:
 *   - a second call with a NEW id on an already-used index was merged into the
 *     first (`{...}{...}` arguments, the second tool_use never emitted);
 *   - an id-less call (name + arguments, no id) was dropped entirely;
 *   - arguments that arrived before the id/name fragment were dropped.
 * A stream that ended without any finish_reason left the Claude client with no
 * terminal event at all; it now ends with an explicit `error` event (a visible
 * truncation) instead of a fabricated `end_turn`.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { openaiToClaudeResponse } from "../../open-sse/translator/response/openai-to-claude.ts";
import { initState } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";

interface ClaudeEvent {
  type?: string;
  index?: number;
  content_block?: { type?: string; id?: string; name?: string };
  delta?: { type?: string; partial_json?: string; stop_reason?: string };
  error?: { type?: string; message?: string };
}

interface TranslatorState {
  toolCalls: Map<unknown, unknown>;
  upstreamError?: { status?: number; code?: string; message?: string };
}

function createState(): TranslatorState {
  return { toolCalls: new Map() };
}

function toolChunk(toolCalls: unknown[], finishReason: string | null = null) {
  return {
    id: "chatcmpl-keying-probe",
    model: "test-model",
    choices: [{ index: 0, delta: { tool_calls: toolCalls }, finish_reason: finishReason }],
  };
}

function run(chunks: unknown[], state = createState()): ClaudeEvent[] {
  const out: ClaudeEvent[] = [];
  for (const c of chunks) {
    const r = openaiToClaudeResponse(c, state);
    if (r) out.push(...r);
  }
  const flushed = openaiToClaudeResponse(null, state);
  if (flushed) out.push(...flushed);
  return out;
}

function toolUseStarts(events: ClaudeEvent[]) {
  return events.filter(
    (e) => e.type === "content_block_start" && e.content_block?.type === "tool_use"
  );
}

/** Concatenated input_json_delta text per block index. */
function inputJsonByBlock(events: ClaudeEvent[]): Map<number, string> {
  const map = new Map<number, string>();
  for (const e of events) {
    if (e.type === "content_block_delta" && e.delta?.type === "input_json_delta") {
      map.set(e.index, (map.get(e.index) || "") + e.delta.partial_json);
    }
  }
  return map;
}

test("a new id reusing an occupied index opens a second tool_use instead of merging args", () => {
  const events = run([
    toolChunk([{ index: 0, id: "call_a", function: { name: "Bash", arguments: "" } }]),
    toolChunk([{ index: 0, function: { arguments: '{"command":"ls"}' } }]),
    toolChunk([{ index: 0, id: "call_b", function: { name: "Grep", arguments: "" } }]),
    toolChunk([{ index: 0, function: { arguments: '{"pattern":"x"}' } }]),
    toolChunk([], "tool_calls"),
  ]);

  const starts = toolUseStarts(events);
  assert.equal(starts.length, 2);
  assert.deepEqual(
    starts.map((s) => s.content_block.id),
    ["call_a", "call_b"]
  );
  assert.deepEqual(
    starts.map((s) => s.content_block.name),
    ["Bash", "Grep"]
  );
  assert.notEqual(starts[0].index, starts[1].index);

  const args = inputJsonByBlock(events);
  // The id-less continuation after the remap lands on the NEW block.
  assert.deepEqual(JSON.parse(args.get(starts[0].index) || ""), { command: "ls" });
  assert.deepEqual(JSON.parse(args.get(starts[1].index) || ""), { pattern: "x" });
  for (const json of args.values()) assert.doesNotMatch(json, /\}\s*\{/);

  const stops = events.filter((e) => e.type === "content_block_stop").map((e) => e.index);
  assert.ok(stops.includes(starts[0].index));
  assert.ok(stops.includes(starts[1].index));
  assert.equal(events.at(-1)?.type, "message_stop");
});

test("an id-less call with a different name on a non-empty index opens a new tool_use", () => {
  const events = run([
    toolChunk([
      { index: 0, id: "call_a", function: { name: "Bash", arguments: '{"command":"ls"}' } },
    ]),
    toolChunk([{ index: 0, function: { name: "Grep", arguments: '{"pattern":"y"}' } }]),
    toolChunk([], "tool_calls"),
  ]);

  const starts = toolUseStarts(events);
  assert.equal(starts.length, 2);
  assert.equal(starts[1].content_block.name, "Grep");
  assert.ok(starts[1].content_block.id, "the id-less call gets a synthetic id");
  assert.notEqual(starts[1].content_block.id, "call_a");
  const args = inputJsonByBlock(events);
  assert.deepEqual(JSON.parse(args.get(starts[0].index) || ""), { command: "ls" });
  assert.deepEqual(JSON.parse(args.get(starts[1].index) || ""), { pattern: "y" });
});

test("a repeated id on every argument chunk (GLM/fireworks) stays one tool_use", () => {
  const events = run([
    toolChunk([{ index: 0, id: "call_glm", function: { name: "Bash", arguments: "" } }]),
    toolChunk([{ index: 0, id: "call_glm", function: { arguments: '{"command":' } }]),
    toolChunk([{ index: 0, id: "call_glm", function: { arguments: '"pwd"}' } }]),
    toolChunk([], "tool_calls"),
  ]);
  const starts = toolUseStarts(events);
  assert.equal(starts.length, 1);
  assert.deepEqual(JSON.parse(inputJsonByBlock(events).get(starts[0].index) || ""), {
    command: "pwd",
  });
});

test("parallel calls on distinct indices keep separate blocks (regression guard)", () => {
  const events = run([
    toolChunk([
      { index: 0, id: "call_a", function: { name: "Bash", arguments: '{"command":"ls"}' } },
      { index: 1, id: "call_b", function: { name: "Grep", arguments: '{"pattern":"z"}' } },
    ]),
    toolChunk([], "tool_calls"),
  ]);
  const starts = toolUseStarts(events);
  assert.equal(starts.length, 2);
  assert.deepEqual(
    starts.map((s) => s.content_block.id),
    ["call_a", "call_b"]
  );
});

test("an id-less tool call (name + arguments, no id) is emitted with a synthetic id", () => {
  const events = run([
    toolChunk([{ index: 0, function: { name: "Bash", arguments: '{"command":"ls"}' } }]),
    toolChunk([], "tool_calls"),
  ]);
  const starts = toolUseStarts(events);
  assert.equal(starts.length, 1);
  assert.equal(starts[0].content_block.name, "Bash");
  assert.equal(typeof starts[0].content_block.id, "string");
  assert.ok(starts[0].content_block.id.length > 0);
  assert.match(starts[0].content_block.id, /^[a-zA-Z0-9_-]+$/);
  assert.deepEqual(JSON.parse(inputJsonByBlock(events).get(starts[0].index) || ""), {
    command: "ls",
  });
  const delta = events.find((e) => e.type === "message_delta");
  assert.equal(delta?.delta?.stop_reason, "tool_use");
});

test("two id-less calls get distinct synthetic ids", () => {
  const events = run([
    toolChunk([
      { index: 0, function: { name: "Bash", arguments: '{"command":"ls"}' } },
      { index: 1, function: { name: "Bash", arguments: '{"command":"pwd"}' } },
    ]),
    toolChunk([], "tool_calls"),
  ]);
  const ids = toolUseStarts(events).map((s) => s.content_block.id);
  assert.equal(ids.length, 2);
  assert.notEqual(ids[0], ids[1]);
});

test("arguments that arrive before the id/name fragment are replayed into the block", () => {
  const events = run([
    toolChunk([{ index: 0, function: { arguments: '{"command":' } }]),
    toolChunk([{ index: 0, id: "call_late", function: { name: "Bash" } }]),
    toolChunk([{ index: 0, function: { arguments: '"ls"}' } }]),
    toolChunk([], "tool_calls"),
  ]);
  const starts = toolUseStarts(events);
  assert.equal(starts.length, 1);
  assert.equal(starts[0].content_block.id, "call_late");
  assert.equal(starts[0].content_block.name, "Bash");
  assert.deepEqual(JSON.parse(inputJsonByBlock(events).get(starts[0].index) || ""), {
    command: "ls",
  });
});

test("a late real id replaces the synthetic id while the block is still unopened", () => {
  const events = run([
    toolChunk([{ index: 0, function: { arguments: '{"a":1}' } }]),
    toolChunk([{ index: 0, id: "call_real" }]),
    toolChunk([{ index: 0, function: { name: "Bash" } }]),
    toolChunk([], "tool_calls"),
  ]);
  const starts = toolUseStarts(events);
  assert.equal(starts.length, 1);
  assert.equal(starts[0].content_block.id, "call_real");
});

test("Read path/filePath aliases are normalized to file_path; file_path wins", () => {
  const aliased = run([
    toolChunk([
      { index: 0, id: "call_r", function: { name: "Read", arguments: '{"path":"/a.txt"}' } },
    ]),
    toolChunk([], "tool_calls"),
  ]);
  const aliasedArgs = JSON.parse(
    inputJsonByBlock(aliased).get(toolUseStarts(aliased)[0].index) || ""
  );
  assert.equal(aliasedArgs.file_path, "/a.txt");
  assert.equal("path" in aliasedArgs, false);

  const camel = run([
    toolChunk([
      { index: 0, id: "call_r2", function: { name: "Read", arguments: '{"filePath":"/b.txt"}' } },
    ]),
    toolChunk([], "tool_calls"),
  ]);
  const camelArgs = JSON.parse(inputJsonByBlock(camel).get(toolUseStarts(camel)[0].index) || "");
  assert.equal(camelArgs.file_path, "/b.txt");
  assert.equal("filePath" in camelArgs, false);

  const both = run([
    toolChunk([
      {
        index: 0,
        id: "call_r3",
        function: { name: "Read", arguments: '{"file_path":"/real","path":"/other"}' },
      },
    ]),
    toolChunk([], "tool_calls"),
  ]);
  const bothArgs = JSON.parse(inputJsonByBlock(both).get(toolUseStarts(both)[0].index) || "");
  assert.equal(bothArgs.file_path, "/real");
  assert.equal(bothArgs.path, "/other", "an explicit file_path leaves other keys untouched");
});

test("stream that ends without finish_reason closes open blocks and emits an error event", () => {
  const state = createState();
  const out: ClaudeEvent[] = [];
  for (const c of [
    {
      id: "chatcmpl-trunc",
      model: "test-model",
      choices: [{ index: 0, delta: { content: "Partial answer" }, finish_reason: null }],
    },
    toolChunk([{ index: 0, id: "call_t", function: { name: "Bash", arguments: '{"comm' } }]),
  ]) {
    const r = openaiToClaudeResponse(c, state);
    if (r) out.push(...r);
  }
  const flushed = openaiToClaudeResponse(null, state) as ClaudeEvent[];
  assert.ok(Array.isArray(flushed) && flushed.length > 0);
  const types = flushed.map((e) => e.type);
  assert.equal(types.includes("message_stop"), false, "no fabricated success terminal");
  assert.equal(types.includes("message_delta"), false, "no fabricated end_turn");
  const error = flushed.at(-1);
  assert.equal(error?.type, "error");
  assert.match(String(error?.error?.message), /terminal marker/);
  assert.equal(typeof error?.error?.type, "string");

  // Every block that was opened is closed before the error.
  const all = [...out, ...flushed];
  const opened = all.filter((e) => e.type === "content_block_start").map((e) => e.index);
  const closed = all.filter((e) => e.type === "content_block_stop").map((e) => e.index);
  assert.equal(opened.length, 2, "text + tool_use blocks were opened");
  for (const idx of opened) assert.ok(closed.includes(idx), `block ${idx} closed`);
  // The still-open tool_use block is closed by the flush itself, before the error.
  assert.ok(flushed.some((e) => e.type === "content_block_stop"));

  assert.equal(state.upstreamError?.code, "stream_early_eof");
  assert.equal(state.upstreamError?.status, 502);
  assert.equal(openaiToClaudeResponse(null, state), null, "flush must be idempotent");
});

test("a fresh state or a finished stream does not emit a truncation error on flush", () => {
  assert.equal(openaiToClaudeResponse(null, createState()), null);

  const state = createState();
  const events = run(
    [
      {
        id: "chatcmpl-done",
        model: "test-model",
        choices: [{ index: 0, delta: { content: "Done" }, finish_reason: "stop" }],
      },
    ],
    state
  );
  assert.equal(
    events.some((e) => e.type === "error"),
    false
  );
  assert.equal(events.at(-1)?.type, "message_stop");
  assert.equal(state.upstreamError, undefined);
});

test("an existing upstream error is not overwritten by the truncation flush", () => {
  const state = createState();
  openaiToClaudeResponse(
    {
      id: "chatcmpl-err",
      model: "test-model",
      choices: [{ index: 0, delta: { content: "Partial" }, finish_reason: null }],
    },
    state
  );
  state.upstreamError = { status: 429, code: "rate_limit_exceeded", message: "Rate limited" };
  openaiToClaudeResponse(null, state);
  assert.equal(state.upstreamError?.status, 429);
  assert.equal(state.upstreamError?.code, "rate_limit_exceeded");
});

test("translated Claude stream without finish_reason reaches the client as event: error", async () => {
  const failures: Record<string, unknown>[] = [];
  const completions: Record<string, unknown>[] = [];
  const chunk = {
    id: "chatcmpl-trunc-stream",
    created: 1,
    model: "test-model",
    choices: [{ index: 0, delta: { content: "Partial answer" }, finish_reason: null }],
  };
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(chunk)}\n\n`));
      controller.close();
    },
  });
  const response = new Response(
    source.pipeThrough(
      createSSEStream({
        mode: "translate",
        targetFormat: FORMATS.OPENAI,
        sourceFormat: FORMATS.CLAUDE,
        provider: "test-provider",
        model: "test-model",
        body: { messages: [{ role: "user", content: "Test" }] },
        onFailure: (failure: Record<string, unknown>) => {
          failures.push(failure);
        },
        onComplete: (completion: Record<string, unknown>) => {
          completions.push(completion);
        },
      })
    )
  );
  const text = await response.text();
  assert.match(text, /event: content_block_delta/);
  assert.match(text, /event: error\ndata: /);
  assert.doesNotMatch(text, /event: message_stop/);
  assert.equal(failures.length, 1);
  assert.equal(failures[0].code, "stream_early_eof");
  assert.equal(completions.length, 1);
  assert.equal(completions[0].status, 502);
});

test("non-streaming: id-less tool calls get distinct ids", () => {
  const out = translateNonStreamingResponse(
    {
      id: "chatcmpl-ns",
      object: "chat.completion",
      model: "test-model",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "",
            tool_calls: Array.from({ length: 20 }, (_, i) => ({
              type: "function",
              function: { name: "Bash", arguments: JSON.stringify({ command: `echo ${i}` }) },
            })),
          },
          finish_reason: "tool_calls",
        },
      ],
    },
    FORMATS.OPENAI,
    FORMATS.CLAUDE
  ) as { content: Array<{ type?: string; id?: string }> };
  const ids = out.content.filter((b) => b.type === "tool_use").map((b) => b.id);
  assert.equal(ids.length, 20);
  for (const id of ids) assert.match(String(id), /^[a-zA-Z0-9_-]+$/);
  assert.equal(new Set(ids).size, 20, "each id-less call is addressable by its own tool_use id");
});

test("initState(CLAUDE) supports the keyed tool-call state", () => {
  const state = initState(FORMATS.CLAUDE);
  const events = run(
    [
      toolChunk([{ index: 0, id: "call_a", function: { name: "Bash", arguments: "{}" } }]),
      toolChunk([{ index: 0, id: "call_b", function: { name: "Bash", arguments: "{}" } }]),
      toolChunk([], "tool_calls"),
    ],
    state as unknown as TranslatorState
  );
  assert.equal(toolUseStarts(events).length, 2);
});
