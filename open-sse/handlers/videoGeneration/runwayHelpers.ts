import {
  UPSTREAM_MEDIA_LIMITS,
  downloadUpstreamMedia,
  upstreamMediaErrorText,
} from "@/shared/network/remoteImageFetch";
import { sanitizeErrorMessage } from "../../utils/error.ts";

// Generated videos are fetched from URLs the provider returns, so they go through the
// upstream-media policy (HTTPS, public hosts only, pinned when direct, bounded size and time).
export async function downloadResultVideo(
  url: string,
  signal?: AbortSignal | null,
  maxBytes: number = UPSTREAM_MEDIA_LIMITS.video.maxBytes
) {
  const { buffer } = await downloadUpstreamMedia(url, {
    maxBytes,
    timeoutMs: UPSTREAM_MEDIA_LIMITS.video.timeoutMs,
    signal,
  });
  return buffer;
}

/** Client-facing text for a failed result-video download. */
export function resultVideoErrorText(err: unknown): string {
  return `Failed to download video: ${sanitizeErrorMessage(upstreamMediaErrorText(err))}`;
}

export function resolveRunwayPromptImage(body) {
  const directCandidates = [
    body.promptImage,
    body.prompt_image,
    body.image,
    body.image_url,
    body.imageUrl,
    body.provider_options?.promptImage,
    body.provider_options?.prompt_image,
  ];

  for (const candidate of directCandidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
    if (candidate && typeof candidate === "object") return candidate;
    if (Array.isArray(candidate) && candidate.length > 0) return candidate;
  }

  const arrayCandidates = [
    body.imageUrls,
    body.image_urls,
    body.provider_options?.imageUrls,
    body.provider_options?.image_urls,
  ];
  for (const candidate of arrayCandidates) {
    if (Array.isArray(candidate) && candidate.length > 0) return candidate;
  }

  return null;
}

export function resolveRunwayRatio(body) {
  const aspectRatio = typeof body.aspect_ratio === "string" ? body.aspect_ratio : body.aspectRatio;
  if (aspectRatio === "1280:720" || aspectRatio === "720:1280") return aspectRatio;
  if (aspectRatio === "16:9") return "1280:720";
  if (aspectRatio === "9:16") return "720:1280";

  const size = typeof body.size === "string" ? body.size : "";
  const [widthRaw, heightRaw] = size.split("x");
  const width = Number(widthRaw);
  const height = Number(heightRaw);
  if (Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0) {
    return width >= height ? "1280:720" : "720:1280";
  }

  return "1280:720";
}

export function resolveRunwayDuration(body) {
  if (Number.isFinite(body.duration)) return clampRunwayDuration(body.duration);
  if (Number.isFinite(body.frames) && Number.isFinite(body.fps) && Number(body.fps) > 0) {
    return clampRunwayDuration(Number(body.frames) / Number(body.fps));
  }
  return 5;
}

function clampRunwayDuration(value) {
  const duration = Math.round(Number(value));
  if (!Number.isFinite(duration)) return 5;
  return Math.min(10, Math.max(2, duration));
}

export function resolvePositiveInteger(value, fallback) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return fallback;
  return Math.floor(numeric);
}

function extractRunwayOutputUrls(task) {
  const rawOutput = Array.isArray(task?.output)
    ? task.output
    : Array.isArray(task?.result)
      ? task.result
      : [];
  return rawOutput
    .map((entry) => {
      if (typeof entry === "string") return entry;
      if (!entry || typeof entry !== "object") return null;
      return entry.url || entry.uri || entry.videoUrl || entry.video_url || null;
    })
    .filter((value) => typeof value === "string" && value.length > 0);
}

export function extractRunwayFailureMessage(task) {
  const directCandidates = [
    task?.failure,
    task?.failureReason,
    task?.error,
    task?.errorMessage,
    task?.message,
  ];
  for (const candidate of directCandidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
  }
  if (task?.failure && typeof task.failure === "object") {
    const nestedCandidates = [
      task.failure.message,
      task.failure.reason,
      task.failure.error,
      task.failure.code,
    ];
    for (const candidate of nestedCandidates) {
      if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
    }
  }
  return null;
}

export async function normalizeRunwayVideoResult(task, body, signal: AbortSignal | null = null) {
  const urls = extractRunwayOutputUrls(task);
  if (urls.length === 0) {
    throw new Error(
      `Runway task completed without output URLs: ${JSON.stringify(task).slice(0, 400)}`
    );
  }
  if (body.response_format === "url") return urls.map((url) => ({ url, format: "mp4" }));

  // One byte budget for all outputs, so a task listing many URLs stays under the video cap.
  let remainingBytes: number = UPSTREAM_MEDIA_LIMITS.video.maxBytes;
  const videos = [];
  for (const url of urls) {
    let video: Buffer;
    try {
      video = await downloadResultVideo(url, signal, remainingBytes);
    } catch (err) {
      throw new Error(`Runway output fetch failed (${upstreamMediaErrorText(err)})`);
    }
    remainingBytes -= video.length;
    videos.push({ b64_json: video.toString("base64"), format: "mp4" });
  }
  return videos;
}
