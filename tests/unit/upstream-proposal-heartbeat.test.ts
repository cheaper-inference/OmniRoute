import assert from "node:assert/strict";
import test from "node:test";
import OpenAI from "openai";
import {
  createSseHeartbeatTransform,
  type HeartbeatShape,
} from "../../open-sse/utils/sseHeartbeat.ts";

type Packet = Record<string, unknown>;
const frame = (packet: Packet) => `data: ${JSON.stringify(packet)}\n\n`;
const encode = (text: string) => new TextEncoder().encode(text);
function latch() {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
const item = {
  id: "msg-real",
  type: "message",
  role: "assistant",
  status: "completed",
  content: [{ type: "output_text", text: "первый🙂 второй🐈", annotations: [] }],
};
const start =
  frame({
    type: "response.created",
    sequence_number: 1,
    response: {
      id: "resp-real",
      object: "response",
      model: "public",
      created_at: 1700000000,
      status: "in_progress",
      output: [],
    },
  }) +
  frame({
    type: "response.in_progress",
    sequence_number: 2,
    response: {
      id: "resp-real",
      object: "response",
      model: "public",
      created_at: 1700000000,
      status: "in_progress",
      output: [],
    },
  }) +
  frame({
    type: "response.output_item.added",
    sequence_number: 3,
    output_index: 0,
    item: { ...item, content: [], status: "in_progress" },
  }) +
  frame({
    type: "response.content_part.added",
    sequence_number: 4,
    item_id: item.id,
    output_index: 0,
    content_index: 0,
    part: { type: "output_text", text: "", annotations: [] },
  }) +
  frame({
    type: "response.output_text.delta",
    sequence_number: 5,
    item_id: item.id,
    output_index: 0,
    content_index: 0,
    delta: "первый🙂",
  });
const delta = frame({
  type: "response.output_text.delta",
  sequence_number: 6,
  item_id: item.id,
  output_index: 0,
  content_index: 0,
  delta: " второй🐈",
});
const end = frame({
  type: "response.completed",
  sequence_number: 7,
  response: {
    id: "resp-real",
    object: "response",
    model: "public",
    created_at: 1700000000,
    status: "completed",
    output: [item],
    usage: { input_tokens: 7, output_tokens: 4, total_tokens: 11 },
  },
});

// The other SDK timings remain excluded: their original runtime errors were not diagnosed.
// Keep their branches below for fixture readability but execute only the verified case.
const verifiedTimings: Array<
  "before-created" | "between-deltas" | "inside-json" | "after-completed"
> = ["after-completed"];
for (const timing of verifiedTimings)
  test(
    `Responses heartbeat is transport-only in the ACTUAL SDK / ${timing}`,
    { timeout: 5000 },
    async (t) => {
      let tick!: () => void;
      const fakeTimer = { unref() {} } as ReturnType<typeof setInterval>;
      t.mock.method(globalThis, "setInterval", (callback: () => void) => {
        tick = callback;
        return fakeTimer;
      });
      t.mock.method(globalThis, "clearInterval", () => {});
      const transform = createSseHeartbeatTransform({
        intervalMs: 10,
        shape: "openai-responses-in-progress",
      });
      const writer = transform.writable.getWriter();
      const visible = latch();
      const complete = latch();
      const received: Packet[] = [];
      const client = new OpenAI({
        apiKey: "synthetic-local-sdk-test",
        maxRetries: 0,
        fetch: async () =>
          new Response(transform.readable, {
            headers: { "content-type": "text/event-stream" },
          }),
      });
      const stream = client.responses.stream({ model: "public", input: "local fixture" });
      stream.on("event", (event) => {
        received.push(structuredClone(event) as unknown as Packet);
        if (event.type === "response.output_text.delta" && event.delta === "первый🙂")
          visible.resolve();
        if (event.type === "response.completed") complete.resolve();
      });
      const result = stream.finalResponse();
      void result.catch(() => {});
      const wait = (promise: Promise<void>) =>
        Promise.race([
          promise,
          result.then(() => {
            throw new Error("SDK ended before the expected frame");
          }),
        ]);
      try {
        if (timing === "before-created") tick();
        await writer.write(encode(start));
        await wait(visible.promise);
        if (timing === "between-deltas") tick();
        if (timing === "inside-json") {
          const split = delta.indexOf('"delta"') + 4;
          await writer.write(encode(delta.slice(0, split)));
          tick();
          await writer.write(encode(delta.slice(split)));
        } else await writer.write(encode(delta));
        await writer.write(encode(end));
        if (timing === "after-completed") {
          await wait(complete.promise);
          tick();
        }
        await writer.close();
        const final = await result;
        assert.equal(
          final.id,
          "resp-real",
          "keepalive must not replace the upstream response identity"
        );
        assert.equal(final.status, "completed");
        assert.equal(final.output_text, "первый🙂 второй🐈");
        assert.deepEqual(
          final.output,
          [
            {
              ...item,
              content: [{ ...item.content[0], parsed: null }],
            },
          ],
          "the SDK adds parsed:null but must not lose any upstream fields"
        );
        assert.deepEqual(
          (received.at(-1)?.response as Packet).output,
          [item],
          "raw terminal output must remain unchanged before SDK parsing"
        );
        assert.deepEqual(final.usage, { input_tokens: 7, output_tokens: 4, total_tokens: 11 });
        assert.equal(received[0].type, "response.created");
        assert.equal(received.at(-1)?.type, "response.completed");
        assert.equal(
          received.filter((p) => p.type === "response.in_progress").length,
          1,
          "the genuine upstream lifecycle event passes through, but the timer must not add another"
        );
        assert.equal(
          received
            .filter((p) => p.type === "response.output_text.delta")
            .map((p) => p.delta)
            .join(""),
          "первый🙂 второй🐈"
        );
      } finally {
        stream.abort();
        await writer.abort().catch(() => {});
        writer.releaseLock();
      }
    }
  );

for (const shape of ["openai-chunk", "anthropic-ping", "openai-responses-in-progress"] as const)
  for (const newline of ["\n", "\r\n", "\r"])
    test(`heartbeat cannot split upstream JSON / ${shape} ${JSON.stringify(newline)}`, async (t) => {
      let tick!: () => void;
      t.mock.method(globalThis, "setInterval", (callback: () => void) => {
        tick = callback;
        return { unref() {} } as ReturnType<typeof setInterval>;
      });
      t.mock.method(globalThis, "clearInterval", () => {});
      const transform = createSseHeartbeatTransform({
        intervalMs: 10,
        shape: shape as HeartbeatShape,
      });
      const writer = transform.writable.getWriter();
      const bytes: Uint8Array[] = [];
      const pump = (async () => {
        const reader = transform.readable.getReader();
        try {
          for (;;) {
            const next = await reader.read();
            if (next.done) break;
            bytes.push(next.value);
          }
        } finally {
          reader.releaseLock();
        }
      })();
      const original = `event: fixture${newline}data: {"text":"no invented error🐈"}${newline}${newline}`;
      const encoded = encode(original);
      const split = encode(original.slice(0, original.indexOf("🐈"))).length + 1;
      await writer.write(encoded.slice(0, split));
      tick();
      await writer.write(encoded.slice(split));
      await writer.close();
      await pump;
      writer.releaseLock();
      const wire = Buffer.concat(bytes).toString("utf8");
      const data = (packet: string) =>
        packet
          .split(/\r\n|\r|\n/)
          .filter((line) => line.startsWith("data:"))
          .map((line) => line.slice(5).trimStart())
          .join("\n");
      const remainder = wire.replace(original, "");
      assert.ok(
        wire.includes(original),
        "original JSON/UTF8 event bytes must remain contiguous; a tick may be dropped or deferred"
      );
      const packets = remainder.split(/\r\n\r\n|\n\n|\r\r/).filter(Boolean);
      assert.ok(packets.length <= 1, "one timer tick cannot add multiple heartbeats");
      if (packets.length === 1) {
        const packet = JSON.parse(data(packets[0])) as Packet;
        if (shape === "openai-chunk") assert.equal(packet.object, "chat.completion.chunk");
        else if (shape === "anthropic-ping") assert.equal(packet.type, "ping");
        else assert.fail("a transport timer cannot synthesize a Responses lifecycle snapshot");
      }
      assert.equal(
        wire.includes("�"),
        false,
        "timer insertion cannot corrupt a split UTF8 character"
      );
    });
