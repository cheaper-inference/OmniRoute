/**
 * Per-stream usage guard (#20086, #20480).
 *
 * The usage guard's body size and input estimate depend only on the request, so a stream
 * builds one RequestUsageBasis and reuses it for every event instead of re-serializing and
 * re-tokenizing the body on each chunk that carries usage. The passthrough sanitizer also
 * rebuilds the accounting receipt (which re-estimates from the body) only for Claude
 * message_delta events, the one event type repairClaudeFinalWireUsage changes.
 */
import { hasPriorInputForTrailingUsage } from "./passthroughTrailingUsage.ts";
import { repairClaudeFinalWireUsage } from "./streamUsageMerge.ts";
import {
  createRequestUsageBasis,
  sanitizeUsagePayloadForRequest,
  type RequestUsageBasis,
  type UsageLike,
} from "./usageTracking.ts";

export type StreamUsageGuard = {
  basis: RequestUsageBasis;
  sanitizePassthrough: (payload: unknown) => boolean;
};

export function createUsageGuard(
  body: unknown,
  clientResponseFormat: string | null,
  getUsage: () => unknown,
  getAccountingUsage: () => UsageLike | null
): StreamUsageGuard {
  const basis = createRequestUsageBasis(body);
  const sanitizePassthrough = (payload: unknown): boolean => {
    const changed =
      !hasPriorInputForTrailingUsage(payload, getUsage()) &&
      sanitizeUsagePayloadForRequest(payload as UsageLike, body, clientResponseFormat, basis);
    const event = payload as { type?: string; usage?: Record<string, unknown> } | null;
    if (event?.type !== "message_delta") return changed;
    const repaired = repairClaudeFinalWireUsage(payload, getAccountingUsage());
    // The raw charge has already been captured for the call log.
    if (event.usage && Object.hasOwn(event.usage, "buyer_cost_micro")) {
      delete event.usage.buyer_cost_micro;
      return true;
    }
    return repaired || changed;
  };
  return { basis, sanitizePassthrough };
}
