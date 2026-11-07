import type { ExecutorLog, ProviderCredentials } from "../../../executors/base.ts";
import {
  mapFalImageSize,
  normalizeProviderImagePayload,
  normalizeRequestedImageFormat,
  saveImageErrorResult,
  saveImageSuccessResult,
} from "../../imageGeneration.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";

export const FAL_IMAGE_EDIT_MODELS = new Set([
  "fal-ai/flux-2-flex",
  "fal-ai/flux-2-pro",
  "fal-ai/flux-2-max",
]);

export const FAL_IMAGE_EDIT_MAX_REFERENCES = 10;

export function isFalImageEditModel(model: string | null): boolean {
  return typeof model === "string" && FAL_IMAGE_EDIT_MODELS.has(model);
}

type FalAIImageEditOptions = {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string };
  body: Record<string, unknown>;
  images: Array<{ bytes: Buffer; mime: string }>;
  credentials: ProviderCredentials;
  log: ExecutorLog | null | undefined;
};

export async function handleFalAIImageEdit({
  model,
  provider,
  providerConfig,
  body,
  images,
  credentials,
  log,
}: FalAIImageEditOptions) {
  const startTime = Date.now();
  const editModel = `${model}/edit`;
  const outputFormat = normalizeRequestedImageFormat(body, "png", ["jpeg", "png"]);
  const upstreamBody: Record<string, unknown> = {
    prompt: body.prompt,
    image_urls: images.map(
      ({ bytes, mime }) => `data:${mime || "image/png"};base64,${bytes.toString("base64")}`
    ),
    image_size: mapFalImageSize(body.size, "auto"),
    output_format: outputFormat,
    sync_mode: body.sync_mode ?? true,
  };

  if (body.n !== undefined) upstreamBody.num_images = Number(body.n) || 1;
  if (body.seed !== undefined) upstreamBody.seed = body.seed;

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("IMAGE", `${provider}/${editModel} (fal-ai edit) | prompt: "${promptPreview}..."`);
  }

  try {
    const token = credentials.apiKey || credentials.accessToken;
    const response = await fetch(`${providerConfig.baseUrl.replace(/\/$/, "")}/${editModel}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${token}`,
      },
      body: JSON.stringify(upstreamBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
      return saveImageErrorResult({
        provider,
        model: editModel,
        status: response.status,
        startTime,
        error: errorText,
        requestBody: upstreamBody,
        path: "/v1/images/edits",
      });
    }

    const payload = await response.json();
    const normalizedBody =
      body.response_format === undefined ? { ...body, response_format: "b64_json" } : body;
    const imagesOut = await normalizeProviderImagePayload(payload, normalizedBody, log, "b64_json");
    return saveImageSuccessResult({
      provider,
      model: editModel,
      startTime,
      requestBody: upstreamBody,
      responseBody: { images_count: imagesOut.length },
      created: payload.created,
      images: imagesOut,
      path: "/v1/images/edits",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (log) log.error("IMAGE", `${provider} fetch error: ${message}`);
    return saveImageErrorResult({
      provider,
      model: editModel,
      status: 502,
      startTime,
      error: `Image provider error: ${sanitizeErrorMessage(message || err)}`,
      path: "/v1/images/edits",
    });
  }
}
