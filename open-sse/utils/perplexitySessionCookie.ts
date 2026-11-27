/**
 * Cookie header for Perplexity Web.
 *
 * Current sessions paste `__Secure-pplx.session.<UUID>` together with
 * `pplx.session-id` (any order, optional leading `Cookie:`, extra pairs kept).
 * The legacy NextAuth family, including chunked `session-token.N` names, is
 * already a header and passes through. Only a bare legacy token receives the
 * legacy cookie name.
 *
 * Pair names are read at the start of the header or after `;`. A match inside
 * a cookie value must not decide the shape, or the account cookie is swallowed
 * into the legacy token (#21170).
 */

const LEGACY_SESSION_COOKIE_NAME = /^__Secure-next-auth\.session-token(?:\.\d+)?$/;
const CURRENT_ACCOUNT_COOKIE_NAME =
  /^__Secure-pplx\.session\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const LEGACY_COOKIE_PREFIX = "__Secure-next-auth.session-token=";

function stripCookiePrefix(rawInput: string): string {
  const trimmed = rawInput.trim();
  return trimmed.replace(/^cookie\s*:\s*/i, "");
}

function cookiePairName(segment: string): string | null {
  const trimmed = segment.trim();
  const eq = trimmed.indexOf("=");
  if (eq <= 0) return null;
  return trimmed.slice(0, eq).trim();
}

function keepsSessionHeader(header: string): boolean {
  for (const segment of header.split(";")) {
    const name = cookiePairName(segment);
    if (!name) continue;
    if (LEGACY_SESSION_COOKIE_NAME.test(name) || CURRENT_ACCOUNT_COOKIE_NAME.test(name)) {
      return true;
    }
  }
  return false;
}

export function normalizePerplexitySessionCookie(rawInput: string): string {
  const header = stripCookiePrefix(rawInput);
  if (keepsSessionHeader(header)) return header;
  return `${LEGACY_COOKIE_PREFIX}${header}`;
}
