import test from "node:test";
import assert from "node:assert/strict";
import { withEarlyStreamKeepalive } from "../../open-sse/utils/earlyStreamKeepalive.ts";

// F-C1-14: the slow path read the whole real body inside start() and enqueued every chunk without
// looking at the consumer's demand. A stalled client left the entire response queued in memory.
test("a stalled client does not make the keepalive wrapper pull the whole upstream body", async () => {
  const TOTAL = 200;
  let pulled = 0;
  const upstream = new ReadableStream<Uint8Array>(
    {
      pull(controller) {
        if (pulled >= TOTAL) return controller.close();
        pulled++;
        controller.enqueue(new TextEncoder().encode(`data: ${pulled}\n\n`));
      },
    },
    { highWaterMark: 0 }
  );
  const handler = new Promise<Response>((resolve) =>
    setTimeout(
      () =>
        resolve(
          new Response(upstream, { status: 200, headers: { "content-type": "text/event-stream" } })
        ),
      30
    )
  );
  const wrapped = await withEarlyStreamKeepalive(handler, { thresholdMs: 5, intervalMs: 1000 });
  const reader = wrapped.body!.getReader();
  await reader.read(); // the startup frame; then the client stops reading
  await new Promise((resolve) => setTimeout(resolve, 300));
  assert.ok(pulled < TOTAL, `pulled ${pulled}/${TOTAL} chunks while the client read nothing`);
  await reader.cancel();
});

test("backpressure still delivers every chunk to a reading client", async () => {
  const chunks = Array.from({ length: 50 }, (_, i) => `data: ${i}\n\n`);
  let i = 0;
  const upstream = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i < chunks.length) controller.enqueue(new TextEncoder().encode(chunks[i++]));
      else controller.close();
    },
  });
  const handler = new Promise<Response>((resolve) =>
    setTimeout(
      () =>
        resolve(
          new Response(upstream, { status: 200, headers: { "content-type": "text/event-stream" } })
        ),
      30
    )
  );
  const wrapped = await withEarlyStreamKeepalive(handler, { thresholdMs: 5, intervalMs: 1000 });
  const text = await wrapped.text();
  for (let n = 0; n < chunks.length; n++) assert.ok(text.includes(`data: ${n}\n\n`), `chunk ${n}`);
});
