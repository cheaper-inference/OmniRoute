import type { LocalEndpoint } from "./types.ts";

export type Eligibility =
  | { eligible: true }
  | { eligible: false; reason: "inactive" | "non_subscription" | "unknown_billing" };

export function subscriptionEligibility(endpoint: LocalEndpoint): Eligibility {
  if (!endpoint.active) return { eligible: false, reason: "inactive" };
  if (endpoint.billingClass === "unknown") {
    return { eligible: false, reason: "unknown_billing" };
  }
  if (endpoint.billingClass !== "subscription") {
    return { eligible: false, reason: "non_subscription" };
  }
  return { eligible: true };
}
