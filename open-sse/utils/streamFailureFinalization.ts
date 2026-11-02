import {
  finalizeMostRecentPendingRequest,
  finalizePendingRequestById,
  type PendingRequestIdentity,
} from "@/lib/usage/usageHistory.ts";

import { HTTP_STATUS } from "../config/constants.ts";
import { buildErrorBody } from "./error.ts";
import { sanitizeErrorMessage } from "./errorSanitization.ts";
import type { StreamFailurePayload } from "./streamErrorFormat.ts";
import type { PartialStreamUsage } from "./streamPartialUsage.ts";

/** Token aggregate accepted by the failure usage row (chatCore/failureUsage.ts shape). */
export type PartialFailureUsageAggregate = {
  prompt_tokens: number;
  completion_tokens: number;
  cache_read_input_tokens?: number;
  cache_creation_input_tokens?: number;
  reasoning_tokens?: number;
};

function toPartialFailureAggregate(usage: PartialStreamUsage): PartialFailureUsageAggregate {
  return {
    prompt_tokens: usage.prompt_tokens,
    completion_tokens: usage.completion_tokens,
    cache_read_input_tokens: usage.cache_read_input_tokens,
    cache_creation_input_tokens: usage.cache_creation_input_tokens,
    reasoning_tokens: usage.reasoning_tokens,
  };
}
export type { StreamFailurePayload } from "./streamErrorFormat.ts";

export type StreamCompletionPayload = {
  status: number;
  usage: unknown;
  responseBody?: unknown;
  providerPayload?: unknown;
  clientPayload?: unknown;
  error?: string | null;
  errorCode?: string | null;
  ttft?: number | null;
  /**
   * Tokens already generated when a stream ended early (client disconnect / mid-stream
   * failure): provider-reported, or estimated from the streamed output (`estimated: true`).
   * Kept apart from `usage` so a failed stream does not trigger the success-only usage row,
   * cost and calibration side effects; the call log reads it for its token columns.
   */
  partialUsage?: PartialStreamUsage;
};

export type PipelineStreamErrorHandler = (event: {
  error?: unknown;
  message: string;
  statusCode: number;
}) => boolean;

function readFailureEventCount(failure: StreamFailurePayload): number {
  const count = failure.streamSnapshot?.providerEventCount;
  if (typeof count !== "number" || !Number.isFinite(count)) return 0;
  const floored = Math.floor(count);
  return floored < 0 ? 0 : floored;
}

function readFailureSummary(failure: StreamFailurePayload): unknown {
  const summary = failure.streamSnapshot?.providerSummary;
  if (summary === undefined || summary === null) return undefined;
  if (typeof summary !== "object" || Array.isArray(summary)) return undefined;
  if (Object.getPrototypeOf(summary) !== Object.prototype) return undefined;
  let serializedLength = 0;
  try {
    serializedLength = JSON.stringify(summary)?.length ?? 0;
  } catch {
    return undefined;
  }
  if (serializedLength === 0 || serializedLength > 524288) return undefined;
  return summary;
}

function buildFailureProviderPayload(
  errorBody: { error: { message: string; type?: string; code?: string } },
  failure: StreamFailurePayload
): Record<string, unknown> {
  const summary = readFailureSummary(failure);
  return {
    ...errorBody,
    _eventCount: readFailureEventCount(failure),
    ...(summary !== undefined ? { summary } : {}),
  };
}

function notifyStreamFailure(
  onStreamFailure: ((failure: StreamFailurePayload) => void) | null | undefined,
  hasEmittedOutput: () => boolean,
  failure: StreamFailurePayload
): void {
  try {
    onStreamFailure?.({ ...failure, outputEmitted: hasEmittedOutput() });
  } catch {
    // Best-effort fallback state update only.
  }
}

function resolvePipelineStreamStatus(
  message: string,
  statusCode: number,
  isClientClosed: (message: string, statusCode: number) => boolean
): { status: number; code: string; type: string } {
  const clientClosed = isClientClosed(message, statusCode);
  const status = clientClosed
    ? 499
    : Number.isFinite(statusCode) && statusCode >= 400 && statusCode <= 599
      ? statusCode
      : HTTP_STATUS.BAD_GATEWAY;
  const code = clientClosed ? "client_disconnected" : classifyPipelineStreamCode(message);
  const type = clientClosed ? "client_disconnected" : "stream_error";
  return { status, code, type };
}

export type ClientDisconnectEvent = { reason: string; duration: number };

function classifyPipelineStreamCode(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("stream content stall")) return "stream_content_stall";
  if (lower.includes("terminated")) return "stream_terminated";
  return "stream_pipeline_error";
}

const TRANSPORT_DIAGNOSTIC_CODES = new Set([
  "ECONNRESET",
  "ECONNREFUSED",
  "EPIPE",
  "ETIMEDOUT",
  "EPROTO",
  "ENOTFOUND",
  "EAI_AGAIN",
  "EHOSTUNREACH",
  "ENETUNREACH",
  "UND_ERR_SOCKET",
  "UND_ERR_CONNECT_TIMEOUT",
  "UND_ERR_HEADERS_TIMEOUT",
  "UND_ERR_BODY_TIMEOUT",
  "ERR_HTTP2_STREAM_ERROR",
  "ERR_HTTP2_SESSION_ERROR",
  "ERR_HTTP2_GOAWAY_SESSION",
  "ERR_HTTP2_INVALID_SESSION",
  "ERR_HTTP2_STREAM_CANCEL",
]);

function transportDiagnosticSuffix(error: unknown): string {
  const codes = new Set<string>();
  const seen = new Set<unknown>();
  let current = error;
  for (let depth = 0; depth < 8 && current && typeof current === "object"; depth++) {
    if (seen.has(current)) break;
    seen.add(current);
    try {
      const record = current as { code?: unknown; cause?: unknown };
      const code = record.code;
      if (typeof code === "string" && TRANSPORT_DIAGNOSTIC_CODES.has(code)) codes.add(code);
      current = record.cause;
    } catch {
      break; // Diagnostics must not interfere with finalization on a hostile getter.
    }
  }
  // Never include cause.message, stack, socket addresses or arbitrary code strings.
  return codes.size ? ` (transport: ${[...codes].join(", ")})` : "";
}

/**
 * #9653: a client that closes its connection right after reading a fully-completed
 * SSE stream can race the stream's own completion bookkeeping — the bytes already
 * reached the client, but the transform stream's completion callback (which flips
 * `isStreamCompletionRecorded()` to true) hasn't finished bubbling up yet when the
 * disconnect handler fires. Persisting immediately in that case records a false
 * 499 with zero token usage for a request that actually delivered its full response.
 *
 * This wraps a disconnect finalizer with a grace period: instead of finalizing
 * immediately, poll `isStreamCompletionRecorded()` until it flips true (a real
 * completion landed — nothing more to do) or the deadline passes (genuinely gone —
 * finalize as a 499 same as before). Pass `gracePeriodMs <= 0` to disable and
 * finalize immediately, matching the pre-#9653 behavior.
 */
export function createClientDisconnectGraceHandler({
  isStreamCompletionRecorded,
  gracePeriodMs,
  finalize,
  pollIntervalMs = 250,
  setTimeoutFn = setTimeout,
}: {
  isStreamCompletionRecorded: () => boolean;
  gracePeriodMs: number;
  finalize: (event: ClientDisconnectEvent) => unknown;
  pollIntervalMs?: number;
  setTimeoutFn?: (callback: () => void, ms: number) => unknown;
}): (event: ClientDisconnectEvent) => boolean {
  return (event) => {
    if (isStreamCompletionRecorded()) return true;
    if (gracePeriodMs <= 0) {
      finalize(event);
      return true;
    }

    const deadline = Date.now() + gracePeriodMs;
    const poll = () => {
      if (isStreamCompletionRecorded()) return;
      if (Date.now() >= deadline) {
        finalize(event);
        return;
      }
      setTimeoutFn(poll, pollIntervalMs);
    };
    setTimeoutFn(poll, pollIntervalMs);

    // Claim "handled" immediately so the caller's own immediate-finalize fallback
    // doesn't fire while the grace-period poll is still pending.
    return true;
  };
}

export function finalizeStreamRequestLog({
  pendingRequestId,
  model,
  provider,
  connectionId,
  providerResponse,
  clientResponse,
  status,
  error,
  errorCode,
  onWarn,
}: {
  pendingRequestId: PendingRequestIdentity;
  model: string;
  provider: string;
  connectionId: string | null;
  providerResponse?: unknown;
  clientResponse?: unknown;
  status: number;
  error?: string | null;
  errorCode?: string | null;
  onWarn?: (error: unknown) => void;
}) {
  try {
    if (pendingRequestId) {
      finalizePendingRequestById(pendingRequestId, {
        providerResponse,
        clientResponse,
        status,
        error: error || null,
        errorCode: errorCode || null,
      });
    } else {
      finalizeMostRecentPendingRequest(model, provider, connectionId, {
        providerResponse,
        clientResponse,
        status,
        error: error || null,
        errorCode: errorCode || null,
      });
    }
  } catch (error) {
    try {
      if (onWarn) {
        onWarn(error);
      } else {
        console.warn(
          "finalizeMostRecentPendingRequest failed:",
          sanitizeErrorMessage(error) || "Stream request finalization failed"
        );
      }
    } catch {}
  }
}

export function createStreamFailureFinalizers({
  isFailureCompletionRecorded,
  isStreamCompletionRecorded = () => false,
  onStreamComplete,
  persistFailureUsage,
  onStreamFailure,
  hasEmittedOutput = () => false,
  readPartialUsage = () => null,
}: {
  isFailureCompletionRecorded: () => boolean;
  isStreamCompletionRecorded?: () => boolean;
  onStreamComplete: (payload: StreamCompletionPayload) => void;
  persistFailureUsage: (
    status: number,
    errorCode?: string,
    aggregate?: PartialFailureUsageAggregate
  ) => void;
  onStreamFailure?: ((failure: StreamFailurePayload) => void) | null;
  hasEmittedOutput?: () => boolean;
  /** Usage the stream accumulated before it ended early (see streamPartialUsage.ts). */
  readPartialUsage?: () => PartialStreamUsage | null;
}) {
  const readPartialUsageSafely = (): PartialStreamUsage | null => {
    try {
      return readPartialUsage() ?? null;
    } catch {
      return null; // best-effort accounting must never block finalization
    }
  };

  const completeFailure = (failure: StreamFailurePayload) => {
    // The client hung up / the upstream died mid-answer: the provider already generated (and
    // billed) these tokens. Status and success semantics stay as they are — only the token
    // counts of the failure records stop being zero.
    const partialUsage = readPartialUsageSafely();

    const status = failure.status || HTTP_STATUS.BAD_GATEWAY;
    const message = failure.message || "Upstream stream error";
    const classification =
      failure.code || failure.type ? { code: failure.code, type: failure.type } : undefined;
    const errorBody = buildErrorBody(status, message, undefined, classification);
    const projectedCode = errorBody.error.code || String(status);
    if (!isFailureCompletionRecorded()) {
      onStreamComplete({
        status,
        usage: null,
        responseBody: errorBody,
        providerPayload: buildFailureProviderPayload(errorBody, failure),
        clientPayload: errorBody,
        error: message,
        errorCode: projectedCode,
        ttft: 0,
        ...(partialUsage ? { partialUsage } : {}),
      });
    }
    if (partialUsage) {
      persistFailureUsage(status, projectedCode, toPartialFailureAggregate(partialUsage));
    } else {
      persistFailureUsage(status, projectedCode);
    }
  };

  const handleStreamFailure = (failure: StreamFailurePayload) => {
    if (isStreamCompletionRecorded()) {
      return true;
    }
    completeFailure(failure);
    notifyStreamFailure(onStreamFailure, hasEmittedOutput, failure);
    return true;
  };

  const isClientClosedPipelineError = (message: string, statusCode: number) => {
    const normalized = message.toLowerCase();
    return (
      statusCode === 499 ||
      normalized.includes("responseaborted") ||
      normalized.includes("controller is already closed") ||
      normalized.includes("readablestream is closed") ||
      normalized.includes("writablestream is closed") ||
      normalized.includes("aborterror")
    );
  };

  let pipelineStreamFailureFinalized = false;

  const onPipelineStreamError: PipelineStreamErrorHandler = ({ error, message, statusCode }) => {
    if (pipelineStreamFailureFinalized) return true;
    pipelineStreamFailureFinalized = true;

    const normalizedMessage = message || "Upstream stream error";
    const { status, code, type } = resolvePipelineStreamStatus(
      normalizedMessage,
      statusCode,
      isClientClosedPipelineError
    );

    handleStreamFailure({
      status,
      message: normalizedMessage + (status >= 500 ? transportDiagnosticSuffix(error) : ""),
      code,
      type,
    });
    return true;
  };

  return { handleStreamFailure, onPipelineStreamError };
}
