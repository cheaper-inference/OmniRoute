import type { HealthQuota } from "./healthOverview";
export type { QuotaAllowanceReason as QuotaBypass } from "@/lib/usage/availabilityTypes";

/** Display-only water level. Never used to decide eligibility or a capsule's color. */
export function quotaPercentage(q: HealthQuota): number | null {
  if (q.unlimited) return 100;
  if (typeof q.remainingPercentage === "number" && Number.isFinite(q.remainingPercentage))
    return Math.max(0, Math.min(100, q.remainingPercentage));
  if (
    typeof q.total === "number" &&
    Number.isFinite(q.total) &&
    q.total > 0 &&
    typeof q.used === "number" &&
    Number.isFinite(q.used)
  )
    return Math.max(0, Math.min(100, (1 - q.used / q.total) * 100));
  return null;
}
