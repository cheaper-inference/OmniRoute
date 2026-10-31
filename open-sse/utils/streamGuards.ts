export interface StreamGuardLimits {
  maxChunks?: number;
  maxBytes?: number;
  timeoutMs?: number;
}

export class StreamGuardError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StreamGuardError";
  }
}

export async function* guardReadableStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  limits: StreamGuardLimits = {}
): AsyncGenerator<Uint8Array, void, unknown> {
  const maxChunks = limits.maxChunks ?? 10_000;
  const maxBytes = limits.maxBytes ?? 50 * 1024 * 1024;
  const timeoutMs = limits.timeoutMs ?? 45_000;

  let chunksRead = 0;
  let bytesRead = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;

  try {
    while (true) {
      const chunkPromise = reader.read();
      const timeoutPromise = new Promise<{ done: true; value: undefined; timedOut: true }>(
        (_, reject) => {
          timer = setTimeout(
            () => reject(new StreamGuardError(`Stream chunk read timeout (${timeoutMs}ms)`)),
            timeoutMs
          );
        }
      );

      const result = await Promise.race([chunkPromise, timeoutPromise]);
      if (timer) clearTimeout(timer);

      if (result.done) break;

      chunksRead++;
      bytesRead += result.value.byteLength;

      if (chunksRead > maxChunks) {
        throw new StreamGuardError(`Exceeded maximum chunk limit (${maxChunks})`);
      }
      if (bytesRead > maxBytes) {
        throw new StreamGuardError(`Exceeded maximum byte stream limit (${maxBytes} bytes)`);
      }

      yield result.value;
    }
  } finally {
    if (timer) clearTimeout(timer);
    // P2 FIX: Wrap reader.cancel() with timeout to prevent hanging on stuck upstream
    try {
      await Promise.race([
        reader.cancel().catch(() => undefined),
        new Promise<void>((resolve) => setTimeout(resolve, 2000)),
      ]);
    } catch {
      // Ignore reader cancellation errors/timeout on cleanup
    }
  }
}
