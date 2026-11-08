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

type DecodedBody = {
  bodyText: string | null;
  errorText: unknown;
  errorBody: ComboErrorBody;
  retryAfter: ComboRetryAfter | null;
  parsed: boolean;
};

function readErrorMessage(errorBody: ComboErrorBody, fallback: unknown): unknown {
  const error = errorBody?.error;
  return (
    (typeof error === "object" && error?.message) ||
    (typeof error === "string" ? error : null) ||
    errorBody?.message ||
    fallback
  );
}

/** Turn a numeric "seconds from now" hint into an ISO timestamp; pass others through. */
function secondsFromNow(value: unknown): unknown {
  return typeof value === "number" && value > 0
    ? new Date(Date.now() + value * 1000).toISOString()
    : value;
}

function readStructuredRetryAfter(errorBody: ComboErrorBody): ComboRetryAfter | null {
  // Preserve legacy precedence and units: only nested numeric hints are
  // seconds; a top-level retryAfter keeps its existing representation.
  const error = errorBody?.error;
  const nested = typeof error === "object" ? error : null;
  const after = nested?.retry_after ?? null;
  const seconds = nested?.reset_seconds ?? null;
  return (errorBody?.retryAfter ||
    nested?.reset_at ||
    secondsFromNow(after) ||
    (typeof seconds === "number" && seconds > 0
      ? secondsFromNow(seconds)
      : null)) as ComboRetryAfter | null;
}

function decodeBodyText(decoded: DecodedBody, text: string): void {
  decoded.bodyText = text;
  if (!text) return;
  decoded.errorText = text.substring(0, 500);
  decoded.errorBody = JSON.parse(text) as ComboErrorBody;
  decoded.parsed = true;
  decoded.errorText = readErrorMessage(decoded.errorBody, decoded.errorText);
  decoded.retryAfter = readStructuredRetryAfter(decoded.errorBody);
}

async function decodeFailureBody(
  response: Response,
  unreadable: (reason: "unparseable body" | "clone failed") => void
): Promise<DecodedBody> {
  const decoded: DecodedBody = {
    bodyText: null,
    errorText: response.statusText || "",
    errorBody: null,
    retryAfter: null,
    parsed: false,
  };
  try {
    const cloned = response.clone();
    try {
      decodeBodyText(decoded, await cloned.text());
    } catch {
      unreadable("unparseable body");
    }
  } catch {
    unreadable("clone failed");
  }
  return decoded;
}

type QuotaProjection = AttemptFailure["quota"];

function projectParsedQuota(statusText: string, errorBody: ComboErrorBody): QuotaProjection {
  const error = errorBody?.error;
  if (typeof error === "string") return { text: error, structuredError: null };
  if (error && typeof error === "object") {
    return {
      text: typeof error.message === "string" ? error.message : statusText,
      structuredError: structuredError(error) ?? null,
    };
  }
  const message = errorBody?.message;
  return { text: typeof message === "string" ? message : statusText, structuredError: null };
}

// These two projections intentionally retain their different historical
// semantics. Sharing decoding must not silently change quota classification.
function projectQuota(statusText: string, decoded: DecodedBody): QuotaProjection {
  const { bodyText, parsed, errorBody } = decoded;
  if (bodyText !== null && (!parsed || errorBody === null)) {
    return { text: bodyText, structuredError: null };
  }
  if (!parsed) return { text: statusText, structuredError: null };
  return projectParsedQuota(statusText, errorBody);
}

function stringifyErrorText(errorText: unknown): string {
  if (typeof errorText === "string") return errorText;
  try {
    return JSON.stringify(errorText);
  } catch {
    return String(errorText);
  }
}

export async function readAttemptFailure(
  response: Response,
  options?: { log: ComboLogger; modelStr: string }
): Promise<AttemptFailure> {
  const decoded = await decodeFailureBody(response, (reason) => {
    if (options) {
      logRetryHintUnreadable(options.log, "COMBO", options.modelStr, response.status, reason);
    }
  });
  return {
    response,
    errorText: stringifyErrorText(decoded.errorText),
    errorBody: decoded.errorBody,
    structuredError: structuredError(decoded.errorBody?.error),
    bodyText: decoded.bodyText,
    structuredRetryAfter: decoded.retryAfter,
    quota: projectQuota(response.statusText, decoded),
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
