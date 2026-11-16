import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "stream-collector-retention-"));
const core = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { createStructuredSSECollector } =
  await import("../../open-sse/utils/streamPayloadCollector.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

test.after(() => core.resetDbInstance());

const encoder = new TextEncoder();

async function runStream(chunks: string[], options: Record<string, unknown>) {
  const source = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });
  return new Response(source.pipeThrough(createSSEStream(options as never))).text();
}

const delta = (text: string, finish: string | null = null) =>
  `data: ${JSON.stringify({
    id: "chatcmpl-1",
    object: "chat.completion.chunk",
    created: 1,
    model: "m",
    choices: [{ index: 0, delta: { content: text }, finish_reason: finish }],
  })}\n\n`;

// Normal completion only needs the live summary and the counters, so a stream must not
// deep-clone every pushed chunk into an events array that build({ includeEvents: false })
// then throws away.
test("a passthrough stream does not deep-clone each chunk into the collectors", async () => {
  const chunks = Array.from({ length: 60 }, (_, i) => delta(`t${i} `));
  chunks.push(delta("", "stop"), "data: [DONE]\n\n");
  const realClone = globalThis.structuredClone;
  let clones = 0;
  globalThis.structuredClone = ((value: unknown, options?: StructuredSerializeOptions) => {
    clones += 1;
    return realClone(value, options);
  }) as typeof structuredClone;
  let completed: {
    clientPayload: Record<string, unknown>;
    providerPayload: Record<string, unknown>;
  } | null = null;
  try {
    await runStream(chunks, {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI,
      provider: "openai",
      model: "m",
      body: { messages: [{ role: "user", content: "hi" }] },
      onComplete(payload: never) {
        completed = payload;
      },
    });
  } finally {
    globalThis.structuredClone = realClone;
  }
  assert.ok(completed, "onComplete must run");
  assert.ok(clones < 60, `expected no per-chunk clone, saw ${clones} structuredClone calls`);
  // The logged payloads keep their counts and the live summary.
  assert.equal(completed.providerPayload._eventCount, 62);
  assert.equal(completed.clientPayload._eventCount, 63);
  assert.equal(
    (
      completed.providerPayload.summary as { choices: Array<{ message: { content: string } }> }
    ).choices[0].message.content.startsWith("t0 t1 "),
    true
  );
  assert.equal("events" in completed.providerPayload, false);
});

test("retainEvents:false keeps counts, cap metadata and summary but stores no events", () => {
  const make = (retainEvents: boolean) =>
    createStructuredSSECollector({
      stage: "provider_response",
      format: FORMATS.OPENAI,
      maxEvents: 5,
      retainEvents,
    });
  const kept = make(true);
  const lean = make(false);
  for (let i = 0; i < 9; i++) {
    const chunk = {
      id: "c1",
      object: "chat.completion.chunk",
      model: "m",
      choices: [{ index: 0, delta: { content: `w${i} ` } }],
    };
    kept.push(chunk);
    lean.push(chunk);
  }
  assert.equal(kept.getEvents().length, 5);
  assert.equal(lean.getEvents().length, 0);
  assert.equal(lean.getEventCount(), kept.getEventCount());
  assert.deepEqual(lean.getSummary(), kept.getSummary());
  const keptBuilt = kept.build(kept.getSummary(), { includeEvents: false });
  const leanBuilt = lean.build(lean.getSummary(), { includeEvents: false });
  assert.deepEqual(leanBuilt, keptBuilt);
  assert.equal(leanBuilt._truncated, true);
  assert.equal(leanBuilt._droppedEvents, 4);
});

test("a collector stores no events unless retainEvents is set", () => {
  const off = createStructuredSSECollector({ maxEvents: 5 });
  const on = createStructuredSSECollector({ maxEvents: 5, retainEvents: true });
  for (const c of [off, on]) c.push({ type: "response.created" });
  assert.equal(off.getEvents().length, 0);
  assert.equal(off.getEventCount(), 1);
  assert.equal("events" in (off.build(undefined) as object), false);
  assert.equal(on.getEvents().length, 1);
  assert.equal((on.build(undefined) as { events: unknown[] }).events.length, 1);
});

// The empty-stream error used to rebuild the provider summary from the retained events.
test("an all-empty-choices translate stream still reports the provider summary", async () => {
  let failure: { status: number; code?: string } | null = null;
  let completed: { status: number; providerPayload: Record<string, unknown> } | null = null;
  const text = await runStream(
    [
      `data: ${JSON.stringify({ id: "chatcmpl-empty", object: "chat.completion.chunk", created: 1, model: "m", choices: [] })}\n\n`,
      "data: [DONE]\n\n",
    ],
    {
      mode: "translate",
      sourceFormat: FORMATS.CLAUDE,
      targetFormat: FORMATS.OPENAI,
      provider: "openai",
      model: "m",
      body: { messages: [{ role: "user", content: "hi" }] },
      onFailure(payload: never) {
        failure = payload;
      },
      onComplete(payload: never) {
        completed = payload;
      },
    }
  ).catch(() => "");
  void text;
  assert.equal(failure?.code, "empty_content");
  assert.equal(completed?.status, 502);
  const summary = completed?.providerPayload.summary as { id?: string; object?: string };
  assert.equal(summary?.object, "chat.completion");
  assert.equal(summary?.id, "chatcmpl-empty");
  assert.equal(completed?.providerPayload._eventCount, 2); // the chunk and [DONE]
});
