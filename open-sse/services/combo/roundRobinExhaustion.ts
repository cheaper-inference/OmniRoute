// The round-robin leg ends here when no target was ever dispatched: one 503 that explains why
// every target was filtered out. Kept out of roundRobinCombo.ts, which is frozen at its current
// size and carries the loop itself.
import { errorResponseWithComboDiagnostics } from "../../utils/error.ts";
import { recordComboRequest } from "../comboMetrics.ts";
import {
  collectQuotaWindowExclusions,
  formatQuotaSkipMessage,
  type QuotaSkipTarget,
} from "./quotaSkipDiagnostics.ts";

/**
 * `null` when the loop did see a status (the caller still owns that response); otherwise the
 * 503 describing an exhaustion that never reached a provider.
 */
export function roundRobinExhaustedResponse(
  filteredTargets: QuotaSkipTarget[],
  recordedAttempts: number | null,
  lastStatus: unknown
): Response | null {
  if (lastStatus) return null;

  if (recordedAttempts === 0) {
    const quotaExcluded = collectQuotaWindowExclusions(filteredTargets);
    const quotaSkip = formatQuotaSkipMessage(quotaExcluded);
    return errorResponseWithComboDiagnostics(
      503,
      quotaSkip
        ? `Service temporarily unavailable: all targets were skipped by pre-dispatch filters (${quotaSkip})`
        : "Service temporarily unavailable: all targets were skipped by pre-dispatch filters",
      {
        poolSize: filteredTargets.length,
        attempted: 0,
        excluded: quotaExcluded,
        attemptOrder: [],
        terminalReason: "all_targets_skipped",
      },
      { code: "ALL_TARGETS_SKIPPED", type: "service_unavailable" }
    );
  }

  return new Response(
    JSON.stringify({
      error: {
        message: "Service temporarily unavailable: all upstream accounts are inactive",
        type: "service_unavailable",
        code: "ALL_ACCOUNTS_INACTIVE",
      },
    }),
    { status: 503, headers: { "Content-Type": "application/json" } }
  );
}

/** The combo-level outcome for a round-robin request that never dispatched a model. */
export function recordRoundRobinRequest(
  comboName: string,
  ok: boolean,
  latencyMs: number,
  fallbackCount: number
): void {
  recordComboRequest(comboName, null, {
    success: ok,
    latencyMs,
    fallbackCount,
    strategy: "round-robin",
  });
}
