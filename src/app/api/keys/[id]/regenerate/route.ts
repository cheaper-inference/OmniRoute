import { NextResponse } from "next/server";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { SYSTEM_API_KEY_SOURCE } from "@/lib/db/apiKeys/systemKey";
import { getApiKeyById, regenerateApiKey } from "@/lib/db/apiKeys";
import {
  requireCredentialForManagementScopedKey,
  requireManagementAuth,
} from "@/lib/api/requireManagementAuth";
import * as log from "@/sse/utils/logger";

/**
 * POST /api/keys/[id]/regenerate
 *
 * Regenerates the API key value for a given ID.
 * The old key is immediately invalidated.
 */
export async function POST(request, { params }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing key ID" }, { status: 400 });
    }

    const existing = await getApiKeyById(id);
    if (existing?.source === SYSTEM_API_KEY_SOURCE) {
      return NextResponse.json(buildErrorBody(403, "System API keys cannot be regenerated"), {
        status: 403,
      });
    }

    const scopeAuthError = await requireCredentialForManagementScopedKey(request, existing?.scopes);
    if (scopeAuthError) return scopeAuthError;

    const result = await regenerateApiKey(id);
    if (!result) {
      return NextResponse.json({ error: "Key not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "API key regenerated successfully",
      key: result.key,
      id: result.id,
    });
  } catch (error) {
    log.error("keys", "Error regenerating key", error);
    return NextResponse.json({ error: "Failed to regenerate key" }, { status: 500 });
  }
}
