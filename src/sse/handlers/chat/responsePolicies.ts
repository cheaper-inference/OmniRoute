/**
 * Carry per-Response routing policies from the provider response onto the wrapper that
 * chat.ts / chatHelpers.ts actually return. Both markers live in module-level WeakMaps keyed by
 * the Response object, so a cloned/wrapped Response loses them unless they are copied here:
 *  - provider-probe provenance (`providerProbeResult`);
 *  - the trusted empty-turn execution record (#16072, `emptyTurnPolicy`), without which a
 *    valid empty terminal turn is re-classified as a failed empty response after wrapping;
 *  - the custom JSON no-replay marker (`noReplayResponse`), so a combo never replays a
 *    business request on another target.
 *
 * Extracted so the frozen chat.ts / chatHelpers.ts do not grow (file-size gate).
 */
import { inheritEmptyTurnPolicy } from "@omniroute/open-sse/utils/emptyTurnPolicy.ts";
import {
  inheritNoReplayResponse,
  isNoReplayResponse,
  markNoReplayResponse,
} from "@omniroute/open-sse/utils/noReplayResponse.ts";
import { isCustomJsonProviderData } from "@omniroute/open-sse/utils/customJson.ts";
import { inheritProviderProbeResponse } from "@/shared/utils/providerProbeResult";

export { inheritProviderProbeResponse, isNoReplayResponse };

export function inheritResponsePolicies(source: Response, target: Response): Response {
  return inheritNoReplayResponse(
    source,
    inheritEmptyTurnPolicy(source, inheritProviderProbeResponse(source, target))
  );
}

/**
 * Custom JSON API nodes call business endpoints whose request may already have taken
 * effect: mark the response so neither account fallback nor a combo target replays it.
 */
export function markCustomJsonNoReplay(response: Response, providerSpecificData: unknown): void {
  if (isCustomJsonProviderData(providerSpecificData)) markNoReplayResponse(response);
}
