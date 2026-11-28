import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// A combo gives each target `targetTimeoutMs` (120 s by default). For a streaming request that
// budget only covers the wait for the first output (firstOutputStream.ts). For a NON-streaming
// request the target's call only returns once the whole answer is assembled, so the same budget
// used to cut every long answer (Opus writes ~100 tokens/s, so anything over ~12k tokens failed
// on every target). These tests pin the fix: a non-streamed combo target streams from the
// upstream, reports its first output, and the per-target timer stops at that point. A target
// that stays silent is still cut at the budget.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-nonstream-first-output-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { buildTargetTimeoutRunner, COMBO_TARGET_TIMEOUT_CODE } =
  await import("../../open-sse/services/combo/targetTimeoutRunner.ts");
const { observeUpstreamFirstOutput, shouldStreamUpstreamForFirstOutput, getComboFirstOutputHook } =
  await import("../../open-sse/services/combo/nonStreamFirstOutput.ts");
const { resolveDispatchClientRawRequest } =
  await import("../../src/sse/handlers/chat/clientRawRequest.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type Body = Record<string, unknown>;

const originalFetch = globalThis.fetch;
const encoder = new TextEncoder();

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function flushAsyncSideEffects() {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await flushAsyncSideEffects();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function jsonResponse(payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function sseFrame(event: string, data: unknown) {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

const CLAUDE_FRAMES = {
  messageStart: sseFrame("message_start", {
    type: "message_start",
    message: {
      id: "msg_1",
      type: "message",
      role: "assistant",
      model: "claude-sonnet-4-6",
      content: [],
      stop_reason: null,
      usage: { input_tokens: 5, output_tokens: 1 },
    },
  }),
  ping: sseFrame("ping", { type: "ping" }),
  textStart: sseFrame("content_block_start", {
    type: "content_block_start",
    index: 0,
    content_block: { type: "text", text: "" },
  }),
  textDelta: sseFrame("content_block_delta", {
    type: "content_block_delta",
    index: 0,
    delta: { type: "text_delta", text: "Hello there" },
  }),
  blockStop: sseFrame("content_block_stop", { type: "content_block_stop", index: 0 }),
  messageDelta: sseFrame("message_delta", {
    type: "message_delta",
    delta: { stop_reason: "end_turn", stop_sequence: null },
    usage: { output_tokens: 3 },
  }),
  messageStop: sseFrame("message_stop", { type: "message_stop" }),
};

/** An SSE Response that yields each frame as its own chunk. */
function sseResponse(frames: string[]) {
  let index = 0;
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (index >= frames.length) {
        controller.close();
        return;
      }
      controller.enqueue(encoder.encode(frames[index++]));
    },
  });
  return new Response(body, { status: 200, headers: { "content-type": "text/event-stream" } });
}

// --- per-target timer ---------------------------------------------------------------------

test("a non-streamed combo target that reports first output keeps running past the budget", async () => {
  let targetSignal: AbortSignal | null = null;
  const runner = buildTargetTimeoutRunner({
    comboTargetTimeoutMs: 100,
    log: noopLog(),
    handleSingleModel: async (_body, _model, target) => {
      targetSignal = (target as { modelAbortSignal?: AbortSignal }).modelAbortSignal ?? null;
      const hook = (target as { comboFirstOutput?: { onFirstOutput: () => void } })
        .comboFirstOutput;
      assert.equal(typeof hook?.onFirstOutput, "function", "runner must pass a first-output hook");
      setTimeout(() => hook?.onFirstOutput(), 30);
      await delay(250);
      return jsonResponse({ answer: "long" });
    },
  });

  const response = await runner({ stream: false }, "claude/claude-opus-5-5");

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { answer: "long" });
  assert.equal(targetSignal?.aborted, false, "the target must not be aborted after first output");
});

test("a non-streamed combo target that stays silent is still cut at the budget", async () => {
  let targetSignal: AbortSignal | null = null;
  const runner = buildTargetTimeoutRunner({
    comboTargetTimeoutMs: 100,
    log: noopLog(),
    handleSingleModel: async (_body, _model, target) => {
      targetSignal = (target as { modelAbortSignal?: AbortSignal }).modelAbortSignal ?? null;
      await delay(250);
      return jsonResponse({ answer: "too late" });
    },
  });

  const response = await runner({ stream: false }, "claude/claude-opus-5-5");

  assert.equal(response.status, 504);
  const body = (await response.json()) as { error?: { code?: string } };
  assert.equal(body.error?.code, COMBO_TARGET_TIMEOUT_CODE);
  assert.equal(targetSignal?.aborted, true);
});

test("first output that arrives after the budget expired does not revive the target", async () => {
  const runner = buildTargetTimeoutRunner({
    comboTargetTimeoutMs: 100,
    log: noopLog(),
    handleSingleModel: async (_body, _model, target) => {
      const hook = (target as { comboFirstOutput?: { onFirstOutput: () => void } })
        .comboFirstOutput;
      setTimeout(() => hook?.onFirstOutput(), 150);
      await delay(250);
      return jsonResponse({ answer: "too late" });
    },
  });

  const response = await runner({ stream: false }, "claude/claude-opus-5-5");

  assert.equal(response.status, 504);
});

// --- first-output observer ----------------------------------------------------------------

async function readChunks(response: Response, onChunk: (index: number) => void) {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let text = "";
  for (let index = 0; ; index++) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
    onChunk(index);
  }
  return text;
}

test("lifecycle frames are not output; the first text delta is, and it is reported once", async () => {
  let calls = 0;
  const frames = [
    CLAUDE_FRAMES.messageStart,
    CLAUDE_FRAMES.ping,
    CLAUDE_FRAMES.textStart,
    CLAUDE_FRAMES.textDelta,
    CLAUDE_FRAMES.textDelta,
    CLAUDE_FRAMES.messageStop,
  ];
  const observed = observeUpstreamFirstOutput(sseResponse(frames), () => calls++);
  const callsAfterChunk: number[] = [];

  const text = await readChunks(observed, () => callsAfterChunk.push(calls));

  assert.deepEqual(callsAfterChunk, [0, 0, 0, 1, 1, 1]);
  assert.equal(text, frames.join(""), "the body must pass through unchanged");
  assert.equal(observed.headers.get("content-type"), "text/event-stream");
});

test("upstream Claude thinking counts as first output", async () => {
  let calls = 0;
  const thinkingStart = sseFrame("content_block_start", {
    type: "content_block_start",
    index: 0,
    content_block: { type: "thinking", thinking: "" },
  });
  const observed = observeUpstreamFirstOutput(
    sseResponse([CLAUDE_FRAMES.messageStart, thinkingStart]),
    () => calls++
  );

  await readChunks(observed, () => {});

  assert.equal(calls, 1);
});

test("Antigravity/Gemini candidates count as first output", async () => {
  let calls = 0;
  const frame = `data: ${JSON.stringify({
    response: { candidates: [{ content: { role: "model", parts: [{ text: "Hi" }] } }] },
  })}\n\n`;
  const observed = observeUpstreamFirstOutput(sseResponse([frame]), () => calls++);

  await readChunks(observed, () => {});

  assert.equal(calls, 1);
});

test("a non-SSE response is returned untouched and never reported", async () => {
  let calls = 0;
  const original = jsonResponse({ ok: true });

  const observed = observeUpstreamFirstOutput(original, () => calls++);

  assert.equal(observed, original);
  assert.deepEqual(await observed.json(), { ok: true });
  assert.equal(calls, 0);
});

// --- when to stream from the upstream -----------------------------------------------------

test("only a non-streamed Claude-format combo target is switched to upstream streaming", () => {
  const hook = () => {};
  const base = { stream: false, upstreamStream: false, targetFormat: FORMATS.CLAUDE };

  assert.equal(shouldStreamUpstreamForFirstOutput({ ...base, onFirstOutput: hook }), true);
  assert.equal(shouldStreamUpstreamForFirstOutput({ ...base, onFirstOutput: null }), false);
  assert.equal(
    shouldStreamUpstreamForFirstOutput({ ...base, stream: true, onFirstOutput: hook }),
    false,
    "a streaming client already streams"
  );
  assert.equal(
    shouldStreamUpstreamForFirstOutput({ ...base, upstreamStream: true, onFirstOutput: hook }),
    false,
    "an upstream that already streams needs no change"
  );
  assert.equal(
    shouldStreamUpstreamForFirstOutput({
      ...base,
      targetFormat: FORMATS.OPENAI,
      onFirstOutput: hook,
    }),
    false,
    "other formats keep their current upstream request"
  );
});

test("the dispatch carries the first-output hook into clientRawRequest", () => {
  const hook = { onFirstOutput: () => {}, onAttemptStart: () => {} };
  const raw = { endpoint: "/v1/messages", signal: null };

  const merged = resolveDispatchClientRawRequest(raw, null, hook) as Record<string, unknown>;

  const carried = getComboFirstOutputHook(merged);
  assert.equal(carried?.onFirstOutput, hook.onFirstOutput);
  assert.equal(carried?.onAttemptStart, hook.onAttemptStart);
  assert.equal(getComboFirstOutputHook(raw), null);
  assert.equal(resolveDispatchClientRawRequest(raw, null, null), raw);
});

// --- end to end through handleChatCore ----------------------------------------------------

function messagesBody(): Body {
  return {
    model: "claude-sonnet-4-6",
    max_tokens: 64,
    stream: false,
    messages: [{ role: "user", content: [{ type: "text", text: "say hello" }] }],
  };
}

async function runAnthropicNonStream(
  clientExtras: Record<string, unknown>,
  bodyExtras: Record<string, unknown> = {}
) {
  const body = { ...messagesBody(), ...bodyExtras };
  return handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "anthropic", model: "claude-sonnet-4-6", extendedContext: false },
    credentials: { apiKey: "test-anthropic-key", providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/messages",
      body: structuredClone(body),
      headers: new Headers({
        accept: "application/json",
        "content-type": "application/json",
        "user-agent": "claude-code/2.1.154",
      }),
      ...clientExtras,
    },
    userAgent: "claude-code/2.1.154",
  } as Parameters<typeof handleChatCore>[0]);
}

test("a non-streamed Claude request inside a combo streams upstream, reports first output and returns JSON", async () => {
  let sent: Body | null = null;
  globalThis.fetch = (async (_url: string | URL | Request, init: RequestInit = {}) => {
    sent = JSON.parse(String(init.body || "{}"));
    return sseResponse(Object.values(CLAUDE_FRAMES));
  }) as typeof fetch;
  let calls = 0;

  const result = await runAnthropicNonStream({
    comboFirstOutput: { onFirstOutput: () => calls++ },
  });

  assert.ok(sent, "fetch was not called");
  assert.equal((sent as Body).stream, true, "the upstream request must stream");
  assert.equal(result.success, true);
  assert.equal(calls, 1);
  const json = (await (result.response as Response).json()) as {
    content?: Array<{ type: string; text?: string }>;
    stop_reason?: string;
    usage?: { input_tokens?: number; output_tokens?: number };
  };
  assert.equal(json.content?.find((block) => block.type === "text")?.text, "Hello there");
  assert.equal(json.stop_reason, "end_turn");
  assert.equal(json.usage?.input_tokens, 5, "usage from message_start must survive assembly");
  assert.equal(json.usage?.output_tokens, 3, "usage from message_delta must survive assembly");
});

test("without the combo hook a non-streamed Claude request is still sent non-streamed", async () => {
  let sent: Body | null = null;
  globalThis.fetch = (async (_url: string | URL | Request, init: RequestInit = {}) => {
    sent = JSON.parse(String(init.body || "{}"));
    return jsonResponse({
      id: "msg_1",
      type: "message",
      role: "assistant",
      model: "claude-sonnet-4-6",
      content: [{ type: "text", text: "Hello there" }],
      stop_reason: "end_turn",
      usage: { input_tokens: 5, output_tokens: 3 },
    });
  }) as typeof fetch;

  const result = await runAnthropicNonStream({});

  assert.ok(sent, "fetch was not called");
  assert.notEqual((sent as Body).stream, true);
  assert.equal(result.success, true);
});

// --- review follow-ups ---------------------------------------------------------------------

test("a replacement attempt after a post-output failure is held to the budget again", async () => {
  const runner = buildTargetTimeoutRunner({
    comboTargetTimeoutMs: 100,
    log: noopLog(),
    handleSingleModel: async (_body, _model, target) => {
      const hook = (
        target as {
          comboFirstOutput?: { onFirstOutput: () => void; onAttemptStart?: () => void };
        }
      ).comboFirstOutput;
      assert.equal(typeof hook?.onAttemptStart, "function", "runner must pass an attempt hook");
      hook?.onAttemptStart?.();
      setTimeout(() => hook?.onFirstOutput(), 20);
      await delay(60);
      // The first account's body failed after its first output; a second account starts and
      // stays silent.
      hook?.onAttemptStart?.();
      await delay(250);
      return jsonResponse({ answer: "silent replacement" });
    },
  });

  const response = await runner({ stream: false }, "claude/claude-opus-5-5");

  assert.equal(response.status, 504);
});

test("a replacement attempt that produces output keeps running past the budget", async () => {
  const runner = buildTargetTimeoutRunner({
    comboTargetTimeoutMs: 100,
    log: noopLog(),
    handleSingleModel: async (_body, _model, target) => {
      const hook = (
        target as {
          comboFirstOutput?: { onFirstOutput: () => void; onAttemptStart?: () => void };
        }
      ).comboFirstOutput;
      setTimeout(() => hook?.onFirstOutput(), 20);
      await delay(60);
      hook?.onAttemptStart?.();
      setTimeout(() => hook?.onFirstOutput(), 30);
      await delay(250);
      return jsonResponse({ answer: "replacement" });
    },
  });

  const response = await runner({ stream: false }, "claude/claude-opus-5-5");

  assert.equal(response.status, 200);
});

test("a caller that joins a shared non-streamed execution receives its first output", async () => {
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => (release = resolve));
  let fetches = 0;
  globalThis.fetch = (async () => {
    fetches++;
    const frames = Object.values(CLAUDE_FRAMES);
    let index = 0;
    const body = new ReadableStream<Uint8Array>({
      async pull(controller) {
        if (index === 3) await gate;
        if (index >= frames.length) return controller.close();
        controller.enqueue(encoder.encode(frames[index++]));
      },
    });
    return new Response(body, { status: 200, headers: { "content-type": "text/event-stream" } });
  }) as typeof fetch;
  let first = 0;
  let joiner = 0;

  // temperature 0: only low-temperature requests share an in-flight upstream call.
  const initiator = runAnthropicNonStream(
    { comboFirstOutput: { onFirstOutput: () => first++ } },
    { temperature: 0 }
  );
  await delay(20);
  const joined = runAnthropicNonStream(
    { comboFirstOutput: { onFirstOutput: () => joiner++ } },
    { temperature: 0 }
  );
  await delay(50);
  release();
  const [a, b] = await Promise.all([initiator, joined]);

  assert.equal(fetches, 1, "the two identical requests must share one upstream call");
  assert.equal(a.success && b.success, true);
  assert.equal(first, 1);
  assert.equal(joiner, 1, "the joining caller's timer must hear about the first output");
});
