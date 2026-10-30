import { isForbiddenCustomHeaderName } from "@/shared/constants/upstreamHeaders";

/**
 * Apply operator-configured per-provider custom headers onto an outgoing header
 * map. Defense-in-depth on top of the Zod `customHeadersSchema`:
 *  - skip hop-by-hop/framing AND auth header names (canonical denylist, so a row
 *    written before the schema tightening still can't override credential auth);
 *  - skip control-char (CR/LF/NUL) names/values before they reach undici;
 *  - assign case-insensitively, replacing any existing same-named header (e.g.
 *    the executor's own Content-Type/Accept) instead of emitting a duplicate.
 * Used for every *-compatible node, INCLUDING anthropic-compatible-cc-* (whose
 * header builder returns early, so custom headers must be merged in explicitly)
 * and custom JSON API nodes (open-sse/executors/customJson.ts).
 */
export function applyCustomHeaders(
  headers: Record<string, string>,
  rawCustomHeaders: unknown
): void {
  let customHeaders: Record<string, unknown> | null = null;
  if (
    rawCustomHeaders &&
    typeof rawCustomHeaders === "object" &&
    !Array.isArray(rawCustomHeaders)
  ) {
    customHeaders = rawCustomHeaders as Record<string, unknown>;
  } else if (typeof rawCustomHeaders === "string") {
    try {
      const parsed = JSON.parse(rawCustomHeaders);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        customHeaders = parsed as Record<string, unknown>;
      }
    } catch {
      /* ignore invalid JSON */
    }
  }
  if (!customHeaders) return;
  for (const [k, v] of Object.entries(customHeaders)) {
    if (typeof k !== "string" || typeof v !== "string") continue;
    if (isForbiddenCustomHeaderName(k)) continue;
    if (/[\r\n\0]/.test(k) || /[\r\n]/.test(v)) continue;
    const lower = k.toLowerCase();
    for (const existing of Object.keys(headers)) {
      if (existing.toLowerCase() === lower) delete headers[existing];
    }
    headers[k] = v;
  }
}
