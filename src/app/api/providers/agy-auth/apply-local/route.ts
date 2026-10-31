import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  AgyAuthFileError,
  parseAndValidateAgyToken,
  enrichWithAntigravityBackend,
  createConnectionFromAgyToken,
  detectLocalAgyTokenRaw,
} from "@/lib/oauth/utils/agyAuthImport";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { getProviderAuditTarget } from "@/lib/compliance/providerAudit";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { applyLocalAgyAuthSchema } from "@/shared/validation/schemas";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { sanitizeProviderSpecificDataForResponse } from "@/lib/providers/requestDefaults";

function sanitizeConnectionForResponse(connection: Record<string, unknown>) {
  const safe = { ...connection };
  delete safe.accessToken;
  delete safe.refreshToken;
  delete safe.idToken;
  delete safe.apiKey;
  if (safe.providerSpecificData) {
    safe.providerSpecificData = sanitizeProviderSpecificDataForResponse(safe.providerSpecificData);
  }
  return safe;
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const auditContext = getAuditRequestContext(request);

  // Body is optional for this route; tolerate an empty/absent body.
  let body: unknown = {};
  try {
    const text = await request.text();
    if (text.trim()) body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsedBody = validateBody(applyLocalAgyAuthSchema, body);
  if (isValidationFailure(parsedBody)) {
    return NextResponse.json({ error: parsedBody.error }, { status: 400 });
  }
  // Re-detecting a local login is an explicit refresh action: default to replacing
  // any existing connection for the same account unless the caller opts out.
  const { name, email, overwriteExisting = true } = parsedBody.data;

  let rawJson: unknown;
  let source = "apply-local";
  try {
    const detected = await detectLocalAgyTokenRaw();
    rawJson = detected.raw;
    source = detected.source;
  } catch (error) {
    if (error instanceof AgyAuthFileError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: "Could not read local Antigravity credentials", code: "read_failed" },
      { status: 500 }
    );
  }

  try {
    const parsed = parseAndValidateAgyToken(rawJson);
    const enriched = await enrichWithAntigravityBackend(parsed);
    const { connection, created } = await createConnectionFromAgyToken(enriched, {
      name,
      email,
      overwriteExisting,
    });

    logAuditEvent({
      action: "provider.credentials.imported",
      actor: "admin",
      target: getProviderAuditTarget(connection),
      resourceType: "provider_credentials",
      status: "success",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: {
        provider: "agy",
        created,
        source: `apply-local:${source}`,
        email: enriched.email || email,
        hasProjectId: !!enriched.projectId,
      },
    });

    return NextResponse.json({
      connection: sanitizeConnectionForResponse(connection as Record<string, unknown>),
      created,
    });
  } catch (error) {
    if (error instanceof AgyAuthFileError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: sanitizeErrorMessage(error) || "Failed to import local Antigravity CLI login" },
      { status: 500 }
    );
  }
}
