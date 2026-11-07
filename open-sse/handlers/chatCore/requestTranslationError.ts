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
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { createTranslationFailureResult } from "./translationFailure.ts";

type LoggerLike =
  { debug?: (...args: unknown[]) => void; warn?: (...args: unknown[]) => void } | null | undefined;

type ThrownLike = { statusCode?: unknown; message?: unknown; errorType?: unknown } | null;

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
  const result = createTranslationFailureResult(statusCode, message, errorType);
  log?.warn?.("TRANSLATE", `Request translation failed: ${result.error}`);
  return result;
}
