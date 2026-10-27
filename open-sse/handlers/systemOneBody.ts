export class SystemOneResponseBodyError extends Error {
  constructor() {
    super("System One upstream response exceeds its bounded JSON contract");
  }
}

/** Shared native-only byte bound, including chunked/error bodies without Content-Length. */
export async function readBoundedSystemOneBody(
  response: Response,
  signal: AbortSignal,
  maxBytes: number
): Promise<string> {
  if (!Number.isSafeInteger(maxBytes) || maxBytes <= 0)
    throw new RangeError("Invalid System One response limit");
  const reader = response.body?.getReader();
  if (!reader) return "";
  const cancel = () => {
    void reader.cancel().catch(() => {}); // upstream cancellation cleanup is best effort
  };
  signal.addEventListener("abort", cancel, { once: true });
  try {
    signal.throwIfAborted();
    const declared = response.headers.get("content-length");
    if (declared && /^\d+$/.test(declared) && Number(declared) > maxBytes)
      throw new SystemOneResponseBodyError();
    const decoder = new TextDecoder("utf-8", { fatal: true });
    let bytes = 0;
    let text = "";
    while (true) {
      const next = await reader.read();
      signal.throwIfAborted();
      if (next.done) break;
      bytes += next.value.byteLength;
      if (bytes > maxBytes) throw new SystemOneResponseBodyError();
      text += decoder.decode(next.value, { stream: true });
    }
    return text + decoder.decode();
  } finally {
    signal.removeEventListener("abort", cancel);
    cancel();
    reader.releaseLock();
  }
}
