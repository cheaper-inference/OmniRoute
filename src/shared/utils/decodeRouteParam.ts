/**
 * decodeRouteParam — guarded percent-decoding for dynamic route params.
 *
 * App Router page `params` arrive still percent-encoded for reserved
 * characters (`auto%2Ffast` reaches the page literally), while route
 * handlers receive the decoded value (`auto/fast`). Decoding once here
 * makes page components see the same canonical id the API sees.
 *
 * Already-decoded values (no `%`) pass through untouched, so callers can
 * apply it unconditionally. Malformed sequences (`foo%2F`) fall back to
 * the raw value instead of throwing — same contract as decodeUserinfo.
 */
export function decodeRouteParam(value: string): string {
  if (!value.includes("%")) return value;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
