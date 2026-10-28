/**
 * SYNTX.ai (unofficial) video generation — POST /api/v1/video/generate.
 */
import { saveCallLog } from "@/lib/usageDb";
import { sanitizeErrorMessage } from "../../utils/error.ts";
import {
  SyntxMediaError,
  decodeDataUrlBounded,
  fetchSyntxMediaBytes,
  firstMediaUrl,
  mapSyntxVideoRequestSettings,
  resolveSyntxMediaTarget,
  resolveSyntxToken,
  runSyntxVideoGeneration,
  uploadSyntxMediaFile,
} from "../../services/syntxMedia.ts";
import { looksLikeJwt } from "../../services/syntxAuth.ts";

function collectUrls(value: unknown): string[] {
  if (typeof value === "string" && value.trim()) return [value.trim()];
  if (Array.isArray(value)) {
    return value.flatMap((item) => collectUrls(item));
  }
  return [];
}

async function resolveVideoDataUrlRef(
  token: string,
  ref: string,
  fetchImpl: typeof fetch
): Promise<string | null> {
  const decoded = decodeDataUrlBounded(ref);
  if (!decoded) return null;
  const ext = decoded.mime.startsWith("video/")
    ? "mp4"
    : decoded.mime.includes("jpeg")
      ? "jpg"
      : "png";
  return uploadSyntxMediaFile({
    token,
    bytes: decoded.bytes,
    filename: `frame.${ext}`,
    mimeType: decoded.mime,
    fetchImpl,
  });
}

async function uploadVideoRefs(
  token: string,
  body: Record<string, unknown>,
  fetchImpl: typeof fetch
): Promise<string[]> {
  const rawFiles = [
    ...collectUrls(body.image),
    ...collectUrls(body.image_url),
    ...collectUrls(body.image_urls),
    ...collectUrls(body.file_urls),
  ];
  const fileUrls: string[] = [];
  for (const ref of rawFiles) {
    if (ref.startsWith("data:")) {
      const url = await resolveVideoDataUrlRef(token, ref, fetchImpl);
      if (url) fileUrls.push(url);
    } else if (/^https?:\/\//i.test(ref)) {
      fileUrls.push(ref);
    }
  }
  return fileUrls;
}

async function runSyntxVideoJob(options: {
  token: string;
  model: string;
  provider: string;
  body: Record<string, unknown>;
  prompt: string;
  startTime: number;
  log?: { info?: (...args: unknown[]) => void; error?: (...args: unknown[]) => void };
  fetchImpl: typeof fetch;
  signal?: AbortSignal | null;
}) {
  const fileUrls = await uploadVideoRefs(options.token, options.body, options.fetchImpl);
  const { aiName, modelType } = resolveSyntxMediaTarget(options.model, "video");
  const settings = mapSyntxVideoRequestSettings(aiName, modelType, options.body);
  const result = await runSyntxVideoGeneration({
    token: options.token,
    model: options.model,
    prompt: options.prompt,
    settings,
    fileUrls: fileUrls.length > 0 ? fileUrls : undefined,
    audioUrl: typeof options.body.audio_url === "string" ? options.body.audio_url : undefined,
    timeoutMs: typeof options.body.timeout_ms === "number" ? options.body.timeout_ms : undefined,
    fetchImpl: options.fetchImpl,
  });
  const url = firstMediaUrl(result, "video") || result.media[0]?.url;
  if (!url) {
    return {
      success: false,
      status: 502,
      error: "SYNTX video generation completed without a video URL",
    };
  }
  const wantsBase64 = String(options.body.response_format || "").toLowerCase() === "b64_json";
  const item = wantsBase64
    ? {
        b64_json: (
          await fetchSyntxMediaBytes(url, options.fetchImpl, {
            signal: options.signal,
          })
        ).bytes.toString("base64"),
        format: "mp4",
      }
    : { url, format: "mp4" };
  saveCallLog({
    method: "POST",
    path: "/v1/videos/generations",
    status: 200,
    model: `${options.provider}/${options.model}`,
    provider: options.provider,
    duration: Date.now() - options.startTime,
  }).catch(() => {});
  options.log?.info?.("VIDEO", `SYNTX generated video via ${options.model}`);
  return { success: true, data: { created: Math.floor(Date.now() / 1000), data: [item] } };
}

export async function handleSyntxVideoGeneration({
  model,
  provider,
  body,
  credentials,
  log,
  fetchImpl = fetch,
  signal = null,
}: {
  model: string;
  provider: string;
  providerConfig?: { baseUrl?: string };
  body: Record<string, unknown>;
  credentials: {
    apiKey?: string;
    accessToken?: string;
    providerSpecificData?: unknown;
  };
  log?: { info?: (...args: unknown[]) => void; error?: (...args: unknown[]) => void };
  fetchImpl?: typeof fetch;
  signal?: AbortSignal | null;
}) {
  const startTime = Date.now();
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) {
    return { success: false, status: 400, error: "Prompt is required for SYNTX video generation" };
  }
  const token = resolveSyntxToken({
    apiKey: credentials?.apiKey,
    accessToken: credentials?.accessToken,
    providerSpecificData: credentials?.providerSpecificData,
  });
  if (!looksLikeJwt(token)) {
    return {
      success: false,
      status: 401,
      error: "Missing SYNTX JWT — paste the Authorization Bearer token from syntx.ai",
    };
  }

  try {
    return await runSyntxVideoJob({
      token,
      model,
      provider,
      body,
      prompt,
      startTime,
      log,
      fetchImpl,
      signal,
    });
  } catch (error) {
    const status = error instanceof SyntxMediaError ? error.status : 502;
    const message = sanitizeErrorMessage(error instanceof Error ? error.message : error);
    log?.error?.("VIDEO", `SYNTX video generation failed: ${message}`);
    return { success: false, status, error: message || "SYNTX video generation failed" };
  }
}
