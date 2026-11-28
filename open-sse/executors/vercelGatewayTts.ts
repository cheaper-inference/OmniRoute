/**
 * Vercel AI Gateway speech (TTS).
 *
 * The gateway does not serve an OpenAI-shaped `/v1/audio/speech`. Speech uses its own
 * protocol, the one the Vercel AI SDK gateway provider speaks
 * (`packages/gateway/src/gateway-speech-model.ts`):
 *
 *   POST https://ai-gateway.vercel.sh/v4/ai/speech-model
 *   ai-model-id: <creator>/<model>          (e.g. spacexai/grok-tts)
 *   ai-speech-model-specification-version: 4
 *   body  { text, voice?, outputFormat?, instructions?, speed?, language? }
 *   reply { audio: "<base64>", warnings?, usage?, providerMetadata? }
 *
 * The credential is the provider's existing API key connection (Bearer), so speech
 * uses the same Vercel AI Gateway connections as chat.
 */
import { buildAuthHeaders, type BaseProvider } from "../config/registryUtils.ts";
import { CORS_HEADERS } from "../utils/cors.ts";
import { errorResponse } from "../utils/error.ts";
import { audioErrorResponse, upstreamErrorResponse } from "../utils/audioResponse.ts";

export const VERCEL_GATEWAY_PROTOCOL_VERSION = "0.0.1";
export const VERCEL_GATEWAY_SPEECH_SPEC_VERSION = "4";

/** Output formats the gateway accepts as `outputFormat`, with the reply content type. */
export const VERCEL_GATEWAY_SPEECH_CONTENT_TYPES: Record<string, string> = {
  mp3: "audio/mpeg",
  wav: "audio/wav",
  opus: "audio/opus",
  aac: "audio/aac",
  flac: "audio/flac",
  pcm: "audio/pcm",
};

type JsonRecord = Record<string, unknown>;

function nonEmptyString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

/** OpenAI `response_format` → gateway `outputFormat`; `ogg` is the Opus alias (#10587). */
function outputFormatOf(value: unknown): string {
  const format = nonEmptyString(value)?.toLowerCase() ?? "mp3";
  return format === "ogg" ? "opus" : format;
}

/**
 * Map an OpenAI speech body to the gateway speech body. Optional fields are sent only
 * when the caller set them, so the gateway applies the model's own defaults (an
 * OpenAI stock voice such as "alloy" is not substituted for a missing voice).
 */
export function buildVercelGatewaySpeechBody(body: JsonRecord, outputFormat: string): JsonRecord {
  const payload: JsonRecord = { text: body.input, outputFormat };
  const voice = nonEmptyString(body.voice);
  if (voice) payload.voice = voice;
  const instructions = nonEmptyString(body.instructions);
  if (instructions) payload.instructions = instructions;
  if (typeof body.speed === "number" && Number.isFinite(body.speed)) payload.speed = body.speed;
  const language = nonEmptyString(body.language);
  if (language) payload.language = language;
  return payload;
}

function decodeBase64Audio(value: unknown): Uint8Array<ArrayBuffer> | null {
  if (typeof value !== "string" || !value) return null;
  try {
    const binary = atob(value);
    if (!binary) return null;
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
  } catch {
    return null;
  }
}

export async function handleVercelGatewaySpeech(
  providerConfig: BaseProvider,
  body: JsonRecord,
  modelId: string | null,
  token: string | null
): Promise<Response> {
  if (!modelId || !modelId.includes("/")) {
    return errorResponse(
      400,
      "Vercel AI Gateway speech needs a gateway model id such as vercel-ai-gateway/spacexai/grok-tts"
    );
  }
  const outputFormat = outputFormatOf(body.response_format);
  // Own keys only: "constructor" or "__proto__" must not pass as a format.
  const contentType = Object.hasOwn(VERCEL_GATEWAY_SPEECH_CONTENT_TYPES, outputFormat)
    ? VERCEL_GATEWAY_SPEECH_CONTENT_TYPES[outputFormat]
    : undefined;
  if (!contentType) {
    return errorResponse(
      400,
      `Unsupported response_format for Vercel AI Gateway speech: ${outputFormat}. Use one of: ${Object.keys(VERCEL_GATEWAY_SPEECH_CONTENT_TYPES).join(", ")}`
    );
  }

  let res: Response;
  let rawText: string;
  try {
    res = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...buildAuthHeaders(providerConfig, token),
        "ai-gateway-protocol-version": VERCEL_GATEWAY_PROTOCOL_VERSION,
        "ai-gateway-auth-method": "api-key",
        "ai-speech-model-specification-version": VERCEL_GATEWAY_SPEECH_SPEC_VERSION,
        "ai-model-id": modelId,
      },
      body: JSON.stringify(buildVercelGatewaySpeechBody(body, outputFormat)),
    });
    rawText = await res.text();
  } catch {
    // A transport failure is answered here, never thrown past the speech handler.
    return audioErrorResponse(502, "Vercel AI Gateway speech request failed");
  }
  // Keep the upstream status (401/402/403/429 …) so connection health and fallback
  // see the real cause of a failure on one account.
  if (!res.ok) return upstreamErrorResponse(res, rawText);

  let audio: Uint8Array<ArrayBuffer> | null = null;
  try {
    const parsed: unknown = JSON.parse(rawText);
    if (parsed && typeof parsed === "object")
      audio = decodeBase64Audio((parsed as JsonRecord).audio);
  } catch {
    audio = null;
  }
  if (!audio) return errorResponse(502, "Vercel AI Gateway speech returned no valid audio");

  return new Response(audio, {
    status: 200,
    headers: { ...CORS_HEADERS, "Content-Type": contentType },
  });
}
