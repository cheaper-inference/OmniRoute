/**
 * chatCore streaming usage-stats persistence (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's onStreamComplete: records per-request usage analytics for a
 * finished streaming response — the fire-and-forget `saveRequestUsage` row when `usage` is known,
 * the per-api-key rpm/tpm quota counters for every stream that counts as a client request (aborted
 * and failed ones included, from their partial usage), and the model-level token limit only on a
 * 200 stream. Side-effect only (no handler state is mutated, nothing is returned); best-effort,
 * every write swallows its own errors. The compression usage-receipt attach stays in the handler
 * (it is a handler-bound closure).
 */

import { saveRequestUsage } from "@/lib/usageDb";
import { recordKeyQuotaUsage } from "@/domain/keyQuota";
import { recordTokenUsage } from "../../services/tokenLimitCounter.ts";
import { computeBillableTokens } from "./upstreamTimeouts.ts";
import { type EffectiveServiceTier } from "./serviceTier.ts";
import { usageRowModels } from "../../services/connectionModelMap.ts";
import { type AgentContext } from "./agentContext.ts";

export type RecordStreamingUsageStatsContext = {
  provider: string | null | undefined;
  model: string | null | undefined;
  requestedModel?: string | null | undefined;
  actualModel?: string | null | undefined;
  streamStatus: number;
  startTime: number;
  ttft: number;
  streamErrorCode: string | null | undefined;
  connectionId: string | null | undefined;
  apiKeyInfo: { id?: string | null; name?: string | null } | null | undefined;
  effectiveServiceTier: EffectiveServiceTier;
  isCombo: boolean;
  comboStrategy: string | null | undefined;
  endpoint?: string | null | undefined;
  cpaAuthIndex?: string | null | undefined;
  agentContext?: AgentContext | null;
  /** Tokens generated before a 499 / mid-stream failure (usage is null then). */
  partialUsage?: unknown;
  /** Whether the stream carried output, so a combo cannot have failed over from it. */
  emittedOutput?: boolean;
};

function persistStreamingUsageRow(usage: object, ctx: RecordStreamingUsageStatsContext): void {
  const {
    provider,
    model,
    requestedModel,
    actualModel,
    streamStatus,
    startTime,
    ttft,
    streamErrorCode,
  } = ctx;
  saveRequestUsage({
    provider: provider || "unknown",
    ...usageRowModels(model, requestedModel, actualModel),
    tokens: usage,
    status: String(streamStatus),
    success: streamStatus === 200,
    latencyMs: Date.now() - startTime,
    timeToFirstTokenMs: ttft,
    errorCode: streamStatus === 200 ? null : streamErrorCode || String(streamStatus),
    timestamp: new Date().toISOString(),
    connectionId: ctx.connectionId || undefined,
    apiKeyId: ctx.apiKeyInfo?.id || undefined,
    apiKeyName: ctx.apiKeyInfo?.name || undefined,
    serviceTier: ctx.effectiveServiceTier,
    comboStrategy: ctx.isCombo ? ctx.comboStrategy || undefined : undefined,
    endpoint: ctx.endpoint || undefined,
    cpaAuthIndex: ctx.cpaAuthIndex || undefined,
    agentContext: ctx.agentContext ?? null,
  }).catch((err) => {
    console.error("Failed to save usage stats:", err.message);
  });
}

function recordStreamingBillableTokens(
  usage: object | null,
  ctx: RecordStreamingUsageStatsContext
): void {
  if (!ctx.apiKeyInfo?.id) return;
  try {
    const billable = usage ? computeBillableTokens(usage) : 0;
    // Key-quota rpm/tpm advance on every stream, aborted or failed ones too: the
    // provider already generated the partial tokens, and the apiKeyPolicy gate
    // must see the request, or a key that aborts after the first token is never counted.
    recordKeyQuotaUsage(ctx.apiKeyInfo.id, billable);
    if (ctx.streamStatus === 200 && billable > 0)
      recordTokenUsage(
        ctx.apiKeyInfo.id,
        ctx.provider || "unknown",
        ctx.model || "unknown",
        billable,
        ctx.startTime
      );
  } catch {
    // never block the stream on counter recording
  }
}

export function recordStreamingUsageStats(
  usage: unknown,
  ctx: RecordStreamingUsageStatsContext
): void {
  const isObject = (v: unknown): v is object => !!v && typeof v === "object";
  // The failure finalizer already writes the 499/5xx usage row from partialUsage,
  // so only a real `usage` persists a row here; the counters take either.
  if (isObject(usage)) persistStreamingUsageRow(usage, ctx);
  // A combo reads each target's stream and fails over from a rejected one, and that attempt
  // ends here too. With no usage and no output it may be one: the target that answers counts
  // the client's request, so counting this attempt as well would use up the key's rpm early.
  if (ctx.isCombo && !isObject(usage) && !ctx.emittedOutput) return;
  const counted = isObject(usage) ? usage : isObject(ctx.partialUsage) ? ctx.partialUsage : null;
  recordStreamingBillableTokens(counted, ctx);
}
