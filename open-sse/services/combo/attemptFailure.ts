/**
 * Internal facts from one failed combo dispatch. Keep the original Response:
 * trusted quota/probe/empty-turn classifications belong to its identity.
 * Public error rendering and retry/fallback policy remain with their owners.
 */
import {
  logRetryHintUnreadable,
  parseRetryAfterHeader,
  readProseRetryAfter,
} from "../../utils/error.ts";
import type { ComboErrorBody, ComboLogger, ComboRetryAfter } from "./types.ts";

export type StructuredAttemptError = { code?: string; type?: string };

export interface AttemptFailure {
  readonly response: Response;
  readonly errorText: string;
  readonly errorBody: ComboErrorBody;
  readonly structuredError: StructuredAttemptError | undefined;
  readonly bodyText: string | null;
  readonly structuredRetryAfter: ComboRetryAfter | null;
  /** Quota historically accepts only string messages and uses full non-JSON text. */
  readonly quota: {
    text: string;
    structuredError: StructuredAttemptError | null;
  };
}

function structuredError(value: unknown): StructuredAttemptError | undefined {
  if (!value || typeof value !== "object") return undefined;
  const error = value as Record<string, unknown>;
  return {
    ...(error.code == null ? {} : { code: String(error.code) }),
    ...(error.type == null ? {} : { type: String(error.type) }),
  };
}

export async function readAttemptFailure(
  response: Response,
  options?: { log: ComboLogger; modelStr: string }
): Promise<AttemptFailure> {
  let errorText: unknown = response.statusText || "";
  let errorBody: ComboErrorBody = null;
  let retryAfter: ComboRetryAfter | null = null;
  let bodyText: string | null = null;
  let parsed = false;
  const unreadable = (reason: "unparseable body" | "clone failed") => {
    if (options) {
      logRetryHintUnreadable(options.log, "COMBO", options.modelStr, response.status, reason);
    }
  };

  try {
    const cloned = response.clone();
    try {
      bodyText = await cloned.text();
      if (bodyText) {
        errorText = bodyText.substring(0, 500);
        errorBody = JSON.parse(bodyText) as ComboErrorBody;
        parsed = true;
        const error = errorBody?.error;
        errorText =
          (typeof error === "object" && error?.message) ||
          (typeof error === "string" ? error : null) ||
          errorBody?.message ||
          errorText;

        // Preserve legacy precedence and units: only nested numeric hints are
        // seconds; a top-level retryAfter keeps its existing representation.
        const nested = typeof error === "object" ? error : null;
        const after = nested?.retry_after ?? null;
        const seconds = nested?.reset_seconds ?? null;
        retryAfter =
          errorBody?.retryAfter ||
          nested?.reset_at ||
          (typeof after === "number" && after > 0
            ? new Date(Date.now() + after * 1000).toISOString()
            : after) ||
          (typeof seconds === "number" && seconds > 0
            ? new Date(Date.now() + seconds * 1000).toISOString()
            : null);
      }
    } catch {
      unreadable("unparseable body");
    }
  } catch {
    unreadable("clone failed");
  }
  // These two projections intentionally retain their different historical
  // semantics. Sharing decoding must not silently change quota classification.
  let quotaText = response.statusText;
  let quotaError: StructuredAttemptError | null = null;
  if (bodyText !== null && (!parsed || errorBody === null)) {
    quotaText = bodyText;
  } else if (parsed) {
    const error = errorBody?.error;
    if (typeof error === "string") quotaText = error;
    else if (error && typeof error === "object") {
      if (typeof error.message === "string") quotaText = error.message;
      quotaError = structuredError(error) ?? null;
    } else if (typeof errorBody?.message === "string") quotaText = errorBody.message;
  }

  if (typeof errorText !== "string") {
    try {
      errorText = JSON.stringify(errorText);
    } catch {
      errorText = String(errorText);
    }
  }

  return {
    response,
    errorText: errorText as string,
    errorBody,
    structuredError: structuredError(errorBody?.error),
    bodyText,
    structuredRetryAfter: retryAfter,
    quota: { text: quotaText, structuredError: quotaError },
  };
}

/** Resolve routing hints explicitly: prose opt-in consults the feature-flag DB. */
export function resolveAttemptRetryAfter(failure: AttemptFailure): ComboRetryAfter | null {
  return (
    failure.structuredRetryAfter ||
    readProseRetryAfter(failure.bodyText) ||
    parseRetryAfterHeader(failure.response.headers)
  );
}
