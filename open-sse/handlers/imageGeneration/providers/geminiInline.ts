/** First string reference image the client sent, across the accepted field aliases. */
function referenceImageCandidate(record: Record<string, unknown>): string | null {
  return (
    (typeof record.image_url === "string" && record.image_url) ||
    (typeof record.image === "string" && record.image) ||
    (typeof record.imageUrl === "string" && record.imageUrl) ||
    (Array.isArray(record.image_urls) &&
      typeof record.image_urls[0] === "string" &&
      record.image_urls[0]) ||
    (Array.isArray(record.imageUrls) &&
      typeof record.imageUrls[0] === "string" &&
      record.imageUrls[0]) ||
    (Array.isArray(record.images) && typeof record.images[0] === "string" && record.images[0]) ||
    null
  );
}

/**
 * Inline image part for Gemini-format image generation.
 * Extracted from imageGeneration.ts so SYNTX dispatch can land under the frozen cap.
 */
export function geminiInlineImagePart(
  body: unknown
): { inlineData: { mimeType: string; data: string } } | null {
  if (!body || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;
  const mimeType =
    typeof record.imageMime === "string" && record.imageMime ? record.imageMime : "image/png";
  if (Buffer.isBuffer(record.imageBytes)) {
    return { inlineData: { mimeType, data: record.imageBytes.toString("base64") } };
  }
  if (typeof record.imageBytes === "string" && record.imageBytes.length > 0) {
    return { inlineData: { mimeType, data: record.imageBytes } };
  }
  const rawCandidate = referenceImageCandidate(record);

  if (rawCandidate) {
    if (rawCandidate.startsWith("data:")) {
      const match = rawCandidate.match(/^data:(image\/[a-zA-Z0-9+-]+);base64,(.+)$/);
      if (match) {
        return {
          inlineData: {
            mimeType: match[1],
            data: match[2],
          },
        };
      }
      return {
        inlineData: {
          mimeType: rawCandidate.match(/^data:(image\/[a-zA-Z0-9+-]+);base64,/)?.[1] || "image/png",
          data: rawCandidate.replace(/^data:image\/[a-zA-Z0-9+-]+;base64,/, ""),
        },
      };
    }
    if (/^[A-Za-z0-9+/=]+$/.test(rawCandidate.trim()) && rawCandidate.length > 100) {
      return {
        inlineData: {
          mimeType: mimeType || "image/jpeg",
          data: rawCandidate.trim(),
        },
      };
    }
  }
  return null;
}

/**
 * Error message when the request carries a reference image that cannot be inlined (9router #5190).
 * Gemini image models only take inline bytes, and remote URLs are deliberately not fetched
 * (SSRF surface), so an http(s) URL would otherwise be dropped and the model would answer a
 * text-only prompt. Returns null when there is no reference or it inlines cleanly.
 */
export function geminiReferenceImageError(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const candidate = referenceImageCandidate(body as Record<string, unknown>);
  if (!candidate || geminiInlineImagePart(body)) return null;
  const isUrl = /^https?:\/\//i.test(candidate.trim());
  return (
    (isUrl
      ? "Remote reference image URLs are not supported for this image model."
      : "The reference image could not be read.") +
    " Send it inline as a base64 data URI (data:image/png;base64,...) or raw base64," +
    " or upload the file to /v1/images/edits."
  );
}
