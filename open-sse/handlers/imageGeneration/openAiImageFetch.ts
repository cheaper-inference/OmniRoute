import { HTTP_STATUS } from "../../config/constants.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { isJsonObject } from "../../utils/kieTask.ts";
import { buildImageEndpointSuccess, type ImageEndpointResult } from "./result.ts";

type ImageFetchLog = {
  info?: (scope: string, message: string) => void;
  error?: (scope: string, message: string) => void;
  warn?: (scope: string, message: string) => void;
} | null;

type ImageFetchFailure = Extract<ImageEndpointResult, { success: false }>;

export type ImageFetchOptions = {
  /** Deadline for the whole exchange — response headers AND body read. Always set by the caller. */
  timeoutMs: number;
  /**
   * Caller cancellation. Only passed with IMAGE_GENERATION_LONG_JOBS on (#16260): an abort
   * then ends the request with 499 instead of waiting for the upstream job.
   */
  signal?: AbortSignal | null;
};

function cancelledImageResult(provider: string, log: ImageFetchLog): ImageFetchFailure {
  log?.info?.("IMAGE", `${provider} image request cancelled by caller`);
  return { success: false, status: 499, error: "Image generation request cancelled" };
}

function isAbortError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as { name?: unknown }).name === "AbortError"
  );
}

function hasUsableImage(items: unknown[]): boolean {
  return items.some(
    (item) =>
      isJsonObject(item) &&
      ((typeof item.b64_json === "string" && item.b64_json.length > 0) ||
        (typeof item.url === "string" && item.url.length > 0))
  );
}

async function readImageResponse(
  response: Response,
  provider: string,
  log: ImageFetchLog
): Promise<ImageEndpointResult> {
  if (!response.ok) {
    const errorText = await response.text();
    log?.error?.("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);
    return { success: false, status: response.status, error: errorText };
  }

  const data = await response.json();
  // Normalize response to OpenAI format
  const items = Array.isArray(data?.data) ? data.data : [];
  // Some providers return HTTP 2xx with an empty or malformed image payload. Treating that as
  // success makes image-combo strategies stop on the first leg and hand an image-less 200 to
  // the client, so an empty 2xx surfaces as a retryable 502 and combos fall back.
  if (!hasUsableImage(items)) {
    log?.warn?.(
      "IMAGE",
      `${provider} returned 200 without a usable image payload; treating as retryable 502`
    );
    return {
      success: false,
      status: HTTP_STATUS.BAD_GATEWAY,
      error: sanitizeErrorMessage(
        "Image provider returned a success status without an image payload"
      ),
    };
  }
  return buildImageEndpointSuccess(data, items);
}

/** Map a failed image fetch (network error, header/body deadline) to a 502/504 result. */
function imageFetchFailure(
  error: unknown,
  ctx: { url: string; provider: string; log: ImageFetchLog; timedOut: boolean; timeoutMs: number }
): ImageEndpointResult {
  const message = ctx.timedOut
    ? `Request to ${ctx.url} timed out after ${ctx.timeoutMs}ms`
    : error instanceof Error
      ? error.message
      : String(error);
  ctx.log?.error?.("IMAGE", `${ctx.provider} fetch error: ${message}`);
  return {
    success: false,
    status:
      ctx.timedOut || isAbortError(error) ? HTTP_STATUS.GATEWAY_TIMEOUT : HTTP_STATUS.BAD_GATEWAY,
    error: `Image provider error: ${sanitizeErrorMessage(message || error)}`,
  };
}

/**
 * Fetch a single OpenAI-compatible image endpoint and normalize the response.
 *
 * The deadline stays armed until the response BODY has been read: a `fetchWithTimeout` timer
 * is cleared once headers arrive, so an upstream that sends headers and then stalls the body
 * used to hang the request forever. A deadline hit (headers or body) answers 504, like the
 * header timeout always did.
 */
export async function fetchImageEndpoint(
  url: string,
  headers: Record<string, string>,
  body: BodyInit,
  provider: string,
  log: ImageFetchLog,
  options: ImageFetchOptions
): Promise<ImageEndpointResult> {
  const { signal, timeoutMs } = options;
  if (signal?.aborted) return cancelledImageResult(provider, log);

  const controller = timeoutMs > 0 ? new AbortController() : null;
  let timedOut = false;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const abortFromCaller = () => controller?.abort(signal?.reason);

  if (controller) {
    signal?.addEventListener("abort", abortFromCaller, { once: true });
    timeoutId = globalThis.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, timeoutMs);
  }
  const fetchSignal = controller?.signal ?? signal ?? undefined;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
      ...(fetchSignal ? { signal: fetchSignal } : {}),
    });
    const result = await readImageResponse(response, provider, log);
    return signal?.aborted ? cancelledImageResult(provider, log) : result;
  } catch (error: unknown) {
    if (signal?.aborted) return cancelledImageResult(provider, log);
    return imageFetchFailure(error, { url, provider, log, timedOut, timeoutMs });
  } finally {
    if (timeoutId !== undefined) globalThis.clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abortFromCaller);
  }
}
