/**
 * Gateway-side vision image normalization before dispatch (opt-in).
 *
 * Qwen2-VL-style vision pipelines (14px patches merged 2×2, RGB conversion,
 * smart_resize under a pixel budget — the shape used by several GLM-V-family
 * and other Vision-Language backends) reject or choke on oversized or
 * exotic-encoded images: upstream 400s on image parse and occasional
 * zero-output hangs. Normalization lands every image inside that comfort zone:
 *
 *   - apply EXIF orientation (re-encoding drops the tag)
 *   - convert to RGB (alpha flattened onto white)
 *   - long edge ≤ 4096 px
 *   - total pixels ≤ 4,194,304 (~4 MP)
 *   - re-encode as baseline (non-progressive) JPEG or PNG
 *
 * Opt-in via OMNIROUTE_IMAGE_NORMALIZATION=1 (unset = off, zero change).
 * Fail-open everywhere: a missing sharp binary, an undecodable image, or any
 * per-image failure passes the original through untouched — normalization
 * must never be the reason a request fails.
 */

const MAX_LONG_EDGE = 4096;
const MAX_TOTAL_PIXELS = 4_194_304;
const JPEG_QUALITY = 85;

type SharpModule = (typeof import("sharp"))["default"];
let sharpPromise: Promise<SharpModule | null> | null = null;
let missingSharpLogged = false;

async function loadSharp(): Promise<SharpModule | null> {
  if (!sharpPromise) {
    sharpPromise = import("sharp").then((m) => (m.default ?? m) as SharpModule).catch(() => null);
  }
  const sharp = await sharpPromise;
  if (!sharp && !missingSharpLogged) {
    missingSharpLogged = true;
    console.warn(
      "[visionImageNormalization] sharp unavailable — vision image normalization is bypassed (passthrough)"
    );
  }
  return sharp;
}

export function resolveVisionImageNormalization(env: NodeJS.ProcessEnv): boolean {
  const raw = (env.OMNIROUTE_IMAGE_NORMALIZATION ?? "").trim().toLowerCase();
  if (raw === "1" || raw === "true" || raw === "on") return true;
  return false;
}

export interface VisionImageNormalizationResult {
  buffer: Buffer;
  mime: string | null;
  changed: boolean;
}

type SharpInstance = ReturnType<SharpModule>;
type SharpMetadata = Awaited<ReturnType<SharpInstance["metadata"]>>;

function passthrough(input: Buffer): VisionImageNormalizationResult {
  return { buffer: input, mime: null, changed: false };
}

/** Budgets apply to the image as displayed: use the EXIF-oriented size. */
function orientedSize(meta: SharpMetadata): { width: number; height: number } {
  return {
    width: meta.autoOrient?.width ?? meta.width ?? 0,
    height: meta.autoOrient?.height ?? meta.height ?? 0,
  };
}

/** Combined scale for both constraints (aspect preserved). */
function fitWithinBudget(width: number, height: number): { width: number; height: number } {
  const scale = Math.min(
    MAX_LONG_EDGE / Math.max(width, height),
    Math.sqrt(MAX_TOTAL_PIXELS / (width * height)),
    1
  );
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

/**
 * Re-encode: keep alpha-free PNGs lossless; everything else (incl. alpha
 * flattened onto white and exotic formats) becomes a baseline JPEG.
 */
async function encodeForVision(
  pipeline: SharpInstance,
  hasAlpha: boolean,
  format: string
): Promise<{ buffer: Buffer; mime: string }> {
  if (hasAlpha) {
    const buffer = await pipeline
      .flatten({ background: "#ffffff" })
      .jpeg({ quality: JPEG_QUALITY, progressive: false })
      .toBuffer();
    return { buffer, mime: "image/jpeg" };
  }
  if (format === "png") {
    return { buffer: await pipeline.png().toBuffer(), mime: "image/png" };
  }
  const buffer = await pipeline.jpeg({ quality: JPEG_QUALITY, progressive: false }).toBuffer();
  return { buffer, mime: "image/jpeg" };
}

/** Normalize one decoded image into the vision-pipeline comfort zone. Never throws. */
export async function normalizeVisionImageBuffer(
  input: Buffer
): Promise<VisionImageNormalizationResult> {
  const sharp = await loadSharp();
  if (!sharp) return passthrough(input);
  try {
    const img = sharp(input, { failOn: "error" });
    const meta = await img.metadata();
    const { width, height } = orientedSize(meta);
    if (!width || !height) return passthrough(input);

    const format = meta.format ?? "";
    const hasAlpha = meta.hasAlpha === true;
    const needsResize =
      Math.max(width, height) > MAX_LONG_EDGE || width * height > MAX_TOTAL_PIXELS;
    const compliantFormat = !hasAlpha && (format === "png" || format === "jpeg");
    if (compliantFormat && !needsResize) {
      return { buffer: input, mime: `image/${format}`, changed: false };
    }

    const target = needsResize ? fitWithinBudget(width, height) : { width, height };
    // Re-encoding drops EXIF, so bake the orientation into the pixels first;
    // otherwise a rotated phone photo reaches the model sideways.
    const pipeline = img
      .autoOrient()
      .resize({ ...target, fit: "inside", withoutEnlargement: true });
    const { buffer, mime } = await encodeForVision(pipeline, hasAlpha, format);
    return { buffer, mime, changed: true };
  } catch {
    return passthrough(input);
  }
}

const DATA_URI_RE = /^data:(image\/[a-z0-9.+-]+);base64,(.*)$/s;

interface BodyWalkStats {
  normalized: number;
  skipped: number;
}

/** Decode one base64 payload and normalize it; null when nothing changed or it failed. */
async function normalizeBase64Payload(
  base64: string
): Promise<{ buffer: Buffer; mime: string } | null> {
  try {
    const input = Buffer.from(base64, "base64");
    if (!input.length) return null;
    const out = await normalizeVisionImageBuffer(input);
    return out.changed && out.mime ? { buffer: out.buffer, mime: out.mime } : null;
  } catch {
    return null;
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/** OpenAI form: { type: "image_url", image_url: { url: "data:..." } } */
async function normalizeOpenAiImagePart(
  record: Record<string, unknown>,
  stats: BodyWalkStats
): Promise<void> {
  const urlHolder = asRecord(record.image_url);
  // Remote http(s) URLs are intentionally left alone — the gateway does not
  // download them during normalization.
  if (!urlHolder || typeof urlHolder.url !== "string" || !urlHolder.url.startsWith("data:")) {
    return;
  }
  const match = DATA_URI_RE.exec(urlHolder.url);
  const out = match ? await normalizeBase64Payload(match[2]) : null;
  if (!out) {
    stats.skipped++;
    return;
  }
  urlHolder.url = `data:${out.mime};base64,${out.buffer.toString("base64")}`;
  stats.normalized++;
}

/** Claude form: { type: "image", source: { type: "base64", media_type, data } } */
async function normalizeClaudeImageBlock(
  record: Record<string, unknown>,
  stats: BodyWalkStats
): Promise<void> {
  if (record.type !== "image") return;
  const source = asRecord(record.source);
  if (!source || source.type !== "base64" || typeof source.data !== "string") return;
  // Same validation as the OpenAI form: the media type must be an image/* type.
  const composed = `data:${String(source.media_type ?? "image/png")};base64,${source.data}`;
  const match = DATA_URI_RE.exec(composed);
  const out = match ? await normalizeBase64Payload(match[2]) : null;
  if (!out) {
    stats.skipped++;
    return;
  }
  source.data = out.buffer.toString("base64");
  source.media_type = out.mime;
  stats.normalized++;
}

/** Recursively walk a request body and normalize every inline (base64) image. */
async function walk(node: unknown, stats: BodyWalkStats): Promise<void> {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) await walk(item, stats);
    return;
  }
  const record = node as Record<string, unknown>;
  await normalizeOpenAiImagePart(record, stats);
  await normalizeClaudeImageBlock(record, stats);
  for (const value of Object.values(record)) {
    if (value && typeof value === "object") await walk(value, stats);
  }
}

/**
 * Normalize every inline image in a chat request body IN PLACE (the body
 * object is shared with combo closures — in-place part mutation propagates).
 * No-op unless OMNIROUTE_IMAGE_NORMALIZATION is enabled. Never throws;
 * images that cannot be normalized are passed through.
 */
export async function normalizeVisionImagesInBody(body: unknown): Promise<BodyWalkStats> {
  const stats: BodyWalkStats = { normalized: 0, skipped: 0 };
  if (!resolveVisionImageNormalization(process.env)) return stats;
  try {
    await walk(body, stats);
  } catch {
    // fail-open: partial normalization is acceptable
  }
  return stats;
}
