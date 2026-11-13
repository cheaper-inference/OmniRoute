import test from "node:test";
import assert from "node:assert/strict";
import {
  getBodySizeLimit,
  MAX_BODY_BYTES_LLM_API,
} from "../../src/shared/middleware/bodySizeGuard.ts";
import {
  ChatAdmissionController,
  releaseChatAdmissionWhenDone,
} from "../../src/shared/middleware/chatBodyAdmission.ts";

test("the legacy completions route gets the same LLM body cap as chat", () => {
  assert.equal(getBodySizeLimit("/api/v1/completions", {}), MAX_BODY_BYTES_LLM_API);
  assert.equal(getBodySizeLimit("/api/v1/chat/completions", {}), MAX_BODY_BYTES_LLM_API);
});

test("an NDJSON stream keeps its admission lease until the stream ends", async () => {
  const controller = new ChatAdmissionController(1);
  const lease = controller.tryAcquireHeavy();
  assert.ok(lease);
  const body = new ReadableStream<Uint8Array>({
    start(stream) {
      stream.enqueue(new TextEncoder().encode('{"done":false}\n'));
    },
  });
  const wrapped = releaseChatAdmissionWhenDone(
    new Response(body, { headers: { "content-type": "application/x-ndjson" } }),
    lease
  );
  assert.equal(controller.activeHeavy, 1, "the lease must be held while the stream is open");
  await wrapped.body!.cancel();
  assert.equal(controller.activeHeavy, 0);
});
