// #2482: MiniMax Text-to-Image provider handler.
// MiniMax's image_generation endpoint is synchronous (unlike its video/music
// endpoints, which are task-based and polled) and returns image URLs directly
// in `data.image_urls`. This normalizes that response into the OpenAI-compatible
// images payload the rest of the handler expects.

import {
  MINIMAX_H3_MODELS,
  MINIMAX_H3_GLOBAL_URL,
  MINIMAX_H3_TIMEOUT_MS,
} from "../../../config/providers/registry/minimax/imageModels.ts";
import { saveCallLog } from "../../imageResult.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";

interface MinimaxImageGenArgs {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string };
  body: {
    prompt?: string;
    size?: string;
    n?: number;
    response_format?: string;
    aspect_ratio?: string;
    area?: string;
    output_format?: string;
    output_compression?: number;
    disable_prompt_enhanced?: boolean;
    stream?: boolean;
  };
  credentials: { apiKey?: string; accessToken?: string };
  log?: {
    info?: (tag: string, msg: string) => void;
    error?: (tag: string, msg: string) => void;
  } | null;
}

interface MinimaxCallLogParams {
  status: number;
  model: string;
  provider: string;
  duration: number;
  error?: string;
  requestBody?: unknown;
  responseBody?: unknown;
}

const MINIMAX_ASPECT_RATIOS = new Set(["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3"]);

function mapMinimaxAspectRatio(size?: string): string {
  if (size && MINIMAX_ASPECT_RATIOS.has(size)) return size;
  return "1:1";
}

/** Fire-and-forget usage log for a MiniMax image-generation call. */
function logMinimaxCall(params: MinimaxCallLogParams): void {
  saveCallLog({
    method: "POST",
    path: "/v1/images/generations",
    ...params,
  }).catch(() => {});
}

/** Builds the upstream MiniMax request body from the OpenAI-shaped input body. */
function buildMinimaxUpstreamBody(
  model: string,
  prompt: string,
  body: MinimaxImageGenArgs["body"]
) {
  return {
    model: model || "image-01",
    prompt,
    aspect_ratio: mapMinimaxAspectRatio(body.size),
    n: body.n ?? 1,
    response_format: "url",
  };
}

/** Handles a non-2xx MiniMax response: logs, records the call, and shapes the error result. */
async function handleMinimaxUpstreamError(
  response: Response,
  ctx: {
    provider: string;
    model: string;
    startTime: number;
    upstreamBody: unknown;
    log?: MinimaxImageGenArgs["log"];
  }
) {
  const errorText = await response.text();
  ctx.log?.error?.("IMAGE", `${ctx.provider} error ${response.status}: ${errorText.slice(0, 200)}`);

  logMinimaxCall({
    status: response.status,
    model: `${ctx.provider}/${ctx.model}`,
    provider: ctx.provider,
    duration: Date.now() - ctx.startTime,
    error: errorText.slice(0, 500),
    requestBody: ctx.upstreamBody,
  });

  return { success: false as const, status: response.status, error: errorText };
}

/** Extracts and validates the `image_urls` array from a MiniMax response payload. */
function extractMinimaxImageUrls(data: unknown): unknown[] {
  const record = data as { data?: { image_urls?: unknown } } | undefined;
  return Array.isArray(record?.data?.image_urls) ? (record?.data?.image_urls as unknown[]) : [];
}

interface MinimaxResultCtx {
  provider: string;
  model: string;
  startTime: number;
}

/** MiniMax returned 2xx but no images — logs and shapes the empty-result error. */
function buildMinimaxNoImagesResult(data: unknown, ctx: MinimaxResultCtx, itemError?: string) {
  const record = data as { base_resp?: { status_msg?: string } } | undefined;
  const errorMsg = itemError || record?.base_resp?.status_msg || "No images returned from MiniMax";
  logMinimaxCall({
    status: 502,
    model: `${ctx.provider}/${ctx.model}`,
    provider: ctx.provider,
    duration: Date.now() - ctx.startTime,
    error: errorMsg,
  });
  return { success: false as const, status: 502, error: errorMsg };
}

/** MiniMax returned images — logs and shapes the OpenAI-compatible success result. */
function buildMinimaxSuccessResult(imageUrls: unknown[], prompt: string, ctx: MinimaxResultCtx) {
  const images = imageUrls.map((url) => ({ url, revised_prompt: prompt }));

  logMinimaxCall({
    status: 200,
    model: `${ctx.provider}/${ctx.model}`,
    provider: ctx.provider,
    duration: Date.now() - ctx.startTime,
    responseBody: { images_count: images.length },
  });

  return {
    success: true as const,
    data: { created: Math.floor(Date.now() / 1000), data: images },
  };
}

/** Network/parse failure reaching MiniMax — logs and shapes the sanitized error result. */
function buildMinimaxFetchErrorResult(
  err: unknown,
  ctx: MinimaxResultCtx & { log?: MinimaxImageGenArgs["log"] }
) {
  const errMsg = err instanceof Error ? err.message : String(err);
  ctx.log?.error?.("IMAGE", `${ctx.provider} fetch error: ${errMsg}`);

  logMinimaxCall({
    status: 502,
    model: `${ctx.provider}/${ctx.model}`,
    provider: ctx.provider,
    duration: Date.now() - ctx.startTime,
    error: errMsg,
  });

  return {
    success: false as const,
    status: 502,
    error: `Image provider error: ${sanitizeErrorMessage(errMsg)}`,
  };
}

function buildH3RequestBody(model: string, body: MinimaxImageGenArgs["body"]) {
  const { prompt, size, n, response_format, area, output_format, disable_prompt_enhanced } = body;
  // The image playground uses ratio strings in its size selector.
  const ratioSize = typeof size === "string" && /^\d+:\d+$/.test(size);
  return {
    model,
    prompt,
    n,
    size: ratioSize ? undefined : size,
    aspect_ratio: body.aspect_ratio ?? (ratioSize ? size : undefined),
    area,
    response_format,
    output_format,
    disable_prompt_enhanced,
    output_compression: body.output_compression,
  };
}

// OmniRoute's image route sends a JSON response. H3 returns each image or moderation
// error in its original position, including the revised prompt and output dimensions.
async function handleH3Generation(args: MinimaxImageGenArgs, startTime: number) {
  const { model, body, provider, credentials } = args;
  const ctx = { provider, model, startTime };
  if (body.stream)
    return {
      success: false as const,
      status: 400,
      error: "Streaming is unavailable on this image route",
    };
  const upstreamBody = buildH3RequestBody(model, body);
  const url = provider === "minimax-cn" ? args.providerConfig.baseUrl : MINIMAX_H3_GLOBAL_URL;
  try {
    const response = await fetch(url, {
      method: "POST",
      redirect: "error",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.apiKey || credentials.accessToken || ""}`,
      },
      body: JSON.stringify(upstreamBody),
      signal: AbortSignal.timeout(MINIMAX_H3_TIMEOUT_MS),
    });
    if (!response.ok)
      return handleMinimaxUpstreamError(response, { ...ctx, upstreamBody, log: args.log });
    const data = await response.json();
    const images = Array.isArray(data?.data) ? data.data : [];
    const count = images.filter(
      (item: { url?: string; b64_json?: string } | null) => item?.url || item?.b64_json
    ).length;
    if (!count) return buildMinimaxNoImagesResult(data, ctx, images[0]?.error?.message);
    logMinimaxCall({
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { images_count: count },
    });
    return { success: true as const, data };
  } catch (err) {
    return buildMinimaxFetchErrorResult(err, { ...ctx, log: args.log });
  }
}

export async function handleMinimaxImageGeneration(args: MinimaxImageGenArgs) {
  const { model, provider, providerConfig, body, credentials, log } = args;
  const startTime = Date.now();
  if (MINIMAX_H3_MODELS.some((entry) => entry.id === model))
    return handleH3Generation(args, startTime);
  if (provider === "minimax-cn")
    return { success: false as const, status: 400, error: "Unknown MiniMax China image model" };
  const token = credentials?.apiKey || credentials?.accessToken || "";
  const prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");
  const upstreamBody = buildMinimaxUpstreamBody(model, prompt, body);

  log?.info?.(
    "IMAGE",
    `${provider}/${model} (minimax-image) | prompt: "${prompt.slice(0, 60)}..." | aspect_ratio: ${upstreamBody.aspect_ratio}`
  );

  try {
    const response = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(upstreamBody),
    });

    if (!response.ok) {
      return handleMinimaxUpstreamError(response, {
        provider,
        model,
        startTime,
        upstreamBody,
        log,
      });
    }

    const data = await response.json();
    const imageUrls = extractMinimaxImageUrls(data);
    const ctx: MinimaxResultCtx = { provider, model, startTime };

    if (imageUrls.length === 0) {
      return buildMinimaxNoImagesResult(data, ctx);
    }

    return buildMinimaxSuccessResult(imageUrls, prompt, ctx);
  } catch (err: unknown) {
    return buildMinimaxFetchErrorResult(err, { provider, model, startTime, log });
  }
}
