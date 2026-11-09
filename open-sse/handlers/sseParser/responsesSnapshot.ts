type ResponseSnapshot = Record<string, unknown> | null;

function findBareStreamError(events: Array<Record<string, unknown>>): unknown {
  for (const event of events) {
    if (Array.isArray(event.choices)) continue;
    const error = event.error;
    if (
      typeof error === "string"
        ? error.trim()
        : error &&
          typeof error === "object" &&
          !Array.isArray(error) &&
          Object.keys(error).length > 0
    ) {
      return error;
    }
  }
  return null;
}

/**
 * #17049: a stream can carry a specific rejection (e.g. a provider safety stop) as a bare
 * `error` frame and then close with a generic `response.failed`. The earlier root error is
 * the cause; reporting the generic one turns a request-scoped refusal into a retryable
 * server error. Completed and non-failed terminal snapshots are returned unchanged.
 */
function preserveEarlierRejection(
  terminalResponse: Record<string, unknown>,
  events: Array<Record<string, unknown>>
): ResponseSnapshot {
  if (terminalResponse.status !== "failed") return terminalResponse;
  const rootError = findBareStreamError(events.filter((event) => event.type === "error"));
  return rootError ? { ...terminalResponse, error: rootError } : terminalResponse;
}

/** Preserve settled snapshots; only identified Responses streams may synthesize a failure. */
export function pickResponsesSnapshot(
  terminalResponse: ResponseSnapshot,
  latestResponse: ResponseSnapshot,
  events: Array<Record<string, unknown>>
): ResponseSnapshot {
  const snapshot = terminalResponse || latestResponse;
  const isResponsesStream =
    snapshot ||
    events.some(
      (event) =>
        event.type === "error" ||
        (typeof event.type === "string" && event.type.startsWith("response."))
    );
  if (terminalResponse) return preserveEarlierRejection(terminalResponse, events);
  const streamError = isResponsesStream ? findBareStreamError(events) : null;
  if (!streamError || latestResponse?.status === "completed") return snapshot;
  return { ...(snapshot || {}), status: "failed", error: streamError };
}
