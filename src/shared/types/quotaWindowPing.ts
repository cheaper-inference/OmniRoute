/**
 * Pure types for quota window ping targets, shared by the server, API and dashboard.
 * No runtime imports: this module is importable from the client bundle.
 */

export type QuotaWindowScope = "connection" | "model" | "family";
export type QuotaWindowKind = "first-use" | "fixed-calendar" | "sliding" | "token-bucket";
export type QuotaWindowPolicy = "scheduled" | "manual" | "excluded";
export type QuotaWindowResetAtSource =
  | "upstream-window" // one upstream resetAt for the whole window scope
  | "upstream-per-model" // upstream resetAt, but per model bucket
  | "local-derived" // computed from local clock or local accounting
  | "none"; // no resetAt at all
export type QuotaWindowActiveEvidence = "reset-horizon" | "none";

export interface QuotaWindowDescriptor {
  /** Stable id, also stored on every target: "codex:session", "claude:weekly", ... */
  id: string;
  provider: string;
  /** Model the window is scoped to; null for an account-wide window. */
  model: string | null;
  /** Model family the window is scoped to (e.g. "opus"); null otherwise. */
  modelFamily: string | null;
  scope: QuotaWindowScope;
  /** Key in the provider usage `quotas` map, e.g. "session" or "weekly (7d)". */
  windowId: string;
  displayName: string;
  kind: QuotaWindowKind;
  durationSeconds: number | null;
  /** The longer window that must still have headroom before a short-window ping. */
  longerWindow: { descriptorId: string; windowId: string } | null;
  policy: QuotaWindowPolicy;
  /** Whether the operator may attach a schedule at all. */
  scheduledAllowed: boolean;
  resetAtSource: QuotaWindowResetAtSource;
  /** One resetAt applies to every connection using this window, upstream-reported. */
  globalResetAt: boolean;
  /** Which observation can prove the window is already running. */
  windowActiveEvidence: QuotaWindowActiveEvidence;
  /** Preference order; empty means "walk the live provider catalog". */
  pingModelCandidates: readonly string[];
  pingText: string;
  pingInstructions: string | null;
  pingReasoningEffort: string | null;
  /** Claude only: max_tokens for the ping. Codex uses a Responses body (null). */
  pingMaxTokens: number | null;
}

export interface QuotaWindowUsageWindow {
  /** The provider reported this window in the current reading. */
  reported: boolean;
  resetAt: string | null;
  /** null = provider did not report the fraction (unknown, never "exhausted"). */
  remainingPct: number | null;
  exhausted: boolean;
  windowSeconds: number | null;
}

export interface QuotaWindowUsageReading {
  provider: string;
  /** Provider attested that the payload lists every window it has (Claude `quotasComplete`). */
  complete: boolean;
  /** The reading is a stale served copy (Claude `_stale`) or the fetch returned a message only. */
  stale: boolean;
  message: string | null;
  /** Keyed by descriptor.windowId. */
  windows: Record<string, QuotaWindowUsageWindow>;
}

export type WindowPingSchedule =
  | { kind: "interval"; minutes: number }
  | { kind: "daily"; time: string; timezone: string; days: number[] };

export type QuotaWindowPingTrigger = "scheduled" | "manual";

export interface WindowPingTarget {
  id: string;
  connectionId: string;
  provider: string;
  /** Optional ping-model override. null = resolve per run from the descriptor and catalog. */
  model: string | null;
  windowId: string;
  descriptorId: string;
  /** Stored default is false. The operator sets it explicitly. */
  enabled: boolean;
  /** Required when enabled; null for a manual-only target. */
  schedule: WindowPingSchedule | null;
  /** 0 = only the exhaustion gate on the longer window. */
  minLongerWindowRemainingPct: number;
  dryRun: boolean;
  /** Claude scheduled targets require this; true only after an explicit operator confirmation. */
  claudeBillableConfirmed: boolean;
  lastPingedFingerprint: string | null;
  lastPingAt: string | null;
  failureAt: string | null;
  nextRunAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WindowPingTargetInput {
  connectionId: string;
  descriptorId: string;
  model?: string | null;
  enabled?: boolean; // default false
  schedule?: WindowPingSchedule | null; // required when enabled
  minLongerWindowRemainingPct?: number; // default 0
  dryRun?: boolean; // default false
  claudeBillableConfirmed?: boolean; // default false
}

export type QuotaWindowPingSkipReason =
  // pre-fetch, in evaluation order
  | "target_disabled"
  | "kill_switch_off"
  | "account_disabled"
  | "breaker_open"
  | "breaker_cooling"
  | "exclusive_lease"
  | "in_flight"
  | "no_model"
  // post-fetch, in evaluation order
  | "telemetry_stale"
  | "window_exhausted"
  | "window_active"
  | "longer_window_exhausted"
  | "longer_window_below_threshold"
  | "already_pinged_reset";

export type QuotaWindowPingOutcomeReason =
  | "would_ping" // dry-run only
  | "completed"
  | "not_completed"
  | "timeout"
  | "error"
  | "auth_failed"
  | "no_token";

export type QuotaWindowPingReason = QuotaWindowPingSkipReason | QuotaWindowPingOutcomeReason;

export type QuotaWindowPingRunStatus = "running" | "succeeded" | "failed" | "skipped";

export interface WindowPingRun {
  id: string;
  targetId: string;
  connectionId: string;
  descriptorId: string;
  windowId: string;
  trigger: QuotaWindowPingTrigger;
  status: QuotaWindowPingRunStatus;
  reason: QuotaWindowPingReason | null; // null while running
  /** normalizeResetKey(resetAt) of the window this decision was made against. */
  fingerprint: string | null;
  dryRun: boolean;
  /** Fixed sanitized text only. Never upstream body, headers or error text. */
  detail: string | null;
  startedAt: string;
  finishedAt: string | null;
  leaseExpiresAt: number;
}

export interface WindowPingClaim {
  run: WindowPingRun;
  target: WindowPingTarget;
}

export type WindowPingClaimResult =
  | { kind: "claimed"; claim: WindowPingClaim }
  | { kind: "not_due" } // scheduled only: disabled/missing next_run_at/not due
  // A live run holds the target lease. The store inserts a finished `skipped/in_flight`
  // audit row in the same transaction, so every evaluation attempt has a row.
  | { kind: "in_flight"; run: WindowPingRun };

export interface QuotaWindowPingDecision {
  action: "execute" | "skip";
  reason: QuotaWindowPingReason;
  fingerprint: string | null;
  window: QuotaWindowUsageWindow | null;
}

export type QuotaWindowPingEligibilityReason =
  | "descriptor_unknown"
  | "descriptor_not_targetable"
  | "descriptor_excluded"
  | "connection_missing"
  | "provider_mismatch"
  | "unsupported_auth"
  | "account_disabled"
  | "model_unavailable"
  | "duplicate_target";

export interface QuotaWindowPingEligibility {
  eligible: boolean;
  reason: QuotaWindowPingEligibilityReason | null;
}
