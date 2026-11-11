import { z } from "zod";
import { getCachedSettings } from "@/lib/db/readCache";
import { getImageModelEntry } from "@omniroute/open-sse/config/imageRegistry.ts";
import {
  MAX_CODEX_IMAGE_EDIT_REFERENCES,
  extractImageEditInputFromJson,
  resolveRemoteImageEditReferences,
} from "@/lib/images/imageRouteModel";
import { getBodySizeLimit, readRequestBodyWithLimit } from "@/shared/middleware/bodySizeGuard";
import * as log from "@/sse/utils/logger";

export interface EditInput {
  options?: Record<string, unknown>;
  prompt: string;
  model: string | null;
  size: string | null;
  responseFormat: string | null;
  imageBytes: Buffer | null;
  imageMime: string | null;
  images: Array<{ bytes: Buffer; mime: string }>;
  imageInputCount: number;
  hasMask: boolean;
}

const ImageEditJsonSchema = z
  .object({
    prompt: z.string().optional(),
    model: z.string().optional(),
    size: z.string().optional(),
    response_format: z.string().optional(),
    image: z.unknown().optional(),
    images: z.array(z.unknown()).optional(),
  })
  .passthrough();

async function readMultipartOptions(formData: FormData): Promise<Record<string, unknown>> {
  const options: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key === "image" || key === "image[]") continue;
    if (typeof value === "string") {
      if (
        [
          "n",
          "num_images",
          "seed",
          "sync_mode",
          "enable_thinking",
          "enable_safety_checker",
          "output_compression",
          "frame_count",
          "frame_duration_ms",
          "fal_input",
          "image_size",
        ].includes(key)
      ) {
        try {
          options[key] = JSON.parse(value);
        } catch {
          options[key] = value;
        }
      } else options[key] = value;
    } else if (key === "mask") {
      options.mask = `data:${value.type || "image/png"};base64,${Buffer.from(await value.arrayBuffer()).toString("base64")}`;
    }
  }
  return options;
}

async function readMultipartImage(formData: FormData): Promise<EditInput> {
  const options = await readMultipartOptions(formData);
  const promptRaw = formData.get("prompt");
  const prompt = typeof promptRaw === "string" ? promptRaw.trim() : "";
  const modelRaw = formData.get("model");
  const model = typeof modelRaw === "string" ? modelRaw.trim() : null;
  const sizeRaw = formData.get("size");
  const size = typeof sizeRaw === "string" ? sizeRaw.trim() : null;
  const respRaw = formData.get("response_format");
  const responseFormat = typeof respRaw === "string" ? respRaw.trim() : null;

  // Count every candidate so malformed or excess references cannot disappear during parsing.
  const imageEntries = Array.from(formData.entries())
    .filter(([key]) => key === "image" || key === "image[]")
    .map(([, value]) => value);
  const images: Array<{ bytes: Buffer; mime: string }> = [];
  for (const imageEntry of imageEntries) {
    if (typeof imageEntry === "string") continue;
    const bytes = Buffer.from(await imageEntry.arrayBuffer());
    if (bytes.length === 0) continue;
    images.push({ bytes, mime: imageEntry.type || "image/png" });
  }
  const firstImage = images[0] ?? null;
  return {
    options,
    prompt,
    model,
    size,
    responseFormat,
    imageBytes: firstImage?.bytes ?? null,
    imageMime: firstImage?.mime ?? null,
    images,
    imageInputCount: imageEntries.length,
    hasMask: formData.has("mask") || formData.has("mask_url"),
  };
}

/** Read a bounded multipart or JSON edit body without dropping mask presence. */
export async function readEditInput(request: Request): Promise<EditInput | null> {
  const contentType = request.headers.get("content-type") || "";
  let bodySizeSettings: Record<string, unknown> | undefined;
  try {
    bodySizeSettings = await getCachedSettings();
  } catch {
    bodySizeSettings = undefined;
  }
  const bodySizeLimit = getBodySizeLimit("/api/v1/images/edits", bodySizeSettings);
  const rawBody = await readRequestBodyWithLimit(request, bodySizeLimit);
  if (contentType.includes("multipart/form-data")) {
    try {
      const formData = await new Response(rawBody, {
        headers: { "content-type": contentType },
      }).formData();
      return await readMultipartImage(formData);
    } catch {
      log.warn("IMAGE", "Invalid multipart edit body");
      return null;
    }
  }
  if (contentType.includes("application/json")) {
    try {
      const parsed = ImageEditJsonSchema.safeParse(
        JSON.parse(new TextDecoder("utf-8").decode(rawBody)) as unknown
      );
      if (!parsed.success) {
        log.warn("IMAGE", "Invalid JSON edit body shape");
        return null;
      }
      // Before model routing, only registered hosted Codex models opt in to
      // 128 remote references. GPT Image and unresolved combos keep the
      // conservative 16-reference prefetch guard.
      const requestedModel =
        typeof parsed.data.model === "string" ? getImageModelEntry(parsed.data.model) : null;
      const hostedMaxReferences =
        requestedModel?.provider === "codex" && !/^gpt-image-/i.test(requestedModel.model)
          ? MAX_CODEX_IMAGE_EDIT_REFERENCES
          : undefined;
      const resolved = await resolveRemoteImageEditReferences(parsed.data, {
        signal: request.signal,
        maxReferences: hostedMaxReferences,
      });
      const extracted = extractImageEditInputFromJson(resolved);
      return extracted
        ? {
            ...extracted,
            options: parsed.data,
            hasMask: Object.hasOwn(parsed.data, "mask") || Object.hasOwn(parsed.data, "mask_url"),
          }
        : null;
    } catch {
      log.warn("IMAGE", "Invalid JSON edit body");
      return null;
    }
  }
  return null;
}
