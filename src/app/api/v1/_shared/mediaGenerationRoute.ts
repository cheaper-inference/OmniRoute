import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";

import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { calculateModalCost } from "@/lib/usage/costCalculator";
import { recordModalCallCost } from "@/domain/costRules";
import {
  attachMediaResponseMeta,
  priceMediaRequest,
  recordMediaRequest,
} from "@/lib/usage/mediaRequestAccounting";
import { generateRequestId } from "@/shared/utils/requestId";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { v1ImageGenerationSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

type MediaModelListEntry = {
  id: string;
  provider: string;
};

type MediaGenerationResult =
  { success: true; data: unknown } | { success: false; error: unknown; status: number };

type MediaGenerationFailure = Extract<MediaGenerationResult, { success: false }>;

export type MediaGenerationResultLike = {
  success: boolean;
  data?: unknown;
  error?: unknown;
  status?: number;
};

export function isMediaGenerationFailure(
  result: MediaGenerationResultLike
): result is MediaGenerationFailure {
  return result.success === false && "error" in result && typeof result.status === "number";
}

type MediaGenerationBody = {
  model: string;
  prompt?: unknown;
  duration?: unknown;
} & Record<string, unknown>;

type ValidatedMediaGenerationBody =
  { state: "ok"; body: MediaGenerationBody } | { state: "invalid"; response: Response };

export function mediaGenerationOptionsResponse() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export function mediaGenerationModelListResponse(
  models: MediaModelListEntry[],
  type: "music" | "video"
) {
  return new Response(
    JSON.stringify({
      object: "list",
      data: models.map((m) => ({
        id: m.id,
        object: "model",
        created: Math.floor(Date.now() / 1000),
        owned_by: m.provider,
        type,
      })),
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function readMediaGenerationBody(
  request: Request,
  log: { warn: (scope: string, message: string) => void },
  logScope: string
): Promise<ValidatedMediaGenerationBody> {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    log.warn(logScope, "Invalid JSON body");
    return {
      state: "invalid",
      response: errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body"),
    };
  }

  const validation = validateBody(v1ImageGenerationSchema, rawBody);
  if (isValidationFailure(validation)) {
    return {
      state: "invalid",
      response: errorResponse(HTTP_STATUS.BAD_REQUEST, validation.error.message),
    };
  }

  return { state: "ok", body: validation.data as MediaGenerationBody };
}

export function promptRequiredResponse(body: { prompt?: unknown }) {
  if (typeof body.prompt === "string" && body.prompt.trim().length > 0) {
    return null;
  }

  return errorResponse(HTTP_STATUS.BAD_REQUEST, "Prompt is required");
}

export async function successfulMediaGenerationResponse({
  result,
  billingMode,
  provider,
  model,
  startTime,
  duration,
  strategy,
  fallbackAttempts,
  apiKeyId,
  musicAccounting,
}: {
  result: { data: unknown };
  billingMode: "audio" | "video";
  provider: string;
  model: string;
  startTime: number;
  duration: unknown;
  // Set by combo execution so the response reports which strategy picked the
  // target and how many earlier targets were skipped. Omitted on the direct
  // single-model path, where neither is meaningful.
  strategy?: string;
  fallbackAttempts?: number;
  /** The caller's API key: the priced call is charged to its dollar budget. */
  apiKeyId?: string | null;
  musicAccounting?: { apiKeyName?: string | null; connectionId?: string | null; usage?: unknown };
}) {
  const seconds = Number(duration) || 0;
  const bill = musicAccounting
    ? await priceMediaRequest({
        provider,
        model,
        unit: "second",
        quantity: seconds > 0 ? seconds : null,
        usage: musicAccounting.usage,
      })
    : null;
  const costUsd = bill
    ? bill.costUsd
    : await calculateModalCost(billingMode, provider, model, { seconds });
  const requestId = generateRequestId();
  if (bill) {
    await recordMediaRequest(
      {
        provider,
        model,
        endpoint: "/v1/music/generations",
        apiKeyId,
        apiKeyName: musicAccounting?.apiKeyName,
        connectionId: musicAccounting?.connectionId,
        startTime,
        requestId,
      },
      bill,
      { enforceUnpricedBudget: false }
    );
  } else {
    recordModalCallCost(apiKeyId, { provider, model, costUsd });
  }

  const headers = new Headers({ "Content-Type": "application/json" });
  const meta = {
    provider,
    model,
    costUsd,
    latencyMs: Date.now() - startTime,
    requestId,
    ...(strategy ? { strategy } : {}),
    ...(fallbackAttempts !== undefined ? { fallbackAttempts } : {}),
  };
  const response = new Response(JSON.stringify(result.data), { status: 200, headers });
  if (bill) return attachMediaResponseMeta(response, meta);
  attachOmniRouteMetaHeaders(response.headers, meta);
  return response;
}

export function failedMediaGenerationResponse(
  result: MediaGenerationResult,
  fallbackMessage: string
) {
  if (!isMediaGenerationFailure(result)) {
    return new Response(JSON.stringify(toJsonErrorPayload(undefined, fallbackMessage)), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const errorPayload = toJsonErrorPayload(result.error, fallbackMessage);
  return new Response(JSON.stringify(errorPayload), {
    status: result.status,
    headers: { "Content-Type": "application/json" },
  });
}
