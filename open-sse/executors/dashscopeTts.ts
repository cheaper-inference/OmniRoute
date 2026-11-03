/**
 * DashScope SpeechSynthesizer TTS (Qwen Cloud Token Plan — `qwen-audio-3.0-tts-plus`).
 *
 * POST {model, input:{text, voice}, parameters:{format, sample_rate}} → JSON. A non-streaming
 * call usually leaves `output.audio.data` empty and returns an expiring `output.audio.url`
 * instead; failures arrive as `{ code, message }`, sometimes with HTTP 200.
 *
 * The result URL is upstream-supplied, so it is downloaded through the SSRF-hardened
 * `fetchRemoteMedia` (public-only guard + DNS pinning), never a bare `fetch`.
 */
import { resolveAlibabaProviderMediaBaseUrl } from "../handlers/videoGeneration/dashscopeHandler.ts";
import { fetchRemoteMedia } from "../utils/chatgptWebAttachments.ts";
import { CORS_HEADERS } from "../utils/cors.ts";
import { errorResponse } from "../utils/error.ts";
import { upstreamErrorResponse } from "../utils/audioResponse.ts";

const SPEECH_SYNTHESIZER_PATH = "/services/audio/tts/SpeechSynthesizer";
/** Flagship Token Plan voice; `longanlufeng` is the other published one. */
export const DASHSCOPE_TTS_DEFAULT_VOICE = "longanlingxin";
const DASHSCOPE_TTS_MAX_AUDIO_BYTES = 50 * 1024 * 1024;

type JsonRecord = Record<string, unknown>;

interface DashscopeTtsProviderConfig {
  id: string;
  credentialProviderId?: string;
  baseUrl: string;
}

interface DashscopeTtsCredentials {
  providerSpecificData?: unknown;
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function resolveSpeechSynthesizerUrl(
  providerConfig: DashscopeTtsProviderConfig,
  credentials: DashscopeTtsCredentials | null | undefined
): string {
  const mediaBaseUrl = resolveAlibabaProviderMediaBaseUrl(
    providerConfig.credentialProviderId || providerConfig.id,
    credentials?.providerSpecificData,
    providerConfig.baseUrl
  );
  return mediaBaseUrl.endsWith(SPEECH_SYNTHESIZER_PATH)
    ? mediaBaseUrl
    : `${mediaBaseUrl}${SPEECH_SYNTHESIZER_PATH}`;
}

function audioResponse(audio: Uint8Array<ArrayBuffer>): Response {
  return new Response(audio, {
    status: 200,
    headers: { ...CORS_HEADERS, "Content-Type": "audio/mpeg" },
  });
}

export async function handleDashscopeTtsSpeech(
  providerConfig: DashscopeTtsProviderConfig,
  body: { input?: unknown; voice?: unknown },
  modelId: string,
  token: string,
  credentials?: DashscopeTtsCredentials | null
): Promise<Response> {
  const voice =
    typeof body.voice === "string" && body.voice.trim()
      ? body.voice.trim()
      : DASHSCOPE_TTS_DEFAULT_VOICE;

  const res = await fetch(resolveSpeechSynthesizerUrl(providerConfig, credentials), {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      model: modelId,
      input: { text: body.input, voice },
      parameters: { format: "mp3", sample_rate: 24000 },
    }),
  });
  if (!res.ok) return upstreamErrorResponse(res, await res.text());

  const data = asRecord(await res.json().catch(() => null));
  if (data.code) {
    const message = typeof data.message === "string" && data.message ? data.message : data.code;
    return errorResponse(502, `DashScope TTS error: ${String(message)}`);
  }

  const audio = asRecord(asRecord(data.output).audio);
  if (typeof audio.data === "string" && audio.data) {
    return audioResponse(Buffer.from(audio.data, "base64"));
  }
  if (typeof audio.url !== "string" || !audio.url) {
    return errorResponse(502, "DashScope TTS returned no audio");
  }

  try {
    const { buffer } = await fetchRemoteMedia(audio.url, {
      guard: "public-only",
      pinDns: true,
      maxBytes: DASHSCOPE_TTS_MAX_AUDIO_BYTES,
    });
    return audioResponse(buffer);
  } catch (err) {
    return errorResponse(
      502,
      `DashScope TTS audio download failed: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}
