/** Read exact signed feed bytes, capped at 10 MiB. */
const MAX_FEED_BYTES = 10 * 1024 * 1024;

export async function readBoundedBytes(response: Response): Promise<Buffer | null> {
  const contentLength = response.headers.get("content-length");
  if (contentLength !== null) {
    const declared = Number(contentLength);
    if (Number.isFinite(declared) && declared > MAX_FEED_BYTES) return null;
  }

  const body = response.body as ReadableStream<Uint8Array> | null | undefined;
  if (!body || typeof body.getReader !== "function") {
    const buffered = Buffer.from(await response.arrayBuffer());
    return buffered.byteLength > MAX_FEED_BYTES ? null : buffered;
  }

  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    total += value.byteLength;
    if (total > MAX_FEED_BYTES) {
      await reader.cancel().catch(() => undefined);
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
}
