/**
 * Error normalization for the Gemini App (Robin) native provider.
 *
 * Every failure leaves this directory as an OpenAI-compatible error body built
 * by `buildErrorBody()` (Hard Rule #12): no stack traces, no OAuth tokens, no
 * raw gRPC metadata ever reach the client.
 */

import { buildErrorBody, sanitizeErrorMessage } from "../../utils/error.ts";

export type GeminiAppErrorCode =
  | "NATIVE_QUOTA_EXHAUSTED"
  | "NATIVE_PRECONDITION_REQUIRED"
  | "NATIVE_UNAUTHENTICATED"
  | "NATIVE_PERMISSION_DENIED"
  | "NATIVE_UNAVAILABLE"
  | "NATIVE_MODEL_DOWNGRADE"
  | "NATIVE_DEEP_THINK_UNSUPPORTED"
  | "NATIVE_RECEIVE_LIMIT"
  | "NATIVE_PROTOCOL_ERROR"
  | "NATIVE_INVALID_REQUEST";

const GRPC_STATUS_MAP: Readonly<
  Record<number, { status: number; code: GeminiAppErrorCode; message: string }>
> = {
  // RESOURCE_EXHAUSTED → connection cooldown / model lockout / account rotation.
  8: {
    status: 429,
    code: "NATIVE_QUOTA_EXHAUSTED",
    message: "Gemini App quota exhausted for this account or model",
  },
  // PERMISSION_DENIED (often unaccepted Gemini Terms of Service).
  7: {
    status: 403,
    code: "NATIVE_PERMISSION_DENIED",
    message:
      "Gemini App refused this request; check account permissions and Gemini Terms of Service",
  },
  // FAILED_PRECONDITION → explicit ToS/consent action required, never auto-accepted.
  9: {
    status: 428,
    code: "NATIVE_PRECONDITION_REQUIRED",
    message: "Accept the current Gemini Terms of Service in your Google account, then retry",
  },
  14: {
    status: 503,
    code: "NATIVE_UNAVAILABLE",
    message: "Gemini App native backend is temporarily unavailable",
  },
  // UNAUTHENTICATED → token refresh / invalid connection.
  16: {
    status: 401,
    code: "NATIVE_UNAUTHENTICATED",
    message: "Gemini App OAuth token is invalid or expired",
  },
};

export function fromGrpcStatus(grpcStatus: number, detail?: string): GeminiAppError {
  const mapped = GRPC_STATUS_MAP[grpcStatus];
  if (!mapped) {
    return new GeminiAppError(
      "NATIVE_PROTOCOL_ERROR",
      502,
      `Gemini App native transport failed with gRPC status ${grpcStatus}`,
      grpcStatus
    );
  }
  return new GeminiAppError(mapped.code, mapped.status, detail ?? mapped.message, grpcStatus);
}

export class GeminiAppError extends Error {
  readonly code: GeminiAppErrorCode;
  readonly status: number;
  readonly grpcStatus: number | null;

  constructor(
    code: GeminiAppErrorCode,
    status: number,
    message: string,
    grpcStatus: number | null = null
  ) {
    // Defense in depth: sanitize at the boundary as well as at serialization.
    super(sanitizeErrorMessage(message));
    this.name = "GeminiAppError";
    this.code = code;
    this.status = status;
    this.grpcStatus = grpcStatus;
  }
}

/** Normalize anything thrown in the native path into a GeminiAppError. */
export function normalizeGeminiAppError(error: unknown): GeminiAppError {
  if (error instanceof GeminiAppError) return error;
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("NATIVE_DEEP_THINK_UNSUPPORTED")) {
    return new GeminiAppError(
      "NATIVE_DEEP_THINK_UNSUPPORTED",
      422,
      "Asynchronous Deep Think is not supported in a chat completion; use thinking_level 0-2 or 4"
    );
  }
  if (message.includes("INVALID_REASONING_EFFORT") || message.includes("INVALID_THINKING_LEVEL")) {
    return new GeminiAppError("NATIVE_INVALID_REQUEST", 400, message);
  }
  return new GeminiAppError("NATIVE_PROTOCOL_ERROR", 502, message);
}

/** Build a sanitized OpenAI-compatible error Response. */
export function geminiAppErrorResponse(error: unknown): Response {
  const normalized = normalizeGeminiAppError(error);
  const type =
    normalized.status === 429
      ? "rate_limit_error"
      : normalized.status >= 500 || normalized.status === 428
        ? "api_error"
        : "invalid_request_error";
  const body = buildErrorBody(normalized.status, normalized.message, undefined, {
    type,
    code: normalized.code,
  });
  return new Response(JSON.stringify(body), {
    status: normalized.status,
    headers: { "content-type": "application/json" },
  });
}
