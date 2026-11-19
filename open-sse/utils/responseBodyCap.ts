/**
 * Byte cap for a non-streaming upstream response read into memory.
 *
 * Kept in its own leaf module so `utils/error.ts` can bound its error-body peek
 * without importing `handlers/chatCore/nonStreamingResponseBody.ts`, which
 * reaches back into `utils/error.ts` and closed a new import cycle.
 */

/**
 * Thrown when a non-streaming upstream body exceeds the hard cap. Buffering an unbounded
 * SSE/NDJSON or JSON response in non-streaming mode was an OOM path (`rawBody += chunk`
 * with no ceiling): a single multi-hundred-MB upstream response could fill the V8 heap.
 * Callers treat this like any other upstream error rather than crashing the process.
 */
export class NonStreamingResponseTooLargeError extends Error {
  readonly bytesSeen: number;
  readonly maxBytes: number;
  constructor(bytesSeen: number, maxBytes: number) {
    super(
      `Upstream non-streaming response exceeded the ${maxBytes}-byte cap (saw at least ${bytesSeen} bytes)`
    );
    this.name = "NonStreamingResponseTooLargeError";
    this.bytesSeen = bytesSeen;
    this.maxBytes = maxBytes;
  }
}

const DEFAULT_MAX_NONSTREAMING_RESPONSE_BYTES = 64 * 1024 * 1024; // 64 MB

/**
 * Hard cap for a non-streaming response buffered fully into memory. Generous by default so
 * legitimate large completions pass; bounds only pathological/runaway upstream bodies.
 * Override with `OMNIROUTE_MAX_NONSTREAMING_RESPONSE_BYTES`. Read on every call, so the value
 * does not depend on when this module was first loaded.
 */
export function getMaxNonStreamingResponseBytes(): number {
  const parsed = Number.parseInt(String(process.env.OMNIROUTE_MAX_NONSTREAMING_RESPONSE_BYTES), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_MAX_NONSTREAMING_RESPONSE_BYTES;
}

/** Cancel a reader without letting a rejection mask the error already being thrown. */
export function cancelNonStreamingReader(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  reason: unknown
): void {
  try {
    void reader.cancel(reason).catch(() => {});
  } catch {
    // The caller is already unwinding or returning a complete terminal response.
  }
}

/**
 * Read a whole response body as text under `maxBytes`. Content-Length alone is not enough:
 * it is the compressed size for gzip/deflate/br and is absent for chunked bodies. fetch()
 * hands us the decoded stream, so the cap is enforced on the decoded bytes. Past it, or when
 * Content-Length already declares more, the body is cancelled (closing the upstream) and
 * {@link NonStreamingResponseTooLargeError} is thrown.
 */
export async function readResponseTextWithinCap(
  response: Response,
  maxBytes: number = getMaxNonStreamingResponseBytes()
): Promise<string> {
  // Reject before buffering when the upstream declares an over-cap Content-Length.
  const declared = Number.parseInt(response.headers.get("content-length") ?? "", 10);
  if (Number.isFinite(declared) && declared > maxBytes) {
    // Cancel so the upstream connection closes now, not when the Response is collected.
    void response.body?.cancel().catch(() => {});
    throw new NonStreamingResponseTooLargeError(declared, maxBytes);
  }
  // A consumed body has a closed stream that would read as empty; text() rejects it instead.
  if (!response.body || response.bodyUsed) return response.text();

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  let bytesSeen = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytesSeen += value.byteLength;
      if (bytesSeen > maxBytes) {
        throw new NonStreamingResponseTooLargeError(bytesSeen, maxBytes);
      }
      text += decoder.decode(value, { stream: true });
    }
  } catch (error) {
    cancelNonStreamingReader(reader, error);
    throw error;
  } finally {
    reader.releaseLock();
  }
  return text + decoder.decode();
}
