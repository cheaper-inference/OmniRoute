import { fetchWithTimeout } from "@/shared/utils/fetchTimeout";
import type { ExecutorLog, ProviderCredentials } from "../../../executors/base.ts";
import {
  mapFalImageSize,
  normalizeProviderImagePayload,
  normalizeRequestedImageFormat,
  saveImageErrorResult,
  saveImageSuccessResult,
} from "../../imageGeneration.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";
import { canonicalFalEndpoint, falEditEndpoint } from "../../../config/falEndpoint.ts";
import { prepareFalCompatibility } from "@/lib/fal/compatibility";

export const FAL_IMAGE_EDIT_MODELS = new Set([
  "fal-ai/flux-2-flex",
  "fal-ai/flux-2-pro",
  "fal-ai/flux-2-max",
]);

export const FAL_IMAGE_EDIT_MAX_REFERENCES = 10;

export function isFalImageEditModel(model: string | null): boolean {
  if (typeof model !== "string") return false;
  try {
    canonicalFalEndpoint(model);
    return true;
  } catch {
    return false;
  }
}

type FalAIImageEditOptions = {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string };
  body: Record<string, unknown>;
  images: Array<{ bytes: Buffer; mime: string }>;
  credentials: ProviderCredentials;
  log: ExecutorLog | null | undefined;
  signal?: AbortSignal;
};

export async function handleFalAIImageEdit({
  model,
  provider,
  providerConfig,
  body,
  images,
  credentials,
  log,
  signal,
}: FalAIImageEditOptions) {
  const startTime = Date.now();
  const editModel = falEditEndpoint(model);
  let upstreamBody: Record<string, unknown> = {};

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("IMAGE", `${provider}/${editModel} (fal-ai edit) | prompt: "${promptPreview}..."`);
  }

  try {
    upstreamBody = await prepareEditInput({ model, body, images, credentials }, editModel);
    const token = credentials.apiKey || credentials.accessToken;
    const response = await fetchWithTimeout(
      `${providerConfig.baseUrl.replace(/\/$/, "")}/${editModel}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Key ${token}`,
        },
        body: JSON.stringify(upstreamBody),
        signal,
        redirect: "error",
      }
    );

    return completeEditResponse({
      response,
      body,
      log,
      provider,
      editModel,
      startTime,
      upstreamBody,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (log) log.error("IMAGE", `${provider} fetch error: ${message}`);
    return saveImageErrorResult({
      provider,
      model: editModel,
      status: /Invalid fal input|Unsupported fal/.test(message) ? 400 : 502,
      startTime,
      error: `Image provider error: ${sanitizeErrorMessage(message || err)}`,
      path: "/v1/images/edits",
    });
  }
}

async function prepareEditInput(
  {
    model,
    body,
    images,
    credentials,
  }: Pick<FalAIImageEditOptions, "model" | "body" | "images" | "credentials">,
  editModel: string
) {
  const outputFormat = normalizeRequestedImageFormat(body, "png", ["jpeg", "png"]);
  let upstreamBody: Record<string, unknown> = {
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

  if (!FAL_IMAGE_EDIT_MODELS.has(canonicalFalEndpoint(model))) {
    upstreamBody = await prepareFalCompatibility(
      editModel,
      {
        ...body,
        image_urls: images.map(
          ({ bytes, mime }) => `data:${mime || "image/png"};base64,${bytes.toString("base64")}`
        ),
      },
      credentials
    );
  } else {
    // Legacy FLUX aliases retain their defaults but no longer discard native options.
    for (const [key, value] of Object.entries(body)) {
      if (!["model", "n", "size", "response_format", "fal_input", "mask"].includes(key))
        upstreamBody[key] = value;
    }
    if (body.mask !== undefined) upstreamBody.mask_url = body.mask;
    if (body.fal_input && typeof body.fal_input === "object") {
      upstreamBody = await prepareFalCompatibility(
        editModel,
        { fal_input: { ...upstreamBody, ...body.fal_input } },
        credentials
      );
    }
  }
  return upstreamBody;
}
async function completeEditResponse({
  response,
  body,
  log,
  provider,
  editModel,
  startTime,
  upstreamBody,
}: Pick<FalAIImageEditOptions, "body" | "log" | "provider"> & {
  response: Response;
  editModel: string;
  startTime: number;
  upstreamBody: Record<string, unknown>;
}) {
  if (!response.ok) {
    await response.body?.cancel();
    const errorText = `Fal image edit request failed (${response.status})`;
    if (log) log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
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
}
