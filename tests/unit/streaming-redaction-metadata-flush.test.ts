import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Streamed replies lost text when credential redaction was on: the transform descended into
// metadata objects, classified their string fields as content, and held those values in the
// 512-character redaction window. A short answer sat inside that window with usage provenance
// values instead of its own text; a long answer kept streaming but lost its tail at the flush.
//
// Both lengths are covered on purpose: the short case proves metadata never displaces the
// answer, and the long case (past the window) proves the tail survives the flush.

const isolated = fs.mkdtempSync(path.join(os.tmpdir(), "streaming-redaction-metadata-"));
const originalHome = process.env.HOME;
const originalDataDir = process.env.DATA_DIR;
process.env.HOME = isolated;
process.env.DATA_DIR = path.join(isolated, "data");
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => {
  throw new Error("offline pipeline test forbids fetch");
};

const { assembleStreamingPipeline } =
  await import("../../open-sse/handlers/chatCore/streamingPipeline.ts");
const { createPassthroughStreamWithLogger } = await import("../../open-sse/utils/stream.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const restoreEnv = (name: "HOME" | "DATA_DIR", value: string | undefined) => {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
};

test.after(() => {
  resetDbInstance();
  globalThis.fetch = originalFetch;
  restoreEnv("HOME", originalHome);
  restoreEnv("DATA_DIR", originalDataDir);
  fs.rmSync(isolated, { recursive: true, force: true });
});

const frame = (value: unknown) => `data: ${JSON.stringify(value)}\n\n`;

// An SSE event payload: a `type` plus whatever fields the protocol frame carries.
type Typed = { type: string; [field: string]: unknown };

type ParsedChunk = {
  choices?: Array<{ delta?: Record<string, unknown> } | null>;
  [field: string]: unknown;
};

function parsedChunks(output: string): ParsedChunk[] {
  const chunks: ParsedChunk[] = [];
  for (const line of output.split("\n")) {
    if (!line.startsWith("data:")) continue;
    const payload = line.slice(5).trim();
    if (payload === "[DONE]") continue;
    try {
      chunks.push(JSON.parse(payload));
    } catch {
      /* not a JSON frame */
    }
  }
  return chunks;
}

type JsonObject = Record<string, unknown>;
type SseEvent = { event: string; data: string; json: JsonObject | null };

// Read a dotted path of a parsed frame ("usage.usage_evidence.note"); undefined when absent.
function at(value: unknown, path: string): unknown {
  let current = value;
  for (const key of path.split(".")) {
    if (!current || typeof current !== "object") return undefined;
    current = (current as JsonObject)[key];
  }
  return current;
}

// The string at a dotted path, or "" when it is missing or not a string.
function textAt(value: unknown, path: string): string {
  const found = at(value, path);
  return typeof found === "string" ? found : "";
}

// Logical SSE events (blank-line separated), parsed after the whole output is collected so
// transport chunking never decides what counts as one event.
function sseEvents(output: string): SseEvent[] {
  const events: SseEvent[] = [];
  for (const block of output.split(/\n\n+/)) {
    let event = "";
    const data: string[] = [];
    for (const line of block.split("\n")) {
      if (line.startsWith("event:")) event = line.slice(6).trim();
      else if (line.startsWith("data:")) data.push(line.slice(5).trim());
    }
    if (!data.length) continue;
    const payload = data.join("\n");
    let json: JsonObject | null = null;
    try {
      json = payload === "[DONE]" ? null : JSON.parse(payload);
    } catch {
      json = null;
    }
    events.push({ event, data: payload, json });
  }
  return events;
}

// Every string value under any `usage_evidence` key of a frame, wherever it sits.
function evidenceValues(value: unknown, inEvidence = false): string[] {
  if (typeof value === "string") return inEvidence ? [value] : [];
  if (!value || typeof value !== "object") return [];
  const found: string[] = [];
  for (const [key, child] of Object.entries(value)) {
    found.push(...evidenceValues(child, inEvidence || key === "usage_evidence"));
  }
  return found;
}

function allStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (!value || typeof value !== "object") return [];
  return Object.values(value as Record<string, unknown>).flatMap(allStrings);
}

// Nested too: the leak this guards against is a path map folded into `usage_evidence`, so a
// top-level-only scan would pass while the client received exactly the shape it rejects.
function assertNoBarePathMap(events: SseEvent[]): void {
  const walk = (value: unknown, where: string): void => {
    if (Array.isArray(value)) {
      value.forEach((child, index) => walk(child, `${where}[${index}]`));
      return;
    }
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
      assert.ok(!key.includes("/"), `a bare metadata path map reached the client: ${where}.${key}`);
      walk(child, `${where}.${key}`);
    }
  };
  for (const { json } of events) if (json) walk(json, "frame");
}

function contentOf(output: string): string {
  let text = "";
  for (const chunk of parsedChunks(output)) {
    for (const choice of chunk.choices ?? []) {
      const content = choice?.delta?.content;
      if (typeof content === "string") text += content;
    }
  }
  return text;
}

function reasoningLeaked(output: string, needle: string): boolean {
  for (const chunk of parsedChunks(output)) {
    for (const choice of chunk.choices ?? []) {
      const delta = choice?.delta ?? {};
      for (const [key, value] of Object.entries(delta)) {
        // reasoning_content / reasoning are the fields that are supposed to carry it.
        if (key === "reasoning_content" || key === "reasoning") continue;
        if (typeof value === "string" && value.includes(needle)) return true;
      }
    }
  }
  return false;
}

async function runWithCredentialRedaction(chunks: string[]): Promise<string> {
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk));
      controller.close();
    },
  });
  const abort = new AbortController();
  const stream = assembleStreamingPipeline({
    providerResponse: new Response(source),
    // The passthrough production wires in, not a stand-in: the interaction between the
    // credential transform's flush and this downstream transform is what dropped the tail.
    transformStream: createPassthroughStreamWithLogger(
      null,
      null,
      null,
      "grok-4.7",
      null,
      null,
      null,
      null,
      null,
      "openai"
    ),
    streamController: {
      signal: abort.signal,
      startTime: Date.now(),
      isConnected: () => true,
      handleDisconnect: () => {},
      handleComplete: () => {},
      markClientTerminalSeen: () => {},
      clearPendingRequest: () => {},
      markCompletedToolHandoffSeen: () => {},
      registerCompletedToolHandoffDrain: () => {},
      shouldDeferCompletedToolHandoff: () => false,
      clientDisconnectGracePeriodMs: 0,
      handleError: () => {},
      abort: () => abort.abort(),
      clientResponseFormat: "openai",
    },
    createPiiTransform: undefined,
    clientRawRequestHeaders: null,
    clientResponseFormat: "openai",
    echoModel: "grok-4.7",
    responseHeaders: {},
    credentialRedactionEnabled: true,
    credentialDisabledGuardrails: [],
    piiDisabledGuardrails: [],
  });
  return await new Response(stream).text();
}

const terminalUsage = {
  prompt_tokens: 10,
  completion_tokens: 3,
  total_tokens: 13,
  cost_in_usd_ticks: 64180000,
  usage_evidence: { input: { source: "unknown" }, output: { method: "estimated" } },
  tokens_per_second: 12.5,
};

test("a short answer shorter than the redaction window reaches the client", async () => {
  const chunks = [
    frame({ choices: [{ index: 0, delta: { role: "assistant" } }] }),
    frame({ choices: [{ index: 0, delta: { reasoning_content: "The user wants SMOKE." } }] }),
    frame({ choices: [{ index: 0, delta: { content: "SMOKE" } }] }),
    frame({
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: terminalUsage,
    }),
    "data: [DONE]\n\n",
  ];
  const out = await runWithCredentialRedaction(chunks);
  assert.equal(contentOf(out), "SMOKE", `client got ${JSON.stringify(contentOf(out))}`);
  assert.ok(!reasoningLeaked(out, "The user wants"), "reasoning leaked into an emitted delta");
});

test("a long answer past the redaction window keeps its tail through the flush", async () => {
  // Longer than the 512-character window, so most of it streams and only the tail is flushed.
  const words = Array.from({ length: 140 }, (_, i) => `word${i}`).join(" ");
  assert.ok(words.length > 512, "fixture must exceed the redaction window");
  const chunks = [
    frame({ choices: [{ index: 0, delta: { content: words.slice(0, 300) } }] }),
    frame({ choices: [{ index: 0, delta: { content: words.slice(300) } }] }),
    frame({
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: terminalUsage,
    }),
    "data: [DONE]\n\n",
  ];
  const out = await runWithCredentialRedaction(chunks);
  assert.equal(contentOf(out), words, "the tail of the answer was lost at the flush");
});

test("a credential split across two metadata frames is still masked", async () => {
  const { createCredentialSseTransform } =
    await import("../../src/lib/streamingCredentialTransform.ts");
  const key = "sk-" + "ABCD".repeat(12);
  const transform = createCredentialSseTransform() as TransformStream;
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const writing = (async () => {
    // Neither frame holds the key on its own; only the window across them does.
    await writer.write(
      new TextEncoder().encode(
        frame({
          choices: [{ index: 0, delta: { content: "SMOKE" } }],
          usage_evidence: key.slice(0, 6),
        })
      )
    );
    await writer.write(
      new TextEncoder().encode(
        frame({ choices: [{ index: 0, delta: {} }], usage_evidence: key.slice(6) })
      )
    );
    await writer.write(new TextEncoder().encode("data: [DONE]\n\n"));
    try {
      await writer.close();
    } catch {
      /* closed */
    }
  })();
  const out: string[] = [];
  let r = await reader.read();
  while (!r.done) {
    out.push(new TextDecoder().decode(r.value));
    r = await reader.read();
  }
  await writing;
  const text = out.join("");
  assert.ok(!text.includes(key), "a credential split across metadata frames leaked");
  assert.ok(text.includes("[REDACTED"), "the split credential should be masked");
  assert.equal(contentOf(text), "SMOKE", "metadata leaked into the answer");

  // Field level: no single emitted value may carry either half of the key, and the masked
  // value must sit in a chat chunk (with its `choices` envelope) before `[DONE]`.
  const events = sseEvents(text);
  assertNoBarePathMap(events);
  for (const value of events.flatMap((e) => allStrings(e.json))) {
    assert.ok(!value.includes(key.slice(0, 6)), `a key fragment was emitted: ${value}`);
    assert.ok(!value.includes(key.slice(6, 30)), `a key fragment was emitted: ${value}`);
  }
  const masked = events.findIndex((e) =>
    evidenceValues(e.json).some((value) => value.includes("[REDACTED"))
  );
  const done = events.findIndex((e) => e.data === "[DONE]");
  assert.ok(masked !== -1, "the masked metadata never reached a usage_evidence field");
  assert.ok(
    Array.isArray(at(events[masked].json, "choices")),
    "masked metadata left its chunk envelope"
  );
  assert.ok(masked < done, "masked metadata was emitted after [DONE]");
  assert.equal(done, events.length - 1, "[DONE] must stay the last event");
});

test("a credential inside usage metadata is masked and the rest of the metadata survives", async () => {
  // Observed on the transform itself: past the transform the passthrough rebuilds the terminal
  // frame's usage from its own counters and drops metadata-only frames, so the masking property
  // is only visible here.
  const { createCredentialSseTransform } =
    await import("../../src/lib/streamingCredentialTransform.ts");
  const key = "sk-" + "ABCD".repeat(12);
  const transform = createCredentialSseTransform() as TransformStream;
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const writing = (async () => {
    await writer.write(
      new TextEncoder().encode(
        frame({
          choices: [{ index: 0, delta: { content: "SMOKE" } }],
          cost_in_usd_ticks: 64180000,
          usage_evidence: {
            input: { token: key },
            output: { method: "measured locally", notes: [key] },
          },
          tokens_per_second: 12.5,
        })
      )
    );
    // The same keys can arrive as plain strings, which is the shape that skipped masking when
    // they were added to the metadata set.
    await writer.write(
      new TextEncoder().encode(
        frame({ choices: [{ index: 0, delta: {} }], usage_evidence: `provenance ${key}` })
      )
    );
    await writer.write(
      new TextEncoder().encode(frame({ choices: [{ index: 0, delta: {}, finish_reason: "stop" }] }))
    );
    await writer.write(new TextEncoder().encode("data: [DONE]\n\n"));
    try {
      await writer.close();
    } catch {
      /* closed */
    }
  })();
  const out: string[] = [];
  let r = await reader.read();
  while (!r.done) {
    out.push(new TextDecoder().decode(r.value));
    r = await reader.read();
  }
  await writing;
  const text = out.join("");

  assert.ok(!text.includes(key), "a credential inside usage metadata was not masked");
  assert.ok(text.includes("[REDACTED"), "the masked value should carry a redaction marker");
  // Short metadata values sit inside the hold-back window and only leave on the tail frame,
  // so they are asserted across the whole stream rather than on the live frame.
  assert.ok(text.includes("64180000"), "non-secret metadata should survive");
  assert.ok(text.includes("12.5"), "non-secret metadata should survive");
  assert.ok(text.includes("measured"), "non-secret metadata should survive");
  assert.ok(text.includes("locally"), "non-secret metadata should survive");
});

test("a credential in a Claude frame's usage metadata is masked", async () => {
  const { createCredentialSseTransform } =
    await import("../../src/lib/streamingCredentialTransform.ts");
  const key = "sk-" + "ABCD".repeat(12);
  const transform = createCredentialSseTransform() as TransformStream;
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const writing = (async () => {
    await writer.write(
      new TextEncoder().encode(
        "event: content_block_delta\n" +
          frame({
            type: "content_block_delta",
            index: 0,
            delta: { type: "text_delta", text: "hello" },
            usage_evidence: key,
          })
      )
    );
    await writer.write(
      new TextEncoder().encode(
        "event: message_stop\n" + frame({ type: "message_stop" }) + "data: [DONE]\n\n"
      )
    );
    try {
      await writer.close();
    } catch {
      /* closed */
    }
  })();
  const out: string[] = [];
  let r = await reader.read();
  while (!r.done) {
    out.push(new TextDecoder().decode(r.value));
    r = await reader.read();
  }
  await writing;
  const text = out.join("");
  assert.ok(!text.includes(key), "a credential in a Claude frame was not masked");
  assert.ok(text.includes("[REDACTED"), "the Claude frame credential should be masked");
  assert.ok(text.includes("hello"), "the Claude block text should survive");
});

test("a credential split across two Claude frames is still masked", async () => {
  const { createCredentialSseTransform } =
    await import("../../src/lib/streamingCredentialTransform.ts");
  const key = "sk-" + "ABCD".repeat(12);
  const transform = createCredentialSseTransform() as TransformStream;
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const claude = (obj: unknown) => "event: content_block_delta\n" + frame(obj);
  const writing = (async () => {
    await writer.write(
      new TextEncoder().encode(
        claude({
          type: "content_block_delta",
          index: 0,
          delta: { type: "text_delta", text: "hello" },
          usage_evidence: key.slice(0, 6),
        })
      )
    );
    await writer.write(
      new TextEncoder().encode(
        claude({
          type: "content_block_delta",
          index: 0,
          delta: { type: "text_delta", text: " world" },
          usage_evidence: key.slice(6),
        })
      )
    );
    await writer.write(
      new TextEncoder().encode(
        "event: message_stop\n" + frame({ type: "message_stop" }) + "data: [DONE]\n\n"
      )
    );
    try {
      await writer.close();
    } catch {
      /* closed */
    }
  })();
  const out: string[] = [];
  let r = await reader.read();
  while (!r.done) {
    out.push(new TextDecoder().decode(r.value));
    r = await reader.read();
  }
  await writing;
  const text = out.join("");
  assert.ok(!text.includes(key), "a credential split across Claude frames leaked");
  assert.ok(text.includes("[REDACTED"), "the split Claude credential should be masked");
  assert.ok(text.includes("hello"), "the Claude block text should survive");

  // The client reads Claude events by name: the masked value must ride a named Claude event
  // whose name matches its type, before `message_stop`, which has to stay the final event.
  const events = sseEvents(text);
  assertNoBarePathMap(events);
  const stop = events.findIndex((e) => at(e.json, "type") === "message_stop");
  const masked = events.findIndex((e) => textAt(e.json, "usage_evidence").includes("[REDACTED"));
  assert.ok(masked !== -1, "the masked metadata never reached a usage_evidence field");
  assert.equal(
    events[masked].event,
    at(events[masked].json, "type"),
    "masked frame lost its event name"
  );
  assert.ok(masked < stop, "masked metadata was emitted after message_stop");
  for (const later of events.slice(stop + 1)) {
    assert.equal(later.data, "[DONE]", `an event followed message_stop: ${later.data}`);
  }
  for (const value of events.flatMap((e) => evidenceValues(e.json))) {
    assert.ok(!value.includes(key.slice(0, 6)), `a key fragment was emitted: ${value}`);
    assert.ok(!value.includes(key.slice(6, 30)), `a key fragment was emitted: ${value}`);
  }
  const answer = events
    .filter(
      (e) =>
        at(e.json, "type") === "content_block_delta" && at(e.json, "delta.type") === "text_delta"
    )
    .map((e) => textAt(e.json, "delta.text"))
    .join("");
  assert.equal(answer, "hello world");
});

test("an oversized metadata value hits the same byte limit as answer text", async () => {
  const { createCredentialSseTransform } =
    await import("../../src/lib/streamingCredentialTransform.ts");
  const transform = createCredentialSseTransform({ maxBufferedBytes: 1024 }) as TransformStream;
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  // Consume to the end: an enforced limit errors the stream and rejects a read; a stream that
  // accepts the oversized value completes instead, which fails the assertion below.
  const consumed = (async () => {
    for (;;) {
      const r = await reader.read();
      if (r.done) return "completed";
    }
  })();
  // A credential prefix holds the whole value in the window, so nothing is released and the
  // byte ceiling is what stops it. A plain string would drain down to the window size.
  const huge = "sk-" + "A".repeat(4096);
  await writer
    .write(
      new TextEncoder().encode(
        frame({ choices: [{ index: 0, delta: { content: "" } }], usage_evidence: huge })
      )
    )
    .catch(() => {
      /* the limit error rejects the write; the assertion is on the stream error */
    });
  await writer.close().catch(() => {
    /* already errored by the limit */
  });
  await assert.rejects(consumed, /buffer limit exceeded/);
});

async function runTransform(transform: TransformStream, chunks: string[]): Promise<string> {
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const writing = (async () => {
    for (const chunk of chunks) await writer.write(new TextEncoder().encode(chunk));
    await writer.close();
  })();
  const out: string[] = [];
  for (;;) {
    const r = await reader.read();
    if (r.done) break;
    out.push(new TextDecoder().decode(r.value));
  }
  await writing;
  return out.join("");
}

test("a metadata-only frame does not become the envelope of the answer flush", async () => {
  const { createCredentialSseTransform } =
    await import("../../src/lib/streamingCredentialTransform.ts");
  const out = await runTransform(createCredentialSseTransform() as TransformStream, [
    frame({ choices: [{ index: 0, delta: { content: "SMOKE" } }] }),
    frame({ usage_evidence: { provider: "openai" } }),
    "data: [DONE]\n\n",
  ]);
  assert.equal(contentOf(out), "SMOKE", `client got ${JSON.stringify(out)}`);
});

test("without a metadata window, excluded metadata labels never reach the processor", async () => {
  const { createSseTextTransform } = await import("../../src/lib/sseTextTransform.ts");
  const seen: string[] = [];
  const processor = (text: string) => {
    seen.push(text);
    return text;
  };
  const out = await runTransform(createSseTextTransform(processor), [
    frame({
      choices: [{ index: 0, delta: { content: "SMOKE" } }],
      usage_evidence: { provider: "openai", model: "gpt-x" },
    }),
    "data: [DONE]\n\n",
  ]);
  const leaked = (label: string) => seen.some((value) => value.includes(label));
  assert.ok(!leaked("openai"), `provider label reached the processor: ${seen}`);
  assert.ok(!leaked("gpt-x"), `model label reached the processor: ${seen}`);
  assert.ok(out.includes('"provider":"openai"'), "the label must pass through untouched");
});

test("fields with the same name under different ancestors keep separate windows", async () => {
  const { createCredentialSseTransform } =
    await import("../../src/lib/streamingCredentialTransform.ts");
  const out = await runTransform(createCredentialSseTransform() as TransformStream, [
    frame({
      choices: [{ index: 0, delta: { content: "SMOKE" } }],
      // A credential-shaped start is held in its window.
      usage_evidence: { note: "sk-proj-" },
      // A plain label on a different path must not append to that window.
      usage: { usage_evidence: { note: "plain label" } },
    }),
    "data: [DONE]\n\n",
  ]);
  const first = parsedChunks(out)[0] as { usage?: { usage_evidence?: { note?: unknown } } };
  assert.equal(first.usage?.usage_evidence?.note, "plain label");
});

test("Claude blocks keep separate metadata windows", async () => {
  const { createCredentialSseTransform } =
    await import("../../src/lib/streamingCredentialTransform.ts");
  const claude = (obj: unknown) => "event: content_block_delta\n" + frame(obj);
  const out = await runTransform(createCredentialSseTransform() as TransformStream, [
    claude({
      type: "content_block_delta",
      index: 0,
      delta: { type: "text_delta", text: "hello" },
      usage_evidence: "sk-proj-",
    }),
    claude({
      type: "content_block_delta",
      index: 1,
      delta: { type: "text_delta", text: " world" },
      usage_evidence: "label",
    }),
    "event: message_stop\n" + frame({ type: "message_stop" }),
  ]);
  const blockOne = parsedChunks(out).find((chunk) => chunk.index === 1);
  assert.equal(blockOne?.usage_evidence, "label");
});

test("stop-frame metadata emitted at once is not charged against the byte ceiling", async () => {
  const { createCredentialSseTransform } =
    await import("../../src/lib/streamingCredentialTransform.ts");
  // The answer lane holds its 512-character window; the stop frame's metadata value leaves in
  // that same frame and is retained nowhere, so only the 512 held characters count.
  const answer = "a".repeat(600);
  const label = "x".repeat(600);
  const out = await runTransform(
    createCredentialSseTransform({ maxBufferedBytes: 1024 }) as TransformStream,
    [
      frame({ choices: [{ index: 0, delta: { content: answer } }] }),
      frame({
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
        usage_evidence: label,
      }),
      "data: [DONE]\n\n",
    ]
  );
  assert.equal(contentOf(out), answer);
  assert.ok(out.includes(label), "the stop-frame metadata should be emitted with its frame");
});

test("interleaved Responses items keep separate metadata windows", async () => {
  const { createCredentialSseTransform } =
    await import("../../src/lib/streamingCredentialTransform.ts");
  const responses = (obj: Typed) => `event: ${obj.type}\n` + frame(obj);
  const out = await runTransform(createCredentialSseTransform() as TransformStream, [
    responses({
      type: "response.output_text.delta",
      item_id: "msg_a",
      output_index: 0,
      content_index: 0,
      delta: "hello",
      usage_evidence: "sk-proj-",
    }),
    responses({
      type: "response.output_text.delta",
      item_id: "msg_b",
      output_index: 1,
      content_index: 0,
      delta: " world",
      usage_evidence: "label",
    }),
  ]);
  const itemB = parsedChunks(out).find(
    (chunk) => chunk.item_id === "msg_b" && chunk.type === "response.output_text.delta"
  );
  assert.equal(itemB?.usage_evidence, "label");
});

// ── held metadata is released inside its protocol envelope, before the terminal event ──────

const SECRET = "sk-" + "ABCD".repeat(12);

function maskedEventIndex(events: SseEvent[]): number {
  return events.findIndex((e) =>
    evidenceValues(e.json).some((value) => value.includes("[REDACTED"))
  );
}

test("OpenAI: held usage metadata is released in its own chunk before [DONE]", async () => {
  const { createCredentialSseTransform } =
    await import("../../src/lib/streamingCredentialTransform.ts");
  const out = await runTransform(createCredentialSseTransform() as TransformStream, [
    frame({
      id: "c1",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: { content: "SMOKE" } }],
    }),
    // The include_usage chunk: no finish_reason, so its metadata goes through the window.
    frame({
      id: "c1",
      object: "chat.completion.chunk",
      choices: [],
      usage: { prompt_tokens: 1, usage_evidence: { note: `seen ${SECRET}` } },
    }),
    "data: [DONE]\n\n",
  ]);
  const events = sseEvents(out);
  assertNoBarePathMap(events);
  assert.ok(!out.includes(SECRET), "the credential leaked");
  const masked = maskedEventIndex(events);
  const done = events.findIndex((e) => e.data === "[DONE]");
  assert.ok(masked !== -1, "the masked metadata never reached its usage_evidence field");
  const chunk = events[masked].json;
  assert.equal(at(chunk, "object"), "chat.completion.chunk", "masked metadata left its envelope");
  assert.ok(Array.isArray(at(chunk, "choices")), "masked metadata left its chunk envelope");
  assert.equal(at(chunk, "usage.prompt_tokens"), 1, "the usage object around the value was lost");
  assert.match(textAt(chunk, "usage.usage_evidence.note"), /^seen \[REDACTED/);
  assert.ok(masked < done, "masked metadata was emitted after [DONE]");
  assert.equal(done, events.length - 1, "[DONE] must stay the last event");
  for (const { json } of events) {
    if (json) assert.ok(Array.isArray(json.choices), "a non-chunk frame reached the client");
  }
  assert.equal(contentOf(out), "SMOKE");
});

test("Claude: held metadata is released on a named event before message_stop", async () => {
  const { createCredentialSseTransform } =
    await import("../../src/lib/streamingCredentialTransform.ts");
  const claude = (obj: Typed) => `event: ${obj.type}\n` + frame(obj);
  const out = await runTransform(createCredentialSseTransform() as TransformStream, [
    claude({
      type: "message_start",
      message: { id: "msg_1", type: "message", role: "assistant", content: [], usage: {} },
    }),
    claude({ type: "content_block_start", index: 0, content_block: { type: "text", text: "" } }),
    claude({
      type: "content_block_delta",
      index: 0,
      delta: { type: "text_delta", text: "hello" },
      usage_evidence: `seen ${SECRET}`,
    }),
    claude({
      type: "content_block_delta",
      index: 0,
      delta: { type: "text_delta", text: " world" },
    }),
    claude({ type: "content_block_stop", index: 0 }),
    claude({
      type: "message_delta",
      delta: { stop_reason: "end_turn", stop_sequence: null },
      usage: { output_tokens: 2 },
    }),
    claude({ type: "message_stop" }),
  ]);
  const events = sseEvents(out);
  assertNoBarePathMap(events);
  assert.ok(!out.includes(SECRET), "the credential leaked");
  for (const e of events)
    assert.equal(e.event, at(e.json, "type"), `unnamed or misnamed event: ${e.data}`);
  const masked = maskedEventIndex(events);
  const stop = events.findIndex((e) => at(e.json, "type") === "message_stop");
  assert.ok(masked !== -1, "the masked metadata never reached its usage_evidence field");
  assert.equal(
    at(events[masked].json, "type"),
    "content_block_delta",
    "the value moved to another event"
  );
  assert.match(textAt(events[masked].json, "usage_evidence"), /^seen \[REDACTED/);
  assert.ok(masked < stop, "masked metadata was emitted after message_stop");
  assert.equal(stop, events.length - 1, "message_stop must stay the final event");
  const answer = events
    .filter(
      (e) =>
        at(e.json, "type") === "content_block_delta" && at(e.json, "delta.type") === "text_delta"
    )
    .map((e) => textAt(e.json, "delta.text"))
    .join("");
  assert.equal(answer, "hello world");
});

test("Responses: held metadata is released on its own event before response.completed", async () => {
  const { createCredentialSseTransform } =
    await import("../../src/lib/streamingCredentialTransform.ts");
  const responses = (obj: Typed) => `event: ${obj.type}\n` + frame(obj);
  const lane = { item_id: "msg_a", output_index: 0, content_index: 0 };
  const out = await runTransform(createCredentialSseTransform() as TransformStream, [
    responses({ type: "response.created", response: { id: "resp_1", status: "in_progress" } }),
    responses({
      type: "response.output_text.delta",
      ...lane,
      delta: "hello",
      usage_evidence: `seen ${SECRET}`,
    }),
    responses({ type: "response.output_text.delta", ...lane, delta: " world" }),
    responses({ type: "response.output_text.done", ...lane, text: "hello world" }),
    responses({
      type: "response.completed",
      response: { id: "resp_1", status: "completed", output: [] },
    }),
  ]);
  const events = sseEvents(out);
  assertNoBarePathMap(events);
  assert.ok(!out.includes(SECRET), "the credential leaked");
  for (const e of events)
    assert.equal(e.event, at(e.json, "type"), `unnamed or misnamed event: ${e.data}`);
  const masked = maskedEventIndex(events);
  const completed = events.findIndex((e) => at(e.json, "type") === "response.completed");
  assert.ok(masked !== -1, "the masked metadata never reached its usage_evidence field");
  assert.equal(at(events[masked].json, "type"), "response.output_text.delta");
  assert.match(textAt(events[masked].json, "usage_evidence"), /^seen \[REDACTED/);
  assert.ok(masked < completed, "masked metadata was emitted after response.completed");
  assert.equal(completed, events.length - 1, "response.completed must stay the final event");
  const answer = events
    .filter((e) => at(e.json, "type") === "response.output_text.delta")
    .map((e) => textAt(e.json, "delta"))
    .join("");
  assert.equal(answer, "hello world");
});

// ── a trailing fragment that can still grow into a credential prefix is held ────────────────

async function splitEvidence(first: string, second: string): Promise<string> {
  const { createCredentialSseTransform } =
    await import("../../src/lib/streamingCredentialTransform.ts");
  return runTransform(createCredentialSseTransform() as TransformStream, [
    frame({ choices: [{ index: 0, delta: { content: "SMOKE" } }], usage_evidence: first }),
    frame({ choices: [{ index: 0, delta: {} }], usage_evidence: second }),
    "data: [DONE]\n\n",
  ]);
}

test("a short value ending in 'sk-an' is not emitted before its continuation is known", async () => {
  const body = "C".repeat(30);
  const out = await splitEvidence("note sk-an", `t-api03-${body}`);
  const events = sseEvents(out);
  assertNoBarePathMap(events);
  assert.ok(!out.includes(body), "the credential body leaked");
  assert.ok(!out.includes("sk-an"), "the prefix fragment was emitted unmasked");
  const masked = maskedEventIndex(events);
  assert.ok(masked !== -1, "the joined credential was not masked in a usage_evidence field");
  assert.ok(Array.isArray(at(events[masked].json, "choices")), "masked metadata left its chunk");
  assert.equal(contentOf(out), "SMOKE");
});

test("a one-letter prefix fragment ('s') is held until the next frame resolves it", async () => {
  const body = "B".repeat(30);
  const out = await splitEvidence("note s", `k-ant-api03-${body}`);
  assert.ok(!out.includes(body), "the credential body leaked past a split 's' + 'k-ant-…'");
  const values = sseEvents(out).flatMap((e) => evidenceValues(e.json));
  assert.ok(!values.includes("note s"), "the fragment was emitted before it was resolved");
  assert.ok(
    values.some((value) => value.includes("[REDACTED")),
    "the joined key was not masked"
  );
  assert.equal(contentOf(out), "SMOKE");
});

test("a fragment still held at the end of the stream is released whole in its own chunk", async () => {
  const { createCredentialSseTransform } =
    await import("../../src/lib/streamingCredentialTransform.ts");
  const out = await runTransform(createCredentialSseTransform() as TransformStream, [
    frame({ choices: [{ index: 0, delta: { content: "SMOKE" } }], usage_evidence: "note sk-an" }),
    "data: [DONE]\n\n",
  ]);
  const events = sseEvents(out);
  assertNoBarePathMap(events);
  assert.equal(
    at(events[0].json, "usage_evidence"),
    "note sk-an",
    "the dangling value was not restored"
  );
  assert.equal(events.at(-1)?.data, "[DONE]");
  assert.equal(contentOf(out), "SMOKE");
});

test("frames held behind unresolved metadata are bounded by the deferral limit", async () => {
  const { createCredentialSseTransform } =
    await import("../../src/lib/streamingCredentialTransform.ts");
  const transform = createCredentialSseTransform({ maxDeferredBytes: 1024 }) as TransformStream;
  const chunks = [
    frame({ choices: [{ index: 0, delta: { content: "a" } }], usage_evidence: "sk-proj-" }),
  ];
  for (let i = 0; i < 40; i++) {
    chunks.push(frame({ choices: [{ index: 0, delta: { content: "b".repeat(64) } }] }));
  }
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  // Consume to the end: the limit errors the stream and rejects a read; a stream that keeps
  // queueing completes instead, which fails the assertion below.
  const consumed = (async () => {
    for (;;) {
      const r = await reader.read();
      if (r.done) return "completed";
    }
  })();
  for (const chunk of chunks) {
    await writer.write(new TextEncoder().encode(chunk)).catch(() => {
      /* the limit error rejects the write; the assertion is on the stream error */
    });
  }
  await writer.close().catch(() => {
    /* already errored by the limit */
  });
  await assert.rejects(consumed, /buffer limit exceeded/);
});
