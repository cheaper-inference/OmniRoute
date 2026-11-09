/** Record and classify a pre-output empty-content target failure. */
import { recordComboRequest } from "../comboMetrics.ts";
import { classifyComboOutcome } from "./comboErrorAggregation.ts";
import type { AttemptLoopDeps, AttemptLoopState, ExecuteTargetResult } from "./attemptLoopTypes.ts";
import {
  isStreamEarlyEofErrorBody,
  isStreamReadinessFailureErrorBody,
  toRecordedTarget,
} from "./comboPredicates.ts";
import type { ResolvedComboTarget } from "./types.ts";

type EmptyContentRetryState = Pick<
  AttemptLoopState,
  | "comboErrors"
  | "fallbackCount"
  | "lastError"
  | "lastStatus"
  | "observeFailure"
  | "recordedAttempts"
>;

export function isReadinessFailure(
  response: Response,
  errorBody: { error?: { code?: string | null } | string } | null
): boolean {
  return (
    (response.status === 502 || response.status === 504) &&
    isStreamReadinessFailureErrorBody(errorBody)
  );
}

export function isEarlyEofResponse(
  response: Response,
  errorBody: { error?: { code?: string | null } | string } | null
): boolean {
  return (
    (response.status === 502 || response.status === 504) && isStreamEarlyEofErrorBody(errorBody)
  );
}

export function isEmptyContentResponse(
  response: Response,
  errorBody: { error?: { code?: string | null } | string } | null
): boolean {
  return (
    response.status === 502 &&
    typeof errorBody?.error === "object" &&
    errorBody.error?.code === "empty_content"
  );
}

type EmptyContentRetryOutcome =
  | { shouldRetry: true; connectionId: string | null }
  | { shouldRetry: false; connectionId: string | null; result: ExecuteTargetResult };

export function handleEmptyContentRetry(opts: {
  response: Response;
  errorText: string;
  modelStr: string;
  retry: number;
  protectedPriorityTarget: boolean;
  target: ResolvedComboTarget;
  state: EmptyContentRetryState;
  deps: Pick<
    AttemptLoopDeps,
    | "maxRetries"
    | "signal"
    | "combo"
    | "strategy"
    | "startTime"
    | "sticky"
    | "releaseStickyPinOnFailure"
  >;
}): EmptyContentRetryOutcome {
  const connectionId = opts.response.headers.get("X-OmniRoute-Selected-Connection-Id");
  opts.deps.releaseStickyPinOnFailure(opts.deps.sticky.messageHash, connectionId);
  opts.state.lastError = opts.errorText;
  opts.state.lastStatus = opts.response.status;
  opts.state.comboErrors.push({
    model: opts.modelStr,
    status: opts.response.status,
    error: opts.errorText,
    kind: classifyComboOutcome(opts.response.status, opts.errorText),
    code: "empty_content",
  });
  recordComboRequest(opts.deps.combo.name, opts.modelStr, {
    success: false,
    latencyMs: Date.now() - opts.deps.startTime,
    fallbackCount: opts.state.fallbackCount,
    strategy: opts.deps.strategy,
    target: toRecordedTarget(opts.target),
  });
  opts.state.recordedAttempts++;
  opts.state.observeFailure(false, opts.target.executionKey);

  if (opts.retry < opts.deps.maxRetries && !opts.deps.signal?.aborted) {
    return { shouldRetry: true, connectionId };
  }
  return {
    shouldRetry: false,
    connectionId,
    result: opts.protectedPriorityTarget ? { ok: false, response: opts.response } : null,
  };
}
