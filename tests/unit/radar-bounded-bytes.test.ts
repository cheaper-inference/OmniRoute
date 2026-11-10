import test from "node:test";
import assert from "node:assert/strict";
import { readBoundedBytes } from "../../src/lib/radar/readBoundedBytes.ts";

test("feed bytes remain exact across chunk boundaries", async () => {
  const chunks = [new Uint8Array([0, 255, 195]), new Uint8Array([164, 10])];
  const response = new Response(
    new ReadableStream({
      start(controller) {
        for (const chunk of chunks) controller.enqueue(chunk);
        controller.close();
      },
    })
  );
  assert.deepEqual(await readBoundedBytes(response), Buffer.from([0, 255, 195, 164, 10]));
});

test("declared oversized feeds are rejected before consuming the body", async () => {
  const response = new Response("small", {
    headers: { "content-length": String(10 * 1024 * 1024 + 1) },
  });
  assert.equal(await readBoundedBytes(response), null);
  assert.equal(response.bodyUsed, false);
});

test("stream overflow cancels the reader and ignores cancellation failure", async () => {
  let cancelled = false;
  const response = new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array(10 * 1024 * 1024 + 1));
      },
      cancel() {
        cancelled = true;
        throw new Error("cancel failed");
      },
    })
  );
  assert.equal(await readBoundedBytes(response), null);
  assert.equal(cancelled, true);
});

test("exactly the limit is accepted and body read failures propagate", async () => {
  const bytes = await readBoundedBytes(new Response(new Uint8Array(10 * 1024 * 1024)));
  assert.equal(bytes?.length, 10 * 1024 * 1024);
  const response = new Response(
    new ReadableStream({
      start(controller) {
        controller.error(new Error("read failed"));
      },
    })
  );
  await assert.rejects(readBoundedBytes(response), /read failed/);
});
