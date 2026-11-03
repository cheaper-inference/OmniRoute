/**
 * max_tokens 400 clamp-and-retry — the third member of the learned-cap
 * recovery family (after thinking_budget ranges and reasoning_effort enums):
 * parse the upstream-advertised max_tokens ceiling from a 400/422 body, clamp
 * the top-level `max_tokens` (squeezing a Claude-style thinking budget to
 * keep budget_tokens < max_tokens), record the ceiling process-wide so future
 * requests pre-clamp, and retry the same URL once. Mirrors
 * applyReasoningEffortRecovery's contract.
 */
import { HTTP_STATUS } from "../../config/constants.ts";
import {
  clampTopLevelMaxTokens,
  parseMaxTokensCeiling,
  recordLearnedMaxTokensCap,
} from "../../services/learnedMaxTokensCaps.ts";

type RecoveryLog = {
  info?: (tag: string, message: string) => void;
} | null;

export interface MaxTokensRecoveryParams {
  /** The just-received upstream response for the request about to be checked. */
  response: Response;
  /** The URL the request was sent to (used for the retry and for logging). */
  url: string;
  provider: string;
  model: string | undefined;
  /** The request body that was sent (and, on clamp, the body to retry with). */
  body: unknown;
  /** Base fetch options; `body` is overwritten with the clamped, serialized body. */
  fetchOptions: RequestInit;
  /** Performs the retry fetch — pass the same wrapped fetch the caller used. */
  fetchFn: (url: string, options: RequestInit) => Promise<Response>;
  /** Optional: serialize the clamped body before retrying (defaults to JSON.stringify). */
  serializeBody?: (body: unknown) => string | Promise<string>;
  log?: RecoveryLog;
}

export interface MaxTokensRecoveryResult {
  /** The response to use going forward — the retry's response when a retry happened. */
  response: Response;
  /** The (possibly clamped) body — pass this along so callers keep it in sync. */
  body: unknown;
  /** True when a retry was actually issued. */
  retried: boolean;
  /**
   * True as soon as the error body advertised a max_tokens ceiling, even when
   * no retry followed (e.g. the clamp was a no-op). Callers gating a single
   * attempt per response chain should stop trying once this is true.
   */
  attempted: boolean;
}

/**
 * Detect an upstream 400/422 advertising a rejected `max_tokens` ceiling,
 * clamp the body to it, record it for future proactive clamps, and retry the
 * same URL once. Returns the original response/body unchanged
 * (retried: false) when the response isn't a recoverable max_tokens rejection.
 */
export async function applyMaxTokensRecovery(
  params: MaxTokensRecoveryParams
): Promise<MaxTokensRecoveryResult> {
  const { response, url, provider, model, fetchOptions, fetchFn, log } = params;
  let body = params.body;

  const notRecoverable = { response, body, retried: false as const, attempted: false as const };

  if (
    response.status !== HTTP_STATUS.BAD_REQUEST &&
    response.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY
  ) {
    return notRecoverable;
  }
  if (!body || typeof body !== "object") {
    return notRecoverable;
  }

  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  const ceiling = parseMaxTokensCeiling(errText);
  if (ceiling === null) {
    return notRecoverable;
  }

  const learned = recordLearnedMaxTokensCap(provider, model, ceiling);
  if (!clampTopLevelMaxTokens(body, learned)) {
    // The body is already at/below the advertised ceiling yet was still
    // rejected — surface the original response rather than masking it.
    log?.info?.(
      "MAX_TOKENS",
      `Upstream ${response.status} advertised a max_tokens ceiling of ${learned} on ${url} — body already within it, not retrying (${provider}/${model})`
    );
    return { response, body, retried: false, attempted: true };
  }

  const serialize = params.serializeBody ?? ((b: unknown) => JSON.stringify(b));
  const retryBody = await serialize(body);
  log?.info?.(
    "MAX_TOKENS",
    `Upstream ${response.status} rejected max_tokens on ${url} — clamped to ${learned} and retrying (learned for ${provider}/${model})`
  );
  const retriedResponse = await fetchFn(url, { ...fetchOptions, body: retryBody });
  return { response: retriedResponse, body, retried: true, attempted: true };
}
