import test from "node:test";
import assert from "node:assert/strict";
import { IngestByteAdmissionController } from "../../src/shared/middleware/ingestByteAdmission.ts";
import { createResponsesInProgressTracker } from "../../open-sse/utils/responsesKeepaliveFrame.ts";

test("one release wakes every waiter that now fits", async () => {
  const controller = new IngestByteAdmissionController({ maxInflightBytes: 10, onShed() {} });
  const held = controller.tryAcquire(10);
  assert.ok(held);
  const first = controller.acquireWithin(3, 1_000, undefined, "lane-a");
  const second = controller.acquireWithin(3, 1_000, undefined, "lane-b");
  await new Promise((resolve) => setTimeout(resolve, 20));
  held.release();
  const results = await Promise.all([first, second]);
  assert.deepEqual(
    results.map((result) => result.status),
    ["acquired", "acquired"]
  );
  for (const result of results) if (result.status === "acquired") result.lease.release();
});

test("a multibyte character split across chunks stays inside its own stream", () => {
  const frame = (id: string) =>
    new TextEncoder().encode(
      `data: ${JSON.stringify({
        type: "response.created",
        sequence_number: 1,
        response: { id, created_at: 1, model: "m" },
      })}\n`
    );
  const euro = new TextEncoder().encode("€");
  const streamA = createResponsesInProgressTracker();
  const streamB = createResponsesInProgressTracker();
  streamA.observe(euro.slice(0, 1));
  streamB.observe(frame("resp_stream_b"));
  assert.match(streamB.payload(), /resp_stream_b/);
});
