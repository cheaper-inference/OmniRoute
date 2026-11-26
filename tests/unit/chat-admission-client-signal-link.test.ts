import { test } from "node:test";
import assert from "node:assert/strict";
import v8 from "node:v8";
import vm from "node:vm";

const { ChatAdmissionController, admitChatRequest } =
  await import("../../src/shared/middleware/chatBodyAdmission.ts");

const noShed = () => undefined;

async function settle(): Promise<void> {
  for (let i = 0; i < 8; i++) await new Promise((resolve) => setImmediate(resolve));
}

function heavyRequest(signal: AbortSignal): Request {
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: "x".repeat(64) }] }),
    signal,
  });
}

// Admission replaces the inbound Request with one carrying the buffered body. Undici links a
// Request's signal to its init signal weakly, so once both Request objects are unreachable the
// client abort must still reach the signal downstream code holds.
test("a client abort still reaches the admitted request's signal after GC", async () => {
  v8.setFlagsFromString("--expose-gc");
  const forceGc = vm.runInNewContext("gc") as () => void;
  const controller = new ChatAdmissionController(1, undefined, 0, noShed);
  const client = new AbortController();
  let original: Request | null = heavyRequest(client.signal);
  let admission: Awaited<ReturnType<typeof admitChatRequest>> | null = await admitChatRequest(
    original,
    { controller, largeBodyBytes: 16, queueMs: 0 }
  );
  assert.equal(admission.admit, true);
  const lease = admission.admit ? admission.lease : null;
  const downstreamSignal = admission.admit ? admission.request.signal : null;
  assert.ok(downstreamSignal);

  // Keep only what downstream code keeps: its signal, not either Request object.
  original = null;
  admission = null;
  for (let i = 0; i < 5; i++) {
    forceGc();
    await settle();
  }

  client.abort();
  assert.equal(downstreamSignal.aborted, true, "the client abort reaches the rebuilt request");
  lease?.release();
});
