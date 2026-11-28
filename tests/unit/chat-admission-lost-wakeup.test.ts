// A waiter woken by the fair dispatcher that then gives up without taking the slot (its
// client aborted, or its deadline fired, in the same task) must pass the wakeup on.
// Otherwise the other waiters shed queue_timeout while capacity sits free.
import { test } from "node:test";
import assert from "node:assert/strict";

const { ChatAdmissionController } =
  await import("../../src/shared/middleware/chatBodyAdmission.ts");

// Long enough that only a wake (never the deadline) can serve a waiter in these tests.
const LONG_WAIT_MS = 10_000;

async function settle(): Promise<void> {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
}

function sheds() {
  const reasons: string[] = [];
  return { reasons, sink: (event: { reason: string }) => reasons.push(event.reason) };
}

test("a woken waiter that aborts in the same task passes the slot to the next waiter", async () => {
  const log = sheds();
  const c = new ChatAdmissionController(1, undefined, 0, log.sink);
  const holder = c.tryAcquireHeavy()!;
  const clientA = new AbortController();
  const a = c.acquireHeavyWithin(LONG_WAIT_MS, clientA.signal, 0, "a");
  const b = c.acquireHeavyWithin(LONG_WAIT_MS, new AbortController().signal, 0, "b");
  await settle();
  holder.release(); // wakes A
  clientA.abort(); // ...whose client leaves in the same task
  assert.equal(await a, null);
  const leaseB = await b;
  assert.ok(leaseB, `B must get the freed slot; sheds=${JSON.stringify(log.reasons)}`);
  assert.equal(c.activeHeavy, 1);
  leaseB!.release();
  assert.equal(c.activeHeavy, 0);
});

test("concurrent release + direct acquire in the woken waiter's abort task: no double grant, B served on the next release", async () => {
  const log = sheds();
  const c = new ChatAdmissionController(1, undefined, 0, log.sink);
  const holder = c.tryAcquireHeavy()!;
  const clientA = new AbortController();
  const a = c.acquireHeavyWithin(LONG_WAIT_MS, clientA.signal, 0, "a");
  let leaseB: unknown = undefined;
  const b = c
    .acquireHeavyWithin(LONG_WAIT_MS, new AbortController().signal, 0, "b")
    .then((lease) => (leaseB = lease));
  await settle();
  holder.release(); // wakes A
  const fastPath = c.tryAcquireHeavy(); // a new request takes the freed slot directly
  clientA.abort(); // A's client leaves in the same task
  assert.ok(fastPath, "the direct acquirer got the free slot");
  assert.equal(await a, null);
  await settle();
  assert.equal(c.activeHeavy, 1, "never more than maxHeavy");
  assert.equal(leaseB, undefined, "B keeps waiting: the slot is legitimately taken");
  fastPath!.release(); // the next release must reach B
  await b;
  assert.ok(leaseB, "B served once capacity is free");
  assert.equal(c.activeHeavy, 1);
  (leaseB as { release(): void }).release();
  assert.deepEqual(log.reasons, [], "nothing was shed");
});

test("concurrent release + a NEW parked acquirer in the abort task: exactly one of B/C is served, then the other", async () => {
  const log = sheds();
  const c = new ChatAdmissionController(1, undefined, 0, log.sink);
  const holder = c.tryAcquireHeavy()!;
  const clientA = new AbortController();
  const a = c.acquireHeavyWithin(LONG_WAIT_MS, clientA.signal, 0, "a");
  const b = c.acquireHeavyWithin(LONG_WAIT_MS, new AbortController().signal, 0, "b");
  await settle();
  holder.release(); // wakes A
  const cLater = c.acquireHeavyWithin(LONG_WAIT_MS, new AbortController().signal, 0, "c");
  clientA.abort();
  assert.equal(await a, null);
  const first = await Promise.race([b, cLater]);
  assert.ok(first, "the passed-on wakeup served a waiter");
  assert.equal(c.activeHeavy, 1, "never more than maxHeavy");
  first!.release();
  const [leaseB, leaseC] = await Promise.all([b, cLater]);
  assert.ok(leaseB && leaseC, "both waiters are eventually served");
  assert.equal(c.activeHeavy, 1);
  (leaseB === first ? leaseC : leaseB)!.release();
  assert.equal(c.activeHeavy, 0);
  assert.deepEqual(log.reasons, []);
});
