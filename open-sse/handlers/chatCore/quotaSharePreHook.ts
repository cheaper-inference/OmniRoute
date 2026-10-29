/**
 * chatCore Quota Share enforcement PRE-hook (B/F7) and its combo soft-penalty propagation (G2)
 * (chatCore god-file decomposition, slice 2).
 *
 * Extracted byte-identically from handleChatCore. Runs after provider/model/credentials/apiKeyInfo
 * are fully resolved, before the dispatcher. Fail-open per B16: errors → allow. A `block` decision
 * finalizes the pending-request slot registered at handler entry and returns the 429 response the
 * handler sends; otherwise it returns null (after flagging a soft deprioritize on the current combo
 * candidate when the pool asks for it). The pending-request finalization is injected by the
 * handler (`finalizePendingRequest`) so this engine leaf takes no new open-sse → src import edge.
 */

import type { EnforceDecision } from "@/lib/quota/types";
// Type-only reference for the structured error result this hook's block path
// returns (see the `block` branch below). No runtime edge is created —
// createErrorResult is still loaded through the dynamic import there.
import type { createErrorResult } from "../../utils/error.ts";

type LoggerLike =
  { info?: (...args: unknown[]) => void; warn?: (...args: unknown[]) => void } | null | undefined;

export async function runQuotaSharePreHook({
  apiKeyInfo,
  credentials,
  provider,
  model,
  isCombo,
  comboStepId,
  comboExecutionKey,
  finalizePendingRequest,
  log,
}: {
  apiKeyInfo: { id?: string } | null | undefined;
  credentials: { connectionId?: string } | null | undefined;
  provider: string;
  model: string;
  isCombo: boolean;
  comboStepId: string | null;
  comboExecutionKey: string | null;
  finalizePendingRequest: () => void;
  log?: LoggerLike;
}): Promise<ReturnType<typeof createErrorResult> | null> {
  let quotaSoftDeprioritize = false;
  if (apiKeyInfo?.id && credentials?.connectionId) {
    try {
      const { enforceQuotaShare } = await import("@/lib/quota/enforce");
      const decision = await enforceQuotaShare({
        apiKeyId: apiKeyInfo.id,
        connectionId: credentials.connectionId,
        provider: provider ?? "unknown",
        // Resolved model id (post background-redirect / alias) — the same scope the
        // router/log use. Operators configure per-(key,model) caps against THIS id.
        model: model || undefined,
        estimatedCost: {},
      }).catch((err: unknown): EnforceDecision => {
        log?.warn?.(
          "QUOTA_SHARE",
          `enforceQuotaShare failed; fail-open: ${err instanceof Error ? err.message : String(err)}`
        );
        return { kind: "allow" as const };
      });

      if (decision.kind === "block") {
        const { createErrorResult } = await import("../../utils/error.ts");
        log?.warn?.(
          "QUOTA_SHARE",
          `[quotaShare] blocked apiKeyId=${apiKeyInfo.id} provider=${provider ?? "unknown"}: ${decision.reason}`
        );
        // Finalize the pending-request slot registered at handler entry — this
        // return path never reaches the upstream, and without the decrement the
        // pending detail lingers as an orphaned status-0 call-log row until the
        // reaper sweeps it (mirrors the other pre-upstream error returns).
        finalizePendingRequest();
        // #17132: return the SAME structured error shape as every other early
        // exit of handleChatCore — NOT a bare Response. The caller
        // (handleSingleModelChat) consumes this as a result object and reads
        // `result.response.headers`; a bare Response made that access throw a
        // TypeError and crashed the request as a 500/502 before the clean 429
        // could reach the client. `errorCode: "quota_share_blocked"` is the
        // per-key signal the 429 account-fallback machinery keys on: a key
        // hitting its own cap must never cool down the shared connection,
        // poison the quota cache or trip the provider breaker.
        return createErrorResult(
          429,
          decision.reason,
          decision.retryAfterSeconds ? decision.retryAfterSeconds * 1000 : undefined,
          "quota_share_blocked"
        );
      }

      if (decision.kind === "allow" && decision.deprioritize) {
        quotaSoftDeprioritize = true;
        log?.info?.(
          "QUOTA_SHARE",
          `[quotaShare] soft deprioritize active for apiKeyId=${apiKeyInfo.id} provider=${provider ?? "unknown"}`
        );
      }
    } catch (err) {
      // Outer fail-open guard — should not be reached (inner .catch covers it)
      log?.warn?.(
        "QUOTA_SHARE",
        `[quotaShare] enforceQuotaShare unexpected error; fail-open: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
  // G2: Propagate soft penalty to the current candidate so combo scoring can deprioritize.
  if (quotaSoftDeprioritize && isCombo && comboStepId) {
    try {
      const { setCandidateQuotaSoftPenalty } = await import("../../services/combo");
      setCandidateQuotaSoftPenalty(comboExecutionKey, comboStepId, true);
    } catch (err) {
      log?.warn?.(
        "QUOTA_SHARE",
        `[quotaShare] could not set soft penalty on candidate: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
  return null;
}
