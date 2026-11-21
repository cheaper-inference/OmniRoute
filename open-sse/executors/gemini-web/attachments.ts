/**
 * Gemini Web attachments: images, videos and documents sent as OpenAI content parts
 * (`image_url`, `input_image`, `video_url`, `file`, `input_file`) are validated here and
 * then set on the hidden file inputs of the gemini.google.com composer's upload menu.
 *
 * Limits are the ones gemini.google.com documents for its own uploader
 * (support.google.com/gemini/answer/14903178): up to 10 files per prompt, each video up
 * to 2 GB, every other file up to 100 MB, and 5 minutes of total video on a free account
 * (1 hour on Google AI Pro/Ultra — raise GEMINI_WEB_MAX_VIDEO_SECONDS for those).
 * Every check runs BEFORE the browser is touched, and every failure is a 4xx with a
 * readable message — an attachment is never dropped silently.
 */

import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fetchRemoteMedia } from "../../utils/remoteMediaFetch.ts";

export const MAX_GEMINI_WEB_ATTACHMENTS = 10;
export const MAX_GEMINI_WEB_VIDEO_BYTES = 2 * 1024 * 1024 * 1024;
export const MAX_GEMINI_WEB_FILE_BYTES = 100 * 1024 * 1024;
export const DEFAULT_GEMINI_WEB_MAX_VIDEO_SECONDS = 300;

const ATTACHMENT_PART_TYPES = new Set([
  "image_url",
  "input_image",
  "video_url",
  "file",
  "input_file",
]);
const REMOTE_FETCH_TIMEOUT_MS = 60_000;
const MAX_FILENAME_CHARS = 180;

/** Supported MIME type → file extension used for the temp file name. */
const SUPPORTED_MIME_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/heic": "heic",
  "image/heif": "heif",
  "video/mp4": "mp4",
  "video/mpeg": "mpeg",
  "video/quicktime": "mov",
  "video/x-msvideo": "avi",
  "video/x-flv": "flv",
  "video/webm": "webm",
  "video/x-ms-wmv": "wmv",
  "video/3gpp": "3gp",
  "application/pdf": "pdf",
  "text/plain": "txt",
  "text/csv": "csv",
  "text/markdown": "md",
  "text/html": "html",
  "application/json": "json",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
};
const MIME_BY_EXTENSION: Record<string, string> = {
  ...Object.fromEntries(Object.entries(SUPPORTED_MIME_TYPES).map(([mime, ext]) => [ext, mime])),
  jpeg: "image/jpeg",
  mpg: "video/mpeg",
  m4v: "video/mp4",
  markdown: "text/markdown",
  htm: "text/html",
};

/** Client-visible error codes, all from the public allowlist (utils/publicErrorIdentifiers.ts). */
const CODE_BY_STATUS: Record<number, string> = {
  413: "file_too_large",
  415: "unsupported_media_type",
  422: "upstream_error",
};

export class GeminiWebAttachmentError extends Error {
  readonly code: string;

  constructor(
    message: string,
    readonly status = 400
  ) {
    super(message);
    this.name = "GeminiWebAttachmentError";
    this.code = CODE_BY_STATUS[status] ?? "invalid_request";
  }
}

export interface GeminiWebAttachmentSource {
  ref: string;
  name?: string;
  mimeType?: string;
}

export interface GeminiWebAttachment {
  name: string;
  mimeType: string;
  data: Buffer;
  durationSeconds?: number;
}

type JsonRecord = Record<string, unknown>;
const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const str = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim() ? value.trim() : undefined;
const urlOf = (value: unknown): string | undefined =>
  str(value) ?? (isRecord(value) ? str(value.url) : undefined);

/** A content part this module turns into an uploaded file. */
export function isGeminiWebAttachmentPart(part: unknown): boolean {
  return isRecord(part) && ATTACHMENT_PART_TYPES.has(String(part.type));
}

export function hasGeminiWebAttachmentParts(content: unknown): boolean {
  return Array.isArray(content) && content.some(isGeminiWebAttachmentPart);
}

function sourceFromPart(part: JsonRecord): GeminiWebAttachmentSource {
  const type = String(part.type);
  if (type === "image_url" || type === "input_image") {
    const ref = urlOf(part.image_url) ?? str(part.url);
    if (!ref) throw new GeminiWebAttachmentError("Image attachment is missing its URL or data");
    return { ref };
  }
  if (type === "video_url") {
    const ref = urlOf(part.video_url) ?? str(part.url);
    if (!ref) throw new GeminiWebAttachmentError("Video attachment is missing its URL or data");
    return { ref };
  }
  const file = isRecord(part.file) ? part.file : part;
  const mimeType = str(file.mime_type ?? part.mime_type)?.toLowerCase();
  const data = str(file.file_data ?? part.file_data);
  const url = str(file.file_url ?? part.file_url ?? file.url);
  const ref =
    data && !data.toLowerCase().startsWith("data:")
      ? `data:${mimeType ?? "application/octet-stream"};base64,${data}`
      : (data ?? url);
  if (!ref) {
    throw new GeminiWebAttachmentError(
      "File attachment requires file_data or file_url (file_id references are not supported)"
    );
  }
  return { ref, name: str(file.filename ?? part.filename), mimeType };
}

/**
 * Attachments of the LAST user turn — the one typed into the composer. gemini-web is
 * stateless (#8371), so earlier turns are replayed as text only; re-uploading every
 * historical video on each turn would multiply upload time and rolling-limit usage.
 */
export function extractGeminiWebAttachments(
  messages: ReadonlyArray<{ role?: string; content?: unknown }>
): GeminiWebAttachmentSource[] {
  const lastUser = [...messages].reverse().find((m) => m?.role === "user");
  if (!lastUser || !Array.isArray(lastUser.content)) return [];
  const sources = lastUser.content.filter(isGeminiWebAttachmentPart).map(sourceFromPart);
  if (sources.length > MAX_GEMINI_WEB_ATTACHMENTS) {
    throw new GeminiWebAttachmentError(
      `Gemini Web accepts at most ${MAX_GEMINI_WEB_ATTACHMENTS} attachments per message`
    );
  }
  return sources;
}

/** Identify the real format from magic bytes; declared types are only a fallback. */
export function sniffMimeType(bytes: Buffer): string | undefined {
  const ascii = (start: number, end: number) => bytes.toString("latin1", start, end);
  if (bytes.length >= 8 && bytes.readUInt32BE(0) === 0x89504e47) return "image/png";
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff)
    return "image/jpeg";
  if (ascii(0, 4) === "GIF8") return "image/gif";
  if (ascii(0, 4) === "%PDF") return "application/pdf";
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "image/webp";
  if (ascii(0, 4) === "RIFF" && ascii(8, 11) === "AVI") return "video/x-msvideo";
  if (bytes.length >= 4 && bytes.readUInt32BE(0) === 0x1a45dfa3) return "video/webm";
  if (ascii(0, 3) === "FLV") return "video/x-flv";
  if (
    bytes.length >= 4 &&
    (bytes.readUInt32BE(0) === 0x000001ba || bytes.readUInt32BE(0) === 0x000001b3)
  )
    return "video/mpeg";
  if (ascii(4, 8) === "ftyp") {
    const brand = ascii(8, 12);
    if (["heic", "heix", "hevc", "heim", "heis"].includes(brand)) return "image/heic";
    if (["mif1", "msf1", "heif"].includes(brand)) return "image/heif";
    if (brand === "avif") return "image/avif";
    if (brand.startsWith("M4A")) return "audio/mp4";
    if (brand === "qt  ") return "video/quicktime";
    if (brand.startsWith("3g")) return "video/3gpp";
    return "video/mp4";
  }
  return undefined;
}

function findBox(buf: Buffer, start: number, end: number, type: string): [number, number] | null {
  let offset = start;
  while (offset + 8 <= end) {
    let size = buf.readUInt32BE(offset);
    let header = 8;
    if (size === 1) {
      if (offset + 16 > end) return null;
      size = Number(buf.readBigUInt64BE(offset + 8));
      header = 16;
    } else if (size === 0) {
      size = end - offset;
    }
    if (size < header || offset + size > end) return null;
    if (buf.toString("latin1", offset + 4, offset + 8) === type) {
      return [offset + header, offset + size];
    }
    offset += size;
  }
  return null;
}

/** Duration from the `moov/mvhd` box of an MP4 / MOV / 3GP file, or null if absent. */
export function readIsoBmffDurationSeconds(buf: Buffer): number | null {
  const moov = findBox(buf, 0, buf.length, "moov");
  const mvhd = moov && findBox(buf, moov[0], moov[1], "mvhd");
  if (!mvhd) return null;
  const [start, end] = mvhd;
  const v1 = buf[start] === 1;
  if (start + (v1 ? 32 : 20) > end) return null;
  const timescale = buf.readUInt32BE(start + (v1 ? 20 : 12));
  const duration = v1 ? Number(buf.readBigUInt64BE(start + 24)) : buf.readUInt32BE(start + 16);
  return timescale > 0 ? duration / timescale : null;
}

export function resolveMaxVideoSeconds(env: NodeJS.ProcessEnv = process.env): number {
  const parsed = Number(env.GEMINI_WEB_MAX_VIDEO_SECONDS);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 36_000
    ? parsed
    : DEFAULT_GEMINI_WEB_MAX_VIDEO_SECONDS;
}

function decodeDataUrl(ref: string): { bytes: Buffer; mimeType: string } {
  const comma = ref.indexOf(",");
  const header = comma > 5 ? ref.slice(5, comma) : "";
  if (!/(?:^|;)base64(?:;|$)/i.test(header)) {
    throw new GeminiWebAttachmentError("Attachment data URL must be base64 encoded");
  }
  const payload = ref.slice(comma + 1).replace(/\s/g, "");
  if (!payload || !/^[A-Za-z0-9+/]+={0,2}$/.test(payload)) {
    throw new GeminiWebAttachmentError("Attachment contains invalid base64 data");
  }
  return { bytes: Buffer.from(payload, "base64"), mimeType: header.split(";")[0].toLowerCase() };
}

async function fetchRemote(
  ref: string,
  fetchMedia: typeof fetchRemoteMedia,
  signal?: AbortSignal
): Promise<{ bytes: Buffer; mimeType: string }> {
  if (!/^https?:\/\//i.test(ref)) {
    throw new GeminiWebAttachmentError("Attachment must be an http(s) URL or a base64 data URL");
  }
  try {
    const remote = await fetchMedia(ref, {
      guard: "public-only",
      pinDns: true,
      maxBytes: MAX_GEMINI_WEB_VIDEO_BYTES,
      maxRedirects: 3,
      timeoutMs: REMOTE_FETCH_TIMEOUT_MS,
      signal,
    });
    return {
      bytes: remote.buffer,
      mimeType: remote.contentType.split(";")[0].trim().toLowerCase(),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (/byte limit/i.test(message)) throw new GeminiWebAttachmentError("Attachment is too large");
    const status = /fetch error (\d{3})/i.exec(message)?.[1];
    throw new GeminiWebAttachmentError(
      status
        ? `Attachment URL returned status ${status}`
        : "Attachment URL could not be fetched or is blocked"
    );
  }
}

function extensionOf(value: string | undefined): string | undefined {
  if (!value) return undefined;
  let path = value;
  try {
    path = new URL(value).pathname;
  } catch {
    // a bare filename
  }
  return /\.([a-z0-9]{2,8})$/i.exec(path)?.[1]?.toLowerCase();
}

function sanitizeFilename(name: string | undefined, fallback: string): string {
  const leaf = (name ?? "")
    .split(/[\\/]/)
    .pop()
    ?.replace(/[\u0000-\u001f\u007f]/g, "")
    .trim();
  return (leaf && leaf !== "." && leaf !== ".." ? leaf : fallback).slice(0, MAX_FILENAME_CHARS);
}

/**
 * Load, type-check and size-check every attachment. Throws GeminiWebAttachmentError (4xx)
 * on the first one that cannot be sent; nothing is uploaded until all of them pass.
 */
export async function resolveGeminiWebAttachments(
  sources: GeminiWebAttachmentSource[],
  deps: {
    fetchRemoteMedia?: typeof fetchRemoteMedia;
    env?: NodeJS.ProcessEnv;
    signal?: AbortSignal;
  } = {}
): Promise<GeminiWebAttachment[]> {
  const maxVideoSeconds = resolveMaxVideoSeconds(deps.env);
  const resolved: GeminiWebAttachment[] = [];
  let totalVideoSeconds = 0;
  for (const [index, source] of sources.entries()) {
    deps.signal?.throwIfAborted();
    const loaded = source.ref.toLowerCase().startsWith("data:")
      ? decodeDataUrl(source.ref)
      : await fetchRemote(source.ref, deps.fetchRemoteMedia ?? fetchRemoteMedia, deps.signal);
    if (!loaded.bytes.length) throw new GeminiWebAttachmentError("Attachment is empty");

    const declared = source.mimeType || loaded.mimeType;
    const fromExtension = MIME_BY_EXTENSION[extensionOf(source.name ?? source.ref) ?? ""];
    const sniffed = sniffMimeType(loaded.bytes);
    const claimed = declared && declared !== "application/octet-stream" ? declared : fromExtension;
    // An image or video always carries a signature; without one the declared type is a lie.
    if (!sniffed && /^(image|video)\//.test(claimed ?? "")) {
      throw new GeminiWebAttachmentError(
        `Attachment content does not match its declared type "${claimed}"`,
        415
      );
    }
    const mimeType = sniffed ?? claimed ?? declared;
    const extension = SUPPORTED_MIME_TYPES[mimeType];
    if (!extension) {
      throw new GeminiWebAttachmentError(
        `Unsupported attachment type "${mimeType || "unknown"}" for Gemini Web`,
        415
      );
    }

    const isVideo = mimeType.startsWith("video/");
    const cap = isVideo ? MAX_GEMINI_WEB_VIDEO_BYTES : MAX_GEMINI_WEB_FILE_BYTES;
    if (loaded.bytes.length > cap) {
      throw new GeminiWebAttachmentError(
        `Attachment is too large for Gemini Web (${loaded.bytes.length} bytes, max ${cap})`,
        413
      );
    }

    let durationSeconds: number | undefined;
    if (["video/mp4", "video/quicktime", "video/3gpp"].includes(mimeType)) {
      const duration = readIsoBmffDurationSeconds(loaded.bytes);
      if (duration === null) {
        throw new GeminiWebAttachmentError("Video attachment is unreadable (no duration found)");
      }
      durationSeconds = duration;
      totalVideoSeconds += duration;
      if (totalVideoSeconds > maxVideoSeconds) {
        throw new GeminiWebAttachmentError(
          `Total video length ${Math.round(totalVideoSeconds)}s exceeds the Gemini Web limit ` +
            `of ${maxVideoSeconds}s`,
          413
        );
      }
    }
    // ponytail: duration is only measured for ISO-BMFF (mp4/mov/3gp); WebM/AVI/FLV/MPEG/WMV
    // rely on Gemini's own limit. Add an EBML/RIFF duration reader if those become common.

    resolved.push({
      name: sanitizeFilename(source.name, `attachment-${index + 1}.${extension}`),
      mimeType,
      data: loaded.bytes,
      ...(durationSeconds !== undefined ? { durationSeconds } : {}),
    });
  }
  return resolved;
}

/** Write attachments to a private temp dir (one sub-dir each so names never collide). */
export async function writeGeminiWebAttachmentFiles(
  attachments: GeminiWebAttachment[]
): Promise<{ dir: string; paths: string[]; cleanup: () => Promise<void> }> {
  const dir = await mkdtemp(join(tmpdir(), "omniroute-gemini-web-"));
  const cleanup = () => rm(dir, { recursive: true, force: true });
  try {
    const paths: string[] = [];
    for (const [index, attachment] of attachments.entries()) {
      const sub = join(dir, String(index));
      await mkdir(sub);
      const path = join(sub, attachment.name);
      await writeFile(path, attachment.data, { mode: 0o600 });
      paths.push(path);
    }
    return { dir, paths, cleanup };
  } catch (error) {
    await cleanup();
    throw error;
  }
}

// Checked against gemini.google.com on 2026-11-20 (logged-out session; the uploader is the
// same component signed in). The composer's "Upload & tools" menu button (aria-label is
// localized, so the container class is matched first) renders hidden file inputs only while
// the menu is open: one with accept="image/*,video/*" for media, others for documents.
// Setting files on them starts Gemini's own resumable upload (contribution-*.usercontent.google.com).
const UPLOAD_MENU_SELECTOR = [
  '.simplified-input-menu-container button[aria-haspopup="menu"]',
  'button[aria-label*="upload" i]',
].join(", ");
const MEDIA_INPUT_SELECTOR = 'input[type="file"][accept*="image"]';
const DOCUMENT_INPUT_SELECTOR = 'input[type="file"]:not([accept*="image"])';
const UPLOAD_HOST =
  /(?:^|\.)(?:push\.clients6\.google\.com|content-push\.googleapis\.com|usercontent\.google\.com)$/;

interface UploadResponse {
  url(): string;
  status(): number;
  ok(): boolean;
  request(): { method(): string; headers(): Record<string, string> };
}

/** An upload POST to Gemini's upload host (not the resumable "start"); "finalize" ends a file. */
export function isGeminiUploadResponse(resp: UploadResponse): boolean {
  try {
    const url = new URL(resp.url());
    if (!UPLOAD_HOST.test(url.hostname) || !url.pathname.startsWith("/upload")) return false;
  } catch {
    return false;
  }
  const request = resp.request();
  if (request.method() !== "POST") return false;
  return (request.headers()["x-goog-upload-command"] ?? "").trim().toLowerCase() !== "start";
}

export function uploadTimeoutMs(totalBytes: number): number {
  return Math.min(600_000, 60_000 + Math.ceil(totalBytes / (1024 * 1024)) * 1_000);
}

async function setComposerFiles(
  page: import("playwright").Page,
  inputSelector: string,
  paths: string[]
): Promise<void> {
  try {
    let input = page.locator(inputSelector).first();
    if ((await input.count()) === 0) {
      await page.locator(UPLOAD_MENU_SELECTOR).first().click({ timeout: 5_000 });
      input = page.locator(inputSelector).first();
      await input.waitFor({ state: "attached", timeout: 5_000 });
    }
    await input.setInputFiles(paths);
  } catch {
    throw new GeminiWebAttachmentError(
      "Could not open the Gemini Web file upload control (the page layout may have changed)",
      422
    );
  }
}

/**
 * Attach the temp files to the composer and wait until Gemini confirms one upload per
 * file. Any non-2xx upload, a missing upload control, or no confirmation within the budget
 * is a GeminiWebAttachmentError (422) instead of a prompt silently sent without the file.
 */
export async function attachFilesToGeminiComposer(
  page: import("playwright").Page,
  files: Array<{ path: string; mimeType: string }>,
  timeoutMs: number
): Promise<void> {
  if (files.length === 0) return;
  let confirmed = 0;
  let failedStatus: number | null = null;
  const onResponse = (resp: UploadResponse) => {
    if (!isGeminiUploadResponse(resp)) return;
    if (!resp.ok()) failedStatus ??= resp.status();
    else if (/finalize/i.test(resp.request().headers()["x-goog-upload-command"] ?? "")) confirmed++;
  };
  page.on("response", onResponse as never);
  try {
    const isMedia = (f: { mimeType: string }) => /^(image|video)\//.test(f.mimeType);
    const media = files.filter(isMedia).map((f) => f.path);
    const documents = files.filter((f) => !isMedia(f)).map((f) => f.path);
    if (media.length) await setComposerFiles(page, MEDIA_INPUT_SELECTOR, media);
    if (documents.length) await setComposerFiles(page, DOCUMENT_INPUT_SELECTOR, documents);

    const deadline = Date.now() + timeoutMs;
    while (confirmed < files.length && failedStatus === null) {
      if (Date.now() > deadline) {
        throw new GeminiWebAttachmentError(
          `Gemini Web did not confirm the attachment upload (${confirmed}/${files.length})`,
          422
        );
      }
      await page.waitForTimeout(250);
    }
    if (failedStatus !== null) {
      throw new GeminiWebAttachmentError(
        `Gemini Web rejected the attachment upload (HTTP ${failedStatus})`,
        422
      );
    }
    // Close the upload menu if it is still open, then let the composer register the chips.
    if ((await page.locator('input[type="file"]').count()) > 0) {
      await page.keyboard.press("Escape");
    }
    await page.waitForTimeout(500);
  } finally {
    page.off("response", onResponse as never);
  }
}
