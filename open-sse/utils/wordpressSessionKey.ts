/**
 * Shared lookup for the veoaifree.com `wordpress_logged_in*` session cookie.
 *
 * WordPress names the cookie `wordpress_logged_in_<siteHash>`, so a stored
 * connection may carry the bare name or any suffixed variant. One helper keeps
 * the executor, the web-session credential check, the optional-key loader and
 * the at-rest secret list in agreement (#17041).
 */
export const WORDPRESS_LOGGED_IN_PREFIX = "wordpress_logged_in";

/** True for `wordpress_logged_in` and any `wordpress_logged_in_*` / `*wordpress_logged_in*` key. */
export function isWordPressLoggedInKey(key: string): boolean {
  return key.includes(WORDPRESS_LOGGED_IN_PREFIX);
}

/** First non-empty string value stored under a wordpress_logged_in key, with its key name. */
export function findWordPressLoggedInEntry(
  record: Record<string, unknown> | null | undefined
): { key: string; value: string } | null {
  if (!record || typeof record !== "object") return null;
  for (const [key, val] of Object.entries(record)) {
    if (isWordPressLoggedInKey(key) && typeof val === "string" && val.trim()) {
      return { key, value: val.trim() };
    }
  }
  return null;
}
