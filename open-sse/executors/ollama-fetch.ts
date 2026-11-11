/**
 * Ollama Web Fetch Executor
 *
 * Fetches a page through the Ollama Cloud web fetch API (same key as
 * ollama-search / ollama-cloud). POST https://ollama.com/api/web_fetch.
 *
 * The API returns Markdown text and a link list only, so other OmniRoute fetch
 * formats are rejected with 400 before any network call. Content is capped at
 * 200,000 characters. The key only goes to the fixed URL; redirects are refused.
 */

import { sanitizeErrorMessage, buildErrorBody } from "../utils/error.ts";
import type { WebFetchResult, WebFetchFormat, WebFetchCredentials } from "../handlers/webFetch.ts";

const OLLAMA_FETCH_URL = "https://ollama.com/api/web_fetch";
const OLLAMA_TIMEOUT_MS = 30_000;
export const OLLAMA_FETCH_MAX_CHARACTERS = 200_000;

interface OllamaFetchOptions {
  url: string;
  format: WebFetchFormat;
  includeMetadata: boolean;
  credentials: WebFetchCredentials;
}

function fail(status: number, message: string): WebFetchResult {
  return { success: false, status, error: buildErrorBody(status, message).error.message };
}

export async function ollamaFetch(opts: OllamaFetchOptions): Promise<WebFetchResult> {
  const { url, format, includeMetadata, credentials } = opts;

  if (!credentials.apiKey) return fail(401, "Ollama API key required");
  if (format !== "markdown") {
    return fail(
      400,
      `Provider 'ollama-search' only supports format 'markdown', got '${String(format)}'`
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    const err = new Error(`ollama-fetch timeout after ${OLLAMA_TIMEOUT_MS}ms`);
    err.name = "TimeoutError";
    controller.abort(err);
  }, OLLAMA_TIMEOUT_MS);

  try {
    const response = await fetch(OLLAMA_FETCH_URL, {
      method: "POST",
      redirect: "error",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.apiKey}`,
      },
      body: JSON.stringify({ url }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const raw = await response.text().catch(() => `HTTP ${response.status}`);
      return fail(response.status, sanitizeErrorMessage(`Ollama error ${response.status}: ${raw}`));
    }

    const payload = ((await response.json()) ?? {}) as {
      title?: unknown;
      content?: unknown;
      links?: unknown;
    };
    const content = typeof payload.content === "string" ? payload.content : "";
    if (!content.trim()) return fail(502, "Ollama returned no extractable content");

    return {
      success: true,
      data: {
        provider: "ollama-search",
        url,
        content: content.slice(0, OLLAMA_FETCH_MAX_CHARACTERS),
        links: Array.isArray(payload.links)
          ? payload.links.filter((l): l is string => typeof l === "string")
          : [],
        metadata: includeMetadata
          ? { title: typeof payload.title === "string" ? payload.title : null, description: null }
          : null,
        screenshot_url: null,
      },
    };
  } catch (err: unknown) {
    if (err instanceof Error && (err.name === "AbortError" || err.name === "TimeoutError")) {
      return fail(504, "Ollama request timed out");
    }
    return fail(
      502,
      err instanceof Error ? sanitizeErrorMessage(err.message) : sanitizeErrorMessage(String(err))
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
