/**
 * POST /v1/decisions — native Gemini Decisions endpoint.
 * CORS, bounded JSON, validation and caller-key scope remain at the HTTP edge;
 * credential rotation and Google transport are handled in open-sse/handlers.
 */
import { CORS_HEADERS } from "@/shared/utils/cors";
import { enforceClientApiRouteAuth } from "@/shared/utils/clientApiRouteAuth";
import { enforceApiKeyPolicyWithScope } from "@/app/api/v1/_shared/keyScopedRoute";
import { getSpecialtyModelsResponse } from "@/app/api/v1/_shared/specialtyCatalog";
import {
  geminiDecisionsSchema, GEMINI_DECISION_MODEL, GEMINI_DECISION_PUBLIC_MODEL,
  MAX_DECISIONS_REQUEST_BYTES,
} from "@/shared/validation/schemas/geminiDecisions";
import { handleGeminiDecisionRequest } from "@omniroute/open-sse/handlers/geminiDecisionWorkflow.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { recordUnpricedBudgetUsage } from "@/domain/costRules";
import { recordKeyQuotaUsage } from "@/domain/keyQuota";
import { recordTokenUsage } from "@omniroute/open-sse/services/tokenLimitCounter.ts";

export const dynamic = "force-dynamic";

async function parseBoundedJson(request: Request): Promise<unknown> {
  const length = Number(request.headers.get("content-length") || "0");
  if (length > MAX_DECISIONS_REQUEST_BYTES) throw new Error("payload_too_large");
  if (!request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_DECISIONS_REQUEST_BYTES) throw new Error("payload_too_large");
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    headers: {
      ...CORS_HEADERS,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

export async function GET(request: Request): Promise<Response> {
  return getSpecialtyModelsResponse(request, "/v1/decisions", (entry) =>
    entry.id === GEMINI_DECISION_PUBLIC_MODEL || entry.id === GEMINI_DECISION_MODEL);
}

export async function POST(request: Request): Promise<Response> {
  const authFailure = await enforceClientApiRouteAuth(request);
  if (authFailure) return authFailure;
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return errorResponse(415, "Content-Type must be application/json");
  }

  let raw: unknown;
  try {
    raw = await parseBoundedJson(request);
  } catch (error) {
    return errorResponse(
      error instanceof Error && error.message === "payload_too_large" ? 413 : 400,
      error instanceof Error && error.message === "payload_too_large"
        ? "Decisions request body exceeds size limit" : "Invalid JSON body"
    );
  }
  const parsed = geminiDecisionsSchema.safeParse(raw);
  if (!parsed.success) {
    return errorResponse(400, parsed.error.issues[0]?.message || "Invalid Decisions request");
  }
  // Both accepted names dispatch to this exact Gemini provider/model.
  // Authorize the canonical target so a bare alias cannot bypass a
  // provider-qualified blockedModels rule (for example "gemini/*").
  const scope = await enforceApiKeyPolicyWithScope(request, GEMINI_DECISION_PUBLIC_MODEL);
  if (scope.rejection) return scope.rejection;
  const apiKeyId = scope.policy.apiKeyInfo?.id ?? null;
  return handleGeminiDecisionRequest(
    parsed.data, scope.allowedConnections, request.signal,
    (tokens, startedAt) => {
      if (!apiKeyId) return;
      recordKeyQuotaUsage(apiKeyId, tokens);
      recordTokenUsage(apiKeyId, "gemini", GEMINI_DECISION_PUBLIC_MODEL, tokens, startedAt);
      // Google Decisions has no verified USD price. A limited metered budget
      // must not silently treat the inference as a free $0 call.
      recordUnpricedBudgetUsage(apiKeyId, {
        provider: "gemini", model: GEMINI_DECISION_PUBLIC_MODEL,
      });
    }
  );
}
