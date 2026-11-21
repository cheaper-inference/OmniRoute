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
  push?: (value: T) => unknown;
  shift?: () => T | undefined;
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

// One job id -> the list node that holds it, kept current by wrapping `push`
// and `shift` of every Bottleneck queue list. Cancelling then costs O(1)
// instead of a walk over every queued job (quadratic when a burst expires).
interface IndexedNode {
  list: DLList<never>;
  node: DLListNode<never>;
}
type JobIndex = Map<string, IndexedNode>;

const jobIndexes = new WeakMap<object, JobIndex | null>();

function indexList<T>(index: JobIndex, list: DLList<T>, idOf: (value: T) => unknown): void {
  const { push, shift } = list;
  if (typeof push !== "function" || typeof shift !== "function") return;
  const add = (node: DLListNode<T>) => {
    const id = idOf(node.value);
    if (typeof id === "string") index.set(id, { list, node } as unknown as IndexedNode);
  };
  const forget = (node: DLListNode<T>) => {
    const id = idOf(node.value);
    if (typeof id === "string" && index.get(id)?.node === (node as unknown)) index.delete(id);
  };
  for (let node = list._first; node; node = node.next) add(node);
  list.push = (value) => {
    const result = push.call(list, value);
    if (list._last) add(list._last);
    return result;
  };
  list.shift = () => {
    const first = list._first;
    const result = shift.call(list);
    if (first) forget(first);
    return result;
  };
}

/** Index `limiter` once; returns null when its internals are not the expected shape. */
function getJobIndex(internals: BottleneckInternals): JobIndex | null {
  const known = jobIndexes.get(internals);
  if (known !== undefined) return known;
  const lists = internals._queues?._lists;
  const submitQueue = internals._submitLock?._queue;
  if (!Array.isArray(lists) || !submitQueue) {
    jobIndexes.set(internals, null);
    return null;
  }
  const index: JobIndex = new Map();
  for (const list of lists) indexList(index, list, (job) => job?.options?.id);
  indexList(index, submitQueue, (submission) => submission?.args?.[0]?.options?.id);
  jobIndexes.set(internals, index);
  return index;
}

function isLinked<T>(list: DLList<T>, node: DLListNode<T>): boolean {
  return node.prev ? node.prev.next === node : list._first === node;
}

/** The indexed node for `jobId`, only if it is still linked in `expected` (when given). */
function findIndexed<T>(
  index: JobIndex | null,
  jobId: string,
  expected?: DLList<T>
): { list: DLList<T>; node: DLListNode<T> } | null {
  const found = index?.get(jobId) as unknown as
    { list: DLList<T>; node: DLListNode<T> } | undefined;
  if (!found || (expected && found.list !== expected) || !isLinked(found.list, found.node)) {
    return null;
  }
  return found;
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
  const found = queue && findIndexed(getJobIndex(internals), jobId, queue);
  if (!queue || !found) return false;
  const submission = found.node.value;
  const job = submission.args?.[0];
  if (typeof job?.doDrop !== "function" || typeof submission.resolve !== "function") return false;
  // This task is waiting, NOT the one currently running inside the lock.
  // No await: Sync cannot shift the node between unlink and settlement.
  unlink(queue, found.node);
  forgetJob(internals, jobId);
  const dropped = job.doDrop({ message: ABANDONED_JOB_DROP_MESSAGE }) === true;
  submission.resolve(false);
  return dropped;
}

function forgetJob(internals: BottleneckInternals, jobId: string): void {
  jobIndexes.get(internals)?.delete(jobId);
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
      const found = findIndexed<BottleneckJob>(getJobIndex(internals), jobId);
      // Never unlink a job that could not then be settled: it would vanish.
      if (!found || typeof found.node.value.doDrop !== "function") return false;
      unlink(found.list, found.node);
      forgetJob(internals, jobId);
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
  // Index before the first job queues, so later cancels never walk the queue.
  getJobIndex(limiter as unknown as BottleneckInternals);
  return {
    scheduleOpts: expirationMs && expirationMs > 0 ? { id, expiration: expirationMs } : { id },
    abandon: () => {
      track(cancelQueuedJob(limiter, id));
    },
  };
}
