import { z } from "zod";
import { isJsonObject } from "../../utils/kieTask.ts";

const imageFormatSchema = z.enum(["png", "jpeg", "webp", "gif", "svg"]);
const outputOptionsSchema = z.object({
  output_format: imageFormatSchema.nullable().optional(),
  frame_count: z.number().int().min(2).max(16).nullable().optional(),
  frame_duration_ms: z.number().int().min(20).nullable().optional(),
  background: z.enum(["auto", "opaque", "transparent"]).nullable().optional(),
});

/** Validate only ordinary OpenAI image options; other providers keep their own contracts. */
export function prepareImageOutputOptions(body: Record<string, unknown>) {
  const parsed = outputOptionsSchema.safeParse(body);
  if (!parsed.success) return { error: "Invalid OpenAI image output format or animation options" };
  const options = parsed.data;
  const hasFrames = options.frame_count != null || options.frame_duration_ms != null;
  if (hasFrames && options.output_format !== "gif") {
    return { error: "frame_count and frame_duration_ms require output_format=gif" };
  }
  if (
    options.output_format === "gif" &&
    ((body.stream != null && body.stream !== false) ||
      (body.partial_images != null && body.partial_images !== 0) ||
      body.output_compression != null)
  ) {
    return { error: "GIF output does not support streaming, partial images or output_compression" };
  }
  // The upstream owns model-specific format support (including GIF/SVG preview access).
  // Never replace an explicitly requested format with PNG or assume an unknown model's abilities.
  return { options };
}

type ImageOutputFormat = z.infer<typeof imageFormatSchema>;
const IMAGE_MIME: Record<ImageOutputFormat, string> = {
  png: "image/png",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
};

function sniffImageFormat(base64: string): ImageOutputFormat | undefined {
  // Container detection only needs a bounded prefix, not a second full image allocation.
  const bytes = Buffer.from(base64.slice(0, 2048), "base64");
  const header = bytes.toString("latin1", 0, 12);
  if (header.startsWith("GIF87a") || header.startsWith("GIF89a")) return "gif";
  if (header.startsWith("\x89PNG\r\n\x1a\n")) return "png";
  if (header.startsWith("\xff\xd8\xff")) return "jpeg";
  if (header.startsWith("RIFF") && header.slice(8, 12) === "WEBP") return "webp";
  const text = bytes
    .toString("utf8")
    .trimStart()
    .replace(/^<\?xml[^?]*\?>\s*/, "");
  if (/^<svg(?:\s|>)/.test(text)) return "svg";
  return undefined;
}

/** Prefer detected bytes to upstream metadata; never infer format from the request or URL. */
export function normalizeImageOutput(
  data: Record<string, unknown>,
  items: unknown[],
  requestedFormat: unknown,
  warn?: (scope: string, message: string) => void
): { items: unknown[]; outputFormat?: ImageOutputFormat } {
  const declared = imageFormatSchema.safeParse(data.output_format);
  const formats = new Set<ImageOutputFormat>();
  let allFormatsKnown = true;
  const normalized = items.map((item) => {
    if (!isJsonObject(item)) {
      allFormatsKnown = false;
      return item;
    }
    const detected =
      typeof item.b64_json === "string" ? sniffImageFormat(item.b64_json) : undefined;
    const format = detected ?? (declared.success ? declared.data : undefined);
    if (format) formats.add(format);
    else allFormatsKnown = false;
    if (format && typeof requestedFormat === "string" && format !== requestedFormat) {
      warn?.(
        "IMAGE",
        `Image output format mismatch: requested ${requestedFormat}, received ${format}`
      );
    }
    return detected ? { ...item, mime_type: IMAGE_MIME[detected] } : item;
  });
  const outputFormat = allFormatsKnown && formats.size === 1 ? [...formats][0] : undefined;
  return { items: normalized, outputFormat };
}
