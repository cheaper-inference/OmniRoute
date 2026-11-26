import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import {
  createRoutingEvent,
  emitRoutingEvent,
  outcomeFromStatus,
  type RoutingOutcome,
} from "../../services/routing/index.ts";

export function resolveFamilyFallbackBillingModel(requested: string, served: string): string {
  return served !== requested && isFeatureFlagEnabled("FAMILY_FALLBACK_BILL_SERVED_MODEL_ENABLED")
    ? served
    : requested;
}

export function emitFamilyFallbackFailureEvent(
  requestedModel: string,
  event: Omit<Parameters<typeof createRoutingEvent>[0], "outcome"> & {
    outcome?: RoutingOutcome;
  }
): void {
  if (event.model === requestedModel) return;
  emitRoutingEvent(
    createRoutingEvent({ ...event, outcome: event.outcome ?? outcomeFromStatus(event.status) })
  );
}
