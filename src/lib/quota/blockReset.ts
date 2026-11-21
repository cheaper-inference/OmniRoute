/**
 * When a quota-share refusal clears, for the message and the Retry-After header.
 *
 * Percent windows use the reset the provider reports. Countable units have no reset instant,
 * because the store counts a sliding window of two buckets. For them the instant is an upper
 * bound: all consumption sits in the current bucket, stays whole until the next bucket starts,
 * then fades linearly over one window. An instant that is not known is never invented.
 */

import { WINDOW_MS, type QuotaWindow } from "./dimensions";
import type { BlockedDimension } from "./fairShare";
import { getPlanWindowReading } from "./saturationSignals";
import type { PlanWindowReading } from "./types";

/** Upper bound of when a countable key is back under `ceiling` if it sends nothing else. */
export function countableRetryAt(input: {
  window: QuotaWindow;
  consumed: number;
  ceiling: number;
  nowMs: number;
}): number {
  const windowMs = WINDOW_MS[input.window];
  const nextBucketStart = (Math.floor(input.nowMs / windowMs) + 1) * windowMs;
  const over =
    input.consumed > 0 ? Math.min(1, Math.max(0, 1 - input.ceiling / input.consumed)) : 0;
  return Math.ceil(nextBucketStart + over * windowMs);
}

export interface BlockResetDeps {
  readPlanWindow?: (
    connectionId: string,
    provider: string,
    window: QuotaWindow
  ) => Promise<PlanWindowReading | null>;
}

function defaultReadPlanWindow(
  connectionId: string,
  provider: string,
  window: QuotaWindow
): Promise<PlanWindowReading | null> {
  return getPlanWindowReading(connectionId, provider, { unit: "percent", window });
}

/** Epoch ms, or null when it is not known. Never throws. */
export async function resolveBlockReset(
  input: {
    blocked: BlockedDimension | undefined;
    connectionId: string;
    provider: string;
    nowMs: number;
  },
  deps: BlockResetDeps = {}
): Promise<number | null> {
  const { blocked, nowMs } = input;
  if (!blocked) return null;
  try {
    if (blocked.unit !== "percent") {
      const at = countableRetryAt({ ...blocked, nowMs });
      return Number.isFinite(at) ? at : null;
    }
    const read = deps.readPlanWindow ?? defaultReadPlanWindow;
    const reading = await read(input.connectionId, input.provider, blocked.window);
    const resetAt = reading?.resetAt;
    return typeof resetAt === "number" && Number.isFinite(resetAt) && resetAt > nowMs
      ? resetAt
      : null;
  } catch {
    return null;
  }
}

/** The sentence appended to a refusal, or "" when the instant is not known. */
export function blockResetSuffix(
  blocked: BlockedDimension | undefined,
  resetAtMs: number | null
): string {
  if (!blocked || resetAtMs === null || !Number.isFinite(resetAtMs)) return "";
  const iso = new Date(resetAtMs).toISOString();
  return blocked.unit === "percent"
    ? `. The ${blocked.window} window resets at ${iso}.`
    : `. Enough ${blocked.window} usage is expected to clear by ${iso}.`;
}

/**
 * Whole seconds that end strictly after the reset, or undefined when the reset is not known.
 * At the reset instant itself the gate still refuses, so a client waits one second past it at most.
 */
export function retryAfterSecondsFor(resetAtMs: number | null, nowMs: number): number | undefined {
  if (resetAtMs === null || !Number.isFinite(resetAtMs)) return undefined;
  return Math.max(1, Math.floor((resetAtMs - nowMs) / 1000) + 1);
}
