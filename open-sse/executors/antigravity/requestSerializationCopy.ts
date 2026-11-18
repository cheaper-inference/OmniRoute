/**
 * Prepare an Antigravity request for JSON serialization without copying its
 * potentially large messages, tools, or inline media trees.
 *
 * applyFingerprint() calls stripInternalBodyFields(), which mutates only the
 * top-level object. Keep the original root intact for retries and loggers.
 * _toolNameMap is an in-memory side channel, never part of the upstream wire.
 */
export function copyAntigravityRequestForSerialization(body: unknown): unknown {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;

  const prototype = Object.getPrototypeOf(body);
  if (prototype !== Object.prototype && prototype !== null) {
    // Preserve the previous serialization behavior for exotic root objects.
    let clone: unknown;
    try {
      clone = structuredClone(body);
    } catch {
      clone = JSON.parse(JSON.stringify(body));
    }
    if (clone && typeof clone === "object") {
      delete (clone as Record<string, unknown>)._toolNameMap;
    }
    return clone;
  }

  // Only this shallow root is ever mutated by the fingerprint/marker stripping
  // path. Nested request content is read for JSON.stringify, not rewritten.
  const copied = { ...(body as Record<string, unknown>) };
  delete copied._toolNameMap;
  return copied;
}
