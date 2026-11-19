// MegaBrain (getmegabrain.com) image generation.
// Family: megabrain | Provider: megabrain
//
// Job queue shared with video (../../mediaGeneration/megabrain.ts). OpenAI's `n` and `size`
// become the model's `num_images` and `image_size` / `aspect_ratio`; reference images go to
// the /edit models as `image_urls` (public URLs or data URIs, up to 4).

import {
  copyMegabrainFields,
  megabrainAspectRatio,
  megabrainBaseUrl,
  megabrainFailure,
  megabrainImageRef,
  megabrainImageSize,
  megabrainNumber,
  megabrainOutputUrls,
  megabrainTakes,
  megabrainToken,
  MEGABRAIN_NO_TOKEN,
  runMegabrainJob,
} from "../../mediaGeneration/megabrain.ts";
import {
  extractImageInputs,
  normalizeProviderImagePayload,
  resolveImageSource,
  saveImageErrorResult,
  saveImageSuccessResult,
} from "../../imageGeneration.ts";

type Body = Record<string, unknown>;

const MAX_IMAGES = 4;
const NANO_BANANA_RATIOS = [
  "21:9",
  "16:9",
  "3:2",
  "4:3",
  "5:4",
  "1:1",
  "4:5",
  "3:4",
  "2:3",
  "9:16",
];

/** Fields a caller may set directly; each is sent only if the model takes it. */
const PASSTHROUGH = [
  "image_size",
  "aspect_ratio",
  "resolution",
  "seed",
  "output_format",
  "safety_tolerance",
  "num_inference_steps",
  "guidance_scale",
  "acceleration",
  "enable_prompt_expansion",
];

function imageCount(n: unknown): number {
  const count = typeof n === "number" && Number.isFinite(n) ? Math.round(n) : 1;
  return Math.min(Math.max(count, 1), MAX_IMAGES);
}

/** The model input for an OpenAI-style images request, without reference images. */
export function buildMegabrainImageInput(model: string, body: Body): Body {
  const input: Body = { prompt: typeof body.prompt === "string" ? body.prompt : "" };
  if (megabrainTakes(model, "num_images") && body.n !== undefined) {
    input.num_images = imageCount(body.n);
  }
  // Edit models size their output from the input image unless told otherwise.
  if (!model.endsWith("/edit")) {
    const size = megabrainImageSize(body.size);
    if (size && megabrainTakes(model, "image_size")) input.image_size = size;
    else if (size && megabrainTakes(model, "aspect_ratio")) {
      input.aspect_ratio = megabrainAspectRatio(body.size, NANO_BANANA_RATIOS);
    }
  }
  copyMegabrainFields(model, body, input, PASSTHROUGH);
  return input;
}

export async function handleMegabrainImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
  signal = null,
}) {
  const startTime = Date.now();
  const token = megabrainToken(credentials);
  const input = buildMegabrainImageInput(model, body);
  const fail = (status: number, error: string) =>
    saveImageErrorResult({ provider, model, status, startTime, error, requestBody: input });
  if (!token) return fail(401, MEGABRAIN_NO_TOKEN);

  try {
    // Reference images go to MegaBrain but not into the call log (data URIs are large).
    const references = extractImageInputs(body).imageUrls.slice(0, MAX_IMAGES);
    const imageUrls =
      references.length > 0 && megabrainTakes(model, "image_urls")
        ? await Promise.all(
            references.map((source) => megabrainImageRef(source, resolveImageSource))
          )
        : [];
    log?.info?.("IMAGE", `${provider}/${model} (megabrain) | submitting`);

    const result = await runMegabrainJob({
      baseUrl: megabrainBaseUrl(providerConfig.baseUrl),
      token,
      model,
      input: imageUrls.length > 0 ? { ...input, image_urls: imageUrls } : input,
      timeoutMs: megabrainNumber(body.timeout_ms, 300_000),
      pollIntervalMs: megabrainNumber(body.poll_interval_ms, 2000),
      log,
      signal,
    });
    if (result.ok === false) return fail(result.status, result.error);

    const urls = megabrainOutputUrls(result.output);
    if (urls.length === 0) return fail(502, `MegaBrain job ${result.requestId} returned no images`);
    const images = await normalizeProviderImagePayload(
      { images: urls.map((url) => ({ url })) },
      body,
      log,
      "url"
    );
    return saveImageSuccessResult({
      provider,
      model,
      startTime,
      requestBody: input,
      responseBody: { request_id: result.requestId, images_count: images.length },
      images,
    });
  } catch (err) {
    const failure = megabrainFailure(err);
    log?.error?.("IMAGE", `${provider} error: ${failure.error}`);
    return fail(failure.status, failure.error);
  }
}
