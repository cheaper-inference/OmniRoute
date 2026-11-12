/**
 * POST /v1/decisions — Google Gemini Decision 1 native Decisions API.
 * This is intentionally not routed through generateContent or System One.
 */
import { CORS_HEADERS } from "@/shared/utils/cors";
import { enforceClientApiRouteAuth } from "@/shared/utils/clientApiRouteAuth";
import { enforceApiKeyPolicyWithScope, unusableCredentialsResponse } from "@/app/api/v1/_shared/keyScopedRoute";
import { getSpecialtyModelsResponse } from "@/app/api/v1/_shared/specialtyCatalog";
import {
  getProviderCredentialsWithQuotaPreflight,
  markAccountUnavailable,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { geminiDecisionsSchema, GEMINI_DECISION_MODEL, GEMINI_DECISION_PUBLIC_MODEL,
  MAX_DECISIONS_REQUEST_BYTES } from "@/shared/validation/schemas/geminiDecisions";
import {
  executeGeminiDecision, geminiDecisionErrorText, geminiDecisionInputTokens,
} from "@omniroute/open-sse/handlers/geminiDecisions.ts";
import { errorResponse, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { saveCallLog } from "@/lib/usageDb";
import { generateRequestId } from "@/shared/utils/requestId";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { OMNIROUTE_RESPONSE_HEADERS } from "@/shared/constants/headers";

export const dynamic = "force-dynamic";
const PROVIDER = "gemini";
const MAX_UPSTREAM_ATTEMPTS = 4;
const MAX_CREDENTIAL_SELECTIONS = 16;
const TOTAL_DEADLINE_MS = 45_000;

type Credential = {
  apiKey?: string | null;
  connectionId?: string | null;
  projectId?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
};

function projectIdOf(credentials: Credential): string | null {
  const data = credentials.providerSpecificData;
  const possible = credentials.projectId || data?.googleProjectId || data?.projectId;
  return typeof possible === "string" && possible.trim() ? possible.trim() : null;
}

function jsonSuccess(body: Record<string, unknown>, duration: number, attempts: number): Response {
  const headers = new Headers({ ...CORS_HEADERS, "Content-Type": "application/json" });
  attachOmniRouteMetaHeaders(headers, {
    provider: PROVIDER,
    model: GEMINI_DECISION_MODEL,
    usage: { input: geminiDecisionInputTokens(body), output: 0 },
    latencyMs: duration,
    requestId: generateRequestId(),
  });
  // Google reports token counts, not a dollar charge. Never advertise a false $0 cost.
  headers.delete(OMNIROUTE_RESPONSE_HEADERS.responseCost);
  headers.set("X-OmniRoute-Decisions-Attempts", String(attempts));
  return new Response(JSON.stringify(body), { status: 200, headers });
}

function logAttempt(
  status: number, credentials: Credential, duration: number, body: Record<string, unknown> | null,
  error: string | null
): void {
  void saveCallLog({
    method: "POST",
    path: "/v1/decisions",
    status,
    model: GEMINI_DECISION_PUBLIC_MODEL,
    provider: PROVIDER,
    duration,
    connectionId: credentials.connectionId || null,
    tokens: { prompt_tokens: geminiDecisionInputTokens(body), completion_tokens: 0 },
    ...(error ? { error: sanitizeErrorMessage(error).slice(0, 400) } : {}),
  }).catch(() => {});
}

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
    headers: { ...CORS_HEADERS, "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*" },
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
  const body = parsed.data;
  const scope = await enforceApiKeyPolicyWithScope(request, body.model);
  if (scope.rejection) return scope.rejection;

  const started = Date.now();
  const tried = new Set<string>();
  const exhaustedProjects = new Set<string>();
  let upstreamAttempts = 0;
  let lastStatus = 503;
  let lastError = "No eligible Gemini credentials for Decisions API";
  let lastRetryAfter: string | null = null;
  let lastCode: string | null = null;

  for (let selection = 0; selection < MAX_CREDENTIAL_SELECTIONS &&
    upstreamAttempts < MAX_UPSTREAM_ATTEMPTS; selection++) {
    if (request.signal.aborted) return errorResponse(499, "Client request cancelled");
    const remaining = TOTAL_DEADLINE_MS - (Date.now() - started);
    if (remaining <= 0) break;

    const selected = await getProviderCredentialsWithQuotaPreflight(
      PROVIDER, null, scope.allowedConnections, GEMINI_DECISION_MODEL,
      { excludeConnectionIds: Array.from(tried) }
    );
    if (!selected) break;
    const unavailable = unusableCredentialsResponse(PROVIDER, selected);
    if (unavailable) {
      // Preserve the existing pool's cooldown/retry-after response when nothing is eligible.
      return upstreamAttempts === 0 ? unavailable :
        errorResponse(lastStatus, lastError, lastRetryAfter ? {
          retryAfter: Number(lastRetryAfter) || undefined,
          code: lastCode ?? undefined,
        } : undefined);
    }
    const credentials = selected as Credential;
    const connectionId = credentials.connectionId;
    if (!connectionId || tried.has(connectionId) || !credentials.apiKey) break;
    tried.add(connectionId);
    const project = projectIdOf(credentials);
    // Google quota is project-scoped: a second key from a known exhausted
    // project does NOT provide extra capacity. Unknown projects are not guessed.
    if (project && exhaustedProjects.has(project)) continue;

    upstreamAttempts++;
    const response = await executeGeminiDecision({ model: body.model, input: body.input, questions: body.questions }, credentials.apiKey, {
      signal: request.signal,
      timeoutMs: Math.min(20_000, remaining),
    });
    const error = response.transportError || geminiDecisionErrorText(response.body);
    logAttempt(response.status, credentials, response.latencyMs, response.body, error);

    if (response.status === 200 && response.body) {
      await clearRecoveredProviderState(credentials);
      return jsonSuccess(response.body, Date.now() - started, upstreamAttempts);
    }
    if (response.status === 499) return errorResponse(499, "Client request cancelled");

    lastStatus = response.status;
    lastError = error ? sanitizeErrorMessage(error).slice(0, 350) :
      `Google Decisions returned HTTP ${response.status}`;
    lastRetryAfter = response.headers.get("retry-after");
    const upstreamError = response.body?.error;
    lastCode = upstreamError && typeof upstreamError === "object" && !Array.isArray(upstreamError) &&
      typeof (upstreamError as Record<string, unknown>).code === "string"
      ? (upstreamError as Record<string, string>).code : null;

    // Retry only account / transport failures. Input validation, policy and
    // content-safety refusals are not repaired by changing API keys.
    if (![401, 402, 403, 408, 429, 500, 502, 503, 504].includes(response.status)) break;

    if (project && response.status === 429) exhaustedProjects.add(project);
    if (connectionId !== "env:GEMINI_API_KEY") {
      try {
        await markAccountUnavailable(
          connectionId, response.status, lastError, PROVIDER,
          GEMINI_DECISION_MODEL, null, { headers: response.headers }
        );
      } catch {
        // The current call still excludes the failed credential.
      }
    }
    // Transient 5xx/timeout may be request-specific; never loop forever
    // or retry the same account inside one Decisions request.
  }

  return errorResponse(lastStatus, lastError, lastRetryAfter && /^\d+(?:\.\d+)?$/.test(lastRetryAfter)
    ? { retryAfter: Number(lastRetryAfter), code: lastCode ?? undefined }
    : { code: lastCode ?? undefined });
}
