/**
 * Replay policy for custom OpenAI-compatible provider nodes (`openai-compatible-*`).
 *
 * A custom node is an operator-run endpoint that may execute a POST it never answered
 * cleanly. Replaying such a request (same connection, sibling connection, emergency hop or
 * another combo target) can run the same inference twice. Only the AMBIGUOUS outcomes are
 * withheld from replay; a failure the upstream clearly did not accept keeps the ordinary
 * retry/fallback chain, sibling connections and combo failover included.
 *
 * | Outcome                                                          | Replay / fallback |
 * | ---------------------------------------------------------------- | ----------------- |
 * | 4xx answered by the upstream or refused locally (429, 400, 401,  | yes (normal)      |
 * |   403, 404, 413, ...), except 408                                |                   |
 * | 5xx (except 504) that came back with an upstream error body or   | yes (normal)      |
 * |   headers                                                        |                   |
 * | connect/DNS failure before any byte was sent (ECONNREFUSED,      | yes (normal)      |
 * |   ENOTFOUND, EAI_AGAIN, ENETUNREACH, UND_ERR_CONNECT_TIMEOUT)    |                   |
 * | reset/abort/timeout after the request was sent (408/504 too),    | no                |
 * |   socket closed mid-response, malformed/unusable 2xx, stream EOF |                   |
 *
 * An ambiguous failure is marked with the in-process no-replay marker
 * (open-sse/utils/noReplayResponse.ts): the account loop in chat.ts surfaces it as-is
 * without cooling the connection, and the combo latch (open-sse/services/combo/noReplayLatch.ts)
 * makes it the combo's final answer instead of resending the request to the next target.
 */
import { markNoReplayResponse } from "@omniroute/open-sse/utils/noReplayResponse.ts";
import { isPreSendConnectionError } from "@omniroute/open-sse/utils/proxyFetchTransportSupport.ts";

const CUSTOM_OPENAI_COMPATIBLE_PREFIX = "openai-compatible-";

// formatProviderError renders a transport failure as "... (cause: <CODE>: ...)"; the
// streaming leg keeps only that message, not the original error object.
const PRE_SEND_CAUSE_PATTERN =
  /\(cause: (?:ECONNREFUSED|ENOTFOUND|EAI_AGAIN|ENETUNREACH|UND_ERR_CONNECT_TIMEOUT)\b/;

export type CustomNodeFailureResult = {
  success?: boolean;
  status?: unknown;
  error?: unknown;
  rawMessage?: unknown;
  originalError?: unknown;
  upstreamErrorBody?: unknown;
  upstreamHeaders?: unknown;
  response?: Response | null;
};

export function isCustomOpenAICompatibleProvider(provider: unknown): boolean {
  return typeof provider === "string" && provider.startsWith(CUSTOM_OPENAI_COMPATIBLE_PREFIX);
}

function hasUpstreamErrorAnswer(result: CustomNodeFailureResult): boolean {
  if (result.upstreamHeaders != null) return true;
  const body = result.upstreamErrorBody;
  if (body == null) return false;
  return typeof body === "string" ? body.trim().length > 0 : true;
}

function failedBeforeSending(result: CustomNodeFailureResult): boolean {
  if (isPreSendConnectionError(result.originalError)) return true;
  return [result.rawMessage, result.error].some(
    (message) => typeof message === "string" && PRE_SEND_CAUSE_PATTERN.test(message)
  );
}

/** True when the upstream provably did not accept the request, so a replay is safe. */
export function isDefiniteCustomNodeRejection(result: CustomNodeFailureResult): boolean {
  const status = Number(result.status);
  if (!Number.isFinite(status) || status < 400) return false;
  if (failedBeforeSending(result)) return true;
  // A timeout means the request was in flight (or forwarded by a gateway): ambiguous.
  if (status === 408 || status === 504) return false;
  return status < 500 || hasUpstreamErrorAnswer(result);
}

/** Marks an ambiguous custom-node failure so neither account nor combo fallback replays it. */
export function markAmbiguousCustomNodeFailure(
  provider: unknown,
  result: CustomNodeFailureResult
): void {
  if (!isCustomOpenAICompatibleProvider(provider) || result.success || !result.response) return;
  if (!isDefiniteCustomNodeRejection(result)) markNoReplayResponse(result.response);
}
