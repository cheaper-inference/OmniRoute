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
  const streamError = terminalResponse || !isResponsesStream ? null : findBareStreamError(events);
  if (!streamError || terminalResponse || latestResponse?.status === "completed") return snapshot;
  return { ...(snapshot || {}), status: "failed", error: streamError };
}
