/** Bound an incomplete wire frame before the SDK's JSON line accumulator. */
export function boundedFrames(maxBytes = 2 * 1024 * 1024) {
  let pending = 0;
  return new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      for (const byte of chunk) {
        pending = byte === 10 ? 0 : pending + 1;
        if (pending > maxBytes) throw new Error("ACP frame exceeded the transport limit");
      }
      controller.enqueue(chunk);
    },
  });
}
