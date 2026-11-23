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
    if ((payload as { type?: string } | null)?.type !== "message_delta") return changed;
    return repairClaudeFinalWireUsage(payload, getAccountingUsage()) || changed;
  };
  return { basis, sanitizePassthrough };
}
