/**
 * chatCore client tool-name capture (chatCore god-file decomposition, slice 2).
 *
 * Extracted byte-identically from handleChatCore. Captures the client's own tool names BEFORE the
 * web-search / web-fetch fallback preparers inject synthetic tools, so the owner-provenance merge
 * (mergeInjectedFallbackOwnerNames) can tell tools the client already declared from tools OmniRoute
 * added. Without this, a client function named `omniroute_web_search` (colliding with the fallback
 * tool name) would be marked server-owned even though the client owns it.
 */

export function collectPreConversionClientToolNames(body: unknown): string[] {
  return (
    Array.isArray((body as Record<string, unknown>).tools)
      ? ((body as Record<string, unknown>).tools as unknown[])
      : []
  )
    .map((tool) => {
      if (!tool || typeof tool !== "object") return "";
      const record = tool as Record<string, unknown>;
      if (typeof record.name === "string") return record.name;
      const fn = record.function;
      if (
        fn &&
        typeof fn === "object" &&
        typeof (fn as Record<string, unknown>).name === "string"
      ) {
        return (fn as Record<string, unknown>).name as string;
      }
      return "";
    })
    .filter(Boolean);
}
