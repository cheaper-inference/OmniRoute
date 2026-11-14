/**
 * Image input (vision) for Microsoft 365 Copilot.
 *
 * The web client uploads a pasted image to `/m365Copilot/UploadFile`, keyed to the conversation,
 * and points the chat message at the returned `docId` with an `ImageFile` message annotation.
 * Nothing else is needed on the turn: no GPT-V option sets, with or without a declarative agent.
 * The same chat access token authorizes the upload.
 */
import { randomUUID } from "node:crypto";
import { fetchUntrustedRemoteImage } from "../../utils/remoteMediaFetch.ts";
import { sniffCursorImageFormat } from "../../utils/cursorImages.ts";
import { M365ExecutorError } from "../m365ExecutorOutput.ts";

/** Local bounds: Copilot's own limits are not documented, so these keep a request reasonable. */
export const M365_MAX_IMAGES = 10;
export const M365_MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const M365_MAX_TOTAL_IMAGE_BYTES = 40 * 1024 * 1024;
const UPLOAD_TIMEOUT_MS = 60_000;
const UPLOAD_SCENARIO = "OfficeWebIncludedCopilot";
const UPLOAD_OPTION_SETS = ["cwcgptvsan", "flux_v3_gptv_enable_upload_multi_image_in_turn_wo_ch"];
const DATA_URL = /^data:image\/(?:png|jpe?g|gif|webp);base64,/i;

type ImageFormat = "png" | "jpeg" | "gif" | "webp";

/** An image ready to upload: its bytes as a data URL of the sniffed format. */
export interface M365Image {
  dataUrl: string;
  fileType: "png" | "jpg" | "gif" | "webp";
  bytes: number;
}

/** The message annotation that attaches an uploaded image to a chat message. */
export interface M365ImageAnnotation {
  id: string;
  messageAnnotationType: "ImageFile";
  messageAnnotationMetadata: {
    "@type": "File";
    annotationType: "File";
    fileType: string;
    fileName: string;
  };
}

/** Swappable `fetch` for the upload request (tests only); resolved per call, never bound early. */
let uploadFetch: typeof fetch = (input, init) => fetch(input, init);
/** Replace the upload `fetch` for a test; returns a function restoring the previous one. */
export function __setM365UploadFetchForTesting(impl: typeof fetch): () => void {
  const previous = uploadFetch;
  uploadFetch = impl;
  return () => {
    uploadFetch = previous;
  };
}

const record = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

/**
 * The image reference of a message content part, or null for any other part. Accepts the Chat
 * Completions shape (`image_url: { url }` or a bare string) and the Responses `input_image`.
 */
export function m365ImagePartRef(part: unknown): string | null {
  const value = record(part);
  if (value.type !== "image_url" && value.type !== "input_image") return null;
  const image = value.image_url;
  const ref = typeof image === "string" ? image : record(image).url;
  if (typeof ref !== "string" || !ref)
    throw new M365ExecutorError(400, "m365_image_invalid", "An image part has no image URL.");
  return ref;
}

const invalidImage = (message: string) => new M365ExecutorError(400, "m365_image_invalid", message);

/** Decode a base64 image data URL, refusing anything that does not round-trip exactly. */
function decodeDataUrl(ref: string): Buffer {
  const comma = ref.indexOf(",");
  const payload = ref.slice(comma + 1);
  if (
    !DATA_URL.test(ref) ||
    !payload ||
    payload.length > Math.ceil(M365_MAX_IMAGE_BYTES / 3) * 4 ||
    !/^[A-Za-z0-9+/]*={0,2}$/.test(payload)
  )
    throw invalidImage("Expected a base64 PNG, JPEG, GIF or WebP image of at most 10 MiB.");
  const data = Buffer.from(payload, "base64");
  if (data.toString("base64").replace(/=+$/, "") !== payload.replace(/=+$/, ""))
    throw invalidImage("The image data URL is not valid base64.");
  return data;
}

/** Fetch an image from a caller-supplied public HTTPS URL (SSRF-guarded, size-bounded). */
async function fetchImageUrl(ref: string, signal?: AbortSignal): Promise<Buffer> {
  if (!ref.startsWith("https://")) throw invalidImage("Image URLs must be data URLs or HTTPS.");
  try {
    const result = await fetchUntrustedRemoteImage(ref, {
      enforceHttps: true,
      maxBytes: M365_MAX_IMAGE_BYTES,
      signal,
    });
    return result.buffer;
  } catch (error) {
    if (signal?.aborted) throw error;
    throw invalidImage("Could not fetch the image from a public HTTPS URL.");
  }
}

/**
 * Resolve an image reference (data URL or public HTTPS URL) to bytes of a format Copilot
 * accepts, sniffed from the bytes themselves rather than trusted from the declared type.
 */
export async function resolveM365Image(ref: string, signal?: AbortSignal): Promise<M365Image> {
  const data = ref.startsWith("data:") ? decodeDataUrl(ref) : await fetchImageUrl(ref, signal);
  const format: ImageFormat | undefined = sniffCursorImageFormat(data);
  if (!format || data.length === 0 || data.length > M365_MAX_IMAGE_BYTES)
    throw invalidImage("Expected a PNG, JPEG, GIF or WebP image of at most 10 MiB.");
  return {
    dataUrl: `data:image/${format};base64,${data.toString("base64")}`,
    fileType: format === "jpeg" ? "jpg" : format,
    bytes: data.length,
  };
}

/**
 * Resolves each distinct image reference once per request, enforcing the per-request image
 * count and total size. Turns that re-send images (a fresh-conversation retry) reuse the bytes.
 */
export class M365ImageResolver {
  private readonly resolved = new Map<string, Promise<M365Image>>();
  private total = 0;

  constructor(private readonly signal?: AbortSignal) {}

  /** The resolved images for these references, in order. */
  async resolve(refs: readonly string[]): Promise<M365Image[]> {
    const images: M365Image[] = [];
    for (const ref of refs) {
      let pending = this.resolved.get(ref);
      if (!pending) {
        if (this.resolved.size >= M365_MAX_IMAGES)
          throw invalidImage(`Microsoft 365 Copilot accepts at most ${M365_MAX_IMAGES} images.`);
        pending = resolveM365Image(ref, this.signal).then((image) => {
          this.total += image.bytes;
          if (this.total > M365_MAX_TOTAL_IMAGE_BYTES)
            throw invalidImage("The images exceed the 40 MiB request limit.");
          return image;
        });
        this.resolved.set(ref, pending);
      }
      images.push(await pending);
    }
    return images;
  }
}

/** The public error for an `UploadFile` response that is not a usable upload. */
function uploadFailure(status: number): M365ExecutorError {
  if (status === 401)
    return new M365ExecutorError(
      401,
      "m365_image_upload_unauthorized",
      "Microsoft 365 Copilot refused the image upload credentials. Reconnect this account."
    );
  if (status === 429)
    return new M365ExecutorError(
      429,
      "m365_throttled",
      "Microsoft 365 Copilot is throttling this account. Retry later."
    );
  if (status === 400 || status === 413 || status === 415)
    return new M365ExecutorError(
      400,
      "m365_image_rejected",
      "Microsoft 365 Copilot rejected the image."
    );
  return new M365ExecutorError(
    502,
    "m365_image_upload_failed",
    "Microsoft 365 Copilot image upload failed."
  );
}

/** Inputs for one image upload. */
export interface M365ImageUpload {
  host: string;
  accessToken: string;
  conversationId: string;
  image: M365Image;
  signal?: AbortSignal;
}

/**
 * Upload one image into a conversation and return the annotation that attaches it to the
 * conversation's next chat message. Fails closed: an image Copilot did not receive is an error,
 * never a turn that goes ahead without it.
 */
export async function uploadM365Image(upload: M365ImageUpload): Promise<M365ImageAnnotation> {
  const form = new URLSearchParams({
    scenario: "UploadImage",
    conversationId: upload.conversationId,
    FileBase64: upload.image.dataUrl,
  });
  for (const option of UPLOAD_OPTION_SETS) form.append("optionsSets", option);
  const timeout = AbortSignal.timeout(UPLOAD_TIMEOUT_MS);
  const signal = upload.signal ? AbortSignal.any([upload.signal, timeout]) : timeout;
  let response: Response;
  try {
    response = await uploadFetch(`https://${upload.host}/m365Copilot/UploadFile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${upload.accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Scenario": UPLOAD_SCENARIO,
        "X-Variants": "feature.EnableImageSupportInUploadFile",
        Origin: "https://m365.cloud.microsoft",
        Referer: "https://m365.cloud.microsoft/",
      },
      body: form,
      signal,
    });
  } catch (error) {
    if (upload.signal?.aborted) throw error;
    throw uploadFailure(502);
  }
  if (!response.ok) {
    await response.body?.cancel();
    throw uploadFailure(response.status);
  }
  let docId: unknown;
  try {
    docId = record(await response.json()).docId;
  } catch {
    docId = undefined;
  }
  if (typeof docId !== "string" || !docId || docId.length > 512) throw uploadFailure(502);
  const { fileType } = upload.image;
  return {
    id: docId,
    messageAnnotationType: "ImageFile",
    messageAnnotationMetadata: {
      "@type": "File",
      annotationType: "File",
      fileType,
      fileName: `image-${randomUUID().slice(0, 8)}.${fileType}`,
    },
  };
}
