export type QuotaAllowanceReason =
  "extraUsage" | "filteringDisabled" | "paidCredits" | "purchasedBalance" | "recentSuccess";
export interface QuotaAvailabilityWindow {
  name: string;
  resetAt: string | null;
  kind: "fiveHour" | "overall";
  remainingPercent?: number;
  cutoffPercent?: number;
  reason?: "scopeCooldown" | "peakHour" | "modelLockout";
}
export interface QuotaAvailabilityDecision {
  /** null means that there is no cached observation, not a guessed healthy account. */
  usable: boolean | null;
  blockers: QuotaAvailabilityWindow[];
  /** Server-selected first recovery across alternatives; blockers retain all explanations. */
  recoveryWindow?: QuotaAvailabilityWindow;
  allowanceReasons: QuotaAllowanceReason[];
  /** False only when an enabled live cutoff cannot be reconstructed from cached usage. */
  cutoffEvaluated?: boolean;
  fetchedAt: string | null;
  /** Display-only thresholds for choosing between alternative budget meters. */
  displayCutoffs?: Record<string, number>;
}
export interface QuotaAvailabilityScope {
  id: string;
  kind: "group" | "scoped";
  model: string;
  windows: string[];
  decision: QuotaAvailabilityDecision;
}
export interface ConnectionQuotaAvailability {
  id: string;
  account: QuotaAvailabilityDecision;
  scopes: QuotaAvailabilityScope[];
}
export interface QuotaAvailabilitySummary {
  generatedAt: string;
  connections: ConnectionQuotaAvailability[];
}
