import { z } from "zod";
import { DEEPSEEK_FETCH_URL } from "../config/deepseekSearch.ts";
import { buildErrorBody } from "../utils/error.ts";
import type { WebFetchCredentials, WebFetchFormat, WebFetchResult } from "../handlers/webFetch.ts";

export const DEEPSEEK_FETCH_MAX_CHARACTERS = 100_000;
const responseSchema = z.object({ title: z.string(), content: z.string().trim().min(1) });
interface DeepSeekFetchOptions {
  url: string;
  format: WebFetchFormat;
  includeMetadata: boolean;
  credentials: WebFetchCredentials;
}
function fail(status: number, message: string): WebFetchResult {
  return { success: false, status, error: buildErrorBody(status, message).error.message };
}

export async function deepseekFetch(opts: DeepSeekFetchOptions): Promise<WebFetchResult> {
  if (!opts.credentials.apiKey) return fail(401, "DeepSeek API key required");
  if (opts.format !== "markdown") return fail(400, "DeepSeek Fetch only supports markdown");
  const url = z.string().url().max(8192).safeParse(opts.url);
  if (!url.success) return fail(400, "Invalid DeepSeek Fetch URL");
  const target = new URL(url.data);
  if (!["http:", "https:"].includes(target.protocol) || target.username || target.password) {
    return fail(400, "DeepSeek Fetch requires an HTTP(S) URL without credentials");
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30_000);
  try {
    const response = await fetch(DEEPSEEK_FETCH_URL, {
      method: "POST",
      redirect: "error",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${opts.credentials.apiKey}`,
      },
      body: JSON.stringify({ url: url.data }),
      signal: controller.signal,
    });
    // Fixed errors cannot echo the upstream body, which may contain credentials or page content.
    if (!response.ok)
      return fail(response.status, `DeepSeek Fetch returned HTTP ${response.status}`);
    const parsed = responseSchema.safeParse(await response.json());
    if (!parsed.success) return fail(502, "DeepSeek Fetch returned no usable Markdown content");
    const truncated = parsed.data.content.length > DEEPSEEK_FETCH_MAX_CHARACTERS;
    return {
      success: true,
      data: {
        provider: "deepseek-search",
        url: url.data,
        content: parsed.data.content.slice(0, DEEPSEEK_FETCH_MAX_CHARACTERS),
        links: [],
        metadata: opts.includeMetadata
          ? {
              title: parsed.data.title || null,
              description: null,
              ...(truncated ? { truncated: true } : {}),
            }
          : null,
        screenshot_url: null,
      },
    };
  } catch (error: unknown) {
    return error instanceof Error && ["AbortError", "TimeoutError"].includes(error.name)
      ? fail(504, "DeepSeek Fetch timed out")
      : fail(502, "DeepSeek Fetch request failed");
  } finally {
    clearTimeout(timer);
  }
}
