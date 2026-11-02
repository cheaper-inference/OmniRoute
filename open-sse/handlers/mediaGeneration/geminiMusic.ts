/**
 * Gemini music generation handler (format: "gemini-lyria").
 *
 * Lyria 3 is served by the Gemini API (`generativelanguage.googleapis.com`) with
 * the same `x-goog-api-key` credential as the `gemini` chat provider — but its
 * music contract is neither of the two Lyria paths this repo already had:
 *
 * - `vertex-lyria` uses `:predict` and returns `predictions[0].bytesBase64Encoded`
 *   (WAV). Vertex only publishes Lyria 2.
 * - the chat path returns the track as a `content[]` part typed `image_url`, which
 *   is a chat-response shape, not a music payload.
 *
 * Here the model is reached with `:generateContent` and answers with an inline
 * audio part (`inlineData.mimeType` `audio/mpeg`) next to a few bracket token
 * strings (`<instrumental>`, `[[A0]]`) that carry no lyric content. Only the audio
 * part is kept, and the result is normalized to the same
 * `data: [{ b64_json, format }]` payload every other music branch returns.
 *
 * No `generationConfig` is sent: these models default to audio output, and pinning
 * `responseModalities` is what the chat path does *not* do — an audio-only pin
 * returns text only.
 */

import { saveCallLog } from "@/lib/usageDb";
import { extractInlineAudio } from "../../executors/vertexMedia.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

interface GeminiMusicProviderConfig {
  baseUrl: string;
}

interface GeminiMusicCredentials {
  apiKey?: unknown;
  accessToken?: unknown;
}

interface GeminiMusicLog {
  info?: (scope: string, message: string) => void;
  error?: (scope: string, message: string) => void;
}

interface GeminiMusicArgs {
  model: string;
  provider: string;
  providerConfig: GeminiMusicProviderConfig;
  body: Record<string, unknown>;
  credentials?: GeminiMusicCredentials | null;
  log?: GeminiMusicLog | null;
}

/** Containers the response can come back in, keyed by the inline part's mime type. */
const MIME_TO_FORMAT: Record<string, string> = {
  "audio/mpeg": "mp3",
  "audio/mp3": "mp3",
  "audio/wav": "wav",
  "audio/x-wav": "wav",
  "audio/wave": "wav",
  "audio/ogg": "ogg",
  "audio/flac": "flac",
  "audio/aac": "aac",
  "audio/mp4": "m4a",
  "audio/webm": "webm",
};

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function resolveFormat(mimeType: string): string {
  const base = mimeType.split(";")[0]?.trim().toLowerCase() ?? "";
  return MIME_TO_FORMAT[base] ?? "mp3";
}

function logGeminiMusicCall(params: {
  status: number;
  model: string;
  provider: string;
  duration: number;
  error?: string;
  responseBody?: unknown;
}): void {
  saveCallLog({
    method: "POST",
    path: "/v1/music/generations",
    ...params,
  }).catch(() => {});
}

export async function handleGeminiMusicGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}: GeminiMusicArgs) {
  const startTime = Date.now();
  const apiKey = stringValue(credentials?.apiKey);
  const accessToken = stringValue(credentials?.accessToken);
  if (!apiKey && !accessToken) {
    return { success: false as const, status: 401, error: "Gemini API key is required" };
  }

  const prompt = stringValue(body.prompt) ?? String(body.prompt ?? "");
  const modelLabel = `${provider}/${model}`;
  const url = `${providerConfig.baseUrl.replace(/\/$/, "")}/${encodeURIComponent(
    model
  )}:generateContent`;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (apiKey) headers["x-goog-api-key"] = apiKey;
  else headers.Authorization = `Bearer ${accessToken}`;

  log?.info?.("MUSIC", `${modelLabel} (gemini-lyria) | prompt: "${prompt.slice(0, 60)}..."`);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      log?.error?.("MUSIC", `${modelLabel} gemini-lyria error (${response.status})`);
      logGeminiMusicCall({
        status: response.status,
        model: modelLabel,
        provider,
        duration: Date.now() - startTime,
        error: detail.slice(0, 500),
      });
      return {
        success: false as const,
        status: response.status,
        error: sanitizeErrorMessage(detail) || `Gemini music upstream error (${response.status})`,
      };
    }

    const inline = extractInlineAudio(await response.json());
    if (!inline) {
      logGeminiMusicCall({
        status: 502,
        model: modelLabel,
        provider,
        duration: Date.now() - startTime,
        error: "Gemini Lyria returned no audio content",
      });
      return {
        success: false as const,
        status: 502,
        error: "Gemini Lyria returned no audio content",
      };
    }

    logGeminiMusicCall({
      status: 200,
      model: modelLabel,
      provider,
      duration: Date.now() - startTime,
      responseBody: { audio_count: 1 },
    });

    return {
      success: true as const,
      data: {
        created: Math.floor(Date.now() / 1000),
        data: [{ b64_json: inline.base64, format: resolveFormat(inline.mimeType) }],
      },
    };
  } catch (err) {
    const message = sanitizeErrorMessage(err) || "Gemini music generation failed";
    log?.error?.("MUSIC", `${modelLabel} gemini-lyria failed: ${message}`);
    logGeminiMusicCall({
      status: 502,
      model: modelLabel,
      provider,
      duration: Date.now() - startTime,
      error: message,
    });
    return { success: false as const, status: 502, error: message };
  }
}
