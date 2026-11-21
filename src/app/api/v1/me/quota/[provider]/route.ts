/**
 * GET /api/v1/me/quota/{provider} (also reachable as /v1/me/quota/{provider}).
 *
 * Thin shell over handleSelfQuotaGet (src/server/selfService/quotaHandler.ts): the API key holder
 * reads their own position in the quota-share pools of one provider. Off unless the
 * QUOTA_SELF_PANEL feature flag is on; the key is read from headers only.
 */
import { handleSelfQuotaGet } from "@/server/selfService/quotaHandler";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ provider: string }> }
): Promise<Response> {
  const { provider } = await params;
  return handleSelfQuotaGet(request, provider);
}
