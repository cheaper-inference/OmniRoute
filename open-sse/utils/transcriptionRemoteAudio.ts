/**
 * URL input for OpenAI-compatible speech transcription.
 *
 * Fetches caller-controlled URLs in OmniRoute, NEVER delegates the URL to the
 * upstream STT provider. In particular, Telegram file URLs may embed a bot
 * token in their path; only audio bytes are sent upstream.
 */
import { fetchRemoteMedia } from "@/shared/network/remoteImageFetch";

const MAX_AUDIO_URL_LENGTH = 4096;
const MAX_AUDIO_BYTES = 25 * 1024 * 1024;
const AUDIO_FETCH_TIMEOUT_MS = 15_000;

const EXTENSIONS: Record<string, string> = {
  flac: "flac",
  mp3: "mp3",
  mp4: "mp4",
  mpeg: "mpeg",
  mpga: "mpga",
  m4a: "m4a",
  ogg: "ogg",
  oga: "ogg",
  opus: "ogg",
  wav: "wav",
  webm: "webm",
};

const MIME_EXTENSIONS: Record<string, string> = {
  "audio/flac": "flac",
  "audio/x-flac": "flac",
  "audio/mpeg": "mp3",
  "audio/mp3": "mp3",
  "audio/mp4": "m4a",
  "video/mp4": "mp4",
  "audio/x-m4a": "m4a",
  "audio/ogg": "ogg",
  "audio/opus": "ogg",
  "audio/wav": "wav",
  "audio/wave": "wav",
  "audio/x-wav": "wav",
  "audio/webm": "webm",
  "video/webm": "webm",
};

export class TranscriptionAudioUrlError extends Error {
  constructor(
    readonly status: number,
    message: string
  ) {
    super(message);
    this.name = "TranscriptionAudioUrlError";
  }
}

type RemoteMediaFetcher = typeof fetchRemoteMedia;

/**
 * A multipart file takes precedence to preserve existing file+url clients.
 * Tests may inject a fetcher; production always uses the shared SSRF-hardened
 * downloader (public-only host/DNS guard, pinned DNS, per-hop HTTPS, redirects).
 */
export async function resolveTranscriptionFile(
  formData: FormData,
  fetcher: RemoteMediaFetcher = fetchRemoteMedia
): Promise<Blob & { name?: unknown }> {
  const suppliedFile = formData.get("file");
  if (suppliedFile instanceof Blob) return suppliedFile as Blob & { name?: unknown };

  const rawUrl = formData.get("url");
  if (typeof rawUrl !== "string" || !rawUrl.trim()) {
    throw new TranscriptionAudioUrlError(400, "file is required");
  }
  if (rawUrl.length > MAX_AUDIO_URL_LENGTH) {
    throw new TranscriptionAudioUrlError(400, "Audio URL is too long");
  }

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new TranscriptionAudioUrlError(400, "Invalid audio URL");
  }
  // Restrict credentials-in-URL, insecure origins, and nonstandard TLS ports.
  // The media fetcher additionally blocks IP literals/ranges, DNS rebinding
  // and unsafe redirects before it opens any network connection.
  if (url.protocol !== "https:" || url.username || url.password || url.port || url.hash) {
    throw new TranscriptionAudioUrlError(400, "Audio URL must be a public HTTPS URL");
  }

  let media: Awaited<ReturnType<RemoteMediaFetcher>>;
  try {
    media = await fetcher(url.toString(), {
      guard: "public-only",
      pinDns: true,
      enforceHttps: true,
      maxRedirects: 2,
      maxBytes: MAX_AUDIO_BYTES,
      timeoutMs: AUDIO_FETCH_TIMEOUT_MS,
    });
  } catch (error) {
    // Never return the fetcher's raw error: it may include the full URL
    // (including a Telegram bot token) and DNS/HTTP internals.
    const detail = error instanceof Error ? error.message : "";
    if (/exceeds? .*byte limit/i.test(detail)) {
      throw new TranscriptionAudioUrlError(413, "Audio URL file is too large");
    }
    if (/blocked|private|metadata|redirect|HTTPS/i.test(detail)) {
      throw new TranscriptionAudioUrlError(400, "Audio URL is blocked or unsafe");
    }
    if (/abort|timed? ?out/i.test(detail)) {
      throw new TranscriptionAudioUrlError(504, "Audio URL download timed out");
    }
    throw new TranscriptionAudioUrlError(502, "Audio URL could not be fetched");
  }

  const contentType = media.contentType.split(";", 1)[0].trim().toLowerCase();
  if (
    media.buffer.length === 0 ||
    (!contentType.startsWith("audio/") &&
      !["video/mp4", "video/webm", "application/octet-stream"].includes(contentType))
  ) {
    throw new TranscriptionAudioUrlError(415, "Audio URL did not return a supported audio file");
  }
  const extension = media.url
    ? /\.([a-z0-9]+)$/i.exec(new URL(media.url).pathname)?.[1]?.toLowerCase()
    : undefined;
  const filenameExtension =
    (extension ? EXTENSIONS[extension] : undefined) ?? MIME_EXTENSIONS[contentType];
  if (!filenameExtension) {
    throw new TranscriptionAudioUrlError(415, "Audio URL has an unsupported audio format");
  }

  // Never reuse an attacker-controlled filename or any URL/path component:
  // they can contain credentials (especially Telegram bot tokens).
  return new File([media.buffer], `audio.${filenameExtension}`, {
    type: MIME_EXTENSIONS[contentType] ? contentType : "application/octet-stream",
  });
}
