/**
 * HTTP `Content-Encoding` decoding for inbound JSON request bodies.
 *
 * `Request.json()` does not undo a request's Content-Encoding, so a client that compresses
 * its request (Codex CLI sends zstd to OpenAI-compatible providers) would otherwise be told
 * "Invalid JSON body". The chat body admission decodes once, right after its bounded ingest,
 * and passes its own hard body limit as `maxOutputLength` so the expanded body obeys the
 * same ceiling as an uncompressed one (decompression-bomb guard).
 *
 * Only single-value encodings are accepted; a stacked list such as `gzip, zstd` is reported
 * as unsupported. Errors are returned as reasons, never thrown, so no zlib message can leak
 * into a response body.
 */
import zlib from "node:zlib";
import { promisify } from "node:util";

type Decompressor = (input: Uint8Array, options: zlib.ZlibOptions) => Promise<Buffer>;

function feature(name: "zstdDecompress"): Decompressor | null {
  // zstd needs Node >= 22.15; the best-effort Bun path may lack it, so feature-detect.
  const fn = (zlib as unknown as Record<string, unknown>)[name];
  return typeof fn === "function" ? (promisify(fn) as Decompressor) : null;
}

const DECOMPRESSORS: Readonly<Record<string, Decompressor | null>> = {
  gzip: promisify(zlib.gunzip) as Decompressor,
  "x-gzip": promisify(zlib.gunzip) as Decompressor,
  br: promisify(zlib.brotliDecompress) as Decompressor,
  deflate: promisify(zlib.inflate) as Decompressor,
  zstd: feature("zstdDecompress"),
};

export type RequestBodyDecodeResult =
  { ok: true; body: Uint8Array } | { ok: false; reason: "unsupported" | "too_large" | "invalid" };

/** Lower-cased, trimmed encoding token, or `null` for an absent / identity encoding. */
export function normalizeContentEncoding(header: string | null | undefined): string | null {
  const value = (header ?? "").trim().toLowerCase();
  return value === "" || value === "identity" ? null : value;
}

/** Decode `bytes` per `encoding` (already normalized), expanding to at most `maxOutputLength`. */
export async function decodeRequestBodyBytes(
  bytes: Uint8Array,
  encoding: string,
  maxOutputLength: number
): Promise<RequestBodyDecodeResult> {
  const decompress = Object.hasOwn(DECOMPRESSORS, encoding) ? DECOMPRESSORS[encoding] : null;
  if (!decompress) return { ok: false, reason: "unsupported" };
  try {
    const decoded = await decompress(bytes, { maxOutputLength });
    return {
      ok: true,
      body: new Uint8Array(decoded.buffer, decoded.byteOffset, decoded.byteLength),
    };
  } catch (error) {
    const code = (error as { code?: unknown } | null)?.code;
    return { ok: false, reason: code === "ERR_BUFFER_TOO_LARGE" ? "too_large" : "invalid" };
  }
}
