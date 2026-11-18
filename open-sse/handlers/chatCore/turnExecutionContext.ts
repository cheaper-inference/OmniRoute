import { AsyncLocalStorage } from "node:async_hooks";

/**
 * Ownership of this client request's turn-execution slot (#18716 follow-up).
 *
 * One client request can enter chatCore several times: the account loop in
 * chat.ts retries a retryable pre-output failure on the same account, rotates
 * to the next account, and re-runs combo legs, always with the caller's
 * headers, so every re-entry derives the same effective idempotency key.
 * The first entry acquires the turn slot; without this context the second
 * entry sees its own request as a foreign duplicate and fails it with a
 * local 409 that reads downstream as an account rate limit.
 *
 * The outermost dispatch (executeChatWithBreaker) opens the context. A
 * nested entry whose key is already held by the context reuses the slot
 * (a no-op release) instead of contending for it. Only the owning entry's
 * release frees the slot, when its stream is drained, errors, or is
 * cancelled. Entries outside any context keep the original
 * duplicate-blocking behaviour: a genuinely concurrent client retry with
 * the same key is still serialized by the guard.
 */

export type TurnExecutionOwnership = {
  /** Effective idempotency keys whose turn slot this request already holds. */
  keys: Set<string>;
};

const turnExecutionContext = new AsyncLocalStorage<TurnExecutionOwnership>();

export function runWithTurnExecutionOwnership<TResult>(callback: () => TResult): TResult {
  // Re-entry under an existing context (nested dispatch) shares the owner's set.
  if (turnExecutionContext.getStore()) return callback();
  return turnExecutionContext.run({ keys: new Set() }, callback);
}

/** Run outside any ownership scope: probes act as foreign callers. */
export function runWithoutTurnExecutionOwnership<TResult>(callback: () => TResult): TResult {
  return turnExecutionContext.run(undefined as unknown as TurnExecutionOwnership, callback);
}

export function getTurnExecutionOwnership(): TurnExecutionOwnership | null {
  return turnExecutionContext.getStore() ?? null;
}
