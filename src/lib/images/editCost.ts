import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { imageRequestBill, type ImageRequestAccounting } from "@/lib/usage/imageRequestAccounting";
import { generateRequestId } from "@/shared/utils/requestId";

/**
 * The response for a successful image edit, priced the way /v1/images/generations prices
 * a generation (#18676): the cost of the images actually returned is reported in the
 * X-OmniRoute meta headers. The attempt itself is priced and debited exactly once by
 * `runImageRequestWithAccounting`, so this only reports that bill — re-pricing here would
 * charge a key twice for one edit.
 */
export async function editSuccessResponse(
  accounting: Pick<ImageRequestAccounting, "apiKeyInfo" | "startTime">,
  provider: string,
  model: string,
  data: unknown
): Promise<Response> {
  const bill = imageRequestBill(data);
  const costUsd = bill?.costUsd ?? null;
  const headers = new Headers({ "Content-Type": "application/json" });
  attachOmniRouteMetaHeaders(headers, {
    provider,
    model,
    costUsd,
    latencyMs: Date.now() - accounting.startTime,
    requestId: bill?.requestId || generateRequestId(),
  });
  // Unknown is not free: omit the cost header instead of advertising a $0 edit.
  if (costUsd === null) headers.delete("X-OmniRoute-Response-Cost");
  headers.set("X-OmniRoute-Cost-Status", costUsd === null ? "unknown" : "known");
  return new Response(JSON.stringify(data), { status: 200, headers });
}
