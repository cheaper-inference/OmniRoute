import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { setImmediate as turn } from "node:timers/promises";
import "../_setup/isolateDataDir.ts";

// Keep the stream/usage parser real, but do not persist request accounting.
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "@/lib/usageDb") {
      return {
        url: `data:text/javascript,${encodeURIComponent(
          "export function trackPendingRequest() {}\nexport async function appendRequestLog() {}"
        )}`,
        shortCircuit: true,
      };
    }
    return nextResolve(specifier, context);
  },
});
const { createDisconnectAwareStream, createNoopAbortWritable, createStreamController } =
  await import("../../open-sse/utils/streamHandler.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { createSseHeartbeatTransform } = await import("../../open-sse/utils/sseHeartbeat.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
test.after(() => hooks.deregister());

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const content = 'data: {"type":"response.output_text.delta","delta":"Hello"}\n\n';
const completed = `event: response.completed\ndata: ${JSON.stringify({
  type: "response.completed",
  response: {
    id: "resp_fixture",
    status: "completed",
    output: [{ type: "message", content: [{ type: "output_text", text: "Hello" }] }],
    usage: { input_tokens: 10, output_tokens: 2, total_tokens: 12 },
  },
})}\n\n`;
const handoff = [
  { type: "response.function_call_arguments.done", item_id: "fc_1", arguments: "{}" },
  {
    type: "response.output_item.done",
    item: {
      id: "fc_1",
      type: "function_call",
      call_id: "call_1",
      name: "read_file",
      arguments: "{}",
      status: "completed",
    },
  },
]
  .map((event) => `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`)
  .join("");

async function settle() {
  await turn();
  await turn();
}

function fixture(t: TestContext, highWaterMark: number, accountUsage = false) {
  const intervals = new Set<{ fire: () => void; unref: () => void }>();
  let ticks = 0;
  const clearIntervalMock = t.mock.method(globalThis, "clearInterval", (timer) => {
    intervals.delete(timer);
  });
  t.mock.method(globalThis, "setInterval", (callback: () => void) => {
    const timer = {
      fire() {
        ticks++;
        callback();
      },
      unref() {},
    };
    intervals.add(timer);
    return timer;
  });
  const tick = (count = 1) => {
    for (let i = 0; i < count; i++) for (const timer of intervals) timer.fire();
  };
  const incoming = new AbortController();
  const disconnects: string[] = [];
  const errors: unknown[] = [];
  const completions: { status: number; input: number; output: number }[] = [];
  const sc = createStreamController({
    clientResponseFormat: FORMATS.OPENAI_RESPONSES,
    clientAbortSignal: incoming.signal,
    allowCompletedToolHandoffGrace: true,
    clientDisconnectGracePeriodMs: 50,
    onDisconnect: ({ reason }) => {
      disconnects.push(reason);
    },
    onError: (event) => {
      errors.push(event);
    },
  });
  const complete = t.mock.method(sc, "handleComplete");
  let source!: ReadableStreamDefaultController<Uint8Array>;
  const cancels: unknown[] = [];
  const upstream = new ReadableStream<Uint8Array>({
    start(controller) {
      source = controller;
    },
    cancel(reason) {
      cancels.push(reason);
    },
  });
  const accounted = accountUsage
    ? upstream.pipeThrough(
        createSSEStream({
          mode: "passthrough",
          sourceFormat: FORMATS.OPENAI_RESPONSES,
          clientResponseFormat: FORMATS.OPENAI_RESPONSES,
          onComplete(payload) {
            assert.ok(payload.usage && typeof payload.usage === "object");
            const usage = payload.usage as Record<string, unknown>;
            completions.push({
              status: payload.status,
              input: Number(usage.prompt_tokens ?? usage.input_tokens),
              output: Number(usage.completion_tokens ?? usage.output_tokens),
            });
          },
        })
      )
    : upstream;
  const inner = accounted.pipeThrough(
    createSseHeartbeatTransform({
      shape: "openai-responses-in-progress",
      signal: sc.signal,
      intervalMs: 15_000,
    })
  );
  // Capture the real inner reader only so a failing regression can clean up too.
  const innerReader = inner.getReader();
  t.mock.method(inner, "getReader", () => innerReader);
  const outer = createDisconnectAwareStream(
    { readable: inner, writable: createNoopAbortWritable() },
    sc,
    { highWaterMark }
  );
  const reader = outer.getReader();
  t.after(async () => {
    sc.abort();
    await reader.cancel();
    await innerReader.cancel();
    innerReader.releaseLock();
  });
  const send = (text: string) => source.enqueue(encoder.encode(text));
  const receive = async (marker: string) => {
    let received = "";
    while (!received.includes(marker)) {
      const chunk = await reader.read();
      assert.equal(chunk.done, false);
      received += decoder.decode(chunk.value);
    }
  };
  const closed = async () => {
    // A buffered pull may already be waiting at the time of the inbound abort.
    tick();
    while (!(await reader.read()).done) {
      // Consume only the outer stream, never the abandoned inner heartbeat queue.
    }
    await settle();
  };
  const disposed = () => {
    assert.equal(intervals.size, 0, "the heartbeat interval must actually be disposed");
    assert.equal(
      clearIntervalMock.mock.callCount(),
      accountUsage ? 2 : 1,
      "dispose each timer exactly once"
    );
    const before = ticks;
    tick(100);
    assert.equal(ticks, before, "no heartbeat callback may keep enqueueing after closure");
  };
  return {
    sc,
    incoming,
    source,
    cancels,
    completions,
    disconnects,
    errors,
    complete,
    reader,
    send,
    receive,
    closed,
    disposed,
  };
}

for (const highWaterMark of [0, 16384]) {
  test(`#16258 inbound terminal abort owns cleanup without further reads (buffer ${highWaterMark})`, async (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    const f = fixture(t, highWaterMark);
    f.send(content + completed);
    await f.receive("response.completed");
    await settle();
    f.incoming.abort("client_closed");
    t.mock.timers.tick(49);
    await settle();
    assert.deepEqual(f.cancels, [], "keep the source open throughout the grace period");
    assert.equal(f.sc.signal.aborted, false);
    t.mock.timers.tick(1);
    await settle();
    f.disposed();
    assert.deepEqual(f.cancels, ["terminal_stream_grace_expired"]);
    assert.equal(f.sc.signal.aborted, true);
    assert.deepEqual(f.disconnects, []);
    assert.deepEqual(f.errors, []);
  });

  for (const tail of ["EOF", "DONE+EOF"]) {
    test(`#16258 inbound terminal abort drains delayed ${tail} usage without further reads (buffer ${highWaterMark})`, async (t) => {
      t.mock.timers.enable({ apis: ["setTimeout"] });
      const f = fixture(t, highWaterMark, true);
      f.send(content + completed);
      await f.receive("response.completed");
      await settle();
      assert.deepEqual(f.completions, []);
      f.incoming.abort("client_closed");
      t.mock.timers.tick(20);
      await settle();
      assert.deepEqual(f.cancels, [], "disconnect must not cancel pending successful usage");
      assert.deepEqual(f.completions, [], "EOF must occur after disconnect");
      if (tail === "DONE+EOF") f.send("data: [DONE]\n\n");
      f.source.close();
      await settle();
      f.disposed();
      assert.deepEqual(f.completions, [{ status: 200, input: 10, output: 2 }]);
      t.mock.timers.tick(50);
      await settle();
      assert.equal(f.sc.signal.aborted, false, "EOF must release the grace timer");
      assert.deepEqual(f.cancels, []);
      assert.deepEqual(f.disconnects, []);
      assert.deepEqual(f.errors, []);
      assert.equal(f.completions.length, 1);
    });
  }

  test(
    `#16258 terminal -> inbound abort -> trailing DONE disposes heartbeat (buffer ${highWaterMark})`,
    { timeout: 3000 },
    async (t) => {
      const f = fixture(t, highWaterMark);
      f.send(content);
      await f.receive("Hello");
      f.send(completed);
      await f.receive("response.completed");
      f.incoming.abort("client_closed");
      await f.closed();
      // An already-cancelled source rejects the late write; otherwise deliver the
      // tail and EOF. On the old code this still cannot flush the heartbeat pipe.
      if (f.cancels.length === 0) {
        f.send("data: [DONE]\n\n");
        f.source.close();
      }
      await settle();
      f.disposed();
      assert.ok(
        f.cancels.length === 0 ||
          (f.cancels.length === 1 && f.cancels[0] === "client_disconnected"),
        "terminal cleanup may cancel immediately or use the bounded drain"
      );
      assert.ok(f.complete.mock.callCount() > 0);
      assert.equal(
        f.sc.signal.aborted,
        false,
        "transport cleanup must not turn success into abort"
      );
      assert.deepEqual(f.disconnects, []);
      assert.deepEqual(f.errors, []);
    }
  );

  test(`#16258 terminal cancel has bounded heartbeat cleanup without EOF (buffer ${highWaterMark})`, async (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    const f = fixture(t, highWaterMark);
    f.send(content + completed);
    await f.receive("response.completed");
    await f.reader.cancel("client_cancelled");
    t.mock.timers.tick(50);
    await settle();
    f.disposed();
    assert.ok(
      (f.cancels.length === 1 && f.cancels[0] === "client_cancelled") ||
        (f.cancels.length === 1 && f.cancels[0] === "terminal_stream_grace_expired"),
      "terminal cleanup must cancel or reach the bounded drain deadline"
    );
    assert.equal(f.sc.signal.aborted, f.cancels[0] === "terminal_stream_grace_expired");
    assert.deepEqual(f.disconnects, []);
  });

  test(`#16258 terminal tool response cancel does not abandon a registered drain (buffer ${highWaterMark})`, async (t) => {
    const f = fixture(t, highWaterMark, true);
    f.send(handoff + completed);
    await f.receive("response.completed");
    await f.reader.cancel("client_cancelled");
    assert.deepEqual(f.cancels, []);
    assert.equal(f.sc.signal.aborted, false);
    assert.deepEqual(f.completions, []);
    f.send("data: [DONE]\n\n");
    f.source.close();
    await settle();
    f.disposed();
    assert.deepEqual(f.cancels, []);
    assert.deepEqual(f.completions, [{ status: 200, input: 10, output: 2 }]);
    assert.deepEqual(f.disconnects, []);
  });

  test(`#16258 terminal disconnect preserves recorded usage success (buffer ${highWaterMark})`, async (t) => {
    const f = fixture(t, highWaterMark, true);
    f.send(content + completed);
    await f.receive("response.completed");
    assert.deepEqual(f.completions, []);
    f.incoming.abort("client_closed");
    await f.closed();
    assert.deepEqual(f.completions, []);
    assert.deepEqual(f.cancels, []);
    f.send("data: [DONE]\n\n");
    f.source.close();
    await settle();
    f.disposed();
    assert.deepEqual(f.completions, [{ status: 200, input: 10, output: 2 }]);
    assert.deepEqual(f.cancels, []);
    assert.deepEqual(f.disconnects, []);
    assert.deepEqual(f.errors, []);
  });

  test(`#16258 pre-terminal abort still cancels upstream (buffer ${highWaterMark})`, async (t) => {
    const f = fixture(t, highWaterMark);
    f.send(content);
    await f.receive("Hello");
    f.incoming.abort("client_closed");
    // Abort stops heartbeats; a real pending upstream chunk releases any pull.
    f.send(content);
    await f.closed();
    f.disposed();
    assert.equal(f.cancels.length, 1);
    assert.equal(f.sc.signal.aborted, true);
    assert.deepEqual(f.disconnects, ["client_closed"]);
    assert.deepEqual(f.errors, []);
  });

  test(`#16258 normal EOF preserves delayed usage and success (buffer ${highWaterMark})`, async (t) => {
    const f = fixture(t, highWaterMark, true);
    f.send(content);
    await f.receive("Hello");
    assert.deepEqual(f.completions, []);
    await settle();
    f.send(completed);
    await f.receive("response.completed");
    f.send("data: [DONE]\n\n");
    f.source.close();
    await f.closed();
    f.disposed();
    assert.deepEqual(f.completions, [{ status: 200, input: 10, output: 2 }]);
    assert.deepEqual(f.cancels, []);
    assert.deepEqual(f.errors, []);
    assert.deepEqual(f.disconnects, []);
  });

  test(`#16258 completed tool handoff drains delayed usage to EOF (buffer ${highWaterMark})`, async (t) => {
    const f = fixture(t, highWaterMark, true);
    f.send(handoff);
    await f.receive("response.output_item.done");
    assert.equal(f.sc.shouldDeferCompletedToolHandoff(), true);
    f.incoming.abort("client_closed");
    await f.reader.cancel("client_closed");
    assert.equal(f.sc.signal.aborted, false);
    assert.deepEqual(f.completions, []);
    f.send(completed);
    f.send("data: [DONE]\n\n");
    f.source.close();
    await settle();
    f.disposed();
    assert.deepEqual(f.completions, [{ status: 200, input: 10, output: 2 }]);
    assert.deepEqual(f.cancels, []);
    assert.deepEqual(f.errors, []);
  });

  test(`#16258 completed tool handoff drain remains bounded (buffer ${highWaterMark})`, async (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    const f = fixture(t, highWaterMark);
    f.send(handoff);
    await f.receive("response.output_item.done");
    f.incoming.abort("client_closed");
    await f.reader.cancel("client_closed");
    assert.equal(f.sc.signal.aborted, false);
    t.mock.timers.tick(50);
    await settle();
    f.disposed();
    assert.deepEqual(f.cancels, ["completed_tool_handoff_grace_expired"]);
    assert.equal(f.sc.signal.aborted, true);
    assert.deepEqual(f.completions, []);
  });
}
