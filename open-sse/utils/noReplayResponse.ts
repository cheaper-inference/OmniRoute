/**
 * In-process "never replay" marker for a provider response.
 *
 * A custom JSON API node calls a business endpoint whose request may already have had
 * side effects, even when it answered with an error or an empty reply. Its response is
 * marked here so neither the account fallback (src/sse/handlers/chat.ts) nor a combo
 * fallback target (open-sse/services/combo/noReplayLatch.ts) sends the request again.
 *
 * Identity lives in a WeakSet keyed by the Response object, like the provider-probe and
 * empty-turn markers; a wrapped/cloned Response must inherit it explicitly. It is never
 * read from, or written to, anything a client can send.
 */
const noReplayResponses = new WeakSet<Response>();

export function markNoReplayResponse<T extends Response | null | undefined>(response: T): T {
  if (response) noReplayResponses.add(response);
  return response;
}

export function isNoReplayResponse(response: unknown): boolean {
  return (
    typeof response === "object" && response !== null && noReplayResponses.has(response as Response)
  );
}

export function inheritNoReplayResponse(source: Response, destination: Response): Response {
  if (isNoReplayResponse(source)) markNoReplayResponse(destination);
  return destination;
}
