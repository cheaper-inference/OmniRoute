/**
 * A usable search link must be an absolute HTTP(S) URL without parser repairs.
 * URL() otherwise normalizes "http:///go/..." or control characters into a different link.
 */
export function validSearchResultUrl(value: unknown): value is string {
  if (
    typeof value !== "string" ||
    !/^https?:\/\/[^/?#\\\s]+/i.test(value) ||
    /[\u0000-\u0020\u007f\\]/.test(value)
  )
    return false;
  try {
    const url = new URL(value);
    return Boolean(url.hostname) && !url.username && !url.password;
  } catch {
    return false;
  }
}
