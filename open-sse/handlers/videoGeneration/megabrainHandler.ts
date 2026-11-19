/**
 * MegaBrain (getmegabrain.com) video generation: submit → poll → URL.
 *
 * The job queue is shared with images (../mediaGeneration/megabrain.ts). A start frame
 * (`image`, `image_url`, `start_image`…) and an end frame (`end_image`, `last_frame`…) go to
 * the model's `start_image_url` / `end_image_url`. A text-to-video id given a start frame is
 * sent to its image-to-video sibling. The call is recorded through the dispatcher's injected recorder.
 */

import { resolveImageSource } from "../imageGeneration.ts";
import type { RecordVideoJobCall, VideoJobResult } from "./job.ts";
import {
  copyMegabrainFields,
  megabrainAspectRatio,
  megabrainBaseUrl,
  megabrainFailure,
  megabrainImageRef,
  megabrainNumber,
  megabrainOutputUrls,
  megabrainSeconds,
  megabrainString,
  megabrainTakes,
  megabrainToken,
  MEGABRAIN_NO_TOKEN,
  runMegabrainJob,
  type MegabrainLog,
} from "../mediaGeneration/megabrain.ts";

type Body = Record<string, unknown>;

const START_FRAME_KEYS = [
  "start_image_url",
  "first_frame_url",
  "start_image",
  "first_frame",
  "image",
  "image_url",
  "imageUrl",
  "prompt_image",
  "promptImage",
];
const END_FRAME_KEYS = ["end_image_url", "last_frame_url", "end_image", "last_frame", "lastFrame"];
const VIDEO_RATIOS = ["16:9", "9:16", "1:1", "4:3", "3:4", "21:9"];
const PASSTHROUGH = ["aspect_ratio", "generate_audio", "negative_prompt", "cfg_scale"];

function firstImage(body: Body, keys: readonly string[]): string | undefined {
  for (const key of keys) {
    const value = megabrainString(body[key]);
    if (value) return value;
  }
  // `image_urls: [start]` is the other common way to pass a single start frame.
  if (keys === START_FRAME_KEYS && Array.isArray(body.image_urls)) {
    return megabrainString(body.image_urls[0]);
  }
  return undefined;
}

/** The model to call: a text-to-video id given a start frame becomes image-to-video. */
export function resolveMegabrainVideoModel(model: string, body: Body): string {
  if (!model.endsWith("/text-to-video") || !firstImage(body, START_FRAME_KEYS)) return model;
  const sibling = model.replace(/\/text-to-video$/, "/image-to-video");
  return megabrainTakes(sibling, "duration") ? sibling : model;
}

/** The model input without frames: prompt, duration, ratio and the model's own options. */
export function buildMegabrainVideoInput(model: string, body: Body): Body {
  const input: Body = { prompt: typeof body.prompt === "string" ? body.prompt : "" };
  const seconds = megabrainSeconds(body);
  if (seconds && megabrainTakes(model, "duration")) input.duration = seconds;
  const ratio = megabrainAspectRatio(body.size, VIDEO_RATIOS);
  if (ratio && megabrainTakes(model, "aspect_ratio")) input.aspect_ratio = ratio;
  copyMegabrainFields(model, body, input, PASSTHROUGH);
  return input;
}

/** The start / end frame fields the model takes, filled from the request. */
async function frameInputs(model: string, body: Body): Promise<Body> {
  const frames: Body = {};
  const start = firstImage(body, START_FRAME_KEYS);
  const end = firstImage(body, END_FRAME_KEYS);
  if (start && megabrainTakes(model, "start_image_url")) {
    frames.start_image_url = await megabrainImageRef(start, resolveImageSource);
  }
  if (end && megabrainTakes(model, "end_image_url")) {
    frames.end_image_url = await megabrainImageRef(end, resolveImageSource);
  }
  return frames;
}

async function toVideoItems(urls: string[], wantsBase64: boolean) {
  if (!wantsBase64) return urls.map((url) => ({ url, format: "mp4" }));
  const items = [];
  for (const url of urls) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`MegaBrain file download failed (${response.status})`);
    const b64 = Buffer.from(await response.arrayBuffer()).toString("base64");
    items.push({ b64_json: b64, format: "mp4" });
  }
  return items;
}

async function runVideoJob({
  model: requested,
  providerConfig,
  body,
  credentials,
  log,
  signal,
}: {
  model: string;
  providerConfig: { baseUrl: string };
  body: Body;
  credentials: unknown;
  log?: MegabrainLog | null;
  signal?: AbortSignal | null;
}): Promise<VideoJobResult> {
  const token = megabrainToken(credentials);
  if (!token) return { success: false, status: 401, error: MEGABRAIN_NO_TOKEN };
  const model = resolveMegabrainVideoModel(requested, body);
  try {
    const input = { ...buildMegabrainVideoInput(model, body), ...(await frameInputs(model, body)) };
    log?.info?.("VIDEO", `megabrain/${model} | submitting`);
    const result = await runMegabrainJob({
      baseUrl: megabrainBaseUrl(providerConfig.baseUrl),
      token,
      model,
      input,
      timeoutMs: megabrainNumber(body.timeout_ms, 900_000),
      pollIntervalMs: megabrainNumber(body.poll_interval_ms, 5000),
      log,
      signal,
    });
    if (result.ok === false) return { success: false, status: result.status, error: result.error };
    const urls = megabrainOutputUrls(result.output);
    if (urls.length === 0) {
      return {
        success: false,
        status: 502,
        error: `MegaBrain job ${result.requestId} returned no video`,
      };
    }
    const data = await toVideoItems(urls, body.response_format === "b64_json");
    return { success: true, data: { created: Math.floor(Date.now() / 1000), data } };
  } catch (err) {
    const failure = megabrainFailure(err);
    log?.error?.("VIDEO", `megabrain error: ${failure.error}`);
    return { success: false, status: failure.status, error: failure.error };
  }
}

export async function handleMegabrainVideoGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
  signal = null,
  recordCall,
}: {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string };
  body: Body;
  credentials: unknown;
  log?: MegabrainLog | null;
  signal?: AbortSignal | null;
  /** Usage/call-log recorder injected by the dispatcher; the job is not recorded without it. */
  recordCall?: RecordVideoJobCall;
}): Promise<VideoJobResult> {
  const startTime = Date.now();
  const result = await runVideoJob({ model, providerConfig, body, credentials, log, signal });
  // A recording failure must never turn a finished generation into an error.
  try {
    await recordCall?.({ provider, model, result, durationMs: Date.now() - startTime });
  } catch {
    // ignored: the generation's own result is what the caller needs
  }
  return result;
}
