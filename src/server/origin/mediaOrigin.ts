import { resolvePublicOrigin, sanitizeForwardedHost } from "./publicOrigin";

/**
 * Public origin for URLs this gateway hands back to the caller (served media, #16372).
 *
 * `new URL(request.url).origin` alone is not usable: the standalone server binds 0.0.0.0, so
 * Next reports `http://0.0.0.0:<port>` whatever address the caller dialed. Resolution order:
 *
 *   1. a configured public base URL (OMNIROUTE_PUBLIC_BASE_URL / NEXT_PUBLIC_BASE_URL / …);
 *   2. `Forwarded` / `X-Forwarded-Host` + `-Proto`, ONLY from a trusted proxy (the
 *      OMNIROUTE_TRUST_PROXY mode + the stamped socket peer — `resolvePublicOrigin`);
 *   3. the `Host` header of the direct connection (the name the caller itself dialed),
 *      sanitized, with the scheme of the connection;
 *   4. the request URL origin.
 *
 * Forwarding headers from an untrusted peer are never honoured, so a client cannot make the
 * gateway mint URLs on an arbitrary host through `X-Forwarded-Host`.
 */
export function resolveMediaOrigin(request: Request): string {
  const resolved = resolvePublicOrigin(request);
  if (resolved.source !== "request-url") return resolved.origin;

  const host = sanitizeForwardedHost(request.headers.get("host"));
  if (!host) return resolved.origin;
  let scheme = "http";
  try {
    if (new URL(request.url).protocol === "https:") scheme = "https";
  } catch {
    // keep http
  }
  return `${scheme}://${host}`;
}
