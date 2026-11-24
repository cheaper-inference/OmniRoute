import { z } from "zod";

// Formats the historical legacy-Fal mapping (normalizeRequestedImageFormat) downgraded to PNG.
const FAL_PRESERVED_FORMATS = new Set(["gif", "svg"]);
const falFrameSchema = z.object({
  frame_count: z.number().int().positive().nullable().optional(),
  frame_duration_ms: z.number().int().positive().nullable().optional(),
});

/**
 * Legacy Fal only; the native adapter validates the endpoint schema and fal_input overrides.
 *
 * Returns `null` unless the caller explicitly asked for `output_format` gif or svg, so every
 * other request keeps the historical jpeg/png/webp mapping with its PNG fallback. Endpoint
 * capabilities and bounds stay with fal, including its own 4xx for an unsupported format.
 */
export function prepareFalPreservedOutputOptions(
  body: Record<string, unknown>
): { options: Record<string, unknown> } | { error: string } | null {
  if (typeof body.output_format !== "string") return null;
  const format = body.output_format.trim().toLowerCase();
  if (!FAL_PRESERVED_FORMATS.has(format)) return null;

  const parsed = falFrameSchema.safeParse(body);
  if (!parsed.success) {
    return { error: "Invalid fal animation options: frame_count and frame_duration_ms" };
  }
  const { frame_count: frameCount, frame_duration_ms: frameDurationMs } = parsed.data;
  const hasFrames = frameCount != null || frameDurationMs != null;
  if (hasFrames && format !== "gif") {
    return { error: "frame_count and frame_duration_ms require output_format=gif" };
  }
  return {
    options: {
      output_format: format,
      ...(frameCount != null ? { frame_count: frameCount } : {}),
      ...(frameDurationMs != null ? { frame_duration_ms: frameDurationMs } : {}),
    },
  };
}
