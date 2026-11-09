/**
 * Leonardo AI (Motion 2.0) text-to-video: submit → poll → fetch the mp4.
 *
 * Extracted out of the frozen `videoGeneration.ts` god-file (unchanged behavior) to make
 * room for the new DeepInfra video adapter without pushing the file-size ratchet over its
 * baseline — mirrors the existing `googleFlowHandler.ts` extraction.
 */

import { saveCallLog } from "@/lib/usageDb";
import {
  downloadUpstreamMedia,
  UPSTREAM_MEDIA_LIMITS,
  upstreamMediaErrorText,
} from "@/shared/network/remoteImageFetch";
import { sanitizeErrorMessage } from "../../utils/error.ts";
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

// Leonardo's video sizes as [long side, short side]. 1280x720 with RESOLUTION_720 was checked
// live (Motion 2.0 Fast, 2026-11-03): the job completes as a 1280x720 mp4.
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

// A stalled CDN must not hold the request open after the job itself has finished.
const LEONARDO_VIDEO_DOWNLOAD_TIMEOUT_MS = 120000;

/**
 * Downloads the finished mp4, cut short by the client's abort or the download timeout.
 * Returns the bytes, `POLL_ABORTED` when the client went away, or an upstream error.
 */
async function downloadLeonardoVideo(
  videoUrl: string,
  signal: AbortSignal | null,
  timeoutMs = LEONARDO_VIDEO_DOWNLOAD_TIMEOUT_MS
): Promise<ArrayBuffer | typeof POLL_ABORTED | { status: number; error: string }> {
  try {
    const { buffer } = await downloadUpstreamMedia(videoUrl, {
      maxBytes: UPSTREAM_MEDIA_LIMITS.video.maxBytes,
      timeoutMs,
      signal,
    });
    return new Uint8Array(buffer).buffer;
  } catch (err) {
    if (signal?.aborted) return POLL_ABORTED;
    if (err instanceof Error && err.name === "TimeoutError") {
      return { status: 504, error: "Leonardo video download timed out" };
    }
    return {
      status: 502,
      error: `Leonardo video download failed: ${sanitizeErrorMessage(upstreamMediaErrorText(err))}`,
    };
  }
}

/** Logs one Leonardo video call; `error` is set on failures. */
function logLeonardoVideoCall(
  provider: string,
  model: string,
  startTime: number,
  status: number,
  error?: string
) {
  saveCallLog({
    method: "POST",
    path: "/v1/videos/generations",
    status,
    model: `${provider}/${model}`,
    provider,
    duration: Date.now() - startTime,
    ...(error ? { error } : {}),
  }).catch(() => {});
}

/** The handler result for a finished download: the mp4, an abort, or a logged failure. */
function videoDownloadResult(
  buf: Awaited<ReturnType<typeof downloadLeonardoVideo>>,
  fail: (status: number, error: string) => { success: boolean; status: number; error: string },
  logSuccess: () => void
) {
  if (buf === POLL_ABORTED) return abortedVideoResult();
  if (!(buf instanceof ArrayBuffer)) return fail(buf.status, buf.error);
  logSuccess();
  return {
    success: true,
    data: {
      created: Math.floor(Date.now() / 1000),
      data: [{ b64_json: Buffer.from(buf).toString("base64"), format: "mp4" }],
    },
  };
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
  downloadTimeoutMs = LEONARDO_VIDEO_DOWNLOAD_TIMEOUT_MS,
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || "";
  const fail = (status: number, error: string, logged = error) => {
    logLeonardoVideoCall(provider, model, startTime, status, logged);
    return { success: false, status, error };
  };
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
    return fail(res.status, errorText, errorText.slice(0, 500));
  }
  const { motionVideoGenerationJob } = await res.json();
  const genId = motionVideoGenerationJob?.generationId;
  if (!genId) return fail(502, "No generation ID returned");
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
    const videoUrl = gen.status === "COMPLETE" ? leonardoVideoUrl(gen) : undefined;
    if (videoUrl) {
      const buf = await downloadLeonardoVideo(videoUrl, signal, downloadTimeoutMs);
      return videoDownloadResult(buf, fail, () =>
        logLeonardoVideoCall(provider, model, startTime, 200)
      );
    }
    if (gen.status === "FAILED") return fail(502, "Leonardo video generation failed");
  }
  return fail(504, "Leonardo video generation timed out");
}
