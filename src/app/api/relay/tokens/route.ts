import { NextResponse } from "next/server";
import { z } from "zod";
import { getRelayTokens, createRelayToken } from "@/lib/db/relayProxies";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { requireOperatorCredential } from "@/lib/api/operatorCredential";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

/**
 * Minting hands out a reusable inference credential, so it is operator-only (dashboard
 * session or local CLI): API keys and access tokens, whatever their scope, are machine
 * credentials and cannot create new ones. Listing and managing stay on manage auth.
 */
const RELAY_TOKEN_MINT_FORBIDDEN_MESSAGE =
  "Minting a relay token requires a signed-in dashboard session or the local CLI; API keys and access tokens cannot create new tokens.";

const relayTokenInputSchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  description: z.string().optional(),
  comboId: z.string().trim().min(1).optional(),
  allowedModels: z.array(z.string().trim().min(1)).optional(),
  maxTokensPerRequest: z.number().int().positive().optional(),
  maxRequestsPerMinute: z.number().int().positive().optional(),
  maxRequestsPerDay: z.number().int().positive().optional(),
  maxCostPerDay: z.number().nonnegative().optional(),
  expiresAt: z.number().int().positive().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function GET(request: Request) {
  // Relay tokens are credentials: inventory and minting stay authenticated even
  // when the dashboard runs with login disabled (mirrors the ALWAYS_PROTECTED tier).
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;
  const tokens = getRelayTokens();
  // Strip hash from response
  const safe = tokens.map((t) => ({
    id: t.id,
    name: t.name,
    tokenPrefix: t.tokenPrefix,
    description: t.description,
    comboId: t.comboId,
    allowedModels: t.allowedModels,
    maxTokensPerRequest: t.maxTokensPerRequest,
    maxRequestsPerMinute: t.maxRequestsPerMinute,
    maxRequestsPerDay: t.maxRequestsPerDay,
    maxCostPerDay: t.maxCostPerDay,
    enabled: t.enabled,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
    expiresAt: t.expiresAt,
    lastUsedAt: t.lastUsedAt,
  }));
  return NextResponse.json(safe);
}

export async function POST(request: Request) {
  const operatorVerdict = await requireOperatorCredential(request, {
    forbiddenMessage: RELAY_TOKEN_MINT_FORBIDDEN_MESSAGE,
    alwaysRequireAuth: true,
  });
  if (operatorVerdict.ok === false) return operatorVerdict.response;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const validation = validateBody(relayTokenInputSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  try {
    const token = createRelayToken(validation.data);

    return NextResponse.json({
      id: token.id,
      name: token.name,
      rawToken: token.rawToken,
      tokenPrefix: token.tokenPrefix,
    });
  } catch (error) {
    const message = sanitizeErrorMessage(error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
