// RenderHour (renderhour.com) image generation.
// Family: renderhour | Provider: renderhour
//
// Async job API shared with video and speech (../../mediaGeneration/renderhour.ts): reference
// images are uploaded first and passed by asset id; up to 4 images per job (`n`).

import {
  RENDERHOUR_IMAGE_RATIOS,
  renderhourAspectRatio,
  renderhourBaseUrl,
  renderhourConfig,
  renderhourFailure,
  renderhourNumber,
  renderhourToken,
  runRenderhourJob,
  uploadRenderhourInputs,
} from "../../mediaGeneration/renderhour.ts";
import {
  extractImageInputs,
  normalizeProviderImagePayload,
  resolveImageSource,
  saveImageErrorResult,
  saveImageSuccessResult,
} from "../../imageGeneration.ts";

const MAX_IMAGES_PER_JOB = 4;

function imageCount(n: unknown): number {
  const count = typeof n === "number" && Number.isFinite(n) ? Math.round(n) : 1;
  return Math.min(Math.max(count, 1), MAX_IMAGES_PER_JOB);
}

function imageRequest(model: string, body: Record<string, unknown>): Record<string, unknown> {
  return {
    model,
    prompt: typeof body.prompt === "string" ? body.prompt : "",
    count: imageCount(body.n),
    aspect_ratio: renderhourAspectRatio(body, RENDERHOUR_IMAGE_RATIOS),
    config: renderhourConfig(body),
  };
}

export async function handleRenderhourImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
  signal = null,
}) {
  const startTime = Date.now();
  const token = renderhourToken(credentials);
  const request = imageRequest(model, body);
  const fail = (status: number, error: string) =>
    saveImageErrorResult({ provider, model, status, startTime, error, requestBody: request });
  if (!token) return fail(401, "RenderHour needs an API key or a signed-in RenderHour account");
  const baseUrl = renderhourBaseUrl(credentials, providerConfig.baseUrl);

  try {
    request.inputs = {
      references: await uploadRenderhourInputs(extractImageInputs(body).imageUrls, {
        baseUrl,
        token,
        readSource: resolveImageSource,
        signal,
      }),
    };
    log?.info?.("IMAGE", `${provider}/${model} (renderhour) | submitting`);

    const result = await runRenderhourJob({
      baseUrl,
      token,
      request,
      timeoutMs: renderhourNumber(body.timeout_ms, 300_000),
      pollIntervalMs: renderhourNumber(body.poll_interval_ms, 2000),
      log,
      signal,
    });
    if (result.ok === false) return fail(result.status, result.error);

    const images = await normalizeProviderImagePayload(
      { images: result.job.outputs.map((output) => ({ url: output.url })) },
      body,
      log,
      "url"
    );
    return saveImageSuccessResult({
      provider,
      model,
      startTime,
      requestBody: request,
      responseBody: { job_id: result.job.id, images_count: images.length },
      images,
    });
  } catch (err) {
    const failure = renderhourFailure(err);
    log?.error?.("IMAGE", `${provider} error: ${failure.error}`);
    return fail(failure.status, failure.error);
  }
}
