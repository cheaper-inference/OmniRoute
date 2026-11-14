import { AsyncLocalStorage } from "node:async_hooks";
import { resolveProviderId } from "../../src/shared/constants/providers.ts";

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
  followExecutionCapacity?: boolean;
  capacityRevision?: number;
  key: string;
  deadline?: number;
  followConnectionCapacity?: boolean;
  connectionId?: string;
  connectionCapacity?: number | null;
  concurrencyCeiling?: number | null;
  maxConcurrency?: number | null;
}

export type AcquireManyOptions = Omit<AcquireAccountSemaphoreOptions, "maxConcurrency">;

interface AcquireRequest {
  capacityTurn?: CapacityTurn;
  capacityPhase?: CapacityAdmissionPhase;
  sequence: number;
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
  capacityRevision?: number;
  followConnectionCapacity: boolean;
  connectionId?: string;
  connectionCapacity?: number | null;
  concurrencyCeiling?: number | null;
  running: number;
  maxConcurrency: number;
  queue: QueuedAcquire[];
  blockedUntil: number | null;
  cleanupTimer: ReturnType<typeof setTimeout> | null;
}

export function accountSemaphoreCapacityRevision(key: string): number {
  return gates.get(key)?.capacityRevision ?? 0;
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
let nextSequence = 0;

interface CapacityTurn {
  executionCapacityKeys: Set<string>;
  admissionKeys: Set<string>;
  executionSerial: number;
  phases: Set<CapacityAdmissionPhase>;
  sequence: number;
  requirements: Map<string, number>;
  candidateDeadlines: Map<string, number>;
  deadline: number;
  signal: AbortSignal | null;
  maxQueueSize: number;
  status: "idle" | "queued" | "granted" | "consumed" | "closed";
  error: Error | null;
  resolve: (() => void) | null;
  reject: ((error: Error) => void) | null;
  timer: ReturnType<typeof setTimeout> | null;
  abortListener: (() => void) | null;
  expire: (error: Error) => void;
  expiration: Promise<never>;
  onConsumed(): void;
}

const capacityTurns = new Set<CapacityTurn>();
// Context lifetime outlives its FIFO claim, including idle and consumed owners.
const liveCapacityContexts = new Set<CapacityTurn>();
const contextResetErrors = new WeakSet<Error>();
export function isAccountCapacityContextError(error: unknown): boolean {
  return (
    String((error as { code?: unknown })?.code ?? "").startsWith("COMBO_CAPACITY_") ||
    (error instanceof Error && contextResetErrors.has(error))
  );
}
export function accountCapacityExecutionSerial(): number | undefined {
  return (admissionPhaseContext.getStore() ?? capacityContext.getStore())?.executionSerial;
}
/** Capture this attempt's phase, so a concurrent hedge cannot spend its charge. */
export function captureAccountCapacityExecution(): (() => boolean) | null {
  const owner = admissionPhaseContext.getStore();
  if (!owner) return null;
  const serial = owner.executionSerial;
  return () => owner.executionSerial !== serial;
}
const capacityContext = new AsyncLocalStorage<CapacityTurn>();
interface CapacityAdmissionPhase {
  executionSerial: number;
  activeExecution: boolean;
  finished: boolean;
  error: Error | null;
  signal: AbortSignal | null;
  deadline: number;
  controller: AbortController;
  cleanup(): void;
  retime(): void;
  fail(error: Error): void;
}
const admissionPhaseContext = new AsyncLocalStorage<CapacityAdmissionPhase>();
export function hasAccountCapacityContext(): boolean {
  return capacityContext.getStore() != null;
}
export function withoutAccountCapacityContext<T>(callback: () => T): T {
  return capacityContext.exit(() => admissionPhaseContext.exit(callback));
}

let capacityExpiryTimer: ReturnType<typeof setTimeout> | null = null;

export interface AccountCapacityWait {
  /** Requeue synchronously at the original FIFO age before returning a promise. */
  wait(requirements: SemaphoreRequirement[]): Promise<void>;
  run<T>(callback: () => T): T;
  close(): void;
  surrender(): void;
  includeDeadline(deadline: number): void;
  readonly admitted: boolean;
  readonly executing: boolean;
  readonly expiration: Promise<never>;
}

function capacityContextError(turn: CapacityTurn, includePhase = true): Error | null {
  // Queue drains may inspect another request's turn inside this async context.
  const phase =
    includePhase && capacityContext.getStore() === turn ? admissionPhaseContext.getStore() : null;
  if (phase?.error) return phase.error;
  if (phase?.signal?.aborted) return (phase.error = makeAbortError(phase.signal));
  if (turn.error) return turn.error;
  if (turn.signal?.aborted) return (turn.error = makeAbortError(turn.signal));
  if (Date.now() >= turn.deadline) {
    return (turn.error = createSemaphoreError(
      "COMBO_CAPACITY_TIMEOUT",
      "Combo capacity wait expired"
    ));
  }
  if (phase && Date.now() >= phase.deadline) {
    return (phase.error = createSemaphoreError(
      "COMBO_CAPACITY_TIMEOUT",
      "Candidate admission expired"
    ));
  }
  return null;
}

export function accountCapacityAdmissionError(error: unknown): unknown {
  if (!capacityContext.getStore()) return error;
  const code = (error as { code?: unknown })?.code;
  if (code === "SEMAPHORE_QUEUE_FULL" || code === "SEMAPHORE_TIMEOUT") {
    return createSemaphoreError(
      code === "SEMAPHORE_QUEUE_FULL" ? "COMBO_CAPACITY_QUEUE_FULL" : "COMBO_CAPACITY_TIMEOUT",
      "Combo execution admission unavailable"
    );
  }
  return error;
}

export function accountCapacityAdmissionSignal(
  signal: AbortSignal | null = null
): AbortSignal | null {
  const signals = [
    ...new Set(
      [
        signal,
        capacityContext.getStore()?.signal,
        admissionPhaseContext.getStore()?.signal,
        admissionPhaseContext.getStore()?.controller.signal,
      ].filter((item): item is AbortSignal => Boolean(item))
    ),
  ];
  return signals.length > 1 ? AbortSignal.any(signals) : (signals[0] ?? null);
}

/** Keep capacity waiting and execution admission within the same absolute budget. */
export function remainingAccountCapacityBudgetMs(fallbackMs: number): number {
  const turn = capacityContext.getStore();
  if (!turn) return fallbackMs;
  const error = capacityContextError(turn);
  if (error) throw error;
  const remaining = Math.max(
    0,
    Math.min(turn.deadline, admissionPhaseContext.getStore()?.deadline ?? Infinity) - Date.now()
  );
  return fallbackMs > 0 ? Math.min(fallbackMs, remaining) : remaining;
}

/** Tighten the current actual-target phase without creating a nested phase. */
export function tightenAccountCapacityAdmissionDeadline(deadline: number): void {
  const turn = capacityContext.getStore();
  const phase = admissionPhaseContext.getStore();
  if (!turn || !phase || phase.activeExecution) return;
  const error = capacityContextError(turn);
  if (error) {
    phase.fail(error);
    throw error;
  }
  if (deadline >= phase.deadline) return;
  phase.deadline = deadline;
  phase.retime();
  const expired = capacityContextError(turn);
  if (expired) {
    phase.fail(expired);
    throw expired;
  }
}

type CapacityAdmissionOptions<T> = {
  deadline?: number;
  discard?: (result: T, error: unknown) => void;
  reuseExistingPhase?: boolean;
};

function checkCapacityAdmissionResult<T>(
  result: T,
  discard?: (result: T, error: unknown) => void
): T {
  try {
    assertAccountCapacityAdmissionAlive();
  } catch (error) {
    discard?.(result, error);
    throw error;
  }
  return result;
}

function observeCapacityAdmissionPhase(
  turn: CapacityTurn,
  phase: CapacityAdmissionPhase
): Promise<never> {
  const signal = phase.signal;
  let abortListener: (() => void) | null = null;
  let phaseTimer: ReturnType<typeof setTimeout> | null = null;
  phase.cleanup = () => {
    if (phaseTimer) clearTimeout(phaseTimer);
    phaseTimer = null;
    if (signal && abortListener) signal.removeEventListener("abort", abortListener);
    abortListener = null;
  };
  return new Promise<never>((_, reject) => {
    phase.fail = (error) => {
      phase.error ??= error;
      phase.cleanup();
      phase.controller.abort(phase.error);
      reject(phase.error);
    };
    const expireWhenDue = () => {
      if (phase.finished || phase.activeExecution) return;
      const remaining = phase.deadline - Date.now();
      if (remaining > 0) {
        phaseTimer = setTimeout(expireWhenDue, remaining);
        phaseTimer.unref?.();
        return;
      }
      phase.fail(createSemaphoreError("COMBO_CAPACITY_TIMEOUT", "Candidate admission expired"));
    };
    phase.retime = () => {
      if (phaseTimer) clearTimeout(phaseTimer);
      if (phase.finished || phase.activeExecution) return;
      if (phase.deadline <= Date.now()) {
        expireWhenDue();
        return;
      }
      phaseTimer = setTimeout(expireWhenDue, phase.deadline - Date.now());
      phaseTimer.unref?.();
    };
    phase.retime();
    void turn.expiration.catch((error: Error) => {
      if (!phase.finished && !phase.activeExecution) phase.fail(error);
    });
    if (signal) {
      abortListener = () => phase.fail(makeAbortError(signal));
      signal.addEventListener("abort", abortListener, { once: true });
    }
  });
}

/** Each target owns its phase; a hedged sibling cannot suspend its deadline. */
export async function runWithAccountCapacityAdmission<T>(
  callback: () => Promise<T>,
  signal: AbortSignal | null = null,
  options: CapacityAdmissionOptions<T> = {}
): Promise<T> {
  const turn = capacityContext.getStore();
  if (!turn) return callback();
  const existingPhase = admissionPhaseContext.getStore();
  // Same-target retry admission must mark the original phase active at the
  // executor boundary. Other signals still get independent hedge phases.
  if (options.reuseExistingPhase && existingPhase && existingPhase.signal === signal) {
    beginAccountCapacityAdmission();
    return checkCapacityAdmissionResult(await callback(), options.discard);
  }
  const phase: CapacityAdmissionPhase = {
    executionSerial: 0,
    activeExecution: false,
    finished: false,
    error: null,
    signal,
    deadline: Math.min(turn.deadline, options.deadline ?? Infinity),
    controller: new AbortController(),
    cleanup() {},
    retime() {},
    fail(error) {
      phase.error ??= error;
      phase.controller.abort(phase.error);
    },
  };
  turn.phases.add(phase);
  return admissionPhaseContext.run(phase, async () => {
    beginAccountCapacityAdmission();
    const expired = observeCapacityAdmissionPhase(turn, phase);
    try {
      return await Promise.race([
        Promise.resolve().then(async () => {
          assertAccountCapacityAdmissionAlive();
          return checkCapacityAdmissionResult(await callback(), options.discard);
        }),
        expired,
      ]);
    } finally {
      phase.finished = true;
      phase.cleanup();
      if (!phase.activeExecution) turn.phases.delete(phase);
    }
  });
}

/** Fence late pre-dispatch/cache continuations without shortening active responses. */
export function assertAccountCapacityAdmissionAlive(): void {
  const phase = admissionPhaseContext.getStore();
  if (phase?.error) throw phase.error;
  if (phase?.signal?.aborted) throw (phase.error = makeAbortError(phase.signal));
  if (!phase?.activeExecution) remainingAccountCapacityBudgetMs(Number.POSITIVE_INFINITY);
}

/** Re-enter bounded admission for retries/fallbacks; never clear a tombstone. */
export function beginAccountCapacityAdmission(): void {
  const turn = capacityContext.getStore();
  for (const previous of turn?.phases ?? []) {
    if (previous.finished) previous.activeExecution = false;
  }
  const phase = admissionPhaseContext.getStore();
  if (phase) {
    phase.activeExecution = false;
    if (phase.error) throw phase.error;
    if (phase.signal?.aborted) throw (phase.error = makeAbortError(phase.signal));
  }
  remainingAccountCapacityBudgetMs(Number.POSITIVE_INFINITY);
}

/** Call at the actual executor boundary, after semaphore and rate-limit admission. */
export function markAccountCapacityExecutionStarted(signal?: AbortSignal | null): void {
  const phase = admissionPhaseContext.getStore();
  const turn = capacityContext.getStore();
  if (!turn) return;
  if (signal?.aborted) throw makeAbortError(signal);
  beginAccountCapacityAdmission();
  if (phase) phase.activeExecution = true;
  turn.executionSerial++;
  if (phase) phase.executionSerial++;
  // A budget-only context may have no enabled account gate to consume it.
  // Once upstream starts, any future admission must receive a fresh queue age.
  if (turn.status !== "consumed") consumeCapacityTurn(turn);
}

/** A retry delay may end at admission expiry, but may never dispatch early. */
export async function waitForAccountCapacityAdmission(
  delayMs: number,
  signal: AbortSignal | null = null
): Promise<void> {
  beginAccountCapacityAdmission();
  const turn = capacityContext.getStore();
  const phase = admissionPhaseContext.getStore();
  const combined = accountCapacityAdmissionSignal(signal);
  if (combined?.aborted) {
    if (turn) throw makeAbortError(combined);
    return;
  }
  const until = Math.min(
    Date.now() + Math.max(0, delayMs),
    turn?.deadline ?? Number.POSITIVE_INFINITY,
    phase?.deadline ?? Number.POSITIVE_INFINITY
  );
  await new Promise<void>((resolve, reject) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let settled = false;
    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      timer = undefined;
      combined?.removeEventListener("abort", abort);
      // Preserve the original no-capacity caller's resolve-then-check499 contract.
      if (error && turn) reject(error);
      else resolve();
    };
    const abort = () => finish(makeAbortError(combined!));
    const tick = () => {
      if (settled) return;
      const remaining = until - Date.now();
      if (remaining > 0) timer = setTimeout(tick, remaining);
      else finish();
    };
    combined?.addEventListener("abort", abort, { once: true });
    void turn?.expiration.then(undefined, (error: Error) => finish(error));
    timer = setTimeout(tick, Math.max(0, until - Date.now()));
  });
  beginAccountCapacityAdmission();
}

function olderCapacityTurn(key: string, sequence: number, own?: CapacityTurn): boolean {
  for (const turn of capacityTurns) {
    if (turn !== own && turn.sequence < sequence && turn.requirements.has(key)) return true;
  }
  return false;
}

function capacityQueueCount(key: string, own?: CapacityTurn): number {
  let count = gates.get(key)?.queue.length ?? 0;
  for (const turn of capacityTurns) {
    if (turn !== own && turn.requirements.has(key)) count++;
  }
  return count;
}

/** Combo preflight includes older parked arrivals and execution waiters. */
export function isComboAccountCapacityUnavailable(
  provider: string,
  accountKey: string,
  maxConcurrency: number
): boolean {
  const key = buildAccountSemaphoreKey({ provider, accountKey });
  const context = capacityContext.getStore();
  const own = context ? context : undefined;
  const sequence = own?.status === "granted" ? own.sequence : Number.POSITIVE_INFINITY;
  const gate = gates.get(key);
  return (
    isAccountSemaphoreFull(provider, accountKey, maxConcurrency) ||
    Boolean(gate && gate.running >= gate.maxConcurrency) ||
    olderCapacityTurn(key, sequence, own) ||
    Boolean(gate?.queue.some(({ request }) => request.sequence < sequence))
  );
}

function expireCapacityTurn(turn: CapacityTurn, error: Error): Error {
  if ((error as { code?: string }).code === "SEMAPHORE_RESET") {
    error = createSemaphoreError("SEMAPHORE_RESET", error.message);
    contextResetErrors.add(error);
  }
  turn.error ??= error;
  for (const phase of turn.phases) {
    phase.cleanup();
    if (!phase.activeExecution) {
      if (!phase.finished) phase.fail(turn.error);
      turn.phases.delete(phase);
    }
  }
  turn.expire(turn.error);
  return error;
}

function retireCapacityTurn(turn: CapacityTurn, error?: Error): void {
  capacityTurns.delete(turn);
  liveCapacityContexts.delete(turn);
  for (const key of turn.requirements.keys()) {
    const gate = gates.get(key);
    if (gate && gate.running === 0 && capacityQueueCount(key) === 0) scheduleCleanup(key);
  }
  if (turn.timer) clearTimeout(turn.timer);
  turn.timer = null;
  if (turn.signal && turn.abortListener) {
    turn.signal.removeEventListener("abort", turn.abortListener);
  }
  turn.abortListener = null;
  if (error) error = expireCapacityTurn(turn, error);
  if (turn.status !== "consumed") turn.status = "closed";
  const reject = turn.reject;
  turn.reject = null;
  turn.resolve = null;
  if (error) reject?.(error);
}

function consumeCapacityTurn(turn: CapacityTurn): void {
  turn.status = "consumed";
  turn.onConsumed();
  capacityTurns.delete(turn);
  for (const key of turn.requirements.keys()) {
    const gate = gates.get(key);
    if (gate && gate.running === 0 && capacityQueueCount(key) === 0) scheduleCleanup(key);
  }
  drainQueues();
}

function scheduleCapacityExpiry(): void {
  if (capacityExpiryTimer) clearTimeout(capacityExpiryTimer);
  capacityExpiryTimer = null;
  let earliest = Number.POSITIVE_INFINITY;
  for (const turn of capacityTurns) {
    if (turn.status !== "queued") continue;
    for (const key of turn.requirements.keys()) {
      const deadline = turn.candidateDeadlines.get(key);
      if (Number.isFinite(deadline)) earliest = Math.min(earliest, deadline!);
      const until = gates.get(key)?.blockedUntil;
      if (until != null && Number.isFinite(until)) earliest = Math.min(earliest, until);
    }
  }
  if (Number.isFinite(earliest)) {
    capacityExpiryTimer = setTimeout(
      () => {
        capacityExpiryTimer = null;
        drainQueues();
      },
      Math.max(1, earliest - Date.now())
    );
    capacityExpiryTimer.unref?.();
  }
}

function grantCapacityTurns(): boolean {
  let progressed = false;
  for (const turn of [...capacityTurns].sort((a, b) => a.sequence - b.sequence)) {
    if (turn.status !== "queued") continue;
    const error = capacityContextError(turn, false);
    if (error) {
      retireCapacityTurn(turn, error);
      progressed = true;
      continue;
    }
    const ready = [...turn.requirements].some(([key, cap]) => {
      if ((turn.candidateDeadlines.get(key) ?? Infinity) <= Date.now()) return true;
      const gate = gates.get(key);
      return (
        (!gate ||
          (!isBlocked(gate) &&
            (isBypassed(cap) || gate.running < cap) &&
            gate.running < gate.maxConcurrency &&
            !gate.queue.some(({ request }) => request.sequence < turn.sequence))) &&
        !olderCapacityTurn(key, turn.sequence, turn)
      );
    });
    if (!ready) continue;
    turn.status = "granted";
    const resolve = turn.resolve;
    turn.resolve = null;
    turn.reject = null;
    resolve?.();
    progressed = true;
  }
  scheduleCapacityExpiry();
  return progressed;
}

function armCapacityTurnDeadline(turn: CapacityTurn): void {
  turn.timer = setTimeout(
    () => expireCapacityTurnWhenDue(turn),
    Math.max(0, turn.deadline - Date.now())
  );
  turn.timer.unref?.();
}

function expireCapacityTurnWhenDue(turn: CapacityTurn): void {
  // Timer resolution may wake just before the absolute deadline.
  if (turn.deadline - Date.now() > 0) {
    armCapacityTurnDeadline(turn);
    return;
  }
  retireCapacityTurn(
    turn,
    createSemaphoreError("COMBO_CAPACITY_TIMEOUT", "Combo capacity wait expired")
  );
  drainQueues();
}

function extendCapacityTurnDeadline(turn: CapacityTurn, bound: number): void {
  if (bound <= turn.deadline) return;
  turn.deadline = bound;
  if (turn.timer) clearTimeout(turn.timer);
  armCapacityTurnDeadline(turn);
}

function committedCandidateCapacity(requirement: SemaphoreRequirement): number | null | undefined {
  const gate = gates.get(requirement.key);
  if (!requirement.followExecutionCapacity) return gate?.connectionCapacity;
  if (gate && requirement.capacityRevision !== (gate.capacityRevision ?? 0))
    return gate.maxConcurrency;
  return undefined;
}

function enabledCapacityAlternatives(requirements: SemaphoreRequirement[]): Map<string, number> {
  const enabled = new Map<string, number>();
  for (const requirement of requirements) {
    const committedCap = committedCandidateCapacity(requirement);
    const requested = committedCap !== undefined ? committedCap : requirement.maxConcurrency;
    if (committedCap === undefined && isBypassed(requested)) continue;
    const cap = isBypassed(requested) ? 0 : Math.trunc(requested as number);
    enabled.set(requirement.key, Math.min(enabled.get(requirement.key) ?? cap, cap));
  }
  return enabled;
}

function capacityTurnQueueRejection(
  turn: CapacityTurn,
  enabled: Map<string, number>
): Error | null {
  for (const key of enabled.keys()) {
    if (
      !turn.requirements.has(key) &&
      turn.maxQueueSize > 0 &&
      capacityQueueCount(key, turn) >= turn.maxQueueSize
    ) {
      return createSemaphoreError("COMBO_CAPACITY_QUEUE_FULL", "Combo capacity queue is full");
    }
  }
  return null;
}

function replaceCapacityAlternatives(
  turn: CapacityTurn,
  requirements: SemaphoreRequirement[],
  enabled: Map<string, number>
): void {
  // No await between updating alternatives and putting the same aged turn back.
  if (requirements.every((requirement) => Number.isFinite(requirement.deadline))) {
    turn.deadline = Math.max(...requirements.map((requirement) => requirement.deadline!));
    if (turn.timer) clearTimeout(turn.timer);
    armCapacityTurnDeadline(turn);
  }
  turn.candidateDeadlines = new Map();
  for (const requirement of requirements) {
    turn.candidateDeadlines.set(
      requirement.key,
      Math.min(
        turn.candidateDeadlines.get(requirement.key) ?? Infinity,
        requirement.deadline ?? Infinity
      )
    );
  }
  const previous = turn.requirements;
  turn.executionCapacityKeys = new Set(
    requirements.filter((r) => r.followExecutionCapacity).map((r) => r.key)
  );
  turn.requirements = enabled;
  turn.status = "queued";
  capacityTurns.add(turn);
  // Earlier cleanup may have run while the old alternatives were still claimed.
  for (const key of previous.keys()) {
    if (!enabled.has(key)) scheduleCleanup(key);
  }
}

function waitForCapacityTurn(
  turn: CapacityTurn,
  requirements: SemaphoreRequirement[]
): Promise<void> {
  const error = capacityContextError(turn);
  if (error) return Promise.reject(error);
  if (turn.status === "consumed" || turn.status === "closed") {
    return Promise.reject(createSemaphoreError("SEMAPHORE_RESET", "Capacity turn is closed"));
  }
  const enabled = enabledCapacityAlternatives(requirements);
  if (enabled.size === 0) return Promise.reject(new Error("Capacity wait requires an account"));
  const rejection = capacityTurnQueueRejection(turn, enabled);
  if (rejection) {
    retireCapacityTurn(turn, rejection);
    drainQueues();
    return Promise.reject(rejection);
  }
  replaceCapacityAlternatives(turn, requirements, enabled);
  return new Promise<void>((resolve, reject) => {
    turn.resolve = resolve;
    turn.reject = reject;
    drainQueues();
  });
}

function capacityWaitHandle(turn: CapacityTurn): AccountCapacityWait {
  return {
    get admitted() {
      return turn.status === "consumed";
    },
    get executing() {
      return [...turn.phases].some(
        (phase) => phase.activeExecution && !phase.error && !phase.signal?.aborted
      );
    },
    expiration: turn.expiration,
    includeDeadline(candidateDeadline) {
      const error = capacityContextError(turn, false);
      if (error) throw error;
      extendCapacityTurnDeadline(turn, candidateDeadline);
    },
    wait(requirements) {
      return waitForCapacityTurn(turn, requirements);
    },
    run(callback) {
      const error = capacityContextError(turn);
      if (error) throw error;
      return capacityContext.run(turn, callback);
    },
    surrender() {
      if (turn.status === "granted") consumeCapacityTurn(turn);
    },
    close() {
      retireCapacityTurn(
        turn,
        turn.error ?? createSemaphoreError("SEMAPHORE_RESET", "Capacity turn is closed")
      );
      drainQueues();
    },
  };
}

/**
 * Reserve FIFO ordering, never running permits, across alternative accounts.
 * The selected account reservation transfers to execution atomically in acquireMany.
 */
export function createAccountCapacityWait({
  deadline,
  lifetimeDeadline = deadline,
  signal = null,
  maxQueueSize = DEFAULT_MAX_QUEUE_SIZE,
}: {
  deadline: number;
  lifetimeDeadline?: number;
  signal?: AbortSignal | null;
  maxQueueSize?: number;
}): AccountCapacityWait {
  let expire!: (error: Error) => void;
  const expiration = new Promise<never>((_, reject) => {
    expire = reject;
  });
  // A synchronous caller may only use wait/run; keep the background deadline observed.
  void expiration.catch(() => {});
  const turn: CapacityTurn = {
    executionCapacityKeys: new Set(),
    admissionKeys: new Set(),
    executionSerial: 0,
    expire,
    expiration,
    onConsumed() {
      // An account's admission bound is local to its phase. After complete
      // enrollment, later accounts retain the common request lifetime.
      extendCapacityTurnDeadline(turn, lifetimeDeadline);
    },
    phases: new Set(),
    sequence: nextSequence++,
    requirements: new Map(),
    candidateDeadlines: new Map(),
    deadline,
    signal,
    maxQueueSize,
    status: "idle",
    error: null,
    resolve: null,
    reject: null,
    timer: null,
    abortListener: null,
  };
  liveCapacityContexts.add(turn);
  armCapacityTurnDeadline(turn);
  if (signal) {
    turn.abortListener = () => {
      retireCapacityTurn(turn, makeAbortError(signal));
      drainQueues();
    };
    signal.addEventListener("abort", turn.abortListener, { once: true });
  }
  return capacityWaitHandle(turn);
}

export function buildAccountSemaphoreKey({
  provider,
  accountKey,
}: AccountSemaphoreKeyParts): string {
  return `${resolveProviderId(String(provider).trim().toLowerCase())}:${String(accountKey)}`;
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
  return `${resolveProviderId(String(provider).trim().toLowerCase())}:${String(accountKey)}:model:${String(model)}`;
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

function setGateConcurrency(gate: AccountGate, maxConcurrency: number): void {
  const ceiling = gate.concurrencyCeiling;
  gate.maxConcurrency =
    ceiling != null && Number.isFinite(ceiling) && ceiling > 0
      ? Math.min(maxConcurrency, Math.trunc(ceiling))
      : maxConcurrency;
}

function ensureGate(key: string, maxConcurrency: number): AccountGate {
  const existing = gates.get(key);
  if (existing) {
    setGateConcurrency(existing, maxConcurrency);
    return existing;
  }
  const created: AccountGate = {
    followConnectionCapacity: true,
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
  if (gate.blockedUntil == null) return false;
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
  if (!gate || gate.running > 0 || capacityQueueCount(key) > 0 || isBlocked(gate)) return;
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
      gate.queue[0]?.request === request &&
      !olderCapacityTurn(key, request.sequence)
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
    drainQueues();
    for (const key of keys) {
      const gate = gates.get(key);
      if (gate && gate.running === 0 && gate.queue.length === 0) scheduleCleanup(key);
    }
  };
}

function drainQueues(): void {
  let progressed = true;
  while (progressed) {
    progressed = false;
    for (const request of queuedRequests) {
      if (request.settled || !canAcquire(request)) continue;
      request.settled = true;
      removeRequest(request);
      for (const key of request.keys) gates.get(key)!.running++;
      request.resolve(createCompositeReleaseFn(request.keys));
      progressed = true;
      break;
    }
  }
  grantCapacityTurns();
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
function findQueueRejection(
  keys: string[],
  maxQueueSize: number,
  failFast: boolean,
  own?: CapacityTurn
): Error | null {
  if (failFast) {
    return createSemaphoreError(
      "SEMAPHORE_QUEUE_FULL",
      `Semaphore busy (fail-fast) for ${keys[0]}`
    );
  }
  if (maxQueueSize <= 0) return null;
  for (const key of keys) {
    // This account already owns a queue reservation; transfer it, do not count twice.
    if (own?.requirements.has(key)) continue;
    if (capacityQueueCount(key) >= maxQueueSize) {
      return createSemaphoreError(
        "SEMAPHORE_QUEUE_FULL",
        `Semaphore queue full (${maxQueueSize}) for ${key}`
      );
    }
  }
  return null;
}

function enabledExecutionRequirements(requirements: SemaphoreRequirement[]): Map<string, number> {
  const enabled = new Map<string, number>();
  for (const requirement of requirements) {
    if (isBypassed(requirement.maxConcurrency)) continue;
    const limit = Math.trunc(requirement.maxConcurrency as number);
    enabled.set(requirement.key, Math.min(enabled.get(requirement.key) ?? limit, limit));
  }
  return enabled;
}

function configureExecutionGate(
  key: string,
  limit: number,
  requirements: SemaphoreRequirement[]
): void {
  const gate = ensureGate(key, limit);
  const source = requirements.find(
    (requirement) => requirement.key === key && requirement.followConnectionCapacity !== undefined
  );
  if (source) gate.followConnectionCapacity = source.followConnectionCapacity!;
  const account = requirements.find(
    (requirement) => requirement.key === key && requirement.connectionId
  );
  if (account) {
    gate.connectionId = account.connectionId;
    if (gate.connectionCapacity === undefined) gate.connectionCapacity = account.connectionCapacity;
    if (account.concurrencyCeiling !== undefined)
      gate.concurrencyCeiling = account.concurrencyCeiling;
    if (gate.followConnectionCapacity && gate.connectionCapacity !== undefined) {
      setGateConcurrency(
        gate,
        isBypassed(gate.connectionCapacity) ? Infinity : Math.trunc(gate.connectionCapacity!)
      );
    }
  }
  setGateConcurrency(gate, gate.maxConcurrency);
  clearCleanupTimer(gate);
}

function recordCompleteAdmission(
  keys: Iterable<string>,
  context?: CapacityTurn,
  own?: CapacityTurn
): void {
  for (const key of keys) context?.admissionKeys.add(key);
  if (own) consumeCapacityTurn(own);
}

function canAcquireImmediately(keys: string[], sequence: number, own?: CapacityTurn): boolean {
  return keys.every((key) => {
    const gate = gates.get(key)!;
    return (
      !gate.queue.some(({ request }) => request.sequence < sequence) &&
      gate.running < gate.maxConcurrency &&
      !isBlocked(gate) &&
      !olderCapacityTurn(key, sequence, own)
    );
  });
}

type CompositeEnrollment = {
  keys: string[];
  sequence: number;
  timeoutMs: number;
  signal: AbortSignal | null;
  context?: CapacityTurn;
  own?: CapacityTurn;
};

function enrollCompositeRequest({
  keys,
  sequence,
  timeoutMs,
  signal,
  context,
  own,
}: CompositeEnrollment): Promise<() => void> {
  return new Promise((resolve, reject) => {
    const request: AcquireRequest = {
      ...(context
        ? { capacityTurn: context, capacityPhase: admissionPhaseContext.getStore() }
        : {}),
      sequence,
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
    for (const key of keys) {
      const queue = gates.get(key)!.queue;
      queue.push({ request });
      queue.sort((a, b) => a.request.sequence - b.request.sequence);
    }
    // Complete execution enrollment precedes release of the logical account claim.
    recordCompleteAdmission(keys, context, own);
    drainQueues();
  });
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
  const context = capacityContext.getStore();
  if (context) {
    const error = capacityContextError(context);
    if (error) return Promise.reject(error);
    timeoutMs = remainingAccountCapacityBudgetMs(timeoutMs);
  }
  // The next complete enrollment may select a newly reached account. Only
  // previously reserved keys receive a queue-depth transfer exemption below.
  const own = context?.status === "granted" ? context : undefined;
  const sequence = own?.sequence ?? nextSequence++;
  signal = accountCapacityAdmissionSignal(signal);
  const enabled = enabledExecutionRequirements(requirements);
  if (enabled.size === 0) {
    recordCompleteAdmission(
      requirements.map((requirement) => requirement.key),
      context,
      own
    );
    return Promise.resolve(createNoopReleaseFn());
  }
  if (signal?.aborted) return Promise.reject(makeAbortError(signal));

  const keys = [...enabled.keys()].sort();
  for (const key of keys) configureExecutionGate(key, enabled.get(key)!, requirements);
  if (canAcquireImmediately(keys, sequence, own)) {
    for (const key of keys) context?.admissionKeys.add(key);
    for (const key of keys) gates.get(key)!.running++;
    if (own) consumeCapacityTurn(own);
    return Promise.resolve(createCompositeReleaseFn(keys));
  }
  const rejection = findQueueRejection(keys, maxQueueSize, failFast, own);
  if (rejection) return Promise.reject(rejection);
  return enrollCompositeRequest({ keys, sequence, timeoutMs, signal, context, own });
}

function candidateCapacityAfterUpdate(
  turn: CapacityTurn,
  key: string,
  gate: AccountGate | undefined,
  cap: number
): number {
  if (turn.executionCapacityKeys.has(key) && gate)
    return Number.isFinite(gate.maxConcurrency) ? gate.maxConcurrency : 0;
  return cap;
}

/** Notify parked alternatives when an operator changes an account's cap. */
export function updateAccountSemaphoreCapacity(key: string, maxConcurrency: number | null): void {
  const cap = isBypassed(maxConcurrency) ? 0 : Math.trunc(maxConcurrency!);
  const gate = gates.get(key);
  if (gate) {
    gate.connectionCapacity = cap;
    gate.capacityRevision = (gate.capacityRevision ?? 0) + 1;
  }
  if (gate?.followConnectionCapacity)
    setGateConcurrency(gate, cap > 0 ? cap : Number.POSITIVE_INFINITY);
  for (const turn of capacityTurns) {
    if (turn.requirements.has(key))
      turn.requirements.set(key, candidateCapacityAfterUpdate(turn, key, gate, cap));
  }
  drainQueues();
}

function applyExecutionCapacityOverride(gate: AccountGate, override: number | null): void {
  if (override != null && Number.isFinite(override) && override > 0) {
    gate.followConnectionCapacity = false;
    setGateConcurrency(gate, Math.trunc(override));
  } else {
    gate.followConnectionCapacity = true;
    if (gate.connectionCapacity !== undefined)
      setGateConcurrency(
        gate,
        isBypassed(gate.connectionCapacity) ? Infinity : Math.trunc(gate.connectionCapacity!)
      );
  }
}

/** Refresh only the effective execution gate after an operator override/toggle. */
export function updateAccountSemaphoreExecutionCapacity(
  connectionId: string,
  override: number | null
): void {
  for (const [key, gate] of gates) {
    if (gate.connectionId !== connectionId) continue;
    gate.capacityRevision = (gate.capacityRevision ?? 0) + 1;
    applyExecutionCapacityOverride(gate, override);
    for (const turn of capacityTurns) {
      if (turn.executionCapacityKeys.has(key))
        turn.requirements.set(key, Number.isFinite(gate.maxConcurrency) ? gate.maxConcurrency : 0);
    }
  }
  drainQueues();
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
  scheduleCapacityExpiry();
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
      queued: capacityQueueCount(key),
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
  const error = createSemaphoreError("SEMAPHORE_RESET", `Semaphore reset for ${key}`);
  const rejections: AcquireRequest[] = [];
  if (gate) {
    clearCleanupTimer(gate);
    for (const queued of [...gate.queue]) {
      const request = queued.request;
      if (request.settled) continue;
      request.settled = true;
      removeRequest(request);
      rejections.push(request);
    }
  }
  for (const turn of [...liveCapacityContexts]) {
    if (turn.admissionKeys.has(key) || (turn.status !== "consumed" && turn.requirements.has(key)))
      retireCapacityTurn(turn, error);
  }
  if (gate) {
    clearCleanupTimer(gate);
    gates.delete(key);
  }
  for (const request of rejections)
    request.reject(request.capacityPhase?.error ?? request.capacityTurn?.error ?? error);
  drainQueues();
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
  for (const turn of [...liveCapacityContexts]) retireCapacityTurn(turn, error);
  if (capacityExpiryTimer) clearTimeout(capacityExpiryTimer);
  capacityExpiryTimer = null;
  for (const gate of gates.values()) clearCleanupTimer(gate);
  gates.clear();
  queuedRequests.clear();
  for (const request of rejections)
    request.reject(request.capacityPhase?.error ?? request.capacityTurn?.error ?? error);
}
