/**
 * RenderHour (renderhour.com) video generation: upload frames → submit → poll → URLs.
 *
 * The job API is shared with images and speech (../mediaGeneration/renderhour.ts). A start
 * frame (`image`, `image_url`, `start_image`…), an end frame (`end_image`, `last_frame`) and
 * reference images (`reference_images`, `image_urls`) are uploaded first and sent by asset id.
 */

import { saveCallLog } from "@/lib/usageDb";
import {
  RENDERHOUR_VIDEO_RATIOS,
  renderhourAspectRatio,
  renderhourBaseUrl,
  renderhourConfig,
  renderhourFailure,
  renderhourNumber,
  renderhourSeconds,
  renderhourToken,
  runRenderhourJob,
  uploadRenderhourInputs,
} from "../mediaGeneration/renderhour.ts";

type Body = Record<string, unknown>;

function firstImage(body: Body, keys: readonly string[]): string | undefined {
  for (const key of keys) {
    const value = body[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return undefined;
}

function imageList(body: Body, keys: readonly string[]): string[] {
  const list: string[] = [];
  for (const key of keys) {
    const value = body[key];
    if (!Array.isArray(value)) continue;
    for (const item of value) if (typeof item === "string" && item.trim()) list.push(item.trim());
  }
  return [...new Set(list)];
}

const START_FRAME_KEYS = [
  "start_image",
  "first_frame",
  "image",
  "image_url",
  "imageUrl",
  "prompt_image",
  "promptImage",
];
const END_FRAME_KEYS = ["end_image", "last_frame", "end_image_url", "lastFrame"];
const REFERENCE_KEYS = ["reference_images", "references", "image_urls", "imageUrls"];

async function uploadVideoInputs(body: Body, target: { baseUrl: string; token: string; signal }) {
  const start = firstImage(body, START_FRAME_KEYS);
  const end = firstImage(body, END_FRAME_KEYS);
  const [startFrame] = await uploadRenderhourInputs(start ? [start] : [], target);
  const [endFrame] = await uploadRenderhourInputs(end ? [end] : [], target);
  const references = await uploadRenderhourInputs(imageList(body, REFERENCE_KEYS), target);
  return {
    references,
    ...(startFrame ? { start_frame: startFrame } : {}),
    ...(endFrame ? { end_frame: endFrame } : {}),
  };
}

async function toVideoItems(urls: string[], wantsBase64: boolean) {
  if (!wantsBase64) return urls.map((url) => ({ url, format: "mp4" }));
  const items = [];
  for (const url of urls) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`RenderHour file download failed (${response.status})`);
    const b64 = Buffer.from(await response.arrayBuffer()).toString("base64");
    items.push({ b64_json: b64, format: "mp4" });
  }
  return items;
}

function logCall({ provider, model, status, startTime, requestBody, responseBody = null }) {
  saveCallLog({
    method: "POST",
    path: "/v1/videos/generations",
    status,
    model: `${provider}/${model}`,
    provider,
    duration: Date.now() - startTime,
    requestBody,
    responseBody,
  }).catch(() => {});
}

export async function handleRenderhourVideoGeneration({
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
  if (!token) {
    return {
      success: false,
      status: 401,
      error: "RenderHour needs an API key or a signed-in RenderHour account",
    };
  }
  const baseUrl = renderhourBaseUrl(credentials, providerConfig.baseUrl);
  const request: Body = {
    model,
    prompt: typeof body.prompt === "string" ? body.prompt : "",
    duration_s: renderhourSeconds(body),
    aspect_ratio: renderhourAspectRatio(body, RENDERHOUR_VIDEO_RATIOS),
    config: renderhourConfig(body),
  };

  try {
    request.inputs = await uploadVideoInputs(body, { baseUrl, token, signal });
    log?.info?.("VIDEO", `${provider}/${model} (renderhour) | submitting`);
    const result = await runRenderhourJob({
      baseUrl,
      token,
      request,
      timeoutMs: renderhourNumber(body.timeout_ms, 900_000),
      pollIntervalMs: renderhourNumber(body.poll_interval_ms, 5000),
      log,
      signal,
    });
    if (result.ok === false) {
      logCall({ provider, model, status: result.status, startTime, requestBody: request });
      return { success: false, status: result.status, error: result.error };
    }

    const urls = result.job.outputs.map((output) => output.url);
    const data = await toVideoItems(urls, body.response_format === "b64_json");
    logCall({
      provider,
      model,
      status: 200,
      startTime,
      requestBody: request,
      responseBody: { job_id: result.job.id, videos_count: data.length },
    });
    return { success: true, data: { created: Math.floor(Date.now() / 1000), data } };
  } catch (err) {
    const failure = renderhourFailure(err);
    log?.error?.("VIDEO", `${provider} error: ${failure.error}`);
    logCall({ provider, model, status: failure.status, startTime, requestBody: request });
    return { success: false, status: failure.status, error: failure.error };
  }
}
