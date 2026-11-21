/**
 * Per-combo call budget: at most `budgetCalls` requests per `budgetWindowMs` get the
 * full target list. Over the budget the combo is withheld and the request is served by
 * its first target alone, so a combo with expensive fallbacks cannot fan out without a
 * ceiling. Unset (default) = no budget, no state.
 *
 * shortcut: counters are process-local and in memory on purpose (a restart is a fresh
 * window, no DB write per request); a cluster needs a shared store to share one budget.
 */
import { boundedMap } from "../../../src/lib/quota/boundedMap.ts";

interface Counter {
  windowStart: number;
  windowMs: number;
  count: number;
}

const MAX_COMBO_COUNTERS = 1000;
const counters = boundedMap<Counter>("combo-call-budget", MAX_COMBO_COUNTERS, "lru");

function positiveInt(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) && n >= 1 ? Math.floor(n) : 0;
}

/**
 * Charge one request to the combo and report whether its budget is spent. A withheld
 * request is charged too. Each counter keeps its own window, so a short-window combo
 * never prunes a long-window one.
 */
export function chargeComboCallBudget(
  comboName: string,
  config: Record<string, unknown> | null | undefined,
  now = Date.now()
): boolean {
  const limit = positiveInt(config?.budgetCalls);
  const windowMs = positiveInt(config?.budgetWindowMs);
  if (limit === 0 || windowMs === 0) return false;
  let counter = counters.get(comboName);
  if (!counter || counter.windowMs !== windowMs || now - counter.windowStart >= windowMs) {
    counter = { windowStart: now, windowMs, count: 0 };
  }
  counter.count += 1;
  counters.set(comboName, counter);
  return counter.count > limit;
}

/** Test-only. */
export function resetComboCallBudgets(): void {
  counters.clear();
}
