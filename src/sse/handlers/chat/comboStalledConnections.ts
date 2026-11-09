import { isComboPerModelTimeoutAbort } from "@omniroute/open-sse/services/combo/comboAbortReasons.ts";

/**
 * Accounts a combo per-target timeout (open-sse/services/combo/targetTimeoutRunner.ts)
 * abandoned during ONE combo request: connectionId → provider. The combo's handleSingleModel
 * closure owns one per combo request, so nothing outlives that request.
 *
 * The timeout stays request-scoped (no cooldown, lockout, breaker or exhaustion mark); this
 * only lets the remaining targets of the same request prefer a sibling account. Selection
 * still falls back to a stalled account when it is the only eligible one.
 */
export type ComboStalledConnections = Map<string, string>;

/**
 * Remember `connectionId` if the per-target timeout aborts `modelAbortSignal` while its
 * dispatch is in flight, or later while the combo waits for that stream's first output.
 * Hedge cancellations and client disconnects carry other abort reasons and are ignored.
 * Returns a stop function for a dispatch that failed for another reason, so a timeout that
 * fires after the next account is selected never blames this one.
 */
export function watchComboTargetStall(
  stalled: ComboStalledConnections | null | undefined,
  modelAbortSignal: AbortSignal | null | undefined,
  provider: string,
  connectionId: string | null | undefined
): () => void {
  // An abort that predates this dispatch was not caused by this account.
  if (!stalled || !modelAbortSignal || modelAbortSignal.aborted || !connectionId) return () => {};
  const record = () => {
    if (isComboPerModelTimeoutAbort(modelAbortSignal)) stalled.set(connectionId, provider);
  };
  modelAbortSignal.addEventListener("abort", record, { once: true });
  return () => modelAbortSignal.removeEventListener("abort", record);
}

/** Connection ids of `provider` that stalled earlier in this combo request. */
export function comboStalledConnectionIds(
  stalled: ComboStalledConnections | null | undefined,
  provider: string
): string[] {
  if (!stalled) return [];
  return Array.from(stalled).flatMap(([id, owner]) => (owner === provider ? [id] : []));
}
