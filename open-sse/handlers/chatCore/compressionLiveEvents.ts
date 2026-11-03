/**
 * chatCore live compression dashboard events (chatCore god-file decomposition, slice 2).
 *
 * Extracted byte-identically from handleChatCore's prompt-compression pipeline: the per-engine
 * `compression.step` progress event (F3.3) and the `compression.completed` event (U5), both
 * emitted on the event bus and forwarded to the dashboard live socket. Best-effort — neither may
 * ever fail the request; a throwing bus is swallowed for steps and debug-logged for completion.
 * The event-bus `emit` (src/lib/events) is injected by the handler so this engine leaf takes no
 * new open-sse → src import edge.
 */

import { ensureEngineBreakdown } from "../../services/compression/engineBreakdown.ts";
import type { AdaptiveTelemetry } from "../../services/compression/adaptiveCompression/types.ts";
import type { StackedCompressionStep } from "../../services/compression/strategySelector.ts";
import type { CompressionStats } from "../../services/compression/types.ts";
import { forwardDashboardEventToLiveWs } from "./telemetryHelpers.ts";

type LoggerLike = { debug?: (...args: unknown[]) => void } | null | undefined;
/** Structural mirrors of src/lib/events CompressionStepPayload / CompressionCompletedPayload. */
type CompressionStepEvent = {
  requestId: string;
  comboId: string | null;
  mode: string;
  stepIndex: number;
  totalSteps: number;
  engine: string;
  state: "running" | "done" | "skipped";
  originalTokens: number;
  compressedTokens: number;
  savingsPercent: number;
  durationMs?: number;
  timestamp: number;
};
type CompressionCompletedEvent = {
  requestId: string;
  comboId: string | null;
  mode: string;
  originalTokens: number;
  compressedTokens: number;
  savingsPercent: number;
  engineBreakdown: ReturnType<typeof ensureEngineBreakdown>;
  validationWarnings?: string[];
  fallbackApplied?: boolean;
  timestamp: number;
};
/** The typed event-bus `emit`, narrowed to the two compression events. */
type EmitFn = {
  (event: "compression.step", payload: CompressionStepEvent): unknown;
  (event: "compression.completed", payload: CompressionCompletedEvent): unknown;
};

export function emitCompressionStepEvent(
  emit: EmitFn,
  traceId: string,
  mode: string,
  s: StackedCompressionStep
): void {
  try {
    const stepPayload = {
      requestId: traceId,
      comboId: null,
      mode,
      stepIndex: s.stepIndex,
      totalSteps: s.totalSteps,
      engine: s.engine,
      state: s.state,
      originalTokens: s.originalTokens,
      compressedTokens: s.compressedTokens,
      savingsPercent: s.savingsPercent,
      ...(s.durationMs !== undefined ? { durationMs: s.durationMs } : {}),
      timestamp: Date.now(),
    };
    emit("compression.step", stepPayload);
    void forwardDashboardEventToLiveWs("compression.step", stepPayload);
  } catch (_stepErr) {
    // best-effort live event — never fail the request
  }
}

export function emitCompressionCompletedEvent({
  emit,
  traceId,
  mode,
  stats,
  adaptiveTelemetry,
  log,
}: {
  emit: EmitFn;
  traceId: string;
  mode: string;
  stats: CompressionStats;
  adaptiveTelemetry: AdaptiveTelemetry | null;
  log?: LoggerLike;
}): void {
  try {
    const compressionCompletedPayload = {
      requestId: traceId,
      comboId: stats.compressionComboId ?? null,
      mode,
      originalTokens: stats.originalTokens,
      compressedTokens: stats.compressedTokens,
      savingsPercent: stats.savingsPercent,
      // Single-engine modes leave engineBreakdown empty; synthesize a 1-entry
      // breakdown so the studio shows a real engine node instead of an empty pipeline.
      engineBreakdown: ensureEngineBreakdown(stats),
      validationWarnings: stats.validationWarnings,
      fallbackApplied: stats.fallbackApplied,
      ...(adaptiveTelemetry ? { adaptive: adaptiveTelemetry } : {}),
      timestamp: Date.now(),
    };
    emit("compression.completed", compressionCompletedPayload);
    void forwardDashboardEventToLiveWs("compression.completed", compressionCompletedPayload);
  } catch (_emitErr) {
    // never propagate into the hot path — but log like the sibling
    // fire-and-forget blocks so a throwing event bus isn't fully silent.
    log?.debug?.(
      "COMPRESSION",
      "compression.completed emit skipped: " +
        (_emitErr instanceof Error ? _emitErr.message : String(_emitErr))
    );
  }
}
