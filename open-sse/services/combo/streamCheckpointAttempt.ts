/**
 * Attempt-side wiring of the combo stream resumption (`streamCheckpointRecovery.ts`).
 *
 * The attempt loop hands every successful attempt to `wrapComboAttemptForResume`. Unless the
 * resumption applies to it, that returns the attempt untouched. It applies only when all of
 * these hold: the operator turned on `COMBO_STREAM_CHECKPOINT_ENABLED`; this combo's own config
 * sets `resumeStreamFromCheckpoint: true` and lists providers in `reasoningCheckpointProviders`
 * (global combo defaults never grant either); the client asked for a stream; the request is a
 * plain single-choice Chat Completions history of text (no tools, tool results, media, bound
 * session or pinned model); dispatch is sequential (no hedging, no protected priority target);
 * and a later target of the combo belongs to a listed provider.
 *
 * `dispatchHeldReasoning` marks the dispatch of such an attempt, so the same-target
 * continuation inside the upstream handler yields to the combo (the combo resumes the cut at
 * the next target, never both).
 *
 * The replacement is one dispatch to the next admitted, listed target: the same gates the loop
 * uses, one slot of the shared attempt budget, no combo, family or transport retry, and the
 * client's abort signal linked through.
 */
import { isRegisteredFeatureFlagEnabled } from "../../utils/registeredFeatureFlag.ts";
import {
  expandComboSystemPromptIfPresent,
  resolveTargetFingerprint,
} from "../comboAgentMiddleware.ts";
import { recordComboRequest } from "../comboMetrics.ts";
import { isEventStreamResponse } from "./firstOutputStream.ts";
import { markUpstreamOnlyBody } from "./requestPersistence.ts";
import { clampGlobalAttempts, toRecordedTarget } from "./comboPredicates.ts";
import {
  COMBO_CHECKPOINT_RESUME_FIELD,
  makeCheckpointRequest,
  type ReasoningCheckpoint,
} from "./reasoningCheckpoint.ts";
import {
  isPlainChatCompletionsText,
  listedCheckpointProviders,
  providerIsListed,
  sequentialDispatch,
} from "./reasoningHoldbackAttempt.ts";
import {
  wrapComboStreamWithCheckpoint,
  type OpenNextComboStream,
  type StreamResumeOutcome,
} from "./streamCheckpointRecovery.ts";
import type {
  AttemptLoopDeps,
  AttemptLoopState,
  ExecuteTargetResult,
  GateDecision,
} from "./attemptLoopTypes.ts";
import type { ResolvedComboTarget, SingleModelTarget } from "./types.ts";

export const COMBO_STREAM_CHECKPOINT_FLAG = "COMBO_STREAM_CHECKPOINT_ENABLED";

/** Bytes of delivered text and reasoning kept as the checkpoint. */
export const STREAM_CHECKPOINT_MAX_BYTES = 64 * 1024;
/** Bytes accepted from the replacement stream. */
export const STREAM_REPLACEMENT_MAX_BYTES = 64 * 1024;
/** Time, from the cut, the whole replacement may take. */
export const STREAM_RESUME_TIMEOUT_MS = 30_000;

type ResumeDeps = Pick<
  AttemptLoopDeps,
  | "body"
  | "combo"
  | "config"
  | "clientRequestedStream"
  | "effectiveSessionId"
  | "sticky"
  | "strategy"
  | "sourceFormat"
>;

type EvaluateGates = (opts: {
  index: number;
  state: AttemptLoopState;
  deps: AttemptLoopDeps;
}) => Promise<GateDecision>;

/** The providers allowed to take over a cut, or null when the resumption does not apply. */
export function resolveStreamCheckpointResume(
  deps: ResumeDeps,
  target: SingleModelTarget,
  protectedPriorityTarget: boolean
): Set<string> | null {
  if (!isRegisteredFeatureFlagEnabled(COMBO_STREAM_CHECKPOINT_FLAG)) return null;
  const providers = listedCheckpointProviders(deps.combo, "resumeStreamFromCheckpoint");
  if (!providers || providers.size === 0) return null;
  if (protectedPriorityTarget || !deps.clientRequestedStream) return null;
  if (deps.effectiveSessionId || deps.sticky?.stuck || !sequentialDispatch(deps)) return null;
  if (deps.sourceFormat && deps.sourceFormat !== "openai") return null;
  if ("modelPinned" in target && target.modelPinned) return null;
  return isPlainChatCompletionsText(deps.body) ? providers : null;
}

function hasListedFollower(
  state: Pick<AttemptLoopState, "orderedTargets">,
  index: number,
  providers: Set<string>
): boolean {
  return state.orderedTargets
    .slice(index + 1)
    .some((next) => providerIsListed(providers, next, next.modelStr));
}

/**
 * The body to dispatch for `index`: the same one, marked so the upstream handler leaves a cut
 * to the combo, when the resumption applies and a listed target could take over.
 */
export function markCheckpointResumeBody(
  opts: {
    index: number;
    deps: ResumeDeps;
    state: Pick<AttemptLoopState, "orderedTargets">;
    protectedPriorityTarget: boolean;
  },
  body: Record<string, unknown>,
  target: SingleModelTarget
): Record<string, unknown> {
  const providers = resolveStreamCheckpointResume(opts.deps, target, opts.protectedPriorityTarget);
  if (!providers || !hasListedFollower(opts.state, opts.index, providers)) return body;
  return { ...body, [COMBO_CHECKPOINT_RESUME_FIELD]: true };
}

type ReplacementContext = {
  index: number;
  state: AttemptLoopState;
  deps: AttemptLoopDeps;
  providers: Set<string>;
  evaluateGates: EvaluateGates;
};

function replacementBody(
  deps: AttemptLoopDeps,
  next: ResolvedComboTarget,
  checkpoint: ReasoningCheckpoint
): Record<string, unknown> | null {
  const provider = next.provider;
  const base = expandComboSystemPromptIfPresent({ ...deps.body }, deps.combo, {
    modelId: next.modelStr,
    providerId: provider && provider !== "unknown" ? provider : "",
    account:
      typeof next.label === "string" && next.label.trim().length > 0 ? next.label.trim() : "",
    fingerprint: resolveTargetFingerprint(next) ?? "",
  });
  return makeCheckpointRequest(base, checkpoint, "after-cut");
}

/** The first later target that is listed and admitted by the loop's own gates. */
async function admittedFollower(
  ctx: ReplacementContext,
  signal: AbortSignal
): Promise<{
  index: number;
  target: ResolvedComboTarget;
  gate: GateDecision & { kind: "proceed" };
} | null> {
  for (let j = ctx.index + 1; j < ctx.state.orderedTargets.length; j++) {
    if (signal.aborted) return null;
    const target = ctx.state.orderedTargets[j];
    if (!providerIsListed(ctx.providers, target, target.modelStr)) continue;
    const gate = await ctx.evaluateGates({ index: j, state: ctx.state, deps: ctx.deps });
    if (gate.kind === "proceed" && !gate.protectedPriorityTarget) {
      return { index: j, target, gate };
    }
  }
  return null;
}

function createOpenNext(ctx: ReplacementContext): OpenNextComboStream {
  const { state, deps } = ctx;
  return async (checkpoint, signal) => {
    const follower = await admittedFollower(ctx, signal);
    if (!follower || signal.aborted) return null;
    // One slot of the attempt budget shared with every other dispatch of this request.
    if (state.globalAttempts >= clampGlobalAttempts(deps.config.maxGlobalAttempts)) return null;
    const built = replacementBody(deps, follower.target, checkpoint);
    if (!built) return null;
    // The body quotes the delivered text and the draft: upstream only, never persisted.
    const body = markUpstreamOnlyBody(built);
    state.globalAttempts++;
    state.comboAttemptOrder.push({
      provider: follower.target.provider ?? "unknown",
      model: follower.target.modelStr,
    });
    deps.log.info(
      "COMBO",
      `Stream from ${state.orderedTargets[ctx.index].modelStr} was cut after ${checkpoint.text.length} chars of answer — resuming on ${follower.target.modelStr}`
    );
    // The replacement is judged by the wrapper, not by a first-output gate or a retry loop:
    // no transport retry, and the client's abort reaches it through `signal`.
    const dispatched = await deps.handleSingleModelWithTimeout(body, follower.target.modelStr, {
      ...follower.gate.targetForAttempt,
      effectiveComboStrategy: deps.strategy,
      failoverBeforeRetry: true,
      modelAbortSignal: signal,
    } as SingleModelTarget);
    recordReplacementDispatch(ctx, follower.target, dispatched.ok);
    return dispatched;
  };
}

function recordReplacementDispatch(
  ctx: ReplacementContext,
  target: ResolvedComboTarget,
  ok: boolean
): void {
  ctx.state.recordedAttempts++;
  recordComboRequest(ctx.deps.combo.name, target.modelStr, {
    success: ok,
    latencyMs: Date.now() - ctx.deps.startTime,
    fallbackCount: ctx.state.fallbackCount,
    strategy: ctx.deps.strategy,
    target: toRecordedTarget(target),
  });
}

function logOutcome(deps: AttemptLoopDeps, modelStr: string, outcome: StreamResumeOutcome): void {
  if (outcome.kind === "resumed") {
    deps.log.info(
      "COMBO",
      `Resumed the cut stream of ${modelStr}: ${outcome.suffixChars} chars after a ${outcome.checkpointChars}-char prefix`
    );
    return;
  }
  const detail = outcome.detail ? `: ${outcome.detail}` : "";
  deps.log.warn(
    "COMBO",
    `Could not resume the cut stream of ${modelStr} (${outcome.reason}${detail}) — the client keeps the prefix and the original failure`
  );
}

/**
 * Hand the combo's successful attempt to the stream resumption when it applies.
 *
 * @param result what the attempt returned
 * @param ctx the attempt's index, loop state and deps, the protected-target verdict, and the
 *   loop's gate evaluator (the replacement is admitted by the same gates)
 */
export function wrapComboAttemptForResume(
  result: ExecuteTargetResult,
  ctx: {
    index: number;
    state: AttemptLoopState;
    deps: AttemptLoopDeps;
    targetForAttempt: ResolvedComboTarget;
    protectedPriorityTarget: boolean;
    evaluateGates: EvaluateGates;
  }
): ExecuteTargetResult {
  const response = result?.ok ? result.response : undefined;
  if (!response) return result;
  const { deps, state, index } = ctx;
  const providers = resolveStreamCheckpointResume(
    deps,
    ctx.targetForAttempt,
    ctx.protectedPriorityTarget
  );
  if (!providers || !hasListedFollower(state, index, providers)) return result;
  if (!isEventStreamResponse(response)) return result;
  const modelStr = state.orderedTargets[index].modelStr;
  const wrapped = wrapComboStreamWithCheckpoint(response, {
    signal: deps.signal ?? new AbortController().signal,
    resumeTimeoutMs: STREAM_RESUME_TIMEOUT_MS,
    maxCheckpointBytes: STREAM_CHECKPOINT_MAX_BYTES,
    maxReplacementBytes: STREAM_REPLACEMENT_MAX_BYTES,
    openNext: createOpenNext({
      index,
      state,
      deps,
      providers,
      evaluateGates: ctx.evaluateGates,
    }),
    onOutcome: (outcome) => logOutcome(deps, modelStr, outcome),
  });
  return { ok: true, response: wrapped };
}
