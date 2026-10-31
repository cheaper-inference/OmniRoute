// Auto-extracted from open-sse/handlers/imageGeneration.ts in PR-#4582-batch
// Family: leonardo | Module: leonardo | Lines: 3427-3558 (132 LOC)
// Ref: see open-sse/handlers/imageGeneration.ts top-of-file comment for split rationale

import { saveCallLog } from "@/lib/usageDb";
import { sleep } from "../../../utils/sleep.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";

// Leonardo's v1 API takes a platform-model UUID as `modelId` and answers a catalog id such
// as "phoenix" with HTTP 500 "internal error". UUIDs from GET /api/rest/v1/platformModels.
const LEONARDO_MODEL_IDS: Record<string, string> = {
  phoenix: "de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3", // Phoenix 1.0
  sdxl: "16e7060a-803e-4df3-97ee-edcfa5dc9cc8", // SDXL 1.0
};

/** The catalog id's platform-model UUID; anything else (e.g. a raw UUID) passes through. */
export function resolveLeonardoModelId(model: string | undefined): string {
  const id = model || "phoenix";
  return LEONARDO_MODEL_IDS[id] ?? id;
}

// init_strength (0.1-0.9) is how closely the output follows the edit reference. In a live
// check 0.3 kept the reference's composition and still applied the edit prompt (#18671).
const LEONARDO_EDIT_INIT_STRENGTH = 0.3;

const LEONARDO_INIT_IMAGE_EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/webp": "webp",
};

/**
 * Uploads an edit reference through Leonardo's init-image flow (a presigned S3 form post,
 * which must not carry the Leonardo token) and returns the init image id.
 */
export async function uploadLeonardoInitImage(
  generationsUrl: string,
  token: string,
  image: { bytes: Buffer; mime: string }
): Promise<string> {
  const res = await fetch(generationsUrl.replace(/\/generations$/, "/init-image"), {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ extension: LEONARDO_INIT_IMAGE_EXTENSIONS[image.mime] ?? "png" }),
  });
  if (!res.ok) throw new Error(`Leonardo init-image request failed: HTTP ${res.status}`);
  const { uploadInitImage } = await res.json();
  const form = new FormData();
  for (const [key, value] of Object.entries(JSON.parse(uploadInitImage.fields))) {
    form.append(key, String(value));
  }
  form.append("file", new Blob([new Uint8Array(image.bytes)], { type: image.mime }), "init");
  // Send the multipart body pre-encoded: a FormData body handed to OmniRoute's patched
  // fetch reached S3 as HTTP 412, while the same form as bytes plus its boundary header is
  // accepted (204).
  const encoded = new Response(form);
  const upload = await fetch(uploadInitImage.url, {
    method: "POST",
    headers: { "Content-Type": encoded.headers.get("content-type") || "" },
    body: Buffer.from(await encoded.arrayBuffer()),
  });
  if (!upload.ok) throw new Error(`Leonardo init-image upload failed: HTTP ${upload.status}`);
  return uploadInitImage.id;
}

export async function handleLeonardoImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
  pollIntervalMs = 5000,
  // An edit reference (/v1/images/edits): the generation becomes image-to-image.
  initImage = null,
}) {
  const startTime = Date.now();
  const logPath = initImage ? "/v1/images/edits" : "/v1/images/generations";
  const token = credentials?.apiKey || "";
  const prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");
  if (log) {
    log.info("IMAGE", `${provider}/${model} (leonardo) | prompt: "${prompt.slice(0, 60)}..."`);
  }
  try {
    const initFields = initImage
      ? {
          init_image_id: await uploadLeonardoInitImage(providerConfig.baseUrl, token, initImage),
          init_strength: LEONARDO_EDIT_INIT_STRENGTH,
        }
      : {};
    const res = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        modelId: resolveLeonardoModelId(model),
        prompt,
        width: body.width || 1024,
        height: body.height || 1024,
        num_images: 1,
        ...initFields,
      }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      saveCallLog({
        method: "POST",
        path: logPath,
        status: res.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
      }).catch(() => {});
      return { success: false, status: res.status, error: errorText };
    }
    const { sdGenerationJob } = await res.json();
    const genId = sdGenerationJob?.generationId;
    if (!genId) {
      saveCallLog({
        method: "POST",
        path: logPath,
        status: 502,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: "No generation ID returned",
      }).catch(() => {});
      return { success: false, status: 502, error: "No generation ID returned" };
    }
    const deadline = Date.now() + 300000;
    while (Date.now() < deadline) {
      await sleep(pollIntervalMs);
      const statusRes = await fetch(`${providerConfig.baseUrl}/${genId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const status = await statusRes.json();
      const gen = status.generations_by_pk || status;
      if (gen.status === "COMPLETE") {
        const imgUrl = gen.generated_images?.[0]?.url;
        if (imgUrl) {
          const imgRes = await fetch(imgUrl);
          if (!imgRes.ok) {
            return {
              success: false,
              status: imgRes.status,
              error: `Failed to download image: ${imgRes.status}`,
            };
          }
          const buf = await imgRes.arrayBuffer();
          saveCallLog({
            method: "POST",
            path: logPath,
            status: 200,
            model: `${provider}/${model}`,
            provider,
            duration: Date.now() - startTime,
          }).catch(() => {});
          return {
            success: true,
            data: {
              created: Math.floor(Date.now() / 1000),
              data: [{ b64_json: Buffer.from(buf).toString("base64") }],
            },
          };
        }
      }
      if (gen.status === "FAILED") {
        saveCallLog({
          method: "POST",
          path: logPath,
          status: 502,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
          error: "Leonardo image generation failed",
        }).catch(() => {});
        return { success: false, status: 502, error: "Leonardo image generation failed" };
      }
    }
    saveCallLog({
      method: "POST",
      path: logPath,
      status: 504,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: "Leonardo image generation timed out",
    }).catch(() => {});
    return { success: false, status: 504, error: "Leonardo image generation timed out" };
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} leonardo error: ${err.message}`);
    saveCallLog({
      method: "POST",
      path: logPath,
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: err.message,
    }).catch(() => {});
    return {
      success: false,
      status: 502,
      error: `Image provider error: ${sanitizeErrorMessage((err as Error).message || err)}`,
    };
  }
}
