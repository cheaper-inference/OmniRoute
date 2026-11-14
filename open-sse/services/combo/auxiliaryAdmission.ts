import { AsyncLocalStorage } from "node:async_hooks";
import * as semaphore from "../rateLimitSemaphore.ts";
import {
  isAccountCapacityContextError,
  hasAccountCapacityContext,
  remainingAccountCapacityBudgetMs,
  assertAccountCapacityAdmissionAlive,
  accountCapacityAdmissionSignal,
} from "../accountSemaphore.ts";
import {
  markLocalRateLimitError,
  LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE,
} from "../rateLimitManager/errors.ts";
import { lookupPositiveCap } from "./concurrencyCaps.ts";

export type AuxiliaryAdmissionSpec = {
  owner: object;
  kind: "round-robin" | "quota-share";
  key?: string;
  maxConcurrency?: number;
  timeoutMs: number;
  maxQueueSize: number;
  onAdmitted?: () => void;
  onExecutionStarted?: () => void;
  onFailOpen?: () => void;
};
const specs = new AsyncLocalStorage<AuxiliaryAdmissionSpec[]>();
export function withoutAuxiliaryAdmissions<T>(callback: () => T): T {
  return specs.exit(callback);
}
function admissionBudgetError(): Error {
  const error = new Error("Admission budget exhausted");
  return hasAccountCapacityContext()
    ? Object.assign(error, { code: "COMBO_CAPACITY_TIMEOUT" })
    : markLocalRateLimitError(error, LEGACY_RATE_LIMIT_QUEUE_TIMEOUT_CODE);
}

export function markAuxiliaryExecutionStarted(): void {
  for (const spec of specs.getStore() ?? []) spec.onExecutionStarted?.();
}

type OwnerState = {
  controller: AbortController;
  releases: Set<() => void>;
};
const owners = new WeakMap<object, OwnerState>();
function ownerState(owner: object): OwnerState {
  let state = owners.get(owner);
  if (!state) {
    state = { controller: new AbortController(), releases: new Set() };
    owners.set(owner, state);
  }
  return state;
}
/** Preserve each strategy owner's successful Response handoff boundary. */
export function releaseAuxiliaryAdmissionOwner(owner: object): void {
  const state = ownerState(owner);
  state.controller.abort(new AuxiliaryAdmissionRejected(owner, "AUXILIARY_OWNER_CLOSED"));
  for (const release of [...state.releases]) release();
}

export class AuxiliaryAdmissionRejected extends Error {
  constructor(
    readonly owner: object,
    readonly code: string
  ) {
    super("Auxiliary admission unavailable");
  }
}
const cancellations = new WeakSet<object>();
function admissionCancellation(reason: unknown): unknown {
  const error =
    reason != null && (typeof reason === "object" || typeof reason === "function")
      ? reason
      : new DOMException("Admission cancelled", "AbortError");
  cancellations.add(error);
  return error;
}
export function isPrivateAdmissionError(error: unknown): boolean {
  return (
    error instanceof AuxiliaryAdmissionRejected ||
    isAccountCapacityContextError(error) ||
    (error != null && typeof error === "object" && cancellations.has(error))
  );
}
export function withAuxiliaryAdmission<T>(spec: AuxiliaryAdmissionSpec, callback: () => T): T {
  return specs.run([...(specs.getStore() ?? []), spec], callback);
}

type AuxiliaryRequirement = AuxiliaryAdmissionSpec & {
  maxConcurrency: number;
  owners: Set<OwnerState>;
};

type AuxiliaryAdmissionBudget = {
  signal: AbortSignal;
  started: number;
  queueBudgetMs: number | undefined;
};

function remainingAuxiliaryBudget({
  signal,
  started,
  queueBudgetMs,
}: AuxiliaryAdmissionBudget): number {
  assertAccountCapacityAdmissionAlive();
  if (signal.aborted) throw admissionCancellation(signal.reason);
  const remaining = queueBudgetMs == null ? Infinity : queueBudgetMs - (Date.now() - started);
  if (remaining <= 0) throw admissionBudgetError();
  return remainingAccountCapacityBudgetMs(remaining);
}

async function awaitQuotaCap(
  connectionId: string,
  budget: AuxiliaryAdmissionBudget
): Promise<number | null> {
  const deadline = Date.now() + remainingAuxiliaryBudget(budget);
  const { signal } = budget;
  const timeoutError = admissionBudgetError();
  let timer: ReturnType<typeof setTimeout> | undefined;
  let onAbort: (() => void) | undefined;
  const cancelled = new Promise<never>((_, reject) => {
    onAbort = () => reject(admissionCancellation(signal.reason));
    signal.addEventListener("abort", onAbort, { once: true });
    const expireWhenDue = () => {
      const remaining = deadline - Date.now();
      if (remaining > 0) timer = setTimeout(expireWhenDue, remaining);
      else reject(timeoutError);
    };
    if (Number.isFinite(deadline)) expireWhenDue();
  });
  try {
    return await Promise.race([lookupPositiveCap(connectionId), cancelled]);
  } finally {
    clearTimeout(timer);
    if (onAbort) signal.removeEventListener("abort", onAbort);
  }
}

function auxiliaryCap(
  spec: AuxiliaryAdmissionSpec,
  connectionId: string | null | undefined,
  budget: AuxiliaryAdmissionBudget
): number | null | undefined | Promise<number | null> {
  if (spec.kind !== "quota-share") return spec.maxConcurrency;
  return connectionId ? awaitQuotaCap(connectionId, budget) : null;
}

function collectAuxiliaryRequirement(
  requirements: Map<string, AuxiliaryRequirement>,
  spec: AuxiliaryAdmissionSpec,
  key: string | undefined,
  cap: number | null | undefined
): void {
  if (!key || !cap || cap <= 0) return;
  const previous = requirements.get(key);
  requirements.set(key, {
    ...spec,
    owners: new Set([...(previous?.owners ?? []), ownerState(spec.owner)]),
    maxConcurrency: Math.min(previous?.maxConcurrency ?? cap, cap),
    timeoutMs: Math.min(previous?.timeoutMs ?? Infinity, spec.timeoutMs),
    maxQueueSize: Math.min(previous?.maxQueueSize ?? Infinity, spec.maxQueueSize),
  });
}

function registerAuxiliaryLease(
  physical: () => void,
  owners: Set<OwnerState>,
  releases: Array<() => void>
): void {
  let live = true;
  const handoffs = new Map<OwnerState, () => void>();
  const releasePhysical = () => {
    if (!live) return;
    live = false;
    for (const [owner, handoff] of handoffs) owner.releases.delete(handoff);
    handoffs.clear();
    physical();
  };
  releases.push(releasePhysical);
  for (const owner of owners) {
    const handoff = () => {
      owner.releases.delete(handoff);
      handoffs.delete(owner);
      if (handoffs.size === 0) releasePhysical();
    };
    handoffs.set(owner, handoff);
    owner.releases.add(handoff);
  }
}

function assertAuxiliarySignalAlive(combined: AbortSignal, controller: AbortController): void {
  if (!combined.aborted) return;
  if (controller.signal.aborted && combined.reason === controller.signal.reason)
    throw combined.reason;
  throw admissionCancellation(combined.reason);
}

async function acquireAuxiliaryRequirement(
  key: string,
  spec: AuxiliaryRequirement,
  signal: AbortSignal,
  remaining: number,
  releases: Array<() => void>
): Promise<void> {
  const controller = new AbortController();
  const combined = AbortSignal.any([
    signal,
    controller.signal,
    ...[...spec.owners].map((owner) => owner.controller.signal),
  ]);
  const timer = Number.isFinite(remaining)
    ? setTimeout(() => controller.abort(admissionBudgetError()), Math.max(0, remaining))
    : null;
  try {
    const physical = await semaphore.acquire(key, {
      maxConcurrency: spec.maxConcurrency,
      timeoutMs: spec.timeoutMs,
      maxQueueSize: spec.maxQueueSize,
      signal: combined,
    });
    registerAuxiliaryLease(physical, spec.owners, releases);
    assertAuxiliarySignalAlive(combined, controller);
    assertAccountCapacityAdmissionAlive();
    spec.onAdmitted?.();
  } catch (error) {
    assertAccountCapacityAdmissionAlive();
    assertAuxiliarySignalAlive(combined, controller);
    const code = String((error as { code?: string })?.code ?? "");
    if (code !== "SEMAPHORE_TIMEOUT" && code !== "SEMAPHORE_QUEUE_FULL") throw error;
    if (spec.kind === "quota-share") spec.onFailOpen?.();
    else throw new AuxiliaryAdmissionRejected(spec.owner, code);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/** Attempt-local leases: auxiliaries always follow complete composite acquisition. */
export async function acquireAuxiliaryAdmissions(
  connectionId: string | null | undefined,
  signal: AbortSignal,
  queueBudgetMs: number | undefined
): Promise<() => void> {
  const started = Date.now();
  const admissions = specs.getStore() ?? [];
  signal = AbortSignal.any([
    accountCapacityAdmissionSignal(signal)!,
    ...admissions.map((spec) => ownerState(spec.owner).controller.signal),
  ]);
  const budget = { signal, started, queueBudgetMs };
  const requirements = new Map<string, AuxiliaryRequirement>();
  for (const spec of admissions) {
    const key = spec.kind === "quota-share" ? "qsconn:" + connectionId : spec.key;
    const cap = auxiliaryCap(spec, connectionId, budget);
    const resolved = cap instanceof Promise ? await cap : cap;
    remainingAuxiliaryBudget(budget);
    collectAuxiliaryRequirement(requirements, spec, key, resolved);
  }
  const releases: Array<() => void> = [];
  let released = false;
  const release = () => {
    if (released) return;
    released = true;
    for (const done of releases.reverse()) done();
  };
  try {
    for (const [key, spec] of [...requirements].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))) {
      const remaining = remainingAuxiliaryBudget(budget);
      await acquireAuxiliaryRequirement(key, spec, signal, remaining, releases);
    }
    return release;
  } catch (error) {
    release();
    throw error;
  }
}
