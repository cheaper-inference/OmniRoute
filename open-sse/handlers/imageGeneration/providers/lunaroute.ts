import { sanitizeErrorMessage } from "../../../utils/error.ts";

export const LUNAROUTE_IMAGE_UPLOAD_URL = "https://gw.lunaroute.com/v1/images/uploads";
export const LUNAROUTE_IMAGE_EDIT_URL = "https://gw.lunaroute.com/v1/images/edits";

interface LunaRouteImageReference {
  bytes: Buffer;
  mime: string;
}

interface LunaRouteImageCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
}

interface LunaRouteImageEditOptions {
  model: string;
  prompt: string;
  images: LunaRouteImageReference[];
  credentials?: LunaRouteImageCredentials | null;
  size?: string | null;
  responseFormat?: string | null;
  options?: Record<string, unknown>;
  signal?: AbortSignal | null;
}

type LunaRouteImageEditResult =
  { success: true; data: unknown } | { success: false; status: number; error: string };

/** Build the authenticated content headers required by LunaRoute's image endpoints. */
function bearerHeaders(token: string, contentType: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": contentType,
  };
}

/** Extract a safe, user-facing error message from a failed LunaRoute response. */
async function upstreamError(response: Response, fallback: string): Promise<string> {
  const text = await response.text().catch(() => "");
  if (!text) return fallback;
  try {
    const parsed = JSON.parse(text) as {
      error?: string | { message?: string };
      message?: string;
    };
    const message =
      typeof parsed.error === "string"
        ? parsed.error
        : typeof parsed.error?.message === "string"
          ? parsed.error.message
          : typeof parsed.message === "string"
            ? parsed.message
            : fallback;
    return sanitizeErrorMessage(message);
  } catch {
    return sanitizeErrorMessage(text);
  }
}

/** Upload one source image and return the LunaRoute-owned image id. */
async function uploadImage(
  image: LunaRouteImageReference,
  token: string,
  signal?: AbortSignal | null
): Promise<{ id: string } | { status: number; error: string }> {
  const response = await fetch(LUNAROUTE_IMAGE_UPLOAD_URL, {
    method: "POST",
    headers: bearerHeaders(token, image.mime || "application/octet-stream"),
    body: new Uint8Array(image.bytes),
    signal: signal ?? undefined,
  });
  if (!response.ok) {
    return {
      status: response.status,
      error: await upstreamError(response, "LunaRoute image upload failed"),
    };
  }

  const payload = (await response.json().catch(() => null)) as { id?: unknown } | null;
  if (typeof payload?.id !== "string" || !payload.id) {
    return { status: 502, error: "LunaRoute image upload returned no image id" };
  }
  return { id: payload.id };
}

/**
 * Execute LunaRoute's stateful edit contract: upload every source image first,
 * then submit the returned ids to `/v1/images/edits`.
 */
export async function handleLunaRouteImageEdit(
  input: LunaRouteImageEditOptions
): Promise<LunaRouteImageEditResult> {
  const token = input.credentials?.apiKey || input.credentials?.accessToken;
  if (!token) return { success: false, status: 401, error: "Missing LunaRoute API key" };
  if (input.images.length === 0) {
    return { success: false, status: 400, error: "LunaRoute image edit requires an image" };
  }

  const imageIds: string[] = [];
  for (const image of input.images) {
    const uploaded = await uploadImage(image, token, input.signal);
    if (!("id" in uploaded)) return { success: false, ...uploaded };
    imageIds.push(uploaded.id);
  }

  const passthrough = input.options ?? {};
  const body: Record<string, unknown> = {
    model: input.model,
    prompt: input.prompt,
    image_ids: imageIds,
  };
  for (const field of ["steps", "guidance", "negative_prompt", "seed", "output_format"] as const) {
    if (passthrough[field] !== undefined) body[field] = passthrough[field];
  }
  if (input.size) body.size = input.size;
  if (input.responseFormat) body.response_format = input.responseFormat;

  const response = await fetch(LUNAROUTE_IMAGE_EDIT_URL, {
    method: "POST",
    headers: bearerHeaders(token, "application/json"),
    body: JSON.stringify(body),
    signal: input.signal ?? undefined,
  });
  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      error: await upstreamError(response, "LunaRoute image edit failed"),
    };
  }

  const data = await response.json().catch(() => null);
  if (data === null) {
    return { success: false, status: 502, error: "LunaRoute image edit returned invalid JSON" };
  }
  return { success: true, data };
}
