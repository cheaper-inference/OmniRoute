/**
 * RenderHour (https://renderhour.com): images, video and speech behind one async job API.
 *
 * The same /v1 surface takes an API key (`rh_…`, paid from the API's dollar balance) or the
 * access token of a signed-in RenderHour subscription (OAuth, paid in the plan's credits), so
 * the image, video and speech handlers share this client and read `apiKey || accessToken`.
 *
 *   POST /v1/uploads           multipart `file` → { id }   input images, referenced by id
 *   POST /v1/generations       + Idempotency-Key → { id, status }
 *   GET  /v1/generations/{id}  → { status: queued|running|succeeded|failed, outputs[], failure_reason }
 *
 * A request may leave out `config` and `duration_s`: RenderHour then uses the model's first
 * configuration and its default length. Contract: https://renderhour.com/openapi.json
 */

import { randomUUID } from "node:crypto";

import { RENDERHOUR_BASE_URL } from "../../config/providers/registry/renderhour/mediaModels.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { sleep } from "../../utils/sleep.ts";
import {
  MAX_CONSECUTIVE_POLL_RETRIES,
  computePollRetryDelayMs,
  isRetryablePollStatus,
  parseRetryAfterMs,
} from "../videoGeneration/pollRetry.ts";

/** Aspect ratios every RenderHour image / video model takes. */
export const RENDERHOUR_IMAGE_RATIOS = ["1:1", "3:4", "4:3", "4:5", "9:16", "16:9"];
export const RENDERHOUR_VIDEO_RATIOS = ["16:9", "9:16", "1:1"];

const UPLOAD_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);
const CONFIG_KEYS = ["resolution", "quality", "mode", "audio", "duration_s"] as const;

interface RenderhourCredentials {
  apiKey?: unknown;
  accessToken?: unknown;
  providerSpecificData?: { baseUrl?: unknown } | null;
}

interface RenderhourLog {
  info?: (tag: string, msg: string) => void;
  error?: (tag: string, msg: string) => void;
}

export interface RenderhourOutput {
  asset_id: string;
  content_type: string;
  url: string;
}

export interface RenderhourJob {
  id: string;
  status: string;
  kind?: string;
  model?: string;
  failure_reason?: string | null;
  outputs?: RenderhourOutput[];
}

export type RenderhourResult =
  | { ok: true; job: RenderhourJob & { outputs: RenderhourOutput[] } }
  | { ok: false; status: number; error: string };

export class RenderhourRequestError extends Error {
  readonly status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/** API key or OAuth access token, whichever the connection holds. */
export function renderhourToken(credentials: unknown): string {
  const creds = (credentials ?? {}) as RenderhourCredentials;
  if (typeof creds.apiKey === "string" && creds.apiKey) return creds.apiKey;
  if (typeof creds.accessToken === "string" && creds.accessToken) return creds.accessToken;
  return "";
}

/** The connection's base URL override, else the registry's, without a trailing slash. */
export function renderhourBaseUrl(credentials: unknown, configured = RENDERHOUR_BASE_URL): string {
  const override = (credentials as RenderhourCredentials | null)?.providerSpecificData?.baseUrl;
  const base = typeof override === "string" && override.trim() ? override.trim() : configured;
  return base.replace(/\/+$/, "");
}

function firstString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return undefined;
}

/**
 * `aspect_ratio` as given, else the ratio nearest to an OpenAI-style `size` ("1792x1024").
 * Unset when neither is present, so RenderHour applies the model's default.
 */
export function renderhourAspectRatio(
  body: Record<string, unknown>,
  ratios: readonly string[]
): string | undefined {
  const explicit = firstString(body.aspect_ratio, body.aspectRatio);
  if (explicit) return explicit;
  const size = typeof body.size === "string" ? body.size.trim() : "";
  const match = /^(\d+)\s*[x×:]\s*(\d+)$/i.exec(size);
  if (!match) return undefined;
  const target = Math.log(Number(match[1]) / Number(match[2]));
  if (!Number.isFinite(target)) return undefined;
  const distance = (ratio: string) => {
    const [w, h] = ratio.split(":").map(Number);
    return Math.abs(Math.log(w / h) - target);
  };
  return [...ratios].sort((a, b) => distance(a) - distance(b))[0];
}

/**
 * RenderHour's model configuration: `config` as given, plus the top-level `resolution`,
 * `mode` and `audio` shortcuts. OpenAI's `quality` ("hd", "auto") means something else and is
 * only read inside `config`.
 */
export function renderhourConfig(
  body: Record<string, unknown>
): Record<string, unknown> | undefined {
  const given =
    body.config && typeof body.config === "object" && !Array.isArray(body.config)
      ? (body.config as Record<string, unknown>)
      : {};
  const config: Record<string, unknown> = {};
  for (const key of CONFIG_KEYS) {
    if (given[key] !== undefined) config[key] = given[key];
  }
  if (config.resolution === undefined && typeof body.resolution === "string") {
    config.resolution = body.resolution;
  }
  if (config.mode === undefined && typeof body.mode === "string") config.mode = body.mode;
  if (config.audio === undefined && typeof body.audio === "boolean") config.audio = body.audio;
  return Object.keys(config).length > 0 ? config : undefined;
}

/** Whole seconds from `duration_s`, `duration` or OpenAI's `seconds` ("8", 8 or "8s"). */
export function renderhourSeconds(body: Record<string, unknown>): number | undefined {
  for (const value of [body.duration_s, body.duration, body.seconds]) {
    const numeric =
      typeof value === "number"
        ? value
        : typeof value === "string"
          ? Number(value.trim().replace(/s$/i, ""))
          : NaN;
    if (Number.isFinite(numeric) && numeric > 0) return Math.round(numeric);
  }
  return undefined;
}

function sniffImageType(bytes: Buffer): string {
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return "image/jpeg";
  if (
    bytes.subarray(0, 4).toString("latin1") === "RIFF" &&
    bytes.subarray(8, 12).toString("latin1") === "WEBP"
  ) {
    return "image/webp";
  }
  return "image/png";
}

/**
 * Reads a caller-supplied image (data URI, public http(s) URL or bare base64) into bytes.
 * Injected by the handlers — `resolveImageSource` from ../imageGeneration.ts, which applies
 * the public-only, DNS-pinned fetch policy — so this client keeps no dependency on src/.
 */
export type RenderhourSourceReader = (
  source: string
) => Promise<{ buffer: Buffer; contentType: string }>;

/** The bytes to upload and a content type RenderHour stores (PNG, JPEG or WebP). */
export async function readRenderhourInput(
  source: string,
  readSource: RenderhourSourceReader
): Promise<{ bytes: Buffer; contentType: string }> {
  const { buffer, contentType: declared } = await readSource(source);
  const contentType = String(declared ?? "")
    .split(";")[0]
    .trim()
    .toLowerCase();
  return {
    bytes: buffer,
    contentType: UPLOAD_TYPES.has(contentType) ? contentType : sniffImageType(buffer),
  };
}

async function readError(response: Response): Promise<string> {
  const text = await response.text().catch(() => "");
  try {
    const parsed = JSON.parse(text) as { error?: { code?: string; message?: string } };
    if (parsed?.error?.message) {
      return sanitizeErrorMessage(
        `RenderHour ${parsed.error.code ?? response.status}: ${parsed.error.message}`
      );
    }
  } catch {
    // Not JSON: fall through to the raw text.
  }
  return sanitizeErrorMessage(`RenderHour ${response.status}: ${text.slice(0, 300)}`);
}

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/json",
});

export interface RenderhourUploadTarget {
  baseUrl: string;
  token: string;
  readSource: RenderhourSourceReader;
  signal?: AbortSignal | null;
}

/** Stores one input image on the account and returns its asset id. */
export async function uploadRenderhourInput({
  baseUrl,
  token,
  source,
  readSource,
  signal,
}: RenderhourUploadTarget & { source: string }): Promise<string> {
  const { bytes, contentType } = await readRenderhourInput(source, readSource);
  const form = new FormData();
  form.append("file", new Blob([new Uint8Array(bytes)], { type: contentType }), "input");
  const response = await fetch(`${baseUrl}/v1/uploads`, {
    method: "POST",
    headers: authHeaders(token),
    body: form,
    signal: signal ?? undefined,
  });
  if (!response.ok) throw new RenderhourRequestError(response.status, await readError(response));
  const data = (await response.json()) as { id?: unknown };
  if (typeof data?.id !== "string") {
    throw new RenderhourRequestError(502, "RenderHour upload answered without an id");
  }
  return data.id;
}

/** Uploads every source in order; an empty list costs no request. */
export async function uploadRenderhourInputs(
  sources: readonly string[],
  target: RenderhourUploadTarget
): Promise<string[]> {
  const ids: string[] = [];
  for (const source of sources) ids.push(await uploadRenderhourInput({ ...target, source }));
  return ids;
}

// A failed job's reason, as an HTTP status: the request's fault, or RenderHour's supplier.
function failureStatus(reason: unknown): number {
  if (reason === "moderation" || reason === "invalid_input") return 422;
  if (reason === "timeout" || reason === "expired") return 504;
  return 502;
}

function settled(job: RenderhourJob): RenderhourResult | null {
  if (job.status === "failed") {
    return {
      ok: false,
      status: failureStatus(job.failure_reason),
      error: `RenderHour job ${job.id} failed: ${job.failure_reason ?? "unknown reason"}`,
    };
  }
  if (job.status !== "succeeded") return null;
  if (!Array.isArray(job.outputs) || job.outputs.length === 0) {
    return { ok: false, status: 502, error: `RenderHour job ${job.id} finished without files` };
  }
  return { ok: true, job: { ...job, outputs: job.outputs } };
}

async function pollRenderhourJob({
  baseUrl,
  token,
  job: submitted,
  timeoutMs,
  pollIntervalMs,
  log,
  signal,
}: {
  baseUrl: string;
  token: string;
  job: RenderhourJob;
  timeoutMs: number;
  pollIntervalMs: number;
  log?: RenderhourLog | null;
  signal?: AbortSignal | null;
}): Promise<RenderhourResult> {
  const deadline = Date.now() + timeoutMs;
  let job = submitted;
  let retries = 0;
  let delay = pollIntervalMs;
  for (let done = settled(job); !done; done = settled(job)) {
    if (Date.now() + delay > deadline) {
      return {
        ok: false,
        status: 504,
        error: `RenderHour job ${job.id} did not finish within ${Math.round(timeoutMs / 1000)} s`,
      };
    }
    await sleep(delay);
    delay = pollIntervalMs;
    // Asking about a job also moves it forward on RenderHour's side.
    const response = await fetch(`${baseUrl}/v1/generations/${encodeURIComponent(job.id)}`, {
      headers: authHeaders(token),
      signal: signal ?? undefined,
    });
    if (!response.ok) {
      if (isRetryablePollStatus(response.status) && retries < MAX_CONSECUTIVE_POLL_RETRIES) {
        retries += 1;
        const retryAfter = parseRetryAfterMs(response.headers.get("retry-after"));
        delay = computePollRetryDelayMs(pollIntervalMs, retries, retryAfter);
        continue;
      }
      return { ok: false, status: response.status, error: await readError(response) };
    }
    retries = 0;
    job = (await response.json()) as RenderhourJob;
    log?.info?.("RENDERHOUR", `job ${job.id} ${job.status}`);
  }
  return settled(job) as RenderhourResult;
}

/**
 * Starts a job and waits for its files. A new Idempotency-Key per call: RenderHour never
 * charges twice for one key, and a retried call here is a new request from the caller.
 */
export async function runRenderhourJob({
  baseUrl,
  token,
  request,
  timeoutMs,
  pollIntervalMs,
  log,
  signal,
}: {
  baseUrl: string;
  token: string;
  request: Record<string, unknown>;
  timeoutMs: number;
  pollIntervalMs: number;
  log?: RenderhourLog | null;
  signal?: AbortSignal | null;
}): Promise<RenderhourResult> {
  const response = await fetch(`${baseUrl}/v1/generations`, {
    method: "POST",
    headers: {
      ...authHeaders(token),
      "Content-Type": "application/json",
      "Idempotency-Key": randomUUID(),
    },
    body: JSON.stringify(request),
    signal: signal ?? undefined,
  });
  if (!response.ok) return { ok: false, status: response.status, error: await readError(response) };
  const job = (await response.json()) as RenderhourJob;
  if (typeof job?.id !== "string") {
    return { ok: false, status: 502, error: "RenderHour answered without a job id" };
  }
  log?.info?.("RENDERHOUR", `job ${job.id} ${job.status} (${String(request.model)})`);
  return pollRenderhourJob({ baseUrl, token, job, timeoutMs, pollIntervalMs, log, signal });
}

/** A positive number from the request (e.g. `timeout_ms`), else the fallback. */
export function renderhourNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : fallback;
}

/** Turns a thrown upload / network error into the handlers' failure shape. */
export function renderhourFailure(err: unknown): { status: number; error: string } {
  if (err instanceof RenderhourRequestError) {
    return { status: err.status, error: sanitizeErrorMessage(err.message) };
  }
  const message = err instanceof Error ? err.message : String(err);
  return { status: 502, error: `RenderHour request failed: ${sanitizeErrorMessage(message)}` };
}
