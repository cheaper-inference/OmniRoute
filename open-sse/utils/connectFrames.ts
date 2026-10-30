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
  let pending = new Uint8Array(0);
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) return;
      const chunk = new Uint8Array(pending.length + value.length);
      chunk.set(pending);
      chunk.set(value, pending.length);
      pending = chunk;
      for (;;) {
        if (pending.length < HEADER) break;
        const length =
          ((pending[1] << 24) | (pending[2] << 16) | (pending[3] << 8) | pending[4]) >>> 0;
        if (pending.length < HEADER + length) break;
        const flag = pending[0];
        const frame = pending.subarray(HEADER, HEADER + length);
        pending = pending.subarray(HEADER + length);
        if (flag & END_STREAM_FLAG) {
          const trailer = JSON.parse(decoder.decode(frame)) as {
            error?: { code?: string; message?: string };
          } | null;
          if (trailer?.error) {
            throw new Error(
              `connect stream error: ${trailer.error.code ?? ""} ${trailer.error.message ?? ""}`.trim()
            );
          }
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
