import { NextResponse } from "next/server";
import {
  CREDENTIAL_EXPORT_FORBIDDEN_MESSAGE,
  requireOperatorCredential,
} from "@/lib/api/operatorCredential";
import { getProviderTransferCatalog } from "@/lib/transfer/providerTransfer";
import { transferErrorResponse } from "@/lib/transfer/transferRouteErrors";

export const dynamic = "force-dynamic";

/**
 * GET /api/settings/transfer/catalog
 * Provider accounts the operator can pick for a selective transfer — identity
 * and labels only, never a credential.
 */
export async function GET(request: Request) {
  const verdict = await requireOperatorCredential(request, {
    forbiddenMessage: CREDENTIAL_EXPORT_FORBIDDEN_MESSAGE,
  });
  if (verdict.ok === false) return verdict.response;

  try {
    return NextResponse.json(await getProviderTransferCatalog());
  } catch (error) {
    return transferErrorResponse(error, "Failed to load transferable accounts");
  }
}
