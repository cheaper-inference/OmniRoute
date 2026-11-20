import { throttleQuotaFetch } from "../quotaFetchThrottle.ts";

const PORTAL = "https://dev.meta.ai/api/portal";
const MAX_BYTES = 256 * 1024;
const REQUEST_MS = 8_000;

type PortalReply = { status: number; payload: unknown };

/** Fixed-origin, read-only transport. Cookies never enter URLs or diagnostics. */
export async function requestMuseConsole(path: string, session: string): Promise<PortalReply> {
  await throttleQuotaFetch();
  const signal = AbortSignal.timeout(REQUEST_MS);
  const expires = performance.now() + REQUEST_MS;
  const response = await fetch(`${PORTAL}${path}`, {
    method: "GET",
    redirect: "error",
    headers: { Accept: "application/json", Cookie: `llama_dev_sess=${session}` },
    signal,
  });
  return {
    status: response.status,
    payload: await decodeConsoleResponse(response, signal, expires),
  };
}

async function decodeConsoleResponse(
  response: Response,
  signal: AbortSignal,
  expires: number
): Promise<unknown> {
  const reader = response.body?.getReader();
  if (!reader) return null;
  const cancel = () => {
    void reader.cancel().catch(() => {});
  };
  signal.addEventListener("abort", cancel, { once: true });
  let consumed = false;
  try {
    if (!response.ok || Number(response.headers.get("content-length")) > MAX_BYTES) return null;
    const bytes = await collectConsoleBytes(reader, signal, expires);
    if (!bytes) return null;
    consumed = true;
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    // Malformed, interrupted or oversized responses cannot supply quota evidence.
    return null;
  } finally {
    signal.removeEventListener("abort", cancel);
    if (!consumed) cancel();
    reader.releaseLock();
  }
}

async function collectConsoleBytes(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  signal: AbortSignal,
  expires: number
): Promise<Uint8Array | null> {
  const parts: Uint8Array[] = [];
  let length = 0;
  for (;;) {
    if (signal.aborted || performance.now() >= expires) return null;
    const item = await reader.read();
    if (signal.aborted || performance.now() >= expires) return null;
    if (item.done) break;
    length += item.value.byteLength;
    if (length > MAX_BYTES) return null;
    parts.push(item.value);
  }
  const combined = new Uint8Array(length);
  let cursor = 0;
  for (const part of parts) {
    combined.set(part, cursor);
    cursor += part.byteLength;
  }
  return combined;
}
