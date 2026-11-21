import test from "node:test";
import assert from "node:assert/strict";

const { createResponsesApiTransformStream } =
  await import("../../open-sse/transformer/responsesTransformer.ts");

const encoder = new TextEncoder();

type SseEvent = {
  event: string;
  data: {
    status?: string;
    response?: { status?: string; usage?: Record<string, number>; output: unknown[] };
  };
};

function parse(text: string): SseEvent[] {
  const events: SseEvent[] = [];
  for (const block of text.split("\n\n")) {
    const event = block.match(/^event: (.+)$/m)?.[1];
    const data = block.match(/^data: (.+)$/m)?.[1];
    if (event && data && data !== "[DONE]") events.push({ event, data: JSON.parse(data) });
  }
  return events;
}

// Closed upstream: all frames, then close.
async function run(frames: string[]): Promise<SseEvent[]> {
  const source = new ReadableStream({
    start(controller) {
      for (const frame of frames) controller.enqueue(encoder.encode(frame));
      controller.close();
    },
  });
  return parse(await new Response(source.pipeThrough(createResponsesApiTransformStream())).text());
}

const data = (payload: unknown) => `data: ${JSON.stringify(payload)}\n\n`;
const textChunk = (extra: object = {}) =>
  data({
    id: "a",
    model: "m",
    choices: [{ index: 0, delta: { role: "assistant", content: "hi" }, finish_reason: null }],
    ...extra,
  });
const finishChunk = (extra: object = {}) =>
  data({ id: "a", choices: [{ index: 0, delta: {}, finish_reason: "stop" }], ...extra });
const completed = (events: SseEvent[]) =>
  events.find((entry) => entry.event === "response.completed")?.data.response;
const zeroUsage = { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };

test("usage of zeros on every chunk does not freeze the final usage at zero", async () => {
  const events = await run([
    textChunk({ usage: zeroUsage }),
    finishChunk({ usage: zeroUsage }),
    data({
      id: "a",
      choices: [],
      usage: { prompt_tokens: 100, completion_tokens: 5, total_tokens: 105 },
    }),
    "data: [DONE]\n\n",
  ]);
  assert.equal(completed(events)?.usage?.input_tokens, 100);
});

test("an empty usage object does not become the response usage", async () => {
  const events = await run([textChunk(), finishChunk({ usage: {} }), "data: [DONE]\n\n"]);
  const response = completed(events);
  assert.ok(response, "response.completed must be sent");
  assert.equal(response.usage, undefined, JSON.stringify(response.usage));
});

test("usage made only of cache writes kept out of input_tokens is not a placeholder", async () => {
  const events = await run([
    textChunk(),
    finishChunk({
      usage: {
        input_tokens: 0,
        output_tokens: 0,
        input_tokens_details: { cache_creation_tokens: 25, cache_creation_in_prompt: false },
      },
    }),
    "data: [DONE]\n\n",
  ]);
  assert.equal(completed(events)?.usage?.input_tokens, 25);
});

test("a top-level upstream error becomes response.failed, not an empty completed", async () => {
  const events = await run([
    data({ error: { message: "upstream broke", type: "server_error", code: "boom" } }),
  ]);
  const names = events.map((entry) => entry.event);
  assert.ok(names.includes("response.failed"), names.join(","));
  assert.ok(!names.includes("response.completed"), names.join(","));
});

test("[DONE] completes a response that waits for trailing usage, before the upstream closes", async () => {
  let release: () => void = () => {};
  const open = new Promise<void>((resolve) => (release = resolve));
  const source = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode(textChunk()));
      controller.enqueue(encoder.encode(finishChunk()));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      await open;
      controller.close();
    },
  });
  const reader = source.pipeThrough(createResponsesApiTransformStream()).getReader();
  let text = "";
  const decoder = new TextDecoder();
  const deadline = Date.now() + 1500;
  // One read stays pending across the 200 ms checks, so a chunk is never taken by a read
  // whose result nobody awaits any more.
  let pending: ReturnType<typeof reader.read> | null = null;
  while (Date.now() < deadline && !text.includes("response.completed")) {
    pending ??= reader.read();
    const next = await Promise.race([
      pending,
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 200)),
    ]);
    if (next === null) continue;
    pending = null;
    if (next.done) break;
    text += decoder.decode(next.value);
  }
  release();
  await reader.cancel().catch(() => {});
  assert.ok(
    text.includes("response.completed"),
    "no response.completed before the upstream closed"
  );
});

test("normal usage on the finish chunk still completes with that usage", async () => {
  const events = await run([
    textChunk(),
    finishChunk({ usage: { prompt_tokens: 7, completion_tokens: 3, total_tokens: 10 } }),
    "data: [DONE]\n\n",
  ]);
  assert.equal(completed(events)?.usage?.input_tokens, 7);
  assert.equal(completed(events)?.usage?.output_tokens, 3);
});
