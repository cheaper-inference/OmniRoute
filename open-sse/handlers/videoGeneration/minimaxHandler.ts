/**
 * MiniMax (Hailuo) video generation: create task → poll query → resolve file download URL.
 *
 * Documented v1 transport (https://platform.minimax.io/docs/api-reference/video-generation-t2v):
 *   POST {baseUrl}                        { model, prompt, ... } → { task_id, base_resp }
 *   GET  {statusUrl}?task_id=<id>         → { status: Preparing|Queueing|Processing|Success|Fail, file_id }
 *   GET  {filesUrl}?file_id=<id>          → { file: { download_url } }
 *
 * MiniMax reports application errors in `base_resp.status_code` (0 = ok) even on HTTP 200,
 * so every step checks it in addition to the HTTP status.
 */

import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { isJsonObject } from "../../utils/kieTask.ts";
import {
  MAX_CONSECUTIVE_POLL_RETRIES,
  computePollRetryDelayMs,
  isRetryablePollStatus,
  parseRetryAfterMs,
} from "./pollRetry.ts";

const MAX_PROMPT_CHARACTERS = 2000;
const ALLOWED_DURATIONS = new Set([6, 10]);
const ALLOWED_RESOLUTIONS = new Set(["720P", "768P", "1080P"]);
const DEFAULT_TIMEOUT_MS = 300_000;
const DEFAULT_POLL_INTERVAL_MS = 5_000;
const DEFAULT_FILES_URL = "https://api.minimax.io/v1/files/retrieve";
// base_resp.status_code values that signal a transient upstream condition on a poll.
const MINIMAX_RATE_LIMIT_CODE = 1002;

export type MinimaxTaskStatus = "pending" | "processing" | "done" | "failed";

type MinimaxRequestBody = {
  model: string;
  prompt: string;
  duration?: number;
  resolution?: string;
  first_frame_image?: string;
  prompt_optimizer?: boolean;
  fast_pretreatment?: boolean;
};

type MinimaxLog = {
  info: (scope: string, message: string) => void;
  error: (scope: string, message: string) => void;
} | null;

type VideoResult =
  | { success: true; data: { created: number; data: Array<{ url: string; format: string }> } }
  | { success: false; status: number; error: string };

/**
 * Normalize MiniMax v1 task states to OmniRoute's lifecycle vocabulary.
 * Unknown/missing states are treated as still pending so polling continues until timeout.
 */
export function normalizeMinimaxTaskStatus(status: unknown): MinimaxTaskStatus {
  switch (typeof status === "string" ? status.trim().toLowerCase() : "") {
    case "processing":
      return "processing";
    case "success":
      return "done";
    case "fail":
    case "failed":
      return "failed";
    default:
      return "pending";
  }
}

/**
 * Validate an OmniRoute video request and map it to the MiniMax v1 create body.
 * Optional fields are forwarded only when the caller supplied them, so MiniMax applies
 * its own per-model defaults (duration 6 s, 768P/720P) otherwise.
 * @testonly exported for unit tests.
 */
export function buildMinimaxVideoRequestBody(
  model: string,
  body: Record<string, unknown>,
  allowedModels: string[]
): MinimaxRequestBody | { error: string } {
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) return { error: "MiniMax video generation requires a prompt" };
  if (prompt.length > MAX_PROMPT_CHARACTERS) {
    return {
      error: `MiniMax video generation prompts must not exceed ${MAX_PROMPT_CHARACTERS} characters`,
    };
  }
  if (!allowedModels.includes(model)) {
    return { error: `Unsupported MiniMax video model: ${model}` };
  }

  const request: MinimaxRequestBody = { model, prompt };

  if (body.duration !== undefined && body.duration !== null) {
    const duration = Number(body.duration);
    if (!Number.isInteger(duration) || !ALLOWED_DURATIONS.has(duration)) {
      return { error: "MiniMax video duration must be 6 or 10 seconds" };
    }
    request.duration = duration;
  }

  if (body.resolution !== undefined && body.resolution !== null) {
    const resolution =
      typeof body.resolution === "string" ? body.resolution.trim().toUpperCase() : "";
    if (!ALLOWED_RESOLUTIONS.has(resolution)) {
      return {
        error: `MiniMax video resolution must be one of: ${[...ALLOWED_RESOLUTIONS].join(", ")}`,
      };
    }
    request.resolution = resolution;
  }

  const firstFrame = [body.first_frame_image, body.image_url, body.image].find(
    (candidate) => typeof candidate === "string" && candidate.trim()
  );
  if (typeof firstFrame === "string") request.first_frame_image = firstFrame.trim();

  if (typeof body.prompt_optimizer === "boolean") request.prompt_optimizer = body.prompt_optimizer;
  if (typeof body.fast_pretreatment === "boolean") {
    request.fast_pretreatment = body.fast_pretreatment;
  }

  return request;
}

/** Map a non-zero MiniMax base_resp.status_code to the closest HTTP status. */
function minimaxCodeToHttpStatus(code: number): number {
  if (code === 1004 || code === 2049) return 401;
  if (code === 1008) return 402;
  if (code === MINIMAX_RATE_LIMIT_CODE || code === 1039) return 429;
  if (code === 1026 || code === 2013) return 400;
  return 502;
}

function readBaseResp(data: unknown): { code: number; message: string } {
  const baseResp = isJsonObject(data) && isJsonObject(data.base_resp) ? data.base_resp : null;
  const code =
    baseResp && Number.isFinite(Number(baseResp.status_code)) ? Number(baseResp.status_code) : 0;
  const message = baseResp && typeof baseResp.status_msg === "string" ? baseResp.status_msg : "";
  return { code, message };
}

function minimaxError(step: string, code: number, message: string, httpStatus?: number) {
  const safe = sanitizeErrorMessage(message) || "upstream error";
  return {
    success: false as const,
    status: httpStatus ?? minimaxCodeToHttpStatus(code),
    error: `MiniMax video ${step} failed (code ${code}): ${safe.slice(0, 300)}`,
  };
}

async function readJson(res: Response): Promise<unknown> {
  return res.json().catch(() => ({}));
}

function readString(data: unknown, key: string): string {
  if (!isJsonObject(data)) return "";
  const value = data[key];
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

function resolveFilesUrl(providerConfig: { baseUrl: string; filesUrl?: string }): string {
  if (providerConfig.filesUrl) return providerConfig.filesUrl;
  try {
    return new URL("/v1/files/retrieve", providerConfig.baseUrl).toString();
  } catch {
    return DEFAULT_FILES_URL;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function handleMinimaxVideoGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}: {
  model: string;
  provider: string;
  providerConfig: {
    baseUrl: string;
    statusUrl?: string;
    filesUrl?: string;
    models?: Array<{ id: string }>;
  };
  body: Record<string, unknown>;
  credentials?: { apiKey?: string; accessToken?: string } | null;
  log?: MinimaxLog;
}): Promise<VideoResult> {
  const startTime = Date.now();
  const timeoutMs = Number(body.timeout_ms) > 0 ? Number(body.timeout_ms) : DEFAULT_TIMEOUT_MS;
  const pollIntervalMs =
    Number(body.poll_interval_ms) > 0 ? Number(body.poll_interval_ms) : DEFAULT_POLL_INTERVAL_MS;
  const token = credentials?.apiKey || credentials?.accessToken;

  const request = buildMinimaxVideoRequestBody(
    model,
    body,
    (providerConfig.models || []).map((entry) => entry.id)
  );
  if ("error" in request) return { success: false, status: 400, error: request.error };
  if (!token) return { success: false, status: 401, error: "MiniMax API key is required" };

  const createUrl = providerConfig.baseUrl;
  const statusUrl =
    providerConfig.statusUrl || createUrl.replace(/\/video_generation$/, "/query/video_generation");
  const filesUrl = resolveFilesUrl(providerConfig);
  const headers = { Authorization: `Bearer ${token}` };

  const logFailure = (status: number, error: string) => {
    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: error.slice(0, 500),
    }).catch(() => {});
  };
  const fail = (result: { success: false; status: number; error: string }) => {
    logFailure(result.status, result.error);
    return result;
  };

  log?.info(
    "VIDEO",
    `${provider}/${model} (minimax-video) | prompt: "${request.prompt.slice(0, 60)}..."`
  );

  try {
    // Step 1: create the task.
    const createRes = await fetch(createUrl, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    const createData = await readJson(createRes);
    const createResp = readBaseResp(createData);
    if (!createRes.ok) {
      return fail(
        minimaxError(
          "create",
          createResp.code,
          createResp.message || `HTTP ${createRes.status}`,
          createRes.status
        )
      );
    }
    if (createResp.code !== 0) {
      return fail(minimaxError("create", createResp.code, createResp.message));
    }
    const taskId = readString(createData, "task_id");
    if (!taskId) {
      return fail({
        success: false,
        status: 502,
        error: "MiniMax video create did not return a task_id",
      });
    }

    // Step 2: poll the task until it reaches a terminal state or the deadline passes.
    const deadline = startTime + timeoutMs;
    let lastStatus: MinimaxTaskStatus = "pending";
    let consecutiveRetries = 0;
    let nextDelay = pollIntervalMs;
    let fileId = "";
    while (Date.now() < deadline) {
      await sleep(nextDelay);
      nextDelay = pollIntervalMs;
      const pollRes = await fetch(`${statusUrl}?task_id=${encodeURIComponent(taskId)}`, {
        method: "GET",
        headers,
      });
      const pollData = await readJson(pollRes);
      const pollResp = readBaseResp(pollData);
      const transient =
        isRetryablePollStatus(pollRes.status) || pollResp.code === MINIMAX_RATE_LIMIT_CODE;
      if (transient && consecutiveRetries < MAX_CONSECUTIVE_POLL_RETRIES) {
        consecutiveRetries += 1;
        nextDelay = computePollRetryDelayMs(
          pollIntervalMs,
          consecutiveRetries,
          parseRetryAfterMs(pollRes.headers.get("retry-after"))
        );
        continue;
      }
      if (!pollRes.ok) {
        return fail(
          minimaxError(
            "query",
            pollResp.code,
            pollResp.message || `HTTP ${pollRes.status}`,
            pollRes.status
          )
        );
      }
      consecutiveRetries = 0;

      lastStatus = normalizeMinimaxTaskStatus(isJsonObject(pollData) ? pollData.status : undefined);
      if (lastStatus === "failed") {
        return fail({
          success: false,
          status: 502,
          error: `MiniMax video task ${taskId} failed${
            pollResp.code
              ? ` (code ${pollResp.code}): ${sanitizeErrorMessage(pollResp.message).slice(0, 300)}`
              : ""
          }`,
        });
      }
      if (pollResp.code !== 0) {
        return fail(minimaxError("query", pollResp.code, pollResp.message));
      }
      if (lastStatus === "done") {
        fileId = readString(pollData, "file_id");
        break;
      }
    }

    if (lastStatus !== "done") {
      return fail({
        success: false,
        status: 504,
        error: `MiniMax video task ${taskId} timed out (status: ${lastStatus})`,
      });
    }
    if (!fileId) {
      return fail({
        success: false,
        status: 502,
        error: "MiniMax video task succeeded but returned no file_id",
      });
    }

    // Step 3: resolve the file id into a download URL.
    const fileRes = await fetch(`${filesUrl}?file_id=${encodeURIComponent(fileId)}`, {
      method: "GET",
      headers,
    });
    const fileData = await readJson(fileRes);
    const fileResp = readBaseResp(fileData);
    if (!fileRes.ok || fileResp.code !== 0) {
      return fail(
        minimaxError(
          "file retrieve",
          fileResp.code,
          fileResp.message || `HTTP ${fileRes.status}`,
          fileRes.ok ? undefined : fileRes.status
        )
      );
    }
    const downloadUrl = isJsonObject(fileData) ? readString(fileData.file, "download_url") : "";
    if (!downloadUrl) {
      return fail({
        success: false,
        status: 502,
        error: "MiniMax video file retrieve returned no download_url",
      });
    }

    saveCallLog({
      method: "POST",
      path: "/v1/videos/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { videos_count: 1 },
    }).catch(() => {});
    return {
      success: true,
      data: {
        created: Math.floor(Date.now() / 1000),
        data: [{ url: downloadUrl, format: "mp4" }],
      },
    };
  } catch (err: unknown) {
    log?.error("VIDEO", `MiniMax video error: ${sanitizeErrorMessage(err)}`);
    return fail({
      success: false,
      status: isJsonObject(err) && Number.isFinite(Number(err.status)) ? Number(err.status) : 502,
      error: sanitizeErrorMessage(err) || "Video provider error",
    });
  }
}
