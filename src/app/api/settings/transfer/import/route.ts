import { NextResponse } from "next/server";
import {
  CREDENTIAL_EXPORT_FORBIDDEN_MESSAGE,
  requireOperatorCredential,
} from "@/lib/api/operatorCredential";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { applyProviderTransfer } from "@/lib/transfer/providerTransfer";
import { transferErrorResponse } from "@/lib/transfer/transferRouteErrors";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { providerTransferImportSchema } from "@/shared/validation/schemas/providerTransfer";

/**
 * POST /api/settings/transfer/import
 * Apply a transfer file with per-item decisions (add / skip / replace). Every
 * decision is validated before the first write, a pre-import database backup is
 * taken, and nothing in this install is deleted.
 */
export async function POST(request: Request) {
  const verdict = await requireOperatorCredential(request, {
    forbiddenMessage: CREDENTIAL_EXPORT_FORBIDDEN_MESSAGE,
  });
  if (verdict.ok === false) return verdict.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
  }
  const validation = validateBody(providerTransferImportSchema, body);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const { bundle, passphrase, decisions } = validation.data;
    const { writes, ...result } = await applyProviderTransfer(bundle, passphrase, decisions);
    const auditContext = getAuditRequestContext(request);
    for (const write of writes) {
      const connection = write.connection;
      logAuditEvent({
        action:
          write.outcome === "created"
            ? "provider.credentials.created"
            : "provider.credentials.updated",
        actor: "admin",
        target: typeof connection.provider === "string" ? connection.provider : "provider",
        resourceType: "provider_credentials",
        status: "success",
        ipAddress: auditContext.ipAddress || undefined,
        requestId: auditContext.requestId,
        metadata: {
          via: "transfer",
          connectionId: connection.id ?? null,
          provider: connection.provider ?? null,
          authType: connection.authType ?? null,
        },
      });
    }
    return NextResponse.json(result);
  } catch (error) {
    return transferErrorResponse(error, "Failed to import the transfer file");
  }
}
