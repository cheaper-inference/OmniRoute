import { MUSE_CODE_INFERENCE_USER_AGENT, normalizeMuseBaseUrl } from "../../../config/museCode.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";
import { toBlobBytes } from "../../imageUpscale/shared.ts";

/**
 * Muse Image (Meta Model API) — OpenAI-compatible image generation and edits on the
 * muse-code connection. A request carrying a reference image (`imageBytes` from
 * /v1/images/edits, or `image` / `images` as data URL, raw base64 or https URL) goes to
 * /images/edits as multipart; otherwise /images/generations as JSON. Output is base64
 * or a signed URL; a signed URL is downloaded when the caller asked for `b64_json`.
 */

/**
 * App-side helpers (call log, SSRF-guarded image fetch, timed fetch) injected by the image
 * dispatcher (`open-sse/handlers/imageGeneration.ts`), so this provider adds no
 * open-sse → src imports (boundary ratchet).
 */
export interface MuseImageDeps {
  saveCallLog: (entry: Record<string, unknown>) => Promise<unknown>;
  fetchRemoteImage: (
    url: string,
    opts: { signal?: AbortSignal }
  ) => Promise<{ buffer: Buffer; contentType?: string | null }>;
  fetchWithTimeout: (url: string, init: RequestInit) => Promise<Response>;
  isTimeoutError: (err: unknown) => boolean;
}

interface MuseImageArgs {
  model: string;
  provider: string;
  body: Record<string, unknown>;
  credentials?: {
    apiKey?: string;
    accessToken?: string;
    providerSpecificData?: Record<string, unknown> | null;
  } | null;
  signal?: AbortSignal | null;
  log?: { error?: (tag: string, message: string) => void } | null;
  deps: MuseImageDeps;
}

interface ImagePart {
  bytes: Buffer;
  mime: string;
}

interface MuseImageEntry {
  b64_json?: string;
  url?: string;
  revised_prompt?: string;
}

class ReferenceImageError extends Error {}

const DATA_URL_PATTERN = /^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i;

/** Minted connections carry Meta's base_url; manual overrides may point at a chat path. */
function resolveMuseImagesBase(credentials: MuseImageArgs["credentials"]): string {
  const raw = credentials?.providerSpecificData?.baseUrl;
  const base = normalizeMuseBaseUrl(typeof raw === "string" ? raw : null);
  return base.replace(/\/(?:responses|chat\/completions)$/, "");
}

async function toImagePart(
  value: unknown,
  deps: MuseImageDeps,
  signal?: AbortSignal | null
): Promise<ImagePart> {
  if (typeof value !== "string" || !value.trim()) {
    throw new ReferenceImageError("Unsupported reference image input");
  }
  const trimmed = value.trim();
  const dataUrl = DATA_URL_PATTERN.exec(trimmed);
  if (dataUrl) return { mime: dataUrl[1].toLowerCase(), bytes: Buffer.from(dataUrl[2], "base64") };
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const remote = await deps.fetchRemoteImage(trimmed, { signal: signal ?? undefined });
      return { bytes: remote.buffer, mime: remote.contentType || "image/png" };
    } catch (err) {
      throw new ReferenceImageError(
        `Reference image could not be loaded: ${sanitizeErrorMessage(err)}`
      );
    }
  }
  return { mime: "image/png", bytes: Buffer.from(trimmed, "base64") };
}

async function collectImageParts(
  body: Record<string, unknown>,
  deps: MuseImageDeps,
  signal?: AbortSignal | null
): Promise<ImagePart[]> {
  const parts: ImagePart[] = [];
  const bytes = body.imageBytes;
  if (bytes instanceof Uint8Array && bytes.length > 0) {
    parts.push({
      bytes: Buffer.from(bytes),
      mime: typeof body.imageMime === "string" && body.imageMime ? body.imageMime : "image/png",
    });
  }
  const inputs = [
    ...(Array.isArray(body.images) ? body.images : []),
    ...(body.image !== undefined && body.image !== null ? [body.image] : []),
  ].filter(Boolean);
  for (const input of inputs) parts.push(await toImagePart(input, deps, signal));
  return parts;
}

function normalizeEntries(data: unknown): MuseImageEntry[] {
  if (!Array.isArray(data)) return [];
  return data
    .map((item): MuseImageEntry | null => {
      if (typeof item === "string") {
        return /^https?:\/\//i.test(item) ? { url: item } : { b64_json: item };
      }
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const entry: MuseImageEntry = {};
      if (typeof record.b64_json === "string" && record.b64_json) entry.b64_json = record.b64_json;
      if (typeof record.url === "string" && record.url) entry.url = record.url;
      if (typeof record.revised_prompt === "string") entry.revised_prompt = record.revised_prompt;
      return entry.b64_json || entry.url ? entry : null;
    })
    .filter((entry): entry is MuseImageEntry => entry !== null);
}

function upstreamErrorMessage(payload: unknown, status: number): string {
  const error = (payload as { error?: unknown } | null)?.error;
  if (typeof error === "string" && error) return error;
  const message = (error as { message?: unknown } | null | undefined)?.message;
  if (typeof message === "string" && message) return message;
  return `Muse Image API returned HTTP ${status}`;
}

interface MuseRequestOptions {
  n: number;
  size?: string;
  responseFormat?: "url" | "b64_json";
}

interface MuseRequest {
  path: string;
  url: string;
  headers: Record<string, string>;
  requestBody: string | FormData;
}

function readRequestOptions(body: Record<string, unknown>): MuseRequestOptions {
  const n = typeof body.n === "number" && Number.isInteger(body.n) && body.n > 0 ? body.n : 1;
  const size = typeof body.size === "string" && body.size ? body.size : undefined;
  const responseFormat =
    body.response_format === "url" || body.response_format === "b64_json"
      ? body.response_format
      : undefined;
  return { n, size, responseFormat };
}

function buildEditsForm(
  model: string,
  prompt: string,
  options: MuseRequestOptions,
  parts: ImagePart[]
): FormData {
  // FormData sets its own multipart boundary — never set Content-Type manually.
  const form = new FormData();
  form.append("model", model);
  form.append("prompt", prompt);
  form.append("n", String(options.n));
  if (options.size) form.append("size", options.size);
  if (options.responseFormat) form.append("response_format", options.responseFormat);
  parts.forEach((part, index) => {
    const ext = part.mime.split("/")[1] || "png";
    form.append(
      "image",
      new Blob([toBlobBytes(part.bytes)], { type: part.mime }),
      `image-${index}.${ext}`
    );
  });
  return form;
}

function buildMuseRequest(
  base: string,
  token: string,
  model: string,
  prompt: string,
  options: MuseRequestOptions,
  parts: ImagePart[]
): MuseRequest {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "User-Agent": MUSE_CODE_INFERENCE_USER_AGENT,
  };
  if (parts.length > 0) {
    return {
      path: "/v1/images/edits",
      url: `${base}/images/edits`,
      headers,
      requestBody: buildEditsForm(model, prompt, options, parts),
    };
  }
  headers["Content-Type"] = "application/json";
  return {
    path: "/v1/images/generations",
    url: `${base}/images/generations`,
    headers,
    requestBody: JSON.stringify({
      model,
      prompt,
      n: options.n,
      ...(options.size ? { size: options.size } : {}),
      ...(options.responseFormat ? { response_format: options.responseFormat } : {}),
    }),
  };
}

/** Download signed URLs into base64 when the caller asked for `b64_json`. */
async function inlineSignedUrls(
  images: MuseImageEntry[],
  deps: MuseImageDeps,
  signal?: AbortSignal | null
): Promise<void> {
  for (const entry of images) {
    if (entry.b64_json || !entry.url) continue;
    const remote = await deps.fetchRemoteImage(entry.url, { signal: signal ?? undefined });
    entry.b64_json = remote.buffer.toString("base64");
    delete entry.url;
  }
}

type MuseFail = (
  status: number,
  message: unknown
) => { success: false; status: number; error: string };

async function sendMuseRequest(
  request: MuseRequest,
  options: MuseRequestOptions,
  deps: MuseImageDeps,
  signal: AbortSignal | null | undefined,
  fail: MuseFail
) {
  const response = await deps.fetchWithTimeout(request.url, {
    method: "POST",
    headers: request.headers,
    body: request.requestBody,
    signal,
    redirect: "error",
  });
  const text = await response.text();
  let payload: unknown = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    return fail(response.ok ? 502 : response.status, "Invalid response from Muse Image API");
  }
  if (!response.ok) return fail(response.status, upstreamErrorMessage(payload, response.status));

  const images = normalizeEntries((payload as { data?: unknown } | null)?.data);
  if (!images.length) return fail(502, "No images returned from Muse Image");
  if (options.responseFormat === "b64_json") await inlineSignedUrls(images, deps, signal);
  const created = (payload as { created?: unknown }).created;
  return {
    success: true as const,
    data: {
      created: typeof created === "number" ? created : Math.floor(Date.now() / 1000),
      data: images,
    },
  };
}

export async function handleMuseImageGeneration({
  model,
  provider,
  body,
  credentials,
  signal,
  log,
  deps,
}: MuseImageArgs) {
  const startTime = Date.now();
  let path = "/v1/images/generations";
  const logCall = (entry: Record<string, unknown>) => {
    deps
      .saveCallLog({
        method: "POST",
        path,
        provider,
        model: `${provider}/${model}`,
        duration: Date.now() - startTime,
        ...entry,
      })
      .catch((err: unknown) => log?.error?.("IMAGE", sanitizeErrorMessage(err)));
  };
  const fail: MuseFail = (status, message) => {
    const error = sanitizeErrorMessage(message);
    log?.error?.("IMAGE", `Muse Image: ${error}`);
    logCall({ status, error });
    return { success: false as const, status, error };
  };

  const token = credentials?.apiKey || credentials?.accessToken;
  if (!token) return fail(401, "Muse Code API key is required for Muse Image");
  const prompt = typeof body.prompt === "string" ? body.prompt : "";
  if (!prompt.trim()) return fail(400, "Missing required field: prompt");

  let parts: ImagePart[];
  try {
    parts = await collectImageParts(body, deps, signal);
  } catch (err) {
    return fail(400, err instanceof ReferenceImageError ? err.message : err);
  }

  const options = readRequestOptions(body);
  const request = buildMuseRequest(
    resolveMuseImagesBase(credentials),
    token,
    model,
    prompt,
    options,
    parts
  );
  path = request.path;

  try {
    const result = await sendMuseRequest(request, options, deps, signal, fail);
    if (result.success) {
      logCall({
        status: 200,
        requestBody: { model, n: options.n, size: options.size, reference_images: parts.length },
        responseBody: { images_count: result.data.data.length },
      });
    }
    return result;
  } catch (err: unknown) {
    return fail(deps.isTimeoutError(err) ? 504 : 502, err);
  }
}
