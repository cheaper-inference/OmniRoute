/**
 * URL input for OpenAI-compatible speech transcription.
 *
 * Fetches caller-controlled URLs in OmniRoute, NEVER delegates the URL to the
 * upstream STT provider. In particular, Telegram file URLs may embed a bot
 * token in their path; only audio bytes are sent upstream.
 */
import { errorResponse } from "./error.ts";

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

/**
 * The SSRF-hardened downloader lives in the app layer
 * (src/shared/network/remoteImageFetch.ts) and is injected by the API route, so the
 * engine does not import from src/ (check:boundary:ratchet). These are the structural
 * subsets of fetchRemoteMedia's contract that downloadAudio actually relies on.
 */
export type RemoteMediaFetchOptions = {
  guard?: "none" | "public-only" | "block-metadata";
  pinDns?: boolean;
  enforceHttps?: boolean;
  maxRedirects?: number;
  maxBytes?: number;
  timeoutMs?: number;
};
export type RemoteMedia = { buffer: Uint8Array<ArrayBuffer>; contentType: string; url: string };
export type RemoteMediaFetcher = (
  input: string,
  options: RemoteMediaFetchOptions
) => Promise<RemoteMedia>;
type TranscriptionFile = Blob & { name?: unknown };

const ALLOWED_NON_AUDIO_TYPES = new Set(["video/mp4", "video/webm", "application/octet-stream"]);

/** True when the request carries either a multipart `file` or a `url` string. */
export function hasTranscriptionInput(formData: FormData): boolean {
  return formData.get("file") instanceof Blob || typeof formData.get("url") === "string";
}

function parseAudioUrl(rawUrl: unknown): URL {
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
  return url;
}

/**
 * Never return the fetcher's raw error: it may include the full URL
 * (including a Telegram bot token) and DNS/HTTP internals.
 */
function toAudioFetchError(error: unknown): TranscriptionAudioUrlError {
  const detail = error instanceof Error ? error.message : "";
  if (/exceeds? .*byte limit/i.test(detail)) {
    return new TranscriptionAudioUrlError(413, "Audio URL file is too large");
  }
  if (/blocked|private|metadata|redirect|HTTPS/i.test(detail)) {
    return new TranscriptionAudioUrlError(400, "Audio URL is blocked or unsafe");
  }
  if (/abort|timed? ?out/i.test(detail)) {
    return new TranscriptionAudioUrlError(504, "Audio URL download timed out");
  }
  return new TranscriptionAudioUrlError(502, "Audio URL could not be fetched");
}

async function downloadAudio(url: URL, fetcher?: RemoteMediaFetcher): Promise<RemoteMedia> {
  // No downloader wired in (a caller outside the API route): refuse URL input instead
  // of silently delegating the URL upstream, which is exactly what this module prevents.
  if (!fetcher) throw new TranscriptionAudioUrlError(400, "Audio URL input is not available");
  try {
    return await fetcher(url.toString(), {
      guard: "public-only",
      pinDns: true,
      enforceHttps: true,
      maxRedirects: 2,
      maxBytes: MAX_AUDIO_BYTES,
      timeoutMs: AUDIO_FETCH_TIMEOUT_MS,
    });
  } catch (error) {
    throw toAudioFetchError(error);
  }
}

function resolveAudioContentType(media: RemoteMedia): string {
  const contentType = media.contentType.split(";", 1)[0].trim().toLowerCase();
  const supported = contentType.startsWith("audio/") || ALLOWED_NON_AUDIO_TYPES.has(contentType);
  if (media.buffer.length === 0 || !supported) {
    throw new TranscriptionAudioUrlError(415, "Audio URL did not return a supported audio file");
  }
  return contentType;
}

function resolveAudioExtension(media: RemoteMedia, contentType: string): string {
  const urlExtension = media.url
    ? /\.([a-z0-9]+)$/i.exec(new URL(media.url).pathname)?.[1]?.toLowerCase()
    : undefined;
  const extension =
    (urlExtension ? EXTENSIONS[urlExtension] : undefined) ?? MIME_EXTENSIONS[contentType];
  if (!extension) {
    throw new TranscriptionAudioUrlError(415, "Audio URL has an unsupported audio format");
  }
  return extension;
}

/**
 * A multipart file takes precedence to preserve existing file+url clients.
 * The API route injects the shared SSRF-hardened downloader (public-only host/DNS
 * guard, pinned DNS, per-hop HTTPS, redirects); tests inject fakes. Without a fetcher,
 * URL-only input is refused.
 */
export async function resolveTranscriptionFile(
  formData: FormData,
  fetcher?: RemoteMediaFetcher
): Promise<TranscriptionFile> {
  const suppliedFile = formData.get("file");
  if (suppliedFile instanceof Blob) return suppliedFile as TranscriptionFile;

  const media = await downloadAudio(parseAudioUrl(formData.get("url")), fetcher);
  const contentType = resolveAudioContentType(media);
  const extension = resolveAudioExtension(media, contentType);

  // Never reuse an attacker-controlled filename or any URL/path component:
  // they can contain credentials (especially Telegram bot tokens).
  return new File([media.buffer], `audio.${extension}`, {
    type: MIME_EXTENSIONS[contentType] ? contentType : "application/octet-stream",
  });
}

/**
 * Handler-facing wrapper: resolves the file or yields the client-facing error
 * Response, so the handler stays a single `"response" in result` branch.
 */
export async function resolveTranscriptionFileOrResponse(
  formData: FormData,
  fetcher?: RemoteMediaFetcher
): Promise<{ file: TranscriptionFile } | { response: Response }> {
  try {
    return { file: await resolveTranscriptionFile(formData, fetcher) };
  } catch (error) {
    if (error instanceof TranscriptionAudioUrlError) {
      return { response: errorResponse(error.status, error.message) };
    }
    return { response: errorResponse(502, "Audio URL could not be fetched") };
  }
}
