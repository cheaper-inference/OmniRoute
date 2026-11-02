/**
 * Gateway-side vision image normalization before dispatch (opt-in).
 *
 * Qwen2-VL-style vision pipelines (14px patches merged 2×2, RGB conversion,
 * smart_resize under a pixel budget — the shape used by several GLM-V-family
 * and other Vision-Language backends) reject or choke on oversized or
 * exotic-encoded images: upstream 400s on image parse and occasional
 * zero-output hangs. Normalization lands every image inside that comfort zone:
 *
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

/** Normalize one decoded image into the vision-pipeline comfort zone. Never throws. */
export async function normalizeVisionImageBuffer(
  input: Buffer
): Promise<VisionImageNormalizationResult> {
  const sharp = await loadSharp();
  if (!sharp) return { buffer: input, mime: null, changed: false };
  try {
    const img = sharp(input, { failOn: "error" });
    const meta = await img.metadata();
    const width = meta.width ?? 0;
    const height = meta.height ?? 0;
    if (!width || !height) return { buffer: input, mime: null, changed: false };

    const format = meta.format ?? "";
    const hasAlpha = meta.hasAlpha === true;
    const long = Math.max(width, height);
    const pixels = width * height;
    const compliantFormat = !hasAlpha && (format === "png" || format === "jpeg");
    const needsResize = long > MAX_LONG_EDGE || pixels > MAX_TOTAL_PIXELS;
    if (compliantFormat && !needsResize) {
      return { buffer: input, mime: `image/${format}`, changed: false };
    }

    // Combined scale for both constraints (aspect preserved).
    const scale = Math.min(MAX_LONG_EDGE / long, Math.sqrt(MAX_TOTAL_PIXELS / pixels), 1);
    const targetWidth = Math.max(1, Math.round(width * scale));
    const targetHeight = Math.max(1, Math.round(height * scale));

    let pipeline = img.resize({
      width: needsResize ? targetWidth : width,
      height: needsResize ? targetHeight : height,
      fit: "inside",
      withoutEnlargement: true,
    });

    // Re-encode: keep alpha-free PNGs lossless; everything else (incl. alpha
    // flattened onto white and exotic formats) becomes a baseline JPEG.
    if (hasAlpha) {
      pipeline = pipeline.flatten({ background: "#ffffff" }).jpeg({
        quality: JPEG_QUALITY,
        progressive: false,
      });
      const buffer = await pipeline.toBuffer();
      return { buffer, mime: "image/jpeg", changed: true };
    }
    if (format === "png") {
      const buffer = await pipeline.png().toBuffer();
      return { buffer, mime: "image/png", changed: true };
    }
    const buffer = await pipeline.jpeg({ quality: JPEG_QUALITY, progressive: false }).toBuffer();
    return { buffer, mime: "image/jpeg", changed: true };
  } catch {
    return { buffer: input, mime: null, changed: false };
  }
}

const DATA_URI_RE = /^data:(image\/[a-z0-9.+-]+);base64,(.*)$/s;

interface BodyWalkStats {
  normalized: number;
  skipped: number;
}

async function normalizeDataUriInPlace(
  holder: Record<string, unknown>,
  key: string
): Promise<boolean> {
  const value = holder[key];
  if (typeof value !== "string" || !value.startsWith("data:")) return false;
  const match = DATA_URI_RE.exec(value);
  if (!match) return false;
  try {
    const input = Buffer.from(match[2], "base64");
    if (!input.length) return false;
    const out = await normalizeVisionImageBuffer(input);
    if (!out.changed || !out.mime) return false;
    holder[key] = `data:${out.mime};base64,${out.buffer.toString("base64")}`;
    return true;
  } catch {
    return false;
  }
}

/** Recursively walk a request body and normalize every inline (base64) image. */
async function walk(node: unknown, stats: BodyWalkStats): Promise<void> {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) await walk(item, stats);
    return;
  }
  const record = node as Record<string, unknown>;

  // OpenAI form: { type: "image_url", image_url: { url: "data:..." } }
  const imageUrl = record.image_url;
  if (imageUrl && typeof imageUrl === "object" && !Array.isArray(imageUrl)) {
    const urlHolder = imageUrl as Record<string, unknown>;
    if (typeof urlHolder.url === "string") {
      if (urlHolder.url.startsWith("data:")) {
        (await normalizeDataUriInPlace(urlHolder, "url")) ? stats.normalized++ : stats.skipped++;
      }
      // Remote http(s) URLs are intentionally left alone — the gateway does
      // not download them during normalization.
    }
  }

  // Claude form: { type: "image", source: { type: "base64", media_type, data } }
  const source = record.source;
  if (
    record.type === "image" &&
    source &&
    typeof source === "object" &&
    !Array.isArray(source) &&
    (source as Record<string, unknown>).type === "base64"
  ) {
    const sourceHolder = source as Record<string, unknown>;
    if (typeof sourceHolder.data === "string") {
      // Reuse the data-URI machinery by composing and re-splitting.
      const composed = `data:${String(sourceHolder.media_type ?? "image/png")};base64,${sourceHolder.data}`;
      const match = DATA_URI_RE.exec(composed);
      if (match) {
        try {
          const input = Buffer.from(match[2], "base64");
          if (!input.length) {
            stats.skipped++;
          } else {
            const out = await normalizeVisionImageBuffer(input);
            if (out.changed && out.mime) {
              sourceHolder.data = out.buffer.toString("base64");
              sourceHolder.media_type = out.mime;
              stats.normalized++;
            } else {
              stats.skipped++;
            }
          }
        } catch {
          stats.skipped++;
        }
      } else {
        stats.skipped++;
      }
    }
  }

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
