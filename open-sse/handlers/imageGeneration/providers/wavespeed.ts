// WaveSpeedAI (api.wavespeed.ai) image generation.
// Family: wavespeed-image | Provider: wavespeed
//
// Async prediction API: POST /api/v3/<model id> -> { data: { id } }; GET
// /api/v3/predictions/<id>/result until data.status is "completed", then data.outputs holds
// the image URLs. The submit is sent exactly once: a second POST starts a second prediction.
// Result reads are retried on 408/429/5xx and network errors with backoff (Retry-After honored).

import { mapImageSize } from "../../../translator/image/sizeMapper.ts";
import { sleep } from "../../../utils/sleep.ts";
import { clampPollIntervalMs, clampPollTimeoutMs } from "../../../utils/pollBounds.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";
import { getConfiguredTimeout } from "../../../utils/fetchTimeout.ts";
import {
  normalizeProviderImagePayload,
  saveImageErrorResult,
  saveImageSuccessResult,
} from "../../imageGeneration.ts";
import {
  MAX_CONSECUTIVE_POLL_RETRIES,
  computePollRetryDelayMs,
  parseRetryAfterMs,
} from "../../videoGeneration/pollRetry.ts";
import {
  WAVESPEED_BASE_URL,
  buildWavespeedResultUrl,
  buildWavespeedSubmitUrl,
  isRetryableWavespeedPollStatus,
  pickWavespeedModelInput,
  readWavespeedFailure,
} from "../../mediaGeneration/wavespeed.ts";

const DEFAULT_TIMEOUT_MS = 300_000;
const DEFAULT_POLL_INTERVAL_MS = 1000;

// How each catalog model takes its output dimensions. An OpenAI `size` ("1024x1024") is
// translated for these models only; for any other model id it is left out, because the name of
// the size input is not known.
const WAVESPEED_PIXEL_SIZE_MODELS = new Set(["wavespeed-ai/z-image/turbo"]);
const WAVESPEED_ASPECT_RATIO_MODELS = new Set([
  "bytedance/seedream-v5.0-pro",
  "google/nano-banana-pro/text-to-image",
]);

const OPENAI_SIZE_PATTERN = /^(\d+)x(\d+)$/i;

class WavespeedImageError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/** The WaveSpeedAI model input for an OpenAI-style image request. */
export function buildWavespeedImageInput(
  model: string,
  body: Record<string, unknown>
): Record<string, unknown> {
  const input = pickWavespeedModelInput(body);
  input.prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");

  const size = typeof body.size === "string" ? body.size.trim() : "";
  const openAiSize = OPENAI_SIZE_PATTERN.exec(size);
  // Anything that is not "WxH" is already a native value (z-image takes "1024*1024").
  if (!openAiSize) return input;

  delete input.size;
  if (WAVESPEED_PIXEL_SIZE_MODELS.has(model)) {
    input.size = `${openAiSize[1]}*${openAiSize[2]}`;
  } else if (WAVESPEED_ASPECT_RATIO_MODELS.has(model) && input.aspect_ratio === undefined) {
    input.aspect_ratio = mapImageSize(size);
  }
  return input;
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function upstreamErrorText(payload: unknown, fallback: string): string {
  if (typeof payload === "string") return payload || fallback;
  const message = (payload as { message?: unknown } | null)?.message;
  return typeof message === "string" && message ? message : fallback;
}

async function submitWavespeedPrediction({
  url,
  token,
  input,
  timeoutMs,
  signal,
}): Promise<string> {
  // Sent once, never retried; the timeout bounds both the response headers and the body read.
  const deadlineSignal = AbortSignal.timeout(timeoutMs);
  let response: Response;
  let payload: unknown;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
      signal: signal ? AbortSignal.any([signal, deadlineSignal]) : deadlineSignal,
    });
    payload = await readJson(response);
  } catch (err) {
    if (!signal?.aborted && deadlineSignal.aborted) {
      throw new WavespeedImageError(504, `WaveSpeedAI request timed out after ${timeoutMs}ms`);
    }
    throw err;
  }

  if (!response.ok) {
    throw new WavespeedImageError(
      response.status,
      upstreamErrorText(payload, `WaveSpeedAI request failed (${response.status})`)
    );
  }
  const failure = readWavespeedFailure(payload);
  if (failure) throw new WavespeedImageError(failure.status, failure.message);

  const id = (payload as { data?: { id?: unknown } } | null)?.data?.id;
  if (typeof id !== "string" || !id) {
    throw new WavespeedImageError(502, "WaveSpeedAI did not return a prediction id");
  }
  return id;
}

async function pollWavespeedPrediction({ url, token, body, log, signal }): Promise<string[]> {
  const timeoutMs = clampPollTimeoutMs(body.timeout_ms, DEFAULT_TIMEOUT_MS);
  const pollIntervalMs = clampPollIntervalMs(body.poll_interval_ms, DEFAULT_POLL_INTERVAL_MS);
  const deadline = Date.now() + timeoutMs;
  let transientFailures = 0;
  let delayMs = pollIntervalMs;

  while (Date.now() < deadline) {
    await sleep(Math.min(delayMs, Math.max(0, deadline - Date.now())), signal);
    if (signal?.aborted) throw new WavespeedImageError(499, "Request aborted");
    const remainingMs = deadline - Date.now();
    if (remainingMs <= 0) break;

    // Each read is bounded by what is left of the deadline as well as by the caller's signal.
    const deadlineSignal = AbortSignal.timeout(remainingMs);
    const readSignal = signal ? AbortSignal.any([signal, deadlineSignal]) : deadlineSignal;
    // A failed read the docs ask to retry; the prediction is already running upstream.
    let transient: { error: WavespeedImageError; retryAfterMs: number } | null = null;
    let payload: unknown = null;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        signal: readSignal,
      });
      payload = await readJson(response);
      if (!response.ok) {
        const error = new WavespeedImageError(
          response.status,
          upstreamErrorText(payload, `WaveSpeedAI result request failed (${response.status})`)
        );
        if (!isRetryableWavespeedPollStatus(response.status)) throw error;
        transient = { error, retryAfterMs: parseRetryAfterMs(response.headers.get("retry-after")) };
      }
    } catch (err) {
      if (err instanceof WavespeedImageError) throw err;
      if (signal?.aborted) throw new WavespeedImageError(499, "Request aborted");
      if (deadlineSignal.aborted) break;
      const message = sanitizeErrorMessage((err as Error)?.message || err);
      transient = {
        error: new WavespeedImageError(502, `WaveSpeedAI result request failed: ${message}`),
        retryAfterMs: 0,
      };
    }

    const failure = transient ? null : readWavespeedFailure(payload);
    if (failure?.transient) {
      transient = {
        error: new WavespeedImageError(failure.status, failure.message),
        retryAfterMs: 0,
      };
    } else if (failure) {
      throw new WavespeedImageError(failure.status, failure.message);
    }

    if (transient) {
      if (transientFailures >= MAX_CONSECUTIVE_POLL_RETRIES) throw transient.error;
      transientFailures += 1;
      delayMs = computePollRetryDelayMs(pollIntervalMs, transientFailures, transient.retryAfterMs);
      continue;
    }
    transientFailures = 0;
    delayMs = pollIntervalMs;

    const data = (payload as { data?: { status?: unknown; outputs?: unknown } } | null)?.data;
    if (data?.status === "completed") {
      return Array.isArray(data.outputs)
        ? data.outputs.filter((output): output is string => typeof output === "string")
        : [];
    }

    if (log) log.info("IMAGE", `wavespeed polling status: ${String(data?.status || "pending")}`);
  }

  throw new WavespeedImageError(504, `WaveSpeedAI polling timed out after ${timeoutMs}ms`);
}

export async function handleWavespeedImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
  signal = null,
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || credentials?.accessToken;
  if (!token) {
    return { success: false, status: 401, error: "WaveSpeedAI API key is required" };
  }

  const baseUrl = providerConfig?.baseUrl || WAVESPEED_BASE_URL;
  const input = buildWavespeedImageInput(model, body);
  let submitUrl: string;
  try {
    submitUrl = buildWavespeedSubmitUrl(baseUrl, model);
  } catch (err) {
    return { success: false, status: 400, error: (err as Error).message };
  }

  if (log) {
    const promptPreview = String(input.prompt).slice(0, 60);
    log.info("IMAGE", `${provider}/${model} (wavespeed) | prompt: "${promptPreview}..."`);
  }

  try {
    const predictionId = await submitWavespeedPrediction({
      url: submitUrl,
      token,
      input,
      timeoutMs: Math.min(
        getConfiguredTimeout(),
        clampPollTimeoutMs(body.timeout_ms, DEFAULT_TIMEOUT_MS)
      ),
      signal,
    });
    const outputs = await pollWavespeedPrediction({
      url: buildWavespeedResultUrl(baseUrl, predictionId),
      token,
      body,
      log,
      signal,
    });

    const images = await normalizeProviderImagePayload({ data: outputs }, body, log, "url");
    if (images.length === 0) {
      throw new WavespeedImageError(502, "WaveSpeedAI returned no image output");
    }
    return saveImageSuccessResult({
      provider,
      model,
      startTime,
      requestBody: input,
      responseBody: { images_count: images.length },
      images,
    });
  } catch (err) {
    const aborted = Boolean(signal?.aborted);
    const status = aborted ? 499 : err instanceof WavespeedImageError ? err.status : 502;
    const message = aborted
      ? "Request aborted"
      : sanitizeErrorMessage((err as Error)?.message || err);
    if (log) log.error("IMAGE", `${provider} error ${status}: ${String(message).slice(0, 200)}`);
    return saveImageErrorResult({
      provider,
      model,
      status,
      startTime,
      error: err instanceof WavespeedImageError ? message : `Image provider error: ${message}`,
      requestBody: input,
    });
  }
}
