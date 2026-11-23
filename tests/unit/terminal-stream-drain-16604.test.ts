import assert from "node:assert/strict";
import { setImmediate as nextTurn } from "node:timers/promises";
import test from "node:test";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { createPassthroughStreamWithLogger } from "../../open-sse/utils/stream.ts";
import { createStreamController, pipeWithDisconnect } from "../../open-sse/utils/streamHandler.ts";

const encoder = new TextEncoder();
const terminal = `data: ${JSON.stringify({
  type: "response.completed",
  response: {
    id: "resp_terminal_drain",
    status: "completed",
    output: [
      { type: "message", role: "assistant", content: [{ type: "output_text", text: "hi" }] },
    ],
    usage: { input_tokens: 10, output_tokens: 2, total_tokens: 12 },
  },
})}\n\n`;
const toolHandoff = [
  { type: "response.function_call_arguments.done", item_id: "item_1", arguments: "{}" },
  {
    type: "response.output_item.done",
    item: {
      id: "item_1",
      call_id: "call_1",
      type: "function_call",
      name: "lookup",
      arguments: "{}",
      status: "completed",
    },
  },
]
  .map((event) => `data: ${JSON.stringify(event)}\n\n`)
  .join("");

function fixture(grace = 5000, transform?: TransformStream<Uint8Array, Uint8Array>) {
  let upstream!: ReadableStreamDefaultController<Uint8Array>;
  let flushes = 0;
  let disconnects = 0;
  let errors = 0;
  const cancellations: unknown[] = [];
  let resolveCancellation!: () => void;
  const cancelled = new Promise<void>((resolve) => {
    resolveCancellation = resolve;
  });
  const client = new AbortController();
  const provider = new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        upstream = controller;
      },
      cancel(reason) {
        cancellations.push(reason);
        resolveCancellation();
      },
    })
  );
  const controller = createStreamController({
    clientResponseFormat: FORMATS.OPENAI_RESPONSES,
    clientAbortSignal: client.signal,
    allowCompletedToolHandoffGrace: true,
    clientDisconnectGracePeriodMs: grace,
    onDisconnect() {
      disconnects++;
    },
    onError() {
      errors++;
      return false;
    },
  });
  const stream = pipeWithDisconnect(
    provider,
    transform ??
      new TransformStream<Uint8Array, Uint8Array>({
        transform(chunk, output) {
          output.enqueue(chunk);
        },
        flush() {
          flushes++;
        },
      }),
    controller,
    { stallTimeoutMs: 0, activeTimeoutMs: 0, highWaterMark: 1 }
  );
  const reader = stream.getReader();
  return {
    reader,
    client,
    controller,
    cancelled,
    cancellations,
    stats: () => ({ flushes, disconnects, errors }),
    push: (text: string) => upstream.enqueue(encoder.encode(text)),
    finish() {
      try {
        upstream.enqueue(encoder.encode(": trailer one\n\n"));
        upstream.enqueue(encoder.encode(": trailer two\n\n"));
        upstream.close();
      } catch {
        /* The RED path has already cancelled the upstream. */
      }
    },
    fail(error: Error) {
      upstream.error(error);
    },
    async dispose() {
      try {
        upstream.error(new Error("fixture cleanup"));
      } catch {
        /* Already closed. */
      }
      await reader.cancel().catch(() => {});
      controller.abort();
    },
  };
}

for (const mode of ["cancel", "signal", "tool-handoff"] as const) {
  test(`terminal ${mode} drains trailers through flush with a pull already pending`, async () => {
    const f = fixture();
    try {
      if (mode === "tool-handoff") {
        f.push(toolHandoff);
        await f.reader.read();
      }
      f.push(terminal);
      await f.reader.read();
      await nextTurn();
      let pendingRead: Promise<ReadableStreamReadResult<Uint8Array>> | undefined;
      if (mode === "signal") {
        f.client.abort("client closed after terminal");
        pendingRead = f.reader.read();
      } else {
        await f.reader.cancel("client closed after terminal");
      }
      f.finish();
      await pendingRead;
      await nextTurn();
      await nextTurn();
      assert.deepEqual(f.stats(), { flushes: 1, disconnects: 0, errors: 0 });
      assert.equal(f.cancellations.length, 0);
      assert.equal(f.controller.signal.aborted, false);
    } finally {
      await f.dispose();
    }
  });
}

test("zero grace retains immediate cancellation after a terminal event", async () => {
  const f = fixture(0);
  try {
    f.push(terminal);
    await f.reader.read();
    await f.reader.cancel("client closed");
    await f.cancelled;
    assert.equal(f.cancellations.length, 1);
    assert.equal(f.stats().flushes, 0);
    assert.equal(f.stats().disconnects, 0);
  } finally {
    await f.dispose();
  }
});

test("preterminal cancellation still reports disconnect and aborts upstream", async () => {
  const f = fixture();
  try {
    f.push('data: {"type":"response.output_text.delta","delta":"hi"}\n\n');
    await f.reader.read();
    await f.reader.cancel("client closed before terminal");
    await f.cancelled;
    assert.equal(f.stats().disconnects, 1);
    assert.equal(f.stats().flushes, 0);
    assert.equal(f.controller.signal.aborted, true);
  } finally {
    await f.dispose();
  }
});

test("a terminal drain still aborts an upstream that exceeds the grace period", async () => {
  const f = fixture(25);
  try {
    f.push(terminal);
    await f.reader.read();
    await f.reader.cancel("client closed");
    await f.cancelled;
    assert.equal(f.controller.signal.aborted, true);
    assert.equal(f.cancellations.length, 1);
    assert.equal(f.stats().flushes, 0);
    assert.equal(f.stats().disconnects, 0);
  } finally {
    await f.dispose();
  }
});

test("an upstream error during terminal drain does not report a provider failure", async () => {
  const f = fixture();
  try {
    f.push(terminal);
    await f.reader.read();
    await f.reader.cancel("client closed");
    f.fail(new Error("late upstream failure"));
    await nextTurn();
    await nextTurn();
    assert.deepEqual(f.stats(), { flushes: 0, disconnects: 0, errors: 0 });
  } finally {
    await f.dispose();
  }
});

test(
  "real Responses SSE transform finalizes usage exactly once after terminal cancellation",
  { timeout: 10_000 },
  async () => {
    const completed: Array<{ status?: number; usage?: unknown }> = [];
    let resolveCompletion!: () => void;
    const completion = new Promise<void>((resolve) => {
      resolveCompletion = resolve;
    });
    const transform = createPassthroughStreamWithLogger(
      "codex",
      null,
      null,
      "gpt-5",
      "terminal-drain-connection",
      { model: "gpt-5", stream: true },
      (payload) => {
        completed.push(payload);
        resolveCompletion();
      },
      null,
      null,
      FORMATS.OPENAI_RESPONSES
    );
    const f = fixture(5000, transform);
    try {
      f.push(terminal);
      const first = await f.reader.read();
      assert.match(new TextDecoder().decode(first.value), /response.completed/);
      await nextTurn();
      await f.reader.cancel("client closed after terminal");
      f.finish();
      await completion;
      await nextTurn();
      assert.equal(completed.length, 1);
      assert.equal(completed[0].status, 200);
      const usage = completed[0].usage as Record<string, number>;
      assert.equal(usage.input_tokens ?? usage.prompt_tokens, 10);
      assert.equal(usage.output_tokens ?? usage.completion_tokens, 2);
      assert.equal(f.stats().disconnects, 0);
      assert.equal(f.cancellations.length, 0);
    } finally {
      await f.dispose();
    }
  }
);
