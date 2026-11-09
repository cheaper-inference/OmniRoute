/**
 * rateLimitManager/queuedJobCancel — remove an abandoned job from a Bottleneck queue.
 *
 * Bottleneck v2.19.5 has no public API to cancel a job that is still QUEUED.
 * When a caller gives up on the queue (queue-wait budget or abort), its job
 * stays in the limiter and is dispatched later: it registers against the
 * limiter first, taking a reservoir token and advancing the `minTime` slot,
 * and only then does the wrapped function reject. With a finite reservoir
 * (an `rpm` override) every abandoned job burns one token of the next refresh
 * window, so live requests queue behind dead ones, time out, and add more dead
 * jobs: the queue never recovers while traffic continues.
 * A mass abort can also leave thousands of RECEIVED submissions behind a slow
 * _submitLock. Remove those waiting submissions synchronously before they enqueue;
 * an already-QUEUED job only needs _registerLock, not the unrelated submission tail.
 *
 * This helper reaches Bottleneck's internals the same way `bottleneckPatch.ts`
 * does, and is defensive: if any internal is missing it returns `false` and
 * the caller keeps the previous behavior (the abandoned job rejects on
 * dispatch). QUEUED removal runs inside `_registerLock`, so it never races
 * `_drainOne` (which reads the queue head, awaits registration, then shifts it).
 * A RECEIVED task still waiting in `_submitLock._queue` is unlinked atomically;
 * only a submission already running inside that lock waits for its fence.
 *
 * @module services/rateLimitManager/queuedJobCancel
 */

import type Bottleneck from "bottleneck";

interface DLListNode<T = BottleneckJob> {
  value: T;
  prev: DLListNode<T> | null;
  next: DLListNode<T> | null;
}

interface DLList<T = BottleneckJob> {
  _first: DLListNode<T> | null;
  _last: DLListNode<T> | null;
  length: number;
  decr?: () => void;
}

interface BottleneckJob {
  options?: { id?: string };
  doDrop?: (options?: { message?: string }) => boolean;
}

interface PendingSubmission {
  args?: BottleneckJob[];
  resolve?: (value: unknown) => void;
}

interface SyncLock {
  schedule: <T>(task: () => T | Promise<T>) => Promise<T>;
  _queue?: DLList<PendingSubmission>;
}

interface BottleneckInternals {
  _submitLock?: SyncLock;
  _registerLock?: SyncLock;
  _queues?: { _lists?: DLList[] };
}

export const ABANDONED_JOB_DROP_MESSAGE = "rate-limit-queued-job-abandoned";

function findQueuedNode(
  internals: BottleneckInternals,
  jobId: string
): { list: DLList; node: DLListNode } | null {
  const lists = internals._queues?._lists;
  if (!Array.isArray(lists)) return null;
  for (const list of lists) {
    let node = list?._first ?? null;
    while (node) {
      if (node.value?.options?.id === jobId) return { list, node };
      node = node.next;
    }
  }
  return null;
}

function unlink<T>(list: DLList<T>, node: DLListNode<T>): void {
  if (node.prev) node.prev.next = node.next;
  else list._first = node.next;
  if (node.next) node.next.prev = node.prev;
  else list._last = node.prev;
  list.length--;
  // Keeps Bottleneck's aggregate queue length (and its "zero" event) in sync.
  if (typeof list.decr === "function") list.decr();
}

function cancelReceivedSubmission(internals: BottleneckInternals, jobId: string): boolean {
  const queue = internals._submitLock?._queue;
  let node = queue?._first;
  while (node) {
    const submission = node.value;
    const job = submission.args?.[0];
    if (
      job?.options?.id === jobId &&
      typeof job.doDrop === "function" &&
      typeof submission.resolve === "function"
    ) {
      // This task is waiting, NOT the one currently running inside the lock.
      // No await: Sync cannot shift the node between unlink and settlement.
      unlink(queue, node);
      const dropped = job.doDrop({ message: ABANDONED_JOB_DROP_MESSAGE }) === true;
      submission.resolve(false);
      return dropped;
    }
    node = node.next;
  }
  return false;
}

/**
 * Remove `jobId` while RECEIVED (waiting submission) or QUEUED, never RUNNING/EXECUTING.
 * Resolves `true` when the job was removed (its promise rejects with
 * `ABANDONED_JOB_DROP_MESSAGE`), `false` when it already left the queue or the
 * Bottleneck internals are not the expected shape.
 */
export function cancelQueuedJob(limiter: Bottleneck, jobId: string): Promise<boolean> {
  const internals = limiter as unknown as BottleneckInternals;
  const submitLock = internals._submitLock;
  const registerLock = internals._registerLock;
  if (typeof submitLock?.schedule !== "function" || typeof registerLock?.schedule !== "function") {
    return Promise.resolve(false);
  }
  const status = limiter.jobStatus(jobId);
  if (status === "RECEIVED" && cancelReceivedSubmission(internals, jobId)) {
    return Promise.resolve(true);
  }
  const removeQueued = () =>
    registerLock.schedule(() => {
      if (limiter.jobStatus(jobId) !== "QUEUED") return false;
      const found = findQueuedNode(internals, jobId);
      // Never unlink a job that could not then be settled: it would vanish.
      if (!found || typeof found.node.value.doDrop !== "function") return false;
      unlink(found.list, found.node);
      return found.node.value.doDrop({ message: ABANDONED_JOB_DROP_MESSAGE }) === true;
    });
  if (status === "QUEUED") return removeQueued().catch(() => false);
  if (status !== "RECEIVED") return Promise.resolve(false);
  // Only the currently-running submission needs the fence. Waiting submissions
  // above are already removed, so an abort storm cannot strand a long dead tail.
  return submitLock
    .schedule(() => undefined)
    .then(removeQueued)
    .catch(() => false);
}

let scheduledJobSeq = 0;

/**
 * Schedule options carrying a unique job id, plus `abandon()` that removes
 * that job from `limiter`'s queue while it is still QUEUED. A caller that gives
 * up (queue-wait budget or abort) calls `abandon()` so its dead job never
 * spends a reservoir token or `minTime` slot later. `track` registers the async
 * removal with the manager's in-flight operation tracker.
 */
export function createCancellableJob(
  limiter: Bottleneck,
  expirationMs: number | undefined,
  track: (promise: Promise<boolean>) => unknown
): { scheduleOpts: Bottleneck.JobOptions; abandon: () => void } {
  const id = `rl-${++scheduledJobSeq}`;
  return {
    scheduleOpts: expirationMs && expirationMs > 0 ? { id, expiration: expirationMs } : { id },
    abandon: () => {
      track(cancelQueuedJob(limiter, id));
    },
  };
}
