/**
 * Per-model failure cooldown for the memory rerank step (#20535).
 *
 * A rerank model that 404s / times out used to be retried on every retrieval. After a
 * failure we skip the rerank call until `until`, doubling the window on consecutive
 * failures (60 s -> 10 min cap). The first success clears the entry.
 */
const BASE_COOLDOWN_MS = 60_000;
const MAX_COOLDOWN_MS = 10 * 60_000;

const failures = new Map<string, { until: number; failures: number }>();

export function isRerankCoolingDown(model: string, now: number = Date.now()): boolean {
  const entry = failures.get(model);
  return !!entry && now < entry.until;
}

/** Records a failure and returns the cooldown applied (ms). */
export function recordRerankFailure(model: string, now: number = Date.now()): number {
  const count = (failures.get(model)?.failures ?? 0) + 1;
  const cooldown = Math.min(BASE_COOLDOWN_MS * 2 ** (count - 1), MAX_COOLDOWN_MS);
  failures.set(model, { until: now + cooldown, failures: count });
  return cooldown;
}

export function recordRerankSuccess(model: string): void {
  failures.delete(model);
}

export function _resetRerankBreaker(): void {
  failures.clear();
}
