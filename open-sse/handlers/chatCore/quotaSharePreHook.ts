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
}): Promise<Response | null> {
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
        const { buildErrorBody } = await import("../../utils/error.ts");
        log?.warn?.(
          "QUOTA_SHARE",
          `[quotaShare] blocked apiKeyId=${apiKeyInfo.id} provider=${provider ?? "unknown"}: ${decision.reason}`
        );
        // Finalize the pending-request slot registered at handler entry — this
        // return path never reaches the upstream, and without the decrement the
        // pending detail lingers as an orphaned status-0 call-log row until the
        // reaper sweeps it (mirrors the other pre-upstream error returns).
        finalizePendingRequest();
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (decision.retryAfterSeconds) {
          headers["Retry-After"] = String(decision.retryAfterSeconds);
        }
        return new Response(JSON.stringify(buildErrorBody(429, decision.reason)), {
          status: 429,
          headers,
        });
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
