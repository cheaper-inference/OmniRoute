/**
 * Parallel Web Fetch Executor
 *
 * Fetches a URL through the Parallel Extract API (same key as parallel-search).
 * POST https://api.parallel.ai/v1/extract with an `x-api-key` header.
 *
 * Extract returns Markdown only, so other OmniRoute fetch formats are rejected
 * with 400 before any network call. Content is capped at 100,000 characters.
 *
 * Extract reports a failure of the TARGET page (e.g. the site answered 403 to
 * Parallel) inside an HTTP 200 envelope (`errors[]`). That is mapped to a 422
 * with a fixed message: it is the requested page's fault, not the Parallel
 * connection's, so it must not look like a quota/provider failure.
 *
 * The key only ever goes to the fixed Extract URL and redirects are refused.
 */

import { sanitizeErrorMessage, buildErrorBody } from "../utils/error.ts";
import type { WebFetchResult, WebFetchFormat, WebFetchCredentials } from "../handlers/webFetch.ts";

const PARALLEL_EXTRACT_URL = "https://api.parallel.ai/v1/extract";
const PARALLEL_TIMEOUT_MS = 60_000;
export const PARALLEL_FETCH_MAX_CHARACTERS = 100_000;

/** Upstream error_type values that read like quota/rate signals are reported as "unknown". */
const QUOTA_LIKE_ERROR_TYPE = /rate|limit|capacity|quota|overload|too_many/;
const SAFE_ERROR_TYPE = /^[a-z_]{1,64}$/;

interface ParallelFetchOptions {
  url: string;
  format: WebFetchFormat;
  includeMetadata: boolean;
  credentials: WebFetchCredentials;
}

interface ParallelExtractPage {
  url?: unknown;
  title?: unknown;
  full_content?: unknown;
  excerpts?: unknown;
}

interface ParallelExtractError {
  url?: unknown;
  error_type?: unknown;
  http_status_code?: unknown;
}

function fail(status: number, message: string): WebFetchResult {
  const body = buildErrorBody(status, message);
  return { success: false, status, error: body.error.message };
}

function asObjectArray<T>(value: unknown): T[] {
  return Array.isArray(value)
    ? (value.filter((v) => !!v && typeof v === "object" && !Array.isArray(v)) as T[])
    : [];
}

/** The entry for the requested URL; a lone entry also matches (Extract may normalize the URL). */
function pickForUrl<T extends { url?: unknown }>(entries: T[], url: string): T | undefined {
  return entries.find((e) => e.url === url) ?? (entries.length === 1 ? entries[0] : undefined);
}

function describeTargetFailure(failure: ParallelExtractError): string {
  const rawType = failure.error_type;
  const errorType =
    typeof rawType === "string" &&
    SAFE_ERROR_TYPE.test(rawType) &&
    !QUOTA_LIKE_ERROR_TYPE.test(rawType)
      ? rawType
      : "unknown";
  const targetStatus = Number.isInteger(failure.http_status_code)
    ? String(failure.http_status_code)
    : "unknown";
  return `Parallel could not extract the requested URL (error_type: ${errorType}, target status: ${targetStatus})`;
}

function pageText(page: ParallelExtractPage): string {
  if (typeof page.full_content === "string" && page.full_content.trim()) return page.full_content;
  const excerpts = Array.isArray(page.excerpts)
    ? page.excerpts.filter((e): e is string => typeof e === "string" && e.trim().length > 0)
    : [];
  return excerpts.join("\n\n");
}

async function readUpstreamError(response: Response): Promise<string> {
  const raw = await response.text().catch(() => "");
  let message = "";
  let refId = "";
  try {
    const parsed = JSON.parse(raw) as { error?: { message?: unknown; ref_id?: unknown } };
    if (typeof parsed?.error?.message === "string") message = parsed.error.message;
    if (typeof parsed?.error?.ref_id === "string") refId = parsed.error.ref_id;
  } catch {
    message = raw;
  }
  const detail = `${message || `HTTP ${response.status}`}${refId ? ` (ref_id: ${refId})` : ""}`;
  return sanitizeErrorMessage(`Parallel error ${response.status}: ${detail}`);
}

/**
 * Execute a Parallel Extract request.
 */
export async function parallelFetch(opts: ParallelFetchOptions): Promise<WebFetchResult> {
  const { url, format, includeMetadata, credentials } = opts;

  if (!credentials.apiKey) return fail(401, "Parallel API key required");
  if (format !== "markdown") {
    return fail(
      400,
      `Provider 'parallel-search' only supports format 'markdown', got '${String(format)}'`
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    const err = new Error(`parallel-fetch timeout after ${PARALLEL_TIMEOUT_MS}ms`);
    err.name = "TimeoutError";
    controller.abort(err);
  }, PARALLEL_TIMEOUT_MS);

  try {
    const response = await fetch(PARALLEL_EXTRACT_URL, {
      method: "POST",
      redirect: "error",
      headers: { "Content-Type": "application/json", "x-api-key": credentials.apiKey },
      body: JSON.stringify({
        urls: [url],
        advanced_settings: {
          full_content: { max_chars_per_result: PARALLEL_FETCH_MAX_CHARACTERS },
        },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return fail(response.status, await readUpstreamError(response));
    }

    const payload = ((await response.json()) ?? {}) as { results?: unknown; errors?: unknown };
    const pages = asObjectArray<ParallelExtractPage>(payload.results);
    const failures = asObjectArray<ParallelExtractError>(payload.errors);

    const page = pickForUrl(pages, url);
    const failure = page ? undefined : pickForUrl(failures, url);
    if (failure) return fail(422, describeTargetFailure(failure));

    const raw = page ? pageText(page) : "";
    if (!raw.trim()) return fail(502, "Parallel returned no extractable content");

    const truncated = raw.length > PARALLEL_FETCH_MAX_CHARACTERS;
    const content = truncated ? raw.slice(0, PARALLEL_FETCH_MAX_CHARACTERS) : raw;

    return {
      success: true,
      data: {
        provider: "parallel-search",
        url,
        content,
        links: [],
        metadata: includeMetadata
          ? {
              title: typeof page?.title === "string" && page.title ? page.title : null,
              description: null,
              ...(truncated ? { truncated: true } : {}),
            }
          : null,
        screenshot_url: null,
      },
    };
  } catch (err: unknown) {
    // The abort reason above is named "TimeoutError"; an external abort surfaces as
    // "AbortError". Both must reach the 504 branch.
    if (err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError")) {
      return fail(504, "Parallel request timed out");
    }
    const msg =
      err instanceof Error ? sanitizeErrorMessage(err.message) : sanitizeErrorMessage(String(err));
    return fail(502, msg);
  } finally {
    clearTimeout(timeoutId);
  }
}
