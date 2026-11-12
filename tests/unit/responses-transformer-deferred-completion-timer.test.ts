import test, { mock } from "node:test";
import assert from "node:assert/strict";

const { createResponsesApiTransformStream } =
  await import("../../open-sse/transformer/responsesTransformer.ts");

// A chat upstream may send finish_reason but neither a usage trailer nor [DONE], and keep
// the connection open. The transformer defers response.completed for a trailing usage
// chunk (#6906); without a timer the client waits for the generic stall watchdog.

const GRACE_MS = 3000;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const sse = (chunk: unknown) => encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`);
const base = { id: "chatcmpl-timer", model: "gpt-test" };
const textChunk = {
  ...base,
  choices: [{ index: 0, delta: { content: "Hi" }, finish_reason: null }],
};
const finishChunk = { ...base, choices: [{ index: 0, delta: {}, finish_reason: "stop" }] };
const usageChunk = {
  ...base,
  choices: [],
  usage: { prompt_tokens: 7, completion_tokens: 3, total_tokens: 10 },
};

async function settle() {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
}

// Opens a transform stream, never closes the upstream side until `close()`.
function openStream() {
  const stream = createResponsesApiTransformStream(null, 60000);
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();
  let output = "";
  void (async () => {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) return;
      output += decoder.decode(value, { stream: true });
    }
  })();
  return {
    write: (chunk: unknown) => writer.write(sse(chunk)),
    text: () => output,
    completed: () => (output.match(/event: response\.completed/g) || []).length,
    close: async () => {
      await writer.close();
      await settle();
    },
  };
}

test("response.completed is sent after the grace period when no usage or [DONE] arrives", async () => {
  mock.timers.enable({ apis: ["setTimeout"] });
  const s = openStream();
  try {
    await s.write(textChunk);
    await s.write(finishChunk);
    await settle();
    assert.equal(s.completed(), 0, "completion is deferred while a usage trailer may still come");

    mock.timers.tick(GRACE_MS);
    await settle();
    assert.equal(s.completed(), 1, "the grace timer must flush response.completed");
  } finally {
    mock.timers.reset();
    await s.close();
  }
});

test("a usage trailer inside the grace period still lands in response.completed", async () => {
  mock.timers.enable({ apis: ["setTimeout"] });
  const s = openStream();
  try {
    await s.write(textChunk);
    await s.write(finishChunk);
    await s.write(usageChunk);
    await settle();
    assert.equal(s.completed(), 1);
    assert.match(s.text(), /"total_tokens":10/);

    mock.timers.tick(GRACE_MS * 2);
    await settle();
    assert.equal(s.completed(), 1, "the timer must be cleared once the response completed");
  } finally {
    mock.timers.reset();
    await s.close();
  }
});

test("usage that arrives after the timer flushed does not send a second completion", async () => {
  mock.timers.enable({ apis: ["setTimeout"] });
  const s = openStream();
  try {
    await s.write(textChunk);
    await s.write(finishChunk);
    mock.timers.tick(GRACE_MS);
    await settle();
    await s.write(usageChunk);
    await settle();
    assert.equal(s.completed(), 1);
  } finally {
    mock.timers.reset();
    await s.close();
  }
  assert.equal(s.completed(), 1, "stream end must not add a second completion either");
});

test("a failure while the grace timer completes the response reaches the client", async () => {
  mock.timers.enable({ apis: ["setTimeout"] });
  const logger = {
    logInput() {},
    flush() {},
    logOutput(event: string) {
      if (event.includes("response.completed")) throw new Error("completion log failed");
    },
  };
  const stream = createResponsesApiTransformStream(logger, 60000);
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();
  try {
    await writer.write(sse(textChunk));
    await writer.write(sse(finishChunk));
    await settle();
    mock.timers.tick(GRACE_MS);
    await settle();
    mock.timers.reset();
    // Drain what was queued before the failure; the next read must report the error.
    let outcome = "chunk";
    for (let i = 0; i < 40 && outcome === "chunk"; i++) {
      outcome = await Promise.race([
        reader.read().then(
          () => "chunk",
          (error) => String(error)
        ),
        new Promise<string>((resolve) => setTimeout(() => resolve("silent"), 200)),
      ]);
    }
    assert.match(outcome, /completion log failed/, "the stream must error, not stay silent");
  } finally {
    mock.timers.reset();
    await writer.abort().catch(() => {});
  }
});
