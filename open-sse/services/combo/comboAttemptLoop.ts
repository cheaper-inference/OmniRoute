import {
  handoffCapacityResponse,
  refundPendingCapacityAttempt,
  capacityCandidate,
  type CapacityCandidate,
} from "./commonCapacity.ts";
/**
 * Set-try + speculative dispatch loop for handleComboChatInner.
 * Extracted from combo.ts dispatchWithCooldownRetry (#11804 finally lives here).
 *
 * @internal — not part of the public combo.ts barrel.
 */
import {
  formatRetryAfter,
  getEarliestRateLimitedUntil,
  getModelLockoutInfo,
  scanTransientModelLock,
} from "../accountFallback.ts";
import {
  getCachedProviderConnectionById,
  getCachedProviderConnections,
} from "../../../src/lib/db/readCache.ts";
import { getProviderAlias, resolveProviderId } from "../../../src/shared/constants/providers.ts";
import {
  errorResponse,
  errorResponseWithComboDiagnostics,
  unavailableResponse,
} from "../../utils/error.ts";
import { estimateSizeFast } from "../../utils/estimateSize.ts";
import { jsonLength } from "../../utils/jsonSize.ts";
import { COMBO_FAILURE_THRESHOLD, recordComboFailure } from "./failureTracker.ts";
import {
  isHedgeCancelledSignal,
  isHedgeCancelledReasonError,
  COMBO_HEDGE_CANCELLED_REASON,
} from "./comboAbortReasons.ts";
import {
  buildAllTargetsCoolingDownResponse,
  buildNoUpstreamResponseDiagnostics,
  formatPreDispatchExclusions,
  resolveAllFailedTerminalReason,
} from "./pinRecovery.ts";
import { collectQuotaWindowExclusions, formatQuotaSkipMessage } from "./quotaSkipDiagnostics.ts";
import { recordComboRequest } from "../comboMetrics.ts";
import { notifyWebhookEvent } from "../../../src/lib/webhookDispatcher.ts";
import { parseModel } from "../model.ts";
import {
  formatComboOutcomes,
  buildRedactedSummary,
  resolveComboTerminalStatus,
  resolveComboTerminalCode,
} from "./comboErrorAggregation.ts";
import {
  resolveComboCooldownWaitDecision,
  resolveCircuitOpenWaitDecision,
  isTransientComboCooldownReason,
  type ResolveComboCooldownDecisionResult,
} from "./comboCooldownRetry.ts";
import {
  computeClosestRetryAfter,
  waitForCooldownAwareRetry,
} from "../../../src/sse/services/cooldownAwareRetry.ts";
import { toRetryAfterDisplayValue } from "./validateQuality.ts";
import { finalizeComboTrace, finishComboTrace } from "./decisionTrace.ts";
import { isRetryAfterEligibleStatus } from "./unavailableRetryGate.ts";
import { withQuotaExhaustionClassification } from "./quotaExhaustion.ts";
import {
  COMBO_LOOP_SAFETY_TIMEOUT_MS,
  COMBO_SAFETY_DRAIN_MS,
  IDENTICAL_MODEL_ERROR_STREAK,
  hasIdenticalModelErrorStreak,
  resolveDelayMs,
  requestScopedReplayKey,
  getExhaustedTargetSkipReason,
} from "./comboPredicates.ts";
import { collectCircuitOpenExclusions, evaluateExecuteTargetGates } from "./executeTargetGates.ts";
import { executeTargetAttempt } from "./executeTargetAttempt.ts";
import type { ResolvedComboTarget } from "./types.ts";
import { buildComboDiag } from "./executeTargetClassify.ts";
import { attemptCompatRejectedFallback } from "./comboCompatFallback.ts";
import { isProviderInCooldown } from "../providerCooldownTracker.ts";
import type {
  AttemptLoopDeps,
  AttemptLoopState,
  ExecuteTargetResult,
  GateDecision,
} from "./attemptLoopTypes.ts";
import {
  isAccountCapacityContextError,
  createAccountCapacityWait,
  remainingAccountCapacityBudgetMs,
  runWithAccountCapacityAdmission,
  waitForAccountCapacityAdmission,
  buildAccountSemaphoreKey,
  type AccountCapacityWait,
} from "../accountSemaphore.ts";
import { getStrategyTraits } from "./strategyRegistry.ts";
import { resolveSkippedConnectionCooldownTerminal } from "./skippedConnectionCooldown.ts";

/** A second in-flight copy of a body larger than this sits in the TLS send buffer. */
const HEDGE_MAX_BODY_BYTES = 256 * 1024;

/**
 * Hedging sends the body twice. The fast estimate rejects oversized values
 * without allocating a JSON string. `jsonLength` then confirms the exact
 * serialized size; a cycle or BigInt makes it throw, and that unknown size
 * must not hedge — recording 0 bytes would send the body twice anyway.
 */
function isBodySmallEnoughToHedge(body: unknown): boolean {
  try {
    const estimated = estimateSizeFast(body, HEDGE_MAX_BODY_BYTES);
    if (!Number.isFinite(estimated) || estimated > HEDGE_MAX_BODY_BYTES) return false;
    return jsonLength(body) <= HEDGE_MAX_BODY_BYTES;
  } catch {
    return false;
  }
}

/**
 * Resolve the earliest known connection cooldown across every target's eligible
 * pool. A target may pin one connection, allowlist several, or leave selection to
 * the provider pool; all three shapes must participate or provider-level combos
 * lose the reset time when every account is exhausted. Best-effort by design:
 * terminal error construction must never become a new database failure.
 */
async function computeEarliestSkippedRateLimitedUntil(
  orderedTargets: AttemptLoopState["orderedTargets"]
): Promise<string | null> {
  try {
    const connectionIds = new Set<string>();
    const unrestrictedProviders = new Set<string>();

    for (const target of orderedTargets) {
      if (target.connectionId) {
        connectionIds.add(target.connectionId);
        continue;
      }
      if (Array.isArray(target.allowedConnectionIds) && target.allowedConnectionIds.length > 0) {
        for (const id of target.allowedConnectionIds) {
          if (typeof id === "string" && id.trim()) connectionIds.add(id.trim());
        }
        continue;
      }
      if (target.provider && target.provider !== "unknown") {
        unrestrictedProviders.add(target.provider);
      }
    }

    const connections = await Promise.all(
      [...connectionIds].map((id) => getCachedProviderConnectionById(id))
    );
    const providerConnections = await Promise.all(
      [...unrestrictedProviders].map(async (provider) => {
        const canonical = resolveProviderId(provider);
        const alias = getProviderAlias(canonical);
        const ids = new Set([provider, canonical, alias].filter(Boolean));
        const rows = await Promise.all(
          [...ids].map((id) => getCachedProviderConnections({ provider: id, isActive: true }))
        );
        return rows.flat();
      })
    );

    const accounts = [...connections, ...providerConnections.flat()]
      .filter((connection): connection is Record<string, unknown> => Boolean(connection))
      .map((connection) => ({
        rateLimitedUntil:
          typeof connection.rateLimitedUntil === "string" ? connection.rateLimitedUntil : null,
      }));
    return getEarliestRateLimitedUntil(accounts);
  } catch {
    return null;
  }
}

/** Pinned lookups stay exact. An empty connection id scans every account. */
function lookupComboModelLockout(provider: string, connectionId: string, rawModel: string) {
  if (!connectionId) return scanTransientModelLock(provider, rawModel);
  return getModelLockoutInfo(provider, connectionId, rawModel);
}

/**
 * Resolve the earliest TRANSIENT model-lockout expiry across the skipped
 * targets (#16319). `computeEarliestSkippedRateLimitedUntil` only reads
 * connection-level `rateLimitedUntil`, so a model-scoped cooldown never
 * surfaced a recovery hint: a single-target combo whose only model sat in a
 * short lock answered a hint-less 503 the client reads as an outage. Only
 * reasons the cooldown-wait helper classifies as transient qualify — a
 * `quota_exhausted` lock runs to midnight and auth/not-found locks never
 * clear on their own, so neither may advertise a retry-after. Best-effort by
 * design, like its connection-level sibling: terminal error construction must
 * never become a new failure.
 */
async function computeEarliestSkippedModelLockUntil(
  orderedTargets: AttemptLoopState["orderedTargets"]
): Promise<string | null> {
  try {
    let earliestMs: number | null = null;
    for (const target of orderedTargets) {
      const provider = typeof target?.provider === "string" ? target.provider : "";
      if (!provider) continue;
      const connectionId = typeof target?.connectionId === "string" ? target.connectionId : "";
      const rawModel = parseModel(target?.modelStr ?? "").model || "";
      if (!rawModel) continue;
      const info = lookupComboModelLockout(provider, connectionId, rawModel);
      if (!info || !isTransientComboCooldownReason(info.reason)) continue;
      if (typeof info.remainingMs !== "number" || !(info.remainingMs > 0)) continue;
      const untilMs = Date.now() + info.remainingMs;
      if (earliestMs === null || untilMs < earliestMs) earliestMs = untilMs;
    }
    return earliestMs === null ? null : new Date(earliestMs).toISOString();
  } catch {
    return null;
  }
}

/** Earliest of two optional ISO instants (null-safe). */
function earliestIsoInstant(a: string | null, b: string | null): string | null {
  if (a && b) return Date.parse(a) <= Date.parse(b) ? a : b;
  return a || b;
}

export type DispatchWithCooldownRetryExtra = {
  maxSetRetries: number;
  setRetryDelayMs: number;
  comboTimeoutMs: number;
  comboStartTime: number;
  comboCooldownWaitEnabled: boolean;
  comboCooldownAttempt: { current: number };
  comboCooldownBudgetLeftMs: { current: number };
  evaluateGates: typeof evaluateExecuteTargetGates;
  executeAttempt: typeof executeTargetAttempt;
  /**
   * #6238 last-resort tier: the targets the compat pre-filter rejected. Probed
   * only when no compat-kept target was ever dispatched — the same guard the
   * round-robin path applies before its terminal error.
   */
  compatRejectedTargets: ResolvedComboTarget[];
};

/**
 * The cooldown budget a wait may use now. A wait that cannot end before the combo
 * deadline only re-enters the target loop to find it expired, which turns a pool
 * that dispatched nothing into a silent 504 (#18998). A timeout of 0 sets no deadline.
 */
function resolveCooldownWaitBudgetMs(extra: DispatchWithCooldownRetryExtra): number {
  const budgetLeftMs = extra.comboCooldownBudgetLeftMs.current;
  if (extra.comboTimeoutMs <= 0) return budgetLeftMs;
  const timeLeftMs = extra.comboStartTime + extra.comboTimeoutMs - Date.now();
  return Math.min(budgetLeftMs, Math.max(0, timeLeftMs));
}

function targetCapacityBound(
  index: number,
  state: AttemptLoopState,
  deps: AttemptLoopDeps,
  candidateBounds: Map<number, CapacityCandidate>
): CapacityCandidate {
  let bound = candidateBounds.get(index);
  if (!bound) {
    const target = state.orderedTargets[index];
    bound = capacityCandidate(
      {
        key: buildAccountSemaphoreKey({
          provider: target.provider,
          accountKey: target.connectionId ?? "",
        }),
      },
      target.provider,
      target.connectionId ?? "",
      deps.resilienceSettings.requestQueue.maxWaitMs,
      deps.comboDeadline!
    );
    candidateBounds.set(index, bound);
  }
  return bound;
}

function isDurablyExhaustedTarget(target: ResolvedComboTarget, state: AttemptLoopState): boolean {
  return (
    getExhaustedTargetSkipReason(
      target,
      state.durableExhaustedProviders ?? new Set(),
      state.durableExhaustedConnections ?? new Set()
    ) !== null
  );
}

function refreshRetryCapacityDeadline(
  state: AttemptLoopState,
  deps: AttemptLoopDeps,
  candidateBounds: Map<number, CapacityCandidate>,
  retryTargets: Set<number>
): void {
  const deadlines: number[] = [];
  for (const index of retryTargets) {
    if (isDurablyExhaustedTarget(state.orderedTargets[index], state)) continue;
    deadlines.push(targetCapacityBound(index, state, deps, candidateBounds).deadline);
  }
  state.capacityWaitDeadline = deadlines.length ? Math.max(...deadlines) : undefined;
}

function retryWaitExpired(
  clipped: boolean,
  state: AttemptLoopState,
  deps: AttemptLoopDeps
): boolean {
  return (
    clipped ||
    (state.capacityWaitDeadline != null && Date.now() >= state.capacityWaitDeadline) ||
    (deps.comboDeadline != null && Date.now() >= deps.comboDeadline)
  );
}

function requestAdmissionExpired(deps: AttemptLoopDeps): boolean {
  return deps.signal?.aborted === true || Date.now() >= (deps.comboDeadline ?? Infinity);
}

function cancelSkippedGateResponse(gate: GateDecision): void {
  if (gate.kind === "skip") void gate.result?.response?.body?.cancel().catch(() => {});
}

async function executeDurableGate(
  index: number,
  state: AttemptLoopState,
  deps: AttemptLoopDeps,
  execute: () => Promise<ExecuteTargetResult>
): Promise<ExecuteTargetResult> {
  // Durable skips retain request lifetime without reviving an old account admission bound.
  const deadline = deps.comboDeadline!;
  const owner = createAccountCapacityWait({
    deadline,
    lifetimeDeadline: deadline,
    signal: deps.signal,
  });
  try {
    return await owner.run(() =>
      runWithAccountCapacityAdmission(
        execute,
        state.abortControllers.get(index)?.signal ?? deps.signal ?? null,
        {
          deadline,
          discard: (result) => {
            void result?.response?.body?.cancel().catch(() => {});
          },
        }
      )
    );
  } finally {
    owner.close();
  }
}

function stopsProtectedCapacityFallback(
  target: ResolvedComboTarget,
  state: AttemptLoopState,
  deps: AttemptLoopDeps
): boolean {
  const trust = state.targetFailureTrust.get(target.executionKey);
  return (
    getStrategyTraits(deps.strategy).honorsFallbackOnlyTargets &&
    target.fallbackOnlyOnQuotaExhaustion === true &&
    !(trust?.observedFailure && trust.allObservedFailuresQuota)
  );
}

/**
 * Dispatches ordered targets with bounded set and cooldown retries, returning the first
 * success or terminal response, or an aggregate failure when eligible targets are exhausted.
 */
export async function dispatchWithCooldownRetry(opts: {
  state: AttemptLoopState;
  deps: AttemptLoopDeps;
  extra: DispatchWithCooldownRetryExtra;
}): Promise<Response> {
  const { state, deps, extra } = opts;
  deps.comboDeadline = Math.min(
    deps.comboDeadline ?? Number.POSITIVE_INFINITY,
    extra.comboStartTime +
      (extra.comboTimeoutMs > 0 ? extra.comboTimeoutMs : COMBO_LOOP_SAFETY_TIMEOUT_MS)
  );
  // #7360: persist lastStatus/earliestRetryAfter across set retries; reset
  // only on a fresh dispatch (including cooldown-aware re-dispatch).
  state.lastError = null;
  state.earliestRetryAfter = null;
  state.lastStatus = null;
  state.skippedForCircuitOpen = false;
  state.earliestCircuitOpenRetryMs = 0;
  // #11804: the loop-safety timer is armed per setTry iteration but must be
  // cleared on EVERY exit path, not just the happy one. Hoisted to function
  // scope so the `finally` at the end of this function always reaches it.
  let activeLoopSafetyTimer: ReturnType<typeof setTimeout> | null = null;
  let capacityWait: AccountCapacityWait | null = null;
  let bodyOwnsCapacityWait = false;
  const candidateBounds = new Map<number, CapacityCandidate>();
  const retryCapacityTargets = new Set<number>();
  let capacityTerminalRecorded = false;
  let capacityCandidateCount = 0;
  let zeroAttemptSetRecorded = false;
  const capacityDeadlineCompletion = (response: Response): Response => {
    if (!capacityWait && state.capacityWaitStartedAt == null) return response;
    for (const index of state.abortControllers.keys()) refundPendingCapacityAttempt(state, index);
    return response;
  };
  const recordCapacityTerminal = (status: number, code: string, cancelled: boolean): void => {
    if (capacityTerminalRecorded) return;
    capacityTerminalRecorded = true;
    for (const controller of state.abortControllers.values()) controller.abort();
    finalizeComboTrace(deps.traceInvocationId, state.orderedTargets);
    finishComboTrace(deps.traceInvocationId, { status });
    const latencyMs = Date.now() - deps.startTime;
    if (state.recordedAttempts === 0 && !zeroAttemptSetRecorded) {
      recordComboRequest(deps.combo.name, null, {
        success: false,
        latencyMs,
        fallbackCount: state.fallbackCount,
        strategy: deps.strategy,
      });
      zeroAttemptSetRecorded = true;
    }
    notifyWebhookEvent("request.failed", {
      combo: deps.combo.name,
      reason: cancelled ? "CLIENT_DISCONNECTED" : code,
      latencyMs,
      fallbackCount: state.fallbackCount,
    });
  };
  const capacityFailure = (error: unknown, candidates: number): Response => {
    const cancelled = deps.signal?.aborted === true;
    const globalExpired = Date.now() >= (deps.comboDeadline ?? Infinity);
    const full = (error as { code?: string })?.code === "COMBO_CAPACITY_QUEUE_FULL";
    const code = globalExpired
      ? "COMBO_TIMEOUT"
      : full
        ? "COMBO_CAPACITY_QUEUE_FULL"
        : "COMBO_CAPACITY_TIMEOUT";
    const waitedMs = Math.max(0, Date.now() - (state.capacityWaitStartedAt ?? Date.now()));
    const status = cancelled ? 499 : globalExpired ? 504 : 503;
    recordCapacityTerminal(status, code, cancelled);
    if (cancelled) return errorResponse(499, "Client disconnected");
    const response = errorResponseWithComboDiagnostics(
      status,
      full
        ? "Combo capacity queue is full; retry later"
        : `Combo capacity admission expired after ${waitedMs}ms (${candidates || capacityCandidateCount} candidates); retry later`,
      buildComboDiag(
        state,
        deps.traceInvocationId,
        globalExpired ? "combo_timeout" : "capacity_wait",
        1
      ),
      { code, type: "server_error" }
    );
    response.headers.set("Retry-After", "1");
    return response;
  };

  const waitForRetry = async (delayMs: number): Promise<Response | null> => {
    let capacityError: unknown;
    const pause = async (ms: number): Promise<boolean> => {
      if (!capacityWait) return waitForCooldownAwareRetry(ms, deps.signal);
      try {
        await capacityWait.run(() => waitForAccountCapacityAdmission(ms, deps.signal));
        return true;
      } catch (error) {
        if (!isAccountCapacityContextError(error) && !deps.signal?.aborted) throw error;
        capacityError = error;
        return false;
      }
    };
    if (candidateBounds.size > 0 || state.capacityWaitDeadline != null) {
      // Historical phase bounds stay immutable; only surviving targets bound another retry.
      refreshRetryCapacityDeadline(state, deps, candidateBounds, retryCapacityTargets);
    }
    if (state.capacityWaitDeadline == null && deps.comboDeadline == null) {
      const completed = await pause(delayMs);
      return completed
        ? null
        : capacityWait
          ? capacityFailure(capacityError, capacityCandidateCount)
          : errorResponse(499, "Client disconnected");
    }
    const deadline = Math.min(
      state.capacityWaitDeadline ?? Number.POSITIVE_INFINITY,
      deps.comboDeadline ?? Number.POSITIVE_INFINITY
    );
    const remaining = deadline - Date.now();
    if (remaining <= 0) return capacityFailure(null, capacityCandidateCount);
    const clipped = delayMs > remaining;
    let waitMs = Math.min(delayMs, remaining);
    // An early wake of a clipped wait never authorizes another set attempt.
    do {
      const completed = await pause(waitMs);
      if (!completed) return capacityFailure(capacityError, capacityCandidateCount);
      waitMs = deadline - Date.now();
    } while (clipped && waitMs > 0);
    if (retryWaitExpired(clipped, state, deps)) {
      return capacityFailure(null, capacityCandidateCount);
    }
    return null;
  };

  const hasAuthorizedCooldownWait = (): boolean => {
    if (!extra.comboCooldownWaitEnabled) return false;
    const common = {
      targets: state.orderedTargets,
      attempt: extra.comboCooldownAttempt.current,
      budgetLeftMs: resolveCooldownWaitBudgetMs(extra),
      settings: deps.resilienceSettings.comboCooldownWait,
      lookupLock: (
        provider: string,
        connectionId: string,
        target?: { modelStr?: string | null }
      ) => {
        const model = parseModel(target?.modelStr ?? "").model || "";
        return model ? lookupComboModelLockout(provider, connectionId, model) : null;
      },
    };
    if (!state.lastStatus && state.recordedAttempts === 0) {
      if (
        resolveCircuitOpenWaitDecision({
          skippedForCircuitOpen: state.skippedForCircuitOpen,
          retryAfterMs: state.earliestCircuitOpenRetryMs,
          attempt: common.attempt,
          budgetLeftMs: common.budgetLeftMs,
          settings: common.settings,
        }).wait
      )
        return true;
      if (
        resolveComboCooldownWaitDecision({
          ...common,
          earliestRetryAfter: null,
          computeWaitMs: () => null,
        }).wait
      )
        return true;
    }
    if (!state.lastStatus) return false;
    const terminal = resolveSkippedConnectionCooldownTerminal(
      resolveComboTerminalStatus(state.comboErrors, state.lastStatus),
      state
    );
    const earliestRetryAfter = terminal.retryAfter ?? state.earliestRetryAfter;
    return (
      !!earliestRetryAfter &&
      resolveComboCooldownWaitDecision({
        ...common,
        earliestRetryAfter,
        computeWaitMs: (retryAfter) => computeClosestRetryAfter(retryAfter).waitMs,
      }).wait
    );
  };

  try {
    for (let setTry = 0; setTry <= extra.maxSetRetries; setTry++) {
      // Durable exhaustion (quota, credits, auth) survives the set boundary: a
      // provider or connection whose quota is gone stays skipped on the next
      // set. Transient failures (rate limit, connection error) are replayed.
      // The request sets receive a COPY of the durable sets — never the same
      // Set instance — so a transient mark written during this set can never
      // be reported as durable on the next one.
      const durableProviders =
        setTry === 0 ? new Set<string>() : (state.durableExhaustedProviders ?? new Set<string>());
      const durableConnections =
        setTry === 0 ? new Set<string>() : (state.durableExhaustedConnections ?? new Set<string>());
      state.durableExhaustedProviders = durableProviders;
      state.durableExhaustedConnections = durableConnections;
      state.exhaustedProviders = new Set<string>(durableProviders);
      state.exhaustedConnections = new Set<string>(durableConnections);
      state.transientRateLimitedProviders = new Set<string>();
      state.skippedForCircuitOpen = false;
      state.earliestCircuitOpenRetryMs = 0;
      state.skippedConnectionCooldownUntil = undefined;
      if (setTry > 0) {
        deps.log.info(
          "COMBO",
          `All targets failed — retrying set (${setTry}/${extra.maxSetRetries})`
        );
        const retryFailure = await waitForRetry(Math.max(1, extra.setRetryDelayMs));
        if (retryFailure) return retryFailure;
      }

      retryCapacityTargets.clear();
      deps.startTime = Date.now();
      // Fallbacks within this set try: one per ordered target abandoned before
      // the one that serves the request. Abandoning the FIRST target counts
      // too — it equals the index of the target that ends up serving, i.e. the
      // value exposed as `X-OmniRoute-Fallback-Attempts`.
      state.fallbackCount = 0;
      state.deadlineFailures = 0;
      state.recordedAttempts = 0;
      zeroAttemptSetRecorded = false;
      state.comboErrors = [];

      // QA P0: the sanitized diagnostic trace (pool size + this set-try's exhausted
      // providers/connections + attempt order + terminal reason + recovery hint) is
      // assembled by the shared `buildComboDiag` helper — see executeTargetClassify.ts.

      let globalResolve: ((res: Response) => void) | null = null;
      const globalPromise = new Promise<Response>((res) => {
        globalResolve = res;
      });

      // G1 (silent-stop fix): the speculative loop's `Promise.race` waits on
      // `globalPromise`, which is ONLY resolved from inside a task (success or
      // fatal error). If a target hangs — e.g. the operator disabled the per-model
      // timeout (`targetTimeoutMs: 0`) and the upstream never settles — the race
      // never resolves and the request hangs forever with no response. This safety
      // promise force-resolves after the combo budget (extra.comboTimeoutMs when set,
      // otherwise a hard ceiling) so the request ALWAYS terminates with an
      // actionable 504 instead of dying silently. `state.comboExpired` is flipped so the
      // target loop stops launching new work; the existing state.comboExpired branch
      // returns the aggregated 504.
      const loopSafetyMs =
        state.capacityWaitStartedAt != null
          ? Math.max(0, deps.comboDeadline! - Date.now())
          : extra.comboTimeoutMs > 0
            ? extra.comboTimeoutMs
            : COMBO_LOOP_SAFETY_TIMEOUT_MS;
      let loopSafetyFired = false;
      let loopSafetyTimer: ReturnType<typeof setTimeout> | null = null;
      const loopSafetyPromise = new Promise<Response>((resolve) => {
        loopSafetyTimer = setTimeout(() => {
          loopSafetyFired = true;
          deps.log.warn(
            "COMBO",
            `Combo loop safety timeout (${loopSafetyMs}ms) reached without a terminal response — force-terminating`
          );
          const response = errorResponseWithComboDiagnostics(
            504,
            `Combo global timeout (${loopSafetyMs}ms) without a terminal response`,
            buildComboDiag(state, deps.traceInvocationId, "combo_timeout"),
            { code: "COMBO_TIMEOUT", type: "server_error" }
          );
          resolve(capacityDeadlineCompletion(response));
        }, loopSafetyMs);
        loopSafetyTimer.unref?.();
        activeLoopSafetyTimer = loopSafetyTimer;
      });
      const runningTasks = new Set<Promise<void>>();
      let anySuccess = false;
      // Flipped once the last IDENTICAL_MODEL_ERROR_STREAK targets have all
      // failed with the exact same request-shape error — see comboPredicates.ts.
      // Stops this set-try's target loop early AND skips the whole-set retry
      // below, since a malformed request fails identically no matter how many
      // more times it's replayed against the remaining fallbacks.
      let comboRequestMalformed = false;
      // #10681: steps already recorded as dispatched (so per-target retries do not
      // duplicate the decision).
      state.dispatchedTargets = new Set<string>();
      // G1: flip state.comboExpired as soon as the safety timer fires so the next loop
      // iteration breaks instead of launching more targets after the budget, and
      // abort every in-flight target so a hung upstream actually gets cancelled
      // (not just "response stops").
      const markLoopExpiredIfSafetyFired = () => {
        if (loopSafetyFired) {
          state.comboExpired = true;
          for (const [, ac] of state.abortControllers.entries()) ac.abort();
        }
      };
      state.abortControllers = new Map<number, AbortController>();
      const rejectedModelKeys = (state.requestScopedRejectedModelKeys ??= new Set<string>());
      const zeroLatencyOptimizationsEnabled = deps.config.zeroLatencyOptimizationsEnabled === true;
      // A hedged target sends the same body a second time. Bodies past this
      // size sit in the native TLS send buffer until the network drains them,
      // and a slow upstream holds both copies for the whole headers wait.
      const bodySmallEnoughToHedge = isBodySmallEnoughToHedge(deps.body);
      const hasProtectedPriorityTarget =
        getStrategyTraits(deps.strategy).honorsFallbackOnlyTargets &&
        state.orderedTargets.some((target) => target.fallbackOnlyOnQuotaExhaustion === true);

      const hedgingEnabled =
        zeroLatencyOptimizationsEnabled &&
        deps.config.hedging &&
        bodySmallEnoughToHedge &&
        !hasProtectedPriorityTarget;
      // Keep original target indices: gates and abort controllers key by index.
      const dispatchIndices = state.orderedTargets.map((_, index) => index);
      if (hedgingEnabled) {
        const groups = new Map<string, number[]>();
        for (const index of dispatchIndices) {
          const key = state.orderedTargets[index].modelStr;
          const group = groups.get(key) ?? [];
          group.push(index);
          groups.set(key, group);
        }
        dispatchIndices.length = 0;
        for (let account = 0; account < state.orderedTargets.length; account++) {
          for (const group of groups.values()) {
            if (account < group.length) dispatchIndices.push(group[account]);
          }
        }
      }

      const capacityCandidates = new Map<number, CapacityCandidate>();
      let capacityBarrier: number | null = null;
      let scanIndices: Set<number> | null = null;
      let scanHadNonCapacity = false;
      const pendingCapacityFailure: { current: { error: unknown; candidates: number } | null } = {
        current: null,
      };
      const executeGatedTarget = async (i: number): Promise<ExecuteTargetResult> => {
        const evaluate = () => extra.evaluateGates({ index: i, state, deps });
        const gate = await evaluate();
        if (requestAdmissionExpired(deps)) {
          cancelSkippedGateResponse(gate);
          return { ok: false, response: capacityFailure(null, capacityCandidates.size) };
        }
        // An asynchronous eligibility check can finish after cancellation/expiry.
        try {
          remainingAccountCapacityBudgetMs(
            deps.resilienceSettings.requestQueue?.maxWaitMs ?? Infinity
          );
        } catch (error) {
          cancelSkippedGateResponse(gate);
          throw error;
        }
        if (gate.kind === "skip") {
          if (gate.capacityRetryEligible === false) retryCapacityTargets.delete(i);
          else retryCapacityTargets.add(i);
          if (deps.capacityAdmissionEnabled && gate.capacity) {
            capacityCandidates.set(i, {
              ...gate.capacity,
              deadline: candidateBounds.get(i)?.deadline ?? Infinity,
            });
            if (gate.protectedPriorityTarget) capacityBarrier = i;
          } else scanHadNonCapacity = true;
          return gate.result;
        }
        retryCapacityTargets.add(i);
        scanHadNonCapacity = true;
        return extra.executeAttempt({
          index: i,
          state,
          deps: {
            ...deps,
            retryCooldownWait: {
              attempt: extra.comboCooldownAttempt,
              budgetLeftMs: extra.comboCooldownBudgetLeftMs,
              deadline: deps.comboDeadline!,
            },
          },
          targetForAttempt: gate.targetForAttempt,
          profile: gate.profile,
          protectedPriorityTarget: gate.protectedPriorityTarget,
        });
      };
      const executeEligibleTarget = async (
        i: number,
        target: ResolvedComboTarget
      ): Promise<ExecuteTargetResult> => {
        const bound = candidateBounds.get(i);
        if (bound && bound.deadline <= Date.now()) {
          const error = Object.assign(new Error("Candidate capacity deadline expired"), {
            code: "COMBO_CAPACITY_TIMEOUT",
          });
          if (stopsProtectedCapacityFallback(target, state, deps)) {
            return { ok: false, response: capacityFailure(error, capacityCandidates.size) };
          }
          pendingCapacityFailure.current ??= { error, candidates: capacityCandidates.size };
          return null;
        }
        return executeGatedTarget(i);
      };
      const executeTarget = async (i: number): Promise<ExecuteTargetResult> => {
        const target = state.orderedTargets[i];
        try {
          if (isDurablyExhaustedTarget(target, state))
            return await executeDurableGate(i, state, deps, () => executeGatedTarget(i));
          if (!capacityWait && state.capacityWaitDeadline != null) {
            capacityWait = createAccountCapacityWait({
              deadline: state.capacityWaitDeadline,
              lifetimeDeadline: deps.comboDeadline,
              signal: deps.signal,
              maxQueueSize: deps.resilienceSettings.requestQueue.maxQueueDepth,
            });
          }
          if (capacityWait) targetCapacityBound(i, state, deps, candidateBounds);
          const candidate = candidateBounds.get(i);
          if (candidate) capacityWait?.includeDeadline(candidate.deadline);
          return capacityWait
            ? await capacityWait.run(() =>
                runWithAccountCapacityAdmission(
                  () => executeEligibleTarget(i, target),
                  state.abortControllers.get(i)?.signal ?? deps.signal ?? null,
                  {
                    deadline: candidateBounds.get(i)?.deadline,
                    discard: (result) => {
                      void result?.response?.body?.cancel().catch(() => {});
                    },
                  }
                )
              )
            : await executeEligibleTarget(i, target);
        } catch (error) {
          if (deps.signal?.aborted) {
            refundPendingCapacityAttempt(state, i);
            return { ok: false, response: capacityFailure(error, capacityCandidates.size) };
          }
          if (isAccountCapacityContextError(error)) {
            refundPendingCapacityAttempt(state, i);
            if (stopsProtectedCapacityFallback(target, state, deps)) {
              return { ok: false, response: capacityFailure(error, capacityCandidates.size) };
            }
            // A hedged sibling may already be upstream. Retire only this admission
            // and let that sibling finish under its normal execution timeout.
            pendingCapacityFailure.current ??= { error, candidates: capacityCandidates.size };
            state.abortControllers.get(i)?.abort();
            return { ok: false };
          }
          throw error;
        }
      };

      // Rescan only parked targets plus lower targets not yet visited behind a
      // protected barrier. Capacity rescans are within the same set attempt.
      while (true) {
        capacityCandidates.clear();
        capacityBarrier = null;
        scanHadNonCapacity = false;
        for (const [dispatchPosition, i] of dispatchIndices.entries()) {
          if (scanIndices && !scanIndices.has(i)) continue;
          if (scanIndices) state.fallbackCount = i;
          if (anySuccess || state.comboExpired || comboRequestMalformed) break;
          // Another connection of the SAME model rejects the request identically:
          // a request-scoped refusal is not fixable by another account.
          if (rejectedModelKeys.has(requestScopedReplayKey(state.orderedTargets[i].modelStr))) {
            deps.log.info(
              "COMBO",
              `Skipping ${state.orderedTargets[i].modelStr} — same request already refused as request-scoped`
            );
            continue;
          }

          const abortController = new AbortController();
          state.abortControllers.set(i, abortController);
          const onClientAbort = () => abortController.abort();
          deps.signal?.addEventListener("abort", onClientAbort);

          const task = (async () => {
            try {
              const res = await executeTarget(i);
              if (anySuccess) {
                if (res?.ok && res.response) {
                  // A sibling may win while this target is in response-quality validation,
                  // after its timeout runner returned the streaming response. Abort already
                  // reached the upstream; cancel its original body too so the losing stream
                  // cannot continue generating or hold an unread tee branch.
                  void res.response.body
                    ?.cancel(new Error(COMBO_HEDGE_CANCELLED_REASON))
                    .catch(() => {});
                }
                return;
              }
              if (res && !anySuccess) {
                if (res.ok) {
                  anySuccess = true;
                  globalResolve!(res.response!);
                  for (const [idx, ac] of state.abortControllers.entries()) {
                    if (idx !== i) ac.abort(new Error(COMBO_HEDGE_CANCELLED_REASON));
                  }
                } else if (res.response) {
                  // Fatal error, abort combo
                  anySuccess = true;
                  globalResolve!(res.response);
                  for (const [idx, ac] of state.abortControllers.entries()) {
                    if (idx !== i) ac.abort(new Error(COMBO_HEDGE_CANCELLED_REASON));
                  }
                }
              }
            } finally {
              deps.signal?.removeEventListener("abort", onClientAbort);
            }
          })().catch((err) => {
            if (isHedgeCancelledSignal(abortController.signal) && isHedgeCancelledReasonError(err))
              return;
            const logError = deps.log.error ?? deps.log.warn;
            logError("COMBO", `Speculative task error for target ${i}`, err);
            // G2 (silent-stop fix): never leave the speculative loop waiting on an
            // unresolved globalPromise. If a task throws unexpectedly (outside
            // executeTarget's error handling) and no other task succeeds, the post-loop
            // `Promise.race([globalPromise, ...])` would hang forever. Resolve with a
            // 502 so the request terminates with an actionable error.
            // A thrown branch is still a branch failure, not proof that every
            // other provider failed. Post-loop aggregation settles all-failure.
            state.lastStatus = 502;
            state.lastError = "Combo target failed with an unexpected error";
            state.comboErrors.push({
              model: state.orderedTargets[i].modelStr,
              status: 502,
              error: state.lastError,
              kind: "provider",
            });
            state.recordedAttempts++;
          });

          runningTasks.add(task);
          task.finally(() => runningTasks.delete(task));

          if (
            zeroLatencyOptimizationsEnabled &&
            deps.config.hedging &&
            bodySmallEnoughToHedge &&
            !hasProtectedPriorityTarget &&
            dispatchPosition + 1 < dispatchIndices.length
          ) {
            const hedgeDelay = resolveDelayMs(deps.config.hedgeDelayMs, 500);
            let hedgeTimer: ReturnType<typeof setTimeout> | undefined;
            const timeoutPromise = new Promise<void>((r) => {
              hedgeTimer = setTimeout(r, hedgeDelay);
            });
            try {
              await Promise.race([task, globalPromise, timeoutPromise, loopSafetyPromise]);
            } finally {
              clearTimeout(hedgeTimer);
            }
          } else {
            await Promise.race([task, globalPromise, loopSafetyPromise]);
          }
          markLoopExpiredIfSafetyFired();

          // Global combo timeout check: after each target completes, stop trying
          // further targets if the total elapsed time exceeds extra.comboTimeoutMs.
          if (
            !anySuccess &&
            extra.comboTimeoutMs > 0 &&
            Date.now() - extra.comboStartTime >= extra.comboTimeoutMs
          ) {
            state.comboExpired = true;
            // Zero attempts means the budget went to waits, not upstream calls.
            deps.log[state.recordedAttempts === 0 ? "warn" : "info"](
              "COMBO",
              `Combo global timeout (${extra.comboTimeoutMs}ms) reached after ` +
                `${i + 1}/${state.orderedTargets.length} targets (${state.recordedAttempts} attempted) — stopping`
            );
          }

          if (capacityBarrier !== null) break;

          if (
            !hedgingEnabled &&
            !anySuccess &&
            !state.comboExpired &&
            hasIdenticalModelErrorStreak(state.comboErrors)
          ) {
            comboRequestMalformed = true;
            const last = state.comboErrors[state.comboErrors.length - 1];
            deps.log.warn(
              "COMBO",
              `The last ${IDENTICAL_MODEL_ERROR_STREAK} targets all failed with the identical ` +
                `request-shape error (status ${last.status}) after ${i + 1}/${state.orderedTargets.length} ` +
                `targets (${state.recordedAttempts} attempted) — stopping instead of retrying the same ` +
                `malformed request against remaining fallbacks or set-retries`
            );
          }
        }

        if (!anySuccess && runningTasks.size > 0) {
          // G1: include loopSafetyPromise so a hung last task (per-model timeout
          // disabled) cannot freeze this post-loop race forever.
          await Promise.race([globalPromise, Promise.all([...runningTasks]), loopSafetyPromise]);
          markLoopExpiredIfSafetyFired();
        }

        // All remaining tasks have settled (or the normal loop safety timeout
        // won). A retired admission must not cancel a viable active hedge.
        if (
          !anySuccess &&
          !state.comboExpired &&
          pendingCapacityFailure.current &&
          capacityCandidates.size === 0
        ) {
          return capacityFailure(
            pendingCapacityFailure.current.error,
            pendingCapacityFailure.current.candidates
          );
        }

        if (
          anySuccess ||
          state.comboExpired ||
          comboRequestMalformed ||
          capacityCandidates.size === 0
        )
          break;
        if (deps.signal?.aborted) return errorResponse(499, "Client disconnected");
        const preserveMixedRetry =
          scanHadNonCapacity &&
          capacityBarrier === null &&
          ((setTry < extra.maxSetRetries && !state.requestScopedFailureSeen) ||
            hasAuthorizedCooldownWait());
        if (preserveMixedRetry && state.capacityWaitStartedAt == null) break;
        state.capacityWaitStartedAt ??= Date.now();
        for (const [index, requirement] of capacityCandidates) {
          const target = state.orderedTargets[index];
          const candidate = capacityCandidate(
            requirement,
            target.provider,
            target.connectionId!,
            deps.resilienceSettings.requestQueue.maxWaitMs,
            deps.comboDeadline!
          );
          candidateBounds.set(index, candidate);
          capacityCandidates.set(index, candidate);
        }
        state.capacityWaitDeadline = Math.max(
          ...[...capacityCandidates.values()].map((c) => c.deadline)
        );
        const nextIndices = new Set(capacityCandidates.keys());
        if (capacityBarrier !== null) {
          for (let next = capacityBarrier + 1; next < state.orderedTargets.length; next++)
            nextIndices.add(next);
        }
        capacityCandidateCount = capacityCandidates.size;
        if (preserveMixedRetry) break;
        try {
          if (!capacityWait || capacityWait.admitted) {
            capacityWait?.close();
            capacityWait = createAccountCapacityWait({
              deadline: state.capacityWaitDeadline,
              lifetimeDeadline: deps.comboDeadline,
              signal: deps.signal,
              maxQueueSize: deps.resilienceSettings.requestQueue.maxQueueDepth,
            });
          }
          await capacityWait.wait([...capacityCandidates.values()]);
        } catch (error) {
          // no-effect: admission rejection is returned locally without an upstream attempt.
          return capacityFailure(error, capacityCandidates.size);
        }
        scanIndices = nextIndices;
      }

      if (!anySuccess) {
        capacityWait?.close();
        capacityWait = null;
      }

      // This set has finished dispatching. Release its timer before any terminal
      // response, set-retry delay, or cooldown-aware re-dispatch.
      if (loopSafetyTimer) {
        clearTimeout(loopSafetyTimer);
        loopSafetyTimer = null;
        activeLoopSafetyTimer = null;
      }

      // G1: if the safety timer won the race (request would otherwise hang), give
      // in-flight tasks a short drain window to land their per-model errors into
      // state.comboErrors so the 504 carries the same "tried: a (500)" summary the
      // regular state.comboExpired branch produces — then return the safety 504.
      if (loopSafetyFired && !anySuccess) {
        if (runningTasks.size > 0) {
          await Promise.race([
            Promise.allSettled([...runningTasks]),
            new Promise((resolve) => setTimeout(resolve, COMBO_SAFETY_DRAIN_MS)),
          ]);
        }
        const summary = state.comboErrors
          .slice(0, 5)
          .map((e) => `${e.model} (${e.status})`)
          .join(", ");
        const msg =
          `Combo global timeout (${loopSafetyMs}ms) after ${state.recordedAttempts}/${state.orderedTargets.length} targets` +
          (state.comboErrors.length > 0
            ? ` | tried: ${summary}${state.comboErrors.length > 5 ? `... (+${state.comboErrors.length - 5})` : ""}`
            : "") +
          " without a terminal response";
        return errorResponseWithComboDiagnostics(
          504,
          msg,
          buildComboDiag(state, deps.traceInvocationId, "combo_timeout"),
          {
            code: "COMBO_TIMEOUT",
            type: "server_error",
          }
        );
      }

      // A resolved fatal response also sets anySuccess to stop dispatching.
      finalizeComboTrace(deps.traceInvocationId, state.orderedTargets);
      if (anySuccess) {
        const response = await globalPromise;
        finishComboTrace(deps.traceInvocationId, { status: response.status });
        if (response.ok && response.body && capacityWait) {
          const wrapped = handoffCapacityResponse(response, capacityWait);
          bodyOwnsCapacityWait = true;
          return wrapped;
        }
        return response;
      }

      // Global combo timeout: return aggregated error immediately, skipping set retries.
      if (state.comboExpired) {
        const summary = buildRedactedSummary(state.comboErrors);
        const msg =
          `Combo global timeout (${extra.comboTimeoutMs}ms) after ${state.recordedAttempts}/${state.orderedTargets.length} targets` +
          (state.comboErrors.length > 0 ? ` | tried: ${summary}` : "");
        const latencyMs = Date.now() - deps.startTime;
        if (state.recordedAttempts === 0) {
          recordComboRequest(deps.combo.name, null, {
            success: false,
            latencyMs,
            fallbackCount: state.fallbackCount,
            strategy: deps.strategy,
          });
        }
        notifyWebhookEvent("request.failed", {
          combo: deps.combo.name,
          reason: "COMBO_TIMEOUT",
          latencyMs,
          fallbackCount: state.fallbackCount,
        });
        return capacityDeadlineCompletion(
          errorResponseWithComboDiagnostics(
            504,
            msg,
            buildComboDiag(state, deps.traceInvocationId, "combo_timeout"),
            {
              code: "COMBO_TIMEOUT",
              type: "server_error",
            }
          )
        );
      }

      // All models failed in this set try
      const latencyMs = Date.now() - deps.startTime;
      if (state.recordedAttempts === 0) {
        zeroAttemptSetRecorded = true;
        recordComboRequest(deps.combo.name, null, {
          success: false,
          latencyMs,
          fallbackCount: state.fallbackCount,
          strategy: deps.strategy,
        });
      }

      // Retry the entire set if more attempts remain -- unless the identical-
      // error streak already proved the request itself is malformed, in which
      // case a fresh set-try would just reproduce the same streak.
      if (
        setTry < extra.maxSetRetries &&
        !comboRequestMalformed &&
        !state.requestScopedFailureSeen
      ) {
        continue;
      }

      if (!state.lastStatus && state.recordedAttempts === 0 && extra.comboCooldownWaitEnabled) {
        const circuitOpenWait = resolveCircuitOpenWaitDecision({
          skippedForCircuitOpen: state.skippedForCircuitOpen,
          retryAfterMs: state.earliestCircuitOpenRetryMs,
          attempt: extra.comboCooldownAttempt.current,
          budgetLeftMs: resolveCooldownWaitBudgetMs(extra),
          settings: deps.resilienceSettings.comboCooldownWait,
        });
        if (circuitOpenWait.wait) {
          deps.log.info(
            "COMBO",
            `${deps.strategy} circuit-open wait: waiting ${Math.ceil(circuitOpenWait.waitMs / 1000)}s (reason=${circuitOpenWait.reason ?? "circuit_open"}) then retrying (attempt ${extra.comboCooldownAttempt.current + 1}/${deps.resilienceSettings.comboCooldownWait.maxAttempts})`
          );
          const retryFailure = await waitForRetry(circuitOpenWait.waitMs);
          if (retryFailure) return retryFailure;
          extra.comboCooldownAttempt.current += 1;
          extra.comboCooldownBudgetLeftMs.current = Math.max(
            0,
            extra.comboCooldownBudgetLeftMs.current - circuitOpenWait.waitMs
          );
          return dispatchWithCooldownRetry({ state, deps, extra });
        }
        // #16319: a model-scoped cooldown is not a circuit-open skip. With zero
        // dispatched attempts nothing populates state.earliestRetryAfter, so the
        // general cooldown wait below never runs and a single-target combo
        // crystallized a hint-less 503 while the lock had seconds left. Ask the
        // same helper the post-dispatch path uses — it derives the wait from each
        // target's own lock and rejects quota/auth/not-found reasons — and
        // re-dispatch when a SHORT transient lock is about to clear.
        const modelLockWait = resolveComboCooldownWaitDecision({
          targets: state.orderedTargets,
          earliestRetryAfter: null,
          attempt: extra.comboCooldownAttempt.current,
          budgetLeftMs: resolveCooldownWaitBudgetMs(extra),
          settings: deps.resilienceSettings.comboCooldownWait,
          lookupLock: (provider, connectionId, target) => {
            const rawModel = parseModel(target?.modelStr ?? "").model || "";
            if (!rawModel) return null;
            return lookupComboModelLockout(provider, connectionId, rawModel);
          },
          computeWaitMs: () => null,
        });
        if (modelLockWait.wait) {
          deps.log.info(
            "COMBO",
            `${deps.strategy} model-lock wait: waiting ${Math.ceil(modelLockWait.waitMs / 1000)}s (reason=${modelLockWait.reason ?? "model_lockout"}) then retrying (attempt ${extra.comboCooldownAttempt.current + 1}/${deps.resilienceSettings.comboCooldownWait.maxAttempts})`
          );
          const retryFailure = await waitForRetry(modelLockWait.waitMs);
          if (retryFailure) return retryFailure;
          extra.comboCooldownAttempt.current += 1;
          extra.comboCooldownBudgetLeftMs.current = Math.max(
            0,
            extra.comboCooldownBudgetLeftMs.current - modelLockWait.waitMs
          );
          return dispatchWithCooldownRetry({ state, deps, extra });
        }
      }

      // All set retries exhausted — return the final error
      // #10681: finalize the decision trace (all targets failed or skipped).
      finalizeComboTrace(deps.traceInvocationId, state.orderedTargets);
      if (!state.lastStatus) {
        if (state.recordedAttempts === 0) {
          // #6238: every compat-kept target was skipped as unavailable and NONE
          // was ever attempted (recordedAttempts === 0). Before crystallizing
          // 503, probe the targets the compat pre-filter rejected — a
          // compat-rejected-but-healthy provider is a valid last-resort
          // fallback tier, not a permanently dropped target. Mirrors the
          // round-robin guard; a null result keeps the existing error path.
          if (extra.compatRejectedTargets.length > 0) {
            const compatFallbackResult = await attemptCompatRejectedFallback(
              extra.compatRejectedTargets,
              deps.body,
              {
                handleSingleModel: deps.handleSingleModelWithTimeout,
                isModelAvailable: deps.isModelAvailable,
                isProviderInCooldown: (target) =>
                  deps.resilienceSettings.providerCooldown.enabled &&
                  Boolean(target.provider && target.provider !== "unknown") &&
                  isProviderInCooldown(
                    target.provider as string,
                    target.connectionId as string | undefined,
                    deps.resilienceSettings
                  ),
                log: deps.log,
                strategy: deps.strategy,
              }
            );
            if (compatFallbackResult) {
              if (!compatFallbackResult.ok) return compatFallbackResult;
              recordComboRequest(deps.combo.name, null, {
                success: true,
                latencyMs: Date.now() - deps.startTime,
                fallbackCount: state.fallbackCount,
                strategy: deps.strategy,
              });
              return compatFallbackResult;
            }
          }
          notifyWebhookEvent("request.failed", {
            combo: deps.combo.name,
            reason: "ALL_TARGETS_SKIPPED",
            latencyMs,
            fallbackCount: state.fallbackCount,
          });
          // Every target sat behind an OPEN breaker: say so, with the providers and
          // the time until the next probe, instead of the generic skip whose recovery
          // hint points at quota and top-ups the breaker has nothing to do with.
          const circuitOpen = state.skippedForCircuitOpen
            ? collectCircuitOpenExclusions(state.orderedTargets)
            : null;
          const circuitOpenResponse = circuitOpen
            ? buildAllTargetsCoolingDownResponse(circuitOpen)
            : null;
          if (circuitOpenResponse) {
            deps.log.warn(
              "COMBO",
              `All targets skipped: circuit breaker open — ${formatPreDispatchExclusions(circuitOpen!)}`
            );
            return circuitOpenResponse;
          }
          const quotaSkip = formatQuotaSkipMessage(
            collectQuotaWindowExclusions(state.orderedTargets)
          );
          // #16319: the connection-level scan misses model-scoped cooldowns —
          // fold the earliest transient model-lock expiry into the same hint.
          const skippedRateLimitedUntil = earliestIsoInstant(
            await computeEarliestSkippedRateLimitedUntil(state.orderedTargets),
            await computeEarliestSkippedModelLockUntil(state.orderedTargets)
          );
          const retryHuman = skippedRateLimitedUntil
            ? formatRetryAfter(toRetryAfterDisplayValue(skippedRateLimitedUntil))
            : "";
          return withQuotaExhaustionClassification(
            errorResponseWithComboDiagnostics(
              skippedRateLimitedUntil ? 429 : 503,
              [
                quotaSkip
                  ? `Service temporarily unavailable: all targets were skipped by pre-dispatch filters (${quotaSkip})`
                  : "Service temporarily unavailable: all targets were skipped by pre-dispatch filters",
                retryHuman,
              ]
                .filter(Boolean)
                .join(" "),
              buildComboDiag(state, deps.traceInvocationId, "all_targets_skipped"),
              {
                code: "ALL_TARGETS_SKIPPED",
                type: skippedRateLimitedUntil ? "rate_limit_error" : "service_unavailable",
                retryAfter: skippedRateLimitedUntil,
              }
            ),
            state.observedFailure ? state.allObservedFailuresQuota : null
          );
        }
        notifyWebhookEvent("request.failed", {
          combo: deps.combo.name,
          reason: "ALL_ACCOUNTS_INACTIVE",
          latencyMs,
          fallbackCount: state.fallbackCount,
        });
        recordComboFailure(deps.effectiveSessionId, deps.combo.name);
        const inactiveRateLimitedUntil = await computeEarliestSkippedRateLimitedUntil(
          state.orderedTargets
        );
        const retryHuman = inactiveRateLimitedUntil
          ? formatRetryAfter(toRetryAfterDisplayValue(inactiveRateLimitedUntil))
          : "";
        return errorResponseWithComboDiagnostics(
          inactiveRateLimitedUntil ? 429 : 503,
          ["Service temporarily unavailable: all upstream accounts are inactive", retryHuman]
            .filter(Boolean)
            .join(" "),
          buildComboDiag(state, deps.traceInvocationId, "all_accounts_inactive"),
          {
            code: "ALL_ACCOUNTS_INACTIVE",
            type: inactiveRateLimitedUntil ? "rate_limit_error" : "service_unavailable",
            retryAfter: inactiveRateLimitedUntil,
          }
        );
      }

      // #10501: derive the terminal HTTP status from the structured per-target
      // outcomes instead of `state.lastStatus` (whichever target happened to fail
      // LAST). A 4xx is preserved only when the request itself is genuinely
      // invalid across every eligible target; a heterogeneous mix of failure
      // classes (e.g. a quality failure + a sibling's 401) normalizes to a
      // 5xx-class status reflecting an infra/provider problem, not a client
      // error. See comboErrorAggregation.ts::resolveComboTerminalStatus.
      const terminal = resolveSkippedConnectionCooldownTerminal(
        resolveComboTerminalStatus(state.comboErrors, state.lastStatus),
        state
      );
      const status = terminal.status;
      state.earliestRetryAfter = terminal.retryAfter ?? state.earliestRetryAfter;
      // #10314: build the terminal message from the structured per-target
      // outcomes (each distinct class+reason listed separately) instead of
      // mashing a single state.lastError with raw `[model (status)]` markers. Connection
      // identifiers are redacted. Falls back to state.lastError when no target recorded
      // a structured outcome.
      const msg =
        formatComboOutcomes(state.comboErrors) || state.lastError || "All combo models unavailable";

      // Cooldown-aware retry: instead of crystallizing a transient failure, wait
      // out a SHORT cooldown and re-run the whole set loop. Guarded by the helper
      // (quota_exhausted/auth/not-found excluded, ceiling, attempts, budget).
      // MAX_GLOBAL_ATTEMPTS still bounds total dispatches. Available to ALL combo
      // strategies when enabled — entry is driven by earliestRetryAfter + the
      // real model-lockout reason, NOT by whichever target last overwrote
      // `status` (a later 403 must not skip the allow-list check for an earlier
      // 429's retry-after hint). SECURITY (see comboCooldownRetry.ts header): the
      // allow-list is the PRIMARY barrier and `maxWaitMs` only the SECOND one.
      // Hardcoding reason:"rate_limit" would drop the primary barrier and leave
      // only the ceiling — which does NOT cover a quota_exhausted lock carrying a
      // SHORT upstream retry-after. Model lockouts are recorded for all strategies,
      // so the real reason is always available.
      if (extra.comboCooldownWaitEnabled && state.earliestRetryAfter) {
        const decision: ResolveComboCooldownDecisionResult = resolveComboCooldownWaitDecision({
          targets: state.orderedTargets,
          earliestRetryAfter: state.earliestRetryAfter,
          attempt: extra.comboCooldownAttempt.current,
          budgetLeftMs: resolveCooldownWaitBudgetMs(extra),
          settings: deps.resilienceSettings.comboCooldownWait,
          // Key each lookup on the TARGET's own model: quota-share combos are
          // single-model/multi-account (so this is identical to the previous
          // state.orderedTargets[0] behavior), but heterogeneous combos carry a
          // different model per target.
          lookupLock: (provider, connectionId, target) => {
            const rawModel = parseModel(target?.modelStr ?? "").model || "";
            if (!rawModel) return null;
            return lookupComboModelLockout(provider, connectionId, rawModel);
          },
          computeWaitMs: (retryAfter) => computeClosestRetryAfter(retryAfter).waitMs,
        });

        if (decision.wait) {
          deps.log.info(
            "COMBO",
            `${deps.strategy} cooldown wait: ${msg} — waiting ${Math.ceil(
              decision.waitMs / 1000
            )}s (reason=${decision.reason ?? "?"}) then retrying (attempt ${
              extra.comboCooldownAttempt.current + 1
            }/${deps.resilienceSettings.comboCooldownWait.maxAttempts})`
          );
          const retryFailure = await waitForRetry(decision.waitMs);
          if (retryFailure) return retryFailure;
          extra.comboCooldownAttempt.current += 1;
          extra.comboCooldownBudgetLeftMs.current = Math.max(
            0,
            extra.comboCooldownBudgetLeftMs.current - decision.waitMs
          );
          return dispatchWithCooldownRetry({ state, deps, extra });
        }
      }

      // #10681: finalize the decision trace after cooldown retries are exhausted.
      finalizeComboTrace(deps.traceInvocationId, state.orderedTargets);
      // Retry-after decoration is separate from the wait decision above: only
      // rate-limit-class final statuses may carry a `(reset after ...)` suffix
      // (see unavailableRetryGate.ts — do not stitch a peer target's window onto
      // a config-class status like 403/422).
      if (state.earliestRetryAfter && isRetryAfterEligibleStatus(status)) {
        const retryHuman = formatRetryAfter(toRetryAfterDisplayValue(state.earliestRetryAfter));
        deps.log.warn("COMBO", `All models failed | ${msg} (${retryHuman})`);
        return withQuotaExhaustionClassification(
          unavailableResponse(status, msg, state.earliestRetryAfter, retryHuman),
          terminal.quotaExhausted
        );
      }

      // Silent-stop fix: bump the failure counter (pin clears on 3rd consecutive) and emit
      // `try-auto` recovery action via buildRecoveryHint so the OC plugin can show "→ Try
      // model: auto" instead of an opaque 5xx. We pass the upstream retry-after seconds to
      // the hint so the client can render a precise "wait Ns and retry" message.
      deps.log.warn("COMBO", `All models failed | ${msg}`);
      const { pinClearedNow } = recordComboFailure(deps.effectiveSessionId, deps.combo.name);
      if (pinClearedNow) {
        deps.log.info(
          "COMBO",
          `Auto-cleared session_model_history pin for combo "${deps.combo.name}" after ${COMBO_FAILURE_THRESHOLD} consecutive failures to break the silent-stop loop`
        );
      }
      const retryAfterSeconds = undefined;
      // #10966: when every observed failure was independently classified as quota/
      // balance exhaustion (isQuotaExhaustionResponse, tracked via state.observeFailure's
      // state.allObservedFailuresQuota accumulator), stamp a stable `quota_exhausted`
      // terminalReason instead of forwarding the raw upstream error string. The raw
      // string falls through buildRecoveryHint's default branch ("retry" / "failed
      // transiently"), which is actively misleading for a durable wallet/quota
      // exhaustion. Retrying the same combo will never refill it. #18360 adds the
      // same treatment for an all-authentication failure.
      const terminalReason = resolveAllFailedTerminalReason(state);
      return withQuotaExhaustionClassification(
        errorResponseWithComboDiagnostics(
          status,
          msg,
          buildComboDiag(state, deps.traceInvocationId, terminalReason, retryAfterSeconds),
          { code: resolveComboTerminalCode(state.comboErrors, status) }
        ),
        state.observedFailure ? state.allObservedFailuresQuota : null
      );
    }

    // Final fallback — when the dispatch returned without crystallizing a status (rare).
    // Surface the recovery hint with a generic retry recommendation so the client at least
    // gets a non-opaque message instead of "Combo routing completed without an upstream response".
    recordComboFailure(deps.effectiveSessionId, deps.combo.name);
    return errorResponseWithComboDiagnostics(
      503,
      "Combo routing completed without an upstream response",
      buildNoUpstreamResponseDiagnostics(state.orderedTargets.length)
    );
  } finally {
    if (!bodyOwnsCapacityWait) capacityWait?.close();
    // #11804: always release the loop-safety timer. Covering every exit path by
    // construction here means a future `return` added to this function cannot
    // silently reintroduce the leak.
    if (activeLoopSafetyTimer) {
      clearTimeout(activeLoopSafetyTimer);
      activeLoopSafetyTimer = null;
    }
  }
}
