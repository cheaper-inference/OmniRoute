// Auto-extracted from open-sse/handlers/imageGeneration.ts in PR-#4582-batch
// Family: leonardo | Module: leonardo | Lines: 3427-3558 (132 LOC)
// Ref: see open-sse/handlers/imageGeneration.ts top-of-file comment for split rationale

import { saveCallLog } from "../../imageResult.ts";
import { sleep } from "../../../utils/sleep.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";
import {
  UPSTREAM_MEDIA_LIMITS,
  downloadUpstreamMedia,
  upstreamMediaErrorText,
} from "@/shared/network/remoteImageFetch";

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

/**
 * Output size: explicit `width`/`height` win, then an OpenAI-style `size` ("576x1024"),
 * then 1024 for whatever is still missing.
 */
export function resolveLeonardoImageSize(body: {
  size?: unknown;
  width?: number;
  height?: number;
}): { width: number; height: number } {
  const match = typeof body.size === "string" ? body.size.trim().match(/^(\d+)x(\d+)$/i) : null;
  return {
    width: body.width || (match ? Number(match[1]) : 1024),
    height: body.height || (match ? Number(match[2]) : 1024),
  };
}

export async function handleLeonardoImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
  pollIntervalMs = 5000,
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || "";
  const prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");
  if (log) {
    log.info("IMAGE", `${provider}/${model} (leonardo) | prompt: "${prompt.slice(0, 60)}..."`);
  }
  try {
    const res = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        modelId: resolveLeonardoModelId(model),
        prompt,
        ...resolveLeonardoImageSize(body),
        num_images: 1,
      }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
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
        path: "/v1/images/generations",
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
          let buf: Buffer;
          try {
            ({ buffer: buf } = await downloadUpstreamMedia(imgUrl, UPSTREAM_MEDIA_LIMITS.image));
          } catch (err) {
            return {
              success: false,
              status: 502,
              error: `Failed to download image: ${sanitizeErrorMessage(upstreamMediaErrorText(err))}`,
            };
          }
          saveCallLog({
            method: "POST",
            path: "/v1/images/generations",
            status: 200,
            model: `${provider}/${model}`,
            provider,
            duration: Date.now() - startTime,
          }).catch(() => {});
          return {
            success: true,
            data: {
              created: Math.floor(Date.now() / 1000),
              data: [{ b64_json: buf.toString("base64") }],
            },
          };
        }
      }
      if (gen.status === "FAILED") {
        saveCallLog({
          method: "POST",
          path: "/v1/images/generations",
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
      path: "/v1/images/generations",
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
      path: "/v1/images/generations",
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
