/**
 * Gzip request bodies for the official Anthropic API.
 *
 * Claude Code 2.1.3xx gzips large `/v1/messages` bodies. The API accepts `Content-Encoding: gzip`
 * only (br, zstd and deflate answer 415). A long coding session re-uploads hundreds of KB to
 * several MB of JSON on every turn, and that body compresses 3-4x.
 *
 * Rules, matched to the Claude Code 2.1.252 binary:
 * - only the exact host api.anthropic.com, only string bodies of 4096+ characters;
 * - skipped behind a proxy, TLS impersonation or a custom CA (a middlebox may not decode it);
 * - a refusal (415; a 400/403/415 that does not come from Anthropic; a 400 whose message says the
 *   body is not valid JSON) resends the SAME request uncompressed once and turns gzip off for that
 *   origin. Any other API error is returned untouched and never resent.
 *
 * Differences from Claude Code, on purpose:
 * - any 415 counts as a refusal (Claude Code only counts a 415 that does not come from Anthropic):
 *   a 415 to a gzip body means the encoding, and the resend costs one unprocessed request;
 * - async zlib: a gateway serves many requests, `gzipSync` would block the event loop;
 * - the latch expires after one hour, because this process lives for weeks;
 * - no length padding when the body carries a signed `cch=` token: the signature covers the bytes.
 *   shortcut: unsigned bodies get Claude Code's random trailing whitespace, signed ones do not.
 *   Upgrade when the server's cch scope over decoded bytes is confirmed.
 *
 * Off switch: `OMNIROUTE_GZIP_REQUEST_BODIES=0`.
 */
import zlib from "node:zlib";
import { promisify } from "node:util";
import { logger } from "../../utils/logger.ts";
import { captureCurrentProviderBody } from "../../utils/providerRequestLogging.ts";
import { isUrlHost } from "../../utils/urlHost.ts";
import { canGuardDirectConnection } from "../dispatchPin.ts";

export const GZIP_REQUEST_BODY_MIN_CHARS = 4096;
const GZIP_LEVEL = 3; // 3.7x at 27 ms for a 3 MB body; level 6 gains 12% more for 2x the CPU.
const MAX_LENGTH_PADDING = 256;
const REJECTION_BODY_READ_LIMIT = 8192;
const LATCH_TTL_MS = 60 * 60 * 1000;
const ORIGIN_JSON_PARSE_FAILURES = [
  "The request body is not valid JSON",
  "Failed to parse request: could not parse request body as JSON",
];
const SIGNED_BODY = /\bcch=[0-9a-f]{5};/;

type Transport = (url: string, init: RequestInit) => Promise<Response>;

const gzipAsync = promisify(zlib.gzip);
const log = logger("GZIP_BODY");
const latchedUntilByOrigin = new Map<string, number>();

/** Test seam: forget which origins refused gzip. */
export function resetGzipLatchForTest(): void {
  latchedUntilByOrigin.clear();
}

function gzipDisabledByEnv(): boolean {
  const value = (process.env.OMNIROUTE_GZIP_REQUEST_BODIES ?? "").trim().toLowerCase();
  return value === "0" || value === "false" || value === "off" || value === "no";
}

function hasHeader(headers: HeadersInit | undefined, name: string): boolean {
  if (!headers) return false;
  if (headers instanceof Headers) return headers.has(name);
  if (Array.isArray(headers)) return headers.some(([key]) => key.toLowerCase() === name);
  return Object.keys(headers).some((key) => key.toLowerCase() === name);
}

function gzipHeaders(headers: HeadersInit | undefined): HeadersInit {
  if (headers && !(headers instanceof Headers) && !Array.isArray(headers)) {
    const out: Record<string, string> = {};
    for (const [key, value] of Object.entries(headers)) {
      if (key.toLowerCase() !== "content-length") out[key] = value;
    }
    out["Content-Encoding"] = "gzip";
    return out;
  }
  const out = new Headers(headers);
  out.delete("content-length");
  out.set("content-encoding", "gzip");
  return out;
}

function lengthPadding(): string {
  const count = Math.floor(Math.random() * (MAX_LENGTH_PADDING + 1));
  let padding = "\n";
  for (let i = 0; i < count; i++) padding += Math.random() < 0.5 ? " " : "\t";
  return padding;
}

function isFromAnthropic(response: Response): boolean {
  return (
    response.headers.get("request-id")?.startsWith("req_") === true ||
    response.headers.has("cf-ray")
  );
}

async function originSaysBodyIsNotJson(response: Response): Promise<boolean> {
  const reader = response.clone().body?.getReader();
  if (!reader) return false;
  const decoder = new TextDecoder();
  let text = "";
  try {
    while (text.length < REJECTION_BODY_READ_LIMIT) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }
  } catch {
    return false;
  } finally {
    await reader.cancel().catch(() => undefined);
  }
  try {
    const message = (JSON.parse(text) as { error?: { message?: unknown } })?.error?.message;
    return (
      typeof message === "string" &&
      ORIGIN_JSON_PARSE_FAILURES.some((prefix) => message.startsWith(prefix))
    );
  } catch {
    return false;
  }
}

/** True when the answer to a gzip request means the encoding itself was refused. */
async function isGzipRejection(response: Response): Promise<boolean> {
  if (response.ok) return false;
  if (response.status === 415) return true;
  if (response.status !== 400 && response.status !== 403) return false;
  if (!isFromAnthropic(response)) return true;
  return response.status === 400 && (await originSaysBodyIsNotJson(response));
}

function shouldGzip(provider: string, url: string, init: RequestInit, origin: string): boolean {
  const body = init.body;
  if (typeof body !== "string" || body.length < GZIP_REQUEST_BODY_MIN_CHARS) return false;
  if (!isUrlHost(url, "api.anthropic.com")) return false;
  if (gzipDisabledByEnv() || process.env.NODE_EXTRA_CA_CERTS) return false;
  if (hasHeader(init.headers, "content-encoding")) return false;
  const latchedUntil = latchedUntilByOrigin.get(origin);
  if (latchedUntil !== undefined) {
    if (Date.now() < latchedUntil) return false;
    latchedUntilByOrigin.delete(origin);
  }
  return canGuardDirectConnection(provider, url);
}

/**
 * `transport(url, init)` with a gzip body when the request qualifies, and one identity resend when
 * the origin refuses the encoding. The caller keeps its own retry, timeout and SSRF logic.
 */
export async function dispatchWithGzipBody(
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
  if (!shouldGzip(provider, url, init, origin)) return transport(url, init);

  const body = init.body as string;
  const payload = SIGNED_BODY.test(body) ? body : body + lengthPadding();
  const compressed = await gzipAsync(payload, { level: GZIP_LEVEL });
  const headers = gzipHeaders(init.headers);
  // The fetch-level request capture cannot read compressed bytes: hand it the JSON directly.
  await captureCurrentProviderBody(url, Object.fromEntries(new Headers(headers)), body);
  const response = await transport(url, {
    ...init,
    headers,
    body: compressed as unknown as BodyInit,
  });
  if (!(await isGzipRejection(response))) return response;

  latchedUntilByOrigin.set(origin, Date.now() + LATCH_TTL_MS);
  log.warn("Origin refused a gzip request body; resent uncompressed", {
    origin,
    status: response.status,
    bodyChars: body.length,
  });
  await response.body?.cancel().catch(() => undefined);
  return transport(url, init);
}
