import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const previousDataDir = process.env.DATA_DIR;
const data = fs.mkdtempSync(path.join(os.tmpdir(), "combo-stream-checkpoint-"));
process.env.DATA_DIR = data;
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.EMPTY_STREAM_SIBLING_RECOVERY_ENABLED = "false";
process.env.STREAM_RECOVERY_ENABLED = "false";

type Options = import("../../open-sse/services/combo/types.ts").HandleComboChatOptions;
type ReasoningCheckpoint =
  import("../../open-sse/services/combo/reasoningCheckpoint.ts").ReasoningCheckpoint;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { dispatchEvent } = await import("../../src/lib/webhookDispatcher.ts");
const { wrapComboStreamWithCheckpoint, stitchSuffix } =
  await import("../../open-sse/services/combo/streamCheckpointRecovery.ts");
const { SseEventBuffer, findEventEnd } =
  await import("../../open-sse/services/combo/streamCheckpointFrames.ts");

const FLAG = "COMBO_STREAM_CHECKPOINT_ENABLED";
const RESUME_FIELD = "_omnirouteComboCheckpointResume";
const UPSTREAM_ONLY = "_omnirouteSuppressRequestPersistence";
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const a = "ckpt-a/first";
const b = "ckpt-b/second";
const c = "ckpt-c/third";
const noop = () => {};

const frame = (id: string, delta: Record<string, unknown>, finish: string | null = null) =>
  `data: ${JSON.stringify({
    id,
    object: "chat.completion.chunk",
    created: 1700000000,
    model: "m",
    choices: [{ index: 0, delta, finish_reason: finish }],
  })}\n\n`;
const first = (delta: Record<string, unknown>, finish: string | null = null) =>
  frame("chatcmpl-first", delta, finish);
const second = (delta: Record<string, unknown>, finish: string | null = null) =>
  frame("chatcmpl-second", delta, finish);
const role = first({ role: "assistant" });
const reasoning = (text: string) => first({ reasoning_content: text });
const content = (text: string) => first({ content: text });
const replacementContent = (text: string) => second({ content: text });
const replacementStop = second({}, "stop");
const DONE = "data: [DONE]\n\n";
const cutFrame = `data: ${JSON.stringify({
  error: { message: "upstream stream terminated", type: "stream_error", code: "stream_terminated" },
})}\n\n`;

type Source = {
  stream: ReadableStream<Uint8Array>;
  state: { cancels: number; pulledBytes: number };
};

/** One chunk per pull; `end` decides what follows: a clean close, a stall, or a read error. */
function source(chunks: (string | Uint8Array)[], end: "close" | "stall" | Error = "close"): Source {
  const state = { cancels: 0, pulledBytes: 0 };
  let index = 0;
  const stream = new ReadableStream<Uint8Array>(
    {
      pull(controller) {
        if (index < chunks.length) {
          const next = chunks[index++];
          const bytes = typeof next === "string" ? encoder.encode(next) : next;
          state.pulledBytes += bytes.byteLength;
          controller.enqueue(bytes);
          return undefined;
        }
        if (end === "close") controller.close();
        else if (end instanceof Error) controller.error(end);
        else return new Promise<void>(() => {});
        return undefined;
      },
      cancel() {
        state.cancels++;
      },
    },
    { highWaterMark: 0 }
  );
  return { stream, state };
}

/** The same frames cut into pieces of `size` bytes, so a multi-byte character can be split. */
function pieces(frames: string[], size: number): Uint8Array[] {
  const bytes = encoder.encode(frames.join(""));
  const out: Uint8Array[] = [];
  for (let at = 0; at < bytes.length; at += size) out.push(bytes.slice(at, at + size));
  return out;
}

const sse = (body: ReadableStream<Uint8Array>) =>
  new Response(body, { status: 200, headers: { "content-type": "text/event-stream" } });

function coded(code = "ECONNRESET") {
  return Object.assign(new Error("connection interrupted"), { code });
}

type Client = {
  raw: string;
  text: string;
  reasoning: string;
  ids: string[];
  doneCount: number;
  finishReasons: string[];
  usageFrames: unknown[];
  errors: unknown[];
};

function parseClient(raw: string): Client {
  const out: Client = {
    raw,
    text: "",
    reasoning: "",
    ids: [],
    doneCount: 0,
    finishReasons: [],
    usageFrames: [],
    errors: [],
  };
  for (const line of raw.split(/\r?\n/)) {
    if (!line.startsWith("data:")) continue;
    const payload = line.slice(5).trim();
    if (payload === "[DONE]") {
      out.doneCount++;
      continue;
    }
    const parsed = JSON.parse(payload);
    if (parsed.error) out.errors.push(parsed.error);
    if (typeof parsed.id === "string" && !out.ids.includes(parsed.id)) out.ids.push(parsed.id);
    if (parsed.usage) out.usageFrames.push(parsed.usage);
    const choice = parsed.choices?.[0];
    if (typeof choice?.delta?.content === "string") out.text += choice.delta.content;
    if (typeof choice?.delta?.reasoning_content === "string") {
      out.reasoning += choice.delta.reasoning_content;
    }
    if (choice?.finish_reason) out.finishReasons.push(choice.finish_reason);
  }
  return out;
}

/** Read the response incrementally, as a client does, decoding across chunk boundaries. */
async function readClient(response: Response): Promise<Client> {
  const reader = response.body!.getReader();
  const streaming = new TextDecoder();
  let raw = "";
  for (;;) {
    const next = await reader.read();
    if (next.done) break;
    raw += streaming.decode(next.value, { stream: true });
  }
  raw += streaming.decode();
  return parseClient(raw);
}

test.beforeEach(() => {
  clearAllModelLockouts();
  delete process.env[FLAG];
});
test.after(async () => {
  delete process.env[FLAG];
  await dispatchEvent("request.completed", {});
  await closeCallLogSaves(2000);
  resetDbInstance();
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
});
// Modules that captured DATA_DIR keep the path until the process ends: remove it only then.
process.on("exit", () => fs.rmSync(data, { recursive: true, force: true }));

// ─── The pure parts ────────────────────────────────────────────────────────────

test("an SSE event buffer cuts on bytes: CRLF, a CR at a chunk edge, a split multi-byte character", () => {
  const raw = encoder.encode('data: {"a":"🌱"}\r\n\r\ndata: two\n\n: ping\r\r');
  const buffer = new SseEventBuffer();
  const events: string[] = [];
  for (let at = 0; at < raw.length; at += 3) {
    for (const event of buffer.push(raw.slice(at, at + 3))) events.push(decoder.decode(event));
  }
  assert.deepEqual(events, ['data: {"a":"🌱"}\r\n\r\n', "data: two\n\n"]);
  // A CR at the very end could still become a CRLF: the tail waits and is handed back whole.
  assert.equal(decoder.decode(buffer.drain()), ": ping\r\r");
  assert.equal(findEventEnd(encoder.encode("data: x\n")), -1);
  assert.equal(findEventEnd(encoder.encode("data: x\r\n\r")), -1);
});

test("stitchSuffix removes the exact anchor echo once and never normalizes", () => {
  assert.equal(
    stitchSuffix("A resposta começa aqui 🌱", "A resposta começa aqui 🌱 e continua."),
    " e continua."
  );
  // Whitespace the client already has after the anchor is not repeated.
  assert.equal(stitchSuffix("Olá mundo\n\n", "Olá mundo\n\nSegue o resto."), "Segue o resto.");
  assert.equal(stitchSuffix("Olá mundo\n\n", "Olá mundo e mais."), " e mais.");
  // Only the anchor (the end of the text) has to be echoed, never the whole prefix.
  const long = `${"palavra ".repeat(40)}fim da frase`;
  assert.equal(stitchSuffix(long, "palavra palavra fim da frase, e segue."), null);
  assert.equal(
    stitchSuffix(long, `${long.slice(-64)}, e segue.`),
    ", e segue.",
    "the anchor is the last 64 code points"
  );
  // No normalization: composed and decomposed accents are different bytes.
  assert.equal(stitchSuffix("café", "café e mais"), null);
  assert.equal(stitchSuffix("Hello", "hello there"), null);
  assert.equal(
    stitchSuffix("Hello", "Hello"),
    null,
    "an echo with nothing after it is not a suffix"
  );
  assert.equal(stitchSuffix("Hello", "Hello   "), null);
  // Nothing delivered: the replacement is a whole answer.
  assert.equal(stitchSuffix("", "Uma resposta inteira."), "Uma resposta inteira.");
  assert.equal(stitchSuffix("  ", "   "), null);
});

test("makeCheckpointRequest after-cut quotes the text, the anchor and the draft as JSON data", async () => {
  const { makeCheckpointRequest, anchorOf } =
    await import("../../open-sse/services/combo/reasoningCheckpoint.ts");
  const messages = [{ role: "user", content: "hello" }];
  const body = Object.freeze({ model: "m", stream: true, messages: Object.freeze(messages) });
  const checkpoint = { text: 'He said "hi" 🌱', reasoning: "my notes", truncated: false };
  const next = makeCheckpointRequest(body, checkpoint, "after-cut");
  assert.ok(next);
  const sent = next.messages as Array<{ role: string; content: string }>;
  assert.equal(sent.length, 2);
  assert.deepEqual(sent.slice(1), messages);
  assert.equal(sent[0].role, "system");
  assert.match(sent[0].content, /untrusted/i);
  const quoted = JSON.parse(sent[0].content.slice(sent[0].content.indexOf("{")));
  assert.equal(quoted.delivered_text, checkpoint.text);
  assert.equal(quoted.anchor, anchorOf(checkpoint.text));
  assert.equal(quoted.draft_reasoning, "my notes");
  assert.deepEqual(body.messages, messages, "the original body is not mutated");
  // Nothing delivered: the same body as before-answer.
  const fresh = makeCheckpointRequest(
    body,
    { text: "", reasoning: "my notes", truncated: false },
    "after-cut"
  );
  assert.deepEqual(
    fresh,
    makeCheckpointRequest(
      body,
      { text: "", reasoning: "my notes", truncated: false },
      "before-answer"
    )
  );
});

test("makeCheckpointRequest after-cut refuses what cannot be forwarded safely", async () => {
  const { makeCheckpointRequest } =
    await import("../../open-sse/services/combo/reasoningCheckpoint.ts");
  const base = { model: "m", messages: [{ role: "user", content: "hello" }] };
  const good = { text: "Some answer", reasoning: "", truncated: false };
  assert.ok(makeCheckpointRequest(base, good, "after-cut"));
  assert.equal(makeCheckpointRequest(base, { ...good, truncated: true }, "after-cut"), null);
  assert.equal(
    makeCheckpointRequest({ ...base, tools: [{ type: "function" }] }, good, "after-cut"),
    null
  );
  assert.equal(makeCheckpointRequest({ model: "m" }, good, "after-cut"), null);
  assert.equal(
    makeCheckpointRequest(base, { text: "", reasoning: "", truncated: false }, "after-cut"),
    null
  );
  // The anchor is compared with what the client received, so it can never be redacted.
  const secret = `sk-proj-${"a1B2c3D4e5".repeat(4)}`;
  assert.equal(
    makeCheckpointRequest(base, { ...good, text: `the key is ${secret}` }, "after-cut"),
    null
  );
  const earlier = makeCheckpointRequest(
    base,
    { ...good, text: `the key is ${secret} ${"x".repeat(80)}` },
    "after-cut"
  );
  assert.ok(earlier);
  assert.ok(
    !JSON.stringify(earlier).includes(secret),
    "credential shapes in the text are redacted"
  );
});

// ─── The wrapper, without a combo ──────────────────────────────────────────────

type WrapOverrides = Partial<{
  signal: AbortSignal;
  resumeTimeoutMs: number;
  maxCheckpointBytes: number;
  maxReplacementBytes: number;
  openNext: (checkpoint: ReasoningCheckpoint, signal: AbortSignal) => Promise<Response | null>;
  outcomes: unknown[];
}>;

function wrap(input: Response, overrides: WrapOverrides = {}) {
  const outcomes = overrides.outcomes ?? [];
  const seen: { checkpoints: unknown[]; signals: AbortSignal[] } = { checkpoints: [], signals: [] };
  const wrapped = wrapComboStreamWithCheckpoint(input, {
    signal: overrides.signal ?? new AbortController().signal,
    resumeTimeoutMs: overrides.resumeTimeoutMs ?? 5000,
    maxCheckpointBytes: overrides.maxCheckpointBytes ?? 64 * 1024,
    maxReplacementBytes: overrides.maxReplacementBytes ?? 64 * 1024,
    openNext:
      overrides.openNext ??
      (async (checkpoint, signal) => {
        seen.checkpoints.push(checkpoint);
        seen.signals.push(signal);
        return sse(
          source([
            replacementContent("A resposta começa aqui 🌱 e continua."),
            replacementStop,
            DONE,
          ]).stream
        );
      }),
    onOutcome: (outcome) => outcomes.push(outcome),
  });
  return { wrapped, outcomes, seen };
}

const PREFIX = [
  role,
  reasoning("Primeiro verifico "),
  reasoning("a condição."),
  content("A resposta começa "),
  content("aqui 🌱"),
];

test("wrapper: a stream that finishes normally is forwarded byte for byte and never resumed", async () => {
  const frames = [...PREFIX, first({}, "stop"), DONE];
  const { wrapped, outcomes } = wrap(sse(source(pieces(frames, 7)).stream));
  assert.equal((await readClient(wrapped)).raw, frames.join(""));
  assert.deepEqual(outcomes, []);
});

test("wrapper: frames it does not follow end its claim and every byte is kept", async () => {
  const toolCall = first({ tool_calls: [{ index: 0, id: "t", function: { name: "f" } }] });
  const frames = [...PREFIX, toolCall, cutFrame, DONE];
  const { wrapped, outcomes } = wrap(sse(source(pieces(frames, 5)).stream));
  assert.equal((await readClient(wrapped)).raw, frames.join(""));
  assert.deepEqual(outcomes, [], "a tool call is never resumed");

  const multi = `data: ${JSON.stringify({
    id: "x",
    choices: [
      { index: 0, delta: { content: "a" } },
      { index: 1, delta: { content: "b" } },
    ],
  })}\n\n`;
  const frames2 = [content("one"), multi, cutFrame, DONE];
  const second = wrap(sse(source(frames2).stream));
  assert.equal((await readClient(second.wrapped)).raw, frames2.join(""));
  assert.deepEqual(second.outcomes, []);
});

test("wrapper: a cut frame is held, the replacement is stitched and the held failure is dropped", async () => {
  const frames = [...PREFIX, cutFrame, DONE];
  const { wrapped, outcomes, seen } = wrap(sse(source(pieces(frames, 7)).stream));
  const client = await readClient(wrapped);
  assert.equal(client.text, "A resposta começa aqui 🌱 e continua.");
  assert.equal(client.reasoning, "Primeiro verifico a condição.");
  assert.deepEqual(client.ids, ["chatcmpl-first"]);
  assert.equal(client.doneCount, 1);
  assert.deepEqual(client.finishReasons, ["stop"]);
  assert.deepEqual(client.errors, []);
  assert.deepEqual(seen.checkpoints, [
    {
      text: "A resposta começa aqui 🌱",
      reasoning: "Primeiro verifico a condição.",
      truncated: false,
    },
  ]);
  assert.equal(outcomes.length, 1);
  assert.deepEqual(outcomes[0], {
    kind: "resumed",
    suffixChars: " e continua.".length,
    checkpointChars: "A resposta começa aqui 🌱".length,
  });
  // The prefix reached the client untouched.
  assert.ok(client.raw.startsWith(PREFIX.join("")));
});

test("wrapper: EOF without a terminal and a transport error are cuts too", async () => {
  const eof = wrap(sse(source(PREFIX).stream));
  assert.equal((await readClient(eof.wrapped)).text, "A resposta começa aqui 🌱 e continua.");
  const transport = wrap(sse(source(PREFIX, coded()).stream));
  assert.equal((await readClient(transport.wrapped)).text, "A resposta começa aqui 🌱 e continua.");
});

test("wrapper: a transport error that the combo cannot resume is delivered as the same error", async () => {
  const refusing = wrap(sse(source(PREFIX, coded()).stream), { openNext: async () => null });
  const reader = refusing.wrapped.body!.getReader();
  let received = "";
  let failure: unknown = null;
  try {
    for (;;) {
      const next = await reader.read();
      if (next.done) break;
      received += decoder.decode(next.value, { stream: true });
    }
  } catch (error) {
    failure = error;
  }
  assert.equal(received, PREFIX.join(""));
  assert.equal((failure as { code?: string })?.code, "ECONNRESET");
  assert.deepEqual(refusing.outcomes, [{ kind: "refused", reason: "no-target" }]);
});

test("wrapper: an unclassified read failure is propagated, not resumed", async () => {
  let opened = 0;
  const { wrapped, outcomes } = wrap(sse(source(PREFIX, new Error("boom")).stream), {
    openNext: async () => {
      opened++;
      return null;
    },
  });
  await assert.rejects(readClient(wrapped), /boom/);
  assert.equal(opened, 0);
  assert.deepEqual(outcomes, []);
});

test("wrapper: a cut with only reasoning accepts the first textual answer whole", async () => {
  const frames = [role, reasoning("Primeiro verifico "), reasoning("a condição."), cutFrame, DONE];
  const checkpoints: ReasoningCheckpoint[] = [];
  const { wrapped } = wrap(sse(source(frames).stream), {
    openNext: async (checkpoint) => {
      checkpoints.push(checkpoint);
      return sse(
        source([
          second({ reasoning_content: "novo raciocínio que não deve aparecer" }),
          replacementContent("Resposta "),
          replacementContent("completa."),
          replacementStop,
          DONE,
        ]).stream
      );
    },
  });
  const client = await readClient(wrapped);
  assert.equal(client.text, "Resposta completa.");
  assert.equal(client.reasoning, "Primeiro verifico a condição.");
  assert.ok(!client.raw.includes("novo raciocínio"));
  assert.deepEqual(client.ids, ["chatcmpl-first"]);
  assert.deepEqual(checkpoints, [
    { text: "", reasoning: "Primeiro verifico a condição.", truncated: false },
  ]);
});

test("wrapper: usage from the replacement arrives once, in the first identity", async () => {
  const usage = { prompt_tokens: 12, completion_tokens: 7, total_tokens: 19 };
  const usageFrame = `data: ${JSON.stringify({
    id: "chatcmpl-second",
    object: "chat.completion.chunk",
    choices: [],
    usage,
  })}\n\n`;
  const { wrapped } = wrap(sse(source([...PREFIX, cutFrame, DONE]).stream), {
    openNext: async () =>
      sse(
        source([
          replacementContent("A resposta começa aqui 🌱 e continua."),
          replacementStop,
          usageFrame,
          DONE,
        ]).stream
      ),
  });
  const client = await readClient(wrapped);
  assert.deepEqual(client.usageFrames, [usage]);
  assert.deepEqual(client.ids, ["chatcmpl-first"]);
  assert.equal(client.doneCount, 1);
});

const refusals: Array<[string, () => Response | Promise<Response | null>, string]> = [
  [
    "an anchor that does not match",
    () => sse(source([replacementContent("Outra coisa."), replacementStop, DONE]).stream),
    "anchor-mismatch",
  ],
  [
    "a tool call",
    () =>
      sse(
        source([
          second({ tool_calls: [{ index: 0, id: "t", function: { name: "f" } }] }),
          second({}, "tool_calls"),
          DONE,
        ]).stream
      ),
    "replacement-unsupported",
  ],
  [
    "no known terminal",
    () => sse(source([replacementContent("A resposta começa aqui 🌱 e continua.")]).stream),
    "replacement-no-terminal",
  ],
  [
    "a content filter terminal",
    () =>
      sse(
        source([
          replacementContent("A resposta começa aqui 🌱 e continua."),
          second({}, "content_filter"),
          DONE,
        ]).stream
      ),
    "replacement-no-terminal",
  ],
  [
    "an in-stream error",
    () =>
      sse(
        source([
          replacementContent("A resposta começa aqui 🌱 e continua."),
          `data: ${JSON.stringify({ error: { message: "x", type: "stream_error", code: "stream_terminated" } })}\n\n`,
        ]).stream
      ),
    "replacement-unsupported",
  ],
  [
    "an echo with nothing after it",
    () =>
      sse(source([replacementContent("A resposta começa aqui 🌱"), replacementStop, DONE]).stream),
    "anchor-mismatch",
  ],
  [
    "a failed status",
    () => new Response("nope", { status: 500, headers: { "content-type": "application/json" } }),
    "replacement-status",
  ],
  [
    "a non-streaming body",
    () => new Response("{}", { status: 200, headers: { "content-type": "application/json" } }),
    "replacement-status",
  ],
];

for (const [name, replacement, reason] of refusals) {
  test(`wrapper: ${name} keeps the prefix and delivers the original failure`, async () => {
    const frames = [...PREFIX, cutFrame, DONE];
    const { wrapped, outcomes } = wrap(sse(source(pieces(frames, 9)).stream), {
      openNext: async () => replacement(),
    });
    const client = await readClient(wrapped);
    assert.equal(client.raw, frames.join(""), "prefix and original failure, byte for byte");
    assert.deepEqual(outcomes, [{ kind: "refused", reason }]);
  });
}

test("wrapper: an oversized replacement is refused and its reader released once", async () => {
  const replacement = source(
    [
      replacementContent("A resposta começa aqui 🌱 "),
      ...Array.from({ length: 30 }, () => replacementContent("z".repeat(512))),
    ],
    "stall"
  );
  const frames = [...PREFIX, cutFrame, DONE];
  const { wrapped, outcomes } = wrap(sse(source(frames).stream), {
    maxReplacementBytes: 4 * 1024,
    openNext: async () => sse(replacement.stream),
  });
  assert.equal((await readClient(wrapped)).raw, frames.join(""));
  assert.deepEqual(outcomes, [{ kind: "refused", reason: "replacement-too-large" }]);
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(replacement.state.cancels, 1);
  assert.ok(
    replacement.state.pulledBytes <= 4 * 1024 + 2 * 600,
    `${replacement.state.pulledBytes}`
  );
});

test("wrapper: a checkpoint over its byte cap is never forwarded", async () => {
  let opened = 0;
  const frames = [content("x".repeat(600)), content("y".repeat(600)), cutFrame, DONE];
  const { wrapped, outcomes } = wrap(sse(source(frames).stream), {
    maxCheckpointBytes: 1000,
    openNext: async () => {
      opened++;
      return null;
    },
  });
  assert.equal((await readClient(wrapped)).raw, frames.join(""));
  assert.equal(opened, 0);
  assert.deepEqual(outcomes, [{ kind: "refused", reason: "truncated" }]);
});

test("wrapper: signed reasoning makes the checkpoint incomplete and it is not forwarded", async () => {
  let opened = 0;
  const signed = first({
    reasoning_content: "SIGNED-THOUGHT",
    reasoning_details: [{ type: "reasoning.text", text: "x", signature: "sig==" }],
  });
  const frames = [content("Resposta"), signed, cutFrame, DONE];
  const { wrapped, outcomes } = wrap(sse(source(frames).stream), {
    openNext: async () => {
      opened++;
      return null;
    },
  });
  assert.equal((await readClient(wrapped)).raw, frames.join(""));
  assert.equal(opened, 0);
  assert.deepEqual(outcomes, [{ kind: "refused", reason: "truncated" }]);
});

test("wrapper: the resume deadline aborts the replacement and the client gets the failure", async () => {
  const frames = [...PREFIX, cutFrame, DONE];
  let replacementSignal: AbortSignal | null = null;
  const body = source([replacementContent("A resposta começa aqui 🌱")], "stall");
  const { wrapped, outcomes } = wrap(sse(source(frames).stream), {
    resumeTimeoutMs: 60,
    openNext: async (_checkpoint, signal) => {
      replacementSignal = signal;
      return sse(body.stream);
    },
  });
  const client = await readClient(wrapped);
  assert.equal(client.raw, frames.join(""));
  assert.equal((replacementSignal as AbortSignal | null)?.aborted, true);
  assert.deepEqual(outcomes, [{ kind: "refused", reason: "timeout" }]);
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(body.state.cancels, 1);
});

test("wrapper: a deadline that passes while the replacement is still opening cancels it when it arrives", async () => {
  const frames = [...PREFIX, cutFrame, DONE];
  const late = source([replacementContent("tarde demais")], "stall");
  const { wrapped, outcomes } = wrap(sse(source(frames).stream), {
    resumeTimeoutMs: 40,
    openNext: (_checkpoint, signal) =>
      new Promise((resolve) => {
        signal.addEventListener("abort", () => setTimeout(() => resolve(sse(late.stream)), 10), {
          once: true,
        });
      }),
  });
  assert.equal((await readClient(wrapped)).raw, frames.join(""));
  assert.deepEqual(outcomes, [{ kind: "refused", reason: "timeout" }]);
  await new Promise((resolve) => setTimeout(resolve, 60));
  assert.equal(late.state.cancels, 1);
});

test("wrapper: an openNext that throws is reported sanitized and the failure is delivered", async () => {
  const frames = [...PREFIX, cutFrame, DONE];
  const { wrapped, outcomes } = wrap(sse(source(frames).stream), {
    openNext: async () => {
      throw new Error("dispatch exploded for key sk-proj-" + "a1B2c3D4e5".repeat(4));
    },
  });
  assert.equal((await readClient(wrapped)).raw, frames.join(""));
  assert.equal(outcomes.length, 1);
  const outcome = outcomes[0] as { kind: string; reason: string; detail: string };
  assert.equal(outcome.reason, "open-failed");
  assert.ok(!outcome.detail.includes("a1B2c3D4e5"), outcome.detail);
});

test("wrapper: the client cancelling while a cut is held releases the source once and opens nothing", async () => {
  const src = source([...PREFIX, cutFrame], "stall");
  let opened = 0;
  const { wrapped } = wrap(sse(src.stream), {
    openNext: async () => {
      opened++;
      return null;
    },
  });
  const reader = wrapped.body!.getReader();
  await reader.read();
  await reader.cancel(new Error("client gone"));
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(src.state.cancels, 1);
  assert.equal(opened, 0);
});

test("wrapper: a client abort during the opening aborts the replacement and releases it once", async () => {
  const controller = new AbortController();
  const frames = [...PREFIX, cutFrame, DONE];
  const body = source([replacementContent("A resposta começa aqui 🌱")], "stall");
  let replacementSignal: AbortSignal | null = null;
  const { wrapped, outcomes } = wrap(sse(source(frames).stream), {
    signal: controller.signal,
    openNext: (_checkpoint, signal) => {
      replacementSignal = signal;
      return new Promise((resolve) => {
        signal.addEventListener("abort", () => resolve(sse(body.stream)), { once: true });
      });
    },
  });
  const reader = wrapped.body!.getReader();
  let seen = "";
  while (!seen.includes("🌱")) {
    const next = await reader.read();
    if (next.done) break;
    seen += decoder.decode(next.value, { stream: true });
  }
  setTimeout(() => controller.abort(new Error("client gone")), 20);
  const next = await reader.read();
  assert.equal(next.done, true, "the stream ends quietly once the client is gone");
  assert.equal((replacementSignal as AbortSignal | null)?.aborted, true);
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(body.state.cancels, 1);
  assert.deepEqual(outcomes, [{ kind: "refused", reason: "aborted" }]);
});

// ─── handleComboChat: the routing path ─────────────────────────────────────────

let sequence = 0;
const originalMessages = [{ role: "user", content: "Qual a condição?" }];

function setup(config: Record<string, unknown> = {}, models: string[] = [a, b]) {
  const name = `ckpt-${++sequence}`;
  const combo = {
    name,
    strategy: "priority",
    models: models.map((model) => ({ model })),
    config: {
      maxRetries: 0,
      retryDelayMs: 0,
      fallbackDelayMs: 0,
      targetTimeoutMs: 5000,
      resumeStreamFromCheckpoint: true,
      reasoningCheckpointProviders: ["ckpt-b", "ckpt-c"],
      ...config,
    },
  };
  return { combo, allCombos: [combo] };
}

type Dispatch = {
  model: string;
  body: Record<string, unknown>;
  signal: AbortSignal | null;
};

async function run(
  handler: (dispatch: Dispatch) => Response | Promise<Response>,
  opts: {
    config?: Record<string, unknown>;
    models?: string[];
    body?: Record<string, unknown>;
    logs?: string[];
    signal?: AbortSignal;
  } = {}
) {
  const fixture = setup(opts.config, opts.models);
  const dispatched: Dispatch[] = [];
  const logs = opts.logs ?? [];
  const sink = (...args: unknown[]) => void logs.push(args.map(String).join(" "));
  const response = await handleComboChat({
    ...fixture,
    body: {
      stream: true,
      messages: structuredClone(originalMessages),
      ...(opts.body ?? {}),
    },
    ...(opts.signal ? { signal: opts.signal } : {}),
    settings: {
      resilienceSettings: { streamRecovery: { enabled: false }, modelLockout: { enabled: false } },
    },
    hiddenModelsByProvider: new Map(),
    isModelAvailable: async () => true,
    handleSingleModel: async (
      body: Record<string, unknown>,
      model: string,
      target?: { modelAbortSignal?: AbortSignal | null }
    ) => {
      const dispatch = {
        model,
        body: structuredClone(body),
        signal: target?.modelAbortSignal ?? null,
      };
      dispatched.push(dispatch);
      return handler({ ...dispatch, body });
    },
    log: { info: sink, warn: sink, error: sink, debug: sink },
  } as Options);
  return { response, dispatched, logs };
}

const firstTargetFrames = [...PREFIX, cutFrame, DONE];
const replacementFrames = [
  replacementContent("A resposta começa aqui 🌱"),
  replacementContent(" e continua."),
  replacementStop,
  DONE,
];

function sentCheckpoint(dispatch: Dispatch) {
  const messages = dispatch.body.messages as Array<{ role: string; content: string }>;
  const note = messages[0].content;
  return {
    messages,
    quoted: JSON.parse(note.slice(note.indexOf("{"))) as Record<string, string>,
  };
}

for (const [label, end] of [
  ["a stream_error frame", "frame"],
  ["EOF without a terminal", "eof"],
] as const) {
  test(`resumes both channels across split UTF-8 without duplicate output (${label})`, async () => {
    process.env[FLAG] = "true";
    const firstBytes = end === "frame" ? pieces(firstTargetFrames, 7) : pieces(PREFIX, 7);
    const { response, dispatched } = await run(({ model }) =>
      model === a
        ? sse(source(firstBytes).stream)
        : sse(source(pieces(replacementFrames, 6)).stream)
    );
    const client = await readClient(response);
    const recovered = {
      ...client,
      sentCheckpoint: {
        text: sentCheckpoint(dispatched[1]).quoted.delivered_text,
        reasoning: sentCheckpoint(dispatched[1]).quoted.draft_reasoning,
      },
    };
    assert.equal(recovered.sentCheckpoint.text, "A resposta começa aqui 🌱");
    assert.equal(recovered.sentCheckpoint.reasoning, "Primeiro verifico a condição.");
    assert.equal(recovered.text, "A resposta começa aqui 🌱 e continua.");
    assert.equal(recovered.reasoning, "Primeiro verifico a condição.");
    assert.deepEqual(recovered.ids, ["chatcmpl-first"]);
    assert.equal(recovered.doneCount, 1);
    assert.deepEqual(recovered.errors, []);
    assert.deepEqual(
      dispatched.map((d) => d.model),
      [a, b]
    );
    // The replacement sees the original history after the quoted checkpoint, no tools, no marker.
    const { messages, quoted } = sentCheckpoint(dispatched[1]);
    assert.deepEqual(messages.slice(1), originalMessages);
    assert.equal(quoted.anchor, "A resposta começa aqui 🌱");
    assert.equal(dispatched[1].body.tools, undefined);
    assert.equal(dispatched[1].body[RESUME_FIELD], undefined);
    assert.equal(dispatched[1].body.stream, true);
  });
}

test("client abort cancels the opening replacement and never dispatches a third target", async () => {
  process.env[FLAG] = "true";
  const replacement = source([replacementContent("A resposta começa aqui 🌱")], "stall");
  const logs: string[] = [];
  const { response, dispatched } = await run(
    ({ model, signal }) => {
      if (model === a) return sse(source(pieces(firstTargetFrames, 7)).stream);
      return new Promise<Response>((resolve) => {
        signal?.addEventListener("abort", () => resolve(sse(replacement.stream)), { once: true });
      });
    },
    { models: [a, b, c], logs }
  );
  const reader = response.body!.getReader();
  let seen = "";
  while (!seen.includes("🌱")) {
    const next = await reader.read();
    if (next.done) break;
    seen += decoder.decode(next.value, { stream: true });
  }
  // The client is now waiting while the combo opens the second target.
  const waiting = reader.read();
  for (let i = 0; i < 50 && dispatched.length < 2; i++) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  assert.equal(dispatched.length, 2, "the replacement is being opened");
  await reader.cancel(new Error("client gone"));
  await waiting.catch(noop);
  await new Promise((resolve) => setTimeout(resolve, 60));
  const replacementSignal = dispatched[1].signal;
  assert.equal(replacementSignal?.aborted, true);
  assert.equal(replacement.state.cancels, 1, "the replacement is finalized exactly once");
  assert.deepEqual(
    dispatched.map((d) => d.model),
    [a, b]
  );
});

test("a client signal that aborts while the replacement opens does the same", async () => {
  process.env[FLAG] = "true";
  const controller = new AbortController();
  const replacement = source([replacementContent("A resposta começa aqui 🌱")], "stall");
  const { response, dispatched } = await run(
    ({ model, signal }) => {
      if (model === a) return sse(source(pieces(firstTargetFrames, 7)).stream);
      return new Promise<Response>((resolve) => {
        signal?.addEventListener("abort", () => resolve(sse(replacement.stream)), { once: true });
      });
    },
    { models: [a, b, c], signal: controller.signal }
  );
  const reader = response.body!.getReader();
  let seen = "";
  while (!seen.includes("🌱")) {
    const next = await reader.read();
    if (next.done) break;
    seen += decoder.decode(next.value, { stream: true });
  }
  const waiting = reader.read();
  for (let i = 0; i < 50 && dispatched.length < 2; i++) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  controller.abort(new Error("client gone"));
  const ended = await waiting;
  assert.equal(ended.done, true);
  await new Promise((resolve) => setTimeout(resolve, 60));
  assert.equal(dispatched[1].signal?.aborted, true);
  assert.equal(replacement.state.cancels, 1);
  assert.deepEqual(
    dispatched.map((d) => d.model),
    [a, b]
  );
});

test("only one replacement per cut: a failed second target does not lead to a third", async () => {
  process.env[FLAG] = "true";
  const { response, dispatched } = await run(
    ({ model }) =>
      model === a
        ? sse(source(pieces(firstTargetFrames, 7)).stream)
        : new Response(JSON.stringify({ error: { message: "down" } }), {
            status: 503,
            headers: { "content-type": "application/json" },
          }),
    { models: [a, b, c] }
  );
  const client = await readClient(response);
  assert.equal(client.raw, firstTargetFrames.join(""));
  assert.deepEqual(
    dispatched.map((d) => d.model),
    [a, b]
  );
});

test("targets of unlisted providers are skipped, the first listed one takes over", async () => {
  process.env[FLAG] = "true";
  const { response, dispatched } = await run(
    ({ model }) =>
      model === a
        ? sse(source(pieces(firstTargetFrames, 7)).stream)
        : sse(source(replacementFrames).stream),
    { models: [a, "ckpt-z/skipped", c] }
  );
  const client = await readClient(response);
  assert.equal(client.text, "A resposta começa aqui 🌱 e continua.");
  assert.deepEqual(
    dispatched.map((d) => d.model),
    [a, c]
  );
});

test("with no listed follower nothing is marked and the cut is delivered as before", async () => {
  process.env[FLAG] = "true";
  const { response, dispatched } = await run(
    () => sse(source(pieces(firstTargetFrames, 7)).stream),
    { models: [a, "ckpt-z/other"] }
  );
  assert.equal((await readClient(response)).raw, firstTargetFrames.join(""));
  assert.deepEqual(
    dispatched.map((d) => d.model),
    [a]
  );
  assert.equal(dispatched[0].body[RESUME_FIELD], undefined);
});

test("a mismatching replacement leaves the client with the prefix and the original failure", async () => {
  process.env[FLAG] = "true";
  const { response, dispatched } = await run(({ model }) =>
    model === a
      ? sse(source(pieces(firstTargetFrames, 7)).stream)
      : sse(source([replacementContent("Totalmente outra coisa."), replacementStop, DONE]).stream)
  );
  const client = await readClient(response);
  assert.equal(client.raw, firstTargetFrames.join(""));
  assert.equal(dispatched.length, 2);
});

test("the attempt budget is shared: no slot left means no replacement", async () => {
  process.env[FLAG] = "true";
  const { response, dispatched } = await run(
    () => sse(source(pieces(firstTargetFrames, 7)).stream),
    { config: { maxGlobalAttempts: 1 } }
  );
  assert.equal((await readClient(response)).raw, firstTargetFrames.join(""));
  assert.deepEqual(
    dispatched.map((d) => d.model),
    [a]
  );
});

test("the checkpoint, the draft and the replacement text never reach the logs", async () => {
  process.env[FLAG] = "true";
  const logs: string[] = [];
  const { response } = await run(
    ({ model }) =>
      model === a
        ? sse(
            source(
              pieces(
                [
                  role,
                  reasoning("TOP-SECRET-DRAFT"),
                  content("DELIVERED-SECRET-TEXT"),
                  cutFrame,
                  DONE,
                ],
                11
              )
            ).stream
          )
        : sse(
            source([
              replacementContent("DELIVERED-SECRET-TEXT then SECRET-SUFFIX"),
              replacementStop,
              DONE,
            ]).stream
          ),
    { logs }
  );
  const client = await readClient(response);
  assert.equal(client.text, "DELIVERED-SECRET-TEXT then SECRET-SUFFIX");
  assert.ok(logs.length > 0);
  for (const line of logs) {
    assert.ok(!/TOP-SECRET-DRAFT|DELIVERED-SECRET-TEXT|SECRET-SUFFIX/.test(line), line);
  }
});

test("a cut with only reasoning resumes on the next target with a fresh answer", async () => {
  process.env[FLAG] = "true";
  const { response, dispatched } = await run(({ model }) =>
    model === a
      ? sse(
          source(pieces([role, reasoning("Primeiro verifico "), reasoning("a condição.")], 8))
            .stream
        )
      : sse(source([replacementContent("Feito."), replacementStop, DONE]).stream)
  );
  const client = await readClient(response);
  assert.equal(client.text, "Feito.");
  assert.equal(client.reasoning, "Primeiro verifico a condição.");
  assert.deepEqual(client.ids, ["chatcmpl-first"]);
  const { quoted } = sentCheckpoint(dispatched[1]);
  assert.equal(quoted.draft_reasoning, "Primeiro verifico a condição.");
  assert.equal(quoted.delivered_text, undefined);
});

// ─── Off, not opted in, out of scope ───────────────────────────────────────────

async function deliveredBytes(
  opts: Parameters<typeof run>[1] = {},
  setFlag = true
): Promise<{ raw: string; dispatched: Dispatch[] }> {
  if (setFlag) process.env[FLAG] = "true";
  const { response, dispatched } = await run(
    ({ model }) =>
      model === a
        ? sse(source(pieces(firstTargetFrames, 7)).stream)
        : sse(source(replacementFrames).stream),
    opts
  );
  return { raw: (await readClient(response)).raw, dispatched };
}

test("flag off: the cut is delivered byte for byte and nothing is marked", async () => {
  const { raw, dispatched } = await deliveredBytes({}, false);
  assert.equal(raw, firstTargetFrames.join(""));
  assert.equal(dispatched.length, 1);
  assert.equal(dispatched[0].body[RESUME_FIELD], undefined);
});

test("flag on but the combo did not opt in: nothing changes", async () => {
  const { raw, dispatched } = await deliveredBytes({
    config: { resumeStreamFromCheckpoint: undefined },
  });
  assert.equal(raw, firstTargetFrames.join(""));
  assert.equal(dispatched.length, 1);
  assert.equal(dispatched[0].body[RESUME_FIELD], undefined);
});

test("opting in without listing a provider does nothing", async () => {
  const { raw, dispatched } = await deliveredBytes({
    config: { reasoningCheckpointProviders: [] },
  });
  assert.equal(raw, firstTargetFrames.join(""));
  assert.equal(dispatched.length, 1);
});

test("global combo defaults do not grant the opt-in", async () => {
  process.env[FLAG] = "true";
  const fixture = setup({ resumeStreamFromCheckpoint: undefined });
  const dispatched: string[] = [];
  const response = await handleComboChat({
    ...fixture,
    body: { stream: true, messages: structuredClone(originalMessages) },
    settings: {
      comboDefaults: { resumeStreamFromCheckpoint: true },
      resilienceSettings: { streamRecovery: { enabled: false }, modelLockout: { enabled: false } },
    },
    hiddenModelsByProvider: new Map(),
    isModelAvailable: async () => true,
    handleSingleModel: async (_body: unknown, model: string) => {
      dispatched.push(model);
      return sse(source(pieces(firstTargetFrames, 7)).stream);
    },
    log: { info: noop, warn: noop, error: noop, debug: noop },
  } as Options);
  assert.equal((await readClient(response)).raw, firstTargetFrames.join(""));
  assert.deepEqual(dispatched, [a]);
});

for (const [name, opts] of [
  [
    "a request with tools",
    { body: { tools: [{ type: "function", function: { name: "f", parameters: {} } }] } },
  ],
  ["a request with n above 1", { body: { n: 2 } }],
  [
    "a history with tool results",
    {
      body: {
        messages: [
          { role: "user", content: "hi" },
          { role: "assistant", content: null, tool_calls: [{ id: "1", type: "function" }] },
          { role: "tool", tool_call_id: "1", content: "result" },
        ],
      },
    },
  ],
  [
    "a hedged combo",
    { config: { zeroLatencyOptimizationsEnabled: true, hedging: true, hedgeDelayMs: 5000 } },
  ],
] as const) {
  test(`out of scope: ${name} is not resumed`, async () => {
    const { raw, dispatched } = await deliveredBytes(opts as Parameters<typeof run>[1]);
    assert.equal(raw, firstTargetFrames.join(""));
    assert.equal(dispatched.length, 1);
    assert.equal(dispatched[0].body[RESUME_FIELD], undefined);
  });
}

test("a non-streaming client is not affected", async () => {
  process.env[FLAG] = "true";
  const json = JSON.stringify({
    id: "x",
    object: "chat.completion",
    choices: [{ index: 0, message: { role: "assistant", content: "hi" }, finish_reason: "stop" }],
  });
  const { response, dispatched } = await run(
    () => new Response(json, { status: 200, headers: { "content-type": "application/json" } }),
    { body: { stream: false } }
  );
  assert.equal(await response.text(), json);
  assert.equal(dispatched.length, 1);
  assert.equal(dispatched[0].body[RESUME_FIELD], undefined);
});

test("the eligible dispatch is marked for the upstream handler, the replacement is not", async () => {
  process.env[FLAG] = "true";
  const { response, dispatched } = await run(({ model }) =>
    model === a
      ? sse(source(pieces(firstTargetFrames, 7)).stream)
      : sse(source(replacementFrames).stream)
  );
  await readClient(response);
  assert.equal(dispatched[0].body[RESUME_FIELD], true);
  assert.equal(dispatched[1].body[RESUME_FIELD], undefined);
});

test("the replacement carries the delivered text upstream only, and no other dispatch is marked", async () => {
  process.env[FLAG] = "true";
  const { response, dispatched } = await run(({ model }) =>
    model === a
      ? sse(source(pieces(firstTargetFrames, 7)).stream)
      : sse(source(replacementFrames).stream)
  );
  await readClient(response);
  assert.equal(dispatched.length, 2);
  assert.equal(dispatched[0].body[UPSTREAM_ONLY], undefined);
  assert.equal(dispatched[1].body[UPSTREAM_ONLY], true);
  // The marked body is the one that quotes the delivered text.
  assert.equal(sentCheckpoint(dispatched[1]).quoted.delivered_text, "A resposta começa aqui 🌱");
});

// ─── combo schema ──────────────────────────────────────────────────────────────

test("the combo schema accepts and preserves the opt-in", async () => {
  const { createComboSchema } = await import("../../src/shared/validation/schemas/combo.ts");
  const payload = {
    name: "checkpoint-schema",
    strategy: "priority" as const,
    models: [{ kind: "model" as const, model: "openai/gpt-4o" }],
  };
  const parsed = createComboSchema.parse({
    ...payload,
    config: { resumeStreamFromCheckpoint: true, reasoningCheckpointProviders: ["provider-b"] },
  });
  assert.equal(parsed.config?.resumeStreamFromCheckpoint, true);
  assert.deepEqual(parsed.config?.reasoningCheckpointProviders, ["provider-b"]);
  assert.equal(
    createComboSchema.safeParse({ ...payload, config: { resumeStreamFromCheckpoint: "yes" } })
      .success,
    false
  );
});

test("the flag is registered, off by default and needs no restart", async () => {
  const { FEATURE_FLAG_DEFINITIONS } =
    await import("../../src/shared/constants/featureFlagDefinitions.ts");
  const flag = FEATURE_FLAG_DEFINITIONS.find((d: { key: string }) => d.key === FLAG);
  assert.ok(flag);
  assert.equal(flag.defaultValue, "false");
  assert.equal(flag.requiresRestart, false);
});
