import { COOLDOWN_MS } from "../config/errorConfig.ts";

/**
 * Per-connection-and-model streak of upstream per-request refusals
 * (REQUEST_REJECTED — today Anthropic's OAuth `403 "Request not allowed"`,
 * #12859).
 *
 * A single refusal is a hiccup: the same token serves the next request. A run
 * of them is enforcement, and re-sending every request into it is the wrong
 * thing to do to an OAuth account. So the refusals are excluded for a short,
 * growing cooldown.
 *
 * Scope is `connectionId|model`. A refusal answers *what was asked*, not *who
 * asked*: a model the plan does not include is refused on every request while
 * a sibling model on the same token keeps working. Keying only by connection
 * let three refusals on one unavailable model reach the threshold and write the
 * whole account as `banned` / `isActive: false`, which nothing in the routing
 * path undoes — the operator had to reconnect by hand. A refusal on one model
 * now excludes only that model.
 *
 * The ladder never escalates to a terminal state. The threshold rung is a long
 * cooldown (`REQUEST_REJECTED_MAX_COOLDOWN_MS`), which stops the hammering just
 * as effectively and heals without an operator. A `banned` account was also a
 * false signal to the operator: the credential was never revoked.
 *
 * What counts as one refusal: one cooldown *episode*. Responses that land while
 * the model is already excluded were in flight before the cooldown was written
 * (parallel sessions, fan-out) — they are the same event, not new evidence, and
 * are ignored. A successful response on the model clears the streak
 * (chatHelpers onRequestSuccess); the window below is only a staleness bound so
 * an ancient refusal can never be the first of a streak.
 *
 * State is in-memory on purpose. A restart forgets the streak, which errs on
 * the side of a few more cooldowns before the long rung — never on the side of
 * state the operator has to undo by hand. The caller may re-seed one refusal
 * from the persisted row (`seedRequestRejectedStreak`) to bound a crash loop.
 */

/** A refusal older than this cannot start or continue a streak. */
export const REQUEST_REJECTED_WINDOW_MS = 24 * 60 * 60 * 1000;
/** Consecutive refusals at which the model earns the longest cooldown. */
export const REQUEST_REJECTED_ESCALATION_THRESHOLD = 3;
/** Longest rung of the ladder: the threshold cooldown. Never a terminal write. */
export const REQUEST_REJECTED_MAX_COOLDOWN_MS = COOLDOWN_MS.requestRejectedRepeat * 4;
/** Cooldowns after the 1st, 2nd and threshold refusal of a streak. */
export const REQUEST_REJECTED_COOLDOWNS_MS = [
  COOLDOWN_MS.requestRejected,
  COOLDOWN_MS.requestRejectedRepeat,
  REQUEST_REJECTED_MAX_COOLDOWN_MS,
];

export interface RequestRejectedVerdict {
  /** 1-based position of this refusal in the current streak. */
  streak: number;
  /** How long to exclude this model from selection. Always > 0. */
  cooldownMs: number;
  /**
   * Always false. Kept in the verdict so callers keep one code path; the
   * threshold now produces `REQUEST_REJECTED_MAX_COOLDOWN_MS` instead of a
   * terminal `banned` write.
   */
  escalate: boolean;
  /**
   * False when the refusal landed while the model was already in a cooldown
   * written by an earlier refusal: same event, nothing to persist.
   */
  counted: boolean;
  windowMs: number;
  threshold: number;
}

interface StreakState {
  count: number;
  lastRefusalAt: number;
  cooldownUntil: number;
}

const streaks = new Map<string, StreakState>();
let clock: () => number = () => Date.now();

/**
 * Scope key. `model` is optional so a caller that cannot resolve the target
 * keeps the pre-existing connection-wide behaviour instead of throwing.
 */
function streakKey(connectionId: string, model?: string | null): string {
  return model ? `${connectionId}|${model}` : connectionId;
}

function cooldownForStreak(streak: number): number {
  const step = Math.min(streak, REQUEST_REJECTED_COOLDOWNS_MS.length) - 1;
  return REQUEST_REJECTED_COOLDOWNS_MS[step];
}

export function recordRequestRejected(
  connectionId: string,
  model?: string | null,
  now: number = clock()
): RequestRejectedVerdict {
  const key = streakKey(connectionId, model);
  const existing = streaks.get(key);
  const base = {
    windowMs: REQUEST_REJECTED_WINDOW_MS,
    threshold: REQUEST_REJECTED_ESCALATION_THRESHOLD,
  };

  if (existing && now < existing.cooldownUntil) {
    // In flight before the cooldown was written — same episode.
    return {
      streak: existing.count,
      cooldownMs: Math.max(1, existing.cooldownUntil - now),
      escalate: false,
      counted: false,
      ...base,
    };
  }

  const continues = !!existing && now - existing.lastRefusalAt < REQUEST_REJECTED_WINDOW_MS;
  const streak = continues ? existing.count + 1 : 1;
  const cooldownMs = cooldownForStreak(streak);
  streaks.set(key, { count: streak, lastRefusalAt: now, cooldownUntil: now + cooldownMs });
  return { streak, cooldownMs, escalate: false, counted: true, ...base };
}

/**
 * Restore one refusal that happened before this process started (read from
 * the persisted connection row), so a crash loop cannot reset the count on
 * every boot. No-op when the model already has in-memory state or the refusal
 * is outside the window.
 */
export function seedRequestRejectedStreak(
  connectionId: string,
  model: string | null | undefined,
  lastRefusalAt: number,
  now: number = clock()
): boolean {
  const key = streakKey(connectionId, model);
  if (streaks.has(key)) return false;
  if (!Number.isFinite(lastRefusalAt) || now - lastRefusalAt >= REQUEST_REJECTED_WINDOW_MS) {
    return false;
  }
  streaks.set(key, { count: 1, lastRefusalAt, cooldownUntil: lastRefusalAt });
  return true;
}

/**
 * Whether the connection has any tracked streak. Passing `model` narrows the
 * question to that model only.
 */
export function hasRequestRejectedStreak(connectionId: string, model?: string | null): boolean {
  if (model) return streaks.has(streakKey(connectionId, model));
  for (const key of streaks.keys()) {
    if (key === connectionId || key.startsWith(`${connectionId}|`)) return true;
  }
  return false;
}

/**
 * Forget a streak — on a successful response or an operator reset. Passing
 * `model` clears only that model; omitting it clears every model of the
 * connection.
 */
export function clearRequestRejectedStreak(connectionId: string, model?: string | null): void {
  if (model) {
    streaks.delete(streakKey(connectionId, model));
    return;
  }
  streaks.delete(connectionId);
  const prefix = `${connectionId}|`;
  for (const key of [...streaks.keys()]) {
    if (key.startsWith(prefix)) streaks.delete(key);
  }
}

/** Test-only: wipe all streaks and restore the real clock. */
export function __resetRequestRejectedStreaksForTests(): void {
  streaks.clear();
  clock = () => Date.now();
}

/** Test-only: replace the clock the streak reads when no `now` is passed. */
export function __setRequestRejectedClockForTests(fn: (() => number) | null): void {
  clock = fn ?? (() => Date.now());
}
