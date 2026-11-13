/**
 * Opt-in zstd request bodies for the Codex backend (OMNIROUTE_CODEX_ZSTD_BODY, default off).
 *
 * A long Codex session re-sends hundreds of KB of JSON on every turn. With the flag on, a
 * string body of 4096+ characters sent to the exact host chatgpt.com under /backend-api/codex/
 * goes out as `Content-Encoding: zstd`. Support by the upstream is NOT verified, so the
 * design assumes a refusal: any 415, or a 400/403 whose body says the encoding or the JSON is
 * the problem, resends the SAME request uncompressed once and turns zstd off for that origin
 * for an hour. Any other API error (429, 5xx, a 400 about the content) is returned untouched
 * and never resent. Same shape as gzipRequestBody.ts; no dependency (node:zlib, Node 22.15+).
 * Skipped behind a proxy, TLS impersonation or a custom CA, like the gzip path.
 */
import zlib from "node:zlib";
import { promisify } from "node:util";
import { logger } from "../../utils/logger.ts";
import { captureCurrentProviderBody } from "../../utils/providerRequestLogging.ts";
import { isUrlHost } from "../../utils/urlHost.ts";
import { canGuardDirectConnection } from "../dispatchPin.ts";

export const ZSTD_REQUEST_BODY_MIN_CHARS = 4096;
const ZSTD_LEVEL = 3;
const CODEX_PATH_PREFIX = "/backend-api/codex/";
const LATCH_TTL_MS = 60 * 60 * 1000;
const REJECTION_BODY_READ_LIMIT = 8192;
// Bounded and anchored on words the upstream uses for an unsupported encoding or an unreadable body.
const ENCODING_REFUSAL =
  /\b(?:content[- ]encoding|zstd|unsupported media type|could not parse|not valid json)\b/i;

type Transport = (url: string, init: RequestInit) => Promise<Response>;

const zstdAsync = promisify(zlib.zstdCompress);
const log = logger("ZSTD_BODY");
const latchedUntilByOrigin = new Map<string, number>();

/** Test seam: forget which origins refused zstd. */
export function resetZstdLatchForTest(): void {
  latchedUntilByOrigin.clear();
}

export function isZstdBodyEnabled(env: Record<string, string | undefined> = process.env): boolean {
  return ["1", "true", "yes", "on"].includes(
    (env.OMNIROUTE_CODEX_ZSTD_BODY ?? "").trim().toLowerCase()
  );
}

function hasHeader(headers: HeadersInit | undefined, name: string): boolean {
  if (!headers) return false;
  if (headers instanceof Headers) return headers.has(name);
  if (Array.isArray(headers)) return headers.some(([key]) => key.toLowerCase() === name);
  return Object.keys(headers).some((key) => key.toLowerCase() === name);
}

function zstdHeaders(headers: HeadersInit | undefined): HeadersInit {
  if (headers && !(headers instanceof Headers) && !Array.isArray(headers)) {
    const out: Record<string, string> = {};
    for (const [key, value] of Object.entries(headers)) {
      if (key.toLowerCase() !== "content-length") out[key] = value;
    }
    out["Content-Encoding"] = "zstd";
    return out;
  }
  const out = new Headers(headers);
  out.delete("content-length");
  out.set("content-encoding", "zstd");
  return out;
}

async function readRefusalText(response: Response): Promise<string> {
  const reader = response.clone().body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder();
  let text = "";
  try {
    while (text.length < REJECTION_BODY_READ_LIMIT) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }
  } catch {
    return "";
  } finally {
    await reader.cancel().catch(() => undefined);
  }
  return text;
}

/** True when the answer to a zstd request means the encoding itself was refused. */
async function isZstdRejection(response: Response): Promise<boolean> {
  if (response.ok) return false;
  if (response.status === 415) return true;
  if (response.status !== 400 && response.status !== 403) return false;
  return ENCODING_REFUSAL.test(await readRefusalText(response));
}

function shouldZstd(provider: string, url: string, init: RequestInit, origin: string): boolean {
  if (!isZstdBodyEnabled() || provider !== "codex") return false;
  const body = init.body;
  if (typeof body !== "string" || body.length < ZSTD_REQUEST_BODY_MIN_CHARS) return false;
  if (!isUrlHost(url, "chatgpt.com") || !new URL(url).pathname.startsWith(CODEX_PATH_PREFIX))
    return false;
  if (process.env.NODE_EXTRA_CA_CERTS || hasHeader(init.headers, "content-encoding")) return false;
  const latchedUntil = latchedUntilByOrigin.get(origin);
  if (latchedUntil !== undefined) {
    if (Date.now() < latchedUntil) return false;
    latchedUntilByOrigin.delete(origin);
  }
  return canGuardDirectConnection(provider, url);
}

/**
 * `transport(url, init)` with a zstd body when the request qualifies, and one identity resend
 * when the origin refuses the encoding. The caller keeps its own retry, timeout and SSRF logic.
 */
export async function dispatchWithZstdBody(
  provider: string,
  url: string,
  init: RequestInit,
  transport: Transport
): Promise<Response> {
  let origin = url;
  try {
    origin = new URL(url).origin;
  } catch {
    return transport(url, init);
  }
  if (!shouldZstd(provider, url, init, origin)) return transport(url, init);

  const body = init.body as string;
  const compressed = await zstdAsync(body, {
    params: { [zlib.constants.ZSTD_c_compressionLevel]: ZSTD_LEVEL },
  });
  const headers = zstdHeaders(init.headers);
  // The fetch-level request capture cannot read compressed bytes: hand it the JSON directly.
  await captureCurrentProviderBody(url, Object.fromEntries(new Headers(headers)), body);
  const response = await transport(url, {
    ...init,
    headers,
    body: compressed as unknown as BodyInit,
  });
  if (!(await isZstdRejection(response))) return response;

  latchedUntilByOrigin.set(origin, Date.now() + LATCH_TTL_MS);
  log.warn("Origin refused a zstd request body; resent uncompressed", {
    origin,
    status: response.status,
    bodyChars: body.length,
  });
  await response.body?.cancel().catch(() => undefined);
  return transport(url, init);
}
