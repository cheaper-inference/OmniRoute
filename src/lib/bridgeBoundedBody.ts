/**
 * The header rule and the buffered read of a request body the bridge relays with a declared
 * length. The body is read in full before the bridge contacts the server behind it.
 */

import type { IncomingHttpHeaders, IncomingMessage } from "http";

// A plain decimal integer from 1 to 9999: no sign, no leading zero, no space.
const DECLARED_LENGTH = /^[1-9][0-9]{0,3}$/;
// JSON, with no parameter or with the UTF-8 charset only.
const JSON_CONTENT_TYPE = /^application\/json(?:\s*;\s*charset=utf-8)?$/i;

/** How many `Content-Length` headers the raw header list carries, by case-insensitive name. */
function contentLengthCount(rawHeaders: readonly string[]): number {
  let count = 0;
  for (let index = 0; index < rawHeaders.length; index += 2) {
    if (rawHeaders[index].toLowerCase() === "content-length") count += 1;
  }
  return count;
}

/**
 * The declared length of a JSON body, or null when the request does not follow the rule.
 *
 * The rule: no `Transfer-Encoding`, exactly one `Content-Length` written as a plain decimal
 * integer from 1 to `maxBytes`, and a `Content-Type` of `application/json`, optionally with
 * `charset=utf-8`.
 */
export function declaredJsonBodyLength(
  headers: IncomingHttpHeaders,
  rawHeaders: readonly string[],
  maxBytes: number
): number | null {
  if (headers["transfer-encoding"] !== undefined) return null;
  if (contentLengthCount(rawHeaders) !== 1) return null;
  const declared = headers["content-length"] ?? "";
  if (!DECLARED_LENGTH.test(declared)) return null;
  const length = Number(declared);
  if (length > maxBytes) return null;
  const contentType = (headers["content-type"] ?? "").trim();
  return JSON_CONTENT_TYPE.test(contentType) ? length : null;
}

/**
 * Reads exactly `length` bytes of the request body.
 *
 * Resolves the body once the request ends with that many bytes. Resolves null when the time runs
 * out, when the request is aborted, fails or closes before its end, or when more bytes arrive.
 * Every listener and the timer are removed on each path. It never rejects.
 */
export function readBoundedBody(
  req: IncomingMessage,
  length: number,
  timeoutMs: number
): Promise<Buffer | null> {
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    let received = 0;
    const timer = setTimeout(fail, timeoutMs);

    function settle(body: Buffer | null): void {
      clearTimeout(timer);
      req.off("data", onData);
      req.off("end", onEnd);
      req.off("aborted", fail);
      req.off("error", fail);
      req.off("close", fail);
      resolve(body);
    }
    function fail(): void {
      settle(null);
    }
    function onData(chunk: Buffer): void {
      received += chunk.length;
      if (received > length) fail();
      else chunks.push(chunk);
    }
    function onEnd(): void {
      settle(received === length ? Buffer.concat(chunks, received) : null);
    }

    req.on("data", onData);
    req.on("end", onEnd);
    req.on("aborted", fail);
    req.on("error", fail);
    req.on("close", fail);
  });
}
