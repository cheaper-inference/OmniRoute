import { NextResponse } from "next/server";
import {
  CREDENTIAL_EXPORT_FORBIDDEN_MESSAGE,
  requireOperatorCredential,
} from "@/lib/api/operatorCredential";
import { previewProviderTransfer } from "@/lib/transfer/providerTransfer";
import { transferErrorResponse } from "@/lib/transfer/transferRouteErrors";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { providerTransferPreviewSchema } from "@/shared/validation/schemas/providerTransfer";

/**
 * POST /api/settings/transfer/preview
 * Open a transfer file with its passphrase and report, per item, whether it is
 * new, identical, in conflict or unsupported here. Writes nothing and returns
 * identities only — never a credential.
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
  const validation = validateBody(providerTransferPreviewSchema, body);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const { bundle, passphrase } = validation.data;
    return NextResponse.json(await previewProviderTransfer(bundle, passphrase));
  } catch (error) {
    return transferErrorResponse(error, "Failed to read the transfer file");
  }
}
