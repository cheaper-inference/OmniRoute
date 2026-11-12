import { waitForAccountCapacityAdmission } from "../accountSemaphore.ts";
async function waitForCooldownAwareRetry(delay: number, signal: AbortSignal): Promise<boolean> {
  await waitForAccountCapacityAdmission(delay, signal);
  return !signal.aborted;
}
import type { AttemptLoopDeps, AttemptLoopState } from "./attemptLoopTypes.ts";
import { COMBO_COOLDOWN_WAIT_MARGIN_MS, shouldWaitForComboCooldown } from "./comboCooldownRetry.ts";
import { COMBO_LOOP_SAFETY_TIMEOUT_MS, resolveDelayMs } from "./comboPredicates.ts";
import { readConnectionForCooldownGate } from "./executeTargetGates.ts";
import {
  resolvePersistedRetryCooldown,
  type PersistedRetryCooldown,
} from "./persistedConnectionCooldown.ts";

type RetryCooldownWait = NonNullable<AttemptLoopDeps["retryCooldownWait"]>;

/** dispatch = send the retry; client_disconnected = 499; stop = leave this target (null). */
type AuthorizedRetryOutcome = "dispatch" | "client_disconnected" | "stop";

type AuthorizedRetryOptions = {
  state: AttemptLoopState;
  deps: AttemptLoopDeps;
  target: { modelStr: string; connectionId?: string | null };
  targetSignal?: AbortSignal;
  retryDelayMs: number;
  cooldownWait: RetryCooldownWait;
  allowRateLimitedConnection: boolean;
};

/** The request-wide wait limits, or a per-target fallback when the loop did not pass them. */
export function resolveRetryCooldownWait(deps: AttemptLoopDeps): RetryCooldownWait {
  if (deps.retryCooldownWait) return deps.retryCooldownWait;
  const comboTimeoutMs = resolveDelayMs(deps.config.comboTimeoutMs, 0);
  return {
    attempt: { current: 0 },
    budgetLeftMs: { current: deps.resilienceSettings.comboCooldownWait?.budgetMs ?? 0 },
    deadline: deps.startTime + (comboTimeoutMs || COMBO_LOOP_SAFETY_TIMEOUT_MS),
  };
}

function outcomeAfterAbort(deps: AttemptLoopDeps): AuthorizedRetryOutcome {
  return deps.signal?.aborted ? "client_disconnected" : "stop";
}

function decidePersistedCooldownWait(
  deps: AttemptLoopDeps,
  persisted: PersistedRetryCooldown,
  cooldownWait: RetryCooldownWait
) {
  const settings = deps.resilienceSettings.comboCooldownWait;
  if (!settings) return null;
  const { cooldown } = persisted;
  return shouldWaitForComboCooldown({
    reason: cooldown?.reason,
    waitMs: cooldown ? cooldown.untilMs - Date.now() + COMBO_COOLDOWN_WAIT_MARGIN_MS : 0,
    attempt: cooldownWait.attempt.current,
    budgetLeftMs: cooldownWait.budgetLeftMs.current,
    settings,
  });
}

/** A concurrent request can extend or reclassify the row while this retry waits. */
async function waitOutPersistedCooldown(
  opts: AuthorizedRetryOptions,
  retrySignal: AbortSignal,
  expire: () => void
): Promise<AuthorizedRetryOutcome> {
  const { state, deps, target, cooldownWait } = opts;
  let persistedCooldownWaited = false;
  for (;;) {
    const persisted = await resolvePersistedRetryCooldown(
      target,
      (id) => readConnectionForCooldownGate(id, true),
      persistedCooldownWaited,
      opts.allowRateLimitedConnection
    );
    if (Date.now() >= cooldownWait.deadline) expire();
    if (retrySignal.aborted || state.comboExpired) return outcomeAfterAbort(deps);
    if (!persisted.skipReason) return "dispatch";
    const decision = decidePersistedCooldownWait(deps, persisted, cooldownWait);
    if (!decision?.wait) {
      deps.log.info("COMBO", persisted.skipReason);
      state.fallbackCount++;
      return "stop";
    }
    persistedCooldownWaited = true;
    cooldownWait.attempt.current++;
    cooldownWait.budgetLeftMs.current -= decision.waitMs;
    if (!(await waitForCooldownAwareRetry(decision.waitMs, retrySignal))) {
      return outcomeAfterAbort(deps);
    }
  }
}

/**
 * Sleep out an already-authorized retry delay, then wait out (within the shared cooldown
 * budget, combo deadline and abort signals) a transient cooldown persisted meanwhile.
 */
export async function waitForAuthorizedRetry(
  opts: AuthorizedRetryOptions
): Promise<AuthorizedRetryOutcome> {
  const { state, deps, targetSignal, cooldownWait } = opts;
  const deadlineController = new AbortController();
  const retrySignal = AbortSignal.any(
    [deps.signal, targetSignal, deadlineController.signal].filter((signal): signal is AbortSignal =>
      Boolean(signal)
    )
  );
  const expire = () => {
    state.comboExpired = true;
    deadlineController.abort();
  };
  const timeLeftMs = cooldownWait.deadline - Date.now();
  const deadlineTimer = setTimeout(expire, Math.max(0, timeLeftMs));
  if (timeLeftMs <= 0) expire();
  try {
    if (!(await waitForCooldownAwareRetry(opts.retryDelayMs, retrySignal))) {
      return outcomeAfterAbort(deps);
    }
    return await waitOutPersistedCooldown(opts, retrySignal, expire);
  } finally {
    clearTimeout(deadlineTimer);
  }
}
