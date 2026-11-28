/**
 * Marker for a request body that carries text meant for the upstream only.
 *
 * The combo forwards a reasoning draft inside the body of the next target. That text may reach
 * the provider and nothing else: no call log, pipeline capture, retained request or error record
 * may keep it. The combo sets the marker on the body it dispatches, and `handleChatCore` takes
 * it off before the request is translated (so it never goes upstream) and treats the dispatch as
 * a no-log request.
 *
 * The marker is a body field, like the other `_omniroute*` internals, because the dispatch path
 * from the combo to `handleChatCore` already carries the body intact and nothing else.
 *
 * Leaf module: no imports, so the combo and the chat handler can share it without a cycle.
 */
export const SUPPRESS_REQUEST_PERSISTENCE_FIELD = "_omnirouteSuppressRequestPersistence";

/** A copy of `body` marked as upstream-only. */
export function markUpstreamOnlyBody(body: Record<string, unknown>): Record<string, unknown> {
  return { ...body, [SUPPRESS_REQUEST_PERSISTENCE_FIELD]: true };
}

/** Remove the marker from `body` (in place) and report whether it was set. */
export function takeUpstreamOnlyMarker(body: unknown): boolean {
  if (typeof body !== "object" || body === null) return false;
  const record = body as Record<string, unknown>;
  const marked = record[SUPPRESS_REQUEST_PERSISTENCE_FIELD] === true;
  delete record[SUPPRESS_REQUEST_PERSISTENCE_FIELD];
  return marked;
}
