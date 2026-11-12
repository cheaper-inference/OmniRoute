const HEADER = 5;
const END_STREAM_FLAG = 0x02;

/**
 * Frames one Connect streaming request body: a zero flag byte, a four-byte
 * big-endian length, then the JSON. The upstream rejects an unframed body, so
 * every streaming call has to build it the same way.
 */
export function frameConnectJson(body: string): Uint8Array<ArrayBuffer> {
  const json = new TextEncoder().encode(body);
  const out = new Uint8Array(HEADER + json.length);
  new DataView(out.buffer).setUint32(1, json.length, false);
  out.set(json, HEADER);
  return out;
}

/**
 * Reads Connect's stream framing: one flag byte, a four-byte big-endian length,
 * then that many bytes of JSON.
 *
 * A frame flagged 0x02 is the end-of-stream trailer, not a message. It is the
 * only place a failed stream reports why, so its error is thrown instead of
 * being dropped on the floor; a trailer without an error just ends the read.
 */
/**
 * A frame is accumulated in memory before it is decoded, so an oversized one is a way
 * to spend this process's heap: the cap rejects it instead of buffering it. Transcript
 * frames carry text and a blob is fetched from its own url, so this is generous.
 */
export const MAX_CONNECT_FRAME_BYTES = 16 * 1024 * 1024;

/**
 * Splits whatever complete frames `pending` holds, leaving the partial tail for the next
 * read. A trailer frame ends the stream rather than producing a value.
 */
function drainFrames(pending: Uint8Array, decoder: TextDecoder) {
  const frames: unknown[] = [];
  let rest = pending;
  let ended = false;
  for (;;) {
    const complete = takeCompleteFrame(rest);
    if (!complete) break;
    const { flag, frame, remaining } = complete;
    rest = remaining;
    if (flag & END_STREAM_FLAG) {
      throwTrailerError(decoder.decode(frame));
      ended = true;
      break;
    }
    if (flag !== 0) continue;
    frames.push(JSON.parse(decoder.decode(frame)));
  }
  return { frames, remaining: rest, ended };
}

export async function* readConnectFrames(
  stream: ReadableStream<Uint8Array>,
  maxFrameBytes = MAX_CONNECT_FRAME_BYTES
): AsyncGenerator<unknown> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let pending: Uint8Array = new Uint8Array(0);
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) return;
      const chunk = new Uint8Array(pending.length + value.length);
      if (chunk.length > maxFrameBytes) {
        throw new Error("grok-bot stream frame exceeds the size cap");
      }
      chunk.set(pending);
      chunk.set(value, pending.length);
      pending = chunk;
      const drained = drainFrames(pending, decoder);
      pending = drained.remaining;
      for (const frame of drained.frames) yield frame;
      if (drained.ended) return;
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
