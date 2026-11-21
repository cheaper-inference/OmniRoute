/**
 * MegaBrain (https://getmegabrain.com) media API: images and video behind one job queue.
 *
 * The chat connection's credential works here unchanged: the device-login token of a
 * signed-in account or an `mb-v1-…` API key. Media is paid from the account's credit
 * balance (a failed job is refunded by MegaBrain), not from a plan's chat limits.
 *
 *   POST /queue/{model}              the model's own input → { request_id, status, … }
 *   GET  /queue/requests/{id}        202 while running, 200 with the output, 422 once failed
 *   GET  /media/models               public catalog: prices and each model's input fields
 *
 * Outputs come back as `{ images: [{ url }] }` or `{ video: { url } }`. Unknown input fields
 * are refused with a 400, so requests carry only the fields the model lists in
 * MEGABRAIN_MEDIA_PARAMS. Docs: https://getmegabrain.com/docs/media
 */

import {
  MEGABRAIN_MEDIA_BASE_URL,
  MEGABRAIN_MEDIA_PARAMS,
} from "../../config/providers/registry/megabrain/mediaModels.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { sleep } from "../../utils/sleep.ts";
import { stripTrailingSlashes } from "../../utils/urlSanitize.ts";
import {
  MAX_CONSECUTIVE_POLL_RETRIES,
  computePollRetryDelayMs,
  isRetryablePollStatus,
  parseRetryAfterMs,
} from "../videoGeneration/pollRetry.ts";

type Body = Record<string, unknown>;

interface MegabrainCredentials {
  apiKey?: unknown;
  accessToken?: unknown;
}

export interface MegabrainLog {
  info?: (tag: string, msg: string) => void;
  error?: (tag: string, msg: string) => void;
}

export type MegabrainResult =
  { ok: true; requestId: string; output: Body } | { ok: false; status: number; error: string };

export const MEGABRAIN_NO_TOKEN =
  "MegaBrain needs a signed-in MegaBrain account or an mb-v1-… API key";

/** API key or device-login token, whichever the connection holds. */
export function megabrainToken(credentials: unknown): string {
  const creds = (credentials ?? {}) as MegabrainCredentials;
  if (typeof creds.apiKey === "string" && creds.apiKey) return creds.apiKey;
  if (typeof creds.accessToken === "string" && creds.accessToken) return creds.accessToken;
  return "";
}

/**
 * The registry's media base URL. A connection's own base URL override is not applied: on
 * this connection it points at the chat endpoint, not the media API.
 */
export function megabrainBaseUrl(configured = MEGABRAIN_MEDIA_BASE_URL): string {
  return stripTrailingSlashes(configured || MEGABRAIN_MEDIA_BASE_URL);
}

/** Whether `model` takes the input field `name`. */
export function megabrainTakes(model: string, name: string): boolean {
  return MEGABRAIN_MEDIA_PARAMS[model]?.includes(name) === true;
}

export function megabrainString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

/** Copies the caller's own values of the fields the model takes (explicit values win). */
export function copyMegabrainFields(
  model: string,
  body: Body,
  input: Body,
  fields: readonly string[]
): void {
  for (const field of fields) {
    const value = body[field];
    if (value === undefined || value === null || value === "") continue;
    if (megabrainTakes(model, field)) input[field] = value;
  }
}

function parseSize(size: unknown): { width: number; height: number } | undefined {
  const match = /^(\d+)\s*[x×]\s*(\d+)$/i.exec(typeof size === "string" ? size.trim() : "");
  if (!match) return undefined;
  const width = Number(match[1]);
  const height = Number(match[2]);
  return width > 0 && height > 0 ? { width, height } : undefined;
}

/** An OpenAI-style `size` ("1536x1024") as `{ width, height }`. */
export function megabrainImageSize(size: unknown): { width: number; height: number } | undefined {
  return parseSize(size);
}

/** The ratio from `ratios` nearest to an OpenAI-style `size`, or undefined. */
export function megabrainAspectRatio(size: unknown, ratios: readonly string[]): string | undefined {
  const parsed = parseSize(size);
  if (!parsed) return undefined;
  const target = Math.log(parsed.width / parsed.height);
  const distance = (ratio: string) => {
    const [w, h] = ratio.split(":").map(Number);
    return Math.abs(Math.log(w / h) - target);
  };
  return [...ratios].sort((a, b) => distance(a) - distance(b))[0];
}

/** Whole seconds from `duration` or OpenAI's `seconds` (8, "8" or "8s"), as a string. */
export function megabrainSeconds(body: Body): string | undefined {
  for (const value of [body.duration, body.seconds]) {
    const numeric =
      typeof value === "number"
        ? value
        : typeof value === "string"
          ? Number(value.trim().replace(/s$/i, ""))
          : NaN;
    if (Number.isFinite(numeric) && numeric > 0) return String(Math.round(numeric));
  }
  return undefined;
}

/**
 * Reads a caller-supplied image into bytes. Injected by the handlers — `resolveImageSource`
 * from ../imageGeneration.ts — so this client keeps no dependency on the image handler.
 */
export type MegabrainSourceReader = (
  source: string
) => Promise<{ buffer: Buffer; contentType?: string }>;

/**
 * An input image as MegaBrain takes it: a public https:// URL or a data:image/ URI is sent
 * as is (MegaBrain fetches the URL itself); anything else (bare base64) is read and sent
 * as a data URI.
 */
export async function megabrainImageRef(
  source: string,
  readSource: MegabrainSourceReader
): Promise<string> {
  const trimmed = source.trim();
  if (/^(https?:\/\/|data:image\/)/i.test(trimmed)) return trimmed;
  const { buffer, contentType } = await readSource(trimmed);
  const type = String(contentType ?? "")
    .split(";")[0]
    .trim()
    .toLowerCase();
  const mime = type.startsWith("image/") ? type : "image/png";
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

function headers(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "X-KILOCODE-EDITORNAME": "OmniRoute",
    "X-KILOCODE-FEATURE": "omniroute",
  };
}

async function readError(response: Response): Promise<string> {
  const text = await response.text().catch(() => "");
  try {
    const parsed = JSON.parse(text) as { error?: { message?: unknown } | string };
    const message =
      typeof parsed?.error === "string"
        ? parsed.error
        : typeof parsed?.error?.message === "string"
          ? parsed.error.message
          : undefined;
    if (message) return sanitizeErrorMessage(`MegaBrain ${response.status}: ${message}`);
  } catch {
    // Not JSON: fall through to the raw text.
  }
  return sanitizeErrorMessage(`MegaBrain ${response.status}: ${text.slice(0, 300)}`);
}

/** Model ids hold slashes (`kling-video/v3/pro/text-to-video`); each segment is encoded. */
function queuePath(model: string): string {
  return model
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

/** Submits one job and waits for its output. */
export async function runMegabrainJob({
  baseUrl,
  token,
  model,
  input,
  timeoutMs,
  pollIntervalMs,
  log,
  signal,
}: {
  baseUrl: string;
  token: string;
  model: string;
  input: Body;
  timeoutMs: number;
  pollIntervalMs: number;
  log?: MegabrainLog | null;
  signal?: AbortSignal | null;
}): Promise<MegabrainResult> {
  const submitted = await fetch(`${baseUrl}/queue/${queuePath(model)}`, {
    method: "POST",
    headers: { ...headers(token), "Content-Type": "application/json" },
    body: JSON.stringify(input),
    signal: signal ?? undefined,
  });
  if (!submitted.ok) {
    return { ok: false, status: submitted.status, error: await readError(submitted) };
  }
  const job = (await submitted.json()) as { request_id?: unknown };
  const requestId = typeof job?.request_id === "string" ? job.request_id : "";
  if (!requestId)
    return { ok: false, status: 502, error: "MegaBrain answered without a request_id" };
  log?.info?.("MEGABRAIN", `job ${requestId} submitted (${model})`);

  // The result URL is built from our own base, never taken from the answer, so the
  // credential only ever goes to the configured MegaBrain host.
  const resultUrl = `${baseUrl}/queue/requests/${encodeURIComponent(requestId)}`;
  const deadline = Date.now() + timeoutMs;
  let retries = 0;
  let delay = pollIntervalMs;
  for (;;) {
    if (Date.now() + delay > deadline) {
      return {
        ok: false,
        status: 504,
        error: `MegaBrain job ${requestId} did not finish within ${Math.round(timeoutMs / 1000)} s`,
      };
    }
    await sleep(delay);
    delay = pollIntervalMs;
    // Reading the result also moves the job forward on MegaBrain's side.
    const response = await fetch(resultUrl, {
      headers: headers(token),
      signal: signal ?? undefined,
    });
    if (response.status === 202) {
      retries = 0;
      continue;
    }
    if (response.ok) {
      const output = (await response.json()) as Body;
      log?.info?.("MEGABRAIN", `job ${requestId} completed`);
      return { ok: true, requestId, output };
    }
    if (isRetryablePollStatus(response.status) && retries < MAX_CONSECUTIVE_POLL_RETRIES) {
      retries += 1;
      const retryAfter = parseRetryAfterMs(response.headers.get("retry-after"));
      delay = computePollRetryDelayMs(pollIntervalMs, retries, retryAfter);
      continue;
    }
    return { ok: false, status: response.status, error: await readError(response) };
  }
}

/** Output file URLs of a finished job: `images[].url`, `video.url` or `videos[].url`. */
export function megabrainOutputUrls(output: Body): string[] {
  const urls: string[] = [];
  const push = (item: unknown) => {
    const url = (item as { url?: unknown } | null)?.url;
    if (typeof url === "string" && url) urls.push(url);
  };
  if (Array.isArray(output.images)) output.images.forEach(push);
  if (output.image) push(output.image);
  if (output.video) push(output.video);
  if (Array.isArray(output.videos)) output.videos.forEach(push);
  return urls;
}

/** A positive number from the request (e.g. `timeout_ms`), else the fallback. */
export function megabrainNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : fallback;
}

/** Turns a thrown network / input error into the handlers' failure shape. */
export function megabrainFailure(err: unknown): { status: number; error: string } {
  const message = err instanceof Error ? err.message : String(err);
  return { status: 502, error: `MegaBrain request failed: ${sanitizeErrorMessage(message)}` };
}
