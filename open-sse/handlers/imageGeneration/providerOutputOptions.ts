import { z } from "zod";

const falOutputSchema = z.object({
  output_format: z.enum(["jpeg", "png", "webp", "gif", "svg"]),
  frame_count: z.number().int().positive().optional(),
  frame_duration_ms: z.number().int().positive().optional(),
});
const falGpt26OutputSchema = falOutputSchema.extend({
  frame_count: z.number().int().min(2).max(16).optional(),
  frame_duration_ms: z.number().int().min(20).max(2000).optional(),
});
const stabilityFormatSchema = z.enum(["jpeg", "png", "webp"]);
const stabilityBackgroundFormatSchema = z.enum(["png", "webp"]);

/** Preserve the historical response_format container alias, but never downgrade it. */
function requestedFormat(body: Record<string, unknown>): unknown {
  if (body.output_format != null) {
    return typeof body.output_format === "string"
      ? body.output_format.toLowerCase()
      : body.output_format;
  }
  const responseFormat = body.response_format;
  return typeof responseFormat === "string" &&
    !["url", "b64_json"].includes(responseFormat.toLowerCase())
    ? responseFormat.toLowerCase()
    : "png";
}

/** Legacy Fal only; the native adapter validates the endpoint schema and fal_input overrides. */
export function prepareFalImageOutputOptions(body: Record<string, unknown>, endpoint: string) {
  // Fal's published 2.6 text-to-image schemas specify 2–16 frames and 20–2000 ms.
  // https://fal.ai/models/openai/gpt-image-2.6/sunburst/text-to-image/api
  // https://fal.ai/models/openai/gpt-image-2.6/flare/text-to-image/api
  const gpt26 = /^openai\/gpt-image-2\.6\/(?:sunburst|flare)\/text-to-image$/.test(endpoint);
  const schema = gpt26 ? falGpt26OutputSchema : falOutputSchema;
  const parsed = schema.safeParse({ ...body, output_format: requestedFormat(body) });
  if (!parsed.success) {
    return {
      error: gpt26
        ? "Invalid fal GPT Image 2.6 options: output_format must be jpeg/png/webp/gif/svg; frame_count 2–16; frame_duration_ms 20–2000"
        : "Invalid fal image output format or animation options",
    };
  }
  const options = parsed.data;
  if (
    gpt26 &&
    (options.frame_count != null || options.frame_duration_ms != null) &&
    options.output_format !== "gif"
  ) {
    return { error: "fal GPT Image 2.6 frame controls require output_format=gif" };
  }
  // Other endpoints retain their own capabilities and bounds, including upstream 4xx errors.
  return { options };
}

/** Reject unsupported Stability controls before downloading references or starting inference. */
export function prepareStabilityImageOutputOptions(body: Record<string, unknown>, model: string) {
  const schema =
    model === "remove-background" ? stabilityBackgroundFormatSchema : stabilityFormatSchema;
  const format = schema.safeParse(requestedFormat(body));
  if (!format.success) {
    return { error: `Stability AI output_format must be one of: ${schema.options.join(", ")}` };
  }
  if (body.frame_count != null || body.frame_duration_ms != null) {
    return { error: "Stability AI does not support animated image frame controls" };
  }
  return { options: { output_format: format.data } };
}
