import { Buffer } from "node:buffer";
import type { AudioProvider } from "../config/audioRegistry.ts";
import { buildAuthHeaders } from "../config/registryUtils.ts";
import { convertToPcm16k, GeminiLiveError } from "../executors/geminiLiveTranscribe.ts";
import { pcmToWav } from "../executors/vertexMedia.ts";
import { buildMultipartBody, getUploadedFileName } from "../utils/audioMultipart.ts";
import { audioErrorResponse, upstreamErrorResponse } from "../utils/audioResponse.ts";
import { CORS_HEADERS } from "../utils/cors.ts";

const MAX_UPLOAD_BYTES = 50_000_000;

export async function handleMiniMaxTranscription(
  provider: AudioProvider,
  file: Blob & { name?: unknown },
  model: string | null,
  token: string | null | undefined,
  form: FormData,
  signal?: AbortSignal | null
): Promise<Response> {
  if (!model) return audioErrorResponse(400, "Missing transcription model");
  if (file.size > MAX_UPLOAD_BYTES)
    return audioErrorResponse(413, "MiniMax ASR accepts files up to 50 MB");
  const language = form.get("language");
  if (
    language &&
    (typeof language !== "string" || !/^[a-z]{2,3}(?:-[a-z0-9]{1,8})*$/i.test(language))
  ) {
    return audioErrorResponse(400, "Invalid transcription language");
  }
  try {
    let upload = file;
    // MediaRecorder can omit the WebM duration; the upstream rejects these clips.
    if (/webm/i.test(file.type) || /\.webm$/i.test(getUploadedFileName(file))) {
      const pcm = await convertToPcm16k(Buffer.from(await file.arrayBuffer()), {
        maxInputBytes: MAX_UPLOAD_BYTES,
        maxPcmBytes: 16_000 * 2 * 500,
        signal: signal ?? undefined,
      });
      upload = new File([pcmToWav(pcm, 16_000)], "recording.wav", { type: "audio/wav" });
    }
    const responseFormat = form.get("response_format");
    const { body, contentType } = await buildMultipartBody(upload, {
      model,
      response_format:
        typeof responseFormat === "string" && responseFormat ? responseFormat : "json",
    });
    const res = await fetch(provider.baseUrl, {
      method: "POST",
      headers: {
        ...buildAuthHeaders(provider, token ?? null),
        "Content-Type": contentType,
        ...(typeof language === "string" && language ? { language } : {}),
      },
      body,
      signal: signal ?? undefined,
      redirect: "error",
    });
    if (!res.ok) return upstreamErrorResponse(res, await res.text());
    return new Response(res.body, {
      headers: {
        ...CORS_HEADERS,
        "Content-Type": res.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    if (error instanceof GeminiLiveError)
      return audioErrorResponse(
        error.status,
        "WebM conversion failed; MiniMax ASR requires ffmpeg for WebM recordings"
      );
    return audioErrorResponse(502, "MiniMax transcription request failed");
  }
}
