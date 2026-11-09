/**
 * Streaming routing event (feedback foundation) with the real per-request cost.
 *
 * The routing event for a completed stream used to be emitted with `cost: null`. The real
 * cost needs an asynchronous pricing lookup, so the event is built and emitted only after it
 * lands — exactly once, with the cost, or `null` when there is no usage, the lookup rejects or
 * the result is not a finite number. Fire-and-forget: it never throws to the caller and never
 * blocks the stream. Feeds the quality tracker + optional OTel exporter (gen_ai.usage.cost).
 */

import {
  createRoutingEvent,
  emitRoutingEvent,
  outcomeFromStatus,
} from "../../services/routing/index.ts";
import { routingFinishReason } from "./routingFinishReason.ts";

type CostResult = number | { costUsd: number };

type CostResolver = (
  provider: string,
  model: string,
  usage: Record<string, number | undefined>,
  options: { serviceTier?: string }
) => Promise<CostResult>;

export type StreamingRoutingEventArgs = {
  requestId: string;
  provider: string | null | undefined;
  model: string | null | undefined;
  isCombo?: boolean;
  comboStrategy?: string | null;
  startTime: number;
  ttft?: number | null;
  streamItlMs?: number | null;
  streamUsage: unknown;
  normalizedStreamStatus: number;
  streamErrorCode?: string | null;
  streamResponseBody?: unknown;
  connectionId?: string | null;
  apiKeyId?: string | null;
  serviceTier?: string;
  calculateCost: CostResolver;
  /** Test seam: receives the built event instead of the real emitter. */
  emit?: (event: ReturnType<typeof createRoutingEvent>) => void;
};

function finiteTokens(usage: unknown, key: string): number | null {
  if (!usage || typeof usage !== "object") return null;
  const value = (usage as Record<string, unknown>)[key];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function nonNegative(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}

function streamOutcome(status: number, errorCode: string | null | undefined) {
  if (status === 200) return "success" as const;
  if (errorCode === "stream_interrupted" || errorCode === "aborted") {
    return "stream_interrupted" as const;
  }
  return outcomeFromStatus(status);
}

function buildEvent(args: StreamingRoutingEventArgs, cost: number | null) {
  return createRoutingEvent({
    requestId: args.requestId,
    provider: args.provider || "unknown",
    model: args.model || "unknown",
    strategy: args.isCombo ? (args.comboStrategy ?? "combo") : "direct",
    latencyMs: Date.now() - args.startTime,
    ttftMs: nonNegative(args.ttft),
    itlMs: nonNegative(args.streamItlMs),
    inputTokens: finiteTokens(args.streamUsage, "prompt_tokens"),
    outputTokens: finiteTokens(args.streamUsage, "completion_tokens"),
    cost,
    retries: 0,
    fallbackUsed: false, // combo-level fallback tracked by decisionTrace
    outcome: streamOutcome(args.normalizedStreamStatus, args.streamErrorCode),
    status: args.normalizedStreamStatus,
    finishReason: routingFinishReason(args.streamResponseBody),
    connectionId: args.connectionId ?? null,
    apiKeyId: args.apiKeyId ?? null,
  });
}

function safeEmit(args: StreamingRoutingEventArgs, cost: number | null): void {
  try {
    const event = buildEvent(args, cost);
    if (args.emit) args.emit(event);
    else void emitRoutingEvent(event);
  } catch {
    // fire-and-forget: a failing routing event must never reach the stream
  }
}

export function emitStreamingRoutingEvent(args: StreamingRoutingEventArgs): void {
  const usage = args.streamUsage;
  if (!usage || typeof usage !== "object") {
    safeEmit(args, null);
    return;
  }

  let lookup: Promise<CostResult>;
  try {
    lookup = args.calculateCost(
      args.provider || "unknown",
      args.model || "unknown",
      usage as Record<string, number | undefined>,
      { serviceTier: args.serviceTier }
    );
  } catch {
    safeEmit(args, null);
    return;
  }

  lookup
    .then(
      (resolved) => {
        const cost = typeof resolved === "number" ? resolved : resolved?.costUsd;
        return typeof cost === "number" && Number.isFinite(cost) ? cost : null;
      },
      () => null
    )
    .then((cost) => safeEmit(args, cost));
}
