import { buildErrorBody, createErrorResult } from "../../utils/error.ts";
import { isSafePublicErrorIdentifier } from "../../utils/publicErrorIdentifiers.ts";

/**
 * Internal label for a request that failed while being translated (#14815). Translation
 * runs locally on the client's own body before any upstream call, so the failure says
 * nothing about the account: every account would fail the same body the same way.
 * `shouldSkipConnDisable()` reads this label so the account is not cooled down. It is
 * set on the result object only — the client-facing body keeps its existing code.
 */
export const TRANSLATION_FAILURE_CODE = "request_translation_failed";

export function createTranslationFailureResult(
  status: number,
  message: string,
  errorType: string | null,
  detailCode: string | null = null
) {
  if (!errorType) {
    return { ...createErrorResult(status, message), errorCode: TRANSLATION_FAILURE_CODE };
  }
  const body = buildErrorBody(status, message, undefined, { type: errorType, code: errorType });
  // A thrown `details.error_code` (e.g. thread_unsupported_request) is what lets an SDK client
  // retry unthreaded. Only a public-safe identifier is forwarded.
  // shortcut: only classified (errorType) failures forward it, the one case that sets it today.
  if (detailCode && isSafePublicErrorIdentifier(detailCode)) {
    (body.error as Record<string, unknown>).details = { error_code: detailCode };
  }
  return {
    success: false as const,
    status,
    error: body.error.message,
    errorType,
    errorCode: TRANSLATION_FAILURE_CODE,
    response: new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    }),
  };
}
