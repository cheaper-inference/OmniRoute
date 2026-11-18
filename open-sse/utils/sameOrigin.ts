/**
 * True when `url` has the same scheme, host and port as `baseUrl`. Used before a request that
 * carries credentials to a URL the upstream API handed back (a poll or result URL), so the
 * credentials only go to the origin the operator configured. Unparseable input is not same-origin.
 */
export function isSameOrigin(url: string, baseUrl: string): boolean {
  try {
    return new URL(url).origin === new URL(baseUrl).origin;
  } catch {
    return false;
  }
}
