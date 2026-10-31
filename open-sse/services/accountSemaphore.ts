/**
 * Hierarchical in-memory concurrency admission.
 *
 * `acquire()` preserves the account-semaphore API. `acquireMany()` admits one
 * request only when every applicable global/provider/account gate has room.
 */
export interface AccountSemaphoreKeyParts {
  provider: string;
  accountKey: string;
}

export interface AcquireAccountSemaphoreOptions {
  maxConcurrency?: number | null;
  timeoutMs?: number;
  signal?: AbortSignal | null;
  /**
   * Max queued waiters before SEMAPHORE_QUEUE_FULL. `0` (and any non-positive
   * value) means NO queue limit — it is what chatCore forwards from
   * `resilienceSettings.requestQueue.maxQueueDepth`, whose documented default is
   * `0 = disabled` (#6593). To reject instead of waiting, use `failFast`.
   */
  maxQueueSize?: number;
  /** Reject with SEMAPHORE_QUEUE_FULL whenever the slot cannot be taken right now. */
  failFast?: boolean;
}

export interface SemaphoreRequirement {
  key: string;
  maxConcurrency?: number | null;
}

export type AcquireManyOptions = Omit<AcquireAccountSemaphoreOptions, "maxConcurrency">;

interface AcquireRequest {
  keys: string[];
  resolve: (release: () => void) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout> | null;
  signal: AbortSignal | null;
  abortListener: (() => void) | null;
  settled: boolean;
}

interface QueuedAcquire {
  request: AcquireRequest;
}

interface AccountGate {
  running: number;
  maxConcurrency: number;
  queue: QueuedAcquire[];
  blockedUntil: number | null;
  cleanupTimer: ReturnType<typeof setTimeout> | null;
  /** P0 FIX: Poison flag to prevent reuse after reset() */
  reset?: boolean;
}

export interface AccountSemaphoreStatsEntry {
  running: number;
  queued: number;
  maxConcurrency: number;
  blockedUntil: string | null;
}

const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_MAX_QUEUE_SIZE = 20;
const gates = new Map<string, AccountGate>();
const queuedRequests = new Set<AcquireRequest>();

export function buildAccountSemaphoreKey({
  provider,
  accountKey,
}: AccountSemaphoreKeyParts): string {
  return `${String(provider)}:${String(accountKey)}`;
}

export interface ModelSemaphoreKeyParts extends AccountSemaphoreKeyParts {
  model: string;
}

/**
 * Collision-safe key for the per-connection, per-model concurrency gate.
 * The `model:` infix keeps model gates disjoint from account gates even
 * when a model id itself contains `:` characters.
 */
export function buildModelSemaphoreKey({
  provider,
  accountKey,
  model,
}: ModelSemaphoreKeyParts): string {
  return `${String(provider)}:${String(accountKey)}:model:${String(model)}`;
}

function isBypassed(maxConcurrency?: number | null): boolean {
  return maxConcurrency == null || !Number.isFinite(maxConcurrency) || maxConcurrency <= 0;
}

function createNoopReleaseFn(): () => void {
  let released = false;
  return () => {
    if (released) return;
    released = true;
  };
}

function ensureGate(key: string, maxConcurrency: number): AccountGate {
  const existing = gates.get(key);
  if (existing) {
    existing.maxConcurrency = maxConcurrency;
    return existing;
  }
  const created: AccountGate = {
    running: 0,
    maxConcurrency,
    queue: [],
    blockedUntil: null,
    cleanupTimer: null,
  };
  gates.set(key, created);
  return created;
}

function isBlocked(gate: AccountGate): boolean {
  if (gate.reset) return true;
  if (!gate.blockedUntil) return false;
  if (Date.now() >= gate.blockedUntil) {
    gate.blockedUntil = null;
    return false;
  }
  return true;
}

function clearCleanupTimer(gate: AccountGate): void {
  if (!gate.cleanupTimer) return;
  clearTimeout(gate.cleanupTimer);
  gate.cleanupTimer = null;
}

function cleanupGateIfIdle(key: string): void {
  const gate = gates.get(key);
  if (!gate || gate.running > 0 || gate.queue.length > 0 || isBlocked(gate)) return;
  clearCleanupTimer(gate);
  gates.delete(key);
}

function scheduleCleanup(key: string): void {
  const gate = gates.get(key);
  if (!gate) return;
  clearCleanupTimer(gate);
  gate.cleanupTimer = setTimeout(() => {
    gate.cleanupTimer = null;
    cleanupGateIfIdle(key);
  }, 0);
  gate.cleanupTimer.unref?.();
}

function makeAbortError(signal: AbortSignal): Error {
  if (signal.reason instanceof Error) return signal.reason;
  const error = new Error(
    typeof signal.reason === "string" ? signal.reason : "The operation was aborted"
  );
  error.name = "AbortError";
  return error;
}

function createSemaphoreError(code: string, message: string): Error & { code: string } {
  const error = new Error(message) as Error & { code: string };
  error.code = code;
  return error;
}

function removeRequest(request: AcquireRequest): void {
  queuedRequests.delete(request);
  if (request.timer) clearTimeout(request.timer);
  if (request.abortListener && request.signal) {
    request.signal.removeEventListener("abort", request.abortListener);
  }
  for (const key of request.keys) {
    const gate = gates.get(key);
    if (!gate) continue;
    const index = gate.queue.findIndex((queued) => queued.request === request);
    if (index >= 0) gate.queue.splice(index, 1);
    if (gate.running === 0 && gate.queue.length === 0) scheduleCleanup(key);
  }
}

function canAcquire(request: AcquireRequest): boolean {
  return request.keys.every((key) => {
    const gate = gates.get(key);
    return (
      gate != null &&
      !isBlocked(gate) &&
      gate.running < gate.maxConcurrency &&
      gate.queue[0]?.request === request
    );
  });
}

function createCompositeReleaseFn(keys: string[]): () => void {
  let released = false;
  return () => {
    if (released) return;
    released = true;
    for (const key of keys) {
      const gate = gates.get(key);
      if (gate && gate.running > 0) gate.running--;
    }
    // P0 FIX: Only drain queues for the keys we just released (selective key drainage)
    // Prevents releasing gate A from draining gate B's queue
    drainQueuesForKeys(keys);
    for (const key of keys) {
      const gate = gates.get(key);
      if (gate && gate.running === 0 && gate.queue.length === 0) scheduleCleanup(key);
    }
  };
}

/**
 * Drains queues only for requests that need at least one of the specified keys.
 * This prevents cross-gate interference when releasing semaphores.
 */
function drainQueuesForKeys(keys: string[]): void {
  let progressed = true;
  while (progressed) {
    progressed = false;
    const candidates = [...queuedRequests];
    for (const request of candidates) {
      if (request.settled) continue;
      // Only consider requests that need at least one of our released keys
      const needsReleasedKey = request.keys.some((k) => keys.includes(k));
      if (!needsReleasedKey) continue;
      if (!canAcquire(request)) continue;
      request.settled = true;
      removeRequest(request);
      for (const key of request.keys) gates.get(key)!.running++;
      request.resolve(createCompositeReleaseFn(request.keys));
      progressed = true;
      break;
    }
  }
}

function drainQueues(): void {
  let progressed = true;
  while (progressed) {
    progressed = false;
    // P0 FIX: Snapshot queuedRequests to avoid concurrent modification during iteration
    // Multiple code paths (timeout, abort, release) can mutate the set while we iterate
    const candidates = [...queuedRequests];
    for (const request of candidates) {
      if (request.settled || !canAcquire(request)) continue;
      request.settled = true;
      removeRequest(request);
      for (const key of request.keys) gates.get(key)!.running++;
      request.resolve(createCompositeReleaseFn(request.keys));
      progressed = true;
      break;
    }
  }
}

export function acquire(
  key: string,
  {
    maxConcurrency = null,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    signal = null,
    maxQueueSize = DEFAULT_MAX_QUEUE_SIZE,
    failFast = false,
  }: AcquireAccountSemaphoreOptions = {}
): Promise<() => void> {
  return acquireMany([{ key, maxConcurrency }], { timeoutMs, signal, maxQueueSize, failFast });
}

/**
 * Admission policy for a request that cannot take its slots right now.
 * `failFast` (#12911, Codex WS leases): never wait. `maxQueueSize > 0`: bounded
 * queue. `maxQueueSize <= 0`: unbounded — the #6593 "0 = disabled" contract that
 * chatCore relies on under default resilience settings.
 */
function findQueueRejection(keys: string[], maxQueueSize: number, failFast: boolean): Error | null {
  if (failFast) {
    return createSemaphoreError(
      "SEMAPHORE_QUEUE_FULL",
      `Semaphore busy (fail-fast) for ${keys[0]}`
    );
  }
  if (maxQueueSize <= 0) return null;
  for (const key of keys) {
    if (gates.get(key)!.queue.length >= maxQueueSize) {
      return createSemaphoreError(
        "SEMAPHORE_QUEUE_FULL",
        `Semaphore queue full (${maxQueueSize}) for ${key}`
      );
    }
  }
  return null;
}

/**
 * Acquire all enabled requirements as one FIFO reservation.
 *
 * Waiting never increments any gate, preventing a saturated child gate from
 * holding capacity in a parent gate.
 */
export function acquireMany(
  requirements: SemaphoreRequirement[],
  {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    signal = null,
    maxQueueSize = DEFAULT_MAX_QUEUE_SIZE,
    failFast = false,
  }: AcquireManyOptions = {}
): Promise<() => void> {
  const enabled = new Map<string, number>();
  for (const requirement of requirements) {
    if (isBypassed(requirement.maxConcurrency)) continue;
    const limit = Math.trunc(requirement.maxConcurrency as number);
    enabled.set(requirement.key, Math.min(enabled.get(requirement.key) ?? limit, limit));
  }
  if (enabled.size === 0) return Promise.resolve(createNoopReleaseFn());
  if (signal?.aborted) return Promise.reject(makeAbortError(signal));

  const keys = [...enabled.keys()].sort();
  for (const key of keys) {
    const gate = ensureGate(key, enabled.get(key)!);
    clearCleanupTimer(gate);
  }

  const canAcquireImmediately = keys.every((key) => {
    const gate = gates.get(key)!;
    return gate.queue.length === 0 && gate.running < gate.maxConcurrency && !isBlocked(gate);
  });
  if (canAcquireImmediately) {
    for (const key of keys) gates.get(key)!.running++;
    return Promise.resolve(createCompositeReleaseFn(keys));
  }

  const rejection = findQueueRejection(keys, maxQueueSize, failFast);
  if (rejection) return Promise.reject(rejection);

  return new Promise((resolve, reject) => {
    const request: AcquireRequest = {
      keys,
      resolve,
      reject,
      timer: null,
      signal,
      abortListener: null,
      settled: false,
    };
    request.timer = setTimeout(() => {
      if (request.settled) return;
      request.settled = true;
      removeRequest(request);
      reject(
        createSemaphoreError(
          "SEMAPHORE_TIMEOUT",
          `Semaphore timeout after ${timeoutMs}ms for ${keys.join(",")}`
        )
      );
      drainQueues();
    }, timeoutMs);
    request.timer.unref?.();
    if (signal) {
      request.abortListener = () => {
        if (request.settled) return;
        request.settled = true;
        removeRequest(request);
        reject(makeAbortError(signal));
        drainQueues();
      };
      signal.addEventListener("abort", request.abortListener, { once: true });
    }
    queuedRequests.add(request);
    for (const key of keys) gates.get(key)!.queue.push({ request });
    drainQueues();
  });
}

export function markBlocked(key: string, until: Date | string | number): void {
  const untilMs =
    until instanceof Date
      ? until.getTime()
      : typeof until === "number"
        ? Date.now() + Math.max(0, until)
        : new Date(until).getTime();
  if (!Number.isFinite(untilMs) || untilMs <= Date.now()) return;
  const gate = ensureGate(key, gates.get(key)?.maxConcurrency ?? 1);
  clearCleanupTimer(gate);
  gate.blockedUntil = untilMs;
}

export function unblock(key: string): void {
  const gate = gates.get(key);
  if (!gate) return;
  gate.blockedUntil = null;
  drainQueues();
  cleanupGateIfIdle(key);
}

export function getStats(): Record<string, AccountSemaphoreStatsEntry> {
  const stats: Record<string, AccountSemaphoreStatsEntry> = {};
  for (const [key, gate] of gates) {
    stats[key] = {
      running: gate.running,
      queued: gate.queue.length,
      maxConcurrency: gate.maxConcurrency,
      blockedUntil: gate.blockedUntil ? new Date(gate.blockedUntil).toISOString() : null,
    };
  }
  return stats;
}

export function isAccountSemaphoreFull(
  provider: string,
  accountKey: string,
  maxConcurrency?: number | null
): boolean {
  if (isBypassed(maxConcurrency)) return false;
  const gate = gates.get(buildAccountSemaphoreKey({ provider, accountKey }));
  if (!gate) return false;
  const effectiveCap = maxConcurrency ?? gate.maxConcurrency;
  return !isBypassed(effectiveCap) && (gate.running >= effectiveCap || isBlocked(gate));
}

export function reset(key: string): void {
  const gate = gates.get(key);
  if (!gate) return;
  clearCleanupTimer(gate);
  const error = createSemaphoreError("SEMAPHORE_RESET", `Semaphore reset for ${key}`);
  const rejections: AcquireRequest[] = [];
  for (const queued of [...gate.queue]) {
    const request = queued.request;
    if (request.settled) continue;
    request.settled = true;
    removeRequest(request);
    rejections.push(request);
  }
  // P0 FIX: Mark gate as reset (poisoned) instead of immediate deletion
  // This prevents race where acquireMany recreates gate while drainQueues runs
  gate.reset = true;
  gate.maxConcurrency = 0;
  gate.blockedUntil = Date.now() + 86_400_000; // Block for 24h
  for (const request of rejections) request.reject(error);
  // Don't call drainQueues() — let natural drain handle it
  // Schedule actual deletion after grace period
  setTimeout(() => {
    const g = gates.get(key);
    if (g && g.reset && g.running === 0 && g.queue.length === 0) {
      gates.delete(key);
    }
  }, 60_000).unref?.();
}

export function resetAll(): void {
  const error = createSemaphoreError("SEMAPHORE_RESET", "Semaphore reset");
  const rejections: AcquireRequest[] = [];
  for (const request of [...queuedRequests]) {
    if (request.settled) continue;
    request.settled = true;
    removeRequest(request);
    rejections.push(request);
  }
  for (const gate of gates.values()) clearCleanupTimer(gate);
  gates.clear();
  queuedRequests.clear();
  for (const request of rejections) request.reject(error);
}
