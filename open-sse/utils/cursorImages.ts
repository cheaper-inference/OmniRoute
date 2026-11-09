/**
 * Image resolution + security for Cursor vision input.
 *
 * Turns OpenAI `image_url` parts (base64 `data:` URIs or remote `http(s)`
 * URLs) into decoded, JPEG-prepped bytes ready for SelectedImage
 * `blobIdWithData` encoding (see cursorAgentProtobuf.ts).
 *
 * Security (OmniRoute hard rules):
 *  - SSRF: remote fetches go through the repo's canonical outbound guard
 *    (`parseAndValidatePublicUrl`), which rejects non-http(s) schemes,
 *    embedded credentials, localhost, link-local, private/CGNAT ranges, and
 *    cloud-metadata hostnames. Client-supplied image URLs are always held to
 *    the strict public-only policy (never gated by the private-URL toggle that
 *    admin-configured provider URLs use).
 *  - Size caps: inbound decode/fetch is bounded (16 MiB) so large clipboard
 *    PNGs can shrink via JPEG soft-cap prep; the final wire image must be
 *    <= 1 MiB. Soft target is ~100 KiB JPEG for reliable Cursor hydration.
 *  - Content type: data URIs and URL responses must be `image/*`.
 *  - Errors throw `CursorImageError` with a clean, path-free message; the
 *    executor routes it through the sanitized 400 path (hard rule #12).
 */

import crypto from "node:crypto";
import dns from "node:dns";
import { isIP } from "node:net";
import {
  parseAndValidatePublicUrl,
  isPrivateHost,
  OutboundUrlGuardError,
} from "@/shared/network/outboundUrlGuard";
import type { EncodedImage } from "./cursorAgentProtobuf.ts";

type SharpFactory = (typeof import("sharp"))["default"];

let sharpFactoryPromise: Promise<SharpFactory> | undefined;

function loadSharp(): Promise<SharpFactory> {
  sharpFactoryPromise ??= import("sharp").then((module) => module.default);
  return sharpFactoryPromise;
}

/** Final per-image byte cap after prep (composer-api / wire bound). */
export const MAX_CURSOR_IMAGE_BYTES = 1024 * 1024;

/**
 * Inbound decode/fetch bomb ceiling before JPEG prep. Large clipboard PNGs may
 * exceed {@link MAX_CURSOR_IMAGE_BYTES} raw but shrink under the wire cap after
 * re-encode.
 */
export const MAX_CURSOR_IMAGE_DECODE_BYTES = 16 * 1024 * 1024;

/**
 * Soft target for Cursor vision hydration. Prefer JPEG at or under this size.
 */
export const CURSOR_VISION_SOFT_MAX_BYTES = 100 * 1024;

/** Soft target when the client requests `detail: original` or `high`. */
export const CURSOR_VISION_SOFT_MAX_BYTES_HIGH = 256 * 1024;

/** Longest edge after Cursor vision prep. */
export const CURSOR_VISION_MAX_EDGE = 2000;

/** Decode bomb: reject images whose sniffed longest edge exceeds this. */
export const MAX_CURSOR_IMAGE_DECODE_EDGE = 8192;

/** Decode bomb: reject images whose sniffed pixel count exceeds this. */
export const MAX_CURSOR_IMAGE_PIXELS = 25_000_000;

const CURSOR_VISION_JPEG_QUALITIES_DEFAULT = [85, 70, 55, 40] as const;
const CURSOR_VISION_JPEG_QUALITIES_HIGH = [90, 80, 65, 50] as const;
const CURSOR_VISION_SOFT_MIN_EDGE = 256;
const CURSOR_VISION_SOFT_SHRINK = 0.85;

const CURSOR_VISION_PASSTHROUGH_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
]);

/** Upper bound on images attached to one Cursor turn. */
export const MAX_CURSOR_IMAGES = 12;

// Wall-clock cap for a single remote image fetch. A malformed env value
// (NaN / non-positive) falls back to the default rather than breaking setTimeout.
const IMAGE_FETCH_TIMEOUT_MS = (() => {
  const parsed = parseInt(process.env.CURSOR_IMAGE_FETCH_TIMEOUT_MS || "15000", 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 15000;
})();

// Bound on how many redirects fetchImageBytes will follow (each re-validated
// against the SSRF guard before the next hop).
const MAX_IMAGE_REDIRECTS = 3;

/**
 * A 400-class error carrying a clean, non-sensitive message. The executor
 * catches it and emits a sanitized error response.
 */
export class CursorImageError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = "CursorImageError";
    this.status = status;
  }
}

function estimatedBase64DecodedBytes(payload: string): number {
  return Math.floor((payload.length * 3) / 4);
}

function isHighDetail(detail: string | undefined): boolean {
  const normalized = (detail || "").toLowerCase();
  return normalized === "high" || normalized === "original";
}

function softMaxBytesForDetail(detail: string | undefined): number {
  return isHighDetail(detail) ? CURSOR_VISION_SOFT_MAX_BYTES_HIGH : CURSOR_VISION_SOFT_MAX_BYTES;
}

function jpegQualitiesForDetail(detail: string | undefined): readonly number[] {
  return isHighDetail(detail)
    ? CURSOR_VISION_JPEG_QUALITIES_HIGH
    : CURSOR_VISION_JPEG_QUALITIES_DEFAULT;
}

function decodeDataUrl(url: string): { data: Buffer; mimeType: string } {
  // data:[<mediatype>][;base64],<data>
  const comma = url.indexOf(",");
  if (comma < 0) {
    throw new CursorImageError("Image data URL is malformed.");
  }
  const header = url.slice(5, comma); // strip leading "data:"
  const payload = url.slice(comma + 1);
  const isBase64 = /;base64/i.test(header);
  const mimeType = (header.split(";")[0] || "").trim().toLowerCase() || "application/octet-stream";

  if (!mimeType.startsWith("image/")) {
    throw new CursorImageError("Image data URL must have an image/* media type.");
  }
  if (!isBase64) {
    // Non-base64 data URLs (percent-encoded) are not a real image transport;
    // reject rather than guess.
    throw new CursorImageError("Image data URL must be base64-encoded.");
  }

  // Reject on the raw payload length BEFORE the regex/normalize pass, so an
  // arbitrarily large data URL can't burn CPU on the whitespace strip. Base64
  // expands ~4:3, so 2x the decode ceiling is a safe upper bound on the text.
  if (payload.length > MAX_CURSOR_IMAGE_DECODE_BYTES * 2) {
    throw new CursorImageError("Image input is too large to process safely.");
  }

  const normalized = payload.replace(/\s/g, "");
  if (normalized.length === 0) {
    throw new CursorImageError("Image data URL contains invalid base64 data.");
  }
  // Reject lenient Buffer.from acceptances (wrong alphabet, bad padding).
  if (normalized.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(normalized)) {
    throw new CursorImageError("Image data URL contains invalid base64 data.");
  }
  if (estimatedBase64DecodedBytes(normalized) > MAX_CURSOR_IMAGE_DECODE_BYTES) {
    throw new CursorImageError("Image input is too large to process safely.");
  }

  let data: Buffer;
  try {
    data = Buffer.from(normalized, "base64");
  } catch {
    throw new CursorImageError("Image data URL contains invalid base64 data.");
  }
  if (data.length === 0) {
    throw new CursorImageError("Image data URL contains invalid base64 data.");
  }
  // Round-trip guard: Node can silently drop trailing garbage.
  if (data.toString("base64").replace(/=+$/, "") !== normalized.replace(/=+$/, "")) {
    throw new CursorImageError("Image data URL contains invalid base64 data.");
  }
  if (data.length > MAX_CURSOR_IMAGE_DECODE_BYTES) {
    throw new CursorImageError("Image input is too large to process safely.");
  }
  return { data, mimeType };
}

// Validate a URL through the SSRF guard, mapping guard errors to clean,
// non-sensitive CursorImageErrors (no URL echoed back).
function validatePublicImageUrl(url: string): URL {
  try {
    return parseAndValidatePublicUrl(url);
  } catch (err) {
    if (err instanceof OutboundUrlGuardError) {
      throw new CursorImageError(
        err.code === "OUTBOUND_URL_INVALID"
          ? "Image URL is invalid or uses an unsupported scheme."
          : "Image URL points to a blocked address."
      );
    }
    throw new CursorImageError("Image URL is invalid.");
  }
}

/**
 * Throw if any of the resolved addresses falls in a private / link-local /
 * loopback / CGNAT / metadata range. Exported for unit testing the IP gate
 * without going through DNS.
 */
export function assertResolvedAddressesPublic(addresses: string[]): void {
  for (const addr of addresses) {
    if (isPrivateHost(addr)) {
      throw new CursorImageError("Image URL points to a blocked address.");
    }
  }
}

/**
 * Defence-in-depth against DNS-rebinding SSRF: `parseAndValidatePublicUrl`
 * only checks the hostname *string*, so a public-looking host that resolves to
 * a private/metadata IP would otherwise be fetched. Resolve the host and
 * reject if ANY answer is private. IP literals are skipped (already validated
 * by the guard above). This narrows — but doesn't fully eliminate — the
 * TOCTOU window between our resolution and fetch's own; a connection-time IP
 * filter (e.g. ssrf-req-filter) on the shared outbound guard would close it
 * for every caller.
 */
async function assertHostnameResolvesPublic(hostname: string): Promise<void> {
  const bare =
    hostname.startsWith("[") && hostname.endsWith("]") ? hostname.slice(1, -1) : hostname;
  if (isIP(bare)) return; // IP literal — already checked by the URL guard.
  let resolved: Array<{ address: string }>;
  try {
    resolved = await dns.promises.lookup(bare, { all: true });
  } catch {
    throw new CursorImageError("Image URL host could not be resolved.");
  }
  assertResolvedAddressesPublic(resolved.map((r) => r.address));
}

async function fetchImageBytes(url: string): Promise<{ data: Buffer; mimeType: string }> {
  // Follow redirects MANUALLY and re-validate every hop through the SSRF guard.
  // `fetch` follows redirects by default, so validating only the initial URL
  // would let a public host 30x-redirect to a private/link-local address and
  // bypass the guard. Each Location is resolved + re-checked before we fetch it.
  let currentUrl = url;
  for (let hop = 0; hop <= MAX_IMAGE_REDIRECTS; hop++) {
    const parsed = validatePublicImageUrl(currentUrl);
    // Resolve + IP-check the host (DNS-rebinding defence) before connecting.
    await assertHostnameResolvesPublic(parsed.hostname);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), IMAGE_FETCH_TIMEOUT_MS);
    let response: Response;
    try {
      response = await fetch(parsed.toString(), {
        method: "GET",
        signal: controller.signal,
        redirect: "manual",
      });
    } catch {
      clearTimeout(timer);
      throw new CursorImageError("Could not fetch the image URL.");
    }
    try {
      // Manual redirect: resolve Location against the current URL and loop so
      // the next hop is re-validated by the SSRF guard.
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");
        if (!location) {
          throw new CursorImageError("Image URL redirect is missing a destination.");
        }
        try {
          currentUrl = new URL(location, parsed.toString()).toString();
        } catch {
          throw new CursorImageError("Image URL redirect destination is invalid.");
        }
        continue;
      }

      if (!response.ok) {
        throw new CursorImageError(`Could not fetch the image URL (status ${response.status}).`);
      }
      const contentType = (response.headers.get("content-type") || "").toLowerCase();
      const mimeType = contentType.split(";")[0].trim();
      if (!mimeType.startsWith("image/")) {
        throw new CursorImageError("Image URL did not return an image content type.");
      }
      // Reject early on an oversized Content-Length, then still cap during read
      // (the header is advisory / may be absent).
      const declaredLen = Number(response.headers.get("content-length") || "0");
      if (Number.isFinite(declaredLen) && declaredLen > MAX_CURSOR_IMAGE_DECODE_BYTES) {
        throw new CursorImageError("Image input is too large to process safely.");
      }
      const data = await readCapped(response, MAX_CURSOR_IMAGE_DECODE_BYTES);
      return { data, mimeType };
    } finally {
      clearTimeout(timer);
    }
  }
  throw new CursorImageError("Image URL has too many redirects.");
}

/**
 * Read a fetch Response body into a Buffer, aborting as soon as the
 * accumulated size exceeds `cap`. Consumes the body incrementally — as an
 * async iterable (Node Readable streams and Web Streams both support this) or
 * via a web ReadableStream reader — so an oversized body is rejected mid-read
 * rather than fully buffered. The uncapped arrayBuffer() path is only a last
 * resort for exotic body shapes, and is still cap-checked afterwards.
 */
async function readCapped(response: Response, cap: number): Promise<Buffer> {
  const body = response.body as
    | (AsyncIterable<Uint8Array> & { getReader?: () => ReadableStreamDefaultReader<Uint8Array> })
    | null;
  if (!body) {
    return Buffer.alloc(0);
  }

  const chunks: Buffer[] = [];
  let total = 0;
  const pushCapped = (chunk: Uint8Array) => {
    total += chunk.byteLength;
    if (total > cap) {
      throw new CursorImageError("Image input is too large to process safely.");
    }
    chunks.push(Buffer.from(chunk));
  };

  // Preferred: async iteration (works for Node Readable + Web Streams).
  if (typeof (body as { [Symbol.asyncIterator]?: unknown })[Symbol.asyncIterator] === "function") {
    for await (const chunk of body) {
      pushCapped(chunk as Uint8Array);
    }
    return Buffer.concat(chunks, total);
  }

  // Fallback: web ReadableStream reader.
  if (typeof body.getReader === "function") {
    const reader = body.getReader();
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) pushCapped(value);
      }
    } finally {
      try {
        await reader.cancel();
      } catch {
        /* already closed */
      }
    }
    return Buffer.concat(chunks, total);
  }

  // Last resort: buffer then cap-check (only exotic non-stream bodies).
  const buf = Buffer.from(await response.arrayBuffer());
  if (buf.length > cap) {
    throw new CursorImageError("Image input is too large to process safely.");
  }
  return buf;
}

/** Magic-byte format sniff (independent of declared MIME). */
export function sniffCursorImageFormat(
  data: Uint8Array
): "png" | "jpeg" | "gif" | "webp" | undefined {
  if (
    data.byteLength >= 8 &&
    data[0] === 0x89 &&
    data[1] === 0x50 &&
    data[2] === 0x4e &&
    data[3] === 0x47 &&
    data[4] === 0x0d &&
    data[5] === 0x0a &&
    data[6] === 0x1a &&
    data[7] === 0x0a
  ) {
    return "png";
  }
  if (
    data.byteLength >= 6 &&
    data[0] === 0x47 &&
    data[1] === 0x49 &&
    data[2] === 0x46 &&
    data[3] === 0x38
  ) {
    return "gif";
  }
  if (data.byteLength >= 4 && data[0] === 0xff && data[1] === 0xd8) return "jpeg";
  if (
    data.byteLength >= 12 &&
    data[0] === 0x52 &&
    data[1] === 0x49 &&
    data[2] === 0x46 &&
    data[3] === 0x46 &&
    data[8] === 0x57 &&
    data[9] === 0x45 &&
    data[10] === 0x42 &&
    data[11] === 0x50
  ) {
    return "webp";
  }
  return undefined;
}

/**
 * Sniff PNG/JPEG/GIF/WebP dimensions from raw bytes when the header is present.
 * Best-effort only — unknown formats return undefined (dimension is optional).
 */
export function sniffCursorImageDimensions(
  data: Uint8Array
): { width: number; height: number } | undefined {
  // PNG: signature + IHDR chunk (width/height at bytes 16..23)
  if (
    data.byteLength >= 24 &&
    data[0] === 0x89 &&
    data[1] === 0x50 &&
    data[2] === 0x4e &&
    data[3] === 0x47 &&
    data[4] === 0x0d &&
    data[5] === 0x0a &&
    data[6] === 0x1a &&
    data[7] === 0x0a
  ) {
    const width = ((data[16]! << 24) | (data[17]! << 16) | (data[18]! << 8) | data[19]!) >>> 0;
    const height = ((data[20]! << 24) | (data[21]! << 16) | (data[22]! << 8) | data[23]!) >>> 0;
    if (width > 0 && height > 0) return { width, height };
  }
  // GIF: "GIF8" + width/height as little-endian u16 at bytes 6..9
  if (
    data.byteLength >= 10 &&
    data[0] === 0x47 &&
    data[1] === 0x49 &&
    data[2] === 0x46 &&
    data[3] === 0x38
  ) {
    const width = data[6]! | (data[7]! << 8);
    const height = data[8]! | (data[9]! << 8);
    if (width > 0 && height > 0) return { width, height };
  }
  // WebP: RIFF....WEBP + VP8X / VP8 / VP8L
  if (
    data.byteLength >= 30 &&
    data[0] === 0x52 &&
    data[1] === 0x49 &&
    data[2] === 0x46 &&
    data[3] === 0x46 &&
    data[8] === 0x57 &&
    data[9] === 0x45 &&
    data[10] === 0x42 &&
    data[11] === 0x50
  ) {
    const fourcc = String.fromCharCode(data[12]!, data[13]!, data[14]!, data[15]!);
    if (fourcc === "VP8X") {
      const width = 1 + (data[24]! | (data[25]! << 8) | (data[26]! << 16));
      const height = 1 + (data[27]! | (data[28]! << 8) | (data[29]! << 16));
      if (width > 0 && height > 0) return { width, height };
    } else if (fourcc === "VP8 ") {
      if (data[23] === 0x9d && data[24] === 0x01 && data[25] === 0x2a) {
        const width = (data[26]! | (data[27]! << 8)) & 0x3fff;
        const height = (data[28]! | (data[29]! << 8)) & 0x3fff;
        if (width > 0 && height > 0) return { width, height };
      }
    } else if (fourcc === "VP8L" && data[20] === 0x2f) {
      const raw = data[21]! | (data[22]! << 8) | (data[23]! << 16) | (data[24]! << 24);
      const width = (raw & 0x3fff) + 1;
      const height = ((raw >> 14) & 0x3fff) + 1;
      if (width > 0 && height > 0) return { width, height };
    }
  }
  // JPEG: scan for SOF0/SOF2 marker with dimensions
  if (data.byteLength >= 4 && data[0] === 0xff && data[1] === 0xd8) {
    let offset = 2;
    while (offset + 8 < data.byteLength) {
      if (data[offset] !== 0xff) break;
      const marker = data[offset + 1]!;
      // Standalone markers (TEM, RSTn, SOI, EOI) carry no length payload.
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
        offset += 2;
        continue;
      }
      const length = (data[offset + 2]! << 8) | data[offset + 3]!;
      if (marker === 0xc0 || marker === 0xc2) {
        const height = (data[offset + 5]! << 8) | data[offset + 6]!;
        const width = (data[offset + 7]! << 8) | data[offset + 8]!;
        if (width > 0 && height > 0) return { width, height };
        break;
      }
      if (length < 2) break;
      offset += 2 + length;
    }
  }
  return undefined;
}

type PreparedImage = {
  data: Buffer;
  mimeType: string;
  width?: number;
  height?: number;
};

/**
 * Re-encode toward a JPEG under the soft vision cap when sharp can decode the
 * payload. Fail-closed with CursorImageError on unsupported MIME, decode bombs,
 * or undecodable bytes. After the quality ladder, edges shrink iteratively
 * until the soft byte cap is met (or the min edge floor is hit).
 */
export async function prepareCursorImageForWire(input: {
  data: Buffer;
  mimeType: string;
  detail?: string;
}): Promise<PreparedImage> {
  const sharp = await loadSharp();
  const mime = input.mimeType.toLowerCase();
  const softMax = softMaxBytesForDetail(input.detail);
  const qualities = jpegQualitiesForDetail(input.detail);
  const lowestQuality = qualities[qualities.length - 1]!;

  if (!CURSOR_VISION_PASSTHROUGH_MIME.has(mime)) {
    throw new CursorImageError("Image input type is unsupported.");
  }

  const format = sniffCursorImageFormat(input.data);
  const sniffed = sniffCursorImageDimensions(input.data);
  if (sniffed) {
    const edge = Math.max(sniffed.width, sniffed.height);
    const pixels = sniffed.width * sniffed.height;
    if (edge > MAX_CURSOR_IMAGE_DECODE_EDGE || pixels > MAX_CURSOR_IMAGE_PIXELS) {
      throw new CursorImageError("Image input dimensions are too large.");
    }
  }

  // Soft-cap skip: already soft-capped JPEG that has a real SOF (not SOI-only).
  const declaredJpeg = mime === "image/jpeg" || mime === "image/jpg";
  const alreadySmallJpeg =
    declaredJpeg && format === "jpeg" && sniffed !== undefined && input.data.byteLength <= softMax;
  if (alreadySmallJpeg) {
    return {
      data: input.data,
      mimeType: "image/jpeg",
      width: sniffed!.width,
      height: sniffed!.height,
    };
  }

  try {
    // Force a full decode before accepting passthrough / encode.
    await sharp(input.data, { failOn: "error" }).resize(1, 1).jpeg({ quality: 1 }).toBuffer();

    // Passthrough only when declared MIME matches actual JPEG magic.
    if (declaredJpeg && format === "jpeg" && input.data.byteLength <= softMax) {
      const dims = sniffed ?? (await sharp(input.data).metadata());
      const width = typeof dims.width === "number" ? dims.width : undefined;
      const height = typeof dims.height === "number" ? dims.height : undefined;
      return {
        data: input.data,
        mimeType: "image/jpeg",
        ...(width && height && width > 0 && height > 0 ? { width, height } : {}),
      };
    }

    const meta = await sharp(input.data).metadata();
    const width = typeof meta.width === "number" ? meta.width : 0;
    const height = typeof meta.height === "number" ? meta.height : 0;
    if (width > 0 && height > 0) {
      const edge = Math.max(width, height);
      if (edge > MAX_CURSOR_IMAGE_DECODE_EDGE || width * height > MAX_CURSOR_IMAGE_PIXELS) {
        throw new CursorImageError("Image input dimensions are too large.");
      }
    }

    let targetW = width;
    let targetH = height;
    if (width > 0 && height > 0 && Math.max(width, height) > CURSOR_VISION_MAX_EDGE) {
      const scale = CURSOR_VISION_MAX_EDGE / Math.max(width, height);
      targetW = Math.max(1, Math.round(width * scale));
      targetH = Math.max(1, Math.round(height * scale));
    }

    const encodeAt = async (w: number, h: number, quality: number): Promise<Buffer> => {
      let pipeline = sharp(input.data, { failOn: "error" });
      if (w > 0 && h > 0 && (w !== width || h !== height)) {
        pipeline = pipeline.resize(w, h);
      }
      return pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();
    };

    let best: Buffer | undefined;
    for (const quality of qualities) {
      const encoded = await encodeAt(targetW, targetH, quality);
      if (!best || encoded.byteLength < best.byteLength) best = encoded;
      if (encoded.byteLength <= softMax) {
        const outDims = sniffCursorImageDimensions(encoded);
        return {
          data: encoded,
          mimeType: "image/jpeg",
          ...(outDims ?? (targetW > 0 && targetH > 0 ? { width: targetW, height: targetH } : {})),
        };
      }
    }

    while (
      best &&
      best.byteLength > softMax &&
      targetW > 0 &&
      targetH > 0 &&
      Math.max(targetW, targetH) > CURSOR_VISION_SOFT_MIN_EDGE
    ) {
      const nextW = Math.max(1, Math.round(targetW * CURSOR_VISION_SOFT_SHRINK));
      const nextH = Math.max(1, Math.round(targetH * CURSOR_VISION_SOFT_SHRINK));
      if (Math.max(nextW, nextH) < CURSOR_VISION_SOFT_MIN_EDGE) {
        const scale = CURSOR_VISION_SOFT_MIN_EDGE / Math.max(targetW, targetH);
        targetW = Math.max(1, Math.round(targetW * scale));
        targetH = Math.max(1, Math.round(targetH * scale));
      } else {
        targetW = nextW;
        targetH = nextH;
      }
      const encoded = await encodeAt(targetW, targetH, lowestQuality);
      if (!best || encoded.byteLength < best.byteLength) best = encoded;
      if (encoded.byteLength <= softMax) {
        const outDims = sniffCursorImageDimensions(encoded);
        return {
          data: encoded,
          mimeType: "image/jpeg",
          ...(outDims ?? { width: targetW, height: targetH }),
        };
      }
      if (Math.max(targetW, targetH) <= CURSOR_VISION_SOFT_MIN_EDGE) break;
    }

    if (best) {
      const outDims = sniffCursorImageDimensions(best);
      return {
        data: best,
        mimeType: "image/jpeg",
        ...(outDims ?? (targetW > 0 && targetH > 0 ? { width: targetW, height: targetH } : {})),
      };
    }

    if (declaredJpeg && format !== "jpeg") {
      throw new CursorImageError("Image input is not a valid JPEG.");
    }
    throw new CursorImageError("Image input could not be prepared for Cursor vision.");
  } catch (err) {
    if (err instanceof CursorImageError) throw err;
    throw new CursorImageError("Image input is undecodable or unsupported.");
  }
}

/**
 * Resolve OpenAI `image_url` URLs (data: or http(s):) into EncodedImage[]
 * ready for SelectedImage blobIdWithData encoding. Each image gets a stable
 * random uuid. Throws CursorImageError (clean message, sanitizable) on any
 * invalid / oversized / blocked / undecodable input.
 */
export async function resolveCursorImages(
  imageUrls: string[],
  options?: { detail?: string; prepareForWire?: boolean }
): Promise<EncodedImage[]> {
  // Cursor's SelectedImage wire format needs the JPEG soft-cap prep (#9840).
  // Browser-upload callers (zai-web, conol-web) upload the ORIGINAL bytes to
  // their own web UIs, so they opt out and keep the pre-#9840 decode+validate
  // behavior: raw data + declared mimeType, capped at MAX_CURSOR_IMAGE_BYTES.
  const prepareForWire = options?.prepareForWire !== false;
  if (imageUrls.length > MAX_CURSOR_IMAGES) {
    throw new CursorImageError(`Too many images in one request (max ${MAX_CURSOR_IMAGES}).`);
  }
  const out: EncodedImage[] = [];
  for (const url of imageUrls) {
    if (typeof url !== "string" || !url) {
      throw new CursorImageError("Image URL is missing.");
    }
    // The data: scheme is case-insensitive (RFC 2397); match it that way but
    // pass the original (un-lowercased) url so the base64 payload is preserved.
    const { data, mimeType } = url.toLowerCase().startsWith("data:")
      ? decodeDataUrl(url)
      : await fetchImageBytes(url);
    if (!data.length) {
      throw new CursorImageError("Image input is empty.");
    }
    if (data.length > MAX_CURSOR_IMAGE_DECODE_BYTES) {
      throw new CursorImageError("Image input is too large to process safely.");
    }

    if (!prepareForWire) {
      if (data.length > MAX_CURSOR_IMAGE_BYTES) {
        throw new CursorImageError("Image input is too large (max 1 MiB). Resize and retry.");
      }
      out.push({ data, mimeType, uuid: crypto.randomUUID() });
      continue;
    }

    const prepared = await prepareCursorImageForWire({
      data,
      mimeType,
      detail: options?.detail,
    });
    if (prepared.data.length > MAX_CURSOR_IMAGE_BYTES) {
      throw new CursorImageError("Image input is too large (max 1 MiB). Resize and retry.");
    }

    out.push({
      data: prepared.data,
      mimeType: prepared.mimeType,
      uuid: crypto.randomUUID(),
      ...(typeof prepared.width === "number" && typeof prepared.height === "number"
        ? { width: prepared.width, height: prepared.height }
        : {}),
    });
  }
  return out;
}

/**
 * Extract image_url URLs from an OpenAI-shaped message content array.
 * Returns the raw url strings (data: or http(s):) in order. Non-image parts
 * are ignored. A plain string content has no images.
 */
export function extractImageUrls(content: unknown): string[] {
  if (!Array.isArray(content)) return [];
  const urls: string[] = [];
  for (const part of content) {
    if (part && typeof part === "object" && (part as { type?: unknown }).type === "image_url") {
      const imageUrl = (part as { image_url?: unknown }).image_url;
      if (typeof imageUrl === "string") {
        urls.push(imageUrl);
      } else if (
        imageUrl &&
        typeof imageUrl === "object" &&
        typeof (imageUrl as { url?: unknown }).url === "string"
      ) {
        urls.push((imageUrl as { url: string }).url);
      }
    }
  }
  return urls;
}
