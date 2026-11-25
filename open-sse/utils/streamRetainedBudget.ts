/**
 * Per-stream cap on the text the response translators keep in memory while a stream is open
 * (tool-call arguments and names, reasoning text, thinking signatures). Each SSE line is
 * already capped (`MAX_PENDING_SSE_LINE_BYTES`), but these buffers grow across lines, so an
 * upstream sending many small frames could otherwise grow one until the process runs out of
 * memory.
 *
 * Sizes are string lengths (UTF-16 code units), which match bytes for the ASCII JSON these
 * buffers mostly hold. `OMNIROUTE_MAX_STREAM_RETAINED_BYTES` overrides the 64 MiB default;
 * `0` turns the cap off. The value is read once per stream, on its first charge.
 */
export const DEFAULT_MAX_STREAM_RETAINED_BYTES = 64 * 1024 * 1024;

type RetainedBudget = { used: number; max: number; exceeded: boolean };

const budgets = new WeakMap<object, RetainedBudget>();

export function getMaxStreamRetainedBytes(): number {
  const raw = process.env.OMNIROUTE_MAX_STREAM_RETAINED_BYTES?.trim();
  if (!raw) return DEFAULT_MAX_STREAM_RETAINED_BYTES;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) return DEFAULT_MAX_STREAM_RETAINED_BYTES;
  return parsed === 0 ? Infinity : Math.floor(parsed);
}

/**
 * Reserves `n` more retained units for the stream that owns `state`. Drop the fragment when
 * the reservation returns `false`. A refused required reservation marks the stream as over
 * budget. A refused optional reservation leaves the remaining budget available to later
 * fragments. Without a `state` object there is nothing to account against.
 */
export function chargeRetained(
  state: unknown,
  n: number,
  { optional = false }: { optional?: boolean } = {}
): boolean {
  if (!state || typeof state !== "object") return true;
  let budget = budgets.get(state);
  if (!budget) {
    budget = { used: 0, max: getMaxStreamRetainedBytes(), exceeded: false };
    budgets.set(state, budget);
  }
  if (budget.exceeded) return false;
  if (!(n > 0)) return true;
  if (budget.used + n > budget.max) {
    if (!optional) budget.exceeded = true;
    return false;
  }
  budget.used += n;
  return true;
}

/** True once a required charge was refused; the stream must end with an error. */
export function isRetainedBudgetExceeded(state: unknown): boolean {
  return !!state && typeof state === "object" && budgets.get(state)?.exceeded === true;
}

export const RETAINED_BUDGET_EXCEEDED_MESSAGE = "Upstream stream exceeded the retained size limit";
