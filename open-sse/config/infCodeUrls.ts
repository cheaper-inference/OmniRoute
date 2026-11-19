/**
 * InfCode (Token Infinity) OAuth endpoint overrides.
 *
 * The INF_CODE_OAUTH_* variables point login, the auth-code exchange, userinfo and the
 * rotating refresh token at a private instance. Each of those requests carries a credential
 * (the authorization code, the bearer token, the refresh token), so an override must use
 * https; plain http is accepted only on loopback, for a local gateway. Any other value falls
 * back to the public default instead of sending the credential in cleartext.
 *
 * No imports on purpose: the login table (src/lib/oauth/constants/oauth.ts), the refresh table
 * (open-sse/config/constants.ts) and the provider registry all read it, so it must stay a leaf.
 */

/** Default Token Infinity SaaS API/auth base. */
export const DEFAULT_INF_CODE_BASE = "https://www.tokensinfinity.com";

const LOOPBACK_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]"]);

/** `raw` when it is an https URL (or http on loopback), otherwise `fallback`. */
export function secureInfCodeUrl(raw: string | undefined, fallback: string): string {
  const candidate = typeof raw === "string" ? raw.trim() : "";
  if (!candidate) return fallback;

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    return fallback;
  }

  if (url.protocol === "https:") return candidate;
  if (url.protocol === "http:" && LOOPBACK_HOSTNAMES.has(url.hostname)) return candidate;
  return fallback;
}

/** The login/refresh base: INF_CODE_OAUTH_BASE_URL when it is safe, else the public SaaS. */
export function resolveInfCodeAuthBase(): string {
  return secureInfCodeUrl(process.env.INF_CODE_OAUTH_BASE_URL, DEFAULT_INF_CODE_BASE).replace(
    /\/+$/,
    ""
  );
}
