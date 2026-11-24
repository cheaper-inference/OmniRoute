// WaveSpeedAI (api.wavespeed.ai) — helpers shared by the image handler and the video job preset.
//
// One API shape serves every model: POST /api/v3/<model id> with the model's own input as the
// JSON body returns { code, message, data: { id, status } }; GET /api/v3/predictions/<id>/result
// moves data.status through created -> processing -> completed, or ends in failed, cancelled,
// timeout or deleted, with the result file URLs in data.outputs or the reason in data.error.
// Model ids are slash-separated paths (wavespeed-ai/z-image/turbo). https://wavespeed.ai/docs
//
// Retries follow https://wavespeed.ai/docs/errors-retries-timeouts: the submit POST is never
// retried (each one is a new, billed prediction); result reads are retried on 408, 429, 5xx and
// network errors with backoff, honoring Retry-After.

export const WAVESPEED_BASE_URL = "https://api.wavespeed.ai";
export const WAVESPEED_SUBMIT_PATH = "/api/v3/{model}";
export const WAVESPEED_RESULT_PATH = "/api/v3/predictions/{taskId}/result";

/** Request fields that belong to the gateway or the OpenAI contract, never to a model input. */
const WAVESPEED_NON_INPUT_FIELDS = new Set([
  "model",
  "n",
  "response_format",
  "user",
  "stream",
  "timeout_ms",
  "poll_interval_ms",
  "max_polls",
]);

/** Prediction statuses that end a prediction without a result. */
export const WAVESPEED_FAILED_STATUSES = ["failed", "cancelled", "timeout", "deleted"];

/** A model id as a URL path: every segment encoded, the slashes between them kept. */
export function encodeWavespeedModelPath(model: string): string {
  const segments = model.split("/");
  // URL parsing resolves "." and ".." segments (encoded or not), which would move the
  // authenticated request out of /api/v3/. Empty segments are rejected rather than dropped, so
  // the id sent upstream is exactly the id that model policy and usage records saw.
  if (segments.some((segment) => segment === "" || /^(\.|%2e){1,2}$/i.test(segment))) {
    throw new Error(`Invalid WaveSpeedAI model id: ${model}`);
  }
  return segments.map((segment) => encodeURIComponent(segment)).join("/");
}

/** Whether a failed result read should be retried (the submit POST never is). */
export function isRetryableWavespeedPollStatus(status: number): boolean {
  return status === 408 || status === 429 || status >= 500;
}

export function buildWavespeedSubmitUrl(baseUrl: string, model: string): string {
  const path = WAVESPEED_SUBMIT_PATH.replace("{model}", encodeWavespeedModelPath(model));
  return `${baseUrl.replace(/\/+$/, "")}${path}`;
}

export function buildWavespeedResultUrl(baseUrl: string, predictionId: string): string {
  const path = WAVESPEED_RESULT_PATH.replace("{taskId}", encodeURIComponent(predictionId));
  return `${baseUrl.replace(/\/+$/, "")}${path}`;
}

/**
 * The model input for a request: everything the caller sent except gateway/OpenAI-only fields.
 * Input names differ per model, so native fields (aspect_ratio, resolution, seed, ...) are
 * forwarded as given and validated by WaveSpeedAI against the model's schema.
 */
export function pickWavespeedModelInput(
  body: Record<string, unknown> | null | undefined
): Record<string, unknown> {
  const input: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body ?? {})) {
    if (WAVESPEED_NON_INPUT_FIELDS.has(key) || value === undefined || value === null) continue;
    input[key] = value;
  }
  return input;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export type WavespeedFailure = {
  status: number;
  message: string;
  /** An error envelope with a retryable code: a result read may be retried, a submit may not. */
  transient: boolean;
};

/**
 * The failure a WaveSpeedAI response reports, or null when it reports none. Covers both forms:
 * an envelope whose `code` is not 200 (some are delivered with HTTP 200) and a prediction whose
 * status is terminal (failed, cancelled, timeout, deleted).
 */
export function readWavespeedFailure(payload: unknown): WavespeedFailure | null {
  const envelope = asRecord(payload);
  if (!envelope) return null;

  const code = envelope.code;
  if (typeof code === "number" && code !== 200) {
    const message = typeof envelope.message === "string" ? envelope.message.trim() : "";
    const status = code >= 400 && code <= 599 ? code : 502;
    return {
      status,
      message: message || `WaveSpeedAI request failed (code ${code})`,
      transient: isRetryableWavespeedPollStatus(code),
    };
  }

  const data = asRecord(envelope.data);
  const status = typeof data?.status === "string" ? data.status.toLowerCase() : "";
  if (WAVESPEED_FAILED_STATUSES.includes(status)) {
    const reason = typeof data?.error === "string" ? data.error.trim() : "";
    return {
      status: 502,
      message: reason || `WaveSpeedAI prediction ${status}`,
      transient: false,
    };
  }

  return null;
}
