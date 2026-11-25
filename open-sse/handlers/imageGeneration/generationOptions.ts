import { z } from "zod";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { hasRequestedOutputFormat, prepareImageOutputOptions } from "./outputFormat.ts";

const openAIOptionsSchema = z.object({
  complexity: z.enum(["low", "medium", "high"]).nullable().optional(),
  moderation: z.enum(["auto", "low"]).nullable().optional(),
  output_compression: z.number().int().min(0).max(100).nullable().optional(),
});

export function prepareImageGenerationOptions(
  provider: string,
  body: Record<string, unknown>
): { options: Record<string, unknown> } | { error: string } {
  const output = hasRequestedOutputFormat(body) ? prepareImageOutputOptions(body) : { options: {} };
  if ("error" in output) return { error: sanitizeErrorMessage(output.error) };
  if (provider !== "openai") return output;

  const parsed = openAIOptionsSchema.safeParse(body);
  if (!parsed.success) {
    return {
      error: sanitizeErrorMessage(
        parsed.error.issues.map(({ path, message }) => `${path.join(".")}: ${message}`).join(", ")
      ),
    };
  }

  const { output_compression, ...openAIOptions } = parsed.data;
  const options: Record<string, unknown> = { ...output.options, ...openAIOptions };
  const format = options.output_format;
  if (output_compression != null && (format === "jpeg" || format === "webp")) {
    options.output_compression = output_compression;
  }
  return { options };
}
