/**
 * Response-level marker for a buffered upstream stream that was cut before its terminal
 * signal (#18460 follow-up).
 *
 * The buffered-SSE parsers report a cut stream as `length` / `max_tokens` / `incomplete`
 * (#18460), the same surface a genuine budget cut uses. A combo must tell the two apart:
 * a cut is an attempt that failed in transit and should fail over to the next target,
 * while an upstream `length` is the model's own answer. `parseNonStreamingResponseBody`
 * marks the upstream Response here when the parser tagged its body, and
 * `inheritEmptyTurnPolicy` carries the marker onto every wrapper chatCore / chat.ts
 * returns, so the combo can read it from the Response it receives.
 *
 * Internal identities only, the same pattern as `emptyTurnPolicy.ts`: a WeakSet keyed by
 * the Response object. No header or body field carries it, so a client never sees it and
 * an upstream cannot forge it.
 */
const truncatedStreamResponses = new WeakSet<Response>();

export function markTruncatedStreamResponse(response: Response): Response {
  truncatedStreamResponses.add(response);
  return response;
}

export function isTruncatedStreamResponse(response: unknown): boolean {
  return (
    typeof response === "object" &&
    response !== null &&
    truncatedStreamResponses.has(response as Response)
  );
}

export function inheritTruncatedStreamPolicy(source: Response, target: Response): Response {
  if (truncatedStreamResponses.has(source)) truncatedStreamResponses.add(target);
  return target;
}
