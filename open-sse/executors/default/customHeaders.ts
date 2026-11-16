import {
  isForbiddenCustomHeaderName,
  isForbiddenUpstreamHeaderName,
} from "@/shared/constants/upstreamHeaders";

export { isForbiddenUpstreamHeaderName };

const asHeaderObject = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;

function parseCustomHeaders(raw: unknown): Record<string, unknown> | null {
  if (typeof raw !== "string") return asHeaderObject(raw);
  try {
    return asHeaderObject(JSON.parse(raw));
  } catch {
    return null;
  }
}

function assignHeaderCaseInsensitive(
  headers: Record<string, string>,
  name: string,
  value: string
): void {
  const lower = name.toLowerCase();
  for (const existing of Object.keys(headers)) {
    if (existing.toLowerCase() === lower) delete headers[existing];
  }
  headers[name] = value;
}

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
  const customHeaders = parseCustomHeaders(rawCustomHeaders);
  if (!customHeaders) return;
  for (const [name, value] of Object.entries(customHeaders)) {
    if (typeof value !== "string" || isForbiddenCustomHeaderName(name)) continue;
    if (/[\r\n\0]/.test(name) || /[\r\n]/.test(value)) continue;
    assignHeaderCaseInsensitive(headers, name, value);
  }
}
