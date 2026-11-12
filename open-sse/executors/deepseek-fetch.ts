/**
 * DeepSeek Web Fetch Executor
 *
 * Fetches one page through DeepSeek's own fetch tool and returns its
 * markdown body. POST https://api.deepseek.com/v1/tools/fetch
 *
 * Docs: https://api-docs.deepseek.com/api/fetch
 */

import { sanitizeErrorMessage, buildErrorBody } from "../utils/error.ts";
import type { WebFetchResult, WebFetchFormat, WebFetchCredentials } from "../handlers/webFetch.ts";

const DEEPSEEK_FETCH_URL = "https://api.deepseek.com/v1/tools/fetch";
const DEEPSEEK_TIMEOUT_MS = 30_000;

interface DeepseekFetchOptions {
  url: string;
  format: WebFetchFormat;
  includeMetadata: boolean;
  credentials: WebFetchCredentials;
}

export async function deepseekFetch(opts: DeepseekFetchOptions): Promise<WebFetchResult> {
  const { url, format, includeMetadata, credentials } = opts;

  if (!credentials.apiKey) {
    const body = buildErrorBody(401, "DeepSeek API key required");
    return { success: false, status: 401, error: body.error.message };
  }

  // DeepSeek returns markdown only, so any other format would be a lie.
  if (format !== "markdown") {
    const body = buildErrorBody(
      400,
      `Provider 'deepseek-search' only supports format 'markdown', got '${String(format)}'`
    );
    return { success: false, status: 400, error: body.error.message };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    const err = new Error(`deepseek-fetch timeout after ${DEEPSEEK_TIMEOUT_MS}ms`);
    err.name = "TimeoutError";
    controller.abort(err);
  }, DEEPSEEK_TIMEOUT_MS);

  try {
    const response = await fetch(DEEPSEEK_FETCH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.apiKey}`,
      },
      body: JSON.stringify({ url }),
      signal: controller.signal,
      redirect: "error",
    });

    if (!response.ok) {
      const rawError = await response.text().catch(() => `HTTP ${response.status}`);
      const msg = sanitizeErrorMessage(`DeepSeek error ${response.status}: ${rawError}`);
      const body = buildErrorBody(response.status, msg);
      return { success: false, status: response.status, error: body.error.message };
    }

    const data = (await response.json()) as Record<string, unknown>;
    if (typeof data.content !== "string") {
      const body = buildErrorBody(502, "DeepSeek returned an unexpected response");
      return { success: false, status: 502, error: body.error.message };
    }
    const content = data.content;

    const metadata = includeMetadata
      ? {
          title: data.title != null ? String(data.title) : null,
          description: null,
        }
      : null;

    return {
      success: true,
      data: {
        provider: "deepseek-search",
        url,
        content,
        links: [],
        metadata,
        screenshot_url: null,
      },
    };
  } catch (err: unknown) {
    // The abort reason above is named "TimeoutError"; an external abort surfaces as
    // "AbortError". Both must reach the 504 branch.
    if (err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError")) {
      const body = buildErrorBody(504, "DeepSeek request timed out");
      return { success: false, status: 504, error: body.error.message };
    }
    const msg =
      err instanceof Error ? sanitizeErrorMessage(err.message) : sanitizeErrorMessage(String(err));
    const body = buildErrorBody(502, msg);
    return { success: false, status: 502, error: body.error.message };
  } finally {
    clearTimeout(timeoutId);
  }
}
