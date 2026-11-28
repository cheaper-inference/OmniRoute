/**
 * Linear-time `data:<mediaType>;base64,<data>` parser (#21015).
 *
 * Avoids running regular expressions over multi-megabyte base64 payloads
 * (`String.prototype.match` / `RegExp.prototype.exec` can trigger V8's
 * backtrack-stack `RangeError: Maximum call stack size exceeded` on long-running
 * isolates for >=4 MiB images). Only a bounded header slice is inspected before
 * slicing out the payload in O(1).
 */

const DATA_PREFIX = "data:";
const BASE64_MARKER = ";base64,";

/**
 * Maximum character length searched for the `data:<mediaType>;base64,` header.
 * Keeps header scanning strictly bounded regardless of payload size.
 */
export const MAX_DATA_URL_HEADER_LENGTH = 256;

export interface ParsedBase64DataUrl {
  mediaType: string;
  data: string;
}

export interface ParseBase64DataUrlOptions {
  /** Require a non-empty base64 payload after `;base64,` (default: true). */
  requireNonEmptyData?: boolean;
}

function findBase64HeaderSeparator(
  value: unknown,
  options?: ParseBase64DataUrlOptions
): { mediaType: string; dataStart: number } | null {
  if (typeof value !== "string" || !value.startsWith(DATA_PREFIX)) return null;
  const searchLimit = Math.min(value.length, MAX_DATA_URL_HEADER_LENGTH);
  const headerSlice = value.slice(0, searchLimit);
  const sep = headerSlice.indexOf(BASE64_MARKER, DATA_PREFIX.length);
  if (sep <= DATA_PREFIX.length) return null;
  const mediaType = headerSlice.slice(DATA_PREFIX.length, sep);
  if (mediaType.includes(";") || mediaType.includes(",")) return null;
  const dataStart = sep + BASE64_MARKER.length;
  const requireNonEmptyData = options?.requireNonEmptyData ?? true;
  if (requireNonEmptyData && dataStart >= value.length) return null;
  return { mediaType, dataStart };
}

/**
 * Parse a `data:<mediaType>;base64,<data>` URL without executing any RegExp over
 * the base64 payload. Returns `null` if the string does not have a valid bounded
 * base64 data-URL header.
 */
export function parseBase64DataUrl(
  value: unknown,
  options?: ParseBase64DataUrlOptions
): ParsedBase64DataUrl | null {
  const header = findBase64HeaderSeparator(value, options);
  if (!header) return null;
  return {
    mediaType: header.mediaType,
    data: (value as string).slice(header.dataStart),
  };
}

/**
 * Fast predicate checking whether `value` is a `data:<mediaType>;base64,<data>`
 * URL without slicing or scanning the payload.
 */
export function isBase64DataUrl(value: unknown, options?: ParseBase64DataUrlOptions): boolean {
  return findBase64HeaderSeparator(value, options) !== null;
}

/**
 * Remove ASCII whitespace / MIME line breaks from a base64 payload, with a
 * zero-allocation fast path when no whitespace is present.
 */
export function stripBase64Whitespace(data: string): string {
  if (!data.includes("\n") && !data.includes("\r") && !data.includes(" ") && !data.includes("\t")) {
    return data;
  }
  return data.replace(/\s+/g, "");
}
