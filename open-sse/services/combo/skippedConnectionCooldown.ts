import type { AttemptLoopState } from "./attemptLoopTypes.ts";
import type { ModelAvailabilityResult } from "./types.ts";

type CooldownState = Pick<AttemptLoopState, "skippedConnectionCooldownUntil">;

/** Retain only a finite deadline from the actual credential availability gate. */
export function recordSkippedConnectionCooldown(
  state: CooldownState,
  availability: ModelAvailabilityResult,
  now = Date.now()
): void {
  if (typeof availability !== "object" || availability?.reason !== "connection_cooldown") return;
  const delay = availability.retryAfterMs;
  const until = now + delay;
  if (!Number.isFinite(delay) || delay <= 0 || !Number.isFinite(until)) return;
  const previous = state.skippedConnectionCooldownUntil ?? 0;
  state.skippedConnectionCooldownUntil = previous > now ? Math.min(previous, until) : until;
}

/** A peer's temporary cooldown must not become another account's payment failure. */
export function resolveSkippedConnectionCooldownTerminal(
  status: number,
  state: CooldownState & Pick<AttemptLoopState, "observedFailure" | "allObservedFailuresQuota">,
  now = Date.now()
): { status: number; retryAfter: string | null; quotaExhausted: boolean | null } {
  const until = state.skippedConnectionCooldownUntil ?? 0;
  if (status === 402 && Number.isFinite(until) && until > 0 && until <= 8.64e15) {
    // The peer may have recovered while another target was failing. It still
    // warrants an immediate client retry, not a permanent payment response.
    return {
      status: 429,
      retryAfter: new Date(Math.max(until, now + 1)).toISOString(),
      quotaExhausted: false,
    };
  }
  return {
    status,
    retryAfter: null,
    quotaExhausted: state.observedFailure ? state.allObservedFailuresQuota : null,
  };
}
