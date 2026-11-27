/**
 * POST /api/playground/improve-prompt
 *
 * Improves a user-supplied system prompt and/or user prompt by calling
 * /v1/chat/completions internally with a meta-prompt (D8 — uses the model
 * chosen by the user, never forces a cheap model).
 *
 * Request:  ImprovePromptRequestSchema  { system?, prompt?, model, tone? }
 * Response: { improvedSystem?, improvedPrompt?, tokensIn, tokensOut }
 *
 * Auth: a presented key is always validated. Without one, a signed-in dashboard
 *       session passes (the Playground sends only its session, KEA-9515); anyone
 *       else needs a key while REQUIRE_API_KEY=true.
 *
 * Hard Rule #12: ALL error paths route through buildErrorBody.
 */

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";
import {
  ImprovePromptRequestSchema,
  buildImproveChatBody,
  parseImprovedContent,
} from "@/lib/playground/promptImprover";
import { isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";
import { isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { resolveSelfLoopBearer } from "@/shared/middleware/chatAdmissionIdentity";
import { mayForwardSelfLoopCredential } from "@/lib/a2a/selfLoopAuth";

const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

function errorResp(status: number, message: string, upstreamDetails?: unknown): Response {
  return new Response(
    JSON.stringify(buildErrorBody(status, sanitizeErrorMessage(message), upstreamDetails)),
    {
      status,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    }
  );
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { headers: CORS_HEADERS });
}

export async function POST(request: Request): Promise<Response> {
  // 1. Parse JSON body
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return errorResp(HTTP_STATUS.BAD_REQUEST, "Invalid JSON body");
  }

  // 2. Validate via Zod (Hard Rule #7)
  const parsed = ImprovePromptRequestSchema.safeParse(rawBody);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const message = firstIssue
      ? `${firstIssue.path.join(".") || "body"}: ${firstIssue.message}`
      : "Invalid request body";
    return errorResp(HTTP_STATUS.BAD_REQUEST, message);
  }
  const body = parsed.data;

  // 3. Auth: a key, or (without one) a dashboard session verified against JWT_SECRET.
  const apiKeyRaw = extractApiKey(request);
  const viaDashboardSession = !apiKeyRaw && (await isDashboardSessionAuthenticated(request));
  if (isRequireApiKeyEnabled() && !apiKeyRaw && !viaDashboardSession) {
    return errorResp(HTTP_STATUS.UNAUTHORIZED, "Authentication required");
  }
  if (apiKeyRaw && !(await isValidApiKey(apiKeyRaw))) {
    return errorResp(HTTP_STATUS.UNAUTHORIZED, "Invalid API key");
  }

  // 4. Build the meta-prompt chat body
  const chatBody = buildImproveChatBody(body);

  // 5. Call /v1/chat/completions on ourselves (D8)
  const port = process.env.API_PORT ?? process.env.PORT ?? "20128";
  const baseUrl = process.env.OMNIROUTE_BASE_URL ?? `http://127.0.0.1:${port}`;
  const upstreamUrl = `${baseUrl}/v1/chat/completions`;

  // A session caller has no key to forward, and /v1/chat/completions does not see the
  // session cookie, so under REQUIRE_API_KEY=true the self-loop presents the per-process
  // self-loop bearer (same as the dashboard model test and evals). It never goes to a
  // base URL that would carry it in cleartext off the private network, and it opts out
  // of memory injection, since the bearer gives the call a memory owner (#13139).
  const useSelfLoopBearer =
    viaDashboardSession && isRequireApiKeyEnabled() && mayForwardSelfLoopCredential(baseUrl);
  const upstreamHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${useSelfLoopBearer ? resolveSelfLoopBearer() : (apiKeyRaw ?? "")}`,
  };
  if (useSelfLoopBearer) upstreamHeaders["x-omniroute-no-memory"] = "true";

  let upstreamResponse: Response;
  try {
    upstreamResponse = await fetch(upstreamUrl, {
      method: "POST",
      headers: upstreamHeaders,
      body: JSON.stringify(chatBody),
    });
  } catch (err: unknown) {
    const safeMsg = sanitizeErrorMessage(
      err instanceof Error ? err.message : "Failed to reach upstream"
    );
    return errorResp(HTTP_STATUS.SERVER_ERROR, `Improve-prompt failed: ${safeMsg}`);
  }

  if (!upstreamResponse.ok) {
    let upstreamText = "";
    try {
      upstreamText = await upstreamResponse.text();
    } catch {
      // ignore
    }
    return errorResp(
      upstreamResponse.status >= 400 && upstreamResponse.status < 600
        ? upstreamResponse.status
        : HTTP_STATUS.BAD_GATEWAY,
      "Improve-prompt upstream request failed",
      sanitizeErrorMessage(upstreamText)
    );
  }

  // 6. Parse response
  let data: {
    choices?: Array<{ message?: { content?: string | null } }>;
    usage?: { prompt_tokens?: number; completion_tokens?: number };
  };
  try {
    data = (await upstreamResponse.json()) as typeof data;
  } catch {
    return errorResp(HTTP_STATUS.BAD_GATEWAY, "Invalid JSON from upstream improve-prompt call");
  }

  const content = data.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    return errorResp(HTTP_STATUS.BAD_GATEWAY, "Empty or missing content from upstream");
  }

  // 7. Parse improved content back into system/prompt parts
  const hadSystem = Boolean(body.system?.trim());
  const hadPrompt = Boolean(body.prompt?.trim());
  const improved = parseImprovedContent(content, hadSystem, hadPrompt);

  const tokensIn = data.usage?.prompt_tokens ?? 0;
  const tokensOut = data.usage?.completion_tokens ?? 0;

  return new Response(
    JSON.stringify({
      ...improved,
      tokensIn,
      tokensOut,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    }
  );
}
