/**
 * Opt-in windowed failure penalty for account selection (OMNIROUTE_FAILURE_WINDOW_PENALTY).
 *
 * An account that just failed for an attributable reason (a 5xx other than 503/529) sorts
 * behind healthy accounts of the same provider for the rest of a fixed 90 s window, without a
 * cooldown. The window starts at the first counted failure and never extends, so the penalty
 * ends by itself. Each further failure adds one step (cap 10). In-memory and process-local.
 * The account stays schedulable: this only reorders candidates.
 */
const WINDOW_MS = 90_000;
const MAX_STEPS = 10;
const MAX_KEYS = 2_000;

const windows = new Map<string, { startedAt: number; count: number }>();

export function isFailureWindowPenaltyEnabled(): boolean {
  return /^(1|true|yes|on)$/i.test(process.env.OMNIROUTE_FAILURE_WINDOW_PENALTY?.trim() ?? "");
}

const keyOf = (id: string, model: string) => `${id}::${model}`;

export function recordWindowedFailure(id: string, model: string | null | undefined): void {
  if (!isFailureWindowPenaltyEnabled() || !id || !model) return;
  const key = keyOf(id, model);
  const now = Date.now();
  const current = windows.get(key);
  if (current && now - current.startedAt <= WINDOW_MS) {
    current.count = Math.min(MAX_STEPS, current.count + 1);
    return;
  }
  windows.delete(key); // re-insert so Map order stays oldest-first for eviction
  windows.set(key, { startedAt: now, count: 1 });
  if (windows.size > MAX_KEYS) windows.delete(windows.keys().next().value as string);
}

export function getFailureWindowSteps(id: string, model: string | null | undefined): number {
  if (!model) return 0;
  const current = windows.get(keyOf(id, model));
  if (!current) return 0;
  if (Date.now() - current.startedAt > WINDOW_MS) {
    windows.delete(keyOf(id, model));
    return 0;
  }
  return current.count;
}

/** Stable: accounts with fewer recent failures first, otherwise the input order is kept. */
export function sortByFailureWindow<T extends { id: string }>(
  connections: T[],
  model: string | null
): T[] {
  if (!model || connections.length < 2) return connections;
  return connections
    .map((connection) => ({ connection, steps: getFailureWindowSteps(connection.id, model) }))
    .sort((a, b) => a.steps - b.steps)
    .map((entry) => entry.connection);
}

export function resetFailureWindows(): void {
  windows.clear();
}
