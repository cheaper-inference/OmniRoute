/**
 * chatCore request-translation failure handling (chatCore god-file decomposition, slice 2).
 *
 * Extracted byte-identically from the catch around handleChatCore's request translation: run the
 * plugin onError hook (fail-open, sanitized debug log), derive a 4xx/5xx status, message and error
 * type from the thrown value — defensively, since hostile thrown values may expose Symbols or
 * throwing accessors — build the translation-failure result (translationFailure.ts) and log it.
 * The handler keeps the pending-request finalization and the early return.
 */

import { HTTP_STATUS } from "../../config/constants.ts";
import { redactSensitiveErrorText, sanitizeErrorMessage } from "../../utils/error.ts";
import { createTranslationFailureResult } from "./translationFailure.ts";

const RANGE_ERROR_STACK_MAX_LINES = 10;
const RANGE_ERROR_STACK_MAX_CHARS = 1024;

type LoggerLike =
  { debug?: (...args: unknown[]) => void; warn?: (...args: unknown[]) => void } | null | undefined;

type ThrownLike = {
  name?: unknown;
  statusCode?: unknown;
  message?: unknown;
  stack?: unknown;
  errorType?: unknown;
  details?: { error_code?: unknown } | null;
} | null;

function formatTruncatedRangeErrorStack(error: unknown, thrown: ThrownLike): string | null {
  let isRangeError = error instanceof RangeError;
  if (!isRangeError) {
    try {
      isRangeError = thrown?.name === "RangeError";
    } catch {
      return null;
    }
  }
  if (!isRangeError) return null;

  let rawStack = "";
  try {
    rawStack = typeof thrown?.stack === "string" ? thrown.stack.trim() : "";
  } catch {
    return null;
  }
  if (!rawStack) return null;

  const lines = rawStack.split(/\r?\n/);
  const lineTruncated = lines.length > RANGE_ERROR_STACK_MAX_LINES;
  let bounded = (lineTruncated ? lines.slice(0, RANGE_ERROR_STACK_MAX_LINES) : lines).join("\n");
  let charTruncated = false;
  if (bounded.length > RANGE_ERROR_STACK_MAX_CHARS) {
    bounded = bounded.slice(0, RANGE_ERROR_STACK_MAX_CHARS);
    charTruncated = true;
  }
  const redacted = redactSensitiveErrorText(bounded);
  return lineTruncated || charTruncated ? `${redacted}\n... [truncated]` : redacted;
}

export async function buildRequestTranslationErrorResult({
  error,
  traceId,
  body,
  model,
  provider,
  apiKeyInfo,
  log,
}: {
  error: unknown;
  traceId: string;
  body: unknown;
  model: string;
  provider: string;
  apiKeyInfo: unknown;
  log?: LoggerLike;
}): Promise<ReturnType<typeof createTranslationFailureResult>> {
  // ── Plugin onError hook ──
  try {
    const { runOnError } = await import("@/lib/plugins/hooks");
    await runOnError(
      { requestId: traceId, body, model, provider, apiKeyInfo, metadata: {} },
      error instanceof Error ? error : new Error(String(error))
    );
  } catch (pluginErr) {
    const pluginErrorMessage = sanitizeErrorMessage(pluginErr) || "Plugin onError hook failed";
    log?.debug?.("PLUGIN", `onError hook error (non-fatal): ${pluginErrorMessage}`);
  }

  const thrown = error as ThrownLike;
  let parsedStatus = Number.NaN;
  try {
    parsedStatus = Number(thrown?.statusCode);
  } catch {
    // Hostile thrown values may expose Symbols or throwing status accessors.
  }
  const statusCode =
    Number.isInteger(parsedStatus) && parsedStatus >= 400 && parsedStatus <= 599
      ? parsedStatus
      : HTTP_STATUS.SERVER_ERROR;
  let message = "Invalid request";
  try {
    const candidate = thrown?.message;
    message =
      (typeof candidate === "string" ? candidate : sanitizeErrorMessage(candidate)) || message;
  } catch {
    // Hostile thrown values may expose throwing property accessors.
  }
  let errorType: string | null = null;
  try {
    const candidate = thrown?.errorType;
    errorType = typeof candidate === "string" ? candidate : null;
  } catch {
    // Hostile thrown values may expose throwing classification accessors.
  }
  let detailCode: string | null = null;
  try {
    const candidate = thrown?.details?.error_code;
    detailCode = typeof candidate === "string" ? candidate : null;
  } catch {
    // Hostile thrown values may expose throwing detail accessors.
  }
  const result = createTranslationFailureResult(statusCode, message, errorType, detailCode);
  const rangeErrorStack = formatTruncatedRangeErrorStack(error, thrown);
  log?.warn?.(
    "TRANSLATE",
    rangeErrorStack
      ? `Request translation failed: ${result.error}\n${rangeErrorStack}`
      : `Request translation failed: ${result.error}`
  );
  return result;
}
