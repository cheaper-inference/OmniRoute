import type {
  ConnectionQuotaAvailability,
  QuotaAvailabilityDecision,
  QuotaAvailabilityScope,
  QuotaAvailabilityWindow,
} from "../../src/lib/usage/availabilityTypes";

export const observedAt = "2099-01-01T00:00:00Z";
/** Handwritten API fixtures, with no provider rules, services or database imports. */
export function decision(
  usable: boolean | null = true,
  blockers: QuotaAvailabilityWindow[] = []
): QuotaAvailabilityDecision {
  return { usable, blockers, allowanceReasons: [], fetchedAt: observedAt };
}
export function availability(
  id: string,
  account = decision(),
  scopes: QuotaAvailabilityScope[] = []
): ConnectionQuotaAvailability {
  return { id, account, scopes };
}
export function healthyResponse(ids: string[], now = Date.now()) {
  return Response.json({
    generatedAt: new Date(now).toISOString(),
    connections: ids.map((id) => availability(id)),
  });
}
export function blocker(
  name: string,
  resetAt: string | null = null,
  kind: QuotaAvailabilityWindow["kind"] = "overall"
): QuotaAvailabilityWindow {
  return { name, resetAt, kind, remainingPercent: 0, cutoffPercent: 0 };
}
export function scope(id: string, windows: string[], result = decision()): QuotaAvailabilityScope {
  return { id, kind: "group", model: id, windows, decision: result };
}
