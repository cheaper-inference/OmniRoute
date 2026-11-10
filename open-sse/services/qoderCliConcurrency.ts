/**
 * Process-wide gate for qodercli work. Every `qodercli --print` run is a fresh
 * Node process that peaks at ~750 MB RSS for ~12 s, so N parallel requests cost
 * N × 750 MB: ten concurrent Qoder requests OOM-killed a 4 GB host. When
 * `QODER_CLI_MAX_CONCURRENCY` is set, the gate bounds how many qodercli runs
 * (print spawns or ACP prompts) are in flight and queues the rest FIFO, with a
 * queue timeout and abort support. Unset (the default) means no cap, so default
 * throughput and status codes are unchanged; the operator opts in per host.
 */

export const DEFAULT_QODER_CLI_QUEUE_TIMEOUT_MS = 120_000;

export class QoderCliQueueTimeoutError extends Error {
  constructor(waitedMs: number) {
    super(`qodercli is busy: no free slot after waiting ${waitedMs}ms in the queue`);
    this.name = "QoderCliQueueTimeoutError";
  }
}

function readPositiveInt(raw: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(String(raw ?? "").trim(), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

/** Configured cap, or `Infinity` when `QODER_CLI_MAX_CONCURRENCY` is unset/invalid (no cap). */
export function getQoderCliMaxConcurrency(): number {
  return readPositiveInt(process.env.QODER_CLI_MAX_CONCURRENCY, Number.POSITIVE_INFINITY);
}

export function getQoderCliQueueTimeoutMs(): number {
  return readPositiveInt(
    process.env.QODER_CLI_QUEUE_TIMEOUT_MS,
    DEFAULT_QODER_CLI_QUEUE_TIMEOUT_MS
  );
}

type Waiter = {
  grant: () => void;
  reject: (error: Error) => void;
};

let active = 0;
const waiters: Waiter[] = [];

function abortError(): Error {
  const error = new Error("Aborted");
  error.name = "AbortError";
  return error;
}

function drain(): void {
  // The limit is re-read on every drain so an env change applies without restart.
  while (waiters.length > 0 && active < getQoderCliMaxConcurrency()) {
    const next = waiters.shift()!;
    active += 1;
    next.grant();
  }
}

/**
 * Wait for a qodercli slot. Resolves with an idempotent `release` callback that
 * MUST be called once the run finishes. Rejects with an `AbortError` when
 * `signal` fires while queued, or {@link QoderCliQueueTimeoutError} when no slot
 * frees up within the queue timeout.
 */
export function acquireQoderCliSlot(
  options: { signal?: AbortSignal | null; queueTimeoutMs?: number } = {}
): Promise<() => void> {
  const { signal } = options;
  if (signal?.aborted) return Promise.reject(abortError());

  return new Promise<() => void>((resolve, reject) => {
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      active = Math.max(0, active - 1);
      drain();
    };

    if (active < getQoderCliMaxConcurrency() && waiters.length === 0) {
      active += 1;
      resolve(release);
      return;
    }

    const queueTimeoutMs = options.queueTimeoutMs ?? getQoderCliQueueTimeoutMs();
    const startedAt = Date.now();
    const cleanup = () => {
      clearTimeout(timer);
      signal?.removeEventListener?.("abort", onAbort);
      const index = waiters.indexOf(waiter);
      if (index !== -1) waiters.splice(index, 1);
    };
    const waiter: Waiter = {
      grant: () => {
        cleanup();
        resolve(release);
      },
      reject: (error) => {
        cleanup();
        reject(error);
      },
    };
    const onAbort = () => waiter.reject(abortError());
    const timer = setTimeout(
      () => waiter.reject(new QoderCliQueueTimeoutError(Date.now() - startedAt)),
      queueTimeoutMs
    );
    timer.unref?.();
    signal?.addEventListener("abort", onAbort, { once: true });
    waiters.push(waiter);
  });
}

/** Run `fn` while holding a qodercli slot. */
export async function withQoderCliSlot<T>(
  fn: () => Promise<T>,
  options: { signal?: AbortSignal | null; queueTimeoutMs?: number } = {}
): Promise<T> {
  const release = await acquireQoderCliSlot(options);
  try {
    return await fn();
  } finally {
    release();
  }
}

/** `limit` is null when no cap is configured. */
export function getQoderCliConcurrencyStats(): {
  active: number;
  queued: number;
  limit: number | null;
} {
  const limit = getQoderCliMaxConcurrency();
  return { active, queued: waiters.length, limit: Number.isFinite(limit) ? limit : null };
}

/** Test-only: forget all slot state. */
export function __resetQoderCliConcurrency(): void {
  active = 0;
  waiters.splice(0, waiters.length);
}
