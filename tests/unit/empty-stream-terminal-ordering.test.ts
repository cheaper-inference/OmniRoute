/**
 * Empty stream after the terminal — the client must never see a clean stop.
 *
 * Production (Atlas, 3.8.53, `gemini/gemini-4-neon`, reasoning-effort xhigh, 49 tools):
 *
 *   [STREAM] detector=post-translation reason=empty-content native={"nativeExecutionObserved":false}
 *   [STREAM] GEMINI | gemini-4-neon | 13154ms | error: Provider returned empty content
 *   usage in=175254 out=0
 *
 * The gateway detected the empty stream and built the error frames — and the client
 * (Pi, official `openai` SDK reader) still recorded `stopReason: "stop"` with empty
 * content, no error, no retry, so the agent turn silently ended.
 *
 * Cause: `createDisconnectAwareStream` forwards every translated chunk as it is read
 * (`controller.enqueue(value)` before any judgement) and only asks
 * `resolveSilentCloseOutcome` whether the stream was empty once the reader reports
 * `done`. By then the translated terminal (`finish_reason: "stop"` + `data: [DONE]`)
 * is already on the wire, and the `openai` SDK stops reading at `[DONE]`: the error
 * frame written after it is unreachable and the earlier `stop` reads as a normal
 * finish. #8649 detects the shape; it cannot fix the ORDER.
 *
 * The frames below are the real output of the Gemini→OpenAI translator for an
 * upstream that emits only `usageMetadata` + `finishReason: "STOP"` with no parts
 * (verified with `scripts/ad-hoc/probe-empty-terminal-esm.ts`).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { createDisconnectAwareStream, createStreamController } =
  await import("../../open-sse/utils/streamHandler.ts");
const { markEmptyTurnExecution, hasTrustedEmptyTurn } =
  await import("../../open-sse/utils/emptyTurnPolicy.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function noopAbortWritable(): { getWriter: () => { abort: () => Promise<void> } } {
  return { getWriter: () => ({ abort: () => Promise.resolve() }) };
}

async function drainStream(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const parts: Uint8Array[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    parts.push(value);
  }
  return new TextDecoder().decode(
    parts.reduce((acc, c) => {
      const merged = new Uint8Array(acc.length + c.length);
      merged.set(acc, 0);
      merged.set(c, acc.length);
      return merged;
    }, new Uint8Array(0))
  );
}

/**
 * Feed `frames` through the client-side wrapper. `fragmentBytes` re-splits the whole
 * stream at arbitrary byte boundaries, which is what a real socket delivers and what
 * decides whether the hold-back can corrupt bytes.
 */
async function runClientStream(
  frames: string[],
  options: { format?: string | null; fragmentBytes?: number; trustedEmptyTurn?: boolean } = {}
): Promise<string> {
  const { format = null, fragmentBytes = 0, trustedEmptyTurn = false } = options;
  const encoder = new TextEncoder();
  const bytes = encoder.encode(frames.join(""));

  const upstream = new ReadableStream<Uint8Array>({
    start(controller) {
      if (fragmentBytes > 0) {
        for (let i = 0; i < bytes.length; i += fragmentBytes) {
          controller.enqueue(bytes.slice(i, i + fragmentBytes));
        }
      } else {
        for (const frame of frames) controller.enqueue(encoder.encode(frame));
      }
      controller.close();
    },
  });
  const transform = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      controller.enqueue(chunk);
    },
  });
  const sc = createStreamController({
    provider: "test",
    model: "test-model",
    clientResponseFormat: format,
  });
  let source = upstream;
  let permitsEmptyTurn: (() => boolean) | undefined;
  if (trustedEmptyTurn) {
    const executed = markEmptyTurnExecution(
      new Response(upstream, { headers: { "content-type": "text/event-stream" } }),
      format === FORMATS.CLAUDE
        ? "https://api.anthropic.com/v1/messages"
        : "https://api.openai.com/v1/chat/completions",
      { connectionId: "selected-test-connection", apiKey: "synthetic-key" }
    );
    source = executed.body!;
    permitsEmptyTurn = () => hasTrustedEmptyTurn(executed);
  }
  return drainStream(
    createDisconnectAwareStream(
      { readable: source.pipeThrough(transform), writable: noopAbortWritable() },
      sc,
      permitsEmptyTurn ? { permitsEmptyTurn } : undefined
    )
  );
}

const OPENAI_CHUNK = (delta: string, finish: string, extra = "") =>
  `data: {"id":"chatcmpl-g","object":"chat.completion.chunk","created":1,"model":"gemini-4-neon","choices":[{"index":0,"delta":${delta},"finish_reason":${finish}}]${extra}}\n\n`;

/** Real Gemini→OpenAI translation of `usageMetadata` + STOP with no parts. */
const GEMINI_ROLE_FRAME =
  'data: {"id":"chatcmpl-g","object":"chat.completion.chunk","created":1,"model":"gemini-4-neon","choices":[{"index":0,"delta":{"role":"model"},"finish_reason":null}]}\n\n';
const GEMINI_EMPTY_STOP_FRAME =
  'data: {"id":"chatcmpl-g","object":"chat.completion.chunk","created":1,"model":"gemini-4-neon","choices":[{"index":0,"delta":{},"finish_reason":"stop"}],"usage":{"prompt_tokens":175254,"completion_tokens":0,"total_tokens":175254}}\n\n';
const DONE = "data: [DONE]\n\n";

const GEMINI_EMPTY_STREAM = [GEMINI_ROLE_FRAME, GEMINI_EMPTY_STOP_FRAME, DONE];

/** The frames the production client received, in order, with a normal stop first. */
function indexOfAll(hay: string, needle: string): number[] {
  const out: number[] = [];
  let i = hay.indexOf(needle);
  while (i >= 0) {
    out.push(i);
    i = hay.indexOf(needle, i + needle.length);
  }
  return out;
}

/** The finish_reasons an `openai`-SDK consumer reads: everything before the first [DONE]. */
function finishReasonsBeforeDone(text: string): string[] {
  const doneAt = text.indexOf("data: [DONE]");
  const readable = doneAt >= 0 ? text.slice(0, doneAt) : text;
  return [...readable.matchAll(/"finish_reason":\s*"([a-z_]+)"/g)].map((m) => m[1]);
}

test("empty Gemini stream: the client never records a clean stop", async () => {
  const text = await runClientStream(GEMINI_EMPTY_STREAM);

  // Clients keep the LAST finish_reason they read (Pi's openai-completions
  // reader, the openai SDK accumulator): it must be the error, not the stop.
  const reasons = finishReasonsBeforeDone(text);
  assert.equal(
    reasons.at(-1),
    "error",
    `the last finish_reason before [DONE] must be the empty verdict, got ${JSON.stringify(reasons)} in: ${text}`
  );
  assert.equal(
    text.split("data: [DONE]").length - 1,
    1,
    `exactly one [DONE] must reach the client, got: ${text}`
  );
});

test("empty Gemini stream: the error frame precedes [DONE]", async () => {
  const text = await runClientStream(GEMINI_EMPTY_STREAM);

  const doneAt = text.indexOf("[DONE]");
  const errorAt = text.search(/"finish_reason":\s*"error"/);
  assert.ok(doneAt >= 0, `the stream must still be terminated with [DONE], got: ${text}`);
  assert.ok(errorAt >= 0, `an error frame must be present, got: ${text}`);
  assert.ok(
    errorAt < doneAt,
    `a client that stops reading at [DONE] must still see the error (error@${errorAt} vs [DONE]@${doneAt}) in: ${text}`
  );
});

test("empty stream with a fragmented terminal is never corrupted", async () => {
  // OmniRoute's own translators emit `data: [DONE]` as one self-contained chunk
  // (open-sse/utils/stream.ts flush), which is the case the hold-back fixes. A
  // terminal split across chunks is not withheld: every upstream byte must still
  // reach the client unchanged and in order, followed by the error frames.
  const fragmented = await runClientStream(GEMINI_EMPTY_STREAM, { fragmentBytes: 7 });

  assert.ok(
    fragmented.startsWith(GEMINI_EMPTY_STREAM.join("")),
    `no upstream byte may be lost or reordered, got: ${fragmented}`
  );
  assert.match(fragmented.slice(GEMINI_EMPTY_STREAM.join("").length), /"finish_reason":\s*"error"/);
});

test("empty Gemini stream with a trusted empty-turn execution keeps its stop", async () => {
  const text = await runClientStream(GEMINI_EMPTY_STREAM, { trustedEmptyTurn: true });

  assert.doesNotMatch(
    text,
    /"finish_reason":\s*"error"/,
    "a permitted empty turn is an answer, not a provider failure"
  );
  assert.match(text, /"finish_reason":\s*"stop"/, "the permitted terminal is released unchanged");
  assert.ok(text.includes("[DONE]"), "the terminal is still terminated with [DONE]");
});

test("content-bearing Gemini stream is forwarded byte-for-byte unchanged", async () => {
  const frames = [
    GEMINI_ROLE_FRAME,
    'data: {"id":"chatcmpl-g","object":"chat.completion.chunk","created":1,"model":"gemini-4-neon","choices":[{"index":0,"delta":{"content":"Hello"},"finish_reason":null}]}\n\n',
    GEMINI_EMPTY_STOP_FRAME,
    DONE,
  ];
  const text = await runClientStream(frames);

  assert.equal(text, frames.join(""), "content streams must be untouched");
  assert.doesNotMatch(text, /"finish_reason":\s*"error"/);
});

test("legit empty terminals are released, not rewritten", async () => {
  for (const reason of ["tool_calls", "length", "content_filter"]) {
    const frames = [
      GEMINI_ROLE_FRAME,
      OPENAI_CHUNK("{}", `"${reason}"`, ',"usage":{"prompt_tokens":10,"completion_tokens":0}'),
      DONE,
    ];
    const text = await runClientStream(frames);

    assert.doesNotMatch(
      text,
      /"finish_reason":\s*"error"/,
      `${reason} is a legit empty terminal (LEGIT_EMPTY_TERMINAL_REASONS): ${text}`
    );
    assert.match(text, new RegExp(`"finish_reason":\\s*"${reason}"`), `${reason} reaches client`);
    assert.ok(text.includes("[DONE]"), `${reason} stream is terminated`);
  }
});

test("tool-call content releases a later stop terminal", async () => {
  const frames = [
    'data: {"id":"chatcmpl-g","object":"chat.completion.chunk","created":1,"model":"gemini-4-neon","choices":[{"index":0,"delta":{"tool_calls":[{"index":0,"id":"call_1","type":"function","function":{"name":"f","arguments":"{}"}}]},"finish_reason":null}]}\n\n',
    OPENAI_CHUNK("{}", '"stop"', ',"usage":{"prompt_tokens":10,"completion_tokens":2}'),
    DONE,
  ];
  const text = await runClientStream(frames);

  assert.doesNotMatch(text, /"finish_reason":\s*"error"/);
  assert.match(text, /"finish_reason":\s*"stop"/);
});

test("empty Claude stream still closes with an in-band error", async () => {
  const frames = [
    'event: message_start\ndata: {"type":"message_start","message":{"role":"assistant"}}\n\n',
    'event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"end_turn"}}\n\n',
    'event: message_stop\ndata: {"type":"message_stop"}\n\n',
  ];
  const text = await runClientStream(frames, { format: FORMATS.CLAUDE });

  assert.match(
    text,
    /event: error/,
    `a content-less Claude stream must still be reported as an error: ${text}`
  );
  // The Anthropic SDK stops at the first message_stop: the error must come first.
  assert.ok(
    text.indexOf("event: error") < text.indexOf("event: message_stop"),
    `the error must precede the first message_stop: ${text}`
  );
  assert.equal(
    indexOfAll(text, "event: message_stop").length,
    1,
    `exactly one message_stop: ${text}`
  );
});

test("empty Responses stream still closes with response.failed", async () => {
  const frames = [
    'event: response.created\ndata: {"type":"response.created","response":{"id":"resp_1"}}\n\n',
    'event: response.completed\ndata: {"type":"response.completed","response":{"id":"resp_1"}}\n\n',
  ];
  const text = await runClientStream(frames, { format: FORMATS.OPENAI_RESPONSES });

  assert.match(
    text,
    /response\.failed/,
    `a content-less Responses stream must still be reported as a failure: ${text}`
  );
  assert.equal(
    indexOfAll(text, "response.completed").length,
    0,
    `the clean terminal must not be delivered before the verdict: ${text}`
  );
});

test("a withheld terminal is released when the upstream stays open after it", async () => {
  // Keep-alive upstream: the terminal arrives but the body never ends. The client
  // must still get the terminal (as before the hold-back), not wait forever.
  const encoder = new TextEncoder();
  const upstream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const frame of GEMINI_EMPTY_STREAM) controller.enqueue(encoder.encode(frame));
    },
  });
  const stream = createDisconnectAwareStream(
    { readable: upstream, writable: noopAbortWritable() },
    createStreamController({ provider: "test", model: "test-model" })
  );
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let text = "";
  const started = Date.now();
  while (!text.includes("[DONE]")) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value);
  }
  await reader.cancel("client_done");
  assert.ok(text.endsWith("data: [DONE]\n\n"), `the terminal must reach the client: ${text}`);
  assert.ok(Date.now() - started < 5000, "the release must be bounded by the grace window");
});

// Shapes the empty verdict must keep classifying as answers: with the terminal
// withheld, a misclassification here would turn a valid turn into a visible error.
const LEGIT_SHAPES: Array<{ name: string; format: string | null; frames: string[] }> = [
  {
    name: "reasoning-only chat turn cut at length",
    format: null,
    frames: [
      OPENAI_CHUNK('{"role":"assistant","reasoning_content":"thinking"}', "null"),
      OPENAI_CHUNK("{}", '"length"'),
      DONE,
    ],
  },
  {
    name: "content_filter with no content",
    format: null,
    frames: [
      OPENAI_CHUNK('{"role":"assistant"}', "null"),
      OPENAI_CHUNK("{}", '"content_filter"'),
      DONE,
    ],
  },
  {
    name: "chat tool call with empty arguments",
    format: null,
    frames: [
      OPENAI_CHUNK(
        '{"role":"assistant","tool_calls":[{"index":0,"id":"call_1","type":"function","function":{"name":"ls","arguments":""}}]}',
        "null"
      ),
      OPENAI_CHUNK("{}", '"tool_calls"'),
      DONE,
    ],
  },
  {
    name: "Claude tool_use without input_json_delta",
    format: FORMATS.CLAUDE,
    frames: [
      'event: message_start\ndata: {"type":"message_start","message":{"role":"assistant"}}\n\n',
      'event: content_block_start\ndata: {"type":"content_block_start","index":0,"content_block":{"type":"tool_use","id":"toolu_1","name":"ls","input":{}}}\n\n',
      'event: content_block_stop\ndata: {"type":"content_block_stop","index":0}\n\n',
      'event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"tool_use"}}\n\n',
      'event: message_stop\ndata: {"type":"message_stop"}\n\n',
    ],
  },
  {
    name: "Responses function_call only in output_item.done",
    format: FORMATS.OPENAI_RESPONSES,
    frames: [
      'event: response.created\ndata: {"type":"response.created","response":{"id":"resp_1"}}\n\n',
      'event: response.output_item.done\ndata: {"type":"response.output_item.done","output_index":0,"item":{"type":"function_call","id":"fc_1","call_id":"call_1","name":"ls","arguments":"{}"}}\n\n',
      // Real upstreams and OmniRoute's Responses translator repeat the output in
      // response.completed; an output_item.done alone is not counted as content
      // outside the readiness probe (#16438), a pre-existing classifier choice.
      'event: response.completed\ndata: {"type":"response.completed","response":{"id":"resp_1","status":"completed","output":[{"type":"function_call","id":"fc_1","call_id":"call_1","name":"ls","arguments":"{}"}]}}\n\n',
    ],
  },
];

for (const shape of LEGIT_SHAPES) {
  test(`legit shape is not turned into an error: ${shape.name}`, async () => {
    const text = await runClientStream(shape.frames, { format: shape.format });
    assert.equal(
      text,
      shape.frames.join(""),
      `the stream must reach the client unchanged, got: ${text}`
    );
  });
}

/** A content-less chat stream whose upstream never closes after `[DONE]`. */
function keepAliveEmptyUpstream(): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const frame of GEMINI_EMPTY_STREAM) controller.enqueue(encoder.encode(frame));
    },
  });
}

test("a read failure after a withheld terminal keeps the error-after-terminal rule", async () => {
  const encoder = new TextEncoder();
  let pulls = 0;
  const upstream = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (pulls < GEMINI_EMPTY_STREAM.length) {
        controller.enqueue(encoder.encode(GEMINI_EMPTY_STREAM[pulls++]));
        return;
      }
      controller.error(new Error("upstream socket reset"));
    },
  });
  const text = await drainStream(
    createDisconnectAwareStream(
      { readable: upstream, writable: noopAbortWritable() },
      createStreamController({ provider: "test", model: "test-model" })
    )
  );
  // Same as before the hold-back (stream-handler.test.ts "errors after OpenAI DONE"):
  // the withheld terminal is released once, and the transport error is not added.
  assert.equal(text, GEMINI_EMPTY_STREAM.join(""), `got: ${text}`);
});

test("a trusted empty turn is not delayed by the hold-back", async () => {
  const started = Date.now();
  const reader = createDisconnectAwareStream(
    { readable: keepAliveEmptyUpstream(), writable: noopAbortWritable() },
    createStreamController({ provider: "test", model: "test-model" }),
    { permitsEmptyTurn: () => true }
  ).getReader();
  const decoder = new TextDecoder();
  let text = "";
  while (!text.includes("[DONE]")) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value);
  }
  await reader.cancel("client_done");
  const elapsed = Date.now() - started;
  assert.ok(elapsed < 500, `released without the grace wait (${elapsed} ms)`);
});

test("a client that leaves during the grace window is a disconnect, not a completion", async () => {
  let disconnected = false;
  const reader = createDisconnectAwareStream(
    { readable: keepAliveEmptyUpstream(), writable: noopAbortWritable() },
    createStreamController({
      provider: "test",
      model: "test-model",
      onDisconnect() {
        disconnected = true;
      },
    })
  ).getReader();
  const first = await reader.read();
  assert.ok(first.value, "the role frame is forwarded");
  await reader.cancel("client_left");
  assert.equal(disconnected, true, "the controller records a disconnect");
});
