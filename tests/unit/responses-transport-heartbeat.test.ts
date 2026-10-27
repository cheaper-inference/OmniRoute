import assert from "node:assert/strict";
import test from "node:test";
import OpenAI from "openai";
import { createSseHeartbeatTransform } from "../../open-sse/utils/sseHeartbeat.ts";

const response = {
  id: "resp_heartbeat_owned_by_upstream",
  object: "response",
  model: "fixture-model",
  created_at: 1700000000,
  status: "in_progress",
  output: [],
  error: null,
};
const frame = (packet: Record<string, unknown>) =>
  new TextEncoder().encode(`data: ${JSON.stringify(packet)}\n\n`);
for (const timing of ["before-created", "in-progress", "after-completed"] as const) {
  test(
    `Responses timer does not create application events / ${timing}`,
    { timeout: 5000 },
    async (t) => {
      let tick!: () => void;
      t.mock.method(globalThis, "setInterval", (fn: () => void) => {
        tick = fn;
        return { unref() {} } as ReturnType<typeof setInterval>;
      });
      t.mock.method(globalThis, "clearInterval", () => {});
      const transform = createSseHeartbeatTransform({
        intervalMs: 10,
        shape: "openai-responses-in-progress",
      });
      const writer = transform.writable.getWriter();
      const client = new OpenAI({
        apiKey: "fixture-no-provider",
        maxRetries: 0,
        fetch: async () =>
          new Response(transform.readable, { headers: { "content-type": "text/event-stream" } }),
      });
      const stream = client.responses.stream({ model: response.model, input: "fixture" });
      const events: Array<Record<string, unknown>> = [];
      stream.on("event", (event) =>
        events.push(structuredClone(event) as unknown as Record<string, unknown>)
      );
      const result = stream.finalResponse();
      void result.catch(() => {});
      try {
        if (timing === "before-created") tick();
        await writer.write(frame({ type: "response.created", sequence_number: 10, response }));
        await writer.write(frame({ type: "response.in_progress", sequence_number: 11, response }));
        if (timing === "in-progress") tick();
        await writer.write(
          frame({
            type: "response.completed",
            sequence_number: 12,
            response: {
              ...response,
              status: "completed",
              usage: { input_tokens: 3, output_tokens: 0, total_tokens: 3 },
            },
          })
        );
        if (timing === "after-completed") tick();
        await writer.close();
        const final = await result;
        assert.equal(final.id, response.id);
        assert.equal(final.status, "completed");
        assert.deepEqual(
          events.map((event) => event.type),
          ["response.created", "response.in_progress", "response.completed"]
        );
        assert.deepEqual(
          events.map((event) => event.sequence_number),
          [10, 11, 12]
        );
        assert.equal(final.usage?.total_tokens, 3);
      } finally {
        stream.abort();
        await writer.abort().catch(() => {});
        writer.releaseLock();
      }
    }
  );
}
