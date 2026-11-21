/**
 * Token-expiry predicate, lifted out of chatCore.ts (still re-exported there
 * and from open-sse/index.ts, so existing imports keep working).
 */
import { parseTokenExpiryMs } from "../../utils/tokenExpiry.ts";

export function isTokenExpiringSoon(
  expiresAt: string | number | Date | null | undefined,
  bufferMs = 5 * 60 * 1000
): boolean {
  if (!expiresAt) return false;
  // parseTokenExpiryMs reads epoch seconds, epoch ms and numeric strings; a Date it does not know.
  const expiresAtMs =
    expiresAt instanceof Date ? expiresAt.getTime() : parseTokenExpiryMs(expiresAt);
  if (!Number.isFinite(expiresAtMs) || expiresAtMs <= 0) return false;
  return expiresAtMs - Date.now() < bufferMs;
}
