/**
 * Combo failover for a non-streaming attempt whose upstream stream was cut before its
 * terminal signal (#18460 follow-up).
 *
 * #18460 reports such a turn as `length` with the partial content, which the quality
 * check accepts as a success, so the combo returned the partial answer of its first target.
 * The cut is read from the internal Response marker (`truncatedStreamPolicy.ts`), never
 * from `finish_reason`, so a genuine upstream `length` (`max_tokens`) is still a success.
 *
 * Scope (RESILIENCE_GUIDE): the target served a 200 and streamed real content before the
 * transport dropped, so this is an attempt failure, not a provider or model health signal.
 * It records combo metrics and moves on, and deliberately trips neither the provider
 * circuit breaker, a connection cooldown, nor a model lockout, so one dropped stream never
 * disables a healthy provider.
 *
 * The cut response is held, not discarded: when no later target succeeds, the combo
 * returns the last partial result (`length`), exactly what a single target returns.
 */
import { emit } from "./rrDashboardEvents.ts";
import { recordComboRequest } from "../comboMetrics.ts";
import { isTruncatedStreamResponse } from "../../utils/truncatedStreamPolicy.ts";
import type { AttemptLoopDeps, AttemptLoopState } from "./attemptLoopTypes.ts";
import { toRecordedTarget } from "./comboPredicates.ts";
import type { ResolvedComboTarget } from "./types.ts";

export const TRUNCATED_STREAM_COMBO_REASON = "upstream stream cut before its terminal signal";

type HeldTruncatedState = Pick<AttemptLoopState, "heldTruncatedResponse">;

/** A cut non-streaming attempt the combo should fail over from. */
export function isTruncatedComboAttempt(
  result: Response,
  deps: Pick<AttemptLoopDeps, "clientRequestedStream">,
  protectedPriorityTarget: boolean
): boolean {
  // A protected priority target only falls back on quota exhaustion; keep its answer.
  return (
    !deps.clientRequestedStream && !protectedPriorityTarget && isTruncatedStreamResponse(result)
  );
}

function cancelBody(response: Response | null | undefined): void {
  void response?.body?.cancel().catch(() => {});
}

/** Record the cut attempt as a retryable target failure and hold its partial result. */
export function recordTruncatedStreamAttempt(opts: {
  result: Response;
  modelStr: string;
  provider: string;
  targetIndex: number;
  target: ResolvedComboTarget;
  state: AttemptLoopState;
  deps: Pick<AttemptLoopDeps, "combo" | "log" | "startTime" | "strategy">;
}): void {
  const { result, modelStr, target, state, deps } = opts;
  deps.log.warn(
    "COMBO",
    `Model ${modelStr} returned a stream cut before its terminal signal — trying the next target`
  );
  state.lastError = TRUNCATED_STREAM_COMBO_REASON;
  state.lastStatus = 502;
  state.comboErrors.push({
    model: modelStr,
    status: 502,
    error: TRUNCATED_STREAM_COMBO_REASON,
    kind: "upstream",
    code: "stream_truncated",
  });
  recordComboRequest(deps.combo.name, modelStr, {
    success: false,
    latencyMs: Date.now() - deps.startTime,
    fallbackCount: state.fallbackCount,
    strategy: deps.strategy,
    target: toRecordedTarget(target),
  });
  state.recordedAttempts++;
  state.fallbackCount++;
  state.observeFailure(false, target.executionKey);
  emit("combo.target.failed", {
    comboName: deps.combo.name,
    targetIndex: opts.targetIndex,
    provider: opts.provider,
    model: modelStr,
    error: TRUNCATED_STREAM_COMBO_REASON,
    latencyMs: Date.now() - deps.startTime,
  });
  if (state.heldTruncatedResponse !== result) cancelBody(state.heldTruncatedResponse);
  state.heldTruncatedResponse = result;
}

/**
 * The combo's final answer: a later successful target wins (the held partial is released);
 * when the dispatch ended in failure, the last cut partial result is returned instead.
 */
export function resolveHeldTruncatedResponse(
  state: HeldTruncatedState,
  response: Response
): Response {
  const held = state.heldTruncatedResponse;
  state.heldTruncatedResponse = null;
  if (!held || held === response) return response;
  if (response.ok) {
    cancelBody(held);
    return response;
  }
  cancelBody(response);
  return held;
}
