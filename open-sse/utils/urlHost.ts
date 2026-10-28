/**
 * Hostname checks for configured base URLs.
 *
 * Use these instead of a substring test such as `baseUrl.includes("api.example.com")`:
 * a look-alike upstream (`https://api.example.com.evil.test`,
 * `https://evil.test/?x=api.example.com`, `https://evil.test/api.example.com`) passes the
 * substring test and is then mistaken for the official endpoint — the exact defect CodeQL
 * reports as `js/incomplete-url-substring-sanitization`. Comparing the parsed hostname
 * closes that hole and gives every caller the same edge-case rules:
 *
 *  - a value with a scheme is parsed as-is;
 *  - a scheme-less value (`api.example.com/v1`, operators often omit the protocol) is
 *    parsed with an assumed `https://`;
 *  - anything unparseable yields `null` from {@link urlHostname}, and every predicate
 *    returns `false` for it — the caller decides what an unknown host means (third-party,
 *    custom base, …);
 *  - hostnames compare case-insensitively (the WHATWG parser already lowercases them).
 *
 * `tests/unit/url-host.test.ts` pins these rules and guards the migrated call sites.
 */

/** Parsed, lowercased hostname of `value`, or `null` when it is empty or unparseable. */
export function urlHostname(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const direct = tryHostname(trimmed);
  if (direct) return direct;
  // Only assume https:// for a scheme-less value; "http://" or "foo://" is just broken.
  if (trimmed.includes("://")) return null;
  return tryHostname(`https://${trimmed}`);
}

/** Exact hostname equality (`api.example.com` matches only `api.example.com`). */
export function isUrlHost(value: string | null | undefined, host: string): boolean {
  const parsed = urlHostname(value);
  return parsed !== null && parsed === host.toLowerCase();
}

/** The domain itself or any subdomain (`moonshot.cn`, `api.moonshot.cn`; not `notmoonshot.cn`). */
export function isUrlHostOrSubdomain(value: string | null | undefined, domain: string): boolean {
  const parsed = urlHostname(value);
  if (parsed === null) return false;
  const expected = domain.toLowerCase();
  return parsed === expected || parsed.endsWith(`.${expected}`);
}

function tryHostname(candidate: string): string | null {
  try {
    const hostname = new URL(candidate).hostname;
    return hostname ? hostname.toLowerCase() : null;
  } catch {
    return null;
  }
}
