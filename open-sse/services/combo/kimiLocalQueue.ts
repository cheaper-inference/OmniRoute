import {
  buildAccountSemaphoreKey,
  getAccountSemaphoreFullReason,
  waitForAccountSlot,
} from "../accountSemaphore.ts";
import { isKimiCoding } from "../kimiConcurrency.ts";
import { readConnectionForCooldownGate } from "../providerConnectionPool.ts";
import type { AttemptLoopState } from "./attemptLoopTypes.ts";
import { hasFutureRateLimitUntil } from "./comboPredicates.ts";
import { createKimiQueueTurn, type KimiQueueTurn } from "./kimiQueueTurn.ts";
import { resolvePersistedRetryCooldown } from "./persistedConnectionCooldown.ts";

/** A queued send has to recheck the actual selected row, including both names of the Kimi pool. */
export async function canDispatchKimiConnection(
  id: string,
  model: string,
  trustedLiveCheck: boolean
): Promise<boolean> {
  const row = await readConnectionForCooldownGate(id, true).catch(() => null);
  if (!row || row.isActive !== true || !isKimiCoding(row.provider)) return false;
  const eligibility = await resolvePersistedRetryCooldown(
    { connectionId: id, modelStr: model },
    async () => row,
    true
  );
  if (!eligibility.skipReason) return true;
  if (!trustedLiveCheck) return false;
  // The dashboard can check a known transient cooldown or a legacy status-only cooldown.
  if (eligibility.cooldown) return true;
  return (
    row.testStatus === "rate_limited" &&
    !row.lastErrorType &&
    !row.lastError &&
    (row.errorCode == null || Number(row.errorCode) === 429) &&
    hasFutureRateLimitUntil(row.rateLimitedUntil)
  );
}

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
