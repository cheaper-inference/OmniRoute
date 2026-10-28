import test from "node:test";
import assert from "node:assert/strict";

// Regression guard: createResponsesApiTransformStream() splits the upstream Chat
// Completions SSE on "\n\n" and keeps the trailing piece in state.buffer until the
// next chunk. When the upstream closes WITHOUT a final blank line, that last
// message used to stay in the buffer forever — flush() closed the items and emitted
// response.completed without ever parsing it, dropping the last text delta, the
// finish_reason chunk or the usage chunk.

const { createResponsesApiTransformStream } =
  await import("../../open-sse/transformer/responsesTransformer.ts");

const encoder = new TextEncoder();

type SseEvent = { event: string | null; data: Record<string, unknown> | "[DONE]" | null };

function parseSseOutput(output: string): SseEvent[] {
  return output
    .trim()
    .split("\n\n")
    .map((entry) => {
      const lines = entry.split("\n");
      const eventLine = lines.find((line) => line.startsWith("event: "));
      const dataLine = lines.find((line) => line.startsWith("data: "));
      const rawData = dataLine ? dataLine.slice("data: ".length) : null;
      let data: SseEvent["data"] = null;
      if (rawData === "[DONE]") data = "[DONE]";
      else if (rawData !== null) data = JSON.parse(rawData);
      return { event: eventLine ? eventLine.slice("event: ".length) : null, data };
    })
    .filter((e) => e.event !== null || e.data !== null);
}

async function run(chunks: string[]): Promise<SseEvent[]> {
  const stream = createResponsesApiTransformStream(null, 3000);
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();
  const textDecoder = new TextDecoder();

  let out = "";
  const readerTask = (async () => {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (value) out += textDecoder.decode(value, { stream: true });
    }
    out += textDecoder.decode();
  })();

  for (const chunk of chunks) {
    await writer.write(encoder.encode(chunk));
  }
  await writer.close();
  await readerTask;

  return parseSseOutput(out);
}

const frame = (payload: unknown) => `data: ${JSON.stringify(payload)}\n\n`;
const unterminated = (payload: unknown) => `data: ${JSON.stringify(payload)}`;
const contentDelta = (content: string) => ({
  id: "chatcmpl-tail",
  model: "gpt-4o-mini",
  choices: [{ index: 0, delta: { content } }],
});

function textDeltas(events: SseEvent[]): string {
  return events
    .filter((e) => e.event === "response.output_text.delta")
    .map((e) => (e.data as { delta: string }).delta)
    .join("");
}

function completedEvents(events: SseEvent[]) {
  return events.filter((e) => e.event === "response.completed");
}

test("drains a final event that arrived without its blank-line terminator", async () => {
  const events = await run([frame(contentDelta("hello")), unterminated(contentDelta(" world"))]);

  assert.equal(textDeltas(events), "hello world");
  const completed = completedEvents(events);
  assert.equal(completed.length, 1);
  const response = (completed[0].data as { response: { output: unknown[] } }).response;
  assert.match(JSON.stringify(response.output), /hello world/);
  // [DONE] still terminates the stream exactly once, after response.completed.
  assert.equal(events.filter((e) => e.data === "[DONE]").length, 1);
  assert.equal(events.at(-1)?.data, "[DONE]");
});

test("final finish_reason+usage chunk without terminator still lands in response.completed", async () => {
  const usage = { prompt_tokens: 11, completion_tokens: 7, total_tokens: 18 };
  const events = await run([
    frame(contentDelta("hi")),
    unterminated({
      id: "chatcmpl-tail",
      model: "gpt-4o-mini",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage,
    }),
  ]);

  const completed = completedEvents(events);
  assert.equal(completed.length, 1, "exactly one response.completed must be emitted");
  const response = (completed[0].data as { response: Record<string, unknown> }).response;
  assert.equal(response.status, "completed");
  const responseUsage = response.usage as Record<string, number> | undefined;
  assert.ok(responseUsage, "usage from the unterminated final chunk must reach response.completed");
  assert.equal(responseUsage.input_tokens, 11);
  assert.equal(responseUsage.output_tokens, 7);
  assert.equal(responseUsage.total_tokens, 18);
});

test("trailing usage-only chunk without terminator completes the deferred response (#6906 path)", async () => {
  const events = await run([
    frame(contentDelta("ok")),
    frame({
      id: "chatcmpl-tail",
      model: "gpt-4o-mini",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    }),
    unterminated({
      id: "chatcmpl-tail",
      model: "gpt-4o-mini",
      choices: [],
      usage: { prompt_tokens: 3, completion_tokens: 2, total_tokens: 5 },
    }),
  ]);

  const completed = completedEvents(events);
  assert.equal(completed.length, 1);
  const response = (completed[0].data as { response: Record<string, unknown> }).response;
  const responseUsage = response.usage as Record<string, number> | undefined;
  assert.ok(responseUsage, "deferred completion must carry the drained usage chunk");
  assert.equal(responseUsage.total_tokens, 5);
});

test("unterminated [DONE] or non-JSON tail is ignored without duplicating terminal events", async () => {
  const doneTail = await run([
    frame(contentDelta("a")),
    frame({ id: "x", choices: [{ index: 0, delta: {}, finish_reason: "stop" }] }),
    "data: [DONE]",
  ]);
  assert.equal(textDeltas(doneTail), "a");
  assert.equal(completedEvents(doneTail).length, 1);
  assert.equal(doneTail.filter((e) => e.data === "[DONE]").length, 1);

  const garbageTail = await run([frame(contentDelta("b")), "data: {not json"]);
  assert.equal(textDeltas(garbageTail), "b");
  assert.equal(completedEvents(garbageTail).length, 1);
  assert.equal(garbageTail.filter((e) => e.data === "[DONE]").length, 1);
});

test("well-formed stream is unchanged by the tail drain", async () => {
  const events = await run([
    frame(contentDelta("hello")),
    frame(contentDelta(" world")),
    frame({ id: "x", choices: [{ index: 0, delta: {}, finish_reason: "stop" }] }),
    "data: [DONE]\n\n",
  ]);

  assert.equal(textDeltas(events), "hello world");
  const completed = completedEvents(events);
  assert.equal(completed.length, 1);
  assert.equal(
    (completed[0].data as { response: { status: string } }).response.status,
    "completed"
  );
  assert.equal(events.filter((e) => e.data === "[DONE]").length, 1);
});
