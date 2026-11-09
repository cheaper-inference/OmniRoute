import assert from "node:assert/strict";
import test from "node:test";
import Bottleneck from "bottleneck";
import {
  cancelQueuedJob,
  createCancellableJob,
  ABANDONED_JOB_DROP_MESSAGE,
} from "../../open-sse/services/rateLimitManager/queuedJobCancel.ts";

// Abandoning a queued job must not walk Bottleneck's queue node by node: with
// thousands of queued jobs that expire together the walk is quadratic. The
// tests count reads of `node.next`, which the old lookup performs once per
// node it passes, so the check is exact and needs no timing.

interface Node {
  next: Node | null;
  prev: Node | null;
  value: { options?: { id?: string } };
}
interface List {
  _first: Node | null;
}
interface Internals {
  _queues: { _lists: List[] };
  _submitLock: { schedule: <T>(fn: () => Promise<T>) => Promise<T>; _queue: List };
}

function countNextReads(list: List): () => number {
  let reads = 0;
  const nodes: Node[] = [];
  for (let node = list._first; node; node = node.next) nodes.push(node);
  for (const node of nodes) {
    let next = node.next;
    Object.defineProperty(node, "next", {
      configurable: true,
      get: () => {
        reads++;
        return next;
      },
      set: (value: Node | null) => {
        next = value;
      },
    });
  }
  return () => reads;
}

async function until(condition: () => boolean, message: string) {
  const deadline = Date.now() + 5000;
  while (!condition()) {
    if (Date.now() > deadline) throw new Error(message);
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
}

const COUNT = 300;
const MAX_READS = 10;

/** Schedule through the production helper, so the limiter is prepared before jobs queue. */
function scheduleCancellable(limiter: Bottleneck, results: Promise<boolean>[]) {
  const { scheduleOpts, abandon } = createCancellableJob(limiter, undefined, (promise) =>
    results.push(promise)
  );
  const settled = limiter
    .schedule(scheduleOpts, async () => "ran")
    .catch((error: Error) => error.message);
  return { settled, abandon };
}

test("cancelling the last of 300 QUEUED jobs does not walk the queue", async () => {
  const limiter = new Bottleneck({ reservoir: 0, maxConcurrent: 1 });
  const internals = limiter as unknown as Internals;
  const results: Promise<boolean>[] = [];
  const jobs = Array.from({ length: COUNT }, () => scheduleCancellable(limiter, results));
  try {
    await until(() => limiter.counts().QUEUED === COUNT, "jobs did not reach QUEUED");
    const list = internals._queues._lists.find((entry) => entry._first);
    assert.ok(list);
    const reads = countNextReads(list);
    jobs[COUNT - 1].abandon();
    assert.deepEqual(await Promise.all(results), [true]);
    assert.ok(reads() < MAX_READS, `queue walk read node.next ${reads()} times`);
    assert.equal(limiter.counts().QUEUED, COUNT - 1);
    assert.equal(await jobs[COUNT - 1].settled, ABANDONED_JOB_DROP_MESSAGE);
  } finally {
    await limiter.stop({ dropWaitingJobs: true });
    await Promise.all(jobs.map((job) => job.settled));
    await limiter.disconnect();
  }
});

test("cancelling the last of 300 RECEIVED jobs does not walk the submission queue", async () => {
  const limiter = new Bottleneck({ reservoir: 0, maxConcurrent: 1 });
  const internals = limiter as unknown as Internals;
  const gate = Promise.withResolvers<void>();
  const holder = internals._submitLock.schedule(() => gate.promise);
  const results: Promise<boolean>[] = [];
  const jobs = Array.from({ length: COUNT }, () => scheduleCancellable(limiter, results));
  try {
    await until(() => limiter.counts().RECEIVED === COUNT, "jobs did not reach RECEIVED");
    const reads = countNextReads(internals._submitLock._queue);
    jobs[COUNT - 1].abandon();
    assert.deepEqual(await Promise.all(results), [true]);
    assert.ok(reads() < MAX_READS, `submission walk read node.next ${reads()} times`);
    assert.equal(limiter.counts().RECEIVED, COUNT - 1);
  } finally {
    gate.resolve();
    await holder;
    await limiter.stop({ dropWaitingJobs: true });
    await Promise.all(jobs.map((job) => job.settled));
    await limiter.disconnect();
  }
});

test("the index follows pushes, dispatches and drops after the first cancel", async () => {
  const limiter = new Bottleneck({ maxConcurrent: 1 });
  const gate = Promise.withResolvers<void>();
  const order: string[] = [];
  const results: Promise<boolean>[] = [];
  const add = (label: string) => {
    const { scheduleOpts, abandon } = createCancellableJob(limiter, undefined, (promise) =>
      results.push(promise)
    );
    const settled = limiter
      .schedule(scheduleOpts, async () => {
        order.push(label);
        if (label === "running") await gate.promise;
        return label;
      })
      .catch((error: Error) => error.message);
    return { settled, abandon };
  };
  const running = add("running");
  const q1 = add("q1");
  const q2 = add("q2");
  const q3 = add("q3");
  try {
    await until(() => limiter.counts().QUEUED === 3, "jobs did not reach QUEUED");
    q2.abandon();
    // Jobs queued after an earlier cancel must be found too.
    const q4 = add("q4");
    const q5 = add("q5");
    await until(() => limiter.counts().QUEUED === 4, "late jobs did not reach QUEUED");
    q5.abandon();
    running.abandon(); // a running job is not queued: nothing to remove
    gate.resolve();
    assert.deepEqual(await Promise.all(results), [true, true, false]);
    assert.deepEqual(await Promise.all([running, q1, q2, q3, q4, q5].map((job) => job.settled)), [
      "running",
      "q1",
      ABANDONED_JOB_DROP_MESSAGE,
      "q3",
      "q4",
      ABANDONED_JOB_DROP_MESSAGE,
    ]);
    assert.deepEqual(order, ["running", "q1", "q3", "q4"]);
    q1.abandon(); // a finished job is not queued
    assert.equal((await Promise.all(results)).at(-1), false);
    assert.equal(limiter.queued(), 0);
  } finally {
    gate.resolve();
    await limiter.stop({ dropWaitingJobs: true });
    await limiter.disconnect();
  }
});

test("a job that was queued before the limiter was indexed is still cancelled", async () => {
  const limiter = new Bottleneck({ reservoir: 0, maxConcurrent: 1 });
  const early = limiter
    .schedule({ id: "early" }, async () => "must not run")
    .catch((error: Error) => error.message);
  await until(() => limiter.counts().QUEUED === 1, "job did not reach QUEUED");
  const results: Promise<boolean>[] = [];
  createCancellableJob(limiter, undefined, (promise) => results.push(promise));
  try {
    assert.equal(await cancelQueuedJob(limiter, "early"), true);
    assert.equal(await early, ABANDONED_JOB_DROP_MESSAGE);
    assert.equal(limiter.queued(), 0);
  } finally {
    await limiter.stop({ dropWaitingJobs: true });
    await limiter.disconnect();
  }
});

test("after stop() drops waiting jobs a cancel finds nothing and leaves the limiter clean", async () => {
  const limiter = new Bottleneck({ reservoir: 0, maxConcurrent: 1 });
  const results: Promise<boolean>[] = [];
  const jobs = Array.from({ length: 3 }, () => scheduleCancellable(limiter, results));
  await until(() => limiter.counts().QUEUED === 3, "jobs did not reach QUEUED");
  jobs[0].abandon();
  assert.deepEqual(await Promise.all(results), [true]);
  await limiter.stop({ dropWaitingJobs: true });
  await Promise.all(jobs.map((job) => job.settled));
  jobs[1].abandon();
  assert.deepEqual(await Promise.all(results), [true, false]);
  assert.equal(limiter.queued(), 0);
  await limiter.disconnect();
});
