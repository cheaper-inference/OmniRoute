/**
 * Opt-in coalescing of Claude `content_block_delta` SSE frames (SSE_COALESCE_*_MS).
 *
 * Fast Anthropic-compatible upstreams emit one content_block_delta per token; Claude Code's
 * VS Code extension renders one postMessage per SSE event and falls behind. The coalescer
 * merges consecutive same-index, same-type deltas losslessly. It is OFF by default, so the
 * default stream must stay byte-identical.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sse-delta-coalesce-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const {
  createDeltaFrameCoalescer,
  deltaCoalescingEnabled,
  parseMergeableDeltaFrame,
  readDeltaCoalesceWindows,
} = await import("../../open-sse/utils/sseDeltaCoalesce.ts");

const COALESCE_ENV = [
  "SSE_COALESCE_MS",
  "SSE_COALESCE_THINKING_MS",
  "SSE_COALESCE_TEXT_MS",
  "SSE_COALESCE_INPUT_JSON_MS",
  "SSE_FRAME_COALESCE_MS",
];

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const ON = { text_delta: 400, thinking_delta: 400, input_json_delta: 400 };

function withEnv<T>(values: Record<string, string>, fn: () => T): T {
  const saved = new Map(COALESCE_ENV.map((name) => [name, process.env[name]]));
  for (const name of COALESCE_ENV) delete process.env[name];
  Object.assign(process.env, values);
  try {
    return fn();
  } finally {
    for (const [name, value] of saved) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
}

const claudeFrame = (event: Record<string, unknown>) =>
  `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`;
const delta = (index: number, deltaBody: Record<string, unknown>) =>
  claudeFrame({ type: "content_block_delta", index, delta: deltaBody });

function collect(windows = ON) {
  const out: string[] = [];
  const coalescer = createDeltaFrameCoalescer(windows, (bytes) => out.push(decoder.decode(bytes)));
  const push = (frame: string) => coalescer.push(encoder.encode(frame));
  return { coalescer, push, out };
}

const parse = (frame: string) => JSON.parse(frame.slice(frame.indexOf("data: ") + 6));

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("merges consecutive same-index thinking deltas into one frame", () => {
  const { coalescer, push, out } = collect();
  for (const piece of ["a", "b", "c", "d", "e"]) {
    push(delta(0, { type: "thinking_delta", thinking: piece }));
  }
  assert.equal(out.length, 0, "the group stays buffered until a boundary or the window");
  coalescer.flush();
  assert.equal(out.length, 1);
  assert.ok(out[0].startsWith("event: content_block_delta\ndata: "));
  assert.deepEqual(parse(out[0]), {
    type: "content_block_delta",
    index: 0,
    delta: { type: "thinking_delta", thinking: "abcde" },
  });
});

test("concatenates text and input_json deltas and keeps other delta fields", () => {
  const { coalescer, push, out } = collect();
  push(delta(1, { type: "text_delta", text: "Hello", extra: 1 }));
  push(delta(1, { type: "text_delta", text: ", world" }));
  push(delta(2, { type: "input_json_delta", partial_json: '{"co' }));
  push(delta(2, { type: "input_json_delta", partial_json: 'mmand":"ls"}' }));
  coalescer.flush();
  assert.equal(out.length, 2);
  assert.deepEqual(parse(out[0]).delta, { type: "text_delta", text: "Hello, world", extra: 1 });
  assert.equal(parse(out[1]).delta.partial_json, '{"command":"ls"}');
});

test("never merges across a different index or delta type", () => {
  const { coalescer, push, out } = collect();
  push(delta(0, { type: "thinking_delta", thinking: "t" }));
  push(delta(1, { type: "thinking_delta", thinking: "u" }));
  push(delta(1, { type: "text_delta", text: "z" }));
  coalescer.flush();
  assert.deepEqual(
    out.map((frame) => [parse(frame).index, parse(frame).delta.type]),
    [
      [0, "thinking_delta"],
      [1, "thinking_delta"],
      [1, "text_delta"],
    ]
  );
});

test("a boundary event flushes the pending group first, preserving order", () => {
  const { push, out } = collect();
  push(delta(0, { type: "text_delta", text: "first" }));
  push(delta(0, { type: "text_delta", text: " part" }));
  push(claudeFrame({ type: "content_block_stop", index: 0 }));
  push(delta(0, { type: "text_delta", text: "second" }));
  push(claudeFrame({ type: "message_stop" }));
  assert.deepEqual(
    out.map((frame) => parse(frame).type),
    ["content_block_delta", "content_block_stop", "content_block_delta", "message_stop"]
  );
  assert.equal(parse(out[0]).delta.text, "first part");
  assert.equal(parse(out[2]).delta.text, "second");
});

test("signature_delta is never merged and acts as a boundary", () => {
  const { coalescer, push, out } = collect();
  const sigA = delta(0, { type: "signature_delta", signature: "sigA" });
  const sigB = delta(0, { type: "signature_delta", signature: "sigB" });
  push(delta(0, { type: "thinking_delta", thinking: "x" }));
  push(sigA);
  push(sigB);
  coalescer.flush();
  assert.equal(out.length, 3);
  assert.equal(out[1], sigA, "signature frames pass through byte-for-byte");
  assert.equal(out[2], sigB);
  assert.equal(parseMergeableDeltaFrame(sigA), null);
});

test("a single-frame group is re-emitted byte-for-byte", () => {
  const { coalescer, push, out } = collect();
  const original =
    'event: content_block_delta\ndata: {"index":0,"type":"content_block_delta","delta":{"text":"x","type":"text_delta"}}\n\n';
  push(original);
  coalescer.flush();
  assert.deepEqual(out, [original]);
});

test("the window timer flushes a pending burst on its own schedule", async () => {
  const { push, out } = collect({ text_delta: 20, thinking_delta: 20, input_json_delta: 20 });
  push(delta(0, { type: "thinking_delta", thinking: "bat" }));
  push(delta(0, { type: "thinking_delta", thinking: "ch" }));
  assert.equal(out.length, 0);
  await new Promise((resolve) => setTimeout(resolve, 80));
  assert.equal(out.length, 1);
  assert.equal(parse(out[0]).delta.thinking, "batch");
});

test("a zero window passes deltas straight through", () => {
  const { push, out } = collect({ text_delta: 0, thinking_delta: 400, input_json_delta: 0 });
  push(delta(0, { type: "text_delta", text: "a" }));
  push(delta(0, { type: "text_delta", text: "b" }));
  assert.equal(out.length, 2);
});

test("windows are OFF by default and read from SSE_COALESCE_* env vars", () => {
  withEnv({}, () => {
    assert.equal(deltaCoalescingEnabled(readDeltaCoalesceWindows()), false);
  });
  withEnv({ SSE_COALESCE_MS: "400" }, () => {
    assert.deepEqual(readDeltaCoalesceWindows(), {
      text_delta: 400,
      thinking_delta: 400,
      input_json_delta: 400,
    });
  });
  withEnv({ SSE_COALESCE_MS: "50", SSE_COALESCE_THINKING_MS: "300" }, () => {
    const windows = readDeltaCoalesceWindows();
    assert.equal(windows.thinking_delta, 300);
    assert.equal(windows.text_delta, 50);
  });
  withEnv({ SSE_COALESCE_THINKING_MS: "0" }, () => {
    assert.equal(deltaCoalescingEnabled(readDeltaCoalesceWindows()), false);
  });
  withEnv({ SSE_COALESCE_MS: "garbage" }, () => {
    assert.equal(deltaCoalescingEnabled(readDeltaCoalesceWindows()), false);
  });
});

// ── createSSEStream integration ─────────────────────────────────────────────

const CLAUDE_UPSTREAM = [
  claudeFrame({
    type: "message_start",
    message: { id: "msg_1", type: "message", role: "assistant", model: "claude-x", content: [] },
  }),
  claudeFrame({ type: "content_block_start", index: 0, content_block: { type: "thinking" } }),
  ...["Let ", "me ", "think ", "about ", "it."].map((t) =>
    delta(0, { type: "thinking_delta", thinking: t })
  ),
  delta(0, { type: "signature_delta", signature: "sig" }),
  claudeFrame({ type: "content_block_stop", index: 0 }),
  claudeFrame({ type: "content_block_start", index: 1, content_block: { type: "text" } }),
  ...["Hel", "lo", " wor", "ld"].map((t) => delta(1, { type: "text_delta", text: t })),
  claudeFrame({ type: "content_block_stop", index: 1 }),
  claudeFrame({
    type: "message_delta",
    delta: { stop_reason: "end_turn" },
    usage: { output_tokens: 9 },
  }),
  claudeFrame({ type: "message_stop" }),
];

async function runClaudePassthrough(env: Record<string, string>) {
  const stream = withEnv(env, () =>
    createSSEStream({
      mode: "passthrough",
      provider: "anthropic",
      model: "claude-x",
      clientResponseFormat: FORMATS.CLAUDE,
      body: { messages: [{ role: "user", content: "hi" }] },
    })
  );
  const source = new ReadableStream({
    start(controller) {
      for (const frame of CLAUDE_UPSTREAM) controller.enqueue(encoder.encode(frame));
      controller.close();
    },
  });
  return new Response(source.pipeThrough(stream)).text();
}

function deltaEvents(text: string) {
  return text
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => JSON.parse(line.slice(6)))
    .filter((event) => event.type === "content_block_delta");
}

test("claude passthrough: SSE_COALESCE_MS merges deltas with identical content", async () => {
  const plain = await runClaudePassthrough({});
  const coalesced = await runClaudePassthrough({ SSE_COALESCE_MS: "400" });

  const plainDeltas = deltaEvents(plain);
  const mergedDeltas = deltaEvents(coalesced);
  assert.equal(plainDeltas.length, 10, "default stream forwards every upstream delta");
  assert.equal(mergedDeltas.length, 3, "thinking burst + signature + text burst");
  assert.equal(mergedDeltas[0].delta.thinking, "Let me think about it.");
  assert.deepEqual(mergedDeltas[1].delta, { type: "signature_delta", signature: "sig" });
  assert.equal(mergedDeltas[2].delta.text, "Hello world");

  const types = (text: string) =>
    text
      .split("\n")
      .filter((line) => line.startsWith("event: "))
      .map((line) => line.slice(7));
  assert.deepEqual(
    [...new Set(types(coalesced))],
    [...new Set(types(plain))],
    "event types and their order are preserved"
  );
  assert.ok(coalesced.trimEnd().endsWith('data: {"type":"message_stop"}'));
});

test("claude passthrough: the default stream (no env) is byte-identical to the upstream frames", async () => {
  const plain = await runClaudePassthrough({});
  assert.equal(plain, CLAUDE_UPSTREAM.join(""));
});

test("non-Claude clients are never coalesced even with SSE_COALESCE_MS set", async () => {
  const chunk = (content: string) =>
    `data: ${JSON.stringify({
      id: "chatcmpl_1",
      object: "chat.completion.chunk",
      created: 1,
      model: "gpt-x",
      choices: [{ index: 0, delta: { content }, finish_reason: null }],
    })}\n\n`;
  const run = (env: Record<string, string>) => {
    const stream = withEnv(env, () =>
      createSSEStream({
        mode: "passthrough",
        provider: "openai",
        model: "gpt-x",
        clientResponseFormat: FORMATS.OPENAI,
        body: { messages: [{ role: "user", content: "hi" }] },
      })
    );
    const source = new ReadableStream({
      start(controller) {
        for (const piece of ["a", "b", "c"]) controller.enqueue(encoder.encode(chunk(piece)));
        controller.close();
      },
    });
    return new Response(source.pipeThrough(stream)).text();
  };
  // Strip the per-run synthetic ids/timestamps/TPS so the two runs compare structurally.
  const frames = (text: string) =>
    text
      .split("\n\n")
      .filter(Boolean)
      .map((frame) => frame.replace(/"(id|created|tokens_per_second)":("[^"]*"|[\d.]+)/g, ""));
  const coalesced = frames(await run({ SSE_COALESCE_MS: "400" }));
  assert.deepEqual(coalesced, frames(await run({})));
  assert.equal(coalesced.filter((frame) => frame.includes('"content":')).length, 3);
});

test("translate lane (OpenAI upstream → Claude client) is coalesced too", async () => {
  const chunk = (delta: Record<string, unknown>, finish: string | null = null) =>
    `data: ${JSON.stringify({
      id: "chatcmpl_1",
      object: "chat.completion.chunk",
      created: 1,
      model: "gpt-x",
      choices: [{ index: 0, delta, finish_reason: finish }],
    })}\n\n`;
  const run = (env: Record<string, string>) => {
    const stream = withEnv(env, () =>
      createSSEStream({
        mode: "translate",
        targetFormat: FORMATS.OPENAI,
        sourceFormat: FORMATS.CLAUDE,
        provider: "openai",
        model: "gpt-x",
        body: { messages: [{ role: "user", content: "hi" }] },
      })
    );
    const source = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(chunk({ role: "assistant", content: "" })));
        for (const piece of ["Hel", "lo", " wor", "ld"]) {
          controller.enqueue(encoder.encode(chunk({ content: piece })));
        }
        controller.enqueue(encoder.encode(chunk({}, "stop")));
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    return new Response(source.pipeThrough(stream)).text();
  };

  const textOf = (events: Array<{ delta: { text?: string } }>) =>
    events.map((event) => event.delta.text ?? "").join("");
  const plain = deltaEvents(await run({}));
  const merged = deltaEvents(await run({ SSE_COALESCE_TEXT_MS: "400" }));
  assert.ok(plain.length >= 4, `default stream keeps one delta per token (got ${plain.length})`);
  assert.equal(merged.length, 1);
  assert.equal(textOf(merged), textOf(plain));
  assert.equal(textOf(merged), "Hello world");
});
