import test from "node:test";
import assert from "node:assert/strict";

import { createPassthroughStreamWithLogger } from "../../open-sse/utils/stream.ts";

const { createDisconnectAwareStream, createStreamController } =
  await import("../../open-sse/utils/streamHandler.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type ParsedChunk = Record<string, unknown>;
type Choice = Record<string, unknown> | null;

/**
 * Build an SSE data frame with the exact field order the streaming parser reads:
 * index, delta, finish_reason — for every choice, not just the first one.
 */
function makeChunk(finishReasons: Array<string | null>): string {
  const chunk = {
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1700000000,
    model: "test-model",
    choices: finishReasons.map((reason, index) => ({
      index,
      delta: index === 0 && reason === null ? { content: "Hello" } : {},
      finish_reason: reason,
    })),
  };
  return `data: ${JSON.stringify(chunk)}\n\n`;
}

async function runPassthrough(rawSSE: string): Promise<string> {
  const transform = createPassthroughStreamWithLogger(
    "test-provider",
    null,
    null,
    "test-model",
    "conn-all-choices",
    { model: "test-model" }
  );
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const readAll = (async () => {
    const out: string[] = [];
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      out.push(decoder.decode(value));
    }
    return out.join("");
  })();

  try {
    await writer.write(encoder.encode(rawSSE));
    await writer.close();
    return await readAll;
  } finally {
    reader.releaseLock();
  }
}

function parseDataEvents(raw: string): ParsedChunk[] {
  const events: ParsedChunk[] = [];
  for (const line of raw.split("\n")) {
    if (!line.startsWith("data:")) continue;
    const payload = line.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    try {
      events.push(JSON.parse(payload) as ParsedChunk);
    } catch {
      // skip comments and non-JSON payloads
    }
  }
  return events;
}

/** Chunks that carry a terminal marker in any choice, upstream or synthetic. */
function terminalEvents(events: ParsedChunk[]): ParsedChunk[] {
  return events.filter((event) => {
    const choices = event.choices as Choice[] | undefined;
    if (!Array.isArray(choices)) return false;
    return choices.some(
      (choice) =>
        choice != null &&
        typeof choice.finish_reason === "string" &&
        choice.finish_reason.length > 0
    );
  });
}

function createNoopAbortWritableStream(): { getWriter: () => { abort: () => Promise<void> } } {
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
    parts.reduce((acc, chunk) => {
      const merged = new Uint8Array(acc.length + chunk.length);
      merged.set(acc, 0);
      merged.set(chunk, acc.length);
      return merged;
    }, new Uint8Array(0))
  );
}

/** Drive the disconnect-aware client stream the same way a bare upstream close is handled. */
async function runClientStream(upstreamChunks: string[]): Promise<string> {
  const upstream = new ReadableStream<Uint8Array>({
    start(controller) {
      const encoder = new TextEncoder();
      for (const chunk of upstreamChunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });
  const transform = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      controller.enqueue(chunk);
    },
  });
  const sc = createStreamController({
    provider: "test-provider",
    model: "test-model",
    clientResponseFormat: FORMATS.OPENAI,
  });
  const wrapped = createDisconnectAwareStream(
    { readable: upstream.pipeThrough(transform), writable: createNoopAbortWritableStream() },
    sc
  );
  return drainStream(wrapped);
}

test("a terminal marker in a later choice is forwarded without a synthetic terminal chunk", async () => {
  const rawSSE = [makeChunk([null]), makeChunk([null, "stop"]), "data: [DONE]\n\n"].join("");

  const events = parseDataEvents(await runPassthrough(rawSSE));
  const terminals = terminalEvents(events);

  assert.equal(terminals.length, 1, "exactly one terminal chunk, no synthetic duplicate");
  const choices = terminals[0].choices as Choice[];
  assert.equal(choices.length, 2, "the terminal chunk is the upstream multi-choice one");
  assert.equal((choices[1] as Record<string, unknown>).finish_reason, "stop");
});

test("a stream with no terminal marker still receives the synthetic terminal chunk", async () => {
  const rawSSE = [makeChunk([null]), makeChunk([null]), "data: [DONE]\n\n"].join("");

  const events = parseDataEvents(await runPassthrough(rawSSE));
  const terminals = terminalEvents(events);

  assert.equal(terminals.length, 1);
  const choices = terminals[0].choices as Choice[];
  assert.equal(choices.length, 1, "the terminal chunk is the synthetic single-choice one");
  assert.equal((choices[0] as Record<string, unknown>).finish_reason, "stop");
});

test("a terminal marker in the first choice is unchanged", async () => {
  const rawSSE = [makeChunk([null]), makeChunk(["stop"]), "data: [DONE]\n\n"].join("");

  const events = parseDataEvents(await runPassthrough(rawSSE));
  const terminals = terminalEvents(events);

  assert.equal(terminals.length, 1);
  const choices = terminals[0].choices as Choice[];
  assert.equal((choices[0] as Record<string, unknown>).finish_reason, "stop");
});

test("an empty choices array is not treated as a terminal marker", async () => {
  const rawSSE = [makeChunk([null]), makeChunk([]), "data: [DONE]\n\n"].join("");

  const events = parseDataEvents(await runPassthrough(rawSSE));
  const terminals = terminalEvents(events);

  assert.equal(terminals.length, 1, "only the synthetic terminal marker is emitted");
  const choices = terminals[0].choices as Choice[];
  assert.equal(choices.length, 1);
  assert.match(rawSSE, /"choices":\[\]/);
});

test("a later-choice terminal marker does not produce a false drop verdict", async () => {
  const text = await runClientStream([makeChunk([null]), makeChunk([null, "stop"])]);

  assert.doesNotMatch(text, /Upstream stream ended without a terminal marker/);
  assert.doesNotMatch(text, /"finish_reason":\s*"error"/);
});

test("a later-choice terminal marker keeps the upstream reason after tool calls", async () => {
  const toolCallChunk = {
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1700000000,
    model: "test-model",
    choices: [
      {
        index: 0,
        delta: {
          tool_calls: [
            {
              index: 0,
              id: "call_1",
              type: "function",
              function: { name: "get_weather", arguments: "{}" },
            },
          ],
        },
        finish_reason: null,
      },
    ],
  };
  // Choice 0 carries content so the chunk is kept; the terminal marker is on choice 1 only.
  const terminalChunk = {
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1700000000,
    model: "test-model",
    choices: [
      { index: 0, delta: { content: "done" }, finish_reason: null },
      { index: 1, delta: {}, finish_reason: "length" },
    ],
  };
  const rawSSE = [
    `data: ${JSON.stringify(toolCallChunk)}\n\n`,
    `data: ${JSON.stringify(terminalChunk)}\n\n`,
    "data: [DONE]\n\n",
  ].join("");

  const result = await runPassthrough(rawSSE);
  const events = parseDataEvents(result);
  const terminals = terminalEvents(events);

  assert.equal(terminals.length, 1, "no synthetic tool_calls chunk replaces the upstream terminal");
  const choices = terminals[0].choices as Choice[];
  assert.equal(choices.length, 2, "the upstream multi-choice chunk is forwarded");
  assert.equal((choices[1] as Record<string, unknown>).finish_reason, "length");
  assert.doesNotMatch(result, /"finish_reason":"error"/);
});

test("a later-choice terminal with a null first choice never raises or reports a drop verdict", async () => {
  const toolCallChunk = {
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1700000000,
    model: "test-model",
    choices: [
      {
        index: 0,
        delta: {
          tool_calls: [
            {
              index: 0,
              id: "call_1",
              type: "function",
              function: { name: "get_weather", arguments: "{}" },
            },
          ],
        },
        finish_reason: null,
      },
    ],
  };
  // Malformed first choice, terminal marker only on choice 1. The chunk is filtered
  // before the tool_calls rewrite; the stream must still finish without throwing or
  // emitting a false drop verdict.
  const terminalChunk = {
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1700000000,
    model: "test-model",
    choices: [null, { index: 1, delta: {}, finish_reason: "stop" }],
  };
  const rawSSE = [
    `data: ${JSON.stringify(toolCallChunk)}\n\n`,
    `data: ${JSON.stringify(terminalChunk)}\n\n`,
    "data: [DONE]\n\n",
  ].join("");

  const result = await runPassthrough(rawSSE);

  assert.ok(result.length > 0, "the stream produced output instead of failing");
  assert.doesNotMatch(result, /"finish_reason":\s*"error"/);
  assert.doesNotMatch(result, /Upstream stream ended without a terminal marker/);
});

test("a later choice's terminal does not discard the first choice's own terminal frame", async () => {
  const firstFrame = {
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1700000000,
    model: "test-model",
    choices: [
      { index: 0, delta: { content: "A" }, finish_reason: null },
      { index: 1, delta: {}, finish_reason: "stop" },
    ],
  };
  const secondFrame = {
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1700000000,
    model: "test-model",
    choices: [{ index: 0, delta: { content: "B" }, finish_reason: "stop" }],
  };
  const result = await runPassthrough(
    [
      `data: ${JSON.stringify(firstFrame)}\n\n`,
      `data: ${JSON.stringify(secondFrame)}\n\n`,
      "data: [DONE]\n\n",
    ].join("")
  );

  assert.match(result, /"content":"B"/, "the first choice's later content reaches the client");
  const events = parseDataEvents(result);
  const firstChoiceTerminal = events.find((event) => {
    const choices = event.choices as Choice[] | undefined;
    return Array.isArray(choices) && (choices[0] as Record<string, unknown> | null)?.finish_reason;
  });
  assert.ok(firstChoiceTerminal, "the first choice's own terminal frame is forwarded");
  const choices = firstChoiceTerminal.choices as Choice[];
  assert.equal((choices[0] as Record<string, unknown>).finish_reason, "stop");
});

test("the tool-call rewrite does not finish a choice that has no terminal marker", async () => {
  const toolCallChunk = {
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1700000000,
    model: "test-model",
    choices: [
      {
        index: 0,
        delta: {
          tool_calls: [
            {
              index: 0,
              id: "call_1",
              type: "function",
              function: { name: "get_weather", arguments: "{}" },
            },
          ],
        },
        finish_reason: null,
      },
    ],
  };
  // The terminal is on choice 1 while choice 0 is still streaming content.
  const mixedChunk = {
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1700000000,
    model: "test-model",
    choices: [
      { index: 0, delta: { content: "done" }, finish_reason: null },
      { index: 1, delta: {}, finish_reason: "stop" },
    ],
  };
  const result = await runPassthrough(
    [
      `data: ${JSON.stringify(toolCallChunk)}\n\n`,
      `data: ${JSON.stringify(mixedChunk)}\n\n`,
      "data: [DONE]\n\n",
    ].join("")
  );

  const events = parseDataEvents(result);
  const mixed = events.find((event) => {
    const choices = event.choices as Choice[] | undefined;
    return Array.isArray(choices) && choices.length === 2;
  });
  assert.ok(mixed, "the mixed multi-choice frame is forwarded");
  const choices = mixed.choices as Choice[];
  assert.equal(
    (choices[0] as Record<string, unknown>).finish_reason,
    null,
    "the still-streaming first choice keeps its null finish_reason"
  );
  assert.equal((choices[1] as Record<string, unknown>).finish_reason, "stop");
  assert.doesNotMatch(result, /"finish_reason":"tool_calls"/);
});

test("a first choice finishing earlier does not discard a later choice's own terminal", async () => {
  const firstFrame = {
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1700000000,
    model: "test-model",
    choices: [{ index: 0, delta: { content: "A" }, finish_reason: "stop" }],
  };
  const secondFrame = {
    id: "chatcmpl-test",
    object: "chat.completion.chunk",
    created: 1700000000,
    model: "test-model",
    choices: [
      { index: 0, delta: { content: "C" }, finish_reason: null },
      { index: 1, delta: {}, finish_reason: "stop" },
    ],
  };
  const result = await runPassthrough(
    [
      `data: ${JSON.stringify(firstFrame)}\n\n`,
      `data: ${JSON.stringify(secondFrame)}\n\n`,
      "data: [DONE]\n\n",
    ].join("")
  );

  assert.match(result, /"content":"C"/, "the later frame's content reaches the client");
  const events = parseDataEvents(result);
  const laterChoiceTerminal = events.find((event) => {
    const choices = event.choices as Choice[] | undefined;
    return Array.isArray(choices) && (choices[1] as Record<string, unknown> | null)?.finish_reason;
  });
  assert.ok(laterChoiceTerminal, "the later choice's own terminal frame is forwarded");
});
