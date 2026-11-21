/**
 * GET and PATCH /api/v1/me/quota/{provider} (also reachable as /v1/me/quota/{provider}).
 *
 * Thin shell over handleSelfQuotaGet (src/server/selfService/quotaHandler.ts): the API key holder
 * reads their own position in the quota-share pools of one provider. Off unless the
 * QUOTA_SELF_PANEL feature flag is on; the key is read from headers only.
 *
 * PATCH is a thin shell over handleSelfLendingPatch (src/server/selfService/lendingHandler.ts):
 * the key holder records their own lending consent for one pool in consent mode.
 */
import { handleSelfLendingPatch } from "@/server/selfService/lendingHandler";
import { handleSelfQuotaGet } from "@/server/selfService/quotaHandler";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ provider: string }> }
): Promise<Response> {
  const { provider } = await params;
  return handleSelfQuotaGet(request, provider);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ provider: string }> }
): Promise<Response> {
  const { provider } = await params;
  return handleSelfLendingPatch(request, provider);
}
