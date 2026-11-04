import { detectMediaParts } from "./mediaParts.ts";

const AUDIO_MIME: Record<string, string> = {
  wav: "audio/wav",
  mp3: "audio/mpeg",
  flac: "audio/flac",
  ogg: "audio/ogg",
  webm: "audio/webm",
  m4a: "audio/mp4",
  mp4: "audio/mp4",
};
const VIDEO_EXTENSION: Record<string, string> = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
  "video/mpeg": "mpeg",
  "video/x-matroska": "mkv",
};
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value);

function normalizeAudio(value: Record<string, unknown>, nextIndex: () => number) {
  if (value.type === "input_audio" && isRecord(value.input_audio)) {
    const audio = value.input_audio;
    const format = String(audio.format).toLowerCase();
    const mime = Object.hasOwn(AUDIO_MIME, format) ? AUDIO_MIME[format] : null;
    if (
      mime &&
      typeof audio.data === "string" &&
      !audio.data.startsWith("data:") &&
      Object.keys(audio).every((key) => key === "data" || key === "format")
    ) {
      const { input_audio: _audio, ...rest } = value;
      return {
        ...rest,
        type: "file",
        file: {
          filename: `audio-${nextIndex()}.${audio.format}`,
          file_data: `data:${mime};base64,${audio.data}`,
        },
      };
    }
  }
  return null;
}

function normalizeVideo(value: Record<string, unknown>, nextIndex: () => number) {
  if (value.type === "video_url") {
    const video = value.video_url;
    const url = typeof video === "string" ? video : isRecord(video) ? video.url : null;
    const match =
      typeof url === "string" ? /^data:(video\/[a-z0-9.+-]{1,64});base64,/i.exec(url) : null;
    const extension = match && VIDEO_EXTENSION[match[1].toLowerCase()];
    if (
      extension &&
      (typeof video === "string" ||
        (isRecord(video) && Object.keys(video).every((key) => key === "url")))
    ) {
      const { video_url: _video, ...rest } = value;
      return {
        ...rest,
        type: "file",
        file: { filename: `video-${nextIndex()}.${extension}`, file_data: url },
      };
    }
  }
  return null;
}

/**
 * CI's Gemini Chat routes accept mixed inline media through MIME-typed files.
 * The same bytes in video_url/input_audio carriers were rejected when combined
 * with PDF/image parts (live 2026-11-03). No decoding, summarization or fetch.
 */
export function normalizeCIMixedMedia(body: Record<string, unknown>): Record<string, unknown> {
  const keys = ["messages", "input", "contents"] as const;
  const kinds = new Set(
    detectMediaParts([{ content: keys.map((key) => body[key]) }]).map((part) => part.kind)
  );
  if (kinds.size < 2) return body;
  let index = 0;
  const visit = (value: unknown, depth = 0): unknown => {
    if (depth > 32) return value;
    if (Array.isArray(value)) return value.map((entry) => visit(entry, depth + 1));
    if (!isRecord(value)) return value;
    const normalized = normalizeAudio(value, () => ++index) ?? normalizeVideo(value, () => ++index);
    if (normalized) return normalized;
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, visit(entry, depth + 1)])
    );
  };
  const result = { ...body };
  for (const key of keys) if (body[key] !== undefined) result[key] = visit(body[key]);
  return result;
}
