/**
 * GET /api/v1/me/usage (also reachable as /v1/me/usage).
 *
 * Thin shell over handleSelfUsageGet (src/server/selfService/usageHandler.ts): the API key holder
 * reads the usage and cost series of their own key. Off unless the QUOTA_SELF_PANEL feature flag
 * is on; the key is read from headers only.
 */
import { handleSelfUsageGet } from "@/server/selfService/usageHandler";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  return handleSelfUsageGet(request);
}
