import { NextResponse } from "next/server";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createSyncTokenSchema, parseSyncTokenTtlMs } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  issueSyncToken,
  listSyncTokenSummaries,
  resolveSyncApiKeyIdFromManagementRequest,
} from "@/lib/sync/tokens";
import { authorizeSyncTokenIssuer } from "@/lib/sync/issuer";

export async function GET(request: Request) {
  // Sync token management stays authenticated even with login disabled (ALWAYS_PROTECTED tier).
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;

  try {
    const tokens = await listSyncTokenSummaries();
    return NextResponse.json({
      tokens,
      total: tokens.length,
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to list sync tokens");
  }
}

export async function POST(request: Request) {
  // A sync token opens the full config bundle (decrypted credentials), so issuing one needs a
  // dashboard session or the local CLI — the `manage` scope of an API key is not enough.
  const issuerVerdict = await authorizeSyncTokenIssuer(request);
  if (issuerVerdict.ok === false) return issuerVerdict.response;

  const auditContext = getAuditRequestContext(request);

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return createErrorResponse({
      status: 400,
      message: "Invalid JSON body",
    });
  }

  try {
    const validation = validateBody(createSyncTokenSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const syncApiKeyId = await resolveSyncApiKeyIdFromManagementRequest(request);
    const ttlMs = validation.data.ttl ? parseSyncTokenTtlMs(validation.data.ttl) : null;
    const issued = await issueSyncToken({
      name: validation.data.name,
      syncApiKeyId,
      issuedBy: issuerVerdict.issuer,
      ...(ttlMs ? { expiresAt: new Date(Date.now() + ttlMs).toISOString() } : {}),
    });

    const tokenSummary = {
      id: issued.record.id,
      name: issued.record.name,
      syncApiKeyId: issued.record.syncApiKeyId,
      issuedBy: issued.record.issuedBy,
      expiresAt: issued.record.expiresAt,
      revokedAt: issued.record.revokedAt,
      lastUsedAt: issued.record.lastUsedAt,
      createdAt: issued.record.createdAt,
      updatedAt: issued.record.updatedAt,
    };

    logAuditEvent({
      action: "sync.token.created",
      actor: "admin",
      target: issued.record.name,
      resourceType: "sync_token",
      status: "success",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: tokenSummary,
    });

    return NextResponse.json(
      {
        token: issued.token,
        syncToken: tokenSummary,
      },
      { status: 201 }
    );
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to create sync token");
  }
}
