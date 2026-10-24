/**
 * Keenable Web Fetch Executor
 *
 * Fetches a URL as Markdown through the Keenable fetch API (same optional key as
 * keenable-search).
 *   keyless: GET https://api.keenable.ai/v1/fetch/public?url=<url>
 *   keyed:   GET https://api.keenable.ai/v1/fetch?url=<url> with `X-API-Key`
 * Both carry `X-Keenable-Title: OmniRoute`. The key only lifts the keyless
 * per-IP rate limits. Response: `{ url, title, content, description }` with
 * `content` as Markdown.
 *
 * Markdown only, so other OmniRoute fetch formats are rejected with 400 before
 * any network call. Content is capped at 100,000 characters.
 *
 * The key only ever goes to the fixed Keenable host and redirects are refused.
 * Docs: https://docs.keenable.ai/api-reference
 */

import { sanitizeErrorMessage, buildErrorBody } from "../utils/error.ts";
import {
  KEENABLE_API_BASE,
  KEENABLE_APP_TITLE,
  KEENABLE_TITLE_HEADER,
} from "../config/keenable.ts";
import type { WebFetchResult, WebFetchFormat, WebFetchCredentials } from "../handlers/webFetch.ts";

const KEENABLE_TIMEOUT_MS = 30_000;
export const KEENABLE_FETCH_MAX_CHARACTERS = 100_000;

interface KeenableFetchOptions {
  url: string;
  format: WebFetchFormat;
  includeMetadata: boolean;
  credentials: WebFetchCredentials;
}

function fail(status: number, message: string): WebFetchResult {
  const body = buildErrorBody(status, message);
  return { success: false, status, error: body.error.message };
}

async function readUpstreamError(response: Response): Promise<string> {
  const raw = await response.text().catch(() => "");
  let message = "";
  try {
    const parsed = JSON.parse(raw) as { message?: unknown; error?: unknown };
    if (typeof parsed?.message === "string") message = parsed.message;
    else if (typeof parsed?.error === "string") message = parsed.error;
  } catch {
    message = raw;
  }
  return sanitizeErrorMessage(
    `Keenable error ${response.status}: ${message || `HTTP ${response.status}`}`
  );
}

const nonEmptyString = (value: unknown): string | null =>
  typeof value === "string" && value.trim().length > 0 ? value : null;

/**
 * Execute a Keenable fetch request. Works without credentials (keyless tier).
 */
export async function keenableFetch(opts: KeenableFetchOptions): Promise<WebFetchResult> {
  const { url, format, includeMetadata, credentials } = opts;

  if (format !== "markdown") {
    return fail(
      400,
      `Provider 'keenable-search' only supports format 'markdown', got '${String(format)}'`
    );
  }

  const apiKey = credentials.apiKey;
  const endpoint = `${KEENABLE_API_BASE}/v1/fetch${apiKey ? "" : "/public"}`;
  const qp = new URLSearchParams({ url });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    const err = new Error(`keenable-fetch timeout after ${KEENABLE_TIMEOUT_MS}ms`);
    err.name = "TimeoutError";
    controller.abort(err);
  }, KEENABLE_TIMEOUT_MS);

  try {
    const response = await fetch(`${endpoint}?${qp}`, {
      method: "GET",
      redirect: "error",
      headers: {
        Accept: "application/json",
        [KEENABLE_TITLE_HEADER]: KEENABLE_APP_TITLE,
        ...(apiKey ? { "X-API-Key": apiKey } : {}),
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      return fail(response.status, await readUpstreamError(response));
    }

    const payload = ((await response.json()) ?? {}) as Record<string, unknown>;
    const raw = typeof payload.content === "string" ? payload.content : "";
    if (!raw.trim()) return fail(502, "Keenable returned no extractable content");

    const truncated = raw.length > KEENABLE_FETCH_MAX_CHARACTERS;
    const content = truncated ? raw.slice(0, KEENABLE_FETCH_MAX_CHARACTERS) : raw;

    return {
      success: true,
      data: {
        provider: "keenable-search",
        url,
        content,
        links: [],
        metadata: includeMetadata
          ? {
              title: nonEmptyString(payload.title),
              description: nonEmptyString(payload.description),
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
      return fail(504, "Keenable request timed out");
    }
    const msg =
      err instanceof Error ? sanitizeErrorMessage(err.message) : sanitizeErrorMessage(String(err));
    return fail(502, msg);
  } finally {
    clearTimeout(timeoutId);
  }
}
