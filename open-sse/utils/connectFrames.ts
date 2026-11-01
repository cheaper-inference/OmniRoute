const HEADER = 5;
const END_STREAM_FLAG = 0x02;

/**
 * Reads Connect's stream framing: one flag byte, a four-byte big-endian length,
 * then that many bytes of JSON.
 *
 * A frame flagged 0x02 is the end-of-stream trailer, not a message. It is the
 * only place a failed stream reports why, so its error is thrown instead of
 * being dropped on the floor; a trailer without an error just ends the read.
 */
export async function* readConnectFrames(
  stream: ReadableStream<Uint8Array>
): AsyncGenerator<unknown> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let pending: Uint8Array = new Uint8Array(0);
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) return;
      const chunk = new Uint8Array(pending.length + value.length);
      chunk.set(pending);
      chunk.set(value, pending.length);
      pending = chunk;
      for (;;) {
        const complete = takeCompleteFrame(pending);
        if (!complete) break;
        const { flag, frame, remaining } = complete;
        pending = remaining;
        if (flag & END_STREAM_FLAG) {
          throwTrailerError(decoder.decode(frame));
          return;
        }
        if (flag !== 0) continue;
        yield JSON.parse(decoder.decode(frame));
      }
    }
  } finally {
    reader.cancel().catch(() => {});
  }
}

/** Connect trailers carry stream-level failures even after successful HTTP headers. */
function throwTrailerError(json: string): void {
  const trailer = JSON.parse(json) as { error?: { code?: string; message?: string } } | null;
  if (trailer?.error) {
    throw new Error(
      `connect stream error: ${trailer.error.code ?? ""} ${trailer.error.message ?? ""}`.trim()
    );
  }
}

/** Keep partial headers and payloads buffered until a whole frame is available. */
function takeCompleteFrame(pending: Uint8Array) {
  if (pending.length < HEADER) return null;
  const length = ((pending[1] << 24) | (pending[2] << 16) | (pending[3] << 8) | pending[4]) >>> 0;
  if (pending.length < HEADER + length) return null;
  return {
    flag: pending[0],
    frame: pending.subarray(HEADER, HEADER + length),
    remaining: pending.subarray(HEADER + length),
  };
}
