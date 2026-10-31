/**
 * Derivation of the response-model echo name for `handleChatCore` (#1311/#3697).
 *
 * #18494: combo dispatch rewrites the dispatched body to the leaf
 * `provider/model` (`executeChatWithBreaker`) before `handleChatCore` runs, so
 * echoing `requestedModel` as-is advertises the leaf name to strict clients
 * (Claude Desktop validation, Codex CLI model picker). `clientRawRequest.body`
 * is the bounded pre-routing snapshot of what the client actually sent, so it
 * wins when it carries a model; the dispatched name stays the fallback for
 * callers that pass no client snapshot.
 */

/** The client's original `model` string from the raw request snapshot, if any. */
export function extractClientRequestedModel(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const model = (body as Record<string, unknown>).model;
  return typeof model === "string" && model.trim().length > 0 ? model : null;
}

/**
 * Echo name resolution: the client's own name wins over the dispatched leaf;
 * echo disabled (or no name at all) returns null so the upstream model passes
 * through untouched.
 */
export function resolveChatCoreEchoModel(options: {
  echoEnabled: boolean;
  requestedModel: string | null | undefined;
  clientRequestedModel: string | null | undefined;
}): string | null {
  if (!options.echoEnabled) return null;
  const name =
    options.clientRequestedModel ||
    (typeof options.requestedModel === "string" && options.requestedModel
      ? options.requestedModel
      : null);
  return name || null;
}
