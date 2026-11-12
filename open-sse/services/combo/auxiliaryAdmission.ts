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

/** Attempt-local leases: auxiliaries always follow complete composite acquisition. */
export async function acquireAuxiliaryAdmissions(
  connectionId: string | null | undefined,
  signal: AbortSignal,
  queueBudgetMs: number | undefined
): Promise<() => void> {
  signal = accountCapacityAdmissionSignal(signal)!;
  const requirements = new Map<
    string,
    AuxiliaryAdmissionSpec & {
      maxConcurrency: number;
      owners: Set<OwnerState>;
    }
  >();
  for (const spec of specs.getStore() ?? []) {
    const key = spec.kind === "quota-share" ? "qsconn:" + connectionId : spec.key;
    const cap =
      spec.kind === "quota-share"
        ? connectionId
          ? await lookupPositiveCap(connectionId)
          : null
        : spec.maxConcurrency;
    if (!key || !cap || cap <= 0) continue;
    const previous = requirements.get(key);
    requirements.set(key, {
      ...spec,
      owners: new Set([...(previous?.owners ?? []), ownerState(spec.owner)]),
      maxConcurrency: Math.min(previous?.maxConcurrency ?? cap, cap),
      timeoutMs: Math.min(previous?.timeoutMs ?? Infinity, spec.timeoutMs),
      maxQueueSize: Math.min(previous?.maxQueueSize ?? Infinity, spec.maxQueueSize),
    });
  }
  const releases: Array<() => void> = [];
  let released = false;
  const release = () => {
    if (released) return;
    released = true;
    for (const done of releases.reverse()) done();
  };
  const started = Date.now();
  try {
    for (const [key, spec] of [...requirements].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))) {
      assertAccountCapacityAdmissionAlive();
      if (signal.aborted) throw admissionCancellation(signal.reason);
      if (queueBudgetMs != null && queueBudgetMs - (Date.now() - started) <= 0) {
        throw admissionBudgetError();
      }
      const remaining = remainingAccountCapacityBudgetMs(
        queueBudgetMs == null ? Infinity : Math.max(0, queueBudgetMs - (Date.now() - started))
      );
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
        for (const owner of spec.owners) {
          const handoff = () => {
            owner.releases.delete(handoff);
            handoffs.delete(owner);
            if (handoffs.size === 0) releasePhysical();
          };
          handoffs.set(owner, handoff);
          owner.releases.add(handoff);
        }
        if (combined.aborted) {
          if (controller.signal.aborted && combined.reason === controller.signal.reason)
            throw combined.reason;
          throw admissionCancellation(combined.reason);
        }
        assertAccountCapacityAdmissionAlive();
        spec.onAdmitted?.();
      } catch (error) {
        assertAccountCapacityAdmissionAlive();
        if (combined.aborted) {
          if (controller.signal.aborted && combined.reason === controller.signal.reason)
            throw combined.reason;
          throw admissionCancellation(combined.reason);
        }
        const code = String((error as { code?: string })?.code ?? "");
        if (code !== "SEMAPHORE_TIMEOUT" && code !== "SEMAPHORE_QUEUE_FULL") throw error;
        if (spec.kind === "quota-share") spec.onFailOpen?.();
        else throw new AuxiliaryAdmissionRejected(spec.owner, code);
      } finally {
        if (timer) clearTimeout(timer);
      }
    }
    return release;
  } catch (error) {
    release();
    throw error;
  }
}
