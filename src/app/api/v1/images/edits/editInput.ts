import { z } from "zod";
import { getCachedSettings } from "@/lib/db/readCache";
import { extractImageEditInputFromJson } from "@/lib/images/imageRouteModel";
import { getBodySizeLimit, readRequestBodyWithLimit } from "@/shared/middleware/bodySizeGuard";
import * as log from "@/sse/utils/logger";

export interface EditInput {
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

async function readMultipartImage(formData: FormData): Promise<EditInput> {
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
      return {
        ...extractImageEditInputFromJson(parsed.data),
        hasMask: Object.hasOwn(parsed.data, "mask") || Object.hasOwn(parsed.data, "mask_url"),
      };
    } catch {
      log.warn("IMAGE", "Invalid JSON edit body");
      return null;
    }
  }
  return null;
}
