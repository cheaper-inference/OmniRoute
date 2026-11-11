/**
 * Antigravity (Cloud Code `streamGenerateContent`) rejects a remote image part.
 *
 * The OpenAI → Gemini translator turns an `image_url` part that carries an `http(s)` URL into
 * `fileData: { fileUri, mimeType: "image/*" }` (geminiHelper.ts; claude-to-gemini.ts does the
 * same for a Claude URL image source). Antigravity refuses that wildcard type with HTTP 400:
 *
 *   Unsupported mime type: image/* in contents.file_data. Only image/*, text/*, video/*,
 *   audio/*, and document MIME types are supported.
 *
 * so every request that sends an image by URL fails, while the same image sent as a base64
 * data URI (which becomes `inlineData` with a concrete type) succeeds. This module downloads
 * each remote image once, through the SSRF-hardened `fetchUntrustedRemoteImage` (public hosts
 * only, DNS pinned), and swaps the part for `inlineData` with the image's real MIME type.
 */
import { fetchUntrustedRemoteImage } from "@/shared/network/remoteImageFetch";
import { sniffCursorImageFormat } from "../../utils/cursorImages.ts";

/** Per-image cap. Antigravity's whole request must stay under ~20 MB of inline data. */
export const ANTIGRAVITY_MAX_REMOTE_IMAGE_BYTES = 15 * 1024 * 1024;
const ANTIGRAVITY_REMOTE_IMAGE_TIMEOUT_MS = 20_000;

type FetchImage = typeof fetchUntrustedRemoteImage;

export class AntigravityRemoteImageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AntigravityRemoteImageError";
  }
}

interface InlineImage {
  mimeType: string;
  data: string;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/** A `fileData` part that points at an `http(s)` image, which Antigravity cannot take. */
function remoteImageUri(part: unknown): string | null {
  const fileData = asRecord(asRecord(part)?.fileData);
  if (!fileData) return null;
  const uri = fileData.fileUri;
  if (typeof uri !== "string" || !/^https?:\/\//i.test(uri)) return null;
  const mime = typeof fileData.mimeType === "string" ? fileData.mimeType.trim() : "";
  if (mime && !mime.toLowerCase().startsWith("image/")) return null;
  return uri;
}

/** A concrete `image/<subtype>` from a Content-Type header, or null for a wildcard/non-image. */
function concreteImageType(contentType: string): string | null {
  const type = contentType.split(";")[0].trim().toLowerCase();
  if (!type.startsWith("image/")) return null;
  const subtype = type.slice("image/".length);
  if (!subtype || subtype.includes("*")) return null;
  return type;
}

async function downloadInlineImage(
  uri: string,
  fetchImage: FetchImage,
  signal: AbortSignal | undefined
): Promise<InlineImage> {
  let result: Awaited<ReturnType<FetchImage>>;
  try {
    result = await fetchImage(uri, {
      maxBytes: ANTIGRAVITY_MAX_REMOTE_IMAGE_BYTES,
      timeoutMs: ANTIGRAVITY_REMOTE_IMAGE_TIMEOUT_MS,
      signal,
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new AntigravityRemoteImageError(
      "Could not download the image URL for Antigravity. Use a publicly reachable image URL " +
        "or send the image as a base64 data URI."
    );
  }
  const sniffed = sniffCursorImageFormat(result.buffer);
  const mimeType = sniffed ? `image/${sniffed}` : concreteImageType(result.contentType);
  if (!mimeType) {
    throw new AntigravityRemoteImageError(
      "The image URL did not return a recognizable image (PNG, JPEG, GIF or WebP)."
    );
  }
  return { mimeType, data: result.buffer.toString("base64") };
}

// The executor rebuilds the request once per fallback base URL from the same client body;
// keying the downloads on that body means each image is fetched once per request, not per URL.
const downloadsByBody = new WeakMap<object, Map<string, Promise<InlineImage>>>();

/**
 * Replace every remote-image `fileData` part in `contents` with base64 `inlineData`.
 * Returns new content/part objects; the input is not mutated. Throws
 * `AntigravityRemoteImageError` when an image cannot be fetched or is not an image.
 */
export async function inlineAntigravityRemoteImages<T extends { parts: unknown[] }>(
  contents: T[],
  options: { signal?: AbortSignal; cacheKey?: object; fetchImage?: FetchImage } = {}
): Promise<T[]> {
  const uris = new Set<string>();
  for (const content of contents) {
    for (const part of content.parts) {
      const uri = remoteImageUri(part);
      if (uri) uris.add(uri);
    }
  }
  if (uris.size === 0) return contents;

  const fetchImage = options.fetchImage ?? fetchUntrustedRemoteImage;
  let downloads = options.cacheKey ? downloadsByBody.get(options.cacheKey) : undefined;
  if (!downloads) {
    downloads = new Map();
    if (options.cacheKey) downloadsByBody.set(options.cacheKey, downloads);
  }
  for (const uri of uris) {
    if (!downloads.has(uri)) {
      const pending = downloadInlineImage(uri, fetchImage, options.signal);
      // Do not keep a failed download around for the next fallback URL to reuse.
      pending.catch(() => downloads.delete(uri));
      downloads.set(uri, pending);
    }
  }
  const resolved = new Map<string, InlineImage>();
  await Promise.all([...uris].map(async (uri) => resolved.set(uri, await downloads.get(uri)!)));

  return contents.map((content) => {
    if (!content.parts.some((part) => remoteImageUri(part))) return content;
    return {
      ...content,
      parts: content.parts.map((part) => {
        const uri = remoteImageUri(part);
        if (!uri) return part;
        const { fileData: _fileData, ...rest } = part as Record<string, unknown>;
        return { ...rest, inlineData: resolved.get(uri) };
      }),
    };
  });
}
