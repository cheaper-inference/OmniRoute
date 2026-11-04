import { sanitizeErrorMessage } from "../../../utils/error.ts";
import { geminiInlineImagePart, geminiReferenceImageError } from "./geminiInline.ts";

/**
 * Google AI Studio (Gemini API key) native image generation — `gemini` image provider,
 * `gemini-ai-image` format. Unlike the Antigravity `gemini-image` path (OAuth against Cloud
 * Code), an AI Studio key authenticates with `x-goog-api-key` against the public
 * `generativelanguage.googleapis.com` `:generateContent` endpoint. The response carries the
 * same Gemini `inlineData` parts, exposed through the OpenAI image envelope.
 */

/** Gemini image models answer one candidate per call, so `n` fans out (bounded). */
export const GEMINI_AI_IMAGE_MAX_N = 4;

/**
 * App-side helpers injected by the image dispatcher (`open-sse/handlers/imageGeneration.ts`),
 * so this provider adds no open-sse → src imports (boundary ratchet).
 */
export interface GeminiAiImageDeps {
  saveCallLog: (entry: Record<string, unknown>) => Promise<unknown>;
  saveErrorResult: (args: {
    provider: string;
    model: string;
    status: number;
    startTime: number;
    error: unknown;
    requestBody?: unknown;
  }) => { success: boolean; status: number; error: unknown };
  sanitizeProviderError: (errorText: string) => unknown;
  fetchWithTimeout: (url: string, init: RequestInit & { timeoutMs?: number }) => Promise<Response>;
  isTimeoutError: (err: unknown) => boolean;
  timeoutMs: number;
}

interface GeminiAiImageArgs {
  model: string;
  providerConfig: { baseUrl?: string };
  body: Record<string, unknown>;
  credentials?: { apiKey?: unknown } | null;
  aspectRatio: string;
  signal?: AbortSignal | null;
  log?: { warn?: (tag: string, message: string) => void } | null;
  deps: GeminiAiImageDeps;
}

type GeminiAiImage = { b64_json: string; revised_prompt?: string };
// Structural rather than a discriminated union: open-sse compiles with `strict: false`, where
// a `true`/`false` literal widens to boolean and cannot narrow a union.
type GeminiAiCallResult = {
  ok: boolean;
  images?: GeminiAiImage[];
  status?: number;
  error?: unknown;
};

const PROVIDER = "gemini";

function requestedImageCount(n: unknown): number {
  return typeof n === "number" && Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** Collect every inlineData image from a generateContent response. */
export function extractGeminiInlineImages(payload: unknown, promptText: string): GeminiAiImage[] {
  const candidates = (payload as { candidates?: unknown })?.candidates;
  if (!Array.isArray(candidates)) return [];
  const images: GeminiAiImage[] = [];
  for (const candidate of candidates) {
    const parts = candidate?.content?.parts;
    if (!Array.isArray(parts)) continue;
    const textPart = parts.find((part) => typeof part?.text === "string");
    const revisedPrompt = textPart?.text || promptText;
    for (const part of parts) {
      const inline = part?.inlineData || part?.inline_data;
      if (typeof inline?.data === "string" && inline.data) {
        images.push({ b64_json: inline.data, revised_prompt: revisedPrompt });
      }
    }
  }
  return images;
}

async function requestOneImage(
  url: string,
  apiKey: string,
  requestBody: unknown,
  promptText: string,
  signal: AbortSignal | null | undefined,
  deps: GeminiAiImageDeps
): Promise<GeminiAiCallResult> {
  let response: Response;
  try {
    response = await deps.fetchWithTimeout(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify(requestBody),
      timeoutMs: deps.timeoutMs,
      ...(signal ? { signal } : {}),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      status: deps.isTimeoutError(err) ? 504 : 502,
      error: `Gemini AI Studio request failed: ${sanitizeErrorMessage(message)}`,
    };
  }
  const text = await response.text().catch(() => "");
  if (!response.ok) {
    return { ok: false, status: response.status, error: deps.sanitizeProviderError(text) };
  }
  return { ok: true, images: extractGeminiInlineImages(parseJson(text), promptText) };
}

export async function handleGeminiAiImageGeneration({
  model,
  providerConfig,
  body,
  credentials,
  aspectRatio,
  signal,
  log,
  deps,
}: GeminiAiImageArgs) {
  const startTime = Date.now();
  const apiKey = typeof credentials?.apiKey === "string" ? credentials.apiKey.trim() : "";
  const promptText = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");
  const requested = requestedImageCount(body.n);
  const count = Math.min(requested, GEMINI_AI_IMAGE_MAX_N);
  if (requested > count) {
    log?.warn?.("IMAGE", `gemini/${model}: n=${requested} clamped to ${count}`);
  }
  const logRequestBody = {
    model,
    prompt: promptText.slice(0, 200),
    aspect_ratio: aspectRatio,
    n: count,
  };

  if (!apiKey) {
    return deps.saveErrorResult({
      provider: PROVIDER,
      model,
      status: 401,
      startTime,
      error: "Gemini AI Studio API key is required",
      requestBody: logRequestBody,
    });
  }

  const referenceError = geminiReferenceImageError(body);
  if (referenceError) {
    return deps.saveErrorResult({
      provider: PROVIDER,
      model,
      status: 400,
      startTime,
      error: referenceError,
      requestBody: logRequestBody,
    });
  }

  const baseUrl = String(providerConfig.baseUrl || "").replace(/\/+$/, "");
  const url = `${baseUrl}/${model}:generateContent`;
  const inlineImage = geminiInlineImagePart(body);
  // No `candidateCount`: Gemini image models reject values above 1.
  const requestBody = {
    contents: [
      { role: "user", parts: [...(inlineImage ? [inlineImage] : []), { text: promptText }] },
    ],
    generationConfig: { responseModalities: ["TEXT", "IMAGE"], imageConfig: { aspectRatio } },
  };

  const results = await Promise.all(
    Array.from({ length: count }, () =>
      requestOneImage(url, apiKey, requestBody, promptText, signal, deps)
    )
  );
  const images = results.flatMap((result) => (result.ok ? (result.images ?? []) : []));

  if (images.length === 0) {
    const failure = results.find((result) => !result.ok);
    return deps.saveErrorResult({
      provider: PROVIDER,
      model,
      status: failure?.status ?? 502,
      startTime,
      error: failure?.error ?? "Gemini AI Studio returned no image data",
      requestBody: logRequestBody,
    });
  }

  deps
    .saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 200,
      model: `${PROVIDER}/${model}`,
      provider: PROVIDER,
      duration: Date.now() - startTime,
      requestBody: logRequestBody,
      responseBody: { images_count: images.length },
    })
    .catch(() => {});

  return { success: true, data: { created: Math.floor(Date.now() / 1000), data: images } };
}
