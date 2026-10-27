/**
 * Outbound header value cleanup.
 *
 * An API key pasted from a web page, a chat or a password manager can carry an
 * invisible character: a trailing U+200B ZERO WIDTH SPACE, a leading U+FEFF BOM,
 * a U+2060 WORD JOINER, or a stray control such as a mid-value line break. None
 * of them can travel in an HTTP header, so undici rejects the request ("Cannot
 * convert argument to a ByteString", "invalid x-api-key header") and every call
 * on that connection fails without saying which header or character is at fault.
 *
 * `sanitizeHeaderValues()` removes exactly those characters and nothing else:
 * - zero-width characters U+200B, U+200C, U+200D and U+2060;
 * - the byte-order mark U+FEFF;
 * - the C0 controls (U+0000–U+001F) except HTAB, and DEL (U+007F) — the
 *   controls undici refuses in a header value.
 *
 * Every character a header can legally carry is kept as is: HTAB, printable
 * ASCII, the Latin-1 upper half (including é), and whitespace (fetch already
 * trims leading/trailing HTTP whitespace). Visible characters above U+00FF are
 * not invisible noise, so they are left for the transport to judge exactly as
 * before. A value with nothing to remove comes back as the same string, and a
 * header set with nothing to remove comes back as the same object.
 */

type SanitizableHeaders = HeadersInit | Record<string, unknown> | null | undefined;

function isInvisibleHeaderChar(code: number): boolean {
  if (code < 0x20) return code !== 0x09;
  return code === 0x7f || (code >= 0x200b && code <= 0x200d) || code === 0x2060 || code === 0xfeff;
}

/** Return `value` without invisible characters; the same string when it has none. */
export function stripInvisibleHeaderChars(value: string): string {
  let out: string | null = null;
  for (let i = 0; i < value.length; i++) {
    if (isInvisibleHeaderChar(value.charCodeAt(i))) {
      if (out === null) out = value.slice(0, i);
    } else if (out !== null) {
      out += value[i];
    }
  }
  return out ?? value;
}

function cleanValue(value: unknown): unknown {
  return typeof value === "string" ? stripInvisibleHeaderChars(value) : value;
}

/**
 * Clean the values of a header set (plain object, `Headers` or `[name, value][]`).
 * Returns the input untouched when no value needs cleaning; otherwise a new
 * header set of the same shape. The caller's object is never mutated. Names and
 * non-string values pass through unchanged.
 */
export function sanitizeHeaderValues<T extends SanitizableHeaders>(headers: T): T {
  if (!headers || typeof headers !== "object") return headers;

  if (typeof Headers !== "undefined" && headers instanceof Headers) {
    let changed = false;
    const entries: Array<[string, string]> = [];
    headers.forEach((value, name) => {
      const cleaned = stripInvisibleHeaderChars(value);
      if (cleaned !== value) changed = true;
      entries.push([name, cleaned]);
    });
    if (!changed) return headers;
    const out = new Headers();
    for (const [name, value] of entries) out.append(name, value);
    return out as T;
  }

  if (Array.isArray(headers)) {
    let changed = false;
    const out = headers.map((pair: unknown) => {
      if (!Array.isArray(pair) || pair.length !== 2) return pair;
      const cleaned = cleanValue(pair[1]);
      if (cleaned === pair[1]) return pair;
      changed = true;
      return [pair[0], cleaned];
    });
    return (changed ? out : headers) as T;
  }

  let out: Record<string, unknown> | null = null;
  for (const [name, value] of Object.entries(headers)) {
    const cleaned = cleanValue(value);
    if (cleaned !== value) {
      out ??= { ...(headers as Record<string, unknown>) };
      out[name] = cleaned;
    }
  }
  return (out ?? headers) as T;
}
