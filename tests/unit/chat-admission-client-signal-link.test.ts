import { test } from "node:test";
import assert from "node:assert/strict";
import v8 from "node:v8";
import vm from "node:vm";

const { ChatAdmissionController, admitChatRequest } =
  await import("../../src/shared/middleware/chatBodyAdmission.ts");

const noShed = () => undefined;

// A fixed body limit keeps admission from reading saved settings, which would open the DB
// singleton that these tests never close.
const admitOptions = (controller: InstanceType<typeof ChatAdmissionController>) => ({
  controller,
  largeBodyBytes: 16,
  queueMs: 0,
  hardMaxBytes: 1024 * 1024,
});

async function settle(): Promise<void> {
  for (let i = 0; i < 8; i++) await new Promise((resolve) => setImmediate(resolve));
}

function gcFn(): () => void {
  v8.setFlagsFromString("--expose-gc");
  return vm.runInNewContext("gc") as () => void;
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
  const forceGc = gcFn();
  const controller = new ChatAdmissionController(1, undefined, 0, noShed);
  const client = new AbortController();
  let original: Request | null = heavyRequest(client.signal);
  let admission: Awaited<ReturnType<typeof admitChatRequest>> | null = await admitChatRequest(
    original,
    admitOptions(controller)
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

// A clone taken before the client disconnects must see the abort too. Undici registers a clone's
// abort dependency under the signal the Request exposes, so replacing that signal orphans the
// clone, with no GC involved. (Undici itself does not keep a clone's controller alive across GC.)
test("a client abort reaches a clone taken from the admitted request before the abort", async () => {
  const controller = new ChatAdmissionController(1, undefined, 0, noShed);
  const client = new AbortController();
  const admission = await admitChatRequest(heavyRequest(client.signal), admitOptions(controller));
  assert.equal(admission.admit, true);
  if (!admission.admit) return;
  const clone = admission.request.clone();
  assert.equal(clone.signal.aborted, false);

  client.abort();
  assert.equal(admission.request.signal.aborted, true, "the admitted request sees the abort");
  assert.equal(clone.signal.aborted, true, "the clone sees the abort");
  admission.lease.release();
});
