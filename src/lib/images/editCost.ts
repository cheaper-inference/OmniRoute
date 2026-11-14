import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { recordModalCallCost } from "@/domain/costRules";
import { calculateModalCost } from "@/lib/usage/costCalculator";
import type { ImageRequestAccounting } from "@/lib/usage/imageRequestAccounting";
import { generateRequestId } from "@/shared/utils/requestId";

/**
 * The response for a successful image edit, priced the way /v1/images/generations prices
 * a generation (#18676): the cost of the images actually returned is charged to the API
 * key's budget and reported in the X-OmniRoute meta headers. Before this, edits were
 * checked against a key's budget but never drew it down.
 */
export async function editSuccessResponse(
  accounting: Pick<ImageRequestAccounting, "apiKeyInfo" | "startTime">,
  provider: string,
  model: string,
  data: unknown
): Promise<Response> {
  const images = (data as { data?: unknown[] } | null)?.data;
  const n = Array.isArray(images) && images.length > 0 ? images.length : 1;
  const costUsd = await calculateModalCost("image", provider, model, { n });
  recordModalCallCost(accounting.apiKeyInfo?.id, { provider, model, costUsd });
  const headers = new Headers({ "Content-Type": "application/json" });
  attachOmniRouteMetaHeaders(headers, {
    provider,
    model,
    costUsd,
    latencyMs: Date.now() - accounting.startTime,
    requestId: generateRequestId(),
  });
  return new Response(JSON.stringify(data), { status: 200, headers });
}
