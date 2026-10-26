import { elevenLabsMusicSchema } from "@/shared/validation/schemas/elevenlabs";
import { sanitizeErrorMessage } from "../../utils/error.ts";

interface ElevenLabsMusicArgs {
  model: string;
  body: Record<string, unknown>;
  credentials?: { apiKey?: string; accessToken?: string } | null;
}

const NATIVE_FIELDS = [
  "prompt",
  "composition_plan",
  "seed",
  "finetune_id",
  "respect_sections_durations",
  "store_for_inpainting",
  "sign_with_c2pa",
] as const;

/** Map the unified route's fields onto ElevenLabs' native music body. */
function buildNativeMusicBody(model: string, body: Record<string, unknown>) {
  const nativeBody: Record<string, unknown> = {
    model_id: model,
    music_length_ms:
      body.music_length_ms ??
      (typeof body.duration === "number" ? body.duration * 1000 : undefined),
    force_instrumental: body.force_instrumental ?? body.instrumental,
  };
  for (const field of NATIVE_FIELDS) {
    if (body[field] !== undefined) nativeBody[field] = body[field];
  }
  return nativeBody;
}

async function upstreamErrorMessage(response: Response): Promise<string> {
  const payload: unknown = await response.json().catch(() => null);
  const detail = (payload as { detail?: { message?: unknown } } | null)?.detail;
  return typeof detail?.message === "string"
    ? detail.message
    : `ElevenLabs music generation failed (${response.status})`;
}

/** Normalize native binary music to the unified route's base64 JSON contract. */
export async function handleElevenLabsMusicGeneration({
  model,
  body,
  credentials,
}: ElevenLabsMusicArgs) {
  const apiKey = credentials?.apiKey || credentials?.accessToken;
  if (!apiKey) {
    return { success: false as const, status: 401, error: "ElevenLabs API key is required" };
  }
  if (body.stream === true) {
    return {
      success: false as const,
      status: 400,
      error: "Use POST /v1/music/stream for native ElevenLabs audio streaming",
    };
  }
  const parsed = elevenLabsMusicSchema.safeParse(buildNativeMusicBody(model, body));
  if (!parsed.success) {
    return { success: false as const, status: 400, error: parsed.error.issues[0].message };
  }
  const outputFormat = body.output_format ?? "mp3_44100_128";
  if (typeof outputFormat !== "string") {
    return { success: false as const, status: 400, error: "output_format must be a string" };
  }
  const endpoint = new URL("https://api.elevenlabs.io/v1/music");
  endpoint.searchParams.set("output_format", outputFormat);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "xi-api-key": apiKey },
      body: JSON.stringify(parsed.data),
    });
    if (!response.ok) {
      return {
        success: false as const,
        status: response.status,
        error: sanitizeErrorMessage(await upstreamErrorMessage(response)),
      };
    }
    const contentType = response.headers.get("content-type")?.split(";")[0];
    const formats: Record<string, string> = {
      "audio/mpeg": "mp3",
      "audio/mp3": "mp3",
      "audio/wav": "wav",
      "audio/x-wav": "wav",
      "audio/pcm": "pcm",
      "audio/ogg": "ogg",
      "audio/flac": "flac",
    };
    const format = formats[contentType ?? ""] ?? outputFormat.split("_")[0];
    if (
      contentType &&
      !contentType.startsWith("audio/") &&
      contentType !== "application/octet-stream"
    ) {
      return {
        success: false as const,
        status: 502,
        error: "ElevenLabs returned a non-audio response",
      };
    }
    const audio = Buffer.from(await response.arrayBuffer());
    if (audio.length === 0) {
      return { success: false as const, status: 502, error: "ElevenLabs returned empty audio" };
    }
    return {
      success: true as const,
      data: {
        created: Math.floor(Date.now() / 1000),
        data: [{ b64_json: audio.toString("base64"), format }],
      },
    };
  } catch (error) {
    return {
      success: false as const,
      status: 502,
      error: sanitizeErrorMessage(
        error instanceof Error ? error.message : "ElevenLabs request failed"
      ),
    };
  }
}
