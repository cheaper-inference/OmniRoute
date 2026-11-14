import assert from "node:assert/strict";
import test from "node:test";
import Bottleneck from "bottleneck";
import {
  cancelQueuedJob,
  ABANDONED_JOB_DROP_MESSAGE,
} from "../../open-sse/services/rateLimitManager/queuedJobCancel.ts";

type Internals = { _submitLock: { schedule: <T>(fn: () => Promise<T>) => Promise<T> } };
async function bounded<T>(work: Promise<T>, message: string) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      work,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(message)), 1000);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}
test(
  "2000 cancelled RECEIVED jobs leave a blocked submission queue without waiting to enqueue or spending RPM",
  { timeout: 15000 },
  async () => {
    const limiter = new Bottleneck({ reservoir: 0, maxConcurrent: 1 });
    const internals = limiter as unknown as Internals;
    const gate = Promise.withResolvers<void>();
    const holder = internals._submitLock.schedule(() => gate.promise);
    let calls = 0;
    const jobs = Array.from({ length: 2000 }, (_, i) =>
      limiter
        .schedule({ id: `cancel-received-${i}` }, async () => ++calls)
        .catch((error: Error) => error.message)
    );
    const cancellations = jobs.map((_, i) => cancelQueuedJob(limiter, `cancel-received-${i}`));
    try {
      assert.deepEqual(
        await bounded(
          Promise.all(cancellations),
          "RECEIVED cancellation is stranded behind unrelated submission work"
        ),
        Array(2000).fill(true)
      );
      assert.deepEqual(await Promise.all(jobs), Array(2000).fill(ABANDONED_JOB_DROP_MESSAGE));
      assert.equal(limiter.counts().RECEIVED, 0);
      assert.equal(limiter.queued(), 0);
      assert.equal(await limiter.currentReservoir(), 0);
      assert.equal(calls, 0);
    } finally {
      gate.resolve();
      await holder;
      await Promise.all(cancellations);
      await limiter.stop({ dropWaitingJobs: true });
      await Promise.all(jobs);
      await limiter.disconnect();
    }
  }
);
test("RECEIVED head, middle and tail removals preserve live FIFO submissions", async () => {
  const limiter = new Bottleneck({ reservoir: 3, maxConcurrent: 1 });
  const gate = Promise.withResolvers<void>();
  const holder = (limiter as unknown as Internals)._submitLock.schedule(() => gate.promise);
  const order: string[] = [];
  const ids = ["head", "live-one", "middle", "live-two", "tail"];
  const jobs = ids.map((id) =>
    limiter
      .schedule({ id }, async () => {
        order.push(id);
        return id;
      })
      .catch((error: Error) => error.message)
  );
  try {
    for (const id of ["head", "middle", "tail"]) {
      assert.equal(limiter.jobStatus(id), "RECEIVED");
      assert.equal(await bounded(cancelQueuedJob(limiter, id), `${id} removal blocked`), true);
      assert.equal(await cancelQueuedJob(limiter, id), false);
    }
    assert.equal(limiter.counts().RECEIVED, 2);
    gate.resolve();
    await holder;
    assert.deepEqual(await Promise.all(jobs), [
      ABANDONED_JOB_DROP_MESSAGE,
      "live-one",
      ABANDONED_JOB_DROP_MESSAGE,
      "live-two",
      ABANDONED_JOB_DROP_MESSAGE,
    ]);
    assert.deepEqual(order, ["live-one", "live-two"]);
    assert.equal(await limiter.currentReservoir(), 1);
    assert.equal(await limiter.schedule({ id: "after" }, async () => "still live"), "still live");
  } finally {
    gate.resolve();
    await holder;
    await limiter.stop({ dropWaitingJobs: true });
    await Promise.all(jobs);
    await limiter.disconnect();
  }
});

test(
  "a QUEUED cancellation does not wait behind an unrelated blocked submission lock",
  { timeout: 5000 },
  async () => {
    const limiter = new Bottleneck({ reservoir: 0, maxConcurrent: 1 });
    const queued = Promise.withResolvers<void>();
    limiter.on("queued", () => {
      queued.resolve();
    });
    const job = limiter
      .schedule({ id: "already-queued" }, async () => "must not run")
      .catch((error: Error) => error.message);
    await queued.promise;
    const gate = Promise.withResolvers<void>();
    const holder = (limiter as unknown as Internals)._submitLock.schedule(() => gate.promise);
    const cancellation = cancelQueuedJob(limiter, "already-queued");
    try {
      assert.equal(
        await bounded(cancellation, "queued cancellation is stuck behind unrelated submissions"),
        true
      );
      assert.equal(await job, ABANDONED_JOB_DROP_MESSAGE);
      assert.equal(limiter.queued(), 0);
    } finally {
      gate.resolve();
      await holder;
      await cancellation;
      await limiter.stop({ dropWaitingJobs: true });
      await job;
      await limiter.disconnect();
    }
  }
);
