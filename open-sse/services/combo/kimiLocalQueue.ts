import { isKimiCoding } from "../kimiConcurrency.ts";
import { createKimiQueueTurn, type KimiQueueTurn } from "./kimiQueueTurn.ts";
import {
  buildAccountSemaphoreKey,
  getAccountSemaphoreFullReason,
  waitForAccountSlot,
} from "../accountSemaphore.ts";
import type { AttemptLoopState } from "./attemptLoopTypes.ts";

export function isUnqueueableAccount(provider: string, id: string, cap: number): boolean {
  const reason = getAccountSemaphoreFullReason(provider, id, cap);
  return reason === "blocked" || (reason === "occupied" && !isKimiCoding(provider));
}

/** A waiting turn may use only a connection which passed the normal routing gates. */
export async function waitForKimiComboTurn(
  state: AttemptLoopState,
  terminal: Response | null,
  queueDepth: number,
  deadline: number,
  signal?: AbortSignal | null
): Promise<KimiQueueTurn | null> {
  if (
    !state.kimiCapacitySkips?.size ||
    state.kimiQueueTarget ||
    state.globalAttempts ||
    state.comboExpired ||
    signal?.aborted ||
    Date.now() >= deadline ||
    (terminal && terminal !== state.kimiProtectedCapacityStop)
  )
    return null;

  const cancelOtherSlots = new AbortController();
  const waitSignal = signal
    ? AbortSignal.any([signal, cancelOtherSlots.signal])
    : cancelOtherSlots.signal;
  const waits: Promise<KimiQueueTurn>[] = [];
  const seen = new Set<string>();
  for (const target of state.orderedTargets) {
    const cap = state.kimiCapacitySkips.get(target.executionKey);
    if (!cap || !target.connectionId || (terminal && !target.fallbackOnlyOnQuotaExhaustion))
      continue;
    const key = buildAccountSemaphoreKey({
      provider: target.provider,
      accountKey: target.connectionId,
    });
    if (seen.has(key)) continue;
    seen.add(key);
    waits.push(
      waitForAccountSlot(key, cap, {
        maxQueueSize: queueDepth || 20,
        timeoutMs: Math.max(1, deadline - Date.now()),
        signal: waitSignal,
      }).then((release) => {
        if (waitSignal.aborted) {
          release();
          waitSignal.throwIfAborted();
        }
        cancelOtherSlots.abort();
        return createKimiQueueTurn(target.executionKey, key, deadline, release);
      })
    );
  }
  try {
    return await Promise.any(waits);
  } catch (err) {
    if (!(err instanceof AggregateError)) throw err;
    return null;
  } finally {
    cancelOtherSlots.abort();
  }
}
