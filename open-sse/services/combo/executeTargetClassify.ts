/**
 * Classify helpers for executeTarget's retry loop.
 * Lift-as-is from combo.ts #8375 / #2101 / #4279; stop cleanup uses injected deps.
 *
 * @internal — not part of the public combo.ts barrel.
 */
import { isContextOverflowFailure, isInputBoundRequestFailure } from "./comboPredicates.ts";
import { getModelContextOverrideValue } from "./contextOverrideGate.ts";
import { getResolvedModelCapabilities } from "../modelCapabilities.ts";
import { getSourcedTokenLimit } from "../contextManager.ts";
import { parseModel } from "../model.ts";
import { comboTargetDecision } from "./statusDecisionTable.ts";
import {
  errorResponse,
  errorResponseWithComboDiagnostics,
  isContentPolicyRefusalComboStopEnabled,
} from "../../utils/error.ts";
import { isContentPolicyRefusal } from "../../utils/contentPolicyError.ts";
import { classifyProviderSafetyError } from "../../utils/providerSafety.ts";
import { buildRedactedSummary } from "./comboErrorAggregation.ts";
import type { ComboDiagnostics } from "../../utils/error.ts";
import { formatExhaustedConnectionKey } from "./comboDiagFormat.ts";
import { collectQuotaWindowExclusions } from "./quotaSkipDiagnostics.ts";
import { getComboTrace, summarizeSkippedTargets } from "./decisionTrace.ts";
import { buildRecoveryHint } from "./pinRecovery.ts";
import type { AttemptLoopDeps, AttemptLoopState } from "./attemptLoopTypes.ts";
import type { ResolvedComboTarget } from "./types.ts";
import {
  protectedPriorityStopStatus,
  type ProtectedPriorityStopCause,
} from "./protectedPriorityStopStatus.ts";
import type { ResponseQualityResult } from "./validateQuality.ts";

/**
 * Terminal diagnostics attached to combo-level errors. Shared by the priority
 * target loop and the set-retry loop so both emit the same trace shape.
 */
export function buildComboDiag(
  state: AttemptLoopState,
  traceInvocationId: string,
  terminalReason: string,
  retryAfterSeconds?: number
): ComboDiagnostics {
  return {
    poolSize: state.orderedTargets.length,
    attempted: state.recordedAttempts,
    excluded: [
      ...[...state.exhaustedProviders].map((p) => ({ provider: p, reason: "exhausted" })),
      ...[...state.exhaustedConnections].map((c) => formatExhaustedConnectionKey(String(c))),
      ...(terminalReason === "all_targets_skipped"
        ? collectQuotaWindowExclusions(state.orderedTargets)
        : []),
    ],
    attemptOrder: state.comboAttemptOrder,
    terminalReason,
    recovery: buildRecoveryHint(terminalReason, retryAfterSeconds),
    // #12659: surface per-target skip reasons (e.g. persisted_cooldown) that
    // `excluded` never captures — only worth the trace lookup on the
    // diagnostic-heavy terminal reason.
    skippedTargets:
      terminalReason === "all_targets_skipped"
        ? summarizeSkippedTargets(getComboTrace(traceInvocationId)).map((g) => ({
            reason: g.reason,
            targets: g.targets,
          }))
        : undefined,
  };
}

/** Preserve prior attempt metadata without exposing upstream bodies or changing stop policy. */
export function buildProtectedPriorityStopResponse(opts: {
  state: AttemptLoopState;
  traceInvocationId: string;
  message: string;
  cause?: ProtectedPriorityStopCause;
}): Response {
  const previous = buildRedactedSummary(opts.state.comboErrors);
  return errorResponseWithComboDiagnostics(
    protectedPriorityStopStatus(opts.cause),
    previous ? `${opts.message}; earlier attempts: ${previous}` : opts.message,
    buildComboDiag(opts.state, opts.traceInvocationId, "protected_priority_stop")
  );
}

/** Record a target stop, returning a terminal response only for protected targets. */
export function stopProtectedPriorityTarget(opts: {
  protectedPriorityTarget: boolean;
  state: AttemptLoopState;
  deps: Pick<AttemptLoopDeps, "combo" | "log" | "clearStaleLKGP" | "traceInvocationId">;
  target: ResolvedComboTarget;
  message: string;
  cause?: ProtectedPriorityStopCause;
}): { ok: false; response: Response } | null {
  const { state, deps, target } = opts;
  state.observeFailure(false, target.executionKey);
  deps.clearStaleLKGP(
    deps.combo.name,
    target.executionKey,
    deps.combo.id,
    deps.log,
    "COMBO",
    undefined,
    target
  );
  return opts.protectedPriorityTarget
    ? {
        ok: false as const,
        response: buildProtectedPriorityStopResponse({
          state,
          traceInvocationId: deps.traceInvocationId,
          message: opts.message,
          cause: opts.cause,
        }),
      }
    : null;
}

export function remainderIsHomogeneous(
  orderedTargets: { modelStr: string }[],
  index: number,
  modelStr: string
): boolean {
  return orderedTargets.slice(index + 1).every((nextInPool) => nextInPool.modelStr === modelStr);
}

type ContextLimitCandidate = {
  modelStr: string;
  provider?: string | null;
  providerId?: string | null;
};

/**
 * Resolve a target's effective known context/input token limit, or `null` when
 * the model has no known sourced limit (fail-open for uncataloged models).
 *
 * Resolution order matches OmniRoute's context gate:
 * 1. Explicit persisted `model_context_override` (with effort-suffix inheritance)
 * 2. Model capabilities (`maxInputTokens` and `contextWindow` — taking the tighter
 *    effective input cap when both are positive)
 * 3. `getSourcedTokenLimit()` (env override / models.dev / registry / known provider)
 */
export function resolveTargetKnownContextLimit(target: ContextLimitCandidate): number | null {
  const override = getModelContextOverrideValue(target.modelStr);
  if (typeof override === "number" && Number.isFinite(override) && override > 0) {
    return override;
  }

  const parsed = parseModel(target.modelStr);
  const provider =
    target.providerId || target.provider || parsed.provider || parsed.providerAlias || null;
  const capabilities = getResolvedModelCapabilities({
    provider,
    model: target.modelStr,
  });

  const maxInput =
    typeof capabilities.maxInputTokens === "number" &&
    Number.isFinite(capabilities.maxInputTokens) &&
    capabilities.maxInputTokens > 0
      ? capabilities.maxInputTokens
      : null;
  const contextWindow =
    typeof capabilities.contextWindow === "number" &&
    Number.isFinite(capabilities.contextWindow) &&
    capabilities.contextWindow > 0
      ? capabilities.contextWindow
      : null;

  if (maxInput !== null && contextWindow !== null) {
    return Math.min(maxInput, contextWindow);
  }
  if (maxInput !== null) return maxInput;
  if (contextWindow !== null) return contextWindow;

  const sourced = getSourcedTokenLimit(provider || "unknown", parsed.model ?? null);
  return typeof sourced === "number" && Number.isFinite(sourced) && sourced > 0 ? sourced : null;
}

/**
 * Extract estimated/observed input token count from a context-overflow error
 * message when present (OmniRoute, Claude, OpenAI, and Gemini formats),
 * supporting optional comma separators.
 */
export function extractEstimatedInputTokensFromOverflowText(
  errorText: string | null | undefined
): number | null {
  if (!errorText) return null;
  const match =
    errorText.match(/estimated\s+([\d,]+)\s+input\s+tokens/i) ||
    errorText.match(/prompt\s+is\s+too\s+long:\s*([\d,]+)\s+tokens/i) ||
    errorText.match(/your\s+messages\s+resulted\s+in\s+([\d,]+)\s+tokens/i) ||
    errorText.match(/input\s+token\s+count\s*\(\s*([\d,]+)\s*\)\s+exceeds/i);
  if (!match) return null;
  const parsed = Number.parseInt(match[1].replace(/,/g, ""), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

/**
 * Determine whether any remaining target in `orderedTargets.slice(index + 1)`
 * could plausibly accept an input that just failed context-length validation on
 * `failedTarget`.
 *
 * Fail-open contract (#8375 / #8786 / #10734):
 * - Returns `true` (keep falling back) if ANY remaining target has an UNKNOWN
 *   context limit (`null`).
 * - Returns `true` if ANY remaining target has a strictly larger known limit
 *   than the failed target's known limit (when `estimatedInputTokens` is absent),
 *   OR has a known limit `>= estimatedInputTokens` (when `estimatedInputTokens`
 *   is known) AND strictly larger than `failedLimit` (when known).
 * - Returns `false` (safe to short-circuit) only when there are remaining
 *   targets (or none) and EVERY remaining target has a known limit that is
 *   `<= failedLimit` (or `< estimatedInputTokens` when available).
 */
export function hasRemainingTargetWithLargerContext(opts: {
  orderedTargets: ContextLimitCandidate[];
  index: number;
  failedTarget?: ContextLimitCandidate | null;
  estimatedInputTokens?: number | null;
  resolveLimit?: (target: ContextLimitCandidate) => number | null;
}): boolean {
  const remaining = opts.orderedTargets.slice(opts.index + 1);
  if (remaining.length === 0) return false;

  const resolveLimit = opts.resolveLimit ?? resolveTargetKnownContextLimit;
  const failedTarget = opts.failedTarget ?? opts.orderedTargets[opts.index] ?? null;
  const failedLimit = failedTarget ? resolveLimit(failedTarget) : null;
  const estimatedInput =
    typeof opts.estimatedInputTokens === "number" &&
    Number.isFinite(opts.estimatedInputTokens) &&
    opts.estimatedInputTokens > 0
      ? opts.estimatedInputTokens
      : null;

  // Without either a known failed target limit or an estimated input token count,
  // we cannot prove remaining targets are too small — fail open.
  if (failedLimit === null && estimatedInput === null) return true;

  for (const candidate of remaining) {
    const candidateLimit = resolveLimit(candidate);
    // Unknown context limit → fail-open, preserve fallback.
    if (candidateLimit === null) return true;

    const exceedsFailedLimit = failedLimit !== null && candidateLimit > failedLimit;
    const fitsEstimatedInput = estimatedInput !== null && candidateLimit >= estimatedInput;

    if (estimatedInput !== null && failedLimit !== null) {
      // Both the failed target's limit and the estimated input size are known:
      // only keep falling back when a remaining target is strictly larger than
      // the failed target AND large enough for the estimated input.
      if (candidateLimit > failedLimit && candidateLimit >= estimatedInput) return true;
    } else if (estimatedInput !== null) {
      if (fitsEstimatedInput) return true;
    } else if (exceedsFailedLimit) {
      return true;
    }
  }

  return false;
}

/**
 * Handle a pre-content streaming upstream error: nothing reached the client
 * yet, so re-dispatching the same target cannot duplicate output. Logs and
 * returns true when the caller should retry, false to fall through.
 */
export function handlePreContentStreamRetry(
  quality: ResponseQualityResult,
  retry: number,
  deps: {
    maxRetries: number;
    signal?: { aborted?: boolean } | null;
    log: { info: (tag: string, msg: string) => void };
  },
  modelStr: string
): boolean {
  if (!quality.upstreamFailure?.retryable || retry >= deps.maxRetries || deps.signal?.aborted) {
    return false;
  }
  deps.log.info(
    "COMBO",
    `Retrying ${modelStr} after pre-content streaming upstream error ` +
      `(attempt ${retry + 2}/${deps.maxRetries + 1})`
  );
  return true;
}

/**
 * PROVIDER_SAFETY_STOPS_TERMINAL (#17049): classify a pre-content stream failure that is an
 * explicit provider safety stop. A committed 200 stream hides the stop from the HTTP-level
 * safety latch, so quality-rejection branches must end the combo instead of failing over.
 */
function classifyProviderSafetyStreamFailure(
  quality: ResponseQualityResult
): { status: number; code: string } | null {
  const failure = quality.upstreamFailure;
  if (!failure) return null;
  return classifyProviderSafetyError({
    status: failure.status,
    code: failure.code,
    type: failure.type,
    message: failure.message,
  });
}

export function isProviderSafetyStreamFailure(quality: ResponseQualityResult): boolean {
  return classifyProviderSafetyStreamFailure(quality) !== null;
}

/** Protected-priority target whose upstream body failed quality validation. */
export function qualityValidationFailure(quality: ResponseQualityResult): {
  ok: false;
  response: Response;
} {
  const failure = quality.upstreamFailure;
  const safety = classifyProviderSafetyStreamFailure(quality);
  if (failure && safety) {
    // Same public envelope as an HTTP-level stop, so the latch and clients see one shape.
    return {
      ok: false,
      response: errorResponse(safety.status, failure.message || "Upstream request refused", {
        code: safety.code,
        type: "invalid_request_error",
      }),
    };
  }
  if (failure && isContentPolicyRefusal(failure)) {
    return {
      ok: false,
      response: errorResponse(failure.status, failure.message || "Upstream request refused", {
        code: failure.code,
        type: failure.type ?? "invalid_request_error",
      }),
    };
  }
  return {
    ok: false,
    response: quality.upstreamFailure
      ? errorResponse(quality.upstreamFailure.status, quality.reason || "Upstream request failed")
      : errorResponse(502, "Upstream response failed quality validation"),
  };
}

export function shouldAbortOnInputBoundFailure(opts: {
  structuredError: unknown;
  remainderIsHomogeneous: boolean;
  errorText?: string | null;
  status?: number;
  hasRemainingLargerContextTarget?: boolean;
}): boolean {
  const structured = opts.structuredError as
    { code?: string | null; type?: string | null } | undefined;
  // #15917: stopping the combo on a content-policy refusal — even with different models
  // remaining — instead of routing around the provider's policy is opt-in via
  // CONTENT_POLICY_REFUSAL_COMBO_STOP_ENABLED; off keeps the release routing.
  if (isContentPolicyRefusal(structured) && isContentPolicyRefusalComboStopEnabled()) return true;
  if (opts.remainderIsHomogeneous) {
    return opts.status === 400
      ? isContextOverflowFailure(opts.errorText, structured)
      : isInputBoundRequestFailure(structured);
  }
  return (
    opts.status === 400 &&
    opts.hasRemainingLargerContextTarget === false &&
    isContextOverflowFailure(opts.errorText, structured)
  );
}

/**
 * #2101 / #4279: body-specific 400 must surface via {ok,response}, not null.
 * The stop set is COMBO_400_STOP_ROWS. Model-scoped, overflow, and parameter
 * 400s advance even when the body is wrapped as invalid_request_error or
 * Bad Request.
 */
export function shouldSurfaceBodySpecific400(opts: {
  status: number;
  errorText: string;
  shouldFallback: boolean;
}): boolean {
  return opts.shouldFallback && comboTargetDecision(opts.status, opts.errorText) === "stop";
}
