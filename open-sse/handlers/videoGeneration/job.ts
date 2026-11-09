/**
 * Async job/poll video generation for custom OpenAI-compatible provider nodes
 * whose /videos surface is a submit → poll → fetch-result API (e.g. Agnes
 * Video V2.0, muapi.ai, OpenAI Sora). Presets are declarative data — the
 * handler here is one family; everything else is per-preset config.
 *
 * Response shape stays OpenAI-like: { created, data: [{ url, format: "mp4" }] } so the
 * /v1/videos/generations route returns the same contract as the synchronous
 * path.
 */

import {
  fetchWithTimeout,
  FetchTimeoutError,
  getConfiguredTimeout,
} from "@/shared/utils/fetchTimeout";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { sleep } from "../../utils/sleep.ts";
import {
  MAX_CONSECUTIVE_POLL_RETRIES,
  computePollRetryDelayMs,
  isRetryablePollStatus,
  parseRetryAfterMs,
} from "./pollRetry.ts";
import { abortedVideoResult } from "./abort.ts";

interface LogLike {
  info?: (tag: string, msg: string, meta?: unknown) => void;
  warn?: (tag: string, msg: string, meta?: unknown) => void;
  error?: (tag: string, msg: string, meta?: unknown) => void;
}

interface CredentialsLike {
  providerSpecificData?: { baseUrl?: unknown } | null;
  baseUrl?: unknown;
  apiKey?: unknown;
  accessToken?: unknown;
}

/** Dot-path reader restricted to plain objects/arrays (no prototypes). */
function readPath(value: unknown, path: string): unknown {
  if (!path) return value;
  let current: unknown = value;
  for (const segment of path.split(".")) {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== "object") return undefined;
    if (Array.isArray(current)) {
      const index = Number(segment);
      if (!Number.isInteger(index) || index < 0 || index >= current.length) return undefined;
      current = current[index];
      continue;
    }
    if (!Object.prototype.hasOwnProperty.call(current, segment)) return undefined;
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}

/** Non-empty string from a dot path, or null. */
function readStringPath(value: unknown, path: string): string | null {
  const found = readPath(value, path);
  return typeof found === "string" && found.trim() ? found : null;
}

function isDoneStatus(
  status: unknown,
  done: string[],
  failed: string[]
): "done" | "failed" | "pending" {
  if (typeof status !== "string") return "pending";
  const normalized = status.trim().toLowerCase();
  const failedNormalized = failed.map((s) => s.trim().toLowerCase());
  const doneNormalized = done.map((s) => s.trim().toLowerCase());
  if (failedNormalized.includes(normalized)) return "failed";
  if (doneNormalized.includes(normalized)) return "done";
  if (["failed", "error", "cancelled", "canceled"].includes(normalized)) return "failed";
  if (["completed", "succeeded", "success", "done"].includes(normalized)) return "done";
  return "pending";
}

export type VideoJobPreset = {
  id: string;
  displayName: string;
  /** auth header name plus value scheme */
  authHeaderName: "x-api-key" | "Authorization";
  authScheme: "bearer" | "raw";
  baseUrlFallback: string;
  submit: {
    method: "POST";
    /** may contain {model} — substituted before POST */
    path: string;
    buildBody: (params: {
      model?: string;
      prompt?: string;
      duration?: number;
      extras: Record<string, unknown>;
    }) => Record<string, unknown>;
  };
  /** dot path into the submit response identifying the job */
  taskIdPath: string;
  poll: {
    /** contains {taskId} */
    pathTemplate: string;
  };
  statusPath: string;
  statusDone: string[];
  statusFailed: string[];
  /** dot path into the poll response holding the finished video URL/array */
  resultPath: string;
  /**
   * When true, the finished artifact is fetched with the provider credential and
   * stored locally, then reported as a URL on this gateway. Some providers publish
   * results behind their own auth (OpenRouter's `unsigned_urls` point at
   * `/api/v1/videos/{id}/content`, which 401s for anyone without the upstream key),
   * so handing the raw URL back gives the caller something it cannot fetch.
   * Persisting rather than inlining base64 keeps every provider's result the same
   * shape, which combo failover depends on.
   */
  resultNeedsAuth?: boolean;
  /** format reported alongside the downloaded artifact */
  resultFormat?: string;
  maxPolls: number;
  pollIntervalMs: number;
};

// #9820: declarative presets for the shipping async job/poll video providers.
const VIDEO_JOB_PRESETS: Record<string, VideoJobPreset> = {
  "agnes-video-job": {
    id: "agnes-video-job",
    displayName: "Agnes Video V2.0",
    authHeaderName: "Authorization",
    authScheme: "bearer",
    // Official Agnes flow: POST /v1/videos returns video_id, then the recommended
    // status endpoint GET /agnesapi?video_id=… exposes status and metadata.url.
    baseUrlFallback: "https://apihub.agnes-ai.com",
    submit: {
      method: "POST",
      path: "/v1/videos",
      buildBody: ({ model, prompt, extras }) => ({
        model,
        prompt,
        // passthrough of image/mode/num_frames/frame_rate/…  — the generic
        // route body uses .catchall, so provider-specific knobs survive.
        ...extras,
      }),
    },
    taskIdPath: "video_id",
    poll: { pathTemplate: "/agnesapi?video_id={taskId}&model_name={model}" },
    statusPath: "status",
    statusDone: ["completed"],
    statusFailed: ["failed"],
    resultPath: "metadata.url",
    maxPolls: 60,
    pollIntervalMs: 2000,
  },
  "agnes-video-2.5-job": {
    id: "agnes-video-2.5-job",
    displayName: "Agnes Video 2.5",
    authHeaderName: "Authorization",
    authScheme: "bearer",
    // Wiki 2026-09-09 + live probe: POST /v1/videos returns `id`, poll GET /v1/videos/{id}, result `metadata.url`.
    // seconds is a string. Do not reuse agnes-video-job (video_id + /agnesapi).
    baseUrlFallback: "https://apihub.agnes-ai.com",
    submit: {
      method: "POST",
      path: "/v1/videos",
      buildBody: ({ model, prompt, extras }) => {
        const seconds = extras.seconds;
        return {
          model,
          prompt,
          ...extras,
          ...(typeof seconds === "number" ? { seconds: String(seconds) } : {}),
        };
      },
    },
    taskIdPath: "id",
    poll: { pathTemplate: "/v1/videos/{taskId}" },
    statusPath: "status",
    statusDone: ["completed"],
    statusFailed: ["failed"],
    resultPath: "metadata.url",
    maxPolls: 60,
    pollIntervalMs: 2000,
  },
  "muapi-video-job": {
    id: "muapi-video-job",
    displayName: "muapi.ai",
    authHeaderName: "x-api-key",
    authScheme: "raw",
    // muapi.ai video/audio surface is Replicate-style: POST /api/v1/{model}
    // returns { request_id }; poll GET /api/v1/predictions/{id}/result.
    baseUrlFallback: "https://api.muapi.ai",
    submit: {
      method: "POST",
      path: "/api/v1/{model}",
      buildBody: (params) => {
        const { prompt, duration, extras } = params;
        return {
          prompt,
          ...(typeof duration === "number" ? { duration } : {}),
          ...extras,
        };
      },
    },
    taskIdPath: "request_id",
    poll: { pathTemplate: "/api/v1/predictions/{taskId}/result" },
    statusPath: "status",
    statusDone: ["completed"],
    statusFailed: ["failed"],
    resultPath: "outputs",
    maxPolls: 60,
    pollIntervalMs: 2000,
  },
  "sora-job": {
    id: "sora-job",
    displayName: "OpenAI Sora",
    authHeaderName: "Authorization",
    authScheme: "bearer",
    baseUrlFallback: "https://api.openai.com",
    submit: {
      method: "POST",
      path: "/v1/videos",
      buildBody: (params) => {
        const { model, prompt, duration, extras } = params;
        // seconds is a STRING enum ("4"|"8"|"12") in the Sora API; absolute
        // size mapping is intentionally not forced here.
        return {
          model,
          prompt,
          ...(typeof duration === "number" ? { seconds: String(duration) } : {}),
          ...extras,
        };
      },
    },
    taskIdPath: "id",
    poll: { pathTemplate: "/v1/videos/{taskId}" },
    statusPath: "status",
    statusDone: ["completed"],
    statusFailed: ["failed"],
    resultPath: "data",
    maxPolls: 60,
    pollIntervalMs: 2000,
  },
  // OpenRouter video is asynchronous and does not follow the OpenAI shape:
  // POST /api/v1/videos answers 202 with { id, polling_url, status } and the
  // finished clip arrives as unsigned_urls: ["https://…"]. cancelled is already
  // terminal in isDoneStatus; expired is not, and would otherwise poll until
  // maxPolls reports a misleading 504.
  "openrouter-video-job": {
    id: "openrouter-video-job",
    displayName: "OpenRouter Video",
    authHeaderName: "Authorization",
    authScheme: "bearer",
    baseUrlFallback: "https://openrouter.ai/api/v1",
    submit: {
      method: "POST",
      path: "/videos",
      buildBody: ({ model, prompt, duration, extras }) => ({
        model,
        prompt,
        ...(typeof duration === "number" ? { duration } : {}),
        ...extras,
      }),
    },
    taskIdPath: "id",
    poll: { pathTemplate: "/videos/{taskId}" },
    statusPath: "status",
    statusDone: ["completed"],
    statusFailed: ["failed", "cancelled", "expired"],
    resultPath: "unsigned_urls",
    // The content endpoint is auth-gated by the OpenRouter key, so fetch it here
    // and hand back the bytes.
    resultNeedsAuth: true,
    resultFormat: "mp4",
    maxPolls: 180,
    pollIntervalMs: 2000,
  },
};

/** Resolve a configured job preset; null when the preset is unknown/none. */
export function getVideoJobPreset(presetName: unknown): VideoJobPreset | null {
  if (typeof presetName !== "string") return null;
  const preset = VIDEO_JOB_PRESETS[presetName];
  return preset ?? null;
}

type JobLog = {
  info?: (tag: string, msg: string, meta?: unknown) => void;
  error?: (tag: string, msg: string) => void;
};

export type VideoJobResult =
  { success: true; data: unknown } | { success: false; status: number; error: string };

/** One finished job, as handed to the injected call recorder. */
export interface VideoJobCallRecord {
  provider: string;
  model: string;
  /**
   * Structural, not the VideoJobResult union: this workspace compiles with
   * `strict: false` (open-sse/tsconfig.json), where a `true`/`false` property is
   * widened to `boolean` and therefore cannot act as a discriminant. Declaring the
   * optional members directly avoids relying on narrowing that does not happen here.
   */
  result: { success: boolean; status?: number; error?: string };
  durationMs: number;
}

/**
 * Persists a finished job (call log + usage row). Injected by the dispatcher in
 * `../videoGeneration.ts`, which owns the usage-DB writers, so this module keeps no
 * dependency on the app's `@/lib` layer.
 */
export type RecordVideoJobCall = (record: VideoJobCallRecord) => Promise<void> | void;

/**
 * Stores a downloaded artifact and returns the URL to hand back (or null when storage is
 * unavailable). Injected by the route — owner scoping and the public origin live in src/ —
 * so this module keeps no dependency on the app layer (#16372).
 */
export interface VideoMediaSink {
  store: (bytes: Buffer, format: string) => string | null;
}

/**
 * Handle a video-generation job via the submit→poll preset pipeline.
 * Returns the same shape as the sync handlers: { success, data?: …, status?, error? }.
 */
export async function handleVideoJobGeneration({
  model,
  presetName,
  body,
  credentials,
  log,
  maxPolls,
  pollIntervalMs,
  provider,
  recordCall,
  mediaSink,
  signal = null,
}: {
  model: string;
  presetName: string;
  body: Record<string, unknown>;
  credentials?: unknown;
  log?: JobLog;
  maxPolls?: number;
  pollIntervalMs?: number;
  /** Provider id, for the usage/call-log rows. Unknown falls back to the preset. */
  provider?: string;
  /** Usage/call-log recorder; when absent the job is not recorded. */
  recordCall?: RecordVideoJobCall;
  /** Required by presets whose result is auth-gated upstream (`resultNeedsAuth`). */
  mediaSink?: VideoMediaSink;
  /** Caller abort (client disconnect / combo cancel); stops submit and polling. */
  signal?: AbortSignal | null;
}): Promise<VideoJobResult> {
  const startTime = Date.now();
  const result = await runVideoJobGeneration({
    model,
    presetName,
    body,
    credentials,
    log,
    maxPolls,
    pollIntervalMs,
    mediaSink,
    signal,
  });
  // Recorded here rather than on each return, so a new exit path cannot skip it.
  // A recording failure must never turn a finished generation into an error.
  if (recordCall) {
    try {
      await recordCall({
        provider: provider || presetName,
        model,
        result,
        durationMs: Date.now() - startTime,
      });
    } catch (error) {
      log?.error?.("VIDEO", `Failed to record video job call: ${sanitizeErrorMessage(error)}`);
    }
  }
  return result;
}

async function runVideoJobGeneration({
  model,
  presetName,
  body,
  credentials,
  log,
  maxPolls: maxPollsOverride,
  pollIntervalMs: pollIntervalOverride,
  mediaSink,
  signal = null,
}: {
  model: string;
  presetName: string;
  body: Record<string, unknown>;
  credentials?: unknown;
  log?: JobLog;
  maxPolls?: number;
  pollIntervalMs?: number;
  mediaSink?: VideoMediaSink;
  signal?: AbortSignal | null;
}): Promise<VideoJobResult> {
  if (signal?.aborted) return abortedVideoResult();
  const preset = getVideoJobPreset(presetName);
  if (!preset) {
    return {
      success: false,
      status: 400,
      error: `Unknown video job preset: ${presetName}`,
    };
  }

  const baseUrl = resolveJobBaseUrl(credentials, preset.baseUrlFallback);
  log?.info?.("VIDEO", `Job preset ${presetName} submitting ${model}`);
  log?.info?.("VIDEO", JSON.stringify({ baseUrl }));

  const bodyForPreset = preset.submit.buildBody({
    model: model,
    prompt: typeof body.prompt === "string" ? body.prompt : undefined,
    duration: typeof body.duration === "number" ? body.duration : undefined,
    // passthrough of the remainder — the API keeps catchall extras
    extras: Object.fromEntries(
      Object.entries(body ?? {}).filter(
        ([key]) =>
          key !== "model" &&
          key !== "prompt" &&
          key !== "duration" &&
          key !== "poll_interval_ms" &&
          key !== "max_polls"
      )
    ),
  });

  const submitPath = preset.submit.path.replace("{model}", encodeURIComponent(model));
  const submitUrl = `${baseUrl}${submitPath}`; // baseUrl never ends with "/"
  const submitResult = await fetchJson(submitUrl, {
    method: preset.submit.method,
    headers: buildJobHeaders(preset, credentials),
    body: JSON.stringify(bodyForPreset),
    log,
    signal,
  });
  if (signal?.aborted) return abortedVideoResult();
  if (submitResult.ok === false) {
    return { success: false, status: submitResult.status, error: submitResult.error };
  }

  // preset.taskIdPath comes first; the rest only run when a provider omits the
  // documented field. task_id outranks the generic id because this chain is
  // shared by every preset, and elsewhere id is often a correlation handle.
  const taskId =
    readStringPath(submitResult.data, preset.taskIdPath) ||
    readStringPath(submitResult.data, "video_id") ||
    readStringPath(submitResult.data, "task_id") ||
    readStringPath(submitResult.data, "id") ||
    readStringPath(submitResult.data, "request_id");
  if (!taskId) {
    return {
      success: false,
      status: 502,
      error: `Video provider did not return a job id (${presetName})`,
    };
  }

  // Poll loop.
  const maxPolls = maxPollsOverride ?? preset.maxPolls;
  const pollInterval = pollIntervalOverride ?? preset.pollIntervalMs;

  let consecutiveRetries = 0;
  let nextDelay = pollInterval;
  for (let attempt = 1; attempt <= maxPolls; attempt += 1) {
    await sleep(nextDelay, signal);
    if (signal?.aborted) return abortedVideoResult();
    nextDelay = pollInterval;
    const pollUrl = `${baseUrl}${preset.poll.pathTemplate
      .replace("{taskId}", encodeURIComponent(taskId))
      .replace("{model}", encodeURIComponent(model))}`;
    const pollResult = await fetchJson(pollUrl, {
      method: "GET",
      headers: buildJobHeaders(preset, credentials),
      log,
      signal,
    });
    if (signal?.aborted) return abortedVideoResult();
    if (pollResult.ok === false) {
      // #15536: 429/503 on a status query is transient - back off and keep polling.
      if (
        isRetryablePollStatus(pollResult.status) &&
        consecutiveRetries < MAX_CONSECUTIVE_POLL_RETRIES
      ) {
        consecutiveRetries += 1;
        nextDelay = computePollRetryDelayMs(
          pollInterval,
          consecutiveRetries,
          pollResult.retryAfterMs
        );
        attempt -= 1; // transient waits do not consume the poll budget
        continue;
      }
      return { success: false, status: pollResult.status, error: pollResult.error };
    }
    consecutiveRetries = 0;

    const status =
      readPath(pollResult.data, preset.statusPath) ??
      readPath(pollResult.data, "status") ??
      readPath(pollResult.data, "task_status") ??
      readPath(pollResult.data, "state");
    const jobState = isDoneStatus(status, preset.statusDone, preset.statusFailed);
    if (jobState === "done") {
      const url = readResultUrl(pollResult.data, preset.resultPath);
      if (!url) {
        return {
          success: false,
          status: 502,
          error: `Video job completed but no result URL found (${presetName})`,
        };
      }
      log?.info?.("VIDEO", `Job completed after ${attempt} poll(s)`);

      // A result the caller cannot fetch is worse than no result: download it with
      // the provider credential and serve it back from this gateway.
      if (preset.resultNeedsAuth) {
        return storeAuthGatedResult({
          url,
          baseUrl,
          preset,
          presetName,
          credentials,
          log,
          mediaSink,
        });
      }

      return {
        success: true,
        data: {
          created: Math.floor(Date.now() / 1000),
          data: [{ url, format: "mp4" }],
        },
      };
    }
    if (jobState === "failed") {
      return {
        success: false,
        status: 502,
        error: `Video job failed (${presetName})`,
      };
    }
  }

  return {
    success: false,
    status: 504,
    error: `Video job timed out after ${maxPolls} polls (${presetName})`,
  };
}

function buildJobHeaders(preset: VideoJobPreset, credentials?: unknown): Record<string, string> {
  const creds = credentials as CredentialsLike | null | undefined;
  const apiKey =
    typeof creds?.apiKey === "string" && creds.apiKey
      ? creds.apiKey
      : typeof creds?.accessToken === "string" && creds.accessToken
        ? creds.accessToken
        : "";
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (!apiKey) return headers;
  if (preset.authScheme === "raw") {
    headers[preset.authHeaderName] = apiKey;
  } else {
    headers[preset.authHeaderName] = `Bearer ${apiKey}`;
  }
  return headers;
}

function resolveJobBaseUrl(credentials: unknown, fallback: string): string {
  const creds = credentials as CredentialsLike | null | undefined;
  const psdBaseUrl =
    creds?.providerSpecificData?.baseUrl != null &&
    typeof creds.providerSpecificData.baseUrl === "string" &&
    creds.providerSpecificData.baseUrl.trim()
      ? (creds.providerSpecificData.baseUrl as string).trim()
      : null;
  const topLevelBaseUrl =
    creds?.baseUrl != null && typeof creds.baseUrl === "string" && creds.baseUrl.trim()
      ? (creds.baseUrl as string).trim()
      : null;
  const nodeBaseUrl = psdBaseUrl || topLevelBaseUrl;
  if (!nodeBaseUrl) return fallback.replace(/\/+$/, "");
  let normalized = nodeBaseUrl;
  while (normalized.endsWith("/")) normalized = normalized.slice(0, -1);
  return normalized;
}

function sameOrigin(a: string, b: string): boolean {
  try {
    return new URL(a).origin === new URL(b).origin;
  } catch {
    return false;
  }
}

/**
 * Download an auth-gated result with the provider credential and hand back a gateway URL.
 * The credential is only ever sent to the provider's own origin: a result URL on any other
 * host is rejected rather than fetched with the key attached.
 */
async function storeAuthGatedResult({
  url,
  baseUrl,
  preset,
  presetName,
  credentials,
  log,
  mediaSink,
}: {
  url: string;
  baseUrl: string;
  preset: VideoJobPreset;
  presetName: string;
  credentials: unknown;
  log?: JobLog;
  mediaSink?: VideoMediaSink;
}): Promise<VideoJobResult> {
  if (!sameOrigin(url, baseUrl)) {
    return {
      success: false,
      status: 502,
      error: `Video job result is not on the provider origin (${presetName})`,
    };
  }
  if (!mediaSink) {
    return {
      success: false,
      status: 502,
      error: `Video job result could not be stored for serving (${presetName})`,
    };
  }
  const download = await fetchJson(url, {
    method: "GET",
    headers: buildJobHeaders(preset, credentials),
    log,
    raw: true,
  });
  if (download.ok === false) {
    return { success: false, status: download.status, error: download.error };
  }
  if (!download.base64) {
    return {
      success: false,
      status: 502,
      error: `Video job produced an empty artifact (${presetName})`,
    };
  }
  const format = preset.resultFormat ?? "mp4";
  const servedUrl = mediaSink.store(Buffer.from(download.base64, "base64"), format);
  if (!servedUrl) {
    return {
      success: false,
      status: 502,
      error: `Video job result could not be stored for serving (${presetName})`,
    };
  }
  // Same { url, format } shape every other provider returns, so a combo's
  // failover path and its happy path are indistinguishable to the caller.
  return {
    success: true,
    data: { created: Math.floor(Date.now() / 1000), data: [{ url: servedUrl, format }] },
  };
}

async function fetchJson(
  url: string,
  {
    method,
    headers,
    body,
    log,
    raw,
    signal,
  }: {
    method: string;
    headers: Record<string, string>;
    body?: string;
    log?: LogLike;
    /** Return the response body base64-encoded instead of parsing JSON. */
    raw?: boolean;
    signal?: AbortSignal | null;
  }
): Promise<FetchJsonResult> {
  try {
    const response = await fetchWithTimeout(url, {
      method,
      headers,
      ...(body !== undefined ? { body } : {}),
      timeoutMs: getConfiguredTimeout(),
      // A per-call derived signal: fetchWithTimeout never removes its abort listener.
      ...(signal ? { signal: AbortSignal.any([signal]) } : {}),
    });
    return await readFetchJsonResponse(response, url, log, raw);
  } catch (err: unknown) {
    return fetchJsonErrorResult(err, url, log, signal);
  }
}

type FetchJsonResult =
  | { ok: true; data?: unknown; base64?: string }
  | { ok: false; status: number; error: string; retryAfterMs?: number };

async function readFetchJsonResponse(
  response: Response,
  url: string,
  log: LogLike | undefined,
  raw: boolean | undefined
): Promise<FetchJsonResult> {
  if (!response.ok) {
    const errorText = await response.text();
    log?.error?.("VIDEO", `Upstream ${response.status} for ${url}: ${errorText.slice(0, 200)}`);
    return {
      ok: false,
      status: response.status,
      error: errorText,
      retryAfterMs: parseRetryAfterMs(response.headers.get("retry-after")),
    };
  }
  if (raw) {
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length === 0) {
      return { ok: false, status: 502, error: `Empty media body from ${url}` };
    }
    return { ok: true, base64: buffer.toString("base64") };
  }
  const data = await response.json();
  return { ok: true, data };
}

/** Maps a thrown fetch error to a result: 499 on caller abort, 504 on timeout, else 502. */
function fetchJsonErrorResult(
  err: unknown,
  url: string,
  log: LogLike | undefined,
  signal: AbortSignal | null | undefined
): FetchJsonResult {
  if (signal?.aborted) return { ok: false, status: 499, error: "Request aborted" };
  const message = err instanceof Error ? err.message : String(err);
  const isTimeout =
    err instanceof FetchTimeoutError || (err instanceof Error && err.name === "AbortError");
  log?.error?.(
    "VIDEO",
    `${isTimeout ? "Timeout" : "Request error"} for ${url}: ${sanitizeErrorMessage(message)}`
  );
  return {
    ok: false,
    status: isTimeout ? 504 : 502,
    error: `Video provider error: ${sanitizeErrorMessage(message)}`,
  };
}

const NON_VIDEO_EXTENSION = /\.(png|jpe?g|gif|webp|bmp|svg|ico)$/i;

function extractUrl(value: unknown): string | null {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (
      (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
      (trimmed.startsWith("[") && trimmed.endsWith("]"))
    ) {
      try {
        const parsed = JSON.parse(trimmed) as unknown;
        const fromParsed = extractUrl(parsed);
        if (fromParsed) return fromParsed;
      } catch {
        // Not valid JSON, fall through
      }
    }
    if (/^(https?:\/\/|data:video\/|\/)/i.test(trimmed)) {
      // Reject images inside the scan, not at the call site: the walk returns
      // its first hit, so a post-filter would drop the whole payload instead of
      // letting the search move on to the real video.
      return NON_VIDEO_EXTENSION.test(trimmed.split(/[?#]/)[0] ?? "") ? null : trimmed;
    }
    return null;
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      const url = extractUrl(item);
      if (url) return url;
    }
    return null;
  }
  if (value && typeof value === "object") {
    const rec = value as Record<string, unknown>;
    for (const key of [
      "url",
      "video_url",
      "videoUrl",
      "download_url",
      "downloadUrl",
      "output_url",
      "outputUrl",
      "file_url",
      "fileUrl",
    ]) {
      if (typeof rec[key] === "string" && (rec[key] as string).trim()) {
        const extracted = extractUrl(rec[key]);
        if (extracted) return extracted;
      }
    }
    for (const key of ["metadata", "data", "outputs", "output", "result", "video"]) {
      if (rec[key] !== undefined && rec[key] !== null) {
        const extracted = extractUrl(rec[key]);
        if (extracted) return extracted;
      }
    }
  }
  return null;
}

// Pre-#13726 behavior, kept as the last resort: whatever non-empty string sits
// at the preset's documented path (or its first array entry / entry.url) is the
// result, even a relative path without a leading slash. The strict walk above
// only runs first so a real video url elsewhere can win over an odd value here.
function readDocumentedResult(found: unknown): string | null {
  if (typeof found === "string" && found.trim()) return found.trim();
  if (Array.isArray(found)) {
    const first = found[0];
    if (typeof first === "string" && first.trim()) return first.trim();
    if (first && typeof first === "object" && !Array.isArray(first)) {
      const urlEntry = (first as Record<string, unknown>).url;
      if (typeof urlEntry === "string" && urlEntry.trim()) return urlEntry.trim();
    }
  }
  return null;
}

function readResultUrl(data: unknown, resultPath: string): string | null {
  const documented = readPath(data, resultPath);
  const direct = extractUrl(documented);
  if (direct) return direct;

  // The preset path missed, so scan the rest of the payload for a video url.
  return extractUrl(data) ?? readDocumentedResult(documented);
}
