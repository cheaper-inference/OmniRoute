import { z } from "zod";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { hasRequestedOutputFormat, prepareImageOutputOptions } from "./outputFormat.ts";

const openAIOptionsSchema = z.object({
  complexity: z.enum(["low", "medium", "high"]).nullable().optional(),
  moderation: z.enum(["auto", "low"]).nullable().optional(),
  output_compression: z.number().int().min(0).max(100).nullable().optional(),
});

// The shared image handler reads one JSON result. Use the documented options
// for DigitalOcean's synchronous generation, which always returns b64_json.
const digitalOceanOptionsSchema = z.object({
  n: z.number().int().min(1).max(10).optional(),
  size: z.enum(["auto", "1536x1024", "1024x1536"]).optional(),
  quality: z.enum(["auto", "high", "medium", "low"]).optional(),
  output_format: z.enum(["png", "webp", "jpeg"]).optional(),
  output_compression: z.number().int().min(0).max(100).optional(),
  background: z.enum(["transparent", "opaque", "auto"]).optional(),
  moderation: z.enum(["low", "auto"]).optional(),
  user: z.string().optional(),
  stream: z.literal(false).optional(),
});

function formatOptionError(error: z.ZodError): { error: string } {
  return {
    error: sanitizeErrorMessage(
      error.issues.map(({ path, message }) => `${path.join(".")}: ${message}`).join(", ")
    ),
  };
}

export function prepareImageGenerationOptions(
  provider: string,
  body: Record<string, unknown>
): { options: Record<string, unknown> } | { error: string } {
  if (provider === "digitalocean") {
    const parsed = digitalOceanOptionsSchema.safeParse(body);
    return parsed.success ? { options: parsed.data } : formatOptionError(parsed.error);
  }

  const output = hasRequestedOutputFormat(body) ? prepareImageOutputOptions(body) : { options: {} };
  if ("error" in output) return { error: sanitizeErrorMessage(output.error) };
  if (provider !== "openai") return output;

  const parsed = openAIOptionsSchema.safeParse(body);
  if (!parsed.success) return formatOptionError(parsed.error);

  const { output_compression, ...openAIOptions } = parsed.data;
  const options: Record<string, unknown> = { ...output.options, ...openAIOptions };
  const format = options.output_format;
  if (output_compression != null && (format === "jpeg" || format === "webp")) {
    options.output_compression = output_compression;
  }
  return { options };
}
