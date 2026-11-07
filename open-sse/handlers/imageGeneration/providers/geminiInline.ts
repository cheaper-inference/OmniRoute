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

const REMOTE_URL_RE = /^https?:\/\//i;
const INLINE_REFERENCE_HINT =
  "Send it inline as a base64 data URI (data:image/png;base64,...) or raw base64," +
  " or upload the file to /v1/images/edits.";
const REMOTE_REFERENCE_URL_ERROR = `Remote reference image URLs are not supported for this image model. ${INLINE_REFERENCE_HINT}`;

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
  return REMOTE_URL_RE.test(candidate.trim())
    ? REMOTE_REFERENCE_URL_ERROR
    : `The reference image could not be read. ${INLINE_REFERENCE_HINT}`;
}

// ── Multi-reference support (Antigravity image edits) ─────────────────────────

type GeminiInlineDataPart = { inlineData: { mimeType: string; data: string } };

/**
 * Gemini 3 image models accept up to 14 reference images per request; anything beyond that
 * is rejected locally (400) instead of burning an upstream call.
 */
export const GEMINI_IMAGE_MAX_REFERENCES = 14;

const DATA_URL_RE = /^data:([^;,]+);base64,([A-Za-z0-9+/=\s]+)$/;
const RAW_BASE64_RE = /^[A-Za-z0-9+/=]+$/;

/** Collect every string reference a caller may send, de-duplicated, in a stable order. */
function collectStringReferences(record: Record<string, unknown>): unknown[] {
  const refs: unknown[] = [];
  for (const key of ["image_url", "imageUrl", "image", "image_urls", "imageUrls", "images"]) {
    const value = record[key];
    if (Array.isArray(value)) refs.push(...value);
    else if (value !== undefined && value !== null && value !== "") refs.push(value);
  }
  return refs.filter((ref, index) => typeof ref !== "string" || refs.indexOf(ref) === index);
}

function resolveStringReference(ref: unknown, fallbackMime: string): GeminiInlineDataPart | null {
  if (typeof ref !== "string") return null;
  const value = ref.trim();
  const dataUrl = DATA_URL_RE.exec(value);
  if (dataUrl) {
    if (!dataUrl[1].toLowerCase().startsWith("image/")) return null;
    return { inlineData: { mimeType: dataUrl[1], data: dataUrl[2].replace(/\s+/g, "") } };
  }
  if (value.length > 100 && RAW_BASE64_RE.test(value)) {
    return { inlineData: { mimeType: fallbackMime, data: value } };
  }
  return null;
}

/**
 * Resolve all reference images of a Gemini-format image request into `inlineData` parts.
 * Sources, first non-empty wins: `referenceImages` ({bytes,mime}[] from /v1/images/edits),
 * `imageBytes` (single legacy edit), then string refs (`image`/`images[]`/`image_url`…) as
 * data URLs or raw base64. Remote HTTP(S) URLs are rejected, never fetched (same policy as
 * `geminiReferenceImageError`, 9router #5190). Any unusable reference fails the whole request
 * so a caller never silently gets an edit built from fewer images than it sent.
 */
export function resolveGeminiReferenceParts(
  body: unknown
): { parts: GeminiInlineDataPart[] } | { error: string } {
  if (!body || typeof body !== "object") return { parts: [] };
  const record = body as Record<string, unknown>;
  const fallbackMime =
    typeof record.imageMime === "string" && record.imageMime ? record.imageMime : "image/png";
  const binaryRefs = Array.isArray(record.referenceImages) ? record.referenceImages : [];
  if (binaryRefs.length === 0 && record.imageBytes) {
    const part = geminiInlineImagePart({ imageBytes: record.imageBytes, imageMime: fallbackMime });
    if (part) return { parts: [part] };
  }
  const stringRefs = binaryRefs.length > 0 ? [] : collectStringReferences(record);
  if (binaryRefs.length + stringRefs.length > GEMINI_IMAGE_MAX_REFERENCES) {
    return {
      error: `Gemini image edit accepts at most ${GEMINI_IMAGE_MAX_REFERENCES} reference images`,
    };
  }

  const parts: GeminiInlineDataPart[] = [];
  for (const ref of binaryRefs) {
    const entry = ref as { bytes?: unknown; mime?: unknown } | null;
    if (!entry || !Buffer.isBuffer(entry.bytes) || entry.bytes.length === 0) {
      return { error: `Invalid reference image ${parts.length + 1}` };
    }
    const mimeType = typeof entry.mime === "string" && entry.mime ? entry.mime : fallbackMime;
    parts.push({ inlineData: { mimeType, data: entry.bytes.toString("base64") } });
  }
  if (stringRefs.some((ref) => typeof ref === "string" && REMOTE_URL_RE.test(ref.trim()))) {
    return { error: REMOTE_REFERENCE_URL_ERROR };
  }
  for (const ref of stringRefs) {
    const part = resolveStringReference(ref, fallbackMime);
    if (!part) {
      return { error: `Invalid reference image ${parts.length + 1}. ${INLINE_REFERENCE_HINT}` };
    }
    parts.push(part);
  }
  return { parts };
}

/** Prompt with an explicit "use every reference" instruction when references are attached. */
export function buildGeminiImagePrompt(prompt: string, referenceCount: number): string {
  if (referenceCount <= 0) return prompt;
  const noun = referenceCount === 1 ? "reference image" : "reference images";
  return `Generate an image as the final response. Use all ${referenceCount} attached ${noun} in the result. Do not answer with text only.\n\n${prompt}`;
}

/**
 * Build the user `parts` for a Gemini image request: every reference image as `inlineData`,
 * followed by the (reference-aware) prompt text.
 */
export function buildGeminiImageUserParts(
  body: unknown,
  promptText: string
):
  | { parts: Array<GeminiInlineDataPart | { text: string }>; referenceCount: number }
  | { error: string } {
  const refs = resolveGeminiReferenceParts(body);
  if ("error" in refs) return refs;
  const referenceCount = refs.parts.length;
  const text = buildGeminiImagePrompt(promptText, referenceCount);
  return { parts: [...refs.parts, { text }], referenceCount };
}

/**
 * Extract images from an Antigravity-wrapped Gemini response. When no image came back the
 * returned `error` carries the model's text (truncated) so callers fail loudly instead of
 * returning an empty 200.
 */
export function extractGeminiImageResults(
  responseBody: unknown,
  promptText: string
): { images: Array<{ b64_json: string; revised_prompt: string }>; error: string | null } {
  const record = (responseBody && typeof responseBody === "object" ? responseBody : {}) as {
    candidates?: Array<{ content?: { parts?: Array<Record<string, unknown>> } }>;
  };
  const images: Array<{ b64_json: string; revised_prompt: string }> = [];
  const texts: string[] = [];
  for (const candidate of record.candidates || []) {
    const parts = candidate?.content?.parts || [];
    const revised = parts.find((p) => typeof p.text === "string" && p.text)?.text;
    for (const part of parts) {
      const inline = (part.inlineData || part.inline_data) as { data?: unknown } | undefined;
      if (inline && typeof inline.data === "string" && inline.data) {
        images.push({ b64_json: inline.data, revised_prompt: (revised as string) || promptText });
      } else if (typeof part.text === "string" && part.text.trim()) {
        texts.push(part.text.trim());
      }
    }
  }
  if (images.length > 0) return { images, error: null };
  const text = texts.join(" ").slice(0, 300);
  return {
    images,
    error: text
      ? `Antigravity returned text instead of an image: ${text}`
      : "Antigravity did not return an image",
  };
}
