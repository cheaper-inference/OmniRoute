/**
 * Token-expiry predicate, lifted out of chatCore.ts unchanged (still re-exported there
 * and from open-sse/index.ts, so existing imports keep working).
 */
export function isTokenExpiringSoon(
  expiresAt: string | number | Date | null | undefined,
  bufferMs = 5 * 60 * 1000
): boolean {
  if (!expiresAt) return false;
  const expiresAtMs = new Date(expiresAt).getTime();
  return expiresAtMs - Date.now() < bufferMs;
}
