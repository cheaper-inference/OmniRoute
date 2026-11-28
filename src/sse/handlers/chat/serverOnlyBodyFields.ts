import { SUPPRESS_REQUEST_PERSISTENCE_FIELD } from "@omniroute/open-sse/services/combo/requestPersistence.ts";

/**
 * Body fields only the server may set: execution directives, route traces and the markers the
 * combo and the continuation rehydration attach to a body they dispatch themselves. A client can
 * send the same JSON keys, so the route entry discards them all before anything reads the body.
 */
export const SERVER_ONLY_BODY_FIELDS = [
  "_omnirouteReasoningRule",
  "_omnirouteReasoningRouteTrace",
  "_omniroutePreviousResponseResumed",
  SUPPRESS_REQUEST_PERSISTENCE_FIELD,
] as const;

/** A copy of `body` without the server-only fields; anything that is not an object comes back as is. */
export function discardServerOnlyBodyFields<T>(body: T): T {
  if (!body || typeof body !== "object") return body;
  const copy = { ...body } as Record<string, unknown>;
  for (const field of SERVER_ONLY_BODY_FIELDS) delete copy[field];
  return copy as T;
}
