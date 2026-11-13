// Shared across standalone chunks in one Node process (#8065); no auth/usage imports.
export const CODEX_QUOTA_RECOVERY_COOLDOWN_MS = 15_000;
export const CODEX_QUOTA_RECOVERY_DEADLINE_MS = 5_000;
export const CODEX_QUOTA_FLIGHT_MAX_MS = 30_000;
export interface CodexQuotaRecoveryBlocker {
  connectionId: string;
  windowNames: string[];
  observedAts: Array<number | null>;
}
interface Flight {
  startSeq: number;
  promise: Promise<unknown>;
}
interface RecoveryState {
  seq: number;
  flights: Map<string, Flight>;
  lastAttemptAt: Map<string, { at: number; ownerEpoch: string }>;
  forceAllowance: Map<string, { seq: number; ownerEpoch: string }>;
  refresh?: (connectionId: string) => Promise<unknown>;
}
const globalState = globalThis as typeof globalThis & { __codexQuotaRecovery?: RecoveryState };
function state(): RecoveryState {
  return (globalState.__codexQuotaRecovery ??= {
    seq: 0,
    flights: new Map(),
    lastAttemptAt: new Map(),
    forceAllowance: new Map(),
  });
}
/** Registered by providerLimits at scheduler bootstrap; keeps auth out of the usage/executor graph. */
export function registerCodexQuotaRecoveryRefresh(refresh: (id: string) => Promise<unknown>): void {
  state().refresh = refresh;
}
export async function refreshCodexQuotaForRecovery(connectionId: string): Promise<unknown> {
  const refresh = state().refresh;
  if (!refresh) throw new Error("Codex quota refresh is not initialized");
  return refresh(connectionId);
}
export function armCodexQuotaRecovery(connectionId: string, ownerEpoch: string): void {
  const shared = state();
  shared.forceAllowance.set(connectionId, { seq: ++shared.seq, ownerEpoch });
}

/** All refresh callers share the underlying flight, even if a waiter times out. */
export function runCodexQuotaRefresh<T>(
  connectionId: string,
  refresh: () => Promise<T>
): Promise<T> {
  const shared = state();
  const prior = shared.flights.get(connectionId);
  if (prior) return prior.promise as Promise<T>;
  const startSeq = ++shared.seq;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const cleanup = () => {
    clearTimeout(timer);
    if (shared.flights.get(connectionId) === flight) shared.flights.delete(connectionId);
  };
  const work = Promise.resolve().then(refresh);
  void work.catch(() => {});
  const promise = Promise.race([
    work,
    new Promise<never>((_, reject) => {
      timer = setTimeout(() => {
        cleanup();
        reject(new Error("Codex quota refresh timed out"));
      }, CODEX_QUOTA_FLIGHT_MAX_MS);
      timer.unref?.();
    }),
  ]).finally(cleanup);
  const flight: Flight = { startSeq, promise };
  shared.flights.set(connectionId, flight);
  return promise;
}

/** Timeout only the waiter: never cancel/delete a flight another caller may join. */
export async function withCodexQuotaRecoveryDeadline<T>(work: Promise<T>): Promise<T | undefined> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      work.catch(() => undefined),
      new Promise<undefined>((resolve) => {
        timer = setTimeout(() => resolve(undefined), CODEX_QUOTA_RECOVERY_DEADLINE_MS);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

export async function recheckCodexQuotaRecovery(
  blockers: CodexQuotaRecoveryBlocker[],
  deps: {
    refresh: (connectionId: string) => Promise<unknown>;
    ownerEpoch: (connectionId: string) => string | null;
    eligible: (connectionId: string) => Promise<boolean>;
  }
): Promise<boolean> {
  const shared = state();
  const deadline = Date.now() + CODEX_QUOTA_RECOVERY_DEADLINE_MS;
  let next = 0;
  let attempted = false;
  const worker = async () => {
    while (next < blockers.length && Date.now() < deadline) {
      const blocker = blockers[next++];
      const id = blocker.connectionId;
      if (!(await deps.eligible(id)) || Date.now() >= deadline) continue;
      const ownerEpoch = deps.ownerEpoch(id);
      if (!ownerEpoch) continue;
      const force = shared.forceAllowance.get(id);
      const forced = force?.ownerEpoch === ownerEpoch;
      const last = shared.lastAttemptAt.get(id);
      const now = Date.now();
      if (
        !forced &&
        ((last?.ownerEpoch === ownerEpoch && now - last.at < CODEX_QUOTA_RECOVERY_COOLDOWN_MS) ||
          blocker.observedAts.some(
            (at) => at !== null && now - at < CODEX_QUOTA_RECOVERY_COOLDOWN_MS
          ))
      )
        continue;
      // No await between the check and reservation: concurrent callers cannot spend it twice.
      shared.lastAttemptAt.set(id, { at: now, ownerEpoch });
      const flight = shared.flights.get(id);
      if (forced && (!flight || flight.startSeq >= force.seq)) shared.forceAllowance.delete(id);
      attempted = true;
      try {
        await deps.refresh(id);
      } catch {
        // A failed refresh leaves both quota evidence and the attempt reservation intact.
      }
    }
  };
  await withCodexQuotaRecoveryDeadline(Promise.all([worker(), worker()]));
  return attempted;
}
