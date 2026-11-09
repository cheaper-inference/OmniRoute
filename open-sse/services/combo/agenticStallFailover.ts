/**
 * Combo failover for a target that stalled mid agentic turn (#13954), behind the opt-in
 * OMNIROUTE_AGENTIC_STALL_FAILOVER flag. `agenticStall.ts` decides what a stall is; this
 * module decides what the combo does about it.
 *
 * Same shape as a cut stream (`truncatedStreamFailover.ts`) and for the same reason: the
 * target served a healthy 200, so this is an attempt failure, not a provider or model
 * health signal. It moves the turn to the next target and trips neither the provider
 * circuit breaker, a connection cooldown, nor a model lockout.
 *
 * The stalled answer is held, not discarded: when no later target succeeds, the combo
 * returns it. The classifier is a heuristic, and turning a turn it misread into a 502 on
 * every member is the failure it must never cause. A false positive costs one retry.
 *
 * Nothing is inspected when there is nowhere to fail over to: the last target's answer is
 * returned as it would be with the flag off, without holding its stream back to read it.
 *
 * Scope: requests carrying `messages` (OpenAI chat, Anthropic). A Responses API `input`
 * request is not classified, and neither is a model unit of a nested combo in `execute`
 * mode (`runtimeUnits.ts`); a combo-ref unit runs through its own combo and is covered there.
 */
import { AGENTIC_STALL_SIGNATURE, classifyAgenticStallResponse } from "./agenticStall.ts";
import type { ComboErrorEntry } from "./comboErrorAggregation.ts";
import { recordHeldAttemptFailure } from "./truncatedStreamFailover.ts";
import type { ComboLogger } from "./types.ts";

export const AGENTIC_STALL_COMBO_REASON =
  "stopped with narration instead of the next tool call on a tool-result turn";

/** A stalled attempt the combo should fail over from. */
export async function isAgenticStallComboAttempt(opts: {
  body: unknown;
  result: Response;
  modelStr: string;
  hasNextTarget: boolean;
  protectedPriorityTarget?: boolean;
  log: ComboLogger;
}): Promise<boolean> {
  // A protected priority target only falls back on quota exhaustion; keep its answer.
  if (!opts.hasNextTarget || opts.protectedPriorityTarget) return false;
  const verdict = await classifyAgenticStallResponse({ body: opts.body, response: opts.result });
  if (!verdict) return false;
  opts.log.debug?.("COMBO", `Agentic stall on ${opts.modelStr}: ${verdict.detail}`);
  return true;
}

/** The per-target outcome a stall adds to the combo's aggregated terminal message. */
export function agenticStallOutcome(modelStr: string): ComboErrorEntry {
  return {
    model: modelStr,
    status: 502,
    error: AGENTIC_STALL_COMBO_REASON,
    kind: "quality",
    code: AGENTIC_STALL_SIGNATURE,
  };
}

/** Record the stall as a retryable target failure and hold its answer. */
export function recordAgenticStallAttempt(
  opts: Omit<Parameters<typeof recordHeldAttemptFailure>[0], "reason" | "code" | "kind">
): void {
  opts.deps.log.warn(
    "COMBO",
    `Model ${opts.modelStr} ${AGENTIC_STALL_COMBO_REASON} — trying the next target`
  );
  recordHeldAttemptFailure({
    ...opts,
    reason: AGENTIC_STALL_COMBO_REASON,
    code: AGENTIC_STALL_SIGNATURE,
    kind: "quality",
  });
}
