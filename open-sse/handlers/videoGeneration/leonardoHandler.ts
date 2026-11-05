/**
 * Leonardo AI (Motion 2.0) text-to-video: submit → poll → fetch the mp4.
 *
 * Extracted out of the frozen `videoGeneration.ts` god-file (unchanged behavior) to make
 * room for the new DeepInfra video adapter without pushing the file-size ratchet over its
 * baseline — mirrors the existing `googleFlowHandler.ts` extraction.
 */

import { saveCallLog } from "@/lib/usageDb";
import { abortedVideoResult, POLL_ABORTED, pollJsonAfter } from "./abort.ts";

// Catalog id -> Leonardo `model` enum for POST /generations-text-to-video. `phoenix` was the
// old catalog id (an image model); it keeps working as Motion 2.0. Anything else passes
// through as the enum itself.
const LEONARDO_VIDEO_MODELS: Record<string, string> = {
  "motion-2.0": "MOTION2",
  "motion-2.0-fast": "MOTION2FAST",
  phoenix: "MOTION2",
};

/** Catalog id -> Leonardo `model` enum; an unknown id is sent as the enum itself. */
export function resolveLeonardoVideoModel(model: string): string {
  return LEONARDO_VIDEO_MODELS[model] ?? model;
}

// Leonardo's video sizes as [long side, short side].
const LEONARDO_VIDEO_SIZES = {
  RESOLUTION_480: [832, 480],
  RESOLUTION_720: [1280, 720],
} as const;

function parseVideoSize(size: unknown): [number, number] {
  const match = typeof size === "string" ? size.trim().match(/^(\d+)x(\d+)$/i) : null;
  return match ? [Number(match[1]), Number(match[2])] : [0, 0];
}

/** A `WxH` size with a short side <= 480 picks RESOLUTION_480, else RESOLUTION_720. */
export function resolveLeonardoVideoSize(size: unknown) {
  const [width, height] = parseVideoSize(size);
  const resolution =
    width > 0 && Math.min(width, height) <= 480 ? "RESOLUTION_480" : "RESOLUTION_720";
  const [long, short] = LEONARDO_VIDEO_SIZES[resolution];
  return height > width
    ? { resolution, width: short, height: long }
    : { resolution, width: long, height: short };
}

/** The finished video: `motionMP4URL`, since `url` on a video generation is a jpg thumbnail. */
function leonardoVideoUrl(generation: {
  generated_images?: Array<{ motionMP4URL?: string }>;
}): string | undefined {
  return generation.generated_images?.[0]?.motionMP4URL;
}

export async function handleLeonardoVideoGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
  signal = null,
  pollIntervalMs = 5000,
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || "";
  const res = await fetch(providerConfig.baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      model: resolveLeonardoVideoModel(model),
      prompt: body.prompt,
      ...resolveLeonardoVideoSize(body.size),
      isPublic: false,
    }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: res.status,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: errorText.slice(0, 500),
    }).catch(() => {});
    return { success: false, status: res.status, error: errorText };
  }
  const { motionVideoGenerationJob } = await res.json();
  const genId = motionVideoGenerationJob?.generationId;
  if (!genId) {
    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: "No generation ID returned",
    }).catch(() => {});
    return { success: false, status: 502, error: "No generation ID returned" };
  }
  const deadline = Date.now() + 300000;
  while (Date.now() < deadline) {
    const status = await pollJsonAfter(
      pollIntervalMs,
      `${providerConfig.statusUrl}/${genId}`,
      { Authorization: `Bearer ${token}` },
      signal
    );
    if (status === POLL_ABORTED) return abortedVideoResult();
    const gen = status.generations_by_pk || status;
    if (gen.status === "COMPLETE") {
      const videoUrl = leonardoVideoUrl(gen);
      if (videoUrl) {
        const videoRes = await fetch(videoUrl);
        const buf = await videoRes.arrayBuffer();
        saveCallLog({
          method: "POST",
          path: "/v1/videos/generations",
          status: 200,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
        }).catch(() => {});
        return {
          success: true,
          data: {
            created: Math.floor(Date.now() / 1000),
            data: [{ b64_json: Buffer.from(buf).toString("base64"), format: "mp4" }],
          },
        };
      }
    }
    if (gen.status === "FAILED") {
      saveCallLog({
        method: "POST",
        path: "/v1/videos/generations",
        status: 502,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: "Leonardo video generation failed",
      }).catch(() => {});
      return { success: false, status: 502, error: "Leonardo video generation failed" };
    }
  }
  saveCallLog({
    method: "POST",
    path: "/v1/videos/generations",
    status: 504,
    model: `${provider}/${model}`,
    provider,
    duration: Date.now() - startTime,
    error: "Leonardo video generation timed out",
  }).catch(() => {});
  return { success: false, status: 504, error: "Leonardo video generation timed out" };
}
