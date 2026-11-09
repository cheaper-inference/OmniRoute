import { fetchWithTimeout } from "../../../utils/fetchTimeout.ts";
import type { ExecutorLog, ProviderCredentials } from "../../../executors/base.ts";
import {
  mapFalImageSize,
  normalizeProviderImagePayload,
  normalizeRequestedImageFormat,
  saveImageErrorResult,
  saveImageSuccessResult,
} from "../../imageGeneration.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";
import {
  falEditEndpoint,
  falSelectionEndpoint,
  isLegacyFalEndpoint,
} from "../../../config/falEndpoint.ts";
import type { PrepareFalInput } from "../../fal/compatibility.ts";

export const FAL_IMAGE_EDIT_MODELS = new Set([
  "fal-ai/flux-2-flex",
  "fal-ai/flux-2-max",
  "fal-ai/flux-2-pro",
]);

export const FAL_IMAGE_EDIT_MAX_REFERENCES = 10;

function isFalLegacyEditModel(model: string): boolean {
  return FAL_IMAGE_EDIT_MODELS.has(model) || FAL_IMAGE_EDIT_MODELS.has(`fal-ai/${model}`);
}

/** `native` is FAL_NATIVE_ENABLED: only then may a schema-described endpoint take the edit path. */
export function isFalImageEditModel(model: string | null, native = false): boolean {
  if (typeof model !== "string") return false;
  if (FAL_IMAGE_EDIT_MODELS.has(model)) return true;
  if (!native) return false;
  if (isFalLegacyEditModel(model)) return true;
  // Other legacy aliases are generation endpoints with no edit schema behind them.
  if (isLegacyFalEndpoint(model)) return false;
  try {
    falSelectionEndpoint(model);
    return true;
  } catch {
    return false;
  }
}

/** Schema-described endpoints enforce their own limit; legacy FLUX edits are not validated. */
export function falImageEditMaxReferences(model: string | null): number {
  return typeof model === "string" && !isFalLegacyEditModel(model)
    ? Number.POSITIVE_INFINITY
    : FAL_IMAGE_EDIT_MAX_REFERENCES;
}

// The route computes these from the request, so a raw JSON or form copy must not replace them.
const FAL_EDIT_COMPUTED_INPUTS = new Set([
  "model",
  "image",
  "images",
  "image_url",
  "image_urls",
  "imageUrls",
]);

/** Request body for handleFalAIImageEdit. Off the native path, only the original fields pass. */
export function falImageEditBody(
  model: string | null,
  native: boolean,
  options: Record<string, unknown> | undefined,
  fields: { prompt: string; size: string | null; responseFormat: string | null }
): Record<string, unknown> {
  const base = {
    prompt: fields.prompt,
    size: fields.size ?? undefined,
    response_format: fields.responseFormat ?? undefined,
  };
  if (!native) return { ...base, n: 1 };
  const passed = Object.entries(options ?? {}).filter(
    ([key]) => !FAL_EDIT_COMPUTED_INPUTS.has(key)
  );
  const body = { ...Object.fromEntries(passed), ...base };
  return typeof model === "string" && isFalLegacyEditModel(model) ? { ...body, n: 1 } : body;
}

type FalAIImageEditOptions = {
  provider: string;
  model: string;
  providerConfig: { baseUrl: string };
  body: Record<string, unknown>;
  images: Array<{ bytes: Buffer; mime: string }>;
  credentials: ProviderCredentials;
  log: ExecutorLog | null | undefined;
  signal?: AbortSignal;
  prepareFalInput?: PrepareFalInput | null;
};

export async function handleFalAIImageEdit({
  provider,
  model,
  providerConfig,
  body,
  images,
  credentials,
  log,
  signal,
  prepareFalInput = null,
}: FalAIImageEditOptions) {
  const startTime = Date.now();
  let editModel = `${model}/edit`;
  let upstreamBody: Record<string, unknown> = {};

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("IMAGE", `${provider}/${editModel} (fal-ai) | prompt: "${promptPreview}..."`);
  }

  try {
    upstreamBody = buildEditInput(body, images);
    if (prepareFalInput) {
      editModel = falEditEndpoint(model);
      upstreamBody = await prepareNativeEditInput(
        { model, body, credentials, signal, prepareFalInput },
        editModel,
        upstreamBody
      );
    }
    const token = credentials.apiKey || credentials.accessToken;
    const url = `${providerConfig.baseUrl.replace(/\/$/, "")}/${editModel}`;
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${token}`,
      },
      body: JSON.stringify(upstreamBody),
    };
    const response = prepareFalInput
      ? await fetchWithTimeout(url, { ...request, signal, redirect: "error" })
      : await fetch(url, request);

    return await completeEditResponse({
      response,
      body,
      log,
      provider,
      editModel,
      startTime,
      upstreamBody,
      native: Boolean(prepareFalInput),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (log) log.error("IMAGE", `${provider} fetch error: ${message}`);
    return saveImageErrorResult({
      provider,
      model: editModel,
      status: /Invalid fal input|Unsupported fal|(?:This|A) fal endpoint/.test(message) ? 400 : 502,
      startTime,
      error: `Image provider error: ${sanitizeErrorMessage(message || err)}`,
      path: "/v1/images/edits",
    });
  }
}

function buildEditInput(
  body: Record<string, unknown>,
  images: FalAIImageEditOptions["images"]
): Record<string, unknown> {
  const upstreamBody: Record<string, unknown> = {
    prompt: body.prompt,
    image_urls: images.map(
      ({ bytes, mime }) => `data:${mime || "image/png"};base64,${bytes.toString("base64")}`
    ),
    image_size: mapFalImageSize(body.size, "auto"),
    output_format: normalizeRequestedImageFormat(body, "png", ["jpeg", "png"]),
    sync_mode: body.sync_mode ?? true,
  };

  if (body.n !== undefined) upstreamBody.num_images = Number(body.n) || 1;
  if (body.seed !== undefined) upstreamBody.seed = body.seed;
  return upstreamBody;
}

async function prepareNativeEditInput(
  {
    model,
    body,
    credentials,
    signal,
    prepareFalInput,
  }: Pick<FalAIImageEditOptions, "model" | "body" | "credentials" | "signal"> & {
    prepareFalInput: PrepareFalInput;
  },
  editModel: string,
  computed: Record<string, unknown>
) {
  if (!isFalLegacyEditModel(model)) {
    return prepareFalInput(
      editModel,
      { ...body, image_urls: computed.image_urls },
      credentials,
      signal
    );
  }
  // Legacy FLUX aliases retain their computed input but no longer discard native options.
  const upstreamBody = { ...computed };
  for (const [key, value] of Object.entries(body)) {
    if (
      !Object.hasOwn(computed, key) &&
      !["n", "num_images", "size", "response_format", "fal_input", "mask"].includes(key)
    ) {
      upstreamBody[key] = value;
    }
  }
  if (body.mask !== undefined) upstreamBody.mask_url = body.mask;
  if (body.fal_input && typeof body.fal_input === "object") {
    return prepareFalInput(
      editModel,
      { fal_input: { ...upstreamBody, ...body.fal_input } },
      credentials,
      signal
    );
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
  native,
}: Pick<FalAIImageEditOptions, "body" | "log" | "provider"> & {
  response: Response;
  editModel: string;
  startTime: number;
  upstreamBody: Record<string, unknown>;
  native: boolean;
}) {
  if (!response.ok) {
    const errorText = await response.text();
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
  // The native path honors an explicit `url`; the established path always returns base64.
  const defaultFormat = native && body.response_format === "url" ? "url" : "b64_json";
  const normalizedBody =
    body.response_format === undefined ? { ...body, response_format: "b64_json" } : body;
  const imagesOut = await normalizeProviderImagePayload(
    payload,
    normalizedBody,
    log,
    defaultFormat
  );
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
