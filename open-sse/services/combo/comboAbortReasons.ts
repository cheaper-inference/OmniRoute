/**
 * Shared abort reasons for combo target dispatch.
 *
 * `buildTargetTimeoutRunner` aborts a stalled target with `new Error(...)` as the
 * abort reason, and hedged targets are cancelled with a different one. Consumers
 * downstream (session-affinity eviction in src/sse/handlers/chat.ts) must be able
 * to tell those two apart from an ordinary client disconnect: only the per-model
 * TIMEOUT means "this account stalled", while a hedge cancellation means "a
 * sibling target won" and says nothing about the account's health.
 *
 * Kept as a dependency-free leaf so src/** can import it without pulling in the
 * combo dispatcher.
 */

/** Abort reason used when a combo target exceeds `comboTargetTimeoutMs`. */
export const COMBO_PER_MODEL_TIMEOUT_REASON = "combo-per-model-timeout";

/** Abort reason used when a hedged sibling target won the race. */
export const COMBO_HEDGE_CANCELLED_REASON = "hedge-cancelled";

function abortReasonMessage(signal: AbortSignal): string {
  const reason: unknown = signal.reason;
  if (typeof reason === "string") return reason;
  if (reason && typeof reason === "object" && typeof (reason as Error).message === "string") {
    return (reason as Error).message;
  }
  return "";
}

/**
 * True only when `signal` was aborted by the combo per-model timeout. A client
 * disconnect, a hedge cancellation, or a non-aborted signal all return false.
 */
export function isComboPerModelTimeoutAbort(signal: AbortSignal | null | undefined): boolean {
  if (!signal?.aborted) return false;
  return abortReasonMessage(signal) === COMBO_PER_MODEL_TIMEOUT_REASON;
}

/**
 * True only when `signal` was aborted by the combo-level sibling supersession
 * (a hedge race loser, or a sibling landing a terminal response). A client
 * disconnect or a per-model timeout both return false.
 */
export function isHedgeCancelledSignal(signal: AbortSignal | null | undefined): boolean {
  if (!signal?.aborted) return false;
  return abortReasonMessage(signal) === COMBO_HEDGE_CANCELLED_REASON;
}

/**
 * True when `error` carries the hedge-cancel reason: directly as the abort
 * reason error (native `fetch` rejects with `signal.reason`), as a raw string
 * (`abort(reason)` with a string), or nested in a wrapper's `.cause` chain
 * (executors/proxy layers re-wrap rejections). Bare DOMException aborts and
 * every other failure shape return false.
 */
export function isHedgeCancelledReasonError(error: unknown): boolean {
  const seen = new Set<unknown>();
  let current: unknown = error;
  for (let depth = 0; depth < 4 && current && !seen.has(current); depth++) {
    seen.add(current);
    if (typeof current === "string") return current === COMBO_HEDGE_CANCELLED_REASON;
    if (typeof current !== "object") return false;
    let message: string;
    try {
      const value = (current as { message?: unknown }).message;
      message = typeof value === "string" ? value : "";
    } catch {
      return false;
    }
    if (message === COMBO_HEDGE_CANCELLED_REASON) return true;
    try {
      current = (current as { cause?: unknown }).cause;
    } catch {
      return false;
    }
  }
  return false;
}
