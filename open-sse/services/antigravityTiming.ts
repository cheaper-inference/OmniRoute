import { AsyncLocalStorage } from "node:async_hooks";
import { createHash, randomUUID } from "node:crypto";
import { resolveAntigravityModelId } from "../config/antigravityModelAliases.ts";
import { isAntigravityPreResponseTimeout } from "./antigravityTimeout.ts";

function normalizeAntigravityTimingModel(value: string): string {
  const normalized = value
    .trim()
    .replace(/^(?:antigravity|agy)\//i, "")
    .toLowerCase();
  if (!/^[a-z0-9_.:-]{1,160}$/.test(normalized)) return "unknown";
  return resolveAntigravityModelId(normalized);
}

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
function isMeaningfulPart(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const part = value as {
    text?: unknown;
    functionCall?: { name?: unknown };
    inlineData?: { data?: unknown };
    executableCode?: unknown;
    codeExecutionResult?: unknown;
  };
  return (
    (typeof part.text === "string" && part.text.length > 0) ||
    (typeof part.functionCall?.name === "string" && part.functionCall.name.length > 0) ||
    (typeof part.inlineData?.data === "string" && part.inlineData.data.length > 0) ||
    Boolean(part.executableCode || part.codeExecutionResult)
  );
}

function candidateHasMeaningfulPart(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { content?: { parts?: unknown[] } };
  return Array.isArray(candidate.content?.parts) && candidate.content.parts.some(isMeaningfulPart);
}

export function hasAntigravityMeaningfulDelta(frame: string): boolean {
  for (const line of frame.split(/\r?\n/)) {
    if (!line.startsWith("data:")) continue;
    try {
      const parsed = JSON.parse(line.slice(5).trim()) as Record<string, unknown>;
      const response = (parsed.response ?? parsed) as { candidates?: unknown[] };
      if (
        Array.isArray(response.candidates) &&
        response.candidates.some(candidateHasMeaningfulPart)
      ) {
        return true;
      }
    } catch {
      /* Partial, invalid or terminal frame: no measured delta. */
    }
  }
  return false;
}

function createDeltaInspector(onFirstDelta: () => void): (bytes: Uint8Array) => void {
  const decoder = new TextDecoder();
  let pending = "";
  let skipOversizedFrame = false;
  let found = false;
  return (bytes) => {
    if (found) return;
    if (bytes.byteLength > 65536) {
      pending = "";
      skipOversizedFrame = true;
      return;
    }
    pending += decoder.decode(bytes, { stream: true });
    for (;;) {
      const boundary = pending.search(/\r?\n\r?\n/);
      if (boundary < 0) break;
      const frame = pending.slice(0, boundary);
      pending = pending.slice(boundary).replace(/^\r?\n\r?\n/, "");
      if (!skipOversizedFrame && hasAntigravityMeaningfulDelta(frame)) {
        found = true;
        pending = "";
        onFirstDelta();
        return;
      }
      skipOversizedFrame = false;
    }
    if (pending.length > 65536) {
      pending = "";
      skipOversizedFrame = true;
    }
  };
}

function wrapTrackedResponseBody(
  response: Response,
  handlers: {
    finish: (phase: string) => void;
    onChunk: () => void;
    onFirstDelta: () => void;
    isFinished: () => boolean;
  }
): Response {
  const reader = response.body!.getReader();
  const inspect = createDeltaInspector(handlers.onFirstDelta);
  const body = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const chunk = await reader.read();
        if (chunk.done) {
          handlers.finish("complete");
          reader.releaseLock();
          controller.close();
        } else {
          handlers.onChunk();
          if (!handlers.isFinished()) inspect(chunk.value);
          controller.enqueue(chunk.value);
        }
      } catch (error) {
        handlers.finish("body_error");
        reader.releaseLock();
        controller.error(error);
      }
    },
    async cancel(reason) {
      handlers.finish("cancelled");
      try {
        await reader.cancel(reason);
      } finally {
        reader.releaseLock();
      }
    },
  });
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

/** Reuse bounded per-account telemetry state without altering dispatch eligibility. */
function claimTimingAccount(
  accounts: Map<string, AccountTiming>,
  connectionId: string
): AccountTiming | null {
  let account = accounts.get(connectionId);
  if (account) return account;
  if (accounts.size >= MAX_ACCOUNTS) {
    const idle = [...accounts].find(([, item]) => item.inflight === 0);
    if (!idle) return null;
    accounts.delete(idle[0]);
  }
  account = { inflight: 0, lastFinishedAt: null };
  accounts.set(connectionId, account);
  return account;
}

function classifyTimingAbort(signal: AbortSignal | null | undefined): string {
  if (isAntigravityPreResponseTimeout(signal?.reason)) return "pre_response_timeout";
  if ((signal?.reason as { name?: string } | undefined)?.name === "TimeoutError") {
    return "upstream_deadline";
  }
  return "caller_abort";
}

function measureIdleDuration(account: AccountTiming, started: number): number | null {
  if (account.inflight > 0) return 0;
  return account.lastFinishedAt === null ? null : Math.max(0, started - account.lastFinishedAt);
}

type PhysicalSendState = {
  scope: TimingContext;
  started: number;
  idleDurationMs: number | null;
  concurrentInflight: number;
  physicalSend: number;
  headersAt: number | null;
  firstDeltaAt: number | null;
};

function buildTimingEvent(
  phase: string,
  send: PhysicalSendState,
  now: number,
  extra: Record<string, unknown>
): Record<string, unknown> {
  const { scope, started, headersAt, firstDeltaAt } = send;
  // Correlation ids stay log fields, never metric labels. No URLs or payloads.
  return {
    event: "antigravity_timing",
    phase,
    requestId: scope.requestId,
    account: createHash("sha256").update(scope.connectionId).digest("hex").slice(0, 16),
    model: normalizeAntigravityTimingModel(scope.model),
    physicalSend: send.physicalSend,
    idleDurationMs: send.idleDurationMs,
    concurrentInflight: send.concurrentInflight,
    dnsMs: null,
    connectMs: null,
    tlsMs: null,
    headerLatencyMs: headersAt === null ? null : headersAt - started,
    firstMeaningfulDeltaFromHeadersMs:
      firstDeltaAt === null || headersAt === null ? null : firstDeltaAt - headersAt,
    firstMeaningfulDeltaFromSendMs: firstDeltaAt === null ? null : firstDeltaAt - started,
    elapsedMs: Math.max(0, now - started),
    ...extra,
  };
}

export class AntigravityTimingTracker {
  private accounts = new Map<string, AccountTiming>();
  constructor(
    private now: () => number = () => performance.now(),
    private maxObservationMs: number = MAX_TIMING_OBSERVATION_MS
  ) {}

  async fetch(send: () => Promise<Response>, signal?: AbortSignal | null): Promise<Response> {
    const scope = context.getStore();
    if (!scope) return send();
    const account = claimTimingAccount(this.accounts, scope.connectionId);
    if (!account) return send();
    const started = this.now();
    const attempt: PhysicalSendState = {
      scope,
      started,
      idleDurationMs: measureIdleDuration(account, started),
      concurrentInflight: ++account.inflight,
      physicalSend: ++scope.sends,
      headersAt: null,
      firstDeltaAt: null,
    };
    let finished = false;
    let observationTimer: ReturnType<typeof setTimeout> | null = null;
    const event = (phase: string, extra: Record<string, unknown> = {}) => {
      if (attempt.physicalSend > MAX_EVENTS_PER_ATTEMPT / 3) return;
      try {
        scope.emit(buildTimingEvent(phase, attempt, this.now(), extra));
      } catch {
        /* Diagnostics cannot change request behavior. */
      }
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
    const abortPhase = () => classifyTimingAbort(signal);
    const onAbort = () => finish(abortPhase());
    signal?.addEventListener("abort", onAbort, { once: true });
    // Bound *telemetry state*, not upstream execution. This also protects HTTP 200
    // streams that a caller abandons without reading or cancelling their bodies.
    const armObservationTimer = () => {
      if (finished) return;
      if (observationTimer !== null) clearTimeout(observationTimer);
      observationTimer = setTimeout(() => finish("observation_expired"), this.maxObservationMs);
      observationTimer.unref?.();
    };
    armObservationTimer();
    try {
      const response = await send();
      attempt.headersAt = this.now();
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
      return wrapTrackedResponseBody(response, {
        finish,
        onChunk: armObservationTimer,
        isFinished: () => finished,
        onFirstDelta: () => {
          attempt.firstDeltaAt = this.now();
          event("first_meaningful_delta");
        },
      });
    } catch (error) {
      finish(
        isAntigravityPreResponseTimeout(error)
          ? "pre_response_timeout"
          : signal?.aborted
            ? abortPhase()
            : "fetch_failed"
      );
      throw error;
    }
  }
}

const tracker = new AntigravityTimingTracker();
export const timeAntigravityFetch = (send: () => Promise<Response>, signal?: AbortSignal | null) =>
  tracker.fetch(send, signal);

export function withAntigravityTiming<T>(
  options: {
    enabled: boolean;
    connectionId: string;
    model: string;
    correlationId?: string | null;
    physicalSendOrdinal?: number;
    emit: TimingContext["emit"];
  },
  fn: () => T
): T {
  if (!options.enabled) return fn();
  const requestId = /^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(options.correlationId ?? "")
    ? options.correlationId!
    : randomUUID();
  const sends =
    options.physicalSendOrdinal &&
    Number.isInteger(options.physicalSendOrdinal) &&
    options.physicalSendOrdinal > 0
      ? options.physicalSendOrdinal - 1
      : 0;
  return context.run({ ...options, requestId, sends }, fn);
}
