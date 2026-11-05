import { AsyncLocalStorage } from "node:async_hooks";
import { createHash, randomUUID } from "node:crypto";
import { resolveAntigravityModelId } from "../config/antigravityModelAliases.ts";

function normalizeAntigravityTimingModel(value: string): string {
  const normalized = value.trim().replace(/^(?:antigravity|agy)\//i, "").toLowerCase();
  if (!/^[a-z0-9_.:-]{1,160}$/.test(normalized)) return "unknown";
  return resolveAntigravityModelId(normalized);
}
import { isAntigravityPreResponseTimeout } from "./antigravityTimeout.ts";

type TimingContext = {
  connectionId: string;
  model: string;
  requestId: string;
  sends: number;
  emit: (event: Record<string, unknown>) => void;
};
const context = new AsyncLocalStorage<TimingContext>();
const MAX_ACCOUNTS = 1000;
const MAX_EVENTS_PER_ATTEMPT = 24;
// A forgotten/unconsumed successful response must not accumulate as inflight forever.
// This timeout affects observation only; it never aborts fetches or response streams.
const MAX_TIMING_OBSERVATION_MS = 300_000;
type AccountTiming = { inflight: number; lastFinishedAt: number | null };

/** Only allow actual Gemini output to set first delta; pings/errors/usage do not. */
export function hasAntigravityMeaningfulDelta(frame: string): boolean {
  for (const line of frame.split(/\r?\n/)) {
    if (!line.startsWith("data:")) continue;
    try {
      const parsed = JSON.parse(line.slice(5).trim()) as Record<string, unknown>;
      const response = (parsed.response ?? parsed) as Record<string, unknown>;
      if (!Array.isArray(response.candidates)) continue;
      for (const candidate of response.candidates) {
        const parts = candidate?.content?.parts;
        if (!Array.isArray(parts)) continue;
        if (parts.some((part) => (typeof part?.text === "string" && part.text.length > 0) ||
          (typeof part?.functionCall?.name === "string" && part.functionCall.name.length > 0) ||
          (typeof part?.inlineData?.data === "string" && part.inlineData.data.length > 0) ||
          part?.executableCode || part?.codeExecutionResult)) return true;
      }
    } catch { /* Partial, invalid or terminal frame: no measured delta. */ }
  }
  return false;
}

export class AntigravityTimingTracker {
  private accounts = new Map<string, AccountTiming>();
  constructor(
    private now: () => number = () => performance.now(),
    private maxObservationMs: number = MAX_TIMING_OBSERVATION_MS,
  ) {}

  async fetch(send: () => Promise<Response>, signal?: AbortSignal | null): Promise<Response> {
    const scope = context.getStore();
    if (!scope) return send();
    let account = this.accounts.get(scope.connectionId);
    if (!account) {
      if (this.accounts.size >= MAX_ACCOUNTS) {
        const idle = [...this.accounts].find(([, item]) => item.inflight === 0);
        if (!idle) return send();
        this.accounts.delete(idle[0]);
      }
      account = { inflight: 0, lastFinishedAt: null };
      this.accounts.set(scope.connectionId, account);
    }
    const started = this.now();
    const idleDurationMs = account.inflight > 0 ? 0 : account.lastFinishedAt === null
      ? null : Math.max(0, started - account.lastFinishedAt);
    const concurrentInflight = ++account.inflight;
    const physicalSend = ++scope.sends;
    let headersAt: number | null = null;
    let firstDeltaAt: number | null = null;
    let finished = false;
    let observationTimer: ReturnType<typeof setTimeout> | null = null;
    const event = (phase: string, extra: Record<string, unknown> = {}) => {
      if (physicalSend > MAX_EVENTS_PER_ATTEMPT / 3) return;
      // Correlation ids stay log fields, never metric labels. No URLs or payloads.
      const fields = {
        event: "antigravity_timing", phase, requestId: scope.requestId,
        account: createHash("sha256").update(scope.connectionId).digest("hex").slice(0, 16),
        model: normalizeAntigravityTimingModel(scope.model), physicalSend,
        idleDurationMs, concurrentInflight,
        dnsMs: null, connectMs: null, tlsMs: null,
        headerLatencyMs: headersAt === null ? null : headersAt - started,
        firstMeaningfulDeltaFromHeadersMs: firstDeltaAt === null || headersAt === null ? null : firstDeltaAt - headersAt,
        firstMeaningfulDeltaFromSendMs: firstDeltaAt === null ? null : firstDeltaAt - started,
        elapsedMs: Math.max(0, this.now() - started), ...extra,
      };
      try { scope.emit(fields); } catch { /* Diagnostics cannot change request behavior. */ }
    };
    const finish = (phase: string) => {
      if (finished) return;
      finished = true;
      if (observationTimer !== null) clearTimeout(observationTimer);
      account!.inflight--;
      account!.lastFinishedAt = this.now();
      signal?.removeEventListener("abort", onAbort);
      event(phase);
    };
    const abortPhase = () => (signal?.reason as { name?: string } | undefined)?.name === "TimeoutError"
      ? "upstream_deadline" : "caller_abort";
    const onAbort = () => finish(abortPhase());
    signal?.addEventListener("abort", onAbort, { once: true });
    // Bound *telemetry state*, not upstream execution. This also protects HTTP 200
    // streams that a caller abandons without reading or cancelling their bodies.
    observationTimer = setTimeout(() => finish("observation_expired"), this.maxObservationMs);
    observationTimer.unref?.();
    try {
      const response = await send();
      headersAt = this.now();
      event("headers", { status: response.status });
      if (signal?.aborted) finish(abortPhase());
      // Antigravity can return an intermediate 403/429 that the executor retries
      // without consuming the body. Such a physical fetch has already completed
      // at the HTTP-header boundary; retaining an unread-body wrapper here leaks
      // the inflight counter and corrupts idle/concurrency measurements.
      // Return the original response untouched so the executor can still inspect
      // any error body or retry it exactly as before.
      if (!response.ok) {
        finish("http_error");
        return response;
      }
      if (!response.body) {
        finish("complete");
        return response;
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let pending = "";
      let skipOversizedFrame = false;
      const inspect = (bytes: Uint8Array) => {
        if (finished || firstDeltaAt !== null) return;
        // Never retain an unbounded chunk/frame, including large image deltas.
        if (bytes.byteLength > 65536) { pending = ""; skipOversizedFrame = true; return; }
        pending += decoder.decode(bytes, { stream: true });
        for (;;) {
          const boundary = pending.search(/\r?\n\r?\n/);
          if (boundary < 0) break;
          const frame = pending.slice(0, boundary);
          pending = pending.slice(boundary).replace(/^\r?\n\r?\n/, "");
          if (!skipOversizedFrame && hasAntigravityMeaningfulDelta(frame)) {
            firstDeltaAt = this.now();
            event("first_meaningful_delta");
            pending = "";
            return;
          }
          skipOversizedFrame = false;
        }
        if (pending.length > 65536) { pending = ""; skipOversizedFrame = true; }
      };
      const body = new ReadableStream<Uint8Array>({
        async pull(controller) {
          try {
            const chunk = await reader.read();
            if (chunk.done) {
              finish("complete");
              reader.releaseLock();
              controller.close();
            } else {
              inspect(chunk.value);
              controller.enqueue(chunk.value);
            }
          } catch (error) {
            finish("body_error");
            reader.releaseLock();
            controller.error(error);
          }
        },
        async cancel(reason) {
          finish("cancelled");
          try { await reader.cancel(reason); } finally { reader.releaseLock(); }
        },
      });
      return new Response(body, {
        status: response.status, statusText: response.statusText, headers: response.headers,
      });
    } catch (error) {
      finish(isAntigravityPreResponseTimeout(error) ? "pre_response_timeout" : signal?.aborted ? abortPhase() : "fetch_failed");
      throw error;
    }
  }
}

const tracker = new AntigravityTimingTracker();
export const timeAntigravityFetch = (send: () => Promise<Response>, signal?: AbortSignal | null) =>
  tracker.fetch(send, signal);

export function withAntigravityTiming<T>(
  options: { enabled: boolean; connectionId: string; model: string; correlationId?: string | null;
    emit: TimingContext["emit"] },
  fn: () => T
): T {
  if (!options.enabled) return fn();
  const requestId = /^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(options.correlationId ?? "")
    ? options.correlationId! : randomUUID();
  return context.run({ ...options, requestId, sends: 0 }, fn);
}
