import { NextResponse } from "next/server";
import {
  CREDENTIAL_EXPORT_FORBIDDEN_MESSAGE,
  requireOperatorCredential,
} from "@/lib/api/operatorCredential";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { exportProviderTransferBundle } from "@/lib/transfer/providerTransfer";
import { transferErrorResponse } from "@/lib/transfer/transferRouteErrors";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { providerTransferExportSchema } from "@/shared/validation/schemas/providerTransfer";

/**
 * POST /api/settings/transfer/export
 * Seal the selected provider accounts (and the custom provider nodes they use)
 * under the operator's passphrase and return the file. Credentials are never
 * written in plaintext; the body must carry `acknowledgeCredentialExport: true`.
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
  const validation = validateBody(providerTransferExportSchema, body);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const bundle = await exportProviderTransferBundle(validation.data);
    const auditContext = getAuditRequestContext(request);
    logAuditEvent({
      action: "provider.credentials.exported",
      actor: "admin",
      target: "provider-transfer",
      resourceType: "provider_credentials",
      status: "success",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: { via: "transfer", connectionIds: validation.data.connectionIds },
    });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    return new NextResponse(JSON.stringify(bundle, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "Content-Disposition": `attachment; filename="omniroute-provider-transfer-${stamp}.json"`,
      },
    });
  } catch (error) {
    return transferErrorResponse(error, "Failed to export the selected accounts");
  }
}
