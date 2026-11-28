/**
 * @file early-stream-keepalive-nonsse-body-deadline.test.ts
 * @description The slow-path deadline must keep running while a non-SSE handler body is read,
 * and the in-flight body read must be cancelled when the deadline fires.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  OPENAI_CHAT_ERROR_FRAME,
  withDeadlineSignal,
  withEarlyStreamKeepalive,
} from "../../open-sse/utils/earlyStreamKeepalive.ts";

async function readAll(response: Response): Promise<string> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let out = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) out += decoder.decode(value, { stream: true });
  }
  return out;
}

function newDeadlineController() {
  return withDeadlineSignal(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "m", stream: true }),
    })
  ).deadlineController;
}

test("a text/plain body that trickles forever hits the slow-path deadline and is cancelled", async () => {
  const deadlineController = newDeadlineController();
  const encoder = new TextEncoder();
  let sourceCancelled = false;
  let trickle: ReturnType<typeof setInterval> | undefined;
  const trickling = new ReadableStream<Uint8Array>({
    start(controller) {
      trickle = setInterval(() => controller.enqueue(encoder.encode("x")), 10);
    },
    cancel() {
      sourceCancelled = true;
      clearInterval(trickle);
    },
  });
  const handler = new Promise<Response>((resolve) => {
    setTimeout(
      () =>
        resolve(
          new Response(trickling, { status: 200, headers: { "Content-Type": "text/plain" } })
        ),
      30
    );
  });

  try {
    const result = await withEarlyStreamKeepalive(handler, {
      thresholdMs: 10,
      intervalMs: 250,
      slowPathDeadlineMs: 200,
      deadlineController,
      errorFrame: OPENAI_CHAT_ERROR_FRAME,
    });
    const outcome = await Promise.race([
      readAll(result).then((body) => ({ body })),
      new Promise<{ body: null }>((resolve) => setTimeout(() => resolve({ body: null }), 1500)),
    ]);

    assert.notEqual(outcome.body, null, "client stream must end once the deadline expires");
    assert.match(outcome.body!, /"error":/, "deadline must emit the route error frame");
    assert.equal(deadlineController.signal.aborted, true, "deadline must abort the controller");
    assert.equal(sourceCancelled, true, "the in-flight body read must be cancelled");
  } finally {
    clearInterval(trickle);
  }
});

test("a non-SSE error body that finishes in time is still framed as one error event", async () => {
  const deadlineController = newDeadlineController();
  const handler = new Promise<Response>((resolve) => {
    setTimeout(
      () =>
        resolve(
          new Response(
            JSON.stringify({ error: { message: "upstream_busy", type: "rate_limit" } }),
            {
              status: 429,
              headers: { "Content-Type": "application/json" },
            }
          )
        ),
      30
    );
  });

  const result = await withEarlyStreamKeepalive(handler, {
    thresholdMs: 10,
    intervalMs: 250,
    slowPathDeadlineMs: 5000,
    deadlineController,
    errorFrame: OPENAI_CHAT_ERROR_FRAME,
  });
  const body = await readAll(result);

  assert.match(body, /data: \{"error":\{"message":"upstream_busy","type":"rate_limit"\}\}\n\n/);
  assert.equal(deadlineController.signal.aborted, false, "no abort when the body ends in time");
});
