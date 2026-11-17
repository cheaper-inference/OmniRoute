import { recordComboDecision, finalizeComboTrace, type ComboSkipReason } from "./decisionTrace.ts";

/**
 * #10681: the round-robin leg is a separate execution path from the attempt
 * loop, so it has to report its own decisions or an invocation trace ends up
 * empty (decisions=0) while the request visibly tried several targets.
 *
 * Kept out of roundRobinCombo.ts because that file is frozen at its current
 * size: the leg needs the same recording at seven call sites and none of them
 * can be added without pushing the dispatcher past its ceiling.
 */
export interface RoundRobinTrace {
  skip(target: { executionKey: string }, modelStr: string, reason: ComboSkipReason): void;
  dispatched(target: { executionKey: string }, modelStr: string): void;
  /** Idempotent: targets with no decision are recorded as not_reached. */
  finalize(targets: Array<{ executionKey: string; modelStr: string }>): void;
}

export function createRoundRobinTrace(invocationId?: string): RoundRobinTrace {
  const off: RoundRobinTrace = {
    skip: () => {},
    dispatched: () => {},
    finalize: () => {},
  };
  if (!invocationId) return off;
  const traceId = invocationId;
  return {
    skip(target, modelStr, reason) {
      recordComboDecision(traceId, {
        step: target.executionKey,
        target: modelStr,
        decision: "skipped_before_dispatch",
        reason,
      });
    },
    dispatched(target, modelStr) {
      recordComboDecision(traceId, {
        step: target.executionKey,
        target: modelStr,
        decision: "dispatched",
      });
    },
    finalize(targets) {
      finalizeComboTrace(traceId, targets);
    },
  };
}
